export interface SetupGuide {
  slug: string;
  requirements: string[];
  steps: string[];
  notes?: string[];
}

export const SETUP_GUIDES: Record<string, SetupGuide> = {
  "email-verifier-pro": {
    slug: "email-verifier-pro",
    requirements: ["Node.js 18+", "MongoDB (local or Atlas)", "Windows / macOS / Linux"],
    steps: [
      "Download ZIP from your dashboard after admin approval.",
      "Extract and run: npm install && npm start",
      "Open http://localhost:5000 and register your account.",
      "Place indus-license-email-verifier-pro.json in the project root.",
      "Upload CSV/XLSX lists from the Bulk Verify page.",
    ],
    notes: ["License verifies online on startup — keep internet connected."],
  },
  "bulk-email-verifier": {
    slug: "bulk-email-verifier",
    requirements: ["Node.js 18+", "Docker (optional)", "Go 1.21+ for truemail-go"],
    steps: [
      "Download and extract the ZIP from your dashboard.",
      "Run: npm install && npm start",
      "Open http://localhost:5000 — register and verify emails.",
      "For Docker: docker compose up -d then npm start.",
      "Copy your license JSON to the project root before first launch.",
    ],
  },
  "auto-email-sender": {
    slug: "auto-email-sender",
    requirements: ["Python 3.10+", "SMTP accounts (Gmail, Outlook, etc.)", "Excel contact lists"],
    steps: [
      "Download ZIP and extract.",
      "Run: pip install -r requirements.txt",
      "Launch: python email_launcher.py (or run.cmd on Windows).",
      "Add SMTP accounts in the launcher UI.",
      "Import Excel contacts and start a campaign.",
      "Place license file in the app folder.",
    ],
  },
  "unified-inbox": {
    slug: "unified-inbox",
    requirements: ["Node.js 18+", "IMAP-enabled email accounts", "Part of Mailforge ecosystem"],
    steps: [
      "Included in Mailforge download — or download Mailforge from dashboard.",
      "Run: npm install && npm start",
      "Open http://localhost:5000/inbox.html",
      "Add sender accounts under Senders page first.",
      "Sync inbox — replies appear in Unified Inbox.",
    ],
  },
  mailforge: {
    slug: "mailforge",
    requirements: ["Node.js 18+", "MongoDB", "Optional: Docker for reacher/truemail-go"],
    steps: [
      "Download Mailforge ZIP from dashboard.",
      "Copy .env.example to .env and configure MongoDB URI.",
      "Run: npm run setup && npm start",
      "Open http://localhost:5000 — register admin account.",
      "Use Dashboard → Bulk Verify, Campaigns, Inbox, Senders.",
      "Place indus-license-mailforge.json in project root.",
    ],
    notes: ["For full stack: npm run start:all starts Go verifier + Mongo + app."],
  },
  "dialer-starter-dom": {
    slug: "dialer-starter-dom",
    requirements: ["Windows 10/11", "Python 3.10+", "Google Voice account", "Excel contact list"],
    steps: [
      "Download and extract ZIP.",
      "Run: pip install -r requirements.txt",
      "Launch: python auto_dialer.py",
      "Load Excel contacts → click Start.",
      "Use hotkeys for pause/resume. Logs export to CSV.",
      "Copy license file to app directory.",
    ],
  },
  "dialer-multi-slot": {
    slug: "dialer-multi-slot",
    requirements: ["Windows 10/11", "Python 3.10+", "PyQt6", "Up to 5 Google Voice slots"],
    steps: [
      "Download ZIP from dashboard after approval.",
      "Run: pip install -r requirements.txt",
      "Launch: python autodialer_gui.py",
      "Sign in as agent or admin.",
      "Configure slots under Administration → add Google Voice accounts.",
      "Load contacts in Dialer tab → Start multi-slot campaign.",
      "Place license JSON next to the executable/script.",
    ],
  },
  "dialer-ai-agent": {
    slug: "dialer-ai-agent",
    requirements: ["Windows", "Python 3.10+", "Groq API key", "Google Voice", "Chrome/Edge"],
    steps: [
      "Download and extract.",
      "Copy .env.example to .env — add GROQ_API_KEY.",
      "Run: pip install -r requirements.txt",
      "Start console: python -m src.web_app",
      "Open http://127.0.0.1:8000/run — upload contacts, run preflight.",
      "Place license file in project root.",
    ],
  },
  "dialer-ai-multi-slot": {
    slug: "dialer-ai-multi-slot",
    requirements: ["Windows", "Python 3.10+", "Groq API key", "Multi-slot dialer + AI agent"],
    steps: [
      "Download Enterprise package from dashboard.",
      "Install deps: pip install -r requirements.txt",
      "Configure .env with Groq key and Google Voice slots.",
      "Run autodialer GUI for multi-slot + AI console at :8000/run.",
      "Admin sets slots; AI handles picked calls only.",
      "License file required in both app roots.",
    ],
  },
  "playwright-scraper-pro": {
    slug: "playwright-scraper-pro",
    requirements: ["Node.js 18+", "Playwright browsers"],
    steps: [
      "Download ZIP and extract.",
      "Run: npm install && npx playwright install",
      "Start: npm start → open http://localhost:3000",
      "Enter URL, configure options, click Scrape.",
      "Export saved pages from the Saved Pages panel.",
      "Add license JSON to project root.",
    ],
  },
  "fmcsa-safer-scraper": {
    slug: "fmcsa-safer-scraper",
    requirements: ["Python 3.10+", "Selenium + Edge/Chrome driver"],
    steps: [
      "Download and extract.",
      "Run: pip install -r requirements.txt",
      "Launch: python run.py",
      "Enter MC numbers or upload batch list.",
      "Results export to Excel automatically.",
      "Place license file in app folder.",
    ],
  },
  "canadian-website-scraper": {
    slug: "canadian-website-scraper",
    requirements: ["Node.js 18+", "Playwright"],
    steps: [
      "Download ZIP, extract.",
      "Run: npm install && npx playwright install",
      "Start: npm start → http://localhost:3000",
      "Enter profile credentials on landing page.",
      "Select quiz/review mode and start scrape.",
      "License JSON in project root.",
    ],
  },
  "fiverr-lead-extractor": {
    slug: "fiverr-lead-extractor",
    requirements: ["Node.js 18+", "MongoDB", "Playwright"],
    steps: [
      "Download CRM package from dashboard.",
      "Run: npm install",
      "Start MongoDB locally or use Atlas URI in .env.",
      "Run: npm run client:start:fast",
      "Open http://localhost:3000/login — seed admin if needed.",
      "Create jobs, extract leads, export Excel.",
      "License file in project root.",
    ],
  },
};

export function getSetupGuide(slug: string): SetupGuide | undefined {
  return SETUP_GUIDES[slug];
}
