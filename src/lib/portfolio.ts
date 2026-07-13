export interface PortfolioProject {
  slug: string;
  title: string;
  category: "software" | "website" | "automation";
  client: string;
  summary: string;
  results: string[];
  technologies: string[];
  image: string;
  featured?: boolean;
  challenge?: string;
  solution?: string;
  outcome?: string;
  body?: string[];
  productSlug?: string;
}

export const PORTFOLIO: PortfolioProject[] = [
  {
    slug: "enterprise-ai-dialer",
    title: "Enterprise AI Multi-Slot Dialer",
    category: "automation",
    client: "Dispatch operations team",
    summary:
      "Multi-line outbound dialer with AI voice on picked calls, CRM integration, and admin dashboards for high-volume dispatch.",
    results: ["5 parallel lines per agent", "AI handles initial contact", "Real-time call logs & CRM sync"],
    technologies: ["Python", "React", "WebRTC", "OpenAI"],
    image: "/images/products/dialer-ai-multi-slot/hero.png",
    featured: true,
    productSlug: "dialer-ai-multi-slot",
    challenge:
      "A dispatch team needed to place far more outbound calls per hour without agents juggling ringing lines or missing hot leads.",
    solution:
      "We built a multi-slot dialer where five lines run in parallel, agents only see the picked call, and AI handles the initial conversation when configured.",
    outcome:
      "Operators scaled outbound volume while keeping agent focus on qualified conversations — the same system is now available as a licensed product.",
    body: [
      "The client had outgrown single-line dialers and manual CRM updates. Agents were losing time on unanswered rings and inconsistent call notes.",
      "We designed slot logic so only the connected call surfaces to the agent UI, with admin dashboards for monitoring, call logs, and CRM export.",
      "AI voice was added on the picked slot for teams that want automated first contact before handoff — configurable per campaign.",
    ],
  },
  {
    slug: "mailforge-platform",
    title: "Mailforge Email Operations Suite",
    category: "software",
    client: "Marketing agency",
    summary:
      "Self-hosted email verification, bulk sending, unified inbox, and template management in one subscription-ready platform.",
    results: ["Unified verify + send + inbox", "Multi-SMTP rotation", "Dark-mode operator UI"],
    technologies: ["Node.js", "Go", "React", "MongoDB"],
    image: "/images/products/mailforge/hero.png",
    featured: true,
    productSlug: "mailforge",
    challenge:
      "An agency was stitching together separate verify, send, and inbox tools — with no unified workflow or licensing model.",
    solution:
      "Mailforge bundles verification, bulk sending, and unified inbox into one self-hosted suite with operator-focused UI and subscription licensing.",
    outcome:
      "One platform replaced three tools. The agency reduced setup friction and now licenses Mailforge to their own clients.",
    body: [
      "Email ops were fragmented across desktop verifiers, SMTP senders, and shared inboxes with no shared data model.",
      "We unified the stack with a Go verification engine, Node sending layer, and React dashboard — all under one license file.",
      "Multi-SMTP rotation, template management, and dark-mode UI were built for operators running campaigns daily.",
    ],
  },
  {
    slug: "lead-scraper-crm",
    title: "Fiverr Lead Extractor CRM",
    category: "automation",
    client: "Freelance sales team",
    summary:
      "Playwright-based lead extraction with CRM pipeline, admin roles, and export for outbound prospecting workflows.",
    results: ["Automated lead capture", "Pipeline stages", "Admin approval workflow"],
    technologies: ["Playwright", "Node.js", "SQLite"],
    image: "/images/products/fiverr-lead-extractor/hero.png",
    featured: true,
    productSlug: "fiverr-lead-extractor",
    challenge:
      "A freelance sales team spent hours manually copying leads from marketplaces into spreadsheets with no pipeline tracking.",
    solution:
      "Playwright automation extracts leads into a lightweight CRM with stages, admin roles, and CSV export for outbound teams.",
    outcome:
      "Prospecting time dropped sharply. The tool is now part of INDUS's scraper product line with licensed downloads.",
    body: [
      "Manual copy-paste from listing pages was error-prone and didn't scale across multiple researchers.",
      "We built resilient Playwright flows with retry logic, deduplication, and a simple pipeline UI non-technical users could run.",
      "Admin approval gates bulk exports so team leads control data quality before outreach begins.",
    ],
  },
  {
    slug: "subscription-marketplace",
    title: "INDUS Software Marketplace",
    category: "website",
    client: "INDUS Web Agency",
    summary:
      "This platform — product catalog, subscription licensing, admin approvals, secure downloads, and client dashboard.",
    results: ["13+ products live", "JWT auth + Redis", "Signed license verification"],
    technologies: ["Next.js 16", "TypeScript", "Upstash", "Vercel"],
    image: "/images/products/email-verifier-pro/hero.png",
    featured: true,
    challenge:
      "INDUS needed one public site that sells subscriptions and represents the custom studio — without two separate brands.",
    solution:
      "A dual-path marketplace: agency pages for custom work, product shelf for licensed tools, shared auth, admin, and email flows.",
    outcome:
      "Customers subscribe, get approved, and download with signed licenses — while prospects can also start custom projects from the same site.",
    body: [
      "The site merges studio positioning with a product catalog, pricing, demos, and secure download infrastructure.",
      "Admin portal handles subscription approvals, contact inquiries, and project leads in one place.",
      "RS256 license signing and online verification protect desktop apps while keeping the purchase flow simple.",
    ],
  },
];

export function getPortfolioProject(slug: string): PortfolioProject | undefined {
  return PORTFOLIO.find((p) => p.slug === slug);
}
