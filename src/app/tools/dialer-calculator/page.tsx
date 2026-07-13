import { PageHero } from "@/components/agency/PageHero";
import { DialerCalculator } from "@/components/tools/DialerCalculator";
import { LeadMagnetForm } from "@/components/resources/LeadMagnetForm";

export const metadata = {
  title: "Dialer Plan Calculator — Find Your Auto Dialer",
  description:
    "Answer two questions and get a recommended INDUS auto dialer plan — DOM starter, multi-slot, AI solo, or enterprise AI dispatch.",
  alternates: { canonical: "/tools/dialer-calculator" },
};

export default function DialerCalculatorPage() {
  return (
    <div className="bg-paper">
      <PageHero
        eyebrow="Free tool"
        title="Which dialer plan fits your team?"
        description="Tell us your team size and workflow — we'll recommend the right auto dialer tier with pricing and product links."
      />
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <DialerCalculator />
        <div className="mt-16 max-w-lg">
          <LeadMagnetForm />
        </div>
      </section>
    </div>
  );
}
