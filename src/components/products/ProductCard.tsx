import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Mail, Phone, Globe, Package } from "lucide-react";
import type { Product, ProductCategory } from "@/lib/products";
import { CATEGORY_LABELS } from "@/lib/products";
import { href } from "@/lib/paths";

const categoryIcons: Record<ProductCategory, React.ReactNode> = {
  email: <Mail className="h-5 w-5" />,
  dialer: <Phone className="h-5 w-5" />,
  scraper: <Globe className="h-5 w-5" />,
  bundle: <Package className="h-5 w-5" />,
};

const categoryColors: Record<ProductCategory, string> = {
  email: "border-line bg-paper text-ink",
  dialer: "border-line bg-paper text-ink",
  scraper: "border-line bg-paper text-ink",
  bundle: "border-accent/25 bg-accent-tint/50 text-accent-strong",
};

export function ProductCard({ product }: { product: Product }) {
  const minPrice = Math.min(...product.plans.map((p) => p.price));
  const thumb = product.screenshots[0];

  return (
    <Link
      href={href(`/products/${product.slug}`)}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-paper-raised transition-all duration-300 hover:-translate-y-1 hover:border-ink"
    >
      {thumb && (
        <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-ink">
          <Image
            src={thumb}
            alt={`${product.name} preview`}
            fill
            className="object-cover object-top opacity-90 transition duration-500 group-hover:scale-[1.04] group-hover:opacity-100"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
          {product.demoVideo && (
            <span className="absolute bottom-2 right-2 rounded-full bg-black/70 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
              Video demo
            </span>
          )}
        </div>
      )}

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[0.7rem] font-medium ${categoryColors[product.category]}`}
          >
            {categoryIcons[product.category]}
            {CATEGORY_LABELS[product.category]}
          </span>
          <span className="whitespace-nowrap font-mono text-xs text-muted">
            from ${minPrice}/mo
          </span>
        </div>

        <h3 className="mt-4 font-display text-lg font-medium text-ink">
          {product.name}
        </h3>
        <p className="mt-2 flex-1 text-sm text-muted">{product.tagline}</p>

        <ul className="mt-4 space-y-1.5 border-t border-line pt-4">
          {product.features.slice(0, 3).map((f) => (
            <li key={f} className="flex items-center gap-2 text-xs text-muted">
              <span className="h-1 w-1 rounded-full bg-accent" /> {f}
            </li>
          ))}
        </ul>

        <div className="mt-5 flex items-center gap-1.5 text-sm font-medium text-ink transition-all group-hover:gap-2.5">
          View details <ArrowRight className="h-4 w-4 text-accent" />
        </div>
      </div>
    </Link>
  );
}
