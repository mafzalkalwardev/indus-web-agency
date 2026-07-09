"""INDUS Web Agency subscription license verification."""
from __future__ import annotations

import base64
import hashlib
import json
import os
import platform
import socket
import uuid
import urllib.error
import urllib.request
from dataclasses import dataclass
from datetime import datetime, timezone
from typing import Any, Callable

LICENSE_VERIFY_URL = "https://indus-web-agency.vercel.app/api/license/verify"
LICENSE_PUBLIC_KEY_PEM = """-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvSs97mdbBj+wgf4mLVqQ
kyE2DKQuTxhhJ+Ze8YLM162CjOiUllUOft+8l2eAnb8ER+OX/gqBDybwv7ncDtDy
jStlygwGv1L5EuT4mMrCEaxRgsyHct36JgkcSZ5Fxk+zFSjFbq1+mN02AT/sZ6xo
NXWqBYto2L9RZp4I66GmLMXePz4Q+1DgraC4eB/YGsFKg32SebRISDoFzMhcayKH
lBVJz+riN+psvHpehA2dshiAw47JpTpvRohTrXzeGkNiZucnzADGEFQ+T2KzSfau
djQ6lxfLVF7CgFf/QFSnDUhUfrrwkMFqnztpAOGjwiw0/NceocYsQSUWjzsoq9cR
LwIDAQAB
-----END PUBLIC KEY-----"""
LICENSE_GLOB_PREFIX = "indus-license"
OFFLINE_GRACE_HOURS = 48
PERIODIC_CHECK_SECONDS = 4 * 60 * 60


@dataclass
class LicenseRecord:
    product: str
    product_slug: str
    expires_at: str
    period: str
    license_token: str

    @classmethod
    def from_dict(cls, data: dict[str, Any]) -> "LicenseRecord":
        return cls(
            product=str(data.get("product") or ""),
            product_slug=str(data.get("productSlug") or data.get("product_slug") or ""),
            expires_at=str(data.get("expiresAt") or data.get("expires_at") or ""),
            period=str(data.get("period") or ""),
            license_token=str(data.get("licenseToken") or data.get("license_token") or ""),
        )


@dataclass
class LicenseCheckResult:
    ok: bool
    reason: str = ""
    message: str = ""
    expires_at: str = ""
    days_remaining: int = 0
    product_slug: str = ""
    email: str = ""
    offline: bool = False


def get_machine_id() -> str:
    raw = "|".join(
        [
            socket.gethostname(),
            platform.system(),
            platform.machine(),
            str(uuid.getnode()),
        ]
    )
    return hashlib.sha256(raw.encode("utf-8")).hexdigest()


def _b64url_decode(value: str) -> bytes:
    pad = "=" * (-len(value) % 4)
    return base64.urlsafe_b64decode(value + pad)


def verify_jwt_locally(token: str) -> dict[str, Any] | None:
    try:
        from cryptography.hazmat.primitives import hashes, serialization
        from cryptography.hazmat.primitives.asymmetric import padding
    except ImportError:
        return _jwt_exp_payload_only(token)

    parts = token.split(".")
    if len(parts) != 3:
        return None
    header_b64, payload_b64, sig_b64 = parts
    try:
        header = json.loads(_b64url_decode(header_b64))
        if header.get("alg") != "RS256":
            return None
        payload = json.loads(_b64url_decode(payload_b64))
        public_key = serialization.load_pem_public_key(LICENSE_PUBLIC_KEY_PEM.encode("ascii"))
        signed = f"{header_b64}.{payload_b64}".encode("ascii")
        signature = _b64url_decode(sig_b64)
        public_key.verify(signature, signed, padding.PKCS1v15(), hashes.SHA256())
        exp = payload.get("exp")
        if not exp or datetime.fromtimestamp(int(exp), tz=timezone.utc) <= datetime.now(timezone.utc):
            return None
        return payload
    except Exception:
        return None


def _jwt_exp_payload_only(token: str) -> dict[str, Any] | None:
    try:
        parts = token.split(".")
        if len(parts) < 2:
            return None
        payload = json.loads(_b64url_decode(parts[1]))
        exp = payload.get("exp")
        if not exp:
            return None
        if datetime.fromtimestamp(int(exp), tz=timezone.utc) <= datetime.now(timezone.utc):
            return None
        return payload
    except (ValueError, json.JSONDecodeError, OSError):
        return None


def dev_skip_allowed(root: str) -> bool:
    env = os.environ.get("INDUS_LICENSE_DEV", "").strip().lower()
    if env not in {"1", "true", "yes", "on"}:
        return False
    return os.path.isfile(os.path.join(root, ".indus-dev-local"))


def license_search_dirs(root: str) -> list[str]:
    dirs = [root]
    data_dir = os.path.join(root, "data")
    if os.path.isdir(data_dir):
        dirs.append(data_dir)
    return dirs


def find_license_file(root: str) -> str | None:
    for folder in license_search_dirs(root):
        try:
            names = sorted(os.listdir(folder))
        except OSError:
            continue
        for name in names:
            lower = name.lower()
            if lower.startswith(LICENSE_GLOB_PREFIX) and lower.endswith(".json"):
                return os.path.join(folder, name)
    return None


def load_license(path: str) -> LicenseRecord:
    with open(path, encoding="utf-8") as f:
        data = json.load(f)
    record = LicenseRecord.from_dict(data)
    if not record.license_token:
        raise ValueError("License file is missing licenseToken")
    return record


def _cache_path(root: str) -> str:
    cache_dir = os.path.join(root, "data")
    os.makedirs(cache_dir, exist_ok=True)
    return os.path.join(cache_dir, "indus_license_cache.json")


def read_verify_cache(root: str) -> dict[str, Any] | None:
    path = _cache_path(root)
    try:
        with open(path, encoding="utf-8") as f:
            return json.load(f)
    except (OSError, json.JSONDecodeError):
        return None


def write_verify_cache(root: str, payload: dict[str, Any]) -> None:
    path = _cache_path(root)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(payload, f, indent=2)


def _parse_iso(value: str) -> datetime | None:
    text = (value or "").strip()
    if not text:
        return None
    try:
        if text.endswith("Z"):
            text = text[:-1] + "+00:00"
        dt = datetime.fromisoformat(text)
        if dt.tzinfo is None:
            dt = dt.replace(tzinfo=timezone.utc)
        return dt.astimezone(timezone.utc)
    except ValueError:
        return None


def local_expired(expires_at: str) -> bool:
    dt = _parse_iso(expires_at)
    if dt is None:
        return True
    return datetime.now(timezone.utc) >= dt


def days_remaining(expires_at: str) -> int:
    dt = _parse_iso(expires_at)
    if dt is None:
        return 0
    delta = dt - datetime.now(timezone.utc)
    return max(0, int(delta.total_seconds() // 86400))


def verify_online(record: LicenseRecord, timeout_sec: float = 12.0) -> LicenseCheckResult:
    body = json.dumps(
        {"licenseToken": record.license_token, "machineId": get_machine_id()}
    ).encode("utf-8")
    req = urllib.request.Request(
        LICENSE_VERIFY_URL,
        data=body,
        headers={"Content-Type": "application/json", "Accept": "application/json"},
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=timeout_sec) as resp:
            data = json.loads(resp.read().decode("utf-8"))
    except urllib.error.HTTPError as exc:
        try:
            data = json.loads(exc.read().decode("utf-8"))
        except (ValueError, OSError):
            data = {"valid": False, "error": f"HTTP {exc.code}"}
    except urllib.error.URLError as exc:
        return LicenseCheckResult(
            ok=False,
            reason="network",
            message=f"Could not reach license server: {exc.reason}",
        )

    if data.get("valid"):
        expires_at = str(data.get("expiresAt") or record.expires_at)
        return LicenseCheckResult(
            ok=True,
            reason="valid",
            message="License active",
            expires_at=expires_at,
            days_remaining=int(data.get("daysRemaining") or days_remaining(expires_at)),
            product_slug=str(data.get("productSlug") or record.product_slug),
            email=str(data.get("email") or ""),
        )

    reason = str(data.get("reason") or "invalid")
    return LicenseCheckResult(
        ok=False,
        reason=reason,
        message=str(data.get("error") or "License is not valid"),
        expires_at=str(data.get("expiresAt") or record.expires_at),
    )


def verify_license(root: str, path: str | None = None) -> LicenseCheckResult:
    if dev_skip_allowed(root):
        return LicenseCheckResult(ok=True, reason="skipped", message="License check disabled (dev)")

    license_path = path or find_license_file(root)
    if not license_path:
        return LicenseCheckResult(
            ok=False,
            reason="missing",
            message=(
                "No INDUS license file found. Download your product from "
                "https://indus-web-agency.vercel.app/dashboard"
            ),
        )

    try:
        record = load_license(license_path)
    except (OSError, json.JSONDecodeError, ValueError) as exc:
        return LicenseCheckResult(
            ok=False,
            reason="invalid_file",
            message=f"License file could not be read: {exc}",
        )

    local_payload = verify_jwt_locally(record.license_token)
    if not local_payload:
        return LicenseCheckResult(
            ok=False,
            reason="token_invalid",
            message="License signature invalid or token expired",
            expires_at=record.expires_at,
            product_slug=record.product_slug,
        )

    token_expires = str(local_payload.get("expiresAt") or record.expires_at)
    if local_expired(token_expires):
        return LicenseCheckResult(
            ok=False,
            reason="expired",
            message="Your subscription has expired. Renew at indus-web-agency.vercel.app",
            expires_at=token_expires,
            product_slug=record.product_slug,
        )

    online = verify_online(record)
    if online.ok:
        write_verify_cache(
            root,
            {
                "verifiedAt": datetime.now(timezone.utc).isoformat(),
                "expiresAt": online.expires_at,
                "productSlug": online.product_slug,
                "licensePath": license_path,
            },
        )
        return online

    if online.reason == "network":
        cache = read_verify_cache(root)
        if cache and cache.get("licensePath") == license_path:
            verified_at = _parse_iso(str(cache.get("verifiedAt") or ""))
            if verified_at is not None:
                age_hours = (datetime.now(timezone.utc) - verified_at).total_seconds() / 3600
                expires_at = str(cache.get("expiresAt") or record.expires_at)
                if age_hours <= OFFLINE_GRACE_HOURS and not local_expired(expires_at):
                    return LicenseCheckResult(
                        ok=True,
                        reason="offline_grace",
                        message="License verified offline (server unreachable)",
                        expires_at=expires_at,
                        days_remaining=days_remaining(expires_at),
                        product_slug=record.product_slug,
                        offline=True,
                    )
        return online

    return online


def start_periodic_license_check(
    root: str,
    path: str | None = None,
    interval_seconds: int = PERIODIC_CHECK_SECONDS,
    on_failure: Callable[[LicenseCheckResult], None] | None = None,
) -> Callable[[], None]:
    import threading

    def _fail(result: LicenseCheckResult) -> None:
        if on_failure:
            on_failure(result)
        else:
            print(f"[INDUS License] {result.message}", flush=True)
            raise SystemExit(1)

    def _loop() -> None:
        result = verify_license(root, path)
        if not result.ok:
            _fail(result)

    timer: threading.Timer | None = None

    def _schedule() -> None:
        nonlocal timer
        _loop()
        timer = threading.Timer(interval_seconds, _schedule)
        timer.daemon = True
        timer.start()

    _schedule()

    def cancel() -> None:
        nonlocal timer
        if timer:
            timer.cancel()

    return cancel


def expires_at_display(expires_at: str) -> str:
    dt = _parse_iso(expires_at)
    if dt is None:
        return expires_at or "Unknown"
    return dt.astimezone().strftime("%Y-%m-%d %H:%M:%S")
