# auth_config.py
from __future__ import annotations

import json
import os
import subprocess
from dataclasses import dataclass, asdict
from pathlib import Path
from typing import Optional


@dataclass
class AuthSettings:
    remember: bool = True
    cookie_jar_path: Optional[str] = None


def _config_path() -> Path:
    return Path(__file__).resolve().parent / "auth_settings.json"


def default_cookie_jar_path() -> str:
    appdata = os.environ.get("APPDATA", "")
    if appdata:
        return str(Path(appdata) / "cf")
    userprofile = os.environ.get("USERPROFILE", "")
    if userprofile:
        return str(Path(userprofile) / "AppData" / "Roaming" / "cf")
    return str(Path(__file__).resolve().parent / "cf")


def load_settings() -> AuthSettings:
    p = _config_path()
    if not p.exists():
        s = AuthSettings()
        s.cookie_jar_path = default_cookie_jar_path()
        return s
    try:
        data = json.loads(p.read_text(encoding="utf-8"))
    except Exception:
        data = {}
    s = AuthSettings(
        remember=bool(data.get("remember", True)),
        cookie_jar_path=data.get("cookie_jar_path") or default_cookie_jar_path(),
    )
    return s


def save_settings(s: AuthSettings) -> None:
    if not s.cookie_jar_path:
        s.cookie_jar_path = default_cookie_jar_path()
    _config_path().write_text(json.dumps(asdict(s), indent=2), encoding="utf-8")


def run_mwinit(*args, **kwargs) -> int:
    """Always FIDO2. No OTP, no AUTO fallback."""
    cookie_jar_path = kwargs.get("cookie_jar_path")
    if cookie_jar_path is None and args and isinstance(args[0], (str, os.PathLike)):
        cookie_jar_path = str(args[0])

    cmd = ["mwinit", "--fido2", "--aea"]
    if cookie_jar_path:
        cmd += ["--cookie-jar", str(cookie_jar_path)]

    print("MWINIT CMD:", " ".join(cmd), flush=True)
    p = subprocess.run(cmd, shell=False)
    return int(p.returncode)