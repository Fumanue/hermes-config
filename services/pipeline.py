from __future__ import annotations

import threading
from dataclasses import dataclass
from datetime import datetime
from pathlib import Path

from project_argos.config import get_paths
from project_argos.services.downloader import run as downloader_run
from project_argos.services.cleaner import run as cleaner_run
from project_argos.services.dashboard_builder import run as dashboard_builder_run
from project_argos.core.logger import get_logger
log = get_logger(__name__)



@dataclass(frozen=True)
class PipelineResult:
    output_dir: Path
    dashboard_full: Path


def _prefetch_gc_history(fc: str) -> None:
    """Pre-fetch Guided Coaching history in background while download runs.

    This warms the cache so dashboard_builder doesn't block on the HTTP call.
    Non-fatal: if it fails, dashboard_builder will fetch it synchronously.
    """
    try:
        from project_argos.domains.guided_coaching_history import fetch_guided_coaching_history
        fetch_guided_coaching_history(fc, force_refresh=True)
        log.info("✓ GC history pre-fetched for %s", fc)
    except Exception as e:
        log.info("⚠ GC history pre-fetch failed (non-fatal): %s", e)


def run_pipeline(fc: str, start_dt: datetime, end_dt: datetime, run_clean: bool = False, on_progress=None) -> PipelineResult:
    """
    End-to-end pipeline:
      1) Download raw + cleaned flags (downloader) — GC history pre-fetched in parallel
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

    # Pre-fetch GC history in parallel with downloads (saves 2-5s)
    gc_thread = threading.Thread(target=_prefetch_gc_history, args=(fc,), daemon=True, name="gc-prefetch")
    gc_thread.start()

    # 1) downloads
    _progress(5, "⬇️ Descargando datos...")
    downloader_run(fc, start_dt, end_dt)

    # Wait for GC pre-fetch to finish before dashboard build
    gc_thread.join(timeout=30)

    # 2) optional cleaning pass (skip if downloader already cleaned — it does by default)
    if run_clean:
        _progress(70, "🧹 Limpiando datos...")
        cleaner_run(paths.output)

    # 3) dashboard
    _progress(80, "📊 Construyendo dashboard...")
    dash_path = dashboard_builder_run(fc)
    _progress(99, "✅ Dashboard listo")

    return PipelineResult(output_dir=paths.output, dashboard_full=dash_path)