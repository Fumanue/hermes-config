# guided_coaching_uploader.py
from __future__ import annotations

import json
import time
from dataclasses import dataclass
from typing import Dict, Iterable, List, Union

import requests
import win32com.client

from project_hermes.core.auth_midway import get_cookie
from project_hermes.core.logger import get_logger
log = get_logger(__name__)


BASE_URL = "https://guided-coaching-dub.corp.amazon.com"


@dataclass
class UploadInitResponse:
    url: str


def _cookie_header_to_dict(cookie_header: str) -> Dict[str, str]:
    out: Dict[str, str] = {}
    if not cookie_header:
        return out
    for part in cookie_header.split(";"):
        part = part.strip()
        if "=" in part:
            k, v = part.split("=", 1)
            k, v = k.strip(), v.strip()
            if k and v:
                out[k] = v
    return out


class GuidedCoachingUploader:

    def __init__(self, base_url: str = BASE_URL, debug: bool = False):
        self.base_url = base_url.rstrip("/")
        self.debug = debug
        self._http = win32com.client.Dispatch("WinHTTP.WinHTTPRequest.5.1")

    def _build_cookie_header(self) -> str:
        return get_cookie(aea=True, max_tries=4)

    def _establish_session(self) -> None:
        self._http.Open("GET", self.base_url + "/", False)
        self._http.SetAutoLogonPolicy(0)
        self._http.SetTimeouts(15000, 15000, 60000, 60000)
        self._http.SetRequestHeader("Cookie", self._build_cookie_header())
        self._http.SetRequestHeader(
            "User-Agent",
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:140.0) "
            "Gecko/20100101 Firefox/140.0",
        )
        self._http.SetRequestHeader(
            "Accept",
            "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        )
        self._http.Send()
        status = int(self._http.Status)
        if self.debug:
            text_len = len(self._http.ResponseText or "")
            log.info("GET / -> {status}, text_len={text_len}")

    def _post_json(self, url: str, payload: dict, max_tries: int = 3) -> dict:
        body = json.dumps(payload)
        for attempt in range(1, max_tries + 1):
            self._http.Open("POST", url, False)
            self._http.SetAutoLogonPolicy(0)
            self._http.SetTimeouts(15000, 15000, 60000, 60000)
            self._http.SetRequestHeader("Cookie", self._build_cookie_header())
            self._http.SetRequestHeader("Content-Type", "application/json")
            self._http.SetRequestHeader("Accept", "application/json")
            self._http.SetRequestHeader("Origin", self.base_url)
            self._http.SetRequestHeader("Referer", self.base_url + "/")
            self._http.SetRequestHeader(
                "User-Agent",
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:140.0) "
                "Gecko/20100101 Firefox/140.0",
            )
            self._http.SetRequestHeader("Sec-Fetch-Dest", "empty")
            self._http.SetRequestHeader("Sec-Fetch-Mode", "cors")
            self._http.SetRequestHeader("Sec-Fetch-Site", "same-origin")
            self._http.Send(body)

            status = int(self._http.Status)
            text = self._http.ResponseText or ""

            if self.debug:
                print(f"[GC] POST -> {status}, text_len={len(text)} "
                      f"(attempt {attempt}/{max_tries})", flush=True)
                if text:
                    log.info("body head: {text[:200]!r}")

            if status in (401, 403):
                if attempt < max_tries:
                    time.sleep(0.5)
                    continue
                raise RuntimeError(f"Auth failed ({status}) after {max_tries} attempts")

            if status >= 400:
                raise RuntimeError(f"HTTP {status}\n{text[:500]}")

            if text.strip().startswith("<") or "<!DOCTYPE" in text.upper():
                if attempt < max_tries:
                    if self.debug:
                        log.info("Got HTML (SSO dance), retrying...")
                    time.sleep(0.3)
                    continue
                raise RuntimeError("HTML instead of JSON after retries")

            if not text.strip():
                if attempt < max_tries:
                    time.sleep(0.3)
                    continue
                raise RuntimeError("Empty response after retries")

            try:
                return json.loads(text)
            except json.JSONDecodeError as e:
                if attempt < max_tries:
                    time.sleep(0.3)
                    continue
                raise RuntimeError(f"Invalid JSON: {e}\n{text[:500]}")

        raise RuntimeError("POST failed after retries")

    # ─── Public API ───
    def init_upload(
        self, building_code: str, course_id: str, is_multi_upload: bool = False
    ) -> UploadInitResponse:
        url = f"{self.base_url}/api/s3/UploadManualCoaching"
        payload = {
            "courseId": course_id,
            "buildingCode": building_code,
            "isMultiUpload": bool(is_multi_upload),
        }
        if self.debug:
            log.info("payload: {payload}")

        self._establish_session()
        data = self._post_json(url, payload)

        if "url" not in data or not data["url"]:
            raise RuntimeError(f"Unexpected response (no URL): {data}")
        return UploadInitResponse(url=data["url"])

    @staticmethod
    def make_csv_for_logins(
        logins: Union[Iterable[str], Dict[str, str]],
        notes: str = "",
    ) -> str:
        """
        Create CSV content.
        Accepts:
          - list of logins + shared notes: ["fumanue"], notes="Rate 120 | 85% to OP2"
          - dict of login -> individual note: {"fumanue": "Rate 120 | 85% to OP2"}
        Format per line: login,notes
        """
        lines: List[str] = []

        if isinstance(logins, dict):
            for login, note in logins.items():
                login = str(login).strip()
                note = str(note or "").strip()
                if login:
                    lines.append(f"{login},{note}")
        else:
            notes = (notes or "").strip()
            for x in logins:
                x = str(x).strip()
                if x:
                    lines.append(f"{x},{notes}")

        if not lines:
            raise ValueError("No valid logins provided.")
        return "\n".join(lines) + "\n"

    @staticmethod
    def put_csv_to_presigned_url(presigned_url: str, csv_text: str) -> None:
        r = requests.put(
            presigned_url,
            data=csv_text.encode("utf-8"),
            headers={"Content-Type": "application/x-www-form-urlencoded"},  # ← match browser
            timeout=30,
        )
        r.raise_for_status()

    def upload_manual_coaching(
        self,
        building_code: str,
        course_id: str,
        logins: Union[Iterable[str], Dict[str, str]],
        notes: str = "",
    ) -> str:
        """
        Full upload flow.
        logins can be:
          - list of strings + shared notes kwarg
          - dict of {login: individual_note}
        """
        csv_text = self.make_csv_for_logins(logins, notes=notes)

        if self.debug:
            log.info("CSV content:\n{csv_text}")

        init = self.init_upload(
            building_code=building_code,
            course_id=course_id,
            is_multi_upload=False,
        )
        self.put_csv_to_presigned_url(init.url, csv_text)
        return init.url