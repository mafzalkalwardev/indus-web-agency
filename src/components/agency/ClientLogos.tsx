import Image from "next/image";
import { CLIENT_LOGOS } from "@/lib/client-logos";
import { FadeIn } from "@/components/agency/FadeIn";

export function ClientLogos() {
  const items = [...CLIENT_LOGOS, ...CLIENT_LOGOS];

  return (
    <section className="border-b border-line bg-slate-50 py-10">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <FadeIn>
          <p className="text-center font-mono text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted">
            Trusted by operators in dispatch, sales &amp; email
          </p>
        </FadeIn>
        <div className="relative mt-6 overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-slate-50 to-transparent sm:w-20" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-slate-50 to-transparent sm:w-20" />
          <div className="animate-marquee flex w-max items-center gap-8 pr-8">
            {items.map((client, i) => (
              <div
                key={`${client.id}-${i}`}
                className="flex shrink-0 items-center gap-3 rounded-xl border border-line bg-white px-4 py-3 shadow-sm"
              >
                {client.image ? (
                  <Image
                    src={client.image}
                    alt=""
                    width={40}
                    height={40}
                    className="h-10 w-10 object-contain"
                  />
                ) : (
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0c2340] text-xs font-bold text-cyan-300">
                    {client.initials}
                  </span>
                )}
                <div className="min-w-0">
                  <p className="whitespace-nowrap text-sm font-semibold text-[#0c2340]">{client.name}</p>
                  <p className="whitespace-nowrap text-xs text-muted">{client.industry}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
