from __future__ import annotations

import json
import os
import time
from datetime import datetime, timedelta, timezone
from pathlib import Path
from typing import Any, Dict, List, Optional, Tuple

import win32com.client

from project_hermes.config import get_paths
from project_hermes.core.auth_midway import get_cookie
from project_hermes.core.logger import get_logger
log = get_logger(__name__)


# =========================================================
# Config
# =========================================================
paths = get_paths()
CACHE_DIR = Path(paths.cache)
CACHE_DIR.mkdir(parents=True, exist_ok=True)

GC_HOST = "https://guided-coaching-dub.corp.amazon.com"
GC_ENDPOINT = f"{GC_HOST}/api/coaching/SearchCoachingInstances"

UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:140.0) Gecko/20100101 Firefox/140.0"

# ✅ fijo como pediste
DAYS_FIXED = 3

# ✅ SOLO manual (lista explícita mínima; la podrás mover a JSON luego)
DEFAULT_MANUAL_REASONS = [
    "MANUAL_QUALITY_COACHING_FOR_STOW",
    "MANUAL_PRODUCTIVITY_COACHING_FOR_STOW",
    "MANUAL_QUALITY_COACHING_FOR_PICK",
    "MANUAL_PRODUCTIVITY_COACHING_FOR_PICK",
    "MANUAL_QUALITY_COACHING_FOR_PACK",
    "MANUAL_PRODUCTIVITY_COACHING_FOR_PACK",
    "MANUAL_QUALITY_COACHING_FOR_REBIN",
    "MANUAL_PRODUCTIVITY_COACHING_FOR_REBIN",
    "MANUAL_QUALITY_COACHING_FOR_INDUCT",
    "MANUAL_PRODUCTIVITY_COACHING_FOR_INDUCT",
    "MANUAL_QUALITY_COACHING_FOR_RECEIVE",
    "MANUAL_PRODUCTIVITY_COACHING_FOR_RECEIVE",
    "MANUAL_QUALITY_COACHING_FOR_ICQA",
    "MANUAL_PRODUCTIVITY_COACHING_FOR_ICQA",
]


# =========================================================
# Helpers
# =========================================================
def _iso_z(dt: datetime) -> str:
    if dt.tzinfo is None:
        dt = dt.replace(tzinfo=timezone.utc)
    dt = dt.astimezone(timezone.utc)
    return dt.isoformat(timespec="milliseconds").replace("+00:00", "Z")


def _cache_path(fc: str) -> Path:
    today = datetime.now().strftime("%Y-%m-%d")
    return CACHE_DIR / f"guided_coaching_history_{fc.upper()}_{today}.json"


def _debug_path(fc: str) -> Path:
    today = datetime.now().strftime("%Y-%m-%d")
    return CACHE_DIR / f"guided_coaching_last_response_{fc.upper()}_{today}.txt"


def _raw_path(fc: str) -> Path:
    today = datetime.now().strftime("%Y-%m-%d")
    return CACHE_DIR / f"guided_coaching_last_payload_{fc.upper()}_{today}.json"


def _json_loads_relaxed(raw: str) -> dict:
    s = (raw or "").lstrip()
    if s.startswith("Unblock,"):
        s = s.split(",", 1)[1].lstrip()
    for prefix in ("while(1);", "for(;;);"):
        if s.startswith(prefix):
            s = s[len(prefix):].lstrip()
    return json.loads(s)


def _extract_instances(data: Dict[str, Any]) -> List[Dict[str, Any]]:
    if not isinstance(data, dict):
        return []
    v = data.get("coachingInstances")
    if isinstance(v, list):
        return v
    d = data.get("data")
    if isinstance(d, dict) and isinstance(d.get("coachingInstances"), list):
        return d["coachingInstances"]
    return []


def _dedupe_instances(items: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    out: List[Dict[str, Any]] = []
    seen = set()
    for it in items:
        if not isinstance(it, dict):
            continue
        iid = ""
        if isinstance(it.get("instanceId"), dict):
            iid = str(it["instanceId"].get("id") or "").strip()
        if not iid:
            iid = str(it.get("id") or it.get("coachingInstanceId") or "").strip()
        if not iid or iid in seen:
            continue
        seen.add(iid)
        out.append(it)
    return out


# =========================================================
# WinHTTP client (same pattern as uploader)
# =========================================================
class GuidedCoachingHistoryClient:
    def __init__(self, base_url: str = GC_HOST, debug: bool = True):
        self.base_url = base_url.rstrip("/")
        self.debug = debug
        self._http = win32com.client.Dispatch("WinHTTP.WinHTTPRequest.5.1")

    def _cookie_header(self) -> str:
        # ✅ usa el mismo auth que el uploader (ya probado)
        return get_cookie(aea=True, max_tries=4)

    def _establish_session(self) -> None:
        self._http.Open("GET", self.base_url + "/", False)
        self._http.SetAutoLogonPolicy(0)
        self._http.SetTimeouts(15000, 15000, 60000, 60000)
        self._http.SetRequestHeader("Cookie", self._cookie_header())
        self._http.SetRequestHeader("User-Agent", UA)
        self._http.SetRequestHeader("Accept", "text/html,application/xhtml+xml,*/*")
        self._http.Send()
        if self.debug:
            log.info("GET / -> {int(self._http.Status)}")

    def post_json(self, url: str, payload: dict, max_tries: int = 3) -> Tuple[int, str, str]:
        body = json.dumps(payload)
        last_text = ""
        last_status = 0
        last_url = url

        for attempt in range(1, max_tries + 1):
            self._http.Open("POST", url, False)
            self._http.SetAutoLogonPolicy(0)
            self._http.SetTimeouts(15000, 15000, 60000, 60000)
            self._http.SetRequestHeader("Cookie", self._cookie_header())
            # ✅ match browser
            self._http.SetRequestHeader("Content-Type", "application/json;charset=utf-8")
            self._http.SetRequestHeader("Accept", "application/json")
            self._http.SetRequestHeader("Origin", self.base_url)
            self._http.SetRequestHeader("Referer", self.base_url + "/")
            self._http.SetRequestHeader("User-Agent", UA)
            self._http.SetRequestHeader("X-Requested-With", "XMLHttpRequest")
            self._http.SetRequestHeader("Sec-Fetch-Dest", "empty")
            self._http.SetRequestHeader("Sec-Fetch-Mode", "cors")
            self._http.SetRequestHeader("Sec-Fetch-Site", "same-origin")

            self._http.Send(body)

            last_status = int(self._http.Status)
            last_text = self._http.ResponseText or ""
            last_url = url

            if self.debug:
                log.info("POST attempt {attempt}/{max_tries} -> {last_status} (len={len(last_text)})")
                if last_text:
                    log.info("resp head: {last_text[:200]!r}")

            # retry on auth-ish html
            if last_status in (401, 403):
                time.sleep(0.5)
                continue

            # if HTML, do the "SSO dance" once
            if "<!doctype" in (last_text or "").lower() or (last_text or "").lstrip().startswith("<"):
                if attempt < max_tries:
                    time.sleep(0.4)
                    continue

            return last_status, last_text, last_url

        return last_status, last_text, last_url


# =========================================================
# Public API
# =========================================================
def _purge_old_gc_cache(fc: str, keep: Path) -> None:
    """
    Delete all guided_coaching_history / debug / raw / http dump files
    for this FC except the one we just wrote (keep).
    """
    patterns = [
        f"guided_coaching_history_{fc.upper()}_*.json",
        f"guided_coaching_last_response_{fc.upper()}_*.txt",
        f"guided_coaching_last_payload_{fc.upper()}_*.json",
        f"guided_coaching_http_*_{fc.upper()}_*.txt",
    ]
    removed = 0
    for pat in patterns:
        for f in CACHE_DIR.glob(pat):
            if f.resolve() == keep.resolve():
                continue
            try:
                f.unlink()
                removed += 1
            except Exception:
                pass
    if removed:
        log.info("🧹 Purged {removed} old GC cache file(s) for {fc.upper()}")


def fetch_guided_coaching_history(
    fc: str,
    force_refresh: bool = False,
    manual_reasons: Optional[List[str]] = None,
) -> Dict[str, Any]:
    fc = (fc or "").strip().upper()
    cache_file = _cache_path(fc)
    dbg_file = _debug_path(fc)
    raw_file = _raw_path(fc)

    if cache_file.exists() and not force_refresh:
        log.info("Using cached: {cache_file.name}")
        return json.loads(cache_file.read_text(encoding="utf-8"))

    reasons = manual_reasons if manual_reasons else DEFAULT_MANUAL_REASONS

    now = datetime.now(timezone.utc)
    start = now - timedelta(days=DAYS_FIXED)

    payload: Dict[str, Any] = {
        "building": {"code": fc},
        "creationTimeRange": {"startTime": _iso_z(start), "endTime": _iso_z(now)},
        # ✅ EXACT browser format
        "statuses": "[\"COMPLETED\"]",
        "filters": [
            {
                "_filterType": "attribute",
                "attribute": "COACHING_REASON",
                "values": reasons,
                "negate": False,
            }
        ],
    }

    dbg_lines = []
    dbg_lines.append(f"[INFO] ROOT={paths.root}\n")
    dbg_lines.append(f"[INFO] CACHE_DIR={CACHE_DIR}\n")
    dbg_lines.append(f"[INFO] cache_file={cache_file}\n")
    dbg_lines.append(f"[INFO] endpoint={GC_ENDPOINT}\n")
    dbg_lines.append(f"[INFO] days_fixed={DAYS_FIXED}\n")
    dbg_lines.append(f"[INFO] manual_reasons_count={len(reasons)}\n")

    c = GuidedCoachingHistoryClient(debug=False)

    # ✅ critical: establish session like uploader
    c._establish_session()

    status, text, _ = c.post_json(GC_ENDPOINT, payload, max_tries=3)

    # dump everything for debugging
    dump_file = CACHE_DIR / f"guided_coaching_http_{status}_{fc}_{datetime.now().strftime('%Y-%m-%d_%H%M%S')}.txt"
    try:
        dump_file.write_text(
            f"URL: {GC_ENDPOINT}\n\nREQUEST BODY:\n{json.dumps(payload, indent=2)}\n\nRESPONSE:\n{text}",
            encoding="utf-8",
            errors="ignore",
        )
    except Exception:
        pass

    head = (text or "")[:2000]
    dbg_lines.append(f"[GC] status={status}\n")
    dbg_lines.append(f"[GC] resp_head={head}\n")
    dbg_lines.append(f"[GC] dump_file={dump_file}\n")
    dbg_file.write_text("".join(dbg_lines), encoding="utf-8", errors="ignore")

    if status != 200:
        raise RuntimeError(f"Guided Coaching history failed. HTTP {status}. See: {dump_file}")

    if not text:
        raise RuntimeError("Guided Coaching history failed. Empty response.")

    data = _json_loads_relaxed(text)

    try:
        raw_file.write_text(json.dumps(data, indent=2), encoding="utf-8", errors="ignore")
    except Exception:
        pass

    items = _dedupe_instances(_extract_instances(data))
    out = {"coachingInstances": items}

    cache_file.write_text(json.dumps(out, indent=2), encoding="utf-8", errors="ignore")

    # Purge old GC cache files — keep only today's
    _purge_old_gc_cache(fc, keep=cache_file)

    return out


# =========================================================
# CLI
# =========================================================
def main():
    import sys

    fc = (sys.argv[1] if len(sys.argv) > 1 else "BCN4").strip().upper()
    data = fetch_guided_coaching_history(fc=fc, force_refresh=True)
    n = len(data.get("coachingInstances", []))
    log.info("✅ Guided Coaching history OK | fc={fc} | days={DAYS_FIXED} | instances={n}")
    log.info("Cache: {_cache_path(fc)}")
    log.info("Debug: {_debug_path(fc)}")


if __name__ == "__main__":
    main()