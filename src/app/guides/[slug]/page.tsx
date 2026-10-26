import { notFound } from "next/navigation";
import Link from "next/link";
import { getGuide, GUIDES } from "@/lib/guides";
import { PageHero } from "@/components/agency/PageHero";
import { FaqSection } from "@/components/seo/FaqSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { articleJsonLd, breadcrumbJsonLd, faqPageJsonLd } from "@/lib/schema";
import { href } from "@/lib/paths";
import { ArrowLeft } from "lucide-react";

export async function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return { title: "Guide not found" };
  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical: `/guides/${guide.slug}` },
  };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const path = `/guides/${guide.slug}`;
  const jsonLd: object[] = [
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Guides", path: "/guides" },
      { name: guide.title, path },
    ]),
    articleJsonLd({
      title: guide.title,
      description: guide.description,
      path,
      publishedAt: guide.publishedAt,
      modifiedAt: guide.modifiedAt || guide.publishedAt,
    }),
  ];
  if (guide.faqs?.length) {
    jsonLd.push(faqPageJsonLd(guide.faqs));
  }

  return (
    <div className="bg-paper">
      <JsonLd data={jsonLd} />
      <PageHero eyebrow="Guide" title={guide.title} description={guide.description}>
        <p className="mt-4 font-mono text-xs text-cyan-300/90">
          {guide.readMinutes} min read · Updated {guide.modifiedAt || guide.publishedAt}
        </p>
      </PageHero>
      <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
        <nav aria-label="Table of contents" className="mb-10 rounded-xl border border-line bg-white p-5">
          <p className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-cyan-700">
            On this page
          </p>
          <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-sm">
            {guide.sections.map((s) => (
              <li key={s.heading}>
                <a href={`#${slugify(s.heading)}`} className="text-cyan-700 hover:underline">
                  {s.heading}
                </a>
              </li>
            ))}
            {guide.faqs?.length ? (
              <li>
                <a href="#faq" className="text-cyan-700 hover:underline">
                  FAQ
                </a>
              </li>
            ) : null}
          </ol>
        </nav>

        {guide.sections.map((s) => (
          <section key={s.heading} id={slugify(s.heading)} className="mb-10 scroll-mt-28">
            <h2 className="text-xl font-bold text-[#0c2340]">{s.heading}</h2>
            <p className="mt-3 leading-relaxed text-muted">{s.body}</p>
          </section>
        ))}

        {guide.faqs?.length ? (
          <div id="faq" className="scroll-mt-28">
            <FaqSection faqs={guide.faqs} />
          </div>
        ) : null}

        <div className="mt-12 rounded-2xl border border-cyan-200 bg-cyan-50/60 p-6">
          <p className="font-semibold text-[#0c2340]">Ready to take the next step?</p>
          <p className="mt-2 text-sm text-muted">
            Explore the{" "}
            <Link href={href("/telecom")} className="text-cyan-600 hover:underline">
              telecom hub
            </Link>
            , browse{" "}
            <Link href={href("/products")} className="text-cyan-600 hover:underline">
              products
            </Link>
            , try the{" "}
            <Link href={href("/tools/dialer-calculator")} className="text-cyan-600 hover:underline">
              dialer calculator
            </Link>
            , or{" "}
            <Link href={href("/start-project")} className="text-cyan-600 hover:underline">
              start a custom project
            </Link>
            .
          </p>
        </div>
        <Link
          href={href("/guides")}
          className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-[#0c2340]"
        >
          <ArrowLeft className="h-4 w-4" /> All guides
        </Link>
      </article>
    </div>
  );
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
