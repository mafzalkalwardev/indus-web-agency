import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/agency/PageHero";
import { LeadMagnetForm } from "@/components/resources/LeadMagnetForm";
import { href } from "@/lib/paths";
import { pageSocialMeta } from "@/lib/seo-meta";
import { Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Free Dialer + CRM Stack Checklist",
  description:
    "Free checklist for AI agent custom auto dialers with CRMs—buy vs build, dispositions, AI handoff, and go-live gates. Emailed by INDUS Web Agency.",
  alternates: { canonical: "/resources/dialer-crm-checklist" },
  ...pageSocialMeta({
    title: "Dialer + CRM stack checklist",
    description: "Buy vs build, AI fit, and go-live gates—free by email.",
    path: "/resources/dialer-crm-checklist",
  }),
};

const included = [
  "License vs custom CRM decision tree",
  "AI agent vs human-only dialer fit",
  "Disposition and DNC must-haves",
  "Multi-client / BPO tenancy checklist",
  "Go-live gates before cutting over from SaaS dialers",
  "Links to calculator, process, and comparisons",
];

export default function DialerCrmChecklistPage() {
  return (
    <div className="bg-paper">
      <PageHero
        eyebrow="Free resource"
        title="Dialer + CRM stack checklist"
        description="For teams evaluating best AI agent custom auto dialers with CRMs—get the buy-vs-build checklist emailed instantly."
      />
      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-2">
        <div>
          <h2 className="text-xl font-bold text-[#0c2340]">What&apos;s inside</h2>
          <ul className="mt-6 space-y-3">
            {included.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-muted">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan-600" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-muted">
            Prefer reading on-site? See{" "}
            <Link href={href("/process/custom-dialer-crm")} className="font-medium text-cyan-600 hover:underline">
              how we build dialer + CRM
            </Link>{" "}
            or the{" "}
            <Link href={href("/resources/dialer-guide")} className="font-medium text-cyan-600 hover:underline">
              dialer plan guide
            </Link>
            .
          </p>
        </div>
        <LeadMagnetForm resource="dialer-crm-stack-checklist" />
      </section>
    </div>
  );
}
