import os
import re
import json
import subprocess
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Dict, Tuple, Optional

import pandas as pd
import win32com.client  # pip install pywin32

from project_argos.core.auth_config import load_settings
from project_argos.core.cert_picker import set_client_cert
from project_argos.config import get_paths
from project_argos.core.logger import get_logger
log = get_logger(__name__)


# ---------------- Constants ----------------
SCC_BASE = "https://staffingcommandcenter-eu.aka.amazon.com"
APP_TOKEN = "SCC_FRONTEND_APP_v2"
UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:140.0) Gecko/20100101 Firefox/140.0"

MWINIT_EXE = r"C:\Program Files\ITACsvc\mwinit.exe"

# SCC cookie jar (your working VBA-style path)
COOKIE_FILE = Path(os.environ.get("APPDATA", "")) / "cf"

# Optional: if you MUST force cert, set this env var to the cert thumbprint
# PowerShell: $env:CLIENT_CERT_THUMBPRINT="ABCD1234...."
CLIENT_CERT_THUMBPRINT = os.environ.get("CLIENT_CERT_THUMBPRINT", "").strip()


# ---------------- Helpers ----------------
def looks_like_html(text: str) -> bool:
    return bool(re.search(r"<!DOCTYPE|<html", text, re.IGNORECASE))


def epoch_to_iso(epoch_seconds: Any) -> str:
    try:
        e = float(epoch_seconds)
        if e <= 0:
            return ""
        return datetime.fromtimestamp(e, tz=timezone.utc).astimezone().strftime("%Y-%m-%d %H:%M")
    except Exception:
        return ""


def _mwinit_path() -> str:
    return MWINIT_EXE if os.path.exists(MWINIT_EXE) else "mwinit"


def run_mwinit(cookie_path: Path, **_) -> None:
    """Run mwinit with FIDO2 + AEA. Only supported auth method."""
    exe = _mwinit_path()
    cmd = [exe, "--fido2", "--aea", "--cookie-jar", str(cookie_path)]
    print("MWINIT CMD:", " ".join(cmd), flush=True)
    subprocess.run(cmd, shell=False, check=False)


def _read_cookie_text(cookie_path: Path) -> str:
    return cookie_path.read_text(encoding="utf-8", errors="ignore") if cookie_path.exists() else ""


def _expiry_before_token(readme: str, token: str) -> int:
    # VBA style: Val(Right(Split(readme, vbTab + token)(0), 10))
    marker = "\t" + token
    if marker not in readme:
        return 0
    left = readme.split(marker, 1)[0]
    tail10 = left[-10:]
    try:
        return int(tail10)
    except Exception:
        return 0


def _value_after_key(readme: str, key: str) -> str:
    marker = key + "\t"
    if marker not in readme:
        return ""
    return readme.split(marker, 1)[1].splitlines()[0].strip()


def midway_cookie_v2_like_vba(cookie_path: Path, aea: bool = True, max_tries: int = 4) -> str:
    """
    Get Midway cookie via FIDO2 (YubiKey). Only supported auth method.
    Retries up to max_tries times if cookie is missing or expired.
    """
    now_epoch = int(datetime.now(timezone.utc).timestamp())

    def cookie_ok(readme: str) -> bool:
        if "#HttpOnly_.midway-auth.amazon.com" not in readme:
            return False
        sess_exp = _expiry_before_token(readme, "session")
        if sess_exp <= 0 or sess_exp < now_epoch:
            return False
        if aea:
            aea_exp = _expiry_before_token(readme, "amazon_")
            if aea_exp <= 0 or aea_exp < now_epoch:
                return False
        if not _value_after_key(readme, "session"):
            return False
        if aea and not _value_after_key(readme, "amazon_enterprise_access"):
            return False
        return True

    for attempt in range(max_tries):
        # Check existing cookie first
        readme = _read_cookie_text(cookie_path)
        if cookie_ok(readme):
            session_val = _value_after_key(readme, "session")
            if aea:
                aea_val = _value_after_key(readme, "amazon_enterprise_access")
                return f"session={session_val};amazon_enterprise_access={aea_val}"
            return f"session={session_val}"

        # Cookie missing or expired — delete and re-authenticate
        try:
            cookie_path.unlink(missing_ok=True)
        except Exception:
            pass

        log.info("Authenticating with FIDO2 (attempt {attempt + 1}/{max_tries})...")
        run_mwinit(cookie_path)


    raise RuntimeError(
        "No se pudo obtener la cookie de Midway tras varios intentos.\n"
        "Asegurate de tener el YubiKey conectado y ejecuta mwinit --fido2 manualmente si persiste."
    )


def _set_common_headers(http, cookie_header: str, referer: str) -> None:
    http.SetRequestHeader("User-Agent", UA)
    http.SetRequestHeader("Accept", "*/*")
    http.SetRequestHeader("Accept-Language", "en-US,en;q=0.5")
    http.SetRequestHeader("app-token", APP_TOKEN)
    http.SetRequestHeader("Referer", referer)
    http.SetRequestHeader("Cookie", cookie_header)


def winhttp_get_json(url: str, cookie_header: str, referer: str) -> Any:
    """
    Mirrors VBA GetJsonFromSCC headers.
    IMPORTANT CHANGE:
      - Do NOT set certificate using USERNAME (that is wrong).
      - If you need to force cert, set env CLIENT_CERT_THUMBPRINT and we use it.
    """
    http = win32com.client.Dispatch("WinHTTP.WinHTTPRequest.5.1")

    http.Open("GET", url, False)
    http.SetAutoLogonPolicy(0)
    http.SetTimeouts(0, 0, 0, 0)
    set_client_cert(http)
    _set_common_headers(http, cookie_header, referer)

    http.Send()
    status = int(http.Status)
    text = http.ResponseText or ""

    if status == 401:
        # refresh cookie once and retry
        cookie_header = midway_cookie_v2_like_vba(COOKIE_FILE, aea=True, max_tries=4)

        http.Open("GET", url, False)
        http.SetAutoLogonPolicy(0)
        http.SetTimeouts(0, 0, 0, 0)
        set_client_cert(http)
        _set_common_headers(http, cookie_header, referer)
        http.Send()
        status = int(http.Status)
        text = http.ResponseText or ""

    if status >= 400:
        preview = text[:220].replace("\n", " ")
        raise RuntimeError(f"HTTP {status} calling {url}. Preview: {preview}")

    if looks_like_html(text):
        preview = text[:220].replace("\n", " ")
        raise RuntimeError(f"Got HTML instead of JSON calling {url}. Preview: {preview}")

    return json.loads(text)


def join_trained_roles(obj: Any) -> str:
    if isinstance(obj, dict):
        trained = obj.get("trained")
        if isinstance(trained, list):
            return ", ".join([str(x) for x in trained])
    return ""


def build_roster_scc(fc: str) -> pd.DataFrame:
    fc = fc.strip().upper()
    referer = f"{SCC_BASE}/{fc}/roster"

    cookie_header = midway_cookie_v2_like_vba(COOKIE_FILE, aea=True, max_tries=4)

    urls = {
        "detected": f"{SCC_BASE}/getDetectedEmployees/{fc}",
        "profiles": f"{SCC_BASE}/getAssociateProfileDetails/{fc}",
        "home": f"{SCC_BASE}/getAvailableHomeWorkGroupsGroupedByEmployeeId/{fc}",
        "punch": f"{SCC_BASE}/punchStatuses/{fc}",
        "roles": f"{SCC_BASE}/getAssociateTrainedRoles/{fc}",
    }

    detected = winhttp_get_json(urls["detected"], cookie_header, referer)
    profiles = winhttp_get_json(urls["profiles"], cookie_header, referer)
    home = winhttp_get_json(urls["home"], cookie_header, referer)
    punch = winhttp_get_json(urls["punch"], cookie_header, referer)
    roles = winhttp_get_json(urls["roles"], cookie_header, referer)

    recs: Dict[str, Dict[str, Any]] = {}

    def get_rec(emp_id: str) -> Dict[str, Any]:
        if emp_id not in recs:
            recs[emp_id] = {
                "EmployeeId": emp_id,
                "Login": "",
                "EmployeeName": "",
                "ManagerName": "",
                "Cohort": "",
                "TenureInDays": "",
                "CurrentStationId": "",
                "DetectedRole": "",
                "HomeWorkGroup": "",
                "PunchType": "",
                "PunchTime": "",
                "TrainedRoles": "",
            }
        return recs[emp_id]

    if isinstance(detected, list):
        for r in detected:
            emp = str(r.get("id", "")).strip()
            if not emp:
                continue
            rr = get_rec(emp)
            rr["CurrentStationId"] = r.get("currentStationId", "")
            rr["DetectedRole"] = r.get("role", "")

    if isinstance(profiles, dict):
        for emp, prof in profiles.items():
            emp_id = str(emp).strip()
            rr = get_rec(emp_id)
            if isinstance(prof, dict):
                rr["Login"] = prof.get("employeeLogin", "")
                rr["EmployeeName"] = prof.get("employeeName", "")
                rr["ManagerName"] = prof.get("managerName", "")
                rr["Cohort"] = prof.get("cohort", "")
                rr["TenureInDays"] = prof.get("tenureInDays", "")

    if isinstance(home, dict):
        for emp, val in home.items():
            emp_id = str(emp).strip()
            rr = get_rec(emp_id)
            rr["HomeWorkGroup"] = val if not isinstance(val, (dict, list)) else json.dumps(val)

    if isinstance(punch, dict):
        for emp, p in punch.items():
            emp_id = str(emp).strip()
            rr = get_rec(emp_id)
            if isinstance(p, dict):
                rr["PunchType"] = p.get("type", "")
                rr["PunchTime"] = epoch_to_iso(p.get("eventTimeStamp"))

    if isinstance(roles, dict):
        for emp, obj in roles.items():
            emp_id = str(emp).strip()
            rr = get_rec(emp_id)
            rr["TrainedRoles"] = join_trained_roles(obj)

    df = pd.DataFrame(list(recs.values()))
    return df[
        [
            "EmployeeId",
            "Login",
            "EmployeeName",
            "ManagerName",
            "Cohort",
            "TenureInDays",
            "CurrentStationId",
            "DetectedRole",
            "HomeWorkGroup",
            "PunchType",
            "PunchTime",
            "TrainedRoles",
        ]
    ]


def main():
    from project_argos.config import get_paths
    fc = (input("FC (default BCN4): ").strip() or "BCN4").upper()
    paths = get_paths()
    out_dir = paths.output
    out_dir.mkdir(parents=True, exist_ok=True)

    log.info("Pulling SCC roster for {fc} ...")
    df = build_roster_scc(fc)

    out_path = out_dir / "Roster_SCC.csv"
    df.to_csv(out_path, index=False, encoding="utf-8-sig")
    log.info("✅ Saved: {out_path} rows={len(df)} cols={len(df.columns)}")


if __name__ == "__main__":
    main()