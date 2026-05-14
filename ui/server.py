from __future__ import annotations

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

from project_hermes.config import get_paths
from project_hermes.core.logger import get_logger
from project_hermes.domains.guided_coaching_history import fetch_guided_coaching_history
from project_hermes.domains.necro_targets import get_necro_targets
from project_hermes.domains.quality_pipeline import (
    load_output, _load_json,
    _course_for_error, normalize_error_key,
    run as run_quality_pipeline,
)
from project_hermes.domains.tenure_hours import load_tenure_data, get_tenure_for, map_process
from project_hermes.domains.guided_coaching_uploader import GuidedCoachingUploader
from project_hermes.services.pipeline import run_pipeline
from project_hermes.domains.auth_phonetool import get_phonetool_user, resolve_permissions, ALLOWED_SITES

# ─────────────────────────────────────────────────────────
# App
# ─────────────────────────────────────────────────────────
app = FastAPI(title="Coaching Hub API", version="1.0.0")
log = get_logger(__name__)

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
CONFIG_DIR    = paths.root / "config" / "hermes"
DEFAULT_FC    = "BCN4"

STATIC_DIR = Path(__file__).parent / "static"
log.info("STATIC_DIR    = {STATIC_DIR}")
log.info("index.html    = {(STATIC_DIR / 'index.html').exists()}")
log.info("app.js        = {(STATIC_DIR / 'app.js').exists()}")
log.info("Dashboard CSV = {DASHBOARD_CSV.exists()}")

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
    uuid = ROLE_TO_COURSE_UUID.get(key)
    return f"{COURSE_BASE}{uuid}" if uuid else None


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
}

def _fc_shifts(fc: str) -> dict:
    return FC_SHIFTS.get((fc or "BCN4").upper(), FC_SHIFTS["BCN4"])

def auto_detect_shift(fc: str = "BCN4", now: datetime | None = None) -> str:
    now = now or datetime.now()
    h, m = now.hour, now.minute
    cur_min = h * 60 + m
    for shift_key, (sh, sm, eh, em) in _fc_shifts(fc).items():
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
        # crosses midnight: if current time is before end, start was yesterday
        cur_min = now.hour * 60 + now.minute
        if cur_min < (eh * 60 + em):
            start = datetime.combine(today - timedelta(days=1), time(sh, sm))
            end_base = datetime.combine(today, end_t)
        else:
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
        "Comments", "H1_OnTarget", "H2_OnTarget", "%IDLE", "Coached",
    ]:
        if col not in df.columns:
            df[col] = None
    df["Sigma"] = pd.to_numeric(df["Sigma"], errors="coerce").fillna(0).astype(int)
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
    Returns ONLY:
      - 'L&D Perfo Coaching'
      - 'Ops Perfo Coaching'
    """
    login_s = str(login or "").strip()

    m = df[df["Login"].astype(str).str.strip() == login_s]
    dept = ""
    if not m.empty and "Dept" in m.columns:
        dept = str(m.iloc[0].get("Dept", "") or "").strip()

    if dept.upper() in ("L&D", "L AND D", "LND", "LD"):
        return "L&D Perfo Coaching"
    else:
        return "Ops Perfo Coaching"
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
    pack_targets = ct.get("pack_line_targets", [])
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

    def _f(role: str, wk: int) -> float:
        try:
            return float(fc_curves.get(role, {}).get(str(wk), 1.0))
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
        r: dict = {
            "role":   role,
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


@app.get("/api/shift")
def api_shift(fc: str = DEFAULT_FC):
    now   = datetime.now()
    fc    = (fc or DEFAULT_FC).strip().upper()
    shift = auto_detect_shift(fc, now)
    s, e  = compute_shift_range(shift, fc, now)
    shifts = _fc_shifts(fc)
    return {
        "current": shift,
        "label":   SHIFT_DISPLAY.get(shift, shift),
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
    Examples: "NH 3", "XT 2 (PACK)", "VET"
    """
    curve = str(_row_first(row, ["Curve", "curve"], "") or "").strip()
    tenure_wk = _row_first(row, ["TenureWk", "Process Tenure Week", "Tenure Week"], None)
    home = str(_row_first(row, ["HomeProcess", "home_process"], "") or "").strip()

    try:
        wk = int(float(str(tenure_wk).strip()))
    except Exception:
        wk = 0

    if curve == "VETERAN":
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
    for _, row in base.iterrows():
        login   = str(row.get("Login",   "")).strip()
        role    = str(row.get("Role",    "")).strip()
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

        records.append({
            "login":          login,
            "dept":           dept,
            "cohort":         cohort,
            "nh_flag":        nh_flag,
            "curve":          str(row.get("Curve", "")),
            "home_process":   str(row.get("HomeProcess", "")),
            "role":           role,
            "station":        station,
            "rate":           rate,
            "pct_op2":        pct,
            "sigma":          int(row.get("Sigma", 0)),
            "tenure_wk":      row.get("TenureWk"),
            "comments":       comments,
            "course_key":     ck,
            "course_id":      cid,
            "has_route":      bool(cid),
            "coached":        coached,
            "coached_label":  clbl,
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
    }
    roles   = base["Role"].astype(str).str.strip().str.upper().value_counts().to_dict()
    depts   = base["Dept"].astype(str).str.strip().value_counts().to_dict()
    role_p3 = (
        base[sigma == 3]["Role"]
        .astype(str).str.strip().str.upper()
        .value_counts().to_dict()
    )

    return {
        "data":    records,
        "kpis":    kpis,
        "roles":   roles,
        "depts":   depts,
        "role_p3": role_p3,
    }


@app.get("/api/targets")
def api_targets(fc: str = DEFAULT_FC):
    return {"targets": load_targets(fc)}


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
        checks = ct.get("roboscout_checks", [])
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
        label = f"{SHIFT_DISPLAY.get(key, key)} — {sh:02d}:{sm:02d} → {eh:02d}:{em:02d}"
        result.append({"key": key, "label": label, "is_current": key == current})
    return {"fc": fc, "shifts": result, "current": current}


@app.get("/api/auth/me")
def api_auth_me():
    """
    Returns user info. Phonetool is optional — if it fails, user gets
    basic access without History tab. Never blocks on phonetool errors.
    """
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

    return {"ok": True, "user": user_info, "permissions": perms}


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
# QUALITY COACHING ROUTES
# ═════════════════════════════════════════════════════════
@app.get("/api/quality/dashboard")
def api_quality_dashboard(fc: str = DEFAULT_FC, present_only: bool = False):
    try:
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
            for uuid in (courses_cfg.get("errors") or {}).values():
                if uuid:
                    quality_course_urls.add(f"{course_base}{uuid}".lower())
                    quality_course_urls.add(str(uuid).lower())  # also match bare UUID

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
                "process": str(row.get("Process", "")),
                "error_type": str(row.get("Error Type", "")),
                "error_key": str(row.get("ErrorKey", "")),
                "total_errors_wk": int(float(row.get("Total Errors WK", 0) or 0)),
                "site_avg": float(row.get("Site Avg", 0) or 0),
                "site_std": float(row.get("Site Std", 0) or 0),
                "sigma": float(row.get("Sigma", 0) or 0),
                "mode": str(row.get("Mode", "")),
                "sigma_threshold": float(row.get("Sigma Threshold", 0) or 0),
                "threshold": float(row.get("Threshold", 0) or 0),
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
        return {"data": [], "kpis": {"total": 0, "present": 0, "coached": 0}, "error": str(e)}


@app.post("/api/quality/run")
def api_quality_run(req: QualityRunRequest):
    fc_upper = str(req.fc or DEFAULT_FC).strip().upper()
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


@app.post("/api/quality/refresh-coached")
def api_quality_refresh_coached(fc: str = DEFAULT_FC):
    """Force-refresh the Guided Coaching history cache for this FC."""
    fc_upper = (fc or DEFAULT_FC).strip().upper()
    try:
        gc_data = with_com_init(
            lambda: fetch_guided_coaching_history(fc=fc_upper, force_refresh=True)
        )
        count = len(gc_data.get("coachingInstances", []))
        return {"ok": True, "fc": fc_upper, "instances": count}
    except Exception as e:
        return {"ok": False, "error": str(e)}


@app.post("/api/quality/upload")
def api_quality_upload(req: QualityUploadRequest):
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
