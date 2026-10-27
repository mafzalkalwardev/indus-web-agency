import type { FaqItem } from "@/lib/schema";

export interface GuideArticle {
  slug: string;
  title: string;
  description: string;
  readMinutes: number;
  publishedAt: string;
  modifiedAt?: string;
  category: "dialers" | "email" | "automation" | "agency" | "telecom";
  sections: { heading: string; body: string }[];
  faqs?: FaqItem[];
}

export const GUIDES: GuideArticle[] = [
  {
    slug: "choose-auto-dialer-plan",
    title: "How to Choose the Right Auto Dialer Plan",
    description:
      "Compare DOM starter, multi-slot, AI solo, and enterprise AI dialers — team size, workflow, and budget explained.",
    readMinutes: 6,
    publishedAt: "2026-03-01",
    category: "dialers",
    sections: [
      {
        heading: "Start with your team size",
        body: "Solo agents doing basic outbound can start with DOM/BOM Starter at $29/mo. Teams of 2–15 agents placing parallel calls should look at Multi-Slot Agent ($79/mo). High-volume dispatch centers need Enterprise AI Multi-Slot ($199/mo).",
      },
      {
        heading: "Decide if you need AI on calls",
        body: "AI Agent Solo ($99/mo) puts AI voice on every call — great for hands-free outbound. Enterprise AI Multi-Slot adds AI only on the picked call in a multi-line dispatch workflow — better for teams that still want human agents on qualified leads.",
      },
      {
        heading: "Use our calculator",
        body: "Not sure? Use the INDUS Dialer Calculator on our site — answer two questions and get a recommended plan with a link to subscribe.",
      },
    ],
  },
  {
    slug: "email-verification-workflow",
    title: "Bulk Email Verification: A Practical Workflow",
    description:
      "How to verify lists before campaigns, choose between cloud and self-hosted tools, and avoid deliverability pitfalls.",
    readMinutes: 5,
    publishedAt: "2026-03-05",
    category: "email",
    sections: [
      {
        heading: "Why verify before you send",
        body: "Sending to invalid addresses hurts sender reputation and wastes SMTP capacity. Run syntax, MX, and mailbox checks before any bulk campaign.",
      },
      {
        heading: "Cloud vs self-hosted",
        body: "Email Verifier Pro offers a cloud dashboard with analytics — ideal for teams that want zero setup. Bulk Email Verifier is a self-hosted Go engine for operators who want speed and control on their own machine.",
      },
      {
        heading: "Pair with sending tools",
        body: "After verification, use Auto Email Sender or the Mailforge bundle for outreach plus unified inbox management — all available as INDUS subscriptions.",
      },
    ],
  },
  {
    slug: "custom-software-vs-off-the-shelf",
    title: "Custom Software vs Off-the-Shelf: When to Build vs Buy",
    description:
      "How INDUS clients decide between a custom project and licensing an existing automation product.",
    readMinutes: 4,
    publishedAt: "2026-03-10",
    category: "agency",
    sections: [
      {
        heading: "Buy when the workflow matches",
        body: "If you need standard outbound dialing, email verification, or lead scraping — our licensed products are battle-tested and faster to deploy than a custom build.",
      },
      {
        heading: "Build when you're unique",
        body: "Custom CRM integrations, proprietary dispatch logic, branded client portals, or industry-specific compliance usually warrant a studio project.",
      },
      {
        heading: "Hybrid is common",
        body: "Many clients license Mailforge or a dialer today, then hire INDUS to extend integrations or build a custom dashboard around it.",
      },
    ],
  },
  {
    slug: "google-voice-auto-dialer-guide",
    title: "Google Voice Auto Dialer: Setup & Best Practices",
    description:
      "How DOM/BOM automation works with Google Voice, what to expect from parallel slots, and when to upgrade to AI dispatch.",
    readMinutes: 7,
    publishedAt: "2026-03-12",
    category: "dialers",
    sections: [
      {
        heading: "Why Google Voice for outbound",
        body: "Many small teams already use Google Voice for a dedicated business line. INDUS dialers automate the click-to-dial workflow in Chrome — no PBX migration required for the starter tier.",
      },
      {
        heading: "DOM/BOM vs multi-slot",
        body: "DOM/BOM Starter controls one browser tab — ideal for solo reps. Multi-Slot Agent opens up to five parallel lines; the agent only sees the call that connects, which is the standard dispatch pattern for busy sales floors.",
      },
      {
        heading: "When AI makes sense",
        body: "If your reps spend time on voicemails and no-answers, AI Agent Solo or Enterprise AI Multi-Slot can handle AMD, leave messages, or qualify leads before a human picks up.",
      },
    ],
  },
  {
    slug: "mailforge-setup-overview",
    title: "Mailforge: Unified Inbox & Outreach Overview",
    description:
      "How Mailforge bundles sending, inbox sync, and campaign tracking — and how it pairs with email verification.",
    readMinutes: 5,
    publishedAt: "2026-03-14",
    category: "email",
    sections: [
      {
        heading: "What Mailforge covers",
        body: "Mailforge is INDUS's email operations bundle: connect SMTP accounts, send sequences, and manage replies from one dashboard instead of juggling multiple inboxes.",
      },
      {
        heading: "Verify before you send",
        body: "Always run lists through Email Verifier Pro or Bulk Email Verifier first. Clean data improves deliverability and keeps your domains off blocklists.",
      },
      {
        heading: "Scale with automation",
        body: "Pair Mailforge with Auto Email Sender for high-volume outreach, or use our web scraper products to build targeted lists before campaigns.",
      },
    ],
  },
  {
    slug: "web-scraper-lead-generation",
    title: "Web Scraping for B2B Lead Generation",
    description:
      "Ethical scraping workflows, list hygiene, and how INDUS scraper tools fit into outbound sales pipelines.",
    readMinutes: 6,
    publishedAt: "2026-03-16",
    category: "automation",
    sections: [
      {
        heading: "Start with a clear ICP",
        body: "Define industry, geography, and role before scraping. Narrow targets produce smaller but higher-converting lists than broad crawls.",
      },
      {
        heading: "Respect robots and rate limits",
        body: "INDUS scrapers include configurable delays and domain rules. Aggressive crawling hurts your IP reputation and can violate site terms — throttle responsibly.",
      },
      {
        heading: "Close the loop",
        body: "Export to CSV, verify emails, then push into Mailforge or your dialer queue. Scraping is only step one; verification and outreach complete the pipeline.",
      },
    ],
  },
  {
    slug: "outbound-dialer-crm-explained",
    title: "What Is an Outbound Dialer CRM?",
    description:
      "Definition of outbound dialer CRM software, how it differs from a standalone dialer, and how INDUS Multi-Slot and AI dialers include CRM modules.",
    readMinutes: 7,
    publishedAt: "2026-04-01",
    category: "telecom",
    faqs: [
      {
        q: "What is an outbound dialer CRM?",
        a: "Software that places outbound calls automatically and stores dispositions, notes, and lead status in CRM-style records for sales or dispatch teams.",
      },
      {
        q: "Do I need a separate CRM if I buy an INDUS dialer?",
        a: "Often no for basic outbound. Multi-Slot and Enterprise AI plans include CRM modules. Integrate HubSpot or Salesforce via a custom project if you need a system of record elsewhere.",
      },
    ],
    sections: [
      {
        heading: "Direct answer",
        body: "An outbound dialer CRM combines automatic calling with contact records, campaign lists, call dispositions, and history so every dial updates a pipeline—not a spreadsheet. INDUS Web Agency licenses dialers with built-in CRM modules and builds custom CRMs when your fields are unique.",
      },
      {
        heading: "Dialer alone vs dialer CRM",
        body: "A dialer places the call. A dialer CRM also answers who was called, what happened, and what to do next. Without CRM logging, high-volume floors lose coaching data and follow-ups.",
      },
      {
        heading: "INDUS product path",
        body: "Start with Multi-Slot Agent or Enterprise AI Multi-Slot for dialer + CRM. Use the telecom CRM taxonomy for other types (dispatch, AI voice, compliance). Custom sync projects cover Salesforce and HubSpot.",
      },
    ],
  },
  {
    slug: "predictive-vs-power-dialer",
    title: "Predictive Dialer vs Power Dialer: What’s the Difference?",
    description:
      "Clear comparison of predictive and power dialing, how multi-slot Google Voice dialers fit, and which INDUS plan to choose.",
    readMinutes: 6,
    publishedAt: "2026-04-02",
    category: "telecom",
    faqs: [
      {
        q: "What is a predictive dialer?",
        a: "A system that dials multiple numbers ahead of agent availability and connects live answers to free agents, maximizing talk time.",
      },
      {
        q: "Is INDUS Multi-Slot predictive?",
        a: "Multi-Slot runs parallel Google Voice lines and shows agents only the picked call—matching the core pattern outbound floors expect from power/predictive workflows.",
      },
    ],
    sections: [
      {
        heading: "Direct answer",
        body: "Power dialers typically dial one line per agent with rapid progression; predictive systems pace multiple lines to keep agents on live conversations. INDUS Multi-Slot Agent runs up to five parallel Google Voice slots and surfaces only the connected call—ideal for team outbound and dispatch.",
      },
      {
        heading: "When to choose multi-slot",
        body: "Choose Multi-Slot when agents waste time on unanswered rings. Choose AI Multi-Slot when you also want conversational AI on the picked call. Solo agents can stay on DOM Starter or AI Solo.",
      },
      {
        heading: "CRM and AMD",
        body: "Higher INDUS tiers add CRM dispositions and AMD voicemail detection so pacing gains do not create messy data or wasted voicemail talk time.",
      },
    ],
  },
  {
    slug: "google-voice-us-outbound-overview",
    title: "Google Voice Outbound Calling in the US: Practical Overview",
    description:
      "How US teams use Google Voice with auto dialers, educational notes on TCPA/DNC (not legal advice), and INDUS product options.",
    readMinutes: 8,
    publishedAt: "2026-04-03",
    category: "telecom",
    faqs: [
      {
        q: "Is Google Voice auto dialing legal in the US?",
        a: "It depends on consent, list source, industry, and state/federal rules. INDUS does not provide legal advice—consult qualified counsel. We provide tools, logs, and optional compliance CRM features.",
      },
      {
        q: "What INDUS products fit US Google Voice teams?",
        a: "DOM Starter, Multi-Slot, AI Solo, and Enterprise AI Multi-Slot—all designed around Google Voice outbound automation.",
      },
    ],
    sections: [
      {
        heading: "Direct answer",
        body: "Many US outbound sales and dispatch teams run Google Voice as a business line and use INDUS auto dialers to automate dialing, multi-slot pacing, and AI conversations—with CRM call logs for follow-up. Legal compliance (TCPA/DNC) remains the operator’s responsibility.",
      },
      {
        heading: "Why Google Voice remains popular",
        body: "Low setup cost, familiar Chrome workflow, and no immediate PBX migration. INDUS dialers automate that path for SMBs and mid-market floors.",
      },
      {
        heading: "Compliance education",
        body: "Track consent sources, scrub DNC lists, and respect calling windows when required. See /telecom/usa and the compliance CRM guide for tooling options—not legal guarantees.",
      },
    ],
  },
  {
    slug: "telecom-crm-types-overview",
    title: "14 Types of Telecommunications CRMs Explained",
    description:
      "Overview of outbound dialer CRM, predictive, AI voice, dispatch, lead management, contact center, omnichannel, TCPA compliance, and more.",
    readMinutes: 9,
    publishedAt: "2026-04-04",
    category: "telecom",
    faqs: [
      {
        q: "How many telecom CRM types are there?",
        a: "INDUS documents 14 practical categories covering outbound dialer CRM through vertical and compliance CRMs—see /telecom/crm-types for the full index.",
      },
      {
        q: "Which CRM type should I start with?",
        a: "Most outbound buyers start with outbound dialer CRM or predictive dialer CRM, then add AI voice, dispatch, or compliance as needed.",
      },
    ],
    sections: [
      {
        heading: "Direct answer",
        body: "Telecommunications CRMs range from dialer-native outbound CRMs to contact-center, omnichannel, BPO, vertical, and TCPA compliance systems. INDUS maps all 14 types so buyers searching by problem—not brand—find the right product or custom path.",
      },
      {
        heading: "Sell-now categories",
        body: "Outbound dialer CRM, predictive/power dialer CRM, AI voice CRM, dispatch calling CRM, lead management CRM, and analytics/workforce CRM map closely to INDUS dialers, scrapers, and dashboards.",
      },
      {
        heading: "Educate and custom",
        body: "Full contact-center, SIP softphone, helpdesk, BPO multi-tenant, and vertical CRMs are documented for SEO/AEO and delivered primarily as studio projects.",
      },
    ],
  },
  {
    slug: "tcpa-dnc-basics-for-outbound",
    title: "TCPA & DNC Basics for Outbound Teams (Education)",
    description:
      "Educational overview of why consent, DNC scrubbing, and call logging matter for US outbound—not legal advice.",
    readMinutes: 7,
    publishedAt: "2026-04-10",
    category: "telecom",
    faqs: [
      {
        q: "Does INDUS guarantee TCPA compliance?",
        a: "No. We provide educational content and optional compliance CRM features. Legal compliance is your responsibility—hire qualified counsel.",
      },
      {
        q: "How do call logs help?",
        a: "Timestamped dispositions and list sources create an audit trail for internal review. They are not a substitute for legal advice.",
      },
    ],
    sections: [
      {
        heading: "Direct answer",
        body: "US outbound operators often need documented consent, Do-Not-Call handling, and responsible calling windows. INDUS dialers store call logs; custom compliance CRM features can track consent and suppressions. This guide is educational only.",
      },
      {
        heading: "Practical ops checklist",
        body: "Know your list source, scrub DNC where required, train agents on scripts, and keep dispositions consistent. Pair with /telecom/crm/compliance-tcpa-crm for tooling options.",
      },
      {
        heading: "When to customize",
        body: "If you need automated DNC blocking, consent fields, or counsel-ready exports, start a custom project with INDUS studio.",
      },
    ],
  },
  {
    slug: "amd-voicemail-detection-explained",
    title: "AMD Voicemail Detection on Auto Dialers Explained",
    description:
      "What answering machine detection (AMD) does on outbound dialers and which INDUS plans include it.",
    readMinutes: 5,
    publishedAt: "2026-04-11",
    category: "telecom",
    faqs: [
      {
        q: "What is AMD on a dialer?",
        a: "Answering Machine Detection tries to distinguish human pickup from voicemail so agents (or AI) spend less time on machines.",
      },
      {
        q: "Which INDUS dialers include AMD?",
        a: "Multi-Slot, AI Solo, and Enterprise AI Multi-Slot tiers include AMD capabilities; see the comparison table for details.",
      },
    ],
    sections: [
      {
        heading: "Direct answer",
        body: "AMD (answering machine detection) helps outbound dialers detect voicemail vs live answer so agents focus on conversations. INDUS includes AMD on Multi-Slot and AI dialer tiers.",
      },
      {
        heading: "Why it matters",
        body: "Without AMD, agents burn talk time leaving accidental messages or waiting on machines—hurting connect efficiency on multi-slot floors.",
      },
      {
        heading: "Pair with AI",
        body: "AI Agent tiers can handle voicemail or opener scripts after detection, logging outcomes into CRM modules.",
      },
    ],
  },
  {
    slug: "multi-slot-vs-ai-dialer",
    title: "Multi-Slot Dialer vs AI Dialer: Which Should You Buy?",
    description:
      "Compare INDUS Multi-Slot Agent, AI Agent Solo, and Enterprise AI Multi-Slot for outbound telecom teams.",
    readMinutes: 6,
    publishedAt: "2026-04-12",
    category: "telecom",
    faqs: [
      {
        q: "Do I need AI if I already have multi-slot?",
        a: "Not always. Multi-Slot maximizes connects for human agents. Add AI when you want automated conversation on the picked call or full AI solo campaigns.",
      },
      {
        q: "What is Enterprise AI Multi-Slot?",
        a: "Parallel Google Voice slots plus AI on whichever call connects—dispatch-style volume with AI openers and CRM analytics.",
      },
    ],
    sections: [
      {
        heading: "Direct answer",
        body: "Choose Multi-Slot Agent for human-led parallel dialing. Choose AI Agent Solo for single-line AI conversations. Choose Enterprise AI Multi-Slot when you need both parallel lines and AI on the connected call.",
      },
      {
        heading: "Budget framing",
        body: "Multi-Slot starts lower than enterprise AI. Use the dialer calculator and /compare table before subscribing.",
      },
      {
        heading: "CRM impact",
        body: "All higher tiers log outcomes; AI tiers add conversational context that matters for coaching and follow-up.",
      },
    ],
  },
  {
    slug: "bpo-call-center-crm-guide",
    title: "BPO Call Center CRM: Multi-Client Outbound Guide",
    description:
      "How BPOs and appointment-setting agencies structure multi-client CRMs with dialer seats and admin controls.",
    readMinutes: 6,
    publishedAt: "2026-04-13",
    category: "telecom",
    faqs: [
      {
        q: "What is a BPO CRM?",
        a: "A multi-tenant CRM that separates clients, campaigns, and agents so an outsourcing call center can run many brands securely.",
      },
      {
        q: "Can INDUS dialers support multiple agents?",
        a: "Yes—Multi-Slot and Enterprise plans include multiple seats. Full multi-client tenancy UI is typically a custom studio build.",
      },
    ],
    sections: [
      {
        heading: "Direct answer",
        body: "BPO CRMs isolate clients and campaigns while sharing dialer capacity. INDUS licenses multi-seat dialers today and builds multi-client admin CRMs as custom projects for agencies that resell outbound.",
      },
      {
        heading: "Start with seats, then tenancy",
        body: "Validate calling volume on Multi-Slot or AI Multi-Slot first. Add custom tenancy, billing visibility, and client portals when you productize the service.",
      },
      {
        heading: "Related reading",
        body: "See /telecom/crm/bpo-agency-crm and analytics workforce CRM for KPI dashboards supervisors need.",
      },
    ],
  },
  {
    slug: "omnichannel-outbound-stack",
    title: "Building an Omnichannel Outbound Stack: Dialer + Email",
    description:
      "How to combine INDUS dialers with Mailforge and email tools so phone and email share one lead journey.",
    readMinutes: 6,
    publishedAt: "2026-04-14",
    category: "telecom",
    faqs: [
      {
        q: "What is an omnichannel outbound stack?",
        a: "A combination of dialer, email, and optionally SMS/WhatsApp that shares lead identity and history across channels.",
      },
      {
        q: "Can I use INDUS dialers with Mailforge?",
        a: "Yes. Export or share lead lists across dialer campaigns and Mailforge sequences; custom CRM unifies timelines when you need one UI.",
      },
    ],
    sections: [
      {
        heading: "Direct answer",
        body: "A practical omnichannel outbound stack pairs INDUS Google Voice dialers for phone with Mailforge or Auto Email Sender for email—then optionally a custom CRM timeline. You do not need a giant CCaaS on day one.",
      },
      {
        heading: "Recommended sequence",
        body: "Scrape or import leads → verify emails → dial hot segments → email nurtures → recycle dispositions. See lead management and omnichannel CRM guides for taxonomy.",
      },
      {
        heading: "When to customize",
        body: "Build a unified omnichannel CRM when agents juggle too many tabs or you need WhatsApp/SMS in the same record.",
      },
    ],
  },
  {
    slug: "best-auto-dialers-cold-calling-2026",
    title: "Best Auto Dialers for Cold Calling (2026)",
    description:
      "What makes the best auto dialers for cold calling—power vs multi-slot/parallel, CRM logging, and when to add an AI agent. INDUS shortlist for SDR teams worldwide.",
    readMinutes: 8,
    publishedAt: "2026-04-20",
    category: "telecom",
    faqs: [
      {
        q: "What are the best auto dialers for cold calling?",
        a: "For Google Voice teams, INDUS Multi-Slot Agent is built for cold calling volume with parallel lines and CRM dispositions. Add AI Agent tiers when you want conversational AI on connects.",
      },
      {
        q: "Is parallel dialing better than power dialing for cold calling?",
        a: "Parallel/multi-slot usually wins on connects-per-hour for prepared lists. Power dialing is simpler one-at-a-time. Match the mode to your compliance comfort and list quality.",
      },
    ],
    sections: [
      {
        heading: "Direct answer",
        body: "The best auto dialers for cold calling reduce manual dialing, connect more live conversations, and log outcomes. INDUS Multi-Slot runs up to five Google Voice lines with picked-call-only agent UI; AI Solo/Multi-Slot add conversational AI for qualification or scripted closes.",
      },
      {
        heading: "How to choose",
        body: "Solo / low volume → DOM Starter. Team cold calling → Multi-Slot. AI openers or AI-led scripts → AI Agent Solo or Enterprise AI Multi-Slot. Use /telecom/use-cases/cold-calling and the dialer calculator.",
      },
      {
        heading: "Global teams",
        body: "English-speaking outbound teams worldwide can subscribe remotely. Confirm Google Voice availability and local calling rules in your country—see /telecom/markets.",
      },
    ],
  },
  {
    slug: "best-auto-dialers-telecommunication-2026",
    title: "Best Auto Dialers for Telecommunication (2026)",
    description:
      "Best auto dialers for telecommunication outbound—telecom sales, telephony CRM, multi-slot dialing, and AI voice from INDUS Web Agency.",
    readMinutes: 7,
    publishedAt: "2026-04-20",
    category: "telecom",
    faqs: [
      {
        q: "What are the best auto dialers for telecommunication?",
        a: "Telecom outbound teams need dialing plus CRM dispositions. INDUS Multi-Slot and Enterprise AI Multi-Slot pair Google Voice automation with CRM/admin modules; custom telecom CRMs cover unique fields.",
      },
    ],
    sections: [
      {
        heading: "Direct answer",
        body: "Best auto dialers for telecommunication combine reliable outbound calling with call logging and CRM. INDUS focuses on Google Voice multi-slot and AI dialers rather than full carrier-grade CCaaS—ideal for sales and dispatch-style telecom outbound.",
      },
      {
        heading: "Dialer + CRM",
        body: "See the 14 telecom CRM types and /telecom/use-cases/telecommunication for the full stack map.",
      },
      {
        heading: "Next step",
        body: "Compare plans at /compare or start at /telecom/best-auto-dialers.",
      },
    ],
  },
  {
    slug: "best-ai-auto-dialer-closes-sales-2026",
    title: "Best AI Auto Dialers That Help Close Sales (2026)",
    description:
      "Best auto dialers for cold calling when an AI agent qualifies or closes—INDUS AI Agent Solo and Enterprise AI Multi-Slot explained.",
    readMinutes: 7,
    publishedAt: "2026-04-21",
    category: "telecom",
    faqs: [
      {
        q: "Can an AI auto dialer close sales?",
        a: "AI can run qualification and scripted closes; complex deals often need human closers. INDUS supports AI-only or AI-then-human handoff with CRM logging.",
      },
      {
        q: "Which plan if AI should talk on every call?",
        a: "AI Agent Solo. For parallel dialing with AI on the picked call, choose Enterprise AI Multi-Slot.",
      },
    ],
    sections: [
      {
        heading: "Direct answer",
        body: "Searchers looking for best auto dialers for cold calling where an AI agent closes (or heavily qualifies) sales need conversational AI on connect plus disposition CRM. INDUS AI Agent Solo and Enterprise AI Multi-Slot are built for that workflow on Google Voice.",
      },
      {
        heading: "Hybrid closing",
        body: "Many teams let AI open and book; humans close. Enterprise AI Multi-Slot keeps multi-line volume while AI handles the connected conversation.",
      },
      {
        heading: "Related",
        body: "Read /telecom/use-cases/ai-sales-closing and the enterprise AI dialer case study.",
      },
    ],
  },
];

export function getGuide(slug: string): GuideArticle | undefined {
  return GUIDES.find((g) => g.slug === slug);
}
