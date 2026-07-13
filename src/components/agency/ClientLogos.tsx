import Image from "next/image";
import { CLIENT_LOGOS } from "@/lib/client-logos";
import { FadeIn } from "@/components/agency/FadeIn";
import { basePath } from "@/lib/paths";

export function ClientLogos() {
  const bp = basePath();
  const items = [...CLIENT_LOGOS, ...CLIENT_LOGOS];

  return (
    <section className="border-b border-line bg-slate-50 py-10 sm:py-12">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <FadeIn>
          <p className="text-center font-mono text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted">
            Trusted by operators in dispatch, sales &amp; email
          </p>
        </FadeIn>
        <div className="relative mt-8 overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-slate-50 to-transparent sm:w-24" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-slate-50 to-transparent sm:w-24" />
          <div className="animate-marquee flex w-max items-center gap-10 pr-10 sm:gap-14">
            {items.map((client, i) => (
              <div
                key={`${client.id}-${i}`}
                className="group flex shrink-0 flex-col items-center gap-2"
                title={`${client.name} — ${client.industry}`}
              >
                <div className="flex h-12 items-center rounded-lg border border-line/80 bg-white px-5 py-2 shadow-sm transition hover:border-cyan-200 hover:shadow-md sm:h-14 sm:px-6">
                  <Image
                    src={`${bp}${client.image}`}
                    alt={client.name}
                    width={130}
                    height={40}
                    className="h-8 w-auto object-contain opacity-80 transition group-hover:opacity-100 sm:h-9"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
