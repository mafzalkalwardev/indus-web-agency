import type { FaqItem } from "@/lib/schema";

export type CrmRole = "sell" | "bridge" | "educate";

export interface TelecomCrmType {
  slug: string;
  name: string;
  shortName: string;
  role: CrmRole;
  primaryKeyword: string;
  definition: string;
  whoNeedsIt: string;
  features: string[];
  dialerVsCrm: string;
  indusOptions: string;
  productLinks: { href: string; label: string }[];
  cta: "products" | "custom" | "both";
  faqs: FaqItem[];
  relatedSlugs: string[];
}

export const TELECOM_CRM_TYPES: TelecomCrmType[] = [
  {
    slug: "outbound-dialer-crm",
    name: "Outbound Dialer CRM",
    shortName: "Outbound Dialer CRM",
    role: "sell",
    primaryKeyword: "outbound dialer CRM",
    definition:
      "An outbound dialer CRM combines automatic calling with contact records, campaign lists, call dispositions, and history so every dial updates a sales or dispatch pipeline—not a spreadsheet.",
    whoNeedsIt:
      "Outbound sales teams, dispatch desks, and small call centers that dial high volumes and need call outcomes logged against each lead without switching tools.",
    features: [
      "Campaign lists and lead statuses",
      "Call logging and dispositions",
      "Agent notes and follow-up tasks",
      "Exportable history for reporting",
      "Seat-based access for teams",
    ],
    dialerVsCrm:
      "A dialer places the calls. A dialer CRM also stores who was called, what happened, and what to do next. INDUS multi-slot and AI dialers include CRM modules so you do not need a separate system for basic outbound ops.",
    indusOptions:
      "License Multi-Slot Agent or Enterprise AI Multi-Slot for dialer + CRM in one product, or hire the INDUS studio to extend fields, pipelines, and integrations for your workflow.",
    productLinks: [
      { href: "/products/dialer-multi-slot", label: "Multi-Slot Agent" },
      { href: "/products/dialer-ai-multi-slot", label: "Enterprise AI Multi-Slot" },
      { href: "/tools/dialer-calculator", label: "Dialer calculator" },
    ],
    cta: "both",
    faqs: [
      {
        q: "What is an outbound dialer CRM?",
        a: "It is software that auto-dials contacts and stores call results, notes, and lead status in one CRM-style record for outbound sales or dispatch teams.",
      },
      {
        q: "Do INDUS dialers include CRM features?",
        a: "Yes. Multi-Slot and Enterprise AI dialers include CRM and call logs. Starter DOM/BOM offers basic logging; Pro tiers add stronger CRM modules.",
      },
      {
        q: "Can I sync an outbound dialer CRM to Salesforce or HubSpot?",
        a: "Ready-made dialers cover native CRM modules. Custom sync to Salesforce, HubSpot, or your stack is available as an INDUS studio project.",
      },
    ],
    relatedSlugs: ["predictive-power-dialer-crm", "ai-voice-crm", "analytics-workforce-crm"],
  },
  {
    slug: "predictive-power-dialer-crm",
    name: "Predictive / Power Dialer CRM",
    shortName: "Predictive Dialer CRM",
    role: "sell",
    primaryKeyword: "predictive dialer CRM",
    definition:
      "A predictive or power dialer CRM paces multiple lines, connects agents only when a human answers, and logs outcomes—maximizing talk time while keeping CRM records accurate.",
    whoNeedsIt:
      "Teams of 3+ agents who waste time on rings and voicemails and need parallel dialing with disposition tracking.",
    features: [
      "Parallel line pacing",
      "Agent sees only the connected call",
      "AMD / voicemail handling on higher tiers",
      "Campaign and disposition CRM fields",
      "Admin visibility into agent activity",
    ],
    dialerVsCrm:
      "Power dialing is the pacing engine; the CRM layer captures dispositions and next actions. INDUS Multi-Slot Agent uses the picked-call-only pattern common in predictive outbound floors.",
    indusOptions:
      "Start with Multi-Slot Agent ($79+/mo). Upgrade to Enterprise AI Multi-Slot when you want AI on the picked call plus full CRM analytics.",
    productLinks: [
      { href: "/products/dialer-multi-slot", label: "Multi-Slot Agent" },
      { href: "/compare", label: "Compare dialer plans" },
      { href: "/guides/predictive-vs-power-dialer", label: "Predictive vs power guide" },
    ],
    cta: "products",
    faqs: [
      {
        q: "What is a predictive dialer CRM?",
        a: "It dials multiple numbers ahead of agent availability, connects live answers to agents, and records outcomes in a CRM for outbound campaigns.",
      },
      {
        q: "How is multi-slot different from a single-line dialer?",
        a: "Multi-slot runs several Google Voice lines in parallel; the agent only works the call that connects. Single-line tools dial one contact at a time.",
      },
      {
        q: "Does INDUS offer AMD voicemail detection?",
        a: "Yes on Multi-Slot, AI Solo, and Enterprise AI Multi-Slot tiers—helping skip or handle voicemails according to your workflow.",
      },
    ],
    relatedSlugs: ["outbound-dialer-crm", "ai-voice-crm", "compliance-tcpa-crm"],
  },
  {
    slug: "ai-voice-crm",
    name: "AI Voice / Conversational CRM",
    shortName: "AI Voice CRM",
    role: "sell",
    primaryKeyword: "AI calling CRM",
    definition:
      "An AI voice CRM uses conversational AI on outbound calls, then writes transcripts, outcomes, and lead status into CRM records so humans only handle qualified conversations.",
    whoNeedsIt:
      "High-volume outbound teams that want AI to open or qualify calls, with humans stepping in on hot leads—or full AI solo for scripted campaigns.",
    features: [
      "AI conversation on connected calls",
      "Outcome logging to CRM",
      "Script / prompt templates",
      "Optional multi-slot + AI on picked call",
      "Admin controls for AI usage limits",
    ],
    dialerVsCrm:
      "AI handles the talk track; the CRM stores what was said and decided. Without CRM logging, AI calls become untraceable noise.",
    indusOptions:
      "AI Agent Solo for single-line AI calling; Enterprise AI Multi-Slot for parallel dialing with AI on the picked call—both with CRM/analytics modules.",
    productLinks: [
      { href: "/products/dialer-ai-agent", label: "AI Agent Solo" },
      { href: "/products/dialer-ai-multi-slot", label: "Enterprise AI Multi-Slot" },
      { href: "/work/enterprise-ai-dialer", label: "Case study" },
    ],
    cta: "both",
    faqs: [
      {
        q: "What is an AI voice CRM?",
        a: "Software where an AI agent speaks on outbound calls and logs transcripts, dispositions, and lead updates into a CRM system.",
      },
      {
        q: "Can AI run only on the picked multi-slot call?",
        a: "Yes. INDUS Enterprise AI Multi-Slot places AI on whichever parallel line connects, matching dispatch-style workflows.",
      },
      {
        q: "Do I still need human agents?",
        a: "Many teams use AI for openers and humans for closing. AI Solo can run scripted campaigns with lighter human oversight.",
      },
    ],
    relatedSlugs: ["outbound-dialer-crm", "predictive-power-dialer-crm", "analytics-workforce-crm"],
  },
  {
    slug: "dispatch-calling-crm",
    name: "Dispatch Calling CRM",
    shortName: "Dispatch CRM",
    role: "bridge",
    primaryKeyword: "dispatch CRM software",
    definition:
      "A dispatch calling CRM organizes shipper, carrier, and load contacts with outbound dialing so logistics teams can chase capacity and freight opportunities without losing call context.",
    whoNeedsIt:
      "Freight brokers, carrier sales, and dispatch desks that live on the phone and need call history tied to companies and loads.",
    features: [
      "Carrier / shipper contact records",
      "Outbound dialer integration",
      "Call notes per company",
      "Lead lists from FMCSA or web sources",
      "Custom fields for lanes and equipment",
    ],
    dialerVsCrm:
      "Dialers increase connect rate; dispatch CRM stores who owns which relationship. INDUS pairs dialers with FMCSA scraping and custom CRM builds for logistics teams.",
    indusOptions:
      "Use Multi-Slot or AI dialers for calling, FMCSA SAFER Scraper for carrier data, and the studio for a custom dispatch CRM if your fields are unique.",
    productLinks: [
      { href: "/products/dialer-multi-slot", label: "Multi-Slot dialer" },
      { href: "/products/fmcsa-safer-scraper", label: "FMCSA SAFER Scraper" },
      { href: "/start-project", label: "Custom dispatch CRM" },
    ],
    cta: "both",
    faqs: [
      {
        q: "What is a dispatch calling CRM?",
        a: "A CRM built for logistics outbound—carrier and shipper contacts, call logs, and often dialer integration for brokers and dispatch teams.",
      },
      {
        q: "Can INDUS scrape FMCSA data into a dialer list?",
        a: "Yes. FMCSA SAFER Scraper exports records you can feed into dialer campaigns or a custom dispatch CRM.",
      },
      {
        q: "Do you build custom CRMs for freight brokers?",
        a: "Yes. The INDUS studio builds dispatch-specific pipelines, fields, and dialer hooks when off-the-shelf CRM modules are not enough.",
      },
    ],
    relatedSlugs: ["outbound-dialer-crm", "lead-management-crm", "vertical-crm"],
  },
  {
    slug: "lead-management-crm",
    name: "Lead Management CRM",
    shortName: "Lead CRM",
    role: "bridge",
    primaryKeyword: "lead management CRM for outbound",
    definition:
      "A lead management CRM captures, scores, assigns, and recycles leads before and after outbound dialing so sales floors never lose a prospect in a spreadsheet.",
    whoNeedsIt:
      "Teams that generate leads from scrapers, ads, or marketplaces and need a pipeline before pushing contacts into a dialer.",
    features: [
      "Lead capture and deduplication",
      "Pipeline stages and assignment",
      "Export to dialer campaigns",
      "Admin approval gates",
      "History of outreach attempts",
    ],
    dialerVsCrm:
      "Lead CRM owns the funnel; the dialer executes phone outreach. INDUS scrapers and the Fiverr Lead Extractor CRM feed lists into dialer products.",
    indusOptions:
      "License Fiverr Lead Extractor CRM or scrapers for intake, dialers for calling, or commission a custom lead CRM that syncs both.",
    productLinks: [
      { href: "/products/fiverr-lead-extractor", label: "Fiverr Lead Extractor CRM" },
      { href: "/products?cat=scraper", label: "Web scrapers" },
      { href: "/products?cat=dialer", label: "Auto dialers" },
    ],
    cta: "both",
    faqs: [
      {
        q: "What is a lead management CRM for outbound?",
        a: "It stores inbound and scraped leads, tracks stages, and prepares clean lists for dialers or email tools.",
      },
      {
        q: "How do scrapers connect to dialers?",
        a: "Export verified lists from INDUS scrapers or lead CRMs, then import into dialer campaigns for calling.",
      },
      {
        q: "Can INDUS build a custom lead CRM?",
        a: "Yes. Custom stages, scoring, and dialer export are common studio projects.",
      },
    ],
    relatedSlugs: ["dispatch-calling-crm", "outbound-dialer-crm", "omnichannel-crm"],
  },
  {
    slug: "analytics-workforce-crm",
    name: "Analytics / Workforce CRM",
    shortName: "Analytics CRM",
    role: "sell",
    primaryKeyword: "call center analytics CRM",
    definition:
      "An analytics or workforce CRM tracks agent KPIs—talk time, connect rates, dispositions, and conversions—so outbound managers coach from data, not guesses.",
    whoNeedsIt:
      "Team leads and admins running multi-agent dialer floors who need dashboards, not only raw call logs.",
    features: [
      "Agent and campaign KPIs",
      "Talk time and connect metrics",
      "Disposition breakdowns",
      "Admin dashboards",
      "Export for weekly reporting",
    ],
    dialerVsCrm:
      "Dialers produce events; analytics CRM turns them into coaching insights. INDUS enterprise dialers include admin dashboards and CRM analytics modules.",
    indusOptions:
      "Use Multi-Slot and Enterprise AI admin dashboards out of the box, or extend custom reporting via the studio.",
    productLinks: [
      { href: "/products/dialer-multi-slot", label: "Multi-Slot Agent" },
      { href: "/products/dialer-ai-multi-slot", label: "Enterprise AI Multi-Slot" },
      { href: "/demos", label: "Live demos" },
    ],
    cta: "products",
    faqs: [
      {
        q: "What metrics should an outbound analytics CRM show?",
        a: "Connect rate, talk time, dispositions, conversions per agent, and campaign-level performance at minimum.",
      },
      {
        q: "Do INDUS dialers include admin dashboards?",
        a: "Yes on Multi-Slot and Enterprise AI tiers—covering call logs, CRM views, and operational controls.",
      },
      {
        q: "Can reports be customized?",
        a: "Native dashboards cover core KPIs; custom report packs are available as studio work.",
      },
    ],
    relatedSlugs: ["outbound-dialer-crm", "bpo-agency-crm", "ai-voice-crm"],
  },
  {
    slug: "contact-center-crm",
    name: "Contact Center CRM",
    shortName: "Contact Center CRM",
    role: "educate",
    primaryKeyword: "call center CRM",
    definition:
      "A contact center CRM supports inbound and outbound channels with queues, wrap-up codes, QA, and agent workspaces for full call-center operations.",
    whoNeedsIt:
      "Larger support or blended inbound/outbound centers that need queue management beyond a pure outbound dialer.",
    features: [
      "Inbound and outbound queues",
      "Wrap-up codes and QA",
      "Agent desktop / screen pop",
      "Supervisor monitoring",
      "Omnichannel hooks (optional)",
    ],
    dialerVsCrm:
      "Full contact-center platforms are broader than dialer CRMs. INDUS focuses on outbound dialer + CRM products and builds custom contact-center pieces when clients need queues or inbound.",
    indusOptions:
      "Start with outbound dialer products for calling; engage the studio for custom contact-center CRM workflows, integrations, and dashboards.",
    productLinks: [
      { href: "/products?cat=dialer", label: "Outbound dialers" },
      { href: "/start-project", label: "Custom contact center CRM" },
      { href: "/services", label: "Agency services" },
    ],
    cta: "custom",
    faqs: [
      {
        q: "Is a dialer CRM the same as a contact center CRM?",
        a: "No. Dialer CRMs optimize outbound calling. Contact center CRMs also cover inbound queues, QA, and blended channels.",
      },
      {
        q: "Does INDUS sell a full CCaaS like Five9?",
        a: "No. We license outbound dialers with CRM modules and build custom contact-center software when your requirements are unique.",
      },
      {
        q: "Can you integrate our existing contact center?",
        a: "Yes—custom integrations between INDUS dialers and your CRM or telephony stack are a common studio engagement.",
      },
    ],
    relatedSlugs: ["outbound-dialer-crm", "omnichannel-crm", "helpdesk-support-crm"],
  },
  {
    slug: "sales-crm-telephony",
    name: "Sales CRM + Telephony",
    shortName: "Sales CRM Telephony",
    role: "educate",
    primaryKeyword: "CRM with dialer integration",
    definition:
      "A sales CRM with telephony adds click-to-call, dialer sync, and call logging inside a pipeline CRM so reps never leave the deal board to dial.",
    whoNeedsIt:
      "B2B sales teams already on HubSpot, Salesforce, or a custom pipeline who need reliable dialer hooks—not a second CRM.",
    features: [
      "Click-to-call from deal records",
      "Automatic call logging",
      "Dialer campaign sync",
      "Disposition mapping to stages",
      "Optional AI call summaries",
    ],
    dialerVsCrm:
      "Keep your sales CRM of record; attach INDUS dialers via custom integration so calling power does not force a CRM migration.",
    indusOptions:
      "License dialers for the calling engine; hire INDUS to sync dispositions and click-to-call into your existing CRM.",
    productLinks: [
      { href: "/products?cat=dialer", label: "Dialer products" },
      { href: "/start-project", label: "CRM + dialer integration" },
      { href: "/compare", label: "Compare dialers" },
    ],
    cta: "custom",
    faqs: [
      {
        q: "Can INDUS dialers connect to HubSpot or Salesforce?",
        a: "Native products include their own CRM modules. Syncing to HubSpot/Salesforce is delivered as a custom integration project.",
      },
      {
        q: "Do I need to replace my sales CRM?",
        a: "Usually no. Many clients keep their CRM and add INDUS dialers with sync for call outcomes.",
      },
      {
        q: "What is click-to-call from a CRM?",
        a: "A button on a contact or deal record that launches dialing through your dialer or softphone and logs the result back.",
      },
    ],
    relatedSlugs: ["outbound-dialer-crm", "omnichannel-crm", "vertical-crm"],
  },
  {
    slug: "softphone-voip-crm",
    name: "Softphone / VoIP CRM",
    shortName: "VoIP CRM",
    role: "educate",
    primaryKeyword: "softphone CRM",
    definition:
      "A softphone or VoIP CRM pairs SIP/WebRTC calling with screen-pop CRM records so agents see context the moment a call connects.",
    whoNeedsIt:
      "Teams on SIP trunks or hosted VoIP who want CRM screen-pop—not Google Voice browser dialing.",
    features: [
      "SIP or WebRTC softphone",
      "CRM screen-pop",
      "Call recording hooks",
      "Presence and transfer",
      "Integration APIs",
    ],
    dialerVsCrm:
      "INDUS Google Voice dialers automate browser-based outbound. Full SIP softphone CRM is typically a custom or partner build—not our default SKU.",
    indusOptions:
      "Use Google Voice dialers when that fits; request a custom softphone/CRM project if you require SIP screen-pop.",
    productLinks: [
      { href: "/telecom/auto-dialers", label: "Google Voice dialers" },
      { href: "/start-project", label: "Custom VoIP CRM" },
      { href: "/guides/google-voice-auto-dialer-guide", label: "Google Voice guide" },
    ],
    cta: "custom",
    faqs: [
      {
        q: "Does INDUS sell a SIP softphone?",
        a: "Core products focus on Google Voice auto dialers. SIP softphone CRM can be scoped as custom software.",
      },
      {
        q: "What is CRM screen-pop?",
        a: "When a call connects, the matching contact record opens automatically so the agent has context immediately.",
      },
      {
        q: "Google Voice vs SIP for outbound?",
        a: "Google Voice suits small-to-mid teams already on GV. SIP/VoIP suits centers with trunks, DIDs, and PBX requirements.",
      },
    ],
    relatedSlugs: ["contact-center-crm", "outbound-dialer-crm", "sales-crm-telephony"],
  },
  {
    slug: "omnichannel-crm",
    name: "Omnichannel CRM",
    shortName: "Omnichannel CRM",
    role: "bridge",
    primaryKeyword: "omnichannel CRM phone email",
    definition:
      "An omnichannel CRM unifies phone, email, SMS, and chat so every customer touch shares one timeline—critical when outbound mixes dialers and email sequences.",
    whoNeedsIt:
      "Agencies and sales teams that dial and email the same leads and need one conversation history.",
    features: [
      "Shared contact timeline",
      "Phone + email channels",
      "Optional WhatsApp / SMS hooks",
      "Unified inbox for replies",
      "Campaign attribution across channels",
    ],
    dialerVsCrm:
      "Pair INDUS dialers for voice with Mailforge / email tools for outreach, or commission a custom omnichannel CRM that stitches both.",
    indusOptions:
      "Combine dialer products + Mailforge for a practical stack today; studio builds deeper omnichannel CRMs when you need one UI.",
    productLinks: [
      { href: "/products/mailforge", label: "Mailforge" },
      { href: "/products?cat=dialer", label: "Dialers" },
      { href: "/start-project", label: "Custom omnichannel CRM" },
    ],
    cta: "both",
    faqs: [
      {
        q: "What is an omnichannel CRM?",
        a: "A CRM that consolidates phone, email, and messaging into one customer record and timeline.",
      },
      {
        q: "Can I use INDUS dialers with Mailforge?",
        a: "Yes. Many operators dial with INDUS dialers and run email sequences via Mailforge or Auto Email Sender on the same lead lists.",
      },
      {
        q: "Do you build WhatsApp into CRM?",
        a: "WhatsApp and SMS channels are available as custom studio features alongside dialer and email stacks.",
      },
    ],
    relatedSlugs: ["lead-management-crm", "outbound-dialer-crm", "sales-crm-telephony"],
  },
  {
    slug: "helpdesk-support-crm",
    name: "Helpdesk / Support CRM",
    shortName: "Helpdesk CRM",
    role: "educate",
    primaryKeyword: "helpdesk CRM with phone",
    definition:
      "A helpdesk CRM ties tickets, SLAs, and phone contacts so support agents resolve issues with full history—not outbound sales calling.",
    whoNeedsIt:
      "Support and success teams that take inbound calls and need ticket workflows more than predictive dialing.",
    features: [
      "Ticket queues and SLAs",
      "Phone + email on tickets",
      "Knowledge base links",
      "CSAT surveys",
      "Agent assignment rules",
    ],
    dialerVsCrm:
      "Helpdesk CRM is inbound/support-first. INDUS outbound dialers are sales/dispatch-first. We build helpdesk CRMs as custom studio projects when needed.",
    indusOptions:
      "Engage `/start-project` for a custom helpdesk CRM; use dialers only if your support team also runs outbound campaigns.",
    productLinks: [
      { href: "/start-project", label: "Custom helpdesk CRM" },
      { href: "/services", label: "Services" },
      { href: "/contact", label: "Contact" },
    ],
    cta: "custom",
    faqs: [
      {
        q: "Is a helpdesk CRM the same as a dialer CRM?",
        a: "No. Helpdesk CRMs manage tickets and support SLAs. Dialer CRMs optimize outbound sales and dispatch calling.",
      },
      {
        q: "Does INDUS sell Zendesk alternatives?",
        a: "We do not ship a packaged helpdesk product. Custom helpdesk CRM builds are available through the studio.",
      },
      {
        q: "Can support and outbound share one CRM?",
        a: "Yes via a custom design—shared contacts with separate ticket and campaign modules.",
      },
    ],
    relatedSlugs: ["contact-center-crm", "omnichannel-crm"],
  },
  {
    slug: "bpo-agency-crm",
    name: "BPO / Multi-client Agency CRM",
    shortName: "BPO CRM",
    role: "educate",
    primaryKeyword: "BPO call center CRM",
    definition:
      "A BPO or agency CRM isolates multiple clients, campaigns, agent seats, and billing so outsourced call centers run many brands from one controlled platform.",
    whoNeedsIt:
      "BPOs, appointment-setting agencies, and white-label dialer operators managing several client books.",
    features: [
      "Multi-tenant clients",
      "Per-client campaigns and lists",
      "Agent seat allocation",
      "Billing and usage visibility",
      "Admin overrides and approvals",
    ],
    dialerVsCrm:
      "INDUS licensing already supports multi-seat dialers. Full multi-client BPO CRM (tenancy + billing UI) is typically a custom build on top of dialer engines.",
    indusOptions:
      "License dialer seats today; commission a multi-client admin CRM when you resell outbound as a service.",
    productLinks: [
      { href: "/products?cat=dialer", label: "Dialer plans" },
      { href: "/pricing", label: "Pricing" },
      { href: "/start-project", label: "Custom BPO CRM" },
    ],
    cta: "custom",
    faqs: [
      {
        q: "What is a BPO CRM?",
        a: "Software that lets an outsourcing or agency call center manage multiple client accounts, campaigns, and agents with separation of data.",
      },
      {
        q: "Can I white-label INDUS dialers?",
        a: "Discuss white-label and multi-client admin needs via a project inquiry—scopes vary by compliance and branding.",
      },
      {
        q: "Do dialer plans support multiple agents?",
        a: "Yes. Multi-Slot and Enterprise plans include multiple agent seats; exact limits depend on the tier.",
      },
    ],
    relatedSlugs: ["analytics-workforce-crm", "outbound-dialer-crm", "vertical-crm"],
  },
  {
    slug: "vertical-crm",
    name: "Vertical Industry CRMs",
    shortName: "Vertical CRM",
    role: "educate",
    primaryKeyword: "industry dialer CRM",
    definition:
      "Vertical CRMs add industry fields—insurance policies, real-estate listings, solar leads, debt accounts—on top of dialer workflows so agents speak the language of that market.",
    whoNeedsIt:
      "Outbound teams in insurance, real estate, solar, debt collection, or similar niches with specialized data models.",
    features: [
      "Industry-specific fields",
      "Dialer campaign hooks",
      "Compliance flags per vertical",
      "Custom pipelines",
      "Import from niche lead sources",
    ],
    dialerVsCrm:
      "Generic dialer CRMs cover calling. Vertical CRMs encode your domain. INDUS licenses dialers and builds vertical CRM layers as custom studio work.",
    indusOptions:
      "Subscribe to dialers for calling power; hire INDUS to model your industry CRM and wire dispositions to the dialer.",
    productLinks: [
      { href: "/products?cat=dialer", label: "Dialers" },
      { href: "/work", label: "Case studies" },
      { href: "/start-project", label: "Build a vertical CRM" },
    ],
    cta: "custom",
    faqs: [
      {
        q: "What is a vertical CRM?",
        a: "A CRM customized for one industry’s objects and workflows—e.g., policies, listings, or loan accounts—often paired with a dialer.",
      },
      {
        q: "Does INDUS ship insurance or real-estate CRMs?",
        a: "Not as fixed SKUs. We build vertical CRMs to order and connect them to INDUS dialers.",
      },
      {
        q: "How long does a vertical CRM project take?",
        a: "Typical scopes range from a few weeks for a focused MVP to longer for multi-module systems—start with a project inquiry for a quote.",
      },
    ],
    relatedSlugs: ["dispatch-calling-crm", "compliance-tcpa-crm", "sales-crm-telephony"],
  },
  {
    slug: "compliance-tcpa-crm",
    name: "Compliance CRM (TCPA / DNC)",
    shortName: "Compliance CRM",
    role: "bridge",
    primaryKeyword: "TCPA dialer CRM",
    definition:
      "A compliance CRM tracks consent, Do-Not-Call status, calling windows, and audit trails so outbound telecom teams can document how and when contacts were dialed.",
    whoNeedsIt:
      "US outbound teams that must respect TCPA/DNC rules and keep proof of consent alongside call logs (educational tooling—not legal advice).",
    features: [
      "Consent and source tracking",
      "DNC list scrubbing hooks",
      "Calling-window controls",
      "Audit-friendly call logs",
      "Export for counsel / ops review",
    ],
    dialerVsCrm:
      "Dialers execute calls; compliance CRM stores permission state. INDUS provides educational guides and can build custom consent/DNC features—operators remain responsible for legal compliance.",
    indusOptions:
      "Read our US Google Voice / TCPA overview guides, use dialer call logs as an audit base, and request custom compliance CRM features via the studio.",
    productLinks: [
      { href: "/telecom/usa", label: "USA telecom hub" },
      { href: "/guides/google-voice-us-outbound-overview", label: "US outbound overview" },
      { href: "/start-project", label: "Custom compliance features" },
    ],
    cta: "both",
    faqs: [
      {
        q: "What is a TCPA / DNC compliance CRM?",
        a: "Software that records consent, DNC status, and call timing so outbound teams can demonstrate responsible dialing practices.",
      },
      {
        q: "Does INDUS guarantee TCPA compliance?",
        a: "No. We provide tools and educational content. Compliance is your responsibility—consult qualified counsel for your use case.",
      },
      {
        q: "Can you add DNC scrubbing to a dialer?",
        a: "Yes as a custom feature—hooking your DNC lists into campaign loading and blocking dials to suppressed numbers.",
      },
    ],
    relatedSlugs: ["outbound-dialer-crm", "predictive-power-dialer-crm", "vertical-crm"],
  },
];

export function getTelecomCrm(slug: string): TelecomCrmType | undefined {
  return TELECOM_CRM_TYPES.find((c) => c.slug === slug);
}

export function getRelatedCrmTypes(slug: string): TelecomCrmType[] {
  const current = getTelecomCrm(slug);
  if (!current) return [];
  return current.relatedSlugs
    .map((s) => getTelecomCrm(s))
    .filter((c): c is TelecomCrmType => Boolean(c));
}
