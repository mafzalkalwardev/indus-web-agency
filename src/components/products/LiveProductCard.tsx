import { ArrowUpRight } from "lucide-react";
import type { LiveProduct } from "@/lib/products";

export function LiveProductCard({
  product,
  heading = "h2",
}: {
  product: LiveProduct;
  heading?: "h2" | "h3";
}) {
  const Heading = heading;
  const headingId = `${product.id}-title`;

  return (
    <article
      id={product.id}
      aria-labelledby={headingId}
      className="flex h-full scroll-mt-36 flex-col rounded-2xl border border-line bg-paper-raised p-6 transition-all duration-300 hover:-translate-y-1 hover:border-ink"
    >
      <div className="flex items-start justify-between gap-3">
        <Heading id={headingId} className="font-bold text-lg text-ink">
          {product.name}
        </Heading>
        {product.comingSoon && (
          <span className="shrink-0 rounded-full border border-line bg-paper px-2.5 py-1 text-[0.7rem] font-medium text-muted">
            Coming soon
          </span>
        )}
      </div>
      <p className="mt-3 text-sm font-medium leading-relaxed text-ink">{product.summary}</p>
      <p className="mt-4 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-muted">What it does</p>
      <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted">{product.does}</p>
      <a
        href={product.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-ink transition-all hover:gap-2.5"
      >
        Visit {product.name}
        <ArrowUpRight className="h-4 w-4 text-accent" aria-hidden />
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    </article>
  );
}
