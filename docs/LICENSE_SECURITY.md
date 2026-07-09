# INDUS License & Download Security

This document covers what is implemented in the CRM and additional steps for production hardening.

## Implemented in this CRM

### Download protection
- Product archives are fetched **server-side** via `/api/downloads/{slug}/file`
- GitHub URLs live only in `src/lib/product-sources.server.ts` (never sent to the browser)
- All public GitHub buttons/links removed from the marketing site
- Downloads require authenticated session + approved active subscription

### License protection
- **RS256 JWT** signing (private key on server, public key embedded in SDK)
- **Hardcoded verify URL** in SDK — license JSON cannot redirect to a fake server
- **Local JWT signature verification** before online check (Node built-in crypto; Python via `cryptography`)
- **Machine binding** — max 2 devices per subscription (SHA-256 fingerprint)
- **Periodic re-check** every 4 hours while app runs
- **48-hour offline grace** only after a successful online verification (unchanged)
- **Legacy HS256** tokens still accepted during migration

### Dev bypass (not for production)
- `INDUS_LICENSE_DEV=1` **and** `.indus-dev-local` file required — env var alone is not enough

## Environment variables

| Variable | Required | Purpose |
|----------|----------|---------|
| `LICENSE_PRIVATE_KEY` | Production | RS256 private key (PEM or base64). Falls back to `scripts/license_private.pem` locally |
| `GITHUB_TOKEN` | Recommended | GitHub API token for private repos and higher rate limits |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Base URL for license verify endpoint |
| `JWT_SECRET` / `LICENSE_SECRET` | Legacy | HS256 fallback for old tokens only |

Generate keys:
```bash
node -e "const {generateKeyPairSync}=require('crypto');const fs=require('fs');const k=generateKeyPairSync('rsa',{modulusLength:2048,publicKeyEncoding:{type:'spki',format:'pem'},privateKeyEncoding:{type:'pkcs8',format:'pem'}});fs.writeFileSync('scripts/license_private.pem',k.privateKey);fs.writeFileSync('scripts/license_public.pem',k.publicKey);"
```

For Vercel, set `LICENSE_PRIVATE_KEY` to the base64 of the PEM file (no newlines).

## Additional recommendations

### 1. Make GitHub repos private
Public repos can still be cloned if someone discovers the repo name. Set all product repos to **private** and use `GITHUB_TOKEN` with `repo` scope for the download proxy.

### 2. Distribute compiled builds, not source
- **Python:** PyInstaller / cx_Freeze — harder to remove license checks
- **Node/Electron:** electron-builder with ASAR + obfuscation (javascript-obfuscator)
- **Remove** `.indus-dev-local` and dev docs from shipped builds

### 3. Obfuscate license check calls
Spread verification across multiple modules instead of one obvious `verify_license()` at startup. Cracked versions often search for a single exit call.

### 4. Legal layer
- Terms of Service prohibiting redistribution and reverse engineering
- Copyright notice in every product
- DMCA takedowns for leaked repos (if you find them)

### 5. Admin machine reset
Add admin UI to clear `activatedMachines` on a subscription when a customer replaces hardware. Currently stored on the subscription record in `activatedMachines[]`.

### 6. Download audit log
Log `{ userId, productSlug, timestamp, ip }` on each file download for abuse detection.

### 7. Rate limiting
Add rate limits on `/api/license/verify` and `/api/downloads/*/file` (Upstash Redis is already wired).

### 8. Heartbeat telemetry (optional)
Products ping a lightweight `/api/license/heartbeat` every 24h with anonymized stats. Lets you detect mass piracy (same token, many IPs).

### 9. Move critical logic to your server
For highest-value features (AI dialer scripts, verification engine), run them as API calls to infrastructure you control. The desktop app becomes a thin client.

### 10. Key rotation
Rotate RS256 keys periodically. Issue new tokens on dashboard download; old tokens expire naturally with subscription period.

## What cannot be fully prevented

A skilled developer with the full application binary can always patch out client-side checks. The goal is to:
- Stop casual piracy and JSON editing
- Enable revocation and expiry enforcement for honest customers
- Keep source repos and download URLs off the public website
- Bind licenses to devices to limit sharing

For enterprise clients, offer **hosted/SaaS** tiers where the software never leaves your servers.
