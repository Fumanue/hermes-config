// ═══ I18N — Language System ═══
const I18N = {
  es: {
    subtitle: "Tu herramienta L&D / Operacional todo-en-uno",
    tab_performance: "Performance", tab_history: "Historial", tab_targets: "Targets", tab_quality: "Calidad",
    lbl_process: "Proceso", lbl_sub: "Sub", lbl_all: "Todos", lbl_fc: "FC",
    lbl_updated: "Actualizado", lbl_live: "Live", lbl_created: "Creado y Desarrollado por", lbl_theme: "Tema", lbl_lang: "Idioma",
    kpi_p3: "Prioridad 3", kpi_p3_sub: "Por debajo de 80%",
    kpi_p2: "Prioridad 2",
    kpi_p1: "Prioridad 1",
    kpi_on_target: "On Target", kpi_on_target_sub: "Por encima de 100%",
    kpi_total: "Total Activos", kpi_total_sub: "Ops + L&D",
    kpi_coached: "Coached", kpi_coached_sub: "Este turno",
    btn_show: "VER", btn_max: "MAX", btn_curve: "Curva",
    lbl_showing: "Mostrando", lbl_of: "de", lbl_associates: "asociados",
    th_associate: "Asociado", th_dept: "Dept", th_cohort: "Cohort", th_role: "Rol",
    th_station: "Estación", th_prio: "Prio", th_rate: "Rate", th_pct_target: "% Target",
    th_notes: "Notas", th_coached: "Coached", th_action: "Acción",
    // Quality
    q_title: "Quality Coaching",
    q_subtitle: "Acumulado semanal Atlas · domingo a ahora · detección sigma por Error Type",
    q_opportunities: "Oportunidades", q_present: "Presentes", q_coached: "Coached", q_pending: "Pendientes",
    btn_present_only: "Solo presentes", btn_hide_coached: "Ocultar coached",
    btn_hide_on_target: "Ocultar on-target", btn_run_pipeline: "▶ Ejecutar Pipeline",
    btn_refresh: "↻ Refresh", btn_sync_gc: "⟳ Sync GC",
    btn_upload_coaching: "↑ Subir Coaching", btn_summary: "📊 Resumen", btn_bulk: "↑↑ Subida masiva", btn_csv: "↓ CSV",
    qth_associate: "Asociado", qth_error: "Tipo Error", qth_errors_wk: "Errores Sem",
    qth_target: "Target", qth_pct_target: "% Target", qth_sigma: "σ Score",
    qth_cohort: "Cohort", qth_tenure: "Tenure", qth_mode: "Modo",
    qth_present: "Presente", qth_coached: "Coached", qth_action: "Acción",
    // History
    hist_title: "Historial de Coaching", hist_sub: "Últimos 7 días · coaching manual de productividad",
    // Targets
    tgt_title: "Targets", tgt_sub: "Targets por role y semana de tenure (W1–W10)",
    // Common
    // FAQ
    tab_faq: "FAQ",
    faq_title: "FAQ & Ayuda", faq_subtitle: "Cómo funciona Project Argos — fórmulas, curvas y lógica de coaching",
    faq_q1: "¿Cómo se calculan los Target Errors?",
    faq_q2: "¿Cómo funcionan las Curvas? (NH / XT / VET)",
    faq_q3: "¿Cómo se determina el Tenure?",
    faq_q4: "Leyenda de Coaching — ¿cuándo aparece alguien?",
    faq_q5: "Descripción de Columnas",
    faq_feedback_title: "💬 Enviar Feedback", faq_feedback_sub: "Reporta problemas, sugiere mejoras o comparte ideas",
    faq_feedback_lbl: "Feedback", faq_feedback_send: "Enviar Feedback", faq_feedback_ok: "✓ Enviado correctamente", faq_feedback_err: "Error al enviar",
    loading: "Cargando…", close: "Cerrar", cancel: "Cancelar",
    pipeline_done: "✓ Pipeline completado", lbl_threshold: "Umbral: asociados por encima del σ configurado aparecen aquí",
  },
  en: {
    subtitle: "Your L&D / Operational One Stop Tool",
    tab_performance: "Performance", tab_history: "History", tab_targets: "Targets", tab_quality: "Quality",
    lbl_process: "Process", lbl_sub: "Sub", lbl_all: "All", lbl_fc: "FC",
    lbl_updated: "Updated", lbl_live: "Live", lbl_created: "Created and Developed by", lbl_theme: "Theme", lbl_lang: "Language",
    kpi_p3: "Priority 3", kpi_p3_sub: "Below 80%",
    kpi_p2: "Priority 2",
    kpi_p1: "Priority 1",
    kpi_on_target: "On Target", kpi_on_target_sub: "Above 100%",
    kpi_total: "Total Active", kpi_total_sub: "Ops + L&D",
    kpi_coached: "Coached", kpi_coached_sub: "This shift",
    btn_show: "SHOW", btn_max: "MAX", btn_curve: "Curve",
    lbl_showing: "Showing", lbl_of: "of", lbl_associates: "associates",
    th_associate: "Associate", th_dept: "Dept", th_cohort: "Cohort", th_role: "Role",
    th_station: "Station", th_prio: "Prio", th_rate: "Rate", th_pct_target: "% Target",
    th_notes: "Notes", th_coached: "Coached", th_action: "Action",
    q_title: "Quality Coaching",
    q_subtitle: "Weekly cumulative Atlas · Sunday to now · sigma detection by Error Type",
    q_opportunities: "Opportunities", q_present: "Present", q_coached: "Coached", q_pending: "Pending",
    btn_present_only: "Present only", btn_hide_coached: "Hide Coached",
    btn_hide_on_target: "Hide On-Target", btn_run_pipeline: "▶ Run Pipeline",
    btn_refresh: "↻ Refresh", btn_sync_gc: "⟳ Sync GC",
    btn_upload_coaching: "↑ Upload Coaching", btn_summary: "📊 Summary", btn_bulk: "↑↑ Bulk Upload", btn_csv: "↓ CSV",
    qth_associate: "Associate", qth_error: "Error Type", qth_errors_wk: "Errors WK",
    qth_target: "Target", qth_pct_target: "% Target", qth_sigma: "σ Score",
    qth_cohort: "Cohort", qth_tenure: "Tenure", qth_mode: "Mode",
    qth_present: "Present", qth_coached: "Coached", qth_action: "Action",
    hist_title: "Coaching History", hist_sub: "Last 7 days · manual productivity coaching",
    tgt_title: "Targets", tgt_sub: "Targets by role and tenure week (W1–W10)",
    // FAQ
    tab_faq: "FAQ",
    faq_title: "FAQ & Help", faq_subtitle: "How Project Argos works — formulas, curves, and coaching logic",
    faq_q1: "How are Target Errors calculated?",
    faq_q2: "How do Curves work? (NH / XT / VET)",
    faq_q3: "How is Tenure determined?",
    faq_q4: "Coaching Legend — when does someone appear?",
    faq_q5: "Column Descriptions",
    faq_feedback_title: "💬 Send Feedback", faq_feedback_sub: "Report issues, suggest features, or share ideas",
    faq_feedback_lbl: "Feedback", faq_feedback_send: "Send Feedback", faq_feedback_ok: "✓ Sent successfully", faq_feedback_err: "Error sending",
    loading: "Loading…", close: "Close", cancel: "Cancel",
    pipeline_done: "✓ Pipeline completed", lbl_threshold: "Threshold: associates above configured σ appear here",
  }
};
let _lang = localStorage.getItem("argos-lang") || "es";
function t(k){ return (I18N[_lang]||I18N.es)[k] || (I18N.es)[k] || k; }

// ═══ THEME TOGGLE ═══
(function(){
  const saved = localStorage.getItem("argos-theme") || "light";
  document.documentElement.setAttribute("data-theme", saved);
  document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("themeToggle");
    const icon = document.getElementById("themeIcon");
    if(!btn) return;
    function apply(t){
      document.documentElement.setAttribute("data-theme", t);
      localStorage.setItem("argos-theme", t);
      if(icon) icon.textContent = t === "dark" ? "🌙" : "☀️";
    }
    apply(saved);
    btn.addEventListener("click", () => {
      const curr = document.documentElement.getAttribute("data-theme");
      apply(curr === "dark" ? "light" : "dark");
    });
  });
})();

/* ============================================================
   Project Argos — app.js v3
   ─ Rate & % to Target in separate columns (no label in cell)
   ─ Tab switching: History / Targets / RoboScout
   ─ History from /api/coaching/history (local JSON cache)
   ─ Targets gradient W1→W10 per FC
   ─ RoboScout tables from /api/roboscout
   ─ Download CSV via /api/export/csv (Login, Role, Station, GCA_Link)
   ─ Upload notes fix: prefills Rate + % + comments
   ─ Bulk: sends 'entries' key; notes auto-built from row data
   ─ FC selector drives all endpoints
   ─ All cells vertically + horizontally centred
   ============================================================ */

const API = "";
let currentFC = localStorage.getItem("Argos_default_fc") || "BCN4";
let currentShift = "";

// ── Process groups ─────────────────────────────────────────
const PROCESS_GROUPS = {
  PACK:    ["SM","SM1","SMMIX","SM2","AFE_PACK","P2R_PACK","SNS1","SNS2","SINGLES","WS_SLAM","WS_VDF"],
  PICK:    ["PICK_AR","P2R_PICK"],
  STOW:    ["STOW","QUANTITY_STOW","QUANTITY_STOYW"],
  RECEIVE: ["DECANT"],
  ICQA:    null,
};

// Process options are fixed groups (order matters for UI)
const PROCESS_GROUP_KEYS = ["PACK","PICK","ICQA","STOW","RECEIVE"];
const ALL_PROCS_COUNT = PROCESS_GROUP_KEYS.length;

function roleMatchesProcess(role, proc){
  const r = String(role||"").toUpperCase();
  // Support multi-select: proc can be a Set of process groups
  if(proc instanceof Set){
    if(proc.size===0) return true; // empty set = ALL
    if(proc.size>=ALL_PROCS_COUNT) return true; // all selected = ALL
    for(const p of proc){
      if(roleMatchesProcess(r, p)) return true;
    }
    return false;
  }
  if(!proc||proc==="ALL") return true;
  if(proc==="ICQA") return r.includes("ICQA");
  const list = PROCESS_GROUPS[proc];
  return list ? list.includes(r) : false;
}

function inferProcess(role){
  const r = String(role||"").toUpperCase();
  if(r.includes("ICQA")) return "ICQA";
  for(const p of ["PACK","PICK","STOW","RECEIVE"]){
    const list = PROCESS_GROUPS[p];
    if(list && list.includes(r)) return p;
  }
  return "OTHER";
}

// ── Utils ──────────────────────────────────────────────────
function esc(s){ return String(s??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"); }
function transcriptUrl(login){ return `https://guided-coaching-dub.corp.amazon.com/#/employee-transcript/${encodeURIComponent(String(login||"").trim())}`; }
function badgePhotoUrl(login){ return `https://badgephotos.amazon.com/?Region=Master&FullsizeImage=Yes&uid=${encodeURIComponent(String(login||"").trim())}`; }
function ts(){ return new Date().toLocaleTimeString("en-GB",{hour:"2-digit",minute:"2-digit",second:"2-digit"}); }
const $=id=>document.getElementById(id);

async function jget(url){
  const r = await fetch(url+(url.includes("?")?"&":"?")+"_t="+Date.now(),{cache:"no-store"});
  if(!r.ok) throw new Error(r.status+" "+r.statusText);
  return r.json();
}
async function jpost(url,body){
  const r = await fetch(url,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(body),cache:"no-store"});
  if(!r.ok) throw new Error(r.status+" "+r.statusText);
  return r.json();
}

function abbrevStation(s){
  if(!s) return "";
  return String(s)
    .replace(/^ws-?/i,"").replace(/PickToRebin/gi,"P2R").replace(/wsPickToRebin/gi,"P2R")
    .replace(/wsAFEPack/gi,"AFE").replace(/wsPack/gi,"PCK").replace(/wsStow/gi,"STW")
    .replace(/wsReceive/gi,"RCV").replace(/_/g,"-");
}

// ── Normalise dashboard rows ───────────────────────────────
function norm(r){
  const login      = String(r.login??r.Login??"").trim();
  const dept       = String(r.dept??r.Dept??"").trim()||"—";
  const cohort     = String(r.cohort??r.Cohort??"").trim();
  let nhFlag       = String(r.nh_flag??r.NH_Flag??"").trim();
  if(["nan","none","null","undefined"].includes(nhFlag.toLowerCase())) nhFlag="";
  const curve      = String(r.curve??r.Curve??"").trim();
  const homeProcess = String(r.home_process??r.HomeProcess??"").trim();
  const tenure_wk  = parseInt(r.tenure_wk??r.TenureWk??0) || 0;
  const role       = String(r.role??r.Role??"").trim().toUpperCase()||"—";
  const stationRaw = String(r.station??r.Station??"").trim();
  let station      = abbrevStation(stationRaw)||stationRaw||"—";

  // Station display rule:
  // If Role is STOW or any PICK* role, show only the last 4 digits of Station.
  // Examples:
  //   PICK_AR  "-k-A-02-2327" -> "2327"
  //   STOW     "-k-A-03-3356" -> "3356"
  const roleUpper = String(role||"").toUpperCase();
  if(roleUpper === "STOW" || roleUpper === "QUANTITY_STOW" || roleUpper.startsWith("PICK") || roleUpper === "P2R_PICK"){
    const m = String(stationRaw||"").match(/(\d{4})(?!.*\d)/);
    if(m && m[1]) station = m[1];
  }
  const sigmaVal   = r.sigma??r.Sigma;
  const sigma      = Number.isFinite(Number(sigmaVal))?Number(sigmaVal):0; // kept only as informational
  const coached    = r.coached===true||r.coached==="true"||r.coached===1;
  const rate       = r.rate!=null?Number(r.rate):NaN;
  const pctRaw     = r.pct_op2??r["% to Target"]??null;
  const pct        = pctRaw==null?NaN:parseFloat(String(pctRaw).replace("%",""));

  // Priority thresholds: P3:<80 | P2:80-90 | P1:90-100 | OK:>=100
  let prio = 0;
  if(Number.isFinite(pct)){
    if(pct < 80)  prio = 3;
    else if(pct < 90)  prio = 2;
    else if(pct < 100) prio = 1;
    else prio = 0;
  }

  // Notes — ONLY the extra comments, NOT rate/pct (those go in their own columns)
  let notes=[];
  if(Array.isArray(r.comments)) notes=r.comments.filter(Boolean).map(String);
  else if(typeof(r.comments??r.Comments)==="string"){
    notes=String(r.comments??r.Comments??"").split(";").map(x=>x.trim()).filter(Boolean);
  }
  // Strip any embedded "Rate: NNN" or "NNN% to Target" lines pipeline may have added
  notes=notes.filter(n=>
    !/^Rate:\s*\d/i.test(n) &&
    !/^\d[\d.]*%?\s*to\s*Target/i.test(n) &&
    !/^(🏷️\s*)?NH\s*(1|2|3|4|1-2|3-4)\b/i.test(n)
  );

  const employee_id   = String(r.employee_id??"").trim();
  const course_id     = String(r.course_id??r.courseId??"").trim();
  const transcript_url= `https://guided-coaching-dub.corp.amazon.com/#/employee-transcript/${encodeURIComponent(login)}`;
  const photo_url     = String(r.photo_url??"").trim()
    ||(login?`https://badgephotos.amazon.com/?Region=Master&FullsizeImage=Yes&uid=${encodeURIComponent(login)}`:"");

  return{login,dept,cohort,nhFlag,curve,homeProcess,tenure_wk,role,station,stationRaw,sigma,prio,coached,notes,rate,pct,course_id,employee_id,transcript_url,photo_url,process:inferProcess(role)};
}

// Build the notes string to upload (rate + pct + comments)
function buildUploadNotes(row){
  const dept = String(row.dept || "").trim().toUpperCase();
  const role = String(row.role || "").trim().toUpperCase();
  const deptPrefix = (dept === "L&D" || dept === "LND" || dept === "LD" || dept === "L AND D") ? "L&D" : "Ops";

  let process = "Perfo";
  if(["SM","SM1","SMMIX","SM2","AFE_PACK","P2R_PACK","SNS1","SNS2"].includes(role)) process = "Pack";
  else if(["PICK_AR","P2R_PICK"].includes(role)) process = "Pick";
  else if(["STOW","QUANTITY_STOW"].includes(role)) process = "Stow";
  else if(role === "DECANT") process = "Receive";
  else if(role.includes("ICQA") || role.includes("SBC")) process = "ICQA";

  const parts = [`${deptPrefix} ${process} Performance`];
  if(row.rate != null && Number.isFinite(row.rate)) parts.push(`Rate ${Math.round(row.rate)}`);
  if(row.pct != null && Number.isFinite(row.pct)) parts.push(`${row.pct.toFixed(1)}% to Target`);

  return parts.join(" | ");
}

// ── State ──────────────────────────────────────────────────
const state={
  all:[],
  prio:new Set(["3","2","1"]),
  hideCoached:false,
  coachedOnly:false,
  q:"",
  // No default sorting. Sorting is applied only after user clicks a header.
  sortKey:"",
  sortAsc:true,
  maxRows:50,
  proc:new Set(),
  sub:new Set(),
  curve:"ALL",
  tenureFilter:"",
};

// ── Modals ─────────────────────────────────────────────────
const openModal =id=>$(id).classList.add("show");
const closeModal=id=>$(id).classList.remove("show");

// ── User auth / Phonetool info ─────────────────────────────
// ── Auth: called FIRST before anything else ──────────────────
function _blockUI(htmlMsg, pending=false){
  let ov = document.getElementById("authBlock");
  if(!ov){ ov = document.createElement("div"); ov.id = "authBlock"; document.body.appendChild(ov); }
  ov.style.cssText = [
    "position:fixed","inset:0","z-index:99999",
    "background:rgba(10,10,20,.96)",
    "display:flex","flex-direction:column",
    "align-items:center","justify-content:center","gap:24px",
    "pointer-events:all",
  ].join(";");
  ov.innerHTML = pending ? `
    <style>@keyframes hSpin{to{transform:rotate(360deg)}}</style>
    <div style="font-size:48px;display:inline-block;animation:hSpin 1.4s linear infinite">⏳</div>
    <div style="font-size:15px;font-weight:600;color:#ccc;font-family:sans-serif;letter-spacing:.5px">
      Verificando acceso…
    </div>
  ` : `
    <div style="font-size:64px">🚫</div>
    <div style="font-size:18px;font-weight:700;color:#fff;text-align:center;
                max-width:520px;line-height:1.7;font-family:sans-serif">
      ${htmlMsg}
    </div>
    <div style="font-size:13px;color:#888;font-family:monospace">Project Argos · BCN4</div>
  `;
}

function _unblockUI(){
  const ov = document.getElementById("authBlock");
  if(ov) ov.remove();
}

function _applyPermissions(perms){
  const allowed = new Set(perms.allowed_tabs || []);
  // Tab map: data-tab value → display name used in allowed_tabs
  const TAB_DISPLAY = {
    "dashboard":  "Dashboard",
    "associates": "Associates",
    "history":    "History",
    "targets":    "Targets",
  };
  document.querySelectorAll(".t-tab[data-tab]").forEach(tab => {
    const display = TAB_DISPLAY[tab.dataset.tab];
    if(display && !allowed.has(display)){
      tab.style.display = "none";
      // If this was the active tab, switch to first allowed
      if(tab.classList.contains("on")){
        const first = document.querySelector(".t-tab[data-tab]:not([style*='none'])");
        if(first) first.click();
      }
    }
  });
}

// Auth cache — only call /api/auth/me once per calendar day
let _authCache = null;

async function loadUserInfo(){
  const dot  = $("userDot");
  const name = $("userName");
  const role = $("userRole");

  dot.className    = "t-user-dot loading";
  name.textContent = "…";
  role.textContent = "Verificando acceso";

  const today = new Date().toISOString().slice(0,10);
  if(_authCache && _authCache.date === today){
    const d = _authCache.data;
    const u = d.user || {};
    name.textContent = (u.login || "—") + "@";
    role.textContent = "";
    dot.className = "t-user-dot";
    if(d.permissions) _applyPermissions(d.permissions);
    _unblockUI();
    return;
  }

  _blockUI("", true);  // spinner while checking

  try{
    const d = await jget(`${API}/api/auth/me`);
    _authCache = { date: today, data: d };
    const u = d.user || {};
    const login = u.login         || "—";
    const title = u.job_title     || "";
    const level = u.job_level != null ? `L${u.job_level}` : "";
    const site  = u.building_code || "";

    name.textContent = login + "@";
    role.textContent = "";
    dot.className    = "t-user-dot";
    $("userPill").title = `${login}${title ? " | "+title : ""}${level ? " "+level : ""}${site ? " | "+site : ""}`;

    // Warn in console if phonetool was unavailable (non-blocking)
    if(d.permissions?.phonetool_error){
      console.warn("[Auth] Phonetool unavailable:", d.permissions.phonetool_error);
    }

    // Apply tab/feature permissions from server
    if(d.permissions) _applyPermissions(d.permissions);

    // Admin badge & multi-site
    if(d.admin && d.admin.is_admin){
      window._isAdmin = true;
      window._isSuperAdmin = d.admin.is_super_admin || false;
      const badge = document.createElement("span");
      badge.className = "admin-badge";
      badge.textContent = d.admin.is_super_admin ? "⚡ SUPER ADMIN" : "★ ADMIN";
      $("userPill")?.appendChild(badge);
      // Show multi-site button in Quality
      if($("btnQualityMulti")) $("btnQualityMulti").style.display = "inline-flex";
      // Show Config tab
      if($("tabConfig")) $("tabConfig").style.display = "";
    }

    _unblockUI();

  }catch(e){
    const raw = e.message || String(e);
    // Parse HTTP status if present (jget throws "401: …" or "403: …")
    const status = parseInt(raw.match(/^(\d{3})/)?.[1] || "0");
    const is401  = status === 401 || raw.includes("No tienes acceso");
    const is403  = status === 403 || raw.includes("habilitado");

    dot.className    = "t-user-dot error";
    name.textContent = "Sin acceso";
    role.textContent = "Contacta a Fumanue@";

    if(is401 || is403){
      // Hard block — explicit permission denial
      _blockUI(
        "No tienes acceso a esta aplicaci&oacute;n.<br>" +
        "Contacta a <b>Fumanue@</b> para solicitar acceso."
      );
    } else {
      // Soft error (network / server issue) — show warning but don't block
      _blockUI(
        "Error al verificar permisos.<br>" +
        "Reinicia la app. Si persiste, contacta a <b>Fumanue@</b>.<br>" +
        `<span style="font-size:12px;color:#aaa">${raw.slice(0,120)}</span>`
      );
    }
  }
}

document.addEventListener("DOMContentLoaded", function() {

document.querySelectorAll("[data-close]").forEach(el=>
  el.addEventListener("click",()=>closeModal(el.dataset.close))
);
document.querySelectorAll(".modal-overlay").forEach(el=>
  el.addEventListener("click",e=>{ if(e.target===el) el.classList.remove("show"); })
);

// ── Tab switching ──────────────────────────────────────────
function switchTab(name){
  document.querySelectorAll(".t-tab").forEach(t=>t.classList.toggle("on",t.dataset.tab===name));
  document.querySelectorAll(".tab-panel").forEach(p=>p.classList.toggle("active",p.id==="panel-"+name));
  if(name==="history") loadHistory();
  if(name==="targets") loadTargets();
  if(name==="quality") loadQuality();
  if(name==="faq") _initFaq();
}
document.querySelectorAll(".t-tab[data-tab]").forEach(tab=>
  tab.addEventListener("click",()=>switchTab(tab.dataset.tab))
);

// ── FC selector ────────────────────────────────────────────
$("fcSelect").addEventListener("change",()=>{
  currentFC=$("fcSelect").value;
  currentShift="";
  $("sbFc").textContent=currentFC;
  $("ul-fc").value=currentFC;
  $("bulk-fc").value=currentFC;
  _updateDefaultFcBtn();
  loadShifts().then(()=>loadDashboard());
});

$("shiftSelect") && $("shiftSelect").addEventListener("change",()=>{
  currentShift=$("shiftSelect").value;
  loadDashboard();
});

function _updateDefaultFcBtn(){
  const btn=$("btnDefaultFc");
  if(!btn) return;
  const saved=localStorage.getItem("Argos_default_fc")||"BCN4";
  btn.title = currentFC===saved ? "FC predeterminado" : "Establecer como predeterminado";
  btn.textContent = currentFC===saved ? "★" : "☆";
}

$("btnDefaultFc") && $("btnDefaultFc").addEventListener("click",()=>{
  localStorage.setItem("Argos_default_fc", currentFC);
  _updateDefaultFcBtn();
  showToast && showToast(`✅ ${currentFC} establecido como FC predeterminado`);
});

async function loadShifts(){
  const sel=$("shiftSelect");
  if(!sel) return;
  try{
    const d=await jget(`${API}/api/shifts?fc=${encodeURIComponent(currentFC)}`);
    sel.innerHTML=`<option value="">Auto-detect</option>`;
    (d.shifts||[]).forEach(s=>{
      const opt=document.createElement("option");
      opt.value=s.key;
      opt.textContent=s.label;
      if(s.is_current && !currentShift) opt.selected=true;
      sel.appendChild(opt);
    });
    if(!currentShift && d.current){ currentShift=""; }
  }catch(e){ console.warn("loadShifts error",e); }
}

// ── Process / Subprocess (checkbox multi-select) ────────────
function msSetOpen(msId, open){
  const root=$(msId);
  if(!root) return;
  // Close all others first
  if(open){
    ["procMs","subMs"].forEach(id=>{
      if(id !== msId){
        const other=$(id);
        if(other) other.classList.remove("open");
        const ob=$(id+"Btn");
        if(ob) ob.setAttribute("aria-expanded","false");
      }
    });
  }
  root.classList.toggle("open", !!open);
  const btn=$(msId+"Btn");
  if(btn) btn.setAttribute("aria-expanded", open ? "true" : "false");
}
function msIsOpen(msId){
  const root=$(msId);
  return root ? root.classList.contains("open") : false;
}
function msCloseAll(){
  ["procMs","subMs"].forEach(id=>msSetOpen(id,false));
}
document.addEventListener("click",(e)=>{
  const t=e.target;
  if(!t.closest("#procMs") && !t.closest("#subMs")) msCloseAll();
});
document.addEventListener("keydown",(e)=>{
  if(e.key==="Escape") msCloseAll();
});

function msLabelFor(msId, selectedSet, allCount){
  const lab=$(msId+"Label");
  if(!lab) return;
  if(!selectedSet || !(selectedSet instanceof Set) || selectedSet.size===0 || selectedSet.size>=allCount){
    lab.textContent="All";
    const btn=$(msId+"Btn");
    if(btn) btn.classList.remove("active");
    return;
  }
  const arr=Array.from(selectedSet).sort();
  if(arr.length<=2) lab.textContent=arr.join(", ");
  else lab.textContent=`${arr.slice(0,2).join(", ")} +${arr.length-2}`;
  const btn=$(msId+"Btn");
  if(btn) btn.classList.add("active");
}

function msRender(msId, options, selectedSet, onChange){
  const panel=$(msId+"Panel");
  if(!panel) return;

  const allCount = options.length;
  const isAll = (!selectedSet || selectedSet.size===0 || selectedSet.size>=allCount);

  const rows = [];
  rows.push(`
    <label class="ms-item">
      <input type="checkbox" data-ms="all" ${isAll ? "checked" : ""}>
      <span>All</span>
    </label>
    <div class="ms-sep"></div>
  `);

  for(const opt of options){
    const checked = isAll ? true : selectedSet.has(opt);
    rows.push(`
      <label class="ms-item">
        <input type="checkbox" data-ms="opt" value="${esc(String(opt))}" ${checked ? "checked" : ""}>
        <span>${esc(String(opt))}</span>
      </label>
    `);
  }

  // Swap node to clear any stale change listeners
  const _fresh = panel.cloneNode(false);
  _fresh.id = panel.id;
  _fresh.className = panel.className;
  _fresh.innerHTML = rows.join("");
  panel.parentNode.replaceChild(_fresh, panel);
  const _p = _fresh;

  _p.addEventListener("change",(e)=>{
    const target = e.target;
    const allBox = _p.querySelector('input[data-ms="all"]');
    const optBoxes = Array.from(_p.querySelectorAll('input[data-ms="opt"]'));
    const allCount2 = optBoxes.length;

    // If user toggles ALL directly
    if(target && target.dataset && target.dataset.ms==="all"){
      if(allBox && allBox.checked){
        // ALL checked → check everything
        optBoxes.forEach(b=>b.checked=true);
        selectedSet = new Set(); // empty = ALL
      }else{
        // ALL unchecked → blank all, user picks manually
        optBoxes.forEach(b=>b.checked=false);
        selectedSet = new Set(["__none__"]); // sentinel: nothing selected
      }
    }else{
      // User toggled an individual option
      // If ALL was checked and user changes any option, switch to "custom"
      if(allBox && allBox.checked){
        allBox.checked = false;
      }
      const checkedVals = optBoxes.filter(b=>b.checked).map(b=>b.value);

      // If everything selected => treat as ALL
      if(checkedVals.length===allCount2){
        optBoxes.forEach(b=>b.checked=true);
        if(allBox) allBox.checked=true;
        selectedSet = new Set(); // ALL
      }else if(checkedVals.length===0){
        // Nothing checked manually — keep blank (not auto-ALL)
        selectedSet = new Set(["__none__"]); // sentinel
      }else{
        selectedSet = new Set(checkedVals);
      }
    }

    onChange(selectedSet);
    msLabelFor(msId, selectedSet, allCount2);
  });

  msLabelFor(msId, selectedSet, allCount);
}

// Process options are fixed groups (defined above)

function buildSubprocessOptions(){
  const procSet = (state.proc instanceof Set) ? state.proc : new Set();
  let roles = new Set();

  if(procSet.size===0 || procSet.size>=ALL_PROCS_COUNT){
    state.all.forEach(r=>{ if(r.role && r.role!=="—") roles.add(r.role); });
  }else{
    for(const p of procSet){
      if(p==="ICQA"){
        state.all.forEach(r=>{ if(String(r.role||"").includes("ICQA")) roles.add(r.role); });
      }else{
        (PROCESS_GROUPS[p]||[]).forEach(v=>roles.add(String(v).toUpperCase()));
      }
    }
  }

  const opts = Array.from(roles).filter(Boolean).sort();
  state._subOptions = opts;

  msRender("subMs", opts, (state.sub instanceof Set)? state.sub : new Set(), (newSet)=>{
    state.sub = newSet; // empty = ALL
    renderAll();
  });
}

function initProcessMs(){
  msRender("procMs", PROCESS_GROUP_KEYS, (state.proc instanceof Set)? state.proc : new Set(), (newSet)=>{
    state.proc = newSet;     // empty = ALL
    state.sub  = new Set();  // reset to ALL
    buildSubprocessOptions();
    renderAll();
  });

  const btn=$("procMsBtn");
  if(btn) btn.onclick=()=>msSetOpen("procMs", !msIsOpen("procMs"));
  const btn2=$("subMsBtn");
  if(btn2) btn2.onclick=()=>msSetOpen("subMs", !msIsOpen("subMs"));
}
// ── KPI ────────────────────────────────────────────────────
function syncKpiActive(){
  document.querySelectorAll("[data-f]").forEach(t=>{
    const f=t.dataset.f;
    const active=
      (f==="coached"&&state.coachedOnly)||
      (f==="all"&&["3","2","1","0"].every(p=>state.prio.has(p))&&!state.coachedOnly)||
      state.prio.has(f);
    t.classList.toggle("active-filter",!!active);
  });
  const labels=["3","2","1","0"].filter(p=>state.prio.has(p)).map(p=>p==="0"?"OK":"P"+p);
  $("sbFilter").textContent=labels.join("+")||"None";
}

function initPriority(){
  document.querySelectorAll("[data-p]").forEach(btn=>{
    btn.addEventListener("click",()=>{
      state.coachedOnly=false;
      const p=btn.dataset.p;
      if(state.prio.has(p)) state.prio.delete(p); else state.prio.add(p);
      renderAll();
    });
  });
  document.querySelectorAll("[data-f]").forEach(tile=>{
    tile.addEventListener("click",()=>{
      const f=tile.dataset.f;
      if(f==="all"){
        state.coachedOnly=false; state.prio=new Set(["3","2","1","0"]);
      }else if(f==="coached"){
        state.coachedOnly=true; state.prio=new Set(["3","2","1","0"]);
        state.hideCoached=false;
        $("toggleCoached").classList.remove("active");
        $("coachToggleIcon").textContent="○";
      }else{
        state.coachedOnly=false;
        if(state.prio.has(f)&&state.prio.size===1) return;
        if(state.prio.has(f)) state.prio.delete(f); else state.prio.add(f);
      }
      renderAll();
    });
  });
}

// ── Filter / Sort ──────────────────────────────────────────
function rowSigmaBucket(sigma){
  if(sigma>=3) return "3";
  if(sigma===2) return "2";
  if(sigma===1) return "1";
  return "0";
}
function prioLabel(sigma){
  if(sigma>=3) return "P3";
  if(sigma===2) return "P2";
  if(sigma===1) return "P1";
  return "OK";
}

function getFiltered(){
  let rows=state.all.slice();
  // Priority filter uses legacy priority ONLY
  rows=rows.filter(r=>state.prio.has(rowSigmaBucket(r.prio)));
  if(state.coachedOnly) rows=rows.filter(r=>r.coached);
  if(state.hideCoached) rows=rows.filter(r=>!r.coached);
  // Curve filter (NH / XT / VETERAN)
  if(state.curve && state.curve !== "ALL"){
    rows = rows.filter(r => String(r.curve||"").toUpperCase() === state.curve.toUpperCase());
  }
  // Tenure level filter
  if(state.tenureFilter){
    const tf = parseInt(state.tenureFilter);
    if(tf > 0) rows = rows.filter(r => parseInt(r.tenure_wk||0) === tf);
  }
  // __none__ sentinel = user blanked the filter → show nothing for that dimension
  if(state.proc instanceof Set && state.proc.has("__none__")){
    rows=[];
  } else {
    rows=rows.filter(r=>roleMatchesProcess(r.role,state.proc));
  }
  if(state.sub instanceof Set && state.sub.has("__none__")){
    rows=[];
  } else if(state.sub instanceof Set && state.sub.size){
    rows=rows.filter(r=>state.sub.has(r.role));
  }
  if(state.q){
    const q=state.q.toLowerCase();
    rows=rows.filter(r=>(r.login+" "+r.role+" "+r.station+" "+r.dept+" "+(r.cohort||"")+" "+(r.nhFlag||"")).toLowerCase().includes(q));
  }
  const k=state.sortKey;
  if(k){
    rows.sort((a,b)=>{
      let va=a[k],vb=b[k];
      if(typeof va==="string"){va=va.toLowerCase();vb=String(vb??"").toLowerCase();}
      const cmp=va<vb?-1:va>vb?1:0;
      return state.sortAsc?cmp:-cmp;
    });
  }
  return{rows:rows.slice(0,state.maxRows),total:rows.length};
}

function badgeCls(sigma){ return sigma>=3?"p3":sigma===2?"p2":sigma===1?"p1":"ok"; }

// ── Render table ───────────────────────────────────────────
function renderTable(){
  const{rows}=getFiltered();
  const tb=$("tbody");
  $("rowCount").textContent =String(rows.length);
  $("totalCount").textContent=String(state.all.length);
  $("sbCount").textContent  =String(rows.length);

  if(!rows.length){
    tb.innerHTML=`<tr><td colspan="11" style="text-align:center;padding:50px;color:#bbb;font-size:13px">No records match current filter</td></tr>`;
    return;
  }

  tb.innerHTML=rows.map(r=>{
    const pr=badgeCls(r.prio);
    const prLbl=prioLabel(r.prio);

    // Rate — just the number, no label (header says "Rate")
    const rateCell=Number.isFinite(r.rate)
      ?`<span class="td-rate">${Math.round(r.rate)}</span>`
      :`<span style="color:#ddd">—</span>`;

    // % to Target — colour coded, no label
    let pctCell=`<span style="color:#ddd">—</span>`;
    if(Number.isFinite(r.pct)){
      const c=r.pct<65?"c-bad":r.pct<90?"c-warn":"c-ok";
      const stroke=r.pct<65?"#c0392b":r.pct<90?"#f59e0b":"#16a34a";
      const pctClamped=Math.min(100,Math.max(0,r.pct));
      const dash=(pctClamped/100)*44; // circumference = 2*PI*7 ≈ 44
      pctCell=`<span class="td-pct ${c}" style="display:inline-flex;align-items:center;gap:4px">
        <svg width="16" height="16" viewBox="0 0 16 16"><circle cx="8" cy="8" r="7" fill="none" stroke="#e5e7eb" stroke-width="2"/><circle cx="8" cy="8" r="7" fill="none" stroke="${stroke}" stroke-width="2" stroke-dasharray="${dash.toFixed(1)} 44" stroke-linecap="round" transform="rotate(-90 8 8)"/></svg>
        ${r.pct.toFixed(1)}%</span>`;
    }

    // Notes — compact professional rows. NH is displayed under Cohort, not here.
    const noteRow = (n) => {
      let raw = String(n ?? "").replace(/\s+/g, " ").trim();
      if (!raw) return "";
      if (/^(🏷️\s*)?NH\s*(1|2|3|4|1-2|3-4)\b/i.test(raw)) return "";

      raw = raw.replace(/^[📊🟣🧩⌛🏷️💤↟⏱️🕑🕒⚠️📦🍀]+\s*/u, "");

      let cls = "note-row note-default";
      let label = "Note";
      let text = raw;

      if (/^(Fast\s*Start)?\s*H[12]\b/i.test(raw)) {
        cls = "note-row note-fast";
        label = "Fast Start";
        text = raw.replace(/^Fast\s*Start\s*/i, "").replace(/^(H[12])\s*[:\-]?\s*/i, "$1 · ");
      } else if (/OOWA|OWAA/i.test(raw)) {
        cls = "note-row note-oowa";
        label = "OOWA";
        text = raw.replace(/^OOWA\s*:?\s*/i, "").replace(/^OWAA\s*:?\s*/i, "");
      } else if (/Mix\s*Share/i.test(raw)) {
        const m = raw.match(/Small\s+(\d+(?:\.\d+)?)%/i);
        const small = m ? Number(m[1]) : NaN;
        cls = Number.isFinite(small) && small < 55 ? "note-row note-mix-risk" : "note-row note-mix-ok";
        label = "Mix Share";
        text = raw.replace(/^Mix\s*Share\s*:?\s*/i, "").trim();
      } else if (/Upsort|Upsorting/i.test(raw)) {
        cls = "note-row note-upsort";
        label = "Upsorting";
        text = raw.replace(/^Upsorting\s*:?\s*/i, "").replace(/^Upsort\s*:?\s*/i, "").trim();
      } else if (/Gap/i.test(raw)) {
        cls = "note-row note-gap";
        label = "GAP";
        text = raw.replace(/^Gap\s*:?\s*/i, "").trim();
      } else if (/Turnaway|Units per|UPA|Tote|Face/i.test(raw)) {
        cls = "note-row note-rs";
        label = "RoboScout";
        text = raw.replace(/^RoboScout\s*:?\s*/i, "").trim();
      } else if (/\bIDLE\b|Idle|Unproductive/i.test(raw)) {
        cls = "note-row note-idle";
        label = "Idle";
        text = raw.replace(/^.*?IDLE\s*:?\s*/i, "").trim();
      } else if (/Bin\s*Filter|Multiple\s*Event|Pick.*Short|Error\s*Indicator|Scan.*Sequence/i.test(raw)) {
        cls = "note-row note-quality";
        label = "Quality";
        const m = raw.match(/^(.+?)\s*:\s*(\d+)/);
        text = m ? `${m[1].trim()} (${m[2]})` : raw;
      }

      // Safety cleanup if an old renderer concatenated label+text.
      text = text
        .replace(/^Fast\s*Start\s*/i, "")
        .replace(/^RoboScout\s*/i, "")
        .replace(/^Mix\s*Share\s*/i, "")
        .replace(/^Upsorting\s*/i, "")
        .replace(/^GAP\s*/i, "")
        .trim();

      if (!text) text = raw;
      return `<div class="${cls}" title="${esc(raw)}"><span class="note-dot"></span><span class="note-label">${esc(label)}</span><span class="note-text">${esc(text)}</span></div>`;
    };

    const noteItems = (r.notes || []).map(noteRow).filter(Boolean).join("");
    const notesHtml = noteItems
      ? `<div class="notes-pro">${noteItems}</div>`
      : `<span class="notes-empty">—</span>`;

    const photoHtml=r.photo_url
      ?`<img src="${esc(r.photo_url)}" alt="${esc(r.login)}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">`
      :"";

    return`<tr class="${r.coached?"coached-row":""}">
      <td class="td-assoc">
        <div class="photo-wrap">
          <div class="photo-cell">
            ${photoHtml}
            <div class="no-photo" style="${r.photo_url?"display:none":""}">?</div>
          </div>
          <div class="ident">
            <a class="login-link" href="${esc(r.transcript_url)}" target="_blank" rel="noopener">${esc(r.login||"—")}</a>
            <a class="fclm-link" href="https://fclm-portal.amazon.com/employee/timeDetails?warehouseId=${encodeURIComponent(currentFC)}&employeeId=${encodeURIComponent(r.employee_id||"")}" target="_blank" rel="noopener">📋 FCLM</a>
          </div>
        </div>
      </td>
      <td><span class="td-dept">${esc(r.dept)}</span></td>
      <td><span class="td-dept">${esc(r.cohort||"—")}</span>${(()=>{
        if(r.curve==="VETERAN") return '<div class="curve-label curve-vet">VET</div>';
        if(r.curve==="XT") return `<div class="curve-label curve-xt">XT T${r.tenure_wk}${r.homeProcess?' ('+esc(r.homeProcess)+')':''}</div>`;
        if(r.curve==="NH"&&r.tenure_wk) return `<div class="curve-label curve-nh">NH T${r.tenure_wk}</div>`;
        return r.nhFlag?`<div class="curve-label curve-nh">${esc(r.nhFlag)}</div>`:'';
      })()}</td>
      <td><span class="role-badge">${esc(r.role)}</span></td>
      <td title="${esc(r.stationRaw||r.station)}"><span class="td-station">${esc(r.station)}</span></td>
      <td><span class="pr ${pr}">${esc(prLbl)}</span></td>
      <td>${rateCell}</td>
      <td>${pctCell}</td>
      <td class="td-notes">${notesHtml}</td>
      <td>${r.coached?`<span class="coached-chk"><span class="chk-circle">✓</span></span>`:""}</td>
      <td><button class="row-btn" data-upload-login="${esc(r.login)}">↑ Upload</button></td>
    </tr>`;
  }).join("");

  tb.querySelectorAll("[data-hist-login]").forEach(a=>
    a.addEventListener("click",e=>{ e.preventDefault(); openAssocHistory(a.dataset.histLogin); })
  );
  tb.querySelectorAll("[data-upload-login]").forEach(btn=>
    btn.addEventListener("click",()=>openUploadPrefill(btn.dataset.uploadLogin))
  );
}

// ── KPI counts ─────────────────────────────────────────────
function updateKpis(){
  const rows = state.all || [];
  const set = (id, v) => { const el = $(id); if (el) el.textContent = String(v); };

  const normDept = (v) => String(v || "").trim().toUpperCase();
  const isLD = (r) => {
    const d = normDept(r.dept);
    return d === "L&D" || d === "L AND D" || d === "LND" || d === "LD";
  };
  const isOps = (r) => {
    const d = normDept(r.dept);
    return d === "OPS";
  };

  const p3 = rows.filter(r => Number(r.prio) >= 3);
  const p2 = rows.filter(r => Number(r.prio) === 2);
  const p1 = rows.filter(r => Number(r.prio) === 1);
  const p0 = rows.filter(r => Number(r.prio) === 0);

  set("n3", p3.length);
  set("n2", p2.length);
  set("n1", p1.length);
  set("n0", p0.length);
  set("nAll", rows.length);
  set("nCo", rows.filter(r => r.coached).length);

  set("n3ld",  p3.filter(isLD).length);
  set("n3ops", p3.filter(isOps).length);
  set("n2ld",  p2.filter(isLD).length);
  set("n2ops", p2.filter(isOps).length);
  set("n1ld",  p1.filter(isLD).length);
  set("n1ops", p1.filter(isOps).length);
}

function renderAll(){
  ["3","2","1"].forEach(p=>{
    const btn=document.querySelector(`[data-p="${p}"]`);
    if(!btn)return;
    btn.className="pf";
    if(state.prio.has(p)) btn.classList.add(`on-p${p}`);
  });
  document.querySelectorAll("[data-curve]").forEach(btn=>btn.classList.toggle("on", btn.dataset.curve === state.curve));
  syncKpiActive();
  updateKpis();
  buildSubprocessOptions();
  renderTable();
}

// ── Download CSV ───────────────────────────────────────────
$("btnDownloadCSV").addEventListener("click",async()=>{
  const btn = $("btnDownloadCSV");
  btn.disabled = true;
  btn.textContent = "Exporting…";
  try{
    const {rows} = getFiltered();
    if(!rows.length){ _csvToast("⚠️ No hay filas visibles"); return; }
    const payload = rows.map(r=>({
      "Login":    r.login,
      "Role":     r.role,
      "Station":  r.stationRaw||r.station,
      "Dept":     r.dept,
      "Cohort":   r.cohort||"",
      "NH_Flag":  r.nhFlag||"",
      "Rate":     Number.isFinite(r.rate)?String(Math.round(r.rate)):"",
      "% to Target": Number.isFinite(r.pct)?r.pct.toFixed(1):"",
      "Priority": String(r.prio),
      "Coached":  r.coached?"Yes":"",
      "GCA_Link": r.transcript_url||"",
      "Comments": (r.notes||[]).join(" | "),
    }));
    const res = await fetch(`${API}/api/export/csv`,{
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({fc: currentFC, rows: payload}),
    });
    if(!res.ok) throw new Error(`HTTP ${res.status}`);
    const savedPath = res.headers.get("X-Saved-Path");
    // In pywebview, blob downloads don't work. Open the saved file instead.
    if(savedPath){
      try{ window.open(`${API}/api/open-file?path=${encodeURIComponent(savedPath)}`); }catch(_){}
    }
    _csvToast(`✅ CSV guardado (${rows.length} filas):\n${savedPath || "Coaching_csv/"}`);
  } catch(e){
    _csvToast(`❌ Error: ${e.message}`);
  } finally {
    btn.disabled = false;
    btn.textContent = "↓ CSV";
  }
});
function _downloadBlob(blob,name){
  const a=document.createElement("a");
  a.href=URL.createObjectURL(blob);a.download=name;a.click();URL.revokeObjectURL(a.href);
}
function _csvToast(msg){
  let t=document.getElementById("csvToast");
  if(!t){ t=document.createElement("div"); t.id="csvToast";
    t.style.cssText="position:fixed;bottom:24px;left:50%;transform:translateX(-50%);"+
      "background:#1a2235;color:#fff;padding:12px 20px;border-radius:8px;font-size:13px;"+
      "white-space:pre;z-index:9999;box-shadow:0 4px 16px rgba(0,0,0,.4);max-width:480px;text-align:center";
    document.body.appendChild(t);
  }
  t.textContent=msg; t.style.opacity="1";
  clearTimeout(t._to);
  t._to=setTimeout(()=>t.style.opacity="0",5000);
}
function nowStr(){ return new Date().toISOString().slice(0,10); }

// ── Associate history modal ────────────────────────────────
async function openAssocHistory(login){
  $("modalHistoryTitle").textContent=`History · ${login}`;
  $("modalHistoryList").innerHTML=`<div class="hmodal-empty">Loading…</div>`;
  openModal("modalHistory");
  try{
    const d=await jget(`${API}/api/coaching/history?login=${encodeURIComponent(login)}&fc=${encodeURIComponent(currentFC)}`);
    const items=d.history||[];
    if(!items.length){
      $("modalHistoryList").innerHTML=`<div class="hmodal-empty">No coaching records found in the last 7 days.</div>`;
      return;
    }
    $("modalHistoryList").innerHTML=items.map(it=>`<div class="hmodal-item">
      <div class="hmodal-item-date">${esc(fmtDate(it.date))}${it.reason?` · <span style="font-weight:400;color:#aaa">${esc(it.reason)}</span>`:""}</div>
      <div class="hmodal-item-notes">${esc(it.notes||"—")}</div>
    </div>`).join("");
  }catch(e){
    $("modalHistoryList").innerHTML=`<div class="hmodal-empty" style="color:#c0392b">Error: ${esc(e.message)}</div>`;
  }
}

function fmtDate(raw){
  if(!raw) return "—";
  try{ return new Date(raw).toLocaleString("en-GB",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"}); }
  catch{ return String(raw); }
}

// ── History tab ────────────────────────────────────────────
async function loadHistory(){
  const wrap=$("historyWrap");
  wrap.innerHTML=`<div class="history-empty" style="color:#aaa">Loading…</div>`;
  try{
    const d=await jget(`${API}/api/coaching/history?fc=${encodeURIComponent(currentFC)}`);
    const items=d.history||[];
    if(!items.length){
      wrap.innerHTML=`<div class="history-empty">No coaching records found in the last 7 days for ${currentFC}.<br><small style="color:#ccc">Make sure to run the pipeline to generate the cache.</small></div>`;
      return;
    }
    wrap.innerHTML=items.map(it=>{
      const login=it.login||"—";
      const photoUrl=login!=="—"?`https://badgephotos.amazon.com/?Region=Master&FullsizeImage=Yes&uid=${encodeURIComponent(login)}`:"";
      return`<div class="hcard">
        <div class="hcard-photo">
          ${photoUrl?`<img src="${esc(photoUrl)}" alt="${esc(login)}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">`:``}
          <div class="no-photo" style="${photoUrl?"display:none":""}">?</div>
        </div>
        <div class="hcard-body">
          <div class="hcard-top">
            <span class="hcard-login">${esc(login)}</span>
            <span class="hcard-date">${esc(fmtDate(it.date))}</span>
            ${it.role?`<span class="hcard-role">${esc(it.role)}</span>`:""}
            ${it.reason?`<span style="font-size:10.5px;color:#aaa">${esc(it.reason)}</span>`:""}
          </div>
          <div class="hcard-notes">${esc(it.notes||"—")}</div>
        </div>
      </div>`;
    }).join("");
  }catch(e){
    wrap.innerHTML=`<div class="history-empty" style="color:#c0392b">Error: ${esc(e.message)}</div>`;
  }
}
$("btnHistoryRefresh").addEventListener("click",loadHistory);

// ── Targets tab — W1→W10 gradient + RoboScout quality thresholds ───────
function wkGradientStyle(val,base){
  if(val==null||base==null||base===0) return "";
  const ratio=val/base;
  if(ratio<0.60) return "background:#fde8e8;color:#c0392b";
  if(ratio<0.75) return "background:#fdf0e0;color:#92580a";
  if(ratio<0.90) return "background:#fffde8;color:#7a6800";
  if(ratio<1.00) return "background:#f1f8f1;color:#2e7d32";
  if(ratio<1.10) return "background:#e8f5e9;color:#186429";
  return              "background:#c8e6c9;color:#0d5c25";
}

function renderMetricsTable(metrics){
  if(!metrics||!metrics.length) return "";
  let rows=metrics.map(m=>{
    const roleList=(m.roles||[]).join(", ")||"All";
    const minCell=m.min_value!=null
      ?`<span class="metric-val metric-min">\u2265 ${m.min_value}</span>`
      :`<span style="color:var(--text-dim)">\u2014</span>`;
    const maxCell=m.max_value!=null
      ?`<span class="metric-val metric-max">\u2264 ${m.max_value}</span>`
      :`<span style="color:var(--text-dim)">\u2014</span>`;
    return`<tr>
      <td>${esc(m.label||m.metric||"")}</td>
      <td><span style="font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--text-muted)">${esc(roleList)}</span></td>
      <td>${minCell}</td>
      <td>${maxCell}</td>
    </tr>`;
  }).join("");
  return`<div class="tgt-section">
    <div class="tgt-section-header">
      <div class="tgt-section-icon tgt-robo">\ud83e\udd16</div>
      <div><div class="tgt-section-title2">RoboScout \u2014 Quality Thresholds</div><div class="tgt-section-sub">Min/max values per metric for coaching triggers</div></div>
    </div>
    <table class="tgt-table">
      <thead><tr>
        <th style="min-width:180px">Metric</th>
        <th style="min-width:150px">Roles</th>
        <th style="min-width:90px">Min</th>
        <th style="min-width:90px">Max</th>
      </tr></thead>
      <tbody>${rows}</tbody>
    </table>
  </div>`;
}

async function loadTargets(){
  const wrap=$("targetsWrap");
  wrap.innerHTML=`<div class="targets-loading">${t('loading')}</div>`;
  try{
    const [dTargets, dMetrics, dQuality] = await Promise.all([
      jget(`${API}/api/targets?fc=${encodeURIComponent(currentFC)}`),
      jget(`${API}/api/roboscout/metrics?fc=${encodeURIComponent(currentFC)}`).catch(()=>({metrics:[]})),
      jget(`${API}/api/targets/quality?fc=${encodeURIComponent(currentFC)}`).catch(()=>({targets:[]})),
    ]);
    const targets=dTargets.targets||[];
    const metrics=dMetrics.metrics||[];
    const qualityTargets=dQuality.targets||[];
    const metricsHtml=renderMetricsTable(metrics);

    if(!targets.length){
      wrap.innerHTML=metricsHtml||`<div class="targets-loading">No targets for ${currentFC}.</div>`;
      return;
    }
    const weeks=Array.from({length:10},(_,i)=>`w${i+1}`);
    const tableRows=targets.map(t=>{
      const isNecro=(t.source||"").toLowerCase().includes("necro");
      const srcCls=isNecro?"necro":"alps";
      const srcLbl=isNecro?"Necro":"Custom";
      const base=t.base;
      const wkCells=weeks.map((_,i)=>{
        const w=`w${i+1}`;
        const val=t[w];
        const gStyle=wkGradientStyle(val,base);
        return`<td style="${gStyle}">${val!=null?val:"\u2014"}</td>`;
      }).join("");
      return`<tr>
        <td>${esc(t.role||"\u2014")}</td>
        <td class="td-src"><span class="src-badge ${srcCls}">${esc(srcLbl)}</span></td>
        <td style="font-weight:700;font-size:13px">${base!=null?base:"\u2014"}</td>
        ${wkCells}
      </tr>`;
    }).join("");

    wrap.innerHTML=metricsHtml+`<div class="tgt-section">
      <div class="tgt-section-header">
        <div class="tgt-section-icon tgt-perf">\ud83d\udcc8</div>
        <div><div class="tgt-section-title2">Performance Targets \u2014 ${esc(currentFC)}</div><div class="tgt-section-sub">Learning curve by role \u00b7 W1\u2013W10 tenure weeks</div></div>
      </div>
      <table class="tgt-table">
        <thead><tr>
          <th>Role</th><th>Source</th><th>Base (VET)</th>
          ${weeks.map((_,i)=>`<th>W${i+1}</th>`).join("")}
        </tr></thead>
        <tbody>${tableRows}</tbody>
      </table>
      <div class="tgt-legend">
        <b>Gradient vs Base:</b>
        <span class="tgt-legend-pill" style="background:#fde8e8;color:#c0392b"><span class="pill-dot" style="background:#c0392b"></span>&lt;60%</span>
        <span class="tgt-legend-pill" style="background:#fdf0e0;color:#92580a"><span class="pill-dot" style="background:#92580a"></span>60\u201375%</span>
        <span class="tgt-legend-pill" style="background:#fffde8;color:#7a6800"><span class="pill-dot" style="background:#c9b500"></span>75\u201390%</span>
        <span class="tgt-legend-pill" style="background:#f1f8f1;color:#2e7d32"><span class="pill-dot" style="background:#2e7d32"></span>90\u2013100%</span>
        <span class="tgt-legend-pill" style="background:#e8f5e9;color:#186429"><span class="pill-dot" style="background:#186429"></span>100\u2013110%</span>
        <span class="tgt-legend-pill" style="background:#c8e6c9;color:#0d5c25"><span class="pill-dot" style="background:#0d5c25"></span>&gt;110%</span>
      </div>
    </div>
    ${_renderQualityDpmoTargets(qualityTargets)}`;
  }catch(e){
    wrap.innerHTML=`<div class="targets-loading" style="color:var(--red)">Error: ${esc(e.message)}</div>`;
  }
}

function _renderQualityDpmoTargets(targets){
  if(!targets||!targets.length) return "";
  let html = `<div class="tgt-section">
    <div class="tgt-section-header">
      <div class="tgt-section-icon tgt-dpmo">\ud83c\udfaf</div>
      <div><div class="tgt-section-title2">Quality DPMO Targets \u2014 ${esc(currentFC)}</div><div class="tgt-section-sub">Target Errors = (DPMO \u00d7 Volume) / 1,000,000 \u00b7 &lt;100% = needs coaching</div></div>
    </div>`;

  for(const t of targets){
    const errKey = t.error_key||"";
    const process = t.process||"";
    const curves = t.curves||{};
    const curveNames = Object.keys(curves);
    if(!curveNames.length) continue;

    html += `<div class="tgt-dpmo-accordion">
      <div class="tgt-dpmo-header" onclick="this.parentElement.classList.toggle('open')">
        <div><span class="tgt-dpmo-label">${esc(errKey.replace(/_/g,' '))}</span><span class="tgt-dpmo-process">${esc(process)}</span></div>
        <span class="tgt-dpmo-chevron">\u25b8</span>
      </div>
      <div class="tgt-dpmo-body">`;
    html += `<table class="tgt-table"><thead><tr><th>Curve</th><th>Scale</th>`;
    for(let i=1;i<=10;i++) html += `<th>${i}</th>`;
    html += `</tr></thead><tbody>`;

    for(const cName of curveNames){
      const cData = curves[cName]||{};
      if(cData.day && Object.keys(cData.day).length){
        html += `<tr><td>${esc(cName)}</td><td>Day</td>`;
        for(let i=1;i<=10;i++) html += `<td>${cData.day[String(i)]||'\u2014'}</td>`;
        html += `</tr>`;
      }
      if(cData.week && Object.keys(cData.week).length){
        html += `<tr><td>${esc(cName)}</td><td>Week</td>`;
        for(let i=1;i<=10;i++) html += `<td>${cData.week[String(i)]||'\u2014'}</td>`;
        html += `</tr>`;
      }
    }
    html += `</tbody></table></div></div>`;
  }
  html += `</div>`;
  return html;
}
$("btnTargetsRefresh").addEventListener("click",loadTargets);

// ── Quality Coaching state ──────────────────────────────────
let qualityRows = [];
let qualityPresentOnly = false;

function _resetQualityFilters(){
  qFilterProcess.clear();
  qFilterError.clear();
  qFilterCurve.clear();
  qFilterSigma = 0;
  qualityPresentOnly = false;
  qualityHideCoached = false;
  qualityHideOnTarget = true;
  if($("qFilterSigma")) $("qFilterSigma").value = "";
  if($("qualitySearchInput")) $("qualitySearchInput").value = "";
  document.querySelectorAll("#qFilterCurve .q-pill").forEach(p => p.classList.remove("on"));
  if($("qFilterProcessBtn")){ $("qFilterProcessBtn").innerHTML = 'All <span class="q-dd-arrow">\u25be</span>'; $("qFilterProcessBtn").classList.remove("has-filter"); }
  if($("qFilterErrorBtn")){ $("qFilterErrorBtn").innerHTML = 'All <span class="q-dd-arrow">\u25be</span>'; $("qFilterErrorBtn").classList.remove("has-filter"); }
  document.querySelectorAll("#qFilterProcessPanel input, #qFilterErrorPanel input").forEach(c => { c.checked = false; });
  if($("qualityPresentOnly")) $("qualityPresentOnly").classList.remove("active");
  if($("qualityHideCoached")) $("qualityHideCoached").classList.remove("active");
}

let qFilterProcess = new Set();
let qualityHideCoached = false;
let qualityHideOnTarget = true;  // Hide >=100% by default
let qFilterError = new Set();
let qFilterSigma = 0;
let qFilterCurve = new Set();
let qSortKey = "total_errors_wk";
let qSortAsc = false;
let qLastPipelineRun = null;

$("btnQualityRefresh") && $("btnQualityRefresh").addEventListener("click",loadQuality);
$("btnQualitySyncGC") && $("btnQualitySyncGC").addEventListener("click", async ()=>{
  const btn = $("btnQualitySyncGC");
  btn.textContent = "Syncing…";
  btn.disabled = true;
  try{
    const res = await jpost(`${API}/api/quality/refresh-coached?fc=${encodeURIComponent(currentFC)}`);
    btn.textContent = `⟳ Sync GC (${res.instances||0})`;
    await loadQuality();
    setTimeout(()=>{ btn.textContent = "⟳ Sync GC"; btn.disabled = false; }, 3000);
  }catch(e){
    btn.textContent = "⟳ Sync GC";
    btn.disabled = false;
    alert(`Sync GC failed: ${e.message}`);
  }
});
$("btnQualityRun") && $("btnQualityRun").addEventListener("click",runQuality);

// ── Multi-site Quality (admin only) ──────────────────────
$("btnQualityMulti") && $("btnQualityMulti").addEventListener("click",()=>{
  const SITES = ["BCN1","BCN4","MAD7","OVD1","RMU1","SVQ1"];
  // Create inline popover for site selection
  let pop = $("multiSitePopover");
  if(!pop){
    pop = document.createElement("div");
    pop.id = "multiSitePopover";
    pop.className = "q-dropdown-panel";
    pop.style.cssText = "position:absolute;top:100%;right:0;min-width:220px;padding:12px;display:none";
    pop.innerHTML = `
      <div style="font-size:11px;font-weight:900;margin-bottom:8px;color:var(--text-muted);text-transform:uppercase;letter-spacing:.06em">Select Sites</div>
      <div class="multi-site-checks" id="multiSiteChecks">
        ${SITES.map(s => `<label><input type="checkbox" value="${s}" checked> ${s}</label>`).join("")}
      </div>
      <button id="btnMultiRun" class="act-btn act-multi" style="width:100%;margin-top:10px;justify-content:center">⚡ Run Selected</button>
    `;
    $("btnQualityMulti").parentElement.style.position = "relative";
    $("btnQualityMulti").parentElement.appendChild(pop);

    $("btnMultiRun").addEventListener("click", async ()=>{
      const checks = [...pop.querySelectorAll('input[type="checkbox"]:checked')];
      const sites = checks.map(c => c.value);
      if(!sites.length){ alert("Select at least one site"); return; }
      pop.style.display = "none";
      _resetQualityFilters();

      const log = $("qualityLog");
      if(log){
        log.style.display = "block";
        log.innerHTML = `<div style="display:flex;align-items:center;gap:12px;padding:8px 0">
          <div style="flex:1;height:4px;background:#333;border-radius:2px;overflow:hidden">
            <div style="width:100%;height:100%;background:#7c3aed;animation:qProgress 3s ease-in-out infinite"></div>
          </div>
          <span style="font-size:11px;color:#7c3aed;font-weight:700;white-space:nowrap">Running ${sites.length} sites…</span>
        </div>`;
      }
      try{
        const res = await jpost(`${API}/api/quality/run-multi`, {sites});
        if(log){
          log.innerHTML = `<div style="padding:6px 0;font-size:11px;color:#aaa"><span style="color:#186429;font-weight:900">✓</span> Multi-site complete: ${sites.join(", ")}</div>`;
          setTimeout(()=>{ log.style.display="none"; }, 3000);
        }
        // Load merged dashboard
        const d = await jget(`${API}/api/quality/dashboard?sites=${encodeURIComponent(sites.join(","))}`);
        qualityRows = d.data || [];
        renderQuality();
      }catch(e){
        if(log){ log.style.display="block"; log.textContent = `ERROR: ${e.message}`; }
      }
    });
  }
  pop.style.display = pop.style.display==="none"?"block":"none";
});
$("qualityPresentOnly") && $("qualityPresentOnly").addEventListener("click",()=>{qualityPresentOnly=!qualityPresentOnly; $("qualityPresentOnly").classList.toggle("active",qualityPresentOnly); if($("qualityPresentIcon")) $("qualityPresentIcon").textContent=qualityPresentOnly?"●":"○"; renderQuality();});
$("qualityHideCoached") && $("qualityHideCoached").addEventListener("click",()=>{qualityHideCoached=!qualityHideCoached; $("qualityHideCoached").classList.toggle("active",qualityHideCoached); if($("qualityHideCoachedIcon")) $("qualityHideCoachedIcon").textContent=qualityHideCoached?"●":"○"; renderQuality();});
$("qualitySearchInput") && $("qualitySearchInput").addEventListener("input",renderQuality);
// Pill toggle helper for multi-select filters
function _pillToggle(container, stateSet, callback){
  if(!container) return;
  container.addEventListener("click",(e)=>{
    const pill = e.target.closest(".q-pill");
    if(!pill) return;
    const v = pill.dataset.v;
    if(stateSet.has(v)){ stateSet.delete(v); pill.classList.remove("on"); }
    else { stateSet.add(v); pill.classList.add("on"); }
    if(callback) callback();
  });
}
_pillToggle($("qFilterCurve"), qFilterCurve, renderQuality);
$("qFilterSigma") && $("qFilterSigma").addEventListener("input",e=>{qFilterSigma=parseFloat(e.target.value)||0;renderQuality();});

// Generic dropdown multi-select helper
const _allDropdownPanels = [];
function _setupDropdownFilter(btnId, panelId, stateSet, renderFn){
  const btn = $(btnId);
  const panel = $(panelId);
  if(!btn||!panel) return;
  _allDropdownPanels.push(panel);
  btn.addEventListener("click",(e)=>{
    e.stopPropagation();
    const willOpen = panel.style.display==="none";
    _allDropdownPanels.forEach(p => { p.style.display="none"; });
    if(willOpen) panel.style.display="block";
  });
  panel.addEventListener("click",(e)=>{
    const label = e.target.closest("label");
    if(!label) return;
    e.preventDefault();
    e.stopPropagation();
    const cb = label.querySelector('input[type="checkbox"]');
    if(!cb) return;
    const v = cb.value;
    const allCbs = [...panel.querySelectorAll('input[type="checkbox"]:not([value="__ALL__"])')];
    const allCb = panel.querySelector('input[value="__ALL__"]');

    if(v === "__ALL__"){
      // Toggle: if any unselected → select all (no filter); else deselect all (no filter)
      const allChecked = allCbs.every(c => c.checked);
      allCbs.forEach(c => { c.checked = !allChecked; });
      if(allCb) allCb.checked = !allChecked;
      stateSet.clear();
      // If deselected all → no filter. If selected all → also no filter.
    } else {
      cb.checked = !cb.checked;
      if(cb.checked) stateSet.add(v); else stateSet.delete(v);
      if(allCb) allCb.checked = (stateSet.size === 0 || stateSet.size === allCbs.length);
      // If all are checked, clear filter (same as no filter)
      if(stateSet.size === allCbs.length) stateSet.clear();
    }

    // Update button
    if(stateSet.size > 0){
      btn.innerHTML = `${stateSet.size} selected <span class="q-dd-arrow">▾</span>`;
      btn.classList.add("has-filter");
    } else {
      btn.innerHTML = `All <span class="q-dd-arrow">▾</span>`;
      btn.classList.remove("has-filter");
    }
    renderFn();
  });
}
// Single document listener to close all panels
document.addEventListener("click",(e)=>{
  _allDropdownPanels.forEach(p => {
    if(p.style.display!=="none" && !p.contains(e.target) && !p.previousElementSibling?.contains(e.target))
      p.style.display="none";
  });
});
_setupDropdownFilter("qFilterProcessBtn", "qFilterProcessPanel", qFilterProcess, renderQuality);
_setupDropdownFilter("qFilterErrorBtn", "qFilterErrorPanel", qFilterError, renderQuality);
$("btnQualityBulk") && $("btnQualityBulk").addEventListener("click",bulkQualityUpload);
$("btnQualityExport") && $("btnQualityExport").addEventListener("click",exportQualityCSV);
$("qualityHideOnTarget") && $("qualityHideOnTarget").addEventListener("click",()=>{qualityHideOnTarget=!qualityHideOnTarget; $("qualityHideOnTarget").classList.toggle("active",qualityHideOnTarget); if($("qualityHideOnTargetIcon")) $("qualityHideOnTargetIcon").textContent=qualityHideOnTarget?"\u25cf":"\u25cb"; renderQuality();});
$("btnQualitySummary") && $("btnQualitySummary").addEventListener("click",(e)=>{
  e.stopPropagation();
  const pop=$("qualitySummary");
  if(!pop) return;
  pop.style.display = pop.style.display==="none"?"block":"none";
});
document.addEventListener("click",(e)=>{
  const pop=$("qualitySummary");
  if(pop && pop.style.display!=="none" && !pop.contains(e.target) && e.target.id!=="btnQualitySummary") pop.style.display="none";
});
// Quality sorting from table headers
document.addEventListener("click",(e)=>{
  const th = e.target.closest("[data-qsort]");
  if(!th) return;
  const k = th.dataset.qsort;
  if(qSortKey===k) qSortAsc=!qSortAsc;
  else { qSortKey=k; qSortAsc=(k==="login"||k==="error_key"); }
  renderQuality();
});



// ── Dashboard load ─────────────────────────────────────────


function qualityValue(row, names, fallback=""){
  for(const n of names){
    if(row && row[n] !== undefined && row[n] !== null && String(row[n]).trim() !== "") return row[n];
  }
  return fallback;
}

function qualitySigmaClass(v){
  const n = Number(v);
  if(n >= 3) return "p3";
  if(n >= 2) return "p2";
  if(n >= 1) return "p1";
  return "ok";
}

function qualityErrorLabel(row){
  // Prefer text error fields. If the pipeline/CSV sends a numeric support column,
  // fallback to ErrorKey so the UI never shows Error Type = "3".
  const candidates = [
    qualityValue(row,["Error Type","error_type","ErrorType","defectType","Defect Type"],""),
    qualityValue(row,["ErrorKey","error_key","errorKey"],""),
  ];
  for(const raw of candidates){
    const val = String(raw || "").trim();
    if(!val) continue;
    if(!/^\d+(\.\d+)?$/.test(val)){
      return val.replace(/_/g," ").replace(/\b\w/g, c=>c.toUpperCase());
    }
  }
  return "Quality Error";
}

function qualityPresentValue(row){
  const p = qualityValue(row,["present","Present"],"");
  const punch = String(qualityValue(row,["punch_type","PunchType","Punch Type"],"")).toUpperCase();
  return String(p).toLowerCase()==="true" || String(p).toUpperCase()==="YES" || punch==="PUNCH_IN";
}

function renderQuality(){
  const body = $("qualityTbody");
  if(!body) return;

  // Populate error type dropdown checkboxes from data
  const errorList = $("qFilterErrorList");
  if(errorList && qualityRows.length){
    const errors = [...new Set(qualityRows.map(r => qualityValue(r,["ErrorKey","error_key","errorKey"],"")).filter(Boolean))].sort();
    // Only rebuild if the error set actually changed (compare keys)
    const existingKeys = [...errorList.querySelectorAll('input[type="checkbox"]:not([value="__ALL__"])')].map(c=>c.value).sort().join(",");
    const newKeys = errors.join(",");
    if(existingKeys !== newKeys){
      errorList.innerHTML = `<label class="q-dd-all"><input type="checkbox" value="__ALL__"> <b>All</b></label>` +
      errors.map(e => {
        const label = e.replace(/_/g," ").replace(/\b\w/g,c=>c.toUpperCase());
        return `<label><input type="checkbox" value="${esc(e)}" ${qFilterError.has(e)?'checked':''}> ${esc(label)}</label>`;
      }).join("");
    }
  }

  const search = String($("qualitySearchInput")?.value || "").trim().toLowerCase();
  let rows = qualityRows.slice();

  // Filter by process
  if(qFilterProcess.size){
    rows = rows.filter(r => {
      const proc = String(qualityValue(r,["Process","process"],"")).toLowerCase();
      for(const p of qFilterProcess){ if(proc.includes(p.toLowerCase())) return true; }
      return false;
    });
  }
  // Filter by error type
  if(qFilterError.size){
    rows = rows.filter(r => qFilterError.has(qualityValue(r,["ErrorKey","error_key","errorKey"],"")));
  }
  // Filter by minimum sigma
  if(qFilterSigma > 0){
    rows = rows.filter(r => Number(qualityValue(r,["sigma","Sigma"],0)) >= qFilterSigma);
  }
  // Filter by curve (NH/XT/VET)
  if(qFilterCurve.size){
    rows = rows.filter(r => {
      const curve = String(qualityValue(r,["curve","Curve"],"")).toUpperCase();
      return qFilterCurve.has(curve);
    });
  }

  if(qualityPresentOnly){
    rows = rows.filter(qualityPresentValue);
  }
  if(qualityHideCoached){
    rows = rows.filter(r => {
      const v = qualityValue(r,["coached","Coached"],"");
      return !(String(v).toLowerCase()==="true" || String(v).toUpperCase()==="YES");
    });
  }
  if(qualityHideOnTarget){
    rows = rows.filter(r => {
      const pct = parseFloat(qualityValue(r,["pct_to_target","Pct_to_Target"],"0"));
      return isNaN(pct) || pct < 100;
    });
  }
  if(search){
    rows = rows.filter(r => {
      const login = String(qualityValue(r,["login","Login"],"")).toLowerCase();
      const err = String(qualityErrorLabel(r)).toLowerCase();
      return login.includes(search) || err.includes(search) || JSON.stringify(r).toLowerCase().includes(search);
    });
  }

  if($("qualityRowCount")) $("qualityRowCount").textContent = rows.length;

  // Update KPIs based on FILTERED rows
  const total = rows.length;
  const presentCount = rows.filter(qualityPresentValue).length;
  const coachedCount = rows.filter(r => { const v = qualityValue(r,["coached","Coached"],""); return String(v).toLowerCase()==="true" || String(v).toUpperCase()==="YES"; }).length;
  const pendingCount = total - coachedCount;
  const compliancePct = total > 0 ? Math.round((coachedCount / total) * 100) : 0;
  if($("qkTotal")) $("qkTotal").textContent = total;
  if($("qkPresent")) $("qkPresent").textContent = presentCount;
  if($("qkCoached")) $("qkCoached").textContent = coachedCount;
  if($("qkPending")) $("qkPending").textContent = pendingCount;
  if($("qkCompliance")) $("qkCompliance").textContent = `${compliancePct}%`;
  if($("qkFcLabel")) $("qkFcLabel").textContent = currentFC;

  // Sorting
  if(qSortKey){
    rows.sort((a,b)=>{
      let va, vb;
      if(qSortKey==="login"){
        va = String(qualityValue(a,["login","Login"],"")).toLowerCase();
        vb = String(qualityValue(b,["login","Login"],"")).toLowerCase();
      } else if(qSortKey==="fc"){
        va = String(qualityValue(a,["fc","FC"],"")).toLowerCase();
        vb = String(qualityValue(b,["fc","FC"],"")).toLowerCase();
      } else if(qSortKey==="error_key"){
        va = String(qualityValue(a,["ErrorKey","error_key"],"")).toLowerCase();
        vb = String(qualityValue(b,["ErrorKey","error_key"],"")).toLowerCase();
      } else if(qSortKey==="sigma"){
        va = Number(qualityValue(a,["sigma","Sigma"],0));
        vb = Number(qualityValue(b,["sigma","Sigma"],0));
      } else if(qSortKey==="pct_to_target"){
        va = Number(qualityValue(a,["pct_to_target","Pct_to_Target"],0));
        vb = Number(qualityValue(b,["pct_to_target","Pct_to_Target"],0));
      } else {
        va = Number(qualityValue(a,["total_errors_wk","Total Errors WK"],0));
        vb = Number(qualityValue(b,["total_errors_wk","Total Errors WK"],0));
      }
      if(va<vb) return qSortAsc?-1:1;
      if(va>vb) return qSortAsc?1:-1;
      return 0;
    });
  }

  // Render summary table
  _renderQualitySummary(rows);

  if(!rows.length){
    body.innerHTML = `<tr><td colspan="13" style="text-align:center;padding:40px;color:#999">No quality opportunities found.</td></tr>`;
    return;
  }

  body.innerHTML = rows.map(r=>{
    const login = String(qualityValue(r,["login","Login"],"")).trim();
    const fc = String(qualityValue(r,["fc","FC"],"")).trim();
    const errorType = qualityErrorLabel(r);
    const total = qualityValue(r,["total_errors_wk","Total Errors WK","total_errors","Total WK","defectCount"],0);
    const targetErrors = Number(qualityValue(r,["target_errors","Target_Errors"],0));
    const pctTarget = Number(qualityValue(r,["pct_to_target","Pct_to_Target"],0));
    const sigma = Number(qualityValue(r,["sigma","Sigma","sigma_value","Sigma Value"],0));
    const mode = qualityValue(r,["mode","Mode"],"");
    const present = qualityPresentValue(r);
    const coachedRaw = qualityValue(r,["coached","Coached"],"");
    const coached = String(coachedRaw).toLowerCase()==="true" || String(coachedRaw).toUpperCase()==="YES" || (String(coachedRaw).trim()!=="" && String(coachedRaw).toLowerCase()!=="false" && String(coachedRaw).toLowerCase()!=="nan");
    const courseId = qualityValue(r,["course_id","CourseId","Course ID","course_url"],"") || qualityValue(r,["course_uuid","Course UUID","CourseUUID"],"");
    const photo = badgePhotoUrl(login);

    return `<tr class="${coached?'coached-row':''}">
      <td class="td-assoc" style="text-align:left;padding-left:20px">
        <div class="photo-wrap">
          <div class="photo-cell"><img src="${esc(photo)}" onerror="this.style.display='none'" /></div>
          <div class="ident">
            <a class="login-link" href="${esc(transcriptUrl(login))}" target="_blank">${esc(login)}</a>
          </div>
        </div>
      </td>
      <td><span style="font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:700;color:var(--text-muted)">${esc(fc)}</span></td>
      <td style="text-align:left"><span style="font-weight:800;font-size:12px">${esc(errorType)}</span></td>
      <td><span class="td-rate">${esc(total)}</span></td>
      <td><span class="td-rate" style="font-size:11px">${targetErrors>0?targetErrors.toFixed(1):'—'}</span></td>
      <td><span class="pr ${pctTarget>=100?'pct-good':pctTarget>0?'pct-bad':'pct-none'}">${pctTarget>0&&pctTarget<999?pctTarget.toFixed(0)+'%':'—'}</span></td>
      <td><span class="quality-cohort">${esc(qualityValue(r,["cohort","Cohort"],""))}</span></td>
      <td><span class="pr ${qualitySigmaClass(sigma)}">Σ${Number.isFinite(sigma)?sigma.toFixed(1):'0.0'}</span></td>
      <td>${(()=>{
        const curve = qualityValue(r,["curve","Curve"],"");
        const tenure = Number(qualityValue(r,["tenure","Tenure"],0));
        const home = qualityValue(r,["home_process","HomeProcess"],"");
        if(curve==="VETERAN") return '<span class="curve-label curve-vet">VET</span>';
        if(curve==="XT") return `<span class="curve-label curve-xt">XT T${tenure} (${esc(home)})</span>`;
        if(curve==="NH") return `<span class="curve-label curve-nh">NH T${tenure}</span>`;
        return '<span style="color:#ccc">—</span>';
      })()}</td>
      <td><span class="mode-label mode-${mode.toLowerCase()}">${esc(mode)}</span></td>
      <td>${present?'<span class="present-chk">✓</span>':'<span class="present-dash">—</span>'}</td>
      <td>${coached?'<span class="coached-chk"><span class="chk-circle">✓</span></span>':'—'}</td>
      <td><button class="row-btn quality-upload" data-login="${esc(login)}" data-fc="${esc(fc)}" data-course="${esc(courseId)}" data-error="${esc(errorType)}" data-total="${total}" data-sigma="${sigma}" ${coached ? 'disabled style="opacity:.35;cursor:not-allowed"' : !courseId ? 'disabled style="opacity:.5;cursor:not-allowed"' : ''}>${coached?'✓ Done':!courseId?'No Course':'↑ Upload'}</button></td>
    </tr>`;
  }).join("");
}

// ── Quality Summary Table ─────────────────────────────────────────────
function _renderQualitySummary(filteredRows){
  const wrap = $("qualitySummary");
  if(!wrap) return;
  if(!filteredRows.length){ wrap.innerHTML=""; return; }

  // Detect multi-site mode
  const fcs = [...new Set(filteredRows.map(r => String(qualityValue(r,["fc","FC"],"")).trim().toUpperCase()).filter(Boolean))];
  const isMulti = fcs.length > 1;

  // Group by ErrorKey (+ FC if multi) → count, avg sigma, sigma buckets
  const groups = {};
  let maxCount = 0;
  for(const r of filteredRows){
    const ek = qualityValue(r,["ErrorKey","error_key","errorKey"],"UNKNOWN");
    const fc = String(qualityValue(r,["fc","FC"],"")).trim().toUpperCase();
    const sigma = Number(qualityValue(r,["sigma","Sigma","sigma_value"],0));
    const coached = (() => { const v = qualityValue(r,["coached","Coached"],""); return String(v).toLowerCase()==="true" || String(v).toUpperCase()==="YES"; })();
    const key = isMulti ? `${fc}|${ek}` : ek;
    if(!groups[key]) groups[key] = { fc, ek, count:0, coached:0, pending:0, sigmas:[], s1:0, s2:0, s3:0 };
    const g = groups[key];
    g.count++;
    if(coached) g.coached++; else g.pending++;
    g.sigmas.push(sigma);
    if(sigma >= 3) g.s3++;
    else if(sigma >= 2) g.s2++;
    else g.s1++;
    if(g.count > maxCount) maxCount = g.count;
  }

  const keys = Object.keys(groups).sort((a,b) => groups[b].count - groups[a].count);

  // Color map for error types
  const errorColors = {
    "FALSE_PICK_SHORT":"#8b5cf6","MULTIPLE_EVENT":"#2563eb","PICK_ERROR_INDICATOR":"#dc2626",
    "BIN_FILTER_VIOLATIONS":"#ea580c","SHORT":"#d97706","SINGLE_ITEM_MISSING":"#0891b2",
    "AFE1_ITEM_MISSING":"#4f46e5","SCAN_OUT_OF_SEQUENCE":"#059669","OTHER_ITEM_MISSING":"#6b7280"
  };

  let html = `<table class="qs-table">
    <thead><tr>
      ${isMulti?'<th>FC</th>':''}
      <th>Error Type</th>
      <th>Total</th>
      <th>Pending</th>
      <th>Coached</th>
      <th>σ ≥ 3</th>
      <th>σ ≥ 2</th>
      <th>σ < 2</th>
      <th>Avg σ</th>
      <th style="width:100px">Distribution</th>
    </tr></thead><tbody>`;

  for(const ek of keys){
    const g = groups[ek];
    const avgSigma = (g.sigmas.reduce((a,b)=>a+b,0)/g.sigmas.length).toFixed(1);
    const label = (g.ek||ek).replace(/_/g," ").replace(/\b\w/g,c=>c.toUpperCase());
    const color = errorColors[g.ek||ek] || "#6b7280";
    const pct = maxCount > 0 ? Math.round((g.count / maxCount) * 100) : 0;
    html += `<tr>
      ${isMulti?`<td><span style="font-family:'JetBrains Mono',monospace;font-size:10px;font-weight:700">${esc(g.fc)}</span></td>`:''}
      <td><span class="qs-error-dot" style="background:${color}"></span>${esc(label)}</td>
      <td><span class="qs-badge qs-badge-total">${g.count}</span></td>
      <td><span class="qs-badge qs-badge-pending">${g.pending}</span></td>
      <td><span class="qs-badge qs-badge-coached">${g.coached}</span></td>
      <td>${g.s3?`<span class="qs-badge qs-badge-s3">${g.s3}</span>`:'<span style="color:#ddd">—</span>'}</td>
      <td>${g.s2?`<span class="qs-badge qs-badge-s2">${g.s2}</span>`:'<span style="color:#ddd">—</span>'}</td>
      <td>${g.s1?`<span class="qs-badge qs-badge-s1">${g.s1}</span>`:'<span style="color:#ddd">—</span>'}</td>
      <td><span class="qs-avg">${avgSigma}</span></td>
      <td><div class="qs-bar"><div class="qs-bar-fill" style="width:${pct}%;background:${color}"></div></div></td>
    </tr>`;
  }
  html += `</tbody></table>`;
  wrap.innerHTML = html;
}

// ── Quality Bulk Upload ───────────────────────────────────────────────
async function bulkQualityUpload(){
  // Get all visible pending rows (not coached, has courseId)
  const search = String($("qualitySearchInput")?.value || "").trim().toLowerCase();
  let rows = qualityRows.slice();
  if(qFilterProcess.size) rows = rows.filter(r => { const p=String(qualityValue(r,["Process","process"],"")).toLowerCase(); for(const v of qFilterProcess){if(p.includes(v.toLowerCase()))return true;} return false; });
  if(qFilterError.size) rows = rows.filter(r => qFilterError.has(qualityValue(r,["ErrorKey","error_key","errorKey"],"")));
  if(qFilterSigma > 0) rows = rows.filter(r => Number(qualityValue(r,["sigma","Sigma"],0)) >= qFilterSigma);
  if(qFilterCurve.size) rows = rows.filter(r => qFilterCurve.has(String(qualityValue(r,["curve","Curve"],"")).toUpperCase()));
  if(qualityPresentOnly) rows = rows.filter(qualityPresentValue);
  if(search) rows = rows.filter(r => { const l=String(qualityValue(r,["login","Login"],"")).toLowerCase(); const e=String(qualityErrorLabel(r)).toLowerCase(); return l.includes(search)||e.includes(search); });

  // Filter: not coached + has course UUID
  const pending = rows.filter(r => {
    const coached = (() => { const v = qualityValue(r,["coached","Coached"],""); return String(v).toLowerCase()==="true" || String(v).toUpperCase()==="YES"; })();
    const courseId = qualityValue(r,["course_uuid","Course UUID","CourseUUID"],"") || qualityValue(r,["course_id","Course ID"],"");
    return !coached && courseId;
  });

  if(!pending.length){ alert("No pending uploads with valid courses in current view."); return; }
  if(!confirm(`Upload coaching for ${pending.length} associates?\n\nThis will send ${pending.length} uploads to Guided Coaching.`)) return;

  const btn = $("btnQualityBulk");
  if(btn){ btn.disabled=true; btn.textContent=`0/${pending.length}`; }

  // Show progress bar in the log area
  const log = $("qualityLog");
  if(log){
    log.style.display="block";
    log.innerHTML=`<div style="display:flex;align-items:center;gap:10px;padding:6px 0">
      <div style="flex:1;height:4px;background:#e5e7eb;border-radius:2px;overflow:hidden">
        <div id="bulkProgressBar" style="width:0%;height:100%;background:#2563eb;border-radius:2px;transition:width .2s"></div>
      </div>
      <span id="bulkProgressLabel" style="font-size:11px;font-weight:700;color:#2563eb;white-space:nowrap">0/${pending.length}</span>
    </div>`;
  }

  let ok=0, fail=0;
  for(const r of pending){
    const login = String(qualityValue(r,["login","Login"],"")).trim();
    const courseId = qualityValue(r,["course_uuid","Course UUID","CourseUUID"],"") || qualityValue(r,["course_id","Course ID"],"");
    const errorType = qualityErrorLabel(r);
    const totalErrors = Number(qualityValue(r,["total_errors_wk","Total Errors WK"],0));
    const sigma = Number(qualityValue(r,["sigma","Sigma"],0));
    try{
      await jpost(`${API}/api/quality/upload`, {
        fc: currentFC, login, course_id: courseId,
        error_type: errorType, total_errors_wk: totalErrors, sigma,
        notes: `Quality Coaching | ${errorType} | WK Errors: ${totalErrors} | Sigma: ${sigma.toFixed(2)}`
      });
      ok++;
    }catch(e){ fail++; }
    const done = ok+fail;
    if(btn) btn.textContent = `${done}/${pending.length}`;
    const pBar = $("bulkProgressBar");
    const pLbl = $("bulkProgressLabel");
    if(pBar) pBar.style.width = `${Math.round(done/pending.length*100)}%`;
    if(pLbl) pLbl.textContent = `${done}/${pending.length} (${ok}✓ ${fail}✗)`;
  }

  if(btn){ btn.disabled=false; btn.textContent="↑↑ Bulk Upload"; }
  if(log){
    log.innerHTML=`<div style="display:flex;align-items:center;gap:8px;padding:6px 0">
      <span style="color:#186429;font-weight:900">✓</span>
      <span style="font-size:11px;color:#555">Bulk complete: <b style="color:#186429">${ok} uploaded</b>${fail?` · <b style="color:#c0392b">${fail} failed</b>`:''}</span>
    </div>`;
    setTimeout(()=>{ log.style.display="none"; log.innerHTML=""; }, 4000);
  }
  await loadQuality();
}

async function loadQuality(){
  const body = $("qualityTbody");
  if(body) body.innerHTML = `<tr><td colspan="13" style="text-align:center;padding:40px;color:#999">Loading quality data…</td></tr>`;
  try{
    const d = await jget(`${API}/api/quality/dashboard?fc=${encodeURIComponent(currentFC)}`);
    qualityRows = d.data || [];
    renderQuality();
  }catch(e){
    if(body) body.innerHTML = `<tr><td colspan="13" style="text-align:center;padding:40px;color:#c0392b">Error loading quality: ${esc(e.message)}</td></tr>`;
  }
}

async function runQuality(){
  _resetQualityFilters();
  const log = $("qualityLog");
  // Show a clean progress bar instead of raw log
  if(log){
    log.style.display="block";
    log.innerHTML = `<div style="display:flex;align-items:center;gap:12px;padding:8px 0">
      <div style="flex:1;height:4px;background:#333;border-radius:2px;overflow:hidden">
        <div style="width:100%;height:100%;background:#e8711a;animation:qProgress 3s ease-in-out infinite" ></div>
      </div>
      <span style="font-size:11px;color:#e8711a;font-weight:700;white-space:nowrap">Running pipeline…</span>
    </div>`;
  }
  try{
    const res = await jpost(`${API}/api/quality/run`, {fc: currentFC});
    // Hide log on success, only show on error
    if(log){
      if(res.ok){
        log.innerHTML = `<div style="display:flex;align-items:center;gap:8px;padding:6px 0"><span style="color:#186429;font-weight:900">✓</span><span style="font-size:11px;color:#aaa">Pipeline completed successfully</span></div>`;
        setTimeout(()=>{ log.style.display="none"; log.innerHTML=""; }, 2500);
        qLastPipelineRun = new Date();
        _updateQualityStatusbar();
      } else {
        log.style.display="block";
        log.textContent = res.log || res.error || "Unknown error";
      }
    }
    await loadQuality();
  }catch(e){
    if(log){ log.style.display="block"; log.textContent = `ERROR: ${e.message}`; }
  }
}

document.addEventListener("click", async (e)=>{
  const btn = e.target.closest(".quality-upload");
  if(!btn) return;
  const login = btn.dataset.login || "";
  const rowFc = btn.dataset.fc || currentFC;
  const courseId = btn.dataset.course || "";
  const errorType = btn.dataset.error || "";
  const totalErrors = Number(btn.dataset.total || 0);
  const sigma = Number(btn.dataset.sigma || 0);
  if(!login || !courseId) return;
  btn.textContent = "Uploading…";
  btn.disabled = true;
  try{
    await jpost(`${API}/api/quality/upload`, {
      fc: rowFc,
      login,
      course_id: courseId,
      error_type: errorType,
      total_errors_wk: totalErrors,
      sigma: sigma,
      notes: `Quality Coaching | ${errorType} | WK Errors: ${totalErrors} | Sigma: ${sigma.toFixed(2)}`
    });
    btn.textContent = "✓ Uploaded";
    await loadQuality();
  }catch(err){
    btn.disabled = false;
    btn.textContent = "Upload";
    alert(`Quality upload failed: ${err.message}`);
  }
});

// ── Quality: Statusbar with pipeline timestamp ────────────────────────
function _updateQualityStatusbar(){
  const sb = document.querySelector("#panel-quality .statusbar .sb-r");
  if(!sb) return;
  if(qLastPipelineRun){
    const mins = Math.round((Date.now() - qLastPipelineRun.getTime())/60000);
    const label = mins < 1 ? "just now" : mins < 60 ? `${mins}m ago` : `${Math.round(mins/60)}h ago`;
    sb.textContent = `Pipeline ran ${label}`;
  }
}
setInterval(_updateQualityStatusbar, 30000);

// ── Quality: Export filtered view to CSV ──────────────────────────────
async function exportQualityCSV(){
  let rows = qualityRows.slice();
  if(qFilterProcess.size) rows = rows.filter(r => { const p=String(qualityValue(r,["Process","process"],"")).toLowerCase(); for(const v of qFilterProcess){if(p.includes(v.toLowerCase()))return true;} return false; });
  if(qFilterError.size) rows = rows.filter(r => qFilterError.has(qualityValue(r,["ErrorKey","error_key","errorKey"],"")));
  if(qFilterSigma > 0) rows = rows.filter(r => Number(qualityValue(r,["sigma","Sigma"],0)) >= qFilterSigma);
  if(qFilterCurve.size) rows = rows.filter(r => qFilterCurve.has(String(qualityValue(r,["curve","Curve"],"")).toUpperCase()));
  if(qualityPresentOnly) rows = rows.filter(qualityPresentValue);

  if(!rows.length){ alert("No data to export."); return; }

  const payload = rows.map(r=>({
    "Login": qualityValue(r,["login","Login"],""),
    "Error Type": qualityErrorLabel(r),
    "Errors WK": qualityValue(r,["total_errors_wk","Total Errors WK"],0),
    "Sigma": Number(qualityValue(r,["sigma","Sigma"],0)).toFixed(2),
    "Mode": qualityValue(r,["mode","Mode"],""),
    "Present": qualityPresentValue(r)?"YES":"NO",
    "Coached": (()=>{const v=qualityValue(r,["coached","Coached"],"");return String(v).toLowerCase()==="true"?"YES":"NO";})()
  }));

  try{
    const res = await fetch(`${API}/api/export/csv`,{
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({fc: currentFC, rows: payload}),
    });
    if(!res.ok) throw new Error(`HTTP ${res.status}`);
    const savedPath = res.headers.get("X-Saved-Path");
    if(savedPath){
      try{ window.open(`${API}/api/open-file?path=${encodeURIComponent(savedPath)}`); }catch(_){}
    }
    _csvToast(`✅ Quality CSV guardado (${rows.length} filas):\n${savedPath || "Coaching_csv/"}`);
  }catch(e){
    _csvToast(`❌ Error: ${e.message}`);
  }
}

// ── Quality: Click summary row to filter ──────────────────────────────
document.addEventListener("click",(e)=>{
  const td = e.target.closest(".qs-table tbody td:first-child");
  if(!td) return;
  const label = td.textContent.trim();
  const key = label.toUpperCase().replace(/\s+/g,"_");
  const sel = $("qFilterError");
  if(sel){
    for(const opt of sel.options){
      if(opt.value === key){ sel.value=key; qFilterError=key; break; }
    }
  }
  const pop=$("qualitySummary"); if(pop) pop.style.display="none";
  renderQuality();
});

// ── Keyboard Shortcuts ────────────────────────────────────────────────
document.addEventListener("keydown",(e)=>{
  if(e.key==="F5"){
    e.preventDefault();
    const activeTab = document.querySelector(".t-tab.on");
    const tabId = activeTab?.dataset?.tab || "";
    if(tabId==="quality") loadQuality();
    else if(tabId==="dashboard") { if($("btnRefresh")) $("btnRefresh").click(); }
    return;
  }
  if(e.ctrlKey && e.shiftKey && e.key==="Q"){
    e.preventDefault(); runQuality(); return;
  }
  if(e.ctrlKey && e.shiftKey && e.key==="E"){
    e.preventDefault(); exportQualityCSV(); return;
  }
  if(e.ctrlKey && e.shiftKey && e.key==="F"){
    e.preventDefault();
    document.querySelector(".topbar")?.classList.toggle("topbar-hidden");
    return;
  }
});

async function _initApp(){
  const saved=localStorage.getItem("Argos_default_fc")||"BCN4";
  currentFC=saved;
  const sel=$("fcSelect");
  if(sel){ const opt=sel.querySelector(`option[value="${saved}"]`); if(opt) sel.value=saved; }
  const sbFc=$("sbFc"); if(sbFc) sbFc.textContent=currentFC;
  const ulFc=$("ul-fc"); if(ulFc) ulFc.value=currentFC;
  const bkFc=$("bulk-fc"); if(bkFc) bkFc.value=currentFC;
  _updateDefaultFcBtn();
  await loadShifts();
}

async function loadDashboard(){
  $("updatedAt").textContent=ts();
  try{
    const d=await jget(`${API}/api/dashboard?fc=${encodeURIComponent(currentFC)}`);
    state.all=(d.data||[]).map(norm);
    updateKpis();
    buildSubprocessOptions();
    renderAll();
  }catch(e){
    $("tbody").innerHTML=`<tr><td colspan="11" style="text-align:center;padding:50px;color:#c0392b;font-size:12px">Error loading: ${esc(e.message)}</td></tr>`;
  }
}

// ── Upload (single) ────────────────────────────────────────
function openUploadPrefill(login){
  $("ul-result").innerHTML="";
  $("ul-login").value=login||"";
  $("ul-fc").value=currentFC;
  const row=state.all.find(r=>r.login.toLowerCase()===String(login||"").toLowerCase());
  $("ul-course").value=row?.course_id||"";
  // ← KEY FIX: prefill notes with rate + pct + comments (not just raw note lines)
  $("ul-notes").value=row?buildUploadNotes(row):"";
  openModal("modalUpload");
}

$("btnUpload").addEventListener("click",()=>{
  $("ul-result").innerHTML="";
  $("ul-login").value="";$("ul-fc").value=currentFC;
  $("ul-course").value="";$("ul-notes").value="";
  openModal("modalUpload");
});

$("ul-submit").addEventListener("click",async()=>{
  const login=$("ul-login").value.trim();
  const fc   =$("ul-fc").value.trim()||currentFC;
  const notes=$("ul-notes").value.trim();  // includes rate+pct+comments
  let courseId=$("ul-course").value.trim();

  if(!login){$("ul-result").innerHTML=`<div class="upload-result err">Login required</div>`;return;}
  if(!courseId){
    const row=state.all.find(r=>r.login.toLowerCase()===login.toLowerCase());
    if(row?.course_id) courseId=row.course_id;
  }
  if(!courseId){$("ul-result").innerHTML=`<div class="upload-result err">Course ID required — not auto-detected</div>`;return;}

  $("ul-result").innerHTML=`<div class="upload-result" style="color:#888;border-color:#ccc">Uploading…</div>`;
  try{
    const res=await jpost(`${API}/api/coaching/upload`,{fc,login,course_id:courseId,notes});
    if(res.ok){
      $("ul-result").innerHTML=`<div class="upload-result ok">✓ ${esc(login)} uploaded successfully</div>`;
      await loadDashboard();
    }else{
      $("ul-result").innerHTML=`<div class="upload-result err">Error: ${esc(res.error||res.detail||"unknown")}</div>`;
    }
  }catch(e){
    $("ul-result").innerHTML=`<div class="upload-result err">Error: ${esc(e.message)}</div>`;
  }
});

// ── Bulk upload ────────────────────────────────────────────
$("btnBulk").addEventListener("click",()=>{
  const{rows}=getFiltered();
  const notCoached=rows.filter(r=>!r.coached);
  $("bulk-text").value=notCoached.map(r=>{ const n=buildUploadNotes(r); return n?`${r.login},${n}`:r.login; }).join("\n");
  $("bulk-preview-wrap").style.display="none";
  $("bulk-result").innerHTML="";
  $("bulk-fc").value=currentFC;
  openModal("modalBulk");
});

function parseBulkLines(){
  return $("bulk-text").value.split("\n").map(l=>l.trim()).filter(Boolean).map(l=>{
    const idx=l.indexOf(",");
    if(idx===-1) return{login:l.trim(),notes:""};
    return{login:l.slice(0,idx).trim(),notes:l.slice(idx+1).trim()};
  }).filter(x=>x.login);
}
$("bulk-preview-btn").addEventListener("click",()=>{
  const lines=parseBulkLines();
  $("bulk-count").textContent=String(lines.length);
  $("bulk-preview").textContent=lines.map(l=>`${l.login.padEnd(16)} → ${l.notes||"(auto)"}`).join("\n");
  $("bulk-preview-wrap").style.display=lines.length?"block":"none";
});
$("bulk-submit").addEventListener("click",async()=>{
  const lines=parseBulkLines();
  const fc=$("bulk-fc").value.trim()||currentFC;
  const defCourse=$("bulk-course").value.trim();
  const resEl=$("bulk-result");
  if(!lines.length){resEl.innerHTML=`<div class="upload-result err">No valid logins</div>`;return;}

  const entries=lines.map(l=>{
    const row=state.all.find(r=>r.login.toLowerCase()===l.login.toLowerCase());
    // Use provided notes; if empty, build from row data (rate + pct + comments)
    const notes=l.notes||(row?buildUploadNotes(row):"");
    return{login:l.login,fc,course_id:row?.course_id||defCourse||"",notes};
  });
  const missing=entries.filter(e=>!e.course_id).map(e=>e.login);
  if(missing.length){
    resEl.innerHTML=`<div class="upload-result err">Missing Course ID for: ${esc(missing.join(", "))}</div>`;return;
  }
  resEl.innerHTML=`<div class="upload-result" style="color:#888;border-color:#ccc">Uploading ${entries.length} entries…</div>`;
  try{
    // Server accepts 'entries' key (fixed in BulkUploadRequest)
    const r=await jpost(`${API}/api/coaching/bulk`,{fc,entries});
    if(r.ok){
      resEl.innerHTML=`<div class="upload-result ok">✓ Uploaded ${r.uploaded??entries.length}${r.failed?` · ${r.failed} failed`:""}</div>`;
      await loadDashboard();
    }else{
      resEl.innerHTML=`<div class="upload-result err">Error: ${esc(r.error||"unknown")}</div>`;
    }
  }catch(e){
    resEl.innerHTML=`<div class="upload-result err">Error: ${esc(e.message)}</div>`;
  }
});

// ── Pipeline ───────────────────────────────────────────────
$("btnPipeline").addEventListener("click", ()=>{
  const btn = $("btnPipeline");
  const sb = document.querySelector("#panel-dashboard .statusbar .sb-l");
  const origSb = sb ? sb.innerHTML : "";
  btn.disabled = true;
  btn.textContent = "⏳ Running…";
  if(sb) sb.innerHTML = `<span style="display:flex;align-items:center;gap:8px;width:100%">
    <span style="flex:1;height:4px;background:var(--border);border-radius:2px;overflow:hidden">
      <span id="perfPipeBar" style="display:block;width:0%;height:100%;background:var(--accent);transition:width .3s"></span>
    </span>
    <span id="perfPipeMsg" style="font-size:10px;color:var(--accent);font-weight:600;white-space:nowrap">Iniciando…</span>
  </span>`;
  const evtSrc = new EventSource(`${API}/api/pipeline/stream?fc=${encodeURIComponent(currentFC)}&shift=${encodeURIComponent(currentShift)}`);
  evtSrc.onmessage = async (e) => {
    try {
      const d = JSON.parse(e.data);
      const p = Math.min(d.pct || 0, 100);
      const bar = $("perfPipeBar");
      const msg = $("perfPipeMsg");
      if(bar) bar.style.width = p + "%";
      if(msg && d.msg) msg.textContent = d.msg;
      if(p >= 100){
        evtSrc.close();
        btn.disabled = false;
        btn.textContent = t("btn_run_pipeline");
        if(d.ok !== false){
          if(sb) sb.innerHTML = `<span style="color:var(--green);font-weight:700">✓ Pipeline completado</span>`;
          setTimeout(()=>{ if(sb) sb.innerHTML = origSb; }, 3000);
          // Reset performance filters after pipeline
          state.curve = "ALL";
          state.tenureFilter = "";
          if($("searchBox")) $("searchBox").value = "";
          document.querySelectorAll("[data-curve]").forEach(b => b.classList.toggle("on", b.dataset.curve==="ALL"));
          await loadDashboard();
        } else {
          if(sb) sb.innerHTML = `<span style="color:#e53e3e;font-weight:700">❌ Error: ${esc(String(d.error||"pipeline failed"))}</span>`;
          setTimeout(()=>{ if(sb) sb.innerHTML = origSb; }, 8000);
        }
      }
    } catch(err){ console.error("SSE parse error", err); }
  };
  evtSrc.onerror = () => {
    evtSrc.close();
    btn.disabled = false;
    btn.textContent = t("btn_run_pipeline");
    if(sb){ sb.innerHTML = `<span style="color:#e53e3e">❌ Connection error</span>`; setTimeout(()=>{ sb.innerHTML = origSb; }, 5000); }
  };
});

// ── Toolbar ────────────────────────────────────────────────
document.querySelectorAll("[data-curve]").forEach(btn=>{
  btn.addEventListener("click",()=>{
    state.curve = btn.dataset.curve || "ALL";
    renderAll();
  });
});
$("tenureFilter") && $("tenureFilter").addEventListener("change",e=>{
  state.tenureFilter = e.target.value;
  renderAll();
});
$("btnRefresh") && $("btnRefresh").addEventListener("click",loadDashboard);
$("searchInput").addEventListener("input",e=>{ state.q=e.target.value.trim(); renderAll(); });
$("maxInput").addEventListener("input",e=>{
  const v=parseInt(e.target.value,10);
  state.maxRows=Number.isFinite(v)&&v>0?v:50;
  renderAll();
});
$("toggleCoached").addEventListener("click",()=>{
  state.hideCoached=!state.hideCoached;
  $("toggleCoached").classList.toggle("active",state.hideCoached);
  $("coachToggleIcon").textContent=state.hideCoached?"●":"○";
  renderAll();
});
document.querySelectorAll(".main-table thead th[data-k]").forEach(th=>{
  th.addEventListener("click",()=>{
    const k=th.dataset.k;
    if(state.sortKey===k) state.sortAsc=!state.sortAsc;
    else{state.sortKey=k;state.sortAsc=true;}
    renderAll();
  });
});

// ── Init ───────────────────────────────────────────────────
loadUserInfo();
initPriority();
syncKpiActive();
// Default: Process multi-select shows ALL selected (treated as ALL internally)
initProcessMs();

_initApp().then(()=>loadDashboard());;

// ─── Settings Popover ──────────────────────────────────────────
const _spPanel = $("settingsPopover");
const _spBtn = $("btnSettings");
if(_spBtn && _spPanel){
  _spBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    _spPanel.style.display = _spPanel.style.display === "none" ? "block" : "none";
  });
  document.addEventListener("click", (e) => {
    if(_spPanel.style.display !== "none" && !_spPanel.contains(e.target) && e.target !== _spBtn)
      _spPanel.style.display = "none";
  });

  // Theme buttons
  const _themeLight = $("spThemeLight"), _themeDark = $("spThemeDark");
  function _syncThemeButtons(){
    const cur = document.documentElement.getAttribute("data-theme") || "light";
    if(_themeLight) _themeLight.classList.toggle("active", cur === "light");
    if(_themeDark) _themeDark.classList.toggle("active", cur === "dark");
  }
  _syncThemeButtons();
  [_themeLight, _themeDark].forEach(btn => {
    if(!btn) return;
    btn.addEventListener("click", () => {
      const val = btn.dataset.val;
      document.documentElement.setAttribute("data-theme", val);
      localStorage.setItem("argos-theme", val);
      _syncThemeButtons();
    });
  });

  // Language buttons
  const _langEs = $("spLangEs"), _langEn = $("spLangEn");
  function _syncLangButtons(){
    if(_langEs) _langEs.classList.toggle("active", _lang === "es");
    if(_langEn) _langEn.classList.toggle("active", _lang === "en");
  }
  _syncLangButtons();
  [_langEs, _langEn].forEach(btn => {
    if(!btn) return;
    btn.addEventListener("click", () => {
      _lang = btn.dataset.val;
      localStorage.setItem("argos-lang", _lang);
      _syncLangButtons();
      _applyI18n();
    });
  });

  // Default FC
  const _spFc = $("spDefaultFc");
  if(_spFc){
    _spFc.value = localStorage.getItem("Argos_default_fc") || "BCN4";
    _spFc.addEventListener("change", () => {
      localStorage.setItem("Argos_default_fc", _spFc.value);
    });
  }
}

function _applyI18n(){
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const k = el.getAttribute("data-i18n");
    const v = t(k);
    if(v) el.textContent = v;
  });
  document.querySelectorAll("[data-i18n-html]").forEach(el => {
    const k = el.getAttribute("data-i18n-html");
    const v = _faqHtml(k);
    if(v) el.innerHTML = v;
  });
}
_applyI18n();


// ═══ FAQ ═══
let _faqInited = false;
function _initFaq(){
  if(_faqInited) return;
  _faqInited = true;
  // Accordion
  document.querySelectorAll(".faq-q").forEach(btn => {
    btn.addEventListener("click", () => {
      const item = btn.parentElement;
      const wasOpen = item.classList.contains("open");
      // Close all
      document.querySelectorAll(".faq-item").forEach(i => i.classList.remove("open"));
      if(!wasOpen) item.classList.add("open");
    });
  });
  // Open first item
  const first = document.querySelector(".faq-item");
  if(first) first.classList.add("open");
  // Populate FAQ content
  document.querySelectorAll("[data-i18n-html]").forEach(el => {
    const k = el.getAttribute("data-i18n-html");
    el.innerHTML = _faqHtml(k);
  });
  // Feedback form
  const fbFc = $("fb-fc");
  if(fbFc) fbFc.value = currentFC;
  const fbSubmit = $("fb-submit");
  if(fbSubmit) fbSubmit.addEventListener("click", async () => {
    const fc = ($("fb-fc")||{}).value || currentFC;
    const login = ($("fb-login")||{}).value || "";
    const text = ($("fb-text")||{}).value || "";
    const res = $("fb-result");
    if(!login.trim() || !text.trim()){
      if(res) { res.style.color = "var(--red)"; res.textContent = "Login and feedback are required"; }
      return;
    }
    fbSubmit.disabled = true;
    try{
      await jpost(`${API}/api/feedback`, {fc, login: login.trim(), feedback: text.trim()});
      if(res) { res.style.color = "var(--green)"; res.textContent = t("faq_feedback_ok"); }
      $("fb-text").value = "";
    }catch(e){
      if(res) { res.style.color = "var(--red)"; res.textContent = t("faq_feedback_err") + ": " + e.message; }
    }
    fbSubmit.disabled = false;
    setTimeout(() => { if(res) res.textContent = ""; }, 4000);
  });
}

function _faqHtml(key){
  const _es = {
    faq_a1: `<div class="formula">Target_Errors = (DPMO_Target × Opportunities) / 1,000,000<br>Pct_to_Target = (Target_Errors / Actual_Errors) × 100</div>
      <ul>
        <li><b>&gt;100%</b> = El asociado está <b>por encima</b> del target (bien) → no necesita coaching</li>
        <li><b>&lt;100%</b> = El asociado está <b>por debajo</b> del target → candidato a coaching</li>
      </ul>
      <p><b>DPMO</b> = Defects Per Million Opportunities. Cada error type + curve + tenure tiene un target DPMO diferente según el fichero <code>dpmo_targets.json</code>.</p>`,
    faq_a2: `<table>
        <tr><th>Curva</th><th>Definición</th><th>Target DPMO</th></tr>
        <tr><td><span class="badge-vet">VETERAN</span></td><td>400+ horas en ESTE proceso</td><td>Usa Week 10 (más estricto)</td></tr>
        <tr><td><span class="badge-xt">XT (Cross-Trainee)</span></td><td>Veterano en OTRO proceso, &lt;400h en éste</td><td>Curva XT (más permisiva)</td></tr>
        <tr><td><span class="badge-nh">NH (New Hire)</span></td><td>No es veterano en ningún proceso</td><td>Curva NH (la más permisiva)</td></tr>
      </table>
      <p style="margin-top:8px">Cada curva tiene targets progresivos: Day 1→10 para las primeras horas, luego Week 3→10 conforme acumula experiencia.</p>`,
    faq_a3: `<div class="formula">tenure = max(1, ceil(hours / 40))</div>
      <table>
        <tr><th>Horas</th><th>Tenure</th></tr>
        <tr><td>0–40h</td><td>T1</td></tr>
        <tr><td>41–80h</td><td>T2</td></tr>
        <tr><td>81–120h</td><td>T3</td></tr>
        <tr><td>…</td><td>…</td></tr>
        <tr><td>400+h</td><td>Veterano</td></tr>
      </table>
      <p style="margin-top:8px">Fuente: Historial de horas (2025 → actualidad), por proceso. El tenure se calcula POR PROCESO — un asociado puede ser VET en PACK pero NH en PICK.</p>`,
    faq_a4: `<p><b>Performance Dashboard:</b></p>
      <ul>
        <li><b>Prioridad 3</b> (rojo): % to Target &lt; 80%</li>
        <li><b>Prioridad 2</b> (naranja): % to Target 80–99%</li>
        <li><b>Prioridad 1</b> (verde): % to Target 100–110%</li>
        <li><b>On Target</b> (azul): ≥ 110%</li>
      </ul>
      <p style="margin-top:8px"><b>Quality Dashboard:</b></p>
      <ul>
        <li>Aparece si σ Score &gt; sigma_threshold configurado para ese error + FC</li>
        <li>False Pick Short: aparece si errores ≥ 5 (threshold fijo)</li>
        <li><b>Modos:</b> urgent (σ≥1), improvement (σ≥2), maintenance (σ≥3)</li>
        <li><b>Coached</b> = ya tiene un Guided Coaching registrado para el curso de ese error específico</li>
      </ul>`,
    faq_a5: `<p><b>Performance:</b></p>
      <table>
        <tr><th>Columna</th><th>Descripción</th></tr>
        <tr><td>Dept</td><td>L&D (NH T1-8, XT T1-2) u Ops (resto)</td></tr>
        <tr><td>Cohort</td><td>Curva + Tenure (ej: NH 3, VET, XT 2)</td></tr>
        <tr><td>Role</td><td>Rol asignado por estación/FCLM (SM1, PICK_AR, etc.)</td></tr>
        <tr><td>Station</td><td>Estación de trabajo actual</td></tr>
        <tr><td>Rate</td><td>UPH actual del turno</td></tr>
        <tr><td>% Target</td><td>Rate / Target × 100 (ajustado por curva)</td></tr>
        <tr><td>Prio</td><td>P3 (&lt;80%), P2 (80-99%), P1 (100-110%), On Target (&gt;110%)</td></tr>
      </table>
      <p style="margin-top:8px"><b>Quality:</b></p>
      <table>
        <tr><th>Columna</th><th>Descripción</th></tr>
        <tr><td>Errors WK</td><td>Total errores esta semana (domingo→ahora)</td></tr>
        <tr><td>Target</td><td>Target Errors calculado por DPMO</td></tr>
        <tr><td>% Target</td><td>(Target / Errors) × 100</td></tr>
        <tr><td>σ Score</td><td>Desviación sigma vs media del site</td></tr>
        <tr><td>Mode</td><td>urgent / improvement / maintenance</td></tr>
      </table>`,
  };
  const _en = {
    faq_a1: `<div class="formula">Target_Errors = (DPMO_Target × Opportunities) / 1,000,000<br>Pct_to_Target = (Target_Errors / Actual_Errors) × 100</div>
      <ul>
        <li><b>&gt;100%</b> = Associate is <b>above</b> target (good) → no coaching needed</li>
        <li><b>&lt;100%</b> = Associate is <b>below</b> target → coaching candidate</li>
      </ul>
      <p><b>DPMO</b> = Defects Per Million Opportunities. Each error type + curve + tenure has a different DPMO target from <code>dpmo_targets.json</code>.</p>`,
    faq_a2: `<table>
        <tr><th>Curve</th><th>Definition</th><th>DPMO Target</th></tr>
        <tr><td><span class="badge-vet">VETERAN</span></td><td>400+ hours in THIS process</td><td>Uses Week 10 (strictest)</td></tr>
        <tr><td><span class="badge-xt">XT (Cross-Trainee)</span></td><td>Veteran in ANOTHER process, &lt;400h in this one</td><td>XT curve (more lenient)</td></tr>
        <tr><td><span class="badge-nh">NH (New Hire)</span></td><td>Not veteran in any process</td><td>NH curve (most lenient)</td></tr>
      </table>
      <p style="margin-top:8px">Each curve has progressive targets: Day 1→10 for initial hours, then Week 3→10 as experience accumulates.</p>`,
    faq_a3: `<div class="formula">tenure = max(1, ceil(hours / 40))</div>
      <table>
        <tr><th>Hours</th><th>Tenure</th></tr>
        <tr><td>0–40h</td><td>T1</td></tr>
        <tr><td>41–80h</td><td>T2</td></tr>
        <tr><td>81–120h</td><td>T3</td></tr>
        <tr><td>…</td><td>…</td></tr>
        <tr><td>400+h</td><td>Veteran</td></tr>
      </table>
      <p style="margin-top:8px">Source: Hours history (2025 → present), per process. Tenure is calculated PER PROCESS — an associate can be VET in PACK but NH in PICK.</p>`,
    faq_a4: `<p><b>Performance Dashboard:</b></p>
      <ul>
        <li><b>Priority 3</b> (red): % to Target &lt; 80%</li>
        <li><b>Priority 2</b> (orange): % to Target 80–99%</li>
        <li><b>Priority 1</b> (green): % to Target 100–110%</li>
        <li><b>On Target</b> (blue): ≥ 110%</li>
      </ul>
      <p style="margin-top:8px"><b>Quality Dashboard:</b></p>
      <ul>
        <li>Appears if σ Score &gt; configured sigma_threshold for that error + FC</li>
        <li>False Pick Short: appears if errors ≥ 5 (fixed threshold)</li>
        <li><b>Modes:</b> urgent (σ≥1), improvement (σ≥2), maintenance (σ≥3)</li>
        <li><b>Coached</b> = already has a Guided Coaching instance registered for that error's specific course</li>
      </ul>`,
    faq_a5: `<p><b>Performance:</b></p>
      <table>
        <tr><th>Column</th><th>Description</th></tr>
        <tr><td>Dept</td><td>L&D (NH T1-8, XT T1-2) or Ops (rest)</td></tr>
        <tr><td>Cohort</td><td>Curve + Tenure (e.g. NH 3, VET, XT 2)</td></tr>
        <tr><td>Role</td><td>Assigned role by station/FCLM (SM1, PICK_AR, etc.)</td></tr>
        <tr><td>Station</td><td>Current workstation</td></tr>
        <tr><td>Rate</td><td>Current shift UPH</td></tr>
        <tr><td>% Target</td><td>Rate / Target × 100 (adjusted by curve)</td></tr>
        <tr><td>Prio</td><td>P3 (&lt;80%), P2 (80-99%), P1 (100-110%), On Target (&gt;110%)</td></tr>
      </table>
      <p style="margin-top:8px"><b>Quality:</b></p>
      <table>
        <tr><th>Column</th><th>Description</th></tr>
        <tr><td>Errors WK</td><td>Total errors this week (Sunday→now)</td></tr>
        <tr><td>Target</td><td>Target Errors calculated by DPMO</td></tr>
        <tr><td>% Target</td><td>(Target / Errors) × 100</td></tr>
        <tr><td>σ Score</td><td>Sigma deviation vs site average</td></tr>
        <tr><td>Mode</td><td>urgent / improvement / maintenance</td></tr>
      </table>`,
  };
  const dict = _lang === "en" ? _en : _es;
  return dict[key] || "";
}

// ═══════════════════════════════════════════════════════════════
// ADMIN CONFIG PANEL
// ═══════════════════════════════════════════════════════════════
let _cfgTargetsData = null;
let _cfgQualityData = null;
let _cfgShiftsData = null;

function _cfgToast(msg, isErr){
  const el = $("cfgStatus");
  if(el){ el.textContent = msg; el.style.color = isErr ? "#e53e3e" : "var(--green)"; }
  setTimeout(()=>{ if(el) el.textContent = ""; }, 4000);
}

function _cfgFcFilter(){ return $("cfgFcFilter")?.value || ""; }

function _minutesToHHMM(m){
  const h = Math.floor(m/60)%24;
  const min = m%60;
  return `${String(h).padStart(2,'0')}:${String(min).padStart(2,'0')}`;
}
function _hhmmToMinutes(s){
  const [h,m] = s.split(":").map(Number);
  return (h||0)*60 + (m||0);
}

// ── Load & Render: Pack Line Targets ──
async function _cfgLoadTargets(){
  try{
    const res = await jget(`${API}/api/admin/config/custom_targets.json`);
    _cfgTargetsData = res.data || {};
    _cfgRenderTargets();
  }catch(e){ $("cfgTargetsBody").innerHTML = `<div class="cfg-loading" style="color:#e53e3e">Error: ${esc(e.message)}</div>`; }
}
function _cfgRenderTargets(){
  const filter = _cfgFcFilter();
  const fcs = Object.keys(_cfgTargetsData).filter(fc => !filter || fc === filter).sort();
  const showFcCol = !filter;
  let html = `<table class="cfg-table"><thead><tr>${showFcCol?'<th>FC</th>':''}<th>Role</th><th style="width:100px">Target UPH</th><th style="width:40px"></th></tr></thead><tbody>`;
  for(const fc of fcs){
    if(showFcCol) html += `<tr class="cfg-group-row"><td colspan="4"><span class="cfg-fc-pill">${esc(fc)}</span></td></tr>`;
    const targets = (_cfgTargetsData[fc]||{}).pack_line_targets || [];
    for(let i=0; i<targets.length; i++){
      const t = targets[i];
      html += `<tr>
        <td>${esc(t.key || t.applies_to_role || "")}</td>
        <td><input type="number" data-fc="${esc(fc)}" data-idx="${i}" class="cfg-uph-input" value="${t.target_uph||0}"></td>
        <td><button class="cfg-del-btn" data-fc="${esc(fc)}" data-idx="${i}" data-section="targets" title="Delete">×</button></td>
      </tr>`;
    }
  }
  html += `</tbody></table>
  <div class="cfg-add-row">
    <select id="cfgAddTargetFc" class="cfg-add-input" style="width:70px">
      ${["BCN1","BCN4","MAD7","OVD1","RMU1","SVQ1"].map(f=>`<option value="${f}" ${f===(filter||"BCN4")?'selected':''}>${f}</option>`).join("")}
    </select>
    <input id="cfgAddTargetRole" class="cfg-add-input" placeholder="Role (e.g. SM)" style="width:120px">
    <input id="cfgAddTargetUPH" type="number" class="cfg-add-input" placeholder="UPH" style="width:70px">
    <button class="cfg-add-btn" id="cfgAddTargetBtn">+ Add</button>
  </div>`;
  $("cfgTargetsBody").innerHTML = html;
  $("cfgAddTargetBtn") && $("cfgAddTargetBtn").addEventListener("click",()=>{
    const fc = $("cfgAddTargetFc").value, role = $("cfgAddTargetRole").value.trim().toUpperCase(), uph = parseInt($("cfgAddTargetUPH").value)||0;
    if(!fc||!role||!uph){ _cfgToast("Fill FC, Role and UPH",true); return; }
    if(!_cfgTargetsData[fc]) _cfgTargetsData[fc] = {pack_line_targets:[]};
    if(!_cfgTargetsData[fc].pack_line_targets) _cfgTargetsData[fc].pack_line_targets = [];
    _cfgTargetsData[fc].pack_line_targets.push({key:role, applies_to_role:role, target_uph:uph});
    _cfgRenderTargets();
  });
}

async function _cfgSaveTargets(){
  // Read values from inputs back into data
  const inputs = $("cfgTargetsBody").querySelectorAll(".cfg-uph-input");
  for(const inp of inputs){
    const fc = inp.dataset.fc;
    const idx = parseInt(inp.dataset.idx);
    const val = parseFloat(inp.value) || 0;
    if(_cfgTargetsData[fc]?.pack_line_targets?.[idx]){
      _cfgTargetsData[fc].pack_line_targets[idx].target_uph = val;
    }
  }
  try{
    await jpost(`${API}/api/admin/config/custom_targets.json`, {data: _cfgTargetsData});
    _cfgToast("✓ Targets saved successfully");
  }catch(e){ _cfgToast("✗ " + e.message, true); }
}

// ── Load & Render: Quality Mode ──
async function _cfgLoadQuality(){
  try{
    const res = await jget(`${API}/api/admin/config/quality_mode.json`);
    _cfgQualityData = res.data || {};
    _cfgRenderQuality();
  }catch(e){ $("cfgQualityBody").innerHTML = `<div class="cfg-loading" style="color:#e53e3e">Error: ${esc(e.message)}</div>`; }
}
function _cfgRenderQuality(){
  const filter = _cfgFcFilter();
  const fcs = Object.keys(_cfgQualityData).filter(fc => !filter || fc === filter).sort();
  const modeOpts = ["urgent","improvement","maintenance"].map(m => `<option value="${m}">${m}</option>`).join("");
  const showFcCol = !filter;
  let html = `<table class="cfg-table"><thead><tr>${showFcCol?'<th>FC</th>':''}<th>Type</th><th class="cfg-enabled-col">Enabled</th><th>Mode</th><th style="width:90px">σ Threshold</th><th style="width:90px">Min Errors</th><th style="width:40px"></th></tr></thead><tbody>`;
  for(const fc of fcs){
    if(showFcCol) html += `<tr class="cfg-group-row"><td colspan="7"><span class="cfg-fc-pill">${esc(fc)}</span></td></tr>`;
    const cfg = _cfgQualityData[fc] || {};
    const def = cfg.default || {};
    html += `<tr>
      <td><b>DEFAULT</b></td>
      <td></td>
      <td><select data-fc="${esc(fc)}" data-key="__default__" data-field="mode" class="cfg-qm-sel">${modeOpts.replace(`value="${def.mode||'improvement'}"`, `value="${def.mode||'improvement'}" selected`)}</select></td>
      <td><input type="number" step="0.5" data-fc="${esc(fc)}" data-key="__default__" data-field="sigma" class="cfg-qm-num" value="${def.sigma_threshold||2}"></td>
      <td><input type="number" data-fc="${esc(fc)}" data-key="__default__" data-field="min_errors" class="cfg-qm-num" value="${def.min_errors||3}"></td>
      <td></td>
    </tr>`;
    const errors = cfg.errors || {};
    for(const ek of Object.keys(errors)){
      const e = errors[ek];
      const isEnabled = e.enabled !== false;
      html += `<tr>
        <td>${esc(ek.replace(/_/g," "))}</td>
        <td><input type="checkbox" data-fc="${esc(fc)}" data-key="${esc(ek)}" class="cfg-qm-enabled" ${isEnabled?'checked':''}></td>
        <td><select data-fc="${esc(fc)}" data-key="${esc(ek)}" data-field="mode" class="cfg-qm-sel">${modeOpts.replace(`value="${e.mode||'improvement'}"`, `value="${e.mode||'improvement'}" selected`)}</select></td>
        <td><input type="number" step="0.5" data-fc="${esc(fc)}" data-key="${esc(ek)}" data-field="sigma" class="cfg-qm-num" value="${e.sigma_threshold||2}"></td>
        <td><input type="number" data-fc="${esc(fc)}" data-key="${esc(ek)}" data-field="min_errors" class="cfg-qm-num" value="${e.min_errors||3}"></td>
        <td><button class="cfg-del-btn" data-fc="${esc(fc)}" data-key="${esc(ek)}" data-section="quality" title="Delete">×</button></td>
      </tr>`;
    }
  }
  html += `</tbody></table>
  <div class="cfg-add-row">
    <select id="cfgAddQualityFc" class="cfg-add-input" style="width:70px">
      ${["BCN1","BCN4","MAD7","OVD1","RMU1","SVQ1"].map(f=>`<option value="${f}" ${f===(filter||"BCN4")?'selected':''}>${f}</option>`).join("")}
    </select>
    <input id="cfgAddQualityKey" class="cfg-add-input" placeholder="ERROR_KEY" style="width:160px;text-transform:uppercase">
    <select id="cfgAddQualityMode" class="cfg-add-input" style="width:100px">${modeOpts}</select>
    <input id="cfgAddQualitySigma" type="number" step="0.5" class="cfg-add-input" placeholder="σ" value="2" style="width:50px">
    <input id="cfgAddQualityMin" type="number" class="cfg-add-input" placeholder="Min" value="3" style="width:50px">
    <button class="cfg-add-btn" id="cfgAddQualityBtn">+ Add</button>
  </div>`;
  $("cfgQualityBody").innerHTML = html;
  $("cfgAddQualityBtn") && $("cfgAddQualityBtn").addEventListener("click",()=>{
    const fc = $("cfgAddQualityFc").value, key = $("cfgAddQualityKey").value.trim().toUpperCase().replace(/\s+/g,"_");
    const mode = $("cfgAddQualityMode").value, sigma = parseFloat($("cfgAddQualitySigma").value)||2, minE = parseInt($("cfgAddQualityMin").value)||3;
    if(!fc||!key){ _cfgToast("Fill FC and Error Key",true); return; }
    if(!_cfgQualityData[fc]) _cfgQualityData[fc] = {default:{mode:"improvement",sigma_threshold:2,min_errors:3},errors:{}};
    if(!_cfgQualityData[fc].errors) _cfgQualityData[fc].errors = {};
    _cfgQualityData[fc].errors[key] = {enabled:true, mode, sigma_threshold:sigma, min_errors:minE};
    _cfgRenderQuality();
  });
}

async function _cfgSaveQuality(){
  // Read selects and inputs
  // Read enabled checkboxes first
  $("cfgQualityBody").querySelectorAll(".cfg-qm-enabled").forEach(el => {
    const fc = el.dataset.fc, key = el.dataset.key;
    if(key && key !== "__default__" && _cfgQualityData[fc]?.errors?.[key]){
      _cfgQualityData[fc].errors[key].enabled = el.checked;
    }
  });
  $("cfgQualityBody").querySelectorAll(".cfg-qm-sel, .cfg-qm-num").forEach(el => {
    const fc = el.dataset.fc, key = el.dataset.key, field = el.dataset.field;
    const val = field==="sigma" ? parseFloat(el.value)||2 : field==="min_errors" ? parseInt(el.value)||3 : el.value;
    if(key === "__default__"){
      if(!_cfgQualityData[fc]) _cfgQualityData[fc] = {default:{},errors:{}};
      if(!_cfgQualityData[fc].default) _cfgQualityData[fc].default = {};
      if(field==="mode") _cfgQualityData[fc].default.mode = val;
      else if(field==="sigma") _cfgQualityData[fc].default.sigma_threshold = val;
      else if(field==="min_errors") _cfgQualityData[fc].default.min_errors = val;
    } else {
      if(!_cfgQualityData[fc]?.errors?.[key]) return;
      if(field==="mode") _cfgQualityData[fc].errors[key].mode = val;
      else if(field==="sigma") _cfgQualityData[fc].errors[key].sigma_threshold = val;
      else if(field==="min_errors") _cfgQualityData[fc].errors[key].min_errors = val;
    }
  });
  try{
    await jpost(`${API}/api/admin/config/quality_mode.json`, {data: _cfgQualityData});
    _cfgToast("✓ Quality mode saved");
  }catch(e){ _cfgToast("✗ " + e.message, true); }
}

// ── Load & Render: Shift Config ──
async function _cfgLoadShifts(){
  try{
    const res = await jget(`${API}/api/admin/config/shift_config.json`);
    _cfgShiftsData = res.data || {};
    _cfgRenderShifts();
  }catch(e){ $("cfgShiftsBody").innerHTML = `<div class="cfg-loading" style="color:#e53e3e">Error: ${esc(e.message)}</div>`; }
}
function _cfgRenderShifts(){
  const filter = _cfgFcFilter();
  const fcs = Object.keys(_cfgShiftsData).filter(fc => !filter || fc === filter).sort();
  const showFcCol = !filter;
  let html = `<table class="cfg-table"><thead><tr>${showFcCol?'<th>FC</th>':''}<th>Dept</th><th>Shift</th><th style="width:80px">Start</th><th style="width:80px">End</th></tr></thead><tbody>`;
  for(const fc of fcs){
    if(showFcCol) html += `<tr class="cfg-group-row"><td colspan="5"><span class="cfg-fc-pill">${esc(fc)}</span></td></tr>`;
    const fcCfg = _cfgShiftsData[fc] || {};
    for(const dept of Object.keys(fcCfg)){
      if(dept === "default_department") continue;
      const shifts = fcCfg[dept] || {};
      for(const shiftName of Object.keys(shifts)){
        const s = shifts[shiftName];
        html += `<tr>
          <td>${esc(dept)}</td>
          <td>${esc(shiftName)}</td>
          <td><input type="text" data-fc="${esc(fc)}" data-dept="${esc(dept)}" data-shift="${esc(shiftName)}" data-field="shift_start" class="cfg-shift-time" value="${_minutesToHHMM(s.shift_start||0)}" placeholder="HH:MM" style="width:60px"></td>
          <td><input type="text" data-fc="${esc(fc)}" data-dept="${esc(dept)}" data-shift="${esc(shiftName)}" data-field="shift_end" class="cfg-shift-time" value="${_minutesToHHMM(s.shift_end||0)}" placeholder="HH:MM" style="width:60px"></td>
        </tr>`;
      }
    }
  }
  html += `</tbody></table>`;
  $("cfgShiftsBody").innerHTML = html;
}

async function _cfgSaveShifts(){
  $("cfgShiftsBody").querySelectorAll(".cfg-shift-time").forEach(el => {
    const {fc, dept, shift, field} = el.dataset;
    const mins = _hhmmToMinutes(el.value);
    if(_cfgShiftsData[fc]?.[dept]?.[shift]){
      _cfgShiftsData[fc][dept][shift][field] = mins;
      // Auto-update H1/H2 based on shift start/end
      const s = _cfgShiftsData[fc][dept][shift];
      const start = s.shift_start, end = s.shift_end;
      const mid = start < end ? Math.round((start+end)/2) : Math.round((start + end + 1440) / 2) % 1440;
      s.H1_start = start;
      s.H1_end = mid;
      s.H2_start = mid;
      s.H2_end = end;
    }
  });
  try{
    await jpost(`${API}/api/admin/config/shift_config.json`, {data: _cfgShiftsData});
    _cfgToast("✓ Shifts saved");
  }catch(e){ _cfgToast("✗ " + e.message, true); }
}

// ── Config panel init ──
// ── Load & Render: Station Map ──
let _cfgStationsData = null;
async function _cfgLoadStations(){
  try{
    const res = await jget(`${API}/api/admin/config/fclm_mapping.json`);
    _cfgStationsData = res.data || {};
    _cfgRenderStations();
  }catch(e){ $("cfgStationsBody").innerHTML = `<div class="cfg-loading" style="color:#e53e3e">Error: ${esc(e.message)}</div>`; }
}
function _cfgRenderStations(){
  const filter = _cfgFcFilter();
  const fcs = Object.keys(_cfgStationsData).filter(fc => !filter || fc === filter).sort();
  let html = `<table class="cfg-table"><thead><tr><th>Station</th><th>Role Override</th><th>Function</th></tr></thead><tbody>`;
  for(const fc of fcs){
    const overrides = (_cfgStationsData[fc]||{}).station_overrides || [];
    if(!overrides.length) continue;
    if(!filter){
      html += `<tr class="cfg-group-row"><td colspan="3"><span class="cfg-fc-pill">${esc(fc)}</span></td></tr>`;
    }
    for(let i=0; i<overrides.length; i++){
      const o = overrides[i];
      html += `<tr>
        <td><input type="text" class="cfg-station-input" data-fc="${esc(fc)}" data-idx="${i}" data-field="station_contains" value="${esc(o.station_contains||"")}" style="width:100px;font-size:11px"></td>
        <td><input type="text" class="cfg-station-input" data-fc="${esc(fc)}" data-idx="${i}" data-field="role_override" value="${esc(o.role_override||"")}" style="width:90px;font-size:11px"></td>
        <td><input type="text" class="cfg-station-input" data-fc="${esc(fc)}" data-idx="${i}" data-field="function_contains" value="${esc(o.function_contains||"")}" style="width:140px;font-size:11px"></td>
      </tr>`;
    }
  }
  html += `</tbody></table>`;
  $("cfgStationsBody").innerHTML = html;
}
async function _cfgSaveStations(){
  const inputs = $("cfgStationsBody").querySelectorAll(".cfg-station-input");
  for(const inp of inputs){
    const {fc, idx, field} = inp.dataset;
    const i = parseInt(idx);
    if(_cfgStationsData[fc]?.station_overrides?.[i]){
      _cfgStationsData[fc].station_overrides[i][field] = inp.value.trim();
    }
  }
  try{
    await jpost(`${API}/api/admin/config/fclm_mapping.json`, {data: _cfgStationsData});
    _cfgToast("✓ Station map saved");
  }catch(e){ _cfgToast("✗ " + e.message, true); }
}

function _cfgInit(){
  if(!$("panel-config")) return;
  _cfgLoadTargets();
  _cfgLoadQuality();
  _cfgLoadCourses();
  _cfgLoadShifts();
  _cfgLoadStations();
}

$("cfgFcFilter") && $("cfgFcFilter").addEventListener("change",()=>{
  if(_cfgTargetsData) _cfgRenderTargets();
  if(_cfgQualityData) _cfgRenderQuality();
  if(_cfgShiftsData) _cfgRenderShifts();
  if(_cfgStationsData) _cfgRenderStations();
});
$("cfgSaveTargets") && $("cfgSaveTargets").addEventListener("click", _cfgSaveTargets);
$("cfgSaveQuality") && $("cfgSaveQuality").addEventListener("click", _cfgSaveQuality);
$("cfgSaveShifts") && $("cfgSaveShifts").addEventListener("click", _cfgSaveShifts);
$("cfgSaveStations") && $("cfgSaveStations").addEventListener("click", _cfgSaveStations);

// Load config when tab is clicked
document.addEventListener("click",(e)=>{
  const tab = e.target.closest('[data-tab="config"]');
  if(tab && !_cfgTargetsData) _cfgInit();
});

// Delete row handler for config tables
document.addEventListener("click",(e)=>{
  const btn = e.target.closest(".cfg-del-btn");
  if(!btn) return;
  const section = btn.dataset.section;
  if(section === "targets"){
    const fc = btn.dataset.fc, idx = parseInt(btn.dataset.idx);
    if(_cfgTargetsData[fc]?.pack_line_targets){
      _cfgTargetsData[fc].pack_line_targets.splice(idx, 1);
      _cfgRenderTargets();
    }
  } else if(section === "quality"){
    const fc = btn.dataset.fc, key = btn.dataset.key;
    if(_cfgQualityData[fc]?.errors?.[key]){
      delete _cfgQualityData[fc].errors[key];
      _cfgRenderQuality();
    }
  }
});

// Push config button
$("cfgPushBtn") && $("cfgPushBtn").addEventListener("click", async ()=>{
  if(!confirm("Push config changes to Data Central?")) return;
  const btn = $("cfgPushBtn");
  btn.disabled = true; btn.textContent = "Pushing…";
  try{
    const res = await jpost(`${API}/api/admin/push-config`);
    _cfgToast(`✓ Pushed ${res.count} files to ${res.target}`);
  }catch(e){ _cfgToast("✗ " + e.message, true); }
  btn.disabled = false; btn.textContent = "🔄 Update Data Central";
});

// ── Load & Render: Coaching Courses ──
let _cfgQCoursesData = null;
let _cfgPCoursesData = null;

async function _cfgLoadCourses(){
  try{
    const qRes = await jget(`${API}/api/admin/config/quality_courses.json`);
    _cfgQCoursesData = qRes.data || {};
    _cfgRenderQualityCourses();
  }catch(e){ $("cfgQualityCoursesArea").innerHTML = `<div class="cfg-loading" style="color:#e53e3e">Error: ${esc(e.message)}</div>`; }
  try{
    const pRes = await jget(`${API}/api/admin/config/guided_coaching.json`);
    _cfgPCoursesData = pRes.data || {};
    _cfgRenderPerfCourses();
  }catch(e){ $("cfgPerfCoursesArea").innerHTML = `<div class="cfg-loading" style="color:#e53e3e">Error: ${esc(e.message)}</div>`; }
}

function _cfgRenderQualityCourses(){
  const errors = _cfgQCoursesData.errors || {};
  let html = `<table class="cfg-table"><thead><tr><th>Error Key</th><th>Course UUID</th><th>Enabled</th><th></th></tr></thead><tbody>`;
  for(const ek of Object.keys(errors).sort()){
    const raw = errors[ek];
    const uuid = typeof raw === "string" ? raw : (raw?.uuid || "");
    const enabled = typeof raw === "string" ? true : (raw?.enabled !== false);
    html += `<tr>
      <td style="font-weight:700">${esc(ek.replace(/_/g," "))}</td>
      <td><input type="text" class="cfg-qcourse-uuid" data-key="${esc(ek)}" value="${esc(uuid)}" style="width:280px;font-family:'JetBrains Mono',monospace;font-size:10px"></td>
      <td><input type="checkbox" class="cfg-qcourse-enabled" data-key="${esc(ek)}" ${enabled?'checked':''}></td>
      <td><button class="cfg-del-btn" data-key="${esc(ek)}" data-section="qcourse" title="Delete">×</button></td>
    </tr>`;
  }
  html += `</tbody></table>
  <div class="cfg-add-row">
    <input id="cfgAddQCourseKey" class="cfg-add-input" placeholder="ERROR_KEY" style="width:160px;text-transform:uppercase">
    <input id="cfgAddQCourseUuid" class="cfg-add-input" placeholder="Course UUID" style="width:280px;font-family:'JetBrains Mono',monospace;font-size:10px">
    <button class="cfg-add-btn" id="cfgAddQCourseBtn">+ Add</button>
  </div>`;
  $("cfgQualityCoursesArea").innerHTML = html;
  $("cfgAddQCourseBtn") && $("cfgAddQCourseBtn").addEventListener("click",()=>{
    const key = ($("cfgAddQCourseKey").value||"").trim().toUpperCase().replace(/\s+/g,"_");
    const uuid = ($("cfgAddQCourseUuid").value||"").trim();
    if(!key||!uuid){ _cfgToast("Fill Error Key and UUID",true); return; }
    if(!_cfgQCoursesData.errors) _cfgQCoursesData.errors = {};
    _cfgQCoursesData.errors[key] = {uuid, enabled:true};
    _cfgRenderQualityCourses();
  });
}

function _cfgRenderPerfCourses(){
  const roles = _cfgPCoursesData.role_to_course_uuid || {};
  const applyOpts = ["both","ld","ops"].map(v => `<option value="${v}">${v==="both"?"Both":v==="ld"?"L&D":"OPS"}</option>`).join("");
  let html = `<table class="cfg-table"><thead><tr><th>Role / Key</th><th>Course UUID</th><th>Applies To</th><th></th></tr></thead><tbody>`;
  for(const role of Object.keys(roles).sort()){
    const raw = roles[role];
    const uuid = typeof raw === "string" ? raw : (raw?.uuid || "");
    const appliesTo = typeof raw === "string" ? "both" : (raw?.applies_to || "both");
    html += `<tr>
      <td style="font-weight:700">${esc(role)}</td>
      <td><input type="text" class="cfg-pcourse-uuid" data-role="${esc(role)}" value="${esc(uuid)}" style="width:280px;font-family:'JetBrains Mono',monospace;font-size:10px"></td>
      <td><select class="cfg-pcourse-applies" data-role="${esc(role)}">${applyOpts.replace(`value="${appliesTo}"`,`value="${appliesTo}" selected`)}</select></td>
      <td><button class="cfg-del-btn" data-role="${esc(role)}" data-section="pcourse" title="Delete">×</button></td>
    </tr>`;
  }
  html += `</tbody></table>
  <div class="cfg-add-row">
    <input id="cfgAddPCourseRole" class="cfg-add-input" placeholder="ROLE_KEY" style="width:140px;text-transform:uppercase">
    <input id="cfgAddPCourseUuid" class="cfg-add-input" placeholder="Course UUID" style="width:260px;font-family:'JetBrains Mono',monospace;font-size:10px">
    <select id="cfgAddPCourseApplies" class="cfg-add-input" style="width:80px">${applyOpts}</select>
    <button class="cfg-add-btn" id="cfgAddPCourseBtn">+ Add</button>
  </div>`;
  $("cfgPerfCoursesArea").innerHTML = html;
  $("cfgAddPCourseBtn") && $("cfgAddPCourseBtn").addEventListener("click",()=>{
    const role = ($("cfgAddPCourseRole").value||"").trim().toUpperCase().replace(/\s+/g,"_");
    const uuid = ($("cfgAddPCourseUuid").value||"").trim();
    const applies = $("cfgAddPCourseApplies").value || "both";
    if(!role||!uuid){ _cfgToast("Fill Role and UUID",true); return; }
    if(!_cfgPCoursesData.role_to_course_uuid) _cfgPCoursesData.role_to_course_uuid = {};
    _cfgPCoursesData.role_to_course_uuid[role] = {uuid, applies_to:applies};
    _cfgRenderPerfCourses();
  });
}

async function _cfgSaveCourses(){
  // Read quality courses
  $("cfgQualityCoursesArea").querySelectorAll(".cfg-qcourse-uuid").forEach(el=>{
    const key = el.dataset.key;
    const uuid = el.value.trim();
    const enabledEl = $("cfgQualityCoursesArea").querySelector(`.cfg-qcourse-enabled[data-key="${key}"]`);
    const enabled = enabledEl ? enabledEl.checked : true;
    if(_cfgQCoursesData.errors) _cfgQCoursesData.errors[key] = {uuid, enabled};
  });
  // Read perf courses
  $("cfgPerfCoursesArea").querySelectorAll(".cfg-pcourse-uuid").forEach(el=>{
    const role = el.dataset.role;
    const uuid = el.value.trim();
    const appliesEl = $("cfgPerfCoursesArea").querySelector(`.cfg-pcourse-applies[data-role="${role}"]`);
    const applies = appliesEl ? appliesEl.value : "both";
    if(_cfgPCoursesData.role_to_course_uuid) _cfgPCoursesData.role_to_course_uuid[role] = {uuid, applies_to:applies};
  });
  try{
    await jpost(`${API}/api/admin/config/quality_courses.json`, {data: _cfgQCoursesData});
    await jpost(`${API}/api/admin/config/guided_coaching.json`, {data: _cfgPCoursesData});
    _cfgToast("✓ Coaching courses saved");
  }catch(e){ _cfgToast("✗ " + e.message, true); }
}

$("cfgSaveCourses") && $("cfgSaveCourses").addEventListener("click", _cfgSaveCourses);

// Delete handlers for courses
document.addEventListener("click",(e)=>{
  const btn = e.target.closest(".cfg-del-btn[data-section='qcourse']");
  if(!btn) return;
  const key = btn.dataset.key;
  if(_cfgQCoursesData?.errors?.[key]){
    delete _cfgQCoursesData.errors[key];
    _cfgRenderQualityCourses();
  }
});
document.addEventListener("click",(e)=>{
  const btn = e.target.closest(".cfg-del-btn[data-section='pcourse']");
  if(!btn) return;
  const role = btn.dataset.role;
  if(_cfgPCoursesData?.role_to_course_uuid?.[role]){
    delete _cfgPCoursesData.role_to_course_uuid[role];
    _cfgRenderPerfCourses();
  }
});

}); // end DOMContentLoaded
