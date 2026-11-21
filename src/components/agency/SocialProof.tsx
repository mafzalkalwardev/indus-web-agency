import { FadeIn } from "@/components/agency/FadeIn";
import { ClientLogos } from "@/components/agency/ClientLogos";
import { TRUST_STATS, CLIENT_SEGMENTS } from "@/lib/social-proof";

export function SocialProof() {
  return (
    <>
      <ClientLogos />
      <section className="border-y border-line bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <FadeIn className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-md">
              <p className="eyebrow text-cyan-600">Studio &amp; product shelf</p>
              <h2 className="mt-3 text-2xl font-bold text-[#0c2340] sm:text-3xl">
                Software we publish, and software we build.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                INDUS ships its own product sites and takes on custom software from Islamabad, working with teams worldwide.
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

            <div className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-3 lg:max-w-xl">
              {TRUST_STATS.map((s) => (
                <div key={s.label} className="rounded-xl border border-line bg-slate-50/80 p-4 text-center">
                  <p className="text-xl font-bold leading-tight text-cyan-600">{s.value}</p>
                  <p className="mt-1 text-xs text-muted">{s.label}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
