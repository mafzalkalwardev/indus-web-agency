import Link from "next/link";
import { PageHero } from "@/components/agency/PageHero";
import { LeadMagnetForm } from "@/components/resources/LeadMagnetForm";
import { href } from "@/lib/paths";
import { Check } from "lucide-react";

export const metadata = {
  title: "Free Auto Dialer Comparison Guide",
  description:
    "Download the INDUS dialer comparison guide — DOM starter vs multi-slot vs AI solo vs enterprise dispatch explained.",
  alternates: { canonical: "/resources/dialer-guide" },
};

const included = [
  "Side-by-side comparison of all 4 dialer tiers",
  "Team size and use-case decision matrix",
  "Pricing overview from $29–$199/mo",
  "Link to our interactive plan calculator",
  "Printable comparison chart (save as PDF)",
];

export default function DialerGuidePage() {
  return (
    <div className="bg-paper">
      <PageHero
        eyebrow="Free resource"
        title="Auto dialer comparison guide"
        description="Not sure which plan fits? Get our breakdown of DOM starter, multi-slot, AI solo, and enterprise AI dispatch — emailed instantly."
      />
      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-2">
        <div>
          <h2 className="text-xl font-bold text-[#0c2340]">What&apos;s inside</h2>
          <ul className="mt-6 space-y-3">
            {included.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-muted">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan-600" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-muted">
            Prefer an instant answer? Try the{" "}
            <Link href={href("/tools/dialer-calculator")} className="font-medium text-cyan-600 hover:underline">
              dialer calculator
            </Link>{" "}
            or{" "}
            <Link href={href("/resources/dialer-comparison")} className="font-medium text-cyan-600 hover:underline">
              printable comparison chart
            </Link>
            .
          </p>
        </div>
        <LeadMagnetForm />
      </section>
    </div>
  );
}
