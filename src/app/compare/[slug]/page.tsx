import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/agency/PageHero";
import { FaqSection } from "@/components/seo/FaqSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { LeadMagnetForm } from "@/components/resources/LeadMagnetForm";
import { COMPARISONS, getComparison } from "@/lib/comparisons";
import { articleJsonLd, breadcrumbJsonLd, faqPageJsonLd } from "@/lib/schema";
import { pageSocialMeta } from "@/lib/seo-meta";
import { href } from "@/lib/paths";

export function generateStaticParams() {
  return COMPARISONS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getComparison(slug);
  if (!page) return { title: "Comparison not found" };
  return {
    title: page.metaTitle,
    description: page.description,
    keywords: [page.primaryKeyword, ...page.secondaryKeywords, "INDUS Web Agency"],
    alternates: { canonical: `/compare/${page.slug}` },
    ...pageSocialMeta({
      title: page.metaTitle,
      description: page.description,
      path: `/compare/${page.slug}`,
      keywords: [page.primaryKeyword, ...page.secondaryKeywords],
    }),
  };
}

export default async function ComparisonSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getComparison(slug);
  if (!page) notFound();

  const jsonLd = [
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Compare", path: "/compare" },
      { name: page.title, path: `/compare/${page.slug}` },
    ]),
    faqPageJsonLd(page.faqs),
    articleJsonLd({
      title: page.title,
      description: page.description,
      path: `/compare/${page.slug}`,
      publishedAt: page.publishedAt,
    }),
  ];

  return (
    <div className="bg-paper">
      <JsonLd data={jsonLd} />
      <PageHero eyebrow={page.eyebrow} title={page.title} description={page.description}>
        <p className="mt-4 max-w-2xl text-sm text-cyan-100/90">
          Primary intent: <span className="font-semibold text-white">{page.primaryKeyword}</span>
        </p>
      </PageHero>

      <article className="mx-auto max-w-5xl px-5 py-14 sm:px-8">
        <p className="text-lg leading-relaxed text-[#0c2340]">{page.answer}</p>

        <section className="mt-10">
          <h2 className="text-xl font-bold text-[#0c2340]">Who this comparison is for</h2>
          <p className="mt-3 leading-relaxed text-muted">{page.who}</p>
        </section>

        <section className="mt-12 overflow-x-auto rounded-2xl border border-line bg-white">
          <table className="w-full min-w-[640px] border-collapse text-left">
            <thead>
              <tr className="border-b border-line bg-slate-50">
                <th className="px-4 py-4 text-xs font-mono uppercase tracking-wider text-muted">
                  Dimension
                </th>
                <th className="px-4 py-4 text-sm font-bold text-cyan-800">{page.leftLabel}</th>
                <th className="px-4 py-4 text-sm font-bold text-slate-700">{page.rightLabel}</th>
              </tr>
            </thead>
            <tbody>
              {page.rows.map((row) => (
                <tr key={row.feature} className="border-b border-line last:border-0">
                  <td className="px-4 py-3.5 text-sm font-semibold text-[#0c2340]">{row.feature}</td>
                  <td className="px-4 py-3.5 text-sm text-muted">{row.left}</td>
                  <td className="px-4 py-3.5 text-sm text-muted">{row.right}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="mt-10 rounded-2xl border border-cyan-200 bg-cyan-50/60 p-6">
          <h2 className="text-lg font-bold text-[#0c2340]">Verdict</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">{page.verdict}</p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold text-[#0c2340]">Next steps</h2>
          <ul className="mt-4 flex flex-wrap gap-3">
            {page.relatedLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={href(link.href)}
                  className="inline-flex items-center gap-1 rounded-lg border border-line bg-white px-3 py-2 text-sm font-medium text-cyan-700 hover:border-cyan-200"
                >
                  {link.label} <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12">
          <LeadMagnetForm resource="dialer-crm-stack-checklist" compact />
        </section>

        <FaqSection faqs={page.faqs} />

        <p className="mt-12 text-sm text-muted">
          Also see{" "}
          <Link href={href("/compare")} className="font-semibold text-cyan-600 hover:underline">
            INDUS dialer plan comparison
          </Link>{" "}
          and other{" "}
          <Link href={href("/compare")} className="font-semibold text-cyan-600 hover:underline">
            deep comparisons
          </Link>
          .
        </p>
      </article>
    </div>
  );
}
