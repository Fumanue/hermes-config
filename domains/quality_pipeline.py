from __future__ import annotations

import json
import concurrent.futures
import math
import os
import re
import shutil
from dataclasses import dataclass
from datetime import datetime, timedelta, time
from pathlib import Path
from math import ceil
from typing import Any

import pandas as pd

from project_hermes.config import get_paths
from project_hermes.core.auth_midway import get_cookie
from project_hermes.core.logger import get_logger
log = get_logger(__name__)


try:
    from project_hermes.domains.atlas_quality import fetch_and_save_atlas_quality
except Exception:  # pragma: no cover - keeps UI alive if module is unavailable
    fetch_and_save_atlas_quality = None

try:
    from project_hermes.domains.diver_quality import fetch_and_build_fps
except Exception:  # pragma: no cover
    fetch_and_build_fps = None

paths = get_paths()
ROOT_DIR = Path(getattr(paths, "root", Path.cwd()))
OUTPUT_DIR = Path(getattr(paths, "output", ROOT_DIR / "data" / "output"))
CONFIG_DIR = ROOT_DIR / "config" / "hermes"
DOCUMENTS_QUALITY_DIR = Path(os.environ.get("USERPROFILE", str(Path.home()))) / "Documents" / "Quality TO"

DOCUMENTS_QUALITY_DIR.mkdir(parents=True, exist_ok=True)

DPMO_TARGETS_PATH = CONFIG_DIR / "dpmo_targets.json"

QUALITY_OUTPUT_NAME = "Quality_Coaching.csv"

MODE_TO_SIGMA = {
    "urgent": 1,
    "improvement": 2,
    "maintenance": 3,
}

LOGIN_CANDIDATES = [
    "Login", "Employee Login", "employee_login", "user_id", "User ID", "Associate Login",
]
ERROR_CANDIDATES = [
    "Error Type", "ErrorType", "error_type",
    "defectType", "Defect Type", "DefectType",
    "defectTypeAltName", "Defect Type Alt Name",
    "Error Name", "errorName", "Metric", "Indicator",
    "Defect", "Error",
]
FC_CANDIDATES = ["FC", "Warehouse", "Warehouse ID", "Site", "warehouse_id"]
PROCESS_CANDIDATES = ["Process", "Path", "Function", "Process Path"]
COUNT_CANDIDATES = [
    "defectCount",
    "defect_count",
    "Defect Count",
    "defects",
    "Defects",
    "Errors",
    "Error Count",
    "Total Errors",
    "Count",
    "Qty",
    "Quantity",
]


def _load_json(filename: str, default: dict | None = None) -> dict:
    fp = CONFIG_DIR / filename
    if not fp.exists():
        return dict(default or {})
    try:
        data = json.loads(fp.read_text(encoding="utf-8"))
        return data if isinstance(data, dict) else dict(default or {})
    except Exception:
        return dict(default or {})


def _norm_cols(df: pd.DataFrame) -> pd.DataFrame:
    df = df.copy()
    df.columns = [re.sub(r"\s+", " ", str(c).strip()) for c in df.columns]
    return df


def _find_col(df: pd.DataFrame, candidates: list[str]) -> str | None:
    norm = {re.sub(r"[\s_\-]+", "", str(c).strip().lower()): c for c in df.columns}
    for cand in candidates:
        key = re.sub(r"[\s_\-]+", "", cand.strip().lower())
        if key in norm:
            return norm[key]
    for cand in candidates:
        key = re.sub(r"[\s_\-]+", "", cand.strip().lower())
        for c in df.columns:
            if key in re.sub(r"[\s_\-]+", "", str(c).strip().lower()):
                return c
    return None


def normalize_error_key(error_type: str) -> str:
    s = str(error_type or "").strip().upper()
    s = re.sub(r"[^A-Z0-9]+", "_", s)
    s = re.sub(r"_+", "_", s).strip("_")
    # common alias normalisation
    aliases = {
        "BIN_FILTER_VIOLATION": "BIN_FILTER_VIOLATIONS",
        "BIN_FILTER_VIOLATIONS": "BIN_FILTER_VIOLATIONS",
        "ERROR_INDICATOR": "PICK_ERROR_INDICATOR",
        "PICK_ERROR": "PICK_ERROR_INDICATOR",
        "PICK_ERROR_INDICATOR": "PICK_ERROR_INDICATOR",
        "MULTIPLE_EVENT": "MULTIPLE_EVENT",
        "MULTIPLE_EVENTS": "MULTIPLE_EVENT",
        "NIKE_MULTIPLE_EVENTS": "MULTIPLE_EVENT",
        "NIKE_MULTIPLE_EVENT": "MULTIPLE_EVENT",
        "FALSE_PICK_SHORT": "FALSE_PICK_SHORT",
        "FPS": "FALSE_PICK_SHORT",
        "PICK_SHORT": "FALSE_PICK_SHORT",
    }
    return aliases.get(s, s)


def display_error_name(error_key: str) -> str:
    return str(error_key or "").replace("_", " ").title()


# ─── DPMO Target Lookup ─────────────────────────────────────────────────────
_dpmo_cache: dict | None = None


def _load_dpmo_targets() -> dict:
    """Load DPMO targets config (cached in memory)."""
    global _dpmo_cache
    if _dpmo_cache is not None:
        return _dpmo_cache
    if not DPMO_TARGETS_PATH.exists():
        _dpmo_cache = {}
        return _dpmo_cache
    try:
        data = json.loads(DPMO_TARGETS_PATH.read_text(encoding="utf-8-sig"))
        _dpmo_cache = data.get("targets", data)
        return _dpmo_cache
    except Exception as e:
        log.warning("Could not load dpmo_targets.json: %s", e)
        _dpmo_cache = {}
        return _dpmo_cache


def hours_to_dpmo_scale(hours: float) -> tuple[str, int]:
    """Convert hours worked to DPMO tenure scale (day/week) and level.

    Returns:
        ('day', 1-10) for early tenure (0-80h)
        ('week', 3-10) for established tenure (81-400h+)

    Week mapping:
        81-120h  = week 3
        121-160h = week 4
        161-200h = week 5
        201-240h = week 6
        241-280h = week 7
        281-320h = week 8
        321-360h = week 9
        361-400h+= week 10
    """
    hours = max(0, float(hours or 0))
    if hours <= 14:
        return ("day", 1)
    if hours <= 80:
        return ("day", min(10, 1 + ceil((hours - 14) / 8)))
    if hours <= 400:
        return ("week", min(10, 2 + ceil((hours - 80) / 40)))
    return ("week", 10)  # Veteran


def get_dpmo_target(fc: str, error_key: str, curve: str, hours: float) -> int:
    """Look up the DPMO target for a given FC, error, curve, and hours.

    Args:
        fc: Fulfillment center (e.g. "BCN4")
        error_key: Normalized error key (e.g. "PICK_ERROR_INDICATOR")
        curve: One of "NH", "XT_NH", "XT", "LAPSED_XT", "VETERAN"
        hours: Total hours in the process

    Returns:
        DPMO target value (int). 0 if not found.
    """
    targets = _load_dpmo_targets()
    fc_data = targets.get(fc.upper(), {})
    error_data = fc_data.get(error_key, {})
    curves = error_data.get("curves", {})

    # Veterans always use week 10 of XT (or NH if XT missing)
    if curve == "VETERAN":
        scale, level = "week", 10
        curve_key = "XT" if "XT" in curves else "NH"
    else:
        scale, level = hours_to_dpmo_scale(hours)
        curve_key = curve if curve in curves else "NH"

    level_data = curves.get(curve_key, {}).get(scale, {})
    target = level_data.get(str(level), 0)
    # Fallback: if specific level not found, try closest available
    if not target and level_data:
        available = sorted(level_data.keys(), key=int)
        target = int(level_data.get(available[-1], 0))  # use highest (strictest)
    return int(target)


def _known_quality_error_keys(fc: str) -> set[str]:
    """Known error keys from quality_mode.json and quality_courses.json.

    Used to avoid selecting numeric/support columns as Error Type when Atlas
    exports change column order/names.
    """
    keys: set[str] = set()
    mode_cfg = _load_json("quality_mode.json", {})
    if isinstance(mode_cfg, dict):
        fc_cfg = mode_cfg.get(str(fc).upper(), {})
        if isinstance(fc_cfg, dict):
            errors = fc_cfg.get("errors", {})
            if isinstance(errors, dict):
                keys.update(normalize_error_key(k) for k in errors.keys())
    course_cfg = _load_json("quality_courses.json", {})
    if isinstance(course_cfg, dict):
        errors = course_cfg.get("errors", {})
        if isinstance(errors, dict):
            keys.update(normalize_error_key(k) for k in errors.keys())
    return {k for k in keys if k}


def _best_error_column(df: pd.DataFrame, fc: str) -> str | None:
    """Pick the most likely Error Type column.

    Atlas sometimes contains support/numeric columns that can be accidentally
    matched by generic names. We score candidate columns by whether their values
    normalize to configured quality error keys.
    """
    known = _known_quality_error_keys(fc)

    # Name-based preferred columns first.
    preferred = []
    for c in df.columns:
        norm_c = re.sub(r"[\s_\-]+", "", str(c).strip().lower())
        if norm_c in {
            "errortype", "defecttype", "defecttypealtname",
            "errorname", "defect", "indicator", "metric"
        }:
            preferred.append(c)

    candidate_cols = preferred[:]
    generic = _find_col(df, ERROR_CANDIDATES)
    if generic and generic not in candidate_cols:
        candidate_cols.append(generic)

    # Add likely text columns as fallback.
    for c in df.columns:
        if c in candidate_cols:
            continue
        sample = df[c].dropna().astype(str).head(100)
        if sample.empty:
            continue
        numeric_ratio = pd.to_numeric(sample, errors="coerce").notna().mean()
        if numeric_ratio < 0.50:
            candidate_cols.append(c)

    best_col = None
    best_score = -1
    for c in candidate_cols:
        vals = df[c].dropna().astype(str).head(300)
        if vals.empty:
            continue
        norm_vals = vals.apply(normalize_error_key)
        numeric_ratio = pd.to_numeric(vals, errors="coerce").notna().mean()
        known_hits = int(norm_vals.isin(known).sum()) if known else 0
        keyword_hits = int(norm_vals.str.contains("MULTIPLE|PICK_ERROR|BIN_FILTER|ITEM_MISSING|SHORT|DAMAGED|WRONG", regex=True, na=False).sum())
        score = known_hits * 10 + keyword_hits - int(numeric_ratio * 25)
        if score > best_score:
            best_score = score
            best_col = c

    return best_col


def current_sunday_to_now(now: datetime | None = None) -> tuple[datetime, datetime]:
    """Atlas is capped at max 7 days, so we use current Sunday 00:00 → now.

    On Saturday this is still inside a 7-day window. We do not request future
    time; the Saturday 23:59 full week happens naturally once reached.
    """
    now = now or datetime.now()
    days_since_sunday = (now.weekday() + 1) % 7  # Monday=0, Sunday=6
    start_date = (now - timedelta(days=days_since_sunday)).date()
    start = datetime.combine(start_date, time(0, 0))
    end = now
    # Safety cap: never request more than 7 days.
    max_end = start + timedelta(days=6, hours=23, minutes=59)
    if end > max_end:
        end = max_end
    return start, end


def _read_roster_presence(fc: str = "BCN4") -> pd.DataFrame:
    """Read roster presence. Downloads its own Roster_SCC if not available.

    Quality pipeline no longer depends on the performance pipeline having run first.
    """
    fp = OUTPUT_DIR / "Roster_SCC.csv"

    # If roster doesn't exist or is stale (>2h old), download fresh
    needs_download = not fp.exists()
    if fp.exists():
        import time
        age_hours = (time.time() - fp.stat().st_mtime) / 3600
        if age_hours > 2:
            needs_download = True

    if needs_download:
        try:
            from project_hermes.domains.roster_scc import build_roster_scc
            log.info("Downloading fresh Roster_SCC for {fc}…")
            roster_df = build_roster_scc(fc)
            roster_df.to_csv(fp, index=False, encoding="utf-8-sig")
            log.info("Roster_SCC saved: {len(roster_df)} rows")
        except Exception as e:
            log.info("Roster download failed (non-fatal): {e}")
            if not fp.exists():
                return pd.DataFrame(columns=["Login", "PunchType", "Present"])

    try:
        roster = _norm_cols(pd.read_csv(fp, dtype=str))
    except Exception:
        return pd.DataFrame(columns=["Login", "PunchType", "Present"])
    login_col = _find_col(roster, ["Login", "Employee Login", "employeeLogin"])
    punch_col = _find_col(roster, ["PunchType", "Punch Type", "punch_type"])
    if not login_col:
        return pd.DataFrame(columns=["Login", "PunchType", "Present"])
    out = pd.DataFrame()
    out["Login"] = roster[login_col].astype(str).str.strip().str.lower()
    out["PunchType"] = roster[punch_col].astype(str).str.strip().str.upper() if punch_col else ""
    out["Present"] = out["PunchType"].eq("PUNCH_IN")
    out = out[out["Login"].str.len() > 0].drop_duplicates("Login", keep="first")
    return out



def _fetch_punch_presence(fc: str = "BCN4") -> pd.DataFrame:
    """Lightweight presence check using only 2 SCC API calls.
    
    1. /getAssociateProfileDetails/{FC} → empId → login mapping
    2. /punchStatuses/{FC} → empId → PUNCH_IN/PUNCH_OUT
    
    Returns DataFrame with columns: Login, PunchType, Present
    No file dependency (no Roster_SCC.csv needed).
    """
    import platform
    if platform.system().lower().startswith("win"):
        try:
            import pythoncom
            pythoncom.CoInitialize()
        except Exception:
            pass

    SCC_BASE = "https://staffingcommandcenter-eu.aka.amazon.com"
    fc = fc.strip().upper()
    referer = f"{SCC_BASE}/{fc}/roster"

    try:
        import win32com.client
        from project_hermes.core.auth_midway import get_cookie as _get_cookie

        cookie = _get_cookie(aea=True, max_tries=3)

        def _scc_get(url):
            http = win32com.client.Dispatch("WinHTTP.WinHTTPRequest.5.1")
            http.Open("GET", url, False)
            http.SetAutoLogonPolicy(0)
            http.SetTimeouts(10000, 10000, 30000, 30000)
            http.SetRequestHeader("Cookie", cookie)
            http.SetRequestHeader("Referer", referer)
            http.SetRequestHeader("Accept", "application/json")
            http.SetRequestHeader("User-Agent", "Mozilla/5.0")
            http.SetRequestHeader("X-App-Token", "SCC_FRONTEND_APP_v2")
            http.Send()
            status = int(http.Status)
            if status == 200:
                import json as _json
                return _json.loads(http.ResponseText or "{}")
            log.info(f"SCC {url.split('/')[-1]} returned {status}")
            return None

        # 1. Get profiles (empId → login)
        profiles = _scc_get(f"{SCC_BASE}/getAssociateProfileDetails/{fc}")
        if not profiles or not isinstance(profiles, dict):
            log.info("Failed to fetch profiles from SCC")
            return pd.DataFrame(columns=["Login", "PunchType", "Present"])

        eid_to_login = {}
        for emp_id, prof in profiles.items():
            if isinstance(prof, dict):
                login = str(prof.get("employeeLogin", "")).strip().lower()
                if login:
                    eid_to_login[str(emp_id).strip()] = login

        # 2. Get punch statuses
        punch = _scc_get(f"{SCC_BASE}/punchStatuses/{fc}")
        if not punch or not isinstance(punch, dict):
            log.info("Failed to fetch punch statuses from SCC")
            return pd.DataFrame(columns=["Login", "PunchType", "Present"])

        # Combine
        records = []
        for emp_id, p in punch.items():
            emp_id_str = str(emp_id).strip()
            login = eid_to_login.get(emp_id_str, "")
            if not login:
                continue
            punch_type = p.get("type", "") if isinstance(p, dict) else ""
            records.append({
                "Login": login,
                "PunchType": str(punch_type).strip().upper(),
                "Present": str(punch_type).strip().upper() == "PUNCH_IN",
            })

        if not records:
            return pd.DataFrame(columns=["Login", "PunchType", "Present"])

        out = pd.DataFrame(records)
        out = out[out["Login"].str.len() > 0].drop_duplicates("Login", keep="first")
        return out

    except Exception as e:
        log.info(f"_fetch_punch_presence failed: {e}")
        return pd.DataFrame(columns=["Login", "PunchType", "Present"])


def _quality_mode_for(fc: str, error_key: str, _cfg_cache: dict | None = None) -> dict:
    cfg = _cfg_cache if _cfg_cache is not None else _load_json("quality_mode.json", {})
    fc_cfg = cfg.get(str(fc).upper(), {}) if isinstance(cfg, dict) else {}
    if not isinstance(fc_cfg, dict):
        fc_cfg = {}
    default = fc_cfg.get("default", {"mode": "improvement", "sigma_threshold": 2})
    errors = fc_cfg.get("errors", {}) if isinstance(fc_cfg.get("errors", {}), dict) else {}
    raw = errors.get(error_key, default)
    mode = str(raw.get("mode", default.get("mode", "improvement"))).lower().strip()
    try:
        sigma = float(raw.get("sigma_threshold", MODE_TO_SIGMA.get(mode, 2)))
    except Exception:
        sigma = float(MODE_TO_SIGMA.get(mode, 2))
    try:
        min_errors = int(raw.get("min_errors", default.get("min_errors", 3)))
    except Exception:
        min_errors = 3
    return {"mode": mode, "sigma_threshold": sigma, "min_errors": min_errors}


def _is_error_enabled(fc: str, error_key: str, _cfg_cache: dict | None = None) -> bool:
    cfg = _cfg_cache if _cfg_cache is not None else _load_json("quality_mode.json", {})
    fc_cfg = cfg.get(str(fc).upper(), {}) if isinstance(cfg, dict) else {}
    if not isinstance(fc_cfg, dict):
        return True
    errors = fc_cfg.get("errors", {})
    if not isinstance(errors, dict):
        return True
    error_cfg = errors.get(error_key, {})
    return error_cfg.get("enabled", True)


def _course_for_error(error_key: str) -> tuple[str, str]:
    cfg = _load_json("quality_courses.json", {})
    base = str(cfg.get("course_base", "https://dub.prod.cms.umbrella.amazon.dev/course/")).strip()
    errors = cfg.get("errors", {}) if isinstance(cfg.get("errors", {}), dict) else {}
    raw = errors.get(error_key)
    # Handle both formats: string UUID or dict {"uuid": "...", "enabled": true}
    if isinstance(raw, dict):
        uuid = str(raw.get("uuid", "") or "").strip()
    else:
        uuid = str(raw or cfg.get("default_course_uuid") or "").strip()
    return uuid, f"{base}{uuid}" if uuid else ""


def _find_latest_quality_csv() -> Path | None:
    patterns = [
        "Atlas_Quality*.csv", "atlas_quality*.csv", "Quality_Atlas*.csv",
        "Quality*.csv", "*Atlas*Quality*.csv",
    ]
    candidates: list[Path] = []
    for folder in [DOCUMENTS_QUALITY_DIR, OUTPUT_DIR]:
        for pat in patterns:
            candidates.extend(folder.glob(pat))
    candidates = [p for p in candidates if p.name != QUALITY_OUTPUT_NAME and p.exists()]
    if not candidates:
        return None
    return max(candidates, key=lambda p: p.stat().st_mtime)


def _fetch_weekly_atlas(fc: str, start_dt: datetime, end_dt: datetime) -> Path | None:
    """Fetch Atlas quality for the current week using the existing Atlas helper.

    The helper already contains the filtered Atlas logic used by the productivity
    dashboard. We save/copy the latest file into Documents/Quality TO.
    """
    if fetch_and_save_atlas_quality is None:
        log.info("atlas_quality helper not available; using latest local CSV")
        return _find_latest_quality_csv()
    try:
        cookie = get_cookie(aea=True, max_tries=4)
        before = set(DOCUMENTS_QUALITY_DIR.glob("*.csv")) | set(OUTPUT_DIR.glob("*.csv"))
        res = fetch_and_save_atlas_quality(fc, start_dt, end_dt, cookie=cookie, output_dir=DOCUMENTS_QUALITY_DIR)
        log.info("Atlas fetch result: {res}")
        after = set(DOCUMENTS_QUALITY_DIR.glob("*.csv")) | set(OUTPUT_DIR.glob("*.csv"))
        new_files = [p for p in after - before if p.exists() and p.suffix.lower() == ".csv"]
        if new_files:
            return max(new_files, key=lambda p: p.stat().st_mtime)
        return _find_latest_quality_csv()
    except Exception as e:
        log.info("Atlas fetch failed: {e}; using latest local CSV if available")
        return _find_latest_quality_csv()


def _load_quality_source(path: Path, fc: str) -> pd.DataFrame:
    df = _norm_cols(pd.read_csv(path, dtype=str))
    login_col = _find_col(df, LOGIN_CANDIDATES)
    err_col = _best_error_column(df, fc) or _find_col(df, ERROR_CANDIDATES)
    fc_col = _find_col(df, FC_CANDIDATES)
    proc_col = _find_col(df, PROCESS_CANDIDATES)
    count_col = _find_col(df, COUNT_CANDIDATES)
    log.info("login_col={login_col}, err_col={err_col}, count_col={count_col}")
    if not login_col or not err_col:
        raise RuntimeError(f"Quality source missing login/error columns. file={path.name}, columns={list(df.columns)}")

    out = pd.DataFrame()
    out["FC"] = df[fc_col].astype(str).str.strip().str.upper() if fc_col else str(fc).upper()
    out = out[out["FC"].eq(str(fc).upper())].copy()
    out["Login"] = df.loc[out.index, login_col].astype(str).str.strip().str.lower()
    out["Error Type"] = df.loc[out.index, err_col].astype(str).str.strip()
    out["ErrorKey"] = out["Error Type"].apply(normalize_error_key)

    # If the selected column was numeric/noisy, display the normalized configured key instead.
    # This prevents UI rows such as Error Type = "3".
    numeric_error = pd.to_numeric(out["Error Type"], errors="coerce").notna()
    out.loc[numeric_error, "Error Type"] = out.loc[numeric_error, "ErrorKey"].apply(display_error_name)
    out["Process"] = df.loc[out.index, proc_col].astype(str).str.strip() if proc_col else ""
    if count_col:
        out["_count"] = pd.to_numeric(df.loc[out.index, count_col], errors="coerce").fillna(1)
    else:
        out["_count"] = 1
    # Preserve MetricValue as DPMO and calculate Opportunities (volume/units processed)
    # Atlas MetricValue = DPMO. Opportunities = (Defects * 1,000,000) / DPMO
    metric_col = _find_col(df, ["MetricValue", "Metric Value", "metric_value"])
    if metric_col:
        dpmo_raw = pd.to_numeric(df.loc[out.index, metric_col], errors="coerce").fillna(0)
        defects = out["_count"].copy()
        # Opportunities = defects * 1M / DPMO (when DPMO > 0)
        out["_opportunities"] = (defects * 1_000_000 / dpmo_raw).where(dpmo_raw > 0, 0).round(0).fillna(0)
    else:
        # Fallback: check for explicit Opportunities column
        opp_col = _find_col(df, ["Opportunities", "opportunities"])
        if opp_col:
            out["_opportunities"] = pd.to_numeric(df.loc[out.index, opp_col], errors="coerce").fillna(0)
        else:
            out["_opportunities"] = 0
    out = out[(out["Login"].str.len() > 0) & (out["ErrorKey"].str.len() > 0)].copy()
    return out


def build_quality_dashboard(source_df: pd.DataFrame, fc: str, week_start: datetime, week_end: datetime, roster_df: pd.DataFrame | None = None) -> pd.DataFrame:
    """Build weekly Quality Coaching opportunities.

    Important rules:
    - Total Errors WK is aggregated by FC + Login + Error Type.
    - Site Avg / Site Std are calculated only on associates with >= 1 error.
    - Zeros are intentionally excluded because they distort low-frequency quality defects.
    - If std is too small, the raw threshold falls back to the positive population average.
    """
    empty_cols = [
        "FC", "Login", "Process", "Error Type", "ErrorKey", "Total Errors WK",
        "Opportunities", "DPMO_Target", "Target_Errors", "Pct_to_Target",
        "Site Avg", "Site Std", "Sigma", "Mode", "Sigma Threshold", "Threshold",
        "Present", "PunchType", "Coached", "Course UUID", "Course ID",
        "Transcript URL", "Photo URL", "Week Start", "Week End",
    ]

    if source_df is None or source_df.empty:
        return pd.DataFrame(columns=empty_cols)

    src = source_df.copy()
    src["_count"] = pd.to_numeric(src["_count"], errors="coerce").fillna(1.0)

    # Aggregate by associate + error type for the current week.
    # Process is descriptive only; it must not split the weekly count.
    grouped = (
        src.groupby(["FC", "Login", "Error Type", "ErrorKey"], dropna=False)
        .agg(
            **{
                "Total Errors WK": ("_count", "sum"),
                "Opportunities": ("_opportunities", "sum"),
                "Process": ("Process", lambda x: ", ".join(
                    sorted({
                        str(v).strip()
                        for v in x
                        if str(v).strip() and str(v).strip().lower() not in ("nan", "none")
                    })[:3]
                )),
            }
        )
        .reset_index()
    )

    grouped["Total Errors WK"] = (
        pd.to_numeric(grouped["Total Errors WK"], errors="coerce")
        .fillna(0)
        .astype(float)
    )

    # Calculate site stats by ErrorKey only using positive population.
    positive_population = grouped[grouped["Total Errors WK"] > 0].copy()

    if positive_population.empty:
        return pd.DataFrame(columns=empty_cols)

    stats = (
        positive_population
        .groupby(["FC", "ErrorKey"], dropna=False)["Total Errors WK"]
        .agg(
            **{
                "Site Avg": "mean",
                "Site Std": lambda x: x.std(ddof=0),
                "Population": "count",
                "Max Errors": "max",
            }
        )
        .reset_index()
    )

    stats["Site Avg"] = pd.to_numeric(stats["Site Avg"], errors="coerce").fillna(0.0)
    stats["Site Std"] = pd.to_numeric(stats["Site Std"], errors="coerce").fillna(0.0)

    out = grouped.merge(stats, on=["FC", "ErrorKey"], how="left")
    out["Site Avg"] = pd.to_numeric(out["Site Avg"], errors="coerce").fillna(0.0)
    out["Site Std"] = pd.to_numeric(out["Site Std"], errors="coerce").fillna(0.0)

    # Load quality_mode.json once — reused by _quality_mode_for and _is_error_enabled
    _qmode_cfg = _load_json("quality_mode.json", {})
    modes = out["ErrorKey"].apply(lambda k: _quality_mode_for(fc, k, _qmode_cfg))
    out["Mode"] = modes.apply(lambda x: x["mode"])
    out["Sigma Threshold"] = modes.apply(lambda x: float(x["sigma_threshold"]))
    out["Min Errors"] = modes.apply(lambda x: int(x["min_errors"]))

    # ─── Filter out disabled errors ────────────────────────────────────
    enabled_mask = out["ErrorKey"].apply(lambda k: _is_error_enabled(fc, k, _qmode_cfg))
    disabled_count = (~enabled_mask).sum()
    if disabled_count > 0:
        log.info(f"Quality filter: removing {disabled_count} rows of disabled error types")
    out = out[enabled_mask].copy()

    def _sigma(row) -> float:
        total = float(row.get("Total Errors WK", 0) or 0)
        avg = float(row.get("Site Avg", 0) or 0)
        std = float(row.get("Site Std", 0) or 0)

        if std <= 0.01:
            if avg <= 0:
                return 0.0
            return round(total / avg, 2)

        return round((total - avg) / std, 2)

    out["Sigma"] = out.apply(_sigma, axis=1)

    def _raw_threshold(row) -> float:
        avg = float(row.get("Site Avg", 0) or 0)
        std = float(row.get("Site Std", 0) or 0)
        sig = float(row.get("Sigma Threshold", 2) or 2)

        # If std is 0, the only stable cutoff is the positive-population average.
        if std <= 0.01:
            return max(1.0, avg)

        return avg + sig * std

    out["Threshold"] = out.apply(_raw_threshold, axis=1).round(2)

    # Debug summary per configured/error group
    try:
        dbg = (
            out.groupby(["ErrorKey", "Mode", "Sigma Threshold"], dropna=False)
            .agg(
                rows=("Login", "count"),
                avg=("Site Avg", "first"),
                std=("Site Std", "first"),
                threshold=("Threshold", "first"),
                max_errors=("Total Errors WK", "max"),
            )
            .reset_index()
            .sort_values(["max_errors", "rows"], ascending=[False, False])
            .head(20)
        )
        log.info("Error type stats:\n%s", dbg.to_string(index=False))
    except Exception as e:
        log.info("stats skipped: {e}")

    # ─── FALSE_PICK_SHORT: fixed threshold >= 5 (no sigma) ────────────
    fps_mask = out["ErrorKey"] == "FALSE_PICK_SHORT"
    fps_rows = out[fps_mask & (out["Total Errors WK"].astype(float) >= 5)].copy()

    # ─── All other errors: sigma-based threshold ──────────────────────
    other_rows = out[~fps_mask & (
        (out["Total Errors WK"].astype(float) >= out["Threshold"].astype(float)) &
        (out["Total Errors WK"].astype(float) >= out["Min Errors"].astype(float))
    )].copy()

    out = pd.concat([other_rows, fps_rows], ignore_index=True).sort_values(
        "Total Errors WK", ascending=False
    ).copy()

    # Course mapping
    courses = out["ErrorKey"].apply(_course_for_error)
    out["Course UUID"] = courses.apply(lambda x: x[0])
    out["Course ID"] = courses.apply(lambda x: x[1])

    # Presence: use pre-fetched roster_df from parallel pool (avoids a second SCC round-trip)
    presence = roster_df if (roster_df is not None and not roster_df.empty) else _fetch_punch_presence(fc)
    if not presence.empty:
        out = out.merge(presence[["Login", "PunchType", "Present"]], on="Login", how="left")
    else:
        out["PunchType"] = ""
        out["Present"] = False
    out["PunchType"] = out.get("PunchType", "").fillna("")
    out["Present"] = out.get("Present", False).fillna(False).astype(bool)

    # Coached placeholder for v1. Server/app can update this later from GC history.
    out["Coached"] = False

    out["Transcript URL"] = out["Login"].apply(
        lambda x: f"https://guided-coaching-dub.corp.amazon.com/#/employee-transcript/{str(x).strip()}"
    )
    out["Photo URL"] = out["Login"].apply(
        lambda x: f"https://badgephotos.amazon.com/?Region=Master&FullsizeImage=Yes&uid={str(x).strip()}"
    )

    out["Week Start"] = week_start.strftime("%Y-%m-%d")
    out["Week End"] = week_end.strftime("%Y-%m-%d %H:%M")

    # ─── DPMO Target Calculation ────────────────────────────────────────
    # Requires tenure hours data for curve/hours lookup
    try:
        from project_hermes.domains.tenure_hours import load_tenure_data, get_tenure_for, map_process
        tenure_df = load_tenure_data(fc)
        _tenure_ok = tenure_df is not None and not tenure_df.empty
    except Exception as e:
        log.info("DPMO: tenure data unavailable: %s", e)
        tenure_df = None
        _tenure_ok = False

    dpmo_targets_data = _load_dpmo_targets()
    dpmo_list, target_errors_list, pct_list = [], [], []
    curve_list, tenure_list, home_list = [], [], []

    for _, row in out.iterrows():
        error_key = str(row.get("ErrorKey", ""))
        login = str(row.get("Login", "")).strip()
        process_raw = str(row.get("Process", "")).strip()
        opportunities = float(row.get("Opportunities", 0) or 0)
        actual_errors = float(row.get("Total Errors WK", 0) or 0)

        # Determine curve and hours from tenure data
        curve, hours, home_process, tenure_wk = "NH", 0.0, "", 1
        if _tenure_ok:
            try:
                proc_mapped = map_process(process_raw) if process_raw else ""
                if proc_mapped:
                    info = get_tenure_for(tenure_df, login, proc_mapped)
                    curve = info.get("curve", "NH")
                    hours = info.get("hours", 0.0)
                    home_process = info.get("home_process", "")
                    tenure_wk = info.get("tenure", 1)
                    if curve == "VETERAN":
                        curve = "VETERAN"
                    elif curve == "XT":
                        curve = "XT"
                    elif curve == "NH" and info.get("home_process"):
                        curve = "XT_NH"
            except Exception:
                pass

        curve_list.append(curve)
        tenure_list.append(tenure_wk)
        home_list.append(home_process)

        dpmo = get_dpmo_target(fc, error_key, curve, hours)
        target_err = (dpmo * opportunities) / 1_000_000 if opportunities > 0 else 0
        pct = round((target_err / actual_errors) * 100, 1) if actual_errors > 0 else 999.0

        dpmo_list.append(dpmo)
        target_errors_list.append(round(target_err, 2))
        pct_list.append(pct)

    out["DPMO_Target"] = dpmo_list
    out["Target_Errors"] = target_errors_list
    out["Pct_to_Target"] = pct_list
    out["Curve"] = curve_list
    out["Tenure"] = tenure_list
    out["HomeProcess"] = home_list

    # ─── Cohort enrichment from Roster ──────────────────────────────────
    # Roster_SCC.csv has Login + Cohort. Merge to get cohort for each quality row.
    try:
        roster_path = OUTPUT_DIR / "Roster_SCC.csv"
        if roster_path.exists():
            roster_cohort = pd.read_csv(roster_path, usecols=lambda c: c in ["Login", "Cohort", "login", "cohort"], dtype=str)
            roster_cohort.columns = [c.title() if c.lower() in ("login", "cohort") else c for c in roster_cohort.columns]
            if "Login" in roster_cohort.columns and "Cohort" in roster_cohort.columns:
                roster_cohort["Login"] = roster_cohort["Login"].astype(str).str.strip().str.lower()
                roster_cohort["Cohort"] = roster_cohort["Cohort"].fillna("").astype(str).str.strip()
                roster_cohort = roster_cohort[roster_cohort["Cohort"].str.len() > 0].drop_duplicates("Login", keep="first")
                out["_login_lower"] = out["Login"].astype(str).str.strip().str.lower()
                cohort_map = dict(zip(roster_cohort["Login"], roster_cohort["Cohort"]))
                out["Cohort"] = out["_login_lower"].map(cohort_map).fillna("")
                out.drop(columns=["_login_lower"], inplace=True)
                log.info("Cohort enriched: %d/%d rows", (out["Cohort"].str.len() > 0).sum(), len(out))
            else:
                out["Cohort"] = ""
        else:
            out["Cohort"] = ""
    except Exception as e:
        log.warning("Cohort enrichment failed: %s", e)
        out["Cohort"] = ""

    ordered = [
        "FC", "Login", "Process", "Error Type", "ErrorKey", "Total Errors WK",
        "Opportunities", "Population", "DPMO_Target", "Target_Errors", "Pct_to_Target",
        "Site Avg", "Site Std", "Sigma", "Mode", "Sigma Threshold", "Threshold",
        "Max Errors", "Curve", "Tenure", "HomeProcess", "Cohort",
        "Present", "PunchType", "Coached",
        "Course UUID", "Course ID", "Transcript URL", "Photo URL",
        "Week Start", "Week End",
    ]
    out = out[[c for c in ordered if c in out.columns]].copy()

    out = out.sort_values(
        by=["Sigma", "Total Errors WK"],
        ascending=[False, False],
    ).reset_index(drop=True)

    return out

def run(fc: str = "BCN4", force_download: bool = True) -> Path:
    fc = (fc or "BCN4").strip().upper()
    week_start, week_end = current_sunday_to_now()
    log.info("=" * 70)
    log.info("QUALITY COACHING PIPELINE — {fc}")
    log.info("Window: {week_start} → {week_end} (max 7 days)")
    log.info("Documents output: {DOCUMENTS_QUALITY_DIR}")
    log.info("=" * 70)

    # ─── Parallel fetch: Atlas + Diver + Roster ─────────────────────────
    fps_df = None
    roster_df = None

    def _task_atlas():
        return _fetch_weekly_atlas(fc, week_start, week_end) if force_download else _find_latest_quality_csv()

    def _task_diver():
        if fetch_and_build_fps is None:
            return None
        start_str = week_start.strftime("%Y-%m-%d")
        end_str = week_end.strftime("%Y-%m-%d")
        return fetch_and_build_fps(fc, start_str, end_str, force_refresh=force_download)

    def _task_roster():
        return _fetch_punch_presence(fc)

    with concurrent.futures.ThreadPoolExecutor(max_workers=3) as pool:
        fut_atlas = pool.submit(_task_atlas)
        fut_diver = pool.submit(_task_diver)
        fut_roster = pool.submit(_task_roster)

        src_path = fut_atlas.result()
        try:
            fps_df = fut_diver.result()
        except Exception as e:
            log.warning("Diver FPS fetch failed (non-fatal): {e}")
        try:
            roster_df = fut_roster.result()
        except Exception as e:
            log.warning("Roster pre-fetch failed (non-fatal): {e}")

    if not src_path:
        raise FileNotFoundError("No Atlas Quality CSV found/generated.")

    # Keep a copy in Documents/Quality TO for audit/debug.
    if src_path.parent != DOCUMENTS_QUALITY_DIR:
        copy_path = DOCUMENTS_QUALITY_DIR / src_path.name
        try:
            shutil.copy2(src_path, copy_path)
            src_path = copy_path
        except Exception:
            pass

    log.info("Source: {src_path}")
    source_df = _load_quality_source(src_path, fc)
    log.info("Filtered source rows: {len(source_df)}")

    # ─── Merge Diver FPS if available ───────────────────────────────────
    if fps_df is not None and not fps_df.empty:
        log.info("Diver FPS rows: {len(fps_df)}")
        for col in source_df.columns:
            if col not in fps_df.columns:
                fps_df[col] = ""
        source_df = pd.concat([source_df, fps_df[source_df.columns]], ignore_index=True)
        log.info("Combined source rows: {len(source_df)}")

    quality_df = build_quality_dashboard(source_df, fc, week_start, week_end, roster_df=roster_df)
    log.info("Flagged rows: {len(quality_df)}")

    out_doc = DOCUMENTS_QUALITY_DIR / QUALITY_OUTPUT_NAME
    out_project = OUTPUT_DIR / QUALITY_OUTPUT_NAME
    quality_df.to_csv(out_doc, index=False, encoding="utf-8-sig")
    quality_df.to_csv(out_project, index=False, encoding="utf-8-sig")
    # Also save per-site file for multi-site merging
    quality_df.to_csv(OUTPUT_DIR / f"Quality_Coaching_{fc}.csv", index=False, encoding="utf-8-sig")
    log.info("Saved: {out_doc}")
    log.info("Saved: {out_project}")
    return out_project


def load_output(present_only: bool = False) -> pd.DataFrame:
    fp = OUTPUT_DIR / QUALITY_OUTPUT_NAME
    if not fp.exists():
        doc_fp = DOCUMENTS_QUALITY_DIR / QUALITY_OUTPUT_NAME
        if doc_fp.exists():
            fp = doc_fp
        else:
            return pd.DataFrame()
    df = pd.read_csv(fp)
    if present_only and "Present" in df.columns:
        df = df[df["Present"].astype(str).str.lower().isin(["true", "1", "yes"])]
    return df.reset_index(drop=True)


def load_output_multi(sites: list[str], present_only: bool = False) -> pd.DataFrame:
    """Load and merge quality output for multiple sites."""
    frames = []
    for fc in sites:
        fp = OUTPUT_DIR / f"Quality_Coaching_{fc.upper()}.csv"
        if fp.exists():
            try:
                frames.append(pd.read_csv(fp))
            except Exception:
                pass
    if not frames:
        return pd.DataFrame()
    df = pd.concat(frames, ignore_index=True)
    if present_only and "Present" in df.columns:
        df = df[df["Present"].astype(str).str.lower().isin(["true", "1", "yes"])]
    return df.reset_index(drop=True)


if __name__ == "__main__":
    run(input("FC (default BCN4): ").strip().upper() or "BCN4")
