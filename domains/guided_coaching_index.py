# project_argos/domains/guided_coaching_index.py
from __future__ import annotations

import re
from datetime import datetime, timezone
from typing import Any, Dict, Iterable, List, Optional, Tuple

UUID_RE = re.compile(
    r"([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})"
)


def create_id_variants(emp_id: str) -> List[str]:
    """
    Generates robust employee ID variants so history can match roster/PI/FCLM formats.
    Examples:
      "206224143" -> ["206224143","A206224143","a206224143"]
      "A206224143" -> includes "206224143"
    """
    if emp_id is None:
        return []
    base = str(emp_id).strip()
    if not base:
        return []

    digits = re.sub(r"[^0-9]", "", base)

    variants = set()
    variants.add(base)
    variants.add(base.upper())
    variants.add(base.lower())

    if digits:
        variants.add(digits)
        variants.add(f"A{digits}")
        variants.add(f"a{digits}")

    # If starts with alpha + digits, also include stripped alpha
    if base and base[0].isalpha() and len(base) > 1:
        tail = base[1:].strip()
        if tail:
            variants.add(tail)
            variants.add(tail.upper())
            variants.add(tail.lower())

    # Remove whitespace variants
    variants = {re.sub(r"\s+", "", v) for v in variants if v and str(v).strip()}
    return [v for v in variants if v]


def extract_course_uuid_from_lms_course_id(lms_course_id: str) -> str:
    """
    Accepts:
      - full URL: https://.../course/<uuid>
      - uuid alone: <uuid>
    Returns:
      - uuid lowercased, or "" if not found
    """
    s = str(lms_course_id or "").strip()
    if not s:
        return ""
    m = UUID_RE.search(s)
    return m.group(1).lower() if m else ""


def _parse_iso_z(dt_str: str) -> Optional[datetime]:
    if not dt_str:
        return None
    s = str(dt_str).strip()
    if not s:
        return None
    # Zulu -> +00:00 for fromisoformat
    s = s.replace("Z", "+00:00")
    try:
        dt = datetime.fromisoformat(s)
    except Exception:
        return None
    if dt.tzinfo is None:
        dt = dt.replace(tzinfo=timezone.utc)
    return dt.astimezone(timezone.utc)


def _days_ago(now_utc: datetime, closed_utc: Optional[datetime]) -> int:
    if not closed_utc:
        return 0
    delta = now_utc - closed_utc
    try:
        return max(0, int(delta.total_seconds() // 86400))
    except Exception:
        return 0


def _get_nested(d: Dict[str, Any], path: Iterable[str], default=None):
    cur: Any = d
    for k in path:
        if not isinstance(cur, dict) or k not in cur:
            return default
        cur = cur[k]
    return cur


def build_guided_coaching_course_index(
    guided_history_payload: Dict[str, Any],
    transcript_base_url: str = "https://guided-coaching-dub.corp.amazon.com/#/employee-transcript/",
    instance_base_url: str = "",
) -> Dict[Tuple[str, str], Dict[str, Any]]:
    """
    Build an index from GC history payload:
      key: (employee_id_variant, course_uuid)
      val: {
        "days_ago": int,
        "label": "6d",
        "url": <transcript_or_instance_url>,
        "instance_id": str,
        "closed_ts": str
      }

    Behavior:
    - Dedup: if multiple completions exist for same (emp,course), keep the most recent closed timestamp.
    - URL:
        - If instance_base_url provided, uses instance link (best-effort):
            f"{instance_base_url}/{instance_id}"
        - Else defaults to transcript link:
            f"{transcript_base_url}{employeeID}"
    """
    payload = guided_history_payload or {}
    items = payload.get("coachingInstances")
    if not isinstance(items, list):
        items = []

    now = datetime.now(timezone.utc)
    index: Dict[Tuple[str, str], Dict[str, Any]] = {}

    for it in items:
        if not isinstance(it, dict):
            continue

        instance_id = _get_nested(it, ["instanceId", "id"], "") or str(it.get("instanceId") or "").strip()

        data = it.get("coachingInstanceData") or {}
        if not isinstance(data, dict):
            continue

        emp = _get_nested(data, ["coachee", "employeeID"], "")
        emp = str(emp or "").strip()
        if not emp:
            continue

        lms_course = _get_nested(data, ["coachingReasonDetails", "lmsCourseId", "detail"], "")
        course_uuid = extract_course_uuid_from_lms_course_id(lms_course)
        if not course_uuid:
            continue

        closed_ts = str(data.get("coachingClosedTimestamp") or "").strip()
        closed_dt = _parse_iso_z(closed_ts) or _parse_iso_z(str(data.get("creationTime") or ""))

        days = _days_ago(now, closed_dt)
        label = f"{days}d"

        # Choose URL target
        if instance_base_url and instance_id:
            url = f"{instance_base_url.rstrip('/')}/{instance_id}"
        else:
            url = f"{transcript_base_url}{emp}"

        rec = {
            "days_ago": days,
            "label": label,
            "url": url,
            "instance_id": instance_id,
            "closed_ts": closed_ts,
            "course_uuid": course_uuid,
            "employee_id": emp,
        }

        # Keep newest completion if multiple
        def _is_newer(old: Dict[str, Any], new: Dict[str, Any]) -> bool:
            od = _parse_iso_z(str(old.get("closed_ts") or ""))
            nd = _parse_iso_z(str(new.get("closed_ts") or ""))
            if nd and not od:
                return True
            if nd and od:
                return nd > od
            return False

        for v in create_id_variants(emp):
            key = (str(v).strip(), course_uuid)
            if key not in index or _is_newer(index[key], rec):
                index[key] = rec

        # Also index digits-only variants explicitly (helps when upstream strips formatting)
        digits = re.sub(r"[^0-9]", "", emp)
        if digits:
            for v in create_id_variants(digits):
                key = (str(v).strip(), course_uuid)
                if key not in index or _is_newer(index[key], rec):
                    index[key] = rec

    return index
