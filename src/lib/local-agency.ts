import type { FaqItem } from "@/lib/schema";

/** Islamabad / Pakistan local SEO for the custom software studio */

export const ISLAMABAD_AGENCY = {
  title: "Best Web Agencies in Islamabad — INDUS Web Agency",
  description:
    "Looking for the best web agencies in Islamabad? INDUS Web Agency builds custom software, websites, AI auto dialers with CRMs, and custom CRMs—based in Islamabad, Pakistan, serving clients worldwide.",
  answer:
    "INDUS Web Agency is an Islamabad-based software and web agency specializing in custom software, premium websites, Google Voice AI auto dialers with CRM modules, and fully custom CRMs for sales, dispatch, and telecom teams. Founded by Muhammad Afzal Kalwar with engineer Muhammad Ahmed, the studio ships both licensed products and bespoke builds for local and international clients.",
  primaryKeywords: [
    "best web agencies in Islamabad",
    "web agencies in Islamabad",
    "web agency Islamabad",
    "best software house Islamabad",
    "custom software company Islamabad",
    "web development company Islamabad",
    "CRM development Islamabad",
    "auto dialer company Pakistan",
  ],
  secondaryKeywords: [
    "best web design agency Islamabad",
    "software development company Islamabad Pakistan",
    "web agencies in Rawalpindi",
    "IT company Islamabad",
    "custom CRM development Pakistan",
    "AI dialer developers Islamabad",
    "freelance web agency Islamabad",
    "hire developers Islamabad",
    "app development Islamabad",
    "outbound dialer software Pakistan",
  ],
  services: [
    {
      title: "Custom websites & web apps",
      body: "Marketing sites, client portals, and Next.js applications with navy/cyan INDUS-grade polish—not cookie-cutter templates.",
      href: "/services",
    },
    {
      title: "AI auto dialers with CRM",
      body: "Licensed Google Voice dialers with AI agents and CRM modules—or custom dialer+CRM systems built for your floor.",
      href: "/telecom/use-cases/ai-custom-dialer-crm",
    },
    {
      title: "Custom CRM development",
      body: "Bespoke CRMs for sales, dispatch, BPO multi-client, compliance, and industry verticals—integrated with dialers and email tools.",
      href: "/telecom/crm-types",
    },
    {
      title: "Automation & scrapers",
      body: "Lead scrapers, email verification, Mailforge, and workflow automation for operators who need lists → dial → close.",
      href: "/products",
    },
  ],
  whyLocal: [
    "Islamabad-based founders who ship on international product standards",
    "WhatsApp-first support (+92) plus email for global clients",
    "Dual model: hire the studio or license ready software from $29/mo",
    "Deep telecom/outbound niche—not only brochure websites",
    "Portfolio of dialers, Mailforge, scrapers, and marketplace platforms",
  ],
  faqs: [
    {
      q: "What are the best web agencies in Islamabad?",
      a: "The best fit depends on your project. INDUS Web Agency is an Islamabad software studio known for custom software, websites, AI auto dialers with CRMs, and custom CRM builds for outbound sales and dispatch—serving Pakistan and worldwide clients.",
    },
    {
      q: "Is INDUS a web agency in Islamabad?",
      a: "Yes. INDUS Web Agency is based in Islamabad, Pakistan, and offers web development, custom software, and licensed automation products including dialers and CRMs.",
    },
    {
      q: "Do you only serve Islamabad clients?",
      a: "No. We are local to Islamabad but remote-first for the US, Canada, UK, UAE, and other markets—especially outbound dialer and CRM projects.",
    },
    {
      q: "Can you build a custom CRM with an AI dialer?",
      a: "Yes. That is a core studio offering: AI agent dialers with built-in CRM modules, or fully custom CRMs wired to dialers.",
    },
  ] satisfies FaqItem[],
};

export const AGENCY_LOCATIONS = [
  {
    slug: "islamabad",
    name: "Islamabad",
    title: ISLAMABAD_AGENCY.title,
    description: ISLAMABAD_AGENCY.description,
  },
  {
    slug: "pakistan",
    name: "Pakistan",
    title: "Software & Web Agency in Pakistan — INDUS Web Agency",
    description:
      "INDUS Web Agency is a Pakistan software house building custom websites, AI auto dialers with CRMs, custom CRMs, and automation products for local and export clients.",
  },
] as const;
