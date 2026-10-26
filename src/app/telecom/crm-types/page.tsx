import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/agency/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { TELECOM_CRM_TYPES } from "@/lib/telecom-crm";
import { breadcrumbJsonLd } from "@/lib/schema";
import { href } from "@/lib/paths";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Types of Telecom & Call Center CRMs — Complete Guide",
  description:
    "All major telecommunications CRM types for outbound: dialer CRM, predictive, AI voice, dispatch, lead management, contact center, TCPA compliance, and more—with INDUS product and custom options.",
  alternates: { canonical: "/telecom/crm-types" },
};

const roleLabel: Record<string, string> = {
  sell: "Product ready",
  bridge: "Product + custom",
  educate: "Custom / educate",
};

export default function CrmTypesIndexPage() {
  return (
    <div className="bg-paper">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Telecom", path: "/telecom" },
          { name: "CRM types", path: "/telecom/crm-types" },
        ])}
      />
      <PageHero
        eyebrow="Telecom · CRM taxonomy"
        title="Types of telecommunications CRMs"
        description="A complete map of outbound and call-center CRM categories—so you can search by problem, not just by brand. Each type links to INDUS dialers, scrapers, or custom studio work."
      />

      <section className="mx-auto max-w-3xl px-5 py-10 sm:px-8">
        <p className="text-lg leading-relaxed text-[#0c2340]">
          A telecommunications CRM stores contacts, campaigns, and call outcomes for outbound or contact-center teams.
          INDUS Web Agency covers dialer-native CRM modules on licensed products and builds specialized CRMs when your
          industry or compliance needs are unique.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8">
        <div className="grid gap-4">
          {TELECOM_CRM_TYPES.map((crm, i) => (
            <Link
              key={crm.slug}
              href={href(`/telecom/crm/${crm.slug}`)}
              className="group flex flex-col gap-3 rounded-2xl border border-line bg-white p-5 shadow-sm transition hover:border-cyan-200 hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
                  <h2 className="text-lg font-bold text-[#0c2340]">{crm.name}</h2>
                  <span className="rounded-md bg-cyan-50 px-2 py-0.5 font-mono text-[0.65rem] font-semibold uppercase tracking-wider text-cyan-700">
                    {roleLabel[crm.role]}
                  </span>
                </div>
                <p className="mt-2 line-clamp-2 text-sm text-muted">{crm.definition}</p>
              </div>
              <span className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-cyan-600">
                Read guide <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
