# downloader.py — WORKING + OPTIMIZED (Hermes)
# - Keeps your WORKING behavior (WinHTTP redirects + intraday URL builders + robust parsers)
# - Adds: thread-local COM+WinHTTP reuse + parallel tasks + flags cleaning
# - Supports RoboScout config:
#     A) {"template": "...", "use_datetime": true, "hour_offset": 0}   (your old working format)
#     B) {"url_template": "https://...{fc}...{start_iso}...{end_iso}"} (optional new format)

from __future__ import annotations

import csv
import json
import math
import re
import time
import threading
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import datetime, timedelta, timezone
from io import StringIO
from pathlib import Path
from typing import Dict, List, Optional, Tuple
from urllib.parse import urlparse, parse_qs, urlencode, urlunparse, quote_plus

import pandas as pd
import pythoncom
import win32com.client

from project_hermes.config import get_paths
from project_hermes.core.config_store import load_json
from project_hermes.core.auth_midway import get_cookie
from project_hermes.domains.atlas_quality import fetch_and_save_atlas_quality
from project_hermes.core.logger import get_logger
log = get_logger(__name__)


paths = get_paths()
OUTPUT_DIR: Path = paths.output

# ---------------- Hermes Config (JSON) ----------------
_cfg_sources_default = {
    "default_fc": "BCN4",
    "max_workers": 4,
    "min_hours_threshold": 1.0,
    "fclm_process_ids": [],
    "roboscout_configs": {},
    "process_inspector_processes": {}
}
_cfg_proc_default = {"role_to_process_id": {}, "process_inspector_processes": {}}
_cfg_shift_default = {"Outbound": {}, "Inbound": {}, "default_department": "Outbound"}

cfg_sources = load_json(paths.root, "downloader_sources.json", _cfg_sources_default)

# If you also keep process_mapping.json, we merge PI processes from either place:
cfg_proc = load_json(paths.root, "process_mapping.json", _cfg_proc_default)

SHIFT_CONFIG = load_json(paths.root, "shift_config.json", _cfg_shift_default)

MAX_WORKERS = int(cfg_sources.get("max_workers", 4))
DEFAULT_FC = str(cfg_sources.get("default_fc", "BCN4")).upper()
MIN_HOURS_THRESHOLD = float(cfg_sources.get("min_hours_threshold", 1.0))

# Prefer sources.json entry, fallback to process_mapping.json
PROCESS_CONFIGS = (
    cfg_sources.get("process_inspector_processes")
    or cfg_proc.get("process_inspector_processes")
    or {}
)

ROBOSCOUT_CONFIGS = cfg_sources.get("roboscout_configs", {}) or {}
FCLM_PROCESS_IDS = cfg_sources.get("fclm_process_ids", []) or []

_default_dept = SHIFT_CONFIG.get("default_department", "Outbound")
DEFAULT_SHIFT_CONFIG = SHIFT_CONFIG.get(_default_dept, SHIFT_CONFIG.get("Outbound", {}))

# ==========================
# Thread-local COM + WinHTTP
# ==========================
_tls = threading.local()

def _ensure_com_and_http() -> "win32com.client.CDispatch":
    if not getattr(_tls, "com_init", False):
        pythoncom.CoInitialize()
        _tls.com_init = True
        _tls.http = None

    http = getattr(_tls, "http", None)
    if http is None:
        http = win32com.client.Dispatch("WinHTTP.WinHTTPRequest.5.1")
        _tls.http = http
    return http

def _thread_worker_init() -> None:
    _ensure_com_and_http()

# ============================================================================
# CLEANING UTILITIES (FLAGS instead of FILTERS)
# ============================================================================

def normalize_cols(df: pd.DataFrame) -> pd.DataFrame:
    df = df.copy()
    df.columns = [re.sub(r"\s+", " ", str(c).strip()) for c in df.columns]
    return df

def find_col(df: pd.DataFrame, candidates: List[str]) -> Optional[str]:
    cols = {c.lower(): c for c in df.columns}
    for cand in candidates:
        if cand.lower() in cols:
            return cols[cand.lower()]
    return None

def find_col_contains(df: pd.DataFrame, needle: str) -> Optional[str]:
    def norm(s: str) -> str:
        return re.sub(r"[\s_]+", "", s.strip().lower())
    target = norm(needle)
    for c in df.columns:
        if target in norm(str(c)):
            return c
    return None

def ceil_1_decimal(x: float) -> float:
    return math.ceil(x * 10.0) / 10.0

def norm_str_series(s: pd.Series) -> pd.Series:
    return (
        s.astype(str)
        .str.replace(r"\s+", " ", regex=True)
        .str.strip()
        .str.upper()
    )

def clean_fclm(df: pd.DataFrame) -> pd.DataFrame:
    df = normalize_cols(df)

    col_process = find_col(df, ["Process Name"])
    col_function = find_col(df, ["Function Name"])
    col_empid = find_col(df, ["Employee Id"])
    col_name = find_col(df, ["Name"])
    col_size = find_col(df, ["Size"])
    col_unit = find_col(df, ["Unit Type"])
    col_paid = find_col(df, ["Paid Hours-Total(function,employee)"])

    out = df.copy()

    if col_size:
        size_norm = norm_str_series(out[col_size])
        out["_Size_Is_Total"] = size_norm.str.startswith("TOTAL")
    else:
        out["_Size_Is_Total"] = True

    if col_unit:
        unit_norm = norm_str_series(out[col_unit])
        out["_Unit_Is_Each"] = unit_norm == "EACH"
    else:
        out["_Unit_Is_Each"] = True

    if col_paid:
        out[col_paid] = pd.to_numeric(out[col_paid], errors="coerce")
        out["_Hours_Gte_1"] = out[col_paid].fillna(0) >= MIN_HOURS_THRESHOLD
        out["Paid Hours"] = out[col_paid].fillna(0)
    else:
        out["_Hours_Gte_1"] = True
        out["Paid Hours"] = 0

    out["_Valid_Row"] = out["_Size_Is_Total"] & out["_Unit_Is_Each"]
    out["_Include_Productivity"] = out["_Valid_Row"] & out["_Hours_Gte_1"]

    dedup_cols = [c for c in [col_process, col_function, col_empid, col_name] if c]
    if dedup_cols:
        for c in dedup_cols:
            if c != col_empid:
                out[c] = out[c].astype(str).str.strip()
        out["_Is_Duplicate"] = out.duplicated(subset=dedup_cols, keep="first")
    else:
        out["_Is_Duplicate"] = False

    return out.reset_index(drop=True)

def clean_roboscout(df: pd.DataFrame) -> pd.DataFrame:
    df = normalize_cols(df)
    out = df.copy()

    col_logged = (
        find_col_contains(out, "logged_hours")
        or find_col_contains(out, "loggedhours")
        or find_col_contains(out, "logged")
    )

    if col_logged:
        out[col_logged] = pd.to_numeric(out[col_logged], errors="coerce")
        out["_Hours_Gte_1"] = out[col_logged].fillna(0) >= MIN_HOURS_THRESHOLD
        out["Logged Hours"] = out[col_logged].fillna(0)
    else:
        out["_Hours_Gte_1"] = True
        out["Logged Hours"] = 0

    # round numeric columns up to 1 decimal if they look numeric
    num_cols = out.select_dtypes(include=["number"]).columns.tolist()

    for c in out.columns:
        if c in num_cols or c.startswith("_"):
            continue
        if out[c].dtype == "object":
            coerced = pd.to_numeric(out[c], errors="coerce")
            if coerced.notna().mean() > 0.8:
                out[c] = coerced
                num_cols.append(c)

    for c in num_cols:
        if not c.startswith("_"):
            out[c] = out[c].apply(lambda v: ceil_1_decimal(v) if pd.notna(v) else v)

    out["_Include_Productivity"] = out["_Hours_Gte_1"]
    return out.reset_index(drop=True)

def csv_to_df(csv_text: str) -> pd.DataFrame:
    if not csv_text or not csv_text.strip():
        return pd.DataFrame()

    # If HTML slipped in, raise a clear error
    if looks_like_html(csv_text):
        raise RuntimeError("Received HTML instead of CSV (auth/SSO page)")

    # Be more tolerant than default C-engine
    return pd.read_csv(StringIO(csv_text), engine="python", on_bad_lines="skip")

def df_to_csv(df: pd.DataFrame) -> str:
    output = StringIO()
    df.to_csv(output, index=False, encoding="utf-8-sig")
    return output.getvalue()

# ============================================================================
# AUTH / HTTP (YOUR WORKING VERSION + thread-local WinHTTP)
# ============================================================================

def looks_like_html(text: str) -> bool:
    return bool(re.search(r"<!DOCTYPE|<html", text, re.IGNORECASE))

def get_cookie_once() -> str:
    try:
        cookie = get_cookie(aea=True, max_tries=4)
        return cookie
    except Exception as e:
        raise RuntimeError(f"Failed to get Midway cookies: {e}")

def _get_location_header(http) -> str:
    try:
        return http.GetResponseHeader("Location")
    except Exception:
        return ""

def _resolve_redirect(current_url: str, location: str) -> str:
    if location.startswith("/"):
        parsed = urlparse(current_url)
        return f"{parsed.scheme}://{parsed.netloc}{location}"
    return location

def _sanitize_url(url: str) -> str:
    # Fix common causes of "unrecognized protocol":
    # - leading/trailing whitespace
    # - BOM / weird invisible chars
    u = (url or "").strip().lstrip("\ufeff")
    return u

def winhttp_request(
    url: str,
    cookie_header: str,
    max_tries: int = 10,
    accept_html: bool = False,
    expect_content: Optional[str] = None
) -> str:
    http = _ensure_com_and_http()
    current_url = _sanitize_url(url)
    html_resets = 0

    if not (current_url.startswith("http://") or current_url.startswith("https://")):
        raise RuntimeError(f"Bad URL (no http/https): {current_url[:120]}")

    for attempt in range(1, max_tries + 1):
        http.Open("GET", current_url, False)
        http.SetAutoLogonPolicy(0)
        http.SetTimeouts(30000, 30000, 30000, 60000)
        http.SetRequestHeader("Cookie", cookie_header)
        http.SetRequestHeader("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64)")
        http.SetRequestHeader("Accept", "text/html,application/xhtml+xml,*/*" if accept_html else "*/*")
        http.SetRequestHeader("Cache-Control", "no-cache")
        http.SetRequestHeader("Pragma", "no-cache")

        try:
            http.Send()
        except Exception:
            if attempt == max_tries:
                raise
            time.sleep(0.5)
            continue

        status = int(http.Status)
        text = http.ResponseText or ""

        if status in (301, 302, 303, 307, 308):
            loc = _get_location_header(http)
            if not loc:
                raise RuntimeError(f"Redirect {status} without Location header.")
            loc = _resolve_redirect(current_url, loc)
            # If redirect goes to midway-auth, retry (cookie might still settle)
            if "midway-auth" in loc or "signin" in loc:
                time.sleep(0.5)
                continue
            current_url = _sanitize_url(loc)
            continue

        if status in (401, 403):
            if attempt < max_tries:
                time.sleep(0.5)
                continue
            raise RuntimeError(f"HTTP {status}: Authentication failed")

        if status >= 400:
            raise RuntimeError(f"HTTP {status}: {getattr(http, 'StatusText', '')}")

        if expect_content and expect_content not in text:
            if attempt < max_tries:
                time.sleep(0.5)
                continue
            raise RuntimeError(f"Expected content '{expect_content}' not found")

        if not accept_html and looks_like_html(text):
            html_resets += 1
            if html_resets <= 2 and attempt < max_tries:
                time.sleep(0.5)
                continue
            raise RuntimeError("Received HTML instead of expected data format")

        return text

    raise RuntimeError(f"Failed after {max_tries} retries")

def winhttp_get_json(url: str, cookie: str, max_tries: int = 5) -> dict:
    http = _ensure_com_and_http()
    current_url = _sanitize_url(url)

    for attempt in range(1, max_tries + 1):
        try:
            http.Open("GET", current_url, False)
            http.SetAutoLogonPolicy(0)
            http.SetTimeouts(15000, 15000, 15000, 30000)
            http.SetRequestHeader("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64)")
            http.SetRequestHeader("Accept", "application/json")
            http.SetRequestHeader("Cookie", cookie)
            http.SetRequestHeader("Cache-Control", "no-cache")
            http.SetRequestHeader("Pragma", "no-cache")
            http.Send()
        except Exception as e:
            if attempt == max_tries:
                raise RuntimeError(f"Request failed: {e}")
            time.sleep(0.3)
            continue

        status = int(http.Status)
        text = http.ResponseText or ""

        if status in (301, 302, 303, 307, 308):
            loc = _get_location_header(http)
            if loc:
                current_url = _sanitize_url(_resolve_redirect(current_url, loc))
            time.sleep(0.3)
            continue

        if status in (401, 403):
            raise RuntimeError(f"HTTP {status}: Auth failed")

        if status >= 400:
            raise RuntimeError(f"HTTP {status}")

        if looks_like_html(text):
            raise RuntimeError("Received HTML (likely Midway auth page) instead of JSON")

        return json.loads(text)

    raise RuntimeError(f"Failed after {max_tries} attempts")

# ============================================================================
# DECANT LOCATION LOOKUP  (process 1003019 → GetLastSeenLocationOfEmployee)
# ============================================================================
LOCATION_API_URL = (
    "https://guided-coaching-dub.corp.amazon.com/api/"
    "employee-location-svc/GetLastSeenLocationOfEmployee"
)

# Process IDs that need location enrichment (configurable via downloader_sources.json)
LOCATION_ENRICHMENT_PROCESS_IDS: List[str] = [
    str(p) for p in cfg_sources.get("location_enrichment_process_ids", ["1003019"])
]


def _fetch_one_location(employee_id: str, cookie: str) -> str:
    """Fetch last-seen locationId for a single employee. Returns locationId or ''."""
    try:
        url = f"{LOCATION_API_URL}?employeeId={employee_id}"
        data = winhttp_get_json(url, cookie)
        return str(data.get("location", {}).get("locationId", "") or "")
    except Exception as e:
        return f"Error:{str(e)[:40]}"


def fetch_decant_locations(fclm_csv_path: Path, cookie: str, max_workers: int = 20) -> pd.DataFrame:
    """
    Read FCLM_1003019.csv, fetch last-seen location for each employee in parallel.
    Returns DataFrame with columns: EmployeeId, Login, Location
    which is saved as Decant_Locations.csv in OUTPUT_DIR.
    """
    if not fclm_csv_path.exists():
        log.info("⚠ {fclm_csv_path.name} not found — skipping location fetch")
        return pd.DataFrame()

    df = pd.read_csv(fclm_csv_path, dtype=str)
    df.columns = [re.sub(r"\s+", " ", c.strip()) for c in df.columns]

    # Detect Employee Id column
    emp_col = next((c for c in df.columns if "employee id" in c.lower()), None)
    if not emp_col:
        log.info("⚠ No 'Employee Id' column found in FCLM_1003019.csv")
        return pd.DataFrame()

    # Also grab login/name if available
    login_col = next((c for c in df.columns if "name" in c.lower()), None)

    # Unique employee IDs only (drop blanks/errors)
    emp_ids = (
        df[emp_col].astype(str).str.strip()
        .replace("", pd.NA).dropna().unique().tolist()
    )
    emp_ids = [e for e in emp_ids if e and e.lower() not in ("nan", "none", "employee id")]

    # Build login map if available
    login_map: dict = {}
    if login_col:
        login_map = dict(zip(
            df[emp_col].astype(str).str.strip(),
            df[login_col].astype(str).str.strip()
        ))

    log.info("Fetching locations for {len(emp_ids)} employees (max_workers={max_workers})...")

    results: List[dict] = []
    lock = threading.Lock()

    def _task(eid: str, idx: int, total: int):
        loc = _fetch_one_location(eid, cookie)
        login = login_map.get(eid, eid)
        with lock:
            log.info("  [{idx}/{total}] {login} ({eid}) → {loc}")
        return {"EmployeeId": eid, "Login": login, "Location": loc}

    with ThreadPoolExecutor(max_workers=max_workers, initializer=_thread_worker_init) as ex:
        futs = {
            ex.submit(_task, eid, i + 1, len(emp_ids)): eid
            for i, eid in enumerate(emp_ids)
        }
        for fut in as_completed(futs):
            try:
                results.append(fut.result())
            except Exception as e:
                results.append({"EmployeeId": futs[fut], "Login": futs[fut], "Location": f"Error:{e}"})

    if not results:
        log.info("✓ 0 locations found  |  ⚠ 0 errors")
        return pd.DataFrame(columns=["EmployeeId", "Login", "Location"])

    loc_df = pd.DataFrame(results)

    # Filter out error rows for clean output (keep for logging)
    ok = loc_df[~loc_df["Location"].astype(str).str.startswith("Error")]
    errors = loc_df[loc_df["Location"].astype(str).str.startswith("Error")]

    log.info("✓ {len(ok)} locations found  |  ⚠ {len(errors)} errors")
    if not errors.empty:
        for _, row in errors.iterrows():
            log.info("   ✗ {row['Login']} ({row['EmployeeId']}): {row['Location']}")

    return loc_df



def rebuild_url(original_url: str, updates: dict) -> str:
    parsed = urlparse(original_url)
    qs = parse_qs(parsed.query, keep_blank_values=True)
    for k, v in updates.items():
        qs[k] = [v]
    new_query = urlencode(qs, doseq=True, quote_via=quote_plus)
    return urlunparse(parsed._replace(query=new_query))

def build_roboscout_url(config: dict, fc: str, start_dt: datetime, end_dt: datetime) -> str:
    """
    Supports:
      - OLD format: {"template": "...", "use_datetime": true, "hour_offset": 0}
      - NEW format: {"url_template": "https://...{fc}...{start_iso}...{end_iso}..."}
    """
    if "template" in config and str(config.get("template", "")).strip():
        url = rebuild_url(str(config["template"]), {"sites": f"({fc})"})
        if config.get("use_datetime"):
            offset = int(config.get("hour_offset", 0) or 0)
            start_adj = start_dt + timedelta(hours=offset)
            end_adj = end_dt + timedelta(hours=offset)
            url = rebuild_url(url, {
                "startDateTime": start_adj.strftime("%Y-%m-%d %H:%M:%S"),
                "endDateTime": end_adj.strftime("%Y-%m-%d %H:%M:%S"),
            })
        return _sanitize_url(url)

    url_tpl = str(config.get("url_template", "")).strip()
    if not url_tpl:
        raise RuntimeError("RoboScout config missing template/url_template")

    start_iso = start_dt.strftime("%Y-%m-%dT%H:%M")
    end_iso = end_dt.strftime("%Y-%m-%dT%H:%M")
    return _sanitize_url(
        url_tpl.replace("{fc}", fc).replace("{start_iso}", start_iso).replace("{end_iso}", end_iso)
    )

def build_fclm_url(process_id: str, fc: str, start_dt: datetime, end_dt: datetime) -> str:
    base = "https://fclm-portal.amazon.com/reports/functionRollup"
    params = {
        "reportFormat": "CSV",
        "warehouseId": fc,
        "processId": str(process_id),
        "maxIntradayDays": "1",
        "spanType": "Intraday",
        "startDateIntraday": start_dt.strftime("%Y/%m/%d"),
        "startHourIntraday": str(start_dt.hour),
        "startMinuteIntraday": str(start_dt.minute),
        "endDateIntraday": end_dt.strftime("%Y/%m/%d"),
        "endHourIntraday": str(end_dt.hour),
        "endMinuteIntraday": str(end_dt.minute),
    }
    return _sanitize_url(f"{base}?{urlencode(params, quote_via=quote_plus)}")

def build_process_inspector_url(fc: str, process_id: str, start_dt: datetime, end_dt: datetime) -> str:
    base = "https://fclm-portal.amazon.com/ppa/inspect/process"
    params = {
        "nodeType": "FC",
        "warehouseId": fc,
        "processId": str(process_id),
        "primaryAttribute": "WORK_FLOW",
        "secondaryAttribute": "WORK_FLOW",
        "spanType": "Intraday",
        "maxIntradayDays": "1",
        "startDateIntraday": start_dt.strftime("%Y/%m/%d"),
        "startHourIntraday": str(start_dt.hour),
        "startMinuteIntraday": str(start_dt.minute),
        "endDateIntraday": end_dt.strftime("%Y/%m/%d"),
        "endHourIntraday": str(end_dt.hour),
        "endMinuteIntraday": str(end_dt.minute),
        "startDateDay": start_dt.strftime("%Y/%m/%d"),
        "startDateWeek": start_dt.strftime("%Y/%m/%d"),
        "startDateMonth": start_dt.strftime("%Y/%m/%d"),
    }
    return _sanitize_url(f"{base}?{urlencode(params, quote_via=quote_plus)}")

# ============================================================================
# PROCESS INSPECTOR PARSING (YOUR WORKING VERSION)
# ============================================================================

def extract_productivity_list(html: str) -> list:
    start_idx = html.find("filteredProductivityList")
    if start_idx == -1:
        raise ValueError("filteredProductivityList not found")

    bracket_start = html.find("[", start_idx)
    if bracket_start == -1:
        raise ValueError("Could not find data array")

    depth = 0
    for i, c in enumerate(html[bracket_start:], bracket_start):
        if c == "[":
            depth += 1
        elif c == "]":
            depth -= 1
            if depth == 0:
                return json.loads(html[bracket_start:i + 1])

    raise ValueError("Could not parse data array")

def aggregate_employees(data: list) -> List[dict]:
    employees: Dict[str, dict] = {}

    for group in data:
        proc = group.get("processAttributes", {})
        labor_type = proc.get("laborTrackingType", "direct")
        work_flow = proc.get("attributes", {}).get("WORK_FLOW", "UNKNOWN")

        for emp in group.get("associateProductivityList", []):
            eid = emp.get("employeeId")
            if not eid:
                continue

            if eid not in employees:
                employees[eid] = {
                    "Employee Id": eid,
                    "Employee Name": emp.get("employeeName", ""),
                    "Manager Name": emp.get("managerName", ""),
                    "Units": 0,
                    "Quantity": 0,
                    "Sec_Direct": 0,
                    "Sec_Inferred": 0,
                    "WORK_FLOW": set(),
                }

            e = employees[eid]
            e["Units"] += emp.get("unitCount", 0)
            e["Quantity"] += emp.get("eachCount", emp.get("unitCount", 0))
            e["WORK_FLOW"].add(work_flow)

            secs = emp.get("timeMillis", 0)
            if labor_type == "indirect":
                e["Sec_Inferred"] += secs
            else:
                e["Sec_Direct"] += secs

    rows = []
    for e in employees.values():
        h_direct = e["Sec_Direct"] / 3600
        h_inferred = e["Sec_Inferred"] / 3600
        h_total = h_direct + h_inferred

        rows.append({
            "Employee Id": e["Employee Id"],
            "Employee Name": e["Employee Name"],
            "Manager Name": e["Manager Name"],
            "Units": e["Units"],
            "Quantity": e["Quantity"],
            "Hours (Direct)": round(h_direct, 2),
            "Hours (Inferred)": round(h_inferred, 2),
            "Hours (Total)": round(h_total, 2),
            "UPH": round(e["Units"] / h_total, 2) if h_total > 0 else 0,
            "QPH": round(e["Quantity"] / h_total, 2) if h_total > 0 else 0,
            "WORK_FLOW": ", ".join(sorted(e["WORK_FLOW"])),
            "_Hours_Gte_1": h_total >= MIN_HOURS_THRESHOLD,
            "_Include_Productivity": h_total >= MIN_HOURS_THRESHOLD,
        })

    return rows

def rows_to_csv(rows: List[dict]) -> str:
    if not rows:
        return ""
    output = StringIO()
    writer = csv.DictWriter(output, fieldnames=rows[0].keys())
    writer.writeheader()
    writer.writerows(rows)
    return output.getvalue()

# ============================================================================
# FAST STARTS (YOUR WORKING VERSION)
# ============================================================================

def ms_to_time_str(ms: int) -> str:
    if ms <= 0:
        return "00:00:00"
    total_seconds = ms // 1000
    hours = (total_seconds // 3600) % 24
    minutes = (total_seconds % 3600) // 60
    seconds = total_seconds % 60
    return f"{hours:02d}:{minutes:02d}:{seconds:02d}"

def ms_to_minutes(ms: int) -> float:
    return round(ms / 60000, 2)

def timestamp_ms_to_datetime(ts_ms: int) -> datetime:
    return datetime.fromtimestamp(ts_ms / 1000, tz=timezone.utc)

def timestamp_ms_to_time_str(ts_ms: int) -> str:
    try:
        return timestamp_ms_to_datetime(ts_ms).strftime("%H:%M:%S")
    except Exception:
        return "N/A"

def timestamp_ms_to_datetime_str(ts_ms: int) -> str:
    try:
        return timestamp_ms_to_datetime(ts_ms).strftime("%Y-%m-%d %H:%M:%S")
    except Exception:
        return "N/A"

def calc_minutes_from_segment(arrival_ms: int, segment_start_ms: int) -> float:
    if arrival_ms <= 0 or segment_start_ms <= 0:
        return 0.0
    arrival_dt = timestamp_ms_to_datetime(arrival_ms)
    arrival_min = arrival_dt.hour * 60 + arrival_dt.minute + arrival_dt.second / 60
    segment_min = segment_start_ms / 60000
    return round(arrival_min - segment_min, 2)

def parse_fast_starts_response(data: dict) -> pd.DataFrame:
    rows = []
    for process_group in data.get("moves_data", []):
        main_process = process_group.get("mainProcess", "Unknown")
        for segment in process_group.get("segments", []):
            seg_name = segment.get("displayName", "Unknown")
            seg_start_ms = segment.get("startTime", 0)
            seg_start_time = ms_to_time_str(seg_start_ms)
            seg_start_min = ms_to_minutes(seg_start_ms)

            for move in segment.get("moves", []):
                dur_ms = move.get("duration", 0)
                target_ms = move.get("target", 0)
                arrival_ms = move.get("destinationArrivalTime", 0)

                rows.append({
                    "Main Process": main_process,
                    "Segment": seg_name,
                    "Segment Start": seg_start_time,
                    "Segment Start (min)": seg_start_min,
                    "Employee Login": move.get("employeeLogin", ""),
                    "Manager Login": move.get("managerLogin", ""),
                    "Destination LP": move.get("destinationLP", ""),
                    "Destination Location": move.get("destinationLocation", ""),
                    "Arrival DateTime": timestamp_ms_to_datetime_str(arrival_ms),
                    "Arrival Time": timestamp_ms_to_time_str(arrival_ms),
                    "Arrival (min from segment)": calc_minutes_from_segment(arrival_ms, seg_start_ms),
                    "Duration (sec)": round(dur_ms / 1000, 1),
                    "Duration (min)": round(dur_ms / 60000, 2),
                    "Target (min)": round(target_ms / 60000, 2),
                    "Outcome": move.get("moveOutcome", ""),
                    "On Target": "Yes" if dur_ms <= target_ms else "No",
                    "Delta (sec)": round((dur_ms - target_ms) / 1000, 1),
                })

    return pd.DataFrame(rows) if rows else pd.DataFrame()

def fetch_fast_starts(fc: str, date_str: str, cookie: str) -> pd.DataFrame:
    url = f"https://fc-benchmarking.amazon.com/rest/get_fast_start_moves?warehouseId={fc}&dateString={date_str}"

    def _try_once(c: str) -> dict:
        data = winhttp_get_json(url, c, max_tries=3)
        if not isinstance(data, dict):
            raise RuntimeError("Fast Starts returned non-dict JSON")
        return data

    data = _try_once(cookie)

    if not data.get("authorized", False):
        fresh = get_cookie(aea=True, max_tries=4)
        data = _try_once(fresh)

    if not data.get("authorized", False):
        keys = list(data.keys())[:20]
        raise RuntimeError(f"Fast Starts not authorized. Keys={keys}")

    return parse_fast_starts_response(data)

# ============================================================================
# DOWNLOAD RESULT
# ============================================================================

class DownloadResult:
    def __init__(self, name: str, success: bool, data: str = "", error: str = "", count: int = 0, cleaned: bool = False):
        self.name = name
        self.success = success
        self.data = data
        self.error = error
        self.count = count
        self.cleaned = cleaned

# ============================================================================
# DOWNLOAD TASKS
# ============================================================================

def download_roboscout(obj_id: str, config: dict, fc: str, start_dt: datetime, end_dt: datetime, cookie: str) -> DownloadResult:
    name = f"RoboScout_{obj_id}.csv"
    try:
        url = build_roboscout_url(config, fc, start_dt, end_dt)
        raw_csv = winhttp_request(url, cookie)
        df = csv_to_df(raw_csv)
        df_cleaned = clean_roboscout(df)
        return DownloadResult(name, True, df_to_csv(df_cleaned), count=len(df_cleaned), cleaned=True)
    except Exception as e:
        return DownloadResult(name, False, error=str(e))

def download_fclm(process_id: str, fc: str, start_dt: datetime, end_dt: datetime, cookie: str) -> DownloadResult:
    name = f"FCLM_{process_id}.csv"
    try:
        url = build_fclm_url(process_id, fc, start_dt, end_dt)
        raw_csv = winhttp_request(url, cookie)
        df = csv_to_df(raw_csv)
        df_cleaned = clean_fclm(df)
        return DownloadResult(name, True, df_to_csv(df_cleaned), count=len(df_cleaned), cleaned=True)
    except Exception as e:
        return DownloadResult(name, False, error=str(e))


# ICQA (process 1003030) uses JPH (Jobs Per Hour) as the rate metric — column index 13 (0-based)
# The column name typically contains "JPH" or is at position 14 (1-based = index 13)
ICQA_PROCESS_IDS: List[str] = [
    str(p) for p in cfg_sources.get("icqa_process_ids", ["1003030"])
]
ICQA_RATE_COL_INDEX: int = int(cfg_sources.get("icqa_rate_col_index", 13))  # 0-based = column 14


def download_fclm_icqa(process_id: str, fc: str, start_dt: datetime, end_dt: datetime, cookie: str) -> DownloadResult:
    """
    Download FCLM for ICQA (process 1003030).
    Uses column index 13 (1-based: col 14) as rate instead of UPH auto-detection.
    Adds a normalized 'UPH' column pointing to that column so dashboard_builder
    can find it with find_rate_col() as usual.
    """
    name = f"FCLM_{process_id}.csv"
    try:
        url = build_fclm_url(process_id, fc, start_dt, end_dt)
        raw_csv = winhttp_request(url, cookie)
        df = csv_to_df(raw_csv)

        # Identify JPH column by index (fallback: search for JPH in name)
        jph_col = None
        if ICQA_RATE_COL_INDEX < len(df.columns):
            jph_col = df.columns[ICQA_RATE_COL_INDEX]
            log.info("Using rate column [{ICQA_RATE_COL_INDEX}] = '{jph_col}'")
        else:
            # Search by name
            for c in df.columns:
                if "JPH" in re.sub(r"[\s_]+", "", c.strip().upper()):
                    jph_col = c
                    break

        if jph_col and jph_col != "UPH":
            # Add/rename as 'UPH' so find_rate_col() in dashboard_builder picks it up
            df["UPH"] = pd.to_numeric(df[jph_col], errors="coerce")
            log.info("Mapped '{jph_col}' → 'UPH'  ({df['UPH'].notna().sum()} valid values)")
        elif not jph_col:
            log.info("⚠ JPH column not found at index {ICQA_RATE_COL_INDEX} — columns: {list(df.columns)}")

        df_cleaned = clean_fclm(df)
        return DownloadResult(name, True, df_to_csv(df_cleaned), count=len(df_cleaned), cleaned=True)
    except Exception as e:
        return DownloadResult(name, False, error=str(e))

def _safe_filename_part(s: str) -> str:
    s = str(s or "").strip()
    s = re.sub(r"[\\/]+", "-", s)
    s = re.sub(r'[<>:"|?*]+', "-", s)
    s = re.sub(r"[^A-Za-z0-9._ -]+", "", s)
    s = re.sub(r"\s+", " ", s).strip()
    return s or "UNKNOWN"

def download_process_inspector(process_id: str, proc_name: str, fc: str, start_dt: datetime, end_dt: datetime, cookie: str) -> DownloadResult:
    safe_name = _safe_filename_part(proc_name)
    filename = f"ProcessInspector_{process_id}_{safe_name}.csv"
    raw_html_name = f"ProcessInspector_{process_id}_{safe_name}_RAW.html"

    try:
        url = build_process_inspector_url(fc, process_id, start_dt, end_dt)

        # 1) try strict (fast fail)
        try:
            html = winhttp_request(url, cookie, accept_html=True, expect_content="filteredProductivityList")
        except Exception:
            # 2) fallback: fetch anyway and inspect manually
            html = winhttp_request(url, cookie, accept_html=True, expect_content=None)

        # If still no marker, save HTML for debug (don’t lose the response)
        if "filteredProductivityList" not in html:
            OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
            (OUTPUT_DIR / raw_html_name).write_text(html, encoding="utf-8")
            return DownloadResult(filename, False, error="filteredProductivityList not found (saved RAW html)")

        data = extract_productivity_list(html)
        rows = aggregate_employees(data)
        return DownloadResult(filename, True, rows_to_csv(rows), count=len(rows))

    except Exception as e:
        return DownloadResult(filename, False, error=str(e))


def download_roster(fc: str) -> DownloadResult:
    name = "Roster_SCC.csv"
    try:
        from project_hermes.domains.roster_scc import build_roster_scc
        df = build_roster_scc(fc)
        return DownloadResult(name, True, df_to_csv(df), count=len(df))
    except Exception as e:
        return DownloadResult(name, False, error=str(e))

# ============================================================================
# FILE OPS
# ============================================================================

def save_result(result: DownloadResult) -> None:
    if result.success and result.data:
        OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
        (OUTPUT_DIR / result.name).write_text(result.data, encoding="utf-8")

def clear_outputs() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    for p in OUTPUT_DIR.glob("*.csv"):
        try:
            p.unlink()
        except Exception:
            pass

def print_result(result: DownloadResult, prefix: str = "  ") -> None:
    if result.success:
        count_str = f" ({result.count} rows)" if result.count else ""
        clean_str = " ✨" if result.cleaned else ""
        log.info("{prefix}✓ {result.name}{count_str}{clean_str}")
    else:
        log.info("{prefix}✗ {result.name}: {result.error}")

# ============================================================================
# MAIN RUN (PARALLEL)
# ============================================================================


def fetch_roboscout_stow(fc: str, cookie: str) -> None:
    """Download RoboScout instance 2982 (Stow current-station data) as raw JSON."""
    import json as _json
    import os as _os
    login = _os.environ.get("USERNAME", "unknown").strip().lower()
    url = (
        f"https://roboscout.amazon.com/retrieve_plot_data_by_instance_id/"
        f"?app_name=Roboscout2&instance_id=2982&mode=list_of_dicts"
        f"&noCache=true&noCachePut=true"
        f"&sites=({fc})"
        f"&useResultsCache=true&user={login}"
    )
    log.info("Fetching instance_id=2982 for {fc} user={login}")
    text = winhttp_request(url, cookie, max_tries=5)
    if not text or not text.strip():
        raise RuntimeError("Empty response from RoboScout Stow")
    try:
        data = _json.loads(text)
    except Exception as e:
        raise RuntimeError(f"JSON parse error: {e} — raw: {text[:200]}")
    out_path = OUTPUT_DIR / f"RoboScout_Stow_{fc}.json"
    out_path.write_text(_json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
    n = len(data) if isinstance(data, list) else len(data.get("data", data.get("results", [])))
    log.info("✓ Saved {out_path.name} — {n} records")


def _roboscout_stow_task(fc: str, cookie: str) -> DownloadResult:
    try:
        fetch_roboscout_stow(fc, cookie)
        return DownloadResult(name=f"RoboScout_Stow_{fc}.json", success=True, data="")
    except Exception as e:
        return DownloadResult(name=f"RoboScout_Stow_{fc}.json", success=False, error=str(e))


def run(fc: str, start_dt: datetime, end_dt: datetime) -> None:
    t0 = time.time()

    log.info("Authentication...")
    cookie = get_cookie_once()
    log.info("✓ Authentication successful")

    # init COM/WinHTTP in main thread too
    _ensure_com_and_http()

    roboscout_results: List[DownloadResult] = []
    fclm_results: List[DownloadResult] = []
    pi_results: List[DownloadResult] = []
    roster_result: Optional[DownloadResult] = None
    fast_starts_result: Optional[DownloadResult] = None

    with ThreadPoolExecutor(max_workers=MAX_WORKERS, initializer=_thread_worker_init) as executor:
        futures = {}

        log.info("RoboScout (download + clean)...")
        for obj_id, config in ROBOSCOUT_CONFIGS.items():
            fut = executor.submit(download_roboscout, str(obj_id), dict(config or {}), fc, start_dt, end_dt, cookie)
            futures[fut] = ("RoboScout", str(obj_id))

        log.info("FCLM Function Rollup (download + clean)...")
        for process_id in FCLM_PROCESS_IDS:
            pid_str = str(process_id)
            if pid_str in ICQA_PROCESS_IDS:
                # ICQA: use JPH column (col 14) instead of UPH auto-detect
                fut = executor.submit(download_fclm_icqa, pid_str, fc, start_dt, end_dt, cookie)
                log.info("  → {pid_str} (ICQA mode, JPH col {ICQA_RATE_COL_INDEX + 1})")
            else:
                fut = executor.submit(download_fclm, pid_str, fc, start_dt, end_dt, cookie)
            futures[fut] = ("FCLM", pid_str)

        log.info("Process Inspector (download)...")
        for process_id, proc_name in PROCESS_CONFIGS.items():
            fut = executor.submit(download_process_inspector, str(process_id), str(proc_name), fc, start_dt, end_dt, cookie)
            futures[fut] = ("ProcessInspector", str(process_id))

        # Roster + FastStarts also parallel (big win)
        log.info("Roster SCC...")
        fut_roster = executor.submit(download_roster, fc)
        futures[fut_roster] = ("Roster", "total")

        log.info("Fast Starts...")
        date_str = start_dt.strftime("%Y-%m-%d")
        fut_fs = executor.submit(_fast_starts_task, fc, date_str, cookie)
        futures[fut_fs] = ("FastStarts", date_str)

        log.info("RoboScout Stow (instance 2982)...")
        fut_stow = executor.submit(_roboscout_stow_task, fc, cookie)
        futures[fut_stow] = ("StowRS", fc)

        log.info("Downloading...")

        for fut in as_completed(futures):
            typ, _key = futures[fut]
            res = fut.result()

            # Save only if it has data (FastStarts writes file itself)
            if isinstance(res, DownloadResult) and res.success and res.data:
                save_result(res)

            if typ == "RoboScout":
                roboscout_results.append(res)
            elif typ == "FCLM":
                fclm_results.append(res)
            elif typ == "ProcessInspector":
                pi_results.append(res)
            elif typ == "Roster":
                roster_result = res
                if roster_result.success and roster_result.data:
                    save_result(roster_result)
            elif typ == "StowRS":
                if res.success:
                    log.info("  ✓ {res.name}")
                else:
                    log.info("  ⚠ RoboScout Stow failed (non-fatal): {res.error}")
            else:
                fast_starts_result = res

    log.info("Decant Location enrichment...")
    decant_loc_results: List[str] = []
    for pid in LOCATION_ENRICHMENT_PROCESS_IDS:
        fclm_path = OUTPUT_DIR / f"FCLM_{pid}.csv"
        if not fclm_path.exists():
            log.info("  ⚠ FCLM_{pid}.csv not found — skipping decant enrichment")
            continue
        try:
            _fc_check = pd.read_csv(fclm_path, nrows=2)
            if _fc_check.empty:
                log.info("  ⚠ FCLM_{pid}.csv has no data — skipping decant enrichment")
                continue
        except Exception:
            log.info("  ⚠ Could not read FCLM_{pid}.csv — skipping decant enrichment")
            continue
        loc_df = fetch_decant_locations(fclm_path, cookie, max_workers=1)
        if not loc_df.empty:
            out_name = f"Decant_Locations_{pid}.csv"
            out_path = OUTPUT_DIR / out_name
            loc_df.to_csv(out_path, index=False, encoding="utf-8-sig")
            log.info("  ✓ {out_name} ({len(loc_df)} rows) → {out_path}")
            decant_loc_results.append(out_name)
        else:
            log.info("  ⚠ No locations fetched for process {pid}")

    # ── Atlas Quality enrichment ──
    # New modular layer. Non-fatal: if Atlas fails, the performance dashboard still builds.
    log.info("Atlas Quality enrichment...")
    try:
        qres = fetch_and_save_atlas_quality(fc, start_dt, end_dt, cookie=cookie, output_dir=OUTPUT_DIR)
        if qres.get("enabled") is False:
            log.info("⏭️ Atlas Quality disabled by config")
        else:
            log.info("  ✓ Atlas Quality: raw_rows={qres.get('raw_rows', 0)} quality_rows={qres.get('quality_rows', 0)}")
    except Exception as e:
        log.info("  ⚠ Atlas Quality failed (non-fatal): {e}")

    all_results: List[DownloadResult] = []
    all_results += roboscout_results
    all_results += fclm_results
    all_results += pi_results
    if roster_result:
        all_results.append(roster_result)
    if fast_starts_result:
        all_results.append(fast_starts_result)

    ok = sum(1 for r in all_results if r.success)
    fail = sum(1 for r in all_results if not r.success)

    dt = time.time() - t0
    log.info("=" * 60)
    log.info("✓ COMPLETE - ok={ok} fail={fail} (tasks={ok+fail})")
    log.info("  Time: {dt:.1f}s | Output: {OUTPUT_DIR}")
    log.info("=" * 60)

def _fast_starts_task(fc: str, date_str: str, cookie: str) -> DownloadResult:
    tried: List[str] = []
    for ds in [date_str, datetime.now().strftime("%Y-%m-%d")]:
        if ds in tried:
            continue
        tried.append(ds)
        try:
            df_fast = fetch_fast_starts(fc, ds, cookie)
            if df_fast is None or df_fast.empty:
                continue

            OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
            out_name = f"FastStarts_{fc}_{ds}.csv"
            out_path = OUTPUT_DIR / out_name
            df_fast.to_csv(out_path, index=False, encoding="utf-8-sig")
            return DownloadResult(out_name, True, data="", count=len(df_fast))
        except Exception:
            continue
    return DownloadResult(f"FastStarts_{fc}_{date_str}.csv", False, error="No data or unauthorized")

# ============================================================================
# CLI
# ============================================================================

def prompt_datetime(label: str) -> datetime:
    while True:
        s = input(f"{label} (YYYY-MM-DD HH:MM): ").strip()
        try:
            return datetime.strptime(s, "%Y-%m-%d %H:%M")
        except ValueError:
            print("  Invalid format. Example: 2026-02-15 06:00")

def prompt_fc(default: str = DEFAULT_FC) -> str:
    s = input(f"FC / Site (default {default}): ").strip()
    return s.upper() if s else default

def main():
    print("\n" + "=" * 40)
    print("  PRODUCTIVITY DATA DOWNLOADER")
    print("=" * 40 + "\n")

    fc = prompt_fc()
    start_dt = prompt_datetime("Start datetime")
    end_dt = prompt_datetime("End datetime")

    print()
    run(fc, start_dt, end_dt)

if __name__ == "__main__":
    main()