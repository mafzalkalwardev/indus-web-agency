export type ProductCategory =
  | "email"
  | "dialer"
  | "scraper"
  | "bundle";

export type PlanTier = "starter" | "pro" | "business" | "enterprise";

export interface ProductPlan {
  id: string;
  name: string;
  price: number;
  period: "month" | "year";
  durationDays: number;
  features: string[];
  highlighted?: boolean;
  badge?: string;
}

export interface Product {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: ProductCategory;
  github: string;
  homepage?: string;
  screenshots: string[];
  features: string[];
  plans: ProductPlan[];
  comparison?: { feature: string; starter?: boolean | string; pro?: boolean | string; business?: boolean | string; enterprise?: boolean | string }[];
  downloadUrl?: string;
  techStack: string[];
}

export const PRODUCTS: Product[] = [
  {
    slug: "email-verifier-pro",
    name: "Email Verifier Pro",
    tagline: "Bulk email validation with dashboard analytics",
    description:
      "Full-stack email verification web app with Node.js, Express, MongoDB, JWT authentication, bulk CSV/XLSX validation, dashboard analytics, and validation history.",
    category: "email",
    github: "https://github.com/mafzalkalwardev/email-verifier-pro",
    screenshots: ["/images/products/email-verifier.svg"],
    features: [
      "Syntax, MX, and SMTP mailbox checks",
      "Bulk CSV/XLSX upload",
      "Validation history & analytics",
      "JWT-secured dashboard",
      "Export clean lists",
    ],
    techStack: ["Node.js", "Express", "MongoDB", "JWT"],
    plans: [
      { id: "ev-starter", name: "Starter", price: 19, period: "month", durationDays: 30, features: ["5,000 verifications/mo", "CSV upload", "Email support"] },
      { id: "ev-pro", name: "Pro", price: 49, period: "month", durationDays: 30, features: ["50,000 verifications/mo", "API access", "Priority support"], highlighted: true, badge: "Popular" },
      { id: "ev-business", name: "Business", price: 99, period: "month", durationDays: 30, features: ["Unlimited verifications", "White-label", "Dedicated support"] },
    ],
    downloadUrl: "https://github.com/mafzalkalwardev/email-verifier-pro/archive/refs/heads/main.zip",
  },
  {
    slug: "bulk-email-verifier",
    name: "Bulk Email Verifier",
    tagline: "Self-hosted Go + Node verification engine",
    description:
      "Self-hosted bulk email verification platform with syntax, MX, SMTP mailbox checks, Node.js UI, Go verification services, and Docker deployment.",
    category: "email",
    github: "https://github.com/mafzalkalwardev/bulk-email-verifier",
    screenshots: ["/images/products/bulk-verifier.svg"],
    features: ["Go-powered SMTP checks", "Docker deployment", "Self-hosted privacy", "Node.js admin UI", "High-throughput validation"],
    techStack: ["Go", "Node.js", "Docker"],
    plans: [
      { id: "bev-starter", name: "Self-Hosted", price: 39, period: "month", durationDays: 30, features: ["Docker image access", "100k checks/mo license", "Setup guide"] },
      { id: "bev-pro", name: "Managed", price: 79, period: "month", durationDays: 30, features: ["Hosted instance", "500k checks/mo", "Auto updates"], highlighted: true },
    ],
    downloadUrl: "https://github.com/mafzalkalwardev/bulk-email-verifier/archive/refs/heads/main.zip",
  },
  {
    slug: "auto-email-sender",
    name: "Auto Email Sender",
    tagline: "Multi-SMTP parallel outreach automation",
    description:
      "Python multi-account SMTP automation with parallel sender launching, recipient distribution, retry handling, logging, and randomized templates.",
    category: "email",
    github: "https://github.com/mafzalkalwardev/multi-smtp-email-automation",
    screenshots: ["/images/products/email-sender.svg"],
    features: ["Multi-SMTP parallel sending", "Excel contact import", "Randomized templates", "Retry & delay controls", "Send logs & tracking"],
    techStack: ["Python", "SMTP", "Excel"],
    plans: [
      { id: "aes-starter", name: "Starter", price: 29, period: "month", durationDays: 30, features: ["2 SMTP accounts", "1,000 emails/day", "Template library"] },
      { id: "aes-pro", name: "Pro", price: 59, period: "month", durationDays: 30, features: ["10 SMTP accounts", "10,000 emails/day", "A/B templates"], highlighted: true },
      { id: "aes-business", name: "Business", price: 119, period: "month", durationDays: 30, features: ["Unlimited SMTP", "Unlimited sends", "Dedicated IP guidance"] },
    ],
    downloadUrl: "https://github.com/mafzalkalwardev/multi-smtp-email-automation/archive/refs/heads/main.zip",
  },
  {
    slug: "unified-inbox",
    name: "Unified Inbox",
    tagline: "Centralized email reply management",
    description:
      "Unified inbox for managing replies across multiple email accounts. Part of the Mailforge ecosystem — consolidate outreach responses in one dashboard.",
    category: "email",
    github: "https://github.com/mafzalkalwardev/mailforge",
    screenshots: ["/images/products/unified-inbox.svg"],
    features: ["Multi-account inbox sync", "Reply threading", "Lead tagging", "Quick response templates", "Search & filters"],
    techStack: ["Node.js", "IMAP/SMTP", "React"],
    plans: [
      { id: "ui-starter", name: "Starter", price: 25, period: "month", durationDays: 30, features: ["3 email accounts", "Basic threading", "30-day history"] },
      { id: "ui-pro", name: "Pro", price: 55, period: "month", durationDays: 30, features: ["15 email accounts", "Advanced filters", "1-year history"], highlighted: true },
    ],
    downloadUrl: "https://github.com/mafzalkalwardev/mailforge/archive/refs/heads/main.zip",
  },
  {
    slug: "mailforge",
    name: "Mailforge",
    tagline: "Complete email marketing operations platform",
    description:
      "Self-hosted email operations platform for list verification, multi-sender outreach campaigns, reply management, and private email workflow automation. Includes all email product subscriptions.",
    category: "bundle",
    github: "https://github.com/mafzalkalwardev/mailforge",
    screenshots: ["/images/products/mailforge.svg"],
    features: [
      "Email Verifier included",
      "Auto Email Sender included",
      "Unified Inbox included",
      "Campaign management",
      "Self-hosted deployment",
    ],
    techStack: ["Node.js", "Python", "Docker"],
    plans: [
      { id: "mf-starter", name: "Starter Bundle", price: 79, period: "month", durationDays: 30, features: ["All email tools", "Self-hosted", "Community support"] },
      { id: "mf-pro", name: "Pro Bundle", price: 149, period: "month", durationDays: 30, features: ["All email tools", "Managed hosting option", "Priority support"], highlighted: true, badge: "Best Value" },
      { id: "mf-enterprise", name: "Enterprise", price: 299, period: "month", durationDays: 30, features: ["All email tools", "Dedicated instance", "SLA & onboarding"] },
    ],
    downloadUrl: "https://github.com/mafzalkalwardev/mailforge/archive/refs/heads/main.zip",
    comparison: [
      { feature: "Email Verifier", starter: true, pro: true, enterprise: true },
      { feature: "Auto Email Sender", starter: true, pro: true, enterprise: true },
      { feature: "Unified Inbox", starter: true, pro: true, enterprise: true },
      { feature: "Managed Hosting", starter: false, pro: true, enterprise: true },
      { feature: "Dedicated Instance", starter: false, pro: false, enterprise: true },
    ],
  },
  {
    slug: "dialer-starter-dom",
    name: "Auto Dialer — DOM/BOM Starter",
    tagline: "PyAutoGUI desktop dialer with DOM automation",
    description:
      "Python GUI auto dialer with Excel contact loading, automated dial pad control via PyAutoGUI, call logging, resume support, hotkeys, and DOM/BOM browser automation for Google Voice.",
    category: "dialer",
    github: "https://github.com/mafzalkalwardev/python-auto-dialer-pro",
    screenshots: [
      "/images/screenshots/dialer-light.png",
      "/images/screenshots/login-light.png",
      "/images/screenshots/call-logs-light.png",
    ],
    features: [
      "DOM/BOM browser automation",
      "PyAutoGUI dial pad control",
      "Excel contact import",
      "Call logging & CSV export",
      "Resume-safe calling",
      "Hotkey controls",
    ],
    techStack: ["Python", "PyAutoGUI", "PyQt6", "Selenium"],
    plans: [
      { id: "dial-dom-starter", name: "Starter", price: 29, period: "month", durationDays: 30, features: ["1 agent seat", "Single line", "Excel import", "Call logs"] },
      { id: "dial-dom-pro", name: "Pro", price: 49, period: "month", durationDays: 30, features: ["3 agent seats", "Single line", "CRM module", "Priority updates"], highlighted: true },
    ],
    downloadUrl: "https://github.com/mafzalkalwardev/python-auto-dialer-pro/archive/refs/heads/main.zip",
  },
  {
    slug: "dialer-multi-slot",
    name: "Auto Dialer — Multi-Slot Agent",
    tagline: "5 parallel lines, agent sees only the picked call",
    description:
      "Professional Windows auto dialer with up to 5 Google Voice slots running in parallel. The system dials across all lines but shows the agent only the call that was picked — others are automatically skipped.",
    category: "dialer",
    github: "https://github.com/mafzalkalwardev/indus-transport-auto-dialer",
    screenshots: [
      "/images/screenshots/live-calls-light.png",
      "/images/screenshots/dialer-light.png",
      "/images/screenshots/administration-light.png",
    ],
    features: [
      "Up to 5 parallel dial slots",
      "Agent sees only picked call",
      "Auto-skip unpicked lines",
      "AMD voicemail detection",
      "Predictive pacing",
      "Admin user management",
      "CRM & call logs",
    ],
    techStack: ["Python", "PyQt6", "Google Voice", "AMD"],
    plans: [
      { id: "dial-slot-starter", name: "3 Slots", price: 79, period: "month", durationDays: 30, features: ["3 parallel lines", "5 agent seats", "AMD detection", "Call logs"] },
      { id: "dial-slot-pro", name: "5 Slots", price: 129, period: "month", durationDays: 30, features: ["5 parallel lines", "15 agent seats", "Predictive pacing", "CRM"], highlighted: true, badge: "Popular" },
      { id: "dial-slot-business", name: "10 Slots", price: 199, period: "month", durationDays: 30, features: ["10 parallel lines", "Unlimited agents", "Admin dashboard", "Priority support"] },
    ],
    downloadUrl: "https://github.com/mafzalkalwardev/indus-transport-auto-dialer/archive/refs/heads/main.zip",
    comparison: [
      { feature: "Parallel dial slots", starter: "3", pro: "5", business: "10" },
      { feature: "Agent single-call view", starter: true, pro: true, business: true },
      { feature: "AMD voicemail detection", starter: true, pro: true, business: true },
      { feature: "Predictive pacing", starter: false, pro: true, business: true },
      { feature: "CRM module", starter: false, pro: true, business: true },
    ],
  },
  {
    slug: "dialer-ai-agent",
    name: "Auto Dialer — AI Agent Solo",
    tagline: "AI talks automatically on every call",
    description:
      "Selenium-based Google Voice dispatch assistant with Groq-generated call scripts, local TTS, voicemail handling, and low-cost outbound workflow automation. The AI agent handles conversations automatically.",
    category: "dialer",
    github: "https://github.com/mafzalkalwardev/google-voice-dispatch-agent",
    screenshots: ["/images/products/ai-dialer.svg"],
    features: [
      "AI-powered call scripts (Groq)",
      "Local text-to-speech",
      "Automatic voicemail handling",
      "Continuous auto-dialing",
      "Call outcome logging",
      "Low-cost outbound automation",
    ],
    techStack: ["Python", "Groq AI", "Selenium", "TTS"],
    plans: [
      { id: "dial-ai-starter", name: "AI Starter", price: 99, period: "month", durationDays: 30, features: ["1 line", "500 AI calls/mo", "Script templates"] },
      { id: "dial-ai-pro", name: "AI Pro", price: 179, period: "month", durationDays: 30, features: ["1 line", "Unlimited AI calls", "Custom scripts"], highlighted: true },
    ],
    downloadUrl: "https://github.com/mafzalkalwardev/google-voice-dispatch-agent/archive/refs/heads/main.zip",
  },
  {
    slug: "dialer-ai-multi-slot",
    name: "Auto Dialer — Enterprise AI Multi-Slot",
    tagline: "Multi-slot dialing with AI on the picked call",
    description:
      "The ultimate dialer: up to 5 parallel Google Voice slots with AI agent handling the conversation on whichever call is picked. Combines multi-slot predictive dialing with Groq-powered AI voice automation.",
    category: "dialer",
    github: "https://github.com/mafzalkalwardev/indus-transport-auto-dialer",
    screenshots: [
      "/images/screenshots/live-calls-dark.png",
      "/images/screenshots/administration-dark.png",
      "/images/screenshots/crm-dark.png",
    ],
    features: [
      "Up to 5 parallel AI-enabled slots",
      "AI talks on picked call only",
      "Multi-slot skip logic",
      "Groq AI script generation",
      "AMD + voicemail detection",
      "Full admin dashboard",
      "CRM & analytics",
    ],
    techStack: ["Python", "PyQt6", "Groq AI", "Google Voice"],
    plans: [
      { id: "dial-ai-ms-starter", name: "3 Slots + AI", price: 199, period: "month", durationDays: 30, features: ["3 AI slots", "10 agent seats", "500 AI calls/mo"] },
      { id: "dial-ai-ms-pro", name: "5 Slots + AI", price: 299, period: "month", durationDays: 30, features: ["5 AI slots", "25 agent seats", "Unlimited AI calls"], highlighted: true, badge: "Enterprise" },
      { id: "dial-ai-ms-enterprise", name: "Custom", price: 499, period: "month", durationDays: 30, features: ["10+ AI slots", "Unlimited agents", "Dedicated support", "Custom AI scripts"] },
    ],
    downloadUrl: "https://github.com/mafzalkalwardev/indus-transport-auto-dialer/archive/refs/heads/main.zip",
    comparison: [
      { feature: "Parallel AI slots", starter: "3", pro: "5", enterprise: "10+" },
      { feature: "AI auto-conversation", starter: true, pro: true, enterprise: true },
      { feature: "Agent override/listen", starter: true, pro: true, enterprise: true },
      { feature: "Custom AI scripts", starter: false, pro: true, enterprise: true },
      { feature: "Dedicated support", starter: false, pro: false, enterprise: true },
    ],
  },
  {
    slug: "playwright-scraper-pro",
    name: "Playwright Website Scraper Pro",
    tagline: "Advanced website cloning & scraping toolkit",
    description:
      "Advanced website scraping and cloning toolkit with Playwright automation, desktop GUI, Express backend, screenshots, asset downloading, and multi-page export.",
    category: "scraper",
    github: "https://github.com/mafzalkalwardev/playwright-website-scraper-pro",
    screenshots: ["/images/products/scraper.svg"],
    features: ["Playwright automation", "Desktop GUI", "Screenshot capture", "Asset downloading", "Multi-page export"],
    techStack: ["Playwright", "Express", "Electron"],
    plans: [
      { id: "scrape-pw-starter", name: "Starter", price: 35, period: "month", durationDays: 30, features: ["50 pages/mo", "Basic export", "Email support"] },
      { id: "scrape-pw-pro", name: "Pro", price: 69, period: "month", durationDays: 30, features: ["Unlimited pages", "GUI + CLI", "Priority support"], highlighted: true },
    ],
    downloadUrl: "https://github.com/mafzalkalwardev/playwright-website-scraper-pro/archive/refs/heads/main.zip",
  },
  {
    slug: "fmcsa-safer-scraper",
    name: "FMCSA SAFER Scraper",
    tagline: "Carrier & MC data extraction from SAFER",
    description:
      "Python Selenium scraper for extracting carrier and MC data from FMCSA SAFER, including company details, phone numbers, addresses, and emails.",
    category: "scraper",
    github: "https://github.com/mafzalkalwardev/fmcsa-safer-scraper",
    screenshots: ["/images/products/fmcsa-scraper.svg"],
    features: ["SAFER carrier lookup", "MC number extraction", "Phone & email harvest", "Excel export", "Batch processing"],
    techStack: ["Python", "Selenium"],
    plans: [
      { id: "scrape-fmcsa-starter", name: "Starter", price: 29, period: "month", durationDays: 30, features: ["1,000 records/mo", "Excel export"] },
      { id: "scrape-fmcsa-pro", name: "Pro", price: 59, period: "month", durationDays: 30, features: ["10,000 records/mo", "API access"], highlighted: true },
    ],
    downloadUrl: "https://github.com/mafzalkalwardev/fmcsa-safer-scraper/archive/refs/heads/main.zip",
  },
  {
    slug: "canadian-website-scraper",
    name: "Canadian Website Scraper",
    tagline: "Playwright scraper for encrypted study content",
    description:
      "Python Playwright scraper for Canadian study websites including encrypted voices, text, MCQs, pictures, and full website replica generation.",
    category: "scraper",
    github: "https://github.com/mafzalkalwardev/Canadian-Website-Scraper",
    screenshots: ["/images/products/canadian-scraper.svg"],
    features: ["Encrypted content extraction", "Voice & text capture", "MCQ harvesting", "Image downloading", "Replica site builder"],
    techStack: ["Python", "Playwright"],
    plans: [
      { id: "scrape-ca-starter", name: "Starter", price: 39, period: "month", durationDays: 30, features: ["5 sites/mo", "Basic export"] },
      { id: "scrape-ca-pro", name: "Pro", price: 79, period: "month", durationDays: 30, features: ["Unlimited sites", "Replica builder"], highlighted: true },
    ],
    downloadUrl: "https://github.com/mafzalkalwardev/Canadian-Website-Scraper/archive/refs/heads/main.zip",
  },
  {
    slug: "fiverr-lead-extractor",
    name: "Fiverr Lead Extractor CRM",
    tagline: "Full-stack lead extraction with admin dashboard",
    description:
      "Full-stack lead extraction CRM for Fiverr review research with Playwright workers, MongoDB, BullMQ queues, Excel export, admin dashboard, and Electron desktop packaging.",
    category: "scraper",
    github: "https://github.com/mafzalkalwardev/fiverr-lead-extractor-crm",
    screenshots: ["/images/products/fiverr-crm.svg"],
    features: ["Playwright workers", "BullMQ job queues", "MongoDB storage", "Excel export", "Electron desktop app", "Admin dashboard"],
    techStack: ["Node.js", "Playwright", "MongoDB", "Electron"],
    plans: [
      { id: "scrape-fiverr-starter", name: "Starter", price: 45, period: "month", durationDays: 30, features: ["500 leads/mo", "Excel export"] },
      { id: "scrape-fiverr-pro", name: "Pro", price: 89, period: "month", durationDays: 30, features: ["5,000 leads/mo", "CRM dashboard"], highlighted: true },
    ],
    downloadUrl: "https://github.com/mafzalkalwardev/fiverr-lead-extractor-crm/archive/refs/heads/main.zip",
  },
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return PRODUCTS.filter((p) => p.category === category);
}

export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  email: "Email Tools",
  dialer: "Auto Dialers",
  scraper: "Web Scrapers",
  bundle: "Bundles",
};

export const DIALER_COMPARISON = [
  { feature: "DOM/BOM automation", dom: true, multiSlot: false, aiSolo: false, aiMulti: false },
  { feature: "PyAutoGUI dial control", dom: true, multiSlot: false, aiSolo: false, aiMulti: false },
  { feature: "Parallel dial slots", dom: false, multiSlot: "Up to 5", aiSolo: false, aiMulti: "Up to 5" },
  { feature: "Agent sees picked call only", dom: false, multiSlot: true, aiSolo: false, aiMulti: true },
  { feature: "AI auto-conversation", dom: false, multiSlot: false, aiSolo: true, aiMulti: true },
  { feature: "AMD voicemail detection", dom: false, multiSlot: true, aiSolo: true, aiMulti: true },
  { feature: "CRM & call logs", dom: "Basic", multiSlot: true, aiSolo: "Basic", aiMulti: true },
  { feature: "Admin dashboard", dom: false, multiSlot: true, aiSolo: false, aiMulti: true },
  { feature: "Starting price", dom: "$29/mo", multiSlot: "$79/mo", aiSolo: "$99/mo", aiMulti: "$199/mo" },
];
