"""auth_phonetool.py - Phonetool lookup + permissions.amazon.com team membership.

Flujo real (basado en HAR + error 401 de Midway directo):
  1. get_cookie() via AEA -> jar con amazon_enterprise_access
  2. GET /sso/login con ese jar -> permissions establece sesion automaticamente
  3. GET /a/team/<name> -> CSRF token
  4. POST /check_membership -> isMember
"""
from __future__ import annotations
import json, os, re, time
from project_hermes.core.logger import get_logger
log = get_logger(__name__)

from pathlib import Path
from typing import Any, Optional
from urllib.parse import urlencode

ALLOWED_TEAM_ID   = "amzn1.abacus.team.3hpx6l52tizpazith42a"
TEAM_TYPE         = "AMAZON_DEFAULT"
TEAM_NAME         = "Coaching_Inteligence"
HISTORY_MIN_LEVEL = 4

PHONETOOL_BASE   = "https://phonetool.amazon.com/users/{login}.json"
PERMISSIONS_BASE = "https://permissions.amazon.com"
PERMISSIONS_SSO  = "https://permissions.amazon.com/sso/login"
PERMISSIONS_PAGE = f"https://permissions.amazon.com/a/team/{TEAM_NAME}"
PERMISSIONS_POST = "https://permissions.amazon.com/a/team/index/check_membership"

UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:140.0) Gecko/20100101 Firefox/140.0"
ALLOWED_SITES: set[str] = {"BCN1", "BCN4", "MAD7", "RMU1", "OVD1", "SVQ1"}

_MEMBERSHIP_CACHE: dict[str, tuple[bool, float]] = {}
CACHE_TTL_SECONDS = 300


class _Http:
    """WinHTTP wrapper with integrated cookie jar."""

    def __init__(self, initial_cookie_str: str = ""):
        import win32com.client
        self._com = win32com.client.Dispatch("WinHTTP.WinHTTPRequest.5.1")
        self._jar: dict[str, str] = {}
        if initial_cookie_str:
            self._parse_cookie_str(initial_cookie_str)

    def _parse_cookie_str(self, s: str) -> None:
        for part in s.split(";"):
            part = part.strip()
            if "=" in part:
                k, _, v = part.partition("=")
                self._jar[k.strip()] = v.strip()

    def _ingest_set_cookie(self, sc: str) -> None:
        if not sc:
            return
        for seg in re.split(r',\s*(?=[A-Za-z_\-]+=)', sc):
            m = re.match(r'\s*([^=\s]+)=([^;]*)', seg)
            if m:
                self._jar[m.group(1)] = m.group(2)

    def cookie_header(self) -> str:
        return "; ".join(f"{k}={v}" for k, v in self._jar.items())

    def get_cookie(self, name: str) -> str | None:
        return self._jar.get(name)

    def _open(self, method: str, url: str, extra_headers: dict | None = None):
        self._com.Open(method, url, False)
        self._com.SetAutoLogonPolicy(0)
        self._com.SetTimeouts(30000, 30000, 30000, 30000)
        self._com.SetRequestHeader("User-Agent", UA)
        self._com.SetRequestHeader("Accept-Language", "en-US,en;q=0.5")
        ch = self.cookie_header()
        if ch:
            self._com.SetRequestHeader("Cookie", ch)
        for k, v in (extra_headers or {}).items():
            self._com.SetRequestHeader(k, v)

    def _finish(self) -> tuple[str, int]:
        self._com.Send()
        status = int(self._com.Status)
        body   = self._com.ResponseText or ""
        try:
            self._ingest_set_cookie(self._com.GetResponseHeader("Set-Cookie") or "")
        except Exception:
            pass
        return body, status

    def get(self, url: str, accept: str = "*/*",
            extra_headers: dict | None = None) -> tuple[str, int]:
        self._open("GET", url, {**(extra_headers or {}), "Accept": accept})
        return self._finish()

    def post(self, url: str, body_str: str,
             extra_headers: dict | None = None) -> tuple[str, int]:
        self._open("POST", url, {
            "Accept":           "application/json, text/javascript, */*; q=0.01",
            "Content-Type":     "application/x-www-form-urlencoded; charset=UTF-8",
            "X-Requested-With": "XMLHttpRequest",
            **(extra_headers or {}),
        })
        self._com.Send(body_str)
        status = int(self._com.Status)
        body   = self._com.ResponseText or ""
        try:
            self._ingest_set_cookie(self._com.GetResponseHeader("Set-Cookie") or "")
        except Exception:
            pass
        return body, status


def _establish_permissions_session(aea_cookie_str: str, debug: bool = False) -> _Http:
    from urllib.parse import urlparse, parse_qs, urlencode as _ue, urlunparse
    http = _Http(initial_cookie_str=aea_cookie_str)

    if debug:
        log.info("    [dbg] Paso 1: GET /sso/login")
    body, status = http.get(PERMISSIONS_SSO, accept="application/json",
                            extra_headers={"Referer": PERMISSIONS_PAGE})
    if status >= 400:
        raise RuntimeError(f"GET /sso/login HTTP {status}: {body[:200]}")

    try:
        result = json.loads(body)
    except json.JSONDecodeError:
        raise RuntimeError(f"Respuesta inesperada de /sso/login: {body[:300]}")

    if result.get("is_authenticated"):
        if debug: log.info("Ya autenticado")
        return http

    authn_url = result.get("authn_endpoint", "")
    if not authn_url:
        raise RuntimeError(f"No authn_endpoint: {result}")

    parsed    = urlparse(authn_url)
    qs        = parse_qs(parsed.query, keep_blank_values=True)
    qs["redirect_uri"] = [PERMISSIONS_POST]
    authn_url = urlunparse(parsed._replace(query=_ue({k: v[0] for k, v in qs.items()})))

    if debug: log.info("    [dbg] Paso 2: GET authn_endpoint (Midway AEA)")
    id_token_body, id_status = http.get(authn_url, accept="*/*", extra_headers={
        "Origin": PERMISSIONS_BASE, "Referer": PERMISSIONS_BASE + "/",
        "X-Amzn-AEAExtension-Version": "1.19.0",
        "X-Amzn-AEA-Version": "3.5.19.3",
        "X-Amzn-ACME-Version": "3.5.19.3",
        "X-Amzn-Device-Stack": "PROD",
    })
    if debug: log.info("    [dbg] Midway status={id_status}, len={len(id_token_body)}")
    if id_status >= 400:
        raise RuntimeError(f"Midway HTTP {id_status}: {id_token_body[:200]}")

    id_token = id_token_body.strip()
    if not id_token or len(id_token) < 50:
        raise RuntimeError(f"id_token invalido: {id_token_body[:200]}")

    if debug: log.info("    [dbg] Paso 3: GET /sso/login?id_token")
    body, status = http.get(f"{PERMISSIONS_SSO}?id_token={id_token}",
                            accept="application/json",
                            extra_headers={"Referer": PERMISSIONS_PAGE})
    if status >= 400:
        raise RuntimeError(f"GET /sso/login?id_token HTTP {status}: {body[:200]}")

    try:
        final = json.loads(body)
    except json.JSONDecodeError:
        raise RuntimeError(f"Respuesta inesperada tras id_token: {body[:300]}")

    if not final.get("is_authenticated"):
        raise RuntimeError(f"Sesion no establecida: {final}")

    if debug: log.info("    [dbg] Sesion OK. expires_at={final.get('expires_at')}")
    return http


def _get_csrf(http: _Http, debug: bool = False) -> str:
    if debug: log.info("    [dbg] Paso 2b: GET {PERMISSIONS_PAGE} (CSRF)")
    html, status = http.get(PERMISSIONS_PAGE, accept="text/html,application/xhtml+xml,*/*",
                            extra_headers={"Referer": PERMISSIONS_BASE + "/"})
    if status >= 400:
        raise RuntimeError(f"GET pagina HTTP {status}")
    m = (
        re.search(r'<meta[^>]+name=["\']csrf-token["\'][^>]+content=["\']([^"\']+)["\']', html, re.IGNORECASE) or
        re.search(r'<meta[^>]+content=["\']([^"\']+)["\'][^>]+name=["\']csrf-token["\']', html, re.IGNORECASE)
    )
    if not m:
        if debug: log.info("    [dbg] HTML snippet: {html[:600]}")
        raise RuntimeError("CSRF no encontrado — sesion expirada o team_name incorrecto")
    csrf = m.group(1)
    if debug: log.info("    [dbg] CSRF: {csrf[:60]}...")
    return csrf


def check_team_membership(login: str, debug: bool = False) -> bool:
    """Verifica membership. Cacheado 5 min."""
    now = time.time()
    if login in _MEMBERSHIP_CACHE:
        res, ts = _MEMBERSHIP_CACHE[login]
        if now - ts < CACHE_TTL_SECONDS:
            if debug: log.info("    [dbg] Cache hit: {login}={res}")
            return res

    from project_hermes.core.auth_midway import get_cookie
    aea = get_cookie(aea=True, max_tries=4)

    http  = _establish_permissions_session(aea, debug=debug)
    csrf  = _get_csrf(http, debug=debug)

    body_str = urlencode({"team_id": ALLOWED_TEAM_ID, "login": login, "team_type": TEAM_TYPE})
    if debug: log.info("    [dbg] POST body: {body_str}")

    raw, status = http.post(PERMISSIONS_POST, body_str=body_str, extra_headers={
        "X-CSRF-Token": csrf,
        "Referer":      PERMISSIONS_PAGE,
        "Origin":       PERMISSIONS_BASE,
    })
    if debug: log.info("    [dbg] POST status={status}, raw={raw[:200]}")
    if status >= 400:
        raise RuntimeError(f"POST check_membership HTTP {status}: {raw[:200]}")

    try:
        data = json.loads(raw)
    except json.JSONDecodeError:
        raise RuntimeError(f"Respuesta no es JSON: {raw[:300]}")

    is_member = bool(data.get("isMember", False)) and not data.get("error", False)
    if debug: log.info("    [dbg] isMember={is_member}, reason='{data.get('reason','')}'")

    _MEMBERSHIP_CACHE[login] = (is_member, time.time())
    return is_member


def get_phonetool_user(login: str | None = None,
                       midway_cookie: str | None = None) -> dict[str, Any]:
    from project_hermes.core.auth_midway import get_cookie
    login  = (login or os.environ.get("USERNAME", "")).strip().lower()
    if not login:
        raise RuntimeError("No se pudo determinar el login del usuario.")
    cookie = midway_cookie or get_cookie(aea=True, max_tries=4)
    http   = _Http(initial_cookie_str=cookie)
    raw, status = http.get(PHONETOOL_BASE.format(login=login), accept="application/json")
    if status >= 400:
        raise RuntimeError(f"Phonetool HTTP {status} para {login}: {raw[:200]}")
    data = json.loads(raw)
    loc  = (
        data.get("building_code") or data.get("site") or
        (data.get("location") or {}).get("building_code", "") or ""
    )
    building_code = (re.split(r'[\s\-]', str(loc).strip())[0].upper() or "")[:4] or "UNKNOWN"
    try:
        job_level = int(str(data.get("job_level") or data.get("job_level_id", "")).strip().lstrip("Ll"))
    except Exception:
        job_level = None
    return {
        "login":         login,
        "job_title":     str(data.get("job_title") or data.get("title") or ""),
        "job_level":     job_level,
        "building_code": building_code,
    }


def resolve_permissions(job_level: int | None, is_member: bool) -> dict:
    if not is_member:
        return {"is_member": False, "allowed_tabs": [], "privileged_features": []}
    tabs = ["Dashboard", "Associates", "Targets"]
    priv: list[str] = []
    # Must be explicit int >= 4 — None/0/string never grants History
    if isinstance(job_level, int) and job_level >= HISTORY_MIN_LEVEL:
        tabs.append("History")
        priv.append("history_pull")
    return {"is_member": True, "allowed_tabs": tabs, "privileged_features": priv}


if __name__ == "__main__":
    import sys
    DEBUG     = "--debug" in sys.argv
    login_arg = next((a for a in sys.argv[1:] if not a.startswith("--")), None)

    log.info("Phonetool lookup...")
    try:
        user = get_phonetool_user(login_arg)
        log.info("    login        : {user['login']}")
        log.info("    job_title    : {user['job_title']}")
        log.info("    job_level    : {user['job_level']}")
        log.info("    building_code: {user['building_code']}")
    except Exception as e:
        log.error("Phonetool lookup failed: {e}"); sys.exit(1)

    log.info("Team membership check...")
    log.info("    team_id: {ALLOWED_TEAM_ID}")
    log.info("    login  : {user['login']}")
    try:
        is_member = check_team_membership(user["login"], debug=DEBUG)
        log.info("    isMember: {is_member}")
        log.info("    STATUS: {'OK — ACCESS GRANTED' if is_member else 'OK — NOT A MEMBER'}")
    except Exception as e:
        log.info("    STATUS: ERROR — {e}"); sys.exit(1)

    log.info("Resolved permissions...")
    perms = resolve_permissions(user["job_level"], is_member)
    log.info("    is_member          : {perms['is_member']}")
    log.info("    allowed_tabs       : {perms['allowed_tabs']}")
    log.info("    privileged_features: {perms['privileged_features']}")

    print("\n" + "=" * 60)
    print("All checks passed!" if is_member else "User is NOT a team member.")
    print("=" * 60)