import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { href } from "@/lib/paths";
import { AgencySculpture } from "@/components/agency/AgencySculpture";

type Word = { t: string; em?: boolean };
const words: Word[] = [
  { t: "We" },
  { t: "design" },
  { t: "&" },
  { t: "build" },
  { t: "software", em: true },
  { t: "worth" },
  { t: "keeping." },
];

export function AgencyHero() {
  return (
    <section className="relative min-h-[92vh] overflow-hidden bg-[#0c2340] text-white">
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#0c2340] via-[#1a3a5c] to-[#0891b2]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_75%_15%,rgba(34,211,238,0.18),transparent)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-slate-50"
        aria-hidden
      />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-8 px-5 pb-28 pt-16 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-6 lg:pb-36 lg:pt-24">
        <div>
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-cyan-400" />
            <span className="eyebrow text-cyan-200">Software studio &amp; product shelf</span>
          </div>

          <h1 className="mt-7 text-4xl font-bold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
            {words.map((w, i) => (
              <span key={i} className="mr-[0.22em] inline-block overflow-hidden py-[0.05em] align-bottom">
                <span className={`inline-block ${w.em ? "text-cyan-300" : "text-white"}`}>{w.t}</span>
              </span>
            ))}
          </h1>

          <p className="mt-7 max-w-md text-lg leading-relaxed text-slate-200">
            INDUS is a studio for custom software, considered websites, and automation —
            from first sketch to shipped product. Plus a shelf of tools you can license today.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button asChild size="lg">
              <Link href={href("/start-project")}>
                Start a project <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href={href("/work")}>View our work</Link>
            </Button>
          </div>

          <div className="mt-14 grid max-w-lg grid-cols-3 gap-6 border-t border-white/10 pt-8">
            {[
              ["50+", "Projects shipped"],
              ["13", "Licensed products"],
              ["24h", "Response time"],
            ].map(([v, l]) => (
              <div key={l}>
                <p className="text-2xl font-bold text-cyan-300">{v}</p>
                <p className="mt-1.5 text-xs leading-tight text-slate-300">{l}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-md lg:max-w-none">
          <div className="relative h-full min-h-[320px] w-full sm:min-h-[400px] lg:min-h-[520px]">
            <AgencySculpture />
          </div>
        </div>
      </div>
    </section>
  );
}
