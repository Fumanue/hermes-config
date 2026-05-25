# tenure_hours.py — Hours-based tenure classification
"""
Tenure model based on actual hours worked per process (not hire date).

Rules:
- Source: \\\\ant\\dept-eu\\BCN4\\Public\\Professor_data\\Hours_Historical.csv
- Process mapping:
    Pack Singles, Pack Multis, Chuting → PACK
    Each Transfer In → STOW
    Pick → PICK
    Transfer In Dock → DECANT
- Tenure = ceil(hours / 40), minimum 1
- Veteran = 400+ hours in a process
- Curve classification per login × process:
    VETERAN — 400+ hours in THIS process
    XT      — Veteran in ANOTHER process, < 400 in this one
    NH      — Not veteran in any process

Usage:
    from project_hermes.domains.tenure_hours import load_tenure_data, get_tenure_for
    tenure_df = load_tenure_data("BCN4")
    info = get_tenure_for(tenure_df, "fumanue", "PACK")
    # → {"tenure": 5, "hours": 187.3, "curve": "NH", "is_veteran": False}
"""
from __future__ import annotations

import math
import os
from datetime import datetime, timedelta
from pathlib import Path
from typing import Optional

import pandas as pd

from project_hermes.config import get_paths
from project_hermes.core.logger import get_logger
log = get_logger(__name__)


# ─── Config ───────────────────────────────────────────────────────────────
# UNC path to the shared hours file
HOURS_UNC_PATH = Path(r"\\ant\dept-eu\BCN4\Public\Professor_data\Hours_Historical.csv")

paths = get_paths()
CACHE_DIR = Path(paths.cache)
CACHE_DIR.mkdir(parents=True, exist_ok=True)
CACHE_FILE = CACHE_DIR / "hours_historical_cache.csv"
CACHE_MAX_AGE_HOURS = 24  # Re-read from network once a day

# ─── Process Mapping ──────────────────────────────────────────────────────
PROCESS_MAP = {
    # Hours_Historical process names
    "Pack Singles": "PACK",
    "Pack Multis": "PACK",
    "Chuting": "PACK",
    "Each Transfer In": "STOW",
    "Transfer In Dock": "DECANT",
    "Pick": "PICK",
    "PICK": "PICK",
    "Pick AR": "PICK",
    "PICK_AR": "PICK",
    "P2R_PICK": "PICK",
    "IC-QA-CS": "ICQA",
    # ─── Role-based mappings (from Roster DetectedRole column) ───
    # Pick
    # (PICK_AR and P2R_PICK already above)
    # Pack Singles roles
    "SM": "PACK", "SMMIX": "PACK", "SM2": "PACK",
    "SNS1": "PACK", "SNS2": "PACK", "SINGLES": "PACK",
    # Pack Multis roles
    "P2R_PACK": "PACK",
    "WS_SLAM": "PACK", "WS_VDF": "PACK",  # also multis area
    # Chuting roles
    "AFE_PACK": "PACK",
    "AFE_REBIN": "PACK",  # AFE rebin = chuting area
    "INDUCT": "PACK",     # induct feeds into pack
    # ICQA roles
    "ICQA_SIMPLE_BIN_COUNT": "ICQA",
    "ICQA_SIMPLE_COUNT": "ICQA",
    # Stow roles
    "STOW": "STOW", "QUANTITY_STOW": "STOW", "QUANTITY_STOYW": "STOW",
    "EACH_TRANSFER_IN": "STOW", "EACH TRANSFER IN": "STOW",
    # Decant roles
    "TRANSFER_IN_DOCK": "DECANT", "TRANSFER IN DOCK": "DECANT",
    "DECANT": "DECANT",
}

VETERAN_THRESHOLD = 400  # hours
TENURE_BLOCK = 40  # hours per tenure level


# ─── In-memory daily cache ──────────────────────────────────────────────
# Stores processed tenure DataFrames keyed by FC, refreshed once per day.
_tenure_cache: dict[str, pd.DataFrame] = {}
_tenure_cache_date: str = ""  # ISO date string of when cache was built
_tenure_cache_file_mtime: float = 0.0  # mtime of CSV when cache was built

def _cache_is_fresh() -> bool:
    """Check if in-memory cache is still valid (same day AND file hasn't changed)."""
    if _tenure_cache_date != datetime.now().strftime("%Y-%m-%d"):
        return False
    # If cache file was deleted, force refresh
    if not CACHE_FILE.exists():
        return False
    # Also invalidate if the CSV file was updated since we cached
    if CACHE_FILE.exists():
        current_mtime = CACHE_FILE.stat().st_mtime
        if current_mtime > _tenure_cache_file_mtime:
            return False
    return True


# ─── Helpers ────────────────────────────────────────────────────────────
def hours_to_tenure(hours: float) -> int:
    """Convert hours to tenure level. Each 40h block = 1 tenure."""
    if hours <= 0:
        return 1
    return max(1, math.ceil(hours / TENURE_BLOCK))


def map_process(process_name: str) -> str:
    """Map raw process_name to main process group."""
    name = str(process_name or "").strip()
    if name in PROCESS_MAP:
        return PROCESS_MAP[name]
    # Fuzzy matching
    upper = name.upper()
    if "PACK" in upper or "CHUT" in upper:
        return "PACK"
    if "PICK" in upper:
        return "PICK"
    # Replace underscores for fuzzy matching
    if "STOW" in upper or "EACH TRANSFER" in upper or "EACH_TRANSFER" in upper:
        return "STOW"
    if "DECANT" in upper or "DOCK" in upper or "TRANSFER_IN_DOCK" in upper:
        return "DECANT"
    if "ICQA" in upper or "COUNT" in upper:
        return "ICQA"
    return "OTHER"


# ─── Data Loading ─────────────────────────────────────────────────────────
def _read_hours_csv() -> pd.DataFrame:
    """Read Hours_Historical.csv from UNC path or cache."""
    # Check cache freshness
    if CACHE_FILE.exists():
        age = datetime.now() - datetime.fromtimestamp(CACHE_FILE.stat().st_mtime)
        if age < timedelta(hours=CACHE_MAX_AGE_HOURS):
            log.info("Using cached hours data (%dm old)", age.seconds // 60)
            return pd.read_csv(CACHE_FILE, dtype=str)
        log.info("Cache is stale (%dh old), will try to refresh from network", age.total_seconds() // 3600)

    # Try to read from UNC path
    try:
        log.info("Trying network read: %s", HOURS_UNC_PATH)
        df = pd.read_csv(str(HOURS_UNC_PATH), dtype=str)
        CACHE_DIR.mkdir(parents=True, exist_ok=True)
        df.to_csv(CACHE_FILE, index=False)
        log.info("Refreshed cache from network: %d rows", len(df))
        return df
    except Exception as e:
        log.warning("Network read failed (%s): %s", HOURS_UNC_PATH, e)

    # Fallback to existing cache even if stale
    if CACHE_FILE.exists():
        log.info("Using stale cache as fallback")
        return pd.read_csv(CACHE_FILE, dtype=str)

    # Last resort: try to seed from bundled data (PyInstaller frozen app)
    bundled = paths.root / "data" / "cache" / "hours_historical_cache.csv"
    if bundled.exists() and str(bundled) != str(CACHE_FILE):
        import shutil
        CACHE_DIR.mkdir(parents=True, exist_ok=True)
        shutil.copy2(str(bundled), str(CACHE_FILE))
        log.info("Seeded cache from bundled data: %s", bundled)
        return pd.read_csv(CACHE_FILE, dtype=str)

    log.warning("No hours data available — cache missing, network unreachable, no bundle")
    return pd.DataFrame(columns=["warehouse_id", "login", "hire_date", "process_name", "total_hours"])


def load_tenure_data(fc: Optional[str] = None) -> pd.DataFrame:
    """
    Load and process tenure data. Returns DataFrame with columns:
    [warehouse_id, login, main_process, total_hours, tenure, is_veteran, curve]
    """
    global _tenure_cache, _tenure_cache_date, _tenure_cache_file_mtime

    cache_key = (fc or "ALL").strip().upper()

    # Return from in-memory cache if same day
    if _cache_is_fresh() and cache_key in _tenure_cache:
        log.info("Using in-memory cache for {cache_key} (built today)")
        return _tenure_cache[cache_key]

    # If day changed, flush entire cache
    if not _cache_is_fresh():
        _tenure_cache.clear()

    raw = _read_hours_csv()
    if raw.empty:
        return pd.DataFrame(columns=[
            "warehouse_id", "login", "main_process", "total_hours",
            "tenure", "is_veteran", "curve"
        ])

    raw["total_hours"] = pd.to_numeric(raw["total_hours"], errors="coerce").fillna(0)
    raw["main_process"] = raw["process_name"].apply(map_process)

    # Filter by FC if specified
    if fc:
        raw = raw[raw["warehouse_id"].str.upper() == fc.strip().upper()].copy()

    # Aggregate hours per login per main_process
    agg = (
        raw.groupby(["warehouse_id", "login", "main_process"], as_index=False)["total_hours"]
        .sum()
    )

    # Calculate tenure and veteran status
    agg["tenure"] = agg["total_hours"].apply(hours_to_tenure)
    agg["is_veteran"] = agg["total_hours"] >= VETERAN_THRESHOLD

    # Find each login's "home process" = process with MOST hours (regardless of threshold)
    main_proc_by_login = (
        agg.loc[agg.groupby("login")["total_hours"].idxmax()]
        .set_index("login")["main_process"]
        .to_dict()
    )

    # Determine curve classification
    # - VETERAN: 400+ hours in THIS process
    # - XT: This is NOT your home process (home = process with most hours)
    # - NH: This IS your home process but < 400 hours (new hire in their main process)
    def _classify(row):
        login = row["login"]
        home = main_proc_by_login.get(login, "")
        if row["total_hours"] >= VETERAN_THRESHOLD:
            return "VETERAN"
        elif row["main_process"] != home:
            # Working in a process that is NOT their strongest → cross-trainee
            return "XT"
        else:
            # Working in their home process but not yet veteran
            return "NH"

    agg["curve"] = agg.apply(_classify, axis=1)
    agg["home_process"] = agg["login"].map(main_proc_by_login).fillna("")

    # Store in memory cache
    _tenure_cache[cache_key] = agg
    _tenure_cache_date = datetime.now().strftime("%Y-%m-%d")
    _tenure_cache_file_mtime = CACHE_FILE.stat().st_mtime if CACHE_FILE.exists() else 0.0

    return agg


# ─── Public API ───────────────────────────────────────────────────────────
def get_tenure_for(tenure_df: pd.DataFrame, login: str, process: str) -> dict:
    """
    Get tenure info for a specific associate in a specific process.

    Returns dict with keys:
        tenure: int (tenure level based on hours)
        hours: float (total hours in this process)
        curve: str ("VETERAN", "XT", or "NH")
        is_veteran: bool (400+ hours in this process)
        home_process: str (process with most hours overall)
    """
    login = str(login or "").strip().lower()
    process = map_process(process) if process not in ("PACK", "PICK", "STOW", "DECANT", "ICQA") else process

    # Find all entries for this login
    login_mask = tenure_df["login"].str.lower() == login
    login_entries = tenure_df[login_mask]

    if login_entries.empty:
        return {"tenure": 1, "hours": 0.0, "curve": "NH", "is_veteran": False, "home_process": ""}

    # Determine home process (most hours)
    home_row = login_entries.sort_values("total_hours", ascending=False).iloc[0]
    home_process = str(home_row["main_process"])

    # Find entry for the requested process
    mask = login_mask & (tenure_df["main_process"] == process)
    match = tenure_df[mask]

    if match.empty:
        # No hours in this process at all → cross-trainee (home is elsewhere)
        return {"tenure": 1, "hours": 0.0, "curve": "XT", "is_veteran": False, "home_process": home_process}

    row = match.iloc[0]
    hours = float(row["total_hours"])
    tenure = int(row["tenure"])
    is_veteran = hours >= VETERAN_THRESHOLD

    # Classify: VETERAN if 400+, XT if not home process, NH if home but < 400
    if is_veteran:
        curve = "VETERAN"
    elif process != home_process:
        curve = "XT"
    else:
        curve = "NH"

    return {
        "tenure": tenure,
        "hours": hours,
        "curve": curve,
        "is_veteran": is_veteran,
        "home_process": home_process,
    }


def get_tenure_label(tenure_df: pd.DataFrame, login: str, process: str) -> str:
    """
    Returns a short human-readable label like "NH T3", "XT T2 (PACK)", "VET".
    """
    info = get_tenure_for(tenure_df, login, process)
    if info["curve"] == "VETERAN":
        return "VET"
    label = f"{info['curve']} T{info['tenure']}"
    if info["curve"] == "XT" and info.get("home_process"):
        label += f" ({info['home_process']})"
    return label


# ─── CLI ──────────────────────────────────────────────────────────────────
if __name__ == "__main__":
    import sys

    fc = sys.argv[1] if len(sys.argv) > 1 else "BCN4"
    log.info("Loading tenure data for {fc}...")
    tdf = load_tenure_data(fc)
    log.info("  {len(tdf)} process-login entries")
    log.info("  Curves: {tdf['curve'].value_counts().to_dict()}")
    log.info("\n  Top 10 veterans:")
    top = tdf[tdf["is_veteran"]].nlargest(10, "total_hours")
    print(top[["login", "main_process", "total_hours", "tenure", "curve"]].to_string(index=False))

    if len(sys.argv) > 2:
        login = sys.argv[2]
        proc = sys.argv[3] if len(sys.argv) > 3 else "PACK"
        log.info("\n  Lookup: {login} in {proc}")
        log.info("  → {get_tenure_for(tdf, login, proc)}")
