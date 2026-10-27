import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/agency/PageHero";
import { FaqSection } from "@/components/seo/FaqSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { LeadMagnetForm } from "@/components/resources/LeadMagnetForm";
import { TelecomCta } from "@/components/telecom/TelecomCta";
import { breadcrumbJsonLd, faqPageJsonLd, howToJsonLd } from "@/lib/schema";
import { pageSocialMeta } from "@/lib/seo-meta";
import { href } from "@/lib/paths";

const STEPS = [
  {
    name: "Discover outbound reality",
    text: "We map call volume, Google Voice vs SIP, AI vs human, compliance needs, and whether built-in dialer CRM is enough.",
  },
  {
    name: "Choose license vs custom",
    text: "Path A: subscribe to Multi-Slot / AI dialers. Path B: custom CRM or hybrid. We document the buy-vs-build decision in week one.",
  },
  {
    name: "Model CRM objects",
    text: "Campaigns, lists, dispositions, DNC, tenants, AI transcripts, and supervisor KPIs—designed before UI polish.",
  },
  {
    name: "Wire dialer events",
    text: "Connects, AMD, AI handoffs, and dispositions write into the CRM in near real time with admin dashboards.",
  },
  {
    name: "Pilot & train",
    text: "One campaign live with coaching views. Agents and managers validate before full cutover.",
  },
  {
    name: "Scale & iterate",
    text: "Add clients, vertical fields, or AI scripts. Licensed dialer seats scale; custom CRM evolves with your ops.",
  },
];

const FAQS = [
  {
    q: "How long does a custom dialer + CRM take?",
    a: "Licensed dialer alone: days. Hybrid MVP (dialer + slim custom CRM): typically 3–6 weeks. Full multi-tenant BPO CRM: longer, scoped in phases.",
  },
  {
    q: "Do I have to build a custom CRM?",
    a: "No. Many teams only license INDUS dialers with built-in CRM modules. Build custom when stages, tenancy, or AI logging do not fit.",
  },
  {
    q: "Where is the team based?",
    a: "Islamabad studio, remote delivery worldwide—especially US/Canada outbound desks.",
  },
];

export const metadata: Metadata = {
  title: "How We Build Custom Dialer + CRM Systems",
  description:
    "Process for building AI agent custom auto dialers with CRMs: discover, license vs build, model objects, wire dialer events, pilot, and scale—INDUS Web Agency.",
  alternates: { canonical: "/process/custom-dialer-crm" },
  ...pageSocialMeta({
    title: "How we build custom dialer + CRM",
    description: "From discovery to AI dialer events in your CRM—INDUS process.",
    path: "/process/custom-dialer-crm",
    keywords: ["custom dialer CRM process", "build AI dialer with CRM", "how to build outbound CRM"],
  }),
};

export default function CustomDialerCrmProcessPage() {
  const jsonLd = [
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Process", path: "/process/custom-dialer-crm" },
      { name: "Custom dialer + CRM", path: "/process/custom-dialer-crm" },
    ]),
    faqPageJsonLd(FAQS),
    howToJsonLd({
      name: "How INDUS builds a custom dialer + CRM",
      description: "Step-by-step delivery for AI agent dialers with custom or hybrid CRMs.",
      steps: STEPS,
    }),
  ];

  return (
    <div className="bg-paper">
      <JsonLd data={jsonLd} />
      <PageHero
        eyebrow="Delivery process"
        title="How we build custom dialer + CRM systems"
        description="A clear path from outbound discovery to AI dialer events landing in a CRM you actually own—license, hybrid, or full custom."
      >
        <TelecomCta source="process_custom_dialer_crm" />
      </PageHero>

      <article className="mx-auto max-w-5xl px-5 py-14 sm:px-8">
        <p className="text-lg leading-relaxed text-[#0c2340]">
          Teams searching for the best AI agent custom auto dialers with CRMs usually need more than a feature list—they
          need a delivery sequence that does not stall on CRM politics. This is how INDUS runs it from Islamabad for
          local and global clients.
        </p>

        <ol className="mt-12 space-y-6">
          {STEPS.map((step, i) => (
            <li key={step.name} className="rounded-2xl border border-line bg-white p-6">
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-cyan-700">Step {i + 1}</p>
              <h2 className="mt-2 text-xl font-bold text-[#0c2340]">{step.name}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.text}</p>
            </li>
          ))}
        </ol>

        <section className="mt-14 grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="text-xl font-bold text-[#0c2340]">Get the stack checklist</h2>
            <p className="mt-3 text-sm text-muted">
              Free email checklist: buy vs build, AI fit, disposition map, and go-live gates.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              <li>
                <Link href={href("/work/ai-custom-dialer-crm")} className="text-cyan-600 hover:underline">
                  Metric case study →
                </Link>
              </li>
              <li>
                <Link href={href("/compare/custom-crm-vs-off-the-shelf")} className="text-cyan-600 hover:underline">
                  Custom CRM vs off-the-shelf →
                </Link>
              </li>
              <li>
                <Link href={href("/telecom/verticals/insurance")} className="text-cyan-600 hover:underline">
                  Insurance vertical example →
                </Link>
              </li>
            </ul>
          </div>
          <LeadMagnetForm resource="dialer-crm-stack-checklist" compact />
        </section>

        <FaqSection faqs={FAQS} />
      </article>
    </div>
  );
}
