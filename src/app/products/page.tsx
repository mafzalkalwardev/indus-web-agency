import type { Metadata } from "next";
import { ProductsClient } from "./ProductsClient";

export const metadata: Metadata = {
  title: "Business Automation Software Products",
  description:
    "Browse INDUS Web Agency automation products: AI auto dialers, email marketing automation, bulk email verifier tools, web scraping software, and lead generation systems.",
  alternates: {
    canonical: "/products",
  },
  openGraph: {
    title: "Business Automation Software Products | INDUS Web Agency",
    description:
      "AI auto dialers, email marketing automation, bulk email verification, web scraping tools, and lead generation software.",
    url: "/products",
  },
};

export default function ProductsPage() {
  return <ProductsClient />;
}
