import Link from "next/link";
import { ArrowRight, Hammer, Boxes, Check } from "lucide-react";
import { FadeIn } from "@/components/agency/FadeIn";
import { Button } from "@/components/ui/button";
import { href } from "@/lib/paths";

const studioPoints = [
  "Custom software, websites & automation",
  "Discovery → design → build → launch",
  "Quote within 24 hours",
];

const productPoints = [
  "13 dialers, email tools & scrapers",
  "Subscribe → approve → download",
  "Plans from $19/mo",
];

export function ChooseYourPath() {
  return (
    <section className="border-b border-line bg-paper-sunk/40 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <FadeIn className="text-center">
          <p className="eyebrow text-cyan-600">How can we help?</p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#0c2340] sm:text-4xl">
            Two ways to work with INDUS
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted">
            We&apos;re a software studio that also ships our own products — pick the path that fits your goal.
          </p>
        </FadeIn>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <FadeIn delay={0.1}>
            <div className="group flex h-full flex-col rounded-2xl border border-line bg-white p-8 shadow-sm transition hover:border-[#0c2340]/20 hover:shadow-md">
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-cyan-700">
                <Hammer className="h-3 w-3" /> Custom builds
              </span>
              <h3 className="mt-5 text-2xl font-bold text-[#0c2340]">I need something built</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Websites, apps, dialers, or automation designed and shipped for your team.
              </p>
              <ul className="mt-6 flex-1 space-y-2.5">
                {studioPoints.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm text-[#0c2340]">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan-600" />
                    {p}
                  </li>
                ))}
              </ul>
              <Button asChild className="mt-8 w-full sm:w-auto">
                <Link href={href("/start-project")}>
                  Start a project <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="group flex h-full flex-col rounded-2xl border border-[#0c2340]/15 bg-[#0c2340] p-8 text-white shadow-sm transition hover:shadow-lg">
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-cyan-500/40 bg-cyan-500/10 px-3 py-1 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-cyan-300">
                <Boxes className="h-3 w-3" /> Software shelf
              </span>
              <h3 className="mt-5 text-2xl font-bold">I want ready-made tools</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                License battle-tested dialers, email tools, and scrapers with secure downloads.
              </p>
              <ul className="mt-6 flex-1 space-y-2.5">
                {productPoints.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm text-slate-200">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" />
                    {p}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={href("/products")}
                  className="inline-flex items-center gap-2 rounded-lg bg-cyan-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-500"
                >
                  Browse products <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href={href("/tools/dialer-calculator")}
                  className="inline-flex items-center gap-2 rounded-lg border border-white/25 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-white/10"
                >
                  Find my dialer plan
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
