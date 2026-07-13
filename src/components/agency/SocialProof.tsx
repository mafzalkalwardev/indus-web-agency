import { FadeIn } from "@/components/agency/FadeIn";
import { TRUST_STATS, TESTIMONIALS, CLIENT_SEGMENTS } from "@/lib/social-proof";

export function SocialProof() {
  return (
    <section className="border-y border-line bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <FadeIn className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-md">
            <p className="eyebrow text-cyan-600">Trusted by operators</p>
            <h2 className="mt-3 text-2xl font-bold text-[#0c2340] sm:text-3xl">
              Studio craft. Product reliability.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Teams use INDUS for custom dispatch systems and licensed automation tools — the same engineering behind both sides of our business.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {CLIENT_SEGMENTS.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-line bg-slate-50 px-2.5 py-1 text-xs text-slate-600"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="grid flex-1 grid-cols-2 gap-4 sm:grid-cols-4 lg:max-w-xl">
            {TRUST_STATS.map((s) => (
              <div key={s.label} className="rounded-xl border border-line bg-slate-50/80 p-4 text-center">
                <p className="text-2xl font-bold text-cyan-600">{s.value}</p>
                <p className="mt-1 text-xs text-muted">{s.label}</p>
              </div>
            ))}
          </div>
        </FadeIn>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <FadeIn key={t.name} delay={0.1 * i}>
              <blockquote className="flex h-full flex-col rounded-2xl border border-line bg-paper p-6">
                <p className="flex-1 text-sm leading-relaxed text-[#0c2340]">&ldquo;{t.quote}&rdquo;</p>
                <footer className="mt-5 border-t border-line pt-4">
                  <p className="text-sm font-semibold text-[#0c2340]">{t.name}</p>
                  <p className="text-xs text-muted">{t.role}</p>
                  <span
                    className={`mt-2 inline-block rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide ${
                      t.type === "studio"
                        ? "bg-[#0c2340]/10 text-[#0c2340]"
                        : "bg-cyan-50 text-cyan-700"
                    }`}
                  >
                    {t.type === "studio" ? "Custom build" : "Product subscriber"}
                  </span>
                </footer>
              </blockquote>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
