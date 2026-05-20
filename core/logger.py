# src/project_hermes/core/logger.py
"""
Centralized logging for Project Argos.
Handles console=False .exe mode (sys.stdout=None) gracefully.

Usage in any module:
    from project_hermes.core.logger import get_logger
    log = get_logger(__name__)
    log.info("Pipeline started for %s", fc)
    log.warning("Cache stale, using fallback")
    log.error("Upload failed: %s", e)

Log output:
    - Console: colored, concise (INFO+)
    - File: data/logs/hermes.log (DEBUG+, rotating 5MB × 3 backups)
"""
from __future__ import annotations

import logging
import sys
from logging.handlers import RotatingFileHandler
from logging import FileHandler
from pathlib import Path

from project_hermes.config import get_paths

# ─── Config ────────────────────────────────────────────────────────────────
LOG_FILE_MAX_BYTES = 5 * 1024 * 1024  # 5 MB
LOG_FILE_BACKUP_COUNT = 3
LOG_FORMAT_FILE = "%(asctime)s │ %(levelname)-7s │ %(name)s │ %(message)s"
LOG_FORMAT_CONSOLE = "%(levelname)-7s │ %(name)s │ %(message)s"
LOG_DATE_FORMAT = "%Y-%m-%d %H:%M:%S"

_initialized = False


def _setup_root_logger() -> None:
    """Configure root logger once (file + console handlers)."""
    global _initialized
    if _initialized:
        return
    _initialized = True

    paths = get_paths()
    log_file = paths.logs / "hermes.log"
    log_file.parent.mkdir(parents=True, exist_ok=True)

    # ─── Emergency desktop log (for .exe crash diagnosis) ───────────────
    try:
        desktop = Path.home() / "Desktop" / "argos_error.log"
        efh = FileHandler(str(desktop), mode="w", encoding="utf-8")
        efh.setLevel(logging.ERROR)
        efh.setFormatter(logging.Formatter(LOG_FORMAT_FILE, datefmt=LOG_DATE_FORMAT))
    except Exception:
        efh = None

    root = logging.getLogger("hermes")
    root.setLevel(logging.DEBUG)

    # Prevent duplicate handlers on reload
    if root.handlers:
        return

    # ─── File handler (DEBUG+, rotating) ────────────────────────────────
    fh = RotatingFileHandler(
        str(log_file),
        maxBytes=LOG_FILE_MAX_BYTES,
        backupCount=LOG_FILE_BACKUP_COUNT,
        encoding="utf-8",
    )
    fh.setLevel(logging.DEBUG)
    fh.setFormatter(logging.Formatter(LOG_FORMAT_FILE, datefmt=LOG_DATE_FORMAT))
    root.addHandler(fh)

    # ─── Console handler (INFO+) ────────────────────────────────────────
    # In .exe with console=False, sys.stdout is None — skip to avoid crash
    if sys.stdout is not None:
        ch = logging.StreamHandler(sys.stdout)
        ch.setLevel(logging.INFO)
        ch.setFormatter(logging.Formatter(LOG_FORMAT_CONSOLE))
        root.addHandler(ch)

    # ─── Desktop error log (always, for crash visibility) ───────────────
    if efh is not None:
        root.addHandler(efh)


def get_logger(name: str) -> logging.Logger:
    """
    Get a named logger under the 'hermes' namespace.

    Args:
        name: Module name (typically __name__), e.g. 'project_hermes.domains.quality_pipeline'

    Returns:
        Logger instance with file + console handlers configured.
    """
    _setup_root_logger()

    # Strip common prefix for cleaner log names
    short = name.replace("project_hermes.", "").replace("src.", "")
    return logging.getLogger(f"hermes.{short}")
