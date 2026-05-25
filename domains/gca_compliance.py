"""
GCA Compliance Pipeline
========================
Independent pipeline that fetches PENDING + COMPLETED coaching instances
from GCA for the last 7 days, classifies them using the LEGEND mapping,
fetches location/presence, and returns compliance stats by owner.

Does NOT run with Performance or Quality pipelines.
"""
from __future__ import annotations

import json
import unicodedata
import re
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import datetime, timedelta, timezone
from pathlib import Path
from typing import Any, Dict, List, Optional

from project_hermes.config import get_paths
from project_hermes.core.logger import get_logger
from project_hermes.domains.guided_coaching_history import (
    GuidedCoachingHistoryClient,
    GC_ENDPOINT,
    GC_HOST,
    _iso_z,
    _json_loads_relaxed,
    _dedupe_instances,
    _extract_instances,
)

log = get_logger(__name__)

paths = get_paths()
CONFIG_DIR = Path(paths.root) / "config" / "hermes"
CACHE_DIR = Path(paths.cache)
CACHE_DIR.mkdir(parents=True, exist_ok=True)

DAYS_RANGE = 7
ALLOWED_SCENARIOS = ["MANUAL_COACHING", "HIGH_DEFECTS"]
OWNERS = ["L&D", "Team Lead IB", "Team Lead OB", "ICQA", "Area Manager IB", "Area Manager OB"]

LOCATION_ENDPOINT = f"{GC_HOST}/api/employee-location-svc/GetLastSeenLocationOfEmployee"
PROFILE_ENDPOINT = f"{GC_HOST}/api/associate-profile-svc/GetAssociateProfilesByIdentifier"
PHOTO_BASE = "https://badgephotos.amazon.com/?Region=Master&FullsizeImage=Yes&uid="

# Batch sizes
PROFILE_BATCH = 50
LOCATION_BATCH = 25
DELAY_MS = 50


# ═══════════════════════════════════════════════════
# LEGEND loading + normalization
# ═══════════════════════════════════════════════════
def _load_legend() -> Dict[str, Dict[str, str]]:
    fp = CONFIG_DIR / "gca_legend.json"
    if not fp.exists():
        return {}
    cfg = json.loads(fp.read_text(encoding="utf-8"))
    return cfg.get("legend", {})


def _load_derive_rules() -> Dict[str, Any]:
    fp = CONFIG_DIR / "gca_legend.json"
    if not fp.exists():
        return {"patterns": [], "default": {"cat": "Productivity", "owner": "L&D"}}
    cfg = json.loads(fp.read_text(encoding="utf-8"))
    return cfg.get("derive_rules", {"patterns": [], "default": {"cat": "Productivity", "owner": "L&D"}})


def _normalize_key(value: str) -> str:
    """Normalize a course title for LEGEND lookup."""
    s = unicodedata.normalize("NFKC", str(value or ""))
    s = s.replace("\u00A0", " ")
    s = re.sub(r"[\u2010-\u2015]", "-", s)
    s = re.sub(r"\s+", " ", s)
    s = re.sub(r"\s*/\s*", "/", s)
    return s.strip().upper()


_legend_cache: Optional[Dict[str, Dict[str, str]]] = None


def _get_legend_normalized() -> Dict[str, Dict[str, str]]:
    global _legend_cache
    if _legend_cache is None:
        raw = _load_legend()
        _legend_cache = {_normalize_key(k): v for k, v in raw.items()}
    return _legend_cache


def lookup_legend(course_title: str) -> Optional[Dict[str, str]]:
    normalized = _normalize_key(course_title)
    return _get_legend_normalized().get(normalized)


def derive_category(reason: str) -> Dict[str, str]:
    """Fallback classification when course title not in LEGEND."""
    rules = _load_derive_rules()
    r = (reason or "").upper()
    for pat in rules.get("patterns", []):
        if pat["match"] in r:
            return {"cat": pat["cat"], "owner": pat["owner"]}
    return rules.get("default", {"cat": "Productivity", "owner": "L&D"})


# ═══════════════════════════════════════════════════
# GCA API fetching
# ═══════════════════════════════════════════════════
def _fetch_gca_instances(fc: str, status: str, client: GuidedCoachingHistoryClient) -> List[Dict]:
    """
    Fetch coaching instances from GCA API.
    Always fetches WITHOUT presence filter — presence is resolved later via location API.
    """
    now = datetime.now(timezone.utc)
    start = now - timedelta(days=DAYS_RANGE)

    payload = {
        "building": {"code": fc},
        "creationTimeRange": {"startTime": _iso_z(start), "endTime": _iso_z(now)},
        "statuses": f'["{status}"]',
        "filters": [],
    }

    http_status, text, _ = client.post_json(GC_ENDPOINT, payload, max_tries=3)

    if http_status != 200:
        log.error(f"GCA Compliance fetch ({status}) failed: HTTP {http_status}")
        return []

    if not text:
        return []

    data = _json_loads_relaxed(text)
    instances = _dedupe_instances(_extract_instances(data))
    return instances


def _fetch_profiles(emp_ids: List[str], client: GuidedCoachingHistoryClient) -> Dict[str, Dict]:
    """Fetch associate profiles in batches. Uses disk cache (1h TTL) to avoid redundant requests."""
    # Check disk cache first
    cache_fp = CACHE_DIR / "gca_profiles_cache.json"
    cached_profiles: Dict[str, Dict] = {}
    if cache_fp.exists():
        try:
            cache_data = json.loads(cache_fp.read_text(encoding="utf-8"))
            cache_ts = cache_data.get("_ts", "")
            if cache_ts:
                cached_at = datetime.fromisoformat(cache_ts)
                if (datetime.now(timezone.utc) - cached_at).total_seconds() < 3600:
                    cached_profiles = cache_data.get("profiles", {})
        except Exception:
            pass

    # Determine which IDs still need fetching
    missing_ids = [eid for eid in emp_ids if eid not in cached_profiles]
    profiles: Dict[str, Dict] = dict(cached_profiles)

    if missing_ids:
        for i in range(0, len(missing_ids), PROFILE_BATCH):
            batch = missing_ids[i:i + PROFILE_BATCH]
            payload = {"employeeIds": json.dumps(batch)}
            try:
                status, text, _ = client.post_json(PROFILE_ENDPOINT, payload, max_tries=2)
                if status == 200 and text:
                    data = _json_loads_relaxed(text)
                    emp_map = data.get("employeeIdToEmployee") or {}
                    profiles.update(emp_map)
            except Exception as e:
                log.warning(f"Profile batch failed: {e}")
            if i + PROFILE_BATCH < len(missing_ids):
                time.sleep(DELAY_MS / 1000)

        # Save updated cache
        try:
            cache_out = {"_ts": datetime.now(timezone.utc).isoformat(), "profiles": profiles}
            cache_fp.write_text(json.dumps(cache_out, ensure_ascii=False), encoding="utf-8")
        except Exception:
            pass

    log.info(f"Profiles: {len(cached_profiles)} cached, {len(missing_ids)} fetched, {len(profiles)} total")
    return profiles


def _fetch_location_standalone(emp_id: str, cookie: str) -> Dict[str, Any]:
    """Fetch last seen location for one employee using a thread-local WinHTTP instance."""
    import pythoncom
    import win32com.client as _win32
    url = f"{LOCATION_ENDPOINT}?employeeId={emp_id}"
    try:
        pythoncom.CoInitialize()
        http = _win32.Dispatch("WinHTTP.WinHTTPRequest.5.1")
        http.Open("GET", url, False)
        http.SetAutoLogonPolicy(0)
        http.SetTimeouts(10000, 10000, 30000, 30000)
        http.SetRequestHeader("Cookie", cookie)
        http.SetRequestHeader("Accept", "application/json")
        http.SetRequestHeader("User-Agent", "Mozilla/5.0")
        http.Send()
        status = int(http.Status)
        if status != 200:
            return {"status": "UNKNOWN"}
        text = http.ResponseText
        data = json.loads(text) if text else {}
        loc = data.get("location") or {}
        emp = (loc.get("currentEmployees") or [{}])[0]
        attrs = emp.get("attributes") or {}
        return {
            "station": loc.get("locationId") or "",
            "processPath": attrs.get("ProcessPath") or "",
            "status": emp.get("status") or "UNKNOWN",
        }
    except Exception:
        return {"status": "UNKNOWN"}
    finally:
        try:
            pythoncom.CoUninitialize()
        except Exception:
            pass


def _fetch_location(emp_id: str, client: GuidedCoachingHistoryClient) -> Dict[str, Any]:
    """Fetch last seen location for a single employee (single-threaded fallback)."""
    from project_hermes.core.auth_midway import get_cookie
    return _fetch_location_standalone(emp_id, get_cookie(aea=True, max_tries=2))


def _enrich_instance(raw: Dict) -> Dict[str, Any]:
    """Extract relevant fields from a raw coaching instance."""
    cid = raw.get("coachingInstanceData") or raw
    coachee = cid.get("coachee") or {}
    details = cid.get("coachingReasonDetails") or {}

    instance_id = ""
    if raw.get("instanceId"):
        instance_id = raw["instanceId"].get("id", "")

    return {
        "id": instance_id,
        "employee_id": str(coachee.get("employeeID") or "").strip(),
        "reason": cid.get("coachingReason") or "",
        "scenario": cid.get("coachingScenario") or "",
        "course_title": (details.get("lmsCourseTitle") or {}).get("detail") or "",
        "created": cid.get("creationTime") or "",
        "comment": (details.get("creatorComment") or {}).get("detail") or "",
        "status": cid.get("status") or raw.get("status") or "",
    }


def _classify_item(item: Dict) -> None:
    """Classify a coaching item using LEGEND or fallback rules. Mutates item in-place."""
    leg = lookup_legend(item["course_title"])
    if leg:
        item["insight"] = leg["insight"]
        item["cat"] = leg["cat"]
        item["owner"] = leg["owner"]
    elif item["scenario"] == "HIGH_DEFECTS":
        item["insight"] = _format_reason(item["reason"])
        item["cat"] = "Reactive"
        item["owner"] = "L&D"
    else:
        derived = derive_category(item["reason"])
        item["insight"] = item["course_title"] or _format_reason(item["reason"])
        item["cat"] = derived["cat"]
        item["owner"] = derived["owner"]


# ═══════════════════════════════════════════════════
# Pipeline
# ═══════════════════════════════════════════════════
def run_gca_compliance_pipeline(
    fc: str,
    on_progress=None,
) -> Dict[str, Any]:
    """
    Full GCA Compliance pipeline:
      1) Fetch PENDING instances (no presence filter)
      2) Fetch COMPLETED instances (no presence filter)
      3) Fetch profiles (login, name)
      4) Fetch locations (presence/station)
      5) Classify each using LEGEND
      6) Aggregate by owner
      7) Cache results
    """
    fc = (fc or "BCN4").strip().upper()

    def _prog(pct, msg):
        if on_progress:
            try:
                on_progress(pct, msg)
            except Exception:
                pass

    # Create GCA client (reuse session)
    client = GuidedCoachingHistoryClient(debug=False)
    client._establish_session()

    _prog(5, "🔍 Fetching PENDING coachings...")
    pending_raw = _fetch_gca_instances(fc, "PENDING", client)
    _prog(25, f"✓ {len(pending_raw)} pending. Fetching COMPLETED...")

    completed_raw = _fetch_gca_instances(fc, "COMPLETED", client)
    _prog(40, f"✓ {len(completed_raw)} completed. Loading profiles...")

    # Enrich basic fields
    all_items = []
    for raw in pending_raw:
        item = _enrich_instance(raw)
        item["status"] = "PENDING"
        _classify_item(item)
        all_items.append(item)

    for raw in completed_raw:
        item = _enrich_instance(raw)
        item["status"] = "COMPLETED"
        _classify_item(item)
        all_items.append(item)

    # Collect unique employee IDs
    all_emp_ids = list({it["employee_id"] for it in all_items if it["employee_id"]})

    # Fetch profiles
    profiles = _fetch_profiles(all_emp_ids, client)
    _prog(55, f"✓ {len(profiles)} profiles. Fetching locations...")

    # Fetch locations in parallel — each thread creates its own WinHTTP instance
    pending_emp_ids = list({it["employee_id"] for it in all_items if it["status"] == "PENDING" and it["employee_id"]})
    locations: Dict[str, Dict] = {}
    if pending_emp_ids:
        from project_hermes.core.auth_midway import get_cookie as _gc
        _loc_cookie = _gc(aea=True, max_tries=3)
        _total_loc = len(pending_emp_ids)
        _done_loc = 0
        max_loc_workers = min(LOCATION_BATCH, len(pending_emp_ids))
        with ThreadPoolExecutor(max_workers=max_loc_workers) as _loc_pool:
            futs = {_loc_pool.submit(_fetch_location_standalone, eid, _loc_cookie): eid for eid in pending_emp_ids}
            for fut in as_completed(futs):
                eid = futs[fut]
                try:
                    locations[eid] = fut.result()
                except Exception:
                    locations[eid] = {"status": "UNKNOWN"}
                _done_loc += 1
                _prog(55 + int((_done_loc / _total_loc) * 30), f"Locations: {_done_loc}/{_total_loc}")

    _prog(88, "📊 Building compliance stats...")

    # Also build eid→login from Roster as fallback
    eid_to_login_roster = {}
    try:
        import pandas as pd
        roster_fp = Path(paths.output) / "Roster_SCC.csv"
        if roster_fp.exists():
            roster = pd.read_csv(roster_fp, usecols=["EmployeeId", "Login"], dtype=str)
            for _, rr in roster.iterrows():
                eid = str(rr.get("EmployeeId", "")).strip()
                lg = str(rr.get("Login", "")).strip().lower()
                if eid and lg:
                    eid_to_login_roster[eid] = lg
    except Exception as e:
        log.warning(f"Roster mapping failed: {e}")

    # Enrich items with profile + location data
    for item in all_items:
        eid = item["employee_id"]
        prof = profiles.get(eid) or {}
        loc = locations.get(eid) or {}

        # Login: from profile, fallback to roster
        login = (prof.get("login") or "").strip().lower()
        if not login:
            login = eid_to_login_roster.get(eid, "")
        item["login"] = login
        item["name"] = prof.get("name") or ""

        # Photo
        item["photo_url"] = f"{PHOTO_BASE}{login}" if login else ""

        # Location / presence
        item["presence"] = loc.get("status", "UNKNOWN")
        item["station"] = loc.get("station", "")
        item["process_path"] = loc.get("processPath", "")

    # Aggregate by owner
    owner_stats = {}
    for owner in OWNERS:
        completed = sum(1 for it in all_items if it["owner"] == owner and it["status"] == "COMPLETED")
        pending = sum(1 for it in all_items if it["owner"] == owner and it["status"] == "PENDING")
        total = completed + pending
        pct = round(completed / total * 100) if total > 0 else 0
        owner_stats[owner] = {"completed": completed, "pending": pending, "total": total, "pct": pct}

    # Global stats
    total_all = len(all_items)
    completed_all = sum(1 for it in all_items if it["status"] == "COMPLETED")
    pending_all = sum(1 for it in all_items if it["status"] == "PENDING")
    global_pct = round(completed_all / total_all * 100) if total_all > 0 else 0

    result = {
        "fc": fc,
        "range_days": DAYS_RANGE,
        "fetched_at": datetime.now().isoformat(),
        "kpis": {
            "total": total_all,
            "completed": completed_all,
            "pending": pending_all,
            "compliance_pct": global_pct,
        },
        "owner_stats": owner_stats,
        "items": all_items,
    }

    # Cache
    cache_fp = CACHE_DIR / f"gca_compliance_{fc}.json"
    cache_fp.write_text(json.dumps(result, indent=2, ensure_ascii=False), encoding="utf-8")

    _prog(100, "✅ GCA Compliance ready")
    return result


def load_gca_compliance_cache(fc: str) -> Optional[Dict[str, Any]]:
    """Load cached GCA compliance data if it exists."""
    cache_fp = CACHE_DIR / f"gca_compliance_{fc}.json"
    if cache_fp.exists():
        return json.loads(cache_fp.read_text(encoding="utf-8"))
    return None


def _format_reason(reason: str) -> str:
    if not reason:
        return "Unknown"
    r = re.sub(r"^(TOO_(MANY|HIGH|LOW)_|MANUAL_(QUALITY|PRODUCTIVITY)_COACHING_FOR_)", "", reason)
    r = r.replace("_", " ").lower()
    return r.title()
