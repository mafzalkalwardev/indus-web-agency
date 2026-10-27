import type { FaqItem } from "@/lib/schema";

export interface TelecomMarket {
  slug: string;
  name: string;
  title: string;
  description: string;
  answer: string;
  notes: string[];
  primaryKeywords: string[];
  faqs: FaqItem[];
}

/** English-first markets — quality pages beat thin “every country” spam */
export const TELECOM_MARKETS: TelecomMarket[] = [
  {
    slug: "global",
    name: "Worldwide",
    title: "Auto Dialer Software for Global Outbound Teams",
    description:
      "INDUS Google Voice auto dialers and telecom CRMs for remote and international outbound teams—cold calling, AI sales agents, and multi-slot dialing worldwide.",
    answer:
      "INDUS serves outbound teams globally in English: license dialers online, download after approval, and operate remotely. Availability of Google Voice and local calling rules vary by country—operators remain responsible for compliance.",
    notes: [
      "Remote-friendly Windows dialers and web licensing",
      "Use cases cover cold calling, telecom, AI closing, industries",
      "Custom CRM projects for any timezone team",
    ],
    primaryKeywords: [
      "auto dialer software worldwide",
      "international outbound dialer",
      "global cold calling software",
      "remote sales dialer",
    ],
    faqs: [
      {
        q: "Do you sell auto dialers worldwide?",
        a: "Yes. Subscriptions and downloads are available internationally. Confirm Google Voice (or your calling path) works in your region during setup.",
      },
    ],
  },
  {
    slug: "united-kingdom",
    name: "United Kingdom",
    title: "Auto Dialers for UK Outbound Sales & Cold Calling",
    description:
      "Cold calling and outbound dialer software for UK sales teams—multi-slot, AI agents, and CRM logging from INDUS Web Agency.",
    answer:
      "UK outbound teams searching for cold calling dialers and AI sales agents can license INDUS Google Voice–oriented dialers where GV fits, or request custom telephony CRM integrations for UK numbers and workflows.",
    notes: [
      "PECR/privacy education is your responsibility—we provide tools and logs",
      "English-language products and support",
      "Custom builds for UK CRM fields",
    ],
    primaryKeywords: ["auto dialer UK", "cold calling dialer UK", "sales dialer United Kingdom"],
    faqs: [
      {
        q: "Can UK companies use INDUS dialers?",
        a: "Yes for English outbound workflows. Validate calling numbers and local rules with your counsel and carriers.",
      },
    ],
  },
  {
    slug: "australia",
    name: "Australia",
    title: "Auto Dialers for Australian Sales & Appointment Setting",
    description:
      "Outbound and appointment-setting dialers for Australian teams—INDUS multi-slot and AI dialer software with CRM modules.",
    answer:
      "Australian SDRs and setters use INDUS dialers for high-volume outbound and AI qualification. Pair with custom CRM for local lead sources.",
    notes: ["Remote licensing", "Appointment-setting use case", "Custom integrations available"],
    primaryKeywords: ["auto dialer Australia", "cold calling dialer Australia", "sales dialer AU"],
    faqs: [
      {
        q: "Do you support Australian outbound teams?",
        a: "Yes. English product UI and remote onboarding; confirm local number strategy during setup.",
      },
    ],
  },
  {
    slug: "uae",
    name: "United Arab Emirates",
    title: "Auto Dialers for UAE Sales & Call Centers",
    description:
      "Outbound dialer software for UAE sales floors and BPOs—multi-slot calling, AI agents, and custom CRM from INDUS.",
    answer:
      "UAE agencies and outbound desks license INDUS dialers for list-based calling and AI openers, with custom multi-client CRM options for BPOs.",
    notes: ["BPO use case fit", "English support", "Custom white-label discussions"],
    primaryKeywords: ["auto dialer UAE", "call center dialer Dubai", "cold calling software UAE"],
    faqs: [
      {
        q: "Can Dubai call centers use INDUS?",
        a: "Yes for outbound dialer + CRM workflows. Enterprise multi-slot and BPO CRM projects are common asks.",
      },
    ],
  },
  {
    slug: "india",
    name: "India",
    title: "Auto Dialers for India BPOs & Outbound Sales",
    description:
      "Dialers for India BPOs and outbound sales—multi-seat licensing, AI agents, and multi-client CRM builds.",
    answer:
      "India’s BPO and outbound industry needs multi-seat dialers and client separation. INDUS provides dialer licenses and custom BPO CRM tenancy.",
    notes: ["BPO agency use case", "Multi-seat plans", "Custom tenancy CRM"],
    primaryKeywords: ["auto dialer India", "BPO dialer India", "cold calling software India"],
    faqs: [
      {
        q: "Is INDUS used by Indian BPOs?",
        a: "Dialer seats and custom multi-client CRMs are designed for agency/BPO patterns. Start with Enterprise dialer plans or a project inquiry.",
      },
    ],
  },
];

export function getTelecomMarket(slug: string): TelecomMarket | undefined {
  return TELECOM_MARKETS.find((m) => m.slug === slug);
}
