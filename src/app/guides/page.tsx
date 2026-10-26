import Link from "next/link";
import { GUIDES } from "@/lib/guides";
import { PageHero } from "@/components/agency/PageHero";
import { href } from "@/lib/paths";
import { ArrowRight, Clock } from "lucide-react";

export const metadata = {
  title: "Guides — Telecom Dialers, CRMs, Email & Automation",
  description:
    "Practical INDUS guides on Google Voice auto dialers, telecom CRMs, TCPA education, email verification, and custom vs off-the-shelf software.",
  alternates: { canonical: "/guides" },
};

const categoryLabel = {
  dialers: "Auto dialers",
  email: "Email tools",
  automation: "Automation",
  agency: "Agency",
  telecom: "Telecom",
} as const;

export default function GuidesPage() {
  return (
    <div className="bg-paper">
      <PageHero
        eyebrow="Guides"
        title="Practical telecom, dialer & agency guides"
        description="Answer-ready reads on outbound dialers, telecom CRM types, US/Canada outbound, email ops, and when to build custom software."
      />
      <section className="mx-auto max-w-4xl px-5 py-16 sm:px-8">
        <div className="space-y-6">
          {GUIDES.map((g) => (
            <Link
              key={g.slug}
              href={href(`/guides/${g.slug}`)}
              className="group block rounded-2xl border border-line bg-white p-6 transition hover:border-cyan-300 hover:shadow-md"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-cyan-50 px-2.5 py-0.5 text-xs font-medium text-cyan-700">
                  {categoryLabel[g.category]}
                </span>
                <span className="flex items-center gap-1 text-xs text-muted">
                  <Clock className="h-3 w-3" /> {g.readMinutes} min read
                </span>
              </div>
              <h2 className="mt-3 text-xl font-bold text-[#0c2340] group-hover:text-cyan-700">{g.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{g.description}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-cyan-600">
                Read guide <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
