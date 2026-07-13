import { notFound } from "next/navigation";
import Link from "next/link";
import { getGuide, GUIDES } from "@/lib/guides";
import { PageHero } from "@/components/agency/PageHero";
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

  return (
    <div className="bg-paper">
      <PageHero eyebrow="Guide" title={guide.title} description={guide.description} />
      <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
        {guide.sections.map((s) => (
          <section key={s.heading} className="mb-10">
            <h2 className="text-xl font-bold text-[#0c2340]">{s.heading}</h2>
            <p className="mt-3 leading-relaxed text-muted">{s.body}</p>
          </section>
        ))}
        <div className="mt-12 rounded-2xl border border-cyan-200 bg-cyan-50/60 p-6">
          <p className="font-semibold text-[#0c2340]">Ready to take the next step?</p>
          <p className="mt-2 text-sm text-muted">
            Browse our{" "}
            <Link href={href("/products")} className="text-cyan-600 hover:underline">products</Link>, try the{" "}
            <Link href={href("/tools/dialer-calculator")} className="text-cyan-600 hover:underline">dialer calculator</Link>, or{" "}
            <Link href={href("/start-project")} className="text-cyan-600 hover:underline">start a custom project</Link>.
          </p>
        </div>
        <Link href={href("/guides")} className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-[#0c2340]">
          <ArrowLeft className="h-4 w-4" /> All guides
        </Link>
      </article>
    </div>
  );
}
