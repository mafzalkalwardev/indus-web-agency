import type { FaqItem } from "@/lib/schema";

export const TELECOM_PILLAR = {
  title: "Outbound Telecommunications Software",
  description:
    "INDUS Web Agency builds and licenses the dialer + CRM stack for outbound telecom teams—Google Voice auto dialers, multi-slot and AI calling, and custom CRMs for sales, dispatch, and call centers.",
  answer:
    "Outbound telecommunications software covers auto dialers, predictive multi-slot dialing, AI voice agents, and telecom CRMs that log dispositions, leads, and agent performance. INDUS Web Agency licenses ready-made Google Voice dialers and builds custom CRMs when your workflow is unique.",
  keywords: [
    "outbound telecommunications software",
    "google voice auto dialer",
    "dialer CRM",
    "call center CRM",
    "AI auto dialer",
    "dispatch dialer",
  ],
  faqs: [
    {
      q: "What outbound telecom software does INDUS offer?",
      a: "Four Google Voice auto dialer tiers (DOM starter, multi-slot, AI solo, enterprise AI multi-slot), CRM modules on higher plans, lead scrapers for list building, and custom telecom CRM development.",
    },
    {
      q: "Is INDUS a full contact-center platform like Five9?",
      a: "No. We specialize in outbound dialers with CRM modules and custom CRM builds—not SIP trunk reselling or full CCaaS. That focus is how we stay excellent for sales and dispatch outbound teams.",
    },
    {
      q: "Who is this for?",
      a: "Outbound sales teams, freight dispatch desks, small call centers, BPOs, and operators who need dialers plus CRM—not a generic web design agency.",
    },
    {
      q: "Do you serve the United States and Canada?",
      a: "Yes. Google Voice dialers are popular with US outbound teams; Canada is a secondary market for dispatch and scraping-adjacent workflows. See our USA and Canada telecom hubs.",
    },
  ] satisfies FaqItem[],
};

export const TELECOM_DIALERS_HUB = {
  title: "Google Voice Auto Dialers",
  description:
    "Compare INDUS Google Voice auto dialers—from DOM/BOM starter to multi-slot predictive and AI agent plans—with CRM, AMD, and admin dashboards.",
  answer:
    "INDUS Google Voice auto dialers automate outbound calling in Chrome: DOM/BOM Starter for solo agents, Multi-Slot for parallel lines, AI Agent Solo for conversational AI, and Enterprise AI Multi-Slot for dispatch-scale AI on the picked call.",
  faqs: [
    {
      q: "Which Google Voice dialer should I buy?",
      a: "Solo single-line: DOM Starter or AI Solo. Teams needing parallel lines: Multi-Slot. High-volume with AI on connect: Enterprise AI Multi-Slot. Use the dialer calculator for a recommendation.",
    },
    {
      q: "Do dialers include CRM?",
      a: "Basic call logs on starter tiers; full CRM modules on Multi-Slot and Enterprise AI plans.",
    },
    {
      q: "How do I compare plans side by side?",
      a: "Use /compare or the printable comparison chart at /resources/dialer-comparison.",
    },
  ] satisfies FaqItem[],
};

export const TELECOM_USA = {
  title: "Auto Dialer & Telecom CRM Software for the United States",
  description:
    "Google Voice auto dialers and outbound CRM for US sales and dispatch teams—with educational notes on TCPA/DNC (not legal advice).",
  answer:
    "US outbound teams often run Google Voice with INDUS auto dialers for multi-slot and AI calling, paired with CRM call logs. Operators should follow TCPA and DNC rules for their use case—INDUS provides tools and education, not legal counsel.",
  faqs: [
    {
      q: "Why Google Voice dialers for US teams?",
      a: "Many US SMBs already use Google Voice as a business line. INDUS dialers automate that workflow without forcing a PBX migration for starter and mid-market teams.",
    },
    {
      q: "Does INDUS guarantee TCPA compliance?",
      a: "No. Compliance depends on your consent, lists, and calling practices. Consult qualified counsel. We can help build consent/DNC features into custom CRM workflows.",
    },
    {
      q: "What products fit US outbound sales?",
      a: "Multi-Slot Agent for team dialing, AI tiers for conversational automation, and CRM modules for dispositions—plus custom Salesforce/HubSpot sync if needed.",
    },
  ] satisfies FaqItem[],
};

export const TELECOM_CANADA = {
  title: "Dispatch Dialer & Outbound Software for Canada",
  description:
    "Outbound dialers, dispatch calling workflows, and lead tools for Canadian sales and logistics operators.",
  answer:
    "Canadian dispatch and outbound teams use INDUS multi-slot dialers for high-volume calling and can pair scrapers (including Canadian website tools) for list building. Custom dispatch CRMs are available through the INDUS studio.",
  faqs: [
    {
      q: "Do INDUS dialers work for Canadian teams?",
      a: "Yes for English-speaking outbound and dispatch workflows. Confirm Google Voice or local calling setup for your region during onboarding.",
    },
    {
      q: "What about Canadian lead sources?",
      a: "Canadian Website Scraper and other scrapers help build lists; dialers then execute outbound. Custom CRM fields can match Canadian logistics data models.",
    },
    {
      q: "Can you build a bilingual CRM?",
      a: "Yes as a custom studio project—English/French UI and fields when required.",
    },
  ] satisfies FaqItem[],
};

export const DIALER_PRODUCT_CARDS = [
  {
    slug: "dialer-starter-dom",
    name: "DOM/BOM Starter",
    price: "From $29/mo",
    blurb: "Solo Google Voice automation with Excel lists and basic call logs.",
  },
  {
    slug: "dialer-multi-slot",
    name: "Multi-Slot Agent",
    price: "From $79/mo",
    blurb: "Up to 5 parallel lines; agent sees only the picked call + CRM.",
  },
  {
    slug: "dialer-ai-agent",
    name: "AI Agent Solo",
    price: "From $99/mo",
    blurb: "AI conversation on every call with script templates.",
  },
  {
    slug: "dialer-ai-multi-slot",
    name: "Enterprise AI Multi-Slot",
    price: "From $199/mo",
    blurb: "Parallel dialing with AI on the picked call + admin CRM.",
  },
] as const;
