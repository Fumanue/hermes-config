# diver_quality.py — Diver QTS Quality Import (False Pick Short)
from __future__ import annotations

import json
import os
import time
from datetime import datetime, timedelta
from pathlib import Path
from typing import Any, Dict, List, Optional

import pandas as pd
import pythoncom
import win32com.client

from project_argos.config import get_paths
from project_argos.core.auth_midway import get_cookie
from project_argos.core.cert_picker import set_client_cert
from project_argos.core.logger import get_logger
log = get_logger(__name__)


# ─── Config ───────────────────────────────────────────────────────────────
DIVER_BASE = "https://diver.qts.amazon.dev"
DIVER_API = f"{DIVER_BASE}/api/reports/associate_defect_rollup_raw_data/data"

# Cookie file path (same as roster_scc / mwinit)
COOKIE_FILE = Path(os.environ.get("APPDATA", "")) / "cf"
DIVER_REFERER_TEMPLATE = (
    f"{DIVER_BASE}/tools/fcdi/dashboards/associate_defect_rollup"
    "?employment_type=regular%2Ctemporary"
    "&end_date={end_date}"
    "&feedback_type_quality_only=Quality"
    "&learning_curve=cross_trainee%2Cnew_hire%2Cunknown%2Cveteran"
    "&location_name={fc}"
    "&process_path=pick"
    "&start_date={start_date}"
)

UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:140.0) Gecko/20100101 Firefox/140.0"

paths = get_paths()
CACHE_DIR = Path(paths.cache)
CACHE_DIR.mkdir(parents=True, exist_ok=True)


# ─── Helpers ──────────────────────────────────────────────────────────────
def _cache_path(fc: str, start_date: str, end_date: str) -> Path:
    return CACHE_DIR / f"diver_fps_{fc}_{start_date}_{end_date}.json"


def _build_params(
    fc: str,
    start_date: str,
    end_date: str,
    offset: int = 0,
    limit: int = 1000,
) -> str:
    """Build URL query string for Diver QTS."""
    params = {
        "dashboard_id": "associate_defect_rollup",
        "employment_type": "regular,temporary",
        "end_date": end_date,
        "feedback_type_quality_only": "Quality",
        "learning_curve": "cross_trainee,new_hire,unknown,veteran",
        "limit": str(limit),
        "location_name": fc.upper(),
        "offset": str(offset),
        "process_path": "pick",
        "start_date": start_date,
    }
    return "&".join(f"{k}={v}" for k, v in params.items())


def _set_cert(http) -> None:
    set_client_cert(http)


def _get_full_cookie() -> str:
    """
    Try to build a complete cookie string for Diver QTS.

    Diver uses Federate SSO (amzn_sso_token). The cookie jar file (cf)
    may contain these tokens if the user has authenticated via browser.
    Falls back to standard Midway cookies if SSO tokens are not available.
    """
    # First try standard Midway cookies
    midway_cookie = get_cookie(aea=True, max_tries=4)

    # Try to augment with SSO tokens from the cookie jar
    if COOKIE_FILE.exists():
        try:
            content = COOKIE_FILE.read_text(encoding="utf-8", errors="ignore")
            # Look for amzn_sso_token and amzn_sso_rfp
            parts = []
            for line in content.splitlines():
                if "\tamzn_sso_token\t" in line or "\tamzn_sso_rfp\t" in line:
                    fields = line.split("\t")
                    if len(fields) >= 7:
                        parts.append(f"{fields[-2]}={fields[-1]}")
            if parts:
                return midway_cookie + ";" + ";".join(parts)
        except Exception:
            pass

    return midway_cookie


# ─── Fetcher ──────────────────────────────────────────────────────────────
def fetch_diver_fps_raw(
    fc: str,
    start_date: str,
    end_date: str,
    cookie: Optional[str] = None,
    max_pages: int = 10,
) -> List[Dict[str, Any]]:
    """
    Fetch False Pick Short data from Diver QTS using WinHTTP.

    Uses the same Midway cookie auth as the rest of the app.
    Paginates automatically (limit=1000 per page).

    Returns: list of raw records from the API.
    """
    fc = (fc or "BCN4").strip().upper()
    cookie = cookie or _get_full_cookie()

    referer = DIVER_REFERER_TEMPLATE.format(
        fc=fc, start_date=start_date, end_date=end_date
    )

    all_records: List[Dict[str, Any]] = []

    pythoncom.CoInitialize()
    try:
        http = win32com.client.Dispatch("WinHTTP.WinHTTPRequest.5.1")

        for page in range(max_pages):
            offset = page * 1000
            query = _build_params(fc, start_date, end_date, offset=offset)
            url = f"{DIVER_API}?{query}"

            log.info("GET page {page + 1} offset={offset} fc={fc}")

            http.Open("GET", url, False)
            http.SetAutoLogonPolicy(0)
            _set_cert(http)
            http.SetTimeouts(15000, 15000, 30000, 60000)
            http.SetRequestHeader("User-Agent", UA)
            http.SetRequestHeader("Accept", "*/*")
            http.SetRequestHeader("Accept-Language", "en-US,en;q=0.5")
            http.SetRequestHeader("Connection", "keep-alive")
            http.SetRequestHeader("Referer", referer)
            http.SetRequestHeader("Cookie", cookie)
            http.SetRequestHeader("Sec-Fetch-Dest", "empty")
            http.SetRequestHeader("Sec-Fetch-Mode", "cors")
            http.SetRequestHeader("Sec-Fetch-Site", "same-origin")
            http.SetRequestHeader("Pragma", "no-cache")
            http.SetRequestHeader("Cache-Control", "no-cache")
            http.Send()

            status = int(http.Status)
            text = http.ResponseText or ""

            log.info("HTTP {status} len={len(text)}")

            if status == 401 or status == 403:
                raise RuntimeError(
                    f"[DIVER] Auth failed ({status}). "
                    f"Diver QTS may require SSO token refresh. "
                    f"Response: {text[:300]}"
                )

            if status >= 400:
                raise RuntimeError(f"[DIVER] HTTP {status}: {text[:500]}")

            try:
                data = json.loads(text)
            except json.JSONDecodeError:
                raise RuntimeError(f"[DIVER] Invalid JSON response: {text[:300]}")

            # ─── Diver response format: {"response": [...], "status_code": 200}
            if isinstance(data, list):
                records = data
            elif isinstance(data, dict):
                records = data.get("response") or data.get("data") or data.get("results") or data.get("rows") or []
                if not isinstance(records, list):
                    records = [data]
            else:
                records = []

            all_records.extend(records)
            log.info("Got {len(records)} records (total: {len(all_records)})")

            # Stop if we got fewer than limit (last page)
            if len(records) < 1000:
                break

            time.sleep(0.3)  # Be nice to the API

    finally:
        pythoncom.CoUninitialize()

    return all_records


# ─── DataFrame builder ────────────────────────────────────────────────────
def build_fps_dataframe(raw_records: List[Dict[str, Any]], fc: str) -> pd.DataFrame:
    """
    Convert raw Diver QTS records into a DataFrame compatible with the quality pipeline.

    Real Diver fields:
      associate_login, no_of_defects, defect_type, warehouse_id, process_path, ...

    Filters:
      - Only records with no_of_defects > 0
      - Aggregates per associate (sum of defects across the week)
    """
    if not raw_records:
        return pd.DataFrame(columns=["FC", "Login", "Error Type", "ErrorKey", "_count", "Process"])

    df = pd.DataFrame(raw_records)
    log.info("Raw columns: {list(df.columns)}")
    log.info("defect_type values: {df['defect_type'].unique().tolist() if 'defect_type' in df.columns else 'N/A'}")

    # Validate required columns exist
    if "associate_login" not in df.columns or "no_of_defects" not in df.columns:
        log.warning("Missing expected columns. Have: {list(df.columns)}")
        return pd.DataFrame(columns=["FC", "Login", "Error Type", "ErrorKey", "_count", "Process"])

    # Convert defect count to numeric and filter > 0
    df["no_of_defects"] = pd.to_numeric(df["no_of_defects"], errors="coerce").fillna(0)
    df["transactions"] = pd.to_numeric(df.get("transactions", 0), errors="coerce").fillna(0)
    df = df[df["no_of_defects"] > 0].copy()
    log.info("Records with defects > 0: {len(df)}")

    if df.empty:
        return pd.DataFrame(columns=["FC", "Login", "Error Type", "ErrorKey", "_count", "_opportunities", "Process"])

    # Aggregate: sum defects per associate across the week
    agg = df.groupby("associate_login", as_index=False).agg(
        _count=("no_of_defects", "sum"),
        _opportunities=("transactions", "sum"),
    ).reset_index(drop=True)

    out = pd.DataFrame()
    out["FC"] = fc.upper()
    out["Login"] = agg["associate_login"].astype(str).str.strip().str.lower()
    out["Error Type"] = "False Pick Short"
    out["ErrorKey"] = "FALSE_PICK_SHORT"
    out["_count"] = agg["_count"].astype(int)
    out["_opportunities"] = agg["_opportunities"].astype(int)
    out["Process"] = "Pick"

    # Filter out empty logins
    out = out[out["Login"].str.len() > 0].copy()
    log.info("Final FPS associates: {len(out)}")

    return out


def _saturday_end(start_date: str, end_date: str) -> str:
    """
    Diver QTS indexes data by metric_date = Saturday (end of Amazon week).
    If end_date is before Saturday, extend it to the Saturday of that week
    so the query captures the full week's data.
    """
    end_dt = datetime.strptime(end_date, "%Y-%m-%d")
    # Saturday = weekday 5
    days_until_saturday = (5 - end_dt.weekday()) % 7
    if days_until_saturday == 0 and end_dt.weekday() != 5:
        days_until_saturday = 7
    saturday = end_dt + timedelta(days=days_until_saturday)
    return saturday.strftime("%Y-%m-%d")


# ─── Public API ───────────────────────────────────────────────────────────
def fetch_and_build_fps(
    fc: str,
    start_date: str,
    end_date: str,
    force_refresh: bool = False,
) -> pd.DataFrame:
    """
    Fetch False Pick Short data from Diver QTS and return a pipeline-compatible DataFrame.

    Uses caching to avoid repeated downloads within the same day.
    """
    fc = (fc or "BCN4").strip().upper()
    # Diver needs end_date = Saturday of the week
    diver_end = _saturday_end(start_date, end_date)
    log.info("Date range: {start_date} → {diver_end} (original end: {end_date})")
    cache_file = _cache_path(fc, start_date, diver_end)

    if cache_file.exists() and not force_refresh:
        log.info("Using cached: {cache_file.name}")
        raw = json.loads(cache_file.read_text(encoding="utf-8"))
    else:
        raw = fetch_diver_fps_raw(fc, start_date, diver_end)
        # Cache the raw response
        cache_file.write_text(json.dumps(raw, indent=2), encoding="utf-8")
        log.info("Cached {len(raw)} records → {cache_file.name}")

    return build_fps_dataframe(raw, fc)


# ─── CLI ──────────────────────────────────────────────────────────────────
if __name__ == "__main__":
    import sys
    fc = (sys.argv[1] if len(sys.argv) > 1 else "BCN4").strip().upper()
    # Default: current week (Sunday to today)
    now = datetime.now()
    days_since_sunday = (now.weekday() + 1) % 7
    start = (now - timedelta(days=days_since_sunday)).strftime("%Y-%m-%d")
    end = now.strftime("%Y-%m-%d")

    log.info("Fetching False Pick Short from Diver QTS: {fc} {start} → {end}")
    df = fetch_and_build_fps(fc, start, end, force_refresh=True)
    log.info("\n✅ Got {len(df)} records")
    if not df.empty:
        print(df.head(10).to_string())
