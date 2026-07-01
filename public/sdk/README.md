# INDUS Product License SDK

All INDUS products require a subscription license file downloaded from the customer dashboard.

## Customer flow

1. Subscribe on [indus-web-agency.vercel.app](https://indus-web-agency.vercel.app)
2. Admin approves the subscription
3. Download from dashboard — saves `indus-license-{product}.json` + product archive
4. Place the license file in the product install folder
5. App verifies online on startup and periodically while running

## License file format

```json
{
  "product": "Multi-Slot Agent Dialer",
  "productSlug": "dialer-multi-slot",
  "expiresAt": "2026-07-25T12:00:00.000Z",
  "period": "month",
  "licenseToken": "eyJ...",
  "verifyUrl": "https://indus-web-agency.vercel.app/api/license/verify"
}
```

## Verify API

`POST /api/license/verify`

```json
{ "licenseToken": "eyJ..." }
```

Returns `{ "valid": true, "expiresAt": "...", "daysRemaining": 12 }` or `{ "valid": false, "reason": "expired" }`.

## Integrate into your app

### Python (desktop / scripts)

Copy [`indus_license.py`](./indus_license.py) into your project and call on startup:

```python
from indus_license import verify_license

result = verify_license("/path/to/app/root")
if not result.ok:
    sys.exit(result.message)
```

Set `INDUS_SKIP_LICENSE=1` for local development only.

### Node.js / Electron / Next.js

Import [`indus_license.mjs`](./indus_license.mjs):

```javascript
import { parseLicenseFile, verifyLicense } from "./indus_license.mjs";

const record = parseLicenseFile(JSON.parse(fs.readFileSync("indus-license-product.json")));
const result = await verifyLicense(record);
if (!result.ok) process.exit(1);
```

## Billing periods

| Period | Days |
|--------|------|
| 7 Days | 7 |
| 15 Days | 15 |
| 30 Days | 30 |
| Yearly | 365 |

Timer starts when admin approves the subscription.

## Products with built-in license enforcement

- **INDUS Auto Dialer** (all tiers) — enforced in `autodialer_gui.py`

Other products: add the SDK using the snippets above.
