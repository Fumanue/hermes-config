// ═══ I18N — Language System ═══
const I18N = {
  es: {
    subtitle: "Tu herramienta L&D / Operacional todo-en-uno",
    tab_performance: "Performance", tab_history: "Historial", tab_targets: "Targets", tab_quality: "Calidad",
    lbl_process: "Proceso", lbl_sub: "Sub", lbl_all: "Todos", lbl_fc: "FC",
    lbl_updated: "Actualizado", lbl_live: "Live", lbl_created: "Creado y Desarrollado por", lbl_theme: "Tema", lbl_lang: "Idioma",
    alerts_settings_title: "🔔 Alertas automáticas",
    alerts_settings_hint: "Opt-in. Cuando las activas, Argos revisa tu FC en segundo plano y te avisa. Detalles en la pestaña FAQ.",
    kpi_p3: "Prioridad 3", kpi_p3_sub: "Por debajo de 80%",
    kpi_p2: "Prioridad 2",
    kpi_p1: "Prioridad 1",
    kpi_on_target: "On Target", kpi_on_target_sub: "Por encima de 100%",
    kpi_total: "Total Activos", kpi_total_sub: "Ops + L&D",
    kpi_coached: "Coached", kpi_coached_sub: "Este turno",
    btn_show: "VER", btn_max: "MAX", btn_curve: "Curva",
    lbl_showing: "Mostrando", lbl_of: "de", lbl_associates: "asociados",
    th_associate: "Asociado", th_manager: "Manager", th_dept: "Dept", th_cohort: "Cohort", th_role: "Rol",
    th_station: "Estación", th_prio: "Prio", th_rate: "Rate", th_pct_target: "% Target",
    th_notes: "Notas", th_coached: "Coached", th_action: "Acción",
    // Quality
    q_title: "Quality Coaching",
    q_subtitle: "Acumulado Atlas · últimos 7 días · detección sigma por Error Type",
    q_opportunities: "Oportunidades", q_present: "Presentes", q_coached: "Coached", q_pending: "Pendientes",
    q_sigma2_hint: "σ ≥ 2",
    btn_present_only: "Solo presentes", btn_hide_coached: "Ocultar coached", btn_first_days: "Primeros días",
    btn_hide_on_target: "Ocultar on-target", btn_run_pipeline: "▶ Start Pipeline",
    btn_refresh: "↻ Refresh", btn_sync_gc: "⟳ Sync GC",
    btn_upload_coaching: "↑ Subir Coaching", btn_summary: "📊 Resumen", btn_bulk: "↑↑ Subida masiva", btn_csv: "↓ CSV",
    qth_associate: "Asociado", qth_error: "Tipo Error", qth_errors_wk: "Errores L7D",
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
    faq_qbtn: "Guía de botones — ¿para qué sirve cada uno?",
    faq_qalerts: "🔔 Alertas automáticas — ¿qué las dispara y cómo activarlas?",
    faq_qanomaly: "⚠️ Anomalías — ¿qué es un error post-coaching?",
    faq_qtabs: "Pestañas: Performance · Quality · GCA · Map",
    faq_feedback_title: "💬 Enviar Feedback", faq_feedback_sub: "Reporta problemas, sugiere mejoras o comparte ideas",
    faq_feedback_lbl: "Feedback", faq_feedback_send: "Enviar Feedback", faq_feedback_ok: "✓ Enviado correctamente", faq_feedback_err: "Error al enviar",
    loading: "Cargando…", close: "Cerrar", cancel: "Cancelar",
    pipeline_done: "✓ Pipeline completado", lbl_threshold: "Todos los asociados con ≥1 defecto · usa el filtro σ para acotar",
    // Update banner / installer
    upd_available: "Hay una versión nueva disponible:",
    upd_yours: "tu versión:",
    upd_note: "Actualizar a esta nueva versión — problema de Midway (login) solucionado.",
    upd_apply: "Actualizar ahora",
    upd_downloading: "Descargando Setup…",
    upd_launching: "Lanzando instalador, la app se cerrará…",
    upd_unknown: "Error desconocido.",
    upd_failed: "No se pudo actualizar:",
    upd_ask_fumanue: "pide el Setup a Fumanue@.",
    upd_no_server: "No se pudo contactar el servidor — pide el Setup a Fumanue@.",
    // Midway pill
    mw_label: "Midway",
    mw_checking: "Comprobando Midway…",
    mw_active_in: "Midway activa (caduca en {x})",
    mw_expiring_in: "Midway caduca pronto (en {x})",
    mw_expired: "Midway expirada",
    mw_expired_tip: "Tu sesión de Midway ha caducado. Se renovará automáticamente al pulsar Run Pipeline.",
    mw_no_auth: "Midway no auth",
    mw_no_auth_tip: "Midway aún no autenticada. Se solicitará automáticamente al pulsar Run Pipeline.",
    mw_seconds_expired: "expirada",
    // Alert poll countdown pill
    poll_gca: "GCA",
    poll_quality: "Q",
    poll_due: "ahora…",
    poll_tip: "Próxima comprobación automática de alertas (GCA y Calidad). Se ejecutan cada 15 min.",
    // Offline banner
    off_no_network: "Sin conexión a la red",
    off_midway_expired: "Midway expirada",
    off_msg: "la app funciona en modo lectura. Pipeline y uploads están deshabilitados temporalmente.",
    // Auth / access
    auth_verifying: "Verificando acceso",
    auth_no_access: "Sin acceso",
    auth_contact: "Contacta a Fumanue@",
    auth_no_access_block: 'No perteneces al equipo <a href="https://permissions.amazon.com/a/team/coaching%20intelligence" target="_blank" style="color:var(--accent);text-decoration:underline;font-weight:700">Coaching Intelligence</a>.<br>Solicita acceso a <b>Fumanue@</b>.',
    auth_verify_error: "Error al verificar permisos.<br>Reinicia la app. Si persiste, contacta a <b>Fumanue@</b>.",
    // Empty states
    empty_no_records: "No hay registros que coincidan con el filtro",
    empty_no_data_fc: "Sin datos para este FC",
    empty_try_widen: "Prueba a ampliar prioridades, quitar el filtro de tenure o limpiar la búsqueda.",
    empty_run_pipeline: "Lanza el pipeline desde la barra superior para descargar los datos del día.",
    empty_no_visible_rows: "⚠️ No hay filas visibles",
    empty_no_gca_title: "Sin datos GCA",
    empty_no_gca_sub: "Lanza el GCA pipeline para refrescar.",
    gca_new_title: "🔔 Nuevo reactivo GCA",
    gca_new_body: "{n} coaching(s) pendiente(s) nuevo(s) en {fc}.",
    gca_view_btn: "Ver en GCA",
    qual_alert_title: "⚠️ Alerta de calidad",
    qual_alert_body: "{n} asociado(s) ≥2σ presente(s) en {fc}.",
    qual_view_btn: "Ver en Quality",
    q_pending_close: "Pendiente · Cerrar",
    q_pending_other: "Pendiente",
    empty_no_pending_coachings: "No hay coachings pendientes",
    empty_no_coachings_floor: "No hay coachings con estación en {floor}",
    // CSV
    csv_saved: "✅ CSV guardado ({n} filas):",
    csv_quality_saved: "✅ Quality CSV guardado ({n} filas):",
    csv_gca_saved: "✅ GCA CSV guardado ({n} filas):",
    // Midway recovery toast
    mw_no_internet: "Sin conexión a internet.",
    mw_no_status: "No se pudo comprobar el estado de Midway.",
    mw_state_missing: "Midway no está activa. Ejecuta Argos otra vez para autenticar.",
    mw_state_expired: "Midway expirada. Reinicia Argos para reautenticar.",
    mw_renew_btn: "🔑 Renovar Midway",
    mw_touch_yubi: "Toca tu YubiKey…",
    mw_waiting_fido2: "Esperando autenticación FIDO2…",
    mw_renewed: "✓ Midway renovada. Pulsa Run Pipeline otra vez.",
    mw_cant_pipeline: "No puedo lanzar el pipeline",
    mw_renew_failed: "No se pudo renovar:",
    mw_try_again: "intenta de nuevo o reinicia Argos",
    // Pipeline
    pipeline_error_prefix: "❌ Error:",
    pipeline_failed: "pipeline failed",
    // Map / coachings details
    map_pin_hint: "📌 Shift+click o click derecho en una estación para fijar su detalle aquí",
    map_estimated: "Estimado:",
    map_walking: "min caminando",
    map_coaching_min: "min coaching",
    map_distance: "Distancia:",
    map_coachings_in: "coachings en",
    map_stations: "estaciones",
    map_more_in_cat: "+ ver {n} más en esta categoría",
    map_more_short: "más",
    map_all_on_target: "Todas las estaciones activas están en o por encima del target.",
    map_no_issues: "Sin incidencias",
    // Common
    common_assoc: "asociado",
    common_assocs: "asociados",
    common_yes: "Sí",
    common_no: "No",
    common_unknown: "(vacío)",
    common_frozen_yes: "sí",
    common_frozen_no: "no",
    diag_collecting: "Recopilando…",
    diag_copied_title: "Info copiada",
    diag_copied_body: "Pega en Slack a Fumanue@",
    diag_error_title: "Error recopilando",
    map_radar_tip: "Mini-mapa: cada punto = una estación",
    map_zoom_tip: "Zoom estaciones",
    map_show_all_tip: "Mostrar todas las estaciones, incluso vacías",
    map_show_ontarget_tip: "Incluir estaciones on-target para ver la situación real completa",
  },
  en: {
    subtitle: "Your L&D / Operational One Stop Tool",
    tab_performance: "Performance", tab_history: "History", tab_targets: "Targets", tab_quality: "Quality",
    lbl_process: "Process", lbl_sub: "Sub", lbl_all: "All", lbl_fc: "FC",
    lbl_updated: "Updated", lbl_live: "Live", lbl_created: "Created and Developed by", lbl_theme: "Theme", lbl_lang: "Language",
    alerts_settings_title: "🔔 Automatic alerts",
    alerts_settings_hint: "Opt-in. When enabled, Argos checks your FC in the background and notifies you. Details in the FAQ tab.",
    kpi_p3: "Priority 3", kpi_p3_sub: "Below 80%",
    kpi_p2: "Priority 2",
    kpi_p1: "Priority 1",
    kpi_on_target: "On Target", kpi_on_target_sub: "Above 100%",
    kpi_total: "Total Active", kpi_total_sub: "Ops + L&D",
    kpi_coached: "Coached", kpi_coached_sub: "This shift",
    btn_show: "SHOW", btn_max: "MAX", btn_curve: "Curve",
    lbl_showing: "Showing", lbl_of: "of", lbl_associates: "associates",
    th_associate: "Associate", th_manager: "Manager", th_dept: "Dept", th_cohort: "Cohort", th_role: "Role",
    th_station: "Station", th_prio: "Prio", th_rate: "Rate", th_pct_target: "% Target",
    th_notes: "Notes", th_coached: "Coached", th_action: "Action",
    q_title: "Quality Coaching",
    q_subtitle: "Cumulative Atlas · last 7 days · sigma detection by Error Type",
    q_opportunities: "Opportunities", q_present: "Present", q_coached: "Coached", q_pending: "Pending",
    q_sigma2_hint: "σ ≥ 2",
    btn_present_only: "Present only", btn_hide_coached: "Hide Coached", btn_first_days: "First days",
    btn_hide_on_target: "Hide On-Target", btn_run_pipeline: "▶ Start Pipeline",
    btn_refresh: "↻ Refresh", btn_sync_gc: "⟳ Sync GC",
    btn_upload_coaching: "↑ Upload Coaching", btn_summary: "📊 Summary", btn_bulk: "↑↑ Bulk Upload", btn_csv: "↓ CSV",
    qth_associate: "Associate", qth_error: "Error Type", qth_errors_wk: "Errors L7D",
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
    faq_qbtn: "Button guide — what does each one do?",
    faq_qalerts: "🔔 Automatic alerts — what triggers them and how to enable them?",
    faq_qanomaly: "⚠️ Anomalies — what is a post-coaching error?",
    faq_qtabs: "Tabs: Performance · Quality · GCA · Map",
    faq_feedback_title: "💬 Send Feedback", faq_feedback_sub: "Report issues, suggest features, or share ideas",
    faq_feedback_lbl: "Feedback", faq_feedback_send: "Send Feedback", faq_feedback_ok: "✓ Sent successfully", faq_feedback_err: "Error sending",
    loading: "Loading…", close: "Close", cancel: "Cancel",
    pipeline_done: "✓ Pipeline completed", lbl_threshold: "All associates with ≥1 defect · use the σ filter to narrow down",
    // Update banner / installer
    upd_available: "A new version is available:",
    upd_yours: "your version:",
    upd_note: "Update to this new version — Midway (login) issue fixed.",
    upd_apply: "Update now",
    upd_downloading: "Downloading Setup…",
    upd_launching: "Launching installer, the app will close…",
    upd_unknown: "Unknown error.",
    upd_failed: "Could not update:",
    upd_ask_fumanue: "ask Fumanue@ for the Setup.",
    upd_no_server: "Could not reach the server — ask Fumanue@ for the Setup.",
    // Midway pill
    mw_label: "Midway",
    mw_checking: "Checking Midway…",
    mw_active_in: "Midway active (expires in {x})",
    poll_gca: "GCA",
    poll_quality: "Q",
    poll_due: "now…",
    poll_tip: "Next automatic alert check (GCA and Quality). They run every 15 min.",
    mw_expiring_in: "Midway expiring soon (in {x})",
    mw_expired: "Midway expired",
    mw_expired_tip: "Your Midway session has expired. It will renew automatically when you click Run Pipeline.",
    mw_no_auth: "Midway no auth",
    mw_no_auth_tip: "Midway not yet authenticated. It will be requested automatically when you click Run Pipeline.",
    mw_seconds_expired: "expired",
    // Offline banner
    off_no_network: "No network connection",
    off_midway_expired: "Midway expired",
    off_msg: "the app is running in read-only mode. Pipeline and uploads are temporarily disabled.",
    // Auth / access
    auth_verifying: "Verifying access",
    auth_no_access: "No access",
    auth_contact: "Contact Fumanue@",
    auth_no_access_block: 'You are not a member of the <a href="https://permissions.amazon.com/a/team/coaching%20intelligence" target="_blank" style="color:var(--accent);text-decoration:underline;font-weight:700">Coaching Intelligence</a> team.<br>Request access from <b>Fumanue@</b>.',
    auth_verify_error: "Error verifying permissions.<br>Restart the app. If it persists, contact <b>Fumanue@</b>.",
    // Empty states
    empty_no_records: "No records match the filter",
    empty_no_data_fc: "No data for this FC",
    empty_try_widen: "Try widening priorities, removing the tenure filter, or clearing the search.",
    empty_run_pipeline: "Run the pipeline from the top bar to download today's data.",
    empty_no_visible_rows: "⚠️ No visible rows",
    empty_no_gca_title: "No GCA data",
    empty_no_gca_sub: "Run the GCA pipeline to refresh.",
    gca_new_title: "🔔 New GCA reactivo",
    gca_new_body: "{n} new pending coaching(s) at {fc}.",
    gca_view_btn: "View in GCA",
    qual_alert_title: "⚠️ Quality alert",
    qual_alert_body: "{n} associate(s) ≥2σ present at {fc}.",
    qual_view_btn: "View in Quality",
    q_pending_close: "Pending · Close",
    q_pending_other: "Pending",
    empty_no_pending_coachings: "No pending coachings",
    empty_no_coachings_floor: "No coachings with station on {floor}",
    // CSV
    csv_saved: "✅ CSV saved ({n} rows):",
    csv_quality_saved: "✅ Quality CSV saved ({n} rows):",
    csv_gca_saved: "✅ GCA CSV saved ({n} rows):",
    // Midway recovery toast
    mw_no_internet: "No internet connection.",
    mw_no_status: "Could not check Midway status.",
    mw_state_missing: "Midway is not active. Run Argos again to authenticate.",
    mw_state_expired: "Midway expired. Restart Argos to re-authenticate.",
    mw_renew_btn: "🔑 Renew Midway",
    mw_touch_yubi: "Touch your YubiKey…",
    mw_waiting_fido2: "Waiting for FIDO2 authentication…",
    mw_renewed: "✓ Midway renewed. Click Run Pipeline again.",
    mw_cant_pipeline: "Can't launch the pipeline",
    mw_renew_failed: "Could not renew:",
    mw_try_again: "try again or restart Argos",
    // Pipeline
    pipeline_error_prefix: "❌ Error:",
    pipeline_failed: "pipeline failed",
    // Map / coachings details
    map_pin_hint: "📌 Shift+click or right-click a station to pin its detail here",
    map_estimated: "Estimated:",
    map_walking: "min walking",
    map_coaching_min: "min coaching",
    map_distance: "Distance:",
    map_coachings_in: "coachings in",
    map_stations: "stations",
    map_more_in_cat: "+ see {n} more in this category",
    map_more_short: "more",
    map_all_on_target: "All active stations are at or above target.",
    map_no_issues: "No issues",
    // Common
    common_assoc: "associate",
    common_assocs: "associates",
    common_yes: "Yes",
    common_no: "No",
    common_unknown: "(empty)",
    common_frozen_yes: "yes",
    common_frozen_no: "no",
    diag_collecting: "Collecting…",
    diag_copied_title: "Info copied",
    diag_copied_body: "Paste in Slack to Fumanue@",
    diag_error_title: "Error collecting",
    map_radar_tip: "Mini-map: each dot = one station",
    map_zoom_tip: "Zoom stations",
    map_show_all_tip: "Show all stations, including empty ones",
    map_show_ontarget_tip: "Include on-target stations to see the full real situation",
  }
};
let _lang = localStorage.getItem("argos-lang") || "es";
function t(k){ return (I18N[_lang]||I18N.es)[k] || (I18N.es)[k] || k; }
function tf(k, params){
  let s = t(k);
  if(params){
    for(const p in params){ s = s.split("{"+p+"}").join(String(params[p])); }
  }
  return s;
}

// ═══ THEME ═══
// Apply saved theme immediately to avoid flash on load
(function(){
  const saved = localStorage.getItem("argos-theme") || "light";
  document.documentElement.setAttribute("data-theme", saved);
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
let currentFC = localStorage.getItem("argos-default-fc") || "BCN4";
let currentShift = "";
let manualTimeMode = false;

// ── Process groups ─────────────────────────────────────────
const PROCESS_GROUPS = {
  PACK:    ["SM","SM1","SMMIX","SM2","AFE_PACK","P2R_PACK","SNS1","SNS2","SINGLES","WS_SLAM","WS_VDF"],
  PICK:    ["PICK_AR","P2R_PICK"],
  STOW:    ["STOW","QUANTITY_STOW"],
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

// Process groups that actually have associates in the current data — the filter
// only offers what's present (no empty "Stow" when nobody stowed today). Keeps
// PROCESS_GROUP_KEYS order. Falls back to all keys if data isn't loaded yet.
function activeProcessGroups(){
  const present = new Set();
  (state.all||[]).forEach(r=>{
    const g = inferProcess(r.role);
    if(g && g !== "OTHER") present.add(g);
  });
  const keys = PROCESS_GROUP_KEYS.filter(k=>present.has(k));
  return keys.length ? keys : PROCESS_GROUP_KEYS.slice();
}

// Best-effort process guess for the CALM dropdown. Tries exact role-group
// membership first, then substring keywords (covers coaching titles/insights
// and station names like "PPSingleMedium" -> PACK/STOW that aren't exact roles).
function guessCalmProcess(text){
  const r = String(text||"").toUpperCase();
  if(!r) return "";
  const grp = inferProcess(r);
  if(grp && grp !== "OTHER") return grp;
  if(/ICQA|BIN\s*FILTER|SBC|CYCLE\s*COUNT|DEFECT|QUALITY/.test(r)) return "ICQA";
  if(/STOW/.test(r)) return "STOW";
  if(/PICK|PEI|P2R_PICK/.test(r)) return "PICK";
  if(/PACK|SINGLE|AFE|SLAM|VDF|PP/.test(r)) return "PACK";
  if(/RECEIVE|DECANT|RCV|INBOUND/.test(r)) return "RECEIVE";
  return "";
}

// ── Utils ──────────────────────────────────────────────────
function esc(s){ return String(s??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"); }

// Coaching expiration label: relative days + colour. Uses the expirationTime that
// already comes in the payload (no extra call). Returns {text, color} or null.
// Defined here (global scope, early) so every renderer can use it.
function coachingExpiry(raw){
  if(!raw) return null;
  const d = new Date(raw);
  if(isNaN(d)) return null;
  const days = Math.floor((d - new Date()) / 86400000);
  const date = d.toLocaleDateString("en-GB",{day:"2-digit",month:"short"});
  if(days < 0)  return {text:`Expired ${date} (${-days}d ago)`, color:"var(--red,#dc2626)"};
  if(days === 0) return {text:`Expires today (${date})`, color:"var(--red,#dc2626)"};
  if(days <= 2) return {text:`Expires in ${days}d (${date})`, color:"var(--orange,#d97706)"};
  return {text:`Expires ${date} (${days}d)`, color:"var(--text-muted)"};
}

// "Last seen" from ELS arrivalTimestamp (epoch MS). Same call that already
// resolves presence — no extra fetch. For an INACTIVE associate, "last seen N
// days ago" tells a coach the pending is stale and can likely be cancelled.
function lastSeen(ms){
  const n = Number(ms);
  if(!n || isNaN(n)) return null;
  const d = new Date(n);
  if(isNaN(d)) return null;
  const mins = Math.floor((new Date() - d) / 60000);
  const date = d.toLocaleString("en-GB",{day:"2-digit",month:"short",hour:"2-digit",minute:"2-digit"});
  let rel, color;
  if(mins < 60)      { rel = `${mins}m ago`;                 color = "var(--text-muted)"; }
  else if(mins < 1440){ rel = `${Math.floor(mins/60)}h ago`; color = "var(--text-muted)"; }
  else {
    const days = Math.floor(mins/1440);
    rel = `${days}d ago`;
    color = days >= 3 ? "var(--red,#dc2626)" : days >= 1 ? "var(--orange,#d97706)" : "var(--text-muted)";
  }
  return {text:`Last seen ${rel}`, full:`Last seen ${date} (${rel})`, color};
}
function transcriptUrl(login){ return `https://guided-coaching-dub.corp.amazon.com/#/employee-transcript/${encodeURIComponent(String(login||"").trim())}`; }
function badgePhotoUrl(login){ return `https://badgephotos.amazon.com/?Region=Master&FullsizeImage=Yes&uid=${encodeURIComponent(String(login||"").trim())}`; }
function ts(){ return new Date().toLocaleTimeString("en-GB",{hour:"2-digit",minute:"2-digit",second:"2-digit"}); }
const $=id=>document.getElementById(id);

// ── Toast (small, ephemeral notifications) ─────────────────
// Stacks bottom-right. Each toast auto-dismisses after `ms`. Type drives
// the accent color: "ok" (green), "info" (accent), "warn" (orange),
// "err" (red). Caller can also pass a plain object {title, body, type, ms}.
function showToast(opts){
  if(typeof opts === "string") opts = { body: opts };
  // actionLabel + onAction add a clickable button (e.g. "Ver en GCA") that
  // runs onAction without the toast's click-to-dismiss swallowing it.
  const { title = "", body = "", type = "ok", ms = 3500, actionLabel = "", onAction = null } = opts || {};
  let host = document.getElementById("toastHost");
  if(!host){
    host = document.createElement("div");
    host.id = "toastHost";
    host.style.cssText = "position:fixed;right:20px;bottom:20px;z-index:9500;display:flex;flex-direction:column;gap:10px;pointer-events:none";
    document.body.appendChild(host);
  }
  const colors = {
    ok:   { bd: "#16a34a", bg: "rgba(22,163,74,.12)" },
    info: { bd: "var(--accent)", bg: "var(--accent-light)" },
    warn: { bd: "#f59e0b", bg: "rgba(245,158,11,.12)" },
    err:  { bd: "#dc2626", bg: "rgba(220,38,38,.12)" },
  };
  const c = colors[type] || colors.ok;
  const el = document.createElement("div");
  el.style.cssText = `pointer-events:auto;background:var(--bg-card);color:var(--text);border-left:3px solid ${c.bd};border-radius:8px;padding:12px 16px;min-width:240px;max-width:420px;box-shadow:0 12px 32px -8px rgba(0,0,0,.28),0 0 0 1px var(--border);font-size:13px;line-height:1.45;transform:translateX(20px);opacity:0;transition:transform .25s cubic-bezier(.2,.7,.2,1),opacity .25s`;
  el.innerHTML = (title ? `<div style="font-weight:600;margin-bottom:4px">${title}</div>` : "") +
                 `<div style="color:var(--text-secondary)">${body}</div>` +
                 (actionLabel ? `<div style="margin-top:8px"><button class="toast-action" style="background:${c.bd};color:#fff;border:none;padding:5px 12px;border-radius:5px;cursor:pointer;font-weight:600;font-size:12px">${actionLabel}</button></div>` : "");
  host.appendChild(el);
  // Trigger transition on next frame
  requestAnimationFrame(() => { el.style.transform = "translateX(0)"; el.style.opacity = "1"; });
  const close = () => {
    el.style.transform = "translateX(20px)";
    el.style.opacity = "0";
    setTimeout(() => el.remove(), 250);
  };
  if(actionLabel && onAction){
    const ab = el.querySelector(".toast-action");
    if(ab) ab.addEventListener("click", (e)=>{ e.stopPropagation(); close(); try{ onAction(); }catch(_){} });
  }
  el.addEventListener("click", close);
  setTimeout(close, ms);
}

// Animate a numeric KPI from its previous value to `target` over ~12 frames.
// Suffix is appended after the number (e.g. "%"). Idempotent — same value
// twice is a no-op.
function countUpKpi(id, target, suffix){
  const el = $(id); if(!el) return;
  suffix = suffix || "";
  const prev = parseInt(String(el.textContent).replace(/[^\d-]/g,""),10) || 0;
  const tgt  = Number(target) || 0;
  if(prev === tgt){ el.textContent = tgt + suffix; return; }
  const diff  = tgt - prev;
  const steps = Math.min(Math.abs(diff), 14);
  if(steps === 0){ el.textContent = tgt + suffix; return; }
  let step = 0;
  const iv = setInterval(() => {
    step++;
    if(step >= steps){
      el.textContent = tgt + suffix;
      clearInterval(iv);
    } else {
      el.textContent = Math.round(prev + diff * step / steps) + suffix;
    }
  }, 22);
}

// Debounce utility — delays fn execution until wait ms after last call
function _debounce(fn, wait){
  let timer;
  return function(){
    const ctx=this, args=arguments;
    clearTimeout(timer);
    timer=setTimeout(function(){ fn.apply(ctx, args); }, wait);
  };
}

// Station parse cache — avoids re-running regex on every render
const _stationParseCache = new Map();
function parsePerfStationCached(raw){
  if(!raw) return null;
  if(_stationParseCache.has(raw)) return _stationParseCache.get(raw);
  // parsePerfStation lives INSIDE the map closure — reach it via window (the map
  // exposes it as window.parsePerfStation). The old `typeof parsePerfStation` test
  // ran in the GLOBAL scope where the name is undefined, so it always returned
  // null and the GCA map came up empty. Use the window ref (with a bare-name
  // fallback for any scope where it IS visible).
  const _fn = (typeof window !== "undefined" && typeof window.parsePerfStation === "function")
    ? window.parsePerfStation
    : (typeof parsePerfStation === "function" ? parsePerfStation : null);
  const result = _fn ? _fn(raw) : null;
  if(result !== undefined) _stationParseCache.set(raw, result);
  return result;
}

// Physical floor of a dashboard row — delegates to the MAP's own station parser
// (window._floorOfStation, exposed from the map scope) so the PLANTA list-filter
// and the map agree by construction. NO separate/invented logic here: the map is
// the single source of truth for station→floor. Returns "" if the map util isn't
// ready yet or the station has no floor. (calvenpj 2026-07-24)
function _floorOfRow(r){
  const raw = (r && (r.stationRaw || r.station)) || "";
  if(!raw || typeof window._floorOfStation !== "function") return "";
  return window._floorOfStation(raw) || "";
}
// Floors present in the current data, ordered by the map's own floor list
// (window._getFloors → p1/p2/p3/p4 as defined in map_layouts.json for this FC),
// intersected with the floors that actually have associates today. So the filter
// only offers plants the map knows about AND that have data (P4 only when MAD7-
// style P4 data is loaded; BCN4 shows P1/P2/P3 as present).
function activeFloors(){
  const present = new Set();
  (state.all||[]).forEach(r=>{ const f=_floorOfRow(r); if(f) present.add(f); });
  // Order by the map's declared floor order when available; else sort.
  let order = [];
  try{ if(typeof window._getFloors === "function") order = window._getFloors().map(f=>f.id); }catch(_){}
  const ordered = order.filter(id=>present.has(id));
  // Include any present floor the layout didn't list (defensive), appended sorted.
  Array.from(present).sort().forEach(f=>{ if(!ordered.includes(f)) ordered.push(f); });
  return ordered;
}

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
  // Roster gives names as "Apellido,Nombre" — flip to "Nombre Apellido" for display.
  let name         = String(r.name??r.EmployeeName??"").trim();
  if(name.includes(",")){
    const [last, first] = name.split(",").map(s=>s.trim());
    if(first && last) name = `${first} ${last}`;
  }
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
  // AMZL only: per-associate target (Vet_AVG × curve Factor) and the site Vet baseline.
  const target     = (r.target!=null && r.target!=="") ? Number(r.target) : NaN;
  const vetAvg     = (r.vet_avg!=null && r.vet_avg!=="") ? Number(r.vet_avg) : NaN;

  // AMZL TPH Adjusted — the rate the associate WOULD have if their idle time
  // didn't count. idle_pct = idle hours / total hours (%), so removing idle:
  //   rate_adj = rate / (1 - idle_pct/100)   and   pct_adj = pct / (1 - idle_pct/100)
  // In AMZL the P1/P2/P3 flags + coaching are driven by the ADJUSTED %, so idle
  // time isn't held against the associate. No idle data (or FC site) -> no
  // adjustment, flags fall back to the raw rate/pct exactly as before.
  const _isAmzlRow = (typeof siteBL === "function") && siteBL(currentFC) === "AMZL";
  const _idlePctAdj = (r.idle_pct!=null && r.idle_pct!=="") ? Number(r.idle_pct) : null;
  const _idleFrac = (_isAmzlRow && _idlePctAdj!=null && Number.isFinite(_idlePctAdj)
                     && _idlePctAdj > 0 && _idlePctAdj < 100) ? (1 - _idlePctAdj/100) : null;
  const rateAdj = (Number.isFinite(rate) && _idleFrac) ? (rate / _idleFrac) : rate;
  const pctAdj  = (Number.isFinite(pct)  && _idleFrac) ? (pct  / _idleFrac) : pct;

  // Priority thresholds (driven by the ADJUSTED % in AMZL): P3:<80 | P2:80-90 | P1:90-100 | OK:>=100
  let prio = 0;
  if(Number.isFinite(pctAdj)){
    if(pctAdj < 80)  prio = 3;
    else if(pctAdj < 90)  prio = 2;
    else if(pctAdj < 100) prio = 1;
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

  const manager = String(r.manager??"").trim();
  // Pre-compute the lowercased search blob ONCE per row so the search
  // filter doesn't .toLowerCase() every cell on every keystroke.
  const _search = (login+" "+name+" "+role+" "+station+" "+dept+" "+cohort+" "+nhFlag).toLowerCase();
  const idle_pct = (r.idle_pct!=null && r.idle_pct!=="") ? Number(r.idle_pct) : null;
  const idle_min = (r.idle_min!=null && r.idle_min!=="") ? Number(r.idle_min) : null;
  const pending_coachings = Array.isArray(r.pending_coachings) ? r.pending_coachings : [];
  const newHire = !!r.new_hire;
  const daysSinceHire = (r.days_since_hire==null ? null : Number(r.days_since_hire));
  return{login,name,manager,dept,cohort,nhFlag,curve,homeProcess,tenure_wk,role,station,stationRaw,sigma,prio,coached,coached_label:String(r.coached_label??"").trim(),notes,rate,rateAdj,pct,pctAdj,target,vetAvg,course_id,employee_id,transcript_url,photo_url,pending_coachings,process:inferProcess(role),mode:Number(r.mode||0),is_priority:!!r.is_priority,newHire,daysSinceHire,idle_pct,idle_min,_search};
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
  // AMZL: include the idle-adjusted TPH (what the flag is based on) when it
  // actually differs from the raw rate, so the coaching note reflects it.
  if(row.rateAdj != null && Number.isFinite(row.rateAdj) && Math.round(row.rateAdj) !== Math.round(row.rate)){
    parts.push(`TPH Adj ${Math.round(row.rateAdj)}`);
  }
  const _pctNote = Number.isFinite(row.pctAdj) ? row.pctAdj : row.pct;
  if(_pctNote != null && Number.isFinite(_pctNote)) parts.push(`${_pctNote.toFixed(1)}% to Target`);

  // [Argos] tag at the END so every Argos-uploaded coaching is unambiguously
  // identifiable in Guided Coaching later (impact/ROI analysis filters on it —
  // cleaner than pattern-matching the "… Performance" prefix). Keep it last.
  parts.push("[Argos]");

  return parts.join(" | ");
}

// ── State ──────────────────────────────────────────────────
const state={
  all:[],
  prio:new Set(["3","2","1"]),
  hideCoached:false,
  coachedOnly:false,
  q:"",
  mgr:new Set(),      // multi-select: empty = ALL managers
  tenureSet:new Set(),// multi-select: empty = ALL tenure weeks
  // No default sorting. Sorting is applied only after user clicks a header.
  sortKey:"",
  sortAsc:true,
  maxRows:200,
  proc:new Set(),
  sub:new Set(),
  floor:new Set(),   // physical-floor filter (p1/p2/p3/p4). empty = ALL. calvenpj 2026-07-24
  curve:"ALL",
  priorityOnly:false,
  firstDaysOnly:false,   // trainer filter: only Day 1/Day 2 associates
  noteFilter:"",
};

// Tenure bands (by hours-in-process, from tenure_hours). Coaching-meaningful
// groups instead of raw weeks 1..60. XT/Veteran come from the curve; the NH
// week bands from tenure_wk. Order = display order in the multi-select.
const TENURE_BANDS = [
  {label:"NH 1-2",   test:r=> r.curve==="NH" && (parseInt(r.tenure_wk||0)>=1 && parseInt(r.tenure_wk||0)<=2)},
  {label:"NH 3-5",   test:r=> r.curve==="NH" && (parseInt(r.tenure_wk||0)>=3 && parseInt(r.tenure_wk||0)<=5)},
  {label:"NH 6-10",  test:r=> r.curve==="NH" && (parseInt(r.tenure_wk||0)>=6 && parseInt(r.tenure_wk||0)<=10)},
  {label:"Cross-Trainee", test:r=> r.curve==="XT"},
  {label:"Veteran",  test:r=> r.curve==="VETERAN"},
];
// Which band a row belongs to ("" if none matched → excluded when a band filter is active).
function tenureBandOf(r){
  for(const b of TENURE_BANDS){ if(b.test(r)) return b.label; }
  return "";
}

// ── Modals ─────────────────────────────────────────────────
const openModal =id=>$(id).classList.add("show");
const closeModal=id=>$(id).classList.remove("show");

// ── Close-coaching modal (Complete / Cancel) — shared by GCA, Performance,
//    Quality. Notes are MANDATORY for both actions (server enforces too).
let _ccCancelReasons = null;   // cached list from /api/coaching/cancel-reasons
let _ccCtx = null;             // {instance_id, fc, action, login, name, onDone}

async function _ccLoadReasons(){
  if(_ccCancelReasons) return _ccCancelReasons;
  try{
    const d = await jget(`${API}/api/coaching/cancel-reasons`);
    _ccCancelReasons = (d && d.reasons) || [];
  }catch(_){ _ccCancelReasons = []; }
  return _ccCancelReasons;
}

// After closing a coaching, neutralize its action buttons in place (no full
// reload). Finds every action button carrying this instance_id (GCA, Quality,
// Performance queues all use data-iid) and swaps the button cluster for a small
// "done" check. The row stays until the next natural data refresh.
function _markCoachingRowDone(instanceId, isCancel){
  if(!instanceId) return;
  const mark = isCancel
    ? `<span class="cc-done" style="font-size:11px;color:var(--text-secondary)" title="Cancelado — se actualizará en el próximo refresh">✗ cancelado</span>`
    : `<span class="cc-done" style="font-size:11px;color:var(--green,#059669)" title="Completado — se actualizará en el próximo refresh">✓ completado</span>`;
  // The action buttons across queues: cc-complete / cc-cancel / pending-close.
  const btns = document.querySelectorAll(
    `.cc-complete[data-iid="${CSS.escape(instanceId)}"],`+
    `.cc-cancel[data-iid="${CSS.escape(instanceId)}"],`+
    `.pending-close[data-iid="${CSS.escape(instanceId)}"]`);
  const handled = new Set();
  btns.forEach(b=>{
    // Replace the tightest button-group wrapper once per row.
    const group = b.closest("div") || b.parentElement;
    if(!group || handled.has(group)) return;
    handled.add(group);
    group.innerHTML = mark;
  });
}

// opts: {instanceId, fc, action:"complete"|"cancel", login, name, onDone}
// Path-mode CALM display in the close modal: purely informational. The code was
// already resolved (and logging happens on the CARD's Logar button, where the
// "Other" override lives), so here we just show which code was used, read-only.
// Passing "" clears/hides it.
function _renderPathCalmInfo(code){
  const box = $("cc-path-calm");
  if(!box) return;
  if(!code){ box.style.display = "none"; box.innerHTML = ""; return; }
  box.style.display = "";
  box.innerHTML =
      '<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">'
    +   '<span style="font-size:12px;color:var(--text-secondary)">Labor tracking (CALM):</span>'
    +   '<span style="font-size:12.5px;font-weight:800;color:var(--accent);background:var(--accent-light,rgba(59,130,246,.12));border:1px solid var(--accent-border,rgba(59,130,246,.35));border-radius:20px;padding:2px 10px">🎓 '+esc(code)+'</span>'
    +   '<span style="font-size:11px;color:var(--text-muted)">se registra desde la card «Logar»</span>'
    + '</div>';
}

async function openCloseCoaching(opts){
  const o = opts || {};
  // Closing a coaching (complete/cancel + writing notes) is allowed for ANY team
  // member, not just admins — Team Leads need to close and annotate coachings that
  // are open for them. The server already gates this at team-member level
  // (_require_access on /api/coaching/close), so the UI now matches that. Non-team
  // users never reach here (the whole app is behind team access).
  if(!o.instanceId){ showToast({title:"Error", body:"Sin instance_id — refresca GCA.", type:"err"}); return; }
  _ccCtx = o;
  const isCancel = o.action === "cancel";
  $("cc-title").textContent = isCancel ? "✗ Cancelar coaching" : "✓ Completar coaching";
  $("cc-who").innerHTML = `<b>${esc(o.name || o.login || "")}</b>${o.login ? " ("+esc(o.login)+")" : ""}`
    + (o.coachingLabel ? `<div style="font-size:12px;color:var(--text-secondary);margin-top:3px">📋 ${esc(o.coachingLabel)}</div>` : "")
    + (o.owner ? `<div style="font-size:12px;font-weight:700;margin-top:3px;color:var(--accent-text,#3730a3)">👤 Owner: ${esc(o.owner)}</div>` : "");
  $("cc-category-wrap").style.display = isCancel ? "none" : "";
  $("cc-reason-wrap").style.display   = isCancel ? "" : "none";
  $("cc-notes").value = "";
  $("cc-result").innerHTML = "";
  $("cc-notes-hint").textContent = isCancel
    ? "Las notas son obligatorias."
    : "Se enviará como: «N. <tus notas>» según la categoría.";
  const submit = $("cc-submit");
  submit.disabled = false; submit.style.opacity = "1";
  submit.textContent = isCancel ? "✗ Cancelar coaching" : "✓ Completar";

  // CALM labor-tracking box: only when completing (not cancelling) and we know
  // the associate's badge. The process drives which feed code gets logged.
  const calmWrap = $("cc-calm-wrap");
  if(calmWrap){
    const badge = String(o.badge || o.employee_id || "").replace(/\D/g,"");
    const proc  = String(o.process || o.role || "").trim();
    // From the Path we already know the official CALM code (wiki), so hide the
    // process picker but SHOW the code that will be used read-only, with an
    // "Other" toggle in case the coach needs a variation. `pathCalm` carries the
    // resolved code; the free-text "Other" box (cc-calm-code) still applies.
    if(o.hideCalm){
      calmWrap.style.display = "none";
      _renderPathCalmInfo(o.pathCalm || "");
    } else if(!isCancel && badge){
      _renderPathCalmInfo("");   // clear any path-mode CALM info from a prior open
      calmWrap.style.display = "";
      $("cc-calm-result").innerHTML = "";
      // Associate photo next to the CALM controls (login-based badge photo).
      const photoEl = $("cc-calm-photo");
      if(photoEl){
        const purl = o.photo_url || (o.login ? badgePhotoUrl(o.login) : "");
        photoEl.innerHTML = purl
          ? `<img src="${esc(purl)}" alt="${esc(o.login||"")}" loading="lazy" decoding="async" style="width:40px;height:40px;border-radius:50%;object-fit:cover" onerror="this.style.display='none'">`
          : "";
      }
      // Auto-detect the process from the coaching role/title and preselect it
      // in the dropdown; the coach can override (covers names we don't map,
      // e.g. "PPSingleMedium" -> STOW).
      const sel = $("cc-calm-process");
      if(sel) sel.value = guessCalmProcess(proc) || "STOW";
      // Reset the "Other" free-text CALM code (hidden unless re-selected).
      const codeWrap = $("cc-calm-code-wrap");
      if(codeWrap) codeWrap.style.display = "none";
      const codeInp = $("cc-calm-code");
      if(codeInp) codeInp.value = "";
      const hint = $("cc-calm-hint");
      if(hint) hint.textContent = `Verifica el proceso y pulsa «Logar AA»; usa «Deslogar» al terminar.`;
    } else {
      calmWrap.style.display = "none";
      _renderPathCalmInfo("");
    }
  }

  if(isCancel){
    const reasons = await _ccLoadReasons();
    const sel = $("cc-reason");
    sel.innerHTML = reasons.length
      ? reasons.map(r=>`<option value="${esc(r.value)}">${esc(r.label)}</option>`).join("")
      : `<option value="">(sin motivos configurados)</option>`;
  }
  openModal("modalCloseCoaching");
}

async function _ccSubmit(){
  if(!_ccCtx) return;
  const o = _ccCtx;
  const isCancel = o.action === "cancel";
  const notes = $("cc-notes").value.trim();
  // Notes mandatory — block here (server also enforces).
  if(!notes){
    $("cc-result").innerHTML = `<div style="color:var(--red,#dc2626);font-size:12px;margin-top:6px">Las notas son obligatorias para cerrar el coaching.</div>`;
    $("cc-notes").focus();
    return;
  }
  let payloadNotes = notes;
  let cancelReason = "";
  if(isCancel){
    cancelReason = $("cc-reason").value;
    if(!cancelReason){
      $("cc-result").innerHTML = `<div style="color:var(--red,#dc2626);font-size:12px;margin-top:6px">Selecciona un motivo de cancelación.</div>`;
      return;
    }
  } else {
    // Prefix the 1-5 category to the notes: "3. <notas>"
    const cat = $("cc-category").value || "1";
    payloadNotes = `${cat}. ${notes}`;
  }
  const submit = $("cc-submit");
  submit.disabled = true; submit.style.opacity = ".6";
  submit.textContent = "Enviando…";
  try{
    const r = await fetch(`${API}/api/coaching/close`, {
      method:"POST", headers:{"Content-Type":"application/json"},
      body: JSON.stringify({
        fc: o.fc || currentFC,
        instance_id: o.instanceId,
        action: o.action,
        notes: payloadNotes,
        cancel_reason: cancelReason,
      }),
    });
    const j = await r.json().catch(()=>({}));
    if(!r.ok || !j.ok){
      throw new Error((j && j.detail) || `HTTP ${r.status}`);
    }
    closeModal("modalCloseCoaching");
    showToast({title: isCancel?"Coaching cancelado":"Coaching completado",
               body: `${o.name || o.login || ""} · ${j.status}`, type:"ok"});
    // Instead of reloading ALL data, just neutralize THIS coaching's action
    // buttons in place — mark the row done until the next natural refresh.
    _markCoachingRowDone(o.instanceId, isCancel);
    if(typeof o.onDone === "function"){ try{ o.onDone(j); }catch(_){} }
  }catch(e){
    $("cc-result").innerHTML = `<div style="color:var(--red,#dc2626);font-size:12px;margin-top:6px">No se pudo cerrar: ${esc(e.message||String(e))}</div>`;
    submit.disabled = false; submit.style.opacity = "1";
    submit.textContent = isCancel ? "✗ Cancelar coaching" : "✓ Completar";
  }
}
window.openCloseCoaching = openCloseCoaching;

// CALM labor-tracking buttons inside the close-coaching modal.
// "Loguear proceso": logs the associate into the feed code for the process
// they were coached on. "STOP": ISTOP+MSTOP to exit coaching tracking.
async function _ccCalm(kind){
  if(!_ccCtx) return;
  const o = _ccCtx;
  const badge = String(o.badge || o.employee_id || "").replace(/\D/g,"");
  const res = $("cc-calm-result");
  if(!badge){ if(res) res.innerHTML = `<span style="color:var(--red,#dc2626)">Sin badge del asociado.</span>`; return; }
  const logBtn = $("cc-calm-log"), stopBtn = $("cc-calm-stop");
  const btn = kind==="stop" ? stopBtn : logBtn;
  const prevTxt = btn ? btn.textContent : "";
  if(btn){ btn.disabled = true; btn.style.opacity=".6"; btn.textContent = "Enviando…"; }
  try{
    const url  = kind==="stop" ? `${API}/api/coaching/calm-stop` : `${API}/api/coaching/calm-log`;
    // Use the (possibly coach-corrected) process from the dropdown.
    let proc = $("cc-calm-process")?.value || String(o.process||o.role||"");
    // "Other" → the coach types a raw CALM code (e.g. LNTRAIN) which the backend
    // uses verbatim (req.calm_code takes priority over the process→code mapping).
    let calmCode = "";
    if(proc === "__OTHER__"){
      calmCode = String($("cc-calm-code")?.value || "").trim().toUpperCase();
      if(kind !== "stop" && !calmCode){
        if(res) res.innerHTML = `<span style="color:var(--red,#dc2626)">Escribe el CALM code (ej. LNTRAIN).</span>`;
        if(btn){ btn.disabled=false; btn.style.opacity="1"; btn.textContent=prevTxt; }
        return;
      }
      proc = "";  // let calm_code drive it, not the process mapping
    }
    // Send the AA login so the server resolves the real badge BARCODE id (the
    // kiosk needs that, not the 9-digit employeeId). badge is a fallback.
    const aaLogin = String(o.login||"");
    const body = kind==="stop"
      ? { fc:o.fc||currentFC, login:aaLogin, badge }
      : { fc:o.fc||currentFC, login:aaLogin, badge, process:proc, calm_code:calmCode };
    const r = await fetch(url, {method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(body)});
    const j = await r.json().catch(()=>({}));
    if(!r.ok || !j.ok) throw new Error((j&&j.detail)||`HTTP ${r.status}`);
    if(res) res.innerHTML = kind==="stop"
      ? `<span style="color:var(--green,#16a34a)">⏸️ STOP enviado (ISTOP+MSTOP).</span>`
      : `<span style="color:var(--green,#16a34a)">🎓 Logueado en ${esc(j.calm_code||"")}.</span>`;
  }catch(e){
    if(res) res.innerHTML = `<span style="color:var(--red,#dc2626)">Error: ${esc(e.message||String(e))}</span>`;
  }finally{
    if(btn){ btn.disabled=false; btn.style.opacity="1"; btn.textContent=prevTxt; }
  }
}
$("cc-calm-log")?.addEventListener("click", ()=>_ccCalm("log"));
$("cc-calm-stop")?.addEventListener("click", ()=>_ccCalm("stop"));
// "Other" in the CALM process dropdown reveals a free-text CALM-code input.
$("cc-calm-process")?.addEventListener("change", (e)=>{
  const wrap = $("cc-calm-code-wrap");
  if(wrap) wrap.style.display = (e.target.value === "__OTHER__") ? "" : "none";
});

// Open the close flow from a Performance/Quality row that carries
// pending_coachings (from the GCA cache). Shows ONE popup listing each pending
// coaching with its course title + insight, each with Complete/Cancel buttons —
// so the coach always sees WHICH coaching they're closing.
function openCloseFromRow(pending, meta){
  const list = Array.isArray(pending) ? pending : [];
  if(!list.length){
    showToast({title:"Sin coachings pendientes", body:"Este asociado no tiene coachings pendientes para cerrar.", type:"info"});
    return;
  }
  const base = {fc: (meta&&meta.fc)||currentFC, login:(meta&&meta.login)||"", name:(meta&&meta.name)||"",
                badge:(meta&&(meta.badge||meta.employee_id))||"",
                employee_id:(meta&&meta.employee_id)||"",
                process:(meta&&(meta.process||meta.role))||"",
                role:(meta&&meta.role)||"",
                onDone:(meta&&meta.onDone)||null};
  const pickList = $("ccPickList");
  // Presence + last-seen banner (from any pending item — it's per-associate).
  // For an INACTIVE associate not seen in process for days, this signals the
  // coaching can likely be cancelled.
  const _pres = String((list.find(c=>c.presence)||{}).presence || "").toUpperCase();
  const _present = _pres === "ACTIVE" || _pres === "ON_SITE";
  const _ls = lastSeen((list.find(c=>c.last_seen_ms)||{}).last_seen_ms);
  let presBanner = "";
  if(!_present || _ls){
    const dot = _present ? "🟢" : "⚪";
    const lsTxt = _ls ? ` · <span style="color:${_ls.color};font-weight:700" title="${esc(_ls.full)}">${esc(_ls.text)}</span>` : "";
    const lbl = _pres === "ACTIVE" ? "In process now" : (_pres === "ON_SITE" ? "On site" : "Not in process");
    presBanner = `<div style="font-size:11.5px;margin-top:4px">${dot} ${lbl}${lsTxt}</div>`;
  }
  $("ccPickWho").innerHTML = `<b>${esc(base.name||base.login)}</b> · ${list.length} coaching${list.length>1?"s":""} pendiente${list.length>1?"s":""}${presBanner}`;
  pickList.innerHTML = list.map((c,i)=>{
    const insight = c.insight || c.course_title || c.reason || "Coaching";
    const course = c.course_title || "";
    const exp = coachingExpiry(c.expiration);
    // Owner = who is responsible for closing this coaching (from GCA LEGEND).
    // calvenpj 2026-07-24: "super important" — a Team Lead needs to know at a
    // glance whether a pending coaching is theirs to close.
    const owner = String(c.owner||"").trim();
    const ownerHtml = owner
      ? `<div style="display:inline-flex;align-items:center;gap:5px;margin-top:5px;padding:2px 9px;border-radius:999px;background:var(--accent-light,#eef2ff);border:1px solid var(--accent-border,#c7d2fe);font-size:11px;font-weight:700;color:var(--accent-text,#3730a3)" title="Owner responsable de cerrar este coaching / Owner responsible for closing this coaching">👤 Owner: ${esc(owner)}</div>`
      : "";
    return `
    <div style="padding:10px 12px;margin-bottom:8px;border:1px solid var(--border);border-radius:8px;background:var(--bg-card)">
      <div style="font-weight:700;font-size:15px;line-height:1.25">${esc(insight)}</div>
      ${course && course!==insight ? `<div style="font-size:11px;color:var(--text-secondary);margin-top:3px">${esc(course)}</div>` : ""}
      <div style="font-size:10px;color:var(--text-muted);margin-top:2px">${esc(c.scenario||"")}</div>
      ${ownerHtml}
      ${exp ? `<div style="font-size:11px;font-weight:700;color:${exp.color};margin-top:4px">⏳ ${esc(exp.text)}</div>` : ""}
      <div style="display:flex;gap:6px;margin-top:8px">
        <button class="row-btn cc-pick-complete" data-i="${i}">✓ Completar</button>
        <button class="row-btn cc-pick-cancel" data-i="${i}">✗ Cancelar</button>
      </div>
    </div>`;
  }).join("");
  const go = (i, action)=>{
    closeModal("modalCcPick");
    openCloseCoaching({...base, action, instanceId: list[i].id,
      coachingLabel: list[i].insight || list[i].course_title || "",
      owner: list[i].owner || ""});
  };
  pickList.querySelectorAll(".cc-pick-complete").forEach(b=>b.addEventListener("click",()=>go(Number(b.dataset.i),"complete")));
  pickList.querySelectorAll(".cc-pick-cancel").forEach(b=>b.addEventListener("click",()=>go(Number(b.dataset.i),"cancel")));
  openModal("modalCcPick");
}
window.openCloseFromRow = openCloseFromRow;

// ── Courses tab (read-only): which course is bound to each role / error ──────
// Windows stack (restored 2026-07-22): endpoint returns assignments with
// {kind,task,uuid,course_title,type,error_key?}; reuses _typeBadge/_uuidCell
// defined in the Course Catalog block above.
let _caData = null;   // [{kind,task,uuid,course_title,type,error_key?}]
window._onCoursesTab = async function(){
  const kEl = $("ca-kind"); if(kEl && !kEl._wired){ kEl._wired=true; kEl.addEventListener("change", _caRender); }
  const sEl = $("ca-search"); if(sEl && !sEl._wired){ sEl._wired=true; sEl.addEventListener("input", _caRender); }
  if(_caData === null){
    try{
      const d = await jget(`${API}/api/course-assignments`);
      _caData = d.assignments || [];
    }catch(e){
      const area=$("ca-area"); if(area) area.innerHTML=`<div class="cfg-loading" style="color:#e53e3e">Error: ${esc(e.message)}</div>`;
      _caData = []; return;
    }
  }
  _caRender();
};

function _caRender(){
  const area = $("ca-area"), status = $("ca-status");
  if(!area) return;
  const kind = ($("ca-kind") && $("ca-kind").value) || "all";
  const q = (($("ca-search") && $("ca-search").value) || "").trim().toLowerCase();
  let rows = (_caData||[]).slice();
  if(kind !== "all") rows = rows.filter(r => r.kind === kind);
  if(q) rows = rows.filter(r => String(r.task||"").toLowerCase().includes(q) || String(r.course_title||"").toLowerCase().includes(q));
  if(status) status.innerHTML = `${rows.length} asignaciones${(_caData||[]).length!==rows.length?` (de ${(_caData||[]).length})`:""}`;

  let html = `<table class="cfg-table"><thead><tr><th>Tarea</th><th>Curso asignado</th><th>Tipo</th><th>UUID</th></tr></thead><tbody>`;
  for(const r of rows){
    const icon = r.kind==="quality" ? "🎯" : "👤";
    const kindLbl = r.kind==="quality" ? "Quality" : "Performance";
    html += `<tr>
      <td style="font-weight:700;font-size:11px">${icon} ${esc(r.task||"")} <span style="font-size:9px;color:#888">${kindLbl}</span></td>
      <td style="font-size:11px">${esc(r.course_title||"—")}</td>
      <td>${_typeBadge(r.type||"manual")}</td>
      <td>${_uuidCell(r.uuid)}</td>
    </tr>`;
  }
  html += `</tbody></table>`;
  area.innerHTML = html;
  area.querySelectorAll(".cc-copy").forEach(b=>{
    b.addEventListener("click",()=>{ try{ navigator.clipboard.writeText(b.dataset.uuid); _cfgToast&&_cfgToast("UUID copiado"); }catch(_){}} );
  });
}

// ── Upload New Coaching (GCA tab) ──────────────────────────
// Pick a login, a coaching title/insight (course dropdown), and notes, then
// upload a brand-new manual coaching. Used to test with a trainer.
let _ncCourses = null;
async function _ncLoadCourses(){
  const sel = $("nc-course");
  if(!sel) return;
  if(_ncCourses){ return; }
  try{
    const d = await jget(`${API}/api/coaching/courses?fc=${encodeURIComponent(currentFC)}`);
    _ncCourses = (d && d.courses) || [];
  }catch(_){ _ncCourses = []; }
  if(!_ncCourses.length){ sel.innerHTML = `<option value="">(sin cursos — corre GCA primero)</option>`; return; }
  // Group options by category for a cleaner dropdown. The option value carries
  // the course_id directly so the upload doesn't depend on re-resolving a key.
  const byCat = {};
  _ncCourses.forEach(c=>{ const cat=c.category||"Otros"; (byCat[cat]=byCat[cat]||[]).push(c); });
  let html = `<option value="">— Selecciona coaching —</option>`;
  Object.keys(byCat).sort().forEach(cat=>{
    html += `<optgroup label="${esc(cat)}">`;
    byCat[cat].forEach(c=>{ html += `<option value="${esc(c.course_id)}" data-key="${esc(c.key)}">${esc(c.label)}</option>`; });
    html += `</optgroup>`;
  });
  sel.innerHTML = html;
}
async function openNewCoaching(){
  $("nc-login").value = "";
  $("nc-notes").value = "";
  $("nc-result").innerHTML = "";
  const submit = $("nc-submit");
  if(submit){ submit.disabled=false; submit.style.opacity="1"; submit.textContent="↑ Upload"; }
  await _ncLoadCourses();
  openModal("modalNewCoaching");
}
async function _ncSubmit(){
  const login = $("nc-login").value.trim();
  const logins = login.split(/[,\s]+/).filter(Boolean);
  const sel = $("nc-course");
  const courseId = sel.value;                              // option value = course_id
  const courseLabel = sel.options[sel.selectedIndex]?.text || "";
  const notes = $("nc-notes").value.trim();
  const res = $("nc-result");
  if(!logins.length){ res.innerHTML = `<span style="color:var(--red,#dc2626)">Login obligatorio.</span>`; $("nc-login").focus(); return; }
  if(!courseId){ res.innerHTML = `<span style="color:var(--red,#dc2626)">Selecciona un coaching title.</span>`; return; }
  if(!notes){ res.innerHTML = `<span style="color:var(--red,#dc2626)">Notas obligatorias.</span>`; $("nc-notes").focus(); return; }
  const submit = $("nc-submit");
  submit.disabled=true; submit.style.opacity=".6"; submit.textContent="Subiendo…";
  try{
    const r = await fetch(`${API}/api/coaching/upload-new`, {
      method:"POST", headers:{"Content-Type":"application/json"},
      body: JSON.stringify({ fc: currentFC, login, course_id: courseId, notes }),
    });
    const j = await r.json().catch(()=>({}));
    if(!r.ok || !j.ok) throw new Error((j&&j.detail)||`HTTP ${r.status}`);
    closeModal("modalNewCoaching");
    const n = j.count || logins.length;
    showToast({title:"Coaching subido", body:`${n} asociado${n>1?"s":""} · ${courseLabel}`, type:"ok"});
    if(window._loadGcaDashboard) window._loadGcaDashboard();
  }catch(e){
    res.innerHTML = `<span style="color:var(--red,#dc2626)">No se pudo subir: ${esc(e.message||String(e))}</span>`;
    submit.disabled=false; submit.style.opacity="1"; submit.textContent="↑ Upload";
  }
}
// Delegated: every ".btn-new-coaching" (Performance, Quality, GCA toolbars)
// opens the shared modal.
document.addEventListener("click", (e)=>{
  if(e.target.closest(".btn-new-coaching")) openNewCoaching();
});
$("nc-submit")?.addEventListener("click", _ncSubmit);
window.openNewCoaching = openNewCoaching;

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
// Persisted in localStorage so a post-pipeline reload skips the auth fetch.
let _authCache = (()=>{
  try{
    // v4: bumped to invalidate cached results from before team membership gate landed.
    try{ localStorage.removeItem("argos_auth_v3"); }catch(ex){}
    const raw = localStorage.getItem("argos_auth_v4");
    if(raw){ const p = JSON.parse(raw); if(p && p.date) return p; }
  }catch(ex){}
  return null;
})();

async function checkForUpdate(){
  // Non-blocking: if the server can't reach GitHub or returns an error,
  // we just hide the banner. Never throws to the user.
  try{
    const dismissed = (()=>{ try { return localStorage.getItem("argos_update_dismissed") || ""; } catch(_) { return ""; } })();
    const v = await jget(`${API}/api/system/version`);
    // Show the running version in the status bar regardless of whether an
    // update is available — useful for support ("¿qué versión tienes?").
    if(v && v.current){
      const el = document.getElementById("sbVersion");
      if(el) el.textContent = "v" + v.current;
    }
    if(!v || !v.update_available || !v.latest) return;
    if(dismissed === v.latest) return;  // user already dismissed this version
    const banner = document.createElement("div");
    banner.id = "updateBanner";
    banner.style.cssText = [
      "position:fixed","top:0","left:0","right:0","z-index:9000",
      "background:linear-gradient(90deg,#f59e0b,#d97706)",
      "color:#1a1a1a","font-family:'Segoe UI',sans-serif","font-size:13px",
      "font-weight:600","padding:8px 16px","display:flex",
      "align-items:center","justify-content:center","gap:14px",
      "box-shadow:0 2px 8px rgba(0,0,0,.4)",
    ].join(";");
    banner.innerHTML = `
      <span>${t("upd_available")} <b>v${v.latest}</b> (${t("upd_yours")} v${v.current}). ${t("upd_note")}</span>
      <button id="updateBannerApply" style="background:#1a1a1a;border:1px solid rgba(0,0,0,.4);color:#fef3c7;padding:5px 14px;border-radius:4px;cursor:pointer;font-weight:600">${t("upd_apply")}</button>
      <span id="updateBannerStatus" style="opacity:.9;font-weight:500"></span>
      <button id="updateBannerClose" style="background:rgba(0,0,0,.15);border:1px solid rgba(0,0,0,.25);color:#1a1a1a;padding:3px 10px;border-radius:4px;cursor:pointer;font-weight:600">&times;</button>
    `;
    document.body.appendChild(banner);
    document.body.style.paddingTop = (banner.offsetHeight + (parseInt(getComputedStyle(document.body).paddingTop) || 0)) + "px";
    document.getElementById("updateBannerClose").addEventListener("click", () => {
      try { localStorage.setItem("argos_update_dismissed", v.latest); } catch(_) {}
      banner.remove();
      document.body.style.paddingTop = "";
    });
    document.getElementById("updateBannerApply").addEventListener("click", async () => {
      const btn = document.getElementById("updateBannerApply");
      const status = document.getElementById("updateBannerStatus");
      btn.disabled = true;
      btn.style.opacity = ".6";
      btn.style.cursor = "default";
      status.textContent = t("upd_downloading");
      try{
        const r = await fetch(`${API}/api/system/apply-update`, {method:"POST"});
        const j = await r.json().catch(()=>({}));
        if(j && j.ok){
          status.textContent = t("upd_launching");
        } else {
          const msg = (j && j.error) ? j.error : t("upd_unknown");
          status.textContent = `${t("upd_failed")} ${msg} — ${t("upd_ask_fumanue")}`;
          btn.disabled = false;
          btn.style.opacity = "1";
          btn.style.cursor = "pointer";
        }
      } catch(ex){
        status.textContent = t("upd_no_server");
        btn.disabled = false;
        btn.style.opacity = "1";
        btn.style.cursor = "pointer";
      }
    });
  }catch(ex){
    // swallow — silent fallback
  }
}

// ── GCA background poll ────────────────────────────────────────
// Every 5 minutes, quietly re-run the GCA pipeline for the user's DEFAULT FC
// and check the pending-reactivo count. When a NEW pending HIGH_DEFECTS
// reactivo appears (count went up vs. last seen), alert the user: sound +
// in-app toast + Windows system notification, and jump to the GCA tab.
const GCA_POLL_MS = 15 * 60 * 1000;  // 15 min (aligned with Quality poll + map refresh)
let _gcaPollTimer = null;
let _gcaSeenHdIds = null;   // null = first run (baseline set, no alert)
// Timestamp (ms epoch) of the NEXT scheduled GCA/Quality poll, so the topbar
// can show a live countdown next to the Midway pill. null = not scheduled yet.
let _gcaNextRunAt = null;
let _qualityNextRunAt = null;

// Shared AudioContext. Browsers (incl. pywebview/Edge) block audio until the
// user has interacted with the page at least once — so we create/resume it on
// the first user gesture. Without this the very first beep can be silent.
let _audioCtx = null;
function _ensureAudioCtx(){
  try{
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if(!Ctx) return null;
    if(!_audioCtx) _audioCtx = new Ctx();
    if(_audioCtx.state === "suspended") _audioCtx.resume().catch(()=>{});
    return _audioCtx;
  }catch(_){ return null; }
}
// Prime audio on the first interaction (one-shot).
["click","keydown","pointerdown"].forEach(ev=>
  window.addEventListener(ev, _ensureAudioCtx, { once:true, passive:true }));

// Attention-grabbing alert chime via WebAudio (no asset file — survives the
// locked-down corp environment where loading an mp3 might be blocked).
// Loud, multi-pulse "siren" pattern so it's clearly an alert, not a blip.
function _playGcaBeep(){
  try{
    const ctx = _ensureAudioCtx();
    if(!ctx) return;
    // 3 rising two-tone pulses (≈1.4s total). square wave = more piercing.
    // Master gain via a compressor-free chain; per-pulse envelope peaks ~0.85.
    const pulses = [
      [784, 1047],   // G5 -> C6
      [880, 1175],   // A5 -> D6
      [988, 1319],   // B5 -> E6
    ];
    let t = ctx.currentTime + 0.01;
    pulses.forEach((pair)=>{
      pair.forEach((freq, j)=>{
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain); gain.connect(ctx.destination);
        osc.type = j === 0 ? "square" : "triangle";
        osc.frequency.value = freq;
        const t0 = t + j * 0.12;
        gain.gain.setValueAtTime(0.0001, t0);
        gain.gain.exponentialRampToValueAtTime(0.85, t0 + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.22);
        osc.start(t0);
        osc.stop(t0 + 0.24);
      });
      t += 0.42;   // gap between pulses
    });
  }catch(_){ /* audio not available — non-fatal */ }
}

// Windows system notification (useful when Argos is minimized). Falls back
// silently if the Notification API is unavailable or permission denied.
function _systemNotify(title, body){
  try{
    if(!("Notification" in window)) return;
    const fire = () => { try{ new Notification(title, { body }); }catch(_){} };
    if(Notification.permission === "granted") fire();
    else if(Notification.permission !== "denied"){
      Notification.requestPermission().then(p => { if(p === "granted") fire(); }).catch(()=>{});
    }
  }catch(_){ /* non-fatal */ }
}

// Format an associate's location for the alert: "Station · ProcessPath".
function _fmtReactivoLoc(it){
  const parts = [];
  if(it.station) parts.push(it.station);
  if(it.process_path) parts.push(it.process_path);
  return parts.join(" · ");
}

function _alertNewReactivo(newItems, fc){
  _playGcaBeep();
  const title = t("gca_new_title");
  const n = newItems.length;
  // Build a short body listing who + where (up to 3, then "+N more").
  const lines = newItems.slice(0, 3).map(it=>{
    const who = it.name || it.login || "—";
    const loc = _fmtReactivoLoc(it);
    return loc ? `${who} — 📍 ${loc}` : who;
  });
  const extra = n > 3 ? ` (+${n - 3})` : "";
  const body = `${tf("gca_new_body", { n, fc })}<br>${lines.join("<br>")}${extra}`;
  // Alert without yanking the user out of their current tab — offer a button
  // to jump to GCA instead of auto-switching.
  showToast({ title, body, type: "warn", ms: 14000,
    actionLabel: t("gca_view_btn"),
    onAction: ()=>{ try{ if(typeof switchTab === "function") switchTab("gca"); }catch(_){} } });
  // System notification (plain text, no HTML) — include first location.
  const notifBody = newItems.slice(0,3)
    .map(it=>{ const loc=_fmtReactivoLoc(it); return (it.name||it.login||"—")+(loc?` — ${loc}`:""); })
    .join("\n") + extra;
  _systemNotify(title, notifBody);
}

async function _gcaPollOnce(){
  // Schedule the NEXT tick's countdown up front (the interval is fixed at
  // GCA_POLL_MS regardless of how long this poll takes).
  _gcaNextRunAt = Date.now() + GCA_POLL_MS;
  // Poll the user's DEFAULT FC (not the currently-selected site) so the alert
  // is stable regardless of where they're browsing.
  const fc = (localStorage.getItem("argos-default-fc") || currentFC || "BCN4");
  try{
    const r = await fetch(`${API}/api/gca/poll?fc=${encodeURIComponent(fc)}`, { method:"POST" });
    const j = await r.json().catch(()=>({}));
    if(!j || !j.ok) return;
    const items = Array.isArray(j.hd_items) ? j.hd_items : [];
    const ids = new Set(items.map(it=>it.id).filter(Boolean));
    if(_gcaSeenHdIds === null){
      _gcaSeenHdIds = ids;   // first run: baseline, never alert
      return;
    }
    // Truly-new = ids not seen before (robust to count staying equal when one
    // closes and another opens).
    const fresh = items.filter(it=>it.id && !_gcaSeenHdIds.has(it.id));
    if(fresh.length){
      _alertNewReactivo(fresh, j.fc || fc);
    }
    _gcaSeenHdIds = ids;
  }catch(_){ /* network/auth blip — try again next tick */ }
}

function _startGcaBackgroundPoll(){
  // GCA no longer runs its own colliding interval — the master _autoExec timer
  // runs it in sequence (see _autoExecTick). This just arms that single timer.
  // (The first cold-start refresh is handled by the first-run queue below.)
  _armAutoExec();
}

// ── Quality background poll ────────────────────────────────────
// Every 10 minutes, quietly re-run the Quality pipeline for the user's DEFAULT
// FC and alert when an associate is >=2 Sigma AND present on site. Diffs by
// login so it only alerts on associates newly crossing the bar (not the same
// ones every tick). Fires from any tab (sound + toast + Windows notification).
const QUALITY_POLL_MS = 15 * 60 * 1000;  // 15 min
let _qualityPollTimer = null;
let _qualitySeenLogins = null;   // null = first run (baseline, no alert)

function _alertQualityFlagged(newItems, fc){
  _playGcaBeep();
  const title = t("qual_alert_title");
  const n = newItems.length;
  const lines = newItems.slice(0, 3).map(it=>{
    const who = it.login || "—";
    const sig = (it.sigma != null) ? `${it.sigma}σ` : "";
    const loc = [it.station, it.process].filter(Boolean).join(" · ");
    return `${who} ${sig}${loc ? ` — 📍 ${loc}` : ""}`;
  });
  const extra = n > 3 ? ` (+${n - 3})` : "";
  const body = `${tf("qual_alert_body", { n, fc })}<br>${lines.join("<br>")}${extra}`;
  showToast({ title, body, type: "warn", ms: 14000,
    actionLabel: t("qual_view_btn"),
    onAction: ()=>{ try{ openCoachQueue(fc); }catch(_){ if(typeof switchTab==="function") switchTab("quality"); } } });
  const notifBody = newItems.slice(0,3)
    .map(it=>{ const loc=[it.station,it.process].filter(Boolean).join(" · "); return `${it.login||"—"} ${it.sigma||""}σ${loc?` — ${loc}`:""}`; })
    .join("\n") + extra;
  _systemNotify(title, notifBody);
}

// AMZL (Delivery) has no Quality pipeline — only GCA alerts apply. True when
// the user is a delivery user OR the FC they'd poll is a Delivery Station.
function _isAmzlContext(){
  if(String(window._businessLine||"").toUpperCase() === "AMZL") return true;
  const fc = (localStorage.getItem("argos-default-fc") || currentFC || "");
  return (typeof siteBL === "function" && siteBL(fc) === "AMZL");
}

async function _qualityPollOnce(){
  // Delivery has no Quality: never poll it, and freeze the countdown (null) so
  // the pill hides the "Q" segment instead of showing a live timer.
  if(_isAmzlContext()){ _qualityNextRunAt = null; return; }
  _qualityNextRunAt = Date.now() + QUALITY_POLL_MS;
  const fc = (localStorage.getItem("argos-default-fc") || currentFC || "BCN4");
  try{
    const r = await fetch(`${API}/api/quality/poll?fc=${encodeURIComponent(fc)}`, { method:"POST" });
    const j = await r.json().catch(()=>({}));
    if(!j || !j.ok) return;
    const items = Array.isArray(j.flagged) ? j.flagged : [];
    const logins = new Set(items.map(it=>String(it.login||"").toLowerCase()).filter(Boolean));
    if(_qualitySeenLogins === null){
      _qualitySeenLogins = logins;   // first run: baseline, never alert
      return;
    }
    const fresh = items.filter(it=>{
      const lg = String(it.login||"").toLowerCase();
      return lg && !_qualitySeenLogins.has(lg);
    });
    if(fresh.length){
      _alertQualityFlagged(fresh, j.fc || fc);
    }
    _qualitySeenLogins = logins;
  }catch(_){ /* network/auth blip — retry next tick */ }
}

function _startQualityBackgroundPoll(){
  // Quality no longer runs its own colliding interval — the master _autoExec
  // timer runs it in sequence AFTER GCA (see _autoExecTick), so they never skip
  // each other on the server lock. This just arms that single timer.
  _armAutoExec();
  _startPollCountdownTicker();            // paint the topbar countdown pill
}

// ── Alert poll countdown pill (next to Midway) ─────────────────
// Shows a live "GCA 4m · Q 7m" countdown to the next background poll so the
// user knows the alerts are armed and when the next check fires. Updates every
// second. Only visible to alert-group members (the pill stays hidden until the
// polls are started by _applyAlertsAccess).
let _pollCountdownTimer = null;
function _fmtCountdown(ms){
  if(ms == null) return "—";
  const s = Math.max(0, Math.round(ms / 1000));
  if(s <= 0)   return t("poll_due");
  // Compact fixed-width "m:ss" so the pill never grows wide enough to push the
  // topbar action buttons off-screen (e.g. "9:46" instead of "9m 46s").
  const m = Math.floor(s / 60), rem = s % 60;
  return `${m}:${String(rem).padStart(2, "0")}`;
}
function _paintPollPill(){
  const pill = $("pollPill");
  if(!pill) return;
  const now = Date.now();
  const gMs = _gcaNextRunAt != null ? _gcaNextRunAt - now : null;
  const qMs = _qualityNextRunAt != null ? _qualityNextRunAt - now : null;
  // Alerts are opt-in: only show the countdown pill when at least one poll is
  // actually armed. If the user hasn't enabled any alert (both timers null),
  // hide it entirely — no armed poll means nothing to count down to.
  if(!window._canAlerts || (gMs == null && qMs == null)){ pill.style.display = "none"; return; }
  pill.style.display = "";
  const gEl = $("pollGca"), qEl = $("pollQuality");
  if(gEl){
    // GCA off (timer null): hide the GCA segment; else paint countdown.
    if(gMs == null){
      gEl.style.display = "none";
    }else{
      gEl.style.display = "";
      gEl.textContent = `${t("poll_gca")} ${_fmtCountdown(gMs)}`;
      gEl.classList.toggle("due", gMs <= 0);
    }
  }
  if(qEl){
    // Delivery (AMZL) has no Quality poll (_qualityNextRunAt stays null): hide
    // the "Q" segment entirely so the pill shows GCA only.
    if(qMs == null){
      qEl.style.display = "none";
    }else{
      qEl.style.display = "";
      qEl.textContent = `${t("poll_quality")} ${_fmtCountdown(qMs)}`;
      qEl.classList.toggle("due", qMs <= 0);
    }
  }
  pill.title = t("poll_tip");
}
function _startPollCountdownTicker(){
  if(_pollCountdownTimer) return;
  _paintPollPill();
  _pollCountdownTimer = setInterval(_paintPollPill, 1000);
}

// ── Per-user alert opt-in ──────────────────────────────────────
// Alerts (GCA reactivo + Quality) are OPT-IN per user, default OFF. Each user
// arms them independently from Settings so we never auto-gen for people who
// don't need it. Prefs persist in localStorage (survive reloads/relaunch).
// `_canAlerts` means "eligible to arm" (any team member); the two prefs below
// are the actual on/off switches.
function _alertPref(kind){
  // kind: "gca" | "quality". Default OFF (returns false) unless explicitly "1".
  try{ return localStorage.getItem(`argos_alert_${kind}`) === "1"; }catch(_){ return false; }
}
function _setAlertPref(kind, on){
  try{ localStorage.setItem(`argos_alert_${kind}`, on ? "1" : "0"); }catch(_){}
}

// Tear down a running poll so toggling OFF actually stops the auto-gen.
function _stopGcaBackgroundPoll(){
  if(_gcaPollTimer){ clearInterval(_gcaPollTimer); _gcaPollTimer = null; }
  _gcaNextRunAt = null;
  _maybeStopAutoExec();
}
function _stopQualityBackgroundPoll(){
  if(_qualityPollTimer){ clearInterval(_qualityPollTimer); _qualityPollTimer = null; }
  _qualityNextRunAt = null;
  _maybeStopAutoExec();
}

// Called on login and whenever a toggle flips: (re)arm or tear down each poll
// to match the user's saved prefs. `canAlerts` = eligible (member/admin).
function _applyAlertsAccess(canAlerts){
  window._canAlerts = !!canAlerts;
  // "Probar alertas" button retired — alerts are self-service now.
  const btn = $("btnTestAlerts");
  if(btn) btn.style.display = "none";
  // Reflect current prefs in the Settings toggles (if the popover exists).
  _syncAlertToggleUI();
  if(!canAlerts){
    _stopGcaBackgroundPoll();
    _stopQualityBackgroundPoll();
    _paintPollPill();
    return;
  }
  // GCA alerts
  if(_alertPref("gca")) _startGcaBackgroundPoll();
  else _stopGcaBackgroundPoll();
  // Quality auto-poll is TOGGLE-DRIVEN (Settings → Alertas → Quality). It runs
  // ONLY when the user opts in, so it never fires behind a Team Lead's back (the
  // calvenpj 2026-07-24 issue was that it ran for everyone by default — the fix
  // is to honour the toggle, not to force it off). ON → poll every 15 min; OFF →
  // never. The poll re-runs the Quality pipeline, so keep it opt-in.
  if(_alertPref("quality")) _startQualityBackgroundPoll();
  else _stopQualityBackgroundPoll();
  _startPollCountdownTicker();
  _paintPollPill();
}

// Flip one alert on/off from the Settings toggle and (re)apply immediately.
function _toggleAlert(kind, on){
  _setAlertPref(kind, on);
  // Alerts REQUIRE auto-data (owner: "no puedes tener alertas sin el auto update
  // de datos"). Turning an alert ON force-enables auto-data if it wasn't already.
  let forcedData = false;
  if(on && localStorage.getItem("argos_auto_data") !== "1"){
    _applyPerfAuto(true);   // turns on auto-data + arms the 15-min loop
    forcedData = true;
  }
  _applyAlertsAccess(window._canAlerts);
  const label = kind === "gca" ? "GCA" : "Quality";
  showToast({
    title: on ? `🔔 Alertas ${label} activadas` : `🔕 Alertas ${label} desactivadas`,
    body: on
      ? ((kind === "gca"
          ? "Recibirás aviso cuando aparezca un GCA reactivo (HIGH_DEFECTS) pendiente en tu FC."
          : "Recibirás aviso cuando un asociado cruce el umbral de Quality (≥2σ y presente en site).")
          + (forcedData ? " · Se activó también la Auto-actualización de datos (las alertas la necesitan)." : ""))
      : "Dejarás de recibir esta alerta.",
    type: "info", ms: 6000,
  });
}
window._toggleAlert = _toggleAlert;

// Paint the two Settings toggles to match saved prefs + eligibility.
function _syncAlertToggleUI(){
  const g = $("spAlertGca"), q = $("spAlertQuality"), row = $("spAlertsRow");
  // Not eligible → hide the whole alerts row.
  if(row) row.style.display = window._canAlerts ? "" : "none";
  if(g){ g.checked = _alertPref("gca"); g.disabled = !window._canAlerts; }
  if(q){
    q.checked = _alertPref("quality");
    // Quality alerts are meaningless on Delivery sites — disable + hint.
    const amzl = _isAmzlContext();
    q.disabled = !window._canAlerts || amzl;
    const qLbl = $("spAlertQualityLbl");
    if(qLbl) qLbl.style.opacity = amzl ? "0.5" : "";
  }
}
window._syncAlertToggleUI = _syncAlertToggleUI;

// ── Map auto-refresh (15 min, background) ──────────────────────────────
// Keeps the floor map fresh without a manual reload: every 15 min it re-pulls
// the GCA pending badges and, if the map tab is open, re-renders it so the
// image reflects the latest data. Runs in the background (armed at boot) so the
// map is already current when the user opens it. Never triggers a pipeline.
const MAP_REFRESH_MS = 15 * 60 * 1000;  // 15 min
let _mapRefreshTimer = null;
function _startMapAutoRefresh(){
  if(_mapRefreshTimer) return;
  _mapRefreshTimer = setInterval(()=>{
    try{ if(window._refreshMapGcaPending) window._refreshMapGcaPending(); }catch(_){}
    // If the map is on screen, re-render so the fresh badges/states show.
    try{ if(window._renderPerfMap && document.getElementById("panel-map")?.classList.contains("active")) window._renderPerfMap(); }catch(_){}
  }, MAP_REFRESH_MS);
}
_startMapAutoRefresh();

// (Removed the auto-run-on-startup: it could stall the boot. Instead the
// "Start Pipeline" button runs Performance and, on finish, kicks off GCA +
// Quality in the background — see the btnPipeline handler.)

// DEV/manual: force both polls to alert on whatever currently meets criteria,
// ignoring the "new since baseline" gate. Wired to a "Probar alerta" button.
async function testAlertsNow(){
  const fc = (localStorage.getItem("argos-default-fc") || currentFC || "BCN4");
  showToast({ title:"🔔 Probando alertas…", body:`Forzando GCA + Quality para ${fc}`, type:"info", ms:4000 });
  // GCA reactivos
  try{
    const r = await fetch(`${API}/api/gca/poll?fc=${encodeURIComponent(fc)}`, { method:"POST" });
    const j = await r.json().catch(()=>({}));
    const items = (j && Array.isArray(j.hd_items)) ? j.hd_items : [];
    if(items.length){ _alertNewReactivo(items, j.fc || fc); }
    else { showToast({ title:"GCA", body:"No hay HIGH_DEFECTS pendientes ahora.", type:"info", ms:5000 }); }
    if(j && j.ok) _gcaSeenHdIds = new Set(items.map(it=>it.id).filter(Boolean));
  }catch(e){ showToast({title:"GCA poll falló", body:String(e), type:"err"}); }
  // Quality
  try{
    const r = await fetch(`${API}/api/quality/poll?fc=${encodeURIComponent(fc)}`, { method:"POST" });
    const j = await r.json().catch(()=>({}));
    if(!r.ok){ showToast({title:"Quality poll", body:`HTTP ${r.status} — ¿endpoint desplegado?`, type:"err", ms:6000}); return; }
    const flagged = (j && Array.isArray(j.flagged)) ? j.flagged : [];
    if(flagged.length){ _alertQualityFlagged(flagged, j.fc || fc); }
    else { showToast({ title:"Quality", body:"Nadie ≥2σ presente ahora.", type:"info", ms:5000 }); }
    if(j && j.ok) _qualitySeenLogins = new Set(flagged.map(it=>String(it.login||"").toLowerCase()).filter(Boolean));
  }catch(e){ showToast({title:"Quality poll falló", body:String(e), type:"err"}); }
}
window.testAlertsNow = testAlertsNow;

// ── Midway status pill + YubiKey toast ─────────────────────────
// The pill polls /api/auth/midway-status every 10 minutes (read-only, never
// triggers mwinit). When the user clicks Run Pipeline we switch the poll to
// 1s so we can detect mwinit_active and show the YubiKey toast quickly.
const MIDWAY_POLL_SLOW_MS = 15 * 60 * 1000;  // 15 min
const MIDWAY_POLL_FAST_MS = 1000;
let _midwayPollTimer = null;
let _midwayPollMode  = "slow";

function fmtSecondsLeft(s){
  if(!s || s <= 0) return t("mw_seconds_expired");
  if(s < 60)            return Math.round(s) + "s";
  if(s < 60*60)         return Math.round(s/60) + " min";
  if(s < 60*60*24)      return Math.round(s/3600) + "h";
  return Math.round(s/86400) + "d";
}

function paintMidwayPill(d){
  const pill  = $("midwayPill");
  const label = $("midwayLabel");
  if(!pill || !label) return;
  if(!d){
    pill.dataset.state = "loading";
    label.textContent  = t("mw_label");
    pill.title         = t("mw_checking");
    return;
  }
  pill.dataset.state = d.state;
  if(d.state === "ok"){
    label.textContent = t("mw_label");
    pill.title        = tf("mw_active_in", {x: fmtSecondsLeft(d.seconds_left)});
  } else if(d.state === "expiring"){
    label.textContent = t("mw_label") + " " + fmtSecondsLeft(d.seconds_left);
    pill.title        = tf("mw_expiring_in", {x: fmtSecondsLeft(d.seconds_left)});
  } else if(d.state === "expired"){
    label.textContent = t("mw_expired");
    pill.title        = t("mw_expired_tip");
  } else {
    label.textContent = t("mw_no_auth");
    pill.title        = t("mw_no_auth_tip");
  }
}

function showMwinitToast(){
  const t = $("mwinitToast"); const o = $("mwinitOverlay");
  if(t) t.classList.remove("hidden");
  if(o) o.classList.remove("hidden");
}
function hideMwinitToast(){
  const t = $("mwinitToast"); const o = $("mwinitOverlay");
  if(t) t.classList.add("hidden");
  if(o) o.classList.add("hidden");
}

async function pollMidwayOnce(){
  try{
    const d = await jget(`${API}/api/auth/midway-status`);
    paintMidwayPill(d);
    if(d && d.mwinit_active) showMwinitToast(); else hideMwinitToast();
    updateOfflineBanner(d, true);
    return d;
  } catch(_){
    // The local server is unreachable — almost certainly the app is starting
    // up or shutting down. Don't paint offline banner here, the splash handles it.
    updateOfflineBanner(null, false);
    return null;
  }
}

// Renders/hides a subtle banner at the bottom of the screen when Midway has
// expired. The user keeps full read access to cached data; only network
// pulls (pipeline / GC upload) will fail. Auto-recovers as soon as the next
// poll sees a healthy cookie.
function updateOfflineBanner(midway, serverOk){
  const id = "offlineBanner";
  let el = document.getElementById(id);
  // Online if Midway is "ok" or "expiring". "missing" or "expired" = offline-ish.
  const midwayBad = midway && (midway.state === "missing" || midway.state === "expired");
  const browserOnline = navigator.onLine;
  const offline = !browserOnline || midwayBad;
  if(!offline){
    if(el) el.remove();
    return;
  }
  if(el) return;
  el = document.createElement("div");
  el.id = id;
  el.style.cssText = "position:fixed;left:0;right:0;bottom:0;z-index:8800;background:linear-gradient(90deg,#f59e0b,#d97706);color:#1a1a1a;font:600 12px 'Segoe UI',sans-serif;padding:8px 16px;display:flex;align-items:center;justify-content:center;gap:14px;box-shadow:0 -4px 16px rgba(0,0,0,.25)";
  const reason = !browserOnline ? t("off_no_network") : t("off_midway_expired");
  el.innerHTML = `<span>⚠ ${reason} — ${t("off_msg")}</span>`;
  document.body.appendChild(el);
}

// React to browser online/offline events too.
window.addEventListener("online",  () => updateOfflineBanner({state:"ok"}, true));
window.addEventListener("offline", () => updateOfflineBanner({state:"missing"}, true));

function startMidwayPoll(mode){
  // mode: "slow" (10 min) or "fast" (1 s). Idempotent.
  if(_midwayPollMode === mode && _midwayPollTimer) return;
  if(_midwayPollTimer){ clearInterval(_midwayPollTimer); _midwayPollTimer = null; }
  _midwayPollMode = mode;
  const interval = mode === "fast" ? MIDWAY_POLL_FAST_MS : MIDWAY_POLL_SLOW_MS;
  _midwayPollTimer = setInterval(pollMidwayOnce, interval);
}

// Switch to fast polling for `durationMs`, then back to slow. Used when the
// user clicks Run Pipeline so we catch mwinit_active flips quickly.
function midwayPollFast(durationMs){
  startMidwayPoll("fast");
  setTimeout(()=>{ startMidwayPoll("slow"); }, durationMs);
}

// Boot: paint immediately, start slow polling.
pollMidwayOnce();
startMidwayPoll("slow");

// ── Business line (AMZL Delivery Station vs FC) ─────────────────────────
// AMZL sites use a simplified Performance+FAQ view: no station column, no
// station map, no warehouse process filters. The view follows the SELECTED
// site (so an admin previewing a DS also gets the delivery view).
function siteBL(fc){
  const code = String(fc||"").toUpperCase();
  return (window._amzlSites || []).includes(code) ? "AMZL" : "FC";
}

function _addAmzlOptionsTo(sel, sites){
  if(!sel || !sites || !sites.length) return;
  const have = new Set(Array.from(sel.options).map(o=>o.value.toUpperCase()));
  let grp = sel.querySelector('optgroup[label="Delivery (AMZL)"]');
  if(!grp){
    grp = document.createElement("optgroup");
    grp.label = "Delivery (AMZL)";
    sel.appendChild(grp);
  }
  sites.forEach(code=>{
    if(have.has(code)) return;
    const o = document.createElement("option");
    o.value = code; o.textContent = code;
    grp.appendChild(o);
  });
}

function _populateAmzlSites(sites){
  // Topbar selector gets the DS list (the settings default-FC dropdown is gone —
  // the FC chosen up top is the default now).
  _addAmzlOptionsTo($("fcSelect"), sites);
}

// Toggle the AMZL view based on the currently selected site. Drives CSS via
// body[data-bl] and force-hides the station map.
function _applySiteBL(){
  const bl = siteBL(currentFC);
  document.body.setAttribute("data-bl", bl.toLowerCase());
  if(bl === "AMZL"){
    if(window._hidePerfMap) window._hidePerfMap();
    if($("tabMap")) $("tabMap").style.display = "none";   // no station map for DS
    // Delivery (AMZL) doesn't use Exempt or Shift Tracker — hide both the
    // toolbar buttons and the Shift Tracker tab.
    if($("btnExempt")) $("btnExempt").style.display = "none";
    if($("btnShiftTracker")) $("btnShiftTracker").style.display = "none";
    if($("tabShiftTracker")) $("tabShiftTracker").style.display = "none";
    // Delivery has no Quality/Map: if the user is sitting on a now-hidden tab,
    // bounce them back to Performance so they don't stare at a blank panel.
    const activeTab = document.querySelector('.t-tab.on');
    const at = activeTab ? activeTab.getAttribute("data-tab") : "";
    if((at === "quality" || at === "shifttracker" || at === "map") && typeof switchTab === "function"){
      switchTab("dashboard");
    }
  } else {
    // FC site: Map tab is available to everyone (member or admin).
    if($("tabMap")) $("tabMap").style.display = "";       // FC site: map tab back
    if(window._isAdmin){
      // Restore the AMZL-hidden admin controls when switching back to an FC site.
      if($("btnExempt")) $("btnExempt").style.display = "none";   // moved into Settings tab (owner 2026-08-05)
      // Shift Tracker retired — intentionally NOT restored (btn/tab stay hidden).
    }
  }
}
window._applySiteBL = _applySiteBL;

async function loadUserInfo(){
  const dot  = $("userDot");
  const name = $("userName");
  const role = $("userRole");

  dot.className    = "t-user-dot loading";
  name.textContent = "…";
  role.textContent = t("auth_verifying");

  const today = new Date().toISOString().slice(0,10);
  if(_authCache && _authCache.date === today){
    const d = _authCache.data;
    const u = d.user || {};
    name.textContent = (u.login || "—") + "@";
    role.textContent = "";
    dot.className = "t-user-dot";
    window._userLogin = u.login || "";
    // Business line (cached path) — never let a BL error hang the spinner.
    try{
      window._amzlSites    = (d.amzl_sites || []).map(s=>String(s).toUpperCase());
      window._businessLine = String(d.business_line || "FC").toUpperCase();
      _populateAmzlSites(window._amzlSites);
      if(window._businessLine === "AMZL" && window._amzlSites.length &&
         !window._amzlSites.includes(String(currentFC).toUpperCase())){
        currentFC = window._amzlSites[0];
        const sel = $("fcSelect"); if(sel) sel.value = currentFC;
        $("sbFc") && ($("sbFc").textContent = currentFC);
      }
      _applySiteBL();
    }catch(blErr){ console.error("BL apply (cached) failed:", blErr); }
    if(d.permissions) _applyPermissions(d.permissions);
    // Quality + GCA + Map + Settings tabs: visible to everyone (member or admin).
    // Everyone now SEES the same tabs incl. Settings (config) in read-only; only
    // EDITING config is admin (owner 2026-08-05). Map hidden for AMZL via
    // _applySiteBL. multi-site push/exempt-write stay admin-only.
    if($("tabQuality")) $("tabQuality").style.display = "";
      if($("tabCaptain")) $("tabCaptain").style.display = "";
    if($("tabGca")) $("tabGca").style.display = "";
    if($("tabMap")) $("tabMap").style.display = "";   // _applySiteBL hides it for DS
    if($("tabConfig")) $("tabConfig").style.display = "";   // Settings tab: all users (read-only unless admin)
    // Restore admin state from cache
    if(d.admin && d.admin.is_admin){
      window._isAdmin = true;
      window._isSuperAdmin = d.admin.is_super_admin || false;
      document.body.classList.add("is-admin");
      if($("btnExempt")) $("btnExempt").style.display = "none";   // moved into Settings tab (owner 2026-08-05)
      // Shift Tracker retired — button + tab stay hidden (code left inert).
      if($("btnQualityMulti")) $("btnQualityMulti").style.display = "inline-flex";
      if($("tabConfig")) $("tabConfig").style.display = "";
    } else {
      if($("btnQualityMulti")) $("btnQualityMulti").style.display = "none";
    }
    _unblockUI();
    _applyAlertsAccess(d.can_alerts);
    return;
  }

  _blockUI("", true);  // spinner while checking

  try{
    const d = await jget(`${API}/api/auth/me`);
    _authCache = { date: today, data: d };
    try{ localStorage.setItem("argos_auth_v4", JSON.stringify(_authCache)); }catch(ex){}
    const u = d.user || {};
    const login = u.login || "—";

    name.textContent = login + "@";
    role.textContent = "";
    dot.className    = "t-user-dot";
    window._userLogin = login;
    $("userPill").title = login;

    // Business line: AMZL (Delivery Station) vs FC. amzl_sites lets the UI
    // decide per-selected-site which view to show; business_line is the user's
    // own line (drives default site for delivery trainers). Wrapped so a BL
    // error can never hang the login spinner.
    try{
      window._amzlSites    = (d.amzl_sites || []).map(s=>String(s).toUpperCase());
      window._businessLine = String(d.business_line || "FC").toUpperCase();
      _populateAmzlSites(window._amzlSites);
      // Delivery trainers: if their saved site is an FC, jump to their first DS.
      if(window._businessLine === "AMZL" && window._amzlSites.length &&
         !window._amzlSites.includes(String(currentFC).toUpperCase())){
        currentFC = window._amzlSites[0];
        const sel = $("fcSelect"); if(sel) sel.value = currentFC;
        $("sbFc") && ($("sbFc").textContent = currentFC);
      }
      _applySiteBL();
    }catch(blErr){ console.error("BL apply (live) failed:", blErr); }

    // Apply tab/feature permissions from server
    if(d.permissions) _applyPermissions(d.permissions);

    // Admin badge & multi-site
    if(d.admin && d.admin.is_admin){
      window._isAdmin = true;
      window._isSuperAdmin = d.admin.is_super_admin || false;
      document.body.classList.add("is-admin");
      const badge = document.createElement("span");
      badge.className = "admin-badge";
      badge.textContent = d.admin.is_super_admin ? "⚡ SUPER ADMIN" : "★ ADMIN";
      $("userPill")?.appendChild(badge);
      // Show multi-site button in Quality
      if($("btnQualityMulti")) $("btnQualityMulti").style.display = "inline-flex";
      // Show Config tab
      if($("tabConfig")) $("tabConfig").style.display = "";
      // Show beta tabs (Quality, GCA, Map)
      if($("tabQuality")) $("tabQuality").style.display = "";
      if($("tabCaptain")) $("tabCaptain").style.display = "";
      if($("tabGca")) $("tabGca").style.display = "";
      if($("tabMap")) $("tabMap").style.display = "";   // _applySiteBL hides it for DS
    } else {
      // Non-admin: Quality + GCA + Map + Settings are open to any Coaching team
      // member (single-site only — multi-site stays admin). Settings shows in
      // READ-ONLY for non-admins (only admins can edit config). Map hidden for
      // AMZL via _applySiteBL, not by role.
      if($("tabQuality")) $("tabQuality").style.display = "";
      if($("tabCaptain")) $("tabCaptain").style.display = "";
      if($("tabGca")) $("tabGca").style.display = "";
      if($("tabMap")) $("tabMap").style.display = "";   // _applySiteBL hides it for DS
      if($("tabConfig")) $("tabConfig").style.display = "";   // Settings: read-only for non-admin
      if($("btnQualityMulti")) $("btnQualityMulti").style.display = "none";
    }
    // Non-AMZL sites: make sure Map isn't left hidden from a prior DS session.
    if(window._applySiteBL) window._applySiteBL();
    // Alerts (GCA reactivo + Quality) run only for the curated alerts group.
    _applyAlertsAccess(d.can_alerts);

    _unblockUI();

  }catch(e){
    const raw = e.message || String(e);
    // Parse HTTP status if present (jget throws "401: …" or "403: …")
    const status = parseInt(raw.match(/^(\d{3})/)?.[1] || "0");
    const is401  = status === 401 || raw.includes("No tienes acceso");
    const is403  = status === 403 || raw.includes("habilitado");

    dot.className    = "t-user-dot error";
    name.textContent = t("auth_no_access");
    role.textContent = t("auth_contact");

    if(is401 || is403){
      // Hard block — explicit permission denial
      _blockUI(t("auth_no_access_block"));
    } else {
      // Soft error (network / server issue) — show warning but don't block
      _blockUI(
        t("auth_verify_error") + "<br>" +
        `<span style="font-size:12px;color:#aaa">${raw.slice(0,120)}</span>`
      );
    }
  }
}

document.addEventListener("DOMContentLoaded", function() {

document.querySelectorAll("[data-close]").forEach(el=>
  el.addEventListener("click",()=>closeModal(el.dataset.close))
);
$("cc-submit") && $("cc-submit").addEventListener("click", _ccSubmit);
document.querySelectorAll(".modal-overlay").forEach(el=>
  el.addEventListener("click",e=>{ if(e.target===el) el.classList.remove("show"); })
);

// ── Tab switching ──────────────────────────────────────────
function switchTab(name){
  document.querySelectorAll(".t-tab").forEach(t=>t.classList.toggle("on",t.dataset.tab===name));
  document.querySelectorAll(".tab-panel").forEach(p=>p.classList.toggle("active",p.id==="panel-"+name));
  // Show filter bar only on Performance tab
  const infobar = document.querySelector(".t-infobar");
  if(infobar) infobar.style.display = (name === "dashboard") ? "" : "none";
  if(name==="history") loadHistory();
  if(name==="targets") loadTargets();
  if(name==="quality") loadQuality();
  if(name==="faq") _initFaq();
  if(name==="gca" && window._loadGcaDashboard) window._loadGcaDashboard();
  if(name==="courses" && window._onCoursesTab) window._onCoursesTab();
  if(name==="shifttracker" && window._onShiftTrackerTab) window._onShiftTrackerTab();
  if(name==="map" && window._onMapTab) window._onMapTab();
  if(name==="captain" && window._onCaptainTab) window._onCaptainTab();
  // GCA station-map FAB/popup: only lives on the GCA tab. Show the FAB when
  // entering GCA (if the popup isn't already open); hide FAB + popup elsewhere.
  if(window._updateGcaFabVisibility) window._updateGcaFabVisibility();
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
  _persistDefaultFc(currentFC);   // the FC chosen up top becomes the default
  if(window._applySiteBL) window._applySiteBL();
  if(window._reloadMapLayout) window._reloadMapLayout(currentFC);
  loadShifts().then(()=>loadDashboard());

});

$("shiftSelect") && $("shiftSelect").addEventListener("change",()=>{
  currentShift=$("shiftSelect").value;
  _refreshInfoBarDates();
  loadDashboard();
});

// ── Manual time toggle ──────────────────────────────────
(function(){
  const btnMT  = $("btnManualTime");
  const mtWrap = $("manualTimeWrap");
  if(!btnMT) return;
  const shiftWrap = $("shiftWrap");
  btnMT.addEventListener("click", ()=>{
    manualTimeMode = !manualTimeMode;
    // Manual mode: hide shift selector, show time inputs in its place
    if(mtWrap)     mtWrap.classList.toggle("on", manualTimeMode);
    if(shiftWrap)  shiftWrap.style.display = manualTimeMode ? "none" : "flex";
    btnMT.classList.toggle("manual-active", manualTimeMode);
    btnMT.title = manualTimeMode ? "Modo manual activo — click para volver a turno" : "Modo manual de hora";
    if(manualTimeMode){
      // datetime-local needs YYYY-MM-DDTHH:MM (local time, not UTC).
      const now = new Date();
      const pad = n => String(n).padStart(2,"0");
      const local = `${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}`;
      const mS  = $("manualStart"), mE = $("manualEnd");
      if(mS && !mS.value) mS.value = local;
      if(mE && !mE.value) mE.value = local;
    }
  });
})();

// ── Delivery (AMZL) mode toggle ─────────────────────────
// Explicit button: jumps to a Delivery Station (switching the dashboard to the
// AMZL view) and back to the last FC. Delivery always needs a manual range, so
// it also turns manual time mode on.
(function(){
  const btn = $("btnDeliveryMode");
  if(!btn) return;
  let _lastFcSite = null;  // remember the FC to return to
  btn.addEventListener("click", ()=>{
    const sites = window._amzlSites || [];
    if(!sites.length){ console.warn("No delivery stations available"); return; }
    const inDelivery = siteBL(currentFC) === "AMZL";
    if(!inDelivery){
      _lastFcSite = currentFC;
      // Jump to the first DS (or the saved default if it's a DS).
      const target = sites.includes(String(currentFC).toUpperCase()) ? currentFC : sites[0];
      _switchSite(target);
      if(!manualTimeMode && $("btnManualTime")) $("btnManualTime").click();  // delivery uses a manual range
    }else{
      _switchSite(_lastFcSite || localStorage.getItem("argos-default-fc") || "BCN4");
    }
    btn.classList.toggle("manual-active", siteBL(currentFC)==="AMZL");
  });
})();

// Switch the selected site programmatically (mirrors the fcSelect change path).
function _switchSite(code){
  if(!code) return;
  currentFC = code;
  currentShift = "";
  const sel = $("fcSelect"); if(sel) sel.value = code;
  $("sbFc") && ($("sbFc").textContent = code);
  $("ul-fc") && ($("ul-fc").value = code);
  $("bulk-fc") && ($("bulk-fc").value = code);
  // Persist only FC sites as the default — the Delivery (AMZL) jump is a
  // temporary view, not the user's home FC.
  if(siteBL(code) !== "AMZL") _persistDefaultFc(code);
  if(window._applySiteBL) window._applySiteBL();
  if(window._reloadMapLayout) window._reloadMapLayout(code);
  loadShifts().then(()=>loadDashboard());
}

// The FC selected in the topbar IS the default — persisted silently to both
// localStorage (instant next-launch) and prefs (server-side). No settings
// dropdown, no star button: one source of truth, less to confuse the user.
function _persistDefaultFc(code){
  if(!code) return;
  localStorage.setItem("argos-default-fc", code);
  jpost(`${API}/api/prefs`, {default_fc: code}).catch(()=>{});
}

async function loadShifts(){
  const sel=$("shiftSelect");
  if(!sel) return;
  try{
    const d=await jget(`${API}/api/shifts?fc=${encodeURIComponent(currentFC)}`);
    sel.innerHTML=`<option value="">Auto-detect</option>`;
    // A restored/user-picked shift wins over auto-detect. Verify it still
    // exists for this FC (shifts differ per site) before honoring it.
    const _hasPicked = currentShift && (d.shifts||[]).some(s=>s.key===currentShift);
    if(currentShift && !_hasPicked) currentShift = "";  // stale for this FC
    (d.shifts||[]).forEach(s=>{
      const opt=document.createElement("option");
      opt.value=s.key;
      opt.textContent=s.label;
      if(_hasPicked ? (s.key===currentShift) : (s.is_current && !currentShift)) opt.selected=true;
      sel.appendChild(opt);
    });
    if(!currentShift && d.current){ currentShift=""; }
    // Update info bar with FCLM dates
    _updateInfoBar(d.start_full, d.end_full);
  }catch(e){ console.warn("loadShifts error",e); }
}

function _updateInfoBar(startFull, endFull){
  const el=$("infoFclmDates");
  if(el && startFull && endFull){
    el.textContent = `${startFull} → ${endFull}`;
  }
}

async function _refreshInfoBarDates(){
  try{
    const shift = currentShift || "";
    const d = await jget(`${API}/api/shift?fc=${encodeURIComponent(currentFC)}&shift=${encodeURIComponent(shift)}`);
    _updateInfoBar(d.start_full, d.end_full);
  }catch(e){ console.warn("_refreshInfoBarDates error",e); }
}

// ── Process / Subprocess (checkbox multi-select) ────────────
function msSetOpen(msId, open){
  const root=$(msId);
  if(!root) return;
  // Close all others first
  if(open){
    ["procMs","subMs","mgrMs","tenureMs"].forEach(id=>{
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
  ["procMs","subMs","mgrMs","tenureMs"].forEach(id=>msSetOpen(id,false));
}
document.addEventListener("click",(e)=>{
  const t=e.target;
  if(!t.closest("#procMs") && !t.closest("#subMs") && !t.closest("#mgrMs") && !t.closest("#tenureMs")) msCloseAll();
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

  // Only offer subprocess roles that ACTUALLY appear in today's data — never the
  // full fixed group list. Before, picking "Stow" always showed every role in
  // PROCESS_GROUPS.STOW (incl. the stale QUANTITY_STOYW typo) even when nobody
  // worked it today, so the filter listed phantom subprocesses. Build the set of
  // roles present in state.all first, then intersect the group's roles with it.
  const presentRoles = new Set();
  state.all.forEach(r=>{ const rr=String(r.role||"").toUpperCase(); if(rr && rr!=="—") presentRoles.add(rr); });

  if(procSet.size===0 || procSet.size>=ALL_PROCS_COUNT){
    presentRoles.forEach(r=>roles.add(r));
  }else{
    for(const p of procSet){
      if(p==="ICQA"){
        presentRoles.forEach(r=>{ if(r.includes("ICQA")) roles.add(r); });
      }else{
        (PROCESS_GROUPS[p]||[]).forEach(v=>{ const vu=String(v).toUpperCase(); if(presentRoles.has(vu)) roles.add(vu); });
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
  // AMZL (Delivery) uses ONE process filter (its Roles ARE the processes:
  // Stow / ADTA Stow / Pick & Stage) and no Sub — so offer the delivery roles
  // present in the data directly. FC keeps the grouped PACK/PICK/… keys, and
  // only the groups that actually have associates today (activeProcessGroups).
  const isAmzl = (typeof siteBL === "function" && siteBL(currentFC) === "AMZL");
  let procOptions;
  if(isAmzl){
    const roles = new Set();
    (state.all||[]).forEach(r=>{ if(r.role && r.role!=="—") roles.add(r.role); });
    procOptions = Array.from(roles).sort();
  }else{
    procOptions = activeProcessGroups();
  }

  msRender("procMs", procOptions, (state.proc instanceof Set)? state.proc : new Set(), (newSet)=>{
    state.proc = newSet;     // empty = ALL
    state.sub  = new Set();  // reset to ALL
    if(!isAmzl) buildSubprocessOptions();
    renderAll();
  });

  const btn=$("procMsBtn");
  if(btn) btn.onclick=()=>msSetOpen("procMs", !msIsOpen("procMs"));
  const btn2=$("subMsBtn");
  if(btn2) btn2.onclick=()=>msSetOpen("subMs", !msIsOpen("subMs"));

  // Manager multi-select: options = distinct ManagerName present in the data.
  const mgrNames = new Set();
  (state.all||[]).forEach(r=>{ const m=String(r.manager||"").trim(); if(m) mgrNames.add(m); });
  const mgrOptions = Array.from(mgrNames).sort((a,b)=>a.localeCompare(b));
  msRender("mgrMs", mgrOptions, (state.mgr instanceof Set)? state.mgr : new Set(), (newSet)=>{
    state.mgr = newSet;
    renderAll();
  });
  const mBtn=$("mgrMsBtn");
  if(mBtn) mBtn.onclick=()=>msSetOpen("mgrMs", !msIsOpen("mgrMs"));

  // Tenure multi-select: coaching-meaningful BANDS by hours-in-process, not raw
  // weeks (roster tenure goes up to 60+ → a per-week list is unusable). Bands:
  // 1-2 / 3-5 / 6-10 (new-hire ramp), plus XT (cross-trainee) and Veteran.
  const twBandOptions = TENURE_BANDS.map(b=>b.label);
  msRender("tenureMs", twBandOptions, (state.tenureSet instanceof Set)? state.tenureSet : new Set(), (newSet)=>{
    state.tenureSet = newSet;
    renderAll();
  });
  const tBtn=$("tenureMsBtn");
  if(tBtn) tBtn.onclick=()=>msSetOpen("tenureMs", !msIsOpen("tenureMs"));

  // "First days" trainer toggle: show ONLY if there's a Day 1 or Day 2 associate
  // in the current data (owner: appears if and only if there are day-1/day-2).
  const _fdBtn=$("toggleFirstDays");
  if(_fdBtn){
    const hasFirstDays=(state.all||[]).some(r=>r.daysSinceHire!=null && r.daysSinceHire>=1 && r.daysSinceHire<=2);
    _fdBtn.style.display = hasFirstDays ? "" : "none";
    if(!hasFirstDays && state.firstDaysOnly){   // data no longer has any → reset
      state.firstDaysOnly=false;
      _fdBtn.classList.remove("active");
      const ic=$("firstDaysIcon"); if(ic) ic.textContent="○";
    }
  }

  // PLANTA filter (FC-only): one toggle button per floor present in the data.
  if(!isAmzl) renderFloorFilter();
}

// Paint the PLANTA (physical floor) filter buttons — one per floor with data,
// toggle behaviour matching the PRIO buttons. Drops any selected floor that no
// longer has data so the filter can't get stuck on an empty plant. Hidden when
// there's 0/1 floor (a single-plant view needs no filter). calvenpj 2026-07-24.
function renderFloorFilter(){
  const host=$("floorFilterBtns");
  if(!host) return;
  const floors=activeFloors();               // e.g. ["p2","p3","p4"]
  // Prune stale selections (floor filtered out by a data change / FC switch).
  if(state.floor instanceof Set){
    for(const f of Array.from(state.floor)) if(!floors.includes(f)) state.floor.delete(f);
  }
  if(floors.length<=1){ host.innerHTML=""; host.style.display="none"; if(state.floor) state.floor.clear(); return; }
  host.style.display="inline-flex";
  host.innerHTML=floors.map(f=>{
    const num=f.replace(/[^0-9]/g,"")||f;
    const on=state.floor.has(f);
    return `<button class="pf${on?" on":""}" data-floor="${esc(f)}" title="Planta ${esc(num)}">P${esc(num)}</button>`;
  }).join("");
  host.querySelectorAll("[data-floor]").forEach(b=>{
    b.onclick=()=>{
      const f=b.dataset.floor;
      if(state.floor.has(f)) state.floor.delete(f); else state.floor.add(f);
      b.classList.toggle("on", state.floor.has(f));
      renderAll();
    };
  });
}
// ── KPI ────────────────────────────────────────────────────
function syncKpiActive(){
  document.querySelectorAll("[data-f]").forEach(t=>{
    const f=t.dataset.f;
    const active=
      (f==="priority"&&state.priorityOnly)||
      (f==="coached"&&state.coachedOnly)||
      (f==="all"&&["3","2","1","0"].every(p=>state.prio.has(p))&&!state.coachedOnly&&!state.priorityOnly)||
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
        state.coachedOnly=false; state.priorityOnly=false; state.prio=new Set(["3","2","1","0"]);
         
      }else if(f==="coached"){
        state.coachedOnly=true; state.priorityOnly=false; state.prio=new Set(["3","2","1","0"]);
        state.hideCoached=false;
        $("toggleCoached").classList.remove("active");
        $("coachToggleIcon").textContent="○";
         
      }else if(f==="priority"){
        state.priorityOnly=!state.priorityOnly;
        state.coachedOnly=false;
        state.prio=new Set(["3","2","1","0"]);
        
        
      }else{
        state.coachedOnly=false; state.priorityOnly=false;
         
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

function getFiltered(opts){
  opts=opts||{};
  let rows=state.all.slice();
  // Priority filter uses legacy priority ONLY (skipped when map asks for on-target)
  if(!opts.ignorePrio) rows=rows.filter(r=>state.prio.has(rowSigmaBucket(r.prio)));
  if(state.coachedOnly) rows=rows.filter(r=>r.coached);
  if(state.hideCoached) rows=rows.filter(r=>!r.coached);
  // Priority mode filter (Sigma >= Mode)
  if(state.priorityOnly) rows=rows.filter(r=>r.is_priority);
  // Trainer filter: only associates in their first days (Day 1 / Day 2).
  if(state.firstDaysOnly) rows=rows.filter(r=>r.daysSinceHire!=null && r.daysSinceHire>=1 && r.daysSinceHire<=2);
  // Note type filter
  if(state.noteFilter){
    const nf = state.noteFilter.toUpperCase();
    rows = rows.filter(r => {
      const notes = (r.notes||[]).join(" ").toUpperCase();
      if(nf === "GAP") return /GAP/i.test(notes);
      if(nf === "IDLE") return /IDLE|UNPRODUCTIVE/i.test(notes);
      if(nf === "UPA") return /UPA/i.test(notes);
      if(nf === "OOWA") return /OOWA|OWAA/i.test(notes);
      if(nf === "NSTA") return /NSTA|TURNAWAY|UNITS PER|TOTE|FACE/i.test(notes);
      if(nf === "FAST START") return /FAST\s*START|H[12]/i.test(notes);
      if(nf === "MIX") return /MIX\s*SHARE|SMALL.*%/i.test(notes);
      return notes.includes(nf);
    });
    // Sort by worst KPI value first (extract number from matching note)
    rows.sort((a,b) => {
      const _extractVal = (r) => {
        const notes = (r.notes||[]).join(" ");
        let m;
        if(nf === "GAP") { m = notes.match(/Gap[:\s]*(\d+\.?\d*)%/i); return m ? parseFloat(m[1]) : 0; }
        if(nf === "IDLE") { m = notes.match(/IDLE[:\s]*(\d+\.?\d*)%/i); return m ? parseFloat(m[1]) : 0; }
        if(nf === "OOWA") { m = notes.match(/OOWA[:\s]*(\d+\.?\d*)/i); return m ? parseFloat(m[1]) : 0; }
        if(nf === "UPA") { m = notes.match(/UPA[:\s]*(\d+\.?\d*)/i); return m ? -parseFloat(m[1]) : 0; } // lower UPA = worse
        if(nf === "NSTA") { m = notes.match(/(\d+\.?\d*)\s*\(target/i); return m ? -parseFloat(m[1]) : 0; } // lower = worse
        if(nf === "MIX") { m = notes.match(/Small\s+(\d+\.?\d*)%/i); return m ? -parseFloat(m[1]) : 0; } // lower small% = worse
        return 0;
      };
      return _extractVal(b) - _extractVal(a); // descending (worst first)
    });
  }
  // Curve filter (NH / XT / VETERAN)
  if(state.curve && state.curve !== "ALL"){
    rows = rows.filter(r => String(r.curve||"").toUpperCase() === state.curve.toUpperCase());
  }
  // Tenure BAND filter (multi-select). Empty Set = ALL; "__none__" = nothing.
  if(state.tenureSet instanceof Set && state.tenureSet.size){
    if(state.tenureSet.has("__none__")) rows=[];
    else rows = rows.filter(r => state.tenureSet.has(tenureBandOf(r)));
  }
  // __none__ sentinel = user blanked the filter → show nothing for that dimension
  const _isAmzlView = (typeof siteBL === "function" && siteBL(currentFC) === "AMZL");
  if(state.proc instanceof Set && state.proc.has("__none__")){
    rows=[];
  } else if(_isAmzlView && state.proc instanceof Set && state.proc.size){
    // AMZL: the single process filter holds exact delivery Roles, so match by
    // role directly (no PACK/PICK grouping).
    rows=rows.filter(r=>state.proc.has(r.role));
  } else if(!_isAmzlView){
    rows=rows.filter(r=>roleMatchesProcess(r.role,state.proc));
  }
  // Sub filter is FC-only (AMZL has no subprocess dimension).
  if(!_isAmzlView){
    if(state.sub instanceof Set && state.sub.has("__none__")){
      rows=[];
    } else if(state.sub instanceof Set && state.sub.size){
      rows=rows.filter(r=>state.sub.has(r.role));
    }
  }
  // Floor filter (FC-only) — keep rows on the selected physical plant(s). Empty
  // set = ALL. Rows whose station has no parseable floor are kept only when no
  // floor is selected (they can't be attributed to a plant). calvenpj 2026-07-24.
  if(!_isAmzlView && state.floor instanceof Set && state.floor.size){
    rows=rows.filter(r=>state.floor.has(_floorOfRow(r)));
  }
  if(state.q){
    const q=state.q.toLowerCase();
    // Multi-token AND search: "stow 2327" matches a row containing both.
    const tokens = q.split(/\s+/).filter(Boolean);
    rows=rows.filter(r=>{
      const blob = r._search || "";
      for(let i=0;i<tokens.length;i++) if(!blob.includes(tokens[i])) return false;
      return true;
    });
  }
  // Dedicated "by manager" multi-select (requested by managers): matches exact
  // ManagerName. Empty Set = ALL; "__none__" sentinel = user blanked it → nothing.
  if(state.mgr instanceof Set && state.mgr.size){
    if(state.mgr.has("__none__")) rows=[];
    else rows=rows.filter(r=>state.mgr.has(String(r.manager||"").trim()));
  }
  // No default ranking by performance: the table is NOT auto-sorted worst-first.
  // Sorting is applied ONLY when the user explicitly clicks a column header
  // (state.sortKey). This keeps the tool a neutral coaching-triage view rather
  // than a ranked leaderboard of associates.
  const k=state.sortKey;
  if(k){
    rows.sort((a,b)=>{
      let va=a[k],vb=b[k];
      if(typeof va==="string"){va=va.toLowerCase();vb=String(vb??"").toLowerCase();}
      const cmp=va<vb?-1:va>vb?1:0;
      return state.sortAsc?cmp:-cmp;
    });
  }
  return{rows: opts.noLimit ? rows : rows.slice(0,state.maxRows), total:rows.length};
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
    renderEmptyState(
      state.all.length ? t("empty_no_records") : t("empty_no_data_fc"),
      state.all.length ? t("empty_try_widen") : t("empty_run_pipeline")
    );
    return;
  }

  tb.innerHTML=rows.map((r,ri)=>{
    const pr=badgeCls(r.prio);
    const prLbl=prioLabel(r.prio);

    // Rate — just the number, no label (header says "Rate")
    const rateCell=Number.isFinite(r.rate)
      ?`<span class="td-rate">${Math.round(r.rate)}</span>`
      :`<span style="color:var(--text-dim)">—</span>`;

    // TPH Adjusted (AMZL only) — rate with idle time removed: rate / (1 - idle%).
    // This is what drives the P1/P2/P3 flags in AMZL. When there's no idle data
    // it equals the raw rate (shown muted so it's clear no adjustment applied).
    const _adjusted = Number.isFinite(r.rateAdj) && Number.isFinite(r.rate) && Math.round(r.rateAdj) !== Math.round(r.rate);
    const tphAdjCell=Number.isFinite(r.rateAdj)
      ? `<span class="td-rate${_adjusted?' tph-adj':''}" title="TPH sin idle = Rate ÷ (1 − idle%)${r.idle_pct!=null?` · idle ${Number(r.idle_pct).toFixed(1)}%`:''}${_adjusted?` · rate real ${Math.round(r.rate)}`:' · sin idle, = rate'}">${Math.round(r.rateAdj)}</span>`
      : `<span style="color:var(--text-dim)">—</span>`;

    // Target (AMZL only) — Vet_AVG × Factor, the rate expected of THIS associate.
    // Tooltip shows the site veteran average it derives from.
    const targetCell=Number.isFinite(r.target)
      ?`<span class="td-target" title="AVG Vet Rate del turno: ${Number.isFinite(r.vetAvg)?Math.round(r.vetAvg):'—'}">${Math.round(r.target)}</span>`
      :`<span style="color:var(--text-dim)">—</span>`;

    // Vet Rate (AMZL only) — the site veteran-average baseline (100% reference).
    const vetRateCell=Number.isFinite(r.vetAvg)
      ?`<span class="td-target" title="AVG rate de los veteranos en turno (baseline 100%)">${Math.round(r.vetAvg)}</span>`
      :`<span style="color:var(--text-dim)">—</span>`;

    // % to Vet Rate (AMZL only) — associate rate vs the veteran baseline, no
    // curve adjustment (harsher than % to Target, which is curve-adjusted).
    const vetPct=(Number.isFinite(r.rate)&&Number.isFinite(r.vetAvg)&&r.vetAvg>0)
      ? (r.rate/r.vetAvg*100) : NaN;
    let vetPctCell=`<span style="color:var(--text-dim)">—</span>`;
    if(Number.isFinite(vetPct)){
      const c=vetPct<65?"c-bad":vetPct<90?"c-warn":"c-ok";
      vetPctCell=`<span class="td-pct ${c}">${vetPct.toFixed(1)}%</span>`;
    }

    // % to Target — colour coded, no label. Uses the ADJUSTED % so it stays
    // consistent with the P1/P2/P3 flag (which is idle-adjusted in AMZL).
    // pctAdj === pct when there's no idle adjustment (all FC rows), so FC is
    // unchanged. Tooltip surfaces the raw % when they differ.
    const _pctShown = Number.isFinite(r.pctAdj) ? r.pctAdj : r.pct;
    let pctCell=`<span style="color:var(--text-dim)">—</span>`;
    if(Number.isFinite(_pctShown)){
      const c=_pctShown<65?"c-bad":_pctShown<90?"c-warn":"c-ok";
      const stroke=_pctShown<65?"#c0392b":_pctShown<90?"#f59e0b":"#16a34a";
      const pctClamped=Math.min(100,Math.max(0,_pctShown));
      const dash=(pctClamped/100)*44; // circumference = 2*PI*7 ≈ 44
      const _pctDiff = Number.isFinite(r.pct) && Math.abs(_pctShown - r.pct) >= 0.1;
      const _tip = _pctDiff ? ` title="Ajustado por idle · % crudo ${r.pct.toFixed(1)}%"` : "";
      pctCell=`<span class="td-pct ${c}"${_tip} style="display:inline-flex;align-items:center;gap:4px">
        <svg width="16" height="16" viewBox="0 0 16 16"><circle cx="8" cy="8" r="7" fill="none" stroke="#e5e7eb" stroke-width="2"/><circle cx="8" cy="8" r="7" fill="none" stroke="${stroke}" stroke-width="2" stroke-dasharray="${dash.toFixed(1)} 44" stroke-linecap="round" transform="rotate(-90 8 8)"/></svg>
        ${_pctShown.toFixed(1)}%</span>`;
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
        cls = "note-row " + (Number.isFinite(small) ? (small < 55 ? "note-mix-risk" : small < 65 ? "note-mix-warn" : "note-mix-ok") : "note-mix-ok");
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
        return ""; // Skip quality notes in Performance view
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
      ?`<img src="${esc(r.photo_url)}" alt="${esc(r.login)}" loading="lazy" decoding="async" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">`
      :"";

    return`<tr class="${r.coached?"coached-row":""}">
      <td class="td-assoc">
        <div class="photo-wrap">
          <div class="photo-cell">
            ${photoHtml}
            <div class="no-photo" style="${r.photo_url?"display:none":""}">?</div>
            ${r.is_priority?'<span class="prio-badge" title="Priority (Sigma ≥ Mode)">⚡</span>':""}
          </div>
          <div class="ident">
            <div class="ident-id">
              <span class="login-name">${esc(r.login||"—")}</span>
              ${r.name?`<span class="assoc-name">${esc(r.name)}</span>`:""}
              ${r.newHire?`<span class="newhire-badge" title="Primeros días — excluido de flags de coaching / First days — excluded from coaching flags">🆕 Day ${r.daysSinceHire||1}</span>`:""}
            </div>
            <div class="ident-links">
              <a class="fclm-link" href="${(siteBL(currentFC)==="AMZL"
                  ?`https://fclm-portal.amazon.com/employee/ppaTimeDetails?warehouseId=${encodeURIComponent(currentFC)}&employeeId=${encodeURIComponent(r.employee_id||"")}`
                  :`https://fclm-portal.amazon.com/employee/timeDetails?warehouseId=${encodeURIComponent(currentFC)}&employeeId=${encodeURIComponent(r.employee_id||"")}`)}" target="_blank" rel="noopener">📋 FCLM</a>
              <a class="fclm-link" href="${esc(r.transcript_url)}" target="_blank" rel="noopener">📝 GCA</a>
            </div>
          </div>
        </div>
      </td>
      <td class="bl-fc-only" title="${esc(r.manager||"")}"><span class="td-manager">${esc(r.manager||"—")}</span></td>
      <td class="bl-fc-only"><span class="td-dept">${esc(r.dept)}</span></td>
      <td class="bl-fc-only"><span class="td-dept">${esc(r.cohort||"—")}</span>${(()=>{
        if(r.curve==="VETERAN") return '<div class="curve-label curve-vet">VET</div>';
        if(r.curve==="XT") return `<div class="curve-label curve-xt">XT T${r.tenure_wk}${r.homeProcess?' ('+esc(r.homeProcess)+')':''}</div>`;
        if(r.curve==="NH"&&r.tenure_wk) return `<div class="curve-label curve-nh">NH T${r.tenure_wk}</div>`;
        return r.nhFlag?`<div class="curve-label curve-nh">${esc(r.nhFlag)}</div>`:'';
      })()}</td>
      <td class="bl-amzl-only">${(()=>{
        const lc = esc(r.nhFlag||"LC1");
        const cls = (r.curve==="VETERAN") ? "curve-vet" : "curve-nh";
        return `<div class="curve-label ${cls}">${lc}</div>`;
      })()}</td>
      <td><span class="role-badge">${esc(r.role)}</span></td>
      <td class="bl-fc-only" title="${esc(r.stationRaw||r.station)}"><span class="td-station">${esc(r.station)}</span></td>
      <td><span class="pr ${pr}">${esc(prLbl)}</span></td>
      <td>${rateCell}</td>
      <td class="bl-amzl-only">${tphAdjCell}</td>
      <td class="bl-amzl-only">${vetRateCell}</td>
      <td class="bl-amzl-only">${vetPctCell}</td>
      <td class="bl-amzl-only">${targetCell}</td>
      <td>${pctCell}</td>
      <td class="td-notes bl-fc-only">${notesHtml}</td>
      <td class="bl-amzl-only">${(()=>{
        if(r.idle_pct==null) return '<span class="notes-empty">—</span>';
        const m = (r.idle_min!=null) ? ` · ${Math.round(r.idle_min)} min` : "";
        const warn = r.idle_pct>=20 ? ' style="color:var(--red,#e53e3e);font-weight:700"' : "";
        return `<span${warn}>${r.idle_pct.toFixed(1)}%${m}</span>`;
      })()}</td>
      <td>${r.coached?(r.coached_label?`<span class="coached-chk" title="Último coaching">${esc(r.coached_label)}</span>`:`<span class="coached-chk"><span class="chk-circle">✓</span></span>`):""}</td>
      <td>
        <div style="display:flex;gap:4px;align-items:center">
          <button class="row-btn" data-upload-login="${esc(r.login)}">↑ Upload</button>
          ${(r.pending_coachings && r.pending_coachings.length)
            ? (()=>{
                // Soonest expiry across this associate's pending coachings (data
                // already present — no extra call), shown in the button tooltip.
                const exps = r.pending_coachings.map(c=>c.expiration).filter(Boolean).sort();
                const exp = exps.length ? coachingExpiry(exps[0]) : null;
                const tip = `Cerrar coaching pendiente (${r.pending_coachings.length})${exp?` — ${exp.text}`:""}`;
                return `<button class="row-btn cc-row-close" data-ri="${ri}" title="${esc(tip)}">✓/✗${r.pending_coachings.length>1?" ("+r.pending_coachings.length+")":""}</button>`;
              })()
            : ""}
        </div>
      </td>
    </tr>`;
  }).join("");

  tb.querySelectorAll("[data-hist-login]").forEach(a=>
    a.addEventListener("click",e=>{ e.preventDefault(); openAssocHistory(a.dataset.histLogin); })
  );
  tb.querySelectorAll("[data-upload-login]").forEach(btn=>
    btn.addEventListener("click",()=>openUploadPrefill(btn.dataset.uploadLogin))
  );
  // Close-coaching from a Performance row: open the popup listing each pending
  // coaching (title+insight) with its own Complete/Cancel buttons.
  tb.querySelectorAll(".cc-row-close").forEach(btn=>
    btn.addEventListener("click",()=>{
      const r = rows[Number(btn.dataset.ri)];
      if(!r) return;
      openCloseFromRow(r.pending_coachings, {
        fc: currentFC, login: r.login, name: r.name,
        employee_id: r.employee_id, badge: r.employee_id,
        process: r.process || r.role, role: r.role,
        // No full reload — _markCoachingRowDone neutralizes the row's action in
        // place; the coached state refreshes on the next natural pipeline/refresh.
        onDone: null,
      });
    })
  );
}

// ── KPI counts ─────────────────────────────────────────────
function updateKpis(){
  const rows = state.all || [];
  const total = rows.length;

  // Single pass over state.all — replaces 10+ separate filter calls
  let c3=0,c2=0,c1=0,c0=0,co=0;
  let c3ld=0,c3ops=0,c2ld=0,c2ops=0,c1ld=0,c1ops=0;
  for(let i=0;i<rows.length;i++){
    const r=rows[i];
    const p=Number(r.prio);
    const d=String(r.dept||"").trim().toUpperCase();
    const ld=d==="L&D"||d==="L AND D"||d==="LND"||d==="LD";
    const ops=d==="OPS";
    if(p>=3){c3++;if(ld)c3ld++;if(ops)c3ops++;}
    else if(p===2){c2++;if(ld)c2ld++;if(ops)c2ops++;}
    else if(p===1){c1++;if(ld)c1ld++;if(ops)c1ops++;}
    else c0++;
    if(r.coached) co++;
  }

  const _set = (id, v) => { const el=$(id); if(el) el.textContent=String(v); };

  // Count-up animation — reflow triggered via rAF to avoid forced layout in loop
  const _setKpi = (numId, barId, value) => {
    const el=$(numId); if(!el) return;
    const prev=parseInt(el.textContent)||0;
    if(prev!==value){
      const diff=value-prev, steps=Math.min(Math.abs(diff),12);
      let step=0;
      const iv=setInterval(()=>{
        step++;
        el.textContent=String(Math.round(prev+(diff*step/steps)));
        if(step>=steps){
          el.textContent=String(value);
          clearInterval(iv);
          // rAF ensures reflow happens outside the interval tick
          requestAnimationFrame(()=>{
            el.classList.remove("updated");
            requestAnimationFrame(()=>{ el.classList.add("updated"); setTimeout(()=>el.classList.remove("updated"),400); });
          });
        }
      },20);
    }
    const bar=$(barId);
    if(bar&&total>0) bar.style.width=Math.round((value/total)*100)+"%";
  };

  _setKpi("n3","bar3",c3);
  _setKpi("n2","bar2",c2);
  _setKpi("n1","bar1",c1);
  _setKpi("n0","bar0",c0);
  _setKpi("nCo","barCo",co);
  _set("nAll",total);
  _set("n3ld",c3ld); _set("n3ops",c3ops);
  _set("n2ld",c2ld); _set("n2ops",c2ops);
  _set("n1ld",c1ld); _set("n1ops",c1ops);
  // Priority count (Sigma >= Mode)
  const prioCount = rows.filter(r => r.is_priority).length;
  _setKpi("nPrio","barPrio",prioCount);
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
  if(window._renderPerfMap) window._renderPerfMap();
  if(window._loadPprRates) window._loadPprRates();
}

// ── Download CSV ───────────────────────────────────────────
$("btnDownloadCSV").addEventListener("click",async()=>{
  const btn = $("btnDownloadCSV");
  btn.disabled = true;
  btn.textContent = "Exporting…";
  try{
    const {rows} = getFiltered();
    if(!rows.length){ _csvToast(t("empty_no_visible_rows")); return; }
    const payload = rows.map(r=>({
      "Login":    r.login,
      "Role":     r.role,
      "Station":  r.stationRaw||r.station,
      "Dept":     r.dept,
      "Cohort":   r.cohort||"",
      "NH_Flag":  r.nhFlag||"",
      "Rate":     Number.isFinite(r.rate)?String(Math.round(r.rate)):"",
      "TPH_Adjusted": Number.isFinite(r.rateAdj)?String(Math.round(r.rateAdj)):"",
      "% to Target": Number.isFinite(r.pctAdj)?r.pctAdj.toFixed(1):(Number.isFinite(r.pct)?r.pct.toFixed(1):""),
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
    _csvToast(`${tf("csv_saved", {n: rows.length})}\n${savedPath || "Coaching_csv/"}`);
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
          ${photoUrl?`<img src="${esc(photoUrl)}" alt="${esc(login)}" loading="lazy" decoding="async" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">`:``}
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
// When ON, clicking the Opportunities card filters the TABLE to σ≥2 (the same
// set the cards measure). Toggle off to show everyone again (dive-deep).
let qOnlyOpportunities = false;
// When ON, the Anomalías card filters the TABLE to associates with errors dated
// after their last coaching (rc_post_coaching > 0 = no improvement).
let qOnlyAnomalies = false;
// When ON, the Improvement card filters to associates who improved: were coached
// (rc_last_coaching set) AND have ZERO errors after that coaching.
let qOnlyImproved = false;
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
  const SITES = ["BCN1","BCN4","MAD4","MAD6","MAD7","MAD9","OVD1","RMU1","SVQ1","VLC1"];
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
        _qualityMultiSites = sites.slice(); // remember for refresh
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
// Opportunities card = clickable filter. Toggling it restricts the TABLE to
// σ≥2 (the opportunities the cards already count). Click again to show everyone.
function _toggleOppFilter(){
  qOnlyOpportunities = !qOnlyOpportunities;
  const c = $("qkpiOpp");
  if(c) c.classList.toggle("active", qOnlyOpportunities);
  renderQuality();
}
$("qkpiOpp") && $("qkpiOpp").addEventListener("click", _toggleOppFilter);
$("qkpiOpp") && $("qkpiOpp").addEventListener("keydown",(e)=>{ if(e.key==="Enter"||e.key===" "){ e.preventDefault(); _toggleOppFilter(); } });
// Anomalías card = clickable filter: restrict the table to post-coaching anomalies.
function _toggleAnomalyFilter(){
  qOnlyAnomalies = !qOnlyAnomalies;
  const c = $("qkpiAnomaly");
  if(c) c.classList.toggle("active", qOnlyAnomalies);
  renderQuality();
}
$("qkpiAnomaly") && $("qkpiAnomaly").addEventListener("click", _toggleAnomalyFilter);
$("qkpiAnomaly") && $("qkpiAnomaly").addEventListener("keydown",(e)=>{ if(e.key==="Enter"||e.key===" "){ e.preventDefault(); _toggleAnomalyFilter(); } });
// "Improved" = was coached (rc_last_coaching set) AND zero errors since (rc_post_coaching===0).
// Post-coaching outcome (rate-based, computed in the backend RC):
//   improved  = error-rate/day dropped after the manual coaching (≥1 day elapsed)
//   anomaly   = rate did NOT drop and still erroring (≥1 day elapsed)
//   observing = coached <1 day ago — not enough data to judge yet
function _qIsImproved(r){ return r.rc_outcome === "improved"; }
function _qIsAnomaly(r){  return r.rc_outcome === "anomaly"; }
function _qIsObserving(r){ return r.rc_outcome === "observing"; }
// Improvement card = clickable filter: only associates who improved post-coaching.
function _toggleImprovedFilter(){
  qOnlyImproved = !qOnlyImproved;
  const c = $("qkpiImproved");
  if(c) c.classList.toggle("active", qOnlyImproved);
  renderQuality();
}
$("qkpiImproved") && $("qkpiImproved").addEventListener("click", _toggleImprovedFilter);
$("qkpiImproved") && $("qkpiImproved").addEventListener("keydown",(e)=>{ if(e.key==="Enter"||e.key===" "){ e.preventDefault(); _toggleImprovedFilter(); } });
$("qualityPresentOnly") && $("qualityPresentOnly").addEventListener("click",()=>{qualityPresentOnly=!qualityPresentOnly; $("qualityPresentOnly").classList.toggle("active",qualityPresentOnly); if($("qualityPresentIcon")) $("qualityPresentIcon").textContent=qualityPresentOnly?"●":"○"; renderQuality();});
$("qualityHideCoached") && $("qualityHideCoached").addEventListener("click",()=>{qualityHideCoached=!qualityHideCoached; $("qualityHideCoached").classList.toggle("active",qualityHideCoached); if($("qualityHideCoachedIcon")) $("qualityHideCoachedIcon").textContent=qualityHideCoached?"●":"○"; renderQuality();});
$("qualitySearchInput") && $("qualitySearchInput").addEventListener("input", _debounce(renderQuality, 200));
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

// Display-only overrides for error names shown in the dashboard. Keeps the raw
// Atlas defectType / ErrorKey intact for matching; only the visible label changes.
// Atlas split "Nike Multiple Events" into Each/Quantity (2026-07); coaches asked
// to show them as "Each Multiple Event" / "Quantity Multiple Event".
const QUALITY_LABEL_OVERRIDES = {
  "nike each multiple events": "Each Multiple Event",
  "nike quantity multiple events": "Quantity Multiple Event",
  "nike each": "Each Multiple Event",
  "nike quantity": "Quantity Multiple Event",
  // Atlas sends PICK short as topic "Short" — show "Pick Short" so trainers can
  // tell it apart from "Pick Error Indicator" at a glance.
  "short": "Pick Short",
  "error indicator": "Pick Error Indicator",
  // OVD1 granular defect types (fc_overrides.OVD1) → clean floor-facing labels.
  "pack afe1 pack item damaged": "AFE1 Item Damaged",
  "pack afe1 pack item missing": "AFE1 Item Missing",
  "pack afe1 pack item unscannable": "AFE1 Item Unscannable",
  "pack afe1 pack shipment exception": "AFE1 Shipment Exception",
  "pack afe1 pack slam kickout": "AFE1 Slam Kickout",
  "pack afe1 pack slam kickout override": "AFE1 Slam Kickout Override",
  "pack afe1 pack slam wrong box": "AFE1 Slam Wrong Box",
  "pack single pack item damaged": "Single Item Damaged",
  "pack single pack item missing": "Single Item Missing",
  "pack single pack item unscannable": "Single Item Unscannable",
  "pack single pack shipment exception": "Single Shipment Exception",
  "pack single pack slam kickout": "Single Slam Kickout",
  "pack single pack slam kickout override": "Single Slam Kickout Override",
  "pack single pack slam wrong box": "Single Slam Wrong Box",
  "pack vret pack item missing": "VRET Item Missing",
  "pack vret pack slam kickout": "VRET Slam Kickout",
  "pack vret pack slam kickout override": "VRET Slam Kickout Override",
  "pack vret pack slam wrong box": "VRET Slam Wrong Box",
  "pack other pack item damaged": "Other Item Damaged",
  "pack other pack item missing": "Other Item Missing",
  "pack other pack item unscannable": "Other Item Unscannable",
  "pack other pack shipment exception": "Other Shipment Exception",
  "pack other pack slam kickout": "Other Slam Kickout",
  "pack other pack slam kickout override": "Other Slam Kickout Override",
  "pack other pack slam wrong box": "Other Slam Wrong Box",
  "pack untraceable pack slam kickout": "Untraceable Slam Kickout",
  "sort induct sort damage": "Induct Damage",
  "sort induct sort shortage": "Induct Shortage",
  "sort induct sort overage": "Induct Overage",
  "sort induct sort unscannable": "Induct Unscannable",
  "sort induct sort error indicator": "Induct Error Indicator",
  "sort afe rebin sort shortage": "AFE Rebin Shortage",
  "sort afe rebin sort damage": "AFE Rebin Damage",
  "sort afe rebin sort error indicator": "AFE Rebin Error Indicator",
  "p2r pack item damaged": "P2R Item Damaged",
  "p2r pack item missing": "P2R Item Missing",
  "p2r pack item unscannable": "P2R Item Unscannable",
  "p2r pack shipment exception": "P2R Shipment Exception",
  "p2r pack slam kickout": "P2R Slam Kickout",
  "p2r pack slam kickout override": "P2R Slam Kickout Override",
  "p2r pack slam wrong box": "P2R Slam Wrong Box",
};
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
      const override = QUALITY_LABEL_OVERRIDES[val.toLowerCase().replace(/_/g," ")];
      if(override) return override;
      // toLowerCase FIRST so an ALL-CAPS key (BIN_FILTER_VIOLATIONS) becomes
      // Title Case ("Bin Filter Violations"), not left shouting. \b\w only
      // upcases the first letter, so without this the rest stays uppercase.
      return val.replace(/_/g," ").toLowerCase().replace(/\b\w/g, c=>c.toUpperCase());
    }
  }
  return "Quality Error";
}

// Map a Quality row's ErrorKey → the merged OpenSearch RC family key, or "" if
// the error has no RC coverage. All SLAM process variants (SINGLE/OTHER/P2R/
// AFE1/UNTRACEABLE) collapse to one family so the merged root-cause split (reason
// / box move) + process dive shows on every one of those rows. Must mirror the
// backend join in server.py. owner 2026-08-14.
const RC_FAMILY_LABELS = {
  "BIN_FILTER_VIOLATIONS": "Bin Filter Violations",
  "PICK_ERROR_INDICATOR": "Pick Error Indicator",
  "PACK_SLAM_KICKOUT": "Pack Slam Kick Out",
  "PACK_SLAM_WRONG_BOX": "Pack Slam Wrong Box",
};
function qualityRcFamily(ek){
  const k = String(ek||"").toUpperCase();
  if(k.includes("BIN_FILTER")) return "BIN_FILTER_VIOLATIONS";
  if(k.includes("PICK_ERROR") || k==="PEI") return "PICK_ERROR_INDICATOR";
  if(k.includes("SLAM_KICKOUT")) return "PACK_SLAM_KICKOUT";
  if(k.includes("SLAM_WRONG_BOX")) return "PACK_SLAM_WRONG_BOX";
  return "";
}

function qualityPresentValue(row){
  const p = qualityValue(row,["present","Present"],"");
  const punch = String(qualityValue(row,["punch_type","PunchType","Punch Type"],"")).toUpperCase();
  return String(p).toLowerCase()==="true" || String(p).toUpperCase()==="YES" || punch==="PUNCH_IN";
}

function renderQuality(){
  const body = $("qualityTbody");
  if(!body) return;

  // Populate the Error + Process filter dropdowns FROM THE DATA (post-merge), so
  // each shows ONLY what's actually in the table — with the exact labels the rows
  // use. Merged families (Pack Slam Kick Out / Wrong Box / Missing Item) therefore
  // appear as ONE option, not their per-process variants. owner 2026-08-15.
  if(qualityRows.length){
    // ── Error dropdown: ErrorKey -> the row's own Error Type label (table-exact) ──
    const errorList = $("qFilterErrorList");
    if(errorList){
      const labelByKey = new Map();
      for(const r of qualityRows){
        const k = qualityValue(r,["ErrorKey","error_key","errorKey"],"");
        if(!k || labelByKey.has(k)) continue;
        const lbl = String(qualityValue(r,["Error Type","error_type","ErrorType"],"")).trim()
                    || qualityErrorLabel({error_key: k});
        labelByKey.set(k, lbl);
      }
      const errors = [...labelByKey.keys()].sort((a,b)=>labelByKey.get(a).localeCompare(labelByKey.get(b)));
      const existingKeys = [...errorList.querySelectorAll('input[type="checkbox"]:not([value="__ALL__"])')].map(c=>c.value).sort().join(",");
      if(existingKeys !== [...errors].sort().join(",")){
        errorList.innerHTML = `<label class="q-dd-all"><input type="checkbox" value="__ALL__"> <b>All</b></label>` +
          errors.map(e => `<label><input type="checkbox" value="${esc(e)}" ${qFilterError.has(e)?'checked':''}> ${esc(labelByKey.get(e))}</label>`).join("");
      }
    }
    // ── Process dropdown: distinct process tokens present (merged rows carry a
    // comma-joined Process, so split them) — shows only processes in the table. ──
    const procList = $("qFilterProcessList");
    if(procList){
      const procs = new Set();
      for(const r of qualityRows){
        for(const tok of String(qualityValue(r,["Process","process"],"")).split(",")){
          const t = tok.trim();
          if(t && !/^(nan|none)$/i.test(t)) procs.add(t);
        }
      }
      const opts = [...procs].sort();
      const existing = [...procList.querySelectorAll('input[type="checkbox"]:not([value="__ALL__"])')].map(c=>c.value).sort().join(",");
      if(existing !== [...opts].sort().join(",")){
        procList.innerHTML = `<label class="q-dd-all"><input type="checkbox" value="__ALL__"> <b>All</b></label>` +
          opts.map(p => `<label><input type="checkbox" value="${esc(p)}" ${qFilterProcess.has(p)?'checked':''}> ${esc(p)}</label>`).join("");
      }
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
  // Opportunities card toggle: restrict the table to σ≥2 (the real opportunities
  // the cards measure). Off by default so the table still shows everyone.
  if(qOnlyOpportunities){
    rows = rows.filter(r => Number(qualityValue(r,["sigma","Sigma"],0)) >= 2);
  }
  // Anomalías / Improvement card toggles: restrict to σ≥2 too, so the table's
  // filtered count MATCHES the card count (the cards are measured over σ≥2
  // oppRows; without this the table also showed <σ2 rows → more people than the card).
  if(qOnlyAnomalies){
    rows = rows.filter(r => Number(qualityValue(r,["sigma","Sigma"],0)) >= 2 && _qIsAnomaly(r));
  }
  if(qOnlyImproved){
    rows = rows.filter(r => Number(qualityValue(r,["sigma","Sigma"],0)) >= 2 && _qIsImproved(r));
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

  // Update KPIs. OPPORTUNITIES = only associates at Sigma >= 2 (the ones that
  // actually warrant coaching). The TABLE still shows everyone (incl. <σ1) for
  // dive-deep, but the top cards + compliance are measured ONLY against these
  // real opportunities. Compliance = coached opportunities / total opportunities.
  const oppRows = rows.filter(r => Number(qualityValue(r,["sigma","Sigma"],0)) >= 2);
  const total = oppRows.length;
  const presentCount = oppRows.filter(qualityPresentValue).length;
  const coachedCount = oppRows.filter(r => { const v = qualityValue(r,["coached","Coached"],""); return String(v).toLowerCase()==="true" || String(v).toUpperCase()==="YES"; }).length;
  const pendingCount = total - coachedCount;
  const compliancePct = total > 0 ? Math.round((coachedCount / total) * 100) : 0;
  countUpKpi("qkTotal", total);
  countUpKpi("qkPresent", presentCount);
  countUpKpi("qkCoached", coachedCount);
  countUpKpi("qkPending", pendingCount);
  countUpKpi("qkCompliance", compliancePct, "%");
  // Anomalías = opportunities with errors dated after their last coaching (no
  // improvement). Counted over oppRows so the card stays stable even when its
  // own filter is active (which would otherwise make rows == anomalies).
  const anomalyCount = oppRows.filter(_qIsAnomaly).length;
  countUpKpi("qkAnomaly", anomalyCount);
  // Improvement = opportunities coached AND with zero errors since (post-coaching win).
  const improvedCount = oppRows.filter(_qIsImproved).length;
  countUpKpi("qkImproved", improvedCount);
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
      } else if(qSortKey==="station"){
        va = String(qualityValue(a,["station","Station","CurrentStationId"],"")).toLowerCase();
        vb = String(qualityValue(b,["station","Station","CurrentStationId"],"")).toLowerCase();
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
    body.innerHTML = `<tr><td colspan="14" style="text-align:center;padding:40px;color:#999">No quality opportunities found.</td></tr>`;
    return;
  }

  // Pagination: show max 80 rows at a time for DOM performance
  const Q_PAGE_SIZE = 80;
  const totalPages = Math.ceil(rows.length / Q_PAGE_SIZE);
  if(!window._qPage || window._qPage > totalPages) window._qPage = 1;
  const pageStart = (window._qPage - 1) * Q_PAGE_SIZE;
  const pageRows = rows.slice(pageStart, pageStart + Q_PAGE_SIZE);

  body.innerHTML = pageRows.map((r,ri)=>{
    const login = String(qualityValue(r,["login","Login"],"")).trim();
    const fc = String(qualityValue(r,["fc","FC"],"")).trim();
    const eid = String(qualityValue(r,["employee_id","EmployeeId","Employee Id"],"")).trim();
    const errorType = qualityErrorLabel(r);
    const volume = Number(qualityValue(r,["opportunities","Opportunities"],0));
    const total = qualityValue(r,["total_errors_wk","Total Errors WK","total_errors","Total WK","defectCount"],0);
    const targetErrors = Number(qualityValue(r,["target_errors","Target_Errors"],0));
    const pctTarget = Number(qualityValue(r,["pct_to_target","Pct_to_Target"],0));
    const sigma = Number(qualityValue(r,["sigma","Sigma","sigma_value","Sigma Value"],0));
    const present = qualityPresentValue(r);
    // Station column — same source + mapping as Performance (abbrevStation +
    // last-4-digits for STOW/PICK roles). Data from Roster_SCC via the server.
    const _stationRaw = String(qualityValue(r,["station","Station","CurrentStationId"],"")).trim();
    const _detRole = String(qualityValue(r,["detected_role","DetectedRole","role","Role"],"")).trim().toUpperCase();
    let _stationDisp = abbrevStation(_stationRaw)||_stationRaw||"—";
    if(_detRole==="STOW"||_detRole==="QUANTITY_STOW"||_detRole.startsWith("PICK")||_detRole==="P2R_PICK"){
      const _m = _stationRaw.match(/(\d{4})(?!.*\d)/);
      if(_m && _m[1]) _stationDisp = _m[1];
    }
    const coachedRaw = qualityValue(r,["coached","Coached"],"");
    const coached = String(coachedRaw).toLowerCase()==="true" || String(coachedRaw).toUpperCase()==="YES" || (String(coachedRaw).trim()!=="" && String(coachedRaw).toLowerCase()!=="false" && String(coachedRaw).toLowerCase()!=="nan");
    const courseId = qualityValue(r,["course_id","CourseId","Course ID","course_url"],"") || qualityValue(r,["course_uuid","Course UUID","CourseUUID"],"");
    const photo = badgePhotoUrl(login);

    return `<tr class="${coached?'coached-row':''}">
      <td class="td-assoc" style="text-align:left;padding-left:20px">
        <div class="photo-wrap">
          <div class="photo-cell"><img src="${esc(photo)}" loading="lazy" decoding="async" onerror="this.style.display='none'" /></div>
          <div class="ident">
            <a class="login-link" href="${esc(transcriptUrl(login))}" target="_blank">${esc(login)}</a>
          </div>
        </div>
      </td>
      <td><span style="font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:700;color:var(--text-muted)">${esc(fc)}</span></td>
      <td style="text-align:left"><span style="font-weight:800;font-size:12px">${esc(errorType)}</span></td>
      <td><span class="td-rate" style="font-size:11px;color:var(--text-muted)" title="Opportunities processed">${volume>0?volume.toLocaleString():'—'}</span></td>
      <td><span class="td-rate">${esc(total)}</span></td>
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
      <td title="${esc(_stationRaw)}"><span class="td-station">${esc(_stationDisp)}</span></td>
      <td>${present?'<span class="present-chk">✓</span>':'<span class="present-dash">—</span>'}</td>
      <td>${coached
            ? '<span class="coached-chk"><span class="chk-circle">✓</span></span>'
            : (r.reactive
                ? '<span class="q-reactive-flag" title="Recibió un coaching REACTIVO (HIGH_DEFECTS) de este topic. No cuenta como coaching manual.">⚡ Reactivo</span>'
                : '—')}</td>
      <td style="text-align:left">${(()=>{
        // Post-coaching outcome icon (rate-based) — shown before the split:
        //   🎉 improved (rate dropped) · ⚠️ anomaly (no drop) · 🕒 observing (<1d).
        const _pre = r.rc_pre_rate, _post = r.rc_post_rate, _lc = r.rc_last_coaching;
        const _rateTip = (_pre!=null&&_post!=null) ? ` · ${_pre}→${_post} err/día` : "";
        let anomaly = "";
        if(_qIsAnomaly(r)){
          anomaly = `<span style="font-size:13px;margin-right:4px;cursor:help" title="Anomalía — no mejoró tras el coaching${_lc?` (${esc(_lc)})`:""}${_rateTip}">⚠️</span>`;
        } else if(_qIsImproved(r)){
          anomaly = `<span style="font-size:13px;margin-right:4px;cursor:help" title="Improvement — bajó la tasa de errores tras el coaching${_lc?` (${esc(_lc)})`:""}${_rateTip}">🎉</span>`;
        } else if(_qIsObserving(r)){
          anomaly = `<span style="font-size:13px;margin-right:4px;cursor:help" title="En observación — coaching muy reciente${_lc?` (${esc(_lc)})`:""}; aún sin datos para juzgar (≥1 día)">🕒</span>`;
        }
        // At-a-glance root-cause split (top 2) — like the Performance notes.
        const split = Array.isArray(r.rc_split) ? r.rc_split : [];
        if(!split.length) return anomaly || '<span style="color:var(--text-muted);font-size:11px">—</span>';
        const palette = ["#2563eb","#f59e0b","#16a34a","#dc2626"];
        const top = split.slice(0,2);
        return anomaly + top.map((s,i)=>{
          const pct = Math.max(2, Math.min(100, s.pct));
          // shorten "Asin Categorization Filter" -> "Asin Categorization"
          const name = String(s.name||"").replace(/\s*Filter$/i,"");
          return `<div style="display:flex;align-items:center;gap:5px;margin:1px 0" title="${esc(s.name)}: ${s.pct}% (${s.count})">
            <div style="flex:0 0 70px;font-size:10px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(name)}</div>
            <div style="flex:1;background:var(--border);border-radius:3px;height:11px;position:relative;min-width:30px">
              <div style="position:absolute;inset:0;width:${pct}%;background:${palette[i%palette.length]};border-radius:3px"></div>
            </div>
            <div style="flex:0 0 30px;font-size:10px;text-align:right;font-weight:700">${s.pct}%</div>
          </div>`;
        }).join("");
      })()}</td>
      <td>
        <div style="display:flex;gap:4px;align-items:center">
          ${(()=>{
            // Does this associate already have a PENDING coaching for THIS topic
            // (same course UUID)? If so: no re-upload — only close (cancel/complete).
            const rowUuid = String(courseId||"").toLowerCase().replace(/^.*\/course\//,"").replace(/\/$/,"");
            const pend = Array.isArray(r.pending_coachings) ? r.pending_coachings : [];
            const sameTopic = pend.filter(p => {
              const pu = String(p.course_uuid||"").toLowerCase();
              return pu && rowUuid && pu === rowUuid;
            });
            // Upload button: hidden when already coached OR a same-topic pending
            // exists (must close that one first). Shown otherwise.
            let html = "";
            if(sameTopic.length){
              html += `<button class="row-btn q-cc-close pending-close" data-login="${esc(login)}" data-fc="${esc(fc)}" data-eid="${esc(eid)}" data-pending="${esc(JSON.stringify(sameTopic))}" title="Ya hay un coaching de este topic subido — ciérralo (completar o cancelar)">⏳ ${t("q_pending_close")}</button>`;
            } else {
              // If already coached, the button becomes an ACTIVE "Reupload" (re-coaching)
              // — same upload handler, just relabeled + green tint. Only "No Course"
              // (no course_uuid mapped) truly disables it.
              const _upTitle = coached ? 'Ya coacheado — subir de nuevo (re-coaching)' : '';
              html += `<button class="row-btn quality-upload${coached?' q-reupload':''}" data-login="${esc(login)}" data-fc="${esc(fc)}" data-course="${esc(courseId)}" data-error="${esc(errorType)}" data-total="${total}" data-sigma="${sigma}" title="${_upTitle}" ${!courseId ? 'disabled style="opacity:.5;cursor:not-allowed"' : ''}>${!courseId?'No Course':coached?'↻ Reupload':'↑ Upload'}</button>`;
              // Other-topic pendings still get a generic close button.
              const otherPend = pend.filter(p => !sameTopic.includes(p));
              if(otherPend.length){
                html += `<button class="row-btn q-cc-close pending-close-other" data-login="${esc(login)}" data-fc="${esc(fc)}" data-eid="${esc(eid)}" data-pending="${esc(JSON.stringify(otherPend))}" title="Cerrar coaching pendiente de otro topic (${otherPend.length})">⏳ ${t("q_pending_other")}${otherPend.length>1?" ("+otherPend.length+")":""}</button>`;
              }
            }
            return html;
          })()}
          ${(()=>{
            // Root-cause Dive Deep on the error keys OpenSearch RC covers (PEI,
            // BFV, Slam Kick Out, Slam Wrong Box) — shown for ALL rows now, not
            // only >=2 Sigma (we have the RC data per associate regardless of sigma).
            const ek = String(qualityValue(r,["ErrorKey","error_key"],"")).toUpperCase();
            const rcKey = qualityRcFamily(ek);
            if(rcKey){
              return `<button class="row-btn q-rc-btn" data-login="${esc(login)}" data-fc="${esc(fc)}" data-ek="${rcKey}" title="Root cause + Dive Deep">🔎 RC</button>`;
            }
            return "";
          })()}
        </div>
      </td>
    </tr>`;
  }).join("");

  // Pagination controls
  if(totalPages > 1){
    const paginationEl = document.createElement("tr");
    paginationEl.innerHTML = `<td colspan="14" style="text-align:center;padding:8px 0">
      <button class="q-page-btn" ${window._qPage<=1?'disabled':''} onclick="window._qPage--;renderQuality()">← Prev</button>
      <span style="margin:0 12px;font-size:11px;color:var(--text-secondary)">Page ${window._qPage} of ${totalPages} (${rows.length} rows)</span>
      <button class="q-page-btn" ${window._qPage>=totalPages?'disabled':''} onclick="window._qPage++;renderQuality()">Next →</button>
    </td>`;
    body.appendChild(paginationEl);
  }
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
    "FALSE_PICK_SHORT":"#8b5cf6","NIKE_EACH":"#2563eb","NIKE_QUANTITY":"#0ea5e9","PICK_ERROR_INDICATOR":"#dc2626",
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
      <td>${g.s3?`<span class="qs-badge qs-badge-s3">${g.s3}</span>`:'<span style="color:var(--text-dim)">—</span>'}</td>
      <td>${g.s2?`<span class="qs-badge qs-badge-s2">${g.s2}</span>`:'<span style="color:var(--text-dim)">—</span>'}</td>
      <td>${g.s1?`<span class="qs-badge qs-badge-s1">${g.s1}</span>`:'<span style="color:var(--text-dim)">—</span>'}</td>
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
  const BATCH_SIZE = 5;
  for(let i=0; i<pending.length; i+=BATCH_SIZE){
    const batch = pending.slice(i, i+BATCH_SIZE);
    const results = await Promise.allSettled(batch.map(r => {
      const login = String(qualityValue(r,["login","Login"],"")).trim();
      const courseId = qualityValue(r,["course_uuid","Course UUID","CourseUUID"],"") || qualityValue(r,["course_id","Course ID"],"");
      const errorType = qualityErrorLabel(r);
      const totalErrors = Number(qualityValue(r,["total_errors_wk","Total Errors WK"],0));
      const sigma = Number(qualityValue(r,["sigma","Sigma"],0));
      return jpost(`${API}/api/quality/upload`, {
        fc: currentFC, login, course_id: courseId,
        error_type: errorType, total_errors_wk: totalErrors, sigma,
        notes: `Quality Coaching | ${errorType} | WK Errors: ${totalErrors} | Sigma: ${sigma.toFixed(2)}`
      });
    }));
    results.forEach(r => { if(r.status==="fulfilled") ok++; else fail++; });
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

let _qualityMultiSites = []; // remembers last multi-site selection

async function loadQuality(){
  // Skeleton rows immediately so the panel never flashes blank
  renderSkeletonRows(8, { tbodyId: "qualityTbody", cols: 14 });
  try{
    const d = await jget(`${API}/api/quality/dashboard?fc=${encodeURIComponent(currentFC)}`);
    qualityRows = d.data || [];
    renderQuality();
  }catch(e){
    renderEmptyState(
      "No se pudo cargar Quality",
      e.message,
      { tbodyId: "qualityTbody", cols: 14 }
    );
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

// Quality row: close a pending coaching (Complete/Cancel) via the GCA-backed
// pending list embedded on the button.
document.addEventListener("click", (e)=>{
  const btn = e.target.closest(".q-cc-close");
  if(!btn) return;
  let pending = [];
  try{ pending = JSON.parse(btn.dataset.pending || "[]"); }catch(_){ pending = []; }
  const login = btn.dataset.login || "";
  const rowFc = btn.dataset.fc || currentFC;
  const eid = btn.dataset.eid || "";
  openCloseFromRow(pending, {
    fc: rowFc, login, name: login,
    employee_id: eid, badge: eid, process: "ICQA",
    onDone: null,   // no full reload — row action neutralized in place
  });
});

// ── Quality Root-Cause + Dive Deep (>=2σ rows) ────────────────────────
function _rcBar(s, color){
  const pct = Math.max(0, Math.min(100, s.pct));
  return `<div style="display:flex;align-items:center;gap:8px;margin:4px 0">
    <div style="flex:0 0 180px;font-size:12px;font-weight:600">${esc(s.name)}</div>
    <div style="flex:1;background:var(--border);border-radius:5px;height:18px;position:relative;overflow:hidden">
      <div style="position:absolute;inset:0;width:${pct}%;background:${color};border-radius:5px"></div>
    </div>
    <div style="flex:0 0 92px;text-align:right;font-size:12px"><b>${s.pct}%</b> <span style="color:var(--text-muted)">(${s.count})</span></div>
  </div>`;
}

// F5 — DPMO sparkline over days WITH VOLUME, with the coaching day marked.
// `series` = [{day:'YYYY-MM-DD', dpmo, defects, opportunities}] (F4 output).
// `coachingDay` = 'YYYY-MM-DD'. Points before the coaching are grey, the coaching
// day is a vertical dashed marker, and points after are green (improved) / red
// (rose) relative to the pre mean — so the coach SEES the "8 → 5 → 2 tras el
// coaching del martes" story at a glance. Returns '' when there's nothing to plot.
function _dpmoSparkline(series, coachingDay){
  if(!Array.isArray(series) || series.length < 2) return "";
  const W=260, H=48, padX=6, padY=8;
  const xs = series.map((_,i)=>i);
  const ys = series.map(p=>Math.max(0, Number(p.dpmo)||0));
  const maxY = Math.max(1, ...ys);
  const n = series.length;
  const px = i => padX + (n===1?0:(i*(W-2*padX)/(n-1)));
  const py = v => H-padY - (v/maxY)*(H-2*padY);
  // Pre mean (days strictly before the coaching) for coloring post points.
  const cd = String(coachingDay||"");
  const preVals = series.filter(p=>String(p.day)<cd).map(p=>Number(p.dpmo)||0);
  const preMean = preVals.length ? preVals.reduce((a,b)=>a+b,0)/preVals.length : null;
  // Polyline path.
  const path = series.map((p,i)=>`${i===0?"M":"L"}${px(i).toFixed(1)},${py(ys[i]).toFixed(1)}`).join(" ");
  // Coaching-day marker: place between the last pre point and first post point.
  let markerX = null;
  for(let i=0;i<n;i++){ if(String(series[i].day) >= cd){ markerX = px(i); break; } }
  if(markerX===null && cd) markerX = W-padX;
  const dots = series.map((p,i)=>{
    const after = String(p.day) > cd;
    const on = String(p.day) === cd;
    let color = "#94a3b8";                       // pre = grey
    if(on) color = "#f59e0b";                    // coaching day = amber
    else if(after) color = (preMean!=null && (Number(p.dpmo)||0) < preMean) ? "#16a34a" : "#dc2626";
    const t = `${esc(p.day)} · DPMO ${Math.round(p.dpmo)} (${p.defects}/${p.opportunities})`;
    return `<circle cx="${px(i).toFixed(1)}" cy="${py(ys[i]).toFixed(1)}" r="2.6" fill="${color}"><title>${t}</title></circle>`;
  }).join("");
  const marker = markerX!=null ? `<line x1="${markerX.toFixed(1)}" y1="${padY-4}" x2="${markerX.toFixed(1)}" y2="${H-padY+2}" stroke="#f59e0b" stroke-width="1.2" stroke-dasharray="3,2"/>
    <text x="${Math.min(markerX+3,W-46).toFixed(1)}" y="${(padY+2).toFixed(1)}" font-size="8" fill="#f59e0b">coaching</text>` : "";
  return `<div style="margin-top:8px" title="DPMO por día (sólo días con volumen); línea = día del coaching">
    <svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" style="max-width:100%">
      ${marker}
      <path d="${path}" fill="none" stroke="var(--text-muted,#64748b)" stroke-width="1.3"/>
      ${dots}
    </svg>
    <div style="font-size:9.5px;color:var(--text-muted);margin-top:1px">DPMO/día · <span style="color:#94a3b8">pre</span> · <span style="color:#16a34a">mejora</span> / <span style="color:#dc2626">sube</span> post-coaching</div>
  </div>`;
}

async function openRcModal(login, fc, errorKey){
  openModal("modalRc");
  const rcFc = fc || currentFC;   // used to build FC Research links per ASIN
  const titleEl = $("rc-title"), body = $("rc-body");
  const ekLabel = RC_FAMILY_LABELS[errorKey] || "Root Cause";
  titleEl.textContent = `Root Cause · ${login} · ${ekLabel}`;
  body.innerHTML = `<div style="color:var(--text-secondary);font-size:13px">Cargando…</div>`;
  try{
    const d = await jget(`${API}/api/quality/rc?fc=${encodeURIComponent(fc||currentFC)}&login=${encodeURIComponent(login)}&error_key=${encodeURIComponent(errorKey)}`);
    if(!d || !d.ok || !d.errors || !d.errors[errorKey]){
      body.innerHTML = `<div style="color:var(--text-secondary);font-size:13px">Sin datos de root cause para este asociado.${(d&&d.error)?'<br>'+esc(d.error):''}<br><span style="font-size:11px">Corre el pipeline de Quality para refrescar.</span></div>`;
      return;
    }
    const info = d.errors[errorKey];
    const palette = ["#2563eb","#f59e0b","#16a34a","#dc2626","#7c3aed","#0891b2","#db2777","#65a30d"];
    let html = `<div style="font-size:12px;color:var(--text-secondary);margin-bottom:10px">${info.total} eventos · split por <b>${esc(info.split_field)}</b></div>`;
    // Post-coaching outcome banner: improved / anomaly / observing.
    // When basis==='dpmo' the measure is the REAL Atlas DPMO on days WITH VOLUME
    // (F4); otherwise it's the event-rate/day proxy. The sparkline shows the daily
    // DPMO series with the coaching day marked (F5).
    if(info.last_coaching){
        const oc = info.outcome, isDpmo = (info.basis === "dpmo");
        // WHO coached (ROI analysis): show the coach next to the coaching date.
        const _coach = (info.coach_name || info.coach_login || "").trim();
        const coachTxt = _coach ? ` · coach: <b>${esc(_coach)}</b>` : "";
        // Metric text: prefer real DPMO (pre→post) when available, else the rate proxy.
        let metricTxt = "";
        if(isDpmo && info.pre_dpmo!=null && info.post_dpmo!=null){
          metricTxt = ` (DPMO <b>${Math.round(info.pre_dpmo)}→${Math.round(info.post_dpmo)}</b>, sólo días con volumen)`;
        } else if(isDpmo && info.post_dpmo!=null){
          metricTxt = ` (DPMO post <b>${Math.round(info.post_dpmo)}</b>, sólo días con volumen)`;
        } else if(info.pre_rate!=null && info.post_rate!=null){
          metricTxt = ` (tasa <b>${info.pre_rate}→${info.post_rate}</b> err/día)`;
        }
        const spark = _dpmoSparkline(info.dpmo_series, info.last_coaching);
        if(oc === "anomaly"){
          html += `<div style="font-size:12.5px;margin-bottom:10px;padding:9px 12px;border-radius:8px;background:rgba(220,38,38,.08);border:1px solid var(--red,#dc2626)">
            <span style="font-weight:800;color:var(--red,#dc2626)">⚠️ Anomalía — no mejoró tras el coaching</span>
            <div style="font-size:11px;color:var(--text-secondary);margin-top:2px">${isDpmo?"El DPMO":"La tasa de errores"} no bajó${metricTxt} desde el último coaching (${esc(info.last_coaching)}${coachTxt}). Considerar re-coaching / escalación.</div>${spark}</div>`;
        } else if(oc === "improved"){
          // Improvement can come via DPMO (rate vs self) OR sigma (position vs site).
          // When it was the SIGMA path, say so explicitly — the person may not have
          // lowered their own DPMO but stopped being an outlier vs the site.
          var _bySigma = (info.improve_reason === "sigma");
          var _sigTxt = (info.sigma_at!=null && info.sigma_now!=null)
              ? ` (σ <b>${info.sigma_at}→${info.sigma_now}</b>, bajó ${info.sigma_drop}σ vs el sitio)` : "";
          var _body = _bySigma
              ? `Bajó <b>≥1 sigma</b>${_sigTxt} desde el coaching del ${esc(info.last_coaching)}${coachTxt} — dejó de destacar frente al sitio (aunque su DPMO propio no bajó).`
              : `Bajó ${isDpmo?"el DPMO":"la tasa de errores"}${metricTxt} desde el coaching del ${esc(info.last_coaching)}${coachTxt}.`;
          html += `<div style="font-size:12.5px;margin-bottom:10px;padding:9px 12px;border-radius:8px;background:rgba(22,163,74,.08);border:1px solid var(--green,#16a34a)">
            <span style="font-weight:800;color:var(--green,#16a34a)">🎉 Improvement — mejoró tras el coaching${_bySigma?' <span style="font-weight:600;font-size:10px;opacity:.8">(por sigma)</span>':''}</span>
            <div style="font-size:11px;color:var(--text-secondary);margin-top:2px">${_body}</div>${spark}</div>`;
        } else if(oc === "observing"){
          html += `<div style="font-size:12px;margin-bottom:10px;padding:8px 12px;border-radius:8px;background:rgba(245,158,11,.10);border:1px solid rgba(245,158,11,.5);color:var(--text-secondary)">🕒 En observación — coaching muy reciente (${esc(info.last_coaching)}${coachTxt}); aún sin ≥1 día con volumen para juzgar la mejora.${spark}</div>`;
        }
    }
    // Split bars
    html += info.split.map((s,i)=>_rcBar(s, palette[i%palette.length])).join("");
    // Dive deep per RC (collapsible)
    html += `<div style="margin-top:14px;font-weight:700;font-size:13px">🔎 Dive Deep</div>`;
    info.split.forEach((s)=>{
      const rows = (info.dive_by_rc && info.dive_by_rc[s.name]) || [];
      const df = info.dive_fields || [];
      html += `<details style="margin-top:8px;border:1px solid var(--border);border-radius:8px;padding:8px 10px">
        <summary style="cursor:pointer;font-weight:600;font-size:12px">${esc(s.name)} <span style="color:var(--text-muted)">(${s.count})</span></summary>
        <table style="width:100%;margin-top:6px;font-size:11px;border-collapse:collapse">
          <thead><tr style="text-align:left;color:var(--text-muted)">
            ${df.map(f=>`<th style="padding:3px 6px">${esc(String(f).replace(/^packageDetails\./,"").replace(/_/g," "))}</th>`).join("")}<th style="padding:3px 6px">Día</th><th style="padding:3px 6px;text-align:right">#</th>
          </tr></thead>
          <tbody>
          ${rows.slice(0,50).map(rw=>`<tr style="border-top:1px solid var(--border)">
            ${df.map(f=>{
              const val = String(rw[f]||"");
              // ASIN/FCSku columns become a clickable link to FC Research.
              if(/asin|fcsku|sku/i.test(f) && val){
                const u = `https://qi-fcresearch-eu.corp.amazon.com/${encodeURIComponent(rcFc)}/results?s=${encodeURIComponent(val)}`;
                return `<td style="padding:3px 6px"><a href="${esc(u)}" target="_blank" rel="noopener" style="color:var(--accent);font-family:'JetBrains Mono',monospace;text-decoration:none">${esc(val)} ↗</a></td>`;
              }
              return `<td style="padding:3px 6px">${esc(val)}</td>`;
            }).join("")}
            <td style="padding:3px 6px;white-space:nowrap">${esc(rw.last_day||"")}${(Array.isArray(rw.days)&&rw.days.length>1)?` <span style="color:var(--text-muted)">(+${rw.days.length-1}d)</span>`:""}</td>
            <td style="padding:3px 6px;text-align:right;font-weight:700">${rw.count}</td>
          </tr>`).join("")}
          </tbody>
        </table>${rows.length>50?`<div style="font-size:10px;color:var(--text-muted);margin-top:4px">+${rows.length-50} más…</div>`:""}
      </details>`;
    });
    body.innerHTML = html;
  }catch(e){
    body.innerHTML = `<div style="color:var(--red,#dc2626);font-size:13px">Error: ${esc(e.message||String(e))}</div>`;
  }
}

document.addEventListener("click", (e)=>{
  const btn = e.target.closest(".q-rc-btn");
  if(!btn) return;
  openRcModal(btn.dataset.login||"", btn.dataset.fc||currentFC, btn.dataset.ek||"");
});

// ── Coaching Queue modal (View Quality) ───────────────────────────────
// Actionable list: associates >=2 Sigma, present on site, not yet coached —
// each with their RC split + a button to upload/close the coaching.
async function openCoachQueue(fc){
  fc = fc || currentFC;
  openModal("modalCoachQueue");
  const body = $("cq-body");
  $("cq-title").textContent = `Cola de Coaching · ${fc}`;
  body.innerHTML = `<div style="color:var(--text-secondary);font-size:13px">Cargando…</div>`;
  try{
    const d = await jget(`${API}/api/quality/dashboard?fc=${encodeURIComponent(fc)}`);
    const all = (d && d.data) || [];
    // Filter: sigma>=2, present, not coached.
    const queue = all.filter(r=>{
      const sig = Number(r.sigma||0);
      const present = String(r.present)===true || r.present===true || String(r.present).toLowerCase()==="true";
      const coached = r.coached===true || String(r.coached).toLowerCase()==="true";
      return sig>=2 && present && !coached;
    }).sort((a,b)=>Number(b.sigma||0)-Number(a.sigma||0));

    if(!queue.length){
      body.innerHTML = `<div style="color:var(--text-secondary);font-size:14px;padding:20px;text-align:center">✓ No hay asociados pendientes de coaching (≥2σ, presentes, sin coachear).</div>`;
      return;
    }
    const palette = ["#2563eb","#f59e0b","#16a34a","#dc2626"];
    let html = `<div style="font-size:12px;color:var(--text-secondary);margin-bottom:10px"><b>${queue.length}</b> asociado(s) por coachear · ≥2σ · presentes</div>`;
    html += queue.map(r=>{
      const login = String(r.login||"");
      // Station (same source + mapping as Performance/Quality table). Queue only
      // shows present associates, so this is populated when punched in.
      const _sRaw = String(r.station||r.CurrentStationId||"").trim();
      const _sRole = String(r.detected_role||r.DetectedRole||r.role||"").trim().toUpperCase();
      let _sDisp = abbrevStation(_sRaw)||_sRaw||"—";
      if(_sRole==="STOW"||_sRole==="QUANTITY_STOW"||_sRole.startsWith("PICK")||_sRole==="P2R_PICK"){
        const _sm = _sRaw.match(/(\d{4})(?!.*\d)/); if(_sm && _sm[1]) _sDisp = _sm[1];
      }
      const ek = String(r.error_key||r.ErrorKey||"");
      const errLabel = String(r.error_type||ek).replace(/_/g," ");
      const sig = Number(r.sigma||0).toFixed(1);
      const split = Array.isArray(r.rc_split)?r.rc_split:[];
      const courseId = String(r.course_id||r.course_uuid||"");
      const rcKey = qualityRcFamily(ek);
      const pend = Array.isArray(r.pending_coachings)?r.pending_coachings:[];
      const rowUuid = courseId.toLowerCase().replace(/^.*\/course\//,"").replace(/\/$/,"");
      const sameTopic = pend.filter(p=>{const pu=String(p.course_uuid||"").toLowerCase();return pu&&rowUuid&&pu===rowUuid;});
      // split bars (top 2)
      const bars = split.slice(0,2).map((s,i)=>{
        const pct=Math.max(2,Math.min(100,s.pct)); const nm=String(s.name||"").replace(/\s*Filter$/i,"");
        return `<div style="display:flex;align-items:center;gap:5px;margin:1px 0" title="${esc(s.name)}: ${s.pct}%">
          <div style="flex:0 0 110px;font-size:10px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(nm)}</div>
          <div style="flex:1;background:var(--border);border-radius:3px;height:10px;position:relative;min-width:40px"><div style="position:absolute;inset:0;width:${pct}%;background:${palette[i%palette.length]};border-radius:3px"></div></div>
          <div style="flex:0 0 30px;font-size:10px;text-align:right;font-weight:700">${s.pct}%</div></div>`;
      }).join("") || `<span style="color:var(--text-muted);font-size:11px">sin RC</span>`;
      // action button
      let actionBtn = "";
      if(sameTopic.length){
        actionBtn = `<button class="row-btn cq-close pending-close" data-login="${esc(login)}" data-fc="${esc(fc)}" data-eid="${esc(String(r.employee_id||""))}" data-process="${esc(errLabel)}" data-pending="${esc(JSON.stringify(sameTopic))}" title="Ya hay un coaching de este topic subido — ciérralo (completar o cancelar)">⏳ ${t("q_pending_close")}</button>`;
      } else if(courseId){
        actionBtn = `<button class="row-btn cq-upload" data-login="${esc(login)}" data-fc="${esc(fc)}" data-course="${esc(courseId)}" data-error="${esc(errLabel)}" data-total="${r.total_errors_wk||0}" data-sigma="${r.sigma||0}">↑ Upload</button>`;
      } else {
        actionBtn = `<span style="font-size:11px;color:var(--text-muted)">No Course</span>`;
      }
      const rcBtn = rcKey ? `<button class="row-btn q-rc-btn" data-login="${esc(login)}" data-fc="${esc(fc)}" data-ek="${rcKey}" title="Dive Deep">🔎</button>` : "";
      return `<div style="display:flex;align-items:center;gap:12px;padding:10px;border:1px solid var(--border);border-radius:8px;margin-bottom:8px">
        <div style="flex:0 0 150px">
          <div style="font-weight:700;font-size:13px">${esc(login)}</div>
          <div style="font-size:10px;color:var(--text-muted)">${esc(errLabel)}</div>
          <div style="font-size:10px;color:var(--text-secondary)" title="${esc(_sRaw)}">📍 ${esc(_sDisp)}</div>
          <div style="font-size:11px"><span class="pr ${qualitySigmaClass(Number(sig))}">Σ${sig}</span></div>
        </div>
        <div style="flex:1;min-width:0">${bars}</div>
        <div style="flex:0 0 auto;display:flex;gap:4px;align-items:center">${rcBtn}${actionBtn}</div>
      </div>`;
    }).join("");
    body.innerHTML = html;
    // wire upload/close from queue (reuse existing handlers via class)
    body.querySelectorAll(".cq-upload").forEach(b=>b.addEventListener("click",()=>{
      openUploadPrefillQuality(b.dataset);
    }));
    body.querySelectorAll(".cq-close").forEach(b=>b.addEventListener("click",()=>{
      let pend=[]; try{pend=JSON.parse(b.dataset.pending||"[]");}catch(_){}
      openCloseFromRow(pend,{fc:b.dataset.fc,login:b.dataset.login,name:b.dataset.login,employee_id:b.dataset.eid,badge:b.dataset.eid,process:b.dataset.process,onDone:null});
    }));
  }catch(e){
    body.innerHTML = `<div style="color:var(--red,#dc2626);font-size:13px">Error: ${esc(e.message||String(e))}</div>`;
  }
}
window.openCoachQueue = openCoachQueue;

// Upload from the coaching queue (mirrors the quality-upload handler).
async function openUploadPrefillQuality(ds){
  const login=ds.login, fc=ds.fc, courseId=ds.course, errorType=ds.error;
  if(!login||!courseId) return;
  try{
    await jpost(`${API}/api/quality/upload`, {
      fc, login, course_id: courseId, error_type: errorType,
      total_errors_wk: Number(ds.total||0), sigma: Number(ds.sigma||0),
      notes: `Quality Coaching | ${errorType} | WK Errors: ${ds.total} | Sigma: ${Number(ds.sigma||0).toFixed(2)}`
    });
    showToast({title:"Coaching subido", body:`${login} · ${errorType}`, type:"ok"});
    if(loadQuality) loadQuality();
    openCoachQueue(fc);  // refresh the queue
  }catch(e){
    showToast({title:"Upload falló", body:String(e.message||e), type:"err"});
  }
}

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
// Only tick when Quality tab is active
document.addEventListener("visibilitychange", function(){
  if(!document.hidden && document.querySelector("#panel-quality.active")) _updateQualityStatusbar();
});
setInterval(function(){
  if(document.querySelector("#panel-quality.active")) _updateQualityStatusbar();
}, 30000);

// ── Quality: Export filtered view to CSV ──────────────────────────────
async function exportQualityCSV(){
  let rows = qualityRows.slice();
  if(qFilterProcess.size) rows = rows.filter(r => { const p=String(qualityValue(r,["Process","process"],"")).toLowerCase(); for(const v of qFilterProcess){if(p.includes(v.toLowerCase()))return true;} return false; });
  if(qFilterError.size) rows = rows.filter(r => qFilterError.has(qualityValue(r,["ErrorKey","error_key","errorKey"],"")));
  if(qFilterSigma > 0) rows = rows.filter(r => Number(qualityValue(r,["sigma","Sigma"],0)) >= qFilterSigma);
  if(qFilterCurve.size) rows = rows.filter(r => qFilterCurve.has(String(qualityValue(r,["curve","Curve"],"")).toUpperCase()));
  if(qualityPresentOnly) rows = rows.filter(qualityPresentValue);
  if(qualityHideCoached) rows = rows.filter(r => { const v=qualityValue(r,["coached","Coached"],""); return !(String(v).toLowerCase()==="true" || String(v).toUpperCase()==="YES"); });
  if(qualityHideOnTarget) rows = rows.filter(r => { const pct=parseFloat(qualityValue(r,["pct_to_target","Pct_to_Target"],"0")); return isNaN(pct)||pct<100; });
  const search = String($("qualitySearchInput")?.value || "").trim().toLowerCase();
  if(search) rows = rows.filter(r => { const l=String(qualityValue(r,["login","Login"],"")).toLowerCase(); const e=String(qualityErrorLabel(r)).toLowerCase(); return l.includes(search)||e.includes(search); });

  if(!rows.length){ alert("No data to export."); return; }

  const payload = rows.map(r=>({
    "FC": String(qualityValue(r,["fc","FC"],"")).trim(),
    "Login": qualityValue(r,["login","Login"],""),
    "Error Type": qualityErrorLabel(r),
    "Errors WK": qualityValue(r,["total_errors_wk","Total Errors WK"],0),
    "Volume": qualityValue(r,["opportunities","Opportunities"],0),
    "Target": Number(qualityValue(r,["target_errors","Target_Errors"],0)).toFixed(1),
    "% Target": Number(qualityValue(r,["pct_to_target","Pct_to_Target"],0)).toFixed(0)+"%",
    "Cohort": qualityValue(r,["cohort","Cohort"],""),
    "Sigma": Number(qualityValue(r,["sigma","Sigma"],0)).toFixed(2),
    "Curve": qualityValue(r,["curve","Curve"],""),
    "Tenure": qualityValue(r,["tenure","Tenure"],""),
    "Station": (()=>{const s=String(qualityValue(r,["station","Station","CurrentStationId"],"")).trim();const dr=String(qualityValue(r,["detected_role","DetectedRole","role","Role"],"")).trim().toUpperCase();let d=abbrevStation(s)||s||"";if(dr==="STOW"||dr==="QUANTITY_STOW"||dr.startsWith("PICK")||dr==="P2R_PICK"){const m=s.match(/(\d{4})(?!.*\d)/);if(m&&m[1])d=m[1];}return d;})(),
    "Present": qualityPresentValue(r)?"YES":"NO",
    "Coached": (()=>{const v=qualityValue(r,["coached","Coached"],"");return String(v).toLowerCase()==="true"?"YES":"NO";})()
  }));

  // Use "multi" as FC label when exporting multi-site data
  const fcs = [...new Set(payload.map(r=>r.FC).filter(Boolean))];
  const exportFc = fcs.length > 1 ? "MULTI" : (fcs[0] || currentFC);

  try{
    const res = await fetch(`${API}/api/export/csv`,{
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({fc: exportFc, rows: payload}),
    });
    if(!res.ok) throw new Error(`HTTP ${res.status}`);
    const savedPath = res.headers.get("X-Saved-Path");
    if(savedPath){
      try{ window.open(`${API}/api/open-file?path=${encodeURIComponent(savedPath)}`); }catch(_){}
    }
    _csvToast(`${tf("csv_quality_saved", {n: rows.length})}\n${savedPath || "Coaching_csv/"}`);
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
  // Load persisted prefs from server (survives pywebview localStorage resets)
  let prefs = {default_fc:"BCN4", theme:"light", lang:"es"};
  try{ prefs = await jget(`${API}/api/prefs`); }catch(_){}
  const defaultFc = prefs.default_fc || localStorage.getItem("argos-default-fc") || "BCN4";
  // After a Run Pipeline we reload the page. Stay on the FC the user just ran
  // (it was stashed in argos_pipeline_done), instead of snapping back to the
  // saved default. Only honor a recent stamp (last 5 min).
  let saved = defaultFc;
  try{
    const done = JSON.parse(localStorage.getItem("argos_pipeline_done") || "null");
    if(done && done.fc && (Date.now() - (done.at||0) < 5*60*1000)){
      saved = done.fc;
      // Restore the shift/cycle the user ran so we don't snap back to
      // Auto-detect after the post-pipeline reload. loadShifts() honors a
      // non-empty currentShift when selecting the dropdown option.
      if(done.shift) currentShift = done.shift;
    }
  }catch(_){}
  currentFC=saved;
  // Persist the default only — do NOT overwrite it with the post-pipeline FC.
  localStorage.setItem("argos-default-fc", defaultFc);
  if(prefs.theme) { document.documentElement.setAttribute("data-theme", prefs.theme); localStorage.setItem("argos-theme", prefs.theme); }
  if(prefs.lang) { _lang = prefs.lang; localStorage.setItem("argos-lang", prefs.lang); }
  const sel=$("fcSelect");
  if(sel){ const opt=sel.querySelector(`option[value="${saved}"]`); if(opt) sel.value=saved; }
  const sbFc=$("sbFc"); if(sbFc) sbFc.textContent=currentFC;
  const ulFc=$("ul-fc"); if(ulFc) ulFc.value=currentFC;
  const bkFc=$("bulk-fc"); if(bkFc) bkFc.value=currentFC;
  // Apply the AMZL/FC view for the restored site (hide map/station for a DS).
  if(window._applySiteBL) window._applySiteBL();
  await loadShifts();
}

// Skeleton rows shown while an async load is awaiting the API. Pulsing
// gray bars keep the layout stable so the user knows data is on its way.
// Reusable across the dashboard, quality and GCA tables.
function renderSkeletonRows(n, opts){
  const o = opts || {};
  const tbodyId = o.tbodyId || "tbody";
  const cols    = o.cols    || 11;
  const tb = $(tbodyId); if(!tb) return;
  const widths = [80,55,40,90,30,70,60,45,50,35,80,65,55,75];
  let html = "";
  for(let r=0; r<n; r++){
    html += "<tr class='sk-row'>";
    for(let c=0; c<cols; c++){
      const w = widths[c % widths.length] - (r%3)*5;
      html += `<td><span class='sk-bar' style='display:block;height:10px;border-radius:5px;background:linear-gradient(90deg,var(--border) 0%,var(--border-strong) 50%,var(--border) 100%);background-size:200% 100%;animation:skShine 1.4s linear infinite;width:${w}%;opacity:.7'></span></td>`;
    }
    html += "</tr>";
  }
  tb.innerHTML = html;
}

// Empty state SVG + actionable hint. Reusable for any tbody.
function renderEmptyState(message, hint, opts){
  const o = opts || {};
  const tbodyId = o.tbodyId || "tbody";
  const cols    = o.cols    || 11;
  const tb = $(tbodyId); if(!tb) return;
  tb.innerHTML = `<tr><td colspan="${cols}" style="padding:48px 20px">
    <div style="display:flex;flex-direction:column;align-items:center;gap:14px;text-align:center;color:var(--text-secondary)">
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none" aria-hidden="true">
        <rect x="6" y="14" width="44" height="32" rx="4" stroke="var(--border-strong)" stroke-width="2"/>
        <path d="M6 22h44" stroke="var(--border-strong)" stroke-width="2"/>
        <circle cx="28" cy="34" r="6" stroke="var(--accent)" stroke-width="2.4"/>
        <path d="M32.2 38.2L37 43" stroke="var(--accent)" stroke-width="2.4" stroke-linecap="round"/>
      </svg>
      <div style="font-size:14px;font-weight:600;color:var(--text)">${esc(message)}</div>
      ${hint ? `<div style="font-size:12px;max-width:380px;line-height:1.55">${esc(hint)}</div>` : ""}
    </div>
  </td></tr>`;
}

async function loadDashboard(){
  $("updatedAt").textContent=ts();
  // Show skeleton rows immediately so users see something is happening
  // (the dashboard endpoint can take 200-800ms after a pipeline run).
  renderSkeletonRows(12);
  try{
    const d=await jget(`${API}/api/dashboard?fc=${encodeURIComponent(currentFC)}`);
    state.all=(d.data||[]).map(norm);
    // Rebuild the Process filter for the freshly-loaded data + site: FC shows
    // only groups with associates present; AMZL shows its delivery roles as the
    // single process filter. (msRender swaps the panel, so this is safe to redo.)
    initProcessMs();
    updateKpis();
    buildSubprocessOptions();
    renderAll();
  }catch(e){
    renderEmptyState("No se pudo cargar el dashboard", e.message);
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

// '↑ Upload Coaching' button was removed from the Performance toolbar
// (calvenpj feedback 2026-07-24 — redundant with the GCA new-coaching flow).
// Guard the listener so app.js doesn't throw when the button is absent; the
// modalUpload flow stays wired for any other caller that still opens it.
const _btnUpload = $("btnUpload");
if(_btnUpload) _btnUpload.addEventListener("click",()=>{
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
      // Toast with a quick link to verify in Guided Coaching. Plays the role
      // of a soft "undo" — the user can immediately confirm or rectify in GC
      // (the GC API doesn't expose a true delete-by-id we can call).
      const transcriptUrl = `https://guided-coaching-dub.corp.amazon.com/#/employee-transcript/${encodeURIComponent(login)}`;
      showToast({
        title: `Coaching subido a ${login}`,
        body:  `<a href="${transcriptUrl}" target="_blank" style="color:var(--accent);text-decoration:underline">Verificar en Guided Coaching</a> si necesitas corregir.`,
        type: "ok",
        ms: 7000,
      });
      // Toast body is HTML for the link — escape only the dynamic login.
      // (showToast injects body via innerHTML, which is fine here because
      // we control the markup and `login` is already used in a URL-encoded slot.)
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
  if($("bulk-dept")) $("bulk-dept").value="";   // default to per-row Dept
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
  const deptOverride=($("bulk-dept")?$("bulk-dept").value:"").trim();
  const resEl=$("bulk-result");
  if(!lines.length){resEl.innerHTML=`<div class="upload-result err">No valid logins</div>`;return;}

  const entries=lines.map(l=>{
    const row=state.all.find(r=>r.login.toLowerCase()===l.login.toLowerCase());
    // Use provided notes; if empty, build from row data (rate + pct + comments)
    const notes=l.notes||(row?buildUploadNotes(row):"");
    return{login:l.login,fc,course_id:row?.course_id||defCourse||"",notes};
  });
  // When a Dept override is set, the SERVER re-resolves each course_id for that
  // dept, so a per-row course_id isn't required here. Without an override we
  // still guard against missing courses (current behavior).
  if(!deptOverride){
    const missing=entries.filter(e=>!e.course_id).map(e=>e.login);
    if(missing.length){
      resEl.innerHTML=`<div class="upload-result err">Missing Course ID for: ${esc(missing.join(", "))}</div>`;return;
    }
  }
  const deptLabel=deptOverride?` (Dept → ${esc(deptOverride)})`:"";
  resEl.innerHTML=`<div class="upload-result" style="color:#888;border-color:#ccc">Uploading ${entries.length} entries${deptLabel}…</div>`;
  try{
    // Server accepts 'entries' key + optional dept_override (re-resolves course).
    const r=await jpost(`${API}/api/coaching/bulk`,{fc,entries,dept_override:deptOverride});
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
// Pre-flight check: verifies Midway is alive BEFORE starting a pipeline that
// can take 4+ minutes. Returns a reason string if blocked, "" if all green.
async function pipelinePreflight(){
  if(!navigator.onLine) return t("mw_no_internet");
  let d;
  try{
    d = await jget(`${API}/api/auth/midway-status`);
  }catch(_){
    return "";  // server check failed, but don't block — rare race during boot
  }
  if(!d) return t("mw_no_status");
  // "ok" and "expiring" (<5 min) are allowed — the lock-protected mwinit
  // refreshes inline if needed during the run.
  if(d.state === "ok" || d.state === "expiring") return "";

  // state is "missing" or "expired". The common case is that the ~20h session
  // is still alive and only the ~2h AEA posture cookie lapsed — that renews
  // SILENTLY via `mwinit --refresh-aea` (no YubiKey). Try that FIRST; only
  // surface the manual FIDO2 "Renovar Midway" button if the silent refresh
  // can't fix it (session genuinely dead, or old binary without the endpoint).
  try{
    const r = await jpost(`${API}/api/auth/midway-refresh-aea`, {});
    if(r && r.ok && (r.state === "ok" || r.state === "expiring")) return "";
  }catch(_){ /* endpoint missing or refresh errored → fall through to manual button */ }
  return d.state === "missing" ? t("mw_state_missing") : t("mw_state_expired");
}

// Custom toast with an inline "Renovar Midway" button. Different from the
// generic showToast because we need the action to live inside the toast and
// outlive the auto-dismiss while mwinit (~10-20s) is running.
function showMidwayRefreshToast(reason){
  let host = document.getElementById("toastHost");
  if(!host){
    host = document.createElement("div");
    host.id = "toastHost";
    host.style.cssText = "position:fixed;right:20px;bottom:20px;z-index:9500;display:flex;flex-direction:column;gap:10px;pointer-events:none";
    document.body.appendChild(host);
  }
  const el = document.createElement("div");
  el.style.cssText = "pointer-events:auto;background:var(--bg-card);color:var(--text);border-left:3px solid #f59e0b;border-radius:8px;padding:12px 16px;min-width:280px;max-width:440px;box-shadow:0 12px 32px -8px rgba(0,0,0,.28),0 0 0 1px var(--border);font-size:13px;line-height:1.45;transform:translateX(20px);opacity:0;transition:transform .25s cubic-bezier(.2,.7,.2,1),opacity .25s";
  el.innerHTML = `
    <div style="font-weight:600;margin-bottom:4px">${t("mw_cant_pipeline")}</div>
    <div style="color:var(--text-secondary);margin-bottom:10px">${esc(reason)}</div>
    <div style="display:flex;gap:8px">
      <button class="mr-go" style="flex:1;padding:6px 10px;border-radius:6px;border:1px solid #f59e0b;background:#f59e0b;color:#1a1a1a;font:600 12px 'Segoe UI',sans-serif;cursor:pointer">${t("mw_renew_btn")}</button>
      <button class="mr-no" style="padding:6px 10px;border-radius:6px;border:1px solid var(--border);background:transparent;color:var(--text-secondary);font:600 12px 'Segoe UI',sans-serif;cursor:pointer">${t("close")}</button>
    </div>
    <div class="mr-status" style="margin-top:8px;color:var(--text-muted);font-size:11.5px;display:none"></div>`;
  host.appendChild(el);
  requestAnimationFrame(() => { el.style.transform = "translateX(0)"; el.style.opacity = "1"; });

  function close(){
    el.style.transform = "translateX(20px)";
    el.style.opacity = "0";
    setTimeout(() => el.remove(), 250);
  }
  el.querySelector(".mr-no").addEventListener("click", close);
  el.querySelector(".mr-go").addEventListener("click", async () => {
    const go = el.querySelector(".mr-go");
    const status = el.querySelector(".mr-status");
    go.disabled = true;
    go.style.opacity = ".6";
    go.style.cursor  = "default";
    go.textContent   = t("mw_touch_yubi");
    status.style.display = "block";
    status.textContent = t("mw_waiting_fido2");
    // Speed up the midway pill while mwinit runs.
    midwayPollFast(60 * 1000);
    try{
      const r = await jpost(`${API}/api/auth/midway-refresh`, {});
      if(r && r.ok && r.state === "ok"){
        status.style.color = "#16a34a";
        status.textContent = t("mw_renewed");
        go.style.display = "none";
        // Close after a short pause so the user can read it.
        setTimeout(close, 4500);
      } else {
        status.style.color = "#dc2626";
        status.textContent = `${t("mw_renew_failed")} ${r?.error || t("mw_try_again")}`;
        go.disabled = false;
        go.style.opacity = "1";
        go.style.cursor  = "pointer";
        go.textContent   = t("mw_renew_btn");
      }
    }catch(e){
      status.style.color = "#dc2626";
      status.textContent = "Error: " + (e?.message || e);
      go.disabled = false;
      go.style.opacity = "1";
      go.style.cursor  = "pointer";
      go.textContent   = t("mw_renew_btn");
    }
  });
}

// Maps an overall pct (5-99) to the 3 visual stages defined in the wizard
// markup above. Backend phases:
//   download:  5 → 70%
//   clean:    70 → 80%
//   dashboard:80 → 99%
function renderPipelineStages(pct, finished){
  // [stageEl, dotEl, fillBeforeEl, fromPct, toPct]
  const segs = document.querySelectorAll("#pipeSegWrap .pipe-seg");
  const fills = document.querySelectorAll("#pipeSegWrap .pipe-seg-line-fill");
  if(!segs.length) return;
  const ranges = [[5,70],[70,80],[80,99]];
  const accent = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#7c3aed";
  segs.forEach((seg, i) => {
    const dot = seg.querySelector(".pipe-seg-dot");
    const [from, to] = ranges[i];
    const isDone   = pct >= to || (finished && pct >= 95);
    const isActive = !isDone && pct >= from;
    if(isDone){
      seg.style.color = accent;
      if(dot){
        dot.style.borderColor = accent;
        dot.style.background  = accent;
        dot.innerHTML = '<svg width="8" height="8" viewBox="0 0 8 8" style="display:block"><polyline points="1.2,4.4 3.4,6.4 6.8,2.0" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
      }
    } else if(isActive){
      seg.style.color = accent;
      if(dot){
        dot.style.borderColor = accent;
        dot.style.background  = "var(--bg-card)";
        dot.style.boxShadow   = "0 0 0 4px " + accent + "33";
        dot.innerHTML = '';
      }
    } else {
      seg.style.color = "var(--text-secondary)";
      if(dot){
        dot.style.borderColor = "var(--border-strong)";
        dot.style.background  = "var(--bg-card)";
        dot.style.boxShadow   = "none";
        dot.innerHTML = '';
      }
    }
    // Connector line fill: % filled inside this segment.
    if(i < fills.length){
      let fillPct = 0;
      if(pct >= to) fillPct = 100;
      else if(pct > from) fillPct = ((pct - from) / (to - from)) * 100;
      fills[i].style.width = Math.min(100, Math.max(0, fillPct)) + "%";
    }
  });
}

$("btnPipeline").addEventListener("click", async ()=>{
  const btn = $("btnPipeline");
  // Block manual Start while the auto-update sequence is running (owner: avoid
  // collisions). The auto queue sets _freshBusy; the server also holds a lock,
  // but we stop it here so the user gets a clear message instead of a 429.
  if(typeof _freshBusy !== "undefined" && _freshBusy){
    showToast({title:"Auto-actualización en curso", body:"Espera a que termine el ciclo automático (GCA → Performance → Quality) antes de lanzar el pipeline manual.", type:"info", ms:4000});
    return;
  }
  const sb = document.querySelector("#panel-dashboard .statusbar .sb-l");
  const origSb = sb ? sb.innerHTML : "";

  // Pre-flight: don't burn 4 minutes on a pipeline that will fail at the
  // first auth call. If Midway is the blocker, offer an inline "Renovar"
  // button that fires mwinit and asks the user to retry once it's fresh.
  const blocker = await pipelinePreflight();
  if(blocker){
    const isMidway = /midway/i.test(blocker);
    if(isMidway){
      showMidwayRefreshToast(blocker);
    } else {
      showToast({ title: "No puedo lanzar el pipeline", body: blocker, type: "warn", ms: 6000 });
    }
    return;
  }

  btn.disabled = true;
  btn.textContent = "⏳ Running…";
  const pipeStartedAt = performance.now();
  // Switch midway-status polling to 1s for the first 90s so we can show the
  // 'Touch your YubiKey' toast the moment mwinit fires inside the pipeline.
  midwayPollFast(90 * 1000);
  if(sb) sb.innerHTML = `<span id="pipeSegWrap" style="display:flex;align-items:center;gap:10px;width:100%;font-size:10.5px;font-weight:600">
    <span class="pipe-seg" data-stage="download" style="display:flex;align-items:center;gap:6px;color:var(--text-secondary)">
      <span class="pipe-seg-dot" style="width:14px;height:14px;border-radius:50%;border:2px solid var(--border-strong);background:var(--bg-card);display:inline-flex;align-items:center;justify-content:center;transition:all .3s"></span>
      <span>Descarga</span>
    </span>
    <span class="pipe-seg-line" style="flex:1;height:2px;background:var(--border-strong);border-radius:1px;position:relative;overflow:hidden">
      <span class="pipe-seg-line-fill" style="position:absolute;inset:0;width:0%;background:linear-gradient(90deg,var(--accent),var(--accent2));transition:width .4s"></span>
    </span>
    <span class="pipe-seg" data-stage="clean" style="display:flex;align-items:center;gap:6px;color:var(--text-secondary)">
      <span class="pipe-seg-dot" style="width:14px;height:14px;border-radius:50%;border:2px solid var(--border-strong);background:var(--bg-card);display:inline-flex;align-items:center;justify-content:center;transition:all .3s"></span>
      <span>Limpieza</span>
    </span>
    <span class="pipe-seg-line" style="flex:1;height:2px;background:var(--border-strong);border-radius:1px;position:relative;overflow:hidden">
      <span class="pipe-seg-line-fill" style="position:absolute;inset:0;width:0%;background:linear-gradient(90deg,var(--accent),var(--accent2));transition:width .4s"></span>
    </span>
    <span class="pipe-seg" data-stage="dashboard" style="display:flex;align-items:center;gap:6px;color:var(--text-secondary)">
      <span class="pipe-seg-dot" style="width:14px;height:14px;border-radius:50%;border:2px solid var(--border-strong);background:var(--bg-card);display:inline-flex;align-items:center;justify-content:center;transition:all .3s"></span>
      <span>Dashboard</span>
    </span>
    <span id="perfPipeMsg" style="margin-left:auto;color:var(--accent);font-weight:600;white-space:nowrap;min-width:90px;text-align:right">Iniciando…</span>
  </span>`;

  // Start pipeline via POST → get job_id, then poll status with XHR.
  // Avoids EventSource which corrupts fetch() in pywebview EdgeChromium.
  var startXhr = new XMLHttpRequest();
  const _mStart = (manualTimeMode && $("manualStart")) ? $("manualStart").value : "";
  const _mEnd   = (manualTimeMode && $("manualEnd"))   ? $("manualEnd").value   : "";
  let _pipeUrl = API+"/api/pipeline/start?fc="+encodeURIComponent(currentFC)+"&shift="+encodeURIComponent(manualTimeMode ? "" : currentShift);
  if(_mStart && _mEnd) _pipeUrl += "&manual_start="+encodeURIComponent(_mStart)+"&manual_end="+encodeURIComponent(_mEnd);
  startXhr.open("POST", _pipeUrl, true);
  startXhr.onload = function(){
    if(startXhr.status !== 200){
      btn.disabled = false;
      btn.textContent = t("btn_run_pipeline");
      var errDetail = "";
      try{ errDetail = JSON.parse(startXhr.responseText).detail || ""; }catch(ex){}
      if(startXhr.status === 429){
        if(sb){ sb.innerHTML = `<span style="color:#e8711a;font-weight:700">⚠ Pipeline ya en ejecución</span>`; setTimeout(()=>{ sb.innerHTML = origSb; }, 5000); }
      } else {
        if(sb){ sb.innerHTML = `<span style="color:#e53e3e">❌ ${esc(errDetail || "Failed to start pipeline")}</span>`; setTimeout(()=>{ sb.innerHTML = origSb; }, 5000); }
      }
      return;
    }
    var jobId;
    try{ jobId = JSON.parse(startXhr.responseText).job_id; } catch(ex){ jobId = null; }
    if(!jobId){
      btn.disabled = false;
      btn.textContent = t("btn_run_pipeline");
      if(sb){ sb.innerHTML = `<span style="color:#e53e3e">❌ No job ID returned</span>`; setTimeout(()=>{ sb.innerHTML = origSb; }, 5000); }
      return;
    }

    var pollTimer = setInterval(function(){
      var pollXhr = new XMLHttpRequest();
      pollXhr.open("GET", API+"/api/pipeline/status/"+jobId, true);
      pollXhr.onload = function(){
        if(pollXhr.status !== 200) return;
        var d;
        try{ d = JSON.parse(pollXhr.responseText); } catch(ex){ return; }
        var p = Math.min(d.pct || 0, 100);
        var msg = $("perfPipeMsg");
        renderPipelineStages(p, d.status === "done" || d.status === "error");
        if(msg && d.msg) msg.textContent = d.msg;
        if(d.status === "done" || d.status === "error"){
          clearInterval(pollTimer);
          btn.disabled = false;
          btn.textContent = t("btn_run_pipeline");
          if(d.ok !== false){
            if(sb) sb.innerHTML = `<span style="color:var(--green);font-weight:700">✓ Pipeline completado</span>`;
            setTimeout(()=>{ if(sb) sb.innerHTML = origSb; }, 3000);
            // Persist active filters + a marker so the post-reload toast can
            // celebrate the finish (the reload wipes in-memory state).
            const elapsedMs = performance.now() - pipeStartedAt;
            const mins = Math.floor(elapsedMs / 60000);
            const secs = Math.round((elapsedMs % 60000) / 1000);
            const elapsedTxt = mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
            try{
              localStorage.setItem("argos_filter_restore", JSON.stringify({
                prio: Array.from(state.prio),
                curve: state.curve,
                tenureSet: Array.from(state.tenureSet||[]),
                mgr: Array.from(state.mgr||[]),
                q: state.q,
                hideCoached: state.hideCoached,
                maxRows: state.maxRows
              }));
              localStorage.setItem("argos_pipeline_done", JSON.stringify({
                at: Date.now(),
                elapsed: elapsedTxt,
                fc: currentFC,
                // Remember the shift/cycle the user ran so the post-reload
                // _initApp can re-select it instead of snapping back to
                // Auto-detect (delivery coaches pin a cycle, e.g. Cycle 1).
                shift: manualTimeMode ? "" : currentShift,
              }));
            }catch(ex){}
            // After Performance finishes, ALWAYS refresh GCA so the pending-
            // coaching column/flags reflect reality — calvenpj 2026-07-24: "the
            // Performance pull should also pull GCA". This is a fire-and-forget
            // POST with NO .then() handling of hd_items, so it NEVER shows the
            // hyper-reactive alert modal (that only fires from the background
            // _gcaPollOnce, which reads hd_items). The server serializes it
            // against the just-finished pipeline via the shared lock. GCA runs
            // regardless of the alerts opt-in now — it's data refresh, not an
            // alert. (Quality is NOT auto-run: its queue is owner-driven and
            // re-running it behind Team Leads confused them — feedback #3.)
            try{ fetch(`${API}/api/gca/poll?fc=${encodeURIComponent(currentFC)}`, {method:"POST"}); }catch(_){}
            // window.location.reload() is the only reliable way to repaint in pywebview
            // after a pipeline. Auth cache is persisted in localStorage so the reload
            // is instant — loadUserInfo() reads the cache and skips the fetch entirely.
            window.location.reload();
          } else {
            if(sb) sb.innerHTML = `<span style="color:#e53e3e;font-weight:700">${t("pipeline_error_prefix")} ${esc(String(d.error||t("pipeline_failed")))}</span>`;
            setTimeout(()=>{ if(sb) sb.innerHTML = origSb; }, 8000);
          }
        }
      };
      pollXhr.send();
    }, 1000);
  };
  startXhr.onerror = function(){
    btn.disabled = false;
    btn.textContent = t("btn_run_pipeline");
    if(sb){ sb.innerHTML = `<span style="color:#e53e3e">❌ Connection error</span>`; setTimeout(()=>{ sb.innerHTML = origSb; }, 5000); }
  };
  startXhr.send();
});

// ── Auto-refresh Performance (calvenpj 2026-07-24) ─────────────
// Toggle button that re-runs the Performance pipeline every 15 min so leads can
// leave it on a screen and see the floor update itself. It simply .click()s the
// existing Start-Pipeline button (reusing its whole tested flow — preflight,
// progress, GCA refresh, reload) so there's no duplicate pipeline logic. Skips a
// tick if a pipeline is already running (button disabled). Preference persists.
const PERF_AUTO_MS = 15 * 60 * 1000;
let _perfAutoTimer = null;
// Declared up here (not in the freshness block below) because _startPerfAuto's
// interval reads it, and the auto-refresh restore runs before that block loads.
let _freshBusy = false;
function _setPerfAutoUI(on){
  // The toggle now lives in Settings (checkbox #spAutoRefresh); keep it in sync
  // whenever the state changes so opening Settings always shows the real state.
  const cb = $("spAutoRefresh");
  if(cb) cb.checked = !!on;
}
function _startPerfAuto(){
  // Performance no longer runs its own colliding interval. The master _autoExec
  // timer runs Performance FIRST in the sequence (Perf→GCA→Quality), so it never
  // blocks GCA/Quality on the server lock. This just arms that single timer;
  // whether Performance actually runs each tick is gated by argos_perf_auto.
  _armAutoExec();
}
function _stopPerfAuto(){
  if(_perfAutoTimer){ clearInterval(_perfAutoTimer); _perfAutoTimer=null; }
  _maybeStopAutoExec();
}
function _applyPerfAuto(on){
  _setPerfAutoUI(on);
  // Master auto-DATA switch. Persists across sessions; drives the 15-min
  // GCA→Perf→Quality loop. (renamed from argos_perf_auto → argos_auto_data)
  try{ localStorage.setItem("argos_auto_data", on ? "1" : "0"); }catch(_){}
  if(on) _startPerfAuto(); else _stopPerfAuto();
}
// Settings toggle: set once, persists across sessions (localStorage). calvenpj 2026-07-24.
$("spAutoRefresh") && $("spAutoRefresh").addEventListener("change",(e)=>{
  const on = !!e.target.checked;
  _applyPerfAuto(on);
  showToast({
    title: on ? "Auto-actualización ON" : "Auto-actualización OFF",
    body:  on ? "Performance se actualizará cada 15 min (se recuerda). / Performance will refresh every 15 min (remembered)."
              : "Se detuvo la actualización automática. / Auto-refresh stopped.",
    type: "info", ms: 3500
  });
});
// Restore the saved preference on load (default OFF) — reflects in the Settings
// checkbox AND starts the timer, so the user only ever enables it once.
(()=>{ try{
  // Migrate the old key name if present, then restore. Default OFF → the app
  // does its ONE first-run load but never repeats until the user opts in.
  const legacy = localStorage.getItem("argos_perf_auto");
  if(legacy != null && localStorage.getItem("argos_auto_data") == null){
    localStorage.setItem("argos_auto_data", legacy); localStorage.removeItem("argos_perf_auto");
  }
  if(localStorage.getItem("argos_auto_data")==="1") _applyPerfAuto(true);
}catch(_){} })();

// ── Data-freshness widget + "Actualizar todo" queue ──────────────────────────
// Shows how long ago each source (Performance / GCA / Quality) was refreshed, so
// users stop blindly re-running the pipeline. The button runs the three in a
// QUEUE (sequential) — they share the server lock, so running them one-after-
// another (instead of at once) avoids the "skip because another pipeline is
// running" collisions. Each stage shows a spinner while it runs.
const FRESH_STALE_SEC = 30 * 60;   // >30 min → amber "stale"
// _freshBusy is declared earlier (near PERF_AUTO_MS) so the auto-refresh interval
// can read it; don't re-declare it here.

function _fmtAge(sec){
  if(sec == null) return "—";
  if(sec < 60) return "ahora";
  const m = Math.floor(sec / 60);
  if(m < 60) return m + "m";
  const h = Math.floor(m / 60);
  if(h < 24) return h + "h";
  return Math.floor(h / 24) + "d";
}
function _paintFreshSeg(id, label, age){
  const el = $(id); if(!el) return;
  el.textContent = `${label} ${_fmtAge(age)}`;
  el.classList.toggle("stale", age != null && age >= FRESH_STALE_SEC);
}
async function _refreshFreshness(){
  if(_freshBusy) return;   // while the queue runs, the segs show their own state
  try{
    const fc = (localStorage.getItem("argos-default-fc") || currentFC || "BCN4");
    const r = await fetch(`${API}/api/system/freshness?fc=${encodeURIComponent(fc)}`);
    const j = await r.json().catch(()=>null);
    if(!j) return;
    _paintFreshSeg("freshPerf", "Perf", j.performance?.age_seconds);
    _paintFreshSeg("freshGca",  "GCA",  j.gca?.age_seconds);
    _paintFreshSeg("freshQual", "Q",    j.quality?.age_seconds);
  }catch(_){ /* transient — try again on the next tick */ }
}
function _setFreshLoading(id, label){
  const el = $(id); if(!el) return;
  el.textContent = `${label} ⟳`;
  el.classList.remove("stale"); el.classList.add("loading");
}
function _clearFreshLoading(id){ const el=$(id); if(el) el.classList.remove("loading"); }

// Run the Performance pipeline and RESOLVE only when it finishes (or errors).
// Mirrors the btnPipeline flow (start → poll job status) but headless for the queue.
function _runPerformanceOnce(){
  return new Promise((resolve)=>{
    const fc = currentFC;
    const url = API+"/api/pipeline/start?fc="+encodeURIComponent(fc)+"&shift="+encodeURIComponent(manualTimeMode ? "" : currentShift);
    fetch(url, {method:"POST"}).then(r=>r.json()).then(j=>{
      const jobId = j && j.job_id;
      if(!jobId){ resolve(false); return; }
      const poll = ()=>{
        fetch(`${API}/api/pipeline/status/${encodeURIComponent(jobId)}`).then(r=>r.json()).then(st=>{
          if(st && (st.status === "done" || st.status === "error" || (st.pct||0) >= 100)){
            resolve(st.status !== "error");
          } else { setTimeout(poll, 2000); }
        }).catch(()=>resolve(false));
      };
      setTimeout(poll, 2000);
    }).catch(()=>resolve(false));
  });
}

// POST a poll endpoint, retrying a few times if the server replies
// `skipped: pipeline busy` (another pipeline still holds the shared lock). This
// is the safety net over the server-side race fix: even if a poll lands during
// the brief window a prior pipeline is finishing, we retry until it actually
// runs instead of silently missing the refresh (the bug where auto-update
// didn't pick up the full GCA pipeline).
async function _pollWithRetry(url, tries){
  tries = tries || 4;
  for(var i=0;i<tries;i++){
    try{
      const r = await fetch(url, {method:"POST"});
      const j = await r.json().catch(function(){return {};});
      if(!(j && j.skipped)) return j;         // ran (or a real error) → done
    }catch(_){ return; }                       // network error → give up quietly
    await new Promise(function(res){ setTimeout(res, 3000); });  // wait for the lock to free
  }
}

// Run the enabled sources in SEQUENCE (never in parallel — they share the server
// lock, so parallel = collisions + skips). `opts.only` limits which sources run
// (the master auto-exec timer passes the user-enabled set); default = all three.
// `opts.firstRun`/`opts.silent` tune the UI feedback.
async function _refreshAllQueue(opts){
  opts = opts || {};
  const firstRun = !!opts.firstRun;
  const silent = !!opts.silent;          // background auto-exec → no toasts
  const only = opts.only || {perf:true, gca:true, quality:true};
  if(_freshBusy) return;
  const btn = $("btnRefreshAll");
  const pill = $("freshPill");
  const pb = $("btnPipeline");
  // Don't start if a pipeline is already running (manual Start or auto-refresh).
  if(pb && pb.disabled){
    if(!firstRun && !silent) showToast({title:"Ya hay un pipeline en curso", body:"Espera a que termine para actualizar todo.", type:"info", ms:3500});
    return;
  }
  _freshBusy = true;
  if(btn){ btn.disabled = true; btn.textContent = firstRun ? "⏳ Cargando datos…" : "⟳ Actualizando…"; }
  if(pill && firstRun) pill.classList.add("firstrun");
  const fc = (localStorage.getItem("argos-default-fc") || currentFC || "BCN4");
  const _step = (label)=>{ if(firstRun && btn) btn.textContent = `⏳ ${label}…`; };
  try{
    // Sequence: GCA → Performance → Quality (owner's order). Each pipeline is
    // multi-threaded internally on the server; they run one-after-another here so
    // they never collide on the server's pipeline lock.
    // Alerts depend on the data refresh (owner: "no alertas sin auto-update de
    // datos"): when the user has a source's alert ON, we use its *alerting* poll
    // (_gcaPollOnce/_qualityPollOnce) which refreshes AND notifies on new items.
    // Otherwise we use the mute poll (_pollWithRetry) — data only, no notify.
    const alGca = !!only._alertGca, alQual = !!only._alertQuality;
    if(only.gca){
      _step("GCA"); _setFreshLoading("freshGca", "GCA");
      if(alGca && typeof _gcaPollOnce === "function") await _gcaPollOnce();
      else await _pollWithRetry(`${API}/api/gca/poll?fc=${encodeURIComponent(fc)}`);
      _clearFreshLoading("freshGca"); _refreshFreshness();
    }
    if(only.perf){
      _step("Performance"); _setFreshLoading("freshPerf", "Perf");
      await _runPerformanceOnce();
      _clearFreshLoading("freshPerf"); _refreshFreshness();
      try{ if(typeof loadDashboard === "function") loadDashboard(); }catch(_){}
    }
    if(only.quality){
      _step("Quality"); _setFreshLoading("freshQual", "Q");
      if(alQual && typeof _qualityPollOnce === "function") await _qualityPollOnce();
      else await _pollWithRetry(`${API}/api/quality/poll?fc=${encodeURIComponent(fc)}`);
      _clearFreshLoading("freshQual"); _refreshFreshness();
    }
    if(!silent) showToast({title:"✅ Todo actualizado", body:"Datos al día.", type:"ok", ms:3500});
  }catch(e){
    if(!silent) showToast({title:"Actualización incompleta", body:String(e&&e.message||e), type:"warn", ms:4000});
  }finally{
    _freshBusy = false;
    if(btn){ btn.disabled = false; btn.textContent = "↻ Actualizar todo"; }
    if(pill) pill.classList.remove("firstrun");
    _refreshFreshness();
    try{ if(typeof loadDashboard === "function") loadDashboard(); }catch(_){}
    // NOTE: Captain is deliberately NOT refreshed here. It's an on-demand tool for
    // specific coaching moments (owner 2026-08-14) — it builds @0.5h only when the
    // trainer opens the tab or hits Refresh, never as part of the normal pipeline.
  }
}
$("btnRefreshAll") && $("btnRefreshAll").addEventListener("click", ()=>_refreshAllQueue());

// ── Master auto-exec timer (replaces the 3 colliding per-source timers) ───────
// ONE 15-min timer runs the user-enabled sources IN SEQUENCE via the queue above,
// so they never collide on the server lock (the "GCA/Quality skipped: pipeline
// running" loop). Which sources run is driven by the SAME prefs the old per-source
// timers used: Auto-data = argos_auto_data (master); alerts layer on top per their toggles.
const AUTO_EXEC_MS = 15 * 60 * 1000;
let _autoExecTimer = null;
function _autoExecTick(){
  // Auto-DATA is the master switch (owner: "no alertas sin auto-update de datos").
  // When ON, the full sequence GCA→Perf→Quality runs every 15 min. Alerts are a
  // layer ON TOP: if the user also enabled an alert, that source's poll notifies.
  if(localStorage.getItem("argos_auto_data") !== "1") return;   // auto-data OFF → nothing
  const only = {
    gca:     true,
    perf:    true,
    quality: !_isAmzlContext(),
    // alert flags (only meaningful when the user is eligible + opted in)
    _alertGca:     (window._canAlerts && _alertPref("gca")),
    _alertQuality: (window._canAlerts && _alertPref("quality") && !_isAmzlContext()),
  };
  _refreshAllQueue({only, silent:true});
}
function _armAutoExec(){
  if(_autoExecTimer) return;
  _autoExecTimer = setInterval(_autoExecTick, AUTO_EXEC_MS);
}
function _maybeStopAutoExec(){
  // Auto-DATA is the single master switch now. Alerts can't run without it, so
  // if auto-data is OFF we tear down the timer regardless of alert prefs.
  const on = (localStorage.getItem("argos_auto_data") === "1");
  if(!on && _autoExecTimer){ clearInterval(_autoExecTimer); _autoExecTimer = null; }
}
window._armAutoExec = _armAutoExec;
window._maybeStopAutoExec = _maybeStopAutoExec;
// Prime the widget on load + refresh it every 60s (cheap read, no pipeline).
_refreshFreshness();
setInterval(_refreshFreshness, 60 * 1000);

// ── First-run auto-refresh ───────────────────────────────────────────────────
// On a cold app start nothing was refreshing on its own (Performance had no
// baseline; GCA/Quality collided on the server lock and skipped). So a few
// seconds after load — once auth/dashboard settled — kick the SAME sequential
// queue ONCE automatically, with the widget in its loud "firstrun" state so the
// user sees data loading instead of pulling "Actualizar todo" themselves.
// After this, the per-source background polls take over based on what the user
// enabled in Settings. Runs at most once per app load.
// One initial load at open (always — so the user sees data), running the full
// GCA→Perf→Quality sequence once. AFTER that, the 15-min repeat only happens if
// the user turned auto-data ON (armed in the restore block below). Alerts fire
// on this first run too only if the user opted in AND is eligible.
setTimeout(()=>{ try{
  _refreshAllQueue({firstRun:true, only:{
    gca:true, perf:true, quality:!_isAmzlContext(),
    _alertGca:     (window._canAlerts && _alertPref("gca")),
    _alertQuality: (window._canAlerts && _alertPref("quality") && !_isAmzlContext()),
  }});
}catch(_){} }, 8000);

// ── Usage ping (adoption) — human-presence gated ─────────────────────────────
// Adoption used to be inferred from pipeline runs, but the auto-exec timer now
// runs pipelines unattended every 15 min, so an idle machine would fake usage.
// Instead we record ONE usage row on the first REAL human interaction of the day
// (click or keydown). Debounced via localStorage to once-per-day per browser;
// the server also guards once-per-user-per-day. A background timer never fires
// this because it's wired to genuine input events only.
function _maybePingUsage(){
  try{
    var today = new Date().toISOString().slice(0,10);   // YYYY-MM-DD
    if(localStorage.getItem("argos_usage_pinged") === today) return _disarmUsagePing();
    localStorage.setItem("argos_usage_pinged", today);   // set first → no double-fire
    var fc = (localStorage.getItem("argos-default-fc") || currentFC || "BCN4");
    fetch(`${API}/api/usage/ping?fc=${encodeURIComponent(fc)}`, {method:"POST"}).catch(function(){});
  }catch(_){}
  _disarmUsagePing();
}
function _disarmUsagePing(){
  document.removeEventListener("click", _maybePingUsage, true);
  document.removeEventListener("keydown", _maybePingUsage, true);
}
// Capture phase so any real click/keypress counts, even if handlers stop propagation.
document.addEventListener("click", _maybePingUsage, true);
document.addEventListener("keydown", _maybePingUsage, true);

// ── Toolbar ────────────────────────────────────────────────
document.querySelectorAll("[data-curve]").forEach(btn=>{
  btn.addEventListener("click",()=>{
    state.curve = btn.dataset.curve || "ALL";
    renderAll();
  });
});
$("btnRefresh") && $("btnRefresh").addEventListener("click",loadDashboard);
(()=>{
  let _searchTimer=null;
  $("searchInput").addEventListener("input",e=>{
    state.q=e.target.value.trim();
    clearTimeout(_searchTimer);
    _searchTimer=setTimeout(renderAll,200);
  });
})();
$("maxInput").addEventListener("input",e=>{
  const v=parseInt(e.target.value,10);
  state.maxRows=Number.isFinite(v)&&v>0?v:200;
  renderAll();
});
$("toggleCoached").addEventListener("click",()=>{
  state.hideCoached=!state.hideCoached;
  $("toggleCoached").classList.toggle("active",state.hideCoached);
  $("coachToggleIcon").textContent=state.hideCoached?"●":"○";
  renderAll();
});
$("toggleFirstDays") && $("toggleFirstDays").addEventListener("click",()=>{
  state.firstDaysOnly=!state.firstDaysOnly;
  $("toggleFirstDays").classList.toggle("active",state.firstDaysOnly);
  $("firstDaysIcon").textContent=state.firstDaysOnly?"●":"○";
  renderAll();
});
$("noteFilterSelect") && $("noteFilterSelect").addEventListener("change",e=>{
  state.noteFilter = e.target.value;
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

// ── Keyboard shortcuts ─────────────────────────────────────
// Power-user accelerators. We skip when the user is typing into a real
// input/textarea so single-key shortcuts don't fire mid-word.
(function(){
  function inEditableField(t){
    if(!t) return false;
    const tag = (t.tagName || "").toUpperCase();
    if(tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return true;
    if(t.isContentEditable) return true;
    return false;
  }
  function closeAnyOpenModal(){
    const open = document.querySelector(".modal-overlay.show");
    if(open){ open.classList.remove("show"); return true; }
    const sp = $("settingsPopover");
    if(sp && sp.style.display === "block"){ sp.style.display = "none"; return true; }
    return false;
  }
  document.addEventListener("keydown", (e) => {
    // Esc: close modal / settings popover (works even inside inputs).
    if(e.key === "Escape"){
      if(closeAnyOpenModal()) e.preventDefault();
      return;
    }
    // Ctrl+R: run pipeline (override browser refresh).
    if((e.ctrlKey || e.metaKey) && (e.key === "r" || e.key === "R")){
      const btn = $("btnPipeline");
      if(btn && !btn.disabled){
        e.preventDefault();
        btn.click();
      }
      return;
    }
    // Ctrl+F: focus search.
    if((e.ctrlKey || e.metaKey) && (e.key === "f" || e.key === "F")){
      const inp = $("searchInput");
      if(inp){
        e.preventDefault();
        inp.focus();
        inp.select();
      }
      return;
    }
    // Single-key shortcuts only when not typing into a field.
    if(inEditableField(e.target)) return;
    // 1-4: toggle priority filters (1=P3, 2=P2, 3=P1, 4=OK).
    if(["1","2","3","4"].includes(e.key)){
      const map = { "1": "3", "2": "2", "3": "1", "4": "0" };
      const p = map[e.key];
      if(state.prio.has(p)) state.prio.delete(p); else state.prio.add(p);
      // Make sure at least one priority is active.
      if(state.prio.size === 0) state.prio.add(p);
      if(typeof renderAll === "function") renderAll();
      e.preventDefault();
      return;
    }
    // ? : show shortcut help toast.
    if(e.key === "?"){
      showToast({
        title: "Atajos de teclado",
        body: "Ctrl+R: pipeline · Ctrl+F: buscar · 1-4: P3/P2/P1/OK · Esc: cerrar",
        type: "info",
        ms: 6000,
      });
      e.preventDefault();
    }
  });
})();

// ── Resizable + persisted table columns ────────────────────
// Adds a drag handle to the right edge of each <th>. Column widths are
// keyed by `data-k` (or table position fallback) and persisted in
// localStorage. Currently wired for the dashboard table; reuse the same
// markup for other tables by adding to TABLES_TO_INSTRUMENT.
(function(){
  // .main-table covers dashboard, qualityTable and gcaTable (all use the
  // same base class).
  const TABLES_TO_INSTRUMENT = [".main-table"];
  const STORAGE_KEY = "argos_col_widths_v1";
  let saved = {};
  try { saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") || {}; } catch(_){}

  function colKey(table, th, idx){
    const tk = th.dataset.k || th.textContent.trim().slice(0,16) || ("col"+idx);
    const tableId = table.id || (table.classList.contains("main-table") ? "main" : "tbl");
    return `${tableId}|${tk}|${idx}`;
  }

  function persistWidth(key, w){
    saved[key] = w;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(saved)); } catch(_){}
  }

  function instrument(table){
    const ths = table.querySelectorAll("thead th");
    ths.forEach((th, idx) => {
      // Restore saved width
      const k = colKey(table, th, idx);
      if(saved[k] && Number(saved[k]) > 30) th.style.width = saved[k] + "px";
      // Skip last column resizer (right edge of table)
      if(idx === ths.length - 1) return;
      if(th.querySelector(".col-resizer")) return;
      const r = document.createElement("span");
      r.className = "col-resizer";
      r.addEventListener("mousedown", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const startX = e.clientX;
        const startW = th.getBoundingClientRect().width;
        r.classList.add("dragging");
        document.body.classList.add("col-resizing");
        function onMove(ev){
          const delta = ev.clientX - startX;
          const w = Math.max(40, Math.round(startW + delta));
          th.style.width = w + "px";
        }
        function onUp(){
          document.removeEventListener("mousemove", onMove);
          document.removeEventListener("mouseup", onUp);
          r.classList.remove("dragging");
          document.body.classList.remove("col-resizing");
          const finalW = Math.round(th.getBoundingClientRect().width);
          persistWidth(k, finalW);
        }
        document.addEventListener("mousemove", onMove);
        document.addEventListener("mouseup", onUp);
      });
      th.appendChild(r);
    });
  }

  // Defer to ensure all tables exist
  setTimeout(() => {
    TABLES_TO_INSTRUMENT.forEach(sel => {
      document.querySelectorAll(sel).forEach(instrument);
    });
  }, 0);
})();

// ── Sticky toolbar shadow ──────────────────────────────────
// When the filter bar sticks to the top (user scrolled past it), drop a
// shadow so it visually separates from the content below. We use a
// sentinel sibling element + IntersectionObserver — cheaper than a scroll
// listener.
(function(){
  const tb = document.querySelector(".toolbar-sticky");
  if(!tb || !("IntersectionObserver" in window)) return;
  const sentinel = document.createElement("div");
  sentinel.style.cssText = "height:1px;margin-bottom:-1px";
  tb.parentElement.insertBefore(sentinel, tb);
  const io = new IntersectionObserver((entries) => {
    tb.classList.toggle("is-pinned", !entries[0].isIntersecting);
  }, { threshold: [1] });
  io.observe(sentinel);
})();

// ── Init ───────────────────────────────────────────────────
loadUserInfo();
checkForUpdate();
initPriority();
syncKpiActive();
// Default: Process multi-select shows ALL selected (treated as ALL internally)
initProcessMs();

// Celebrate post-pipeline reload (reads marker dropped before reload).
// We delay it so renderTable() has populated state.all (record count).
(function(){
  try{
    var raw = localStorage.getItem("argos_pipeline_done");
    if(!raw) return;
    localStorage.removeItem("argos_pipeline_done");
    var info = JSON.parse(raw);
    if(!info || (Date.now() - (info.at||0)) > 30000) return;
    setTimeout(function(){
      var n = (state && state.all) ? state.all.length : 0;
      showToast({
        title: "Pipeline completado",
        body: `${info.fc || ""} · ${info.elapsed || "?"}` + (n ? ` · ${n.toLocaleString("es-ES")} registros` : ""),
        type: "ok",
        ms: 4500,
      });
    }, 500);
    // NOTE (calvenpj 2026-07-24): the Coaching Queue used to AUTO-OPEN ~20s after
    // a Performance pipeline. Removed — it popped the Quality coaching queue in the
    // Team Leads' faces even though they're not the queue owners (same confusion as
    // feedback #3). The queue now opens ONLY when the user explicitly clicks it.
  }catch(ex){}
})();

// Restore filters saved before post-pipeline reload
(function(){
  try{
    var raw = localStorage.getItem("argos_filter_restore");
    if(!raw) return;
    localStorage.removeItem("argos_filter_restore");
    var f = JSON.parse(raw);
    if(f.prio) state.prio = new Set(f.prio);
    if(f.curve) state.curve = f.curve;
    if(Array.isArray(f.tenureSet)) state.tenureSet = new Set(f.tenureSet);
    if(Array.isArray(f.mgr)) state.mgr = new Set(f.mgr);
    if(f.q) state.q = f.q;
    if(f.hideCoached != null) state.hideCoached = f.hideCoached;
    if(f.maxRows) state.maxRows = f.maxRows;
    // Sync UI controls to restored state
    if($("searchInput") && f.q) $("searchInput").value = f.q;
    if($("maxInput") && f.maxRows) $("maxInput").value = f.maxRows;
    if($("toggleCoached") && f.hideCoached){
      $("toggleCoached").classList.add("active");
      if($("coachToggleIcon")) $("coachToggleIcon").textContent = "●";
    }
    if(f.curve) document.querySelectorAll("[data-curve]").forEach(function(b){
      b.classList.toggle("on", b.dataset.curve === f.curve);
    });
  }catch(ex){}
})();

// ── Necro permission check (non-blocking) — calvenpj 2026-07-24 ────────────
// Poll the server's Necro permission status; if the user lacks the
// necronomicon-productivity-e membership, show the top banner + a one-time
// toast. Never blocks the tool — Necro data just won't load until they're added.
let _necroWarnedOnce = false;
async function _checkNecroPermission(){
  try{
    const st = await jget(`${API}/api/necro/permission-status`);
    const has = !st || st.has_permission !== false;   // default true
    const banner = $("necroPermBanner");
    const link = $("necroPermLink");
    if(link && st && st.team_url) link.href = st.team_url;
    if(banner){
      // Respect a manual dismiss for THIS session only (re-checks still run).
      const dismissed = banner.dataset.dismissed === "1";
      banner.style.display = (!has && !dismissed) ? "block" : "none";
    }
    if(!has && !_necroWarnedOnce){
      _necroWarnedOnce = true;
      showToast({
        title: "⚠️ Missing Necro Permission",
        body: "Ask your manager to add you to necronomicon-productivity-e (see the banner). Once added, everything will work. · Falta el permiso de Necro — pídelo a tu manager.",
        type: "warn", ms: 9000
      });
    }
  }catch(_){ /* status read failed — assume OK, never nag */ }
}
(()=>{
  const b = $("necroPermDismiss");
  if(b) b.addEventListener("click", ()=>{
    const banner = $("necroPermBanner");
    if(banner){ banner.dataset.dismissed = "1"; banner.style.display = "none"; }
  });
})();

_initApp().then(()=>loadDashboard()).then(()=>_checkNecroPermission());
// Re-check every 15 min (a user added mid-shift sees the banner clear on its own).
setInterval(_checkNecroPermission, 15 * 60 * 1000);

// ─── Captain Mode (tab) ─────────────────────────────────────────
// Two modes: MONITOR (Day-1/2 on shift now, photo+station cards) and REPORTING
// (same associate Day 1 vs Day 2: rate delta + defects). Add/drop logins.
(function(){
  let _capData=null, _capComp=null;
  let _capProc="", _capFloor="";        // Monitor filters (empty = All)
  let _capSort={key:"", dir:-1};        // click-to-sort (numeric cols default desc)
  const _adds=new Set(), _drops=new Set(), _compAdds=new Set();
  const _capFloorOf=r=>{ try{ return (typeof window._floorOfStation==="function") ? (window._floorOfStation(r.station||"")||"") : ""; }catch(_){ return ""; } };
  // Station display identical to Performance/Quality: abbrevStation, but STOW/PICK
  // show only the last-4 workstation digits (e.g. "k-A-02-2265" → "2265").
  const _capStation=r=>{
    const raw=String(r.station||"").trim();
    let disp=abbrevStation(raw)||raw||"—";
    const role=String(r.subprocess||r.process||"").toUpperCase();
    if(role==="STOW"||role==="QUANTITY_STOW"||role.startsWith("PICK")||role==="P2R_PICK"){
      const m=raw.match(/(\d{4})(?!.*\d)/);
      if(m&&m[1]) disp=m[1];
    }
    return disp;
  };
  // Rate vs Vet TPH → color class (good ≥95% · mid 80-95% · bad <80% del veterano).
  const _capRateCls=(rate,vet)=>{ const r=Number(rate),v=Number(vet); if(!isFinite(r)||!isFinite(v)||v<=0) return ""; const p=r/v; return p>=0.95?"cap-rate-good":(p>=0.8?"cap-rate-mid":"cap-rate-bad"); };
  // Worst-rate filter: bottom-N by rate WITHIN each process (owner: "top 5 peores por proceso").
  let _capWorst=false;
  function _capWorstLogins(rows,n){ const bp={}; rows.forEach(r=>{ if(r.rate==null||!isFinite(Number(r.rate)))return; const p=String(r.process||r.subprocess||"").toUpperCase()||"?"; (bp[p]=bp[p]||[]).push(r); }); const s=new Set(); Object.values(bp).forEach(a=>{ a.sort((x,y)=>Number(x.rate)-Number(y.rate)); a.slice(0,n).forEach(r=>s.add(String(r.login).toLowerCase())); }); return s; }
  const _TEXT_COLS=new Set(["login","cohort","process","station","manager"]);
  const _capSortVal=(r,k)=>{
    if(k.slice(0,4)==="err:"){ const lbl=k.slice(4); const x=(r.defects||[]).find(d=>d.error===lbl); return x?Number(x.defects||0):0; }
    switch(k){
      case "rate":    return r.rate==null?-1:Number(r.rate);
      case "vet":     return r.vet_rate==null?-1:Number(r.vet_rate);
      case "errores": return Number(r.total_defects||0);
      case "idle":    return r.idle_min!=null?Number(r.idle_min):(r.idle_pct!=null?Number(r.idle_pct):-1);
      case "day":     return Number(r.day||0);
      case "process": return String(r.process||r.subprocess||"").toLowerCase();
      case "station": return String(_capStation(r)).toLowerCase();
      default:        return String(r[k]||"").toLowerCase();
    }
  };
  // Harmonious single-select dropdowns (same component as Quality). One <div
  // class="q-dd-opt"> per option; the selected one gets ".on". Empty value = "All".
  function _capFillSelect(listEl, btnEl, attr, allLabel, cur, opts){
    const opt=(v,lbl,n)=>`<div class="q-dd-opt${cur===v?' on':''}" data-${attr}="${esc(v)}"><span>${esc(lbl)}</span>${n!=null?`<span class="cap-chip-n">${n}</span>`:''}</div>`;
    listEl.innerHTML=opt("", allLabel, opts.reduce((a,o)=>a+o.n,0))+opts.map(o=>opt(o.v,o.lbl,o.n)).join("");
    const sel=opts.find(o=>o.v===cur);
    btnEl.innerHTML=`${esc(sel?sel.lbl:allLabel)} <span class="q-dd-arrow">▾</span>`;
    btnEl.classList.toggle("has-filter", !!cur);
  }
  function _renderCapFloorSelect(rows){
    const list=$("capFloorList"), btn=$("capFloorBtn"); if(!list||!btn) return;
    const cnt={}; rows.forEach(r=>{ const f=_capFloorOf(r); if(f) cnt[f]=(cnt[f]||0)+1; });
    const floors=Object.keys(cnt).sort();
    const wrap=btn.closest(".q-dropdown-wrap");
    if(!floors.length){ if(wrap) wrap.style.display="none"; return; }
    if(wrap) wrap.style.display="";
    _capFillSelect(list, btn, "floor", "Todas", _capFloor, floors.map(f=>({v:f, lbl:f.toUpperCase(), n:cnt[f]})));
  }
  function _renderCapProcSelect(rows){
    const list=$("capProcList"), btn=$("capProcBtn"); if(!list||!btn) return;
    const cnt={}; rows.forEach(r=>{ const p=String(r.process||r.subprocess||"").toUpperCase(); if(p) cnt[p]=(cnt[p]||0)+1; });
    const procs=Object.keys(cnt).sort();
    const wrap=btn.closest(".q-dropdown-wrap");
    if(!procs.length){ if(wrap) wrap.style.display="none"; return; }
    if(wrap) wrap.style.display="";
    _capFillSelect(list, btn, "proc", "Todos", _capProc, procs.map(p=>({v:p, lbl:p, n:cnt[p]})));
  }
  function _renderCapProcChips(rows){
    const host=$("capProcChips"); if(!host) return;
    const cnt={}, def={};
    rows.forEach(r=>{ const p=String(r.process||r.subprocess||"").toUpperCase(); if(!p)return; cnt[p]=(cnt[p]||0)+1; def[p]=(def[p]||0)+Number(r.total_defects||0); });
    const procs=Object.keys(cnt).sort();
    if(!procs.length){ host.innerHTML=""; host.style.display="none"; return; }
    const chip=(v,lbl,n,cls)=>`<button class="cap-chip${cls}" data-proc="${esc(v)}">${esc(lbl)} <span class="cap-chip-n">${n}</span></button>`;
    host.innerHTML=`<span class="cap-chip-lbl">Proceso</span>`+chip("", "Todos", rows.length, _capProc===""?" on":"")+procs.map(p=>chip(p, p, cnt[p], _capProc===p?" on":"")).join("");
    host.style.display="flex";
  }
  // Per-process people count + defect-spike detection for the clickable cards.
  function _capProcStats(rows){
    const m={}; let tp=0, td=0;
    rows.forEach(r=>{
      const p=String(r.process||r.subprocess||"").toUpperCase(); if(!p) return;
      (m[p]=m[p]||{count:0,defects:0}); m[p].count++; m[p].defects+=Number(r.total_defects||0);
      tp++; td+=Number(r.total_defects||0);
    });
    const avg=tp?td/tp:0;
    Object.values(m).forEach(s=>{ const dpp=s.count?s.defects/s.count:0; s.dpp=dpp; s.spike=(s.defects>0 && dpp>=2 && dpp>=1.5*avg); });
    return {m, tp, td};
  }
  // IDLE / OOWA / Station-Gap chips for the Notas column (key first-days notes).
  function _capNotesChips(r){
    const chips=[];
    const iv=(r.idle_pct!=null && Number.isFinite(Number(r.idle_pct)))?Number(r.idle_pct):null;
    const im=(r.idle_min!=null && Number.isFinite(Number(r.idle_min)))?Number(r.idle_min):null;
    if(im!=null || iv!=null){
      // Prefer minutes (owner 2026-08-13); fall back to % when idle_min is missing.
      const label = im!=null ? `${im.toFixed(0)} min` : `${iv.toFixed(0)}%`;
      const hot   = (im!=null && im>=30) || (im==null && iv!=null && iv>=10);   // 30 min = legal idle gate
      chips.push(`<span class="cap-note-chip${hot?' hot':''}">IDLE ${label}</span>`);
    }
    const nt=String(r.notes||"");
    const g=nt.match(/Gap:\s*([\d.]+)\s*%/i); if(g) chips.push(`<span class="cap-note-chip hot">Gap ${g[1]}%</span>`);
    const o=nt.match(/OOWA:\s*([\d.]+)\s*min/i); if(o) chips.push(`<span class="cap-note-chip hot">OOWA ${o[1]}m</span>`);
    return chips.length ? chips.join(" ") : '<span style="color:var(--text-muted)">—</span>';
  }
  // Compact acronym for per-error column headers (full name goes in the tooltip).
  // Custom overrides per owner: Nike Each Multiple Events → ME, Pick Error Indicator
  // → PEI, Pick Short → Short. Fallback = first letters of each word.
  const _CAP_ERR_ABBR={
    "nike each multiple events":"ME",
    "pick error indicator":"PEI",
    "pick short":"Short",
    "bin filter violations":"BFV",
    "bin filter violation":"BFV",
    "pack slam kick out":"Slam KO",
    "pack slam wrong box":"Slam WB",
    "pack missing item":"Missing",
    "pack damaged item":"Damaged",
    "pack unscannable item":"Unsc",
    "pack shipment exception":"Ship Exc",
  };
  const _shortErr=l=>{
    const k=String(l||"").trim().toLowerCase();
    if(_CAP_ERR_ABBR[k]) return _CAP_ERR_ABBR[k];
    // Phrase-level abbreviation — covers every Pick/Pack family (AFE1/Single/Other/
    // VRET/P2R/Induct/Rebin) without enumerating all 40. Full name stays in tooltip.
    let s=String(l||"")
      .replace(/Slam Kickout Override/i,"Slam KO Ovr")
      .replace(/Slam Kickout/i,"Slam KO")
      .replace(/Slam Wrong Box/i,"Slam WrBox")
      .replace(/Shipment Exception/i,"Ship Exc")
      .replace(/Error Indicator/i,"EI")
      .replace(/Multiple Events?/i,"Mult")
      .replace(/Unscannable/i,"Unsc")
      .replace(/Shortage/i,"Short")
      .replace(/Overage/i,"Over")
      .replace(/Damaged?/i,"Dmg")
      .replace(/Missing/i,"Miss")
      .replace(/\bItem\b/i,"Itm")
      .replace(/\bInduct\b/i,"Ind")
      .replace(/\bRebin\b/i,"Reb")
      .replace(/Untraceable/i,"Untr")
      .replace(/Violations?/i,"Viol")
      .trim();
    return s;
  };
  // Per-error overview: total defects on shift + defects/associates-in-task ratio.
  function _capErrStats(rows){
    const procCount={}; rows.forEach(r=>{ const p=String(r.process||r.subprocess||"").toUpperCase(); if(p) procCount[p]=(procCount[p]||0)+1; });
    const m={};
    rows.forEach(r=>(r.defects||[]).forEach(x=>{ if(!Number(x.defects))return; const e=m[x.error]=m[x.error]||{total:0,people:0,proc:{},pri:false}; e.total+=Number(x.defects||0); e.people++; if(x.priority)e.pri=true; const p=String(r.process||r.subprocess||"").toUpperCase(); if(p)e.proc[p]=(e.proc[p]||0)+1; }));
    Object.values(m).forEach(e=>{ const dom=Object.keys(e.proc).sort((a,b)=>e.proc[b]-e.proc[a])[0]; const den=dom?procCount[dom]:0; e.ratio=den?e.total/den:0; e.denom=den; });
    return m;
  }
  // Single Performance-style KPI strip: First-days · Con defectos · En prioridad
  // · top error tiles (clickable → sort by that error). One row, no floating cards.
  // KPIs PRINCIPALES — 5 tiles. (Cumplimiento = % sin alerta; Tiempo = IDLE prom.
  // Ajustables si el owner quiere otra definición.)
  function _renderCapKpi(rows){
    const host=$("capKpi"); if(!host) return;
    const total=rows.length;
    const activos=rows.filter(r=>r.rate!=null && isFinite(Number(r.rate))).length;
    const alertas=rows.filter(r=>(r.defects||[]).some(x=>x.priority)).length;
    const sinAlerta=total-alertas;
    const cumpl=total?Math.round(sinAlerta*100/total):0;
    const idv=rows.map(r=>r.idle_pct).filter(v=>v!=null && isFinite(Number(v))).map(Number);
    const idle=idv.length?Math.round(idv.reduce((a,b)=>a+b,0)/idv.length):null;
    const tile=(num,lbl,hint,cls)=>`<div class="cap-kpi${cls?' '+cls:''}"><div class="cap-kpi-num">${num}</div><div class="cap-kpi-lbl">${esc(lbl)}</div>${hint?`<div class="cap-kpi-hint">${esc(hint)}</div>`:''}</div>`;
    host.innerHTML=
       tile(total, "First-days", (_capData&&_capData.is_past)?"past day":"Day-1/2 en turno", "")
      +tile(activos, "Activos", "con rate (≥0.5h)", "")
      +tile(alertas, "Alertas", alertas?"sobre su umbral":"sin alertas", alertas?"hot":"")
      +tile(cumpl+"%", "Cumplimiento", `${sinAlerta}/${total} sin alerta`, cumpl>=90?"good":(cumpl<70?"hot":""))
      +tile(idle!=null?idle+"%":"—", "IDLE prom", idle!=null?"idle medio del grupo":"sin datos", (idle!=null&&idle>=10)?"hot":"");
    host.style.display="flex";
  }
  // RENDIMIENTO DEL TURNO — un tile por proceso: headcount + rate medio + defectos.
  // Clickable → filtra la tabla por ese proceso (reemplaza los chips de proceso).
  function _renderCapProcTiles(rows){
    const host=$("capProcTiles"); if(!host) return;
    const agg={}; let T={n:0,rate:0,rn:0,def:0,vet:0,vn:0};
    const add=(a,r)=>{ a.n++; a.def+=Number(r.total_defects||0);
      if(r.rate!=null&&isFinite(Number(r.rate))){a.rate+=Number(r.rate);a.rn++;}
      if(r.vet_rate!=null&&isFinite(Number(r.vet_rate))){a.vet+=Number(r.vet_rate);a.vn++;} };
    rows.forEach(r=>{ const p=String(r.process||r.subprocess||"").toUpperCase(); if(!p)return; add(agg[p]=agg[p]||{n:0,rate:0,rn:0,def:0,vet:0,vn:0}, r); add(T, r); });
    const procs=Object.keys(agg).sort();
    const fmt=(s,c)=>c?Math.round(s/c):'—';
    const trow=(v,proc,a,cls)=>`<tr class="cap-err-trow${cls}" data-proc="${esc(v)}"><td><b>${esc(proc)}</b></td><td>${a.n}</td><td>${fmt(a.rate,a.rn)}</td><td>${fmt(a.vet,a.vn)}</td><td>${(a.n?a.def/a.n:0).toFixed(2)}</td></tr>`;
    let h=`<table class="cap-err-tbl"><thead><tr><th>Proceso</th><th>Asociados</th><th>TPH prom</th><th>Vet TPH</th><th>Err/asoc</th></tr></thead><tbody>`;
    h+=trow("", "Todos", T, _capProc===""?" on":"");
    h+=procs.map(p=>trow(p, p, agg[p], _capProc===p?" on":"")).join("");
    host.innerHTML=h+`</tbody></table>`;
    host.style.display="block";
  }
  // RESUMEN DE ERRORES — mini-tabla: error · total · /pers · asociados. Click en
  // una fila ordena el Detalle por ese error (toggle).
  function _renderCapErrSummary(rows){
    const host=$("capErrSummary"); if(!host) return;
    const m=_capErrStats(rows);
    const labels=Object.keys(m).sort((a,b)=>m[b].total-m[a].total);
    if(!labels.length){ host.innerHTML='<div class="cap-empty" style="padding:8px 2px">Sin errores en el turno 🎉</div>'; return; }
    let h=`<table class="cap-err-tbl"><thead><tr><th>Error</th><th>Total</th><th>/pers</th><th title="Personas en ese proceso (no solo quien cometió el error)">Asociados</th></tr></thead><tbody>`;
    for(const l of labels){
      const e=m[l]; const on=_capSort.key==="err:"+l;
      // "Asociados" = total de personas en el proceso dominante del error (el
      // mismo denominador que usa /pers), no solo los que cometieron el error.
      // Tooltip: cuántos de ellos lo cometieron. owner 2026-08-15.
      const den=e.denom||e.people;
      h+=`<tr class="cap-err-trow${on?' on':''}" data-err="${esc(l)}"><td>${esc(l)}</td><td class="${e.pri?'cap-err-hi':''}"><b>${e.total}</b>${e.pri?' ⚠':''}</td><td>${e.ratio.toFixed(2)}</td><td title="${e.people} con este error">${den}</td></tr>`;
    }
    host.innerHTML=h+`</tbody></table>`;
  }
  // STATUS BAR — recuento, prioridad y peor error del turno + hora.
  function _renderCapStatus(rows){
    const host=$("capStatus"); if(!host) return;
    const m=_capErrStats(rows);
    const worst=Object.keys(m).sort((a,b)=>m[b].total-m[a].total)[0];
    const pri=rows.filter(r=>(r.defects||[]).some(x=>x.priority)).length;
    const parts=[`<b>${rows.length}</b> operadores`];
    if(pri) parts.push(`<span style="color:var(--red,#dc2626)">⚠ ${pri} en prioridad</span>`);
    if(worst) parts.push(`peor error: <b>${esc(worst)}</b> (${m[worst].total})`);
    parts.push(`actualizado ${new Date().toLocaleTimeString('es-ES',{hour:'2-digit',minute:'2-digit'})}`);
    host.innerHTML=parts.join(" · ");
  }
  function _ymd(daysAgo){ const d=new Date(); if(daysAgo!=null) d.setDate(d.getDate()-daysAgo); return d.toISOString().slice(0,10); }
  // Week-at-a-glance day picker: last 7 days as pills (Hoy / Ayer / Wd DD).
  function _renderCapDayPills(){
    const host=$("capDayPills"); if(!host) return;
    const sel=$("capDate").value||_ymd(0);
    const WD=['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'];
    let h="";
    for(let i=0;i<7;i++){
      const d=new Date(); d.setDate(d.getDate()-i);
      const ymd=d.toISOString().slice(0,10);
      const lbl=i===0?'Hoy':(i===1?'Ayer':`${WD[d.getDay()]} ${d.getDate()}`);
      h+=`<span class="cap-quick${ymd===sel?' on':''}" data-date="${ymd}" title="${ymd}">${lbl}</span>`;
    }
    host.innerHTML=h;
  }
  function _capMode(m){
    document.querySelectorAll(".cap-mode").forEach(b=>b.classList.toggle("on",b.dataset.capMode===m));
    $("capPaneMonitor").style.display = m==="monitor"?"":"none";
    $("capPaneReport").style.display  = m==="report"?"":"none";
    if(m==="report" && !$("capD1").value){ $("capD1").value=_ymd(1); $("capD2").value=_ymd(0); }
  }
  // ── MONITOR ──
  async function _monRun(){
    const date=$("capDate").value||_ymd(0);
    const wrap=$("capCards"); if(wrap) wrap.innerHTML='<div class="cap-empty">Loading…</div>';
    const q=[..._adds].join(","), x=[..._drops].join(",");
    try{
      _capData=await jget(`${API}/api/captain/report?fc=${encodeURIComponent(currentFC)}&date=${encodeURIComponent(date)}`
        +(q?`&logins=${encodeURIComponent(q)}`:"")+(x?`&exclude=${encodeURIComponent(x)}`:""));
      _monRender();
    }catch(e){ if(wrap) wrap.innerHTML=`<div class="cap-empty" style="color:#c0392b">Error: ${esc(e.message||String(e))}</div>`; }
  }
  function _monRender(){
    const d=_capData; if(!d) return;
    const allRows=d.rows||[];
    _renderCapProcTiles(allRows);
    _renderCapFloorSelect(allRows);
    _renderCapProcSelect(allRows);
    const rows=allRows.filter(r=>{
      if(_capProc && String(r.process||r.subprocess||"").toUpperCase()!==_capProc) return false;
      if(_capFloor && _capFloorOf(r)!==_capFloor) return false;
      return true;
    });
    _renderCapKpi(rows);
    _renderCapErrSummary(rows);
    _renderCapStatus(rows);
    // Detail rows: optional "peores por proceso" filter (bottom-5 by rate / process).
    let detailRows = rows.slice();
    if(_capWorst){ const w=_capWorstLogins(rows,5); detailRows=detailRows.filter(r=>w.has(String(r.login).toLowerCase())); }
    // Per-error columns (only errors present in the shown rows), worst first.
    const _et={};
    detailRows.forEach(r=>(r.defects||[]).forEach(x=>{ if(Number(x.defects)) _et[x.error]=(_et[x.error]||0)+Number(x.defects); }));
    const errCols=Object.keys(_et).sort((a,b)=>_et[b]-_et[a]);
    if(_capSort.key){
      const k=_capSort.key, dir=_capSort.dir;
      detailRows.sort((a,b)=>{ const va=_capSortVal(a,k), vb=_capSortVal(b,k); if(va<vb)return -dir; if(va>vb)return dir; return 0; });
    }
    const _fp=[];
    if(_capProc) _fp.push(`Proceso: <b>${esc(_capProc)}</b>`);
    if(_capFloor) _fp.push(`Planta: <b>${esc(String(_capFloor).toUpperCase())}</b>`);
    if(_capWorst) _fp.push("Top opportunities (5/proc)");
    const _flt=_fp.join(" · ");
    $("capMeta").innerHTML=`<b>${d.date}</b>${_flt?` · ${_flt} <span style="color:var(--text-muted);font-size:11px">(click «Todos» para quitar)</span>`:""}`;
    const wrap=$("capCards");
    wrap.style.display="block";   // table view (container defaults to a card grid)
    if(!detailRows.length){ wrap.innerHTML='<div class="cap-empty">No hay asociados con esos filtros.</div>'; $("capCsv").style.display="none"; return; }
    const r0=(v,t)=>v!=null?Math.round(v):`<span style="color:#c98500"${t?` title="${t}"`:''}>—</span>`;
    const av=r=>r.photo_url
      ? `<img src="${esc(r.photo_url)}" style="width:34px;height:34px;border-radius:50%;object-fit:cover" onerror="this.outerHTML='<div style=&quot;width:34px;height:34px;border-radius:50%;background:var(--bg-input);display:flex;align-items:center;justify-content:center;color:var(--text-secondary)&quot;>?</div>'">`
      : `<div style="width:34px;height:34px;border-radius:50%;background:var(--bg-input);display:flex;align-items:center;justify-content:center;color:var(--text-secondary)">?</div>`;
    const _si=k=> _capSort.key===k ? (_capSort.dir<0?' ▼':' ▲') : '';
    const _th=(k,lbl,tip)=>`<th data-cap-sort="${k}" style="cursor:pointer;user-select:none"${tip?` title="${esc(tip)}"`:''}>${lbl}${_si(k)}</th>`;
    const errTh=errCols.map(l=>_th("err:"+l, esc(_shortErr(l)), l)).join("");
    let h=`<table class="cap-table cap-rtable"><thead><tr>
      <th></th>${_th("day","Day")}${_th("login","Login")}${_th("cohort","Cohort")}${_th("process","Process")}${_th("station","Estación")}${_th("rate","Rate")}${_th("vet","Vet")}${_th("idle","Notas")}${errTh}<th></th>
    </tr></thead><tbody>`;
    for(const r of detailRows){
      const dm={}; (r.defects||[]).forEach(x=>{ dm[x.error]=x; });
      const errTds=errCols.map(l=>{ const x=dm[l]; if(!x||!Number(x.defects)) return `<td style="text-align:center;color:var(--text-muted)">—</td>`; return `<td style="text-align:center"><span class="cap-def ${x.priority?'cap-def-hi':'cap-def-lo'}">${Number(x.defects)}</span></td>`; }).join("");
      h+=`<tr>
        <td>${av(r)}</td>
        <td><span class="cap-day ${r.day===2?'d2':''}">Day ${r.day||'?'}</span></td>
        <td><b>${esc(r.login)}</b>${r.manual?' <span class="cap-manual-badge">manual</span>':''}<br><span style="font-size:11px;color:var(--text-secondary)">${esc(r.name||'')}</span></td>
        <td>${esc(r.cohort||'—')}</td>
        <td title="${esc(r.subprocess||'')}">${esc(r.process||r.subprocess||'—')}</td>
        <td>${esc(_capStation(r))}</td>
        <td class="${_capRateCls(r.rate,r.vet_rate)}">${r0(r.rate,'No rate — needs FCLM')}</td>
        <td>${r0(r.vet_rate)}</td>
        <td style="text-align:left">${_capNotesChips(r)}</td>
        ${errTds}
        <td><button class="row-btn" data-drop="${esc(r.login)}" title="Remove" style="padding:2px 8px">✕</button></td>
      </tr>`;
    }
    h+=`</tbody></table>`;
    wrap.innerHTML=h;
    $("capCsv").style.display="";
    wrap.querySelectorAll("[data-drop]").forEach(b=>b.addEventListener("click",()=>{ const lg=b.dataset.drop.toLowerCase(); _drops.add(lg); _adds.delete(lg); _monRun(); }));
  }
  function _monCsv(){
    const d=_capData; if(!d||!d.rows.length) return;
    const head=["Day","Login","Name","Cohort","Manager","Station","Sub-process","Rate","Vet rate","Defects"];
    const lines=[head.join(",")];
    for(const r of d.rows){ const defs=(r.defects||[]).map(x=>`${x.error}:${x.defects}`).join("; ");
      lines.push([r.day||"",r.login,r.name||"",r.cohort||"",r.manager||"",r.station||"",r.subprocess||"",r.rate!=null?Math.round(r.rate):"",r.vet_rate!=null?Math.round(r.vet_rate):"",defs].map(c=>`"${String(c).replace(/"/g,'""')}"`).join(",")); }
    const b=new Blob([lines.join("\n")],{type:"text/csv"}); const a=document.createElement("a"); a.href=URL.createObjectURL(b); a.download=`captain_monitor_${d.date}_${d.fc}.csv`; a.click(); URL.revokeObjectURL(a.href);
  }
  // ── REPORTING (Day1 vs Day2) ──
  async function _compRun(){
    const d1=$("capD1").value, d2=$("capD2").value;
    if(!d1||!d2){ $("capCompWrap").innerHTML='<div class="cap-empty">Pick both dates.</div>'; return; }
    const wrap=$("capCompWrap"); wrap.innerHTML='<div class="cap-empty">Comparing…</div>';
    const q=[..._compAdds].join(",");
    try{
      _capComp=await jget(`${API}/api/captain/compare?fc=${encodeURIComponent(currentFC)}&date1=${d1}&date2=${d2}`+(q?`&logins=${encodeURIComponent(q)}`:""));
      _compRender();
    }catch(e){ wrap.innerHTML=`<div class="cap-empty" style="color:#c0392b">Error: ${esc(e.message||String(e))}</div>`; }
  }
  function _renderCompProcSummary(rows, d1, d2){
    const host=$("capCompProc"); if(!host) return;
    const lbl=$("capCompProcLbl"), det=$("capCompDetLbl");
    if(!rows.length){ host.innerHTML=""; if(lbl) lbl.style.display="none"; if(det) det.style.display="none"; return; }
    if(lbl) lbl.style.display=""; if(det) det.style.display="";
    const acc={};
    const bump=(a,rateD,vetD,defsD,which)=>{ if(rateD!=null&&isFinite(Number(rateD))){a[which+"Rate"]+=Number(rateD);a[which+"Rn"]++;} if(vetD!=null&&isFinite(Number(vetD))){a[which+"Vet"]+=Number(vetD);a[which+"Vn"]++;} a[which+"Def"]+=(defsD||[]).reduce((s,x)=>s+Number(x.defects||0),0); };
    let TOT={n:0,d1Rate:0,d1Rn:0,d1Vet:0,d1Vn:0,d1Def:0,d2Rate:0,d2Rn:0,d2Vet:0,d2Vn:0,d2Def:0};
    rows.forEach(r=>{ const p=String(r.process||r.subprocess||"").toUpperCase()||"—"; const a=acc[p]=acc[p]||{n:0,d1Rate:0,d1Rn:0,d1Vet:0,d1Vn:0,d1Def:0,d2Rate:0,d2Rn:0,d2Vet:0,d2Vn:0,d2Def:0}; a.n++; TOT.n++; bump(a,r.rate_d1,r.vet_d1,r.defects_d1,"d1"); bump(TOT,r.rate_d1,r.vet_d1,r.defects_d1,"d1"); bump(a,r.rate_d2,r.vet_d2,r.defects_d2,"d2"); bump(TOT,r.rate_d2,r.vet_d2,r.defects_d2,"d2"); });
    const procs=Object.keys(acc).sort();
    const avg=(s,c)=>c?Math.round(s/c):'—';
    const row=(name,a)=>{
      const r1=a.d1Rn?a.d1Rate/a.d1Rn:null, r2=a.d2Rn?a.d2Rate/a.d2Rn:null;
      const dl=(r1!=null&&r2!=null)?(r2-r1):null;
      const dcls=dl==null?'flat':(dl>0?'up':(dl<0?'down':'flat'));
      const dtxt=dl==null?'—':(dl>0?`▲ +${Math.round(dl)}`:(dl<0?`▼ ${Math.round(dl)}`:'0'));
      const cls1=_capRateCls(r1, a.d1Vn?a.d1Vet/a.d1Vn:null);
      const cls2=_capRateCls(r2, a.d2Vn?a.d2Vet/a.d2Vn:null);
      return `<tr><td><b>${esc(name)}</b></td><td>${a.n}</td><td class="${cls1}">${avg(a.d1Rate,a.d1Rn)}</td><td class="${cls2}">${avg(a.d2Rate,a.d2Rn)}</td><td class="cap-delta ${dcls}">${dtxt}</td><td>${avg(a.d1Vet,a.d1Vn)}</td><td>${avg(a.d2Vet,a.d2Vn)}</td><td>${(a.n?a.d1Def/a.n:0).toFixed(2)}</td><td>${(a.n?a.d2Def/a.n:0).toFixed(2)}</td></tr>`;
    };
    let h=`<table class="cap-err-tbl" style="min-width:640px"><thead><tr>
        <th rowspan="2">Proceso</th><th rowspan="2">Asoc.</th>
        <th colspan="3" style="text-align:center">TPH prom</th>
        <th colspan="2" style="text-align:center">Vet TPH</th>
        <th colspan="2" style="text-align:center">Err/asoc</th>
      </tr>
      <tr><th title="${esc(d1)}">D1</th><th title="${esc(d2)}">D2</th><th>Δ</th><th>D1</th><th>D2</th><th>D1</th><th>D2</th></tr>
      </thead><tbody>`;
    h+=row("Todos", TOT);
    h+=procs.map(p=>row(p, acc[p])).join("");
    host.innerHTML=h+`</tbody></table>`;
  }
  function _compRender(){
    const d=_capComp; if(!d) return;
    $("capCompMeta").innerHTML=`<b>${d.count}</b> asociados · Day 1 = ${esc(d.date1)} → Day 2 = ${esc(d.date2)}`;
    const rows=d.rows||[]; const wrap=$("capCompWrap");
    _renderCompProcSummary(rows, d.date1, d.date2);
    if(!rows.length){ wrap.innerHTML='<div class="cap-empty">No associates for these dates.</div>'; $("capCompCsv").style.display="none"; return; }
    const defList=a=>(a&&a.length)?a.map(x=>{const n=Number(x.defects||0);const t=n>=8?'hi':(n>=3?'mid':'lo');return `<span class="cap-def cap-def-${t}">${esc(x.error)}: ${n}</span>`;}).join(""):`<span class="cap-def none">0</span>`;
    const r0=v=>v!=null?Math.round(v):'<span style="color:#c98500">—</span>';
    const _dt=s=>`<span style="font-weight:400;font-size:10px;color:var(--text-secondary)">${esc(s)}</span>`;
    // Grouped header: Rate splits into D1 / D2 / Δ; Errores is ONE column with
    // D1/D2 sub-headers inside each cell (owner's design 2026-08-13).
    let h=`<table class="cap-table cap-rtable"><thead>
      <tr>
        <th rowspan="2">Login</th><th rowspan="2">Cohort</th><th rowspan="2">Process</th><th rowspan="2">Estación</th>
        <th colspan="3" style="text-align:center">Rate</th>
        <th rowspan="2">Errores</th>
      </tr>
      <tr>
        <th>D1<br>${_dt(d.date1)}</th><th>D2<br>${_dt(d.date2)}</th><th>Δ</th>
      </tr></thead><tbody>`;
    for(const r of rows){
      const dl=r.rate_delta;
      const dcls=dl==null?'flat':(dl>0?'up':(dl<0?'down':'flat'));
      const dtxt=dl==null?'—':(dl>0?`▲ +${Math.round(dl)}`:(dl<0?`▼ ${Math.round(dl)}`:'0'));
      const _lbl=t=>`<span style="display:inline-block;min-width:24px;font-size:10px;font-weight:700;color:var(--text-secondary)">${t}</span>`;
      h+=`<tr>
        <td><b>${esc(r.login)}</b><br><span style="font-size:11px;color:var(--text-secondary)">${esc(r.name||'')}</span></td>
        <td>${esc(r.cohort||'—')}</td>
        <td>${esc(r.process||r.subprocess||'—')}</td>
        <td>${esc(_capStation(r))}</td>
        <td class="${_capRateCls(r.rate_d1,r.vet_d1)}">${r0(r.rate_d1)}</td>
        <td class="${_capRateCls(r.rate_d2,r.vet_d2)}">${r0(r.rate_d2)}</td>
        <td class="cap-delta ${dcls}">${dtxt}</td>
        <td style="text-align:left">
          <div style="margin:2px 0">${_lbl('D1')} ${defList(r.defects_d1)}</div>
          <div style="margin:2px 0">${_lbl('D2')} ${defList(r.defects_d2)}</div>
        </td>
      </tr>`;
    }
    h+=`</tbody></table>`; wrap.innerHTML=h; $("capCompCsv").style.display="";
  }
  function _compCsv(){
    const d=_capComp; if(!d||!d.rows.length) return;
    const head=["Login","Name","Cohort","Process","Station","Sub-process",`Rate D1 (${d.date1})`,`Rate D2 (${d.date2})`,"Delta rate","Defects D1","Defects D2"];
    const lines=[head.join(",")];
    for(const r of d.rows){ const f=a=>(a||[]).map(x=>`${x.error}:${x.defects}`).join("; ");
      lines.push([r.login,r.name||"",r.cohort||"",r.process||r.subprocess||"",r.station||"",r.subprocess||"",r.rate_d1!=null?Math.round(r.rate_d1):"",r.rate_d2!=null?Math.round(r.rate_d2):"",r.rate_delta!=null?Math.round(r.rate_delta):"",f(r.defects_d1),f(r.defects_d2)].map(c=>`"${String(c).replace(/"/g,'""')}"`).join(",")); }
    const b=new Blob([lines.join("\n")],{type:"text/csv"}); const a=document.createElement("a"); a.href=URL.createObjectURL(b); a.download=`captain_compare_${d.date1}_vs_${d.date2}_${d.fc}.csv`; a.click(); URL.revokeObjectURL(a.href);
  }
  // ── wiring ──
  window._onCaptainTab=function(){ if(!$("capDate").value) $("capDate").value=_ymd(0); _renderCapDayPills(); if(!_capData) _monRun(); };
  // Captain is on-demand only: _monRun() fires when the trainer opens the tab
  // (window._onCaptainTab) or clicks Refresh — never from the auto-data pipeline.
  document.querySelectorAll(".cap-mode").forEach(b=>b.addEventListener("click",()=>_capMode(b.dataset.capMode)));
  $("capDayPills") && $("capDayPills").addEventListener("click",e=>{ const p=e.target.closest("[data-date]"); if(!p)return; $("capDate").value=p.dataset.date; _renderCapDayPills(); _monRun(); });
  $("capDate") && $("capDate").addEventListener("change",()=>{ _renderCapDayPills(); _monRun(); });
  $("capRun") && $("capRun").addEventListener("click",_monRun);
  $("capCsv") && $("capCsv").addEventListener("click",_monCsv);
  $("capWorstBtn") && $("capWorstBtn").addEventListener("click",()=>{ _capWorst=!_capWorst; const b=$("capWorstBtn"); b.classList.toggle("act-primary",_capWorst); b.classList.toggle("act-secondary",!_capWorst); if(_capData)_monRender(); });
  $("capProcTiles") && $("capProcTiles").addEventListener("click",e=>{ const c=e.target.closest("[data-proc]"); if(!c)return; const p=c.dataset.proc; _capProc=(p===_capProc)?"":p; if(_capData)_monRender(); });
  // Harmonious single-select dropdowns (reuse Quality's outside-click-close list).
  function _capBindSelect(btnId, panelId, listId, attr, setFn){
    const btn=$(btnId), panel=$(panelId), list=$(listId);
    if(!btn||!panel||!list) return;
    try{ if(typeof _allDropdownPanels!=="undefined") _allDropdownPanels.push(panel); }catch(_){ }
    btn.addEventListener("click",e=>{
      e.stopPropagation();
      const willOpen = panel.style.display==="none" || !panel.style.display;
      try{ if(typeof _allDropdownPanels!=="undefined") _allDropdownPanels.forEach(p=>p.style.display="none"); }catch(_){ }
      panel.style.display = willOpen ? "block" : "none";
    });
    list.addEventListener("click",e=>{
      const o=e.target.closest("[data-"+attr+"]"); if(!o)return;
      setFn(o.getAttribute("data-"+attr)||"");
      panel.style.display="none";
      if(_capData)_monRender();
    });
  }
  _capBindSelect("capFloorBtn","capFloorPanel","capFloorList","floor", v=>{ _capFloor=v; });
  _capBindSelect("capProcBtn","capProcPanel","capProcList","proc", v=>{ _capProc=v; });
  const _capErrSortClick=e=>{ const c=e.target.closest("[data-err]"); if(!c)return; const key="err:"+c.dataset.err; _capSort=(_capSort.key===key)?{key:"",dir:-1}:{key,dir:-1}; if(_capData)_monRender(); };
  $("capKpi") && $("capKpi").addEventListener("click",_capErrSortClick);
  $("capErrSummary") && $("capErrSummary").addEventListener("click",_capErrSortClick);
  $("capCards") && $("capCards").addEventListener("click",e=>{ const th=e.target.closest("th[data-cap-sort]"); if(!th)return; const k=th.dataset.capSort; if(_capSort.key===k) _capSort.dir*=-1; else _capSort={key:k, dir:(_TEXT_COLS.has(k)?1:-1)}; if(_capData)_monRender(); });
  function _add(){ const el=$("capAddLogin"); const lg=(el.value||"").trim().toLowerCase(); if(!lg) return; _adds.add(lg); _drops.delete(lg); el.value=""; _monRun(); }
  $("capAddBtn") && $("capAddBtn").addEventListener("click",_add);
  $("capAddLogin") && $("capAddLogin").addEventListener("keydown",e=>{ if(e.key==="Enter") _add(); });
  $("capCompareRun") && $("capCompareRun").addEventListener("click",_compRun);
  $("capCompCsv") && $("capCompCsv").addEventListener("click",_compCsv);
  function _cadd(){ const el=$("capCompAdd"); const lg=(el.value||"").trim().toLowerCase(); if(!lg) return; _compAdds.add(lg); el.value=""; _compRun(); }
  $("capCompAddBtn") && $("capCompAddBtn").addEventListener("click",_cadd);
  $("capCompAdd") && $("capCompAdd").addEventListener("keydown",e=>{ if(e.key==="Enter") _cadd(); });
})();

// ─── Settings Popover ──────────────────────────────────────────
const _spPanel = $("settingsPopover");
const _spBtn = $("btnSettings");
if(_spBtn && _spPanel){
  _spBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    _spPanel.style.display = _spPanel.style.display === "none" ? "block" : "none";
    // Refresh the alert toggles each time the popover opens (eligibility/site
    // context may have changed since login).
    if(_spPanel.style.display !== "none"){
      if(window._syncAlertToggleUI) window._syncAlertToggleUI();
      // Reflect the persisted auto-data state in its checkbox.
      const _ar = $("spAutoRefresh");
      if(_ar){ try{ _ar.checked = localStorage.getItem("argos_auto_data")==="1"; }catch(_){} }
    }
  });
  document.addEventListener("click", (e) => {
    if(_spPanel.style.display !== "none" && !_spPanel.contains(e.target) && e.target !== _spBtn)
      _spPanel.style.display = "none";
  });

  // Theme buttons
  const _themeButtons = ["spThemeLight","spThemeDark","spThemeKokiri","spThemeMidnight","spThemeViolet","spThemeCherry","spThemeAws","spThemeAmber","spThemeAmberDark","spThemeGraphite","spThemeGraphiteNoir"].map($).filter(Boolean);
  function _syncThemeButtons(){
    const cur = document.documentElement.getAttribute("data-theme") || "light";
    _themeButtons.forEach(btn => btn.classList.toggle("active", btn.dataset.val === cur));
  }
  _syncThemeButtons();
  _themeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const val = btn.dataset.val;
      // Briefly tag <html> so CSS can fade backgrounds/colors during the swap.
      document.documentElement.classList.add("theme-transitioning");
      document.documentElement.setAttribute("data-theme", val);
      setTimeout(() => document.documentElement.classList.remove("theme-transitioning"), 420);
      localStorage.setItem("argos-theme", val);
      jpost(`${API}/api/prefs`, {theme: val}).catch(()=>{});
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
      jpost(`${API}/api/prefs`, {lang: _lang}).catch(()=>{});
      _syncLangButtons();
      _applyI18n();
    });
  });

  // Density (comfortable / compact)
  const _densityButtons = ["spDensityComfortable","spDensityCompact"].map($).filter(Boolean);
  function _applyDensity(d){
    if(d === "compact") document.documentElement.setAttribute("data-density","compact");
    else document.documentElement.removeAttribute("data-density");
  }
  function _syncDensityButtons(){
    const cur = document.documentElement.getAttribute("data-density") || "comfortable";
    _densityButtons.forEach(btn => btn.classList.toggle("active", btn.dataset.val === cur));
  }
  _applyDensity(localStorage.getItem("argos-density") || "comfortable");
  _syncDensityButtons();
  _densityButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const v = btn.dataset.val;
      _applyDensity(v);
      try { localStorage.setItem("argos-density", v); } catch(_){}
      _syncDensityButtons();
    });
  });

  // Diagnostics → clipboard
  const _spDiag = $("spDiagCopy");
  if(_spDiag){
    _spDiag.addEventListener("click", async () => {
      const orig = _spDiag.textContent;
      _spDiag.textContent = t("diag_collecting");
      _spDiag.disabled = true;
      try{
        const d = await jget(`${API}/api/system/diag`);
        const block = [
          "=== Project Argos – Soporte ===",
          `Versión:   ${d.version || "?"}`,
          `Login:     ${d.login || "?"}`,
          `OS:        ${d.os || "?"}`,
          `Frozen:    ${d.frozen ? "sí" : "no"}`,
          `Install:   ${d.install || "?"}`,
          `Data dir:  ${d.data_dir || "?"}`,
          `Pre-auth:  ${d.preauth || "?"}`,
          `Midway:    ${d.midway ? d.midway.state + " (" + (d.midway.seconds_left || 0) + "s left)" : "?"}`,
          `Dashboard: ${d.dashboard_csv ? (d.dashboard_csv.exists ? "ok ("+ (d.dashboard_csv.size||0) +" bytes, mtime="+ (d.dashboard_csv.mtime||0) +")" : "missing") : "?"}`,
          "",
          "--- argos.log (últimas 60 líneas) ---",
          d.log_tail || "(vacío)",
        ].join("\n");
        try{ await navigator.clipboard.writeText(block); }
        catch(_){
          // Fallback: textarea hack for restrictive environments
          const ta = document.createElement("textarea");
          ta.value = block; ta.style.position="fixed"; ta.style.left="-9999px";
          document.body.appendChild(ta); ta.select();
          document.execCommand("copy"); ta.remove();
        }
        showToast({ title: t("diag_copied_title"), body: t("diag_copied_body"), type: "ok" });
      }catch(e){
        showToast({ title: t("diag_error_title"), body: String(e.message||e), type: "err" });
      }finally{
        _spDiag.textContent = orig;
        _spDiag.disabled = false;
      }
    });
  }

  // Default FC is no longer set here — the FC chosen in the topbar is the
  // default (persisted by _persistDefaultFc). No dropdown to keep in sync.
}

function _applyI18n(){
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const k = el.getAttribute("data-i18n");
    const v = t(k);
    if(v) el.textContent = v;
  });
  document.querySelectorAll("[data-i18n-title]").forEach(el => {
    const k = el.getAttribute("data-i18n-title");
    const v = t(k);
    if(v) el.title = v;
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const k = el.getAttribute("data-i18n-placeholder");
    const v = t(k);
    if(v) el.placeholder = v;
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
        <tr><td>Errors WK</td><td>Total errores en los últimos 7 días</td></tr>
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
        <tr><td>Errors WK</td><td>Total errors in the last 7 days</td></tr>
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
  let hasInvalid = false;
  for(const inp of inputs){
    const fc = inp.dataset.fc;
    const idx = parseInt(inp.dataset.idx);
    const val = parseFloat(inp.value) || 0;
    if(val <= 0){ inp.style.borderColor="#e53e3e"; hasInvalid=true; }
    else { inp.style.borderColor=""; }
    if(_cfgTargetsData[fc]?.pack_line_targets?.[idx]){
      _cfgTargetsData[fc].pack_line_targets[idx].target_uph = val;
    }
  }
  if(hasInvalid){ _cfgToast("⚠ Some targets have UPH ≤ 0", true); return; }
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
// ── Min Hours in Role (per-site active filter threshold) ──
// Reads/writes downloader_sources.json: default `min_hours_threshold` (1.0) +
// per-site overrides `min_hours_threshold_by_site` (e.g. {MAD7: 0.5}).
let _cfgMinHoursData = null;
// Sites offered as rows (default + known robotic FCs). Admin can also add ad-hoc.
const _CFG_MIN_HOURS_SITES = ["BCN4","BCN1","MAD7","RMU1","OVD1","SVQ1"];
async function _cfgLoadMinHours(){
  try{
    const res = await jget(`${API}/api/admin/config/downloader_sources.json`);
    _cfgMinHoursData = res.data || {};
    _cfgRenderMinHours();
  }catch(e){ const b=$("cfgMinHoursBody"); if(b) b.innerHTML = `<div class="cfg-loading" style="color:#e53e3e">Error: ${esc(e.message)}</div>`; }
}
function _cfgRenderMinHours(){
  const def = _cfgMinHoursData.min_hours_threshold != null ? _cfgMinHoursData.min_hours_threshold : 1.0;
  const bySite = _cfgMinHoursData.min_hours_threshold_by_site || {};
  let html = `<table class="cfg-table"><thead><tr><th>Site</th><th>Min hours</th><th></th></tr></thead><tbody>`;
  html += `<tr><td><b>Default (todos)</b></td><td><input type="number" step="0.5" min="0" class="cfg-minh-default" value="${esc(String(def))}" style="width:70px;font-size:11px"></td><td><span style="font-size:10px;color:var(--text-muted)">aplica a sites sin override</span></td></tr>`;
  const sites = Array.from(new Set([..._CFG_MIN_HOURS_SITES, ...Object.keys(bySite)]));
  for(const s of sites){
    const v = bySite[s] != null ? bySite[s] : "";
    html += `<tr><td>${esc(s)}</td><td><input type="number" step="0.5" min="0" class="cfg-minh-site" data-site="${esc(s)}" value="${esc(String(v))}" placeholder="(default)" style="width:70px;font-size:11px"></td><td><span style="font-size:10px;color:var(--text-muted)">vacío = usa default</span></td></tr>`;
  }
  html += `</tbody></table>`;
  const b=$("cfgMinHoursBody"); if(b) b.innerHTML = html;
}
async function _cfgSaveMinHours(){
  if(!_cfgMinHoursData) return;
  const defInp = document.querySelector(".cfg-minh-default");
  if(defInp){ const d=parseFloat(defInp.value); if(!isNaN(d)) _cfgMinHoursData.min_hours_threshold = d; }
  const bySite = {};
  document.querySelectorAll(".cfg-minh-site").forEach(inp=>{
    const v = inp.value.trim();
    if(v !== ""){ const n=parseFloat(v); if(!isNaN(n)) bySite[inp.dataset.site] = n; }
  });
  _cfgMinHoursData.min_hours_threshold_by_site = bySite;
  try{
    await jpost(`${API}/api/admin/config/downloader_sources.json`, {data: _cfgMinHoursData});
    _cfgToast("✓ Min-hours guardado (aplica en el próximo pipeline)");
  }catch(e){ _cfgToast("✗ " + e.message, true); }
}

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
  // Parity column exposes station_parity (odd/even) — used by sites like MAD7
  // where SINGLES_01/02 split into odd/even sub-lines with different roles.
  let html = `<table class="cfg-table"><thead><tr><th>Station</th><th>Parity</th><th>Role Override</th><th>Function</th></tr></thead><tbody>`;
  for(const fc of fcs){
    const overrides = (_cfgStationsData[fc]||{}).station_overrides || [];
    if(!overrides.length) continue;
    if(!filter){
      html += `<tr class="cfg-group-row"><td colspan="4"><span class="cfg-fc-pill">${esc(fc)}</span></td></tr>`;
    }
    for(let i=0; i<overrides.length; i++){
      const o = overrides[i];
      const par = String(o.station_parity||"");
      const opt = (v,lbl)=>`<option value="${v}" ${par===v?"selected":""}>${lbl}</option>`;
      html += `<tr>
        <td><input type="text" class="cfg-station-input" data-fc="${esc(fc)}" data-idx="${i}" data-field="station_contains" value="${esc(o.station_contains||"")}" style="width:100px;font-size:11px"></td>
        <td><select class="cfg-station-parity" data-fc="${esc(fc)}" data-idx="${i}" style="width:70px;font-size:11px">${opt("","—")}${opt("odd","odd")}${opt("even","even")}</select></td>
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
  // Persist the parity dropdowns. Empty → drop the two parity fields so the
  // override goes back to matching the whole station (no odd/even split).
  const parities = $("cfgStationsBody").querySelectorAll(".cfg-station-parity");
  for(const sel of parities){
    const {fc, idx} = sel.dataset;
    const i = parseInt(idx);
    const ov = _cfgStationsData[fc]?.station_overrides?.[i];
    if(!ov) continue;
    const v = sel.value.trim();
    if(v){ ov.station_parity = v; ov.station_parity_mode = true; }
    else { delete ov.station_parity; delete ov.station_parity_mode; }
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
  _ccInitCatalog();
  _cfgLoadShifts();
  _cfgLoadMinHours();
  _cfgLoadStations();
  _cfgLoadGcaMapping();
}

// ══════════════════════════════════════════════════════════
// GCA Mapping editor (legend + pending-to-map)
// ══════════════════════════════════════════════════════════
let _cfgGcaFull = null;          // whole gca_legend.json (preserve non-legend keys)
let _cfgGcaLegend = {};          // title -> {insight, cat, owner}
let _cfgGcaOwners = ["L&D","Team Lead IB","Team Lead OB","ICQA","Area Manager IB","Area Manager OB"];
let _cfgGcaCats   = ["Concessions","Reactive","Productivity","IRDR","Shipping"];

async function _cfgLoadGcaMapping(){
  try{
    const res = await jget(`${API}/api/admin/config/gca_legend.json`);
    _cfgGcaFull = res.data || {};
    _cfgGcaLegend = _cfgGcaFull.legend || {};
    if(Array.isArray(_cfgGcaFull._owners) && _cfgGcaFull._owners.length) _cfgGcaOwners = _cfgGcaFull._owners;
    if(Array.isArray(_cfgGcaFull._categories) && _cfgGcaFull._categories.length) _cfgGcaCats = _cfgGcaFull._categories;
    _cfgRenderGcaLegend();
  }catch(e){
    const b=$("cfgGcaLegendBody"); if(b) b.innerHTML = `<div class="cfg-loading" style="color:#e53e3e">Error: ${esc(e.message)}</div>`;
  }
  _cfgLoadGcaUnmapped();
}

async function _cfgLoadGcaUnmapped(){
  const body = $("cfgGcaUnmappedBody");
  if(body) body.innerHTML = `<div class="cfg-loading">Loading…</div>`;
  try{
    const res = await jget(`${API}/api/admin/gca-unmapped?fc=${encodeURIComponent(currentFC)}`);
    _cfgRenderGcaUnmapped(res.unmapped || [], res.note || "");
  }catch(e){
    if(body) body.innerHTML = `<div class="cfg-loading" style="color:#e53e3e">Error: ${esc(e.message)}</div>`;
  }
}

function _ownerOpts(sel){
  return _cfgGcaOwners.map(o=>`<option value="${esc(o)}" ${o===sel?'selected':''}>${esc(o)}</option>`).join("");
}
function _catOpts(sel){
  return _cfgGcaCats.map(c=>`<option value="${esc(c)}" ${c===sel?'selected':''}>${esc(c)}</option>`).join("");
}

function _cfgRenderGcaUnmapped(list, note){
  const body = $("cfgGcaUnmappedBody");
  if(!body) return;
  if(!list.length){
    body.innerHTML = `<div class="cfg-loading" style="color:var(--green)">✓ Todo mapeado${note?` — ${esc(note)}`:""}</div>`;
    return;
  }
  let html = `<div style="font-size:11px;color:var(--text-secondary);margin-bottom:8px">${list.length} título(s) sin mapear del último run en ${esc(currentFC)}. Rellena y pulsa ➕ para añadir al legend.</div>`;
  html += `<table class="cfg-table"><thead><tr><th>Título (count)</th><th>Insight</th><th>Cat</th><th>Owner</th><th></th></tr></thead><tbody>`;
  list.forEach((u,idx)=>{
    html += `<tr data-um="${idx}">
      <td style="max-width:280px"><div style="font-weight:700;font-size:11px;word-break:break-word">${esc(u.title)}</div><div style="font-size:10px;color:var(--text-secondary)">×${u.count}${u.scenario?` · ${esc(u.scenario)}`:""}</div></td>
      <td><input type="text" class="cfg-um-insight" data-title="${esc(u.title)}" placeholder="insight" style="width:150px;font-size:11px"></td>
      <td><select class="cfg-um-cat" data-title="${esc(u.title)}" style="font-size:11px">${_catOpts("Productivity")}</select></td>
      <td><select class="cfg-um-owner" data-title="${esc(u.title)}" style="font-size:11px">${_ownerOpts("L&D")}</select></td>
      <td><button class="act-btn act-primary cfg-um-add" data-title="${esc(u.title)}" style="font-size:11px;padding:3px 9px">➕</button></td>
    </tr>`;
  });
  html += `</tbody></table>`;
  body.innerHTML = html;
  body.querySelectorAll(".cfg-um-add").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      const title = btn.dataset.title;
      const ins = body.querySelector(`.cfg-um-insight[data-title="${CSS.escape(title)}"]`).value.trim();
      const cat = body.querySelector(`.cfg-um-cat[data-title="${CSS.escape(title)}"]`).value;
      const own = body.querySelector(`.cfg-um-owner[data-title="${CSS.escape(title)}"]`).value;
      if(!ins){ _cfgToast("✗ Pon un insight primero", true); return; }
      _cfgGcaLegend[title] = {insight: ins, cat: cat, owner: own};
      _cfgRenderGcaLegend();
      btn.closest("tr").style.opacity = "0.4";
      btn.disabled = true; btn.textContent = "✓";
      _cfgToast("Añadido al legend (recuerda 💾 Save)");
    });
  });
}

function _cfgRenderGcaLegend(){
  const body = $("cfgGcaLegendBody");
  if(!body) return;
  const titles = Object.keys(_cfgGcaLegend).sort();
  let html = `<div style="font-size:11px;color:var(--text-secondary);margin-bottom:8px">${titles.length} mapeo(s).</div>`;
  html += `<table class="cfg-table"><thead><tr><th>Título</th><th>Insight</th><th>Cat</th><th>Owner</th><th></th></tr></thead><tbody>`;
  titles.forEach(t=>{
    const v = _cfgGcaLegend[t] || {};
    html += `<tr>
      <td style="max-width:260px;font-size:10.5px;word-break:break-word;font-weight:600">${esc(t)}</td>
      <td><input type="text" class="cfg-leg-insight" data-title="${esc(t)}" value="${esc(v.insight||'')}" style="width:150px;font-size:11px"></td>
      <td><select class="cfg-leg-cat" data-title="${esc(t)}" style="font-size:11px">${_catOpts(v.cat||'Productivity')}</select></td>
      <td><select class="cfg-leg-owner" data-title="${esc(t)}" style="font-size:11px">${_ownerOpts(v.owner||'L&D')}</select></td>
      <td><button class="cfg-del-btn cfg-leg-del" data-title="${esc(t)}" title="Eliminar">×</button></td>
    </tr>`;
  });
  html += `</tbody></table>`;
  body.innerHTML = html;
  body.querySelectorAll(".cfg-leg-del").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      delete _cfgGcaLegend[btn.dataset.title];
      _cfgRenderGcaLegend();
    });
  });
}

function _cfgCollectGcaLegend(){
  // Pull current input values back into _cfgGcaLegend before saving
  const body = $("cfgGcaLegendBody");
  if(!body) return;
  body.querySelectorAll(".cfg-leg-insight").forEach(inp=>{
    const t = inp.dataset.title;
    if(!_cfgGcaLegend[t]) return;
    _cfgGcaLegend[t].insight = inp.value.trim();
  });
  body.querySelectorAll(".cfg-leg-cat").forEach(s=>{ if(_cfgGcaLegend[s.dataset.title]) _cfgGcaLegend[s.dataset.title].cat = s.value; });
  body.querySelectorAll(".cfg-leg-owner").forEach(s=>{ if(_cfgGcaLegend[s.dataset.title]) _cfgGcaLegend[s.dataset.title].owner = s.value; });
}

$("cfgGcaRefreshUnmapped") && $("cfgGcaRefreshUnmapped").addEventListener("click", _cfgLoadGcaUnmapped);

$("cfgSaveGcaMap") && $("cfgSaveGcaMap").addEventListener("click", async ()=>{
  _cfgCollectGcaLegend();
  if(!_cfgGcaFull) _cfgGcaFull = {};
  _cfgGcaFull.legend = _cfgGcaLegend;
  try{
    await jpost(`${API}/api/admin/config/gca_legend.json`, {data: _cfgGcaFull});
    _cfgToast("✓ GCA mapping guardado");
    _cfgLoadGcaUnmapped();
  }catch(e){ _cfgToast("✗ " + e.message, true); }
});

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
$("cfgSaveMinHours") && $("cfgSaveMinHours").addEventListener("click", _cfgSaveMinHours);

// Load config when tab is clicked
document.addEventListener("click",(e)=>{
  const tab = e.target.closest('[data-tab="config"]');
  if(tab && !_cfgTargetsData) _cfgInit();
});

// Delete row handler for config tables
document.addEventListener("click",(e)=>{
  const btn = e.target.closest(".cfg-del-btn");
  if(!btn) return;
  if(!confirm("Delete this entry?")) return;
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

// Admin sidebar tab switching
document.querySelectorAll(".cfg-sidebar-tab").forEach(function(tab){
  tab.addEventListener("click", function(){
    document.querySelectorAll(".cfg-sidebar-tab").forEach(function(t){ t.classList.remove("active"); });
    tab.classList.add("active");
    var section = tab.dataset.cfgTab;
    document.querySelectorAll(".cfg-section").forEach(function(s){ s.classList.remove("active"); });
    var el = document.getElementById("cfg-section-"+section);
    if(el) el.classList.add("active");
  });
});

// Push config button
$("cfgPushBtn") && $("cfgPushBtn").addEventListener("click", async ()=>{
  if(!confirm("Push config changes to Data Central?")) return;
  const btn = $("cfgPushBtn");
  btn.disabled = true; btn.textContent = "Pushing…";
  try{
    const res = await jpost(`${API}/api/admin/push-config`);
    const gitMsg = res.git?.pushed ? "✓ Git pushed" : "⚠ Git: " + (res.git?.message || "skipped");
    _cfgToast(`✓ Pushed ${res.count} files\n${gitMsg}`);
  }catch(e){ _cfgToast("✗ " + e.message, true); }
  btn.disabled = false; btn.textContent = "🔄 Update Data Central";
});

// ── Load & Render: Coaching Courses ──
let _cfgQCoursesData = null;
let _cfgPCoursesData = null;
// Which quality config file/uuid-key we're editing (unified vs legacy).
let _cfgQCoursesFile = "quality_errors.json";
let _cfgQCoursesUuidKey = "course_uuid";

async function _cfgLoadCourses(){
  try{
    // Unified quality_errors.json is the source now (course_uuid lives inside
    // each error). Fall back to legacy quality_courses.json if empty.
    let qRes = await jget(`${API}/api/admin/config/quality_errors.json`);
    if(!qRes.data || !qRes.data.errors){
      qRes = await jget(`${API}/api/admin/config/quality_courses.json`);
      _cfgQCoursesFile = "quality_courses.json"; _cfgQCoursesUuidKey = "uuid";
    } else {
      _cfgQCoursesFile = "quality_errors.json"; _cfgQCoursesUuidKey = "course_uuid";
    }
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
    const uuid = typeof raw === "string" ? raw : (raw?.[_cfgQCoursesUuidKey] || raw?.uuid || raw?.course_uuid || "");
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
    // Preserve existing mode/threshold fields; set the uuid under the right key.
    var prev = _cfgQCoursesData.errors[key] || {enabled:true};
    if(typeof prev !== "object") prev = {enabled:true};
    prev[_cfgQCoursesUuidKey] = uuid;
    _cfgQCoursesData.errors[key] = prev;
    _cfgRenderQualityCourses();
  });
}

function _cfgRenderPerfCourses(){
  const roles = _cfgPCoursesData.role_to_course_uuid || {};
  const names = _cfgPCoursesData.course_names || {};
  const applyOpts = ["both","ld","ops"].map(v => `<option value="${v}">${v==="both"?"Both":v==="ld"?"L&D":"OPS"}</option>`).join("");
  let html = `<table class="cfg-table"><thead><tr><th>Role / Key</th><th>Course UUID</th><th>Course Name</th><th>Applies To</th><th></th></tr></thead><tbody>`;
  for(const role of Object.keys(roles).sort()){
    const raw = roles[role];
    const uuid = typeof raw === "string" ? raw : (raw?.uuid || "");
    const appliesTo = typeof raw === "string" ? "both" : (raw?.applies_to || "both");
    html += `<tr>
      <td style="font-weight:700">${esc(role)}</td>
      <td><input type="text" class="cfg-pcourse-uuid" data-role="${esc(role)}" value="${esc(uuid)}" style="width:280px;font-family:'JetBrains Mono',monospace;font-size:10px"></td>
      <td><input type="text" class="cfg-pcourse-name" data-role="${esc(role)}" value="${esc((names[uuid]||''))}" placeholder="EUCF_…" title="Nombre oficial del curso (CMS). Se autocompleta al pegar un UUID conocido." style="width:230px;font-size:11px"></td>
      <td><select class="cfg-pcourse-applies" data-role="${esc(role)}">${applyOpts.replace(`value="${appliesTo}"`,`value="${appliesTo}" selected`)}</select></td>
      <td><button class="cfg-del-btn" data-role="${esc(role)}" data-section="pcourse" title="Delete">×</button></td>
    </tr>`;
  }
  html += `</tbody></table>
  <div class="cfg-add-row">
    <input id="cfgAddPCourseRole" class="cfg-add-input" placeholder="ROLE_KEY" style="width:140px;text-transform:uppercase">
    <input id="cfgAddPCourseUuid" class="cfg-add-input" placeholder="Course UUID" style="width:260px;font-family:'JetBrains Mono',monospace;font-size:10px">
    <input id="cfgAddPCourseName" class="cfg-add-input" placeholder="Course Name (EUCF_…)" style="width:200px;font-size:11px">
    <select id="cfgAddPCourseApplies" class="cfg-add-input" style="width:80px">${applyOpts}</select>
    <button class="cfg-add-btn" id="cfgAddPCourseBtn">+ Add</button>
  </div>`;
  $("cfgPerfCoursesArea").innerHTML = html;
  // Auto-fill the Course Name from the known UUID map when a UUID is typed/pasted.
  $("cfgPerfCoursesArea").querySelectorAll(".cfg-pcourse-uuid").forEach(el=>{
    el.addEventListener("input",()=>{
      const role = el.dataset.role;
      const nm = names[el.value.trim()];
      const nameEl = $("cfgPerfCoursesArea").querySelector(`.cfg-pcourse-name[data-role="${role}"]`);
      if(nameEl && nm && !nameEl.value.trim()) nameEl.value = nm;
    });
  });
  const _addUuidEl = $("cfgAddPCourseUuid");
  if(_addUuidEl){
    _addUuidEl.addEventListener("input",()=>{
      const nm = names[_addUuidEl.value.trim()];
      const addNameEl = $("cfgAddPCourseName");
      if(addNameEl && nm && !addNameEl.value.trim()) addNameEl.value = nm;
    });
  }
  $("cfgAddPCourseBtn") && $("cfgAddPCourseBtn").addEventListener("click",()=>{
    const role = ($("cfgAddPCourseRole").value||"").trim().toUpperCase().replace(/\s+/g,"_");
    const uuid = ($("cfgAddPCourseUuid").value||"").trim();
    const applies = $("cfgAddPCourseApplies").value || "both";
    if(!role||!uuid){ _cfgToast("Fill Role and UUID",true); return; }
    if(!_cfgPCoursesData.role_to_course_uuid) _cfgPCoursesData.role_to_course_uuid = {};
    _cfgPCoursesData.role_to_course_uuid[role] = {uuid, applies_to:applies};
    const addName = ($("cfgAddPCourseName") ? $("cfgAddPCourseName").value : "").trim();
    if(uuid && addName){ if(!_cfgPCoursesData.course_names) _cfgPCoursesData.course_names = {}; _cfgPCoursesData.course_names[uuid] = addName; }
    _cfgRenderPerfCourses();
  });
}

async function _cfgSaveCourses(){
  // Read quality courses. MERGE onto existing error entries so we don't wipe
  // the unified file's mode/sigma_threshold/min_errors fields — only set the
  // course uuid (under the right key) + enabled.
  $("cfgQualityCoursesArea").querySelectorAll(".cfg-qcourse-uuid").forEach(el=>{
    const key = el.dataset.key;
    const uuid = el.value.trim();
    const enabledEl = $("cfgQualityCoursesArea").querySelector(`.cfg-qcourse-enabled[data-key="${key}"]`);
    const enabled = enabledEl ? enabledEl.checked : true;
    if(!_cfgQCoursesData.errors) return;
    let prev = _cfgQCoursesData.errors[key];
    if(typeof prev !== "object" || prev === null) prev = {};
    prev[_cfgQCoursesUuidKey] = uuid;
    prev.enabled = enabled;
    _cfgQCoursesData.errors[key] = prev;
  });
  // Read perf courses
  if(!_cfgPCoursesData.course_names) _cfgPCoursesData.course_names = {};
  $("cfgPerfCoursesArea").querySelectorAll(".cfg-pcourse-uuid").forEach(el=>{
    const role = el.dataset.role;
    const uuid = el.value.trim();
    const appliesEl = $("cfgPerfCoursesArea").querySelector(`.cfg-pcourse-applies[data-role="${role}"]`);
    const applies = appliesEl ? appliesEl.value : "both";
    if(_cfgPCoursesData.role_to_course_uuid) _cfgPCoursesData.role_to_course_uuid[role] = {uuid, applies_to:applies};
    const nameEl = $("cfgPerfCoursesArea").querySelector(`.cfg-pcourse-name[data-role="${role}"]`);
    const nm = nameEl ? nameEl.value.trim() : "";
    if(uuid && nm) _cfgPCoursesData.course_names[uuid] = nm;
  });
  try{
    // Write back to whichever file we loaded (unified quality_errors.json or
    // legacy quality_courses.json).
    await jpost(`${API}/api/admin/config/${_cfgQCoursesFile}`, {data: _cfgQCoursesData});
    await jpost(`${API}/api/admin/config/guided_coaching.json`, {data: _cfgPCoursesData});
    _cfgToast("✓ Coaching courses saved");
  }catch(e){ _cfgToast("✗ " + e.message, true); }
}

$("cfgSaveCourses") && $("cfgSaveCourses").addEventListener("click", _cfgSaveCourses);

// ── Course Catalog (CMS browser, admin) ──────────────────────────────────
// Windows Courses stack (restored 2026-07-22 during the v1.1.17 merge): the
// backend /api/admin/course-catalog returns a DICT {typology,label,fcs,courses,
// count,cached_at,stale,assigned_count} — NOT a flat list. These renderers match
// that contract (course_id/description/typology selector), which is the richer,
// tested Windows implementation.
let _ccData = null;          // {typology, label, fcs, courses:[...], count, assigned_count}
let _ccTypologies = [];      // [{typology,label,fcs,rep_fc,cached,cached_at,count}]
let _ccCurrentTyp = "standard";

// Umbrella CMS deep-link for a course UUID. Format matches the real portal URL:
// the "https:" stays literal and only the part FROM "//" onward is percent-encoded
// (i.e. "https:" + encoded("//dub.prod.cms...")).
function _umbrellaLink(uuid){
  const inner = "https:" + encodeURIComponent(`//dub.prod.cms.umbrella.amazon.dev/course/${uuid}`);
  return `https://dub.umbrella.amazon.dev/portal/cms/courses/${inner}`;
}
function _typeBadge(t){
  const map = {manual:["Manual","#7c3aed"], auto:["Auto","#0ea5e9"], other:["Otro","#888"]};
  const [lbl,col] = map[t] || map["manual"];  // unknown/empty -> Manual (the default rule)
  return `<span style="display:inline-block;background:${col}22;color:${col};border:1px solid ${col}55;border-radius:4px;padding:0 5px;font-size:9px;font-weight:700">${lbl}</span>`;
}
function _uuidCell(uuid){
  return `<span style="font-family:'JetBrains Mono',monospace;font-size:10px;color:#888">${esc(uuid||"")}</span>
    <a href="${_umbrellaLink(uuid)}" target="_blank" rel="noopener" title="Abrir en Umbrella CMS" style="text-decoration:none;color:#0ea5e9;margin:0 3px">🔗</a>
    <button class="cc-copy" data-uuid="${esc(uuid||"")}" title="Copiar UUID" style="border:none;background:none;cursor:pointer;color:#7c3aed">⧉</button>`;
}

// ─── ADMIN: full catalog by typology (Config → Course Catalog section) ───────
async function _loadTypologies(){
  try{
    const d = await jget(`${API}/api/admin/course-typologies`);
    _ccTypologies = d.typologies || [];
  }catch(_){ _ccTypologies = []; }
}

async function _loadCourseCatalog(typ, force){
  const area = $("cc-area"), status = $("cc-status");
  _ccCurrentTyp = typ || _ccCurrentTyp;
  if(area) area.innerHTML = `<div class="cfg-loading">${force?"Re-descargando":"Cargando"} catálogo <b>${esc(_ccCurrentTyp)}</b>…${force?" (pagina el CMS entero, puede tardar unos minutos)":""}</div>`;
  try{
    const d = await jget(`${API}/api/admin/course-catalog?typology=${encodeURIComponent(_ccCurrentTyp)}${force?"&force=true":""}`);
    _ccData = d;
    await _loadTypologies();
    _ccRenderTypSelector();
    _ccRender();
  }catch(e){
    if(area) area.innerHTML = `<div class="cfg-loading" style="color:#e53e3e">Error: ${esc(e.message)}</div>`;
  }
}

function _ccRenderTypSelector(){
  const sel = $("cc-fc");
  if(!sel) return;
  sel.innerHTML = _ccTypologies.map(t=>{
    const mark = t.cached ? "✓" : "○";
    return `<option value="${t.typology}" ${t.typology===_ccCurrentTyp?'selected':''}>${mark} ${esc(t.label)} (${(t.fcs||[]).join("/")})</option>`;
  }).join("");
}

function _ccRender(){
  if(!_ccData){ return; }
  const area = $("cc-area"), status = $("cc-status");
  const q = (($("cc-search") && $("cc-search").value) || "").trim().toLowerCase();
  const typeSel = ($("cc-type") && $("cc-type").value) || "all";
  let courses = (_ccData.courses || []).slice();
  if(q) courses = courses.filter(c =>
    String(c.title||"").toLowerCase().includes(q) || String(c.uuid||"").toLowerCase().includes(q));
  if(typeSel !== "all") courses = courses.filter(c => (c.type||"manual") === typeSel);
  const asgSel = ($("cc-assigned") && $("cc-assigned").value) || "all";
  if(asgSel === "assigned") courses = courses.filter(c => c.assigned);
  else if(asgSel === "unassigned") courses = courses.filter(c => !c.assigned);

  if(status){
    const fcs = (_ccData.fcs||[]).join(", ");
    const when = _ccData.cached_at ? ` · datos: ${esc(String(_ccData.cached_at).replace("T"," "))}` : "";
    const staleMsg = _ccData.stale ? ' <span style="color:#f59e0b">⚠️ caché (fetch falló)</span>' : "";
    status.innerHTML = `Tipología <b>${esc(_ccData.label||_ccData.typology||"")}</b> (${esc(fcs)}) · ${_ccData.count||0} cursos · <span style="color:#22c55e">${_ccData.assigned_count||0} asignados</span> · mostrando ${courses.length}${when}${staleMsg}`;
  }

  const _asgLabel = (a)=>{
    const icon = a.kind==="quality" ? "🎯" : "👤";
    return `<span class="cc-tag" title="${a.kind==='quality'?'Quality error type':'Performance role'}" style="display:inline-block;background:var(--bg-panel);border:1px solid var(--border);border-radius:4px;padding:1px 5px;margin:1px;font-size:9px">${icon} ${esc(a.key)}</span>`;
  };

  let html = `<table class="cfg-table"><thead><tr><th>Course Name</th><th>Tipo</th><th>UUID</th><th>Asignado a</th><th>Descripción</th></tr></thead><tbody>`;
  for(const c of courses){
    const asg = c.assigned_to || [];
    const asgCell = asg.length ? asg.map(_asgLabel).join(" ")
      : '<span style="color:#f59e0b;font-size:10px">● sin asignar</span>';
    const rowStyle = c.assigned ? "" : ' style="background:rgba(245,158,11,.06)"';
    html += `<tr${rowStyle}>
      <td style="font-weight:700;font-size:11px">${c.assigned?'<span style="color:#22c55e" title="Asignado">✓</span> ':''}${esc(c.title||"—")}</td>
      <td>${_typeBadge(c.type||"manual")}</td>
      <td>${_uuidCell(c.uuid)}</td>
      <td>${asgCell}</td>
      <td style="font-size:10px;color:#aaa">${esc(c.description||"")}</td>
    </tr>`;
  }
  html += `</tbody></table>`;
  if(area) area.innerHTML = html;
  area && area.querySelectorAll(".cc-copy").forEach(b=>{
    b.addEventListener("click",()=>{ try{ navigator.clipboard.writeText(b.dataset.uuid); _cfgToast&&_cfgToast("UUID copiado"); }catch(_){}} );
  });
}

// Init entry point called from _cfgInit(). Wires the Course Catalog section and
// does the first load. (Named _ccInitCatalog to match the _cfgInit caller.)
async function _ccInitCatalog(){
  const sel = $("cc-fc");
  if(sel && !sel._wired){
    sel._wired = true;
    await _loadTypologies();
    _ccRenderTypSelector();
    sel.addEventListener("change", ()=>{ _ccCurrentTyp = sel.value; _loadCourseCatalog(sel.value, false); });
  }
  const tEl = $("cc-type"); if(tEl && !tEl._wired){ tEl._wired=true; tEl.addEventListener("change", _ccRender); }
  const aEl = $("cc-assigned"); if(aEl && !aEl._wired){ aEl._wired=true; aEl.addEventListener("change", _ccRender); }
  const sEl = $("cc-search"); if(sEl && !sEl._wired){ sEl._wired=true; sEl.addEventListener("input", _ccRender); }
  const rEl = $("cc-refresh"); if(rEl && !rEl._wired){ rEl._wired=true; rEl.addEventListener("click", ()=>_loadCourseCatalog(_ccCurrentTyp, true)); }
  const cEl = $("cc-csv"); if(cEl && !cEl._wired){ cEl._wired=true; cEl.addEventListener("click", _ccExportCsv); }
  if(!_ccData) _loadCourseCatalog(_ccCurrentTyp, false);
}
window._onCatalogSection = _ccInitCatalog;

function _ccExportCsv(){
  if(!_ccData) return;
  const rows = [["Course Name","Type","UUID","Umbrella Link","Assigned","Assigned To","Description","Typology"]];
  for(const c of (_ccData.courses||[])){
    const asg = (c.assigned_to||[]).map(a=>`${a.kind}:${a.key}`).join(" | ");
    rows.push([c.title||"", c.type||"", c.uuid||"", _umbrellaLink(c.uuid), c.assigned?"YES":"NO", asg, (c.description||"").replace(/\n/g," "), _ccData.typology||""]);
  }
  const csv = rows.map(r=>r.map(v=>`"${String(v).replace(/"/g,'""')}"`).join(",")).join("\r\n");
  const blob = new Blob([csv],{type:"text/csv;charset=utf-8"});
  const a=document.createElement("a"); a.href=URL.createObjectURL(blob);
  a.download=`course_catalog_${_ccData.typology||"all"}.csv`; a.click();
}

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


// ═══════════════════════════════════════════════════════════════
// PERFORMANCE FLOOR MAP
// ═══════════════════════════════════════════════════════════════
(function(){
  let perfMapVisible = false;
  let perfActiveFloor = "p2";
  let perfMapHighlight = "";  // "gap" | "idle" | "gca" | ""

  // Map now lives in its own top tab (panel-map). switchTab("map") calls this to
  // render it. Kept perfMapVisible in sync so downstream renders still gate on it.
  window._onMapTab = function(){
    // Delivery (AMZL) has no station map — bounce back to Performance for DS.
    if(typeof siteBL === "function" && siteBL(currentFC) === "AMZL"){
      if(typeof switchTab === "function") switchTab("dashboard");
      return;
    }
    perfMapVisible = true;
    // The Map tab is the physical floor-map view: always open in GRID (the AR-ring
    // station map + Floor Command Center). This is the map visualization we want
    // on this sheet.
    if(_mapView !== "grid"){
      _mapView = "grid";
      try{ localStorage.setItem("argos_map_view", "grid"); }catch(_){}
      if(typeof _syncMapViewBtns === "function") _syncMapViewBtns();
    }
    // The map reads dashboard rows (state.all). As its own tab it can be opened
    // WITHOUT visiting Performance first, so load the dashboard if empty, then
    // (re)build floor tabs + render. Otherwise render straight away.
    const _draw = ()=>{
      try{ _buildFloorTabs(); }catch(_){}
      renderPerfMap(); loadPprRates();
      // Always load GCA pending badges so the map marks who has a pending
      // coaching (no manual button anymore).
      try{ if(window._refreshMapGcaPending) window._refreshMapGcaPending(); }catch(_){}
      // Fit the whole map into the viewport (no scroll) once it has rendered.
      // Two rAFs so layout/paint settles before we measure.
      requestAnimationFrame(()=>requestAnimationFrame(()=>{ try{ _fitMapToScreen(); }catch(_){} }));
    };
    if(!state || !state.all || !state.all.length){
      const box = $("perfFloorWrap");
      if(box) box.innerHTML = `<div class="ppr-loading" style="padding:24px;text-align:center">Loading floor data…</div>`;
      Promise.resolve(typeof loadDashboard === "function" ? loadDashboard() : null)
        .then(_draw).catch(_draw);
    } else {
      _draw();
    }
  };

  // Auto-fit: scale the floor map down so the whole thing fits in the viewport
  // without scrolling (great for presenting). Only scales DOWN (never up past
  // 100%). Sets transform on perfFloorWrap, matching the manual zoom mechanism.
  window._fitMapToScreen = function(){
    const wrap = $("perfFloorWrap");
    const active = document.getElementById("perfFloor_"+perfActiveFloor);
    if(!wrap || !active) return;
    // Reset any prior scale/centering to measure the natural size.
    wrap.style.transform = ""; wrap.style.width = ""; wrap.style.marginLeft = ""; wrap.style.marginRight = "";
    wrap.style.transformOrigin = "top center";
    const natW = active.scrollWidth, natH = active.scrollHeight;
    if(!natW || !natH) return;
    // Available width = the PARENT's inner width (the wrap is fit-content now,
    // so its own clientWidth == content width, which would defeat the fit).
    const parent = wrap.parentElement;
    const availW = (parent ? parent.clientWidth : window.innerWidth) - 8;
    // Fit by WIDTH only + allow vertical SCROLL. Fitting by height too (the old
    // Math.min(availW/natW, availH/natH, 1)) shrank the map to a tiny sliver when
    // P2's long vertical lateral column made natH huge. MIN_SCALE keeps it legible.
    const MIN_SCALE = 0.55;
    let scale = Math.min(availW / natW, 1);   // fit width, never upscale
    if(scale < MIN_SCALE) scale = MIN_SCALE;
    if(scale < 0.999){
      // Scale from top-center so the shrunk map stays centered in the viewport.
      wrap.style.transform = "scale(" + scale.toFixed(3) + ")";
    }
    wrap.style.margin = "0 auto";
  };
  // Re-fit on window resize while the map tab is open.
  window.addEventListener("resize", function(){
    const pm = document.getElementById("panel-map");
    if(pm && pm.classList.contains("active")){ try{ _fitMapToScreen(); }catch(_){} }
  });

  // Force-close: when leaving the map (or switching to a DS site), just mark it
  // hidden so background renders skip it. The tab machinery handles the DOM.
  window._hidePerfMap = function(){ perfMapVisible = false; };

  // PPR rate KPIs (centre of map): real (FCLM) vs OP2 daily target.
  // Cards are shown for the ACTIVE floor only and clicking one filters the map
  // to that process. Config-driven (/api/ppr-rates).
  let _pprData = null;
  async function loadPprRates(){
    const box=$("pprRates"); if(!box) return;
    box.innerHTML=`<div class="ppr-loading">Loading rates…</div>`;
    try{
      const r=await fetch(`${API}/api/ppr-rates?fc=${encodeURIComponent(currentFC||"BCN4")}`);
      if(!r.ok) throw new Error(`HTTP ${r.status}`);
      _pprData = await r.json();
      renderPprRates();
      // Grid view embeds these KPIs in the Floor Command Center, so re-render
      // the map once OP2 data lands.
      if(perfMapVisible && _mapView === "grid" && window._renderPerfMap) window._renderPerfMap();
    }catch(e){ box.innerHTML=`<div class="ppr-loading" style="color:#dc2626">✗ ${esc(e.message)}</div>`; }
  }
  function renderPprRates(){
    const box=$("pprRates"); if(!box || !_pprData) return;
    const floor = perfActiveFloor || "p2";
    // The Floor Command Center (which embeds these KPIs) only exists on AR-ring
    // floors (P2/P3). In grid view on those floors we hide the top panel to
    // avoid duplicates; on floors WITHOUT an FCC (P1 Pack) we keep it up top.
    var floorDef = (window._getFloors ? window._getFloors() : []).find(function(f){ return f.id === floor; });
    var hasFcc = floorDef && floorDef.type === "ar_ring";
    if(_mapView === "grid" && hasFcc){ box.style.display="none"; box.innerHTML=""; return; }
    box.style.display="";
    let procs=(_pprData.processes||[]).filter(p=>p.found);
    // Show only the processes that live on the active floor (P2/P3 vs P1).
    procs = procs.filter(p => !Array.isArray(p.floors) || !p.floors.length || p.floors.indexOf(floor) !== -1);
    if(!procs.length){ box.innerHTML=`<div class="ppr-loading">No PPR data for this floor — run the pipeline.</div>`; return; }
    const activeProc = window._perfMapProc || "ALL";
    box.innerHTML = procs.map(p=>{
      const subs=(p.subs||[]).map(s=>
        `<div class="ppr-sub"><span class="ppr-sub-lbl">${esc(s.label)}</span><span class="ppr-sub-rate">${s.rate!=null?s.rate:"—"}<small>uph</small></span></div>`
      ).join("");
      // vs OP2: green if >=100%, amber 90-100, red <90
      let pctHtml="";
      if(p.pct_op2!=null){
        const cls = p.pct_op2>=100 ? "ppr-ok" : p.pct_op2>=90 ? "ppr-warn" : "ppr-bad";
        pctHtml = `<div class="ppr-vs ${cls}">${p.pct_op2}% to OP2 <small>(target ${p.op2})</small></div>`;
      } else if(p.op2!=null){
        pctHtml = `<div class="ppr-vs">OP2 ${p.op2}</div>`;
      }
      const on = (p.proc_filter && p.proc_filter===activeProc) ? " ppr-card-active" : "";
      return `<div class="ppr-card ppr-clickable${on}" data-proc="${esc(p.proc_filter||"ALL")}" title="Click to filter the map to ${esc(p.label)}">
        <div class="ppr-main">
          <div class="ppr-rate">${p.rate!=null?p.rate:"—"}<small>uph</small></div>
          <div class="ppr-meta"><div class="ppr-lbl">${esc(p.label)}</div><div class="ppr-vol">${(p.units||0).toLocaleString()} units · ${p.hours} h · ${p.people} ppl</div>${pctHtml}</div>
        </div>
        ${subs?`<div class="ppr-subs">${subs}</div>`:""}
      </div>`;
    }).join("");
    // Click a card → drive the existing map process filter buttons.
    box.querySelectorAll(".ppr-clickable").forEach(card=>{
      card.addEventListener("click", ()=>{
        const proc = card.getAttribute("data-proc") || "ALL";
        const already = window._perfMapProc === proc;
        const target = already ? "ALL" : proc;
        const btn = document.querySelector('.map-proc-btn[data-proc="'+target+'"]');
        if(btn){ btn.click(); }            // reuse existing filter wiring
        else { window._perfMapProc = target; if(window._renderPerfMap) window._renderPerfMap(); }
        renderPprRates();                   // refresh active highlight
      });
    });
  }
  window._loadPprRates = loadPprRates;
  window._renderPprRates = renderPprRates;

  // On-Target is now the DEFAULT (always show all active stations with colour).
  // These flags stay defined for back-compat with older render branches.
  window._perfShowAll = false;
  window._perfShowOnTarget = true;

  // "See opportunities" toggle — when ON, dim every station EXCEPT coaching
  // opportunities (gap / below / idle / fast start). Default OFF = show all
  // active stations in their real colour (On-Target view).
  window._mapSeeOpps = false;
  var seeOppsCb = document.getElementById("mapSeeOpps");
  if(seeOppsCb) seeOppsCb.addEventListener("change", function(){
    window._mapSeeOpps = this.checked;
    if(perfMapVisible) renderPerfMap();
  });

  // Highlight filter buttons
  document.querySelectorAll(".map-pill[data-hl]").forEach(function(btn){
    btn.addEventListener("click", function(){
      var hl = btn.dataset.hl;
      perfMapHighlight = (perfMapHighlight === hl) ? "" : hl;
      document.querySelectorAll(".map-pill[data-hl]").forEach(function(b){
        b.classList.toggle("active", b.dataset.hl === perfMapHighlight);
      });
      if(perfMapVisible) renderPerfMap();
    });
  });

  // (Zoom slider removed — scaling the floor wrapper distorted the whole view.)

  // Process filter buttons
  var perfMapProc = "ALL";
  document.querySelectorAll(".map-proc-btn").forEach(function(btn){
    btn.addEventListener("click", function(){
      // Toggle: clicking the already-active process filter clears it back to
      // ALL, so a user can un-filter by clicking the same button again (before,
      // once a process was picked there was no way to deselect it).
      perfMapProc = (perfMapProc === btn.dataset.proc) ? "ALL" : btn.dataset.proc;
      document.querySelectorAll(".map-proc-btn").forEach(function(b){
        var on = b.dataset.proc === perfMapProc;
        b.classList.toggle("on", on);
        b.style.background = on ? "var(--accent-light)" : "transparent";
        b.style.color = on ? "var(--accent-text)" : "var(--text-secondary)";
        b.style.fontWeight = on ? "700" : "400";
        b.style.borderColor = on ? "var(--accent-border)" : "var(--border-strong)";
      });
      window._perfMapProc = perfMapProc;
      if(perfMapVisible) renderPerfMap();
    });
  });
  window._perfMapProc = "ALL";

  // GCA pending badges load AUTOMATICALLY (no manual button) — the map always
  // marks who has a pending coaching. Called when the map opens and on each
  // auto-refresh tick. Never triggers a pipeline/mwinit; pure read of the cache.
  window._refreshMapGcaPending = function(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", API+"/api/gca/dashboard?fc="+encodeURIComponent(currentFC)+"&_t="+Date.now(), true);
    xhr.onload = function(){
      if(xhr.status !== 200) return;
      try{
        var d = JSON.parse(xhr.responseText);
        var pSet = new Set();
        var pMap = {};
        (d.items||[]).forEach(function(it){
          if(it.status==="PENDING"){
            var lg = (it.login||"").toLowerCase();
            pSet.add(lg);
            if(!pMap[lg]) pMap[lg] = {id:it.id||"", insight:it.insight||"", comment:it.comment||""};
          }
        });
        window._gcaPendingLogins = pSet;
        window._gcaPendingMap = pMap;
        if(perfMapVisible) renderPerfMap();
        var cc = $("mapCntGca"); if(cc) cc.textContent = pSet.size;
      }catch(ex){}
    };
    xhr.send();
  };
  

  // Floor tab switching is handled dynamically by _buildFloorTabs()

  // ── Data-driven layout ─────────────────────────────────────────────────
  // Layout loaded from /api/map-layout?fc=XX (config/hermes/map_layouts.json)
  // Falls back to BCN4 hardcoded arrays when layout not available.
  var _mapLayout = null;  // {floors:[{id,label,type,top,left,bottom,right,...}]}

  var _BCN4_P2_TOP=[2197,2196,2194,2193,2190,2189,2187,2186,2184,2183,2180,2178,2177,2176,2174,2171,2170,2168,2167,2165,2162,2160,2159,2157,2155,2154,2151,2150,2149,2146,2145,2143,2142,2140,2137,2136,2134,2133,2131,2130,2127,2125,2124,2122,2121,2118,2116,2115,2114,2108,2107,2105,2104];
  var _BCN4_P2_LEFT=[2211,2214,2217,2220,2224,2229,2233,2236,2239,2243,2246,2249,2252,2258,2262,2265,2269,2272,2275,2279,2282,2285,2291,2295];
  var _BCN4_P2_BOTTOM=[2306,2308,2309,2311,2313,2316,2318,2319,2322,2325,2327,2329,2331,2334,2335,2337,2340,2341,2343,2346,2347,2350,2352,2353,2356,2358,2359,2361,2364,2365,2368,2370,2372,2373,2375,2376,2378,2380,2381,2384,2385,2387,2389,2391,2392,2394,2395];
  var _BCN4_P2_RIGHT=[2494,2490,2486,2481,2478,2473,2469,2464,2461,2456,2453,2451,2448,2443,2438,2435,2430,2425,2422];

  function _loadMapLayout(fc, cb){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", API+"/api/map-layout?fc="+encodeURIComponent(fc)+"&_t="+Date.now(), true);
    xhr.onload = function(){
      if(xhr.status === 200){
        try{ _mapLayout = JSON.parse(xhr.responseText); }catch(e){ _mapLayout = null; }
      }
      _buildFloorTabs();
      cb && cb();
    };
    xhr.onerror = function(){ _buildFloorTabs(); cb && cb(); };
    xhr.send();
  }

  // Build floor tabs dynamically from layout
  function _buildFloorTabs(){
    var tabBar = document.querySelector(".perf-floor-tabs");
    var floorWrap = document.getElementById("perfFloorWrap");
    if(!tabBar || !floorWrap) return;

    var floors = _getFloors();
    tabBar.innerHTML = "";
    floorWrap.innerHTML = "";

    floors.forEach(function(fl, i){
      var btn = document.createElement("button");
      btn.className = "gca-floor-tab perf-floor-tab" + (i===0?" active":"");
      btn.dataset.floor = fl.id;
      btn.textContent = fl.label;
      tabBar.appendChild(btn);

      var div = document.createElement("div");
      div.id = "perfFloor_"+fl.id;
      div.className = "perf-floor-container";
      // Center the floor content; fit-content so the box hugs the content width
      // (not stretch full-width, which left everything glued to the left with a
      // big gap on the right). overflow-x auto keeps wide floors scrollable.
      div.style.cssText = "padding:16px;position:relative;min-height:300px;overflow-x:auto;width:fit-content;max-width:100%;margin:0 auto;"+(i>0?"display:none":"");
      floorWrap.appendChild(div);
    });

    // Re-bind tab clicks
    tabBar.querySelectorAll(".perf-floor-tab").forEach(function(tab){
      tab.addEventListener("click", function(){
        tabBar.querySelectorAll(".perf-floor-tab").forEach(function(t){ t.classList.remove("active"); });
        tab.classList.add("active");
        perfActiveFloor = tab.dataset.floor;
        floorWrap.querySelectorAll(".perf-floor-container").forEach(function(c){ c.style.display="none"; });
        var el = document.getElementById("perfFloor_"+perfActiveFloor);
        if(el) el.style.display = "";
        renderPerfMap();
        if(window._renderPprRates) window._renderPprRates();  // floor changed → swap PPR cards
      });
    });

    if(floors.length > 0) perfActiveFloor = floors[0].id;
  }

  // Get resolved floors for current FC
  function _getFloors(){
    if(!_mapLayout || !_mapLayout.floors || !_mapLayout.floors.length){
      // Hardcoded BCN4 fallback
      return [
        {id:"p2", label:"P2 (AR)", type:"ar_ring", top:_BCN4_P2_TOP, left:_BCN4_P2_LEFT, bottom:_BCN4_P2_BOTTOM, right:_BCN4_P2_RIGHT, p2r_muros:[220,218,216,214,213,212,210,209,208,206,204,202], p2r_floor:2},
        {id:"p3", label:"P3 (AR)", type:"ar_ring", top:_BCN4_P2_TOP.map(function(n){return n+1000;}), left:_BCN4_P2_LEFT.map(function(n){return n+1000;}), bottom:_BCN4_P2_BOTTOM.map(function(n){return n+1000;}), right:_BCN4_P2_RIGHT.map(function(n){return n+1000;}), p2r_muros:[220,218,216,214,213,212,210,209,208,206,204,202], p2r_floor:3},
        {id:"p1", label:"P1 (Pack)", type:"pack"}
      ];
    }

    // Resolve floors — handle derive_from and auto modes
    var raw = _mapLayout.floors;
    var baseFloor = null;
    return raw.map(function(fl){
      if(fl.type === "ar_ring"){
        if(fl.derive_from && baseFloor){
          var off = fl.offset || 0;
          return Object.assign({}, fl, {
            top:    baseFloor.top.map(function(n){return n+off;}),
            left:   baseFloor.left.map(function(n){return n+off;}),
            bottom: baseFloor.bottom.map(function(n){return n+off;}),
            right:  baseFloor.right.map(function(n){return n+off;}),
            p2r_muros: baseFloor.p2r_muros
          });
        }
        if(fl.auto){
          // Auto-detect station arrays from stationData at render time
          // Store marker so renderer knows to use auto mode
          return Object.assign({}, fl, {auto:true});
        }
        // Explicit arrays defined in JSON
        if(!baseFloor && fl.top) baseFloor = fl;
        return fl;
      }
      return fl;
    });
  }

  function getStationTypePerf(stNum, floor){
    if(!floor) return "pick";
    if((floor.top||[]).indexOf(stNum)>-1||(floor.left||[]).indexOf(stNum)>-1) return "pick";
    if((floor.bottom||[]).indexOf(stNum)>-1) return "stow";
    if((floor.right||[]).indexOf(stNum)>-1) return "count";
    return "pick";
  }

  // Derive the AR floor id ("p2","p3","p4",…) from a 4-digit station number by
  // its thousands digit: 2xxx→p2, 3xxx→p3, 4xxx→p4, 5xxx→p5. This generalises
  // the map to any robotic site with >2 AR floors (e.g. MAD7 has P2/P3/P4);
  // previously the parser hardcoded p2/p3 and dropped everything ≥4000.
  function _arFloorOf(n){
    var k = Math.floor(n / 1000);
    return (k >= 2 && k <= 9) ? ("p" + k) : "p2";
  }
  // Parse station from performance data (stationRaw field)
  function parsePerfStation(raw){
    if(!raw) return null;
    const s = String(raw).trim();
    // AR: dz-P-A2311 or dz-P-A3429 or dz-P-A4386
    let m = s.match(/dz-P-A(\d{4})/);
    if(m) return {floor: _arFloorOf(parseInt(m[1])), num:parseInt(m[1])};
    // AR: ws-k-A-02-2133 or k-A-04-4386 (floor prefix 02..09)
    m = s.match(/k-A-0(\d)-(\d{4})/);
    if(m) return {floor: "p"+m[1], num:parseInt(m[2])};
    // P1: AFE Induct — "in101" → constant "in1" + muro (01/03/05/07). Station 1
    // of induct = in101, station 2 = in103… Each induct muro pairs with an AFE
    // wall + its 4 rebins (A-D). Matched BEFORE the 4-digit AR fallback so it
    // isn't mis-read as a station number.
    m = s.match(/^(?:ws)?in1(\d{2})$/i);
    if(m) return {floor:"p1", type:"induct", wall:parseInt(m[1])};
    // P1: AFE — "wsAFE1_101_03" or "AFE1-101-03"
    m = s.match(/AFE(\d+)[_-](\d+)[_-](\d+)/);
    if(m) return {floor:"p1", type:"afe", id:parseInt(m[1]), wall:parseInt(m[2]), pos:parseInt(m[3])};
    // P1: AFE Rebin — "rsAfeRebin103B" → muro 103, slot B (4 slots A-D per muro)
    m = s.match(/AfeRebin(\d+)([A-D])/i);
    if(m) return {floor:"p1", type:"rebin", id:0, wall:parseInt(m[1]), pos:"ABCD".indexOf(m[2].toUpperCase())+1};
    // P1: SINGLES — "wsSINGLES_03_08" or "SINGLES-03-
    m = s.match(/SINGLES[_-](\d+)[_-](\d+)/i);
    if(m) return {floor:"p1", type:"singles", id:parseInt(m[1]), pos:parseInt(m[2])};
    // P2R (Pack→Rebin) — "wsPickToRebin2_207_02". Owner's naming (auto-detect,
    // no hardcoded wall list):
    //   grp1 = floor (2 or 3)
    //   grp2 = FfWW where F=floor digit, WW = muro (01..20 → 20 walls per floor)
    //   grp3 = pack FACE fed by this muro's single P2R picker (01 / 02) — there
    //          is ONE P2R per muro feeding TWO pack faces, so the suffix is the
    //          face, not a second picker.
    // The real wall is grp2 % 100 (07, 15, …). num is a synthetic per-floor id
    // (fl*1000+50 + wall*2 + face) that never collides with ring stations; each
    // face is its own map cell (owner wants one cell per station). p2r:true.
    m = s.match(/(?:P2R|PickToRebin)(\d+)[_-](\d+)[_-](\d+)/);
    if(m){
      var fl=parseInt(m[1]); var wall=parseInt(m[2]) % 100; var face=parseInt(m[3]);
      return {floor: "p"+fl, num: fl*1000+50+(wall-1)*2+face, p2r:true, wall:wall, pos:face, face:face};
    }
    // P1: WS lines — "ws1117", "ws1209", "ws1412" → these are LINES (like
    // Singles), NOT walls. Line = the 11/12/14 group, pos = last 2 digits.
    // Rendered as lateral lines alongside Singles.
    m = s.match(/^(?:ws)?(1[124])(\d{2})$/);
    if(m){ return {floor:"p1", type:"ws", line:parseInt(m[1]), pos:parseInt(m[2])}; }
    // P1: Decant — "ws-rcv-03-19"
    m = s.match(/rcv[_-](\d+)[_-](\d+)/);
    if(m) return {floor:"p1", type:"decant", id:parseInt(m[1]), pos:parseInt(m[2])};
    // AR: any 4-digit number 2000-9999 (fallback) — floor from thousands digit
    // so 4xxx→p4, 5xxx→p5, etc. (was capped at 3999 → P4 stations were dropped).
    m = s.match(/(\d{4})/);
    if(m){ const n=parseInt(m[1]); if(n>=2000 && n<=9999) return {floor: _arFloorOf(n), num:n}; }
    return null;
  }

  function renderPerfMap(){
    if(!state || !state.all || !state.all.length) return;

    // The MAP is INDEPENDENT of the Performance-tab filters (sigma / curve /
    // present-only / hide-coached). It always reflects the whole floor from
    // state.all, so switching Performance filters never changes the map. The
    // map's own controls (proc buttons + See-Opportunities) drive what's dimmed.
    var rows = state.all;

    var gcaPending = window._gcaPendingLogins || new Set();

    // Group rows by station (with inline cache for performance)
    var stationData = {};
    rows.forEach(function(r){
      var rawSt = r.stationRaw || r.station;
      var parsed = _stationParseCache.has(rawSt) ? _stationParseCache.get(rawSt) : (function(){ var p = parsePerfStation(rawSt); _stationParseCache.set(rawSt, p); return p; })();
      if(!parsed) return;
      var wallPart = parsed.wall ? "_"+parsed.wall : "";
      var key;
      if(parsed.num){
        key = parsed.floor+"_"+parsed.num;
      } else if(parsed.type==="induct"){
        // Induct has only {type,wall} — key must match the P1 render lookup
        // "p1_induct_<wall>" (else the induct cells never populate).
        key = parsed.floor+"_induct_"+parsed.wall;
      } else if(parsed.type==="rebin"){
        // Rebin: {type,wall,pos} (no id) → "p1_rebin_0_<wall>_<pos>".
        key = parsed.floor+"_rebin_0_"+parsed.wall+"_"+parsed.pos;
      } else if(parsed.type==="ws"){
        // WS lines: {type,line,pos} → "p1_ws_<line>_<pos>".
        key = parsed.floor+"_ws_"+parsed.line+"_"+parsed.pos;
      } else if(parsed.type==="singles"){
        // Singles: parser gives {type,line,pos} in one path and {type,id,pos}
        // in another — normalise to "p1_singles_<line>_<pos>".
        key = parsed.floor+"_singles_"+(parsed.line!=null?parsed.line:parsed.id)+"_"+parsed.pos;
      } else {
        key = parsed.floor+"_"+parsed.type+"_"+parsed.id+wallPart+"_"+parsed.pos;
      }
      if(!stationData[key]) stationData[key] = {rows:[], state:"normal", hasGap:false, hasIdle:false, hasBelow:false, hasFs:false};
      var sdk = stationData[key];
      sdk.rows.push(r);
      // Independent condition flags — a person can be BOTH below-target AND in
      // fast start (or gap + fast start, etc.). Track each condition separately
      // so filters/counters (e.g. Fast Start) catch everyone who matches, not
      // just those whose single dominant `state` happens to be that condition.
      var hasGapNote  = String(r.notes||"").indexOf("Gap") !== -1;
      var hasIdleNote = String(r.notes||"").indexOf("IDLE") !== -1;
      if(r.pct < 100){
        if(hasGapNote)  sdk.hasGap  = true;
        if(hasIdleNote) sdk.hasIdle = true;
        if(r.pct < 80)  sdk.hasBelow = true;
        if(r.nhFlag)    sdk.hasFs   = true;
      }
      // Dominant `state` still drives the station's single COLOR (priority
      // gap > idle > below > faststart). Flags above drive filter membership.
      var curState = sdk.state;
      if(r.pct >= 100){/* at/above target */}
      else if(hasGapNote && curState !== "gap") sdk.state = "gap";
      else if(hasIdleNote && curState !== "gap") sdk.state = "idle";
      else if(r.pct < 80 && curState !== "gap" && curState !== "idle") sdk.state = "below";
      else if(r.nhFlag && curState !== "gap" && curState !== "idle" && curState !== "below") sdk.state = "faststart";
    });

    // Post-process: all at/above target → ontarget
    Object.keys(stationData).forEach(function(k){
      var sd = stationData[k];
      if(sd.state === "normal" && sd.rows.length > 0 && sd.rows.every(function(r){ return r.pct >= 100; }))
        sd.state = "ontarget";
    });

    // Live counters — count by INDEPENDENT flags so a station with e.g. both a
    // below-target and a fast-start associate is counted in BOTH Fast Start and
    // the below tally (not forced into one bucket by the dominant state).
    var cntGap=0, cntIdle=0, cntGca=0, cntOk=0, cntBelow=0, cntFs=0;
    Object.values(stationData).forEach(function(sd){
      if(sd.hasGap)   cntGap++;
      if(sd.hasIdle)  cntIdle++;
      if(sd.hasBelow) cntBelow++;
      if(sd.hasFs)    cntFs++;
      if(sd.state === "ontarget" || sd.state === "normal") cntOk++;
      if(sd.rows.some(function(r){ return gcaPending.has((r.login||"").toLowerCase()); })) cntGca++;
    });
    var cg=$("mapCntGap"); if(cg) cg.textContent = cntGap;
    var ci=$("mapCntIdle"); if(ci) ci.textContent = cntIdle;
    var cfs=$("mapCntFs"); if(cfs) cfs.textContent = cntFs;
    var cc=$("mapCntGca"); if(cc) cc.textContent = cntGca;
    var co=$("mapCntOk"); if(co) co.textContent = (cntOk + cntBelow);

    // Expose highlight + proc filter + gcaPending to renderers
    window._perfMapHighlight = perfMapHighlight;
    window._perfMapProc = perfMapProc;

    var floors = _getFloors();
    var activeFloorDef = floors.find(function(f){ return f.id === perfActiveFloor; }) || floors[0];
    if(!activeFloorDef) return;
    var containerId = "perfFloor_" + activeFloorDef.id;

    if(_mapView === "board"){
      renderPerfBoardView(containerId, stationData);
    } else if(_mapView === "list"){
      renderPerfListView(containerId, stationData);
    } else if(activeFloorDef.type === "ar_ring"){
      renderPerfARFloor(containerId, activeFloorDef, stationData);
    } else {
      renderPerfP1Floor(containerId, stationData);
    }
    // Always update the mini-radar regardless of view
    renderMapRadar(stationData);
  }

  // Expose for re-render after pipeline and for GCA tab to share layout
  window._renderPerfMap = function(){ if(perfMapVisible) renderPerfMap(); };
  window._getFloors = _getFloors;
  // Expose the map's OWN station→floor parser so the Performance PLANTA list
  // filter uses identical logic (no separate implementation). Returns "p1".."p4"
  // or "" — parsePerfStation is the map's in-scope parser. (calvenpj 2026-07-24)
  window._floorOfStation = function(raw){
    try{ var p = parsePerfStation(raw); return (p && p.floor) ? String(p.floor) : ""; }
    catch(_){ return ""; }
  };
  // Expose the FULL parser too. parsePerfStationCached (global scope) referenced
  // `parsePerfStation` directly, but that function lives INSIDE this closure — so
  // from the global scope `typeof parsePerfStation` was always false and the cache
  // returned null for EVERY station. That silently emptied the GCA station map
  // (0 pending per floor). Exposing it on window lets the cache reach the real
  // parser. (bug fix 2026-07-29)
  window.parsePerfStation = parsePerfStation;

  // Load layout for initial FC, and reload when FC changes
  _loadMapLayout(currentFC);
  window._reloadMapLayout = function(fc){ _mapLayout = null; _loadMapLayout(fc, function(){ if(perfMapVisible) renderPerfMap(); }); };
  // Expose the raw layout so code in OTHER closures (e.g. the coaching-path
  // geometry) can read top-level fields like side_meters without referencing
  // _mapLayout directly (which lives only in this IIFE's scope).
  window._getMapLayout = function(){ return _mapLayout; };

  function renderPerfARFloor(containerId, floorDef, stationData){
    var floorId = floorDef.id;
    var topRow = floorDef.top || [];
    var leftCol = floorDef.left || [];
    var bottomRow = floorDef.bottom || [];
    var rightCol = floorDef.right || [];
    // Auto-mode: build arrays from stationData keys that match this floor prefix
    if(floorDef.auto && (!topRow.length)){
      var floorNum = parseInt((floorDef.id||"p2").replace(/[^0-9]/g,"")) || 2;
      var base = floorNum * 1000;
      Object.keys(stationData).forEach(function(k){
        if(k.indexOf(floorId+"_") !== 0) return;
        var sn = parseInt(k.split("_")[1]); if(isNaN(sn)) return;
        var rel = sn - base;
        if(rel >= 100 && rel < 200) topRow.push(sn);
        else if(rel >= 200 && rel < 300) leftCol.push(sn);
        else if(rel >= 300 && rel < 400) bottomRow.push(sn);
        else if(rel >= 400 && rel < 500) rightCol.push(sn);
      });
      topRow.sort(function(a,b){return b-a;});
      leftCol.sort(function(a,b){return a-b;});
      bottomRow.sort(function(a,b){return a-b;});
      rightCol.sort(function(a,b){return b-a;});
    }
    var p2rMuros = floorDef.p2r_muros || [220,218,216,214,213,212,210,209,208,206,204,202];
    var p2rFloorNum = floorDef.p2r_floor || parseInt((floorId||"p2").replace(/[^0-9]/g,"")) || 2;
    var el = document.getElementById(containerId);
    if(!el) return;
    el.innerHTML = '';
    el.style.position = 'relative';
    el.style.padding = '16px';

    var _floorBase = p2rFloorNum * 1000;
    function getTypeLabel(stNum){
      var rel = stNum - _floorBase;
      if(rel >= 50  && rel < 200) return 'P2R'; // P2R/PTR/NU zone
      if(rel >= 200 && rel < 300) return 'NU';
      if(rel >= 300 && rel < 400) return 'NA';
      if(rel >= 400 && rel < 500) return 'NS';
      return 'NU';
    }

    function stateClass(data){
      if(!data) return 'sm-empty';
      var s = data.state || 'normal';
      if(s === 'gap') return 'sm-danger';        // gap = intense red (critical)
      if(s === 'below') return 'sm-below';       // bad performance (<80%) = lighter red
      if(s === 'idle') return 'sm-idle';
      if(s === 'faststart') return 'sm-faststart';
      if(s === 'ontarget') return 'sm-ontarget';
      return 'sm-active';
    }

    function modeBadge(data){
      if(!data) return '';
      var s = data.state || 'normal';
      if(s === 'gap') return '<span class="sm-badge bg-red">G</span>';
      if(s === 'below') return '<span class="sm-badge bg-red-light">↓</span>';
      if(s === 'idle') return '<span class="sm-badge bg-yellow">I</span>';
      if(s === 'faststart') return '<span class="sm-badge bg-purple">FS</span>';
      return '';
    }

    function buildStation(stNum){
      var key = floorId + '_' + stNum;
      var data = stationData[key];
      var cls = stateClass(data);
      // Physical zone is the source of truth for the label. We only override
      // it with role info when the role is consistent with the zone (e.g.
      // PICK in a NU station). Never let a P2R_PICK associate make a non-P2R
      // physical station look like P2R — that's the bug we had on 3259.
      var type = getTypeLabel(stNum);
      var rel  = stNum - _floorBase;
      var inP2RZone = rel >= 50 && rel < 200;
      if(data && data.rows && data.rows.length > 0){
        var role = String(data.rows[0].role||'').toUpperCase();
        if(role === 'PICK_AR' || role === 'PICK')      type='PICK';
        else if(role === 'STOW')                       type='STOW';
        else if(role === 'QUANTITY_STOW')              type='QS';
        else if(role.indexOf('ICQA') >= 0)             type='SBC';
        else if(role === 'DECANT')                     type='DEC';
        else if(role === 'P2R_PICK' && inP2RZone)      type='P2R';
        else if(role === 'P2R_PICK')                   type='PICK'; // P2R-trained associate working a non-P2R station
        else if(role === 'P2R_PACK' && inP2RZone)      type='P2R';
        else if(role === 'P2R_PACK')                   type='PACK';
      }
      var numStr;
      var relNum = stNum - _floorBase;
      if(relNum >= 50 && relNum < 104){ var offset=relNum-50; numStr=String(Math.floor(offset/2)+202)+'-'+((offset%2)+1); }
      else { numStr = String(stNum); }
      var badge = modeBadge(data);
      var gcaHtml = '';
      var gcaPending = window._gcaPendingLogins || new Set();
      if(data && data.rows){
        var gcaCount = data.rows.filter(function(r){ return gcaPending.has((r.login||'').toLowerCase()); }).length;
        if(gcaCount > 0) gcaHtml = '<span class="fm-gca-flag">' + gcaCount + '</span>';
      }
      var div = document.createElement('div');
      div.className = 'sm-station ' + cls;
      div.innerHTML = badge + '<span class="sm-type">' + type + '</span><span class="sm-num">' + numStr + '</span>' + gcaHtml;

      if(data){
        // Process filter dim
        var proc = window._perfMapProc || "ALL";
        if(proc !== "ALL"){
          var procMap = {PICK:["PICK_AR","P2R_PICK"], STOW:["STOW","QUANTITY_STOW"], QS:["QUANTITY_STOW"], PACK:["SM","SM1","SMMIX","SM2","AFE_PACK","P2R_PACK","SNS1","SNS2","SINGLES","WS_SLAM","WS_VDF"], DEC:["DECANT"]};
          var allowed = procMap[proc] || [];
          var hasProc = data.rows.some(function(r){ return allowed.indexOf(String(r.role||"").toUpperCase()) > -1; });
          if(!hasProc) div.style.opacity = "0.12";
        }
        // Highlight mode dim (applied on top of proc filter)
        if(window._perfMapHighlight || window._mapSeeOpps){
          var hl = window._mapSeeOpps ? "opps" : window._perfMapHighlight;
          var gcaPend = window._gcaPendingLogins || new Set();
          var matches = (hl==="opps" && (data.hasGap||data.hasBelow||data.hasIdle||data.hasFs))
                     || (hl==="gap" && data.hasGap)
                     || (hl==="idle" && data.hasIdle)
                     || (hl==="faststart" && data.hasFs)
                     || (hl==="gca" && data.rows.some(function(r){ return gcaPend.has((r.login||"").toLowerCase()); }));
          if(!matches) div.style.opacity = "0.12";
        }
      }

      if(data){
        _perfStationDataMap[key] = data;
        var displayLabel = type + ' ' + numStr;
        div.style.cursor = "pointer";
        div.onmouseenter = function(ev){ showPerfTooltip(ev, displayLabel, data); };
        div.onmouseleave = function(){ window._ttHideTimer = setTimeout(function(){ var tt=document.getElementById("gcaMapTooltip"); if(tt) tt.style.display="none"; },150); };
        // Click: open upload modal prefilled with first uncoached associate
        div.onclick = function(){
          var target = data.rows.find(function(r){ return !r.coached; }) || data.rows[0];
          if(target) openUploadPrefill(target.login);
        };
      }
      return div;
    }

    // Smart slot
    var allGridSet = {};
    topRow.concat(leftCol).concat(bottomRow).concat(rightCol).forEach(function(n){ allGridSet[String(n)] = true; });
    var nonGridStations = [];
    Object.keys(stationData).forEach(function(key){
      if(key.indexOf(floorId + '_') !== 0) return;
      var sn = parseInt(key.split('_')[1]);
      var snBase = sn >= 3000 ? sn - 1000 : sn; if(snBase >= 2050 && snBase < 2104) return;
      if(allGridSet[String(sn)]) return;
      nonGridStations.push(sn);
    });
    var emptyGridBySection = {top:[], left:[], bottom:[], right:[]};
    topRow.forEach(function(n){ if(!stationData[floorId+'_'+n]) emptyGridBySection.top.push(n); });
    leftCol.forEach(function(n){ if(!stationData[floorId+'_'+n]) emptyGridBySection.left.push(n); });
    bottomRow.forEach(function(n){ if(!stationData[floorId+'_'+n]) emptyGridBySection.bottom.push(n); });
    rightCol.forEach(function(n){ if(!stationData[floorId+'_'+n]) emptyGridBySection.right.push(n); });
    var assignedSlots = {};
    nonGridStations.sort(function(a,b){return a-b;});
    nonGridStations.forEach(function(sn){
      var rel = sn - _floorBase;
      var section = rel >= 50 && rel <= 197 ? 'top' : rel >= 200 && rel <= 295 ? 'left' : rel >= 306 && rel <= 395 ? 'bottom' : 'right';
      var empties = emptyGridBySection[section];
      var best = -1; var bestDist = Infinity;
      for(var i=0;i<empties.length;i++){
        var d = Math.abs(empties[i] - sn);
        if(d < bestDist){ bestDist = d; best = i; }
      }
      if(best > -1){
        assignedSlots[String(empties[best])] = sn;
        empties.splice(best, 1);
      }
    });

    function renderRow(arr, container){
      arr.forEach(function(gridNum){
        var sn = assignedSlots[String(gridNum)] || gridNum;
        var hasData = !!stationData[floorId+'_'+sn];
        // In compact mode, skip empty stations
        if(!window._perfShowAll && !hasData) return;
        if(assignedSlots[String(gridNum)]){
          container.appendChild(buildStation(assignedSlots[String(gridNum)]));
        } else {
          container.appendChild(buildStation(gridNum));
        }
      });
    }

    // Layout
    var grid = document.createElement('div');
    grid.className = 'sm-grid';

    var topDiv = document.createElement('div');
    topDiv.className = 'sm-row sm-top';
    renderRow(topRow, topDiv);

    // P2R Pack row — 20 walls per floor (1..20), 2 faces each. Numbering matches
    // the parser (parsePerfStation): num = fl*1000 + 50 + (wall-1)*2 + face,
    // wall = 1..20. Walls run LEFT→RIGHT in muro order 1..20 (trainer-confirmed:
    // highest PTR = muro 1). This replaced the old (muro-202)*2 formula + the
    // hardcoded descending [220..202] list, which no longer matched the keys.
    var p2rDiv = document.createElement('div');
    p2rDiv.className = 'sm-row sm-p2r';
    p2rDiv.style.cssText = 'margin-top:6px;';
    for(let wall=1; wall<=20; wall++){
      for(let face=1; face<=2; face++){
        let p2rNum = p2rFloorNum*1000 + 50 + (wall-1)*2 + face;
        let p2rKey = floorId + '_' + p2rNum;
        let p2rData = stationData[p2rKey];
        if(!window._perfShowAll && !p2rData) continue;
        var p2rCls = p2rData ? stateClass(p2rData) : 'sm-empty';
        var p2rSt = document.createElement('div');
        p2rSt.className = 'sm-station sm-p2r-station ' + p2rCls;
        var p2rBadge = p2rData ? modeBadge(p2rData) : '';
        var muroShort = wall;
        var pos = face;
        p2rSt.innerHTML = p2rBadge + '<span class="sm-type">P2R</span><span class="sm-num">' + muroShort + '-' + pos + '</span>';
        if(p2rData){
          var lbl = 'P2R ' + muroShort + '-' + pos;
          var proc2=window._perfMapProc||"ALL";
          if(proc2!=="ALL"){
            var pm2={PICK:["PICK_AR","P2R_PICK"],STOW:["STOW","QUANTITY_STOW"],QS:["QUANTITY_STOW"],PACK:["SM","SM1","SMMIX","SM2","AFE_PACK","P2R_PACK","SNS1","SNS2","SINGLES","WS_SLAM","WS_VDF"],DEC:["DECANT"]};
            var al2=pm2[proc2]||[];
            if(!p2rData.rows.some(function(r){return al2.indexOf(String(r.role||"").toUpperCase())>-1;})) p2rSt.style.opacity="0.12";
          }
          if(window._perfMapHighlight || window._mapSeeOpps){
            var hl2=window._mapSeeOpps ? "opps" : window._perfMapHighlight; var gcaP2=window._gcaPendingLogins||new Set();
            var m2=(hl2==="opps"&&(p2rData.hasGap||p2rData.hasBelow||p2rData.hasIdle||p2rData.hasFs))||(hl2==="gap"&&p2rData.hasGap)||(hl2==="idle"&&p2rData.hasIdle)||(hl2==="faststart"&&p2rData.hasFs)||(hl2==="gca"&&p2rData.rows.some(function(r){return gcaP2.has((r.login||"").toLowerCase());}));
            if(!m2) p2rSt.style.opacity="0.12";
          }
          p2rSt.style.cursor="pointer";
          p2rSt.onmouseenter = function(ev){ showPerfTooltip(ev, lbl, p2rData); };
          p2rSt.onmouseleave = function(){ window._ttHideTimer=setTimeout(function(){ var tt=document.getElementById("gcaMapTooltip"); if(tt) tt.style.display="none"; },150); };
          p2rSt.onclick = function(){ var t=p2rData.rows.find(function(r){return !r.coached;})||p2rData.rows[0]; if(t) openUploadPrefill(t.login); };
        }
        p2rDiv.appendChild(p2rSt);
      }
    }

    var midDiv = document.createElement('div');
    midDiv.className = 'sm-middle';

    var leftDiv = document.createElement('div');
    leftDiv.className = 'sm-col sm-left';
    renderRow(leftCol, leftDiv);

    var centerDiv = document.createElement('div');
    centerDiv.className = 'sm-center fc-center';
    centerDiv.id = 'fcCenter_' + floorId;
    renderFloorCommandCenter(centerDiv, floorId, stationData, {
      topRow: topRow, leftCol: leftCol, bottomRow: bottomRow, rightCol: rightCol,
      assignedSlots: assignedSlots,
    });

    var rightDiv = document.createElement('div');
    rightDiv.className = 'sm-col sm-right';
    renderRow(rightCol, rightDiv);

    midDiv.appendChild(leftDiv);
    midDiv.appendChild(centerDiv);
    midDiv.appendChild(rightDiv);

    var bottomDiv = document.createElement('div');
    bottomDiv.className = 'sm-row sm-bottom';
    renderRow(bottomRow, bottomDiv);

    grid.appendChild(topDiv);
    grid.appendChild(p2rDiv);
    grid.appendChild(midDiv);
    grid.appendChild(bottomDiv);
    el.appendChild(grid);
  }

  // Store station data globally for event delegation
  let _perfStationDataMap = {};

  

  function renderPerfP1Floor(containerId, stationData){
    var el = document.getElementById(containerId);
    if(!el) return;
    el.innerHTML = "";
    el.style.padding = "12px";

    var gcaPending = window._gcaPendingLogins || new Set();

    // ── Shared station-cell builder (states, badges, GCA flag, proc filter,
    //    highlight dim, tooltip, click-to-coach). `key` indexes stationData;
    //    `typeLbl`/`num` are the visual label. Returns a DOM node. ──
    function _p1cell(key, typeLbl, num, shape){
      var data = stationData[key];
      var state = data ? (data.state||"normal") : "";
      var cls = "sm-station" + (shape==="circle" ? " sm-circle" : "");
      if(!data) cls += " sm-empty";
      else if(state==="gap") cls += " sm-danger";
      else if(state==="below") cls += " sm-below";
      else if(state==="idle") cls += " sm-idle";
      else if(state==="faststart") cls += " sm-faststart";
      else cls += " sm-active";
      var st = document.createElement("div");
      st.className = cls;
      st.innerHTML = '<span class="sm-type">'+esc(typeLbl)+'</span><span class="sm-num">'+esc(String(num))+'</span>';
      // Badge from independent flags (v219): a person can be below AND fast start.
      if(data){
        if(data.hasGap)        st.insertAdjacentHTML("afterbegin",'<span class="sm-badge bg-red">G</span>');
        else if(data.hasBelow) st.insertAdjacentHTML("afterbegin",'<span class="sm-badge bg-red-light">↓</span>');
        if(data.hasIdle)       st.insertAdjacentHTML("afterbegin",'<span class="sm-badge bg-yellow">I</span>');
        else if(data.hasFs)    st.insertAdjacentHTML("afterbegin",'<span class="sm-badge bg-purple">FS</span>');
        var gcaCount = data.rows.filter(function(r){ return gcaPending.has((r.login||"").toLowerCase()); }).length;
        if(gcaCount>0) st.insertAdjacentHTML("beforeend",'<span class="fm-gca-flag">'+gcaCount+'</span>');
        var procP1=window._perfMapProc||"ALL";
        if(procP1!=="ALL"){
          var pmP1={PICK:["PICK_AR","P2R_PICK"],STOW:["STOW","QUANTITY_STOW"],QS:["QUANTITY_STOW"],PACK:["SM","SM1","SMMIX","SM2","AFE_PACK","P2R_PACK","SNS1","SNS2","SINGLES","WS_SLAM","WS_VDF"],DEC:["DECANT"],IND:["INDUCT"],REB:["AFE_REBIN"]};
          var alP1=pmP1[procP1]||[];
          if(!data.rows.some(function(r){return alP1.indexOf(String(r.role||"").toUpperCase())>-1;})) st.style.opacity="0.12";
        }
        if(window._perfMapHighlight || window._mapSeeOpps){
          var hlP1=window._mapSeeOpps ? "opps" : window._perfMapHighlight;
          var mP1=(hlP1==="opps"&&(data.hasGap||data.hasBelow||data.hasIdle||data.hasFs))||(hlP1==="gap"&&(data.hasGap||data.hasBelow))||(hlP1==="idle"&&data.hasIdle)||(hlP1==="faststart"&&data.hasFs)||(hlP1==="gca"&&gcaCount>0);
          if(!mP1) st.style.opacity="0.12";
        }
        st.style.cursor="pointer";
        st.onmouseenter = function(ev){ showPerfTooltip(ev, typeLbl+" "+num, data); };
        st.onmouseleave = function(){ window._ttHideTimer=setTimeout(function(){ var tt=document.getElementById("gcaMapTooltip"); if(tt) tt.style.display="none"; },150); };
        st.onclick = function(){ var t=data.rows.find(function(r){return !r.coached;})||data.rows[0]; if(t) openUploadPrefill(t.login); };
      }
      return st;
    }

    // ── Discover what's present in the data ──
    var inductWalls = {};   // muro (01/03/..) present in induct
    var rebinWalls = {};    // muro (101/103/..) present in rebin
    var afeWalls = {};      // muro (101/103/..) present in afe pack
    var singlesLines = {}, wsLines = {}, decantLines = {};
    Object.keys(stationData).forEach(function(k){
      if(k.indexOf("p1_")!==0) return;
      var p = k.split("_");
      if(p[1]==="induct")      inductWalls[parseInt(p[2])] = true;
      else if(p[1]==="rebin")  rebinWalls[parseInt(p[3]||p[2])] = true;
      else if(p[1]==="afe"){ var w=parseInt(p[3]); afeWalls[w]=true; }
      else if(p[1]==="singles") singlesLines[parseInt(p[2])] = true;
      else if(p[1]==="ws")     wsLines[parseInt(p[2])] = true;
      else if(p[1]==="decant") decantLines[parseInt(p[2])] = true;
    });

    // 8 physical AFE walls (101..108), shown in pairs side by side. Sites don't
    // always open all walls — empty ones still render (greyed) for orientation.
    var WALLS = [101,102,103,104,105,106,107,108];

    // Helpers to detect ACTIVE stations (only show what's operating).
    function _hasData(prefix, a, b, c){
      var key = "p1_"+prefix+"_"+a+(b!=null?"_"+b:"")+(c!=null?"_"+c:"");
      return !!stationData[key];
    }
    function _wallActive(w){
      var mm = parseInt(String(w).slice(-2));
      if(stationData["p1_induct_"+mm]) return true;
      for(var i=1;i<=4;i++) if(stationData["p1_rebin_0_"+w+"_"+i]) return true;
      for(var p=1;p<=8;p++) if(stationData["p1_afe_1_"+w+"_"+p]) return true;
      return false;
    }
    function _lineActive(prefix, id, count){
      for(var p=1;p<=count;p++) if(stationData["p1_"+prefix+"_"+id+"_"+p]) return true;
      return false;
    }

    // Two-column layout: LEFT = induct + wall blocks, RIGHT = lateral lines
    // (Singles / WS / Decant) stacked vertically so there's no long scroll.
    // LEFT sizes to its content (not flex:1, which stretched it full-width and
    // pushed the lines off-screen); RIGHT sits right beside it.
    var cols = document.createElement("div");
    cols.style.cssText = "display:inline-flex;gap:32px;align-items:flex-start;justify-content:flex-start";
    var left = document.createElement("div");
    left.style.cssText = "flex:0 0 auto";
    var right = document.createElement("div");
    right.style.cssText = "flex:0 0 auto";
    cols.appendChild(left); cols.appendChild(right);
    el.appendChild(cols);

    // 8 physical AFE walls (101..108) in pairs. Only ACTIVE walls are shown.
    var WALLS = [101,102,103,104,105,106,107,108];
    var activeWalls = WALLS.filter(_wallActive);

    // ═══ INDUCT ROW (top, separated from the walls) — active inducts only ═══
    var inductWrap = document.createElement("div");
    inductWrap.style.cssText = "display:flex;gap:10px;flex-wrap:wrap;margin-bottom:18px;align-items:center";
    inductWrap.innerHTML = '<span style="font-size:10px;font-weight:700;color:var(--text-secondary);width:48px">INDUCT</span>';
    var anyInduct = false;
    activeWalls.forEach(function(w){
      var mm = String(w).slice(-2);
      var key = "p1_induct_"+parseInt(mm);
      if(stationData[key]){ inductWrap.appendChild(_p1cell(key, "In", mm)); anyInduct = true; }
    });
    if(anyInduct) left.appendChild(inductWrap);

    // ═══ WALL BLOCKS: [4 Rebins A-D (left) | Muro (center) | 8 Packers (right)] ═══
    function _wallBlock(w){
      var block = document.createElement("div");
      block.style.cssText = "display:flex;align-items:center;gap:6px;padding:6px 8px;border:1px solid var(--border);border-radius:10px;background:var(--bg-card)";
      var reb = document.createElement("div");
      reb.style.cssText = "display:flex;flex-direction:column;gap:3px";
      ["A","B","C","D"].forEach(function(slot,i){
        var key = "p1_rebin_0_"+w+"_"+(i+1);
        if(stationData[key]) reb.appendChild(_p1cell(key, "R"+slot, String(w).slice(-2), "circle"));
      });
      block.appendChild(reb);
      var wall = document.createElement("div");
      wall.style.cssText = "min-width:56px;padding:14px 8px;border-radius:8px;text-align:center;font-weight:800;font-size:13px;background:linear-gradient(180deg,#4b5563,#374151);color:#fff";
      wall.innerHTML = 'Muro<br>'+String(w).slice(-2);
      block.appendChild(wall);
      var pk = document.createElement("div");
      pk.style.cssText = "display:flex;flex-wrap:wrap;gap:3px;max-width:180px";
      for(var pos=1; pos<=8; pos++){
        var key = "p1_afe_1_"+w+"_"+pos;
        if(stationData[key]) pk.appendChild(_p1cell(key, "Pk", pos));
      }
      block.appendChild(pk);
      return block;
    }
    if(!activeWalls.length){
      left.insertAdjacentHTML("beforeend", '<div style="padding:20px;color:var(--text-muted);font-size:12px">No hay muros activos ahora.</div>');
    }
    for(var i=0; i<activeWalls.length; i+=2){
      var pairRow = document.createElement("div");
      pairRow.style.cssText = "display:flex;gap:14px;flex-wrap:wrap;margin-bottom:10px";
      pairRow.appendChild(_wallBlock(activeWalls[i]));
      if(activeWalls[i+1] != null) pairRow.appendChild(_wallBlock(activeWalls[i+1]));
      left.appendChild(pairRow);
    }

    // ═══ LATERAL LINES (right column, vertical): Singles + WS + Decant ═══
    // A line = a vertical stack of its active stations (only active shown).
    function _lineCol(label, prefix, lineId, count, typeLbl){
      var col = document.createElement("div");
      col.style.cssText = "display:flex;flex-direction:column;gap:3px;align-items:center;margin-right:8px";
      col.innerHTML = '<span style="font-size:9px;font-weight:700;color:var(--text-muted);margin-bottom:2px">'+esc(label)+'</span>';
      var any=false;
      for(var pos=1; pos<=count; pos++){
        var key = "p1_"+prefix+"_"+lineId+"_"+pos;
        // WS: show the real 2-digit station number ("09"), the owner wants the
        // last two digits directly (side is conveyed by the Der/Izq type label).
        var numLbl = prefix==="ws" ? String(pos).padStart(2,"0") : pos;
        if(stationData[key]){ col.appendChild(_p1cell(key, typeLbl, numLbl)); any=true; }
      }
      return any ? col : null;
    }
    // WS lines encode a SIDE in the line number: 11 = right, 12 = left (the two
    // last station digits are the real position). Show the side as the cell type
    // and the position as the number. The line number encodes which line
    // (11 = Línea 1, 12 = Línea 2); the 2 last digits are the real station number.
    // Header = "Línea 1/2/N", cell type = short "WS".
    function _wsSideLabel(id){ return id===11 ? "Línea 1" : id===12 ? "Línea 2" : ("Línea "+id); }
    function _lineGroup(title, prefix, ids, count, lblFn, typeLblFn){
      var active = ids.filter(function(id){ return _lineActive(prefix, id, count); });
      if(!active.length) return;
      var grp = document.createElement("div");
      grp.style.cssText = "margin-bottom:16px";
      grp.innerHTML = '<div style="font-size:11px;font-weight:700;color:var(--text-secondary);margin-bottom:6px">'+title+'</div>';
      var rowc = document.createElement("div");
      rowc.style.cssText = "display:flex;gap:6px;flex-wrap:wrap;align-items:flex-start";
      active.forEach(function(id){
        var typeLbl = typeLblFn ? typeLblFn(id) : (prefix==="decant"?"Dc":"S"+String(id).padStart(2,"0"));
        var c=_lineCol(lblFn(id), prefix, id, count, typeLbl);
        if(c) rowc.appendChild(c);
      });
      grp.appendChild(rowc);
      right.appendChild(grp);
    }
    var sIds = Object.keys(singlesLines).map(Number).sort(); if(!sIds.length) sIds=[1,2];
    _lineGroup("Singles", "singles", sIds, 20, function(id){ return "S"+String(id).padStart(2,"0"); });
    var wIds = Object.keys(wsLines).map(Number).sort();
    _lineGroup("WS", "ws", wIds, 24, function(id){ return _wsSideLabel(id); }, function(_id){ return "WS"; });
    var dIds = Object.keys(decantLines).map(Number).sort();
    _lineGroup("Decant", "decant", dIds, 20, function(id){ return "D"+String(id).padStart(2,"0"); });
  }


  // ── Map view toggle ────────────────────────────────────────
  // "board" → incidents-only card list (default; the most actionable)
  // "grid"  → physical floor map
  // "list"  → grouped table
  var _mapView = (function(){
    try{ return localStorage.getItem("argos_map_view") || "board"; }catch(_){ return "board"; }
  })();
  var _mapViewBoardBtn = document.getElementById("mapViewBoard");
  var _mapViewGridBtn  = document.getElementById("mapViewGrid");
  var _mapViewListBtn  = document.getElementById("mapViewList");
  function _syncMapViewBtns(){
    [_mapViewBoardBtn, _mapViewGridBtn, _mapViewListBtn].forEach(function(b){ if(b) b.classList.remove("active"); });
    if(_mapView === "board" && _mapViewBoardBtn) _mapViewBoardBtn.classList.add("active");
    else if(_mapView === "grid" && _mapViewGridBtn) _mapViewGridBtn.classList.add("active");
    else if(_mapView === "list" && _mapViewListBtn) _mapViewListBtn.classList.add("active");
  }
  function _setMapView(v){
    _mapView = v;
    try{ localStorage.setItem("argos_map_view", v); }catch(_){}
    _syncMapViewBtns();
    if(perfMapVisible){ renderPerfMap(); if(window._renderPprRates) window._renderPprRates(); }
  }
  _syncMapViewBtns();
  if(_mapViewBoardBtn) _mapViewBoardBtn.addEventListener("click", function(){ _setMapView("board"); });
  if(_mapViewGridBtn)  _mapViewGridBtn.addEventListener("click",  function(){ _setMapView("grid");  });
  if(_mapViewListBtn)  _mapViewListBtn.addEventListener("click",  function(){ _setMapView("list");  });

  // ── List view renderer ─────────────────────────────────────
  function renderPerfListView(containerId, stationData){
    var el = document.getElementById(containerId);
    if(!el) return;
    el.innerHTML = "";

    var gcaPending = window._gcaPendingLogins || new Set();
    var proc = window._perfMapProc || "ALL";
    var hl   = window._perfMapHighlight || "";
    var procMap = {PICK:["PICK_AR","P2R_PICK"],STOW:["STOW","QUANTITY_STOW"],QS:["QUANTITY_STOW"],
                   PACK:["SM","SM1","SMMIX","SM2","AFE_PACK","P2R_PACK","SNS1","SNS2","SINGLES","WS_SLAM","WS_VDF"],DEC:["DECANT"]};

    // Group stationData by zone label
    var zones = {}; // "PICK" → {rows:[], gap:0, idle:0, fs:0, gca:0, ok:0}
    Object.keys(stationData).forEach(function(k){
      var sd = stationData[k];
      sd.rows.forEach(function(r){
        var role = String(r.role||"").toUpperCase();
        var zone;
        if(role.indexOf("PICK")===0||role.indexOf("P2R_PICK")===0) zone="PICK";
        else if(role==="STOW")          zone="STOW";
        else if(role==="QUANTITY_STOW") zone="QS";
        else if(role==="DECANT")        zone="DECANT";
        else if(role.indexOf("ICQA")>=0) zone="ICQA";
        else if(role.indexOf("P2R")>=0||role.indexOf("AFE_PACK")>=0||role.indexOf("SM")===0||
                role.indexOf("SINGLE")>=0||role.indexOf("SNS")===0) zone="PACK";
        else zone="OTHER";

        // Apply proc filter — skip if not matching
        if(proc !== "ALL"){
          var allowed = procMap[proc]||[];
          if(allowed.indexOf(role)===-1) return;
        }

        if(!zones[zone]) zones[zone]={rows:[],gap:0,idle:0,fs:0,gca:0,ok:0};
        zones[zone].rows.push({r:r, stKey:k});
        // Per-associate condition flags (independent) so fast start is counted
        // even for a below-target person. A row can bump several tallies.
        var rNotes = String(r.notes||"");
        var below100 = r.pct < 100;
        var anyIssue = false;
        if(below100 && rNotes.indexOf("Gap") !== -1){ zones[zone].gap++; anyIssue = true; }
        if(below100 && rNotes.indexOf("IDLE") !== -1){ zones[zone].idle++; anyIssue = true; }
        if(below100 && !!r.nhFlag){ zones[zone].fs++; anyIssue = true; }
        if(!anyIssue) zones[zone].ok++;
        if(gcaPending.has((r.login||"").toLowerCase())) zones[zone].gca++;
      });
    });

    var zoneOrder = ["PICK","STOW","QS","PACK","DECANT","ICQA","OTHER"];
    zoneOrder.forEach(function(zoneName){
      var z = zones[zoneName];
      if(!z || !z.rows.length) return;

      // Apply highlight filter at zone level — dim if no match
      var hlMatch = !hl || (hl==="gap"&&z.gap>0)||(hl==="idle"&&z.idle>0)||(hl==="faststart"&&z.fs>0)||(hl==="gca"&&z.gca>0);

      var zoneDiv = document.createElement("div");
      zoneDiv.className = "map-list-zone";
      if(z.gap>0) zoneDiv.classList.add("open"); // auto-open zones with issues

      var pills = "";
      if(z.gap)  pills += '<span class="map-list-pill gap">'+z.gap+' Gap</span>';
      if(z.idle) pills += '<span class="map-list-pill idle">'+z.idle+' Idle</span>';
      if(z.fs)   pills += '<span class="map-list-pill fs">'+z.fs+' FS</span>';
      if(z.gca)  pills += '<span class="map-list-pill gca">'+z.gca+' GCA</span>';
      pills += '<span class="map-list-pill ok">'+z.ok+' OK</span>';

      zoneDiv.innerHTML =
        '<div class="map-list-zone-header">'
        +'<span class="map-list-caret">▶</span>'
        +'<span class="map-list-zone-label">'+zoneName+'</span>'
        +'<span style="font-size:10px;color:var(--text-muted);margin-right:8px">('+z.rows.length+')</span>'
        +'<div class="map-list-zone-pills">'+pills+'</div>'
        +'</div>'
        +'<div class="map-list-rows"></div>';

      if(!hlMatch) zoneDiv.style.opacity = "0.25";

      // Click header → toggle open
      var hdr = zoneDiv.querySelector(".map-list-zone-header");
      hdr.addEventListener("click", function(){
        zoneDiv.classList.toggle("open");
      });

      // Sort: gap first, then idle, then ok
      var sorted = z.rows.slice().sort(function(a,b){
        var stateOrder = {gap:0, idle:1, faststart:2, normal:3, ontarget:4};
        var sa = stationData[a.stKey] ? (stateOrder[stationData[a.stKey].state]||3) : 3;
        var sb = stationData[b.stKey] ? (stateOrder[stationData[b.stKey].state]||3) : 3;
        if(sa!==sb) return sa-sb;
        return (a.r.pct||0) - (b.r.pct||0); // worst pct first within same state
      });

      var rowsEl = zoneDiv.querySelector(".map-list-rows");
      sorted.forEach(function(item){
        var r = item.r;
        var sd = stationData[item.stKey];
        var st = sd ? (sd.state||"normal") : "normal";
        var pc = Math.round(r.pct||0);
        var pctColor = pc>=100?"var(--green)":pc>=80?"var(--orange)":"var(--red)";
        var rowCls = "map-list-row row-"+(st==="ontarget"?"ok":st==="normal"?"ok":st);
        var gcaBadge = gcaPending.has((r.login||"").toLowerCase())
          ? '<span class="map-list-pill gca" style="font-size:9px">GCA</span>' : "";
        var notesText = Array.isArray(r.notes) ? r.notes.join(" · ") : String(r.notes||"");

        var rowDiv = document.createElement("div");
        rowDiv.className = rowCls;
        rowDiv.style.cursor = "pointer";
        rowDiv.innerHTML =
          (r.photo_url ? '<img src="'+esc(r.photo_url)+'" loading="lazy" decoding="async" style="width:24px;height:24px;border-radius:50%;object-fit:cover;flex-shrink:0" onerror="this.style.display=\'none\'">' : '')
          +'<span class="ml-login">'+esc(r.login||"—")+'</span>'
          +'<span class="ml-station">'+esc(r.station||"—")+'</span>'
          +'<span class="ml-rate">'+(Number.isFinite(r.rate)?Math.round(r.rate)+' uph':'—')+'</span>'
          +'<span class="ml-pct" style="color:'+pctColor+'">'+pc+'%</span>'
          +gcaBadge
          +(notesText ? '<span class="ml-notes" title="'+esc(notesText)+'">'+esc(notesText)+'</span>' : '')
          +'<button class="row-btn" style="margin-left:auto;flex-shrink:0" data-upload-login="'+esc(r.login)+'">↑</button>';

        rowDiv.querySelector("[data-upload-login]").addEventListener("click", function(e){
          e.stopPropagation();
          openUploadPrefill(r.login);
        });
        rowsEl.appendChild(rowDiv);
      });

      el.appendChild(zoneDiv);
    });

    if(!el.children.length){
      el.innerHTML = '<div style="padding:32px;text-align:center;color:var(--text-muted);font-size:13px">No active associates on this floor</div>';
    }
  }

  // ── Incidents Board view: priority-sorted cards, problems first ────
  // Default view because 90% of the coach's time is "where do I go next?".
  // OK stations are summarised, not displayed.
  function renderPerfBoardView(containerId, stationData){
    var el = document.getElementById(containerId);
    if(!el) return;

    var gcaPending = window._gcaPendingLogins || new Set();
    var proc = window._perfMapProc || "ALL";
    var hl   = window._perfMapHighlight || "";
    var procMap = {PICK:["PICK_AR","P2R_PICK"],STOW:["STOW","QUANTITY_STOW"],QS:["QUANTITY_STOW"],
                   PACK:["SM","SM1","SMMIX","SM2","AFE_PACK","P2R_PACK","SNS1","SNS2","SINGLES","WS_SLAM","WS_VDF"],DEC:["DECANT"]};

    // Flatten all rows with their station state
    var items = [];
    var okCount = 0, totalCount = 0;
    Object.keys(stationData).forEach(function(k){
      var sd = stationData[k];
      sd.rows.forEach(function(r){
        totalCount++;
        var role = String(r.role||"").toUpperCase();
        if(proc !== "ALL"){
          var allowed = procMap[proc] || [];
          if(allowed.indexOf(role) === -1) return;
        }
        // Derive this ASSOCIATE's own condition flags (not the station's), so a
        // person in fast start inside a "below" station is still tagged fast
        // start. A person can hold several at once.
        var rNotes = String(r.notes||"");
        var itHasGap  = r.pct < 100 && rNotes.indexOf("Gap") !== -1;
        var itHasIdle = r.pct < 100 && rNotes.indexOf("IDLE") !== -1;
        var itHasBelow= r.pct < 80;
        var itHasFs   = r.pct < 100 && !!r.nhFlag;
        var hasGca = gcaPending.has((r.login||"").toLowerCase());
        // Dominant state for color/sorting (gap > idle > below > faststart).
        var st = itHasGap ? "gap" : itHasIdle ? "idle" : itHasBelow ? "below" : itHasFs ? "faststart" : (r.pct >= 100 ? "ontarget" : "normal");
        // OK cards aren't shown in board view; just counted.
        if((st === "ontarget" || st === "normal") && !hasGca){ okCount++; return; }
        items.push({ r: r, state: st, hasGca: hasGca, stationKey: k,
                     hasGap:itHasGap, hasIdle:itHasIdle, hasBelow:itHasBelow, hasFs:itHasFs });
      });
    });

    // Filter by active highlight — match on the INDEPENDENT flags so Fast Start
    // catches everyone in fast start even if their dominant state is below/gap.
    if(hl){
      items = items.filter(function(it){
        if(hl === "gap")  return it.hasGap || it.hasBelow;
        if(hl === "idle") return it.hasIdle;
        if(hl === "faststart") return it.hasFs;
        if(hl === "gca")  return it.hasGca;
        return true;
      });
    }

    // Priority order: gap > idle > faststart > below > gca-only > rest, then by % asc
    var order = { gap:0, below:1, idle:2, faststart:3, normal:4, ontarget:5 };
    items.sort(function(a,b){
      // GCA-only floats above plain "normal"
      var sa = order[a.state] != null ? order[a.state] : 4;
      var sb = order[b.state] != null ? order[b.state] : 4;
      if(a.hasGca && !b.hasGca) sa = Math.min(sa, 3.5);
      if(b.hasGca && !a.hasGca) sb = Math.min(sb, 3.5);
      if(sa !== sb) return sa - sb;
      return (Number(a.r.pct)||0) - (Number(b.r.pct)||0); // worst pct first
    });

    el.innerHTML = "";
    var wrap = document.createElement("div");
    wrap.className = "ib-wrap";

    if(!items.length){
      wrap.innerHTML =
        '<div class="ib-empty">'
        +'<div class="ib-empty-icon">✓</div>'
        +'<div style="font-size:14px;font-weight:600;color:var(--text);margin-bottom:4px">'+t("map_no_issues")+'</div>'
        +'<div>'+t("map_all_on_target")+'</div>'
        +'</div>';
      el.appendChild(wrap);
      return;
    }

    // Group items by primary state for visual sectioning
    var sections = [
      { key: "gap",   label: "Gap / Bajo target", color: "#dc2626", items: [] },
      { key: "idle",  label: "Idle",              color: "#ca8a04", items: [] },
      { key: "fs",    label: "Fast Start",        color: "#7c3aed", items: [] },
      { key: "gca",   label: "GCA pendiente",     color: "#f59e0b", items: [] },
    ];
    items.forEach(function(it){
      if(it.state === "gap" || it.state === "below") sections[0].items.push(it);
      else if(it.state === "idle") sections[1].items.push(it);
      else if(it.state === "faststart") sections[2].items.push(it);
      else if(it.hasGca) sections[3].items.push(it);
      else sections[0].items.push(it); // fallback to first section
    });

    // Render: summary banner + each non-empty section
    var summary = document.createElement("div");
    summary.className = "ib-summary";
    summary.innerHTML =
      '<span><b>'+items.length+'</b> incidencias activas</span>'
      +'<span>·</span>'
      +'<span><b>'+okCount+'</b> en target</span>'
      +'<span>·</span>'
      +'<span style="color:var(--text-muted)">'+totalCount+' total</span>';
    wrap.appendChild(summary);

    sections.forEach(function(sec){
      if(!sec.items.length) return;
      var section = document.createElement("div");
      section.className = "ib-section";
      var title = document.createElement("div");
      title.className = "ib-section-title";
      title.innerHTML =
        '<span class="ib-st-dot" style="background:'+sec.color+'"></span>'
        +'<span>'+sec.label+'</span>'
        +'<span class="ib-st-count">'+sec.items.length+'</span>';
      section.appendChild(title);

      var grid = document.createElement("div");
      grid.className = "ib-grid";
      // Cap at 24 cards per section to avoid overwhelming; show "+N more"
      var shown = sec.items.slice(0, 24);
      var hidden = sec.items.length - shown.length;
      shown.forEach(function(it){ grid.appendChild(buildIncidentCard(it)); });
      section.appendChild(grid);
      if(hidden > 0){
        var more = document.createElement("button");
        more.className = "ib-show-more";
        more.textContent = tf("map_more_in_cat", {n: hidden});
        more.addEventListener("click", function(){
          sec.items.slice(24).forEach(function(it){ grid.appendChild(buildIncidentCard(it)); });
          more.remove();
        });
        section.appendChild(more);
      }
      wrap.appendChild(section);
    });

    el.appendChild(wrap);
  }

  function buildIncidentCard(it){
    var r = it.r;
    var pc = Math.round(Number(r.pct) || 0);
    var pctCls = pc >= 100 ? "ok" : pc >= 80 ? "warn" : "bad";
    var card = document.createElement("div");
    card.className = "ib-card " + (it.state || "");
    var photo = r.photo_url
      ? '<img class="ib-photo" src="'+esc(r.photo_url)+'" loading="lazy" decoding="async" onerror="this.outerHTML=\'<div class=&quot;ib-photo-ph&quot;>'+esc((r.login||"?").charAt(0).toUpperCase())+'</div>\'">'
      : '<div class="ib-photo-ph">'+esc((r.login||"?").charAt(0).toUpperCase())+'</div>';
    // Tags reflect ALL of this person's active conditions (flags), so someone
    // who is below-target AND in fast start shows both "Low" and "FS".
    var tags = "";
    if(it.hasGap) tags += '<span class="ib-tag tag-gap">Gap</span>';
    else if(it.hasBelow) tags += '<span class="ib-tag tag-below">Low</span>';
    if(it.hasIdle) tags += '<span class="ib-tag tag-idle">Idle</span>';
    if(it.hasFs) tags += '<span class="ib-tag tag-fs">FS</span>';
    if(it.hasGca) tags += '<span class="ib-tag tag-gca">GCA</span>';
    if(r.coached) tags += '<span class="ib-tag tag-coached">✓ Coached</span>';
    card.innerHTML =
      photo
      +'<div class="ib-info">'
        +'<div class="ib-info-row1">'
          +'<span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap">'+esc(r.login||"—")+'</span>'
          +'<span class="ib-station">'+esc(r.station||"—")+'</span>'
        +'</div>'
        +'<div class="ib-info-row2">'
          +'<span class="ib-role">'+esc(r.role||"—")+'</span>'
          +'<span class="ib-rate">'+(Number.isFinite(r.rate) ? Math.round(r.rate)+' uph' : '—')+'</span>'
          +tags
        +'</div>'
      +'</div>'
      +'<span class="ib-pct '+pctCls+'">'+pc+'%</span>'
      +'<button class="ib-coach-btn" data-upload-login="'+esc(r.login||"")+'">Coach</button>';
    // Click anywhere on card → focus this associate (open upload prefilled)
    card.addEventListener("click", function(e){
      if(e.target.tagName === "BUTTON") return;
      if(r.login) openUploadPrefill(r.login);
    });
    var coachBtn = card.querySelector(".ib-coach-btn");
    coachBtn.addEventListener("click", function(e){
      e.stopPropagation();
      if(r.login) openUploadPrefill(r.login);
    });
    return card;
  }

  // ── Floor Command Center: rich content in the empty middle of AR ring ──
  // Shows: floor summary stats, per-process KPIs, and a pinnable station
  // detail card. Click any station in the floor to pin it here.
  var _pinnedStation = null;  // { floorId, key }

  function renderFloorCommandCenter(centerEl, floorId, stationData, layoutInfo){
    var totalStations = (layoutInfo.topRow.length + layoutInfo.leftCol.length
                       + layoutInfo.bottomRow.length + layoutInfo.rightCol.length);
    var activeCount = 0, gapCount = 0, idleCount = 0, fsCount = 0, okCount = 0, gcaCount = 0;
    var procStats = {};  // proc → {uph:[], pct:[], gap:0, n:0}
    var gcaPending = window._gcaPendingLogins || new Set();

    function classifyProc(role){
      role = String(role||"").toUpperCase();
      if(role.indexOf("PICK") === 0 || role === "P2R_PICK") return "PICK";
      if(role === "STOW") return "STOW";
      if(role === "QUANTITY_STOW") return "QS";
      if(role === "DECANT") return "DECANT";
      if(role.indexOf("ICQA") >= 0) return "ICQA";
      if(role === "SM" || role === "SM1" || role === "SMMIX" || role === "SM2"
         || role === "AFE_PACK" || role === "P2R_PACK" || role === "SNS1" || role === "SNS2"
         || role === "SINGLES" || role === "WS_SLAM" || role === "WS_VDF") return "PACK";
      return "OTHER";
    }

    Object.keys(stationData).forEach(function(k){
      if(k.indexOf(floorId + "_") !== 0) return;
      var sd = stationData[k];
      if(!sd.rows.length) return;
      activeCount++;
      var st = sd.state || "normal";
      if(st === "gap" || st === "below") gapCount++;
      else if(st === "idle") idleCount++;
      else if(st === "faststart") fsCount++;
      else if(st === "ontarget" || st === "normal") okCount++;
      sd.rows.forEach(function(r){
        var p = classifyProc(r.role);
        if(!procStats[p]) procStats[p] = { n:0, uphSum:0, uphN:0, pctSum:0, pctN:0, gap:0 };
        procStats[p].n++;
        if(Number.isFinite(r.rate)){ procStats[p].uphSum += r.rate; procStats[p].uphN++; }
        if(Number.isFinite(r.pct)){  procStats[p].pctSum += r.pct;  procStats[p].pctN++; }
        if(st === "gap" || st === "below") procStats[p].gap++;
        if(gcaPending.has((r.login||"").toLowerCase())) gcaCount++;
      });
    });

    var pinnedHtml = renderPinnedStationHtml(floorId, stationData);
    var html = ""
      + '<div class="fcc">'
      + '<div class="fcc-header">'
        + '<div class="fcc-title">'+esc(floorId.toUpperCase())+' · Floor Summary</div>'
        + '<div class="fcc-title-sub">' + activeCount + ' / ' + totalStations + ' stations active</div>'
      + '</div>'
      + '<div class="fcc-summary">'
        + '<div class="fcc-stat gap"><div class="fcc-stat-val">'+gapCount+'</div><div class="fcc-stat-lbl">Gap</div></div>'
        + '<div class="fcc-stat idle"><div class="fcc-stat-val">'+idleCount+'</div><div class="fcc-stat-lbl">Idle</div></div>'
        + '<div class="fcc-stat fs"><div class="fcc-stat-val">'+fsCount+'</div><div class="fcc-stat-lbl">Fast Start</div></div>'
        + '<div class="fcc-stat ok"><div class="fcc-stat-val">'+okCount+'</div><div class="fcc-stat-lbl">On Target</div></div>'
      + '</div>';

    // Per-process KPIs vs OP2 (real FCLM rate vs OP2 daily target). Replaces the
    // old per-process averages. Cards are clickable → filter the map. Only the
    // processes that live on this floor are shown.
    var procsHtml = "";
    var pprList = (_pprData && _pprData.processes) ? _pprData.processes.filter(function(p){
      return p.found && (!Array.isArray(p.floors) || !p.floors.length || p.floors.indexOf(floorId) !== -1);
    }) : [];
    var activeProc = window._perfMapProc || "ALL";
    pprList.forEach(function(p){
      var rate = (p.rate!=null) ? p.rate : "—";
      var pctTxt = "", pctCls = "";
      if(p.pct_op2!=null){
        pctCls = p.pct_op2>=100 ? "ok" : p.pct_op2>=90 ? "warn" : "bad";
        pctTxt = p.pct_op2 + "%";
      }
      var op2Txt = (p.op2!=null) ? ("OP2 "+p.op2) : "";
      var on = (p.proc_filter && p.proc_filter===activeProc) ? " fcc-proc-active" : "";
      procsHtml +=
        '<div class="fcc-proc fcc-proc-click'+on+'" data-proc="'+esc(p.proc_filter||"ALL")+'" title="Click to filter the map to '+esc(p.label)+'">'
        + '<div class="fcc-proc-name">'+esc(p.label)+'</div>'
        + '<div class="fcc-proc-row">'
          + '<span class="fcc-proc-uph">'+rate+'<span style="font-size:9.5px;color:var(--text-muted);font-weight:600"> uph</span></span>'
          + (pctTxt ? '<span class="fcc-proc-pct '+pctCls+'">'+pctTxt+'</span>' : '')
        + '</div>'
        + '<div class="fcc-proc-foot">'
          + '<span>'+(op2Txt||'·')+'</span>'
          + '<span>'+(p.people||0)+' ppl</span>'
        + '</div>'
        + '</div>';
    });
    if(procsHtml) html += '<div class="fcc-procs">' + procsHtml + '</div>';

    html += pinnedHtml + '</div>';
    centerEl.innerHTML = html;

    // Wire OP2 KPI cards → filter the map (reuse existing process buttons).
    centerEl.querySelectorAll(".fcc-proc-click").forEach(function(card){
      card.addEventListener("click", function(){
        var proc = card.getAttribute("data-proc") || "ALL";
        var target = (window._perfMapProc === proc) ? "ALL" : proc;
        var btn = document.querySelector('.map-proc-btn[data-proc="'+target+'"]');
        if(btn){ btn.click(); }
        else { window._perfMapProc = target; if(window._renderPerfMap) window._renderPerfMap(); }
      });
    });

    // Wire pin clear + per-row coach
    var clearBtn = centerEl.querySelector(".fcc-pin-clear");
    if(clearBtn) clearBtn.addEventListener("click", function(e){
      e.stopPropagation();
      _pinnedStation = null;
      if(perfMapVisible) renderPerfMap();
    });
    centerEl.querySelectorAll(".pr-coach").forEach(function(btn){
      btn.addEventListener("click", function(e){
        e.stopPropagation();
        var login = btn.dataset.login;
        if(login) openUploadPrefill(login);
      });
    });
  }

  function renderPinnedStationHtml(floorId, stationData){
    if(!_pinnedStation || _pinnedStation.floorId !== floorId){
      return '<div class="fcc-pin empty">'+t("map_pin_hint")+'</div>';
    }
    var sd = stationData[_pinnedStation.key];
    if(!sd){
      // Pinned station no longer in current data (filter changed); auto-clear.
      _pinnedStation = null;
      return '<div class="fcc-pin empty">'+t("map_pin_hint")+'</div>';
    }
    var stNum = (_pinnedStation.key.split("_")[1]) || "?";
    var rows = sd.rows || [];
    var avgPct = 0, n=0;
    rows.forEach(function(r){ if(Number.isFinite(r.pct)){ avgPct += r.pct; n++; } });
    avgPct = n ? Math.round(avgPct/n) : 0;
    var pctCls = avgPct >= 100 ? "ok" : avgPct >= 80 ? "warn" : "bad";
    var rolesSet = {};
    rows.forEach(function(r){ if(r.role) rolesSet[String(r.role).toUpperCase()] = true; });
    var roles = Object.keys(rolesSet).slice(0, 3).join(" · ");

    var rowsHtml = rows.slice(0,4).map(function(r){
      var pc = Math.round(Number(r.pct)||0);
      var cls = pc >= 100 ? "ok" : pc >= 80 ? "warn" : "bad";
      var photo = r.photo_url
        ? '<img class="pr-photo" src="'+esc(r.photo_url)+'" loading="lazy" decoding="async" onerror="this.outerHTML=\'<div class=&quot;pr-photo-ph&quot;>'+esc((r.login||"?").charAt(0).toUpperCase())+'</div>\'">'
        : '<div class="pr-photo-ph">'+esc((r.login||"?").charAt(0).toUpperCase())+'</div>';
      return '<div class="fcc-pin-row">'
        + photo
        + '<span class="pr-login">'+esc(r.login||"—")+'</span>'
        + '<span class="pr-rate">'+(Number.isFinite(r.rate) ? Math.round(r.rate)+' uph' : '—')+'</span>'
        + '<span class="pr-pct '+cls+'">'+pc+'%</span>'
        + '<button class="pr-coach" data-login="'+esc(r.login||"")+'">Coach</button>'
        + '</div>';
    }).join("");
    var more = rows.length > 4 ? '<div style="text-align:center;font-size:10.5px;color:var(--text-muted);padding-top:2px">+'+(rows.length-4)+' '+t("map_more_short")+'</div>' : '';

    return ''
      + '<div class="fcc-pin has-data">'
        + '<button class="fcc-pin-clear" title="Quitar pin">×</button>'
        + '<div class="fcc-pin-head">'
          + '<div class="fcc-pin-station">'+esc(stNum)+'</div>'
          + '<div class="fcc-pin-meta"><b>'+rows.length+'</b> assoc. · avg <span style="color:var(--' + (pctCls==='ok'?'green':pctCls==='warn'?'orange':'red') + ')">' + avgPct + '%</span>'
          + (roles ? ' · ' + esc(roles) : '')
          + '</div>'
        + '</div>'
        + '<div class="fcc-pin-rows">' + rowsHtml + more + '</div>'
      + '</div>';
  }

  // Pin a station into the Floor Command Center on right-click (or
  // shift+click). Plain click still opens upload-prefill — we don't want
  // to fight the existing UX. The hint in the empty pin slot says so.
  function _pinStationFromEvent(ev){
    var st = ev.target.closest && ev.target.closest(".sm-station");
    if(!st) return false;
    if(_mapView !== "grid") return false;
    var floorContainer = st.closest("[id^='perfFloor_']");
    if(!floorContainer) return false;
    var floorId = floorContainer.id.replace(/^perfFloor_/, "");
    var num = (st.querySelector(".sm-num") || {}).textContent;
    if(!num) return false;
    var key = floorId + "_" + num.trim();
    _pinnedStation = { floorId: floorId, key: key };
    if(window._renderPerfMap) window._renderPerfMap();
    return true;
  }
  document.addEventListener("contextmenu", function(ev){
    if(_pinStationFromEvent(ev)) ev.preventDefault();
  });
  document.addEventListener("click", function(ev){
    if(ev.shiftKey && _pinStationFromEvent(ev)){ ev.preventDefault(); ev.stopPropagation(); }
  }, true);

  // ── Mini-radar: scaled-down dot map of the FC, one dot per station ──
  // Renders into #mapRadarSvg every time the map re-renders. Worst-state
  // wins per station; click on a region filters the board.
  function renderMapRadar(stationData){
    var svg = document.getElementById("mapRadarSvg");
    if(!svg) return;
    // Compute station list with state. Layout: 13 cols × 7 rows max.
    var stations = Object.keys(stationData).map(function(k){
      var sd = stationData[k];
      // Extract numeric station id
      var parts = k.split("_");
      var num = parseInt(parts[1],10);
      return { num: isNaN(num) ? 0 : num, state: sd.state || "normal", hasRows: sd.rows.length > 0 };
    }).filter(function(s){ return s.hasRows; });
    stations.sort(function(a,b){ return a.num - b.num; });

    var COLS = 13, ROWS = 4;
    var W = 78, H = 44, padX = 4, padY = 4;
    var dotW = (W - padX*2) / COLS, dotH = (H - padY*2) / ROWS;
    var cap = COLS * ROWS;
    var slice = stations.slice(0, cap);

    var stateColor = {
      gap:      "#dc2626",
      below:    "#dc2626",
      idle:     "#ca8a04",
      faststart:"#7c3aed",
      normal:   "#3b82f6",
      ontarget: "#16a34a",
    };

    var svgNs = "http://www.w3.org/2000/svg";
    while(svg.firstChild) svg.removeChild(svg.firstChild);
    slice.forEach(function(s, i){
      var col = i % COLS, row = Math.floor(i / COLS);
      var cx = padX + col * dotW + dotW/2;
      var cy = padY + row * dotH + dotH/2;
      var c = document.createElementNS(svgNs, "circle");
      c.setAttribute("cx", cx);
      c.setAttribute("cy", cy);
      c.setAttribute("r", "2");
      c.setAttribute("fill", stateColor[s.state] || "#94a3b8");
      c.setAttribute("opacity", s.state === "ontarget" ? "0.55" : "0.92");
      svg.appendChild(c);
    });
  }

  function showPerfTooltip(e, stNum, data){
    clearTimeout(window._ttHideTimer);
    var tt=document.getElementById('gcaMapTooltip');
    if(!tt)return;
    if(tt.parentElement!==document.body)document.body.appendChild(tt);
    var rows=data.rows||[];
    var h='<div style="font-weight:700;margin-bottom:10px;font-size:19px">Station '+stNum+'</div>';
    h+='<div style="font-size:15px;color:#b0bec5;margin-bottom:8px">'+rows.length+' associate'+(rows.length>1?'s':'')+'</div>';
    for(var i=0;i<Math.min(rows.length,5);i++){
      var r=rows[i];
      var pc=Math.round(r.pct||0);
      var clr=pc>=100?'#059669':pc>=80?'#d97706':'#dc2626';
      h+='<div style="display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid #2a3a4a">';
      if(r.photo_url)h+='<img src="'+r.photo_url+'" loading="lazy" decoding="async" style="width:42px;height:42px;border-radius:50%;object-fit:cover">';
      h+='<b style="min-width:70px;font-size:15px">'+(r.login||'--')+'</b>';
      h+='<span style="font-size:15px;color:#e2e8f0">'+Math.round(r.rate||0)+' uph</span>';
      h+='<span style="font-size:16px;font-weight:700;color:'+clr+'">'+pc+'%</span>';
      if(r.coached)h+=' <span style="color:#f59e0b">&#9679;</span>';
      if(r.nhFlag)h+=' <span style="color:#8b5cf6;font-size:12px">[FS]</span>';
      h+='</div>';
    }
    for(var j=0;j<Math.min(rows.length,2);j++){
      if(rows[j].notes){
        var parts=String(rows[j].notes).split(/[,;]/);
        h+='<div style="margin-top:8px;font-size:14px;font-weight:600;color:#e2e8f0">'+rows[j].login+':</div>';
        for(var k=0;k<parts.length;k++){if(parts[k].trim())h+='<div style="font-size:14px;color:#cbd5e1;padding-left:10px;line-height:1.5">- '+parts[k].trim()+'</div>';}
      }
    }
    
    // GCA Pending info
    var gcaMap = window._gcaPendingMap || {};
    for(var g=0;g<rows.length;g++){
      var gcaInfo = gcaMap[(rows[g].login||'').toLowerCase()];
      if(gcaInfo){
        var gcaUrl = 'https://guided-coaching-dub.corp.amazon.com/#/view-coaching-instance/'+gcaInfo.id;
        h+='<div style="margin-top:8px;padding:8px;border-radius:6px;background:rgba(245,158,11,0.1);border:1px solid rgba(245,158,11,0.3)">';
        h+='<div style="font-size:12px;font-weight:600;color:#f59e0b">GCA Pending</div>';
        if(gcaInfo.insight) h+='<div style="font-size:12px;color:#e2e8f0;margin-top:2px">'+gcaInfo.insight+'</div>';
        if(gcaInfo.comment) h+='<div style="font-size:11px;color:#b0bec5;margin-top:2px;font-style:italic">'+gcaInfo.comment+'</div>';
        h+='<a href="'+gcaUrl+'" target="_blank" style="display:inline-block;margin-top:4px;font-size:11px;color:#3b82f6;text-decoration:none">Open GCA →</a>';
        h+='</div>';
      }
    }
    tt.innerHTML=h;
    tt.style.display='block';
    var lft=e.clientX+8;if(lft+500>window.innerWidth)lft=e.clientX-500;
    var ttH=tt.offsetHeight||300;
    var tp=e.clientY+10;if(tp+ttH>window.innerHeight)tp=Math.max(8,e.clientY-ttH-10);
    tt.style.left=lft+'px';
    tt.style.top=tp+'px';
  }

  function showPerfTooltipEmpty(e, stNum, type){
    const tt = document.getElementById("gcaMapTooltip");
    if(!tt) return;
    tt.innerHTML = `<div style="font-weight:600;color:var(--text)">📍 Station ${stNum}</div><div style="font-size:11px;color:var(--text-muted);margin-top:2px">${type} · No associate</div>`;
    tt.style.display = "block";
    tt.style.left = Math.min(e.clientX + 12, window.innerWidth - 200) + "px";
    tt.style.top = (e.clientY - 40) + "px";
    tt.onmouseleave = function(){ tt.style.display = "none"; };
  }

})();

// ═══════════════════════════════════════════════════════════════
// GCA COMPLIANCE TAB
// ═══════════════════════════════════════════════════════════════
(function(){
  const GCA_OWNERS = ["L&D","Team Lead IB","Team Lead OB","ICQA","Area Manager IB","Area Manager OB"];
  let gcaData = null;
  let gcaOwnerFilter = "";
  let gcaPresentOnly = true;   // Present-only filter ON by default (matches old checkbox)
  let gcaSortExp = "";         // "", "asc" (soonest first), "desc" — expiration sort
  let gcaTab = "pending";      // "pending" | "closed" (Cancelled/Expired view)

  const $g = id => document.getElementById(id);

  // Expiration header: click cycles off -> asc (expiring first) -> desc.
  (function wireGcaExpSort(){
    const th = document.getElementById("gcaThExpiration");
    if(th && !th._wired){
      th._wired = true;
      th.addEventListener("click", ()=>{
        gcaSortExp = gcaSortExp === "asc" ? "desc" : gcaSortExp === "desc" ? "" : "asc";
        renderGca();
      });
    }
  })();

  // ── Load cached data on tab switch ──
  async function loadGcaDashboard(){
    // Skeleton + skeleton row count guess from previous data, fallback 8
    const prev = (gcaData && gcaData.items) ? Math.min(gcaData.items.length, 8) : 8;
    renderSkeletonRows(prev, { tbodyId: "gcaTbody", cols: 8 });
    try{
      const d = await jget(`${API}/api/gca/dashboard?fc=${encodeURIComponent(currentFC)}`);
      if(d.ok === false){
        renderEmptyState(t("empty_no_gca_title"), t("empty_no_gca_sub"),
                          { tbodyId: "gcaTbody", cols: 8 });
        return;
      }
      gcaData = d;
      // Expose pending logins for Performance map cross-reference
      var pSet = new Set();
      (d.items||[]).forEach(function(it){ if(it.status==="PENDING") pSet.add((it.login||"").toLowerCase()); });
      window._gcaPendingLogins = pSet;
      // Also expose a map: login → {id, insight} for GCA links in performance tooltip
      var pMap = {};
      (d.items||[]).forEach(function(it){ if(it.status==="PENDING"){ var lg=(it.login||"").toLowerCase(); if(!pMap[lg]) pMap[lg]={id:it.id||"",insight:it.insight||"",comment:it.comment||""}; }});
      window._gcaPendingMap = pMap;
      // Preload cancel-reason labels so the Cancelled/Expired tab can translate
      // the closedReason enum. Fire-and-forget: re-render once loaded so the
      // labels appear even if the user is already on the closed tab.
      if(!_ccCancelReasons){
        _ccLoadReasons().then(()=>{ if(gcaTab==="closed") renderGca(); }).catch(()=>{});
      }
      renderGca();
      maybeAlertHighDefects();
    }catch(e){
      renderEmptyState("No se pudo cargar GCA", e.message,
                        { tbodyId: "gcaTbody", cols: 8 });
      console.warn("loadGcaDashboard",e);
    }
  }
  window._loadGcaDashboard = loadGcaDashboard;

  // ── High Defects alert popup ──
  // Warns the trainer that any pending HIGH_DEFECTS coaching must be closed.
  // Fires once per dataset load (not on every filter re-render).
  function maybeAlertHighDefects(){
    if(!gcaData || !Array.isArray(gcaData.items)) return;
    const hd = gcaData.items.filter(i => i.status === "PENDING" && i.scenario === "HIGH_DEFECTS");
    const countEl = $g("hdCount"), listEl = $g("hdList");
    if(countEl) countEl.textContent = hd.length;
    if(listEl){
      listEl.innerHTML = hd.length
        ? hd.map(it=>{
            const who = esc(it.login || it.employee_id || "—");
            const what = esc(it.insight || it.course_title || "");
            const safeId = esc(it.id || "");
            const loc = [it.station, it.process_path].filter(Boolean).join(" · ");
            const locHtml = loc ? `<div style="font-size:11px;color:var(--text-secondary)">📍 ${esc(loc)}</div>` : "";
            return `<div class="hd-row">
              <div><b>${who}</b>${what?` · <span style="color:var(--text-secondary)">${what}</span>`:""}${locHtml}</div>
              <div style="display:flex;gap:6px;white-space:nowrap">
                <button class="row-btn cc-complete" data-iid="${safeId}" data-login="${who}" data-name="${esc(it.name||"")}" data-eid="${esc(it.employee_id||"")}" data-process="${esc(it.process_path||it.station||it.course_title||it.insight||"")}">✓ Completar</button>
                <button class="row-btn cc-cancel" data-iid="${safeId}" data-login="${who}" data-name="${esc(it.name||"")}" data-eid="${esc(it.employee_id||"")}" data-process="${esc(it.process_path||it.station||it.course_title||it.insight||"")}">✗ Cancelar</button>
              </div>
            </div>`;
          }).join("")
        : "";
      // Wire the per-row close buttons.
      listEl.querySelectorAll(".cc-complete").forEach(b=>b.addEventListener("click",()=>
        openCloseCoaching({instanceId:b.dataset.iid, fc:currentFC, action:"complete",
          login:b.dataset.login, name:b.dataset.name,
          employee_id:b.dataset.eid, badge:b.dataset.eid, process:b.dataset.process,
          onDone:()=>{ closeModal("modalHighDefects"); }})));
      listEl.querySelectorAll(".cc-cancel").forEach(b=>b.addEventListener("click",()=>
        openCloseCoaching({instanceId:b.dataset.iid, fc:currentFC, action:"cancel",
          login:b.dataset.login, name:b.dataset.name,
          employee_id:b.dataset.eid, badge:b.dataset.eid, process:b.dataset.process,
          onDone:()=>{ closeModal("modalHighDefects"); }})));
    }
    if(!hd.length) return;
    // Only auto-open once per (fc + set of HD ids) so it doesn't nag on every reload.
    const sig = currentFC + "|" + hd.map(i=>i.id).sort().join(",");
    try{
      if(sessionStorage.getItem("argos-hd-alerted") === sig) return;
      sessionStorage.setItem("argos-hd-alerted", sig);
    }catch(_){}
    openModal("modalHighDefects");
  }
  window._alertHighDefects = ()=>openModal("modalHighDefects");

  // ── Render everything ──

  // ═══ GCA STATION MAP — POPUP FLOTANTE, coloreado por OWNER del topic ═══
  // Burbuja abajo-derecha (solo visible en la pestaña GCA). Cada estación se
  // pinta con franjas verticales, una por owner con pendings ahí; el centro del
  // mapa muestra el TOTAL pending global. Reacciona a su propio Present-only.
  let floorMapVisible = false;   // popup abierto?
  let gcaMapPresentOnly = true;  // present-only del popup (independiente de la tabla)
  let activeFloor = "p2";

  // 6 owners de gca_legend.json → color. Mismo orden que las --own-* del CSS.
  const GCA_OWNER_COLORS = {
    "L&D":            "var(--own-ld)",
    "Team Lead IB":   "var(--own-tlib)",
    "Team Lead OB":   "var(--own-tlob)",
    "ICQA":           "var(--own-icqa)",
    "Area Manager IB":"var(--own-amib)",
    "Area Manager OB":"var(--own-amob)",
  };
  function _gcaOwnerColor(owner){ return GCA_OWNER_COLORS[owner] || "var(--own-other)"; }

  var _gcaPopup = document.getElementById("gcaMapPopup");
  var _gcaFab   = document.getElementById("gcaMapFab");
  function _openGcaMap(){
    floorMapVisible = true;
    if(_gcaPopup){ _gcaPopup.classList.add("open"); _gcaPopup.classList.remove("min"); }
    if(_gcaFab) _gcaFab.style.display = "none";
    renderFloorMap();
  }
  function _closeGcaMap(){
    floorMapVisible = false;
    if(_gcaPopup) _gcaPopup.classList.remove("open");
    // Mostrar el FAB para reabrir (solo si estamos en la pestaña GCA).
    _updateGcaFabVisibility();
  }
  function _updateGcaFabVisibility(){
    // GCA station-map popup/FAB retired (visual bug): never surface it.
    if(_gcaFab) _gcaFab.style.display = "none";
    if(_gcaPopup) _gcaPopup.classList.remove("open");
  }
  window._updateGcaFabVisibility = _updateGcaFabVisibility;
  if(_gcaFab) _gcaFab.addEventListener("click", _openGcaMap);
  var _gcaMapClose = document.getElementById("gcaMapClose");
  if(_gcaMapClose) _gcaMapClose.addEventListener("click", _closeGcaMap);
  var _gcaMapMin = document.getElementById("gcaMapMin");
  if(_gcaMapMin) _gcaMapMin.addEventListener("click", function(){ if(_gcaPopup) _gcaPopup.classList.toggle("min"); });
  // Present-only del popup
  var _gcaMapPresentBtn = document.getElementById("gcaMapPresentOnly");
  if(_gcaMapPresentBtn) _gcaMapPresentBtn.addEventListener("click", function(){
    gcaMapPresentOnly = !gcaMapPresentOnly;
    _gcaMapPresentBtn.classList.toggle("active", gcaMapPresentOnly);
    var ic = document.getElementById("gcaMapPresentIcon"); if(ic) ic.textContent = gcaMapPresentOnly ? "●" : "○";
    renderFloorMap();
  });

  // Compliance details toggle
  const btnComp = $g("btnToggleCompliance");
  if(btnComp) btnComp.addEventListener("click",()=>{
    const wrap = $g("gcaComplianceWrap");
    const arrow = $g("complianceArrow");
    if(!wrap) return;
    const show = wrap.style.display === "none";
    wrap.style.display = show ? "" : "none";
    if(arrow) arrow.style.transform = show ? "rotate(90deg)" : "";
  });

  // Build GCA floor tabs dynamically from shared layout (into the popup).
  function _buildGcaFloorTabs(){
    var tabBar = document.getElementById("gcaMapTabs");
    var floorWrap = document.getElementById("gcaFloorWrap");
    if(!tabBar || !floorWrap) return;
    var floors = window._getFloors ? window._getFloors() : [{id:"p2",label:"P2 (AR)",type:"ar_ring"},{id:"p1",label:"P1 (Pack)",type:"pack"}];
    tabBar.innerHTML = "";
    floorWrap.innerHTML = "";
    floors.forEach(function(fl, i){
      var btn = document.createElement("button");
      btn.className = "gmp-tab" + (i===0?" active":"");
      btn.dataset.floor = fl.id;
      btn.textContent = fl.label;
      tabBar.appendChild(btn);
      var div = document.createElement("div");
      div.id = "gcaFloor_" + fl.id;
      div.className = "gca-floor-container";
      div.style.cssText = "position:relative;min-height:200px;" + (i>0?"display:none":"");
      floorWrap.appendChild(div);
    });
    tabBar.querySelectorAll(".gmp-tab").forEach(function(tab){
      tab.addEventListener("click", function(){
        tabBar.querySelectorAll(".gmp-tab").forEach(function(t){ t.classList.remove("active"); });
        tab.classList.add("active");
        activeFloor = tab.dataset.floor;
        floorWrap.querySelectorAll(".gca-floor-container").forEach(function(c){ c.style.display="none"; });
        var el = document.getElementById("gcaFloor_"+activeFloor);
        if(el) el.style.display = "";
        renderFloorMap();
      });
    });
    if(floors.length > 0) activeFloor = floors[0].id;
  }
  // Build after layout is loaded (layout loads async — retry once data arrives)
  function _tryBuildGcaFloorTabs(){ if(window._getFloors) _buildGcaFloorTabs(); else setTimeout(_buildGcaFloorTabs, 600); }
  _tryBuildGcaFloorTabs();

  // Station grids — shared from performance map's _mapLayout / _getFloors()
  // GCA uses the same layout so there's no duplication.
  function _gcaGetFloorDef(floorId){
    if(window._getFloors){
      return window._getFloors().find(function(f){ return f.id === floorId; }) || null;
    }
    return null;
  }

  function getStationType(stNum, floorId){
    var fl = _gcaGetFloorDef(floorId);
    if(!fl) return "pick";
    if((fl.top||[]).indexOf(stNum)>-1||(fl.left||[]).indexOf(stNum)>-1) return "pick";
    if((fl.bottom||[]).indexOf(stNum)>-1) return "stow";
    if((fl.right||[]).indexOf(stNum)>-1) return "count";
    return "pick";
  }

  // Floor id from a 4-digit AR station by thousands digit (2xxx→p2 … 9xxx→p9),
  // so robotic sites with >2 AR floors (MAD7 P4, etc.) map correctly.
  function _arFloorOf2(n){ var k=Math.floor(n/1000); return (k>=2&&k<=9)?("p"+k):"p2"; }
  // Parse a station string → the SAME shape the Performance map uses. We delegate
  // to parsePerfStationCached (the complete/maintained parser) instead of a
  // GCA-only copy — the old GCA parser recognised far fewer formats (no induct,
  // rebin, P2R, WS-14, decant/rcv, 4-digit fallback), so many pending coachings
  // never matched a cell and the GCA map looked empty. One parser = one truth.
  function parseStation(st){
    // GCA `station` can be a raw GCA location ID (a long all-digits number like
    // "4300035091" or "1586283248701") instead of a physical station code —
    // those are NOT floor stations. The shared parser's 4-digit fallback would
    // wrongly read "4300035091" as station 4300 on P4. Skip pure-numeric strings
    // longer than 4 digits so they don't pollute the map.
    var s = String(st || "").trim();
    if(/^\d{5,}$/.test(s)) return null;
    return (typeof parsePerfStationCached === "function") ? parsePerfStationCached(s) : null;
  }
  // Build the SAME station key the Performance map builds (renderPerfMap), so a
  // pending on station X lands on the exact cell the renderers look up.
  function _gcaStationKey(parsed){
    if(!parsed) return null;
    if(parsed.num != null) return parsed.floor + "_" + parsed.num;
    if(parsed.type === "induct") return parsed.floor + "_induct_" + parsed.wall;
    if(parsed.type === "rebin")  return parsed.floor + "_rebin_0_" + parsed.wall + "_" + parsed.pos;
    if(parsed.type === "ws")     return parsed.floor + "_ws_" + parsed.line + "_" + parsed.pos;
    if(parsed.type === "singles")return parsed.floor + "_singles_" + (parsed.line != null ? parsed.line : parsed.id) + "_" + parsed.pos;
    var wallPart = parsed.wall ? "_" + parsed.wall : "";
    return parsed.floor + "_" + parsed.type + "_" + parsed.id + wallPart + "_" + parsed.pos;
  }

  // Add one pending item to a station bucket, tracking the per-owner breakdown.
  function _gcaAddToStation(map, key, parsed, it){
    if(!map[key]) map[key] = {count:0, items:[], parsed, byOwner:{}};
    map[key].count++;
    map[key].items.push(it);
    var own = (it.owner || "").trim() || "—";
    map[key].byOwner[own] = (map[key].byOwner[own] || 0) + 1;
  }

  function renderFloorMap(){
    if(!gcaData) return;
    const items = (gcaData.items||[]).filter(i=>i.status==="PENDING");
    // Present-only del popup (independiente de la tabla). Reactivo al toggle.
    const filtered = gcaMapPresentOnly ? items.filter(i=>i.presence==="ACTIVE"||i.presence==="ON_SITE") : items;

    // FAB count + total (GLOBAL, todas las plantas) siempre actualizados.
    var fabCount = document.getElementById("gcaFabCount");
    if(fabCount) fabCount.textContent = filtered.length;
    var totalEl = document.getElementById("gcaMapTotal");
    if(totalEl) totalEl.textContent = filtered.length + " pending";

    if(!floorMapVisible) return;

    // Group by parsed station, con desglose por owner. TODAS las plantas (para el
    // total global) — el render por planta filtra por prefijo de floor.
    const pendingByStation = {};
    const ownersSeen = {};
    filtered.forEach(it=>{
      var own = (it.owner || "").trim() || "—";
      ownersSeen[own] = true;
      const parsed = parseStation(it.station);
      if(!parsed) return;
      const key = _gcaStationKey(parsed);
      if(!key) return;
      _gcaAddToStation(pendingByStation, key, parsed, it);
    });

    // Leyenda de owners presentes (con su color).
    var legEl = document.getElementById("gcaMapLegend");
    if(legEl){
      var owners = Object.keys(ownersSeen).sort();
      legEl.innerHTML = owners.map(function(o){
        return '<span><span class="ldot" style="background:'+_gcaOwnerColor(o)+'"></span>'+esc(o)+'</span>';
      }).join("") || '<span style="color:var(--text-dim)">Sin pendings</span>';
    }

    var gcaFloorDef = _gcaGetFloorDef(activeFloor);
    var gcaContainerId = "gcaFloor_" + activeFloor;
    // total global para el centro del mapa
    window._gcaGlobalPending = filtered.length;
    if(gcaFloorDef && gcaFloorDef.type === "ar_ring"){
      renderARFloor(gcaContainerId, gcaFloorDef.top||[], gcaFloorDef.left||[], gcaFloorDef.bottom||[], gcaFloorDef.right||[], activeFloor, pendingByStation);
    } else {
      renderP1Floor(gcaContainerId || "gcaFloorP1", pendingByStation);
    }
  }

  // Build a GCA station cell painted with vertical STRIPES, one per owner with
  // pendings there (width ∝ that owner's share). label + count on top. Shared by
  // AR + P1 renderers. `pending` = {count, items, byOwner:{owner:n}}.
  function _buildGcaOwnerCell(pending, typeLbl, numLbl){
    var div = document.createElement('div');
    div.className = 'gca-cell' + (pending ? '' : ' gca-empty');
    if(!pending){
      div.innerHTML = '<span class="gca-lbl">'+esc(typeLbl)+'</span><span class="gca-cnt">'+esc(String(numLbl))+'</span>';
      return div;
    }
    // Stripes ordered by descending share so the dominant owner reads first.
    var owners = Object.keys(pending.byOwner).sort(function(a,b){ return pending.byOwner[b]-pending.byOwner[a]; });
    var stripes = owners.map(function(o){
      var w = pending.byOwner[o];
      return '<span style="flex:'+w+';background:'+_gcaOwnerColor(o)+'" title="'+esc(o)+': '+w+'"></span>';
    }).join('');
    div.innerHTML =
      '<div class="gca-stripes">'+stripes+'</div>' +
      '<span class="sm-badge bg-red">'+pending.count+'</span>' +
      '<span class="gca-lbl">'+esc(typeLbl)+'</span>' +
      '<span class="gca-cnt">'+esc(String(numLbl))+'</span>';
    div.onmouseenter = function(e){ showMapTooltip(e, (typeLbl?typeLbl+' ':'')+numLbl, pending, typeLbl); };
    div.onmouseleave = function(){ window._ttHideTimer=setTimeout(function(){ var tt=$g("gcaMapTooltip"); if(tt) tt.style.display="none";},150); };
    return div;
  }

  // Center summary of the GCA map: TOTAL pending GLOBAL (all floors) + this
  // floor's pending, matching the perf map's command-center look.
  function _gcaCenterHtml(floorId, floorPending){
    var globalPending = window._gcaGlobalPending || 0;
    return '<div class="sm-summary">' +
      '<div class="sm-summary-title">'+esc(String(floorId).toUpperCase())+'</div>' +
      '<div class="sm-counts">' +
        '<div class="sm-count"><span class="sm-count-val sm-c-danger" style="font-size:34px">'+globalPending+'</span><span class="sm-count-lbl">Total Pending</span></div>' +
        '<div class="sm-count"><span class="sm-count-val">'+floorPending+'</span><span class="sm-count-lbl">'+esc(String(floorId).toUpperCase())+' Pending</span></div>' +
      '</div>' +
    '</div>';
  }

  function renderARFloor(containerId, topRow, leftCol, bottomRow, rightCol, floorId, pendingMap){
    const el = $g(containerId);
    if(!el) return;
    el.innerHTML = '';
    el.style.position = 'relative';
    el.style.padding = '12px';

    var floorNum = parseInt(String(floorId).replace(/[^0-9]/g, "")) || 2;
    var base = floorNum * 1000;

    // AUTO-MODE (ported from the perf map): if the layout has no explicit station
    // lists for this floor (e.g. BCN4 p3/p4 are empty in map_layouts.json), build
    // the ring arrays from the pending stations themselves by their offset within
    // the floor (100s=top, 200s=left, 300s=bottom, 400s=right). This is what keeps
    // the perf map from rendering blank floors — GCA now does the same.
    topRow = (topRow||[]).slice(); leftCol=(leftCol||[]).slice();
    bottomRow=(bottomRow||[]).slice(); rightCol=(rightCol||[]).slice();
    if(!topRow.length && !leftCol.length && !bottomRow.length && !rightCol.length){
      Object.keys(pendingMap).forEach(function(k){
        if(k.indexOf(floorId+"_")!==0) return;
        var sn = parseInt(k.split("_")[1]); if(isNaN(sn)) return;
        var rel = sn - base;
        if(rel>=100 && rel<200) topRow.push(sn);
        else if(rel>=200 && rel<300) leftCol.push(sn);
        else if(rel>=300 && rel<400) bottomRow.push(sn);
        else if(rel>=400 && rel<500) rightCol.push(sn);
      });
      topRow.sort(function(a,b){return b-a;}); leftCol.sort(function(a,b){return a-b;});
      bottomRow.sort(function(a,b){return a-b;}); rightCol.sort(function(a,b){return b-a;});
    }

    function getTypeLabel(stNum){
      var b = stNum >= 3000 ? stNum - 1000 : stNum;
      if(b >= 2050 && b <= 2197){
        var ptrs = [2197,2196,2187,2186,2177,2176,2168,2167,2160,2159,2151,2150,2143,2142,2134,2133,2125,2124,2116,2115];
        return ptrs.indexOf(b) > -1 ? 'PTR' : 'NU';
      }
      if(b >= 2200 && b <= 2295) return 'NU';
      if(b >= 2306 && b <= 2395) return 'NA';
      if(b >= 2422 && b <= 2494) return 'NS';
      return 'NU';
    }

    // SMART-SLOT (ported from the perf map): a pending may sit on a station that
    // isn't in the ring layout. Place each such station into the nearest EMPTY
    // grid slot of its section, so it still shows instead of vanishing.
    var allGridSet = {};
    topRow.concat(leftCol).concat(bottomRow).concat(rightCol).forEach(function(n){ allGridSet[String(n)]=true; });
    var nonGrid = [];
    Object.keys(pendingMap).forEach(function(k){
      if(k.indexOf(floorId+"_")!==0) return;
      var sn = parseInt(k.split("_")[1]); if(isNaN(sn)) return;
      if(allGridSet[String(sn)]) return;
      nonGrid.push(sn);
    });
    var emptyBySec = {top:[],left:[],bottom:[],right:[]};
    topRow.forEach(function(n){ if(!pendingMap[floorId+"_"+n]) emptyBySec.top.push(n); });
    leftCol.forEach(function(n){ if(!pendingMap[floorId+"_"+n]) emptyBySec.left.push(n); });
    bottomRow.forEach(function(n){ if(!pendingMap[floorId+"_"+n]) emptyBySec.bottom.push(n); });
    rightCol.forEach(function(n){ if(!pendingMap[floorId+"_"+n]) emptyBySec.right.push(n); });
    var assigned = {};
    nonGrid.sort(function(a,b){return a-b;});
    nonGrid.forEach(function(sn){
      var rel = sn - base;
      var sec = rel>=100&&rel<200?"top":rel>=200&&rel<300?"left":rel>=300&&rel<400?"bottom":"right";
      var empties = emptyBySec[sec];
      var best=-1, bestD=Infinity;
      for(var i=0;i<empties.length;i++){ var d=Math.abs(empties[i]-sn); if(d<bestD){bestD=d;best=i;} }
      if(best>-1){ assigned[String(empties[best])]=sn; empties.splice(best,1); }
      else { topRow.push(sn); }  // no empty slot: append to top so it still shows
    });

    function buildGcaStation(gridNum){
      var sn = assigned[String(gridNum)] || gridNum;
      var pending = pendingMap[floorId + '_' + sn];
      if(!pending) return null; // only show stations with pending items
      return _buildGcaOwnerCell(pending, getTypeLabel(sn), String(sn));
    }

    // Layout
    var grid = document.createElement('div');
    grid.className = 'sm-grid';

    var topDiv = document.createElement('div');
    topDiv.className = 'sm-row sm-top';
    topRow.forEach(function(n){ var s=buildGcaStation(n); if(s) topDiv.appendChild(s); });

    var midDiv = document.createElement('div');
    midDiv.className = 'sm-middle';

    var leftDiv = document.createElement('div');
    leftDiv.className = 'sm-col sm-left';
    leftCol.forEach(function(n){ var s=buildGcaStation(n); if(s) leftDiv.appendChild(s); });

    var centerDiv = document.createElement('div');
    centerDiv.className = 'sm-center';
    var floorPending = 0;
    Object.keys(pendingMap).forEach(function(k){ if(k.indexOf(floorId+'_')===0) floorPending += pendingMap[k].count; });
    centerDiv.innerHTML = _gcaCenterHtml(floorId, floorPending);

    var rightDiv = document.createElement('div');
    rightDiv.className = 'sm-col sm-right';
    rightCol.forEach(function(n){ var s=buildGcaStation(n); if(s) rightDiv.appendChild(s); });

    midDiv.appendChild(leftDiv);
    midDiv.appendChild(centerDiv);
    midDiv.appendChild(rightDiv);

    var bottomDiv = document.createElement('div');
    bottomDiv.className = 'sm-row sm-bottom';
    bottomRow.forEach(function(n){ var s=buildGcaStation(n); if(s) bottomDiv.appendChild(s); });

    grid.appendChild(topDiv);
    grid.appendChild(midDiv);
    grid.appendChild(bottomDiv);
    el.appendChild(grid);
  }


  

  function renderP1Floor(containerId, pendingMap){
    const el = $g(containerId);
    if(!el) return;
    el.innerHTML = '';
    el.style.padding = '12px';

    // 8 AFE walls (101-108, matching the perf P1 map) + Singles + WS lines.
    const sections = [
      {title:'AFE', lines:[
        {label:'Muro 101', prefix:'afe', wall:101, count:8},
        {label:'Muro 102', prefix:'afe', wall:102, count:8},
        {label:'Muro 103', prefix:'afe', wall:103, count:8},
        {label:'Muro 104', prefix:'afe', wall:104, count:8},
        {label:'Muro 105', prefix:'afe', wall:105, count:8},
        {label:'Muro 106', prefix:'afe', wall:106, count:8},
        {label:'Muro 107', prefix:'afe', wall:107, count:8},
        {label:'Muro 108', prefix:'afe', wall:108, count:8}
      ]},
      {title:'Singles', lines:[
        {label:'S01', prefix:'singles', line:1, count:20},
        {label:'S02', prefix:'singles', line:2, count:20},
        {label:'S03', prefix:'singles', line:3, count:20},
        {label:'S04', prefix:'singles', line:4, count:20}
      ]},
      {title:'WS', lines:[
        {label:'Línea 1', prefix:'ws', line:11, count:24},
        {label:'Línea 2', prefix:'ws', line:12, count:24},
        {label:'Línea 14', prefix:'ws', line:14, count:24}
      ]}
    ];

    // Center: total global pending (mismo bloque que AR).
    var floorPending = 0;
    Object.keys(pendingMap).forEach(function(k){ if(k.indexOf('p1_')===0) floorPending += pendingMap[k].count; });
    var centerWrap = document.createElement('div');
    centerWrap.className = 'sm-center';
    centerWrap.style.cssText = 'justify-content:flex-start;margin-bottom:10px';
    centerWrap.innerHTML = _gcaCenterHtml('p1', floorPending);
    el.appendChild(centerWrap);

    sections.forEach(function(section){
      var secDiv = document.createElement('div');
      secDiv.style.cssText = 'margin-bottom:10px;';
      secDiv.innerHTML = '<div style="font-size:11px;font-weight:700;color:var(--text-secondary);margin-bottom:4px">'+section.title+'</div>';
      section.lines.forEach(function(ln){
        var row = document.createElement('div');
        row.style.cssText = 'display:flex;align-items:center;gap:2px;margin-bottom:2px;flex-wrap:wrap;';
        row.innerHTML = '<span style="width:36px;font-size:9px;color:var(--text-muted);text-align:right;flex-shrink:0">'+ln.label+'</span>';
        var anyInLine = false;
        for(let pos=1; pos<=ln.count; pos++){
          // Keys MUST match the perf-map convention (renderPerfMap):
          //   AFE     → p1_afe_1_<wall>_<pos>  (id=1)
          //   Singles → p1_singles_<line>_<pos>
          //   WS      → p1_ws_<line>_<pos>     (line = 11/12/14)
          let key;
          if(ln.prefix==='afe') key = 'p1_afe_1_'+ln.wall+'_'+pos;
          else if(ln.prefix==='singles') key = 'p1_singles_'+ln.line+'_'+pos;
          else key = 'p1_ws_'+ln.line+'_'+pos;
          let pending = pendingMap[key];
          if(!pending) continue;  // popup shows only stations WITH pending
          anyInLine = true;
          var lbl = ln.prefix==='afe' ? ('Pk'+ln.wall) : ln.prefix.slice(0,3).toUpperCase();
          row.appendChild(_buildGcaOwnerCell(pending, lbl, pos));
        }
        // Only render the line row if it has at least one pending station.
        if(anyInLine) secDiv.appendChild(row);
      });
      // Only render the section if it produced any line rows.
      if(secDiv.children.length > 1) el.appendChild(secDiv);
    });
  }

  function showMapTooltip(e, stLabel, data, type){
    const tt = $g("gcaMapTooltip");
    if(!tt) return;
    if(tt.parentElement !== document.body) document.body.appendChild(tt);
    const items = data.items || [];
    const insights = [...new Set(items.map(i=>i.insight||i.course_title||"").filter(Boolean))].slice(0,3);
    const owners = [...new Set(items.map(i=>i.owner||"").filter(Boolean))];
    const notes = items.map(i=>i.comment||"").filter(Boolean).slice(0,2);
    const gcaLinks = items.slice(0,3).map(i=>{
      const login = i.login||i.employee_id||"";
      return `<a href="https://guided-coaching-dub.corp.amazon.com/#/view-coaching-instance/${i.id}" target="_blank" rel="noopener" style="color:var(--accent);font-size:10px">${login?login+" → ":""}Open GCA</a>`;
    });
    // Associate rows with photos
    const assocRows = items.slice(0,4).map(i=>{
      const login = i.login||i.employee_id||"—";
      const photo = i.photo_url ? `<img src="${i.photo_url}" loading="lazy" decoding="async" style="width:24px;height:24px;border-radius:50%;object-fit:cover" onerror="this.style.display='none'">` : `<div style="width:24px;height:24px;border-radius:50%;background:var(--border);display:flex;align-items:center;justify-content:center;font-size:10px">👤</div>`;
      return `<div style="display:flex;align-items:center;gap:6px;padding:2px 0">${photo}<span style="font-weight:600;font-size:11px">${login}</span></div>`;
    }).join("");

    tt.innerHTML = `
      <div style="font-weight:700;margin-bottom:6px;color:var(--text)">📍 Station ${stLabel}</div>
      <div style="font-size:11px;color:var(--text-secondary);margin-bottom:4px"><b>${data.count}</b> pending coaching${data.count>1?"s":""}</div>
      ${assocRows}
      ${insights.length?`<div style="font-size:11px;margin-bottom:4px"><b>Insight:</b> ${insights.join("; ")}</div>`:""}
      ${owners.length?`<div style="font-size:11px;margin-bottom:4px"><b>Owner:</b> ${owners.join(", ")}</div>`:""}
      ${notes.length?`<div style="font-size:11px;margin-bottom:4px;padding:4px 6px;background:var(--accent-light);border-radius:4px"><b>Notes:</b> ${notes.join(" | ")}</div>`:""}
      <div style="margin-top:6px;display:flex;flex-direction:column;gap:3px">${gcaLinks.join("")}</div>
    `;
    tt.style.display = "block";
    tt.style.left = Math.min(e.clientX + 10, window.innerWidth - 300) + "px";
    tt.style.top = Math.min(e.clientY - 10, window.innerHeight - 200) + "px";
    // Close when mouse leaves tooltip
    tt.onmouseleave = function(){ tt.style.display = "none"; };
  }
  // ═══ END FLOOR MAP ═══

  function renderGca(){
    if(!gcaData) return;
    // Keep the station-map FAB + its pending count in sync whenever GCA renders
    // (data just loaded, tab switched, present-only toggled…). renderFloorMap()
    // updates the FAB/total counters even while the popup is closed.
    renderFloorMap();
    if(window._updateGcaFabVisibility) window._updateGcaFabVisibility();
    const k = gcaData.kpis || {};
    // Large KPI cards: % big + count small. Completed/Cancelled/Pending are % of
    // the total resolved; Expiring ≤3d/≤7d are % OF PENDING (7d includes 3d).
    const allItems = gcaData.items || [];
    const total = k.total || allItems.length || 0;
    const cCompleted = k.completed != null ? k.completed : allItems.filter(i=>i.status==="COMPLETED").length;
    const cCancelled = k.cancelled != null ? k.cancelled : allItems.filter(i=>i.status==="CANCELLED").length;
    const cPending   = k.pending   != null ? k.pending   : allItems.filter(i=>i.status==="PENDING").length;
    const pctOf = (n, base) => base > 0 ? Math.round(n/base*100) : 0;
    // Days until expiration for a pending item (floor; negative = already past).
    const daysToExp = raw => { if(!raw) return null; const d=new Date(raw); if(isNaN(d)) return null; return Math.floor((d-new Date())/86400000); };
    const pendingItems = allItems.filter(i=>i.status==="PENDING");
    const exp3 = pendingItems.filter(i=>{ const d=daysToExp(i.expiration); return d!=null && d<=3; }).length;
    const exp7 = pendingItems.filter(i=>{ const d=daysToExp(i.expiration); return d!=null && d<=7; }).length;
    // Pending >7d = the rest of pending that is NOT expiring within 7 days. This
    // makes the 5 cards a clean non-overlapping breakdown of the total:
    // Completed + Expiring≤7d + Pending>7d + Cancelled = 100%. (≤3d is an
    // informational sub-slice inside ≤7d, not a separate slice of the total.)
    const pendingOver7 = Math.max(0, cPending - exp7);

    $g("gcaKpiCompleted").textContent  = pctOf(cCompleted, total) + "%";
    $g("gcaKpiCompletedN").textContent = `${cCompleted} of ${total}`;
    $g("gcaKpiCancelled").textContent  = pctOf(cCancelled, total) + "%";
    $g("gcaKpiCancelledN").textContent = `${cCancelled} of ${total}`;
    // "Pending" card now shows the >7d remainder (not the full pending), so it
    // no longer overlaps the Expiring cards. Sub still references total pending.
    $g("gcaKpiPending").textContent    = pctOf(pendingOver7, total) + "%";
    $g("gcaKpiPendingN").textContent   = `${pendingOver7} of ${cPending} pending`;
    // Expiring cards are sub-slices of Pending expressed as % OF TOTAL, so they
    // stay consistent with the total breakdown (showing % of pending made ≤7d
    // look alarmingly high, e.g. 78%).
    $g("gcaKpiExp3").textContent  = pctOf(exp3, total) + "%";
    $g("gcaKpiExp3N").textContent = `${exp3} of ${cPending} pending`;
    $g("gcaKpiExp7").textContent  = pctOf(exp7, total) + "%";
    $g("gcaKpiExp7N").textContent = `${exp7} of ${cPending} pending`;
    const hdPending = (gcaData.items||[]).filter(i=>i.status==="PENDING" && i.scenario==="HIGH_DEFECTS").length;
    const sub = $g("gcaSubtitle");
    sub.innerHTML = `Last 7 days · ${esc(gcaData.fc || currentFC)}` +
      (hdPending ? ` <span id="gcaHdPill" class="gca-hd-badge" style="cursor:pointer" title="Ver High Defects que deben cerrarse">⚠️ ${hdPending} High Defects</span>` : "");
    const hdPill = $g("gcaHdPill");
    if(hdPill) hdPill.addEventListener("click", ()=>openModal("modalHighDefects"));

    // Stacked compliance bar: Completed / Pending / Cancelled, with each segment's
    // % of the total resolved shown in its label. (EXPIRED is no longer pulled —
    // owner: too slow — so it's dropped from the bar; any legacy cached EXPIRED
    // item simply isn't counted here.)
    const os = gcaData.owner_stats || {};
    const barsEl = $g("gcaBars");
    const items4 = gcaData.items || [];
    const cnt = st => items4.filter(i=>i.status===st).length;
    const sc = { completed: cnt("COMPLETED"), pending: cnt("PENDING"), cancelled: cnt("CANCELLED") };
    const scTotal = sc.completed + sc.pending + sc.cancelled;
    const segDef = [
      {k:"completed", lbl:"Completed"},
      {k:"pending",   lbl:"Pending"},
      {k:"cancelled", lbl:"Cancelled"},
    ];
    // Build a stacked bar (Completed/Pending/Cancelled/Expired) for a given
    // count object — reused for the global bar and each owner row.
    const stackHtml = (counts, total) => {
      if(!total) return `<div class="gca-stack"></div>`;
      return `<div class="gca-stack">` + segDef.map(d=>{
        const n = counts[d.k] || 0;
        if(!n) return "";
        const pct = Math.round(n/total*100);
        const label = pct >= 10 ? `${pct}%` : "";
        return `<div class="gca-stack-seg ${d.k}" style="width:${pct}%" title="${d.lbl}: ${n} (${pct}%)">${label}</div>`;
      }).join("") + `</div>`;
    };

    if(scTotal > 0){
      const legend = segDef.map(d=>`<span><span class="dot ${d.k}"></span>${d.lbl} ${sc[d.k]} (${scTotal?Math.round(sc[d.k]/scTotal*100):0}%)</span>`).join("");
      // Global stacked bar + legend
      let html = stackHtml(sc, scTotal) + `<div class="gca-stack-legend">${legend}</div>`;
      // Per-owner stacked bars: same 4-colour breakdown, one row per owner that
      // has any coaching. Label + completed% + counts on the right.
      const ownerRows = GCA_OWNERS.map(owner=>{
        const s = os[owner] || {completed:0,pending:0,cancelled:0,expired:0,total:0,pct:0};
        if(!s.total) return "";
        return `<div class="gca-owner-row">
          <span class="gca-owner-label">${esc(owner)}</span>
          <div class="gca-owner-track">${stackHtml(s, s.total)}</div>
          <span class="gca-owner-nums">${s.pct}% · ${s.completed}/${s.total}</span>
        </div>`;
      }).join("");
      if(ownerRows) html += `<div class="gca-owner-bars">${ownerRows}</div>`;
      barsEl.innerHTML = html;
    } else {
      barsEl.innerHTML = `<div style="padding:8px 16px;font-size:11px;color:var(--text-muted)">Sin datos de coaching.</div>`;
    }

    // Owner filter pills
    const filtersEl = $g("gcaOwnerFilters");
    const presenceOn = gcaPresentOnly;
    let pending = (gcaData.items||[]).filter(i=>i.status==="PENDING");
    if(presenceOn) pending = pending.filter(i=>i.presence==="ACTIVE"||i.presence==="ON_SITE");
    const countAll = pending.length;
    let pills = `<span class="gca-pill ${!gcaOwnerFilter?"active":""}" data-owner="">All (${countAll})</span>`;
    GCA_OWNERS.forEach(owner=>{
      const cnt = pending.filter(i=>i.owner===owner).length;
      if(cnt > 0) pills += `<span class="gca-pill ${gcaOwnerFilter===owner?"active":""}" data-owner="${esc(owner)}">${esc(owner)} (${cnt})</span>`;
    });
    filtersEl.innerHTML = pills;
    filtersEl.querySelectorAll(".gca-pill").forEach(p=>{
      p.addEventListener("click",()=>{
        gcaOwnerFilter = p.dataset.owner || "";
        renderGca();
      });
    });

    // Tab visibility: Pending table vs Cancelled/Expired table.
    const pendTable = $g("gcaTable");
    const closedTable = $g("gcaClosedTable");
    const tabPendEl = $g("gcaTabPending");
    const tabClosedEl = $g("gcaTabClosed");
    if(tabPendEl) tabPendEl.classList.toggle("active", gcaTab==="pending");
    if(tabClosedEl) tabClosedEl.classList.toggle("active", gcaTab==="closed");
    if(pendTable) pendTable.style.display = gcaTab==="pending" ? "" : "none";
    if(closedTable) closedTable.style.display = gcaTab==="closed" ? "" : "none";

    if(gcaTab==="closed"){
      renderGcaClosed();
      if(floorMapVisible) renderFloorMap();
      return;
    }

    // Table
    let items = (gcaData.items||[]).filter(i=>i.status==="PENDING");
    if(presenceOn) items = items.filter(i=>i.presence==="ACTIVE"||i.presence==="ON_SITE");
    if(gcaOwnerFilter) items = items.filter(i=>i.owner===gcaOwnerFilter);
    // Login/name search filter.
    const gcaQuery = ($g("gcaSearchInput")?.value || "").trim().toLowerCase();
    if(gcaQuery){
      items = items.filter(i=>{
        const hay = [i.login, i.name, i.employee_id, i.station, i.insight, i.course_title]
          .map(x=>String(x||"").toLowerCase()).join(" ");
        return hay.includes(gcaQuery);
      });
    }

    // Sort by expiration when the header is toggled on (soonest-to-expire first
    // when asc). Items with no expiration sink to the bottom.
    if(gcaSortExp){
      const ts = v => { const d = new Date(v); return isNaN(d) ? Infinity : d.getTime(); };
      items = items.slice().sort((a,b)=>{
        const cmp = ts(a.expiration) - ts(b.expiration);
        return gcaSortExp === "asc" ? cmp : -cmp;
      });
    } else {
      // DEFAULT ORDER: stalest-last-seen FIRST — so cancelling top-down hits the
      // most obsolete pendings first (13d ago before 12d ago). Present associates
      // (ACTIVE/ON_SITE, no last_seen) sink to the bottom — they're not cancel
      // candidates. Older last_seen = larger "days ago" = higher up.
      const ageMs = it => {
        if(it.presence==="ACTIVE" || it.presence==="ON_SITE") return -1;  // present → bottom
        const ms = Number(it.last_seen_ms);
        return isFinite(ms) && ms>0 ? (Date.now()-ms) : -0.5;             // no data → just above present
      };
      items = items.slice().sort((a,b)=> ageMs(b) - ageMs(a));           // biggest age first
    }
    const _arrow = $g("gcaSortArrow");
    if(_arrow) _arrow.textContent = gcaSortExp === "asc" ? "▲" : gcaSortExp === "desc" ? "▼" : "";

    const tbody = $g("gcaTbody");
    if(!items.length){
      tbody.innerHTML = `<tr><td colspan="8" style="text-align:center;padding:30px;color:var(--text-muted);font-size:12px">${t("empty_no_pending_coachings")}${gcaOwnerFilter?" · "+gcaOwnerFilter:""}</td></tr>`;
    } else {
      tbody.innerHTML = items.slice(0, 100).map(it=>{
        const gcaUrl = `https://guided-coaching-dub.corp.amazon.com/#/view-coaching-instance/${it.id}`;
        const loginDisplay = it.login || it.employee_id || "—";
        const notes = it.comment ? `<span style="font-size:11px" title="${esc(it.comment)}">${esc(it.comment.length>40?it.comment.slice(0,40)+"…":it.comment)}</span>` : `<span style="color:var(--text-muted)">—</span>`;
        const isActive = it.presence === "ACTIVE";
        const isOnSite = it.presence === "ON_SITE";   // present per roster, ELS had no fix
        const isPresent = isActive || isOnSite;
        // Only show the station when it's a LIVE ELS fix (ACTIVE). For ON_SITE the
        // person is present per the roster punch but ELS had no recent fix, so
        // it.station is a STALE last-known location (e.g. dz-P-A2127) that misleads
        // — show just "On site", no location. (owner 2026-07-28)
        const stationInfo = (isActive && it.station) ? (it.process_path ? `${it.station} · ${it.process_path}` : it.station) : "";
        // Last-seen line (ELS arrivalTimestamp) — only meaningful when NOT present:
        // "last seen 5d ago" flags a stale pending the coach can likely cancel.
        const _ls = !isPresent ? lastSeen(it.last_seen_ms) : null;
        const lsLine = _ls ? `<div style="font-size:9.5px;font-weight:700;color:${_ls.color};margin-top:1px" title="${esc(_ls.full)}">${esc(_ls.text)}</div>` : "";
        const presenceDot = isPresent
          ? `<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:var(--green)"></span> <span style="font-size:10px">${isActive?"Active":"On site"}</span>${stationInfo ? `<div style="font-size:9.5px;color:var(--text-muted);margin-top:1px">${esc(stationInfo)}</div>` : ""}`
          : `<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#cbd5e1"></span> <span style="font-size:10px;color:var(--text-muted)">${esc(it.presence||"Unknown")}</span>${stationInfo ? `<div style="font-size:9.5px;color:var(--text-muted);margin-top:1px">${esc(stationInfo)}</div>` : ""}${lsLine}`;
        const photoHtml = it.photo_url
          ? `<img src="${esc(it.photo_url)}" loading="lazy" decoding="async" style="width:28px;height:28px;border-radius:50%;object-fit:cover;margin-right:6px;vertical-align:middle" onerror="this.style.display='none'">`
          : "";
        const isHighDef = it.scenario === "HIGH_DEFECTS";
        const hdBadge = isHighDef ? `<span class="gca-hd-badge" title="High Defects — debe cerrarse">HIGH DEFECTS</span>` : "";
        const _exp = coachingExpiry(it.expiration);
        const expCell = _exp
          ? `<span style="font-size:11px;font-weight:700;color:${_exp.color}">${esc(_exp.text)}</span>`
          : `<span style="color:var(--text-muted)">—</span>`;
        return `<tr class="${isHighDef ? "gca-high-defects" : ""}">
          <td><div style="display:flex;align-items:center">${photoHtml}<span style="font-weight:600">${esc(loginDisplay)}</span>${hdBadge}</div></td>
          <td>${esc(it.insight||it.course_title||"—")}</td>
          <td><span style="font-size:11px">${esc(it.owner)}</span></td>
          <td>${notes}</td>
          <td><div style="display:flex;align-items:center;justify-content:center;gap:4px">${presenceDot}</div></td>
          <td>${expCell}</td>
          <td>
            <div style="display:flex;flex-direction:column;gap:4px;align-items:center">
              <div style="display:flex;gap:4px">
                <button class="row-btn cc-complete" data-iid="${esc(it.id||"")}" data-login="${esc(loginDisplay)}" data-name="${esc(it.name||"")}" data-eid="${esc(it.employee_id||"")}" data-process="${esc(it.process_path||it.station||it.course_title||it.insight||"")}">✓</button>
                <button class="row-btn cc-cancel" data-iid="${esc(it.id||"")}" data-login="${esc(loginDisplay)}" data-name="${esc(it.name||"")}" data-eid="${esc(it.employee_id||"")}" data-process="${esc(it.process_path||it.station||it.course_title||it.insight||"")}">✗</button>
              </div>
              <a href="${esc(gcaUrl)}" target="_blank" rel="noopener" style="color:var(--accent);text-decoration:none;font-size:10px">Open GCA →</a>
            </div>
          </td>
        </tr>`;
      }).join("");
      // Wire per-row close buttons (one coaching = one instance_id).
      // No full reload on close — _markCoachingRowDone neutralizes the row in
      // place; the list refreshes on the next natural GCA update.
      const _onClose = null;
      tbody.querySelectorAll(".cc-complete").forEach(b=>b.addEventListener("click",()=>
        openCloseCoaching({instanceId:b.dataset.iid, fc:currentFC, action:"complete",
          login:b.dataset.login, name:b.dataset.name,
          employee_id:b.dataset.eid, badge:b.dataset.eid, process:b.dataset.process,
          onDone:_onClose})));
      tbody.querySelectorAll(".cc-cancel").forEach(b=>b.addEventListener("click",()=>
        openCloseCoaching({instanceId:b.dataset.iid, fc:currentFC, action:"cancel",
          login:b.dataset.login, name:b.dataset.name,
          employee_id:b.dataset.eid, badge:b.dataset.eid, process:b.dataset.process,
          onDone:_onClose})));
    }
    const totalPending = (gcaData.items||[]).filter(i=>i.status==="PENDING").length;
    const totalCompleted = (gcaData.items||[]).filter(i=>i.status==="COMPLETED").length;
    $g("gcaShowing").textContent = `Showing ${Math.min(items.length,100)} of ${items.length} pending · ${totalCompleted} completed this week`;
    // Re-render floor map if visible
    if(floorMapVisible) renderFloorMap();
  }

  // ── Bulk cancel (modal) ────────────────────────────────────────────────
  // A dedicated modal keeps the table clean (no always-on checkboxes). The
  // modal lists the current pending coachings with a checkbox each, one shared
  // reason + note, and cancels the selected batch. Each still goes through
  // /api/coaching/close (action=cancel) so the backend round-trips the full GCA
  // instance per coaching (no shortcut).
  function _bcRows(){
    // Same filtered/sorted pending set the table shows (respects owner + search + present).
    let items = (gcaData?.items||[]).filter(i=>i.status==="PENDING");
    if(gcaPresentOnly) items = items.filter(i=>i.presence==="ACTIVE"||i.presence==="ON_SITE");
    if(gcaOwnerFilter) items = items.filter(i=>i.owner===gcaOwnerFilter);
    const q = ($g("gcaSearchInput")?.value || "").trim().toLowerCase();
    if(q){
      items = items.filter(i=>[i.login,i.name,i.employee_id,i.station,i.insight,i.course_title]
        .map(x=>String(x||"").toLowerCase()).join(" ").includes(q));
    }
    // Stalest-last-seen FIRST — same order the table uses, so cancelling
    // top-down hits the most obsolete pendings first (13d ago before 12d).
    // Present associates (no last_seen) sink to the bottom.
    const ageMs = it => {
      if(it.presence==="ACTIVE" || it.presence==="ON_SITE") return -1;  // present → bottom
      const ms = Number(it.last_seen_ms);
      return isFinite(ms) && ms>0 ? (Date.now()-ms) : -0.5;             // no data → just above present
    };
    return items.slice().sort((a,b)=> ageMs(b) - ageMs(a));            // biggest age first
  }
  function _bcUpdateCount(){
    const boxes = Array.from(document.querySelectorAll("#bcList .bc-chk"));
    const n = boxes.filter(b=>b.checked).length;
    const sc = $g("bcSelCount"); if(sc) sc.textContent = `${n} seleccionado${n===1?"":"s"}`;
    const all = $g("bcSelectAll"); if(all) all.checked = boxes.length>0 && n===boxes.length;
  }
  function openBulkCancelModal(){
    if(!gcaData){ showToast({title:"GCA no cargado", body:"Corre el pipeline primero.", type:"warn", ms:4000}); return; }
    // Populate the reason dropdown (same list as the close modal).
    const sel = $g("bcReason");
    if(sel && sel.options.length <= 1 && (_ccCancelReasons||[]).length){
      _ccCancelReasons.forEach(r=>{ const o=document.createElement("option"); o.value=r.value; o.textContent=r.label||r.value; sel.appendChild(o); });
    }
    if(sel) sel.value = "";
    const note = $g("bcNote"); if(note) note.value = "";
    const prog = $g("bcProgress"); if(prog) prog.style.display = "none";
    const allBox = $g("bcSelectAll"); if(allBox) allBox.checked = false;

    const rows = _bcRows();
    const vc = $g("bcVisibleCount"); if(vc) vc.textContent = rows.length;
    const list = $g("bcList");
    if(list){
      if(!rows.length){
        list.innerHTML = `<div style="padding:24px;text-align:center;color:var(--text-muted);font-size:12px">No hay coachings pendientes${gcaOwnerFilter?" · "+gcaOwnerFilter:""}.</div>`;
      } else {
        list.innerHTML = rows.map(it=>{
          const login = it.login || it.employee_id || "—";
          const _exp = coachingExpiry(it.expiration);
          const expTxt = _exp ? `<span style="font-size:10px;color:${_exp.color};font-weight:700">${esc(_exp.text)}</span>` : "";
          const _isPresent = (it.presence==="ACTIVE"||it.presence==="ON_SITE");
          const pres = _isPresent ? `<span style="color:var(--green);font-size:10px">● ${it.presence==="ACTIVE"?"Active":"On site"}</span>` : `<span style="color:var(--text-muted);font-size:10px">○ ${esc(it.presence||"—")}</span>`;
          // Last-seen line — only when NOT present, so a coach can confirm how
          // stale the pending is before cancelling ("Last seen 13d ago").
          const _ls = !_isPresent ? lastSeen(it.last_seen_ms) : null;
          const lsTxt = _ls ? `<br><span style="font-size:9.5px;font-weight:700;color:${_ls.color}" title="${esc(_ls.full)}">${esc(_ls.text)}</span>` : "";
          return `<label style="display:flex;align-items:center;gap:10px;padding:8px 12px;border-bottom:1px solid var(--border);cursor:pointer">
            <input type="checkbox" class="bc-chk" data-iid="${esc(it.id||"")}" data-login="${esc(login)}">
            <div style="flex:1;min-width:0">
              <div style="font-size:12px;font-weight:600">${esc(login)} <span style="font-weight:400;color:var(--text-secondary)">· ${esc(it.owner||"")}</span></div>
              <div style="font-size:10.5px;color:var(--text-muted)">${esc(it.insight||it.course_title||"—")}</div>
            </div>
            <div style="text-align:right;white-space:nowrap">${pres}${lsTxt}<br>${expTxt}</div>
          </label>`;
        }).join("");
        list.querySelectorAll(".bc-chk").forEach(cb=>cb.addEventListener("change", _bcUpdateCount));
      }
    }
    _bcUpdateCount();
    openModal("modalBulkCancel");
  }
  async function _bcExecute(){
    const checked = Array.from(document.querySelectorAll("#bcList .bc-chk:checked"))
      .map(cb=>({iid:cb.dataset.iid, login:cb.dataset.login})).filter(r=>r.iid);
    if(!checked.length){ showToast({title:"Nada seleccionado", body:"Marca al menos un coaching.", type:"warn", ms:4000}); return; }
    const reason = ($g("bcReason")?.value || "").trim();
    const note   = ($g("bcNote")?.value || "").trim();
    if(!reason){ showToast({title:"Falta el motivo", body:"Elige un motivo de cancelación.", type:"warn", ms:4000}); return; }
    if(!note){ showToast({title:"Falta la nota", body:"La nota es obligatoria para cancelar.", type:"warn", ms:4000}); return; }
    const logins = checked.map(r=>r.login||"—");
    const preview = logins.slice(0,20).join(", ") + (logins.length>20?`, +${logins.length-20} más`:"");
    if(!confirm(`Vas a CANCELAR ${checked.length} coaching(s) en GCA:\n\n${preview}\n\nMotivo: ${reason}\nNota: ${note}\n\n¿Continuar?`)) return;

    const btn = $g("bcCancelBtn");
    const prog = $g("bcProgress"), bar = $g("bcProgBar"), lbl = $g("bcProgLbl");
    if(btn){ btn.disabled = true; btn.style.opacity = ".6"; }
    if(prog) prog.style.display = "flex";
    let done = 0, ok = 0, fail = 0; const errors = [];
    // Sequential (not parallel): each cancel round-trips a full GCA instance.
    for(const r of checked){
      try{
        const res = await jpost(`${API}/api/coaching/close`, {
          fc: currentFC, instance_id: r.iid, action: "cancel", cancel_reason: reason, notes: note,
        });
        if(res && res.ok !== false) ok++; else { fail++; errors.push(r.login); }
      }catch(e){ fail++; errors.push(r.login); }
      done++;
      if(bar) bar.style.width = Math.round(done/checked.length*100) + "%";
      if(lbl) lbl.textContent = `${done}/${checked.length}`;
    }
    if(btn){ btn.disabled = false; btn.style.opacity = "1"; }
    showToast({
      title: fail ? `Cancelados ${ok}/${checked.length}` : `✓ ${ok} coaching(s) cancelados`,
      body: fail ? `${fail} fallaron: ${errors.slice(0,10).join(", ")}` : "Refrescando GCA…",
      type: fail ? "warn" : "success", ms: fail ? 8000 : 4000,
    });
    closeModal("modalBulkCancel");
    if(window._loadGcaDashboard) window._loadGcaDashboard();
  }

  // Prettify a raw coachingReason enum (TOO_MANY_X / MANUAL_QUALITY_COACHING_FOR_Y)
  // into a readable label — mirrors the backend _format_reason.
  function _fmtReason(reason){
    if(!reason) return "";
    return String(reason)
      .replace(/^(TOO_(MANY|HIGH|LOW)_|MANUAL_(QUALITY|PRODUCTIVITY)_COACHING_FOR_)/,"")
      .replace(/_/g," ")
      .toLowerCase()
      .replace(/\b\w/g, c=>c.toUpperCase());
  }

  // Translate a cancel closedReason enum (e.g. ASSOCIATE_NOT_AVAILABLE_NOT_IN_
  // THE_SAME_PROCESS) into its human label from gca_cancel_reasons.json, using
  // the same list the cancel modal shows. Falls back to a title-cased enum.
  function _cancelReasonLabel(enumVal){
    if(!enumVal) return "";
    const list = _ccCancelReasons || [];
    const hit = list.find(r => r && r.value === enumVal);
    if(hit && hit.label) return hit.label;
    return String(enumVal).replace(/_/g," ").toLowerCase().replace(/\b\w/g, c=>c.toUpperCase());
  }

  // Cancelled tab — informational, no actions (these are terminal). EXPIRED is no
  // longer pulled (owner: too slow), so this now shows CANCELLED only. Any legacy
  // cached EXPIRED item is included so an old cache still renders sanely.
  function renderGcaClosed(){
    if(!gcaData) return;
    let items = (gcaData.items||[]).filter(i=>i.status==="CANCELLED" || i.status==="EXPIRED");
    if(gcaOwnerFilter) items = items.filter(i=>i.owner===gcaOwnerFilter);
    const gcaQuery = ($g("gcaSearchInput")?.value || "").trim().toLowerCase();
    if(gcaQuery){
      items = items.filter(i=>{
        const hay = [i.login, i.name, i.employee_id, i.insight, i.course_title, i.reason, i.comment]
          .map(x=>String(x||"").toLowerCase()).join(" ");
        return hay.includes(gcaQuery);
      });
    }
    // Most recent first (by closed timestamp, fallback creation).
    const ts = v => { const d = new Date(v); return isNaN(d) ? 0 : d.getTime(); };
    items = items.slice().sort((a,b)=> ts(b.closed||b.created) - ts(a.closed||a.created));

    const tbody = $g("gcaClosedTbody");
    if(!items.length){
      tbody.innerHTML = `<tr><td colspan="8" style="text-align:center;padding:30px;color:var(--text-muted);font-size:12px">Sin coachings cancelados o expirados${gcaOwnerFilter?" · "+gcaOwnerFilter:""}.</td></tr>`;
    } else {
      tbody.innerHTML = items.slice(0,200).map(it=>{
        const gcaUrl = `https://guided-coaching-dub.corp.amazon.com/#/view-coaching-instance/${it.id}`;
        const loginDisplay = it.login || it.employee_id || "—";
        const photoHtml = it.photo_url
          ? `<img src="${esc(it.photo_url)}" loading="lazy" decoding="async" style="width:28px;height:28px;border-radius:50%;object-fit:cover;margin-right:6px;vertical-align:middle" onerror="this.style.display='none'">`
          : "";
        const st = it.status==="EXPIRED" ? "expired" : "cancelled";
        const stBadge = `<span class="gca-status-badge ${st}">${it.status==="EXPIRED"?"EXPIRED":"CANCELLED"}</span>`;
        // Upload Notes = the note left when the coaching was CREATED
        // (creatorComment, e.g. "Ops Pack Performance | Rate X | Y% to Target").
        const uploadTxt = it.comment ? esc(it.comment) : "";
        const uploadCell = uploadTxt
          ? `<span style="font-size:11px">${uploadTxt}</span>`
          : `<span style="color:var(--text-muted)">—</span>`;
        // Reason / Coach Notes = why it closed + the note the coach left ON CLOSE:
        //  · CANCELLED → the cancel closedReason label (e.g. "Associate not
        //    available - Not in the same process") + the coach's closing note.
        //  · EXPIRED   → no cancel reason exists; show the coaching's own reason.
        // The note here is the CLOSE note (closed_note), NOT the upload comment.
        let reasonTxt = it.status==="CANCELLED" ? _cancelReasonLabel(it.closed_reason) : _fmtReason(it.reason);
        const closeNote = it.closed_note ? esc(it.closed_note) : "";
        const reasonCell = (reasonTxt || closeNote)
          ? `<div style="font-size:11px">${reasonTxt?`<b>${esc(reasonTxt)}</b>`:""}${(reasonTxt&&closeNote)?" · ":""}${closeNote}</div>`
          : `<span style="color:var(--text-muted)">—</span>`;
        // Date: EXPIRED → expiration; CANCELLED → closed (fallback creation).
        const dateRaw = it.status==="EXPIRED" ? (it.expiration||it.closed) : (it.closed||it.created);
        const dateTxt = dateRaw ? esc(String(dateRaw).slice(0,10)) : "—";
        return `<tr>
          <td><div style="display:flex;align-items:center">${photoHtml}<span style="font-weight:600">${esc(loginDisplay)}</span></div></td>
          <td>${esc(it.insight||it.course_title||"—")}</td>
          <td><span style="font-size:11px">${esc(it.owner||"—")}</span></td>
          <td>${stBadge}</td>
          <td>${uploadCell}</td>
          <td>${reasonCell}</td>
          <td><span style="font-size:11px;color:var(--text-muted)">${dateTxt}</span></td>
          <td><a href="${esc(gcaUrl)}" target="_blank" rel="noopener" style="color:var(--accent);text-decoration:none;font-size:10px">Open GCA →</a></td>
        </tr>`;
      }).join("");
    }
    const totalC = (gcaData.items||[]).filter(i=>i.status==="CANCELLED").length;
    const totalE = (gcaData.items||[]).filter(i=>i.status==="EXPIRED").length;
    // EXPIRED no longer pulled — only mention it if a legacy cache still has some.
    const expiredNote = totalE ? ` · ${totalE} expired (legacy)` : "";
    $g("gcaShowing").textContent = `Showing ${Math.min(items.length,200)} of ${items.length} · ${totalC} cancelled${expiredNote} (last 7 days)`;
  }

  // ── CSV download button ──
  $g("btnGcaCsv") && $g("btnGcaCsv").addEventListener("click", async ()=>{
    const btn = $g("btnGcaCsv");
    if (!gcaData || !Array.isArray(gcaData.items) || !gcaData.items.length){
      _csvToast("WARN No GCA data loaded. Run the pipeline first.");
      return;
    }
    btn.disabled = true;
    const orig = btn.textContent;
    btn.textContent = "Exporting…";
    try {
      // Filter by current owner selection if any (matches what's visible in the table).
      const items = gcaOwnerFilter
        ? gcaData.items.filter(it => it.owner === gcaOwnerFilter)
        : gcaData.items.slice();
      const rows = items.map(it => ({
        "Login":      it.login || "",
        "EmployeeId": it.employee_id || "",
        "Name":       it.name || "",
        "Status":     it.status || "",
        "Owner":      it.owner || "",
        "Insight":    it.insight || "",
        "Category":   it.cat || "",
        "Reason":     it.reason || "",
        "Course":     it.course_title || "",
        "Scenario":   it.scenario || "",
        "Comment":    it.comment || "",
        "Presence":   it.presence || "",
        "Station":    it.station || "",
        "ProcessPath":it.process_path || "",
        "Created":    it.created || "",
        "GCA_Link":   it.id ? `https://guided-coaching-dub.corp.amazon.com/#/view-coaching-instance/${it.id}` : "",
      }));
      const res = await fetch(`${API}/api/export/csv`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({fc: currentFC, rows: rows, prefix: "GCA_Compliance"}),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const savedPath = res.headers.get("X-Saved-Path");
      if (savedPath){
        try { window.open(`${API}/api/open-file?path=${encodeURIComponent(savedPath)}`); } catch(_) {}
      }
      _csvToast(`${tf("csv_gca_saved", {n: rows.length})}\n${savedPath || "Coaching_csv/"}`);
    } catch(e) {
      _csvToast(`FAIL ${e.message}`);
    } finally {
      btn.disabled = false;
      btn.textContent = orig;
    }
  });

  // ── Pipeline button ──
  $g("btnGcaPipeline") && $g("btnGcaPipeline").addEventListener("click",()=>{
    const btn = $g("btnGcaPipeline");
    btn.disabled = true;
    btn.textContent = "⏳ Running…";
    $g("gcaProgress").style.display = "";

    const evtSrc = new EventSource(`${API}/api/gca/pipeline?fc=${encodeURIComponent(currentFC)}`);

    evtSrc.onmessage = async(e)=>{
      try{
        const d = JSON.parse(e.data);
        const p = Math.min(d.pct||0, 100);
        const bar = $g("gcaProgBar");
        const msg = $g("gcaProgMsg");
        if(bar) bar.style.width = p+"%";
        if(msg && d.msg) msg.textContent = d.msg;
        if(p >= 100){
          evtSrc.close();
          btn.disabled = false;
          btn.textContent = "▶ Run GCA Pipeline";
          setTimeout(()=>{ $g("gcaProgress").style.display = "none"; }, 2000);
          if(d.ok !== false){
            await loadGcaDashboard();
          }
        }
      }catch(err){ console.error("GCA SSE parse",err); }
    };

    evtSrc.onerror = ()=>{
      evtSrc.close();
      btn.disabled = false;
      btn.textContent = "▶ Run GCA Pipeline";
      $g("gcaProgress").style.display = "none";
    };
  });

  // Present-only toggle (pill style, like Quality) → re-render (no re-fetch)
  const gcaPresentBtn = $g("gcaPresentOnly");
  if(gcaPresentBtn) gcaPresentBtn.addEventListener("click", ()=>{
    gcaPresentOnly = !gcaPresentOnly;
    gcaPresentBtn.classList.toggle("active", gcaPresentOnly);
    const ic = $g("gcaPresentIcon"); if(ic) ic.textContent = gcaPresentOnly ? "●" : "○";
    renderGca();
  });

  // Login/name search → re-render (no re-fetch)
  const gcaSearchEl = $g("gcaSearchInput");
  if(gcaSearchEl) gcaSearchEl.addEventListener("input", ()=>{ renderGca(); });

  // Tab toggle: Pending ↔ Cancelled/Expired → re-render (no re-fetch)
  const _gcaTabPend = $g("gcaTabPending");
  const _gcaTabClosed = $g("gcaTabClosed");
  if(_gcaTabPend) _gcaTabPend.addEventListener("click", ()=>{ gcaTab = "pending"; renderGca(); });
  if(_gcaTabClosed) _gcaTabClosed.addEventListener("click", ()=>{ gcaTab = "closed"; renderGca(); });

  // Bulk cancel modal controls: open button, select-all inside modal, execute.
  const _gcaBulkOpenBtn = $g("gcaBulkOpenBtn");
  if(_gcaBulkOpenBtn) _gcaBulkOpenBtn.addEventListener("click", openBulkCancelModal);
  const _bcSelectAll = $g("bcSelectAll");
  if(_bcSelectAll) _bcSelectAll.addEventListener("change", (e)=>{
    document.querySelectorAll("#bcList .bc-chk").forEach(cb=>{ cb.checked = e.target.checked; });
    _bcUpdateCount();
  });
  const _bcCancelBtn = $g("bcCancelBtn");
  if(_bcCancelBtn) _bcCancelBtn.addEventListener("click", _bcExecute);


  // ═══ COACHING PATH OPTIMIZER ═══

  // PATH_ARRAYS built from layout at runtime
  function _getPathArrays(){
    var out = {};
    if(window._getFloors){
      window._getFloors().forEach(function(fl){
        if(fl.type==="ar_ring") out[fl.id] = {top:fl.top||[], left:fl.left||[], bottom:fl.bottom||[], right:fl.right||[]};
      });
    }
    return out;
  }

  // ── Real-metric ring geometry ──────────────────────────────────────────
  // The layout JSON has no x/y coordinates, only per-side station lists. We
  // model each side as a straight run of known length (meters); the first and
  // last station sit _PATH_END_INSET metres from the ends, the rest are evenly
  // interpolated (owner's rule). This turns a station number into a real
  // position along the floor perimeter, so walking distance is honest instead
  // of the old fake index*3 (which also blew up to ~3000 m whenever a station
  // wasn't on the ring — the 999 sentinel). Side lengths seed from the BCN4 P1
  // plan (footprint ≈330×175 m); any site/floor can override via
  // side_meters:{top,right,bottom,left} in map_layouts.json.
  var _PATH_END_INSET = 20; // m from each side end to the first/last station
  var _PATH_WALK_MPS  = 1.2; // walking speed m/s used for the time estimate
  function _sideMeters(floor){
    var fl = (window._getFloors?window._getFloors():[]).find(function(f){return f.id===floor;}) || {};
    var ml = (window._getMapLayout && window._getMapLayout()) || null;
    var sm = fl.side_meters || (ml && ml.side_meters) || {};
    return {top:+sm.top||330, right:+sm.right||175, bottom:+sm.bottom||330, left:+sm.left||175};
  }
  // Position (m) of a station within its side, from the side's start. null if
  // the station isn't in that side's list.
  function _posInSide(list, stNum, sideLen){
    var i = list.indexOf(stNum);
    if(i < 0) return null;
    if(list.length <= 1) return sideLen/2;
    var usable = Math.max(0, sideLen - 2*_PATH_END_INSET);
    return _PATH_END_INSET + usable * (i/(list.length-1));
  }
  // Estimate a perimeter position for a station NOT in the layout arrays, in a
  // way CONSISTENT with the array-index positions of its real neighbours (the
  // layout array order is the physical source of truth — same as the perf map).
  // Naive number-range interpolation broke ordering (e.g. 3322 landed between
  // 3360 and 3393): the array has gaps so number != index. Fix: locate the side
  // by number, find the two array entries the number falls between, and
  // interpolate its position from THEIR real _posInSide positions.
  function _estSideMeters(stNum, floor){
    var base = stNum >= 3000 ? stNum - 1000 : stNum;
    var arr = _getPathArrays()[floor], L = _sideMeters(floor);
    // side, its perimeter offset, length, and whether metres run opposite to num
    var list, offset, sideLen, invert;
    if(base <= 2199){       list = arr && arr.top;    offset = 0;                        sideLen = L.top;    invert = false; }
    else if(base <= 2299){  list = arr && arr.left;   offset = L.top+L.right+L.bottom;   sideLen = L.left;   invert = true; }
    else if(base <= 2399){  list = arr && arr.bottom; offset = L.top+L.right;            sideLen = L.bottom; invert = true; }
    else {                  list = arr && arr.right;  offset = L.top;                    sideLen = L.right;  invert = false; }
    function atIndex(idx, len){
      var within = (len<=1) ? sideLen/2 : _PATH_END_INSET + Math.max(0,sideLen-2*_PATH_END_INSET)*(idx/(len-1));
      return offset + (invert ? (sideLen - within) : within);
    }
    if(list && list.length){
      var n = list.length, below=-1, above=-1, bv=null, av=null;
      for(var i=0;i<n;i++){
        var v = list[i] >= 3000 ? list[i]-1000 : list[i];
        if(v <= base && (bv===null || v>bv)){ bv=v; below=i; }
        if(v >= base && (av===null || v<av)){ av=v; above=i; }
      }
      if(below>=0 && above>=0){
        if(below===above) return atIndex(below, n);
        var frac = (av===bv) ? 0 : (base-bv)/(av-bv);
        return atIndex(below, n) + (atIndex(above, n)-atIndex(below, n))*frac;
      }
      if(below>=0) return atIndex(below, n);
      if(above>=0) return atIndex(above, n);
    }
    // no array → linear-by-number fallback (rare: floors without a layout)
    var f = Math.max(0, Math.min(1, (base-(offset===0?2104:base))/1)); // degenerate
    return offset + sideLen*0.5;
  }
  // ── Canonical perimeter position (SAME source of truth as the tab-Map) ──────
  // The layout arrays (top/right/bottom/left) list stations in physical order;
  // the perf map just renders them in that order. So a station's position on the
  // ring = its index walking the perimeter clockwise: top → right → bottom →
  // left. We build that ordered sequence once per floor and index into it. This
  // replaces the metre-interpolation guesswork that mis-placed off-array stops.
  var _perimSeqCache = {};
  function _perimSeq(floor){
    if(_perimSeqCache[floor]) return _perimSeqCache[floor];
    var arr = _getPathArrays()[floor];
    if(!arr){ _perimSeqCache[floor] = null; return null; }
    // Clockwise walk. left is stored top→bottom in the layout, so reverse it to
    // continue the clockwise loop (…bottom → up the left side).
    var seq = [].concat(arr.top, arr.right, arr.bottom, arr.left.slice().reverse());
    var idx = {};
    seq.forEach(function(n, i){ idx[String(n)] = i; });
    var out = {seq:seq, idx:idx, len:seq.length,
               sideStart:{N:0, E:arr.top.length, S:arr.top.length+arr.right.length,
                          O:arr.top.length+arr.right.length+arr.bottom.length}};
    _perimSeqCache[floor] = out;
    return out;
  }
  // Is this parsed station something we can actually place on the map + route?
  // Accepts: P1 pack stations (known type), P2R packers, and AR ring stations
  // whose number falls inside a real cardinal range for their floor. Rejects the
  // junk the 4-digit fallback invents from location-ids (4300035018 → "4300",
  // wsPOPS_P2R2W01 → "2201") by requiring the number to be a plausible ring
  // station (x1xx..x4xx band) on floors p2..p9.
  function _isRoutableStation(parsed){
    if(!parsed) return false;
    if(parsed.floor === "p1"){ return !!parsed.type; }        // P1 by zone type
    if(parsed.p2r) return true;                               // P2R packer
    if(!parsed.num) return false;
    var fl = parsed.floor || "";
    if(!/^p[2-9]$/.test(fl)) return false;                    // p4300 etc → reject
    var base = parsed.num >= 3000 ? (parsed.num % 1000) + 2000 : parsed.num;
    // real ring bands: N 2104-2197, O 2200-2295, S 2306-2395, E 2422-2494,
    // plus the P2R synthetic band 2051-2090 (num-encoded packers).
    return (base>=2051 && base<=2094) || (base>=2104 && base<=2197) ||
           (base>=2200 && base<=2295) || (base>=2306 && base<=2395) ||
           (base>=2422 && base<=2494);
  }
  // Position of a station along the perimeter as a fractional index (0..len).
  // Uses the array index directly when listed; otherwise slots it BETWEEN its
  // numeric neighbours on the correct side (consistent with the array order).
  function _stationMeters(stNum, floor){
    var ps = _perimSeq(floor);
    if(!ps) return null;
    var key = String(stNum);
    if(ps.idx[key] != null) return ps.idx[key];
    // Not listed → find the side, then bracket by number within that side's seq.
    var side = _arSide(stNum, floor);
    var arr = _getPathArrays()[floor];
    var sideList = {N:arr.top, E:arr.right, S:arr.bottom, O:arr.left.slice().reverse()}[side] || arr.top;
    var base = stNum >= 3000 ? stNum - 1000 : stNum;
    var below=-1, above=-1, bv=null, av=null;
    for(var i=0;i<sideList.length;i++){
      var v = sideList[i] >= 3000 ? sideList[i]-1000 : sideList[i];
      var gi = ps.idx[String(sideList[i])];
      if(v<=base && (bv===null||v>bv)){ bv=v; below=gi; }
      if(v>=base && (av===null||v<av)){ av=v; above=gi; }
    }
    if(below>=0 && above>=0){
      if(below===above) return below;
      var frac = (av===bv)?0:(base-bv)/(av-bv);
      return below + (above-below)*frac;
    }
    if(below>=0) return below;
    if(above>=0) return above;
    return ps.sideStart[side] || 0;
  }
  // Perimeter length = number of stations in the clockwise sequence (the ring
  // closes on itself, so distance is measured in "stations apart").
  function _perimeterMeters(floor){ var ps=_perimSeq(floor); return ps? ps.len : 0; }
  // Shorter walk between two perimeter positions (the ring closes on itself).
  function _ringDist(a, b, perim){ var d=Math.abs(a-b); return Math.min(d, perim-d); }

  // Order station-groups into a walking route. With an origin (m along the
  // perimeter) it's nearest-neighbour greedy from where the trainer stands;
  // without one it falls back to a plain clockwise sweep. Off-ring groups
  // (station we couldn't place) go last and never inflate the distance.
  function _orderPathGroups(groups, floor, originM){
    // Use the precomputed group position (handles P2R aisle + off-ring estimate);
    // fall back to a fresh station-metre lookup if pos wasn't stamped.
    groups.forEach(function(g){ g.mPos = (g.pos!=null ? g.pos : (g.num ? _stationMeters(g.num, floor) : null)); });
    var onRing  = groups.filter(function(g){ return g.mPos!==null; });
    var offRing = groups.filter(function(g){ return g.mPos===null; });
    if(onRing.length <= 1) return onRing.concat(offRing);

    var perim = _perimeterMeters(floor);
    onRing.sort(function(a,b){ return a.mPos - b.mPos; });

    // SINGLE-DIRECTION SWEEP around the ring (minimise walking, no zig-zag). The
    // ring is a closed loop, so the shortest tour that hits every stop is the
    // whole perimeter MINUS its largest empty gap: you enter the arc at one end
    // of that gap and sweep straight to the other. Find the biggest gap between
    // consecutive stops (incl. the wrap-around) and start right after it.
    var biggestGap = -1, cutIdx = 0;
    for(var i=0;i<onRing.length;i++){
      var next = (i+1) % onRing.length;
      var gap = (i === onRing.length-1)
        ? (perim - onRing[i].mPos) + onRing[0].mPos   // wrap gap
        : onRing[next].mPos - onRing[i].mPos;
      if(gap > biggestGap){ biggestGap = gap; cutIdx = next; }
    }
    // Rotate so the sweep starts just after the biggest gap.
    var swept = onRing.slice(cutIdx).concat(onRing.slice(0, cutIdx));

    if(originM==null) return swept.concat(offRing);

    // With an origin: keep the single-direction sweep but ROTATE it to start at
    // the stop nearest the origin, then continue in whichever direction has the
    // closer neighbour — still one clean pass, no back-and-forth.
    var startI=0, bd=Infinity;
    for(var k=0;k<swept.length;k++){ var d=_ringDist(originM, swept[k].mPos, perim); if(d<bd){bd=d;startI=k;} }
    var fwd = swept.slice(startI).concat(swept.slice(0,startI));
    // direction check: distance origin→first going forward vs the reverse order
    var rev = swept.slice(0,startI+1).reverse().concat(swept.slice(startI+1).reverse());
    function span(list){ var t=0; for(var j=1;j<list.length;j++) t+=_ringDist(list[j-1].mPos,list[j].mPos,perim); return t + _ringDist(originM,list[0].mPos,perim); }
    var route = (span(fwd) <= span(rev)) ? fwd : rev;
    return route.concat(offRing);
  }

  function perimeterIndex(stNum, floor){
    var arrays = _getPathArrays()[floor];
    if(!arrays) return 999;
    var top=arrays.top, right=arrays.right, bottom=arrays.bottom, left=arrays.left;
    var idx;
    idx = top.indexOf(stNum);
    if(idx > -1) return idx;
    idx = right.indexOf(stNum);
    if(idx > -1) return top.length + idx;
    idx = bottom.indexOf(stNum);
    if(idx > -1) return top.length + right.length + (bottom.length - 1 - idx);
    idx = left.indexOf(stNum);
    if(idx > -1) return top.length + right.length + bottom.length + (left.length - 1 - idx);
    var base = stNum >= 3000 ? stNum - 1000 : stNum;
    if(base >= 2104 && base <= 2197) return Math.round((2197-base)/(2197-2104)*(top.length-1));
    if(base >= 2422 && base <= 2494) return top.length + Math.round((base-2422)/(2494-2422)*(right.length-1));
    if(base >= 2306 && base <= 2395) return top.length + right.length + Math.round((2395-base)/(2395-2306)*(bottom.length-1));
    if(base >= 2200 && base <= 2295) return top.length + right.length + bottom.length + Math.round((2295-base)/(2295-2200)*(left.length-1));
    return 999;
  }

  function pathSectionLabel(stNum){
    var base = stNum >= 3000 ? stNum - 1000 : stNum;
    if(base >= 2104 && base <= 2197) return "Top";
    if(base >= 2200 && base <= 2295) return "Left";
    if(base >= 2306 && base <= 2395) return "Bottom";
    if(base >= 2422 && base <= 2494) return "Right";
    return "?";
  }

  function pathTypeLabel(stNum){
    var base = stNum >= 3000 ? stNum - 1000 : stNum;
    if(base >= 2104 && base <= 2197) return "PTR/NU";
    if(base >= 2200 && base <= 2295) return "NU";
    if(base >= 2306 && base <= 2395) return "NA";
    if(base >= 2422 && base <= 2494) return "NS";
    return "NU";
  }

  // ── P1 (pack) helpers ────────────────────────────────────────────────────
  // P1 stations have a `type` (afe/rebin/induct/singles/ws/decant) instead of a
  // 4-digit AR number, so the ring geometry doesn't apply. We give each a
  // synthetic linear order that follows a sensible pack walk by zone (owner's
  // colour key: Receive=red, AFE=pink, Singles=blue, WS=black). Real metres/doors
  // for P1 are pending the pack layout; this at least orders + labels them so
  // they show up in the list and the origin picker instead of being dropped.
  var _P1_ZONE_ORDER = {decant:0, induct:1, afe:2, rebin:3, singles:4, ws:5};
  function _p1SortKey(p){
    if(!p) return 9999;
    var base = (_P1_ZONE_ORDER[p.type] != null ? _P1_ZONE_ORDER[p.type] : 9) * 1000;
    var wall = p.wall || p.line || p.id || 0;
    var pos  = (typeof p.pos === "number") ? p.pos : 0;
    return base + (wall % 100) * 10 + pos;
  }
  function _p1Label(p){
    if(!p) return "P1";
    switch(p.type){
      case "afe":     return "AFE"+(p.id||"")+" · muro "+(p.wall||"?")+"."+(p.pos||"?");
      case "rebin":   return "Rebin "+(p.wall||"?")+" ("+("ABCD"[(p.pos||1)-1]||"?")+")";
      case "induct":  return "Induct muro "+(p.wall||"?");
      case "singles": return "Singles "+(p.id||"?")+"."+(p.pos||"?");
      case "ws":      return "WS "+(p.line||"?")+"."+(p.pos||"?");
      case "decant":  return "Receive/Decant "+(p.id||"?")+"."+(p.pos||"?");
    }
    return "P1";
  }
  function _p1TypeShort(t){
    return ({afe:"AFE", rebin:"REB", induct:"IND", singles:"SGL", ws:"WS", decant:"REC"})[t] || "P1";
  }
  var _FLOOR_ORDER = {p1:1, p2:2, p3:3, p4:4, p5:5, p6:6, p7:7, p8:8, p9:9};
  function _isARFloor(fl){ return /^p[2-9]$/.test(fl); }

  // Linear position of a station-group within its floor (metres on AR ring, or
  // synthetic key on P1) — drives ordering + the origin picker value.
  function _groupPos(g){
    if(_isARFloor(g.floor)){
      // P2R (packer) is GLUED to the Norte by its muro's PTR picker → give it a
      // perimeter index INSIDE the Norte (top) span, spread by muro (1..20), so
      // the trainer does all of Norte (ring PTR + P2R) in one pass. Norte spans
      // seq indices [0 .. top.length); place muros across it.
      if(g.parsed && g.parsed.p2r){
        var ps = _perimSeq(g.floor); if(!ps) return null;
        var topLen = ps.sideStart.E; // Norte length = where East begins
        var muro = g.parsed.wall || 1;
        return (topLen>0 ? (topLen-1) * ((muro-1)/19) : 0);
      }
      return (g.num ? _stationMeters(g.num, g.floor) : null);
    }
    if(g.floor === "p1") return _p1SortKey(g.parsed);
    return null;
  }
  // Human label for a station-group, AR or P1.
  function _groupLabel(g){
    if(_isARFloor(g.floor)) return "Est. "+g.num+" ("+pathSectionLabel(g.num)+")";
    if(g.floor === "p1") return _p1Label(g.parsed);
    return String(g.num||g.key||"?");
  }
  function _groupTypeShort(g){
    if(_isARFloor(g.floor)) return pathTypeLabel(g.num);
    return _p1TypeShort(g.parsed && g.parsed.type);
  }

  // ── CALM code catalog (official, from the L&D 'Map of standards' wiki) ──────
  // Loaded once from /api/coaching/calm-codes: a flat list of valid trainee CALM
  // codes + a course-name→code map. The Path 'Logar' picker uses it so the coach
  // logs the associate under the correct standard code (legal requirement) and
  // can override if the course→code guess is wrong.
  var _calmCatalog = {codes:[], by_course:{}};
  var _calmCatalogLoaded = false;
  function _loadCalmCatalog(){
    if(_calmCatalogLoaded) return Promise.resolve(_calmCatalog);
    return fetch(API+"/api/coaching/calm-codes").then(function(r){return r.json();}).then(function(j){
      if(j && j.ok){ _calmCatalog = {codes:j.codes||[], by_course:j.by_course||{}}; _calmCatalogLoaded = true; }
      return _calmCatalog;
    }).catch(function(){ return _calmCatalog; });
  }
  // Best CALM code for a course name from the official wiki map: exact match,
  // else case-insensitive, else a loose contains match (course strings vary a
  // bit between GCA and the wiki). Returns "" if the wiki has no entry.
  function _calmCodeForCourse(course){
    var c = String(course||"").trim();
    if(!c || !_calmCatalog.by_course) return "";
    var bc = _calmCatalog.by_course;
    if(bc[c]) return bc[c];
    var lc = c.toLowerCase();
    var keys = Object.keys(bc);
    for(var i=0;i<keys.length;i++){ if(keys[i].toLowerCase()===lc) return bc[keys[i]]; }
    for(var j=0;j<keys.length;j++){ var k=keys[j].toLowerCase(); if(k && (lc.indexOf(k)>=0 || k.indexOf(lc)>=0)) return bc[keys[j]]; }
    return "";
  }
  // Process → CALM feed code fallback, mirroring the backend PROCESS_TO_CALM so
  // the card can show the code the server WOULD resolve when the wiki has no
  // course entry. Kept in sync with domains/calm_tracking.py.
  var _PROCESS_TO_CALM = [["STOW","STWFEED"],["PICK","PIKFEED"],["PACK","PAKFEED"],
    ["RECEIVE","RCVFEED"],["RCV","RCVFEED"],["DECANT","RCVFEED"],["ICQA","ICQATR"],
    ["SBC","ICQATR"],["BIN FILTER","ICQATR"],["BIN_FILTER","ICQATR"],["PEI","PIKFEED"],
    ["PICK ERROR","PIKFEED"],["QUALITY","ICQATR"],["DEFECT","ICQATR"]];
  function _calmCodeForProcess(proc){
    var s = String(proc||"").toUpperCase();
    for(var i=0;i<_PROCESS_TO_CALM.length;i++){ if(s.indexOf(_PROCESS_TO_CALM[i][0])>=0) return _PROCESS_TO_CALM[i][1]; }
    return "";
  }
  // Resolve the CALM code to log a coaching under: official wiki course map
  // first, then the process→feed fallback. Returns "" only if neither knows it.
  function _resolveCalmCode(courseName, proc){
    return _calmCodeForCourse(courseName) || _calmCodeForProcess(proc) || "";
  }

  // Path's own owner-scope filter (L&D / Team Lead / …) — independent of the GCA
  // table filter so it doesn't disturb the main view.
  var _pathOwnerFilter = "";
  // Build the owner filter pills in the path header from the present pending set.
  function _buildPathOwnerFilters(pending){
    var box = $g("pathOwnerFilters");
    if(!box) return;
    var counts = {}; pending.forEach(function(i){ var o=i.owner||"—"; counts[o]=(counts[o]||0)+1; });
    var owners = Object.keys(counts).sort();
    var html = '<span class="path-owner-pill'+(!_pathOwnerFilter?" active":"")+'" data-owner="">Todos ('+pending.length+')</span>';
    owners.forEach(function(o){
      html += '<span class="path-owner-pill'+(_pathOwnerFilter===o?" active":"")+'" data-owner="'+esc(o)+'">'+esc(o)+' ('+counts[o]+')</span>';
    });
    box.innerHTML = html;
    box.querySelectorAll(".path-owner-pill").forEach(function(p){
      p.addEventListener("click", function(){
        _pathOwnerFilter = p.getAttribute("data-owner") || "";
        _showCoachingPathInner();   // re-run with the new scope
      });
    });
  }

  // Full-screen toggle for the path modal — more room for the list; Escape exits.
  var _pathFull = false;
  function _setPathFull(on){
    _pathFull = !!on;
    var card = $g("gcaPathCard"), body = $g("gcaPathBody"), mapWrap = $g("gcaPathMapWrap"), btn = $g("pathFullBtn");
    if(!card) return;
    if(_pathFull){
      card.style.maxWidth = "none"; card.style.minHeight = "calc(100vh - 40px)";
      // More room for pathing: hide the map, list goes full width (owner asked
      // for the station map to be optional in full mode).
      if(mapWrap) mapWrap.style.display = "none";
      if(body) body.style.gridTemplateColumns = "1fr";
      var list = $g("gcaPathList"); if(list) list.style.maxHeight = "calc(100vh - 140px)";
      if(btn){ btn.textContent = "🗗"; btn.title = "Salir de pantalla completa (Esc)"; }
    }else{
      card.style.maxWidth = "1100px"; card.style.minHeight = "";
      if(mapWrap) mapWrap.style.display = "";
      if(body) body.style.gridTemplateColumns = "420px 1fr";
      var list2 = $g("gcaPathList"); if(list2) list2.style.maxHeight = "600px";
      if(btn){ btn.textContent = "⛶"; btn.title = "Pantalla completa (Esc para salir)"; }
    }
  }
  function _closePathModal(){ var m=$g("gcaPathModal"); if(m) m.style.display="none"; if(_pathFull) _setPathFull(false); }

  // Wire path modal chrome once (close, full-screen, Escape).
  (function _wirePathChrome(){
    var closeB = $g("pathCloseBtn"), fullB = $g("pathFullBtn");
    if(closeB) closeB.addEventListener("click", _closePathModal);
    if(fullB) fullB.addEventListener("click", function(){ _setPathFull(!_pathFull); });
    document.addEventListener("keydown", function(e){
      if(e.key!=="Escape") return;
      var m = $g("gcaPathModal");
      if(!m || m.style.display==="none") return;
      // If the close/comment modal is open ON TOP of the path, let it handle Esc
      // — don't close the path underneath it.
      var cc = $g("modalCloseCoaching");
      if(cc && cc.classList.contains("show")) return;
      if(_pathFull) _setPathFull(false); else _closePathModal();
    });
  })();

  window._showCoachingPath = function(){
    try{ return _showCoachingPathInner(); }
    catch(e){
      console.error("Coaching Path failed:", e);
      try{ showToast({title:"🧭 Path — error", body:String((e&&e.message)||e), type:"err", ms:6000}); }
      catch(_){ alert("Path error: "+((e&&e.message)||e)); }
    }
  };
  function _showCoachingPathInner(){
    // No GCA data loaded yet → tell the user instead of silently doing nothing
    // (the old behaviour looked like a dead button).
    if(!gcaData || !gcaData.items){
      showToast({title:"🧭 Path", body:"Abre la pestaña GCA y espera a que cargue antes de trazar el path.", type:"warn", ms:5000});
      return;
    }
    var items = gcaData.items.filter(function(i){return i.status==="PENDING";});
    var presenceOn = gcaPresentOnly;
    if(presenceOn) items = items.filter(function(i){return i.presence==="ACTIVE"||i.presence==="ON_SITE";});
    // The path has its OWN owner filter (L&D / Team Lead / …), independent of the
    // GCA table's, so switching scope here doesn't disturb the main view.
    if(_pathOwnerFilter) items = items.filter(function(i){return i.owner===_pathOwnerFilter;});
    _buildPathOwnerFilters(gcaData.items.filter(function(i){return i.status==="PENDING" && (!presenceOn || i.presence==="ACTIVE" || i.presence==="ON_SITE");}));

    // L&D covers EVERYTHING, so the path spans ALL present floors (P1 + P2..P9),
    // not just the floor with the most coachings. ONLY coachings at a REAL,
    // routable station are kept — associates who are On-site but not at a mapped
    // station (raw GCA location-ids like 4300035018, pmP-1-B, wsPOPS…) have no
    // place on the walk, so we drop them (you can't plan a route to "somewhere").
    var entries = [], noStation = [];
    items.forEach(function(it){
      var parsed = parseStation(it.station);
      if(!parsed || !_isRoutableStation(parsed)){ noStation.push(it); return; }
      var floor = parsed.floor || (parsed.num ? _arFloorOf2(parsed.num) : "p1");
      entries.push({item:it, parsed:parsed, num:parsed.num||0, floor:floor});
    });
    if(!entries.length){
      // If the modal is already open (e.g. the owner filter emptied it), show an
      // empty state in-place instead of only a toast + stale list.
      var modalOpen = $g("gcaPathModal") && $g("gcaPathModal").style.display!=="none";
      if(modalOpen){
        var le = $g("gcaPathList"); if(le) le.innerHTML = '<div class="path-map-empty">Sin coachings ubicables'+(_pathOwnerFilter?' para «'+esc(_pathOwnerFilter)+'»':'')+'.</div>';
        var me = $g("gcaPathMap"); if(me) me.innerHTML = "";
      } else {
        showToast({title:"🧭 Path", body:"No hay coachings con estación ubicable ahora mismo.", type:"warn", ms:5000});
      }
      return;
    }

    // One group per physical station (coachings at the same station stack).
    var seen = {}, stationGroups = [];
    entries.forEach(function(e){
      var key = e.floor+"|"+String(e.num || (e.parsed.type+"_"+(e.parsed.wall||e.parsed.id||e.parsed.line||0)+"_"+(e.parsed.pos||0)));
      if(!seen[key]){ seen[key]={entries:[e], num:e.num, floor:e.floor, parsed:e.parsed, key:key}; stationGroups.push(seen[key]); }
      else { seen[key].entries.push(e); }
    });

    // Order: by floor (P1 first, then P2..P9), and within each floor by position
    // (AR perimeter metres / P1 synthetic zone order). The origin dropdown can
    // re-sort within-floor by nearest-neighbour later.
    stationGroups.forEach(function(g){ g.pos = _groupPos(g); });
    stationGroups.sort(function(a,b){
      var fa=_FLOOR_ORDER[a.floor]||99, fb=_FLOOR_ORDER[b.floor]||99;
      if(fa!==fb) return fa-fb;
      return (a.pos==null?1e9:a.pos) - (b.pos==null?1e9:b.pos);
    });

    // Keep context so the origin dropdown can re-order without a full recompute.
    window._pathCtx = {groups: stationGroups, skipped: noStation.length, noStation: noStation};
    _buildPathOriginSelect(stationGroups);
    renderPathModal(stationGroups, _pathOriginVal());
    document.getElementById("gcaPathModal").style.display = "flex";
    // Load the official CALM catalog (once) and re-render so the code chips fill
    // in. First open may show "CALM ?" for a blink until the catalog arrives.
    _loadCalmCatalog().then(function(){
      if(window._pathCtx) renderPathModal(window._pathCtx.groups, _pathOriginVal());
    });
  };

  // Read the origin dropdown → {floor, side, pos} (null = not chosen). Value is
  // "floor|side" (P1 has no side). pos = the perimeter index where that side
  // begins, so the sweep can start from there.
  function _pathOriginVal(){
    var sel = $g("pathOrigin");
    if(!sel || sel.value==="") return null;
    var parts = String(sel.value).split("|");
    var floor = parts[0], side = parts[1] || null;
    var pos = null;
    if(side && _isARFloor(floor)){
      var ps = _perimSeq(floor);
      if(ps && ps.sideStart[side]!=null) pos = ps.sideStart[side];
    }
    return {floor: floor, side: side, pos: pos};
  }
  // Fixed origin choices (owner request): P1, and P2/P3 by the 4 sides
  // (N/S/E/O). The coach just says which floor + side they're standing on; the
  // sweep starts there. Only floors/sides that actually have coachings are shown.
  function _buildPathOriginSelect(groups){
    var sel = $g("pathOrigin");
    if(!sel) return;
    var present = {};   // floor → set of sides with a stop (P1 → true)
    groups.forEach(function(g){
      if(g.floor==="p1"){ (present.p1=present.p1||{}).any=true; return; }
      if(_isARFloor(g.floor)){
        var side = g.parsed && g.parsed.p2r ? "N" : (g.num ? _arSide(g.num, g.floor) : "N");
        (present[g.floor]=present[g.floor]||{})[side]=true;
      }
    });
    var sideName = {N:"Norte", S:"Sur", E:"Este", O:"Oeste"};
    var floors = Object.keys(present).sort(function(a,b){ return (_FLOOR_ORDER[a]||99)-(_FLOOR_ORDER[b]||99); });
    var html = '<option value="">📍 ¿Dónde estás? (elige planta y lado)</option>';
    floors.forEach(function(fl){
      if(fl==="p1"){ html += '<option value="p1|">P1 (Pack)</option>'; return; }
      html += '<optgroup label="'+fl.toUpperCase()+'">';
      ["N","E","S","O"].forEach(function(sd){
        if(present[fl][sd]) html += '<option value="'+fl+'|'+sd+'">'+fl.toUpperCase()+' · '+sideName[sd]+'</option>';
      });
      html += '</optgroup>';
    });
    sel.innerHTML = html;
    sel.onchange = function(){
      if(window._pathCtx) renderPathModal(window._pathCtx.groups, _pathOriginVal());
    };
  }

  // Order all groups into a multi-floor walk. Floors are visited in order
  // (starting on the origin's floor if given), and within each floor the stops
  // are ordered by position — nearest-neighbour from the origin on that floor,
  // else a straight sweep. Returns the flat ordered list.
  function _orderMultiFloor(groups, origin){
    var byFloor = {};
    groups.forEach(function(g){ (byFloor[g.floor]=byFloor[g.floor]||[]).push(g); });
    var floors = Object.keys(byFloor).sort(function(a,b){ return (_FLOOR_ORDER[a]||99)-(_FLOOR_ORDER[b]||99); });
    // Start on the origin's floor, keep the rest in natural floor order.
    if(origin && origin.floor && floors.indexOf(origin.floor)>0){
      floors = [origin.floor].concat(floors.filter(function(f){ return f!==origin.floor; }));
    }
    // CONTINUITY between floors: where you FINISH one floor is where you START
    // the next (you change floor via stairs near that spot). So the first floor
    // starts at the origin; each subsequent floor starts near the previous
    // floor's LAST stop position — no walking back across a floor after a change.
    var out = [];
    var carryPos = (origin && origin.pos!=null) ? origin.pos : null;
    floors.forEach(function(fl, fi){
      var gs = byFloor[fl];
      var startPos = (fi===0 && origin && origin.floor===fl) ? origin.pos : carryPos;
      if(_isARFloor(fl)){
        var ordered = _orderPathGroups(gs, fl, startPos==null?undefined:startPos);
        out = out.concat(ordered);
        var lastAr = null;
        for(var i=ordered.length-1;i>=0;i--){ if(ordered[i].mPos!=null){ lastAr=ordered[i].mPos; break; } }
        carryPos = lastAr;   // hand the finish position to the next floor
      } else {
        // P1: no ring geometry yet — order by synthetic zone key.
        gs.sort(function(a,b){ return (a.pos==null?1e9:a.pos)-(b.pos==null?1e9:b.pos); });
        gs.forEach(function(g){ g.mPos = g.pos; });
        out = out.concat(gs);
        carryPos = gs.length ? gs[gs.length-1].pos : carryPos;
      }
    });
    return out;
  }

  function renderPathModal(groups, origin){
    groups = _orderMultiFloor(groups, origin);

    // Which floors are covered, and how many stops each.
    var floorsSeen = [];
    groups.forEach(function(g){ if(floorsSeen.indexOf(g.floor)<0) floorsSeen.push(g.floor); });

    var subtitle = $g("pathSubtitle");
    if(subtitle) subtitle.textContent = floorsSeen.map(function(f){return f.toUpperCase();}).join(" → ")+" · "+(gcaOwnerFilter||"All")+" · "+groups.length+" paradas";

    var listEl = $g("gcaPathList");
    var totalDist = 0, totalCoachings = 0, floorChanges = 0;
    groups.forEach(function(g){totalCoachings+=g.entries.length;});
    // Distance is summed per-floor along the AR ring (P1 has no metres yet, so it
    // contributes stops but no metres). Each floor change adds a fixed penalty.
    var prev = null, prevFloor = (origin && origin.floor) ? origin.floor : null;
    for(var i=0;i<groups.length;i++){
      var g = groups[i];
      if(prevFloor && g.floor!==prevFloor){ floorChanges++; prev = null; }  // stairs/lift: reset within-floor walk
      if(_isARFloor(g.floor) && g.mPos!=null){
        if(prev!=null) totalDist += _ringDist(prev, g.mPos, _perimeterMeters(g.floor));
        prev = g.mPos;
      }
      prevFloor = g.floor;
    }
    totalDist = Math.round(totalDist);
    var walkMin = Math.round(totalDist/_PATH_WALK_MPS/60) + floorChanges*2;  // ~2 min per floor change (placeholder until doors)
    var coachMin = totalCoachings*2;

    // KPI cards at the top: total time (walk + coaching), plus stops and floors.
    var totalMin = walkMin + coachMin;
    var h = '<div class="path-kpis">'
      +   '<div class="path-kpi path-kpi-hero"><span class="pk-num">~'+totalMin+'<span class="pk-u">min</span></span><span class="pk-lbl">⏱ Tiempo total</span></div>'
      +   '<div class="path-kpi"><span class="pk-num">'+walkMin+'<span class="pk-u">min</span></span><span class="pk-lbl">🚶 Caminata</span></div>'
      +   '<div class="path-kpi"><span class="pk-num">'+coachMin+'<span class="pk-u">min</span></span><span class="pk-lbl">🎓 Coaching</span></div>'
      +   '<div class="path-kpi"><span class="pk-num">'+totalCoachings+'</span><span class="pk-lbl">'+groups.length+' paradas · '+floorsSeen.length+' planta'+(floorsSeen.length!==1?'s':'')+'</span></div>'
      + '</div>';
    if(floorChanges>0) h += '<div class="path-subnote">↕ '+floorChanges+' cambio'+(floorChanges!==1?'s':'')+' de planta incluidos</div>';
    if(!origin) h += '<div class="path-subnote">📍 Elige dónde estás (arriba) para optimizar la ruta.</div>';
    // One CARD per coaching (not per station) — the coach works down the list and
    // acts inline. Cards are grouped by floor with a clear divider; on a floor
    // CHANGE we insert a transition banner telling the coach how to move (the
    // side where they finished the previous floor = where they enter the next).
    var lastFloor = null, lastSideName = null;
    var _sideName = {N:"Norte", S:"Sur", E:"Este", O:"Oeste"};
    for(var i=0;i<groups.length;i++){
      var g = groups[i];
      if(g.floor!==lastFloor){
        // Side this floor's first stop sits on (where you arrive/enter).
        var firstSide = _isARFloor(g.floor) && g.num ? _arSide(g.num, g.floor) : null;
        if(lastFloor===null){
          h += '<div class="path-floor-hd">🏢 '+g.floor.toUpperCase()+(firstSide?' · empieza en '+_sideName[firstSide]:'')+'</div>';
        } else {
          // Transition: finished lastFloor, now move to this floor.
          var arrow = (_FLOOR_ORDER[g.floor]||9) > (_FLOOR_ORDER[lastFloor]||0) ? "⬆ Sube" : "⬇ Baja";
          h += '<div class="path-floor-move">'+arrow+' a <b>'+g.floor.toUpperCase()+'</b>'
             + (firstSide? ' por el <b>'+_sideName[firstSide]+'</b>' : '')
             + '</div>';
          h += '<div class="path-floor-hd">🏢 '+g.floor.toUpperCase()+'</div>';
        }
        lastFloor = g.floor;
      }
      for(var j=0;j<g.entries.length;j++){
        var it = g.entries[j].item;
        var login = it.login || "?";
        var insight = it.insight || it.course_title || it.reason || "Coaching";
        var iid = it.id || "";
        var stLbl = _groupLabel(g)+" · "+_groupTypeShort(g);
        var photo = badgePhotoUrl ? badgePhotoUrl(login) : ("https://badgephotos.amazon.com/?fallback=no&login="+encodeURIComponent(login));
        // CALM code resolved AUTOMATICALLY from the official wiki (course→code),
        // with the process→feed fallback. No manual pick — the coach just sees
        // where the associate will be logged (e.g. STWFEED) and hits Logar.
        var courseName = it.course_title || it.course || insight;
        var calmCode = _resolveCalmCode(courseName, it.process);
        // Chip shows the resolved code and is clickable to override ("Other") in
        // case the coach needs a variation the wiki map didn't cover.
        var calmChip = calmCode
          ? '<span class="path-calm-chip" role="button" tabindex="0" title="Se logará aquí. Click para cambiar (Other).">🎓 <span class="pcc-code">'+esc(calmCode)+'</span> ▾</span>'
          : '<span class="path-calm-chip path-calm-unk" role="button" tabindex="0" title="Sin código oficial — click para elegir uno">CALM ? ▾</span>';
        h += '<div class="path-card" data-iid="'+esc(iid)+'" id="pcard_'+esc(iid)+'">'
          +   '<div class="path-card-hd">'
          +     '<span class="path-num">'+(i+1)+'</span>'
          +     '<img class="path-photo" src="'+esc(photo)+'" onerror="this.style.visibility=\'hidden\'">'
          +     '<div class="path-who"><b>'+esc(login)+'</b><span class="path-st">'+esc(stLbl)+'</span></div>'
          +     calmChip
          +   '</div>'
          +   '<div class="path-insight">'+esc(insight)+'</div>'
          +   '<div class="path-acts">'
          +     '<button class="path-btn pb-log"   data-login="'+esc(login)+'" data-eid="'+esc(it.employee_id||"")+'" data-proc="'+esc(it.process||"")+'" data-calm="'+esc(calmCode)+'" title="Loguear en '+esc(calmCode||"CALM")+'">🎓 Logar</button>'
          +     '<button class="path-btn pb-stop"  data-login="'+esc(login)+'" data-eid="'+esc(it.employee_id||"")+'" title="Deslogar (STOP)">⏹ Stop</button>'
          +     '<button class="path-btn pb-cmt"   data-iid="'+esc(iid)+'" data-login="'+esc(login)+'" data-eid="'+esc(it.employee_id||"")+'" title="Comentar / cerrar con nota">💬</button>'
          +     '<button class="path-btn pb-close" data-iid="'+esc(iid)+'" data-login="'+esc(login)+'" data-eid="'+esc(it.employee_id||"")+'" title="Completar coaching">✓ Cerrar</button>'
          +   '</div>'
          + '</div>';
      }
    }

    // ── On-site WITHOUT a mapped station ────────────────────────────────────
    // Can't route to them (no location), but the trainer shouldn't forget them.
    // Listed at the bottom as lightweight cards with the SAME actions.
    var _ns = (window._pathCtx && window._pathCtx.noStation) || [];
    if(_ns.length){
      h += '<div class="path-floor-hd path-ns-hd">📍 Sin estación ubicada · '+_ns.length+' (no ruteable)</div>';
      h += '<div class="path-ns-note">Estos coachings están On-site pero sin estación física en el mapa — hazlos cuando los cruces.</div>';
      _ns.forEach(function(it){
        var login=it.login||"?", insight=it.insight||it.course_title||it.reason||"Coaching", iid=it.id||"";
        var photo = badgePhotoUrl ? badgePhotoUrl(login) : ("https://badgephotos.amazon.com/?fallback=no&login="+encodeURIComponent(login));
        var calmCode = _resolveCalmCode(it.course_title||it.course||insight, it.process);
        var calmChip = calmCode
          ? '<span class="path-calm-chip" role="button" tabindex="0" title="Se logará aquí. Click para cambiar (Other).">🎓 <span class="pcc-code">'+esc(calmCode)+'</span> ▾</span>'
          : '<span class="path-calm-chip path-calm-unk" role="button" tabindex="0" title="Sin código oficial — click para elegir uno">CALM ? ▾</span>';
        h += '<div class="path-card path-card-ns" data-iid="'+esc(iid)+'" id="pcard_'+esc(iid)+'">'
          +   '<div class="path-card-hd">'
          +     '<span class="path-num path-num-ns">•</span>'
          +     '<img class="path-photo" src="'+esc(photo)+'" onerror="this.style.visibility=\'hidden\'">'
          +     '<div class="path-who"><b>'+esc(login)+'</b><span class="path-st">'+esc(it.presence||"On-site")+' · sin estación</span></div>'
          +     calmChip
          +   '</div>'
          +   '<div class="path-insight">'+esc(insight)+'</div>'
          +   '<div class="path-acts">'
          +     '<button class="path-btn pb-log"   data-login="'+esc(login)+'" data-eid="'+esc(it.employee_id||"")+'" data-proc="'+esc(it.process||"")+'" data-calm="'+esc(calmCode)+'" title="Loguear en '+esc(calmCode||"CALM")+'">🎓 Logar</button>'
          +     '<button class="path-btn pb-stop"  data-login="'+esc(login)+'" data-eid="'+esc(it.employee_id||"")+'" title="Deslogar (STOP)">⏹ Stop</button>'
          +     '<button class="path-btn pb-cmt"   data-iid="'+esc(iid)+'" data-login="'+esc(login)+'" data-eid="'+esc(it.employee_id||"")+'" title="Comentar / cerrar con nota">💬</button>'
          +     '<button class="path-btn pb-close" data-iid="'+esc(iid)+'" data-login="'+esc(login)+'" data-eid="'+esc(it.employee_id||"")+'" title="Completar coaching">✓ Cerrar</button>'
          +   '</div>'
          + '</div>';
      });
    }
    listEl.innerHTML = h;
    _wirePathCardActions(listEl);

    // Map panel: ONE CONTINUOUS route, not floor tabs. Every present floor is
    // stacked vertically in ROUTE order (the floor you visit first on top), with
    // a transition connector between them ("⬆ Sube a P2 por el Este"). This reads
    // as a single walk P1→P2→P3, not a filter you flip between.
    var mapEl = $g("gcaPathMap");
    if(!mapEl) return;
    mapEl.innerHTML = "";
    // Floors in the order the ROUTE visits them (first occurrence in `groups`).
    var routeFloors = [];
    groups.forEach(function(g){ if(routeFloors.indexOf(g.floor)<0) routeFloors.push(g.floor); });
    var _sideNameM = {N:"Norte", S:"Sur", E:"Este", O:"Oeste"};

    routeFloors.forEach(function(fl, fi){
      if(fi>0){
        // Connector between floors — where you finish the previous = where you
        // enter this one (first stop's side).
        var firstG = null;
        for(var q=0;q<groups.length;q++){ if(groups[q].floor===fl){ firstG=groups[q]; break; } }
        var entrySide = (firstG && _isARFloor(fl) && firstG.num) ? _arSide(firstG.num, fl) : null;
        var prevFl = routeFloors[fi-1];
        var arrow = (_FLOOR_ORDER[fl]||9) > (_FLOOR_ORDER[prevFl]||0) ? "⬆ Sube" : "⬇ Baja";
        var conn = document.createElement("div");
        conn.className = "path-map-connector";
        conn.innerHTML = arrow+' a <b>'+fl.toUpperCase()+'</b>'+(entrySide?' por el <b>'+_sideNameM[entrySide]+'</b>':'');
        mapEl.appendChild(conn);
      }
      var hd = document.createElement("div");
      hd.className = "path-map-floor-title";
      var nStops = groups.filter(function(g){return g.floor===fl;}).length;
      hd.innerHTML = '🏢 <b>'+fl.toUpperCase()+'</b> · '+nStops+' parada'+(nStops!==1?'s':'');
      mapEl.appendChild(hd);
      var canvas = document.createElement("div"); canvas.className = "path-map-canvas";
      mapEl.appendChild(canvas);
      _drawFloorMap(canvas, groups, fl);
    });
  }

  // Cardinal side of an AR station: top=Norte, bottom=Sur, right=Este, left=Oeste
  // (owner's convention). The layout ARRAYS are the source of truth (owner-
  // confirmed 2026-07-30: N=2197→2104, S=2306→2395, E=2494→2422, O=2295→2211),
  // so we check which side-list contains the station FIRST; only fall back to
  // number ranges for stations the layout doesn't list.
  function _arSide(stNum, floor){
    var arr = floor ? _getPathArrays()[floor] : null;
    if(arr){
      if(arr.top.indexOf(stNum)>=0)    return "N";
      if(arr.right.indexOf(stNum)>=0)  return "E";
      if(arr.bottom.indexOf(stNum)>=0) return "S";
      if(arr.left.indexOf(stNum)>=0)   return "O";
    }
    var base = stNum >= 3000 ? stNum - 1000 : stNum;
    if(base >= 2104 && base <= 2197) return "N";
    if(base >= 2200 && base <= 2295) return "O";
    if(base >= 2306 && base <= 2395) return "S";
    if(base >= 2422 && base <= 2494) return "E";
    return "N";
  }

  // Draw ONE floor: the real ring frame (N top / P2R band / O·center·E / S bottom)
  // but ONLY the coaching stops — empty stations are dropped (they add nothing).
  // Stops keep their true cardinal side + order, and a clean perimeter line
  // connects them 1→🏁 riding the frame (no crossing through the centre).
  function _drawFloorMap(canvas, groups, floor){
    canvas.innerHTML = "";
    if(!_isARFloor(floor)){ _renderP1Map(canvas, groups, floor); return; }

    // Collect this floor's coaching stops (global route seq), split ring vs P2R.
    var sides = {N:[], E:[], S:[], O:[]}, p2rSeq = [], lastSeq=0, firstSeq=1e9; var _s=0;
    groups.forEach(function(g){
      _s++;
      if(g.floor!==floor) return;
      lastSeq=Math.max(lastSeq,_s); firstSeq=Math.min(firstSeq,_s);
      if(g.parsed && g.parsed.p2r){ p2rSeq.push({seq:_s, parsed:g.parsed}); }
      else if(g.num){ var sd=_arSide(g.num, floor); (sides[sd]||sides.N).push({seq:_s, num:g.num, pos:_stationMeters(g.num,floor)}); }
    });
    if(!lastSeq){ canvas.innerHTML = '<div class="path-map-empty">Sin paradas en '+floor.toUpperCase()+'.</div>'; return; }
    // order each side by real perimeter position
    ["N","E","S","O"].forEach(function(sd){ sides[sd].sort(function(a,b){return a.pos-b.pos;}); });

    function cell(s, extraCls){
      var isLast = s.seq===lastSeq, isFirst = s.seq===firstSeq;
      var cls = "pm-stop "+(extraCls||"")+(isFirst?" pc-first":"")+(isLast?" pc-last":"");
      var badge = isLast ? "🏁" : String(s.seq);
      var typeLbl = s.parsed ? "P2R" : pathTypeLabel(s.num);
      var numLbl  = s.parsed ? ("m"+(s.parsed.wall||"?")+"·"+(s.parsed.face||s.parsed.pos||"?")) : String(s.num);
      return '<div class="'+cls+'" data-seq="'+s.seq+'"><span class="pc-badge">'+badge+'</span>'
        + '<span class="sm-type">'+typeLbl+'</span><span class="sm-num">'+numLbl+'</span></div>';
    }
    function row(list, cl){ return list.map(function(s){return cell(s,cl);}).join("") || '<span class="pc-none">—</span>'; }

    p2rSeq.sort(function(a,b){ return (a.parsed.wall||0)-(b.parsed.wall||0); });
    var p2rBand = p2rSeq.length
      ? '<div class="pm-row pm-p2r"><span class="pc-dir">P2R</span><div class="pm-stops">'+row(p2rSeq,"sm-p2r")+'</div></div>'
      : '';

    canvas.innerHTML =
        '<div class="path-frame">'
      +   '<div class="pm-row pm-n"><span class="pc-dir">N · Norte</span><div class="pm-stops">'+row(sides.N)+'</div></div>'
      +   p2rBand
      +   '<div class="pm-mid">'
      +     '<div class="pm-col pm-w"><span class="pc-dir">O</span><div class="pm-stops pm-vert">'+row(sides.O)+'</div></div>'
      +     '<div class="pm-center"><div class="pc-floor">'+floor.toUpperCase()+'</div><div class="pc-legend"><span class="pc-lg-start">● inicio</span><span class="pc-lg-end">🏁 fin</span></div></div>'
      +     '<div class="pm-col pm-e"><span class="pc-dir">E</span><div class="pm-stops pm-vert">'+row(sides.E)+'</div></div>'
      +   '</div>'
      +   '<div class="pm-row pm-s"><div class="pm-stops">'+row(sides.S)+'</div><span class="pc-dir">S · Sur</span></div>'
      + '</div>';
    // No connecting line — on a schematic (not-to-scale) frame a literal line
    // reads as a huge detour. The numbered badges (● 1 → 2 → 🏁) convey the order
    // cleanly, like real pick-path maps.
  }

  // Clean connecting line that rides the perimeter frame (never crosses centre).
  // Instead of straight point-to-point, it routes each hop through frame corner
  // waypoints so the line hugs the ring like a real walk. Redrawn after layout.
  function _drawPerimeterLine(canvas){
    var NS="http://www.w3.org/2000/svg";
    function draw(){
      var old=canvas.querySelector("svg.pm-line"); if(old) old.remove();
      var frame=canvas.querySelector(".path-frame"); if(!frame) return;
      var box=frame.getBoundingClientRect();
      var cells=Array.prototype.slice.call(canvas.querySelectorAll(".pm-stop[data-seq]"));
      if(cells.length<2) return;
      cells.sort(function(a,b){return (+a.getAttribute("data-seq"))-(+b.getAttribute("data-seq"));});
      var pts=cells.map(function(c){var r=c.getBoundingClientRect();return {x:(r.left+r.width/2)-box.left, y:(r.top+r.height/2)-box.top};});
      // corner ring just inside the frame edges
      var pad=14, TL={x:pad,y:pad}, TR={x:box.width-pad,y:pad}, BR={x:box.width-pad,y:box.height-pad}, BL={x:pad,y:box.height-pad};
      var ring=[TL,TR,BR,BL];
      function near(p){var bi=0,bd=1e9;for(var i=0;i<4;i++){var d=Math.hypot(ring[i].x-p.x,ring[i].y-p.y);if(d<bd){bd=d;bi=i;}}return bi;}
      // does a straight seg pass near the centre? (centre box ~ inner 40%)
      var cx1=box.width*0.28, cx2=box.width*0.72, cy1=box.height*0.30, cy2=box.height*0.70;
      function crosses(a,b){for(var t=0.15;t<1;t+=0.15){var x=a.x+(b.x-a.x)*t,y=a.y+(b.y-a.y)*t;if(x>cx1&&x<cx2&&y>cy1&&y<cy2)return true;}return false;}
      function route(a,b){
        if(!crosses(a,b)) return [a,b];
        var ia=near(a), ib=near(b), out=[a];
        var dir=1, i=ia, guard=0;
        // walk corners the short way from ia to ib
        var cw=(ib-ia+4)%4, ccw=(ia-ib+4)%4; dir=(cw<=ccw)?1:-1;
        i=ia; while(guard++<5){ out.push(ring[i]); if(i===ib) break; i=(i+dir+4)%4; }
        out.push(b); return out;
      }
      var wp=[pts[0]];
      for(var i=1;i<pts.length;i++){ var seg=route(pts[i-1],pts[i]); for(var k=1;k<seg.length;k++) wp.push(seg[k]); }
      var svg=document.createElementNS(NS,"svg");
      svg.setAttribute("class","pm-line");
      svg.setAttribute("style","position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none;z-index:1;overflow:visible");
      var d="M "+wp.map(function(p){return p.x.toFixed(1)+" "+p.y.toFixed(1);}).join(" L ");
      var halo=document.createElementNS(NS,"path");
      halo.setAttribute("d",d);halo.setAttribute("fill","none");halo.setAttribute("stroke","var(--accent)");
      halo.setAttribute("stroke-width","8");halo.setAttribute("stroke-linejoin","round");halo.setAttribute("stroke-linecap","round");halo.setAttribute("opacity","0.14");
      svg.appendChild(halo);
      var p=document.createElementNS(NS,"path");
      p.setAttribute("d",d);p.setAttribute("fill","none");p.setAttribute("stroke","var(--accent)");
      p.setAttribute("stroke-width","2.5");p.setAttribute("stroke-linejoin","round");p.setAttribute("stroke-linecap","round");p.setAttribute("stroke-dasharray","1 6");
      svg.appendChild(p);
      var fr=canvas.querySelector(".path-frame"); fr.insertBefore(svg, fr.firstChild);
    }
    if(window.requestAnimationFrame) requestAnimationFrame(draw); else setTimeout(draw,30);
    setTimeout(draw,130);
  }

  // Schematic P1 (pack) map — orientative, not to scale. Lays the pack zones out
  // left→right in physical flow order (Receive → Induct → AFE → Rebin → Singles
  // → WS) using the owner's colour key (Receive=red, AFE=pink, Singles=blue,
  // WS=black). Only the coaching stops on P1 are shown, numbered in route order,
  // and the same walking line is drawn over them.
  var _P1_ZONES = [
    {type:"decant",  label:"Receive",  color:"#dc2626"},
    {type:"induct",  label:"Induct",   color:"#f59e0b"},
    {type:"afe",     label:"AFE",      color:"#ec4899"},
    {type:"rebin",   label:"Rebin",    color:"#a855f7"},
    {type:"singles", label:"Singles",  color:"#3b82f6"},
    {type:"ws",      label:"WS",       color:"#334155"}
  ];
  function _renderP1Map(mapEl, groups, floor){
    // stops on this floor, in route order → sequential number
    var stops = []; var _seq=0;
    groups.forEach(function(g){ _seq++; if(g.floor===floor){ stops.push({g:g, seq:_seq}); } });
    var byZone = {};
    stops.forEach(function(s){ var ty=(s.g.parsed&&s.g.parsed.type)||"?"; (byZone[ty]=byZone[ty]||[]).push(s); });

    var wrap = document.createElement("div");
    wrap.style.cssText = "display:flex;gap:8px;align-items:stretch;min-height:360px;padding:6px 2px;position:relative";
    _P1_ZONES.forEach(function(z){
      var col = document.createElement("div");
      col.style.cssText = "flex:1;display:flex;flex-direction:column;border:1px solid var(--border);border-radius:8px;padding:6px 5px;background:var(--bg-input);min-width:0";
      var hd = document.createElement("div");
      hd.style.cssText = "font-size:10px;font-weight:800;text-align:center;margin-bottom:6px;padding-bottom:4px;border-bottom:2px solid "+z.color+";color:"+z.color;
      hd.textContent = z.label;
      col.appendChild(hd);
      var list = byZone[z.type] || [];
      if(!list.length){
        var empty = document.createElement("div");
        empty.style.cssText = "flex:1;display:flex;align-items:center;justify-content:center;opacity:.25;font-size:9px;color:var(--text-muted)";
        empty.textContent = "—";
        col.appendChild(empty);
      } else {
        list.forEach(function(s){
          var cell = document.createElement("div");
          cell.className = "p1-stop"; cell.setAttribute("data-seq", s.seq);
          cell.style.cssText = "position:relative;margin:3px 0;padding:6px 4px;border-radius:6px;border:1px solid "+z.color+";background:"+z.color+"1a;font-size:9.5px;text-align:center;color:var(--text)";
          cell.innerHTML = '<span style="position:absolute;top:-7px;left:50%;transform:translateX(-50%);width:14px;height:14px;border-radius:50%;background:var(--accent);color:#fff;font-size:8px;font-weight:700;display:flex;align-items:center;justify-content:center;z-index:2">'+s.seq+'</span>'
            + esc(_groupLabel(s.g).replace(/^(AFE\d*|Rebin|Induct muro|Singles|WS|Receive\/Decant)\s*/,""));
          col.appendChild(cell);
        });
      }
      wrap.appendChild(col);
    });
    mapEl.appendChild(wrap);
    // No line on P1 either — numbered badges convey the zone order.
  }

  // Overlay an SVG polyline connecting the on-path stations in route order. The
  // walking line must RIDE THE PERIMETER, never cross the AR ring interior (you
  // can't walk through the racking — only around it). We route each hop around
  // the forbidden centre rectangle (the .pc-center / dashed void) by inserting
  // corner waypoints, so the line hugs the outer aisle.
  function _drawPathLine(mapEl, selector){
    var sel = selector || ".sm-station.on-path[data-seq]";
    var NS = "http://www.w3.org/2000/svg";
    function draw(){
      var old = mapEl.querySelector("svg.path-line-svg"); if(old) old.remove();
      var box = mapEl.getBoundingClientRect();
      var cells = Array.prototype.slice.call(mapEl.querySelectorAll(sel));
      if(cells.length < 2) return;
      cells.sort(function(a,b){ return (+a.getAttribute("data-seq")) - (+b.getAttribute("data-seq")); });
      var pts = cells.map(function(c){
        var r = c.getBoundingClientRect();
        return {x:(r.left+r.width/2)-box.left, y:(r.top+r.height/2)-box.top};
      });

      // Forbidden interior = the .pc-center void (AR ring core). If present, we
      // route hops around it along its 4 corners instead of straight through.
      var voidEl = mapEl.querySelector(".pc-center");
      var vr = null;
      if(voidEl){
        var b = voidEl.getBoundingClientRect();
        vr = {x1:b.left-box.left, y1:b.top-box.top, x2:b.right-box.left, y2:b.bottom-box.top};
      }
      function segCrossesVoid(a, b){
        if(!vr) return false;
        // quick reject
        if(Math.max(a.x,b.x) < vr.x1 || Math.min(a.x,b.x) > vr.x2 ||
           Math.max(a.y,b.y) < vr.y1 || Math.min(a.y,b.y) > vr.y2) return false;
        // sample the segment; if any midpoint lands inside the void → crosses
        for(var t=0.1;t<1;t+=0.1){
          var x=a.x+(b.x-a.x)*t, y=a.y+(b.y-a.y)*t;
          if(x>vr.x1 && x<vr.x2 && y>vr.y1 && y<vr.y2) return true;
        }
        return false;
      }
      // Corners of the outer aisle (just outside the void rectangle).
      function corners(){
        var pad=6;
        return {
          TL:{x:vr.x1-pad,y:vr.y1-pad}, TR:{x:vr.x2+pad,y:vr.y1-pad},
          BR:{x:vr.x2+pad,y:vr.y2+pad}, BL:{x:vr.x1-pad,y:vr.y2+pad}
        };
      }
      // Route a→b around the void: go to the nearest corner on a's side, then
      // follow corners to the one nearest b, then to b. Both directions checked;
      // pick the shorter corner chain.
      function routeAround(a, b){
        if(!segCrossesVoid(a,b)) return [a,b];
        var C=corners(), order=[C.TL,C.TR,C.BR,C.BL];
        function nearest(p){ var bi=0,bd=1e9; for(var i=0;i<4;i++){var d=Math.hypot(order[i].x-p.x,order[i].y-p.y); if(d<bd){bd=d;bi=i;}} return bi; }
        var ia=nearest(a), ib=nearest(b);
        function chain(dir){
          var out=[], i=ia;
          for(var g=0; g<5; g++){ out.push(order[i]); if(i===ib) break; i=(i+dir+4)%4; }
          return out;
        }
        var cw=chain(1), ccw=chain(-1);
        var pick = (cw.length<=ccw.length)?cw:ccw;
        return [a].concat(pick, [b]);
      }

      // Build the full waypoint list, routing each hop around the void.
      var wp=[pts[0]];
      for(var i=1;i<pts.length;i++){
        var seg=routeAround(pts[i-1], pts[i]);
        for(var k=1;k<seg.length;k++) wp.push(seg[k]);
      }

      var svg = document.createElementNS(NS,"svg");
      svg.setAttribute("class","path-line-svg");
      svg.setAttribute("style","position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none;z-index:1;overflow:visible");
      var defs = document.createElementNS(NS,"defs");
      defs.innerHTML = '<marker id="pathArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="var(--accent)"/></marker>';
      svg.appendChild(defs);
      var d = "M "+wp.map(function(p){return p.x.toFixed(1)+" "+p.y.toFixed(1);}).join(" L ");
      var halo = document.createElementNS(NS,"path");
      halo.setAttribute("d", d); halo.setAttribute("fill","none");
      halo.setAttribute("stroke","var(--accent)"); halo.setAttribute("stroke-width","7");
      halo.setAttribute("stroke-linejoin","round"); halo.setAttribute("stroke-linecap","round");
      halo.setAttribute("opacity","0.15");
      svg.appendChild(halo);
      var path = document.createElementNS(NS,"path");
      path.setAttribute("d", d); path.setAttribute("fill","none");
      path.setAttribute("stroke","var(--accent)"); path.setAttribute("stroke-width","3");
      path.setAttribute("stroke-linejoin","round"); path.setAttribute("stroke-linecap","round");
      path.setAttribute("stroke-dasharray","2 7");
      path.setAttribute("marker-end","url(#pathArrow)");
      svg.appendChild(path);
      // Direction arrowheads at each ORIGINAL stop hop midpoint.
      for(var j=1;j<pts.length;j++){
        var a=pts[j-1], b=pts[j], mx=(a.x+b.x)/2, my=(a.y+b.y)/2;
        var seg2 = document.createElementNS(NS,"path");
        seg2.setAttribute("d","M "+a.x.toFixed(1)+" "+a.y.toFixed(1)+" L "+mx.toFixed(1)+" "+my.toFixed(1));
        seg2.setAttribute("fill","none"); seg2.setAttribute("stroke","transparent"); seg2.setAttribute("stroke-width","1");
        seg2.setAttribute("marker-end","url(#pathArrow)");
        // only show the straight direction hint when it doesn't cut the void
        if(!segCrossesVoid(a,b)) svg.appendChild(seg2);
      }
      mapEl.insertBefore(svg, mapEl.firstChild);
    }
    if(window.requestAnimationFrame){ requestAnimationFrame(draw); }
    else { setTimeout(draw, 30); }
    setTimeout(draw, 120);
  }

  // Wire the 4 inline actions on each path card. Log/Stop hit the CALM endpoints
  // directly (no modal needed — the card already carries login+badge+process).
  // Comment/Close reuse the existing openCloseCoaching modal (comment = same modal,
  // the coach types a note before completing). Feedback is shown inline per card.
  function _wirePathCardActions(root){
    if(!root) return;
    function _flash(btn, txt, ok){
      var prev = btn.textContent; btn.disabled = true; btn.style.opacity = ".6"; btn.textContent = "…";
      return function(){ btn.disabled=false; btn.style.opacity="1"; btn.textContent = txt!=null?txt:prev;
        if(ok!=null) btn.style.color = ok ? "var(--green,#16a34a)" : "var(--red,#dc2626)"; };
    }
    async function _calm(kind, btn){
      var login = btn.getAttribute("data-login")||"";
      var badge = String(btn.getAttribute("data-eid")||"").replace(/\D/g,"");
      var proc  = btn.getAttribute("data-proc")||"";
      var calm  = btn.getAttribute("data-calm")||"";   // official code resolved from the wiki
      var done = _flash(btn);
      try{
        var url = kind==="stop" ? (API+"/api/coaching/calm-stop") : (API+"/api/coaching/calm-log");
        // Send the resolved wiki code as calm_code; the server uses it verbatim
        // and only falls back to its process map if it's empty.
        var body = kind==="stop" ? {fc:currentFC, login:login, badge:badge}
                                 : {fc:currentFC, login:login, badge:badge, process:proc, calm_code:calm};
        var r = await fetch(url, {method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(body)});
        var j = await r.json().catch(function(){return {};});
        if(!r.ok || !j.ok) throw new Error((j&&j.detail)||("HTTP "+r.status));
        var loggedCode = (j && j.calm_code) ? j.calm_code : calm;
        done(kind==="stop" ? "⏹ Stop ✓" : ("🎓 "+(loggedCode||"Log")+" ✓"), true);
      }catch(e){ done(kind==="stop"?"⏹ Stop":"🎓 Logar", false); showToast({title:"CALM "+kind, body:String(e.message||e), type:"err", ms:4000}); }
    }
    root.querySelectorAll(".pb-log").forEach(function(b){ b.addEventListener("click", function(){ _calm("log", b); }); });
    root.querySelectorAll(".pb-stop").forEach(function(b){ b.addEventListener("click", function(){ _calm("stop", b); }); });
    // CALM chip → override the code ("Other"). Prompts with the valid codes; the
    // chosen code updates both the chip and the Logar button's data-calm.
    function _overrideCalm(chip){
      var card = chip.closest(".path-card");
      var logBtn = card ? card.querySelector(".pb-log") : null;
      var cur = logBtn ? (logBtn.getAttribute("data-calm")||"") : "";
      var codes = (_calmCatalog.codes||[]);
      var msg = "Código CALM a usar"+(codes.length? " (válidos: "+codes.slice(0,40).join(", ")+(codes.length>40?"…":"")+")":"")+":";
      var next = window.prompt(msg, cur);
      if(next==null) return;
      next = String(next).trim().toUpperCase();
      if(!next) return;
      if(logBtn) logBtn.setAttribute("data-calm", next);
      var codeEl = chip.querySelector(".pcc-code");
      if(codeEl) codeEl.textContent = next;
      else { chip.classList.remove("path-calm-unk"); chip.innerHTML = '🎓 <span class="pcc-code">'+esc(next)+'</span> ▾'; }
      if(logBtn) logBtn.setAttribute("title", "Loguear en "+next);
    }
    root.querySelectorAll(".path-calm-chip").forEach(function(chip){
      chip.addEventListener("click", function(){ _overrideCalm(chip); });
      chip.addEventListener("keydown", function(e){ if(e.key==="Enter"||e.key===" "){ e.preventDefault(); _overrideCalm(chip); } });
    });
    // Comment + Close both open the close modal (comment = write a note; the coach
    // can complete from there). Instance id + login come from the card.
    function _openClose(b, action){
      var iid = b.getAttribute("data-iid")||"";
      if(!iid){ showToast({title:"Sin instance_id", body:"Refresca GCA para poder cerrar.", type:"warn"}); return; }
      // The resolved CALM code lives on the card's Logar button — surface it in
      // the modal read-only (path mode hides the process picker).
      var card = $g("pcard_"+iid);
      var logBtn = card ? card.querySelector(".pb-log") : null;
      var pathCalm = logBtn ? (logBtn.getAttribute("data-calm")||"") : "";
      // The close/comment modal (.modal-overlay, z-index 1000) sits BELOW the path
      // modal (z-index 9000), so opened from a path card it appears behind and
      // can't be typed in. Lift it above the path while open; a MutationObserver
      // restores the z-index the moment it loses the `show` class (any close
      // path — success, cancel, or backdrop click), no callback wiring needed.
      var cm = $g("modalCloseCoaching");
      if(cm){
        var prevZ = cm.style.zIndex;
        cm.style.zIndex = "9500";
        var obs = new MutationObserver(function(){
          if(!cm.classList.contains("show")){ cm.style.zIndex = prevZ; obs.disconnect(); }
        });
        obs.observe(cm, {attributes:true, attributeFilter:["class"]});
      }
      openCloseCoaching({ fc:currentFC, login:b.getAttribute("data-login")||"", employee_id:b.getAttribute("data-eid")||"",
        badge:b.getAttribute("data-eid")||"", instanceId:iid, action:action,
        hideCalm:true, pathCalm:pathCalm,
        onDone:function(){ var c=$g("pcard_"+iid); if(c){ c.style.opacity=".5"; c.querySelector(".path-acts").innerHTML='<span style="font-size:11px;color:var(--green,#16a34a)">✓ hecho</span>'; } } });
    }
    root.querySelectorAll(".pb-close").forEach(function(b){ b.addEventListener("click", function(){ _openClose(b, "complete"); }); });
    root.querySelectorAll(".pb-cmt").forEach(function(b){ b.addEventListener("click", function(){ _openClose(b, "complete"); }); });
  }


})();

  // ── Adoption dashboard REMOVED from the UI (2026-07-29) ─────────────────────
  // Button retired 2026-07-24, modal removed 2026-07-29. Usage is now recorded
  // by /api/usage/ping on first human interaction (see _maybePingUsage). The
  // /api/adoption endpoint + argos_usage.csv remain for out-of-band analysis.

  // ── Exempt zone (admin) — exclude associates from coaching ──────────────────
  // Two scopes: "process" (Performance + Quality for a process/ALL) and "topic"
  // (Quality-only, one error topic — still shows in Performance).
  let _exTopicsLoaded = false;
  function _exToggleScope(){
    const scope = $("ex-scope")?.value || "process";
    if($("ex-process-wrap")) $("ex-process-wrap").style.display = (scope==="topic") ? "none" : "";
    if($("ex-topic-wrap"))   $("ex-topic-wrap").style.display   = (scope==="topic") ? "" : "none";
  }
  async function _loadExemptList(){
    const wrap = $("ex-list"); if(!wrap) return;
    wrap.innerHTML = `<div class="hmodal-empty">Cargando…</div>`;
    try{
      const d = await jget(`${API}/api/admin/exemptions`);
      // Populate the Quality-topic dropdown once (from the server catalog).
      if(!_exTopicsLoaded && $("ex-topic")){
        const tops = d.topics || [];
        $("ex-topic").innerHTML = tops.map(t=>`<option value="${esc(t.key)}">${esc(t.label)}</option>`).join("")
          || `<option value="">(sin temas)</option>`;
        _exTopicsLoaded = true;
      }
      const items = d.exemptions || [];
      $("ex-count") && ($("ex-count").textContent = items.length);
      if(!items.length){ wrap.innerHTML = `<div class="hmodal-empty">Sin exenciones.</div>`; return; }
      wrap.innerHTML = items.map(e=>{
        const meta = [e.reason, e.inputer, e.date].filter(Boolean).join(" · ");
        // Chip: red for ALL, blue for a Quality topic, accent for a process.
        let chip;
        if(e.scope === "topic"){
          chip = `<span class="ex-chip ex-topic" title="Solo Calidad — sigue en Performance">📋 ${esc(e.topic)}</span>`;
        }else if((e.process||"").toUpperCase() === "ALL"){
          chip = `<span class="ex-chip ex-all" title="Excluido de todo (Performance + Calidad)">⛔ ALL</span>`;
        }else{
          chip = `<span class="ex-chip ex-proc" title="Performance + Calidad de ${esc(e.process)}">${esc(e.process)}</span>`;
        }
        return `<div class="ex-row">
          <span class="ex-login">${esc(e.login)}</span>
          ${chip}
          <span class="ex-meta" title="${esc(meta)}">${esc(meta)}</span>
          <button class="ex-del-btn" data-login="${esc(e.login)}" data-scope="${esc(e.scope||'process')}" data-process="${esc(e.process||'')}" data-topic="${esc(e.topic||'')}">Quitar</button>
        </div>`;
      }).join("");
      wrap.querySelectorAll(".ex-del-btn").forEach(btn=>{
        btn.addEventListener("click", async ()=>{
          const {login:lg, scope:sc, process:pr, topic:tp} = btn.dataset;
          const what = sc === "topic" ? `el tema ${tp}` : pr;
          if(!confirm(`¿Quitar la exención de ${lg} en ${what}?`)) return;
          try{
            const q = `login=${encodeURIComponent(lg)}&scope=${encodeURIComponent(sc)}&process=${encodeURIComponent(pr)}&topic=${encodeURIComponent(tp)}`;
            const r = await fetch(`${API}/api/admin/exemptions?${q}`, {method:"DELETE"});
            if(!r.ok){ const j=await r.json().catch(()=>({})); throw new Error(j.detail||r.status); }
            _loadExemptList();
          }catch(err){ alert("No se pudo quitar: "+err.message); }
        });
      });
    }catch(err){
      wrap.innerHTML = `<div class="hmodal-empty" style="color:#e53e3e">Error: ${esc(err.message)}</div>`;
    }
  }

  $("ex-scope") && $("ex-scope").addEventListener("change", _exToggleScope);

  if($("btnExempt")) $("btnExempt").addEventListener("click", ()=>{
    openModal("modalExempt");
    $("ex-result") && ($("ex-result").innerHTML = "");
    _exToggleScope();
    _loadExemptList();
  });
  // Exempt zone now lives inside the Settings tab (owner 2026-08-05). Same modal.
  if($("cfgOpenExempt")) $("cfgOpenExempt").addEventListener("click", ()=>{
    openModal("modalExempt");
    $("ex-result") && ($("ex-result").innerHTML = "");
    _exToggleScope();
    _loadExemptList();
  });

  if($("ex-submit")) $("ex-submit").addEventListener("click", async ()=>{
    const login = ($("ex-login")?.value || "").trim();
    const scope = $("ex-scope")?.value || "process";
    const process = $("ex-process")?.value || "ALL";
    const topic = $("ex-topic")?.value || "";
    const reason = ($("ex-reason")?.value || "").trim();
    const res = $("ex-result");
    if(!login){ if(res) res.innerHTML = `<span style="color:#e53e3e">Introduce al menos un login.</span>`; return; }
    if(scope === "topic" && !topic){ if(res) res.innerHTML = `<span style="color:#e53e3e">Elige un tema de Calidad.</span>`; return; }
    const btn = $("ex-submit"); btn.disabled = true; const orig = btn.textContent; btn.textContent = "Guardando…";
    try{
      const d = await jpost(`${API}/api/admin/exemptions`, {login, scope, process, topic, reason});
      const n = (d.added||[]).length;
      if(res) res.innerHTML = `<span style="color:var(--green)">✓ ${n} exención(es) añadida(s). Se aplica en el próximo pipeline.</span>`;
      $("ex-login") && ($("ex-login").value = "");
      $("ex-reason") && ($("ex-reason").value = "");
      _loadExemptList();
    }catch(err){
      if(res) res.innerHTML = `<span style="color:#e53e3e">Error: ${esc(err.message)}</span>`;
    }finally{
      btn.disabled = false; btn.textContent = orig;
    }
  });

  // ── Shift Tracker (admin) — full tab: 24h chart + insights ────────────────
  const ST_COLORS = ["#2563eb","#059669","#d97706","#dc2626","#7c3aed","#0891b2","#db2777"];
  let _stData = null, _stPrevData = null, _stMetric = "plan", _stHidden = new Set(), _stShowPrev = false, _stLoaded = false;
  let _stShiftKey = "", _stLiveTimer = null;   // intra-shift focus + live auto-refresh
  let _stMode = "intraday";                    // "intraday" | "weekly"
  let _stFocus = null;                         // focused process name (single-line view)

  function _stKey(){ return _stMetric === "op2" ? "pct_op2" : "pct_plan"; }
  function _stColor(pct){ return pct==null?"var(--text-dim)":(pct<80?"#dc2626":pct<100?"#d97706":"#059669"); }

  function _stDayOptions(){
    const sel = $("st-day"); if(!sel || sel.options.length) return;
    const opts = []; const now = new Date();
    const MON=["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];
    for(let i=0;i<30;i++){   // last 30 days selectable
      const d = new Date(now); d.setDate(now.getDate()-i);
      const iso = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
      const nice = `${d.getDate()} ${MON[d.getMonth()]}`;
      const lbl = i===0?`Hoy · ${nice}`:(i===1?`Ayer · ${nice}`:nice);
      opts.push(`<option value="${iso}">${lbl}</option>`);
    }
    sel.innerHTML = opts.join("");
  }

  async function _stLoad(refresh){
    const status = $("st-status"), chart = $("st-chart");
    const weekly = _stMode==="weekly";
    if(status) status.textContent = refresh ? (weekly?"Descargando 7 días… (~30s)":"Descargando 48 intervalos… (~30s)") : "Cargando…";
    if(chart && !refresh) chart.innerHTML = `<div class="hmodal-empty" style="padding:40px 0">Cargando…</div>`;
    try{
      let url;
      if(weekly){
        const wk = $("st-week")?.value || "";
        url = `${API}/api/admin/shift-tracker?fc=${encodeURIComponent(currentFC)}&mode=weekly&week_start=${encodeURIComponent(wk)}${refresh?"&refresh=true":""}`;
      }else{
        const day = $("st-day")?.value || "";
        url = `${API}/api/admin/shift-tracker?fc=${encodeURIComponent(currentFC)}&day=${encodeURIComponent(day)}${refresh?"&refresh=true":""}`;
      }
      const d = await jget(url);
      if(!d.ok){ throw new Error(d.error||"error"); }
      _stData = d; _stLoaded = true; _stPrevData = null;
      if(!weekly) _stPopulateShifts();
      // "En vivo" + Day-1 overlay only apply to intraday-today.
      const _now=new Date();
      const _todayIso=`${_now.getFullYear()}-${String(_now.getMonth()+1).padStart(2,"0")}-${String(_now.getDate()).padStart(2,"0")}`;
      const isToday = !weekly && ($("st-day")?.value||"") === _todayIso;
      if($("st-live-wrap")) $("st-live-wrap").style.display = isToday ? "inline-flex" : "none";
      if(!isToday && $("st-live")){ $("st-live").checked=false; _stStopLive(); }
      if(status){
        const genTxt = String(d.generated_at||"").replace("T"," ").slice(0,16);
        status.textContent = weekly ? `Semana · ${genTxt}` : `${(d.intervals||[]).length} intervalos · ${genTxt}${d.has_prev?" · Day-1 disponible":""}`;
      }
      _stRenderAll();
    }catch(err){
      if(chart) chart.innerHTML = `<div class="hmodal-empty" style="color:#e53e3e;padding:40px 0">Error: ${esc(err.message)}</div>`;
      if(status) status.textContent = "";
    }
  }

  function _stRenderAll(){
    // Ensure a focused process exists (first one with data).
    const procs=(_stData&&_stData.core_order||[]).filter(p=>_stData.series&&_stData.series[p]);
    if(!_stFocus || !procs.includes(_stFocus)) _stFocus = procs[0]||null;
    _stRenderHero(); _stRenderChips(); _stRenderChart(); _stRenderShifts(); _stRenderAlerts();
  }

  // Color index for a process (stable by core_order position).
  function _stProcColor(proc){
    const order=(_stData&&_stData.core_order)||[];
    return ST_COLORS[Math.max(0,order.indexOf(proc))%ST_COLORS.length];
  }

  // The headline number for a process. Priority:
  //  weekly → the WEEK aggregate; closed day → necro day_totals (aligned w/ necro);
  //  else the current interval %. All fall back to kpis.
  function _stHeadlineVal(proc){
    const key=_stKey();
    if(_stData.mode==="weekly"){
      const wt=(_stData.week_totals||{})[proc];
      if(wt && wt[key]!=null) return wt[key];
    } else if(_stData.day_totals && _stData.day_totals[proc] && _stData.day_totals[proc][key]!=null){
      return _stData.day_totals[proc][key];   // necro-aligned closed-day number
    }
    const k=((_stData.insights||{})[_stMetric]||{}).kpis||{};
    return (k[proc]||{}).current;
  }

  // Process selector chips: headline % of every process; click focuses one.
  function _stRenderChips(){
    const host=$("st-chips"); if(!host||!_stData) return;
    const ins=(_stData.insights||{})[_stMetric]||{}; const kpis=ins.kpis||{};
    const procs=(_stData.core_order||[]).filter(p=>_stData.series&&_stData.series[p]);
    if(!procs.length){ host.innerHTML=""; return; }
    const weekly=_stData.mode==="weekly";
    host.innerHTML=procs.map(proc=>{
      const k=kpis[proc]||{current:0,trend:0};
      const cur=_stHeadlineVal(proc), col=_stColor(cur);
      const on=proc===_stFocus?"on":"";
      const w=Math.max(4,Math.min(100,cur||0));
      // Trend arrow only meaningful intraday; weekly shows the week tag.
      const meta = weekly
        ? `<span class="c-trend" style="color:var(--text-secondary);font-weight:600">sem</span>`
        : (()=>{const a=k.trend>0.5?"▲":k.trend<-0.5?"▼":"▬";const c=k.trend>0.5?"#059669":k.trend<-0.5?"#dc2626":"var(--text-secondary)";return `<span class="c-trend" style="color:${c}">${a}${Math.abs(k.trend||0)}</span>`;})();
      return `<div class="st-chip ${on}" data-proc="${esc(proc)}">
        <div class="c-name">${esc(proc)}</div>
        <div><span class="c-val" style="color:${col}">${cur==null?"—":cur+"%"}</span>${meta}</div>
        <span class="c-bar" style="width:${w}%;background:${col}"></span>
      </div>`;
    }).join("");
    host.querySelectorAll(".st-chip").forEach(el=>el.addEventListener("click",()=>{
      _stFocus=el.dataset.proc; _stRenderChips(); _stRenderChart();
    }));
  }

  function _stRenderHero(){
    const host=$("st-hero"); if(!host||!_stData) return;
    const ins=(_stData.insights||{})[_stMetric]||{};
    const kpis=ins.kpis||{};
    const procs=(_stData.core_order||[]).filter(p=>_stData.series&&_stData.series[p]);
    if(!procs.length){ host.innerHTML=""; return; }
    const weekly=_stData.mode==="weekly";
    // Headline value per process (weekly=aggregate, intraday=current).
    const val=p=>{ const v=_stHeadlineVal(p); return v==null?0:v; };
    const avgAll=Math.round(procs.reduce((s,p)=>s+val(p),0)/procs.length);
    let leader=procs[0], laggard=procs[0];
    procs.forEach(p=>{ if(val(p)>val(leader)) leader=p; if(val(p)<val(laggard)) laggard=p; });
    const metric=_stMetric==="op2"?"OP2":"Plan";
    const period = weekly
      ? `${_stData.week_label||"Semana"} · ${($("st-week")?.selectedOptions[0]?.textContent||"")}`
      : ($("st-day")?($("st-day").selectedOptions[0]?.textContent||_stData.day):_stData.day);
    const hl=(t,c)=>`<span class="hl" style="background:${c}22;color:${c}">${esc(t)}</span>`;
    let headline=`${hl(leader,'#059669')} lidera con <b>${val(leader)}%</b>`;
    // Bottleneck: worst process this period.
    headline+=` · más bajo: ${hl(laggard,'#dc2626')} <b>${val(laggard)}%</b>`;
    const alerts=(ins.alerts||[]).length;
    const alertLbl = weekly ? "días bajos" : "intervalos";
    host.innerHTML=`
      <div class="st-hero-headline">
        <div class="st-hero-eyebrow">${esc(currentFC)} · ${esc(period)} · vs ${metric}</div>
        <div class="st-hero-title">${headline}</div>
      </div>
      <div class="st-hero-macros">
        <div class="st-macro"><div class="m-lbl">${weekly?"Prom. semana":"Promedio día"}</div><div class="m-val" style="color:${_stColor(avgAll)}">${avgAll}%</div><div class="m-sub">${procs.length} procesos</div></div>
        <div class="st-macro"><div class="m-lbl">Top</div><div class="m-val" style="color:#059669">${val(leader)}%</div><div class="m-sub">${esc(leader)}</div></div>
        <div class="st-macro"><div class="m-lbl">Más bajo</div><div class="m-val" style="color:${_stColor(val(laggard))}">${val(laggard)}%</div><div class="m-sub">${esc(laggard)}</div></div>
        <div class="st-macro"><div class="m-lbl">Caídas &lt;80%</div><div class="m-val" style="color:${alerts?'#dc2626':'#059669'}">${alerts}</div><div class="m-sub">${alertLbl}</div></div>
      </div>`;
  }

  function _stRenderChart(){
    const chart = $("st-chart"); if(!chart || !_stData) return;
    const data = _stData, allLabels = data.intervals || [];
    const procs = (data.core_order||[]).filter(p => data.series && data.series[p]);
    if(!procs.length){ chart.innerHTML = `<div class="hmodal-empty" style="padding:40px 0">Sin datos para este día.</div>`; return; }
    const key = _stKey();
    const weekly = data.mode === "weekly";
    // Intra-shift focus (intraday only): restrict X to the shift's minute range.
    const lblMin = l => { const p=String(l).split(":"); return p.length>=2?(+p[0]*60+ +p[1]):0; };
    let xMinM=0, xMaxM=1440;
    if(!weekly && _stShiftKey){
      const rng=_stShiftRange(_stShiftKey);
      if(rng){ xMinM=rng[0]; xMaxM=rng[1]; }
    }
    // Weekly: every label (day) is shown; intraday: filter by shift minute range.
    const labels = weekly ? allLabels.slice()
                          : allLabels.filter(l=>{ const t=lblMin(l); return t>=xMinM && t<=xMaxM; });
    if(!labels.length){ chart.innerHTML = `<div class="hmodal-empty" style="padding:40px 0">Sin datos en este turno todavía.</div>`; return; }
    const W = Math.max(900, (chart.clientWidth || 1200)), H = 420;
    const padL=48, padR=20, padT=18, padB=44, plotW=W-padL-padR, plotH=H-padT-padB;
    const yMax = _stMetric==="op2"?200:150, yMin=0;
    const spanM = Math.max(1, xMaxM-xMinM);
    const xAt = i => padL + (labels.length<=1?0:(i/(labels.length-1))*plotW);
    const yAt = v => padT + (1-(Math.max(yMin,Math.min(yMax,v))-yMin)/(yMax-yMin))*plotH;
    const minToX = m => padL + ((Math.max(xMinM,Math.min(xMaxM,m))-xMinM)/spanM)*plotW;
    // Catmull-Rom → cubic bezier smoothing for nicer curves.
    const smooth = (pts)=>{
      if(pts.length<2) return pts.length?`M${pts[0][0]} ${pts[0][1]}`:"";
      let d=`M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
      for(let i=0;i<pts.length-1;i++){
        const p0=pts[i-1]||pts[i], p1=pts[i], p2=pts[i+1], p3=pts[i+2]||p2;
        const c1x=p1[0]+(p2[0]-p0[0])/6, c1y=p1[1]+(p2[1]-p0[1])/6;
        const c2x=p2[0]-(p3[0]-p1[0])/6, c2y=p2[1]-(p3[1]-p1[1])/6;
        d+=`C${c1x.toFixed(1)} ${c1y.toFixed(1)} ${c2x.toFixed(1)} ${c2y.toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
      }
      return d;
    };
    let svg = `<svg width="100%" height="${H}" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" style="font-family:inherit;display:block">`;
    // Shift bands (colored bg) + a soft divider + a floating label per band.
    (data.bands||[]).forEach(b=>{
      const x1=minToX(b.start_min), x2=minToX(b.end_min);
      if(x2<=x1+0.5) return;
      svg += `<rect x="${x1.toFixed(1)}" y="${padT}" width="${(x2-x1).toFixed(1)}" height="${plotH}" fill="${b.color}" opacity="0.09"/>`;
      svg += `<line x1="${x1.toFixed(1)}" y1="${padT}" x2="${x1.toFixed(1)}" y2="${H-padB}" stroke="${b.color}" stroke-width="1" opacity="0.25"/>`;
      // Floating label centered in the band (skip tiny slivers).
      if(x2-x1>50){
        const cx=(x1+x2)/2;
        svg += `<text class="st-band-label" x="${cx.toFixed(1)}" y="${(padT+13).toFixed(1)}" text-anchor="middle" fill="${b.color}" opacity="0.85">${esc(String(b.label).toUpperCase())}</text>`;
      }
    });
    const gridVals = _stMetric==="op2"?[0,50,100,150,200]:[0,50,100,150];
    gridVals.forEach(v=>{
      const y=yAt(v), is100=v===100;
      svg += `<line x1="${padL}" y1="${y.toFixed(1)}" x2="${W-padR}" y2="${y.toFixed(1)}" stroke="${is100?'#64748b':'var(--border-strong)'}" stroke-width="${is100?1.5:1}" stroke-dasharray="${is100?'0':'2 4'}"/>`;
      svg += `<text x="${padL-8}" y="${(y+3).toFixed(1)}" text-anchor="end" font-size="11" fill="var(--text-secondary)">${v}%</text>`;
    });
    // X labels: weekly → each day; intraday → hourly (every 1h focused, else 2h).
    if(weekly){
      labels.forEach((lbl,i)=>{ const x=xAt(i); svg += `<text x="${x.toFixed(1)}" y="${H-padB+18}" text-anchor="middle" font-size="11" font-weight="600" fill="var(--text-secondary)">${esc(lbl)}</text>`; });
    }else{
      const _every = _stShiftKey ? 1 : 2;
      labels.forEach((lbl,i)=>{ if(lbl.endsWith(":00") && parseInt(lbl)%_every===0){ const x=xAt(i); svg += `<text x="${x.toFixed(1)}" y="${H-padB+18}" text-anchor="middle" font-size="10" fill="var(--text-secondary)">${lbl}</text>`; }});
    }

    // SINGLE focused process: build its point series.
    const proc=_stFocus||procs[0];
    const color=_stProcColor(proc);
    const seriesPts=(series)=>{
      const cells=(series[proc]||{}); const arr=[];
      labels.forEach((lbl,i)=>{ const c=cells[lbl]; if(!c||c[key]==null) return; const v=c[key]; if(v<=0) return; arr.push([xAt(i),yAt(v),lbl,v]); });
      return arr;
    };
    svg += `<defs><linearGradient id="stgF" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="${color}" stop-opacity="0.22"/><stop offset="100%" stop-color="${color}" stop-opacity="0"/></linearGradient></defs>`;
    // Day-1 overlay (faint dashed) behind today.
    if(_stShowPrev && _stPrevData && _stPrevData.series){
      const arr=seriesPts(_stPrevData.series);
      if(arr.length) svg += `<path d="${smooth(arr)}" fill="none" stroke="${color}" stroke-width="1.6" stroke-dasharray="5 4" opacity="0.4"/>`;
    }
    const arr=seriesPts(data.series);
    const isTodayView = data.day === (function(){const n=new Date();return `${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}-${String(n.getDate()).padStart(2,"0")}`;})();
    if(arr.length){
      const line=smooth(arr);
      const area=`${line}L${arr[arr.length-1][0].toFixed(1)} ${(H-padB).toFixed(1)}L${arr[0][0].toFixed(1)} ${(H-padB).toFixed(1)}Z`;
      svg += `<path d="${area}" fill="url(#stgF)"/>`;
      const len=Math.round(plotW*1.6);
      svg += `<path class="st-line" d="${line}" fill="none" stroke="${color}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round" style="stroke-dasharray:${len};stroke-dashoffset:${len}"/>`;
      // Dots at each point (this single-line view can afford them).
      arr.forEach(p=>{ svg += `<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="2.4" fill="${color}"/>`; });
      const last=arr[arr.length-1];
      svg += `<circle cx="${last[0].toFixed(1)}" cy="${last[1].toFixed(1)}" r="4" fill="${color}"/>`;
      if(isTodayView && !weekly && !_stShiftKey) svg += `<circle class="st-live-ping" cx="${last[0].toFixed(1)}" cy="${last[1].toFixed(1)}" r="4.5" fill="${color}"/>`;
    }else{
      // Distinguish "no OP2 yet" from "no data at all" — OP2 needs a necro pull
      // (Refrescar on Windows). Don't leave a silent blank chart for the L8.
      const hasPlan = labels.some(l=>{ const c=(data.series[proc]||{})[l]; return c && c.pct_plan!=null && c.pct_plan>0; });
      const msg = (_stMetric==="op2" && hasPlan)
        ? `Sin OP2 para ${esc(proc)} — pulsa «Refrescar» para bajarlo de necro, o usa «vs Plan».`
        : `Sin datos para ${esc(proc)}`;
      svg += `<text x="${(W/2).toFixed(0)}" y="${(padT+plotH/2).toFixed(0)}" text-anchor="middle" fill="var(--text-secondary)" font-size="13">${msg}</text>`;
    }
    // Hover layer.
    svg += `<line id="st-cross" x1="0" y1="${padT}" x2="0" y2="${H-padB}" stroke="var(--text-secondary)" stroke-width="1" stroke-dasharray="3 3" opacity="0"/>`;
    svg += `<circle id="st-mk0" r="5" fill="${color}" stroke="var(--bg-card)" stroke-width="2" opacity="0"/>`;
    svg += `<rect id="st-capture" x="${padL}" y="${padT}" width="${plotW}" height="${plotH}" fill="transparent" style="cursor:crosshair"/>`;
    svg += `</svg>`;
    chart.innerHTML = svg;

    // Focus header + size breakdown. Weekly → the WEEK AGGREGATE cell (matches
    // necro); intraday → the latest interval cell.
    const cellsF=(data.series[proc]||{});
    const lastLbl=labels.filter(l=>cellsF[l]).slice(-1)[0];
    const dayAgg = (!weekly && data.day_totals && data.day_totals[proc]) ? data.day_totals[proc] : null;
    const headCell = weekly ? ((data.week_totals||{})[proc] || (lastLbl?cellsF[lastLbl]:null))
                            : (dayAgg || (lastLbl?cellsF[lastLbl]:null));
    const curV = _stHeadlineVal(proc);
    const subTag = weekly ? ` · agregado ${data.week_label||"semana"}`
                          : (dayAgg ? ` · día (necro)` : (lastLbl?` · último ${lastLbl}`:""));
    $("st-focus-name") && ($("st-focus-name").textContent=proc);
    $("st-focus-sub") && ($("st-focus-sub").textContent=` · vs ${_stMetric==="op2"?"OP2":"Plan"}${subTag}`);
    if($("st-focus-big")){ $("st-focus-big").textContent=(curV!=null?curV+"%":"—"); $("st-focus-big").style.color=_stColor(curV); }
    const sizesHost=$("st-sizes");
    if(sizesHost){
      const SZ=[["Small","S"],["Medium","M"],["Large","L"],["Heavy/Bulky","H"]];
      const sizes=headCell?(headCell.sizes||{}):{};
      sizesHost.innerHTML=SZ.map(([full,ab])=>{
        const sv=sizes[full]; const pv=sv?sv[key]:null;
        const col=pv==null?"var(--text-dim)":_stColor(pv);
        return `<div class="st-size-card"><div class="s-lbl">${full}</div><div class="s-val" style="color:${col}">${pv==null?"—":pv+"%"}</div></div>`;
      }).join("");
    }

    // ── Hover interaction (single line) ──
    const svgEl = chart.querySelector("svg");
    const cap = chart.querySelector("#st-capture");
    const cross = chart.querySelector("#st-cross");
    const mk = chart.querySelector("#st-mk0");
    let tip = $("st-tip");
    if(!tip){ tip=document.createElement("div"); tip.id="st-tip"; tip.className="st-tip"; document.body.appendChild(tip); }
    const nLbls = labels.length;
    const pxToViewX = (clientX)=>{ const r=svgEl.getBoundingClientRect(); return (clientX-r.left)/r.width*W; };
    const hide=()=>{ cross.setAttribute("opacity","0"); if(mk) mk.setAttribute("opacity","0"); tip.style.display="none"; };
    cap.addEventListener("mousemove",(ev)=>{
      const vx=pxToViewX(ev.clientX);
      let idx=Math.round((vx-padL)/plotW*(nLbls-1)); idx=Math.max(0,Math.min(nLbls-1,idx));
      const lbl=labels[idx], cx=xAt(idx);
      cross.setAttribute("x1",cx); cross.setAttribute("x2",cx); cross.setAttribute("opacity","0.55");
      const cell=cellsF[lbl];
      if(!cell||cell[key]==null){ if(mk) mk.setAttribute("opacity","0"); tip.style.display="none"; return; }
      const pt=arr.find(p=>p[2]===lbl);
      if(pt&&mk){ mk.setAttribute("cx",pt[0]); mk.setAttribute("cy",pt[1]); mk.setAttribute("opacity","1"); }
      // Tooltip: focused process Total + its sizes at this time.
      const SZ=[["Small","S"],["Medium","M"],["Large","L"],["Heavy/Bulky","H"]];
      const sz=cell.sizes||{};
      let rows=`<div class="st-tip-r"><span class="st-tip-dot" style="background:${color}"></span><span class="st-tip-p"><b>Total</b></span><b style="color:${_stColor(cell[key])}">${cell[key]}%</b></div>`;
      SZ.forEach(([full])=>{ const sv=sz[full]; if(sv&&sv[key]!=null&&sv[key]>0) rows+=`<div class="st-tip-r"><span class="st-tip-p" style="opacity:.8">${full}</span><b style="color:${_stColor(sv[key])}">${sv[key]}%</b></div>`; });
      tip.innerHTML=`<div class="st-tip-h">${esc(proc)} · ${esc(lbl)}</div>${rows}`;
      tip.style.display="block";
      const tw=tip.offsetWidth, pad=14;
      let lx=ev.clientX+pad; if(lx+tw>window.innerWidth-8) lx=ev.clientX-tw-pad;
      tip.style.left=lx+"px"; tip.style.top=(ev.clientY+pad)+"px";
    });
    cap.addEventListener("mouseleave", hide);
  }

  function _stRenderKpis_UNUSED(){
    const host=$("st-kpis"); if(!host||!_stData) return;
    const ins=(_stData.insights||{})[_stMetric]||{}; const kpis=ins.kpis||{};
    const vsPrev=ins.vs_prev||{}, key=_stKey();
    const keys=Object.keys(kpis);
    if(!keys.length){ host.innerHTML=`<div class="hmodal-empty" style="grid-column:1/-1;padding:20px">Sin datos${_stMetric==='op2'?' de OP2 (revisa el mapeo)':''}.</div>`; return; }
    const SZ=[["Small","S"],["Medium","M"],["Large","L"],["Heavy/Bulky","H"]];
    // Mini sparkline of a process's % series (last ~16 pts), baseline at 100%.
    const spark=(proc,color)=>{
      const cells=(_stData.series[proc]||{});
      const vals=(_stData.intervals||[]).filter(l=>cells[l]&&cells[l][key]>0).slice(-16).map(l=>cells[l][key]);
      if(vals.length<2) return "";
      const w=150,h=26,lo=Math.min(80,...vals),hi=Math.max(120,...vals),rng=Math.max(1,hi-lo);
      const xs=i=>i/(vals.length-1)*w, ys=v=>h-((v-lo)/rng)*h;
      const d=vals.map((v,i)=>`${i?'L':'M'}${xs(i).toFixed(1)} ${ys(v).toFixed(1)}`).join("");
      const y100=ys(100).toFixed(1);
      return `<svg class="st-spark" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" width="100%" height="26">
        <line x1="0" y1="${y100}" x2="${w}" y2="${y100}" stroke="var(--text-dim)" stroke-width="1" stroke-dasharray="2 3"/>
        <path d="${d}" fill="none" stroke="${color}" stroke-width="1.8" stroke-linejoin="round"/>
        <circle cx="${xs(vals.length-1).toFixed(1)}" cy="${ys(vals[vals.length-1]).toFixed(1)}" r="2.2" fill="${color}"/></svg>`;
    };
    host.innerHTML=keys.map((proc,pi)=>{
      const k=kpis[proc], cur=k.current;
      const color=ST_COLORS[(_stData.core_order||keys).indexOf(proc)%ST_COLORS.length];
      const arrow=k.trend>0.5?"▲":k.trend<-0.5?"▼":"▬";
      const arrowC=k.trend>0.5?"#059669":k.trend<-0.5?"#dc2626":"var(--text-secondary)";
      const dp=vsPrev[proc];
      const dpTxt=dp?` · <span title="vs mismo intervalo ayer" style="color:${dp.delta>=0?'#059669':'#dc2626'};font-weight:700">${dp.delta>=0?'▲':'▼'}${Math.abs(dp.delta)} D-1</span>`:"";
      const cells=(_stData.series[proc]||{});
      const lastLbl=(_stData.intervals||[]).filter(l=>cells[l]).slice(-1)[0];
      const sizes=lastLbl?(cells[lastLbl].sizes||{}):{};
      const chips=SZ.map(([full,ab])=>{
        const sv=sizes[full];
        const pv=sv?sv[key]:null;
        if(pv==null||pv<=0) return `<span class="st-sizechip" style="background:var(--border-strong);color:var(--text-secondary)">${ab}<small>—</small></span>`;
        return `<span class="st-sizechip" style="background:${_stColor(pv)}" title="${full}: ${pv}%">${ab}<small>${Math.round(pv)}%</small></span>`;
      }).join("");
      return `<div class="st-card" style="border-left:3px solid ${_stColor(cur)}">
        <div class="st-name">${esc(proc)}</div>
        <div style="display:flex;align-items:baseline;gap:6px">
          <span class="st-big" style="color:${_stColor(cur)}">${cur}%</span>
          <span style="color:${arrowC};font-size:12px;font-weight:700">${arrow}${Math.abs(k.trend)}</span>
        </div>
        ${spark(proc,color)}
        <div class="st-sub">avg ${k.avg}% · ↑${k.best.value}@${k.best.label} · ↓${k.worst.value}@${k.worst.label}${dpTxt}</div>
        <div class="st-sizes">${chips}</div>
      </div>`;
    }).join("");
  }

  function _stRenderShifts(){
    const host=$("st-shifts"); if(!host||!_stData) return;
    const ins=(_stData.insights||{})[_stMetric]||{}; const rows=ins.shift_summary||[];
    if(!rows.length){ host.innerHTML=`<div class="hmodal-empty">Sin datos.</div>`; return; }
    host.innerHTML=rows.map(s=>`
      <div class="st-shiftrow" style="border-left-color:${s.color||'#94a3b8'}">
        <b style="min-width:74px">${esc(s.shift)}</b>
        <span style="font-size:19px;font-weight:800;color:${_stColor(s.avg)};min-width:64px">${s.avg}%</span>
        <span style="font-size:11px;font-weight:700;color:${s.met_100?'#059669':'#d97706'}">${s.met_100?'✓ ≥100%':'✗ <100%'}</span>
        <span style="margin-left:auto;font-size:11px;color:var(--text-secondary)" title="Proceso más bajo del turno">🔻 ${esc(s.bottleneck.process)} <b>${s.bottleneck.value}%</b></span>
      </div>`).join("");
  }

  function _stRenderAlerts(){
    const host=$("st-alerts"); if(!host||!_stData) return;
    const ins=(_stData.insights||{})[_stMetric]||{}; const al=ins.alerts||[];
    if(!al.length){ host.innerHTML=`<div class="hmodal-empty" style="color:#059669">Sin caídas bajo ${ins.low_threshold||80}% 🎉</div>`; return; }
    host.innerHTML=al.map(a=>`
      <div class="st-alert" style="border-left:3px solid ${_stColor(a.value)}">
        <span style="min-width:46px;font-weight:700">${esc(a.label)}</span>
        <span style="flex:1">${esc(a.process)}</span>
        <span style="font-weight:800;color:${_stColor(a.value)}">${a.value}%</span>
      </div>`).join("");
  }

  // Minute range [start,end] of a shift key, from the server bands (merges the
  // split overnight halves into the widest span so the focus covers the shift).
  function _stShiftRange(key){
    const bands=(_stData&&_stData.bands)||[];
    const mine=bands.filter(b=>String(b.label).toUpperCase()===String(key).toUpperCase()
                             || String(b.key||"").toUpperCase()===String(key).toUpperCase());
    if(!mine.length) return null;
    return [Math.min(...mine.map(b=>b.start_min)), Math.max(...mine.map(b=>b.end_min))];
  }

  function _stPopulateShifts(){
    const sel=$("st-shift"); if(!sel||!_stData) return;
    const bands=_stData.bands||[];
    // Unique labels in band order.
    const seen=[]; bands.forEach(b=>{ if(!seen.includes(b.label)) seen.push(b.label); });
    const cur=sel.value;
    sel.innerHTML=`<option value="">24h completo</option>`+seen.map(l=>`<option value="${esc(l)}">${esc(l)}</option>`).join("");
    if(seen.includes(cur)) sel.value=cur;
  }

  function _stWeekOptions(){
    const sel=$("st-week"); if(!sel||sel.options.length) return;
    const MON=["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];
    const now=new Date(); const dow=(now.getDay()+6)%7; // 0=Mon
    const mon=new Date(now); mon.setDate(now.getDate()-dow);
    const opts=[];
    for(let i=0;i<13;i++){   // ~1 trimester of weeks
      const d=new Date(mon); d.setDate(mon.getDate()-i*7);
      const iso=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
      const end=new Date(d); end.setDate(d.getDate()+6);
      const rng=`${d.getDate()} ${MON[d.getMonth()]} – ${end.getDate()} ${MON[end.getMonth()]}`;
      const lbl=i===0?`Esta semana · ${rng}`:(i===1?`Semana pasada · ${rng}`:rng);
      opts.push(`<option value="${iso}">${lbl}</option>`);
    }
    sel.innerHTML=opts.join("");
  }

  function _stApplyMode(){
    const weekly=_stMode==="weekly";
    if($("st-day")) $("st-day").style.display = weekly?"none":"";
    if($("st-week")) $("st-week").style.display = weekly?"":"none";
    if($("st-shift")) $("st-shift").style.display = weekly?"none":"";  // shift focus is intraday-only
    if(weekly){ _stShiftKey=""; _stShowPrev=false; if($("st-showprev")) $("st-showprev").checked=false; _stStopLive(); if($("st-live")) $("st-live").checked=false; }
  }

  // Load once when the Shift Tracker tab is first opened (switchTab wires the tab).
  window._onShiftTrackerTab = function(){
    _stDayOptions(); _stWeekOptions(); _stApplyMode();
    if(!_stLoaded) _stLoad(false);
  };

  // Toolbar button = shortcut to the tab.
  if($("btnShiftTracker")) $("btnShiftTracker").addEventListener("click", ()=>{
    if(typeof switchTab === "function") switchTab("shifttracker");
  });

  // ── Intra-shift focus + live auto-refresh ──
  function _stStopLive(){ if(_stLiveTimer){ clearInterval(_stLiveTimer); _stLiveTimer=null; } }
  function _stStartLive(){
    _stStopLive();
    // Re-download today every 30 min so new intervals appear automatically.
    _stLiveTimer = setInterval(()=>{ if($("panel-shifttracker")?.classList.contains("active")) _stLoad(true); }, 30*60*1000);
  }
  document.querySelectorAll("#st-mode .sp-opt").forEach(b=>b.addEventListener("click",()=>{
    if(_stMode===b.dataset.mode) return;
    document.querySelectorAll("#st-mode .sp-opt").forEach(x=>x.classList.remove("on"));
    b.classList.add("on"); _stMode=b.dataset.mode; _stApplyMode(); _stLoad(false);
  }));
  $("st-week") && $("st-week").addEventListener("change", ()=>_stLoad(false));
  $("st-shift") && $("st-shift").addEventListener("change", e=>{ _stShiftKey=e.target.value||""; _stRenderChart(); });
  $("st-live") && $("st-live").addEventListener("change", e=>{
    if(e.target.checked){ _stStartLive(); const s=$("st-status"); if(s) s.textContent="🔴 En vivo — refresco automático cada 30 min"; }
    else _stStopLive();
  });

  $("st-day") && $("st-day").addEventListener("change", ()=>_stLoad(false));
  $("st-refresh") && $("st-refresh").addEventListener("click", ()=>_stLoad(true));
  $("st-showprev") && $("st-showprev").addEventListener("change", async e=>{
    _stShowPrev=e.target.checked;
    if(_stShowPrev && !_stPrevData){
      // Load the day BEFORE the selected one (cache-only on the server; no fresh
      // download). Compute its ISO from the current selection.
      try{
        const cur=new Date($("st-day").value+"T00:00:00");
        cur.setDate(cur.getDate()-1);
        const iso=`${cur.getFullYear()}-${String(cur.getMonth()+1).padStart(2,"0")}-${String(cur.getDate()).padStart(2,"0")}`;
        const d=await jget(`${API}/api/admin/shift-tracker?fc=${encodeURIComponent(currentFC)}&day=${iso}`);
        if(d.ok) _stPrevData=d;
      }catch(_){}
    }
    _stRenderChart();
  });
  // Re-render the chart on window resize so it keeps filling the width.
  let _stRz=null;
  window.addEventListener("resize", ()=>{ clearTimeout(_stRz); _stRz=setTimeout(()=>{ if($("panel-shifttracker") && $("panel-shifttracker").classList.contains("active")) _stRenderChart(); }, 150); });
  document.querySelectorAll("#st-metric .sp-opt").forEach(b=>b.addEventListener("click",()=>{
    document.querySelectorAll("#st-metric .sp-opt").forEach(x=>x.classList.remove("on"));
    b.classList.add("on"); _stMetric=b.dataset.metric; _stRenderAll();
  }));

  // loadAdoption() + adoptChart() removed 2026-07-29 — the Adoption modal is gone
  // from the UI. The /api/adoption endpoint stays for out-of-band analysis.


}); // end DOMContentLoaded
