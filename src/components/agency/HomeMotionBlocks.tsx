import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { AGENCY_SERVICES } from "@/lib/agency-services";
import { PORTFOLIO } from "@/lib/portfolio";
import { href } from "@/lib/paths";

export function ServiceCardsGrid() {
  return (
    <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {AGENCY_SERVICES.slice(0, 6).map((s, i) => (
        <div key={s.id}>
          <Link
            href={href("/services")}
            className="group flex h-full flex-col rounded-2xl border border-line bg-paper-raised p-7 transition-all duration-300 hover:-translate-y-1 hover:border-ink"
          >
            <div className="flex items-center justify-between">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-line bg-paper text-ink transition-colors group-hover:border-accent group-hover:text-accent">
                <s.icon className="h-5 w-5" />
              </span>
              <span className="font-mono text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
            </div>
            <h3 className="mt-6 font-bold text-xl font-medium text-ink">{s.title}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
              {s.description.slice(0, 110)}…
            </p>
            <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-ink">
              Learn more
              <ArrowUpRight className="h-4 w-4 text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </Link>
        </div>
      ))}
    </div>
  );
}

export function PortfolioPreviewGrid() {
  return (
    <div className="mt-14 grid gap-6 md:grid-cols-2">
      {PORTFOLIO.filter((p) => p.featured).slice(0, 2).map((p) => (
        <div key={p.slug}>
          <Link
            href={href(`/work/${p.slug}`)}
            className="group block overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-colors hover:border-white/25"
          >
            <div className="relative aspect-[16/9] overflow-hidden bg-black/30">
              <Image
                src={p.image}
                alt={p.title}
                fill
                className="object-cover opacity-90 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
              />
            </div>
            <div className="flex items-start justify-between gap-4 p-6">
              <div>
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-cyan-300">{p.category}</p>
                <h3 className="mt-2 text-xl font-bold text-white">{p.title}</h3>
                <p className="mt-1.5 text-sm text-paper/50">{p.summary.slice(0, 92)}…</p>
              </div>
              <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-paper/40 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-cyan-300" />
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
