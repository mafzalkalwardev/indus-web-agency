import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { getPortfolioProject, PORTFOLIO } from "@/lib/portfolio";
import { PageHero } from "@/components/agency/PageHero";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { href } from "@/lib/paths";
import { SITE_CONTACT } from "@/lib/site-config";

export async function generateStaticParams() {
  return PORTFOLIO.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getPortfolioProject(slug);
  if (!project) return { title: "Case study not found" };
  return {
    title: `${project.title} — Case Study`,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getPortfolioProject(slug);
  if (!project) notFound();

  return (
    <div className="bg-paper">
      <PageHero
        eyebrow={`Case study · ${project.category}`}
        title={project.title}
        description={project.summary}
      >
        <p className="mt-4 font-mono text-sm text-cyan-300">{project.client}</p>
      </PageHero>

      <article className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_340px]">
          <div>
            <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-2xl border border-line bg-[#0c2340]">
              <Image src={project.image} alt={project.title} fill className="object-cover" priority />
            </div>

            {project.challenge && (
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-[#0c2340]">The challenge</h2>
                <p className="mt-3 leading-relaxed text-muted">{project.challenge}</p>
              </section>
            )}

            {project.solution && (
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-[#0c2340]">Our approach</h2>
                <p className="mt-3 leading-relaxed text-muted">{project.solution}</p>
              </section>
            )}

            {project.body?.map((para) => (
              <p key={para.slice(0, 40)} className="mb-4 leading-relaxed text-muted">
                {para}
              </p>
            ))}

            {project.outcome && (
              <section className="mt-10 rounded-2xl border border-cyan-200 bg-cyan-50/50 p-6">
                <h2 className="text-lg font-bold text-[#0c2340]">Outcome</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">{project.outcome}</p>
              </section>
            )}
          </div>

          <aside className="space-y-6">
            <div className="rounded-2xl border border-line bg-white p-6">
              <h3 className="font-bold text-[#0c2340]">Results</h3>
              <ul className="mt-4 space-y-2">
                {project.results.map((r) => (
                  <li key={r} className="flex items-start gap-2 text-sm text-muted">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan-600" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-line bg-white p-6">
              <h3 className="font-bold text-[#0c2340]">Stack</h3>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.technologies.map((t) => (
                  <Badge key={t} variant="secondary">{t}</Badge>
                ))}
              </div>
            </div>

            {project.productSlug && (
              <div className="rounded-2xl border border-[#0c2340]/15 bg-[#0c2340] p-6 text-white">
                <h3 className="font-bold">Available as a product</h3>
                <p className="mt-2 text-sm text-slate-300">
                  This system is part of our software shelf — subscribe and download after approval.
                </p>
                <Button asChild className="mt-4 w-full">
                  <Link href={href(`/products/${project.productSlug}`)}>
                    View product <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            )}

            <div className="rounded-2xl border border-line bg-white p-6">
              <h3 className="font-bold text-[#0c2340]">Similar project?</h3>
              <p className="mt-2 text-sm text-muted">Tell us what you need built.</p>
              <Link
                href={href("/start-project")}
                className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-cyan-600 hover:underline"
              >
                Start a project <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </aside>
        </div>

        <div className="mt-16 border-t border-line pt-8">
          <Link href={href("/work")} className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-[#0c2340]">
            <ArrowLeft className="h-4 w-4" /> Back to all work
          </Link>
        </div>
      </article>
    </div>
  );
}
