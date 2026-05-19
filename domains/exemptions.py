# src/project_hermes/domains/exemptions.py
"""
Exemption List — associates excluded from coaching flags.

Source: \\ant\dept-eu\BCN4\Public\Professor_data\Exemption_List.csv
Columns: login, Reason, Inputer, Process, Date
Process values: PACK, PICK, STOW, RECEIVE, ICQA, ALL

Cache: 48h (once every 2 days)

Usage:
    from project_hermes.domains.exemptions import is_exempt, load_exemptions

    if is_exempt("fumanue", "PICK"):
        # skip coaching flag for this person in PICK
        pass
"""
from __future__ import annotations

import time
from pathlib import Path
from typing import Optional

import pandas as pd

from project_hermes.config import get_paths
from project_hermes.core.logger import get_logger

log = get_logger(__name__)

# ─── Paths ──────────────────────────────────────────────────────────────────
paths = get_paths()
EXEMPTION_UNC_PATH = Path(r"\\ant\dept-eu\BCN4\Public\Professor_data\Exemption_List.csv")
CACHE_FILE = paths.root / "data" / "cache" / "exemption_list_cache.csv"
CACHE_MAX_AGE_HOURS = 48  # Refresh every 2 days

# ─── In-memory cache ────────────────────────────────────────────────────────
_exemption_cache: Optional[pd.DataFrame] = None
_cache_loaded_at: float = 0


def _cache_is_fresh() -> bool:
    """Check if in-memory cache is still valid."""
    global _cache_loaded_at
    if _exemption_cache is None:
        return False
    age_hours = (time.time() - _cache_loaded_at) / 3600
    return age_hours < CACHE_MAX_AGE_HOURS


def _read_exemption_csv() -> pd.DataFrame:
    """Read exemption list from UNC or local cache."""
    global _exemption_cache, _cache_loaded_at

    # 1. Check if disk cache is fresh enough
    if CACHE_FILE.exists():
        age_hours = (time.time() - CACHE_FILE.stat().st_mtime) / 3600
        if age_hours < CACHE_MAX_AGE_HOURS:
            log.debug("Exemption cache fresh (%.1fh old), using disk cache", age_hours)
            df = pd.read_csv(str(CACHE_FILE), dtype=str)
            _exemption_cache = df
            _cache_loaded_at = time.time()
            return df

    # 2. Try UNC path
    try:
        df = pd.read_csv(str(EXEMPTION_UNC_PATH), dtype=str)
        log.info("Exemption list loaded from UNC: %d rows", len(df))
        # Save to disk cache
        CACHE_FILE.parent.mkdir(parents=True, exist_ok=True)
        df.to_csv(str(CACHE_FILE), index=False, encoding="utf-8-sig")
        _exemption_cache = df
        _cache_loaded_at = time.time()
        return df
    except Exception as e:
        log.warning("Exemption UNC read failed: %s", e)

    # 3. Fallback to stale disk cache
    if CACHE_FILE.exists():
        log.info("Using stale exemption cache as fallback")
        df = pd.read_csv(str(CACHE_FILE), dtype=str)
        _exemption_cache = df
        _cache_loaded_at = time.time()
        return df

    # 4. No data available
    log.warning("No exemption data available (UNC unreachable, no cache)")
    _exemption_cache = pd.DataFrame(columns=["login", "Reason", "Inputer", "Process", "Date"])
    _cache_loaded_at = time.time()
    return _exemption_cache


def load_exemptions() -> pd.DataFrame:
    """Load exemption list (cached in-memory for 48h)."""
    global _exemption_cache
    if _cache_is_fresh():
        return _exemption_cache
    return _read_exemption_csv()


def is_exempt(login: str, process: str) -> bool:
    """
    Check if a login is exempt from coaching in a given process.

    Args:
        login: Associate login (case-insensitive)
        process: Process to check (PICK, PACK, STOW, RECEIVE, ICQA)

    Returns:
        True if the associate should NOT be flagged for coaching in that process.
    """
    df = load_exemptions()
    if df.empty:
        return False

    login_lower = str(login).strip().lower()
    process_upper = str(process).strip().upper()

    # Normalize the login column
    df_login = df["login"].astype(str).str.strip().str.lower()
    df_process = df["Process"].astype(str).str.strip().str.upper()

    # Match: exact login AND (process matches OR process is ALL)
    mask = (df_login == login_lower) & ((df_process == process_upper) | (df_process == "ALL"))
    return mask.any()


def get_exempt_logins_for_process(process: str) -> set:
    """
    Get all exempt logins for a specific process (includes ALL exemptions).

    Args:
        process: Process to check (PICK, PACK, STOW, RECEIVE, ICQA)

    Returns:
        Set of login strings (lowercase) that are exempt.
    """
    df = load_exemptions()
    if df.empty:
        return set()

    process_upper = str(process).strip().upper()
    df_login = df["login"].astype(str).str.strip().str.lower()
    df_process = df["Process"].astype(str).str.strip().str.upper()

    mask = (df_process == process_upper) | (df_process == "ALL")
    return set(df_login[mask].tolist())
