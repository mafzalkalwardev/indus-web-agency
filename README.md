# INDUS Web Agency

Professional automation tools marketplace — subscribe to auto dialers, email marketing tools, and web scrapers individually.

## Live URLs

- **Vercel**: Deployed after push (see README badge)
- **GitHub Pages**: https://mafzalkalwardev.github.io/indus-web-agency/

## Features

- Customer sign up / login with JWT sessions
- Admin portal for user & subscription management
- 13 products across email, dialer, scraper, and bundle categories
- 4 auto dialer tiers with side-by-side comparison
- Time-limited subscriptions with download access
- Screenshots from live Auto Dialer application

## Products

### Email Tools
- Email Verifier Pro
- Bulk Email Verifier
- Auto Email Sender
- Unified Inbox
- Mailforge (bundle)

### Auto Dialers
1. **DOM/BOM Starter** — PyAutoGUI + DOM automation
2. **Multi-Slot Agent** — 5 parallel lines, agent sees picked call only
3. **AI Agent Solo** — AI talks automatically on every call
4. **Enterprise AI Multi-Slot** — Multi-slot + AI on picked call

### Web Scrapers
- Playwright Website Scraper Pro
- FMCSA SAFER Scraper
- Canadian Website Scraper
- Fiverr Lead Extractor CRM

## Quick Start

```bash
npm install
npm run dev
```

Visit http://localhost:3000

### Default Admin Credentials

- Email: `admin@induswebagency.com`
- Password: `Admin@Indus2026!`

Change via environment variables:
```
ADMIN_EMAIL=your@email.com
ADMIN_PASSWORD=your-secure-password
JWT_SECRET=your-jwt-secret
```

## Deploy

### Vercel
```bash
npx vercel --prod
```

### GitHub Pages
```bash
npm run build:static
# Output in out/ — served via gh-pages branch
```

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS 4
- JWT auth (jose + bcryptjs)
- JSON file storage (upgradeable to database)

## License

MIT
