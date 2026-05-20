import re
import math
import json
from pathlib import Path
from typing import Optional, List, Dict, Any

import pandas as pd
from project_hermes.config import get_paths
from project_hermes.core.logger import get_logger
log = get_logger(__name__)


# ---------------- paths ----------------
paths = get_paths()
CONFIG_PATH = paths.root / "config" / "hermes" / "cleaning_rules.json"


# ---------------- config loader ----------------
def load_cleaning_rules() -> Dict[str, Any]:
    if CONFIG_PATH.exists():
        return json.loads(CONFIG_PATH.read_text(encoding="utf-8"))
    return {}


RULES = load_cleaning_rules()


# ---------------- helpers ----------------
def read_csv_smart(path: Path) -> pd.DataFrame:
    # Guard: skip empty files
    if path.stat().st_size == 0:
        return pd.DataFrame()
    try:
        df = pd.read_csv(path)
        return df
    except pd.errors.EmptyDataError:
        return pd.DataFrame()
    except UnicodeDecodeError:
        return pd.read_csv(path, encoding="latin-1")


def normalize_cols(df: pd.DataFrame) -> pd.DataFrame:
    df = df.copy()
    df.columns = [re.sub(r"\s+", " ", str(c).strip()) for c in df.columns]
    return df


def find_col(df: pd.DataFrame, candidates: List[str]) -> Optional[str]:
    cols = {c.lower(): c for c in df.columns}
    for cand in candidates:
        if cand.lower() in cols:
            return cols[cand.lower()]
    return None


def find_col_contains(df: pd.DataFrame, needle: str) -> Optional[str]:
    def norm(s: str) -> str:
        return re.sub(r"[\s_]+", "", s.strip().lower())

    target = norm(needle)
    for c in df.columns:
        if target in norm(str(c)):
            return c
    return None


def ceil_1_decimal(x: float) -> float:
    return math.ceil(x * 10.0) / 10.0


def norm_str_series(s: pd.Series) -> pd.Series:
    return (
        s.astype(str)
        .str.replace(r"\s+", " ", regex=True)
        .str.strip()
        .str.upper()
    )


def extract_process_id(file_name: str) -> Optional[str]:
    match = re.search(r"FCLM_(\d+)", file_name.upper())
    return match.group(1) if match else None


# ---------------- FCLM CLEANER ----------------
def clean_fclm(df: pd.DataFrame, file_name: str = "") -> pd.DataFrame:
    df = normalize_cols(df)

    rules = RULES.get("fclm", {})
    default = rules.get("default", {})
    overrides = rules.get("overrides", {})

    process_id = extract_process_id(file_name)
    rule = {**default, **overrides.get(process_id, {})}

    col_process = find_col(df, ["Process Name"])
    col_function = find_col(df, ["Function Name"])
    col_empid = find_col(df, ["Employee Id"])
    col_name = find_col(df, ["Name"])
    col_size = find_col(df, ["Size"])
    col_unit = find_col(df, ["Unit Type"])
    col_paid = find_col(df, ["Paid Hours-Total(function,employee)"])

    out = df.copy()

    # ---------------- SIZE ----------------
    preserve_size = rule.get("preserve_size_breakdown", False)

    if col_size:
        size_norm = norm_str_series(out[col_size]).str.replace(" ", "", regex=False)

        if preserve_size:
            allowed = {"SMALL", "MEDIUM", "LARGE", "HEAVYBULKY", "HEAVY/BULKY", "TOTAL"}
            out = out[size_norm.isin(allowed)]
        elif rule.get("require_size_total", True):
            out = out[size_norm.str.startswith("TOTAL")]

    # ---------------- UNIT TYPE ----------------
    if col_unit:
        unit_norm = norm_str_series(out[col_unit])
        allowed_units = set(rule.get("allowed_unit_types", ["EACH"]))
        out = out[unit_norm.isin(allowed_units)]

    # ---------------- HOURS ----------------
    if col_paid:
        out[col_paid] = pd.to_numeric(out[col_paid], errors="coerce")
        min_hours = rule.get("min_hours", 1)
        out = out[out[col_paid].fillna(0) >= min_hours]

    # ---------------- DEDUP ----------------
    dedup_cols = [c for c in [col_process, col_function, col_empid, col_name] if c]

    if preserve_size and col_size:
        dedup_cols.append(col_size)

    if dedup_cols:
        for c in dedup_cols:
            if c != col_empid:
                out[c] = out[c].astype(str).str.strip()
        out = out.drop_duplicates(subset=dedup_cols, keep="first")

    return out.reset_index(drop=True)


# ---------------- ROBOSCOUT CLEANER ----------------
def clean_roboscout(df: pd.DataFrame, file_name: str = "") -> pd.DataFrame:
    df = normalize_cols(df)

    rules = RULES.get("roboscout", {})
    default = rules.get("default", {})
    overrides = rules.get("overrides", {})

    obj_id = re.search(r"ROBOSCOUT_(\d+)", file_name.upper())
    obj_id = obj_id.group(1) if obj_id else None

    rule = {**default, **overrides.get(obj_id, {})}

    out = df.copy()

    col_logged = (
        find_col_contains(out, "logged_hours")
        or find_col_contains(out, "logged")
    )

    if col_logged and not rule.get("ignore_hours_filter", False):
        out[col_logged] = pd.to_numeric(out[col_logged], errors="coerce")
        min_hours = rule.get("min_hours", 1)
        out = out[out[col_logged].fillna(0) >= min_hours]

    # Round numeric
    num_cols = out.select_dtypes(include=["number"]).columns.tolist()

    for c in out.columns:
        if c in num_cols:
            continue
        if out[c].dtype == "object":
            coerced = pd.to_numeric(out[c], errors="coerce")
            if coerced.notna().mean() > 0.8:
                out[c] = coerced
                num_cols.append(c)

    for c in num_cols:
        out[c] = out[c].apply(lambda v: ceil_1_decimal(v) if pd.notna(v) else v)

    return out.reset_index(drop=True)


# ---------------- MAIN ----------------
def run(output_dir: Path | None = None) -> Path:
    paths = get_paths()
    out_dir = Path(output_dir) if output_dir else paths.output

    print("\nClean_step.run() — Hermes Config Driven\n")
    log.info("Using config: {CONFIG_PATH}")
    log.info("Output dir: {out_dir}")

    if not out_dir.exists():
        raise FileNotFoundError(out_dir)

    for csv_path in sorted(out_dir.glob("*.csv")):
        name = csv_path.name

        df = read_csv_smart(csv_path)

        if df.empty:
            log.info("⚠️ Empty file skipped: {name}")
            continue

        if name.startswith("FCLM_"):
            cleaned = clean_fclm(df, file_name=name)
            cleaned.to_csv(csv_path, index=False, encoding="utf-8-sig")
            log.info("✅ FCLM cleaned: {name} rows={len(cleaned)}")

        elif name.startswith("RoboScout_"):
            cleaned = clean_roboscout(df, file_name=name)
            cleaned.to_csv(csv_path, index=False, encoding="utf-8-sig")
            log.info("✅ RoboScout cleaned: {name} rows={len(cleaned)}")

        else:
            log.info("⏭️ Skipped: {name}")

    print("\nDONE")
    return out_dir


if __name__ == "__main__":
    run()