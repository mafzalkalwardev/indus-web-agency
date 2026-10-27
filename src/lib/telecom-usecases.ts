import type { FaqItem } from "@/lib/schema";

export interface TelecomUseCase {
  slug: string;
  name: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  title: string;
  description: string;
  answer: string;
  who: string;
  howIndusHelps: string;
  recommendedProducts: { href: string; label: string }[];
  relatedSlugs: string[];
  faqs: FaqItem[];
}

export const TELECOM_USE_CASES: TelecomUseCase[] = [
  {
    slug: "cold-calling",
    name: "Cold Calling",
    primaryKeyword: "best auto dialers for cold calling",
    secondaryKeywords: [
      "auto dialer for cold calling",
      "cold calling dialer software",
      "power dialer for cold calling",
      "SDR auto dialer",
      "B2B cold calling dialer",
    ],
    title: "Best Auto Dialers for Cold Calling",
    description:
      "Compare auto dialers for cold calling—power, multi-slot/parallel, and AI agents. INDUS Google Voice dialers for SDR and outbound sales teams worldwide.",
    answer:
      "The best auto dialers for cold calling help reps skip manual dialing, connect more live conversations, and log outcomes. INDUS Multi-Slot Agent runs up to five parallel Google Voice lines so agents only work the picked call; AI Agent Solo and Enterprise AI Multi-Slot add conversational AI for openers or full AI outreach. Plans start at $29/mo.",
    who: "SDR teams, appointment setters, B2B outbound sales, and small call centers running list-based cold calling.",
    howIndusHelps:
      "License a ready dialer in minutes after approval, or commission a custom CRM + dialer stack. Pair with lead scrapers and Mailforge for a full outbound loop.",
    recommendedProducts: [
      { href: "/products/dialer-multi-slot", label: "Multi-Slot Agent" },
      { href: "/products/dialer-ai-agent", label: "AI Agent Solo" },
      { href: "/tools/dialer-calculator", label: "Dialer calculator" },
    ],
    relatedSlugs: ["ai-sales-closing", "sdr-outbound", "telecommunication"],
    faqs: [
      {
        q: "What is the best auto dialer for cold calling?",
        a: "For Google Voice–based teams, INDUS Multi-Slot is built for high-volume cold calling with parallel lines and CRM logs. AI tiers help when you want the agent (or AI) to qualify before a human closes.",
      },
      {
        q: "Power dialer or parallel/multi-slot for cold calling?",
        a: "Power dialing is one-at-a-time. Multi-slot/parallel dials several lines and connects the live answer—better when volume matters. INDUS Multi-Slot follows the picked-call-only pattern.",
      },
    ],
  },
  {
    slug: "telecommunication",
    name: "Telecommunications",
    primaryKeyword: "best auto dialers for telecommunication",
    secondaryKeywords: [
      "auto dialer for telecommunication",
      "telecom outbound dialer",
      "telecommunications auto dialer",
      "telecom call center dialer",
      "telephony CRM dialer",
    ],
    title: "Best Auto Dialers for Telecommunication",
    description:
      "Auto dialers for telecommunications outbound—sales, dispatch, and call-center teams. Google Voice multi-slot, AI agents, and telecom CRM modules from INDUS.",
    answer:
      "The best auto dialers for telecommunication combine reliable outbound dialing with CRM dispositions and admin control. INDUS focuses on Google Voice auto dialers with multi-slot pacing, AMD, AI voice, and CRM modules—plus custom telecom CRMs when your workflow is unique.",
    who: "Telecom sales floors, MVNO/reseller outbound, carrier sales, and operators building telephony-adjacent outbound stacks.",
    howIndusHelps:
      "Use the telecom hub for dialers + 14 CRM types. Start with Multi-Slot or Enterprise AI; extend with custom telephony CRM integrations via the studio.",
    recommendedProducts: [
      { href: "/telecom", label: "Telecom hub" },
      { href: "/telecom/crm-types", label: "CRM types" },
      { href: "/products?cat=dialer", label: "All dialers" },
    ],
    relatedSlugs: ["call-center", "cold-calling", "dispatch-logistics"],
    faqs: [
      {
        q: "What dialer is best for telecommunications businesses?",
        a: "Teams that already use Google Voice often choose INDUS multi-slot or AI dialers for outbound telecom sales without migrating to a full CCaaS on day one.",
      },
      {
        q: "Do you replace Five9 or Genesys?",
        a: "No. INDUS specializes in outbound Google Voice dialers and custom CRMs—not full enterprise contact-center suites.",
      },
    ],
  },
  {
    slug: "ai-sales-closing",
    name: "AI Sales Closing",
    primaryKeyword: "best auto dialers for cold calling AI agent closes the sales",
    secondaryKeywords: [
      "AI auto dialer that closes sales",
      "AI sales agent dialer",
      "AI cold calling software",
      "conversational AI dialer",
      "AI that closes sales on phone",
      "autonomous sales dialer",
    ],
    title: "Best AI Auto Dialers That Close Sales",
    description:
      "AI auto dialers for cold calling where an AI agent qualifies or closes—INDUS AI Agent Solo and Enterprise AI Multi-Slot with CRM logging.",
    answer:
      "AI auto dialers that close (or heavily qualify) sales use conversational AI on connected calls, then log outcomes to CRM. INDUS AI Agent Solo runs AI on every call; Enterprise AI Multi-Slot adds AI on the picked parallel line so humans take over hot opportunities. Ideal when you want AI openers plus human closers—or scripted AI-led campaigns.",
    who: "Outbound teams testing AI SDRs, appointment setting with AI voice, and hybrid AI-human closing workflows.",
    howIndusHelps:
      "Deploy AI Agent Solo for single-line AI conversations, or Enterprise AI Multi-Slot for volume + AI. Custom scripts and CRM handoff via studio projects.",
    recommendedProducts: [
      { href: "/products/dialer-ai-agent", label: "AI Agent Solo" },
      { href: "/products/dialer-ai-multi-slot", label: "Enterprise AI Multi-Slot" },
      { href: "/work/enterprise-ai-dialer", label: "AI dialer case study" },
    ],
    relatedSlugs: ["cold-calling", "appointment-setting", "sdr-outbound", "ai-custom-dialer-crm"],
    faqs: [
      {
        q: "Can an AI dialer actually close sales?",
        a: "AI can qualify, book appointments, and run scripted closes. Complex consultative closes often need a human—INDUS supports AI-only or AI-then-human workflows with CRM logs.",
      },
      {
        q: "Which INDUS plan for AI that closes or qualifies?",
        a: "AI Agent Solo for full AI on each call; Enterprise AI Multi-Slot when you need parallel dialing with AI on the connected call.",
      },
    ],
  },
  {
    slug: "sdr-outbound",
    name: "SDR / Outbound Sales",
    primaryKeyword: "best sales dialer software for SDR",
    secondaryKeywords: [
      "SDR auto dialer",
      "outbound sales dialer",
      "B2B sales dialer",
      "parallel dialer for SDR",
      "sales development dialer",
    ],
    title: "Best Sales Dialers for SDR & Outbound Teams",
    description:
      "Sales dialer software for SDR outbound—multi-slot parallel dialing, AMD, CRM dispositions, and optional AI from INDUS Web Agency.",
    answer:
      "SDR teams need more live conversations per hour. INDUS Multi-Slot Agent dials multiple Google Voice lines in parallel and shows only the picked call; CRM modules capture dispositions for coaching and pipeline follow-up.",
    who: "SDR/BDR teams, AE outbound blocks, and agencies running appointment-setting campaigns.",
    howIndusHelps:
      "Start with Multi-Slot; add AI Multi-Slot for AI openers. Use the dialer calculator to match team size to plan.",
    recommendedProducts: [
      { href: "/products/dialer-multi-slot", label: "Multi-Slot Agent" },
      { href: "/compare", label: "Compare plans" },
      { href: "/telecom/best-auto-dialers", label: "Best dialers guide" },
    ],
    relatedSlugs: ["cold-calling", "ai-sales-closing", "appointment-setting"],
    faqs: [
      {
        q: "What dialer do SDRs use for high volume?",
        a: "Parallel/multi-slot dialers. INDUS Multi-Slot supports up to five Google Voice slots with agent-only-on-connect behavior.",
      },
    ],
  },
  {
    slug: "appointment-setting",
    name: "Appointment Setting",
    primaryKeyword: "best dialer for appointment setting",
    secondaryKeywords: [
      "appointment setter dialer",
      "AI appointment setter dialer",
      "meeting booking auto dialer",
      "calendar booking cold call dialer",
    ],
    title: "Best Auto Dialers for Appointment Setting",
    description:
      "Auto dialers for appointment setters—multi-slot calling plus AI agents that book meetings and log CRM outcomes.",
    answer:
      "Appointment-setting dialers maximize connects and capture booked meetings as dispositions. INDUS dialers support high-volume calling; AI Agent tiers can run booking scripts before handing off to humans.",
    who: "Appointment-setting agencies, inside sales, and local-service lead follow-up teams.",
    howIndusHelps:
      "Multi-Slot for human setters; AI Solo/Multi-Slot for AI booking scripts; custom CRM for calendar fields.",
    recommendedProducts: [
      { href: "/products/dialer-ai-agent", label: "AI Agent Solo" },
      { href: "/products/dialer-multi-slot", label: "Multi-Slot Agent" },
      { href: "/start-project", label: "Custom booking CRM" },
    ],
    relatedSlugs: ["ai-sales-closing", "cold-calling", "home-services"],
    faqs: [
      {
        q: "Can AI book appointments on dialer calls?",
        a: "Yes with scripted AI Agent workflows. Complex calendar rules may need custom integration with your booking tool.",
      },
    ],
  },
  {
    slug: "call-center",
    name: "Call Center Outbound",
    primaryKeyword: "best call center dialer",
    secondaryKeywords: [
      "call center auto dialer",
      "outbound call center software",
      "predictive dialer call center",
      "call center CRM dialer",
    ],
    title: "Best Auto Dialers for Call Centers",
    description:
      "Outbound call center dialers with multi-slot pacing, AMD, admin dashboards, and CRM—INDUS Google Voice dialer stack.",
    answer:
      "Outbound call centers need pacing, dispositions, and supervisor visibility. INDUS Multi-Slot and Enterprise AI Multi-Slot include parallel lines, AMD, CRM, and admin dashboards for Google Voice–based floors.",
    who: "Small-to-mid outbound call centers and BPOs not ready for enterprise CCaaS pricing.",
    howIndusHelps:
      "License multi-seat dialers; request custom BPO/multi-client CRM when you run many brands.",
    recommendedProducts: [
      { href: "/products/dialer-ai-multi-slot", label: "Enterprise AI Multi-Slot" },
      { href: "/telecom/crm/bpo-agency-crm", label: "BPO CRM guide" },
      { href: "/pricing", label: "Pricing" },
    ],
    relatedSlugs: ["bpo-agency", "telecommunication", "analytics-coaching"],
    faqs: [
      {
        q: "Is INDUS a predictive dialer for call centers?",
        a: "Multi-Slot uses parallel picked-call workflows common on outbound floors. Full statistical predictive CCaaS is not our core product—we focus on Google Voice multi-slot and AI.",
      },
    ],
  },
  {
    slug: "dispatch-logistics",
    name: "Dispatch & Logistics",
    primaryKeyword: "dispatch dialer software",
    secondaryKeywords: [
      "freight broker dialer",
      "truck dispatch auto dialer",
      "carrier sales dialer",
      "logistics cold calling dialer",
    ],
    title: "Best Dialers for Dispatch & Freight Outbound",
    description:
      "Dispatch dialer software for freight brokers and carrier sales—multi-slot calling, CRM, and FMCSA list building from INDUS.",
    answer:
      "Dispatch teams live on the phone. INDUS Multi-Slot and AI dialers increase connects while CRM logs keep carrier/shipper history; FMCSA scrapers help build calling lists.",
    who: "Freight brokers, carrier sales, and logistics outbound desks worldwide (English ops).",
    howIndusHelps:
      "Dialers + FMCSA scraper + custom dispatch CRM when you need lane/equipment fields.",
    recommendedProducts: [
      { href: "/products/dialer-multi-slot", label: "Multi-Slot Agent" },
      { href: "/products/fmcsa-safer-scraper", label: "FMCSA Scraper" },
      { href: "/telecom/crm/dispatch-calling-crm", label: "Dispatch CRM" },
    ],
    relatedSlugs: ["cold-calling", "telecommunication", "lead-generation"],
    faqs: [
      {
        q: "What dialer do freight brokers use?",
        a: "Many use Google Voice with multi-slot dialers. INDUS Multi-Slot and AI Multi-Slot are built for that pattern.",
      },
    ],
  },
  {
    slug: "lead-generation",
    name: "Lead Generation Outbound",
    primaryKeyword: "auto dialer for lead generation",
    secondaryKeywords: [
      "lead gen dialer",
      "outbound lead dialer",
      "dialer for scraped leads",
      "lead management dialer CRM",
    ],
    title: "Best Auto Dialers for Lead Generation",
    description:
      "Auto dialers for lead-gen teams—call scraped or bought lists, log dispositions, recycle leads with INDUS dialers and CRM.",
    answer:
      "Lead-generation outbound needs list import, dialing speed, and recycle logic. INDUS dialers load campaigns from Excel/CRM exports; scrapers and lead CRMs feed the funnel.",
    who: "Lead-gen agencies, performance marketers, and inbound lead follow-up teams.",
    howIndusHelps:
      "Scrapers → verify → dialer → dispositions. Custom lead CRM for scoring and assignment.",
    recommendedProducts: [
      { href: "/products?cat=scraper", label: "Scrapers" },
      { href: "/products?cat=dialer", label: "Dialers" },
      { href: "/telecom/crm/lead-management-crm", label: "Lead CRM guide" },
    ],
    relatedSlugs: ["cold-calling", "insurance", "solar-home-services"],
    faqs: [
      {
        q: "Can I dial leads from a scraper?",
        a: "Yes—export clean lists and import into dialer campaigns. Always follow local consent and DNC rules.",
      },
    ],
  },
  {
    slug: "insurance",
    name: "Insurance Outbound",
    primaryKeyword: "insurance cold calling dialer",
    secondaryKeywords: [
      "insurance auto dialer",
      "insurance sales dialer",
      "life insurance cold call dialer",
      "insurance appointment setter dialer",
    ],
    title: "Best Auto Dialers for Insurance Cold Calling",
    description:
      "Insurance cold calling dialers—multi-slot outbound, AI qualification, and vertical CRM options from INDUS.",
    answer:
      "Insurance outbound teams need compliant list handling and fast dialing. INDUS multi-slot and AI dialers support high-volume outreach; custom vertical CRMs can store policy and quote fields.",
    who: "Insurance agencies, IMOs, and appointment-setting partners.",
    howIndusHelps:
      "Dialers for calling volume; studio builds for insurance-specific CRM fields and compliance logging.",
    recommendedProducts: [
      { href: "/products/dialer-multi-slot", label: "Multi-Slot Agent" },
      { href: "/telecom/crm/vertical-crm", label: "Vertical CRM" },
      { href: "/telecom/crm/compliance-tcpa-crm", label: "Compliance CRM" },
    ],
    relatedSlugs: ["appointment-setting", "cold-calling", "ai-sales-closing"],
    faqs: [
      {
        q: "Do you have an insurance-specific dialer?",
        a: "Calling runs on INDUS dialer products; insurance objects (policies, products) are added via custom vertical CRM projects.",
      },
    ],
  },
  {
    slug: "real-estate",
    name: "Real Estate",
    primaryKeyword: "real estate auto dialer",
    secondaryKeywords: [
      "real estate cold calling dialer",
      "realtor auto dialer",
      "FSBO dialer software",
      "real estate lead dialer",
    ],
    title: "Best Auto Dialers for Real Estate Agents",
    description:
      "Real estate auto dialers for prospecting FSBO, expireds, and sphere outreach—Google Voice multi-slot and AI options.",
    answer:
      "Real estate dialers speed circle-prospecting and lead follow-up. INDUS Google Voice dialers fit solo agents and small teams; AI can run first-touch scripts.",
    who: "Realtors, teams, and ISA appointment setters.",
    howIndusHelps:
      "DOM Starter or Multi-Slot for human ISAs; AI Solo for automated first touch; custom CRM for listings.",
    recommendedProducts: [
      { href: "/products/dialer-starter-dom", label: "DOM Starter" },
      { href: "/products/dialer-ai-agent", label: "AI Agent Solo" },
      { href: "/start-project", label: "Custom real-estate CRM" },
    ],
    relatedSlugs: ["appointment-setting", "cold-calling", "lead-generation"],
    faqs: [
      {
        q: "Best dialer for real estate cold calling?",
        a: "Solo agents often start with DOM Starter; teams use Multi-Slot. AI Agent helps with consistent first-touch scripts.",
      },
    ],
  },
  {
    slug: "solar-home-services",
    name: "Solar & Home Services",
    primaryKeyword: "solar lead dialer",
    secondaryKeywords: [
      "home services auto dialer",
      "solar appointment setter dialer",
      "HVAC cold calling dialer",
      "roofing lead dialer",
    ],
    title: "Best Dialers for Solar & Home Services Leads",
    description:
      "Dialers for solar and home-services lead follow-up—speed-to-lead calling, AI qualification, and appointment booking.",
    answer:
      "Solar and home-services teams win on speed-to-lead. INDUS dialers call lists fast; AI agents can qualify and book estimates while CRM logs capture outcomes.",
    who: "Solar companies, HVAC, roofing, and local-service marketers.",
    howIndusHelps:
      "AI Agent for after-hours qualification; Multi-Slot for setter teams; custom CRM for job types.",
    recommendedProducts: [
      { href: "/products/dialer-ai-agent", label: "AI Agent Solo" },
      { href: "/products/dialer-multi-slot", label: "Multi-Slot Agent" },
      { href: "/telecom/use-cases/appointment-setting", label: "Appointment setting" },
    ],
    relatedSlugs: ["appointment-setting", "ai-sales-closing", "lead-generation"],
    faqs: [
      {
        q: "Can AI dial solar leads after hours?",
        a: "AI Agent Solo can run scripted qualification/booking. Confirm local calling-time rules and consent requirements.",
      },
    ],
  },
  {
    slug: "bpo-agency",
    name: "BPO & Agencies",
    primaryKeyword: "best dialer for BPO",
    secondaryKeywords: [
      "BPO auto dialer",
      "call center outsourcing dialer",
      "white label dialer",
      "multi client dialer CRM",
    ],
    title: "Best Auto Dialers for BPOs & Calling Agencies",
    description:
      "Dialers for BPOs and appointment agencies—multi-seat licensing, campaigns, and optional multi-client CRM builds.",
    answer:
      "BPOs need multi-seat dialers and client separation. INDUS licenses multi-agent dialer plans; custom BPO CRMs isolate clients, campaigns, and billing.",
    who: "BPOs, offshore/nearshore calling centers, and white-label appointment agencies.",
    howIndusHelps:
      "Enterprise dialer seats now; custom tenancy CRM when you productize for many clients.",
    recommendedProducts: [
      { href: "/products/dialer-ai-multi-slot", label: "Enterprise AI Multi-Slot" },
      { href: "/telecom/crm/bpo-agency-crm", label: "BPO CRM guide" },
      { href: "/start-project", label: "Custom BPO CRM" },
    ],
    relatedSlugs: ["call-center", "appointment-setting", "analytics-coaching"],
    faqs: [
      {
        q: "Can we white-label INDUS dialers?",
        a: "Discuss branding and multi-client admin via a project inquiry—scopes vary by compliance and support model.",
      },
    ],
  },
  {
    slug: "small-business",
    name: "Small Business",
    primaryKeyword: "best autodialer for small business",
    secondaryKeywords: [
      "cheap auto dialer software",
      "auto dialer for small teams",
      "Google Voice dialer small business",
      "affordable sales dialer",
    ],
    title: "Best Affordable Auto Dialers for Small Business",
    description:
      "Affordable auto dialers for small business—Google Voice DOM starter from $29/mo and multi-slot when you hire setters.",
    answer:
      "Small businesses often need a low-cost Google Voice auto dialer without enterprise CCaaS. INDUS DOM/BOM Starter starts at $29/mo; upgrade to Multi-Slot or AI as volume grows.",
    who: "Solopreneurs, micro-agencies, and 1–5 person outbound teams.",
    howIndusHelps:
      "Start cheap, scale tiers without rip-and-replace. Calculator recommends the right plan.",
    recommendedProducts: [
      { href: "/products/dialer-starter-dom", label: "DOM Starter $29/mo" },
      { href: "/tools/dialer-calculator", label: "Calculator" },
      { href: "/pricing", label: "All pricing" },
    ],
    relatedSlugs: ["cold-calling", "real-estate", "lead-generation"],
    faqs: [
      {
        q: "What is the cheapest INDUS auto dialer?",
        a: "DOM/BOM Starter from $29/mo for solo Google Voice automation.",
      },
    ],
  },
  {
    slug: "analytics-coaching",
    name: "Analytics & Coaching",
    primaryKeyword: "dialer with call analytics",
    secondaryKeywords: [
      "call center analytics dialer",
      "outbound coaching dialer",
      "agent KPI dialer dashboard",
      "sales dialer reporting",
    ],
    title: "Auto Dialers with Analytics & Coaching Dashboards",
    description:
      "Dialers with admin dashboards, CRM analytics, and agent KPIs—INDUS Multi-Slot and Enterprise AI reporting modules.",
    answer:
      "Managers need connect rates, dispositions, and talk-time visibility. INDUS higher-tier dialers include admin dashboards and CRM analytics; custom report packs are available via the studio.",
    who: "Team leads, call-center supervisors, and agency owners.",
    howIndusHelps:
      "Use built-in dashboards; extend with custom workforce analytics CRM.",
    recommendedProducts: [
      { href: "/telecom/crm/analytics-workforce-crm", label: "Analytics CRM" },
      { href: "/products/dialer-multi-slot", label: "Multi-Slot Agent" },
      { href: "/demos", label: "Demos" },
    ],
    relatedSlugs: ["call-center", "sdr-outbound", "bpo-agency"],
    faqs: [
      {
        q: "Do INDUS dialers show agent KPIs?",
        a: "Admin dashboards on Multi-Slot and Enterprise tiers cover operational metrics; deeper coaching suites can be custom-built.",
      },
    ],
  },
  {
    slug: "google-voice",
    name: "Google Voice Teams",
    primaryKeyword: "best Google Voice auto dialer",
    secondaryKeywords: [
      "Google Voice autodialer",
      "Google Voice dialer software",
      "Google Voice multi line dialer",
      "Google Voice CRM dialer",
      "Chrome Google Voice dialer",
    ],
    title: "Best Google Voice Auto Dialers",
    description:
      "Best Google Voice auto dialer software—DOM automation, multi-slot parallel dialing, and AI agents from INDUS Web Agency.",
    answer:
      "If your team already uses Google Voice, the best autodialers automate that workflow instead of forcing a PBX migration. INDUS offers four tiers from solo DOM/BOM to enterprise AI multi-slot with CRM.",
    who: "Any outbound team on Google Voice worldwide (subject to Google Voice availability and terms).",
    howIndusHelps:
      "Full product line built around Google Voice outbound. See USA hub for US-focused notes.",
    recommendedProducts: [
      { href: "/telecom/auto-dialers", label: "All Google Voice dialers" },
      { href: "/guides/google-voice-auto-dialer-guide", label: "Setup guide" },
      { href: "/compare", label: "Compare tiers" },
    ],
    relatedSlugs: ["cold-calling", "small-business", "telecommunication", "ai-custom-dialer-crm"],
    faqs: [
      {
        q: "What is the best Google Voice auto dialer?",
        a: "For teams: INDUS Multi-Slot. For AI conversations: AI Agent Solo or Enterprise AI Multi-Slot. For solo manual-style automation: DOM Starter.",
      },
    ],
  },
  {
    slug: "ai-custom-dialer-crm",
    name: "AI Agent + Custom Dialer CRM",
    primaryKeyword: "best AI agent custom auto dialers with CRM",
    secondaryKeywords: [
      "AI agent custom auto dialer with CRM",
      "custom CRM with AI dialer",
      "best custom CRM for auto dialers",
      "custom auto dialer software with CRM",
      "AI voice agent dialer custom CRM",
      "build custom dialer CRM",
      "bespoke outbound dialer and CRM",
      "AI SDR dialer with custom CRM",
    ],
    title: "Best AI Agent Custom Auto Dialers with CRMs & Custom CRMs",
    description:
      "Best AI agent custom auto dialers with CRM modules—and fully custom CRMs built around your outbound workflow. INDUS licenses AI dialers and engineers bespoke dialer+CRM systems.",
    answer:
      "The best AI agent custom auto dialers with CRMs combine conversational AI on calls with disposition logging—and, when off-the-shelf fields are not enough, a custom CRM designed for your pipeline. INDUS offers AI Agent Solo and Enterprise AI Multi-Slot with built-in CRM modules, plus a studio that builds custom CRMs, dialer integrations, and admin dashboards for telecom, sales, and dispatch teams worldwide.",
    who: "Operators who need AI on the phone and a CRM that matches their exact stages, industries, or multi-client BPO rules—not a generic sales CRM alone.",
    howIndusHelps:
      "Path A: License AI dialers with native CRM. Path B: Start a custom project to build or extend a CRM that syncs dispositions, AI transcripts, and campaigns. Hybrid is common—license the dialer engine, customize the CRM layer.",
    recommendedProducts: [
      { href: "/products/dialer-ai-agent", label: "AI Agent Solo" },
      { href: "/products/dialer-ai-multi-slot", label: "Enterprise AI Multi-Slot" },
      { href: "/work/ai-custom-dialer-crm", label: "Metric case study" },
      { href: "/compare/ai-dialer-crm-vs-saas", label: "vs SaaS dialers" },
      { href: "/compare/custom-crm-vs-off-the-shelf", label: "Custom CRM vs COTS" },
      { href: "/start-project", label: "Custom dialer + CRM project" },
      { href: "/telecom/crm-types", label: "All CRM types" },
    ],
    relatedSlugs: ["ai-sales-closing", "telecommunication", "bpo-agency", "cold-calling"],
    faqs: [
      {
        q: "What is an AI agent custom auto dialer with CRM?",
        a: "Software where an AI talks on outbound calls and writes outcomes into a CRM—either a built-in dialer CRM or a fully custom CRM tailored to your business.",
      },
      {
        q: "Should I buy a dialer CRM or build a custom CRM?",
        a: "Buy when standard dispositions and campaigns fit. Build custom when you need industry fields, multi-client tenancy, or deep integrations. INDUS does both.",
      },
      {
        q: "Can INDUS customize CRM around an AI dialer?",
        a: "Yes. Studio projects add pipelines, roles, reporting, and sync around AI Agent or Multi-Slot dialers. See the AI custom dialer + CRM case study for measured outcomes.",
      },
    ],
  },
];

export function getTelecomUseCase(slug: string): TelecomUseCase | undefined {
  return TELECOM_USE_CASES.find((u) => u.slug === slug);
}

export function getRelatedUseCases(slug: string): TelecomUseCase[] {
  const current = getTelecomUseCase(slug);
  if (!current) return [];
  return current.relatedSlugs
    .map((s) => getTelecomUseCase(s))
    .filter((u): u is TelecomUseCase => Boolean(u));
}
