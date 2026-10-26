import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PageHero } from "@/components/agency/PageHero";
import { FaqSection } from "@/components/seo/FaqSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { TelecomCta } from "@/components/telecom/TelecomCta";
import { TELECOM_CRM_TYPES, getTelecomCrm, getRelatedCrmTypes } from "@/lib/telecom-crm";
import { breadcrumbJsonLd, faqPageJsonLd } from "@/lib/schema";
import { href } from "@/lib/paths";
import { Check } from "lucide-react";

export function generateStaticParams() {
  return TELECOM_CRM_TYPES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const crm = getTelecomCrm(slug);
  if (!crm) return { title: "CRM type not found" };
  return {
    title: `${crm.name} — Telecom CRM Guide`,
    description: crm.definition,
    keywords: [crm.primaryKeyword, crm.name, "telecom CRM", "call center CRM", "INDUS Web Agency"],
    alternates: { canonical: `/telecom/crm/${crm.slug}` },
  };
}

export default async function TelecomCrmPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const crm = getTelecomCrm(slug);
  if (!crm) notFound();

  const related = getRelatedCrmTypes(crm.slug);
  const jsonLd = [
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Telecom", path: "/telecom" },
      { name: "CRM types", path: "/telecom/crm-types" },
      { name: crm.name, path: `/telecom/crm/${crm.slug}` },
    ]),
    faqPageJsonLd(crm.faqs),
  ];

  return (
    <div className="bg-paper">
      <JsonLd data={jsonLd} />
      <PageHero eyebrow="Telecom CRM" title={crm.name} description={crm.definition}>
        <TelecomCta variant={crm.cta} source={`crm_${crm.slug}`} />
      </PageHero>

      <article className="mx-auto max-w-3xl px-5 py-14 sm:px-8">
        <section>
          <h2 className="text-xl font-bold text-[#0c2340]">What is a {crm.shortName.toLowerCase()}?</h2>
          <p className="mt-3 leading-relaxed text-muted">{crm.definition}</p>
          <p className="mt-4 leading-relaxed text-muted">
            Primary search intent: <strong className="text-[#0c2340]">{crm.primaryKeyword}</strong>. INDUS Web Agency
            documents this category so buyers comparing telecom CRMs get a clear answer—not just brand pages.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold text-[#0c2340]">Who needs it?</h2>
          <p className="mt-3 leading-relaxed text-muted">{crm.whoNeedsIt}</p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold text-[#0c2340]">Core features</h2>
          <ul className="mt-4 space-y-2.5">
            {crm.features.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-sm text-muted">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan-600" />
                {f}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold text-[#0c2340]">Dialer vs CRM vs both</h2>
          <p className="mt-3 leading-relaxed text-muted">{crm.dialerVsCrm}</p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold text-[#0c2340]">INDUS options</h2>
          <p className="mt-3 leading-relaxed text-muted">{crm.indusOptions}</p>
          <ul className="mt-4 flex flex-wrap gap-3">
            {crm.productLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={href(link.href)}
                  className="inline-flex rounded-lg border border-line bg-white px-3 py-2 text-sm font-medium text-cyan-700 transition hover:border-cyan-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <TelecomCta variant={crm.cta} source={`crm_${crm.slug}_mid`} />
        </section>

        <FaqSection faqs={crm.faqs} />

        {related.length > 0 && (
          <section className="mt-14">
            <h2 className="text-xl font-bold text-[#0c2340]">Related CRM types</h2>
            <ul className="mt-4 space-y-2">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link href={href(`/telecom/crm/${r.slug}`)} className="text-sm font-medium text-cyan-600 hover:underline">
                    {r.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <p className="mt-12 text-sm text-muted">
          <Link href={href("/telecom/crm-types")} className="hover:text-[#0c2340]">
            ← All telecom CRM types
          </Link>
          {" · "}
          <Link href={href("/telecom")} className="hover:text-[#0c2340]">
            Telecom hub
          </Link>
        </p>
      </article>
    </div>
  );
}
