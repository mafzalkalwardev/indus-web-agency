import { LIVE_PRODUCTS } from "@/lib/products";
import { FadeIn } from "@/components/agency/FadeIn";

export function ClientLogos() {
  const products = LIVE_PRODUCTS.filter((product) => !product.comingSoon);

  return (
    <section className="border-b border-line bg-slate-50 py-10 sm:py-12">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <FadeIn>
          <p className="text-center font-mono text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted">
            Products we&apos;ve built
          </p>
        </FadeIn>
        <div className="relative mt-8 overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-slate-50 to-transparent sm:w-24" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-slate-50 to-transparent sm:w-24" />
          <div className="animate-marquee flex w-max items-center gap-4 pr-4 sm:gap-5">
            {[0, 1].map((copy) =>
              products.map((product) => (
                <a
                  key={`${product.id}-${copy}`}
                  href={product.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-hidden={copy === 1 ? true : undefined}
                  tabIndex={copy === 1 ? -1 : undefined}
                  className="flex shrink-0 items-center rounded-lg border border-line/80 bg-white px-5 py-3 text-sm font-semibold text-[#0c2340] shadow-sm transition hover:border-cyan-200 hover:text-cyan-700 hover:shadow-md"
                >
                  {product.name}
                </a>
              )),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
