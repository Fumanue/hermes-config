# src/project_argos/domains/necro_targets.py
from __future__ import annotations

import os
import sys
import json
import re
import atexit
import threading
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urlencode
from io import StringIO
from typing import Any, Dict, Tuple

import pandas as pd
import pythoncom
import win32com.client

from project_argos.config import get_paths
from project_argos.core.auth_midway import get_cookie
from project_argos.core.logger import get_logger
log = get_logger(__name__)


# ---------------- Paths / Cache ----------------
paths = get_paths()
CACHE_DIR = paths.cache
CACHE_DIR.mkdir(parents=True, exist_ok=True)

# ---------------- Necro endpoints ----------------
NECRO_BASE = "https://necronomicon.corp.amazon.com"
BRIDGES_PAGE = f"{NECRO_BASE}/productivity/bridges/"
BRIDGES_POST = f"{NECRO_BASE}/productivity/bridges/"

UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:140.0) Gecko/20100101 Firefox/140.0"
CLIENT_CERT_THUMBPRINT = os.environ.get("CLIENT_CERT_THUMBPRINT", "").strip()

# ---------------- COM init (safe one-time) ----------------
_COM_LOCK = threading.Lock()
_COM_READY = False


def _safe_co_uninit() -> None:
    try:
        pythoncom.CoUninitialize()
    except Exception:
        pass


def ensure_com_initialized() -> None:
    """
    Initialize COM for current thread.
    In this CLI flow, everything is single-threaded → safe.
    Avoid doing CoUninitialize per request (that often triggers weird WinHTTP errors).
    """
    global _COM_READY
    pythoncom.CoInitialize()
    with _COM_LOCK:
        if not _COM_READY:
            atexit.register(_safe_co_uninit)
            _COM_READY = True


# ---------------- Cookie merge from response ----------------
def parse_set_cookie_headers(all_headers: str) -> dict:
    jar = {}
    for line in (all_headers or "").splitlines():
        if line.lower().startswith("set-cookie:"):
            cookie_kv = line.split(":", 1)[1].strip()
            first = cookie_kv.split(";", 1)[0].strip()
            if "=" in first:
                k, v = first.split("=", 1)
                jar[k.strip()] = v.strip()
    return jar


def merge_cookie_headers(base_cookie_header: str, new_cookies: dict) -> str:
    jar = {}
    for part in (base_cookie_header or "").split(";"):
        part = part.strip()
        if part and "=" in part:
            k, v = part.split("=", 1)
            jar[k.strip()] = v.strip()
    for k, v in (new_cookies or {}).items():
        jar[k] = v
    return "; ".join([f"{k}={v}" for k, v in jar.items()])


# ---------------- WinHTTP session (REUSE http object) ----------------
class WinHTTPSession:
    """
    IMPORTANT:
    - Reuse ONE WinHTTP COM object (like your old working script).
    - Do NOT CoUninitialize per request.
    """
    def __init__(self, base_cookie_header: str):
        ensure_com_initialized()
        self.http = win32com.client.Dispatch("WinHTTP.WinHTTPRequest.5.1")
        self.cookie_header = base_cookie_header

    def request(
        self,
        method: str,
        url: str,
        headers: dict | None = None,
        body: str | None = None,
        timeouts: tuple[int, int, int, int] = (0, 0, 0, 0),  # old script used infinite
    ) -> tuple[int, str, str]:
        self.http.Open(method, url, False)
        self.http.SetAutoLogonPolicy(0)

        # Optional cert by thumbprint (only if you set env var)
        if CLIENT_CERT_THUMBPRINT:
            self.http.SetClientCertificate(f"CURRENT_USER\\MY\\{CLIENT_CERT_THUMBPRINT}")

        self.http.SetTimeouts(*timeouts)

        if self.cookie_header:
            self.http.SetRequestHeader("Cookie", self.cookie_header)

        if headers:
            for k, v in headers.items():
                self.http.SetRequestHeader(str(k), str(v))

        # Keep same behaviour as your old script:
        # Send(body) even for GET where body=None (WinHTTP accepts it)
        self.http.SetRequestHeader("Connection", "close")
        self.http.Send(body)

        status = int(self.http.Status)
        text = self.http.ResponseText or ""
        all_headers = self.http.GetAllResponseHeaders() or ""

        new_jar = parse_set_cookie_headers(all_headers)
        if new_jar:
            self.cookie_header = merge_cookie_headers(self.cookie_header, new_jar)

        return status, text, url


# ---------------- Parsing helpers ----------------
def extract_csrf_token_from_html(html: str) -> str:
    m = re.search(r'name="csrfmiddlewaretoken"\s+value="([^"]+)"', html)
    if not m:
        dbg = CACHE_DIR / "necro_last_get.html"
        dbg.write_text(html, encoding="utf-8", errors="ignore")
        raise RuntimeError(f"CSRF token not found in GET HTML. Saved: {dbg}")
    return m.group(1)


def build_payload(fc: str, year: int, week: int) -> str:
    payload = {
        "data": {
            "view": "Weekly",
            "ruleOf7": "true",
            "compStartDate": str(year),
            "compEndDate": str(week),
            "baseStartDate": str(year),
            "baseEndDate": str(week),
            "compFc": fc,
            "baseFc": fc,
            "compScenario": "OP2",
            "baseScenario": "OP2",
            "comp_benchmark_fc_clusters": [],
            "base_benchmark_fc_clusters": [],
            "hours_type": "TotalUndilutedHours",
        }
    }
    return json.dumps(payload)


def build_payload_actuals_vs_op2(fc: str, year: int, week: int) -> str:
    """
    Payload for WK-1 Mode calculation.
    comp = OP2 (the target)
    base = Actuals (what really happened last week)
    Uses Diluted hours (matching regional productivity script).
    → Base TPH = Actual, Comp TPH = OP2 target
    → % to OP2 = Base TPH / Comp TPH (Actual / Target)
    """
    payload = {
        "data": {
            "view": "Weekly",
            "ruleOf7": "true",
            "compStartDate": str(year),
            "compEndDate": str(week),
            "baseStartDate": str(year),
            "baseEndDate": str(week),
            "compFc": fc,
            "baseFc": fc,
            "compScenario": "OP2",
            "baseScenario": "Actuals",
            "comp_benchmark_fc_clusters": [],
            "base_benchmark_fc_clusters": [],
            "hours_type": "Hours",
        }
    }
    return json.dumps(payload)


def parse_prod_table(html: str) -> pd.DataFrame:
    tables = pd.read_html(StringIO(html), flavor="html5lib")
    if not tables:
        raise RuntimeError("No HTML tables found in Necro response.")
    for t in tables:
        cols = [str(c).strip().upper() for c in t.columns]
        if any("PATH" in c for c in cols):
            return t
    return tables[0]


def to_num(x):
    if pd.isna(x):
        return None
    s = str(x).strip().replace(",", "")
    m = re.search(r"-?\d+(\.\d+)?", s)
    if not m:
        return None
    try:
        return float(m.group(0))
    except Exception:
        return None


def extract_targets_from_table(df: pd.DataFrame) -> dict:
    """
    Extract OP2 TPH targets from Necro HTML table using proper aggregation.
    Uses the same logic as the regional productivity aggregator:
    - If "- Total" row exists for a path, use it directly
    - Otherwise, sum Small/Medium/Large/Heavy-Bulky sizes (weighted TPH = vol/hrs)
    - Direct paths (Transfer In Decant) taken as-is
    """
    df = df.copy()
    df.columns = [re.sub(r"\s+", " ", str(c).strip()) for c in df.columns]

    path_col = "Paths"
    base_vol_col = "Base Volume"
    base_hours_col = "Base Hours"
    base_tph_col = "Base TPH"

    df[path_col] = df[path_col].astype(str).str.strip()

    for c in [base_vol_col, base_hours_col, base_tph_col]:
        if c in df.columns:
            df[c] = df[c].apply(to_num)

    SIZE_SUFFIXES = [" - Small", " - Medium", " - Large", " - Heavy/Bulky", " - Heavy Bulky"]
    TOTAL_SUFFIXES = [" - Total"]

    def _aggregate_path(df: pd.DataFrame, path_family: str) -> float:
        """Get weighted TPH for a path family using Total row or summing sizes."""
        # 1) Try "- Total" row first
        for suffix in TOTAL_SUFFIXES:
            total_row = df[df[path_col].str.lower() == f"{path_family.lower()}{suffix.lower()}"]
            if not total_row.empty:
                vol = total_row[base_vol_col].apply(lambda x: x if x else 0).sum()
                hrs = total_row[base_hours_col].apply(lambda x: x if x else 0).sum()
                if hrs > 0:
                    return round(vol / hrs)
                tph = total_row[base_tph_col].iloc[0]
                return round(tph) if tph else 0

        # 2) Sum size rows (Small + Medium + Large + Heavy/Bulky)
        size_rows = pd.DataFrame()
        for suffix in SIZE_SUFFIXES:
            match = df[df[path_col].str.lower() == f"{path_family.lower()}{suffix.lower()}"]
            if not match.empty:
                size_rows = pd.concat([size_rows, match])

        if not size_rows.empty:
            vol = size_rows[base_vol_col].fillna(0).sum()
            hrs = size_rows[base_hours_col].fillna(0).sum()
            if hrs > 0:
                return round(vol / hrs)

        # 3) Try exact match (direct path like "Transfer In Decant")
        exact = df[df[path_col].str.lower() == path_family.lower()]
        if not exact.empty:
            vol = exact[base_vol_col].fillna(0).sum()
            hrs = exact[base_hours_col].fillna(0).sum()
            if hrs > 0:
                return round(vol / hrs)
            tph = exact[base_tph_col].iloc[0]
            return round(tph) if tph else 0

        return 0

    targets: Dict[str, float] = {}
    targets["STOW"] = _aggregate_path(df, "Each Transfer In")
    targets["DECANT"] = _aggregate_path(df, "Transfer In Decant")

    pick_tph = _aggregate_path(df, "Pick")
    targets["PICK_AR"] = pick_tph
    targets["P2R_PICK"] = pick_tph

    targets["P2R_PACK"] = _aggregate_path(df, "Pack Multis")
    targets["AFE_PACK"] = _aggregate_path(df, "Chutings")

    # Pack Singles (SM, SM2, etc.)
    targets["PACK_SINGLES"] = _aggregate_path(df, "Pack Singles")

    return targets


# ---------------- Main public function ----------------
def get_necro_targets(fc: str, force_refresh: bool = False) -> dict:
    fc = fc.strip().upper()
    year, week, _ = datetime.now().isocalendar()

    cache_file = CACHE_DIR / f"necro_targets_{fc}_{year}_W{week:02}.json"
    if cache_file.exists() and not force_refresh:
        return json.loads(cache_file.read_text(encoding="utf-8"))

    base_cookie = get_cookie(aea=True)
    s = WinHTTPSession(base_cookie)

    # GET bridges -> CSRF token (form)
    status, html, _ = s.request(
        "GET",
        BRIDGES_PAGE,
        headers={"User-Agent": UA, "Accept": "text/html,*/*", "Referer": BRIDGES_PAGE},
    )
    if status >= 400:
        raise RuntimeError(f"GET bridges failed {status}")

    csrf_form = extract_csrf_token_from_html(html)

    # Try CSRF cookie if present, else reuse form token
    m = re.search(r"(?:^|;\s*)csrftoken=([^;]+)", s.cookie_header)
    csrf_cookie = m.group(1) if m else csrf_form

    payload_str = build_payload(fc, year, week)
    body = urlencode({"csrfmiddlewaretoken": csrf_form, "data": payload_str})

    status2, resp_html, _ = s.request(
        "POST",
        BRIDGES_POST,
        headers={
            "User-Agent": UA,
            "Accept": "*/*",
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "X-Requested-With": "XMLHttpRequest",
            "X-CSRFToken": csrf_cookie,
            "Origin": NECRO_BASE,
            "Referer": BRIDGES_PAGE,
        },
        body=body,
    )
    if status2 >= 400:
        dbg = CACHE_DIR / "necro_last_response.html"
        dbg.write_text(resp_html, encoding="utf-8", errors="ignore")
        raise RuntimeError(f"POST bridges failed {status2}. Saved: {dbg}")

    # Debug dump
    debug_html = CACHE_DIR / "necro_last_response.html"
    debug_html.write_text(resp_html, encoding="utf-8", errors="ignore")

    df_table = parse_prod_table(resp_html)
    targets = extract_targets_from_table(df_table)

    out = {
        "fc": fc,
        "year": year,
        "week": week,
        "scenario": "OP2",
        "targets": targets,
        "generated_at": datetime.now().isoformat(timespec="seconds"),
        "source": "necro_html_table",
    }

    cache_file.write_text(json.dumps(out, indent=2), encoding="utf-8")
    return out


# ──────────────────────────────────────────────────────────
# WK-1 Necro: Mode groups (% to OP2 goal last week)
# ──────────────────────────────────────────────────────────

# Role → Mode group key
ROLE_TO_MODE_GROUP: dict[str, str] = {
    # IB
    "STOW":            "STOW",
    "QUANTITY_STOW":   "STOW",
    "DECANT":          "DECANT",
    # OB Pick
    "PICK_AR":         "PICK",
    "P2R_PICK":        "PICK",
    # OB Pack Multis
    "P2R_PACK":        "PACK_MULTIS",
    # OB Pack AFE (Chutings)
    "AFE_PACK":        "PACK_AFE",
    # OB Pack Singles
    "SM":              "PACK_SINGLES",
    "SM2":             "PACK_SINGLES",
    "SMMIX":           "PACK_SINGLES",
    "SNS1":            "PACK_SINGLES",
    "SNS2":            "PACK_SINGLES",
    "SINGLES":         "PACK_SINGLES",
    "WS_SLAM":         "PACK_SINGLES",
    "WS_VDF":          "PACK_SINGLES",
    # ICQA — sigma only, no Mode
    "ICQA_SIMPLE_BIN_COUNT": "ICQA",
}

# Mode group → necro path keys that feed into it
MODE_GROUP_NECRO_KEYS: dict[str, list[str]] = {
    "STOW":         ["STOW"],
    "DECANT":       ["DECANT"],
    "PICK":         ["PICK_AR"],
    "PACK_MULTIS":  ["P2R_PACK"],
    "PACK_AFE":     ["AFE_PACK"],
    "PACK_SINGLES": ["PACK_SINGLES"],
}


def _prev_iso_week(year: int, week: int) -> tuple[int, int]:
    """Return (year, week) for the ISO week prior to (year, week)."""
    if week > 1:
        return year, week - 1
    # week 1 → go back to last week of previous year
    from datetime import date
    dec28 = date(year - 1, 12, 28)          # always in last ISO week of prev year
    prev_year, prev_week, _ = dec28.isocalendar()
    return prev_year, prev_week


def get_necro_targets_wk1(fc: str, force_refresh: bool = False) -> dict:
    """
    Download Necro OP2 targets for last week (WK-1) and compute
    % to OP2 goal per Mode group using proper aggregation.

    Applies overrides from overrides.csv when OP2 targets are too aggressive.

    Returns:
    {
      "fc": "BCN4",
      "year": 2026, "week": 21,
      "targets_wk1": {"STOW": 280, "PICK_AR": 320, ...},
      "mode_groups": {
          "STOW":         {"target": 280, "actual_tph": 290, "op2_tph": 280, "pct_to_goal": 1.035, "mode": 3, "mode_name": "maintenance"},
          "PICK":         {"target": 320, "actual_tph": 310, "op2_tph": 320, "pct_to_goal": 0.968, "mode": 2, "mode_name": "improvement"},
          ...
      },
      "generated_at": "..."
    }
    """
    fc = fc.strip().upper()
    now_year, now_week, _ = datetime.now().isocalendar()
    wk1_year, wk1_week = _prev_iso_week(now_year, now_week)

    cache_file = CACHE_DIR / f"necro_wk1_{fc}_{wk1_year}_W{wk1_week:02}.json"
    if cache_file.exists() and not force_refresh:
        return json.loads(cache_file.read_text(encoding="utf-8"))

    log.info(f"Fetching WK-1 = {wk1_year} W{wk1_week:02} for {fc}…")

    base_cookie = get_cookie(aea=True)
    s = WinHTTPSession(base_cookie)

    # GET CSRF
    status, html, _ = s.request(
        "GET", BRIDGES_PAGE,
        headers={"User-Agent": UA, "Accept": "text/html,*/*", "Referer": BRIDGES_PAGE},
    )
    if status >= 400:
        raise RuntimeError(f"[NECRO WK1] GET bridges failed {status}")

    csrf_form = extract_csrf_token_from_html(html)
    m = re.search(r"(?:^|;\s*)csrftoken=([^;]+)", s.cookie_header)
    csrf_cookie = m.group(1) if m else csrf_form

    payload_str = build_payload_actuals_vs_op2(fc, wk1_year, wk1_week)
    body = urlencode({"csrfmiddlewaretoken": csrf_form, "data": payload_str})

    status2, resp_html, _ = s.request(
        "POST", BRIDGES_POST,
        headers={
            "User-Agent": UA, "Accept": "*/*",
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "X-Requested-With": "XMLHttpRequest",
            "X-CSRFToken": csrf_cookie,
            "Origin": NECRO_BASE, "Referer": BRIDGES_PAGE,
        },
        body=body,
    )
    if status2 >= 400:
        raise RuntimeError(f"[NECRO WK1] POST bridges failed {status2}")

    df_table = parse_prod_table(resp_html)

    # ── Extract OP2 targets using proper aggregation ──
    targets_wk1 = extract_targets_from_table(df_table)

    # ── Load overrides (if available) ──
    overrides: Dict[str, float] = {}  # path_lower → override_tph
    OVERRIDES_PATHS = [
        Path(r"\\ant\dept-eu\BCN4\Public\ProjectArgos\overrides.csv"),
        Path(r"\\ant\dept-eu\BCN4\Public\L-D  TRAININGS\Regional_view_productivity\overrides.csv"),
    ]
    for ov_path in OVERRIDES_PATHS:
        try:
            if ov_path.exists():
                ov_df = pd.read_csv(ov_path)
                ov_df.columns = [str(c).strip() for c in ov_df.columns]
                ov_df["FC"] = ov_df["FC"].astype(str).str.strip().str.upper()
                ov_df["Week"] = pd.to_numeric(ov_df["Week"], errors="coerce")
                ov_df["Override_TPH"] = pd.to_numeric(ov_df["Override_TPH"], errors="coerce")
                # Filter to this FC and week
                mask = (ov_df["FC"] == fc) & (ov_df["Week"] == wk1_week)
                for _, row in ov_df[mask].iterrows():
                    path_key = str(row.get("Path", "")).strip().lower()
                    override_val = row.get("Override_TPH")
                    if path_key and pd.notna(override_val) and override_val > 0:
                        overrides[path_key] = float(override_val)
                if overrides:
                    log.info(f"  Loaded {len(overrides)} override(s) for {fc} W{wk1_week}")
                break
        except Exception as e:
            log.info(f"  Override load failed (non-fatal): {e}")
            continue

    # ── Compute % to OP2 per mode group using proper aggregation ──
    # Same logic as extract_targets_from_table but computing Actual/OP2 ratio
    # In our payload: Base = Actuals, Comp = OP2
    df = df_table.copy()
    df.columns = [re.sub(r"\s+", " ", str(c).strip()) for c in df.columns]

    path_col = "Paths"
    df[path_col] = df[path_col].astype(str).str.strip()

    # Detect column names dynamically
    base_vol_col = next((c for c in df.columns if "BASE" in c.upper() and "VOLUME" in c.upper()), None)
    base_hrs_col = next((c for c in df.columns if "BASE" in c.upper() and "HOUR" in c.upper()), None)
    comp_vol_col = next((c for c in df.columns if "COMP" in c.upper() and "VOLUME" in c.upper()), None)
    comp_hrs_col = next((c for c in df.columns if "COMP" in c.upper() and "HOUR" in c.upper()), None)

    for c in [base_vol_col, base_hrs_col, comp_vol_col, comp_hrs_col]:
        if c and c in df.columns:
            df[c] = df[c].apply(to_num)

    SIZE_SUFFIXES = [" - Small", " - Medium", " - Large", " - Heavy/Bulky", " - Heavy Bulky"]
    TOTAL_SUFFIXES = [" - Total"]

    def _pct_to_goal_for_path(path_family: str) -> tuple[float | None, float, float]:
        """
        Compute % to OP2 for a path family using proper aggregation.
        Applies override if available for this FC+Week+Path.
        Returns (pct_ratio, actual_tph, op2_tph).
        """
        if not base_vol_col or not base_hrs_col or not comp_vol_col or not comp_hrs_col:
            return None, 0, 0

        # 1) Try "- Total" row
        for suffix in TOTAL_SUFFIXES:
            total_row = df[df[path_col].str.lower() == f"{path_family.lower()}{suffix.lower()}"]
            if not total_row.empty:
                bv = total_row[base_vol_col].fillna(0).sum()
                bh = total_row[base_hrs_col].fillna(0).sum()
                cv = total_row[comp_vol_col].fillna(0).sum()
                ch = total_row[comp_hrs_col].fillna(0).sum()
                actual_tph = bv / bh if bh > 0 else 0
                op2_tph = cv / ch if ch > 0 else 0
                # Apply override if exists
                ov = overrides.get(path_family.lower())
                if ov:
                    log.info(f"    Override applied for {path_family}: OP2 {op2_tph:.1f} → {ov:.1f}")
                    op2_tph = ov
                pct = (actual_tph / op2_tph) if op2_tph > 0 else None
                return pct, actual_tph, op2_tph

        # 2) Sum size rows
        size_rows = pd.DataFrame()
        for suffix in SIZE_SUFFIXES:
            match = df[df[path_col].str.lower() == f"{path_family.lower()}{suffix.lower()}"]
            if not match.empty:
                size_rows = pd.concat([size_rows, match])

        if not size_rows.empty:
            bv = size_rows[base_vol_col].fillna(0).sum()
            bh = size_rows[base_hrs_col].fillna(0).sum()
            cv = size_rows[comp_vol_col].fillna(0).sum()
            ch = size_rows[comp_hrs_col].fillna(0).sum()
            actual_tph = bv / bh if bh > 0 else 0
            op2_tph = cv / ch if ch > 0 else 0
            # Apply override if exists
            ov = overrides.get(path_family.lower())
            if ov:
                log.info(f"    Override applied for {path_family}: OP2 {op2_tph:.1f} → {ov:.1f}")
                op2_tph = ov
            pct = (actual_tph / op2_tph) if op2_tph > 0 else None
            return pct, actual_tph, op2_tph

        # 3) Exact match (direct path)
        exact = df[df[path_col].str.lower() == path_family.lower()]
        if not exact.empty:
            bv = exact[base_vol_col].fillna(0).sum()
            bh = exact[base_hrs_col].fillna(0).sum()
            cv = exact[comp_vol_col].fillna(0).sum()
            ch = exact[comp_hrs_col].fillna(0).sum()
            actual_tph = bv / bh if bh > 0 else 0
            op2_tph = cv / ch if ch > 0 else 0
            # Apply override if exists
            ov = overrides.get(path_family.lower())
            if ov:
                log.info(f"    Override applied for {path_family}: OP2 {op2_tph:.1f} → {ov:.1f}")
                op2_tph = ov
            pct = (actual_tph / op2_tph) if op2_tph > 0 else None
            return pct, actual_tph, op2_tph

        return None, 0, 0

    # Mode group → Necro path family name (matching aggregator canonical names)
    GROUP_PATH_FAMILIES: dict[str, str] = {
        "STOW":         "Each Transfer In",
        "DECANT":       "Transfer In Decant",
        "PICK":         "Pick",
        "PACK_MULTIS":  "Pack Multis",
        "PACK_AFE":     "Chutings",
        "PACK_SINGLES": "Pack Singles",
    }

    def _mode_from_pct(pct: float | None) -> str:
        """Classify mode from % to OP2 ratio."""
        if pct is None:
            return "urgent"  # default to most conservative if unknown
        if pct >= 1.00:
            return "maintenance"
        if pct >= 0.90:
            return "improvement"
        return "urgent"

    def _mode_int_from_pct(pct: float | None) -> int:
        """Mode as integer: 1=urgent, 2=improvement, 3=maintenance."""
        if pct is None:
            return 1
        if pct >= 1.00:
            return 3
        if pct >= 0.90:
            return 2
        return 1

    mode_groups: dict[str, dict] = {}
    for group, path_family in GROUP_PATH_FAMILIES.items():
        pct, actual_tph, op2_tph = _pct_to_goal_for_path(path_family)
        mode_int = _mode_int_from_pct(pct)
        mode_str = _mode_from_pct(pct)

        # Get target from extracted targets
        necro_keys = MODE_GROUP_NECRO_KEYS.get(group, [])
        target_val = next(
            (targets_wk1[k] for k in necro_keys if k in targets_wk1 and targets_wk1[k] > 0),
            0
        )

        mode_groups[group] = {
            "target": target_val,
            "actual_tph": round(actual_tph, 1) if actual_tph else 0,
            "op2_tph": round(op2_tph, 1) if op2_tph else 0,
            "pct_to_goal": round(pct, 4) if pct is not None else None,
            "pct_display": round(pct * 100, 1) if pct is not None else None,
            "mode": mode_int,
            "mode_name": mode_str,
        }
        if pct is not None:
            log.info(f"  {group}: Actual={actual_tph:.0f} vs OP2={op2_tph:.0f} → {pct:.1%} → {mode_str.upper()} (Mode {mode_int})")
        else:
            log.info(f"  {group}: no data → URGENT (Mode 1, fallback)")

    out = {
        "fc": fc,
        "year": wk1_year,
        "week": wk1_week,
        "targets_wk1": targets_wk1,
        "mode_groups": mode_groups,
        "generated_at": datetime.now().isoformat(timespec="seconds"),
    }
    cache_file.write_text(json.dumps(out, indent=2), encoding="utf-8")

    # Purge old WK-1 cache files for this FC (keep only the one just written)
    removed = 0
    for old in CACHE_DIR.glob(f"necro_wk1_{fc}_*.json"):
        if old.resolve() != cache_file.resolve():
            try:
                old.unlink()
                removed += 1
            except Exception:
                pass
    if removed:
        log.info("🧹 Purged {removed} old WK-1 cache file(s)")

    log.info("✅ Saved: {cache_file}")
    return out


def get_mode_for_role(role: str, mode_groups: dict) -> int:
    """
    Return Mode (1/2/3) for a given role based on WK-1 necro mode_groups.
    ICQA roles return None (sigma-only, no Mode filter).
    """
    r = str(role).strip().upper()
    group = ROLE_TO_MODE_GROUP.get(r)
    if group is None or group == "ICQA":
        return None  # ICQA: sigma only
    mg = mode_groups.get(group, {})
    return mg.get("mode", 1)


if __name__ == "__main__":
    fc = input("FC (default BCN4): ").strip() or "BCN4"
    force = ("--refresh" in sys.argv) or ("-r" in sys.argv)
    result = get_necro_targets(fc, force_refresh=force)
    print(json.dumps(result, indent=2))
    log.info("\n✅ Cache saved in: {CACHE_DIR}")

    print("\n--- WK-1 Mode groups ---")
    wk1 = get_necro_targets_wk1(fc, force_refresh=force)
    print(json.dumps(wk1, indent=2))