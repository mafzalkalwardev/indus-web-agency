import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/agency/PageHero";
import { FaqSection } from "@/components/seo/FaqSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { LeadMagnetForm } from "@/components/resources/LeadMagnetForm";
import { TelecomCta } from "@/components/telecom/TelecomCta";
import { breadcrumbJsonLd, faqPageJsonLd } from "@/lib/schema";
import { pageSocialMeta } from "@/lib/seo-meta";
import { href } from "@/lib/paths";

const FAQS = [
  {
    q: "What is an insurance dialer CRM?",
    a: "Outbound dialing plus CRM fields for products, carriers, appointments, and compliance—not a generic sales CRM alone.",
  },
  {
    q: "Can AI qualify insurance leads?",
    a: "Yes. AI Agent plans can run first-pass scripts (interest, state, product) then hand hot leads to licensed agents with CRM notes.",
  },
  {
    q: "Do you replace our agency management system?",
    a: "Usually no—we sit in front for outbound (lists, dials, dispositions) and sync appointments or notes into your AMS/CRM when needed.",
  },
];

export const metadata: Metadata = {
  title: "Insurance Dialer + CRM | Cold Calling Stack for Agencies",
  description:
    "Insurance cold calling dialer and custom CRM stack—multi-slot outbound, AI qualification, appointments, and compliance logging from INDUS Web Agency.",
  alternates: { canonical: "/telecom/verticals/insurance" },
  ...pageSocialMeta({
    title: "Insurance dialer + CRM stack",
    description: "Cold calling dialers and vertical CRM for insurance agencies and IMOs.",
    path: "/telecom/verticals/insurance",
    keywords: [
      "insurance cold calling dialer",
      "insurance auto dialer CRM",
      "insurance appointment setter dialer",
      "life insurance dialer software",
    ],
  }),
};

export default function InsuranceVerticalPage() {
  const jsonLd = [
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Telecom", path: "/telecom" },
      { name: "Verticals", path: "/telecom/verticals/insurance" },
      { name: "Insurance", path: "/telecom/verticals/insurance" },
    ]),
    faqPageJsonLd(FAQS),
  ];

  return (
    <div className="bg-paper">
      <JsonLd data={jsonLd} />
      <PageHero
        eyebrow="Vertical · Insurance"
        title="Insurance dialer + CRM for cold calling teams"
        description="High-volume outbound for agencies and IMOs: multi-slot dialing, AI qualification, appointment booking, and insurance-aware CRM fields."
      >
        <TelecomCta source="vertical_insurance" />
      </PageHero>

      <article className="mx-auto max-w-3xl px-5 py-14 sm:px-8">
        <p className="text-lg leading-relaxed text-[#0c2340]">
          Insurance outbound dies when dialers and CRMs disagree. INDUS licenses Google Voice multi-slot and AI dialers,
          then—when needed—builds a vertical CRM for products, states, carriers, and setter→closer handoffs.
        </p>

        <section className="mt-10">
          <h2 className="text-xl font-bold text-[#0c2340]">What this stack includes</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted">
            <li>Multi-Slot or Enterprise AI Multi-Slot for parallel dialing</li>
            <li>Optional AI Agent Solo for after-hours qualification</li>
            <li>Dispositions mapped to insurance stages (quote, appt, sold, DNC)</li>
            <li>Custom fields via studio when AMS tools are too rigid for dialer ops</li>
            <li>Compliance-minded logging (see compliance CRM type)</li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold text-[#0c2340]">Related pages</h2>
          <ul className="mt-4 flex flex-wrap gap-3">
            {[
              { href: "/telecom/use-cases/insurance", label: "Insurance use case" },
              { href: "/process/custom-dialer-crm", label: "Build process" },
              { href: "/work/ai-custom-dialer-crm", label: "Case study" },
              { href: "/telecom/crm/compliance-tcpa-crm", label: "Compliance CRM" },
              { href: "/compare/indus-vs-cloud-dialers", label: "vs cloud dialers" },
            ].map((l) => (
              <li key={l.href}>
                <Link
                  href={href(l.href)}
                  className="inline-flex rounded-lg border border-line bg-white px-3 py-2 text-sm font-medium text-cyan-700 hover:border-cyan-200"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12">
          <LeadMagnetForm resource="dialer-crm-stack-checklist" compact />
        </section>

        <FaqSection faqs={FAQS} />
      </article>
    </div>
  );
}
