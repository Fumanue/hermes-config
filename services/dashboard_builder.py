# src/project_hermes/services/dashboard_builder.py
"""
Dashboard builder — Project Hermes v7d
(Roster + FCLM + Fast Starts + RoboScout + Guided Coaching + STOW Mix Share)

What this version fixes:
  - Rate still comes from FCLM Size=Total rows only.
  - STOW / QUANTITY_STOW Mix Share is calculated from FCLM_1002976 Size rows.
  - Existing comments are preserved: Fast Start, RoboScout, STOW GAP, DECANT UPT, QUANTITY_STOW UPA.

Required config files under config/hermes/:
  - fclm_mapping.json
  - guided_coaching.json
  - shift_config.json
  - custom_targets.json
"""

from __future__ import annotations

import json
import math
import re
from datetime import datetime
from pathlib import Path
from typing import Any, Dict, List

import pandas as pd

from project_hermes.config import get_paths
from project_hermes.domains.necro_targets import get_necro_targets, get_necro_targets_wk1
from project_hermes.domains.guided_coaching_history import fetch_guided_coaching_history
from project_hermes.domains.guided_coaching_index import build_guided_coaching_course_index
from project_hermes.domains.atlas_quality import quality_comments_for_dash
from project_hermes.core.logger import get_logger
from project_hermes.domains.exemptions import get_exempt_logins_for_process
log = get_logger(__name__)


log.info("🔥 DASHBOARD_BUILDER VERSION: hermes-v7h-decant-jph-each-fix")

# =========================================================
# Paths
# =========================================================
paths = get_paths()
ROOT_DIR = Path(getattr(paths, "root", Path.cwd()))
OUTPUT_DIR = Path(getattr(paths, "output", ROOT_DIR / "data" / "output"))
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

TENURE_CURVES_JSON = ROOT_DIR / "tenure_curves.json"
HERMES_CONFIG_DIR = ROOT_DIR / "config" / "hermes"
_WS_RE = re.compile(r"\s+")


# =========================================================
# Config loading
# =========================================================
def _load_json_direct(config_dir: Path, filename: str, defaults: dict) -> dict:
    fp = config_dir / filename
    if not fp.exists():
        log.info("⚠ Not found: {fp} — using defaults")
        return dict(defaults)
    try:
        data = json.loads(fp.read_text(encoding="utf-8"))
        merged = dict(defaults)
        merged.update(data)
        return merged
    except Exception as e:
        log.info("⚠ Failed to load {fp}: {e}")
        return dict(defaults)


def _load_json_raw(config_dir: Path, filename: str) -> dict:
    fp = config_dir / filename
    if not fp.exists():
        return {}
    try:
        return json.loads(fp.read_text(encoding="utf-8"))
    except Exception:
        return {}


DEFAULT_FCLM_MAPPING = {"role_map": {}, "role_fallback": {}, "station_overrides": []}
DEFAULT_GC_COURSES = {
    "course_base": "https://dub.prod.cms.umbrella.amazon.dev/course/",
    "transcript_base": "https://guided-coaching-dub.corp.amazon.com/#/employee-transcript/",
    "instance_base_url": "",
    "lookback_days": 7,
    "role_to_course_uuid": {},
    "station_course_key_overrides": [],
}
DEFAULT_CUSTOM_TARGETS = {
    "roboscout_checks": [],
    "pack_line_targets": [],
    "pack_applies_learning_curve": True,
    "upa_targets": {},
    "feature_flags": {},
}

DEFAULT_DOWNLOADER_SOURCES = {
    "icqa_process_ids": [],
    "icqa_rate_col_index": None,
}

_ALL_FCLM_CFG = _load_json_raw(HERMES_CONFIG_DIR, "fclm_mapping.json")
_ALL_CUSTOM_TARGETS = _load_json_raw(HERMES_CONFIG_DIR, "custom_targets.json")
_ALL_SHIFT_CONFIG = _load_json_raw(HERMES_CONFIG_DIR, "shift_config.json")
_ALL_PROCESS_MAPPING = _load_json_raw(HERMES_CONFIG_DIR, "process_mapping.json")
DOWNLOADER_SOURCES_CFG = _load_json_direct(HERMES_CONFIG_DIR, "downloader_sources.json", DEFAULT_DOWNLOADER_SOURCES)
GC_COURSE_CFG = _load_json_direct(HERMES_CONFIG_DIR, "guided_coaching.json", DEFAULT_GC_COURSES)


def _is_fc_keyed(d: dict) -> bool:
    if not isinstance(d, dict) or not d:
        return False
    first_key = next(iter(d), "")
    return len(str(first_key)) <= 6 and str(first_key).isalnum() and str(first_key).upper() == str(first_key)


def _get_fc_config(raw: dict, fc: str, defaults: dict) -> dict:
    if _is_fc_keyed(raw):
        data = raw.get(fc.upper()) or raw.get(next(iter(raw)), {})
    else:
        data = raw
    merged = dict(defaults)
    if isinstance(data, dict):
        merged.update(data)
    return merged


def _refresh_fc_configs(fc: str) -> None:
    """Refresh globals that can be FC keyed."""
    global FCLM_CFG, CUSTOM_TARGETS_CFG, SHIFT_CONFIG
    global ROLE_MAP, ROLE_FALLBACK, STATION_OVERRIDES
    global ROBOSCOUT_CHECKS, PACK_LINE_TARGETS, PACK_APPLIES_LC
    global UPA_TARGETS, GAP_THRESHOLDS
    global PACK_ROLES, FEATURE_FLAGS
    global IDLE_COMMENT_ENABLED, IDLE_COMMENT_THRESHOLD
    global ROLE_TO_PROCESS_ID
    FCLM_CFG = _get_fc_config(_ALL_FCLM_CFG, fc, DEFAULT_FCLM_MAPPING)
    CUSTOM_TARGETS_CFG = _get_fc_config(_ALL_CUSTOM_TARGETS, fc, DEFAULT_CUSTOM_TARGETS)
    SHIFT_CONFIG = _get_fc_config(_ALL_SHIFT_CONFIG, fc, {})

    ROLE_MAP = {str(k).upper(): v for k, v in (FCLM_CFG.get("role_map") or {}).items()}
    ROLE_FALLBACK = {str(k).upper(): v for k, v in (FCLM_CFG.get("role_fallback") or {}).items()}
    STATION_OVERRIDES = list(FCLM_CFG.get("station_overrides") or [])

    ROBOSCOUT_CHECKS = list(CUSTOM_TARGETS_CFG.get("roboscout_checks", []) or [])
    PACK_LINE_TARGETS = list(CUSTOM_TARGETS_CFG.get("pack_line_targets", []) or [])
    PACK_APPLIES_LC = bool(CUSTOM_TARGETS_CFG.get("pack_applies_learning_curve", True))

    FEATURE_FLAGS = CUSTOM_TARGETS_CFG.get("feature_flags", {}) or {}
    GAP_THRESHOLDS = {}
    for k, v in (CUSTOM_TARGETS_CFG.get("gap_thresholds", {}) or {}).items():
        try:
            GAP_THRESHOLDS[str(k).upper().strip()] = float(v)
        except Exception:
            pass

    IDLE_COMMENT_ENABLED = bool(FEATURE_FLAGS.get("idle_comment_enabled", False))
    try:
        IDLE_COMMENT_THRESHOLD = float(FEATURE_FLAGS.get("idle_comment_threshold", 10.0))
    except Exception:
        IDLE_COMMENT_THRESHOLD = 10.0

    raw_role_to_pid = _ALL_PROCESS_MAPPING.get("role_to_process_id", {}) if isinstance(_ALL_PROCESS_MAPPING, dict) else {}
    ROLE_TO_PROCESS_ID = {str(k).upper().strip(): str(v).strip() for k, v in raw_role_to_pid.items()}

    # supports both {"QUANTITY_STOW": 11} and [{"role":"QUANTITY_STOW","min_target":11}]
    UPA_TARGETS = {}
    raw_upa = CUSTOM_TARGETS_CFG.get("upa_targets", {}) or {}
    if isinstance(raw_upa, dict):
        for k, v in raw_upa.items():
            try:
                UPA_TARGETS[str(k).upper()] = float(v)
            except Exception:
                pass
    elif isinstance(raw_upa, list):
        for it in raw_upa:
            try:
                UPA_TARGETS[str(it.get("role", "")).upper()] = float(it.get("min_target"))
            except Exception:
                pass

    PACK_ROLES = set()
    for plt in PACK_LINE_TARGETS:
        r = str(plt.get("applies_to_role", "")).upper().strip()
        if r:
            PACK_ROLES.add(r)
    for rule in STATION_OVERRIDES:
        ro = str(rule.get("role_override", "")).upper().strip()
        if ro and any(ro == str(p.get("applies_to_role", "")).upper().strip() for p in PACK_LINE_TARGETS):
            PACK_ROLES.add(ro)


_refresh_fc_configs("BCN4")


def gap_threshold_for_role(role: str, default: float = 5.0) -> float:
    """Return GAP threshold from custom_targets.json for the current FC.

    Expected config:
      "gap_thresholds": {
        "STOW": 2.0,
        "QUANTITY_STOW": 2.0,
        "PICK_AR": 5.0,
        "P2R_PICK": 5.0,
        "DEFAULT": 5.0
      }
    """
    role_u = str(role or "").upper().strip()
    try:
        return float(GAP_THRESHOLDS.get(role_u, GAP_THRESHOLDS.get("DEFAULT", default)))
    except Exception:
        return float(default)

ICQA_PROCESS_IDS = {str(x).strip().replace(".0", "") for x in DOWNLOADER_SOURCES_CFG.get("icqa_process_ids", [])}
try:
    ICQA_RATE_COL_INDEX = DOWNLOADER_SOURCES_CFG.get("icqa_rate_col_index", None)
    ICQA_RATE_COL_INDEX = int(ICQA_RATE_COL_INDEX) if ICQA_RATE_COL_INDEX is not None else None
except Exception:
    ICQA_RATE_COL_INDEX = None

COURSE_BASE_URL = str(GC_COURSE_CFG.get("course_base") or DEFAULT_GC_COURSES["course_base"]).strip()
TRANSCRIPT_BASE_URL = str(GC_COURSE_CFG.get("transcript_base") or DEFAULT_GC_COURSES["transcript_base"]).strip()
INSTANCE_BASE_URL = str(GC_COURSE_CFG.get("instance_base_url") or "").strip()
ROLE_TO_COURSE_UUID = {
    str(k).upper(): str(v).strip().lower()
    for k, v in (GC_COURSE_CFG.get("role_to_course_uuid") or {}).items()
}
STATION_COURSE_KEY_OVERRIDES = list(GC_COURSE_CFG.get("station_course_key_overrides") or [])

# L&D conditional routing sets
_LD_PACK_SINGLES_ROLES = {"SM", "SMMIX", "SM2", "SNS1", "SNS2"}
_LD_AFE_P2R_PACK_ROLES = {"AFE_PACK", "P2R_PACK"}
_LD_STOW_ROLES = {"STOW", "QUANTITY_STOW"}
_LD_PICK_ROLES = {"PICK_AR", "P2R_PICK"}
_LD_DEPT_VARIANTS = {"L&D", "L AND D", "LND", "LD"}


# =========================================================
# Generic helpers
# =========================================================
def norm_cols(df: pd.DataFrame) -> pd.DataFrame:
    df = df.copy()
    df.columns = [_WS_RE.sub(" ", str(c).strip()) for c in df.columns]
    return df


def load_csv(name: str) -> pd.DataFrame:
    p = OUTPUT_DIR / name
    if not p.exists():
        raise FileNotFoundError(f"Missing file: {p}")
    try:
        return norm_cols(pd.read_csv(p))
    except UnicodeDecodeError:
        return norm_cols(pd.read_csv(p, encoding="latin-1"))


def try_load_csv(name: str) -> pd.DataFrame | None:
    p = OUTPUT_DIR / name
    if not p.exists():
        return None
    try:
        return load_csv(name)
    except Exception as e:
        log.info("⚠ Could not load {name}: {e}")
        return None


def normalize_employee_id(emp_id) -> str:
    if pd.isna(emp_id):
        return ""
    return _WS_RE.sub("", str(emp_id).strip().upper())


def extract_badge_number(emp_id) -> str:
    if pd.isna(emp_id):
        return ""
    return re.sub(r"[^0-9]", "", str(emp_id).strip())


def create_id_variants(emp_id) -> List[str]:
    if pd.isna(emp_id) or str(emp_id).strip() == "":
        return []
    base = str(emp_id).strip()
    digits = extract_badge_number(emp_id)
    variants: set[str] = {base, base.upper(), base.lower()}
    if digits:
        variants.update({digits, f"A{digits}", f"a{digits}"})
    if base and base[0].isalpha() and len(base) > 1:
        stripped = base[1:].strip()
        if stripped:
            variants.update({stripped, stripped.upper(), stripped.lower()})
    return [v for v in variants if v]


def norm_text(s: pd.Series) -> pd.Series:
    return s.astype(str).str.replace(r"\s+", " ", regex=True).str.strip()


def contains_ci(haystack: pd.Series, needle: str | None) -> pd.Series:
    if not needle:
        return pd.Series(True, index=haystack.index)
    return haystack.astype(str).str.upper().str.contains(str(needle).upper(), na=False)




def normalize_display_station(role: str, station: str) -> str:
    """Display-only station normalization.

    ICQA Simple Bin Count stations can arrive like k-A-04-4177.
    For the dashboard we only want the last 4 digits: 4177.
    No row filtering behavior is changed here.
    """
    st = str(station or "").strip()
    role_u = str(role or "").upper().strip()
    if role_u == "ICQA_SIMPLE_BIN_COUNT":
        m = re.search(r"(\d{4})\s*$", st)
        if m:
            return m.group(1)
    return st


def _station_last_number_parity_mask(stations: pd.Series, parity: str) -> pd.Series:
    s = stations.astype(str).str.upper().str.strip()
    last_num = s.str.extract(r"(\d+)(?!.*\d)", expand=False)
    nums = pd.to_numeric(last_num, errors="coerce")
    parity_u = str(parity or "").strip().lower()
    if parity_u == "even":
        return nums.notna() & ((nums.astype("Int64") % 2) == 0)
    if parity_u == "odd":
        return nums.notna() & ((nums.astype("Int64") % 2) == 1)
    return pd.Series(False, index=stations.index)


def _norm_employee_id_series(s: pd.Series) -> pd.Series:
    """Robust EmployeeId normalization for merges across Roster/FCLM/GCA exports."""
    return (
        s.astype(str)
        .str.replace(r"\.0$", "", regex=True)
        .str.replace(r"\s+", "", regex=True)
        .str.strip()
        .str.upper()
    )

def _is_ws_rcv_location_series(s: pd.Series) -> pd.Series:
    """Only real Decant receiving workstations are valid for DECANT location override."""
    return s.astype(str).str.strip().str.match(r"(?i)^ws-rcv-\d{2}-\d{2}$", na=False)


# =========================================================
# Guided Coaching helpers
# =========================================================
def _station_override_course_key(station: str) -> str:
    st = str(station or "").upper()
    for rule in STATION_COURSE_KEY_OVERRIDES:
        needle = str(rule.get("station_contains", "")).upper().strip()
        if needle and needle in st:
            return str(rule.get("course_key", "")).upper().strip()
    return ""


def resolve_course_uuid(role: str, station: str = "", dept: str = "") -> str:
    role_u = str(role or "").upper().strip()
    dept_u = str(dept or "").upper().strip()
    course_key = _station_override_course_key(station)
    if course_key:
        return ROLE_TO_COURSE_UUID.get(course_key.upper(), "")
    if dept_u in _LD_DEPT_VARIANTS:
        if role_u in _LD_PACK_SINGLES_ROLES:
            return ROLE_TO_COURSE_UUID.get("L&D_PACK_SINGLES", "") or ROLE_TO_COURSE_UUID.get("L&D_Pack_Singles", "")
        if role_u in _LD_AFE_P2R_PACK_ROLES:
            return ROLE_TO_COURSE_UUID.get("L&D_AFE_P2R_PACK", "")
        if role_u in _LD_STOW_ROLES:
            return ROLE_TO_COURSE_UUID.get("L&D_STOW", "")
        if role_u in _LD_PICK_ROLES:
            return ROLE_TO_COURSE_UUID.get("L&D_PICK", "")
    if role_u == "QUANTITY_STOW":
        role_u = "STOW"
    return ROLE_TO_COURSE_UUID.get(role_u, "")


def _build_gc_coached_column(dash: pd.DataFrame, fc: str) -> pd.Series:
    result = pd.Series("", index=dash.index, dtype=str)
    try:
        gc_payload = fetch_guided_coaching_history(fc, force_refresh=False)
        gc_index = build_guided_coaching_course_index(
            guided_history_payload=gc_payload,
            transcript_base_url=TRANSCRIPT_BASE_URL,
            instance_base_url=INSTANCE_BASE_URL,
        )
        log.info("Index built: {len(gc_index)} keys")
        if not gc_index:
            return result

        def _lookup(row) -> str:
            course_uuid = resolve_course_uuid(
                str(row.get("Role", "")).upper().strip(),
                station=str(row.get("Station", "")).strip(),
                dept=str(row.get("Dept", "")).strip(),
            )
            if not course_uuid:
                return ""
            all_v: list[str] = []
            all_v.extend(create_id_variants(str(row.get("EmployeeId", "")).strip()))
            all_v.extend(create_id_variants(str(row.get("Login", "")).strip()))
            digits = extract_badge_number(str(row.get("EmployeeId", "")))
            if digits:
                all_v.extend(create_id_variants(digits))
            seen: set[str] = set()
            for v in all_v:
                if v in seen:
                    continue
                seen.add(v)
                rec = gc_index.get((v, course_uuid))
                if rec:
                    url = str(rec.get("instance_url") or rec.get("url") or "").strip()
                    url = url.replace("#/coaching-instance/", "#/view-coaching-instance/")
                    days = int(rec.get("days_ago", 0) or 0)
                    if url:
                        sep = "&" if "?" in url else "?"
                        return f"{url}{sep}d={days}d"
            return ""

        return dash.apply(_lookup, axis=1).astype(str)
    except Exception as e:
        log.info("⚠ Could not build coached column: {e}")
        return result


# =========================================================
# FCLM helpers
# =========================================================
def _process_id_from_fclm_filename(file_name: str) -> str:
    m = re.search(r"FCLM[_-](\d+)", str(file_name or ""), flags=re.IGNORECASE)
    return m.group(1) if m else ""


def find_rate_col(df: pd.DataFrame, file_name: str = "") -> str:
    """Detect the FCLM rate column.

    Normal FCLM files usually expose a UPH column, but ICQA/Simple Bin Count
    uses a different rate position. The downloader config owns that exception:
      downloader_sources.json -> icqa_process_ids + icqa_rate_col_index

    This keeps the fix remote-configurable and avoids hardcoding SBC logic in
    the role mapping.
    """
    pid = _process_id_from_fclm_filename(file_name)

    if pid and pid in ICQA_PROCESS_IDS and ICQA_RATE_COL_INDEX is not None:
        idx = int(ICQA_RATE_COL_INDEX)
        if 0 <= idx < len(df.columns):
            forced = df.columns[idx]
            log.info("{file_name}: ICQA process {pid} -> using configured column index {idx}: '{forced}'")
            return forced
        log.warning(f"{file_name}: configured icqa_rate_col_index={idx} "
                    f"is out of range for {len(df.columns)} columns; falling back to auto-detect")

    for c in df.columns:
        if "UPH" in re.sub(r"[\s_]+", "", str(c).strip().upper()):
            log.info("{file_name}: auto-detected UPH column: '{c}'")
            return c

    if len(df.columns) >= 18:
        fallback = df.columns[17]
        log.info("{file_name}: fallback column index 17: '{fallback}'")
        return fallback

    raise RuntimeError(f"Could not detect rate column for {file_name}")


def prepare_fclm(df: pd.DataFrame, file_name: str) -> pd.DataFrame:
    df = norm_cols(df)
    for c in ["Employee Id", "Function Name"]:
        if c not in df.columns:
            raise RuntimeError(f"{file_name} missing column: {c}")
    rate_col = find_rate_col(df, file_name)
    df = df.copy()
    df["Employee Id"] = df["Employee Id"].apply(normalize_employee_id)
    df["Employee Id Digits"] = df["Employee Id"].apply(extract_badge_number)
    df["Function Name"] = norm_text(df["Function Name"])
    df[rate_col] = pd.to_numeric(df[rate_col], errors="coerce")
    df.attrs["rate_col"] = rate_col
    return df


def _size_total_filter(df: pd.DataFrame) -> pd.Series:
    if "Size" not in df.columns:
        return pd.Series(True, index=df.index)
    return df["Size"].astype(str).str.replace(r"\s+", " ", regex=True).str.strip().str.upper().str.startswith("TOTAL")


def rate_lookup(
    fdf: pd.DataFrame,
    function_contains: str | None,
    function_excludes: str | None = None,
    unit_type: str | None = None,
) -> pd.DataFrame:
    """Lookup rate by employee. If Size exists, rate is always taken from Size=Total only."""
    rate_col = fdf.attrs.get("rate_col")
    if not rate_col:
        raise RuntimeError("FCLM cache missing rate_col attr.")
    sub = fdf.copy()
    if function_contains:
        sub = sub[contains_ci(sub["Function Name"], function_contains)]
    if function_excludes:
        sub = sub[~contains_ci(sub["Function Name"], function_excludes)]
    if unit_type and "Unit Type" in sub.columns:
        sub = sub[sub["Unit Type"].astype(str).str.strip().str.upper() == unit_type.upper()]
    sub = sub[_size_total_filter(sub)]
    result = (
        sub.groupby("Employee Id", as_index=False)[rate_col]
        .max()
        .rename(columns={rate_col: "RATE_RAW"})
    )
    result["Employee Id Digits"] = result["Employee Id"].apply(extract_badge_number)
    return result


def _merge_rates(dash: pd.DataFrame, mask: pd.Series, rates: pd.DataFrame) -> pd.Series:
    tmp = dash.loc[mask, ["EmployeeId", "EmployeeId Digits"]].copy()
    tmp = tmp.merge(rates, left_on="EmployeeId", right_on="Employee Id", how="left")
    no_match = tmp["RATE_RAW"].isna()
    if no_match.any() and "Employee Id Digits" in rates.columns:
        rates_digits = rates[["Employee Id Digits", "RATE_RAW"]].drop_duplicates("Employee Id Digits")
        tmp2 = tmp.loc[no_match, ["EmployeeId Digits"]].merge(
            rates_digits.rename(columns={"RATE_RAW": "RATE_DIGITS"}),
            left_on="EmployeeId Digits",
            right_on="Employee Id Digits",
            how="left",
        )
        tmp.loc[no_match, "RATE_RAW"] = tmp2["RATE_DIGITS"].values
    return tmp["RATE_RAW"]


def upa_lookup(fdf: pd.DataFrame, function_contains: str) -> pd.DataFrame:
    """Compute UPA (Units/Jobs) per Employee Id for QUANTITY_STOW, using Size=Total only."""
    sub = fdf.copy()
    if function_contains:
        sub = sub[contains_ci(sub["Function Name"], function_contains)]
    sub = sub[_size_total_filter(sub)]
    for col in ["Units", "Jobs"]:
        if col not in sub.columns:
            return pd.DataFrame(columns=["Employee Id", "Employee Id Digits", "UPA"])
        sub[col] = pd.to_numeric(sub[col], errors="coerce")
    grp = sub.groupby("Employee Id", as_index=False).agg(Units=("Units", "sum"), Jobs=("Jobs", "sum"))
    grp["UPA"] = grp.apply(lambda r: round(r["Units"] / r["Jobs"], 1) if r["Jobs"] > 0 else None, axis=1)
    grp["Employee Id Digits"] = grp["Employee Id"].apply(extract_badge_number)
    return grp[["Employee Id", "Employee Id Digits", "UPA"]]


# =========================================================
# STOW Mix Share
# =========================================================
def build_stow_mix_share_map(fdf: pd.DataFrame) -> dict[str, str]:
    """
    Build per-employee STOW Mix Share using FCLM_1002976 Size rows.
    Rate remains from Size=Total; this helper reads Units by Size.
    """
    if fdf is None or fdf.empty:
        return {}
    needed = {"Employee Id", "Employee Id Digits", "Size", "Units"}
    if not needed.issubset(set(fdf.columns)):
        log.info("⚠ Missing columns. Need={needed}, have={list(fdf.columns)}")
        return {}

    df = fdf.copy()
    df["_size_norm"] = (
        df["Size"].astype(str)
        .str.replace(r"\s+", "", regex=True)
        .str.replace("-", "", regex=False)
        .str.replace("_", "", regex=False)
        .str.upper()
    )
    df["Units"] = pd.to_numeric(df["Units"], errors="coerce").fillna(0)
    valid = {"SMALL", "MEDIUM", "LARGE", "HEAVYBULKY", "TOTAL"}
    df = df[df["_size_norm"].isin(valid)].copy()
    if df.empty:
        return {}

    grp = (
        df.groupby(["Employee Id", "Employee Id Digits", "_size_norm"], dropna=False)["Units"]
        .sum()
        .reset_index()
    )
    piv = grp.pivot_table(
        index=["Employee Id", "Employee Id Digits"],
        columns="_size_norm",
        values="Units",
        aggfunc="sum",
        fill_value=0,
    ).reset_index()

    out: dict[str, str] = {}
    for _, row in piv.iterrows():
        total = float(row.get("TOTAL", 0) or 0)
        if total <= 0:
            total = sum(float(row.get(c, 0) or 0) for c in ["SMALL", "MEDIUM", "LARGE", "HEAVYBULKY"])
        if total <= 0:
            continue
        parts = []
        for label, col in [("Small", "SMALL"), ("Medium", "MEDIUM")]:
            units = float(row.get(col, 0) or 0)
            parts.append(f"{label} {round((units / total) * 100):.0f}%")
        comment = "🧩 Mix Share: " + ", ".join(parts)
        eid = str(row.get("Employee Id", "") or "").strip()
        digs = str(row.get("Employee Id Digits", "") or "").strip()
        if eid:
            out[eid] = comment
        if digs:
            out[digs] = comment
    return out


# =========================================================
# Targets / curves / sigma
# =========================================================
def load_curves(path: Path) -> dict:
    if not path.exists():
        raise FileNotFoundError(f"Missing tenure curves json: {path}")
    return json.loads(path.read_text(encoding="utf-8"))["curves"]


def get_factor(curves: dict, fc: str, role: str, wk: int) -> float:
    try:
        return float(curves[fc.upper()][role.upper()][str(wk)])
    except Exception:
        return 1.0


def role_to_target_key(role: str) -> str:
    r = str(role).upper().strip()
    if r in ("SM", "SM2", "SMMIX", "SNS1", "SNS2", "SINGLES", "WS_SLAM", "WS_VDF"):
        return "P2R_PACK"
    if r == "QUANTITY_STOW":
        return "STOW"
    return r


def coaching_priority(p: float) -> int:
    if p is None or pd.isna(p):
        return 0
    if p < 0.65:
        return 3
    if p < 0.80:
        return 2
    if p < 0.90:
        return 1
    return 0


ROLE_TO_MODE_GROUP: dict[str, str] = {
    "STOW": "STOW",
    "QUANTITY_STOW": "STOW",
    "DECANT": "DECANT",
    "PICK_AR": "PICK",
    "P2R_PICK": "PICK",
    "P2R_PACK": "PACK_MULTIS",
    "AFE_PACK": "PACK_MULTIS",
    "SM": "PACK_SINGLES",
    "SM2": "PACK_SINGLES",
    "SMMIX": "PACK_SINGLES",
    "SNS1": "PACK_SINGLES",
    "SNS2": "PACK_SINGLES",
    "SINGLES": "PACK_SINGLES",
    "WS_SLAM": "PACK_SINGLES",
    "WS_VDF": "PACK_SINGLES",
    "ICQA_SIMPLE_BIN_COUNT": "ICQA",
}
MIN_SIGMA_POPULATION = 5


def compute_sigma_priorities(dash: pd.DataFrame, mode_groups: dict) -> pd.DataFrame:
    dash = dash.copy()
    dash["SigmaLevel"] = 0
    dash["ModeGroup"] = dash["Role"].apply(lambda r: ROLE_TO_MODE_GROUP.get(str(r).strip().upper(), ""))
    dash["Mode"] = dash["ModeGroup"].apply(lambda g: mode_groups.get(g, {}).get("mode", 1) if g and g != "ICQA" else 0)
    dash["SigmaEligible"] = False

    pct_series = pd.to_numeric(dash["% to OP2"], errors="coerce")
    log.info("\n[SIGMA] pct valid: {pct_series.notna().sum()}/{len(pct_series)}")

    for group in sorted(dash["ModeGroup"].dropna().unique()):
        if not group:
            continue
        mask = dash["ModeGroup"] == group
        grp_pct = pct_series[mask].dropna()
        n = len(grp_pct)
        mode = int(mode_groups.get(group, {}).get("mode", 1)) if group != "ICQA" else None
        if n < MIN_SIGMA_POPULATION:
            log.info("{group}: n={n} < {MIN_SIGMA_POPULATION} — Sigma 0")
            continue
        mu = float(grp_pct.mean())
        std = float(grp_pct.std(ddof=1))
        if std < 0.01:
            log.info("{group}: σ≈0 — Sigma 0")
            continue
        t1, t2, t3 = mu - std, mu - 2 * std, mu - 3 * std
        log.info("{group} Mode {mode}: n={n}, μ={mu:.1f}, σ={std:.1f}")

        def _level(p):
            if pd.isna(p):
                return 0
            if p < t3:
                return 3
            if p < t2:
                return 2
            if p < t1:
                return 1
            return 0

        levels = pct_series[mask].apply(_level).astype(int)
        dash.loc[mask, "SigmaLevel"] = levels.values
        if mode is None:
            dash.loc[mask, "SigmaEligible"] = True
        elif mode == 3:
            dash.loc[mask, "SigmaEligible"] = levels.values >= 3
        elif mode == 2:
            dash.loc[mask, "SigmaEligible"] = levels.values >= 2
        else:
            dash.loc[mask, "SigmaEligible"] = levels.values >= 1

    dash["Sigma"] = dash.apply(lambda r: int(r["SigmaLevel"]) if r["SigmaEligible"] else 0, axis=1)
    log.info("✅ Total eligible: {(dash['Sigma'] > 0).sum()}/{len(dash)}")
    return dash


def resolve_pack_target(role: str, station: str) -> tuple[float, str]:
    role_u = str(role).upper().strip()
    station_u = str(station).upper().strip()
    for plt in PACK_LINE_TARGETS:
        applies_role = str(plt.get("applies_to_role", "")).upper().strip()
        if applies_role and applies_role != role_u:
            continue
        station_needle = str(plt.get("station_contains", "")).upper().strip()
        if station_needle and station_needle not in station_u:
            continue
        try:
            target = float(plt.get("target_uph", 0))
        except Exception:
            target = 0
        key = str(plt.get("key", ""))
        if target > 0:
            return target, key
    return float("nan"), ""


# =========================================================
# RoboScout / Fast Starts
# =========================================================
def _find_col_contains(df: pd.DataFrame, needle: str) -> str | None:
    needle_norm = re.sub(r"[\s_]+", "", str(needle).strip().upper())
    for c in df.columns:
        col_norm = re.sub(r"[\s_]+", "", str(c).strip().upper())
        if needle_norm and needle_norm in col_norm:
            return c
    return None


def load_roboscout_data() -> Dict[str, pd.DataFrame]:
    rs_data: Dict[str, pd.DataFrame] = {}
    files_needed: Dict[str, str] = {}
    for check in ROBOSCOUT_CHECKS:
        f = str(check.get("file", "")).strip()
        lc = str(check.get("login_column", "")).strip()
        if f:
            files_needed[f] = lc
    login_needles = ["LOGIN", "USER_ID", "USERID", "EMPLOYEE_LOGIN", "EMPLOYEE LOGIN", "XVALUE", "UID"]
    for f, config_login_col in files_needed.items():
        df = try_load_csv(f)
        if df is None:
            log.info("⚠ {f} not found")
            continue
        login_col = _find_col_contains(df, config_login_col) if config_login_col else None
        if not login_col:
            for needle in login_needles:
                login_col = _find_col_contains(df, needle)
                if login_col:
                    break
        if login_col:
            df["_rs_login"] = df[login_col].astype(str).str.strip().str.lower()
            rs_data[f] = df
            log.info("Loaded {f}: {len(df)} rows, login_col='{login_col}'")
        else:
            log.info("⚠ {f} — no login column found")
    return rs_data


def get_roboscout_comments(login: str, role: str, rs_data: Dict[str, pd.DataFrame]) -> List[str]:
    login_lower = str(login).strip().lower()
    role_upper = str(role).upper().strip()
    comments: List[str] = []
    for check in ROBOSCOUT_CHECKS:
        check_roles = [str(r).upper().strip() for r in check.get("roles", [])]
        if check_roles and role_upper not in check_roles and not (role_upper == "QUANTITY_STOW" and "STOW" in check_roles):
            continue
        file_name = str(check.get("file", "")).strip()
        if file_name not in rs_data:
            continue
        df = rs_data[file_name]
        match = df[df["_rs_login"] == login_lower]
        if match.empty:
            continue
        row = match.iloc[0]
        for metric in check.get("metrics", []):
            col = str(metric.get("column", "")).strip()
            label = str(metric.get("label", col))
            actual_col = _find_col_contains(df, col)
            if actual_col is None:
                continue
            try:
                val = float(str(row[actual_col]).replace(",", "."))
            except Exception:
                continue
            if pd.isna(val):
                continue
            min_t = metric.get("min_target")
            max_t = metric.get("max_target")
            flagged = False
            if min_t is not None and val < float(min_t):
                comments.append(f"📊 {label}: {val:.1f} (target ≥{float(min_t):.0f})")
                flagged = True
            if max_t is not None and val > float(max_t) and not flagged:
                comments.append(f"📊 {label}: {val:.1f} (target ≤{float(max_t):.0f})")
    return comments



def load_oowa_map() -> dict[str, float]:
    """Load OOWA dwell time from RoboScout_21628.csv / UDQ export."""
    candidates = [OUTPUT_DIR / "RoboScout_21628.csv"]
    candidates.extend(sorted(OUTPUT_DIR.glob("UDQ-*.csv")))
    candidates.extend(sorted(ROOT_DIR.glob("UDQ-*.csv")))
    path = next((p for p in candidates if p.exists()), None)
    if not path:
        log.info("⚠ RoboScout_21628.csv / UDQ export not found")
        return {}
    try:
        df = norm_cols(pd.read_csv(path))
    except Exception as e:
        log.info("⚠ Failed to read {path.name}: {e}")
        return {}
    login_col = _find_col_contains(df, "Created_By_User_Id") or _find_col_contains(df, "Created By User Id")
    dwell_col = _find_col_contains(df, "Dwell_Time") or _find_col_contains(df, "Dwell Time")
    if not login_col or not dwell_col:
        log.info("⚠ Missing columns in {path.name}; login_col={login_col}, dwell_col={dwell_col}")
        return {}
    tmp = df[[login_col, dwell_col]].copy()
    tmp["_login"] = tmp[login_col].astype(str).str.strip().str.lower()
    tmp["_dwell"] = pd.to_numeric(tmp[dwell_col], errors="coerce")
    tmp = tmp[(tmp["_login"].str.len() > 0) & tmp["_dwell"].notna()]
    grouped = tmp.groupby("_login")["_dwell"].sum()
    out = {str(k): round(float(v), 1) for k, v in grouped.items() if float(v) > 0}
    log.info("Loaded {path.name}: rows={len(df)}, logins={len(out)}")
    return out

def load_roboscout_stow(fc: str) -> tuple[set[str], dict[str, float]]:
    path = OUTPUT_DIR / f"RoboScout_Stow_{fc}.json"
    if not path.exists():
        log.info("⚠ {path.name} not found")
        return set(), {}
    try:
        rows = json.loads(path.read_text(encoding="utf-8"))
        if isinstance(rows, dict):
            rows = rows.get("data") or rows.get("results") or []
        qs_logins: set[str] = set()
        gap_map: dict[str, float] = {}
        for r in rows:
            login = str(r.get("Uid") or r.get("login") or "").strip().lower()
            if not login:
                continue
            mode = str(r.get("Operating_Mode") or "").strip()
            if "Stow Multi Template" in mode:
                qs_logins.add(login)
            gap_raw = r.get("Gap_Percentage_Last_Hour")
            try:
                gap = float(gap_raw) if gap_raw not in (None, "", "null") else None
            except Exception:
                gap = None
            if gap is not None:
                gap_map[login] = round(gap, 1)
        log.info("{path.name}: rows={len(rows)}, QS={len(qs_logins)}, gap={len(gap_map)}")
        return qs_logins, gap_map
    except Exception as e:
        log.info("⚠ Load failed: {e}")
        return set(), {}



# =========================================================
# Process Inspector / IDLE helpers
# =========================================================
def find_process_inspector_csv(process_id: str) -> Path | None:
    pid = str(process_id or "").strip().replace(".0", "")
    if not pid:
        return None
    patterns = [
        f"ProcessInspector_{pid}_*.csv",
        f"ProcessInspector_{pid}.csv",
        f"*{pid}*.csv",
    ]
    for pattern in patterns:
        matches = sorted(OUTPUT_DIR.glob(pattern))
        for m in matches:
            if "ProcessInspector" in m.name:
                return m
    return None


def load_process_inspector_data() -> dict[str, pd.DataFrame]:
    """Load Process Inspector files used to compute %IDLE/%Unproductive."""
    pi_data: dict[str, pd.DataFrame] = {}
    pids = sorted({str(v).strip().replace(".0", "") for v in ROLE_TO_PROCESS_ID.values() if str(v).strip()})
    for pid in pids:
        csv_path = find_process_inspector_csv(pid)
        if csv_path is None or not csv_path.exists():
            log.info("⚠ Process Inspector {pid} not found")
            continue
        try:
            df = norm_cols(pd.read_csv(csv_path))
        except Exception as e:
            log.info("⚠ Could not read {csv_path.name}: {e}")
            continue
        if "Employee Id" not in df.columns:
            log.info("⚠ {csv_path.name} missing Employee Id")
            continue
        df = df.copy()
        df["Employee Id"] = df["Employee Id"].apply(normalize_employee_id)
        df["Employee Id Digits"] = df["Employee Id"].apply(extract_badge_number)
        for col in ["Hours (Direct)", "Hours (Inferred)", "Hours (Total)"]:
            if col not in df.columns:
                df[col] = 0.0
            df[col] = pd.to_numeric(df[col], errors="coerce").fillna(0.0)
        pi_data[pid] = df[["Employee Id", "Employee Id Digits", "Hours (Direct)", "Hours (Inferred)", "Hours (Total)"]].copy()
        log.info("✓ {pid}: {len(pi_data[pid])} rows from {csv_path.name}")
    return pi_data


def find_employee_in_pi(df: pd.DataFrame, employee_id: str, employee_digits: str = "") -> pd.DataFrame:
    if df is None or df.empty:
        return pd.DataFrame()
    eid = normalize_employee_id(employee_id)
    digs = str(employee_digits or extract_badge_number(employee_id) or "").strip()
    match = df[df["Employee Id"] == eid]
    if match.empty and digs and "Employee Id Digits" in df.columns:
        match = df[df["Employee Id Digits"].astype(str).str.strip() == digs]
    return match


def compute_idle_pct_for_row(row, pi_data: dict[str, pd.DataFrame]) -> float | None:
    pid = str(row.get("ProcessId", "") or "").replace(".0", "").strip()
    if not pid:
        role = str(row.get("Role", "") or "").upper().strip()
        pid = ROLE_TO_PROCESS_ID.get(role, "")
    if not pid or pid not in pi_data:
        return None
    match = find_employee_in_pi(pi_data[pid], str(row.get("EmployeeId", "")), str(row.get("EmployeeId Digits", "")))
    if match.empty:
        return None
    r = match.iloc[0]
    total = float(r.get("Hours (Total)", 0) or 0)
    if total <= 0:
        return None
    inferred = float(r.get("Hours (Inferred)", 0) or 0)
    return round((inferred / total) * 100.0, 1)

def _compute_shift_name(segment_start_min: float) -> str:
    try:
        m = float(segment_start_min)
    except Exception:
        return "Day"
    if 360 <= m < 840:
        return "Day"
    if 840 <= m < 1320:
        return "Evening"
    return "Night"


def _compute_half(segment_start_min: float, main_process: str) -> str:
    try:
        seg_min = float(segment_start_min)
    except Exception:
        return "H1"
    mp = str(main_process or "").strip().lower()
    dept = "Inbound" if ("inbound" in mp or "receive" in mp or "stow" in mp) else SHIFT_CONFIG.get("default_department", "Outbound")
    for _, boundaries in SHIFT_CONFIG.get(dept, {}).items():
        if not isinstance(boundaries, dict):
            continue
        h1s, h1e = boundaries.get("H1_start", 0), boundaries.get("H1_end", 0)
        h2s, h2e = boundaries.get("H2_start", 0), boundaries.get("H2_end", 0)
        if h1s > h1e:
            if seg_min >= h1s or seg_min < h1e:
                return "H1"
        elif h1s <= seg_min < h1e:
            return "H1"
        if h2s > h2e:
            if seg_min >= h2s or seg_min < h2e:
                return "H2"
        elif h2s <= seg_min < h2e:
            return "H2"
    return "H1"


def find_fast_starts_csv(fc: str) -> Path | None:
    today = datetime.now().strftime("%Y-%m-%d")
    exact = OUTPUT_DIR / f"FastStarts_{fc}_{today}.csv"
    if exact.exists():
        return exact
    for f in OUTPUT_DIR.glob(f"FastStarts_{fc}_*.csv"):
        return f
    for f in OUTPUT_DIR.glob("FastStarts_*.csv"):
        return f
    return None


def load_fast_starts_data(fc: str) -> pd.DataFrame | None:
    csv_path = find_fast_starts_csv(fc)
    if csv_path is None:
        log.info("⚠ No fast starts CSV found")
        return None
    df = norm_cols(pd.read_csv(csv_path))
    if "Employee Login" not in df.columns or "On Target" not in df.columns:
        log.info("⚠ Missing columns. Have: {list(df.columns)}")
        return None
    df["Employee Login"] = df["Employee Login"].astype(str).str.strip().str.lower()
    if "Duration (min)" in df.columns:
        df["Duration (min)"] = pd.to_numeric(df["Duration (min)"], errors="coerce")
    elif "Duration (sec)" in df.columns:
        df["Duration (min)"] = pd.to_numeric(df["Duration (sec)"], errors="coerce") / 60.0
    else:
        df["Duration (min)"] = pd.NA
    if "Half" not in df.columns:
        if "Segment Start (min)" in df.columns:
            mp_col = "Main Process" if "Main Process" in df.columns else None
            df["Half"] = df.apply(lambda r: _compute_half(r["Segment Start (min)"], r[mp_col] if mp_col else ""), axis=1)
        else:
            df["Half"] = "H1"
    if "Shift" not in df.columns:
        df["Shift"] = df["Segment Start (min)"].apply(_compute_shift_name) if "Segment Start (min)" in df.columns else "Day"
    log.info("✓ Ready: {len(df)} rows, H1={(df['Half'] == 'H1').sum()}, H2={(df['Half'] == 'H2').sum()}")
    return df


def get_fast_start_for_employee(fs_df: pd.DataFrame | None, login: str, half: str) -> dict | None:
    if fs_df is None or fs_df.empty:
        return None
    mask = (fs_df["Employee Login"] == str(login).strip().lower()) & (fs_df["Half"].astype(str).str.upper() == half.upper())
    matches = fs_df[mask]
    if matches.empty:
        return None
    row = matches.iloc[0]
    return {"duration_min": row.get("Duration (min)", pd.NA), "on_target": str(row["On Target"]).strip().upper() == "YES"}


# =========================================================
# Comments builder
# =========================================================
def build_comments(
    h1_data: dict | None,
    h2_data: dict | None,
    roboscout_comments: List[str] | None = None,
    upt: float | None = None,
    gap_pct: float | None = None,
    gap_threshold: float | None = None,
    upa_val: float | None = None,
    mix_share: str | None = None,
    oowa_min: float | None = None,
    idle_pct: float | None = None,
    idle_comment_enabled: bool = False,
    idle_threshold: float = 10.0,
) -> str:
    comments: List[str] = []
    for label, data in [("H1", h1_data), ("H2", h2_data)]:
        if data is not None and not data.get("on_target", True):
            dur = data.get("duration_min")
            if dur is not None and pd.notna(dur):
                comments.append(f"⚠️ {label}: {float(dur):.1f} min (off target)")
            else:
                comments.append(f"⚠️ {label}: off target")

    if roboscout_comments:
        comments.extend(roboscout_comments)
    if gap_pct is not None and gap_pct == gap_pct:
        if gap_threshold is not None and gap_threshold == gap_threshold:
            comments.append(f"⏳ Gap: {gap_pct:.1f}% (threshold ≥{float(gap_threshold):.1f}%)")
        else:
            comments.append(f"⏳ Gap: {gap_pct:.1f}%")
    if upa_val is not None and upa_val == upa_val:
        upa_tgt = UPA_TARGETS.get("QUANTITY_STOW")
        tgt_str = f" (target ≥{upa_tgt:.1f})" if upa_tgt else ""
        comments.append(f"📦 UPA: {upa_val:.1f}{tgt_str}")
    if mix_share:
        comments.append(str(mix_share))
    if oowa_min is not None and oowa_min == oowa_min:
        comments.append(f"🟣 OOWA: {float(oowa_min):.1f} min")
    if idle_comment_enabled and idle_pct is not None and idle_pct == idle_pct:
        try:
            idle_v = float(idle_pct)
            if idle_v >= float(idle_threshold):
                comments.append(f"🕒 IDLE: {idle_v:.1f}%")
        except Exception:
            pass
    return "; ".join(comments)


# =========================================================
# Main builder
# =========================================================
def _load_roster(fc: str) -> pd.DataFrame:
    roster = load_csv("Roster_SCC.csv")
    needed = ["EmployeeId", "Login", "CurrentStationId", "DetectedRole", "TenureInDays"]
    for c in needed:
        if c not in roster.columns:
            raise RuntimeError(f"Roster_SCC.csv missing column: {c}")
    roster = roster.copy()
    roster["EmployeeId"] = roster["EmployeeId"].fillna("").astype(str).str.strip().str.upper().str.replace(r"\s+", "", regex=True)
    roster["EmployeeId Digits"] = roster["EmployeeId"].str.replace(r"[^0-9]", "", regex=True)
    roster["Login"] = norm_text(roster["Login"])
    roster["Station"] = norm_text(roster["CurrentStationId"])
    roster["Role"] = norm_text(roster["DetectedRole"]).str.upper()
    roster["TenureInDays"] = pd.to_numeric(roster["TenureInDays"], errors="coerce")

    # ─── Hours-based tenure (replaces old day-based system) ────────────
    try:
        from project_hermes.domains.tenure_hours import load_tenure_data, map_process
        tenure_df = load_tenure_data(fc)
        # Build lookup: (login, main_process) → {tenure, curve, home_process}
        tenure_lookup = {}
        # Also build per-login best process (highest hours) for fallback
        login_best = {}  # login → {tenure, curve, home_process} of their top process
        for _, tr in tenure_df.iterrows():
            tenure_lookup[(str(tr["login"]).lower(), tr["main_process"])] = {
                "tenure": int(tr["tenure"]),
                "curve": str(tr["curve"]),
                "home_process": str(tr.get("home_process", "")),
            }

        # Build login_best: for each login, pick the entry with most hours (highest tenure)
        for _, tr in tenure_df.iterrows():
            login_key = str(tr["login"]).lower()
            entry = {
                "tenure": int(tr["tenure"]),
                "curve": str(tr["curve"]),
                "home_process": str(tr.get("home_process", "")),
            }
            if login_key not in login_best or entry["tenure"] > login_best[login_key]["tenure"]:
                login_best[login_key] = entry

        def _resolve_tenure(row):
            login = str(row.get("Login", "")).strip().lower()
            role = str(row.get("Role", "")).strip().upper()
            proc = map_process(role)
            info = tenure_lookup.get((login, proc))
            if info is None:
                # Fallback: use best process for this login (handles NaN/unknown roles)
                info = login_best.get(login, {"tenure": 1, "curve": "NH", "home_process": ""})
            return pd.Series(info)

        tenure_cols = roster.apply(_resolve_tenure, axis=1)
        roster["TenureWk"] = tenure_cols["tenure"].clip(1, 99).astype(int)
        roster["Curve"] = tenure_cols["curve"]
        roster["HomeProcess"] = tenure_cols["home_process"]
        roster["NH_Flag"] = tenure_cols.apply(
            lambda r: "" if r["curve"] == "VETERAN" else f"{r['curve']} T{r['tenure']}" + (f" ({r['home_process']})" if r["curve"] == "XT" and r["home_process"] else ""),
            axis=1
        )
        roster["Dept"] = roster["Curve"].apply(lambda c: "Ops" if c == "VETERAN" else "L&D")
        log.info("Hours-based tenure applied: {tenure_cols['curve'].value_counts().to_dict()}")
    except Exception as e:
        log.info("Hours-based tenure failed, falling back to days: {e}")
        import numpy as _np
        tw = _np.ceil(roster["TenureInDays"].fillna(7).values / 7.0).clip(1, 10).astype(int)
        roster["TenureWk"] = tw
        days = roster["TenureInDays"]
        roster["NH_Flag"] = ""
        roster.loc[(days >= 0) & (days <= 14), "NH_Flag"] = "NH 1-2"
        roster.loc[(days > 14) & (days <= 28), "NH_Flag"] = "NH 3-4"
        roster["Dept"] = pd.array(["L&D" if str(x).strip() else "Ops" for x in roster["NH_Flag"]])

    if "Cohort" not in roster.columns:
        roster["Cohort"] = ""
    roster["Cohort"] = norm_text(roster["Cohort"])
    roster["FC"] = fc
    roster = roster[roster["Login"].astype(str).str.strip().str.lower().ne("nan")]
    roster = roster[roster["Login"].astype(str).str.strip().str.len() > 0]
    return roster


def _load_fclm_cache() -> Dict[str, pd.DataFrame]:
    all_files: set[str] = set()
    for cfg in ROLE_MAP.values():
        if isinstance(cfg, dict):
            all_files.add(str(cfg.get("file", "")))
    for o in STATION_OVERRIDES:
        all_files.add(str(o.get("file", "")))
    for fb in ROLE_FALLBACK.values():
        if isinstance(fb, dict):
            all_files.add(str(fb.get("file", "")))
    all_files.discard("")
    fclm_cache: Dict[str, pd.DataFrame] = {}
    for f in sorted(all_files):
        p = OUTPUT_DIR / f
        if p.exists():
            fclm_cache[f] = prepare_fclm(load_csv(f), f)
            log.info("Loaded {f}: {len(fclm_cache[f])} rows")
        else:
            log.info("⚠ Missing {f}")
    return fclm_cache


def _station_override_rules_with_decant_fallback() -> list[dict]:
    """Return station override rules and add a safe DECANT fallback if config missed it."""
    rules = list(STATION_OVERRIDES or [])
    has_decant_source = any(
        str(r.get("employee_id_source", "")).strip().lower() == "decant_locations_1003019.csv"
        for r in rules
        if isinstance(r, dict)
    )
    if not has_decant_source and (OUTPUT_DIR / "Decant_Locations_1003019.csv").exists():
        rules.append({
            "employee_id_source": "Decant_Locations_1003019.csv",
            "file": "FCLM_1003019.csv",
            "function_contains": "Decant",
            "unit_type": "EACH",
            "role_override": "DECANT",
            "process_id": "1003019",
        })
        log.info("Auto-added DECANT fallback rule from Decant_Locations_1003019.csv")
    return rules


def decant_rate_lookup(fdf: pd.DataFrame, function_contains: str | None = "Decant") -> pd.DataFrame:
    """Return DECANT rate by Employee Id using UPH from FCLM_1003019.csv (Unit Type = Case).

    DECANT uses Unit Type = Case + Size = Total. Rate = UPH column.
    """
    return rate_lookup(fdf, function_contains, None, "CASE")


def _apply_station_overrides(dash: pd.DataFrame, fclm_cache: Dict[str, pd.DataFrame]) -> pd.Series:
    """Apply station-based and GCA-location-based role overrides.

    DECANT flow:
      FCLM_1003019.csv -> downloader calls GCA LastSeenLocation by EmployeeId ->
      Decant_Locations_1003019.csv -> builder matches by EmployeeId only.

    DECANT flow:
      - Decant_Locations_1003019.csv column A EmployeeId is the lookup key.
      - Decant_Locations_1003019.csv column B/Name is the Function Name; keep Name = Decant.
      - Station becomes the GCA Location if available.
      - Role becomes DECANT.
      - Rate comes from FCLM_1003019.csv UPH where Function Name = Decant and Unit Type = Case.

    UPT removed (no longer used for Decant).
    """
    processed_mask = pd.Series(False, index=dash.index)

    if "_EmployeeIdNorm" not in dash.columns:
        dash["_EmployeeIdNorm"] = _norm_employee_id_series(dash["EmployeeId"])

    for rule in _station_override_rules_with_decant_fallback():
        station_contains = str(rule.get("station_contains", "")).upper().strip()
        emp_id_source = str(rule.get("employee_id_source", "")).strip()
        is_decant_location_source = emp_id_source.lower() == "decant_locations_1003019.csv"

        if station_contains:
            mask = dash["Station"].astype(str).str.upper().str.contains(station_contains, na=False)
            if bool(rule.get("station_parity_mode", False)):
                mask &= _station_last_number_parity_mask(dash["Station"], str(rule.get("station_parity", "")))
            mask &= ~processed_mask

        elif emp_id_source:
            loc_path = OUTPUT_DIR / emp_id_source
            if not loc_path.exists():
                log.info("⚠ employee_id_source not found: {emp_id_source}")
                continue

            src_df = norm_cols(pd.read_csv(loc_path, dtype=str)).copy()
            id_col = next((c for c in src_df.columns if re.sub(r"[\s_]+", "", c.lower()) in {"employeeid", "employee"}), None)
            if not id_col:
                id_col = next((c for c in src_df.columns if "employee" in c.lower() and "id" in c.lower()), None)
            loc_col = next((c for c in src_df.columns if re.sub(r"[\s_]+", "", c.lower()) in {"location", "locationid"}), None)

            if not id_col:
                log.info("⚠ No EmployeeId column in {emp_id_source}. Columns={list(src_df.columns)}")
                continue

            src_df["_EmployeeIdNorm"] = _norm_employee_id_series(src_df[id_col])

            # DECANT location source note:
            # Decant_Locations_1003019.csv is generated from FCLM_1003019 + GCA.
            # Column A EmployeeId is the real lookup key.
            # Column B is NOT a login; it is the FCLM Function Name and should be named Name.
            # We only want Function Name = Decant rows for DECANT assignment.
            if is_decant_location_source:
                fn_col = None
                for cand in ["Name", "Function Name", "FunctionName", "Login"]:
                    if cand in src_df.columns:
                        fn_col = cand
                        break
                if fn_col:
                    fn_norm = src_df[fn_col].astype(str).str.replace(r"\s+", " ", regex=True).str.strip().str.upper()
                    decant_mask = fn_norm.eq("DECANT") | fn_norm.str.contains(r"\bDECANT\b", na=False)
                    before_fn = len(src_df)
                    if decant_mask.any():
                        src_df = src_df[decant_mask].copy()
                        log.info("{emp_id_source}: Function column '{fn_col}' kept DECANT {len(src_df)}/{before_fn} rows")
                    else:
                        log.warning(
                            f"{emp_id_source}: Function column '{fn_col}' has no DECANT rows. "
                            "Keeping rows for backwards compatibility, but rerun downloader.py to regenerate Name=Decant."
                        )
                else:
                    log.info("⚠ {emp_id_source}: no Name/Function Name column found; using EmployeeId + Location only")

            loc_pattern = str(rule.get("location_pattern", "") or "").strip()
            # For Decant_Locations_1003019.csv, Location can be a numeric GCA location id
            # (for example 4300016857). DECANT assignment must depend on Name == Decant,
            # not on ws-rcv location text. Therefore we intentionally ignore location_pattern
            # for this source unless you build a different source later.
            if is_decant_location_source:
                loc_pattern = ""

            if loc_pattern and loc_col:
                before = len(src_df)
                src_df = src_df[src_df[loc_col].astype(str).str.strip().str.match(loc_pattern, na=False)].copy()
                log.info("{emp_id_source}: location_pattern kept {len(src_df)}/{before} rows")

            src_df = src_df[src_df["_EmployeeIdNorm"].astype(str).str.len() > 0].copy()
            src_df = src_df.drop_duplicates("_EmployeeIdNorm", keep="first")
            ids = set(src_df["_EmployeeIdNorm"].astype(str))

            mask = dash["_EmployeeIdNorm"].astype(str).isin(ids) & ~processed_mask
            log.info(f"{emp_id_source}: source ids={len(ids)}, "
                     f"roster matches={int(mask.sum())}, key=EmployeeId")

            if loc_col and mask.any():
                loc_map = dict(zip(src_df["_EmployeeIdNorm"], src_df[loc_col].astype(str).str.strip()))
                dash.loc[mask, "Station"] = dash.loc[mask, "_EmployeeIdNorm"].map(loc_map).fillna(dash.loc[mask, "Station"])
        else:
            continue

        if not mask.any():
            continue

        file_name = str(rule.get("file", "") or "").strip()
        function_contains = str(rule.get("function_contains", "") or "").strip()
        function_excludes = str(rule.get("function_excludes", "") or "").strip() or None
        unit_type = str(rule.get("unit_type", "") or "").strip() or None

        if is_decant_location_source:
            file_name = file_name or "FCLM_1003019.csv"
            function_contains = function_contains or "Decant"
            unit_type = "EACH"

        if file_name not in fclm_cache:
            log.info("⚠ {station_contains or emp_id_source}: FCLM source not loaded: {file_name}")
            continue

        if is_decant_location_source:
            rates = decant_rate_lookup(fclm_cache[file_name], function_contains)
        else:
            rates = rate_lookup(fclm_cache[file_name], function_contains, function_excludes, unit_type)
        rates = rates.copy()
        rates["_EmployeeIdNorm"] = _norm_employee_id_series(rates["Employee Id"])

        # Use the same normalized EmployeeId key for DECANT, avoiding Login entirely.
        tmp = dash.loc[mask, ["_EmployeeIdNorm"]].copy().reset_index()
        tmp = tmp.merge(rates[["_EmployeeIdNorm", "RATE_RAW"]], on="_EmployeeIdNorm", how="left")
        matched_rate = int(tmp["RATE_RAW"].notna().sum())
        dash.loc[tmp["index"], "Rate"] = tmp["RATE_RAW"].values

        role_override = str(rule.get("role_override", "") or "").upper().strip()
        if is_decant_location_source and not role_override:
            role_override = "DECANT"
        if role_override:
            dash.loc[mask, "Role"] = role_override

        process_id = str(rule.get("process_id", "") or "").strip()
        if is_decant_location_source and not process_id:
            process_id = "1003019"
        if process_id:
            dash.loc[mask, "ProcessId"] = process_id

        processed_mask |= mask
        log.info(f"✓ {role_override or station_contains or emp_id_source}: "
                 f"rows={int(mask.sum())}, rate_matches={matched_rate} | "
                 f"file={file_name} | function='{function_contains}' | unit_type='{unit_type or ''}'")

        if is_decant_location_source:
            preview_cols = ["Login", "EmployeeId", "Station", "Rate"]
            preview_cols = [c for c in preview_cols if c in dash.columns]
            log.debug("DECANT preview:\n%s", dash.loc[mask, preview_cols].head(10).to_string(index=False))

    return processed_mask


def _apply_role_rates(dash: pd.DataFrame, fclm_cache: Dict[str, pd.DataFrame]) -> None:
    for role, cfg in ROLE_MAP.items():
        if not isinstance(cfg, dict):
            continue
        file_name = str(cfg.get("file", ""))
        if file_name not in fclm_cache:
            continue
        mask = (dash["Role"] == role) & (dash["Rate"].isna())
        if not mask.any():
            continue
        rates = rate_lookup(
            fclm_cache[file_name],
            cfg.get("function_contains"),
            cfg.get("function_excludes"),
            cfg.get("unit_type"),
        )
        dash.loc[mask, "Rate"] = _merge_rates(dash, mask, rates).values
        if cfg.get("process_id"):
            dash.loc[mask, "ProcessId"] = str(cfg.get("process_id"))
        log.info("✓ Role {role}: {int(mask.sum())} rows")


def _apply_fallback_rates(dash: pd.DataFrame, fclm_cache: Dict[str, pd.DataFrame]) -> None:
    for original_role, fallback_cfg in ROLE_FALLBACK.items():
        if not isinstance(fallback_cfg, dict):
            continue
        mask = (dash["Role"] == original_role) & (dash["Rate"].isna())
        if not mask.any():
            continue
        file_name = str(fallback_cfg.get("file", ""))
        if file_name not in fclm_cache:
            continue
        rates = rate_lookup(
            fclm_cache[file_name],
            fallback_cfg.get("function_contains"),
            fallback_cfg.get("function_excludes"),
            fallback_cfg.get("unit_type"),
        )
        tmp = dash.loc[mask, ["EmployeeId", "EmployeeId Digits"]].reset_index()
        tmp = tmp.merge(rates, left_on="EmployeeId", right_on="Employee Id", how="left")
        no_match = tmp["RATE_RAW"].isna()
        if no_match.any() and "Employee Id Digits" in rates.columns:
            rates_digits = rates[["Employee Id Digits", "RATE_RAW"]].drop_duplicates("Employee Id Digits")
            tmp2 = tmp.loc[no_match, ["EmployeeId Digits"]].merge(
                rates_digits.rename(columns={"RATE_RAW": "RATE_DIGITS"}),
                left_on="EmployeeId Digits",
                right_on="Employee Id Digits",
                how="left",
            )
            tmp.loc[no_match, "RATE_RAW"] = tmp2["RATE_DIGITS"].values
        ok = tmp["RATE_RAW"].notna()
        indices = tmp.loc[ok, "index"].values
        if len(indices) > 0:
            new_role = str(fallback_cfg.get("new_role", original_role)).upper().strip()
            dash.loc[indices, "Rate"] = tmp.loc[ok, "RATE_RAW"].values
            dash.loc[indices, "Role"] = new_role
            if fallback_cfg.get("process_id"):
                dash.loc[indices, "ProcessId"] = str(fallback_cfg.get("process_id"))
            log.info("✓ {original_role} → {new_role}: {len(indices)} rows")


def run(fc: str = "BCN4") -> Path:
    fc = (fc or "BCN4").strip().upper()
    _refresh_fc_configs(fc)
    log.info("=" * 70)
    log.info("BUILDING DASHBOARD — {fc}")
    log.info("=" * 70)
    log.info("Roles={len(ROLE_MAP)}, fallbacks={len(ROLE_FALLBACK)}, station overrides={len(STATION_OVERRIDES)}")
    log.info("RoboScout checks={len(ROBOSCOUT_CHECKS)}, Pack lines={len(PACK_LINE_TARGETS)}, UPA={UPA_TARGETS}")

    roster = _load_roster(fc)
    log.info("{len(roster)} employees")
    dash = roster[["EmployeeId", "EmployeeId Digits", "Login", "Station", "Role", "TenureInDays", "TenureWk", "NH_Flag", "Cohort", "Dept", "FC"]].copy()
    dash["Rate"] = pd.NA
    dash["PackLine"] = ""
    dash["ProcessId"] = ""

    fclm_cache = _load_fclm_cache()
    fs_data = load_fast_starts_data(fc)
    rs_data = load_roboscout_data()
    stow_qs_logins, stow_gap_map = load_roboscout_stow(fc)
    oowa_map = load_oowa_map()
    pi_data = load_process_inspector_data()
    log.info("idle_comment_enabled={IDLE_COMMENT_ENABLED}, idle_threshold={IDLE_COMMENT_THRESHOLD}")

    # STOW Mix Share map
    stow_mix_share_map: dict[str, str] = {}
    try:
        stow_fclm = fclm_cache.get("FCLM_1002976.csv")
        if stow_fclm is not None:
            stow_mix_share_map = build_stow_mix_share_map(stow_fclm)
        log.info("lookup keys: {len(stow_mix_share_map)}")
    except Exception as e:
        log.info("⚠ failed: {e}")

    for check in ROBOSCOUT_CHECKS:
        fname = check.get("file", "")
        if fname in rs_data:
            df = rs_data[fname]
            for metric in check.get("metrics", []):
                col = metric.get("column", "")
                found = _find_col_contains(df, col)
                log.info("{fname} → '{col}' → found: '{found}'")

    # PHASE 1 role refinement
    if stow_qs_logins:
        qs_mask = dash["Login"].astype(str).str.lower().isin(stow_qs_logins)
        dash.loc[qs_mask, "Role"] = "QUANTITY_STOW"
        log.info("✓ QUANTITY_STOW assigned: {int(qs_mask.sum())} employees")

    _apply_station_overrides(dash, fclm_cache)
    _apply_role_rates(dash, fclm_cache)
    _apply_fallback_rates(dash, fclm_cache)

    # Fill ProcessId from remote process_mapping.json when mappings did not set it explicitly.
    if "ProcessId" not in dash.columns:
        dash["ProcessId"] = ""
    missing_pid = dash["ProcessId"].astype(str).str.strip().isin(["", "nan", "None", "<NA>"])
    dash.loc[missing_pid, "ProcessId"] = dash.loc[missing_pid, "Role"].astype(str).str.upper().map(ROLE_TO_PROCESS_ID).fillna("")

    dash["Rate"] = pd.to_numeric(dash["Rate"], errors="coerce").round(0).astype("Int64")

    # PHASE 2 targets
    necro_targets = {str(k).upper(): float(v) for k, v in get_necro_targets(fc)["targets"].items()}
    curves = load_curves(TENURE_CURVES_JSON)

    def _resolve_target_row(row):
        role = str(row["Role"]).upper()
        station = str(row["Station"])
        wk = min(10, int(row["TenureWk"]))  # Curves only have keys 1-10
        pack_target, pack_key = resolve_pack_target(role, station)
        if not pd.isna(pack_target) and pack_target > 0:
            factor = get_factor(curves, fc, role_to_target_key(role), wk) if PACK_APPLIES_LC else 1.0
            return pd.Series({"Target_OP2": pack_target, "Factor": factor, "Target_Tenure": pack_target * factor, "PackLine": pack_key})
        base = necro_targets.get(role_to_target_key(role), float("nan"))
        factor = get_factor(curves, fc, role_to_target_key(role), wk)
        return pd.Series({"Target_OP2": base, "Factor": factor, "Target_Tenure": base * factor if not pd.isna(base) else float("nan"), "PackLine": ""})

    targets_df = dash.apply(_resolve_target_row, axis=1)
    dash["Target_OP2"] = targets_df["Target_OP2"]
    dash["Factor"] = targets_df["Factor"]
    dash["Target_Tenure"] = targets_df["Target_Tenure"]
    dash["PackLine"] = targets_df["PackLine"]
    dash["Pct_to_OP2"] = pd.to_numeric(dash["Rate"], errors="coerce") / pd.to_numeric(dash["Target_Tenure"], errors="coerce")
    dash["% to OP2"] = (dash["Pct_to_OP2"] * 100).round(1)

    try:
        wk1_data = get_necro_targets_wk1(fc)
        mode_groups = wk1_data.get("mode_groups", {})
        log.info("\n[SIGMA] WK-1 Mode groups: { {g: d.get('mode') for g, d in mode_groups.items()} }")
        dash = compute_sigma_priorities(dash, mode_groups)
        dash["Mode"] = dash["Mode"].fillna(0).astype(int)
    except Exception as e:
        log.info("⚠ WK-1 fetch failed ({e}) — fallback legacy priority")
        dash["ModeGroup"] = dash["Role"].apply(lambda r: ROLE_TO_MODE_GROUP.get(str(r).strip().upper(), ""))
        dash["Mode"] = 0
        dash["SigmaLevel"] = dash["Pct_to_OP2"].apply(coaching_priority)
        dash["Sigma"] = dash["SigmaLevel"]

    pack_assigned = int((dash["PackLine"].astype(str).str.len() > 0).sum())
    log.info("Pack line targets assigned: {pack_assigned}")

    # ─── Exemptions: remove coaching priority for exempt associates ─────
    try:
        from project_hermes.domains.tenure_hours import map_process
        exempt_all = get_exempt_logins_for_process("ALL")
        exempt_by_proc: dict[str, set] = {}
        for proc in ["PICK", "PACK", "STOW", "RECEIVE", "ICQA", "DECANT"]:
            exempt_by_proc[proc] = get_exempt_logins_for_process(proc)

        def _is_exempt(row):
            login = str(row.get("Login", "")).strip().lower()
            if login in exempt_all:
                return True
            role = str(row.get("Role", "")).strip().upper()
            proc = map_process(role)
            return login in exempt_by_proc.get(proc, set())

        exempt_mask = dash.apply(_is_exempt, axis=1)
        n_exempt = exempt_mask.sum()
        if n_exempt > 0:
            dash.loc[exempt_mask, "SigmaLevel"] = 0
            dash.loc[exempt_mask, "Sigma"] = 0
            dash.loc[exempt_mask, "Mode"] = 0
            dash["Exempt"] = exempt_mask
            log.info("Exemptions applied: %d associates removed from coaching flags", n_exempt)
        else:
            dash["Exempt"] = False
    except Exception as e:
        log.warning("Exemption check failed (non-fatal): %s", e)
        dash["Exempt"] = False

    # PHASE 3 comments maps
    _upa_map: dict[str, float] = {}
    try:
        qs_cfg = ROLE_MAP.get("QUANTITY_STOW", {})
        qs_file = qs_cfg.get("file", "") if isinstance(qs_cfg, dict) else ""
        qs_func = qs_cfg.get("function_contains", "") if isinstance(qs_cfg, dict) else ""
        if qs_file and qs_file in fclm_cache and qs_func:
            upa_df = upa_lookup(fclm_cache[qs_file], qs_func)
            for _, rr in upa_df.iterrows():
                val = rr["UPA"]
                if val is not None and pd.notna(val):
                    eid = str(rr["Employee Id"]).strip()
                    digs = str(rr["Employee Id Digits"] or "").strip()
                    if eid and eid.lower() not in ("nan", "none"):
                        _upa_map[eid] = float(val)
                    if digs and digs.lower() not in ("nan", "none"):
                        _upa_map[digs] = float(val)
            log.info("QS={(dash['Role'] == 'QUANTITY_STOW').sum()}, entries={len(upa_df)}")
    except Exception as e:
        log.info("⚠ {e}")

    # UPT removed — Decant now uses Unit Type = Case (no EACH rows available)
    def _row_comments_data(r):
        login = r["Login"]
        role = str(r["Role"]).upper().strip()
        eid = str(r.get("EmployeeId", "")).strip()
        digs = str(r.get("EmployeeId Digits", "") or "").strip()
        h1 = get_fast_start_for_employee(fs_data, login, "H1")
        h2 = get_fast_start_for_employee(fs_data, login, "H2")
        rs = get_roboscout_comments(login, role, rs_data)
        upt = None

        # GAP is driven by custom_targets.json / gap_thresholds.
        # Keep it only when the associate is in a GAP-applicable role and the
        # value is above the FC/role threshold. This avoids showing small gaps
        # and prevents GAP from appearing on unrelated roles.
        raw_gap = stow_gap_map.get(str(login or "").strip().lower())
        gap = None
        gap_threshold = None
        if role in {"STOW", "QUANTITY_STOW", "PICK_AR", "P2R_PICK"}:
            try:
                gap_threshold = gap_threshold_for_role(role)
                if raw_gap is not None and float(raw_gap) >= gap_threshold:
                    gap = float(raw_gap)
            except Exception:
                gap = None
                gap_threshold = None

        upa = None
        if role == "QUANTITY_STOW":
            raw = _upa_map.get(eid) or (_upa_map.get(digs) if digs else None)
            tgt = UPA_TARGETS.get("QUANTITY_STOW")
            if raw is not None and (tgt is None or raw < tgt):
                upa = raw
        mix_share = None
        if role in {"STOW", "QUANTITY_STOW"}:
            mix_share = stow_mix_share_map.get(eid) or (stow_mix_share_map.get(digs) if digs else None)
        oowa = None
        if role in {"STOW", "QUANTITY_STOW", "PICK_AR", "P2R_PICK"}:
            oowa = oowa_map.get(str(login or "").strip().lower())
        idle_pct = compute_idle_pct_for_row(r, pi_data)
        return {
            "H1_OnTarget": h1["on_target"] if h1 else None,
            "H2_OnTarget": h2["on_target"] if h2 else None,
            "_H1": h1,
            "_H2": h2,
            "_RS": rs,
            "_UPT": upt,
            "_GAP": gap,
            "_GAP_THRESHOLD": gap_threshold,
            "_UPA": upa,
            "_MIX": mix_share,
            "_OOWA": oowa,
            "_IDLE": idle_pct,
        }

    extra = dash.apply(_row_comments_data, axis=1, result_type="expand")
    dash = dash.join(extra)
    log.info("FS off-target: H1={(dash['H1_OnTarget'].eq(False)).sum()}, H2={(dash['H2_OnTarget'].eq(False)).sum()}")
    log.info("RoboScout flagged: {dash['_RS'].apply(lambda x: bool(x)).sum()} employees")
    log.info("STOW Mix Share: {dash['_MIX'].apply(lambda x: bool(x)).sum()} employees")
    log.info("OOWA: {dash['_OOWA'].notna().sum()} employees")
    log.info("IDLE data: {dash['_IDLE'].notna().sum()} employees; comment enabled={IDLE_COMMENT_ENABLED}")
    try:
        _quality_map = quality_comments_for_dash(dash)
        log.info("Quality flagged: {len(_quality_map)} employees")
    except Exception as e:
        _quality_map = {}
        log.info("Quality comments skipped: {e}")

    def _append_quality_comment(base_comment: str, quality_comment) -> str:
        base_comment = str(base_comment or "").strip()

        if isinstance(quality_comment, list):
            clean_items = []
            for item in quality_comment:
                item = str(item or "").strip()
                item = item.replace("🧪 Quality Opportunities:", "").strip()
                item = item.replace("Quality Opportunities:", "").strip()
                item = item.replace("(", ": ").replace(")", "")
                if item:
                    clean_items.append(item)
            quality_comment = "; ".join(clean_items)
        else:
            quality_comment = str(quality_comment or "").strip()
            quality_comment = quality_comment.replace("🧪 Quality Opportunities:", "").strip()
            quality_comment = quality_comment.replace("Quality Opportunities:", "").strip()
            quality_comment = quality_comment.replace("(", ": ").replace(")", "")

        if not quality_comment:
            return base_comment
        if not base_comment:
            return quality_comment

        return f"{base_comment}; {quality_comment}"
    dash["Comments"] = dash.apply(
        lambda r: _append_quality_comment(
            build_comments(
                r["_H1"],
                r["_H2"],
                r["_RS"],
                r.get("_UPT"),
                r.get("_GAP"),
                r.get("_GAP_THRESHOLD"),
                r.get("_UPA"),
                r.get("_MIX"),
                r.get("_OOWA"),
                r.get("_IDLE"),
                IDLE_COMMENT_ENABLED,
                IDLE_COMMENT_THRESHOLD,
            ),
            _quality_map.get(str(r.get("Login", "")).strip().lower(), ""),
        ),
        axis=1,
    )
    dash["%IDLE"] = dash["_IDLE"]
    dash["%Unproductive"] = dash["_IDLE"]
    dash.drop(columns=["_H1", "_H2", "_RS", "_UPT", "_GAP", "_GAP_THRESHOLD", "_UPA", "_MIX", "_OOWA", "_IDLE"], inplace=True, errors="ignore")
    log.info("✓ Non-empty: {(dash['Comments'].astype(str).str.strip().str.len() > 0).sum()}/{len(dash)}")

    # PHASE 4 guided coaching
    dash["Coached"] = _build_gc_coached_column(dash, fc)

    # Display-only station cleanup: ICQA_SIMPLE_BIN_COUNT k-A-04-4177 -> 4177.
    # This does NOT change the existing behavior around blank station filtering.
    if "Station" in dash.columns and "Role" in dash.columns:
        dash["Station"] = dash.apply(lambda r: normalize_display_station(r.get("Role", ""), r.get("Station", "")), axis=1)

    # DECANT station filter: only keep ws-rcv-XX-XX stations (real decant workstations)
    if "Role" in dash.columns and "Station" in dash.columns:
        decant_mask = dash["Role"].str.upper() == "DECANT"
        valid_ws = dash["Station"].str.lower().str.startswith("ws-rcv-", na=False)
        drop_mask = decant_mask & ~valid_ws
        if drop_mask.any():
            log.info(f"DECANT filter: removing {drop_mask.sum()} rows with non ws-rcv stations")
            dash = dash[~drop_mask].copy()

    full_cols = [
        "Dept", "Cohort", "NH_Flag", "Login", "Station", "Role", "Rate",
        "% to OP2", "Sigma", "SigmaLevel", "ModeGroup", "Mode",
        "TenureInDays", "TenureWk", "Curve", "HomeProcess",
        "H1_OnTarget", "H2_OnTarget", "%IDLE", "%Unproductive",
        "Comments", "FC", "EmployeeId", "PackLine", "Coached", "Exempt",
    ]
    full_df = dash[[c for c in full_cols if c in dash.columns]].copy()

    def _mode_sort_key(mode: int) -> int:
        if mode == 1:
            return 0
        if mode == 2:
            return 1
        return 2

    if "Mode" in full_df.columns:
        full_df["_mode_sort"] = full_df["Mode"].apply(_mode_sort_key)
        full_df = full_df.sort_values(by=["_mode_sort", "Sigma", "% to OP2"], ascending=[True, False, True]).drop(columns=["_mode_sort"])
    else:
        full_df = full_df.sort_values(by=["Sigma", "% to OP2"], ascending=[False, True])

    full_path = OUTPUT_DIR / "Dashboard_Full.csv"
    full_df.to_csv(full_path, index=False, encoding="utf-8-sig")
    log.info("\n✅ Dashboard_Full.csv: {full_path} ({len(full_df)} rows)")
    if "ModeGroup" in full_df.columns and "Sigma" in full_df.columns:
        log.info("Summary:\n%s", full_df.groupby(["ModeGroup", "Mode", "Sigma"]).size().reset_index(name="n").to_string(index=False))
    return full_path


def main() -> None:
    fc = input("FC (default BCN4): ").strip().upper() or "BCN4"
    run(fc)


if __name__ == "__main__":
    main()
