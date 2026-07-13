import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/agency/FadeIn";
import { Button } from "@/components/ui/button";
import { href } from "@/lib/paths";
import { ServicesPageContent } from "@/components/agency/ServicesPageContent";

export const metadata = {
  title: "Services — Custom Software & Web Development | INDUS Web Agency",
  description:
    "Custom software development, websites, business automation, mobile apps, and product design from INDUS Web Agency.",
};

export default function ServicesPage() {
  return (
    <div className="bg-paper">
      <section className="grain-dark relative overflow-hidden border-b border-line bg-ink py-24 text-paper sm:py-28">
        <div className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-accent/15 blur-[120px]" />
        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
          <FadeIn>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-accent" />
              <p className="eyebrow text-paper/60">Agency services</p>
            </div>
            <h1 className="mt-6 max-w-3xl font-display text-5xl font-medium leading-[1.02] tracking-tight sm:text-6xl">
              Custom builds. Considered craft. Production-ready delivery.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-paper/60">
              From marketing websites to full automation platforms — we design, build, and ship software
              your team can rely on.
            </p>
            <Button asChild className="mt-9" size="lg">
              <Link href={href("/start-project")}>
                Request a quote <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </FadeIn>
        </div>
      </section>
      <ServicesPageContent />
    </div>
  );
}
