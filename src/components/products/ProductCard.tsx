import Link from "next/link";
import { ArrowRight, Mail, Phone, Globe, Package } from "lucide-react";
import type { Product, ProductCategory } from "@/lib/products";
import { CATEGORY_LABELS } from "@/lib/products";

const categoryIcons: Record<ProductCategory, React.ReactNode> = {
  email: <Mail className="h-5 w-5" />,
  dialer: <Phone className="h-5 w-5" />,
  scraper: <Globe className="h-5 w-5" />,
  bundle: <Package className="h-5 w-5" />,
};

const categoryColors: Record<ProductCategory, string> = {
  email: "bg-blue-50 text-blue-700 border-blue-200",
  dialer: "bg-emerald-50 text-emerald-700 border-emerald-200",
  scraper: "bg-purple-50 text-purple-700 border-purple-200",
  bundle: "bg-amber-50 text-amber-700 border-amber-200",
};

export function ProductCard({ product }: { product: Product }) {
  const minPrice = Math.min(...product.plans.map((p) => p.price));

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-cyan-300 hover:shadow-lg"
    >
      <div className="flex items-start justify-between">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${categoryColors[product.category]}`}
        >
          {categoryIcons[product.category]}
          {CATEGORY_LABELS[product.category]}
        </span>
        <span className="text-sm font-semibold text-[#0c2340]">
          from ${minPrice}/mo
        </span>
      </div>

      <h3 className="mt-4 text-lg font-bold text-[#0c2340] group-hover:text-cyan-700">
        {product.name}
      </h3>
      <p className="mt-2 flex-1 text-sm text-slate-600">{product.tagline}</p>

      <ul className="mt-4 space-y-1">
        {product.features.slice(0, 3).map((f) => (
          <li key={f} className="text-xs text-slate-500">• {f}</li>
        ))}
      </ul>

      <div className="mt-4 flex items-center gap-1 text-sm font-medium text-cyan-600 group-hover:gap-2 transition-all">
        View details <ArrowRight className="h-4 w-4" />
      </div>
    </Link>
  );
}
