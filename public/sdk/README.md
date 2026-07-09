# INDUS Product License SDK

All INDUS products require a subscription license file downloaded from the customer dashboard.

## Customer flow

1. Subscribe on [indus-web-agency.vercel.app](https://indus-web-agency.vercel.app)
2. Admin approves the subscription
3. Download from dashboard — saves `indus-license-{product}.json` + product archive (secure proxy, no public repo links)
4. Place the license file in the product install folder
5. App verifies online on startup, binds to your device, and re-checks every 4 hours

## License file format

```json
{
  "product": "Multi-Slot Agent Dialer",
  "productSlug": "dialer-multi-slot",
  "expiresAt": "2026-07-25T12:00:00.000Z",
  "period": "month",
  "licenseToken": "eyJ...",
  "licenseVersion": 2
}
```

**Note:** `verifyUrl` is not included in the license file. The SDK uses a hardcoded server URL that cannot be overridden by editing JSON.

## Security features

| Feature | Description |
|---------|-------------|
| RS256 signed JWT | Tokens are cryptographically signed; editing JSON fields does not bypass expiry |
| Hardcoded verify URL | Cannot point verification to a fake server via JSON |
| Machine binding | Each subscription works on up to 2 devices |
| Local signature check | SDK verifies JWT signature before going online |
| Periodic re-check | Re-validates every 4 hours while the app runs |
| Secure downloads | Product archives are proxied through the CRM — GitHub URLs are never shown |

## Verify API

`POST https://indus-web-agency.vercel.app/api/license/verify`

```json
{ "licenseToken": "eyJ...", "machineId": "sha256hex..." }
```

Returns `{ "valid": true, "expiresAt": "...", "daysRemaining": 12 }` or `{ "valid": false, "reason": "machine_limit" }`.

## Integrate into your app

### Python (desktop / scripts)

Copy [`indus_license.py`](./indus_license.py) into your project. Add `cryptography` to requirements for full offline signature verification.

```python
from indus_license import verify_license, start_periodic_license_check

result = verify_license("/path/to/app/root")
if not result.ok:
    sys.exit(result.message)

start_periodic_license_check("/path/to/app/root")
```

**Local development only:** set `INDUS_LICENSE_DEV=1` and create an empty `.indus-dev-local` file in the app root. Never ship this to customers.

### Node.js / Electron / Next.js

Import [`indus_license.mjs`](./indus_license.mjs) or copy [`scripts/templates/indus_license.cjs`](../../scripts/templates/indus_license.cjs):

```javascript
import { parseLicenseFile, verifyLicense, startPeriodicLicenseCheck } from "./indus_license.mjs";

const record = parseLicenseFile(JSON.parse(fs.readFileSync("indus-license-product.json")));
const result = await verifyLicense(record);
if (!result.ok) process.exit(1);
startPeriodicLicenseCheck(record);
```

## Billing periods

| Period | Days |
|--------|------|
| 7 Days | 7 |
| 15 Days | 15 |
| 30 Days | 30 |
| Yearly | 365 |

Timer starts when admin approves the subscription.

## Additional hardening (recommended)

See [LICENSE_SECURITY.md](../../docs/LICENSE_SECURITY.md) for production deployment checklist including private GitHub repos, PyInstaller builds, and legal terms.
