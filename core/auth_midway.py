from __future__ import annotations

from pathlib import Path
from typing import Optional

from project_argos.domains.roster_scc import midway_cookie_v2_like_vba, COOKIE_FILE


def get_cookie(aea: bool = True, max_tries: int = 4, cookie_file: Optional[Path] = None) -> str:
    """
    Single source of truth for Midway cookie header.
    Returns: "session=...;amazon_enterprise_access=..." (if aea=True)
    """
    cf = cookie_file or COOKIE_FILE
    return midway_cookie_v2_like_vba(cf, aea=aea, max_tries=max_tries)
