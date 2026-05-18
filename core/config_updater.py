# src/project_hermes/core/config_updater.py
"""
Remote config & code updater — syncs configs and source code from GitHub.
  - timeout_seconds: HTTP timeout

Reads `config/hermes/remote_config.json` for connection settings:
  - owner / repo / branch: GitHub repository coordinates
  - token_env: env variable name holding GitHub PAT
  - timeout_seconds: HTTP timeout

Uses `config/Manifest.json` to map local filenames → remote paths.
Downloads changed files from GitHub raw content API.

State files:
  - config/hermes/.update_state.json: last successful update info
  - config/hermes/.update_status.json: last check result

Usage:
    from project_hermes.core.config_updater import check_and_update
    result = check_and_update()  # → {"ok": True, "status": "updated", ...}
"""
from __future__ import annotations

import json
import os
import threading
import traceback
from dataclasses import asdict, dataclass
from datetime import datetime
from pathlib import Path
from typing import Any, Dict, List, Optional

import requests

from project_hermes.config import get_paths
from project_hermes.core.logger import get_logger

log = get_logger(__name__)

# ─── Paths ──────────────────────────────────────────────────────────────────
paths = get_paths()
CONFIG_DIR = paths.config_dir
BACKUP_DIR = CONFIG_DIR / "backups"
SRC_DIR = paths.root / "src" / "project_hermes"
REMOTE_CONFIG_PATH = CONFIG_DIR / "remote_config.json"
STATE_PATH = CONFIG_DIR / ".update_state.json"
STATUS_PATH = CONFIG_DIR / ".update_status.json"
MANIFEST_PATH = paths.root / "config" / "Manifest.json"

DEFAULT_TOKEN_ENV = "HERMES_CONFIG_TOKEN"
DEFAULT_TIMEOUT_SECONDS = 5

_UPDATE_LOCK = threading.Lock()
_LAST_STATUS: Dict[str, Any] = {
    "ok": True,
    "status": "not_started",
    "message": "Remote config update has not run yet.",
    "local_version": None,
    "remote_version": None,
    "changed_files": [],
    "checked_at": None,
    "error": None,
}


# ─── Config Loading ─────────────────────────────────────────────────────────
@dataclass
class RemoteConfig:
    enabled: bool = True
    owner: str = ""
    repo: str = ""
    branch: str = "main"
    token_env: str = DEFAULT_TOKEN_ENV
    timeout_seconds: int = DEFAULT_TIMEOUT_SECONDS


def _load_remote_config() -> RemoteConfig:
    """Load remote_config.json settings."""
    if not REMOTE_CONFIG_PATH.exists():
        return RemoteConfig(enabled=False)
    try:
        data = json.loads(REMOTE_CONFIG_PATH.read_text(encoding="utf-8"))
        return RemoteConfig(
            enabled=data.get("enabled", True),
            owner=data.get("owner", ""),
            repo=data.get("repo", ""),
            branch=data.get("branch", "main"),
            token_env=data.get("token_env", DEFAULT_TOKEN_ENV),
            timeout_seconds=data.get("timeout_seconds", DEFAULT_TIMEOUT_SECONDS),
        )
    except Exception as e:
        log.warning("Could not load remote_config.json: %s", e)
        return RemoteConfig(enabled=False)


def _load_manifest() -> Dict[str, str]:
    """Load Manifest.json — maps local filename → remote path in repo."""
    if not MANIFEST_PATH.exists():
        log.warning("Manifest.json not found at %s", MANIFEST_PATH)
        return {}
    try:
        data = json.loads(MANIFEST_PATH.read_text(encoding="utf-8"))
        return data.get("files", {})
    except Exception as e:
        log.warning("Could not load Manifest.json: %s", e)
        return {}


def _load_state() -> Dict[str, Any]:
    """Load last update state."""
    if not STATE_PATH.exists():
        return {"version": "0.0.0", "updated_at": None, "changed_files": []}
    try:
        return json.loads(STATE_PATH.read_text(encoding="utf-8"))
    except Exception:
        return {"version": "0.0.0", "updated_at": None, "changed_files": []}


def _save_state(state: Dict[str, Any]) -> None:
    """Persist update state."""
    STATE_PATH.write_text(json.dumps(state, indent=2), encoding="utf-8")


def _save_status(status: Dict[str, Any]) -> None:
    """Persist last check status."""
    STATUS_PATH.write_text(json.dumps(status, indent=2), encoding="utf-8")


# ─── GitHub API ─────────────────────────────────────────────────────────────
def _get_github_token(env_var: str) -> Optional[str]:
    """Get GitHub PAT from environment."""
    token = os.environ.get(env_var, "").strip()
    return token if token else None


def _fetch_remote_manifest(cfg: RemoteConfig, token: str) -> Optional[Dict]:
    """Fetch Manifest.json from GitHub to compare versions."""
    url = f"https://raw.githubusercontent.com/{cfg.owner}/{cfg.repo}/{cfg.branch}/Manifest.json"
    headers = {"Authorization": f"token {token}", "Accept": "application/json"}
    try:
        resp = requests.get(url, headers=headers, timeout=cfg.timeout_seconds)
        if resp.status_code == 200:
            return resp.json()
        log.warning("GitHub manifest fetch returned %d", resp.status_code)
        return None
    except Exception as e:
        log.warning("GitHub manifest fetch failed: %s", e)
        return None


def _download_file(cfg: RemoteConfig, token: str, remote_path: str) -> Optional[bytes]:
    """Download a single file from GitHub raw."""
    url = f"https://raw.githubusercontent.com/{cfg.owner}/{cfg.repo}/{cfg.branch}/{remote_path}"
    headers = {"Authorization": f"token {token}"}
    try:
        resp = requests.get(url, headers=headers, timeout=cfg.timeout_seconds)
        if resp.status_code == 200:
            return resp.content
        log.warning("Download %s returned %d", remote_path, resp.status_code)
        return None
    except Exception as e:
        log.warning("Download %s failed: %s", remote_path, e)
        return None


def _backup_file(filepath: Path) -> None:
    """Create backup of a config file before overwriting."""
    if not filepath.exists():
        return
    BACKUP_DIR.mkdir(parents=True, exist_ok=True)
    ts = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_name = f"{filepath.stem}_{ts}{filepath.suffix}"
    backup_path = BACKUP_DIR / backup_name
    backup_path.write_bytes(filepath.read_bytes())


# ─── Main Update Logic ──────────────────────────────────────────────────────
def check_and_update() -> Dict[str, Any]:
    """
    Check GitHub for updated configs and download if newer.

    Returns dict with:
        ok: bool
        status: "updated" | "up_to_date" | "disabled" | "error"
        message: str
        local_version: str
        remote_version: str
        changed_files: list[str]
        checked_at: str (ISO)
        error: str | None
    """
    global _LAST_STATUS

    with _UPDATE_LOCK:
        result = _do_update()
        _LAST_STATUS = result
        _save_status(result)
        return result


def _do_update() -> Dict[str, Any]:
    """Internal update logic."""
    now = datetime.now().isoformat(timespec="seconds")

    cfg = _load_remote_config()
    if not cfg.enabled:
        return {
            "ok": True, "status": "disabled",
            "message": "Remote config sync is disabled.",
            "local_version": None, "remote_version": None,
            "changed_files": [], "checked_at": now, "error": None,
        }

    if not cfg.owner or not cfg.repo:
        return {
            "ok": False, "status": "error",
            "message": "Remote config: owner/repo not configured.",
            "local_version": None, "remote_version": None,
            "changed_files": [], "checked_at": now, "error": "missing owner/repo",
        }

    token = _get_github_token(cfg.token_env)
    if not token:
        return {
            "ok": False, "status": "error",
            "message": f"GitHub token not found in env var '{cfg.token_env}'.",
            "local_version": None, "remote_version": None,
            "changed_files": [], "checked_at": now, "error": "no token",
        }

    # Load local state
    local_state = _load_state()
    local_version = local_state.get("version", "0.0.0")

    # Fetch remote manifest
    remote_manifest = _fetch_remote_manifest(cfg, token)
    if remote_manifest is None:
        return {
            "ok": False, "status": "error",
            "message": "Could not fetch remote Manifest.json.",
            "local_version": local_version, "remote_version": None,
            "changed_files": [], "checked_at": now, "error": "fetch failed",
        }

    remote_version = remote_manifest.get("version", "0.0.0")

    # Compare versions
    if remote_version <= local_version:
        return {
            "ok": True, "status": "up_to_date",
            "message": "Remote configs are up to date.",
            "local_version": local_version, "remote_version": remote_version,
            "changed_files": [], "checked_at": now, "error": None,
        }

    # Version is newer — download changed files
    log.info("Config update available: %s → %s", local_version, remote_version)
    file_map = remote_manifest.get("files", {})
    changed_files: List[str] = []
    errors: List[str] = []

    for local_name, remote_path in file_map.items():
        try:
            content = _download_file(cfg, token, remote_path)
            if content is None:
                errors.append(f"Failed to download {remote_path}")
                continue

            # Determine local destination based on file type
            if local_name.endswith(".py") or local_name.endswith(".js") or local_name.endswith(".html"):
                # Code/UI files: core/logger.py → SRC_DIR/core/logger.py
                rel = local_name
                local_path = SRC_DIR / rel
            elif local_name == "tenure_curves.json":
                # Root-level file
                local_path = paths.root / "tenure_curves.json"
            else:
                # Config files → config/hermes/
                local_path = CONFIG_DIR / local_name

            # Backup existing
            _backup_file(local_path)

            # Write new content
            local_path.parent.mkdir(parents=True, exist_ok=True)
            local_path.write_bytes(content)
            changed_files.append(str(local_path.relative_to(paths.root)))
            log.info("Updated: %s", local_name)

        except Exception as e:
            errors.append(f"{local_name}: {e}")
            log.error("Error updating %s: %s", local_name, e)

    # Save new state
    new_state = {
        "version": remote_version,
        "updated_at": now,
        "changed_files": changed_files,
    }
    _save_state(new_state)

    if errors:
        return {
            "ok": False, "status": "partial",
            "message": f"Updated {len(changed_files)} files, {len(errors)} errors.",
            "local_version": remote_version, "remote_version": remote_version,
            "changed_files": changed_files, "checked_at": now,
            "error": "; ".join(errors),
        }

    return {
        "ok": True, "status": "updated",
        "message": f"Updated {len(changed_files)} config files to v{remote_version}.",
        "local_version": remote_version, "remote_version": remote_version,
        "changed_files": changed_files, "checked_at": now, "error": None,
    }


def get_status() -> Dict[str, Any]:
    """Return the last update status (no network call)."""
    return dict(_LAST_STATUS)


# ─── Background runner ──────────────────────────────────────────────────────
def start_background_check() -> None:
    """Run config check in a background thread (non-blocking)."""
    t = threading.Thread(target=check_and_update, name="config-updater", daemon=True)
    t.start()
    log.info("Config updater started in background")


if __name__ == "__main__":
    import sys
    result = check_and_update()
    print(json.dumps(result, indent=2))
    sys.exit(0 if result["ok"] else 1)
