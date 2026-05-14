# project_hermes/core/config_store.py
from __future__ import annotations

import json
from pathlib import Path
from typing import Any

def hermes_config_dir(root: Path) -> Path:
    d = root / "config" / "hermes"
    d.mkdir(parents=True, exist_ok=True)
    return d

def load_json(root: Path, filename: str, default: Any) -> Any:
    """
    Load JSON from config/hermes/<filename>.
    If missing, write the default and return it (so the app boots on first run).
    """
    cfg_dir = hermes_config_dir(root)
    p = cfg_dir / filename
    if not p.exists():
        p.write_text(json.dumps(default, indent=2), encoding="utf-8")
        return default
    try:
        return json.loads(p.read_text(encoding="utf-8"))
    except Exception:
        # If corrupted, keep app running with default
        return default
