# src/project_hermes/domains/necro_targets.py
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

from project_hermes.config import get_paths
from project_hermes.core.auth_midway import get_cookie
from project_hermes.core.logger import get_logger
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
    comp = Actuals (what really happened last week)
    base = OP2 (the target)
    → Comp TPH / Base TPH = % to goal
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
            "compScenario": "Actuals",
            "baseScenario": "OP2",
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
    df = df.copy()
    df.columns = [re.sub(r"\s+", " ", str(c).strip()) for c in df.columns]

    path_col = "Paths"
    base_vol_col = "Base Volume"
    base_hours_col = "Base Hours"
    base_tph_col = "Base TPH"

    df[path_col] = df[path_col].astype(str).str.strip()
    df["PATH_UP"] = df[path_col].str.upper()

    for c in [base_vol_col, base_hours_col, base_tph_col]:
        if c in df.columns:
            df[c] = df[c].apply(to_num)

    targets: Dict[str, float] = {}

    stow_row = df[df["PATH_UP"] == "EACH TRANSFER IN - TOTAL"]
    targets["STOW"] = round(stow_row.iloc[0][base_tph_col]) if not stow_row.empty and stow_row.iloc[0][base_tph_col] is not None else 0

    pick_row = df[df["PATH_UP"] == "PICKING"]
    if not pick_row.empty:
        v = pick_row.iloc[0][base_tph_col]
        v2 = round(v) if v is not None else 0
        targets["PICK_AR"] = v2
        targets["P2R_PICK"] = v2
    else:
        targets["PICK_AR"] = 0
        targets["P2R_PICK"] = 0

    pack = df[df["PATH_UP"].str.startswith("PACK MULTIS - ", na=False)]
    if not pack.empty and base_vol_col in df.columns and base_hours_col in df.columns:
        vol = pack[base_vol_col].fillna(0).sum()
        hrs = pack[base_hours_col].fillna(0).sum()
        targets["P2R_PACK"] = round(vol / hrs) if hrs > 0 else 0
    else:
        targets["P2R_PACK"] = 0

    chut = df[df["PATH_UP"].str.startswith("CHUTINGS - ", na=False)]
    if not chut.empty and base_vol_col in df.columns and base_hours_col in df.columns:
        vol = chut[base_vol_col].fillna(0).sum()
        hrs = chut[base_hours_col].fillna(0).sum()
        targets["AFE_PACK"] = round(vol / hrs) if hrs > 0 else 0
    else:
        targets["AFE_PACK"] = 0

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
    "DECANT":          "DECANT",          # Transfer In Decant — separate from Stow
    # OB Pick
    "PICK_AR":         "PICK",
    "P2R_PICK":        "PICK",
    # OB Pack Multis
    "P2R_PACK":        "PACK_MULTIS",
    "AFE_PACK":        "PACK_MULTIS",
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
    "PICK":         ["PICK_AR", "P2R_PICK"],
    "PACK_MULTIS":  ["P2R_PACK", "AFE_PACK"],
    "PACK_SINGLES": ["P2R_PACK"],   # singles use same pack target row in necro
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
    % to OP2 goal per Mode group.

    Returns:
    {
      "fc": "BCN4",
      "year": 2026, "week": 7,
      "targets_wk1": {"STOW": 280, "PICK_AR": 320, ...},
      "mode_groups": {
          "STOW":         {"target": 280, "actual": 258, "pct": 0.921, "mode": 2},
          "PICK":         {"target": 320, "actual": 290, "pct": 0.906, "mode": 2},
          "PACK_MULTIS":  {"target": 200, "actual": 178, "pct": 0.890, "mode": 1},
          "PACK_SINGLES": {"target": 185, "actual": 201, "pct": 1.086, "mode": 3},
      },
      "generated_at": "..."
    }

    NOTE: "actual" is the Necro Base TPH from WK-1 (which IS the actual performance
    of that week vs. the OP2 target stored in that same week's necro row).
    The % to goal = actual / target for each path row.
    """
    fc = fc.strip().upper()
    now_year, now_week, _ = datetime.now().isocalendar()
    wk1_year, wk1_week = _prev_iso_week(now_year, now_week)

    cache_file = CACHE_DIR / f"necro_wk1_{fc}_{wk1_year}_W{wk1_week:02}.json"
    if cache_file.exists() and not force_refresh:
        return json.loads(cache_file.read_text(encoding="utf-8"))

    log.info("Fetching WK-1 = {wk1_year} W{wk1_week:02} for {fc}…")

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

    # ── Extract raw targets (same logic as current week) ──
    targets_wk1 = extract_targets_from_table(df_table)

    # ── Also extract % to OP2 per path row for mode calculation ──
    # We need "Comp TPH" (actual) and "Base TPH" (OP2 target) from the table
    df = df_table.copy()
    df.columns = [re.sub(r"\s+", " ", str(c).strip()) for c in df.columns]
    df["PATH_UP"] = df["Paths"].astype(str).str.strip().str.upper() if "Paths" in df.columns else ""

    comp_tph_col = next((c for c in df.columns if "COMP" in c.upper() and "TPH" in c.upper()), None)
    base_tph_col = next((c for c in df.columns if "BASE" in c.upper() and "TPH" in c.upper()), None)

    def _pct_to_goal_for_paths(path_starts: list[str]) -> float | None:
        """
        % to OP2 goal = Comp TPH (Actuals) / Base TPH (OP2).
        Weighted by Comp Volume across all matching path rows.
        """
        rows = df[df["PATH_UP"].apply(
            lambda p: any(p.startswith(ps.upper()) for ps in path_starts)
        )]
        if rows.empty:
            return None

        # Weighted approach: sum(comp_vol) / sum(comp_hours) vs sum(base_vol) / sum(base_hours)
        comp_vol_col  = next((c for c in df.columns if "COMP" in c.upper() and "VOLUME" in c.upper()), None)
        comp_hrs_col  = next((c for c in df.columns if "COMP" in c.upper() and "HOUR"   in c.upper()), None)
        base_vol_col  = next((c for c in df.columns if "BASE" in c.upper() and "VOLUME" in c.upper()), None)
        base_hrs_col  = next((c for c in df.columns if "BASE" in c.upper() and "HOUR"   in c.upper()), None)

        if comp_vol_col and comp_hrs_col and base_vol_col and base_hrs_col:
            try:
                cv = rows[comp_vol_col].apply(to_num).fillna(0).sum()
                ch = rows[comp_hrs_col].apply(to_num).fillna(0).sum()
                bv = rows[base_vol_col].apply(to_num).fillna(0).sum()
                bh = rows[base_hrs_col].apply(to_num).fillna(0).sum()
                actual_tph = cv / ch if ch > 0 else None
                target_tph = bv / bh if bh > 0 else None
                if actual_tph and target_tph and target_tph > 0:
                    return actual_tph / target_tph
            except Exception:
                pass

        # Fallback: simple Comp TPH / Base TPH ratio (unweighted average across rows)
        if comp_tph_col and base_tph_col:
            comp_vals = rows[comp_tph_col].apply(to_num)
            base_vals = rows[base_tph_col].apply(to_num)
            pairs = [(c, b) for c, b in zip(comp_vals, base_vals)
                     if c is not None and b is not None and b > 0]
            if pairs:
                return sum(c / b for c, b in pairs) / len(pairs)

        return None

    # Path prefixes per mode group
    GROUP_PATH_PREFIXES: dict[str, list[str]] = {
        "STOW":         ["EACH TRANSFER IN"],
        "DECANT":       ["TRANSFER IN DECANT"],
        "PICK":         ["PICKING"],
        "PACK_MULTIS":  ["PACK MULTIS"],
        "PACK_SINGLES": ["CHUTINGS"],
    }

    def _mode_from_pct(pct: float | None) -> int:
        if pct is None:
            return 1  # default to mode 1 (most conservative) if unknown
        if pct >= 1.00:
            return 3
        if pct >= 0.90:
            return 2
        return 1

    mode_groups: dict[str, dict] = {}
    for group, prefixes in GROUP_PATH_PREFIXES.items():
        pct = _pct_to_goal_for_paths(prefixes)
        mode = _mode_from_pct(pct)
        # get representative target
        necro_keys = MODE_GROUP_NECRO_KEYS.get(group, [])
        target_val = next(
            (targets_wk1[k] for k in necro_keys if k in targets_wk1 and targets_wk1[k] > 0),
            0
        )
        mode_groups[group] = {
            "target": target_val,
            "pct_to_goal": round(pct, 4) if pct is not None else None,
            "mode": mode,
        }
        log.info(f"{group}: pct={pct:.1%} → Mode {mode}" if pct else
                 f"{group}: no data → Mode 1 (fallback)")

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