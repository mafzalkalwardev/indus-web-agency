import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PageHero } from "@/components/agency/PageHero";
import { FaqSection } from "@/components/seo/FaqSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { TelecomCta } from "@/components/telecom/TelecomCta";
import { TELECOM_USE_CASES, getTelecomUseCase, getRelatedUseCases } from "@/lib/telecom-usecases";
import { breadcrumbJsonLd, faqPageJsonLd } from "@/lib/schema";
import { href } from "@/lib/paths";

export function generateStaticParams() {
  return TELECOM_USE_CASES.map((u) => ({ slug: u.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const uc = getTelecomUseCase(slug);
  if (!uc) return { title: "Use case not found" };
  return {
    title: uc.title,
    description: uc.description,
    keywords: [uc.primaryKeyword, ...uc.secondaryKeywords, "INDUS Web Agency", "auto dialer"],
    alternates: { canonical: `/telecom/use-cases/${uc.slug}` },
  };
}

export default async function TelecomUseCasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const uc = getTelecomUseCase(slug);
  if (!uc) notFound();

  const related = getRelatedUseCases(uc.slug);
  const jsonLd = [
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Telecom", path: "/telecom" },
      { name: "Use cases", path: "/telecom/use-cases" },
      { name: uc.name, path: `/telecom/use-cases/${uc.slug}` },
    ]),
    faqPageJsonLd(uc.faqs),
  ];

  return (
    <div className="bg-paper">
      <JsonLd data={jsonLd} />
      <PageHero eyebrow="Use case" title={uc.title} description={uc.description}>
        <TelecomCta source={`usecase_${uc.slug}`} />
      </PageHero>

      <article className="mx-auto max-w-3xl px-5 py-14 sm:px-8">
        <p className="text-lg leading-relaxed text-[#0c2340]">{uc.answer}</p>

        <section className="mt-10">
          <h2 className="text-xl font-bold text-[#0c2340]">Who this is for</h2>
          <p className="mt-3 leading-relaxed text-muted">{uc.who}</p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold text-[#0c2340]">How INDUS helps</h2>
          <p className="mt-3 leading-relaxed text-muted">{uc.howIndusHelps}</p>
          <ul className="mt-4 flex flex-wrap gap-3">
            {uc.recommendedProducts.map((link) => (
              <li key={link.href}>
                <Link
                  href={href(link.href)}
                  className="inline-flex rounded-lg border border-line bg-white px-3 py-2 text-sm font-medium text-cyan-700 hover:border-cyan-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold text-[#0c2340]">Related searches this page covers</h2>
          <p className="mt-3 text-sm text-muted">
            Primary: <strong className="text-[#0c2340]">{uc.primaryKeyword}</strong>
          </p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {uc.secondaryKeywords.map((kw) => (
              <li key={kw} className="rounded-md bg-slate-100 px-2.5 py-1 text-xs text-slate-600">
                {kw}
              </li>
            ))}
          </ul>
        </section>

        <FaqSection faqs={uc.faqs} />

        {related.length > 0 && (
          <section className="mt-14">
            <h2 className="text-xl font-bold text-[#0c2340]">Related use cases</h2>
            <ul className="mt-4 space-y-2">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link href={href(`/telecom/use-cases/${r.slug}`)} className="text-sm font-medium text-cyan-600 hover:underline">
                    {r.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <p className="mt-12 text-sm text-muted">
          <Link href={href("/telecom/use-cases")} className="hover:text-[#0c2340]">
            ← All use cases
          </Link>
          {" · "}
          <Link href={href("/telecom/best-auto-dialers")} className="hover:text-[#0c2340]">
            Best auto dialers
          </Link>
        </p>
      </article>
    </div>
  );
}
