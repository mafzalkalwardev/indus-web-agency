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
  },
];
