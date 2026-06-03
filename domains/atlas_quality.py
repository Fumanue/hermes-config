# atlas_quality.py — Argos Quality Layer
from __future__ import annotations

import json
import os
import re
from datetime import datetime
from pathlib import Path
from typing import Any, Dict, Iterable, List, Optional

import pandas as pd
import pythoncom
import win32com.client

from project_argos.config import get_paths
from project_argos.core.auth_midway import get_cookie
from project_argos.core.cert_picker import set_client_cert
from project_argos.core.logger import get_logger
log = get_logger(__name__)


ATLAS_GRAPHQL = "https://atlas.qubit.amazon.dev/graphql"
ATLAS_REFERER_TEMPLATE = (
    "https://atlas.qubit.amazon.dev/reporting"
    "?aggregateType=WAREHOUSE_ID&queryType=NORMAL&targetProcess={department}"
    "&startDate={start_date}&startTime={start_time}"
    "&endDate={end_date}&endTime={end_time}&warehouseId={fc}"
)

GRAPHQL_QUERY = (
    "fragment ReportParts on Report {"
    "totalsReports {warehouseId defectType defectTypeAltName processPath subProcessAltName defectCount opportunities metricValue threshold metricType __typename}"
    "managerLevelReports {managerId processPath defectCount opportunities metricValue metricType __typename}"
    "rawReports {processPath processLevelUniqueMetrics {displayName displayNameAlt __typename}"
    "processLevelReport {aggregationField managerId subProcess subProcessAltName defectMap {k v __typename} totalDefects metricValue __typename} __typename}"
    "totalsReportsErrorMessage managerLevelReportsErrorMessage rawReportsErrorMessage __typename} "
    "query ($warehouseId: String!, $department: String!, $subprocess: String, $timeRanges: [TimeRange!]!) {"
    "getReportingByWarehouseId(warehouseId: $warehouseId department: $department subprocess: $subprocess timeRanges: $timeRanges) "
    "{...ReportParts __typename}}"
)


def _paths():
    return get_paths()


def _config_path() -> Path:
    paths = _paths()
    return paths.root / "config" / "argos" / "quality_config.json"


def load_quality_config(default: Optional[dict] = None) -> dict:
    p = _config_path()
    if p.exists():
        return json.loads(p.read_text(encoding="utf-8"))
    return default or {"enabled": False}


def _epoch_local(dt: datetime) -> int:
    # Matches VBA local -> epoch behavior for naive datetimes.
    return int(dt.timestamp())


def _referer(fc: str, department: str, start_dt: datetime, end_dt: datetime) -> str:
    return ATLAS_REFERER_TEMPLATE.format(
        department=department,
        start_date=start_dt.strftime("%Y-%m-%d"),
        start_time=start_dt.strftime("%H:%M:%S"),
        end_date=end_dt.strftime("%Y-%m-%d"),
        end_time=end_dt.strftime("%H:%M:%S"),
        fc=fc.upper(),
    )


def build_payload(fc: str, department: str, start_dt: datetime, end_dt: datetime) -> Dict[str, Any]:
    return {
        "variables": {
            "warehouseId": fc.upper(),
            "department": department,
            "timeRanges": [{"startTime": _epoch_local(start_dt), "endTime": _epoch_local(end_dt)}],
        },
        "query": GRAPHQL_QUERY,
    }


def _set_cert(http) -> None:
    set_client_cert(http)


def fetch_atlas_quality_raw(
    fc: str,
    start_dt: datetime,
    end_dt: datetime,
    cookie: Optional[str] = None,
    department: str = "combined",
    timeout_ms: Iterable[int] = (30000, 30000, 30000, 60000),
) -> dict:
    """Fetch Atlas GraphQL quality report using the same WinHTTP handshake pattern as the legacy VBA."""
    fc = (fc or "BCN4").strip().upper()
    cookie = cookie or get_cookie(aea=True, max_tries=4)
    payload = build_payload(fc, department, start_dt, end_dt)
    referer = _referer(fc, department, start_dt, end_dt)
    payload_json = json.dumps(payload, separators=(",", ":"))

    log.info("Quality POST {fc} {start_dt} → {end_dt} dept={department}")
    log.info("epoch {payload['variables']['timeRanges'][0]}")

    pythoncom.CoInitialize()
    try:
        http = win32com.client.Dispatch("WinHTTP.WinHTTPRequest.5.1")

        # 1) Handshake GET. Atlas needs this in the working VBA flow.
        http.Open("GET", ATLAS_GRAPHQL, False)
        http.SetAutoLogonPolicy(0)
        _set_cert(http)
        http.SetRequestHeader("Cookie", cookie)
        http.SetRequestHeader("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:140.0) Gecko/20100101 Firefox/140.0")
        http.Send()
        log.info("handshake HTTP {int(http.Status)} {http.StatusText}")

        # 2) Real POST
        http.Open("POST", ATLAS_GRAPHQL, False)
        http.SetAutoLogonPolicy(0)
        _set_cert(http)
        http.SetTimeouts(*list(timeout_ms))
        http.SetRequestHeader("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:140.0) Gecko/20100101 Firefox/140.0")
        http.SetRequestHeader("Accept", "*/*")
        http.SetRequestHeader("Content-Type", "application/json")
        http.SetRequestHeader("Origin", "https://atlas.qubit.amazon.dev")
        http.SetRequestHeader("Referer", referer)
        http.SetRequestHeader("Cookie", cookie)
        log.info("sending bytes: {len(payload_json)}")
        http.Send(payload_json)
        status = int(http.Status)
        text = http.ResponseText or ""
        log.info("HTTP {status} {http.StatusText}")
        log.info("head {text[:220]!r}")
        if status >= 400:
            raise RuntimeError(f"ATLAS HTTP {status}: {text[:500]}")
        return json.loads(text)
    finally:
        pythoncom.CoUninitialize()


def flatten_raw_reports(data: Dict[str, Any]) -> pd.DataFrame:
    report = (((data or {}).get("data") or {}).get("getReportingByWarehouseId") or {})
    raw_rows: List[Dict[str, Any]] = []
    for raw in report.get("rawReports") or []:
        process_path = raw.get("processPath", "")
        metrics = raw.get("processLevelUniqueMetrics") or []
        metric_names = ", ".join(str(m.get("displayName") or m.get("displayNameAlt") or "") for m in metrics)
        for r in raw.get("processLevelReport") or []:
            defect_map = r.get("defectMap") or []
            defect_dict = {str(x.get("k")): x.get("v") for x in defect_map if isinstance(x, dict)}
            row = {
                "processPath": process_path,
                "metricNames": metric_names,
                "aggregationField": r.get("aggregationField"),
                "managerId": r.get("managerId"),
                "subProcess": r.get("subProcess"),
                "subProcessAltName": r.get("subProcessAltName"),
                "totalDefects": r.get("totalDefects"),
                "metricValue": r.get("metricValue"),
            }
            row.update({f"defect_{k}": v for k, v in defect_dict.items()})
            raw_rows.append(row)
    return pd.DataFrame(raw_rows)


def _norm_key(x: Any) -> str:
    return re.sub(r"\s+", " ", str(x or "").strip()).upper()


def _extract_fc_login(aggregation_field: Any) -> tuple[str, str]:
    s = str(aggregation_field or "").strip()
    if "-" in s:
        fc, login = s.split("-", 1)
        return fc.strip().upper(), login.strip().lower()
    return "", s.strip().lower()


def _topic_rules_for(config: dict, process: str, subprocess: str) -> List[dict]:
    proc_cfg = (config.get("processes") or {}).get(str(process), {})
    if not proc_cfg or proc_cfg.get("enabled") is False:
        return []
    sub_cfgs = proc_cfg.get("subprocesses") or {}
    sub_norm = _norm_key(subprocess)
    out: List[dict] = []
    for sub_name, sub_cfg in sub_cfgs.items():
        if sub_cfg.get("enabled") is False:
            continue
        aliases = [sub_name] + list(sub_cfg.get("aliases") or [])
        if any(_norm_key(a) == sub_norm for a in aliases):
            for t in sub_cfg.get("topics") or []:
                if isinstance(t, str):
                    out.append({"name": t, "label": t, "applies_to_roles": ["*"]})
                elif isinstance(t, dict):
                    out.append(t)
    return out


def build_quality_flat(raw_flat: pd.DataFrame, config: Optional[dict] = None) -> pd.DataFrame:
    config = config or load_quality_config()
    if raw_flat is None or raw_flat.empty or not config.get("enabled", True):
        return pd.DataFrame(columns=["FC", "Login", "Process", "SubProcess", "Topic", "TopicLabel", "Defects", "MetricValue", "Manager", "AppliesToRoles"])

    defect_cols = [c for c in raw_flat.columns if str(c).startswith("defect_")]
    rows: List[Dict[str, Any]] = []
    min_def = int(((config.get("comment_settings") or {}).get("min_defects", 1)) or 1)

    for _, r in raw_flat.iterrows():
        process = str(r.get("processPath", "")).strip()
        subprocess = str(r.get("subProcess", "")).strip() or "-"
        rules = _topic_rules_for(config, process, subprocess)
        if not rules:
            continue
        rule_by_topic = {_norm_key(x.get("name")): x for x in rules if x.get("name")}
        fc, login = _extract_fc_login(r.get("aggregationField"))
        if not login:
            continue
        for col in defect_cols:
            topic = str(col).replace("defect_", "", 1).strip()
            rule = rule_by_topic.get(_norm_key(topic))
            if not rule:
                continue
            val = pd.to_numeric(r.get(col), errors="coerce")
            if pd.isna(val) or float(val) < min_def:
                continue
            rows.append({
                "FC": fc,
                "Login": login,
                "Process": process.upper(),
                "SubProcess": subprocess,
                "Topic": topic,
                "TopicLabel": str(rule.get("label") or topic),
                "Defects": int(float(val)),
                "MetricValue": r.get("metricValue"),
                "Manager": r.get("managerId"),
                "AppliesToRoles": ",".join(rule.get("applies_to_roles") or ["*"])
            })

    out = pd.DataFrame(rows)
    if not out.empty:
        out = out.sort_values(["Process", "Login", "Defects", "TopicLabel"], ascending=[True, True, False, True])
    return out


def build_quality_comment_map(quality_flat: pd.DataFrame, config: Optional[dict] = None) -> Dict[tuple[str, str], List[str]]:
    """Returns {(login, role): [quality comment lines]} without aggregating topics together."""
    config = config or load_quality_config()
    settings = config.get("comment_settings") or {}
    max_topics = int(settings.get("max_topics", 3) or 3)
    prefix = str(settings.get("prefix") or "Quality Opportunities")
    if quality_flat is None or quality_flat.empty:
        return {}

    q = quality_flat.copy()
    q["Login"] = q["Login"].astype(str).str.strip().str.lower()
    q["Defects"] = pd.to_numeric(q["Defects"], errors="coerce").fillna(0).astype(int)
    out: Dict[tuple[str, str], List[str]] = {}

    for login, grp in q.groupby("Login"):
        rows = grp.sort_values("Defects", ascending=False).head(max_topics)
        for role in _roles_for_rows(rows):
            role_rows = rows[rows.apply(lambda r: _role_allowed(role, r.get("AppliesToRoles")), axis=1)].head(max_topics)
            if role_rows.empty:
                continue
            details = [f"{r['TopicLabel']} ({int(r['Defects'])})" for _, r in role_rows.iterrows()]
            out[(login, role)] = [f"🧪 {prefix}: " + "; ".join(details)]
    return out


def _roles_for_rows(rows: pd.DataFrame) -> List[str]:
    roles = set()
    for x in rows.get("AppliesToRoles", pd.Series(dtype=str)).astype(str):
        parts = [p.strip().upper() for p in x.split(",") if p.strip()]
        if "*" in parts:
            roles.add("*")
        else:
            roles.update(parts)
    return sorted(roles) or ["*"]


def _role_allowed(role: str, applies_to: Any) -> bool:
    role = str(role or "").strip().upper()
    parts = [p.strip().upper() for p in str(applies_to or "*").split(",") if p.strip()]
    return "*" in parts or role in parts


def quality_comments_for_dash(dash: pd.DataFrame, quality_flat: Optional[pd.DataFrame] = None, config: Optional[dict] = None) -> Dict[str, List[str]]:
    """Returns {login: [comment]} filtered by each row Role in Dashboard."""
    if quality_flat is None:
        paths = _paths()
        p = paths.output / "quality_flat.csv"
        if not p.exists():
            return {}
        quality_flat = pd.read_csv(p)
    if quality_flat.empty or dash is None or dash.empty:
        return {}
    config = config or load_quality_config()
    q = quality_flat.copy()
    q["Login"] = q["Login"].astype(str).str.strip().str.lower()
    q["Defects"] = pd.to_numeric(q["Defects"], errors="coerce").fillna(0).astype(int)
    settings = config.get("comment_settings") or {}
    max_topics = int(settings.get("max_topics", 3) or 3)
    prefix = str(settings.get("prefix") or "Quality Opportunities")
    out: Dict[str, List[str]] = {}
    for _, row in dash.iterrows():
        login = str(row.get("Login", "")).strip().lower()
        role = str(row.get("Role", "")).strip().upper()
        if not login:
            continue
        sub = q[q["Login"].eq(login)].copy()
        if sub.empty:
            continue
        sub = sub[sub.apply(lambda r: _role_allowed(role, r.get("AppliesToRoles")), axis=1)]
        if sub.empty:
            continue
        sub = sub.sort_values("Defects", ascending=False).head(max_topics)
        details = [f"{r['TopicLabel']} ({int(r['Defects'])})" for _, r in sub.iterrows()]
        out[login] = [f"🧪 {prefix}: " + "; ".join(details)]
    return out


def fetch_and_save_atlas_quality(fc: str, start_dt: datetime, end_dt: datetime, cookie: Optional[str] = None, output_dir: Optional[Path] = None) -> dict:
    paths = _paths()
    output_dir = Path(output_dir or paths.output)
    output_dir.mkdir(parents=True, exist_ok=True)
    config = load_quality_config()
    if not config.get("enabled", True) or not (config.get("downloader") or {}).get("enabled", True):
        log.info("Quality disabled by quality_config.json")
        return {"enabled": False, "rows": 0}
    dcfg = config.get("downloader") or {}
    department = str(dcfg.get("department") or "combined")
    timeout_ms = dcfg.get("timeout_ms") or (30000, 30000, 30000, 60000)
    raw = fetch_atlas_quality_raw(fc, start_dt, end_dt, cookie=cookie, department=department, timeout_ms=timeout_ms)
    raw_json_name = str(dcfg.get("output_raw_json") or "Atlas_Quality_Raw.json")
    raw_flat_name = str(dcfg.get("output_raw_flat") or "rawReports_flat.csv")
    quality_flat_name = str(dcfg.get("output_quality_flat") or "quality_flat.csv")
    (output_dir / raw_json_name).write_text(json.dumps(raw, ensure_ascii=False, indent=2), encoding="utf-8")
    raw_flat = flatten_raw_reports(raw)
    raw_flat.to_csv(output_dir / raw_flat_name, index=False, encoding="utf-8-sig")
    quality_flat = build_quality_flat(raw_flat, config=config)
    quality_flat.to_csv(output_dir / quality_flat_name, index=False, encoding="utf-8-sig")
    log.info("rawReports_flat rows={len(raw_flat)} → {raw_flat_name}")
    log.info("quality_flat rows={len(quality_flat)} → {quality_flat_name}")
    return {"enabled": True, "raw_rows": len(raw_flat), "quality_rows": len(quality_flat)}
