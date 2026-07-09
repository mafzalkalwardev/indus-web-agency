#!/usr/bin/env node
/** Generate public/setup/{slug}.txt from setup-guides.ts data */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "public", "setup");

// Inline mirror of setup guides (keeps script standalone for node without ts)
const guides = {
  "email-verifier-pro": { requirements: ["Node.js 18+", "MongoDB", "Windows/macOS/Linux"], steps: ["Download ZIP from dashboard", "npm install && npm start", "Open http://localhost:5000", "Place license JSON in root", "Upload CSV/XLSX for bulk verify"] },
  "bulk-email-verifier": { requirements: ["Node.js 18+", "Docker optional", "Go 1.21+"], steps: ["Download ZIP", "npm install && npm start", "Open http://localhost:5000", "docker compose up -d (optional)", "Copy license to root"] },
  "auto-email-sender": { requirements: ["Python 3.10+", "SMTP accounts", "Excel lists"], steps: ["Download ZIP", "pip install -r requirements.txt", "python email_launcher.py", "Add SMTP accounts", "Import contacts and send"] },
  "unified-inbox": { requirements: ["Node.js 18+", "IMAP accounts", "Mailforge"], steps: ["Download Mailforge", "npm install && npm start", "Open /inbox.html", "Add senders first", "Sync inbox"] },
  mailforge: { requirements: ["Node.js 18+", "MongoDB"], steps: ["Download ZIP", "cp .env.example .env", "npm run setup && npm start", "Register at localhost:5000", "Use Dashboard, Campaigns, Inbox"] },
  "dialer-starter-dom": { requirements: ["Windows", "Python 3.10+", "Google Voice"], steps: ["Download ZIP", "pip install -r requirements.txt", "python auto_dialer.py", "Load Excel", "Start dialing"] },
  "dialer-multi-slot": { requirements: ["Windows", "Python 3.10+", "5 Google Voice slots"], steps: ["Download ZIP", "pip install -r requirements.txt", "python autodialer_gui.py", "Admin: configure slots", "Agent: load contacts and dial"] },
  "dialer-ai-agent": { requirements: ["Windows", "Python 3.10+", "Groq API key"], steps: ["Download ZIP", "Set GROQ_API_KEY in .env", "pip install -r requirements.txt", "python -m src.web_app", "Open http://127.0.0.1:8000/run"] },
  "dialer-ai-multi-slot": { requirements: ["Windows", "Python 3.10+", "Groq API key"], steps: ["Download enterprise ZIP", "pip install -r requirements.txt", "Configure slots + AI", "Run GUI + web console", "License in both roots"] },
  "playwright-scraper-pro": { requirements: ["Node.js 18+", "Playwright"], steps: ["Download ZIP", "npm install && npx playwright install", "npm start", "Open http://localhost:3000", "Enter URL and scrape"] },
  "fmcsa-safer-scraper": { requirements: ["Python 3.10+", "Selenium"], steps: ["Download ZIP", "pip install -r requirements.txt", "python run.py", "Enter MC numbers", "Export Excel"] },
  "canadian-website-scraper": { requirements: ["Node.js 18+", "Playwright"], steps: ["Download ZIP", "npm install && npx playwright install", "npm start", "Login on localhost:3000", "Start scrape"] },
  "fiverr-lead-extractor": { requirements: ["Node.js 18+", "MongoDB"], steps: ["Download ZIP", "npm install", "npm run client:start:fast", "Login localhost:3000", "Create jobs and export leads"] },
};

fs.mkdirSync(OUT, { recursive: true });
for (const [slug, g] of Object.entries(guides)) {
  const text = [
    `INDUS Web Agency — Setup Guide`,
    `Product: ${slug}`,
    `Support: induswebagency@gmail.com | WhatsApp: +92 307 967 0503`,
    ``,
    `REQUIREMENTS:`,
    ...g.requirements.map((r) => `  - ${r}`),
    ``,
    `STEPS:`,
    ...g.steps.map((s, i) => `  ${i + 1}. ${s}`),
    ``,
    `License: Place indus-license-${slug}.json in project root after download.`,
    `Approval: Subscribe on indus-web-agency.vercel.app — admin approves within 24h.`,
  ].join("\n");
  fs.writeFileSync(path.join(OUT, `${slug}.txt`), text);
}
console.log(`Generated ${Object.keys(guides).length} setup files in public/setup/`);
