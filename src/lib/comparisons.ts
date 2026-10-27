import type { FaqItem } from "@/lib/schema";

export interface ComparisonRow {
  feature: string;
  left: string;
  right: string;
}

export interface ComparisonPage {
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  eyebrow: string;
  leftLabel: string;
  rightLabel: string;
  answer: string;
  who: string;
  verdict: string;
  rows: ComparisonRow[];
  relatedLinks: { href: string; label: string }[];
  faqs: FaqItem[];
  publishedAt: string;
}

export const COMPARISONS: ComparisonPage[] = [
  {
    slug: "ai-dialer-crm-vs-saas",
    title: "AI Agent Custom Dialer + CRM vs Generic SaaS Dialers",
    metaTitle: "AI Custom Dialer CRM vs SaaS Dialers — Comparison",
    description:
      "Compare best AI agent custom auto dialers with CRMs against generic SaaS dialers: AI voice, custom CRM fit, Google Voice workflows, and when to license vs build with INDUS.",
    primaryKeyword: "best AI agent custom auto dialers with CRM",
    secondaryKeywords: [
      "AI dialer with custom CRM vs SaaS",
      "custom auto dialer software comparison",
      "AI voice dialer CRM vs Mojo Orum",
      "bespoke dialer CRM vs subscription dialer",
    ],
    eyebrow: "Dialer + CRM comparison",
    leftLabel: "INDUS AI dialer + custom CRM",
    rightLabel: "Typical SaaS dialer",
    answer:
      "Generic SaaS dialers ship fast for standard cold calling. Best AI agent custom auto dialers with CRMs win when you need conversational AI plus a CRM that matches your stages, clients, or industry—INDUS licenses AI dialers and builds the CRM layer when off-the-shelf fields break.",
    who: "Outbound agencies, SDRs, BPOs, and dispatch teams comparing “buy a dialer” vs “buy dialer + customize CRM.”",
    verdict:
      "Choose SaaS alone for simple one-pipeline teams. Choose INDUS hybrid (licensed AI dialer + optional custom CRM) when AI conversations and CRM truth must match your operations—not a vendor’s default objects.",
    rows: [
      {
        feature: "AI agent on live calls",
        left: "AI Agent Solo / Enterprise AI Multi-Slot with handoff",
        right: "Often scripts, AMD, or add-on bots only",
      },
      {
        feature: "CRM flexibility",
        left: "Built-in CRM modules + studio custom CRM",
        right: "Fixed objects; limited multi-client tenancy",
      },
      {
        feature: "Google Voice / multi-slot",
        left: "Native multi-slot plans from $29–$199/mo",
        right: "Varies; many force SIP or carrier lock-in",
      },
      {
        feature: "Time to first dials",
        left: "Days on licensed product; weeks if custom CRM",
        right: "Hours–days if your process fits the template",
      },
      {
        feature: "Data ownership",
        left: "Self-hosted / licensed downloads + custom DB",
        right: "Vendor cloud; export quality varies",
      },
      {
        feature: "Best for",
        left: "AI + custom pipelines, BPOs, telecom workflows",
        right: "Standard SMB cold calling out of the box",
      },
    ],
    relatedLinks: [
      { href: "/telecom/use-cases/ai-custom-dialer-crm", label: "AI custom dialer + CRM use case" },
      { href: "/work/ai-custom-dialer-crm", label: "Metric case study" },
      { href: "/compare", label: "INDUS plan comparison" },
      { href: "/start-project", label: "Start a hybrid project" },
    ],
    faqs: [
      {
        q: "Is a custom AI dialer CRM better than SaaS?",
        a: "Better when your pipeline, clients, or AI logging do not fit SaaS objects. SaaS is better when you need same-day dialing with a standard CRM.",
      },
      {
        q: "Can INDUS replace our SaaS dialer?",
        a: "Often yes for Google Voice multi-slot and AI agent use cases. We also hybrid—keep SaaS CRM, swap dialing—or build a custom CRM around INDUS dialers.",
      },
    ],
    publishedAt: "2026-04-26",
  },
  {
    slug: "custom-crm-vs-off-the-shelf",
    title: "Custom CRM vs Off-the-Shelf (HubSpot, Salesforce & Dialer CRMs)",
    metaTitle: "Custom CRM vs Off-the-Shelf — When to Build",
    description:
      "Custom CRM vs off-the-shelf for outbound teams: when HubSpot/Salesforce/dialer CRMs are enough, and when INDUS builds a bespoke CRM around auto dialers.",
    primaryKeyword: "custom CRM vs off the shelf",
    secondaryKeywords: [
      "custom CRM for auto dialers",
      "build vs buy CRM outbound",
      "bespoke CRM vs Salesforce",
      "custom CRM with AI dialer",
    ],
    eyebrow: "CRM build vs buy",
    leftLabel: "Custom CRM (INDUS studio)",
    rightLabel: "Off-the-shelf CRM",
    answer:
      "Off-the-shelf CRMs win for standard sales pipelines and app ecosystems. Custom CRMs win for outbound dialer queues, multi-client BPO isolation, industry fields, and AI transcript workflows that generic tools force into workarounds.",
    who: "Ops leaders stuck between Zapier glue and a six-figure Salesforce rewrite—especially teams already dialing with INDUS or similar tools.",
    verdict:
      "Buy off-the-shelf when deals and marketing automation are the center. Build custom (or hybrid) when dialer dispositions, list hygiene, and client tenancy are the product.",
    rows: [
      {
        feature: "Outbound dialer fit",
        left: "Designed around queues, DNC, dispositions",
        right: "Often bolted on via dialer integrations",
      },
      {
        feature: "Multi-client / BPO",
        left: "First-class tenant isolation",
        right: "Possible with complexity and cost",
      },
      {
        feature: "AI call transcripts",
        left: "Native objects + coaching views",
        right: "Custom objects or third-party apps",
      },
      {
        feature: "Upfront cost",
        left: "Project fee; you own the model",
        right: "Lower start; seats + add-ons grow",
      },
      {
        feature: "Ecosystem apps",
        left: "Build what you need",
        right: "Huge marketplace (HubSpot/SF)",
      },
      {
        feature: "Time to value",
        left: "Weeks for MVP with INDUS",
        right: "Days if process maps cleanly",
      },
    ],
    relatedLinks: [
      { href: "/work/custom-outbound-crm", label: "Custom outbound CRM case study" },
      { href: "/guides/custom-software-vs-off-the-shelf", label: "Build vs buy guide" },
      { href: "/telecom/crm-types", label: "Telecom CRM taxonomy" },
      { href: "/start-project", label: "Request a CRM scope" },
    ],
    faqs: [
      {
        q: "Should I customize Salesforce or build a custom CRM?",
        a: "Customize Salesforce if your org already lives there and compliance/IT require it. Build custom when outbound dialing is the core product and Salesforce becomes expensive glue.",
      },
      {
        q: "Does INDUS integrate with HubSpot or Salesforce?",
        a: "Yes—studio projects can sync dispositions and leads. Many teams still prefer a slim custom CRM in front of the dialer for speed.",
      },
    ],
    publishedAt: "2026-04-26",
  },
  {
    slug: "web-agency-islamabad",
    title: "Best Web Agencies in Islamabad: INDUS vs Typical Agencies & Freelancers",
    metaTitle: "Best Web Agencies in Islamabad — INDUS Comparison",
    description:
      "Compare best web agencies in Islamabad: INDUS (productized dialers + custom CRMs) vs typical marketing agencies and freelancers. What to look for in Islamabad web agencies.",
    primaryKeyword: "best web agencies in Islamabad",
    secondaryKeywords: [
      "web agencies in Islamabad",
      "software house Islamabad vs agency",
      "custom software agency Pakistan",
      "Islamabad web development company",
    ],
    eyebrow: "Local agency comparison",
    leftLabel: "INDUS Web Agency",
    rightLabel: "Typical agency / freelancer",
    answer:
      "Many web agencies in Islamabad ship sites and WordPress. INDUS is a dual studio: licensed auto dialers / AI agents with CRMs, plus custom software and CRM builds for local and global clients—useful when “best web agencies in Islamabad” must also mean real product engineering.",
    who: "Founders comparing Islamabad agencies for websites, custom CRMs, dialers, or ongoing product work—not only brochure sites.",
    verdict:
      "Pick a marketing-led agency for brand sites and ads. Pick INDUS when you need dialers, custom CRMs, scrapers, or a software shelf plus an Islamabad-based team that ships remotely worldwide.",
    rows: [
      {
        feature: "Core strength",
        left: "Telecom dialers, custom CRMs, licensed tools",
        right: "Websites, branding, sometimes WordPress",
      },
      {
        feature: "Product shelf",
        left: "13+ downloadable products with licensing",
        right: "Usually project-only, no products",
      },
      {
        feature: "Outbound / AI calling",
        left: "Native AI + multi-slot Google Voice dialers",
        right: "Rare; often outsourced or skipped",
      },
      {
        feature: "Delivery model",
        left: "Islamabad studio + remote worldwide",
        right: "Local retainers or freelance gigs",
      },
      {
        feature: "Proof",
        left: "Case studies with dialer/CRM metrics",
        right: "Portfolio screenshots of sites",
      },
      {
        feature: "Best engagement",
        left: "Dialer license, custom CRM, or both",
        right: "Landing pages, SEO retainers, logos",
      },
    ],
    relatedLinks: [
      { href: "/agency/islamabad", label: "Islamabad agency hub" },
      { href: "/guides/best-web-agencies-islamabad", label: "Islamabad agencies guide" },
      { href: "/work", label: "Selected work" },
      { href: "/contact", label: "Contact INDUS" },
    ],
    faqs: [
      {
        q: "What makes a web agency in Islamabad “best”?",
        a: "Clear niche, shipped products or measurable outcomes, communication for remote clients, and stack depth—not only a pretty homepage.",
      },
      {
        q: "Is INDUS only for telecom?",
        a: "Telecom dialers and CRMs are a flagship niche, but the studio also builds websites, scrapers, email ops, and custom software.",
      },
    ],
    publishedAt: "2026-04-26",
  },
];

export function getComparison(slug: string): ComparisonPage | undefined {
  return COMPARISONS.find((c) => c.slug === slug);
}
