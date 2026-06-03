"""Client certificate utilities for corp.amazon.com mTLS.

Background: WinHTTPRequest.SetClientCertificate only supports subject-name
lookup (a case-insensitive substring of the cert Subject) — NOT thumbprints.
So when two certs share ``CN=<alias>`` (e.g. one issued by Amazon Corporate
CA and one by Midway Client CA, the latter created by ``mwinit --preregister``),
WinHTTP picks one ambiguously and corp endpoints reject the wrong one,
producing HRESULT -2147012711 (ERROR_WINHTTP_CLIENT_CERT_NO_CREDENTIALS).

Strategy: at startup, ``clean_duplicate_certs()`` detects the conflict and
removes the Midway-issued duplicate from ``CurrentUser\\My`` so WinHTTP sees
only the corporate cert. ``set_client_cert()`` then uses the legacy subject
lookup, which works once the store is unambiguous.

The Midway OTP cert lives in ``~/.midway/`` on Windows — removing the copy
from the Windows cert store does not break ``mwinit`` itself.
"""
from __future__ import annotations

import os
import subprocess
from typing import Optional

from project_argos.core.logger import get_logger

log = get_logger(__name__)

_cleanup_done: bool = False


def _run_certutil() -> str:
    try:
        result = subprocess.run(
            ["certutil", "-user", "-store", "My"],
            capture_output=True,
            text=True,
            timeout=15,
            creationflags=getattr(subprocess, "CREATE_NO_WINDOW", 0),
        )
    except Exception as e:
        log.info("cert: certutil call failed: %s", e)
        return ""
    return result.stdout or ""


def _parse_certutil(output: str) -> list[dict]:
    certs: list[dict] = []
    current: dict = {}
    for raw in output.splitlines():
        line = raw.strip()
        if line.startswith("===") and "Certificate" in line:
            if current.get("Subject") and current.get("Thumbprint"):
                certs.append(current)
            current = {}
            continue
        if line.startswith("Issuer:"):
            current["Issuer"] = line.split(":", 1)[1].strip()
        elif line.startswith("Subject:"):
            current["Subject"] = line.split(":", 1)[1].strip()
        elif line.lower().startswith("cert hash(sha1):"):
            current["Thumbprint"] = line.split(":", 1)[1].strip().replace(" ", "").upper()
    if current.get("Subject") and current.get("Thumbprint"):
        certs.append(current)
    return certs


def _delete_cert(thumbprint: str) -> bool:
    try:
        result = subprocess.run(
            ["certutil", "-user", "-delstore", "My", thumbprint],
            capture_output=True,
            text=True,
            timeout=10,
            creationflags=getattr(subprocess, "CREATE_NO_WINDOW", 0),
        )
        return result.returncode == 0
    except Exception as e:
        log.info("cert: delete failed for %s: %s", thumbprint[:8], e)
        return False


def clean_duplicate_certs() -> None:
    """If CurrentUser\\My has multiple certs with ``CN=<USERNAME>``, delete the
    ones issued by Midway Client CA so the Amazon Corporate cert is the
    single match for WinHTTP's subject lookup. Idempotent and cached for the
    process lifetime — safe to call from anywhere on each startup.
    """
    global _cleanup_done
    if _cleanup_done:
        return
    _cleanup_done = True

    user = os.environ.get("USERNAME", "").strip()
    if not user:
        return

    certs = _parse_certutil(_run_certutil())
    user_cn = f"cn={user}".lower()
    matching = [c for c in certs if (c.get("Subject") or "").lower().startswith(user_cn)]

    if len(matching) <= 1:
        return  # no ambiguity

    def is_midway(c: dict) -> bool:
        return "midway" in (c.get("Issuer") or "").lower()

    def is_corporate(c: dict) -> bool:
        issuer = (c.get("Issuer") or "").lower()
        return "amazon" in issuer and "corporate" in issuer

    corporate = [c for c in matching if is_corporate(c)]
    midway = [c for c in matching if is_midway(c)]

    if not corporate:
        log.info(
            "cert: %d cert(s) for CN=%s but none from Amazon Corporate CA — "
            "leaving store alone (install corp cert via Software Center → Daily Midway Tool)",
            len(matching), user,
        )
        return

    for c in midway:
        tp = c.get("Thumbprint", "")
        if not tp:
            continue
        if _delete_cert(tp):
            log.info(
                "cert: removed duplicate Midway-issued cert %s... so WinHTTP "
                "picks the Amazon Corporate cert unambiguously",
                tp[:8],
            )
        else:
            log.info("cert: failed to remove duplicate Midway cert %s...", tp[:8])


def set_client_cert(http) -> None:
    """Apply the corp client cert to a WinHTTP request.

    WinHTTPRequest.SetClientCertificate only matches by subject substring,
    so we hand it the username (which equals ``CN=<USERNAME>`` for corp certs).
    Call ``clean_duplicate_certs()`` at startup to ensure the lookup is
    unambiguous when ``mwinit --preregister`` has left a stray Midway cert.

    A ``CLIENT_CERT_THUMBPRINT`` env var is honored as an escape hatch — but
    note WinHTTP itself does substring match, so the thumbprint must already
    appear in the cert subject for this to work (rare; mostly here for tests).
    """
    try:
        clean_duplicate_certs()
        override = os.environ.get("CLIENT_CERT_THUMBPRINT", "").strip()
        if override:
            http.SetClientCertificate(f"CURRENT_USER\\MY\\{override}")
            return
        user = os.environ.get("USERNAME", "").strip()
        if user:
            http.SetClientCertificate(f"CURRENT_USER\\MY\\{user}")
    except Exception as e:
        log.info("warning: SetClientCertificate failed: %s", e)


# Backward-compatible alias for any old import sites.
def pick_corp_cert_thumbprint() -> Optional[str]:
    """Deprecated: kept for backward compatibility. Returns None — WinHTTP
    does not accept thumbprints; use ``set_client_cert`` instead."""
    return None
