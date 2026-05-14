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
HOURS_UNC_PATH = Path(r"\\ant\dept- eu\BCN4\Public\Professor_data\Hours_Historical.csv")

paths = get_paths()
CACHE_DIR = Path(paths.cache)
CACHE_DIR.mkdir(parents=True, exist_ok=True)
CACHE_FILE = CACHE_DIR / "hours_historical_cache.csv"
CACHE_MAX_AGE_HOURS = 24  # Re-read from network once a day

# ─── Process Mapping ──────────────────────────────────────────────────────
PROCESS_MAP = {
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
    # Role-based mappings (from dashboard_builder Role column)
    "SM": "PACK", "SMMIX": "PACK", "SM2": "PACK",
    "AFE_PACK": "PACK", "P2R_PACK": "PACK",
    "SNS1": "PACK", "SNS2": "PACK", "SINGLES": "PACK",
    "WS_SLAM": "PACK", "WS_VDF": "PACK",
    "STOW": "STOW", "QUANTITY_STOW": "STOW", "QUANTITY_STOYW": "STOW",
    "EACH_TRANSFER_IN": "STOW", "EACH TRANSFER IN": "STOW",
    "TRANSFER_IN_DOCK": "DECANT", "TRANSFER IN DOCK": "DECANT",
    "DECANT": "DECANT",
}

VETERAN_THRESHOLD = 400  # hours
TENURE_BLOCK = 40  # hours per tenure level


# ─── In-memory daily cache ──────────────────────────────────────────────
# Stores processed tenure DataFrames keyed by FC, refreshed once per day.
_tenure_cache: dict[str, pd.DataFrame] = {}
_tenure_cache_date: str = ""  # ISO date string of when cache was built

def _cache_is_fresh() -> bool:
    return _tenure_cache_date == datetime.now().strftime("%Y-%m-%d")


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
            log.info("Using cached hours data ({age.seconds//60}m old)")
            return pd.read_csv(CACHE_FILE, dtype=str)

    # Try to read from UNC path
    if HOURS_UNC_PATH.exists():
        log.info("Reading from network: {HOURS_UNC_PATH}")
        df = pd.read_csv(HOURS_UNC_PATH, dtype=str)
        # Cache it
        df.to_csv(CACHE_FILE, index=False)
        log.info("Cached {len(df)} rows")
        return df

    # Fallback to existing cache even if stale
    if CACHE_FILE.exists():
        log.info("Network unavailable, using stale cache")
        return pd.read_csv(CACHE_FILE, dtype=str)

    log.info("WARNING: No hours data available")
    return pd.DataFrame(columns=["warehouse_id", "login", "hire_date", "process_name", "total_hours"])


def load_tenure_data(fc: Optional[str] = None) -> pd.DataFrame:
    """
    Load and process tenure data. Returns DataFrame with columns:
    [warehouse_id, login, main_process, total_hours, tenure, is_veteran, curve]
    """
    global _tenure_cache, _tenure_cache_date

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

    # Find each login's "main process" (most hours)
    main_proc_by_login = (
        agg.loc[agg.groupby("login")["total_hours"].idxmax()]
        .set_index("login")["main_process"]
        .to_dict()
    )

    # Determine curve classification
    # For each login, find which processes they're veteran in
    veteran_by_login = (
        agg[agg["is_veteran"]]
        .groupby("login")["main_process"]
        .apply(set)
        .to_dict()
    )

    def _classify(row):
        vet_procs = veteran_by_login.get(row["login"], set())
        if row["main_process"] in vet_procs:
            return "VETERAN"
        elif len(vet_procs) > 0:
            return "XT"
        else:
            return "NH"

    agg["curve"] = agg.apply(_classify, axis=1)
    agg["home_process"] = agg["login"].map(main_proc_by_login).fillna("")

    # Store in memory cache
    _tenure_cache[cache_key] = agg
    _tenure_cache_date = datetime.now().strftime("%Y-%m-%d")

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
    """
    login = str(login or "").strip().lower()
    process = map_process(process) if process not in ("PACK", "PICK", "STOW", "DECANT", "ICQA") else process

    mask = (tenure_df["login"].str.lower() == login) & (tenure_df["main_process"] == process)
    match = tenure_df[mask]

    if match.empty:
        # Check if veteran in any other process
        any_vet = tenure_df[
            (tenure_df["login"].str.lower() == login) & (tenure_df["is_veteran"])
        ]
        if not any_vet.empty:
            home = tenure_df[tenure_df["login"].str.lower() == login].sort_values("total_hours", ascending=False).iloc[0]["main_process"]
            return {"tenure": 1, "hours": 0.0, "curve": "XT", "is_veteran": False, "home_process": home}
        return {"tenure": 1, "hours": 0.0, "curve": "NH", "is_veteran": False, "home_process": ""}

    row = match.iloc[0]
    return {
        "tenure": int(row["tenure"]),
        "hours": float(row["total_hours"]),
        "curve": str(row["curve"]),
        "is_veteran": bool(row["is_veteran"]),
        "home_process": str(row.get("home_process", "")),
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
