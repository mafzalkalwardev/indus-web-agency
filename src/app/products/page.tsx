"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { PRODUCTS, CATEGORY_LABELS, type ProductCategory } from "@/lib/products";
import { ProductCard } from "@/components/products/ProductCard";

function ProductsContent() {
  const searchParams = useSearchParams();
  const cat = searchParams.get("cat") as ProductCategory | null;
  const filtered = cat ? PRODUCTS.filter((p) => p.category === cat) : PRODUCTS;
  const categories = Object.entries(CATEGORY_LABELS) as [ProductCategory, string][];
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold">All Products</h1>
      <p className="mt-2 text-slate-600">
        Subscribe to each product separately. Download and use during your subscription period.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        <a
          href={`${basePath}/products`}
          className={`rounded-full px-4 py-1.5 text-sm font-medium ${
            !cat ? "bg-[#0c2340] text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          All
        </a>
        {categories.map(([key, label]) => (
          <a
            key={key}
            href={`${basePath}/products?cat=${key}`}
            className={`rounded-full px-4 py-1.5 text-sm font-medium ${
              cat === key ? "bg-[#0c2340] text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            {label}
          </a>
        ))}
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center">Loading products...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
