from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime
from pathlib import Path

from project_hermes.config import get_paths
from project_hermes.services.downloader import run as downloader_run
from project_hermes.services.cleaner import run as cleaner_run
from project_hermes.services.dashboard_builder import run as dashboard_builder_run
from project_hermes.core.logger import get_logger
log = get_logger(__name__)



@dataclass(frozen=True)
class PipelineResult:
    output_dir: Path
    dashboard_full: Path

def run_pipeline(fc: str, start_dt: datetime, end_dt: datetime, run_clean: bool = False, on_progress=None) -> PipelineResult:
    """
    End-to-end pipeline:
      1) Download raw + cleaned flags (downloader)
      2) Optional cleaner pass
      3) Build Dashboard_Full.csv

    on_progress: optional callable(pct, msg) for SSE progress updates.
    """
    def _progress(pct: int, msg: str):
        if on_progress:
            try:
                on_progress(pct, msg)
            except Exception:
                pass

    paths = get_paths()
    fc = (fc or "BCN4").strip().upper()

    # 1) downloads
    _progress(5, "⬇️ Descargando datos...")
    downloader_run(fc, start_dt, end_dt)

    # 2) optional cleaning pass
    if run_clean:
        _progress(70, "🧹 Limpiando datos...")
        cleaner_run(paths.output)

    # 3) dashboard
    _progress(80, "📊 Construyendo dashboard...")
    dash_path = dashboard_builder_run(fc)
    _progress(99, "✅ Dashboard listo")

    return PipelineResult(output_dir=paths.output, dashboard_full=dash_path)