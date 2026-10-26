"use client";

import Link from "next/link";
import { href } from "@/lib/paths";
import { trackEvent } from "@/lib/analytics";

export function TelecomCta({
  variant = "both",
  source,
}: {
  variant?: "products" | "custom" | "both";
  source: string;
}) {
  return (
    <div className="mt-10 flex flex-wrap gap-3">
      {(variant === "products" || variant === "both") && (
        <Link
          href={href("/products?cat=dialer")}
          onClick={() => trackEvent("telecom_cta", { source, target: "dialers" })}
          className="inline-flex items-center rounded-lg bg-cyan-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-500"
        >
          Browse dialers
        </Link>
      )}
      {(variant === "custom" || variant === "both") && (
        <Link
          href={href("/start-project")}
          onClick={() => trackEvent("telecom_cta", { source, target: "custom" })}
          className="inline-flex items-center rounded-lg border border-[#0c2340]/20 bg-white px-5 py-2.5 text-sm font-semibold text-[#0c2340] transition hover:bg-slate-50"
        >
          Start a custom CRM project
        </Link>
      )}
      <Link
        href={href("/tools/dialer-calculator")}
        onClick={() => trackEvent("telecom_cta", { source, target: "calculator" })}
        className="inline-flex items-center rounded-lg px-5 py-2.5 text-sm font-medium text-cyan-700 transition hover:underline"
      >
        Dialer calculator →
      </Link>
    </div>
  );
}
