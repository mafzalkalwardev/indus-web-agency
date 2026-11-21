export interface PortfolioMetric {
  value: string;
  label: string;
}

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
  /** SEO / niche tags for telecom and other clusters */
  tags?: string[];
  /** Headline metrics shown on case study pages */
  metrics?: PortfolioMetric[];
}

export const PORTFOLIO: PortfolioProject[] = [
  {
    slug: "enterprise-ai-dialer",
    title: "Enterprise AI Multi-Slot Dialer",
    category: "automation",
    client: "INDUS Web Agency",
    summary:
      "Multi-line outbound dialer with AI voice on picked calls, CRM integration, and admin dashboards for high-volume dispatch.",
    results: [
      "Parallel Google Voice lines, with the picked call shown to the agent",
      "Optional AI opener on the picked call",
      "Call logs with CRM disposition sync",
    ],
    technologies: ["Python", "React", "WebRTC", "OpenAI"],
    image: "/images/products/dialer-ai-multi-slot/hero.png",
    featured: true,
    productSlug: "dialer-ai-multi-slot",
    tags: ["telecom", "auto-dialer", "AI voice CRM", "dispatch", "Google Voice", "call center"],
    challenge:
      "High-volume outbound needs more calls in progress without agents watching every ringing line or losing the notes.",
    solution:
      "We built a multi-slot dialer where five lines run in parallel, agents only see the picked call, and AI handles the initial conversation when configured.",
    outcome:
      "The multi-slot flow, with optional AI on the picked call, is published as a licensed INDUS product.",
    body: [
      "Single-line dialing spends agent time on unanswered rings and inconsistent call notes.",
      "We designed slot logic so only the connected call surfaces to the agent UI, with admin dashboards for monitoring, call logs, and CRM export.",
      "AI voice was added on the picked slot for teams that want automated first contact before handoff — configurable per campaign.",
    ],
  },
  {
    slug: "ai-custom-dialer-crm",
    title: "AI Agent Custom Dialer + CRM Stack",
    category: "automation",
    client: "INDUS Web Agency",
    summary:
      "Hybrid build: AI agent dialer engine licensed from INDUS, plus a custom CRM for campaign stages, AI transcripts, and multi-client reporting.",
    results: [
      "AI conversation on the dialer before handoff",
      "Custom CRM for stages, transcripts, and reporting",
      "Dispositions written from the dialer into the CRM",
    ],
    technologies: ["Python", "Next.js", "OpenAI", "PostgreSQL", "WebRTC"],
    image: "/images/products/dialer-ai-multi-slot/crm.png",
    featured: true,
    productSlug: "dialer-ai-agent",
    tags: [
      "telecom",
      "AI agent custom auto dialer",
      "custom CRM",
      "AI voice CRM",
      "outbound",
      "cold calling",
    ],
    challenge:
      "Outbound teams often need AI on the phone and a CRM whose stages match how they work, rather than a generic SaaS CRM with dialing bolted on.",
    solution:
      "We licensed INDUS AI dialer capacity for conversations, then built a custom CRM layer: dispositions, transcripts, client tenancy, and coachable call reviews.",
    outcome:
      "The pattern pairs an INDUS AI dialer with a custom CRM so transcripts and dispositions share one workspace.",
    body: [
      "Off-the-shelf dialer CRMs forced one pipeline for every client. Managers could not filter dials, appointments, and closes by tenant without spreadsheets.",
      "Path A shipped fast: AI Agent / Multi-Slot for calling. Path B (studio) added CRM objects, roles, and reporting wired to dialer events.",
      "Transcripts and dispositions land in the CRM automatically so coaching and billing reports no longer depend on agents remembering to log calls.",
    ],
  },
  {
    slug: "custom-outbound-crm",
    title: "Custom Outbound CRM for Multi-Campaign Teams",
    category: "software",
    client: "INDUS Web Agency",
    summary:
      "Bespoke outbound CRM with campaign isolation, dialer export, disposition taxonomies, and supervisor dashboards—built when HubSpot-style tools did not fit BPO rules.",
    results: [
      "Separate campaign workspaces on one dialer setup",
      "Disposition stages with supervisor dashboards",
      "Dialer export in place of spreadsheet merges",
    ],
    technologies: ["Next.js", "Node.js", "PostgreSQL", "Redis"],
    image: "/images/products/dialer-multi-slot/crm.png",
    featured: true,
    tags: [
      "telecom",
      "custom CRM",
      "BPO CRM",
      "outbound",
      "lead management CRM",
      "Islamabad studio",
    ],
    challenge:
      "Multi-client outbound desks need separate pipelines and reporting while sharing dialer seats. Generic CRMs can leak data across clients or block dialer workflows.",
    solution:
      "INDUS designed a custom outbound CRM: tenant isolation, campaign templates, dialer-ready lead queues, and supervisor KPIs. Dialing stayed on INDUS Multi-Slot products.",
    outcome:
      "The CRM pattern covers tenant isolation, campaign templates, dialer-ready queues, and billing exports.",
    body: [
      "Generic CRMs optimized for inbound deals, not high-volume outbound dispositions and dialer queue hygiene.",
      "We modeled campaigns, lists, DNC flags, and agent roles first—then connected export hooks to the licensed dialer stack.",
      "Built from the Islamabad studio for a remote US desk; the same pattern applies to local Pakistan outbound and global BPO teams.",
    ],
  },
  {
    slug: "mailforge-platform",
    title: "Mailforge Email Operations Suite",
    category: "software",
    client: "INDUS Web Agency",
    summary:
      "Self-hosted email verification, bulk sending, unified inbox, and template management in one subscription-ready platform.",
    results: ["Unified verify + send + inbox", "Multi-SMTP rotation", "Dark-mode operator UI"],
    technologies: ["Node.js", "Go", "React", "MongoDB"],
    image: "/images/products/mailforge/hero.png",
    featured: true,
    productSlug: "mailforge",
    challenge:
      "Email operations are often split across separate verify, send, and inbox tools, with no shared workflow.",
    solution:
      "Mailforge bundles verification, bulk sending, and unified inbox into one self-hosted suite with operator-focused UI and subscription licensing.",
    outcome:
      "Mailforge is the self-hosted suite INDUS publishes for verification, bulk sending, and a unified inbox.",
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
    client: "INDUS Web Agency",
    summary:
      "Playwright-based lead extraction with CRM pipeline, admin roles, and export for outbound prospecting workflows.",
    results: ["Automated lead capture", "Pipeline stages", "Admin approval workflow"],
    technologies: ["Playwright", "Node.js", "SQLite"],
    image: "/images/products/fiverr-lead-extractor/hero.png",
    featured: true,
    productSlug: "fiverr-lead-extractor",
    tags: ["telecom", "lead management CRM", "outbound", "scraper"],
    challenge:
      "Copying marketplace leads into spreadsheets by hand does not leave a pipeline to track.",
    solution:
      "Playwright automation extracts leads into a lightweight CRM with stages, admin roles, and CSV export for outbound teams.",
    outcome:
      "The extractor is part of INDUS's scraper product line, with licensed downloads.",
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
    results: ["Product catalog and subscription licensing", "JWT auth and Redis-backed sessions", "Signed license verification"],
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
