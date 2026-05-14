from __future__ import annotations

import json
import math
import os
import re
import shutil
from dataclasses import dataclass
from datetime import datetime, timedelta, time
from pathlib import Path
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


def _quality_mode_for(fc: str, error_key: str) -> dict:
    cfg = _load_json("quality_mode.json", {})
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
    return {"mode": mode, "sigma_threshold": sigma}


def _course_for_error(error_key: str) -> tuple[str, str]:
    cfg = _load_json("quality_courses.json", {})
    base = str(cfg.get("course_base", "https://dub.prod.cms.umbrella.amazon.dev/course/")).strip()
    errors = cfg.get("errors", {}) if isinstance(cfg.get("errors", {}), dict) else {}
    uuid = str(errors.get(error_key) or cfg.get("default_course_uuid") or "").strip()
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
    out = out[(out["Login"].str.len() > 0) & (out["ErrorKey"].str.len() > 0)].copy()
    return out


def build_quality_dashboard(source_df: pd.DataFrame, fc: str, week_start: datetime, week_end: datetime) -> pd.DataFrame:
    """Build weekly Quality Coaching opportunities.

    Important rules:
    - Total Errors WK is aggregated by FC + Login + Error Type.
    - Site Avg / Site Std are calculated only on associates with >= 1 error.
    - Zeros are intentionally excluded because they distort low-frequency quality defects.
    - If std is too small, the raw threshold falls back to the positive population average.
    """
    empty_cols = [
        "FC", "Login", "Process", "Error Type", "ErrorKey", "Total Errors WK",
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

    modes = out["ErrorKey"].apply(lambda k: _quality_mode_for(fc, k))
    out["Mode"] = modes.apply(lambda x: x["mode"])
    out["Sigma Threshold"] = modes.apply(lambda x: float(x["sigma_threshold"]))

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
        out["Total Errors WK"].astype(float) >= out["Threshold"].astype(float)
    )].copy()

    out = pd.concat([other_rows, fps_rows], ignore_index=True).sort_values(
        "Total Errors WK", ascending=False
    ).copy()

    # Course mapping
    courses = out["ErrorKey"].apply(_course_for_error)
    out["Course UUID"] = courses.apply(lambda x: x[0])
    out["Course ID"] = courses.apply(lambda x: x[1])

    # Presence from Roster_SCC PunchType
    presence = _read_roster_presence(fc)
    if not presence.empty:
        out = out.merge(presence, on="Login", how="left")
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

    ordered = [
        "FC", "Login", "Process", "Error Type", "ErrorKey", "Total Errors WK",
        "Site Avg", "Site Std", "Sigma", "Mode", "Sigma Threshold", "Threshold",
        "Population", "Max Errors", "Present", "PunchType", "Coached",
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

    src_path = _fetch_weekly_atlas(fc, week_start, week_end) if force_download else _find_latest_quality_csv()
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

    # ─── False Pick Short from Diver QTS ────────────────────────────────
    if fetch_and_build_fps is not None:
        try:
            start_str = week_start.strftime("%Y-%m-%d")
            end_str = week_end.strftime("%Y-%m-%d")
            fps_df = fetch_and_build_fps(fc, start_str, end_str, force_refresh=force_download)
            if fps_df is not None and not fps_df.empty:
                log.info("Diver FPS rows: {len(fps_df)}")
                # Ensure same columns as source_df for concat
                for col in source_df.columns:
                    if col not in fps_df.columns:
                        fps_df[col] = ""
                source_df = pd.concat([source_df, fps_df[source_df.columns]], ignore_index=True)
                log.info("Combined source rows: {len(source_df)}")
        except Exception as e:
            log.info("Diver FPS fetch failed (non-fatal): {e}")

    quality_df = build_quality_dashboard(source_df, fc, week_start, week_end)
    log.info("Flagged rows: {len(quality_df)}")

    out_doc = DOCUMENTS_QUALITY_DIR / QUALITY_OUTPUT_NAME
    out_project = OUTPUT_DIR / QUALITY_OUTPUT_NAME
    quality_df.to_csv(out_doc, index=False, encoding="utf-8-sig")
    quality_df.to_csv(out_project, index=False, encoding="utf-8-sig")
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


if __name__ == "__main__":
    run(input("FC (default BCN4): ").strip().upper() or "BCN4")
