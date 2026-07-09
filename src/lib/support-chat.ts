/** Guided support chat — select-only Q&A tree (no free typing) */

export interface ChatNode {
  id: string;
  message: string;
  options: { label: string; nextId: string }[];
}

export const CHAT_NODES: Record<string, ChatNode> = {
  welcome: {
    id: "welcome",
    message: "Hi! I'm the INDUS Guide. Pick a topic below and I'll help you choose the right product or next step.",
    options: [
      { label: "Which product is best for me?", nextId: "choose-goal" },
      { label: "How do I subscribe?", nextId: "how-subscribe" },
      { label: "How does admin approval work?", nextId: "approval" },
      { label: "How do I download & install?", nextId: "download" },
      { label: "Compare auto dialer plans", nextId: "dialer-compare" },
      { label: "Contact human support", nextId: "contact" },
    ],
  },
  "choose-goal": {
    id: "choose-goal",
    message: "What are you trying to automate?",
    options: [
      { label: "Email verification & campaigns", nextId: "rec-email" },
      { label: "Outbound calling / dispatch", nextId: "rec-dialer" },
      { label: "Web scraping & lead extraction", nextId: "rec-scraper" },
      { label: "All-in-one email platform", nextId: "rec-mailforge" },
      { label: "← Back to main menu", nextId: "welcome" },
    ],
  },
  "rec-email": {
    id: "rec-email",
    message:
      "For email verification, start with **Email Verifier Pro** (cloud dashboard) or **Bulk Email Verifier** (self-hosted Go engine). For sending, add **Auto Email Sender**. Need everything together? **Mailforge** bundles all email tools.",
    options: [
      { label: "View Email Verifier Pro", nextId: "link-evp" },
      { label: "View Mailforge bundle", nextId: "link-mailforge" },
      { label: "← Back", nextId: "choose-goal" },
    ],
  },
  "rec-dialer": {
    id: "rec-dialer",
    message:
      "**DOM/BOM Starter** ($29) — single-line PyAutoGUI dialer.\n**Multi-Slot Agent** ($79) — 5 parallel lines, agent sees picked call only.\n**AI Agent Solo** ($99) — AI talks on every call.\n**Enterprise AI Multi-Slot** ($199) — multi-slot + AI on picked call.",
    options: [
      { label: "Compare all dialer plans", nextId: "link-compare" },
      { label: "View Multi-Slot Agent", nextId: "link-multislot" },
      { label: "← Back", nextId: "choose-goal" },
    ],
  },
  "rec-scraper": {
    id: "rec-scraper",
    message:
      "**Playwright Scraper Pro** — website cloning & screenshots.\n**FMCSA SAFER Scraper** — carrier/MC data from SAFER.\n**Canadian Website Scraper** — encrypted study content.\n**Fiverr Lead Extractor CRM** — full lead CRM with admin dashboard.",
    options: [
      { label: "View all scrapers", nextId: "link-scrapers" },
      { label: "View Fiverr CRM", nextId: "link-fiverr" },
      { label: "← Back", nextId: "choose-goal" },
    ],
  },
  "rec-mailforge": {
    id: "rec-mailforge",
    message:
      "**Mailforge** includes Email Verifier, Auto Email Sender, and Unified Inbox in one self-hosted bundle. Best value if you need verify + send + reply management together. Plans from $79/mo.",
    options: [
      { label: "View Mailforge", nextId: "link-mailforge" },
      { label: "← Back", nextId: "choose-goal" },
    ],
  },
  "how-subscribe": {
    id: "how-subscribe",
    message:
      "1. Create a free account\n2. Pick a product & plan (weekly, monthly, or yearly)\n3. Click Subscribe — status becomes **Pending**\n4. Admin approves within 24 hours\n5. Download from your dashboard with license file",
    options: [
      { label: "Create account", nextId: "link-signup" },
      { label: "Browse products", nextId: "link-products" },
      { label: "← Back", nextId: "welcome" },
    ],
  },
  approval: {
    id: "approval",
    message:
      "Every subscription needs admin approval for security. You'll see **Pending** on your dashboard until approved. Once approved, download unlocks immediately. You'll receive access for your billing period (7, 15, 30, or 365 days).",
    options: [
      { label: "Go to dashboard", nextId: "link-dashboard" },
      { label: "Email support", nextId: "contact" },
      { label: "← Back", nextId: "welcome" },
    ],
  },
  download: {
    id: "download",
    message:
      "After approval: open **My Dashboard** → click **Download** on your product. You get a ZIP + signed license file. Each product includes a SETUP guide on its product page. The app verifies your license online on startup.",
    options: [
      { label: "View setup guides", nextId: "link-products" },
      { label: "Go to dashboard", nextId: "link-dashboard" },
      { label: "← Back", nextId: "welcome" },
    ],
  },
  "dialer-compare": {
    id: "dialer-compare",
    message:
      "| Plan | Best for | From |\n| DOM Starter | Solo agent, DOM automation | $29/mo |\n| Multi-Slot | Teams, 5 parallel lines | $79/mo |\n| AI Solo | Hands-free AI calls | $99/mo |\n| AI Multi-Slot | Enterprise dispatch + AI | $199/mo |",
    options: [
      { label: "Open full comparison page", nextId: "link-compare" },
      { label: "View Live Demos", nextId: "link-demos" },
      { label: "← Back", nextId: "welcome" },
    ],
  },
  contact: {
    id: "contact",
    message:
      "Reach our team anytime:\n📧 induswebagency@gmail.com\n💬 WhatsApp: +92 307 967 0503\n\nWe typically respond within a few hours.",
    options: [
      { label: "← Back to main menu", nextId: "welcome" },
    ],
  },
  // Link nodes redirect via component
  "link-evp": { id: "link-evp", message: "Opening Email Verifier Pro…", options: [{ label: "← Back", nextId: "welcome" }] },
  "link-mailforge": { id: "link-mailforge", message: "Opening Mailforge…", options: [{ label: "← Back", nextId: "welcome" }] },
  "link-multislot": { id: "link-multislot", message: "Opening Multi-Slot Dialer…", options: [{ label: "← Back", nextId: "welcome" }] },
  "link-compare": { id: "link-compare", message: "Opening comparison page…", options: [{ label: "← Back", nextId: "welcome" }] },
  "link-scrapers": { id: "link-scrapers", message: "Opening scrapers…", options: [{ label: "← Back", nextId: "welcome" }] },
  "link-fiverr": { id: "link-fiverr", message: "Opening Fiverr CRM…", options: [{ label: "← Back", nextId: "welcome" }] },
  "link-signup": { id: "link-signup", message: "Opening sign up…", options: [{ label: "← Back", nextId: "welcome" }] },
  "link-products": { id: "link-products", message: "Opening products…", options: [{ label: "← Back", nextId: "welcome" }] },
  "link-dashboard": { id: "link-dashboard", message: "Opening dashboard…", options: [{ label: "← Back", nextId: "welcome" }] },
  "link-demos": { id: "link-demos", message: "Opening demos…", options: [{ label: "← Back", nextId: "welcome" }] },
};

export const LINK_REDIRECTS: Record<string, string> = {
  "link-evp": "/products/email-verifier-pro",
  "link-mailforge": "/products/mailforge",
  "link-multislot": "/products/dialer-multi-slot",
  "link-compare": "/compare",
  "link-scrapers": "/products?cat=scraper",
  "link-fiverr": "/products/fiverr-lead-extractor",
  "link-signup": "/signup",
  "link-products": "/products",
  "link-dashboard": "/dashboard",
  "link-demos": "/demos",
};
