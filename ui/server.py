import contextlib
import json
import platform
import re
from datetime import datetime, time, timedelta
from io import StringIO
from pathlib import Path
import os

import pandas as pd
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, StreamingResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

from project_argos.config import get_paths
from project_argos.core.logger import get_logger
from project_argos.domains.guided_coaching_history import fetch_guided_coaching_history
from project_argos.domains.necro_targets import get_necro_targets
from project_argos.domains.quality_pipeline import (
    load_output, load_output_multi, _load_json,
    _course_for_error, normalize_error_key,
    run as run_quality_pipeline,
)
from project_argos.domains.tenure_hours import load_tenure_data, get_tenure_for, map_process
from project_argos.domains.guided_coaching_uploader import GuidedCoachingUploader
from project_argos.services.pipeline import run_pipeline
from project_argos.domains.auth_phonetool import get_phonetool_user, resolve_permissions, ALLOWED_SITES
from project_argos.domains.gca_compliance import run_gca_compliance_pipeline, load_gca_compliance_cache

# ─────────────────────────────────────────────────────────
# App
# ─────────────────────────────────────────────────────────
app = FastAPI(title="Project Argos API", version="2.0.0")
log = get_logger(__name__)

# ─────────────────────────────────────────────────────────
# Pipeline job store (for XHR polling — replaces SSE)
# ─────────────────────────────────────────────────────────
import uuid as _uuid
_pipeline_jobs: dict = {}  # job_id → {"pct", "msg", "status": "running"|"done"|"error", "ok", "error"}

def _make_job() -> str:
    job_id = _uuid.uuid4().hex
    _pipeline_jobs[job_id] = {"pct": 0, "msg": "Iniciando…", "status": "running"}
    return job_id

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─────────────────────────────────────────────────────────
# Paths
# ─────────────────────────────────────────────────────────
paths         = get_paths()
OUTPUT_DIR    = paths.output
DASHBOARD_CSV = OUTPUT_DIR / "Dashboard_Full.csv"
CONFIG_DIR    = paths.root / "config" / "argos"
DEFAULT_FC    = "BCN4"

STATIC_DIR = Path(__file__).parent / "static"
log.info("STATIC_DIR    = {STATIC_DIR}")
log.info("index.html    = {(STATIC_DIR / 'index.html').exists()}")
log.info("app.js        = {(STATIC_DIR / 'app.js').exists()}")
log.info("Dashboard CSV = {DASHBOARD_CSV.exists()}")

# ─────────────────────────────────────────────────────────
# Usage telemetry (fire-and-forget, non-blocking)
# ─────────────────────────────────────────────────────────
_USAGE_LOG = Path(r"\\ant\dept-eu\BCN4\Public\Professor_data\argos_usage.csv")

def _log_usage(fc: str, username: str, pipeline_type: str):
    """Append usage line to shared CSV. Runs in daemon thread — zero impact on pipeline."""
    import threading
    def _write():
        try:
            ts = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            line = f"{ts},{fc},{username},{pipeline_type}\n"
            if not _USAGE_LOG.exists():
                _USAGE_LOG.write_text("timestamp,fc,username,pipeline_type\n" + line, encoding="utf-8")
            else:
                with open(_USAGE_LOG, "a", encoding="utf-8") as f:
                    f.write(line)
        except Exception:
            pass
    threading.Thread(target=_write, daemon=True).start()

if not STATIC_DIR.exists():
    raise RuntimeError(f"Static directory not found: {STATIC_DIR}")

app.mount("/static", StaticFiles(directory=str(STATIC_DIR)), name="static")

# ─────────────────────────────────────────────────────────
# Config loader
# ─────────────────────────────────────────────────────────
def _load_config(filename: str, defaults: dict) -> dict:
    fp = CONFIG_DIR / filename
    if not fp.exists():
        return dict(defaults)
    try:
        with open(fp, "r", encoding="utf-8") as f:
            data = json.load(f)
        merged = dict(defaults)
        merged.update(data)
        return merged
    except Exception:
        return dict(defaults)


cfg_courses = _load_config("guided_coaching.json", {
    "course_base": "https://dub.prod.cms.umbrella.amazon.dev/course/",
    "transcript_base": "https://guided-coaching-dub.corp.amazon.com/#/employee-transcript/",
    "lookback_days": 7,
    "role_to_course_uuid": {},
    "station_course_key_overrides": [],
})
cfg_area = _load_config("area_roles.json", {"ib_roles": [], "ob_roles": []})

COURSE_BASE              = cfg_courses["course_base"]
TRANSCRIPT_BASE          = cfg_courses["transcript_base"]
ROLE_TO_COURSE_UUID: dict = cfg_courses.get("role_to_course_uuid", {})
STATION_OVERRIDES: list   = cfg_courses.get("station_course_key_overrides", [])
IB_ROLES = set(cfg_area.get("ib_roles", []))
OB_ROLES = set(cfg_area.get("ob_roles", []))

# ─────────────────────────────────────────────────────────
# Course helpers
# ─────────────────────────────────────────────────────────
_LD_PACK  = {"SM", "SMMIX", "SM2", "SNS1", "SNS2"}
_LD_PACK2 = {"AFE_PACK", "P2R_PACK"}
_LD_STOW  = {"STOW", "QUANTITY_STOW"}
_LD_PICK  = {"PICK_AR", "P2R_PICK"}


def compute_course_key(role: str, station: str, dept: str = "", comments: str = "") -> str:
    r = str(role     or "").upper().strip()
    d = str(dept     or "").upper().strip()
    s = str(station  or "").upper()
    c = str(comments or "").upper()
    for rule in STATION_OVERRIDES:
        needle = str(rule.get("station_contains", "")).upper().strip()
        if needle and needle in s:
            return str(rule.get("course_key", "")).upper().strip()
    # PICK_AR with UPT flag → PICK_UPT course
    if r == "PICK_AR" and "UPT" in c:
        if ROLE_TO_COURSE_UUID.get("PICK_UPT"):
            return "PICK_UPT"
    # QUANTITY_STOW must keep its own course when configured.
    # Do this before L&D_STOW routing and before STOW fallback.
    if r == "QUANTITY_STOW" and ROLE_TO_COURSE_UUID.get("QUANTITY_STOW"):
        return "QUANTITY_STOW"

    if d in ("L&D", "L AND D", "LND", "LD"):
        if r in _LD_PACK:  return "L&D_Pack_Singles"
        if r in _LD_PACK2: return "L&D_AFE_P2R_PACK"
        if r in _LD_STOW:  return "L&D_STOW"
        if r in _LD_PICK:  return "L&D_PICK"
    if r == "QUANTITY_STOW":
        r = "STOW"
    return r


def course_id_from_key(key: str) -> str | None:
    raw = ROLE_TO_COURSE_UUID.get(key)
    if isinstance(raw, dict):
        uuid = raw.get("uuid", "")
    else:
        uuid = raw
    return f"{COURSE_BASE}{uuid}" if uuid else None


def course_applies_to(key: str) -> str:
    """Return who this course applies to: 'both', 'ld', or 'ops'."""
    raw = ROLE_TO_COURSE_UUID.get(key)
    if isinstance(raw, dict):
        return str(raw.get("applies_to", "both")).lower()
    return "both"


def transcript_url(login: str) -> str:
    return f"{TRANSCRIPT_BASE}{str(login).strip()}"


def badge_photo_url(login: str) -> str:
    return (
        f"https://badgephotos.amazon.com/"
        f"?Region=Master&FullsizeImage=Yes&uid={str(login).strip()}"
    )

# ─────────────────────────────────────────────────────────
# Shift helpers
# ─────────────────────────────────────────────────────────
# FC-aware shift definitions: (start_h, start_m, end_h, end_m)
FC_SHIFTS: dict = {
    "BCN4": {"EARLY": (6,0,14,0),  "LATE": (14,0,22,0),  "NIGHT": (22,0,6,0)},
    "BCN1": {"EARLY": (6,0,14,0),  "LATE": (14,0,22,0),  "NIGHT": (22,0,6,0)},
    "RMU1": {"EARLY": (6,0,14,0),  "LATE": (14,0,22,0),  "NIGHT": (22,0,6,0)},
    "OVD1": {"EARLY": (6,0,14,0),  "LATE": (14,0,22,0),  "NIGHT": (22,0,6,0)},
    "SVQ1": {"EARLY": (6,0,14,0),  "LATE": (14,0,22,0),  "NIGHT": (22,0,6,0)},
    "MAD7": {
        "EARLY":      (7,  0,  15, 0),
        "LATE":       (15, 0,  23, 0),
        "NIGHT":      (23, 0,  7,  0),
        "CENTRAL":    (11, 15, 19, 15),
        "LATE_NIGHT": (19, 45, 3,  45),
    },
}

SHIFT_DISPLAY: dict = {
    "EARLY":      "Early",
    "LATE":       "Late",
    "NIGHT":      "Night",
    "CENTRAL":    "Central",
    "LATE_NIGHT": "Late Night",
    "SATURDAY_E": "Saturday E",
    "DAY":        "Day",
    "EVENING":    "Evening",
}

def _fc_shifts(fc: str) -> dict:
    """Get shifts for an FC. Reads from shift_config.json dynamically, falls back to hardcoded."""
    fc = (fc or "BCN4").upper()
    # Try dynamic from shift_config.json
    try:
        shift_cfg_path = CONFIG_DIR / "shift_config.json"
        if shift_cfg_path.exists():
            cfg = json.loads(shift_cfg_path.read_text(encoding="utf-8"))
            fc_cfg = cfg.get(fc, {})
            # Use default_department or first dept
            dept = fc_cfg.get("default_department", "Outbound")
            shifts_data = fc_cfg.get(dept, {})
            if shifts_data:
                result = {}
                for name, s in shifts_data.items():
                    start = int(s.get("shift_start", 0))
                    end = int(s.get("shift_end", 0))
                    result[name.upper()] = (start // 60, start % 60, end // 60, end % 60)
                if result:
                    return result
    except Exception:
        pass
    return FC_SHIFTS.get(fc, FC_SHIFTS["BCN4"])

def auto_detect_shift(fc: str = "BCN4", now: datetime | None = None) -> str:
    now = now or datetime.now()
    h, m = now.hour, now.minute
    cur_min = h * 60 + m
    # Skip "CENTRAL" from auto-detection — user must select it manually
    for shift_key, (sh, sm, eh, em) in _fc_shifts(fc).items():
        if shift_key.upper() == "CENTRAL":
            continue
        start = sh * 60 + sm
        end   = eh * 60 + em
        if start < end:
            if start <= cur_min < end:
                return shift_key
        else:  # crosses midnight
            if cur_min >= start or cur_min < end:
                return shift_key
    return "EARLY"

def compute_shift_range(shift: str, fc: str = "BCN4", now: datetime | None = None):
    now   = now or datetime.now()
    today = now.date()
    shifts = _fc_shifts(fc)
    sh, sm, eh, em = shifts.get(shift.upper(), (6,0,14,0))
    start = datetime.combine(today, time(sh, sm))
    end_t = time(eh, em)
    # If end <= start time → crosses midnight
    end_base = datetime.combine(today, end_t)
    if (eh * 60 + em) <= (sh * 60 + sm):
        cur_min = now.hour * 60 + now.minute
        shift_start_min = sh * 60 + sm
        shift_end_min = eh * 60 + em
        # Determine if we are currently INSIDE this overnight shift:
        # Inside = cur_min >= shift_start (e.g. >=22:00) OR cur_min < shift_end (e.g. <06:00)
        inside_shift = (cur_min >= shift_start_min) or (cur_min < shift_end_min)
        if cur_min < shift_end_min:
            # We're in the early-morning portion (e.g. 04:00) → last night
            start = datetime.combine(today - timedelta(days=1), time(sh, sm))
            end_base = datetime.combine(today, end_t)
        elif not inside_shift:
            # We're outside the shift entirely (e.g. 14:00) → last night
            start = datetime.combine(today - timedelta(days=1), time(sh, sm))
            end_base = datetime.combine(today, end_t)
        else:
            # We're in the late-evening portion (e.g. 23:00) → tonight
            end_base = datetime.combine(today + timedelta(days=1), end_t)
    return start, end_base

# ─────────────────────────────────────────────────────────
# COM Helper (Windows)
# ─────────────────────────────────────────────────────────
def with_com_init(fn, *args, **kwargs):
    coinit = False
    if platform.system().lower().startswith("win"):
        try:
            import pythoncom
            pythoncom.CoInitialize()
            coinit = True
        except Exception as e:
            log.debug("CoInitialize skipped: %s", e)
    try:
        return fn(*args, **kwargs)
    finally:
        if coinit:
            try:
                import pythoncom
                pythoncom.CoUninitialize()
            except Exception as e:
                log.debug("CoUninitialize skipped: %s", e)

# ─────────────────────────────────────────────────────────
# Dashboard loader
# ─────────────────────────────────────────────────────────
def _ensure_idle(df: pd.DataFrame) -> pd.DataFrame:
    if "%IDLE" not in df.columns and "% IDLE" in df.columns:
        df["%IDLE"] = df["% IDLE"]
    if "% IDLE" not in df.columns and "%IDLE" in df.columns:
        df["% IDLE"] = df["%IDLE"]
    return df


def load_dashboard() -> pd.DataFrame:
    if not DASHBOARD_CSV.exists():
        return pd.DataFrame()
    df = pd.read_csv(DASHBOARD_CSV)
    if "Prioridad" in df.columns and "Sigma" not in df.columns:
        df.rename(columns={"Prioridad": "Sigma"}, inplace=True)
    df = _ensure_idle(df)
    for col in [
        "Dept", "Login", "Station", "Role", "Rate", "% to OP2", "Sigma",
        "TenureWk", "Process Tenure Week", "TenureInDays", "TenureDays", "Cohort",
        "Comments", "H1_OnTarget", "H2_OnTarget", "%IDLE", "Coached", "Mode",
    ]:
        if col not in df.columns:
            df[col] = None
    df["Sigma"] = pd.to_numeric(df["Sigma"], errors="coerce").fillna(0).astype(int)
    df["Mode"] = pd.to_numeric(df["Mode"], errors="coerce").fillna(0).astype(int)
    return df


def build_base(df: pd.DataFrame) -> pd.DataFrame:
    if df.empty:
        return df
    base = df.copy()
    if "Station" in base.columns:
        s = base["Station"].astype(str).str.strip().str.lower()
        r = base["Role"].astype(str).str.strip().str.upper()
        base = base[~s.isin(["", "nan", "none", "na"]) | r.isin({"DECANT"})]
    if "Rate" in base.columns:
        base = base[pd.to_numeric(base["Rate"], errors="coerce").notna()]
    decant_no_st = (
        (base["Role"].astype(str).str.upper() == "DECANT") &
        (base["Station"].astype(str).str.strip().str.lower()
         .isin(["", "nan", "none", "nat"]))
    )
    return base[~decant_no_st].reset_index(drop=True)


def coached_days_label(val) -> str:
    s = str(val or "").strip()
    if not s:
        return ""
    m = re.search(r"[?&]d=([0-9]+d)\b", s)
    return m.group(1) if m else ""


def get_login_notes(login: str, df: pd.DataFrame) -> str:
    m = df[df["Login"].astype(str).str.strip() == str(login).strip()]
    if m.empty:
        return ""
    row   = m.iloc[0]
    parts = []
    for key, fmt in [
        ("Rate",     "Rate: {:.0f}"),
        ("% to OP2", "{:.1f}% to OP2"),
        ("%IDLE",    "IDLE: {:.1f}%"),
    ]:
        v = row.get(key)
        if v is not None and pd.notna(v):
            try:
                parts.append(fmt.format(float(str(v).replace("%", ""))))
            except Exception:
                pass  # Skip unparseable metric values
    comment = row.get("Comments")
    if comment and pd.notna(comment) and str(comment).lower() not in ("nan", "none", ""):
        for p in str(comment).split(";"):
            p = p.strip().lstrip("⚠️ ").strip()
            if p and p.lower() not in ("nan", "none"):
                parts.append(p)
    return " | ".join(parts)

def build_coaching_notes(login: str, df: pd.DataFrame) -> str:
    """
    Returns coaching notes with Dept + Process info:
      - 'Ops Pack Performance'
      - 'L&D Pick Performance'
      - 'Ops Stow Performance'
    """
    login_s = str(login or "").strip()

    m = df[df["Login"].astype(str).str.strip() == login_s]
    dept = ""
    role = ""
    if not m.empty and "Dept" in m.columns:
        dept = str(m.iloc[0].get("Dept", "") or "").strip()
    if not m.empty and "Role" in m.columns:
        role = str(m.iloc[0].get("Role", "") or "").strip().upper()

    # Determine dept prefix
    dept_prefix = "L&D" if dept.upper() in ("L&D", "L AND D", "LND", "LD") else "Ops"

    # Determine process from role
    if role in ("SM", "SM1", "SMMIX", "SM2", "AFE_PACK", "P2R_PACK", "SNS1", "SNS2"):
        process = "Pack"
    elif role in ("PICK_AR", "P2R_PICK"):
        process = "Pick"
    elif role in ("STOW", "QUANTITY_STOW"):
        process = "Stow"
    elif role == "DECANT":
        process = "Receive"
    elif "ICQA" in role or "SBC" in role:
        process = "ICQA"
    else:
        process = "Perfo"

    return f"{dept_prefix} {process} Performance"
# ─────────────────────────────────────────────────────────
# Targets loader
# ─────────────────────────────────────────────────────────
def load_targets(fc: str) -> list[dict]:
    try:
        necro = {
            str(k).upper(): float(v)
            for k, v in get_necro_targets(fc)["targets"].items()
        }
    except Exception:
        necro = {}

    ct           = _load_config("custom_targets.json", {})
    fc_ct        = ct.get(fc.upper(), ct)  # FC-specific or top-level fallback
    pack_targets = fc_ct.get("pack_line_targets", [])
    curves_path  = paths.root / "tenure_curves.json"
    curves: dict = {}
    if curves_path.exists():
        try:
            curves = json.loads(
                curves_path.read_text(encoding="utf-8")
            )["curves"]
        except Exception as e:
            log.warning("Could not load tenure curves: %s", e)

    fc_curves = curves.get(fc.upper(), {})

    # Mapping: role → curve key in tenure_curves.json
    CURVE_KEY_MAP = {
        "SM": "SINGLES", "SMMIX": "SINGLES", "SM2": "SINGLES",
        "SNS1": "SINGLES", "SNS2": "SINGLES",
        "ICQA_SIMPLE_BIN_COUNT": "ICQA",
    }
    # Display name overrides
    DISPLAY_NAME_MAP = {
        "ICQA_SIMPLE_BIN_COUNT": "SBC",
    }

    def _f(role: str, wk: int) -> float:
        try:
            curve_key = CURVE_KEY_MAP.get(role, role)
            return float(fc_curves.get(curve_key, {}).get(str(wk), 1.0))
        except Exception:
            return 1.0

    rows: list[dict] = []
    seen: set[str]   = set()

    for p in pack_targets:
        role   = str(p.get("applies_to_role", "")).upper().strip()
        target = float(p.get("target_uph", 0))
        if not role or target <= 0:
            continue
        seen.add(role)
        display_role = DISPLAY_NAME_MAP.get(role, role)
        r: dict = {
            "role":   display_role,
            "source": f"Pack ({p.get('key', '')})",
            "base":   int(target),
        }
        for w in range(1, 11):
            r[f"w{w}"] = int(round(target * _f(role, w)))
        rows.append(r)

    for role, target in sorted(necro.items()):
        if role in seen:
            continue
        seen.add(role)
        r = {"role": role, "source": "Necro", "base": int(target)}
        for w in range(1, 11):
            r[f"w{w}"] = int(round(target * _f(role, w)))
        rows.append(r)

    return rows

# ═════════════════════════════════════════════════════════
# ROUTES
# ═════════════════════════════════════════════════════════

@app.get("/")
def index():
    return FileResponse(str(STATIC_DIR / "index.html"))


@app.get("/api/health")
def health():
    return {
        "status":           "ok",
        "dashboard_exists": DASHBOARD_CSV.exists(),
        "static_dir":       str(STATIC_DIR),
        "index_exists":     (STATIC_DIR / "index.html").exists(),
        "appjs_exists":     (STATIC_DIR / "app.js").exists(),
        "timestamp":        datetime.now().isoformat(),
    }


# ─────────────────────────────────────────────────────────
# User Preferences (persisted to data/user_prefs.json)
# ─────────────────────────────────────────────────────────
_USER_PREFS_PATH = paths.data / "user_prefs.json"

@app.get("/api/prefs")
def api_get_prefs():
    if _USER_PREFS_PATH.exists():
        try:
            return json.loads(_USER_PREFS_PATH.read_text(encoding="utf-8"))
        except Exception:
            pass
    return {"default_fc": "BCN4", "theme": "light", "lang": "es"}

@app.post("/api/prefs")
def api_save_prefs(body: dict):
    try:
        # Merge with existing prefs
        existing = {}
        if _USER_PREFS_PATH.exists():
            try:
                existing = json.loads(_USER_PREFS_PATH.read_text(encoding="utf-8"))
            except Exception:
                pass
        existing.update(body)
        _USER_PREFS_PATH.write_text(json.dumps(existing, indent=2), encoding="utf-8")
        return {"ok": True}
    except Exception as e:
        return {"ok": False, "error": str(e)}


@app.get("/api/shift")
def api_shift(fc: str = DEFAULT_FC, shift: str = ""):
    now   = datetime.now()
    fc    = (fc or DEFAULT_FC).strip().upper()
    shift = shift.strip().upper() if shift.strip() else auto_detect_shift(fc, now)
    s, e  = compute_shift_range(shift, fc, now)
    shifts = _fc_shifts(fc)
    return {
        "current": shift,
        "label":   SHIFT_DISPLAY.get(shift, shift),
        "start_full": s.strftime("%Y-%m-%d %H:%M"),
        "end_full":   e.strftime("%Y-%m-%d %H:%M"),
        "start":   s.strftime("%H:%M"),
        "end":     e.strftime("%H:%M"),
        "time":    now.strftime("%H:%M"),
        "options": [
            {"value": k, "label": SHIFT_DISPLAY.get(k, k)} for k in shifts
        ],
    }


def _row_first(row, names: list[str], default=""):
    for name in names:
        try:
            v = row.get(name)
        except Exception:
            v = None
        if v is not None and pd.notna(v) and str(v).strip().lower() not in ("", "nan", "none", "null"):
            return v
    return default


def _nh_week_label(row) -> str:
    """
    Return tenure label based on hours-based curve system.
    Examples: "NH 3", "XT 4 (STOW)", "VET"
    """
    curve = str(_row_first(row, ["Curve", "curve"], "") or "").strip()
    tenure_wk = _row_first(row, ["TenureWk", "Process Tenure Week", "Tenure Week"], None)
    home = str(_row_first(row, ["HomeProcess", "home_process"], "") or "").strip()
    nh_flag = str(_row_first(row, ["NH_Flag", "nh_flag"], "") or "").strip()
    dept = str(_row_first(row, ["Dept", "dept"], "") or "").strip()

    # If Curve column is missing but NH_Flag already has the computed value, use it directly
    if not curve or curve.lower() == "nan":
        if nh_flag and nh_flag.lower() not in ("nan", ""):
            return nh_flag.replace(" T", " ")  # "XT T4 (STOW)" → "XT 4 (STOW)"

    try:
        wk = int(float(str(tenure_wk).strip()))
    except Exception:
        wk = 0

    # Detect VETERAN: explicit Curve column, or infer from Dept=Ops + empty NH_Flag
    if curve == "VETERAN" or (dept == "Ops" and (not nh_flag or nh_flag.lower() == "nan")):
        return "VET"
    elif curve == "XT":
        label = f"XT {wk}" if wk > 0 else "XT"
        if home:
            label += f" ({home})"
        return label
    elif curve == "NH" and wk > 0:
        return f"NH {wk}"
    elif wk > 0:
        return f"NH {wk}"
    return ""


@app.get("/api/dashboard")
def api_dashboard(fc: str = DEFAULT_FC, shift: str = ""):
    df   = load_dashboard()
    base = build_base(df)

    if base.empty:
        return {
            "data":    [],
            "kpis":    {"p3":0,"p2":0,"p1":0,"p0":0,"total":0,"coached":0},
            "roles":   {},
            "depts":   {},
            "role_p3": {},
        }

    sigma = pd.to_numeric(base["Sigma"], errors="coerce").fillna(0).astype(int)

    coached_set: set[str] = set()
    if "Coached" in base.columns:
        mask = base["Coached"].apply(
            lambda v: pd.notna(v) and str(v).strip() not in ("", "nan", "none")
        )
        coached_set = set(base.loc[mask, "Login"].astype(str).str.strip())

    records = []
    _ROLE_DISPLAY = {"ICQA_SIMPLE_BIN_COUNT": "ICQA - SBC"}

    for _, row in base.iterrows():
        login   = str(row.get("Login",   "")).strip()
        role    = _ROLE_DISPLAY.get(str(row.get("Role","")).strip(), str(row.get("Role","")).strip())
        station = str(row.get("Station", "")).strip()
        dept    = str(row.get("Dept",    "")).strip()
        cohort  = str(_row_first(row, ["Cohort"], "")).strip()
        nh_flag = _nh_week_label(row)

        # Parse comments FIRST — needed for course_key override (e.g. PICK_UPT)
        comments: list[str] = []
        raw_comment = str(row.get("Comments", "") or "")
        if raw_comment.lower() not in ("nan", "none", ""):
            for p in raw_comment.split(";"):
                p = p.strip().lstrip("⚠️ ").strip()
                if p and p.lower() not in ("nan", "none"):
                    comments.append(p)

        ck      = compute_course_key(role, station, dept, raw_comment)
        cid     = course_id_from_key(ck)

        # Check applies_to: if course is "ld" only, hide for OPS and vice versa
        applies = course_applies_to(ck)
        dept_upper = dept.upper()
        is_ld = dept_upper in ("L&D", "L AND D", "LND", "LD")
        if applies == "ld" and not is_ld:
            cid = None  # OPS associate, but course is L&D only
        elif applies == "ops" and is_ld:
            cid = None  # L&D associate, but course is OPS only

        coached = login in coached_set
        clbl    = coached_days_label(row.get("Coached", "")) if coached else ""

        rate_raw = row.get("Rate")
        pct_raw  = row.get("% to OP2")
        try:
            rate = float(rate_raw) if pd.notna(rate_raw) else None
        except Exception:
            rate = None
        try:
            pct = float(str(pct_raw).replace("%", "")) if pd.notna(pct_raw) else None
        except Exception:
            pct = None

        # Derive curve from nh_flag (reliable even when Curve column missing from CSV)
        if nh_flag.startswith("VET"):
            _curve = "VETERAN"
        elif nh_flag.startswith("XT"):
            _curve = "XT"
        elif nh_flag.startswith("NH"):
            _curve = "NH"
        else:
            _curve = "VETERAN"  # empty nh_flag = veteran in dashboard_builder

        records.append({
            "login":          login,
            "dept":           dept,
            "cohort":         cohort,
            "nh_flag":        nh_flag,
            "curve":          _curve,
            "home_process":   str(row.get("HomeProcess", "")) or (nh_flag.split("(")[-1].rstrip(")") if "(" in nh_flag else ""),
            "role":           role,
            "station":        station,
            "rate":           rate,
            "pct_op2":        pct,
            "sigma":          int(row.get("Sigma", 0)),
            "mode":           int(row.get("Mode", 0)),
            "is_priority":    int(row.get("Sigma", 0)) >= int(row.get("Mode", 0)) if int(row.get("Mode", 0)) > 0 else False,
            "tenure_wk":      row.get("TenureWk"),
            "comments":       comments,
            "course_key":     ck,
            "course_id":      cid,
            "employee_id":    str(row.get("EmployeeId", "") or "").strip(),
            "has_route":      bool(cid),
            "coached":        coached,
            "coached_label":  clbl,
            "exempt":         bool(row.get("Exempt", False)),
            "photo_url":      badge_photo_url(login),
            "transcript_url": transcript_url(login),
        })

    kpis = {
        "p3":     int((sigma == 3).sum()),
        "p2":     int((sigma == 2).sum()),
        "p1":     int((sigma == 1).sum()),
        "p0":     int((sigma == 0).sum()),
        "total":  len(base),
        "coached": len(coached_set),
        "priority": sum(1 for r in records if r.get("is_priority")),
    }
    roles   = base["Role"].astype(str).str.strip().str.upper().value_counts().to_dict()
    depts   = base["Dept"].astype(str).str.strip().value_counts().to_dict()
    role_p3 = (
        base[sigma == 3]["Role"]
        .astype(str).str.strip().str.upper()
        .value_counts().to_dict()
    )

    # Load WK-1 mode groups for UI display
    mode_groups_data = {}
    try:
        from project_argos.domains.necro_targets import get_necro_targets_wk1, ROLE_TO_MODE_GROUP
        wk1 = get_necro_targets_wk1(fc or DEFAULT_FC)
        mode_groups_data = wk1.get("mode_groups", {})
    except Exception:
        pass

    return {
        "data":    records,
        "kpis":    kpis,
        "roles":   roles,
        "depts":   depts,
        "role_p3": role_p3,
        "mode_groups": mode_groups_data,
    }


@app.get("/api/map-layout")
def api_map_layout(fc: str = DEFAULT_FC):
    """Return floor map layout config for the given FC."""
    _require_admin()
    fp = CONFIG_DIR / "map_layouts.json"
    if not fp.exists():
        return {"floors": []}
    try:
        all_layouts = json.loads(fp.read_text(encoding="utf-8"))
        fc_upper = str(fc or "").strip().upper()
        layout = all_layouts.get(fc_upper) or {"floors": []}
        return layout
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/targets")
def api_targets(fc: str = DEFAULT_FC):
    return {"targets": load_targets(fc)}


@app.get("/api/targets/quality")
def api_targets_quality(fc: str = DEFAULT_FC):
    """Return DPMO quality targets for the given FC."""
    try:
        from project_argos.domains.quality_pipeline import _load_dpmo_targets
        targets = _load_dpmo_targets()
        fc_targets = targets.get(fc.strip().upper(), {})
        # Return structured data for the UI
        result = []
        for error_key, data in fc_targets.items():
            result.append({
                "error_key": error_key,
                "process": data.get("process", ""),
                "curves": data.get("curves", {}),
            })
        return {"fc": fc.strip().upper(), "targets": result}
    except Exception as e:
        return {"fc": fc, "targets": [], "error": str(e)}


@app.get("/api/coaching/history")
def api_coaching_history(fc: str = DEFAULT_FC):
    """Return guided coaching history from local cache (no live fetch)."""
    try:
        data = fetch_guided_coaching_history(fc=fc, force_refresh=False)
        instances = data.get("coachingInstances", [])
        records = []
        for it in instances:
            # Flatten nested fields
            emp = it.get("employee") or {}
            login = (
                emp.get("login") or emp.get("employeeLogin") or
                it.get("login") or it.get("employeeLogin") or ""
            ).strip()
            role = (
                emp.get("role") or it.get("role") or
                it.get("detectedRole") or ""
            ).strip().upper()
            created = it.get("creationTime") or it.get("createdAt") or ""
            date = created[:10] if created else ""
            reason = it.get("coachingReason") or it.get("reason") or ""
            notes  = it.get("notes") or it.get("coachingNotes") or ""
            if isinstance(notes, list):
                notes = "; ".join(str(n) for n in notes)
            records.append({
                "login":  login,
                "role":   role,
                "date":   date,
                "reason": str(reason),
                "notes":  str(notes),
            })
        return {"history": records}
    except Exception as e:
        return {"history": [], "error": str(e)}


@app.get("/api/roboscout/metrics")
def api_roboscout_metrics(fc: str = DEFAULT_FC):
    """Return RoboScout metric thresholds from custom_targets.json."""
    try:
        ct = _load_config("custom_targets.json", {})
        fc_ct = ct.get(fc.upper(), ct)  # FC-specific or top-level fallback
        checks = fc_ct.get("roboscout_checks", [])
        metrics = []
        for check in checks:
            for m in check.get("metrics", []):
                metrics.append({
                    "label":      m.get("label", m.get("column", "")),
                    "roles":      check.get("roles", []),
                    "min_value":  m.get("min_target"),
                    "max_value":  m.get("max_target"),
                    "file":       check.get("file", ""),
                })
        return {"metrics": metrics}
    except Exception as e:
        return {"metrics": [], "error": str(e)}


@app.get("/api/open-file")
def api_open_file(path: str = ""):
    """Open a file in Explorer / default app. Used by pywebview for CSV downloads."""
    from pathlib import Path as _P
    import subprocess
    fp = _P(path)
    if not fp.exists():
        raise HTTPException(status_code=404, detail="File not found")
    # Open containing folder with file selected (Windows)
    subprocess.Popen(["explorer", "/select,", str(fp)], shell=False)
    return {"ok": True, "path": str(fp)}


@app.get("/api/export/csv")
def api_export_csv(fc: str = DEFAULT_FC):
    import io
    df   = load_dashboard()
    base = build_base(df)
    if base.empty:
        raise HTTPException(status_code=404, detail="No data")

    # Sync %Unproductive / %IDLE
    if "%Unproductive" in base.columns and "%IDLE" not in base.columns:
        base["%IDLE"] = base["%Unproductive"]
    elif "%IDLE" in base.columns and "%Unproductive" not in base.columns:
        base["%Unproductive"] = base["%IDLE"]

    cols = [
        c for c in [
            "Dept", "Login", "Station", "Role", "Rate", "% to OP2",
            "Sigma", "TenureWk", "%Unproductive", "H1_OnTarget", "H2_OnTarget", "Comments",
        ]
        if c in base.columns
    ]

    # Save to Documents/Coaching_csv/<filename> so pywebview exe can access it
    docs_dir = Path(os.environ.get("USERPROFILE", Path.home())) / "Documents" / "Coaching_csv"
    docs_dir.mkdir(parents=True, exist_ok=True)
    filename  = f"CoachingHub_{fc}_{datetime.now().strftime('%Y%m%d_%H%M')}.csv"
    out_path  = docs_dir / filename
    base[cols].to_csv(out_path, index=False, encoding="utf-8-sig")

    # Stream it back for browser download AND save to disk
    buf = io.StringIO()
    base[cols].to_csv(buf, index=False, encoding="utf-8-sig")
    buf.seek(0)
    return StreamingResponse(
        iter([buf.getvalue()]),
        media_type="text/csv",
        headers={
            "Content-Disposition": f"attachment; filename={filename}",
            "X-Saved-Path": str(out_path),  # frontend can show the path to user
        },
    )



@app.post("/api/export/csv")
def api_export_csv_post(payload: dict):
    """Export currently visible/filtered rows sent by the frontend."""
    import io
    fc = str(payload.get("fc") or DEFAULT_FC).strip().upper()
    rows = payload.get("rows") or []
    if not isinstance(rows, list) or not rows:
        raise HTTPException(status_code=400, detail="No rows supplied")

    df = pd.DataFrame(rows)
    docs_dir = Path(os.environ.get("USERPROFILE", Path.home())) / "Documents" / "Coaching_csv"
    docs_dir.mkdir(parents=True, exist_ok=True)
    filename = f"CoachingHub_{fc}_{datetime.now().strftime('%Y%m%d_%H%M')}.csv"
    out_path = docs_dir / filename
    df.to_csv(out_path, index=False, encoding="utf-8-sig")

    buf = io.StringIO()
    df.to_csv(buf, index=False, encoding="utf-8-sig")
    buf.seek(0)
    return StreamingResponse(
        iter([buf.getvalue()]),
        media_type="text/csv",
        headers={
            "Content-Disposition": f"attachment; filename={filename}",
            "X-Saved-Path": str(out_path),
        },
    )


# ── Pydantic models ───────────────────────────────────────
class PipelineRequest(BaseModel):
    fc:    str = DEFAULT_FC
    shift: str = ""


class UploadRequest(BaseModel):
    fc:        str
    login:     str
    course_id: str
    notes:     str = ""


class BulkUploadRequest(BaseModel):
    fc:      str
    entries: list[dict]


class QualityRunRequest(BaseModel):
    fc: str = DEFAULT_FC


class QualityMultiRunRequest(BaseModel):
    sites: list[str] = []


class QualityUploadRequest(BaseModel):
    fc: str
    login: str
    course_id: str
    error_type: str = ""
    total_errors_wk: int | float = 0
    sigma: int | float = 0
    notes: str = ""


@app.get("/api/shifts")
def api_shifts(fc: str = DEFAULT_FC):
    """Return available shifts for a given FC with their time ranges."""
    fc = (fc or DEFAULT_FC).strip().upper()
    shifts = _fc_shifts(fc)
    now = datetime.now()
    current = auto_detect_shift(fc, now)
    result = []
    for key, (sh, sm, eh, em) in shifts.items():
        label = f"{SHIFT_DISPLAY.get(key, key.replace('_',' ').title())} — {sh:02d}:{sm:02d} → {eh:02d}:{em:02d}"
        result.append({"key": key, "label": label, "is_current": key == current})
    # Include full datetime range for the current/auto-detected shift
    s, e = compute_shift_range(current, fc, now)
    return {"fc": fc, "shifts": result, "current": current,
            "start_full": s.strftime("%Y-%m-%d %H:%M"), "end_full": e.strftime("%Y-%m-%d %H:%M")}


@app.get("/api/auth/me")
def api_auth_me():
    """
    Returns user info. Phonetool is optional — if it fails, user gets
    basic access without History tab. Never blocks on phonetool errors.
    """
    _admins_path = CONFIG_DIR / "admins.json"
    _admins_cfg = json.loads(_admins_path.read_text(encoding="utf-8")) if _admins_path.exists() else {}
    admin_list = _admins_cfg.get("admins", [])
    super_admins = _admins_cfg.get("super_admin", [])

    login = os.environ.get("USERNAME", "").strip().lower() or "unknown"

    # Phonetool — non-fatal, best-effort
    user_info: dict = {
        "login":         login,
        "job_title":     "",
        "job_level":     None,
        "building_code": "",
    }
    phonetool_error: str = ""
    try:
        def _fetch():
            return get_phonetool_user()
        user_info = with_com_init(_fetch)
    except Exception as e:
        phonetool_error = str(e)
        log.info("Phonetool unavailable (non-fatal): {e}")

    # Permissions based on what we know
    perms = resolve_permissions(user_info.get("job_level"), is_member=True)
    if phonetool_error:
        perms["phonetool_error"] = phonetool_error

    # Admin info — uses hardcoded list (not editable from deployed folder)
    is_admin = _is_admin(login)
    is_super_admin = login in [a.lower() for a in super_admins]
    admin_info = {
        "is_admin": is_admin,
        "is_super_admin": is_super_admin,
        "role": "super_admin" if is_super_admin else "admin" if is_admin else "user",
        "multi_site": is_admin,
    }

    return {"ok": True, "user": user_info, "permissions": perms, "admin": admin_info}


@app.post("/api/pipeline/run")
def api_run_pipeline(req: PipelineRequest):
    # ── Site permission check ──────────────────────────────────
    fc_upper = str(req.fc or "").strip().upper()
    if fc_upper not in ALLOWED_SITES:
        raise HTTPException(
            status_code=403,
            detail=(
                "Este site no esta habilitado en esta aplicacion, "
                "por favor comunicarse con el creador Fumanue@"
            ),
        )
    # ──────────────────────────────────────────────────────────
    shift          = req.shift or auto_detect_shift(fc_upper)
    _log_usage(fc_upper, os.environ.get("USERNAME", "unknown"), "Performance")
    start_dt, end_dt = compute_shift_range(shift, fc_upper)
    buf = StringIO()
    try:
        def _inner():
            with contextlib.redirect_stdout(buf), contextlib.redirect_stderr(buf):
                run_pipeline(req.fc, start_dt, end_dt, run_clean=True)
        with_com_init(_inner)
        return {"ok": True, "log": buf.getvalue()}
    except Exception as e:
        buf.write(f"\n❌ {type(e).__name__}: {e}\n")
        return {"ok": False, "log": buf.getvalue(), "error": str(e)}


@app.get("/api/pipeline/stream")
def api_pipeline_stream(fc: str = DEFAULT_FC, shift: str = ""):
    """Server-Sent Events — emite progreso en tiempo real durante el pipeline."""
    import queue, threading, json as _json

    fc_upper = str(fc or "").strip().upper()
    if fc_upper not in ALLOWED_SITES:
        raise HTTPException(status_code=403, detail="Site no habilitado")

    shift = shift or auto_detect_shift(fc_upper)
    _log_usage(fc_upper, os.environ.get("USERNAME", "unknown"), "Performance")
    start_dt, end_dt = compute_shift_range(shift, fc_upper)
    q: queue.Queue = queue.Queue()

    def _send(pct: int, msg: str):
        q.put({"pct": pct, "msg": msg})

    def _worker():
        buf = StringIO()
        try:
            def _inner():
                with contextlib.redirect_stdout(buf), contextlib.redirect_stderr(buf):
                    run_pipeline(fc, start_dt, end_dt, run_clean=True, on_progress=_send)
            with_com_init(_inner)
            q.put({"pct": 100, "msg": "✅ Pipeline completado", "ok": True, "log": buf.getvalue()})
        except Exception as e:
            import traceback as _tb
            full_tb = _tb.format_exc()
            try:
                _lf = paths.cache / f"pipeline_error_{datetime.now().strftime('%Y%m%d_%H%M%S')}_sse.log"
                _lf.write_text(full_tb, encoding="utf-8")
            except Exception as e:
                log.debug("Could not write error log file: %s", e)
            buf.write(f"\n❌ {type(e).__name__}: {e}\n{full_tb}\n")
            q.put({"pct": 100, "msg": f"❌ Error: {e}", "ok": False, "log": buf.getvalue(), "error": str(e)})

    threading.Thread(target=_worker, daemon=True).start()

    def _event_gen():
        while True:
            item = q.get()
            yield f"data: {_json.dumps(item)}\n\n"
            if item.get("pct", 0) >= 100:
                break

    return StreamingResponse(
        _event_gen(),
        media_type="text/event-stream",
        headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"},
    )


@app.post("/api/pipeline/start")
def api_pipeline_start(fc: str = DEFAULT_FC, shift: str = ""):
    """Start pipeline in background, return job_id for polling."""
    import threading

    fc_upper = str(fc or "").strip().upper()
    if fc_upper not in ALLOWED_SITES:
        raise HTTPException(status_code=403, detail="Site no habilitado")

    shift = shift or auto_detect_shift(fc_upper)
    _log_usage(fc_upper, os.environ.get("USERNAME", "unknown"), "Performance")
    start_dt, end_dt = compute_shift_range(shift, fc_upper)
    job_id = _make_job()

    def _worker():
        buf = StringIO()
        try:
            def _progress(pct: int, msg: str):
                _pipeline_jobs[job_id]["pct"] = pct
                _pipeline_jobs[job_id]["msg"] = msg

            def _inner():
                with contextlib.redirect_stdout(buf), contextlib.redirect_stderr(buf):
                    run_pipeline(fc, start_dt, end_dt, run_clean=True, on_progress=_progress)

            with_com_init(_inner)
            _pipeline_jobs[job_id].update({"pct": 100, "msg": "✅ Pipeline completado", "status": "done", "ok": True})
        except Exception as e:
            import traceback as _tb
            full_tb = _tb.format_exc()
            try:
                _lf = paths.cache / f"pipeline_error_{datetime.now().strftime('%Y%m%d_%H%M%S')}_poll.log"
                _lf.write_text(full_tb, encoding="utf-8")
            except Exception:
                pass
            _pipeline_jobs[job_id].update({"pct": 100, "msg": f"❌ Error: {e}", "status": "error", "ok": False, "error": str(e)})

    threading.Thread(target=_worker, daemon=True).start()
    return {"job_id": job_id}


@app.get("/api/pipeline/status/{job_id}")
def api_pipeline_status(job_id: str):
    """Poll pipeline progress by job_id."""
    job = _pipeline_jobs.get(job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    return job


@app.post("/api/coaching/upload")
def api_upload(req: UploadRequest):
    try:
        df = load_dashboard()

        notes = build_coaching_notes(req.login, df)

        def _u():
            GuidedCoachingUploader(debug=True).upload_manual_coaching(
                building_code=req.fc,
                course_id=req.course_id,
                logins=[req.login],
                notes=notes,
            )

        with_com_init(_u)

        return {
            "ok": True,
            "login": req.login,
            "notes": notes,
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/coaching/bulk")
def api_bulk_upload(req: BulkUploadRequest):
    df     = load_dashboard()
    ok_n   = 0
    fail_n = 0
    errors: list[dict] = []

    for item in req.entries:
        login     = str(item.get("login", "")).strip()
        course_id = str(item.get("course_id", "")).strip()

        if not login or not course_id:
            continue

        notes = build_coaching_notes(login, df)

        try:
            def _u(_cid=course_id, _lg=login, _nt=notes):
                GuidedCoachingUploader().upload_manual_coaching(
                    building_code=req.fc,
                    course_id=_cid,
                    logins=[_lg],
                    notes=_nt,
                )

            with_com_init(_u)
            ok_n += 1

        except Exception as e:
            fail_n += 1
            errors.append({"login": login, "error": str(e)})

    return {
        "ok": True,
        "uploaded": ok_n,
        "failed": fail_n,
        "errors": errors,
    }

# ═════════════════════════════════════════════════════════
# BETA FEATURE GATE — Admin-only check
# ═════════════════════════════════════════════════════════
# Admin list comes from config/argos/admins.json (synced from GitHub).
# Only the repo owner (fumanue) can modify who has access.

def _load_admin_list() -> set:
    """Load admin list from admins.json (GitHub-controlled)."""
    _admins_path = CONFIG_DIR / "admins.json"
    if not _admins_path.exists():
        return {"fumanue"}  # fallback if file missing
    try:
        cfg = json.loads(_admins_path.read_text(encoding="utf-8"))
        admins = {a.lower() for a in cfg.get("admins", [])}
        admins.update(a.lower() for a in cfg.get("super_admin", []))
        return admins
    except Exception:
        return {"fumanue"}


def _is_admin(login: str = "") -> bool:
    """Check if login is in the admin list."""
    if not login:
        login = os.environ.get("USERNAME", "").strip().lower()
    return login.lower() in _load_admin_list()


def _require_admin():
    """Raise 403 if current user is not in admin list. Used for beta features."""
    login = os.environ.get("USERNAME", "").strip().lower()
    if login not in _load_admin_list():
        raise HTTPException(status_code=403, detail="Beta feature — admin access required")


# ═════════════════════════════════════════════════════════
# QUALITY COACHING ROUTES (beta — admin only)
# ═════════════════════════════════════════════════════════
@app.get("/api/quality/dashboard")
def api_quality_dashboard(fc: str = DEFAULT_FC, present_only: bool = False, sites: str = ""):
    _require_admin()
    import math

    def _safe_int(v, default=0):
        """Convert to int safely, handling NaN/None."""
        try:
            f = float(v) if v is not None else 0.0
            return int(f) if not math.isnan(f) else default
        except (ValueError, TypeError):
            return default

    # Multi-site support: if sites param provided, load merged data
    site_list = [s.strip().upper() for s in sites.split(",") if s.strip()] if sites else []

    try:
        if site_list:
            df = load_output_multi(site_list, present_only=present_only)
        else:
            df = load_output(present_only=present_only)
        if df.empty:
            return {"data": [], "kpis": {"total": 0, "present": 0, "coached": 0}}

        # Cross-check with Guided Coaching history for this week
        coached_logins: set[str] = set()
        try:
            fc_upper = fc.strip().upper()
            gc_data = with_com_init(
                lambda: fetch_guided_coaching_history(fc=fc_upper, force_refresh=False)
            )
            # If cache was empty/missing, try a live fetch
            if not gc_data.get("coachingInstances"):
                gc_data = with_com_init(
                    lambda: fetch_guided_coaching_history(fc=fc_upper, force_refresh=True)
                )

            # Build set of quality course URLs to match against
            courses_cfg = _load_json("quality_courses.json", {})
            course_base = str(courses_cfg.get("course_base", "")).strip()
            quality_course_urls: set[str] = set()
            for val in (courses_cfg.get("errors") or {}).values():
                # Handle both old format (string) and new format (dict)
                if isinstance(val, dict):
                    uuid = str(val.get("uuid", "")).strip()
                else:
                    uuid = str(val).strip()
                if uuid:
                    quality_course_urls.add(f"{course_base}{uuid}".lower())
                    quality_course_urls.add(uuid.lower())

            # Build employeeID → login mapping from Roster_SCC
            eid_to_login: dict[str, str] = {}
            try:
                roster_fp = OUTPUT_DIR / "Roster_SCC.csv"
                if roster_fp.exists():
                    roster = pd.read_csv(roster_fp, usecols=["EmployeeId", "Login"], dtype=str)
                    for _, rr in roster.iterrows():
                        eid = str(rr.get("EmployeeId", "")).strip()
                        lg = str(rr.get("Login", "")).strip().lower()
                        if eid and lg:
                            eid_to_login[eid] = lg
            except Exception as e:
                log.info("roster eid mapping failed: {e}")

            # Build login → cohort mapping from Roster_SCC.csv (has ALL associates, not just active shift)
            cohort_map: dict[str, str] = {}
            try:
                roster_cohort_fp = OUTPUT_DIR / "Roster_SCC.csv"
                if roster_cohort_fp.exists():
                    roster_cohort_df = pd.read_csv(roster_cohort_fp, usecols=["Login", "Cohort"], dtype=str)
                    for _, dr in roster_cohort_df.iterrows():
                        lg = str(dr.get("Login", "")).strip().lower()
                        co = str(dr.get("Cohort", "")).strip()
                        if lg and co and co.lower() not in ("nan", "none", ""):
                            cohort_map[lg] = co
            except Exception:
                pass

            log.info("GC history for {fc_upper}: {len(gc_data.get('coachingInstances', []))} instances found")
            log.info("eid_to_login entries: {len(eid_to_login)}")

            for it in gc_data.get("coachingInstances", []):
                    # Navigate the real GC structure: instance → coachingInstanceData
                cid = it.get("coachingInstanceData") or it
                coachee = cid.get("coachee") or {}
                employee_id = str(coachee.get("employeeID") or "").strip()

                # Resolve login from employeeID via roster
                login = eid_to_login.get(employee_id, "")
                if not login:
                    # Fallback: try older flat formats
                    emp = it.get("employee") or cid.get("employee") or {}
                    login = (emp.get("login") or emp.get("employeeLogin") or
                             it.get("login") or it.get("employeeLogin") or "").strip().lower()

                # Match by lmsCourseId in coachingReasonDetails
                details = cid.get("coachingReasonDetails") or {}
                lms = details.get("lmsCourseId") or {}
                lms_detail = str(lms.get("detail") or "").strip().lower()
                lms_uuid = lms_detail.rstrip("/").rsplit("/", 1)[-1] if "/" in lms_detail else lms_detail

                if login and (lms_detail in quality_course_urls or lms_uuid in quality_course_urls):
                    coached_logins.add(login)

            log.info("coached_logins ({len(coached_logins)}): {sorted(coached_logins)[:20]}")
        except Exception as e:
            log.info("coached check failed (non-fatal): {e}")

        records = []

        # Load hours-based tenure for quality enrichment
        tenure_lookup = {}
        try:
            tenure_df = load_tenure_data(fc.strip().upper())
            _tenure_loaded = True
        except Exception as e:
            log.info("tenure data failed: {e}")
            tenure_df = None
            _tenure_loaded = False

        for _, row in df.iterrows():
            login_val = str(row.get("Login", "")).strip()
            is_coached = login_val.lower() in coached_logins

            # Resolve course UUID — fallback to config if CSV has empty/nan value
            course_uuid_val = str(row.get("Course UUID", "")).strip()
            course_id_val = str(row.get("Course ID", "")).strip()
            # Treat "nan" as empty
            if not course_uuid_val or course_uuid_val.lower() == "nan":
                try:
                    error_key = normalize_error_key(str(row.get("ErrorKey", "") or row.get("Error Type", "")))
                    course_uuid_val, course_id_val = _course_for_error(error_key)
                except Exception as e:
                    log.debug("Course lookup fallback failed for %s: %s", error_key, e)
            # Clean up nan values
            if course_uuid_val.lower() == "nan":
                course_uuid_val = ""
            if course_id_val.lower() == "nan":
                course_id_val = ""


            # Hours-based tenure info
            tenure_info = {"tenure": 0, "curve": "", "home_process": ""}
            if _tenure_loaded and tenure_df is not None:
                try:
                    process_raw = str(row.get("Process", "")).strip()
                    proc_mapped = map_process(process_raw) if process_raw else ""
                    if proc_mapped:
                        info = get_tenure_for(tenure_df, login_val, proc_mapped)
                        tenure_info = {
                            "tenure": info["tenure"],
                            "curve": info["curve"],
                            "home_process": info.get("home_process", ""),
                        }
                except Exception as e:
                    log.debug("Tenure lookup failed for %s: %s", login_val, e)

            records.append({
                "fc": str(row.get("FC", fc)),
                "login": login_val,
                "cohort": cohort_map.get(login_val.lower(), ""),
                "process": str(row.get("Process", "")),
                "error_type": str(row.get("Error Type", "")),
                "error_key": str(row.get("ErrorKey", "")),
                "total_errors_wk": _safe_int(row.get("Total Errors WK", 0)),
                "opportunities": _safe_int(row.get("Opportunities", 0)),
                "dpmo_target": _safe_int(row.get("DPMO_Target", 0)),
                "target_errors": round(float(row.get("Target_Errors") or 0) if not pd.isna(row.get("Target_Errors")) else 0.0, 1),
                "pct_to_target": round(float(row.get("Pct_to_Target") or 0) if not pd.isna(row.get("Pct_to_Target")) else 0.0, 1),
                "site_avg": float(row.get("Site Avg") or 0) if not pd.isna(row.get("Site Avg")) else 0.0,
                "site_std": float(row.get("Site Std") or 0) if not pd.isna(row.get("Site Std")) else 0.0,
                "sigma": float(row.get("Sigma") or 0) if not pd.isna(row.get("Sigma")) else 0.0,
                "mode": str(row.get("Mode", "")),
                "sigma_threshold": float(row.get("Sigma Threshold") or 0) if not pd.isna(row.get("Sigma Threshold")) else 0.0,
                "threshold": float(row.get("Threshold") or 0) if not pd.isna(row.get("Threshold")) else 0.0,
                "present": str(row.get("Present", "")).lower() in ("true", "1", "yes"),
                "punch_type": str(row.get("PunchType", "")),
                "coached": is_coached,
                "course_id": course_id_val,
                "course_uuid": course_uuid_val,
                "week_start": str(row.get("Week Start", "")),
                "week_end": str(row.get("Week End", "")),
                "tenure": tenure_info["tenure"],
                "curve": tenure_info["curve"],
                "home_process": tenure_info["home_process"],
            })
        return {
            "data": records,
            "kpis": {
                "total": len(records),
                "present": sum(1 for r in records if r["present"]),
                "coached": sum(1 for r in records if r["coached"]),
            },
        }
    except Exception as e:
        log.error("api_quality_dashboard FAILED: %s", e, exc_info=True)
        return {"data": [], "kpis": {"total": 0, "present": 0, "coached": 0}, "error": str(e)}


@app.post("/api/quality/run")
def api_quality_run(req: QualityRunRequest):
    _require_admin()
    fc_upper = str(req.fc or DEFAULT_FC).strip().upper()
    _log_usage(fc_upper, os.environ.get("USERNAME", "unknown"), "Quality")
    if fc_upper not in ALLOWED_SITES:
        raise HTTPException(status_code=403, detail="Site no habilitado")
    buf = StringIO()
    try:
        def _inner():
            with contextlib.redirect_stdout(buf), contextlib.redirect_stderr(buf):
                run_quality_pipeline(fc_upper, force_download=True)
        with_com_init(_inner)

        # Pre-fetch coaching history so dashboard coached check is ready
        try:
            with_com_init(lambda: fetch_guided_coaching_history(fc=fc_upper, force_refresh=True))
        except Exception as e:
            log.warning("Coached cache refresh failed: %s", e)

        return {"ok": True, "log": buf.getvalue()}
    except Exception as e:
        buf.write(f"\n❌ {type(e).__name__}: {e}\n")
        return {"ok": False, "log": buf.getvalue(), "error": str(e)}


@app.post("/api/quality/run-multi")
def api_quality_run_multi(req: QualityMultiRunRequest):
    """Run quality pipeline for multiple sites (admin only). Merges results."""
    _require_admin()
    login = os.environ.get("USERNAME", "").strip().lower()

    sites = [s.strip().upper() for s in req.sites if s.strip()]
    if not sites:
        raise HTTPException(status_code=400, detail="No sites provided")

    # Filter to allowed sites
    sites = [s for s in sites if s in ALLOWED_SITES]
    if not sites:
        raise HTTPException(status_code=400, detail="No valid sites in request")

    results = {}
    buf = StringIO()
    for fc in sites:
        try:
            site_buf = StringIO()
            def _inner(_fc=fc, _buf=site_buf):
                with contextlib.redirect_stdout(_buf), contextlib.redirect_stderr(_buf):
                    run_quality_pipeline(_fc, force_download=True)
            with_com_init(_inner)
            results[fc] = {"ok": True, "log": site_buf.getvalue()}
            buf.write(f"✓ {fc}: OK\n")
        except Exception as e:
            results[fc] = {"ok": False, "error": str(e)}
            buf.write(f"✗ {fc}: {e}\n")

    # Pre-fetch coaching history for all sites
    for fc in sites:
        try:
            with_com_init(lambda _fc=fc: fetch_guided_coaching_history(fc=_fc, force_refresh=True))
        except Exception:
            pass

    return {"ok": True, "sites": sites, "results": results, "summary": buf.getvalue()}


@app.post("/api/quality/refresh-coached")
def api_quality_refresh_coached(fc: str = DEFAULT_FC):
    """Force-refresh the Guided Coaching history cache for this FC."""
    _require_admin()
    fc_upper = (fc or DEFAULT_FC).strip().upper()
    try:
        gc_data = with_com_init(
            lambda: fetch_guided_coaching_history(fc=fc_upper, force_refresh=True)
        )
        count = len(gc_data.get("coachingInstances", []))
        return {"ok": True, "fc": fc_upper, "instances": count}
    except Exception as e:
        return {"ok": False, "error": str(e)}


# ───────────────────────────────────────────────────────────
# Feedback
# ───────────────────────────────────────────────────────────
_FEEDBACK_CSV = Path(r"\\ant\dept-eu\BCN4\Public\Professor_data\feedback.csv")

class FeedbackRequest(BaseModel):
    fc: str
    login: str
    feedback: str

@app.post("/api/feedback")
def api_feedback(req: FeedbackRequest):
    """Append user feedback to shared CSV (fire-and-forget via daemon thread)."""
    import threading
    fc = req.fc.strip().upper()
    login = req.login.strip()
    feedback = req.feedback.strip().replace('"', "'")
    if not login or not feedback:
        raise HTTPException(status_code=400, detail="login and feedback are required")

    def _write():
        try:
            ts = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            line = f'{ts},{fc},{login},"{feedback}"\n'
            if not _FEEDBACK_CSV.exists():
                _FEEDBACK_CSV.write_text("timestamp,fc,login,feedback\n" + line, encoding="utf-8")
            else:
                with open(_FEEDBACK_CSV, "a", encoding="utf-8") as f:
                    f.write(line)
        except Exception as e:
            log.warning("Feedback write failed: %s", e)
    threading.Thread(target=_write, daemon=True).start()
    return {"ok": True}


@app.post("/api/quality/upload")
def api_quality_upload(req: QualityUploadRequest):
    _require_admin()
    try:
        log.info(f"Quality upload: fc={req.fc} login={req.login} course_id={req.course_id!r} "
                 f"error_type={req.error_type!r} total={req.total_errors_wk} sigma={req.sigma}")

        # GC API expects the full course URL (e.g. https://dub.prod.cms.umbrella.amazon.dev/course/UUID)
        # If only a UUID was passed, build the full URL
        cid = str(req.course_id or "").strip()
        if cid and "/" not in cid:
            cid = f"https://dub.prod.cms.umbrella.amazon.dev/course/{cid}"
        req.course_id = cid

        if not cid:
            raise ValueError("course_id is empty — cannot upload without a valid course UUID")

        notes = str(req.notes or "").strip()
        if not notes:
            notes = (
                f"Quality Coaching | {req.error_type} | "
                f"WK Errors: {req.total_errors_wk} | Sigma: {float(req.sigma):.2f}"
            )
        log.info("fc={req.fc} login={req.login} course_id={req.course_id}")
        log.info("notes={notes}")
        def _u():
            GuidedCoachingUploader(debug=True).upload_manual_coaching(
                building_code=req.fc,
                course_id=req.course_id,
                logins=[req.login],
                notes=notes,
            )
        with_com_init(_u)

        # Refresh coaching history cache so dashboard reflects the new coached status
        try:
            fetch_guided_coaching_history(fc=req.fc.strip().upper(), force_refresh=True)
        except Exception as e:
            log.debug("Post-upload coached refresh failed (non-fatal): %s", e)

        return {"ok": True, "login": req.login, "notes": notes}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ═══════════════════════════════════════════════════════════════
# ADMIN CONFIG ENDPOINTS
# ═══════════════════════════════════════════════════════════════
ADMIN_ALLOWED_FILES = {
    "custom_targets.json", "quality_mode.json", "shift_config.json",
    "quality_courses.json", "guided_coaching.json", "admins.json",
    "fclm_mapping.json",
}


def _check_admin() -> str:
    """Return login if admin, else raise 403."""
    login = os.environ.get("USERNAME", "").strip().lower()
    admins_path = CONFIG_DIR / "admins.json"
    admins_cfg = json.loads(admins_path.read_text(encoding="utf-8")) if admins_path.exists() else {}
    admin_list = [a.lower() for a in admins_cfg.get("admins", [])]
    if login not in admin_list:
        raise HTTPException(status_code=403, detail="Admin access required")
    return login


@app.get("/api/admin/config/{filename}")
def api_admin_config_read(filename: str):
    _check_admin()
    if filename not in ADMIN_ALLOWED_FILES:
        raise HTTPException(status_code=400, detail=f"File not allowed: {filename}")
    fp = CONFIG_DIR / filename
    if not fp.exists():
        return {"ok": True, "data": {}}
    return {"ok": True, "data": json.loads(fp.read_text(encoding="utf-8"))}


@app.post("/api/admin/config/{filename}")
def api_admin_config_write(filename: str, payload: dict):
    _check_admin()
    if filename not in ADMIN_ALLOWED_FILES:
        raise HTTPException(status_code=400, detail=f"File not allowed: {filename}")
    data = payload.get("data")
    if data is None:
        raise HTTPException(status_code=400, detail="Missing 'data' field")
    fp = CONFIG_DIR / filename
    # Backup before overwrite
    if fp.exists():
        bak = fp.with_suffix(".json.bak")
        bak.write_text(fp.read_text(encoding="utf-8"), encoding="utf-8")
    fp.write_text(json.dumps(data, indent=2, ensure_ascii=False), encoding="utf-8")


@app.post("/api/admin/push-config")
def api_admin_push_config():
    """Push all config JSONs to shared network path + git push to Data Central."""
    _check_admin()
    import shutil
    import subprocess

    network_path = Path(r"\\ant\dept-eu\BCN4\Public\Professor_data\config_backup")
    local_fallback = Path(os.environ.get("USERPROFILE", str(Path.home()))) / "Documents" / "Argos_Config_Backup"

    # 1) Copy to network/local backup
    if network_path.exists():
        target = network_path
    else:
        target = local_fallback
    target.mkdir(parents=True, exist_ok=True)

    copied = []
    for fp in CONFIG_DIR.glob("*.json"):
        try:
            shutil.copy2(fp, target / fp.name)
            copied.append(fp.name)
        except Exception as e:
            print(f"[PUSH-CONFIG] Failed to copy {fp.name}: {e}", flush=True)

    # 2) Git push to Data Central (argos-config repo)
    git_exe = r"C:\Users\fumanue\AppData\Local\Programs\Git\cmd\git.exe"
    repo_dir = Path(os.environ.get("USERPROFILE", str(Path.home()))) / "Documents" / "argos-config"
    git_result = {"pushed": False, "message": ""}

    try:
        if Path(git_exe).exists() and repo_dir.exists():
            # Copy configs to repo's configs/ folder
            repo_configs = repo_dir / "configs"
            repo_configs.mkdir(parents=True, exist_ok=True)
            for fp in CONFIG_DIR.glob("*.json"):
                shutil.copy2(fp, repo_configs / fp.name)

            # Git add, commit, push
            env = os.environ.copy()
            env["PATH"] = str(Path(git_exe).parent) + ";" + env.get("PATH", "")
            subprocess.run([git_exe, "add", "."], cwd=str(repo_dir), env=env, check=True, timeout=15)
            commit_result = subprocess.run(
                [git_exe, "commit", "-m", f"Config update from Argos Admin ({len(copied)} files)"],
                cwd=str(repo_dir), env=env, capture_output=True, text=True, timeout=15
            )
            push_result = subprocess.run(
                [git_exe, "push"],
                cwd=str(repo_dir), env=env, capture_output=True, text=True, timeout=30
            )
            git_result = {"pushed": push_result.returncode == 0, "message": push_result.stdout or push_result.stderr}
            print(f"[PUSH-CONFIG] Git push: {'OK' if push_result.returncode == 0 else 'FAILED'} — {push_result.stderr or push_result.stdout}", flush=True)
        else:
            git_result = {"pushed": False, "message": "Git or repo not found"}
    except Exception as e:
        git_result = {"pushed": False, "message": str(e)}
        print(f"[PUSH-CONFIG] Git error: {e}", flush=True)

    return {"ok": True, "target": str(target), "files": copied, "count": len(copied), "git": git_result}


# ═══════════════════════════════════════════════════════════════
# GCA COMPLIANCE (independent pipeline)
# ═══════════════════════════════════════════════════════════════

@app.get("/api/gca/dashboard")
def api_gca_dashboard(fc: str = DEFAULT_FC):
    """Return cached GCA compliance data."""
    _require_admin()
    fc = (fc or DEFAULT_FC).strip().upper()
    data = load_gca_compliance_cache(fc)
    if not data:
        return {"ok": False, "error": "No data. Run the GCA pipeline first."}
    return {"ok": True, **data}


@app.get("/api/gca/pipeline")
def api_gca_pipeline_stream(fc: str = DEFAULT_FC):
    """SSE stream for GCA Compliance pipeline."""
    _require_admin()
    import queue, threading, json as _json

    fc_upper = (fc or DEFAULT_FC).strip().upper()

    q: queue.Queue = queue.Queue()

    def _send(pct: int, msg: str):
        q.put({"pct": pct, "msg": msg})

    def _worker():
        try:
            result = with_com_init(
                lambda: run_gca_compliance_pipeline(fc_upper, on_progress=_send)
            )
            q.put({"pct": 100, "msg": "\u2705 GCA Compliance ready", "ok": True,
                   "kpis": result.get("kpis", {})})
        except Exception as e:
            q.put({"pct": 100, "msg": f"\u274c {e}", "ok": False, "error": str(e)})
        finally:
            q.put(None)

    def _worker_thread():
        _worker()

    threading.Thread(target=_worker_thread, daemon=True).start()

    def _gen():
        while True:
            item = q.get()
            if item is None:
                break
            yield f"data: {_json.dumps(item)}\n\n"

    from starlette.responses import StreamingResponse
    return StreamingResponse(_gen(), media_type="text/event-stream")
