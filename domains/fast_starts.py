# FastStarts_script.py - v6 (OPTIMIZED)

import json
import sys
import time
from datetime import datetime, timezone
from pathlib import Path
from typing import Optional, Tuple

import pandas as pd
import pythoncom
import win32com.client

from project_hermes.domains.roster_scc import midway_cookie_v2_like_vba, COOKIE_FILE
from project_hermes.config import get_paths
from project_hermes.core.logger import get_logger
log = get_logger(__name__)



paths = get_paths()
OUTPUT_DIR = paths.output
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

DEFAULT_FC = "BCN4"

# ============================================================================
# SHIFT & H1/H2 CONFIGURATION
# ============================================================================

SHIFT_CONFIG = {
    "Outbound": {
        "Day": {
            "shift_start": 6 * 60, "shift_end": 14 * 60,
            "H1_start": 6 * 60, "H1_end": 10 * 60,
            "H2_start": 10 * 60, "H2_end": 14 * 60,
        },
        "Evening": {
            "shift_start": 14 * 60, "shift_end": 22 * 60,
            "H1_start": 14 * 60, "H1_end": 19 * 60,
            "H2_start": 19 * 60, "H2_end": 22 * 60,
        },
        "Night": {
            "shift_start": 22 * 60, "shift_end": 6 * 60,
            "H1_start": 22 * 60, "H1_end": 3 * 60,
            "H2_start": 3 * 60, "H2_end": 6 * 60,
        },
    },
    "Inbound": {
        "Day": {
            "shift_start": 6 * 60, "shift_end": 14 * 60,
            "H1_start": 6 * 60, "H1_end": 10 * 60 + 30,
            "H2_start": 10 * 60 + 30, "H2_end": 14 * 60,
        },
        "Evening": {
            "shift_start": 14 * 60, "shift_end": 22 * 60,
            "H1_start": 14 * 60, "H1_end": 18 * 60 + 30,
            "H2_start": 18 * 60 + 30, "H2_end": 22 * 60,
        },
        "Night": {
            "shift_start": 22 * 60, "shift_end": 6 * 60,
            "H1_start": 22 * 60, "H1_end": 2 * 60 + 30,
            "H2_start": 2 * 60 + 30, "H2_end": 6 * 60,
        },
    },
}

DEFAULT_SHIFT_CONFIG = SHIFT_CONFIG["Outbound"]


# ============================================================================
# SHIFT HELPERS
# ============================================================================

def minutes_to_time_str(minutes: int) -> str:
    hours = (minutes // 60) % 24
    mins = minutes % 60
    return f"{hours:02d}:{mins:02d}"


def is_time_in_range(time_minutes: float, start: int, end: int) -> bool:
    if start <= end:
        return start <= time_minutes < end
    else:
        return time_minutes >= start or time_minutes < end


def detect_shift(segment_start_minutes: float) -> str:
    if 6 * 60 <= segment_start_minutes < 14 * 60:
        return "Day"
    elif 14 * 60 <= segment_start_minutes < 22 * 60:
        return "Evening"
    else:
        return "Night"


def get_shift_config(main_process: str, shift: str) -> dict:
    process_config = SHIFT_CONFIG.get(main_process, DEFAULT_SHIFT_CONFIG)
    return process_config.get(shift, DEFAULT_SHIFT_CONFIG[shift])


def get_half_flag(main_process: str, segment_start_minutes: float) -> Tuple[str, str]:
    shift = detect_shift(segment_start_minutes)
    config = get_shift_config(main_process, shift)
    
    if is_time_in_range(segment_start_minutes, config["H1_start"], config["H1_end"]):
        return shift, "H1"
    elif is_time_in_range(segment_start_minutes, config["H2_start"], config["H2_end"]):
        return shift, "H2"
    else:
        return shift, "OTHER"


# ============================================================================
# AUTH
# ============================================================================

def get_cookie_fresh() -> str:
    """Get fresh cookie (slow - does full auth)."""
    return midway_cookie_v2_like_vba(COOKIE_FILE, aea=True, max_tries=4)


def read_cookie_from_file() -> Optional[str]:
    """Read existing cookie from file (fast)."""
    if COOKIE_FILE.exists():
        try:
            cookie = COOKIE_FILE.read_text(encoding="utf-8").strip()
            if cookie and len(cookie) > 100:
                return cookie
        except:
            pass
    return None


# ============================================================================
# HTTP REQUEST
# ============================================================================

def winhttp_get_json(url: str, cookie: str, max_tries: int = 3) -> dict:
    """HTTP GET request expecting JSON response."""
    pythoncom.CoInitialize()
    
    try:
        for attempt in range(1, max_tries + 1):
            try:
                http = win32com.client.Dispatch("WinHTTP.WinHTTPRequest.5.1")
                http.Open("GET", url, False)
                http.SetAutoLogonPolicy(0)
                http.SetTimeouts(15000, 15000, 15000, 30000)  # Reduced timeouts
                http.SetRequestHeader("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64)")
                http.SetRequestHeader("Accept", "application/json")
                http.SetRequestHeader("Cookie", cookie)
                http.Send()
            except Exception as e:
                if attempt == max_tries:
                    raise RuntimeError(f"Request failed: {e}")
                time.sleep(0.3)
                continue
            
            status = int(http.Status)
            text = http.ResponseText or ""
            
            if status in (301, 302, 303, 307, 308):
                try:
                    loc = http.GetResponseHeader("Location")
                    if "midway-auth" in loc:
                        raise RuntimeError("Auth required")
                except:
                    pass
                continue
            
            if status in (401, 403):
                raise RuntimeError(f"HTTP {status}: Auth failed")
            
            if status >= 400:
                raise RuntimeError(f"HTTP {status}")
            
            return json.loads(text)
        
        raise RuntimeError(f"Failed after {max_tries} attempts")
    
    finally:
        pythoncom.CoUninitialize()


# ============================================================================
# TIME HELPERS
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
    except:
        return "N/A"


def timestamp_ms_to_datetime_str(ts_ms: int) -> str:
    try:
        return timestamp_ms_to_datetime(ts_ms).strftime("%Y-%m-%d %H:%M:%S")
    except:
        return "N/A"


def calc_minutes_from_segment(arrival_ms: int, segment_start_ms: int) -> float:
    if arrival_ms <= 0 or segment_start_ms <= 0:
        return 0.0
    arrival_dt = timestamp_ms_to_datetime(arrival_ms)
    arrival_min = arrival_dt.hour * 60 + arrival_dt.minute + arrival_dt.second / 60
    segment_min = segment_start_ms / 60000
    return round(arrival_min - segment_min, 2)


# ============================================================================
# DATA PARSING
# ============================================================================

def build_url(fc: str, date_str: str) -> str:
    return f"https://fc-benchmarking.amazon.com/rest/get_fast_start_moves?warehouseId={fc}&dateString={date_str}"


def parse_response(data: dict) -> pd.DataFrame:
    """Parse Fast Starts response into DataFrame."""
    rows = []
    
    for process_group in data.get("moves_data", []):
        main_process = process_group.get("mainProcess", "Unknown")
        
        for segment in process_group.get("segments", []):
            seg_name = segment.get("displayName", "Unknown")
            seg_start_ms = segment.get("startTime", 0)
            seg_start_time = ms_to_time_str(seg_start_ms)
            seg_start_min = ms_to_minutes(seg_start_ms)
            
            shift_name, half_flag = get_half_flag(main_process, seg_start_min)
            
            for move in segment.get("moves", []):
                dur_ms = move.get("duration", 0)
                target_ms = move.get("target", 0)
                arrival_ms = move.get("destinationArrivalTime", 0)
                
                rows.append({
                    "Shift": shift_name,
                    "Half": half_flag,
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
    """Fetch and parse Fast Starts data."""
    url = build_url(fc, date_str)
    data = winhttp_get_json(url, cookie)
    
    if not data.get("authorized", False):
        raise RuntimeError("Not authorized")
    
    return parse_response(data)


# ============================================================================
# FILTERING HELPERS
# ============================================================================

def filter_by_shift(df: pd.DataFrame, shift: str) -> pd.DataFrame:
    if df.empty or shift.upper() == "ALL":
        return df
    return df[df["Shift"] == shift.capitalize()]


def filter_by_half(df: pd.DataFrame, half: str) -> pd.DataFrame:
    if df.empty:
        return df
    half = half.upper()
    if half in ("ALL", "BOTH"):
        return df[df["Half"].isin(["H1", "H2"])]
    elif half in ("H1", "H2"):
        return df[df["Half"] == half]
    return df


def filter_data(df: pd.DataFrame, shift: str = "ALL", half: str = "ALL") -> pd.DataFrame:
    return filter_by_half(filter_by_shift(df, shift), half)


# ============================================================================
# MAIN FUNCTIONS
# ============================================================================

def fetch_and_save(fc: str, date_str: str, cookie: str) -> Tuple[pd.DataFrame, str]:
    """
    Fetch Fast Starts and save to CSV.
    Returns: (DataFrame, output_path)
    """
    df = fetch_fast_starts(fc, date_str, cookie)
    
    if not df.empty:
        output_file = OUTPUT_DIR / f"FastStarts_{fc}_{date_str}.csv"
        df.to_csv(output_file, index=False, encoding="utf-8-sig")
        return df, str(output_file)
    
    return df, ""


def run_with_cookie(fc: str, date_str: str, cookie: str) -> pd.DataFrame:
    """
    Run with pre-fetched cookie (FAST - for integration with Prod_script).
    """
    return fetch_fast_starts(fc, date_str, cookie)


def run(fc: str, date_str: str) -> None:
    """Standalone run with fresh auth."""
    start_time = time.time()
    
    log.info("Auth...")
    cookie = read_cookie_from_file()
    if cookie:
        log.info("Fetching...")
    try:
        df, path = fetch_and_save(fc, date_str, cookie)
        
        if df.empty:
            print("  ⚠ No data")
        else:
            log.info("  ✓ {len(df)} moves saved")
            
            # Quick summary
            for shift in df["Shift"].unique():
                shift_df = df[df["Shift"] == shift]
                on_target = (shift_df["On Target"] == "Yes").sum()
                log.info("    {shift}: {len(shift_df)} moves, {on_target} on target")
    
    except Exception as e:
        log.info("  ✗ Error: {e}")
    
    log.info("\n✓ Done in {time.time() - start_time:.1f}s")


# ============================================================================
# CLI
# ============================================================================

def main():
    fc = input(f"FC (default {DEFAULT_FC}): ").strip().upper() or DEFAULT_FC
    date_str = input(f"Date (default today): ").strip() or datetime.now().strftime("%Y-%m-%d")
    run(fc, date_str)


if __name__ == "__main__":
    main()