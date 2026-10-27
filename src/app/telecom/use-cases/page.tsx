import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/agency/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { TELECOM_USE_CASES } from "@/lib/telecom-usecases";
import { breadcrumbJsonLd } from "@/lib/schema";
import { href } from "@/lib/paths";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Auto Dialer Use Cases — Cold Calling, Telecom, AI Sales & More",
  description:
    "Every outbound dialer use case: cold calling, telecommunications, AI sales closing, SDR, insurance, real estate, solar, dispatch, BPO, and small business—mapped to INDUS products.",
  alternates: { canonical: "/telecom/use-cases" },
};

export default function UseCasesIndexPage() {
  return (
    <div className="bg-paper">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Telecom", path: "/telecom" },
          { name: "Use cases", path: "/telecom/use-cases" },
        ])}
      />
      <PageHero
        eyebrow="Keyword coverage · Use cases"
        title="Auto dialer use cases for every outbound search"
        description="People search “best auto dialers for cold calling,” “for telecommunication,” “AI agent closes the sales,” and dozens of industry variants. Each use case page answers that intent and routes to the right INDUS dialer or custom CRM."
      />

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TELECOM_USE_CASES.map((uc) => (
            <Link
              key={uc.slug}
              href={href(`/telecom/use-cases/${uc.slug}`)}
              className="group flex flex-col rounded-2xl border border-line bg-white p-6 shadow-sm transition hover:border-cyan-200 hover:shadow-md"
            >
              <h2 className="text-lg font-bold text-[#0c2340] group-hover:text-cyan-700">{uc.name}</h2>
              <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-wider text-cyan-700">{uc.primaryKeyword}</p>
              <p className="mt-3 flex-1 text-sm text-muted line-clamp-3">{uc.description}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-cyan-600">
                Open guide <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
        <p className="mt-10 text-center text-sm text-muted">
          Also see{" "}
          <Link href={href("/telecom/best-auto-dialers")} className="text-cyan-600 hover:underline">
            best auto dialers hub
          </Link>{" "}
          and{" "}
          <Link href={href("/telecom/markets")} className="text-cyan-600 hover:underline">
            global markets
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
