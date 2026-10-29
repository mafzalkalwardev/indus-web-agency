<div align="center">

# INDUS Web Agency

<img src="https://readme-typing-svg.demolab.com?font=Inter&weight=700&size=28&duration=2800&pause=700&color=2563EB&center=true&vCenter=true&width=900&lines=Automation+Tools+Marketplace;Subscriptions+%2B+Product+Catalog;Dialers%2C+Scrapers%2C+Email+Tools;Modern+TypeScript+storefront" alt="Typing SVG" />

<p>
  <img src="https://komarev.com/ghpvc/?username=mafzalkalwardev&label=Project%20Views&color=2563eb&style=for-the-badge" alt="Project views" />
  <img src="https://img.shields.io/github/stars/mafzalkalwardev/indus-web-agency?style=for-the-badge&color=22c55e" alt="GitHub stars" />
  <img src="https://img.shields.io/github/forks/mafzalkalwardev/indus-web-agency?style=for-the-badge&color=f59e0b" alt="GitHub forks" />
  <img src="https://img.shields.io/github/license/mafzalkalwardev/indus-web-agency?style=for-the-badge&color=64748b" alt="License" />
</p>

<p>
  <img src="https://skillicons.dev/icons?i=ts,react,nodejs,nextjs" alt="Skill icons" />
</p>

<p>
  <strong>INDUS Web Agency automation tools marketplace with subscriptions, product catalog, and modern TypeScript storefront.</strong>
</p>

</div>

---

## Contribution Snake

<div align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/mafzalkalwardev/google-voice-dispatch-agent/output/github-contribution-grid-snake-dark.svg">
    <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/mafzalkalwardev/google-voice-dispatch-agent/output/github-contribution-grid-snake.svg">
    <img alt="Contribution snake" src="https://raw.githubusercontent.com/mafzalkalwardev/google-voice-dispatch-agent/output/github-contribution-grid-snake.svg">
  </picture>
</div>

---

## SEO Keywords

`automation marketplace` `Indus Web Agency` `subscriptions` `SaaS storefront`

---

## Features

- Customer sign up / login with JWT sessions
- Admin portal for user & subscription management
- 13 products across email, dialer, scraper, and bundle categories
- 4 auto dialer tiers with side-by-side comparison
- Time-limited subscriptions with download access
- Real product screenshots and demo videos
- INDUS Guide — select-only support chat (no typing required)
- Purchase approval email alerts to admin
- Per-product setup guides with downloadable `SETUP.txt` files
- Signed license verification for desktop apps (2-device limit)

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

Local development only (set your own in production):

- Email: `admin@induswebagency.com`
- Password: set `ADMIN_PASSWORD` in `.env.local` (do not use defaults in production)

Production: set `ADMIN_EMAIL` and `ADMIN_PASSWORD` in Vercel environment variables. The admin password syncs from env when `ADMIN_PASSWORD` changes.

Change via environment variables:
```
ADMIN_EMAIL=your@email.com
ADMIN_PASSWORD=your-secure-password
JWT_SECRET=your-jwt-secret
NEXT_PUBLIC_SITE_URL=https://indus-web-agency.vercel.app
```

### Email notifications (purchase alerts)

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=induswebagency@gmail.com
SMTP_PASS=your-gmail-app-password
ADMIN_NOTIFICATION_EMAIL=induswebagency@gmail.com
```

### Persistent storage (recommended for production)

By default on Vercel, user data is stored in `/tmp` and resets on cold starts. For persistent storage, add a free [Upstash Redis](https://upstash.com) database and set:

```
UPSTASH_REDIS_REST_URL=your-url
UPSTASH_REDIS_REST_TOKEN=your-token
```

The admin dashboard shows **Storage: redis** when connected.

## Scripts

```bash
npm run capture:media      # Sync product screenshots from local repos
npm run capture:media:live # Capture live product UIs via Playwright
npm run generate:setup     # Regenerate public/setup/*.txt files
node scripts/capture-website-screenshots.mjs  # Refresh README screenshots
```

## Deploy

### Vercel
```bash
npx vercel --prod --yes
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
- Nodemailer (purchase alerts)
- Upstash Redis (optional persistence)
- Playwright (media capture)

## License

MIT

---

## Discoverability

**Author:** Muhammad Afzal Kalwar ([@mafzalkalwardev](https://github.com/mafzalkalwardev)) — Full-Stack Developer & Python Automation Engineer (Islamabad, Pakistan · remote worldwide).

**Hire / contact:** GitHub [@mafzalkalwardev](https://github.com/mafzalkalwardev) · LinkedIn [@mafzalkalwardev](https://www.linkedin.com/in/mafzalkalwardev) · WhatsApp [+92 307 9670503](https://wa.me/923079670503) · [Portfolio](https://mafzalkalwardev.github.io) · [Email](mailto:kalwarmuhammadafzal3@gmail.com)

### Who is this for?
Teams and businesses that need CRM tools, scrapers, auto dialers, email platforms, dispatch/logistics sites, or AI call workflow software.

### FAQ
- **Who built this?** Muhammad Afzal Kalwar (`mafzalkalwardev`).
- **Can I hire the author?** Yes — remote freelance and contract. See contact links above.
- **Related work?** Browse [all repositories](https://github.com/mafzalkalwardev?tab=repositories) and the [live portfolio](https://mafzalkalwardev.github.io).

<details>
<summary><strong>SEO / GEO / AEO keywords</strong></summary>

Muhammad Afzal Kalwar, mafzalkalwardev, indus-web-agency, full-stack developer, Python automation engineer, Islamabad Pakistan, freelance remote developer, CRM scraping dialer email AI tools, indus, marketplace, saas, automation, subscriptions, logistics, typescript

</details>

---

## Contact

| Channel | Handle / Number |
|:--|:--|
| GitHub | [@mafzalkalwardev](https://github.com/mafzalkalwardev) |
| LinkedIn | [@mafzalkalwardev](https://www.linkedin.com/in/mafzalkalwardev) |
| WhatsApp | [+92 307 9670503](https://wa.me/923079670503) |
| Portfolio | [mafzalkalwardev.github.io](https://mafzalkalwardev.github.io) |
| Email | [kalwarmuhammadafzal3@gmail.com](mailto:kalwarmuhammadafzal3@gmail.com) |
