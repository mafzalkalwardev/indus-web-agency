import { FadeIn } from "@/components/agency/FadeIn";
import { AboutPageContent } from "@/components/agency/AboutPageContent";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { href } from "@/lib/paths";

export const metadata = {
  title: "About Us & Team — INDUS Web Agency",
  description:
    "Meet the INDUS Web Agency team — a software studio building custom products, websites, and automation tools for operators worldwide.",
};

export default function AboutPage() {
  return (
    <div className="bg-paper">
      <section className="grain-dark relative overflow-hidden border-b border-line bg-ink py-24 text-paper sm:py-28">
        <div className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-accent/15 blur-[120px]" />
        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
          <FadeIn>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-accent" />
              <p className="eyebrow text-paper/60">About INDUS</p>
            </div>
            <h1 className="mt-6 max-w-3xl font-display text-5xl font-medium leading-[1.02] tracking-tight sm:text-6xl">
              Built by Muhammad Afzal Kalwar
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-paper/60">
              Full-Stack Developer &amp; Python Automation Engineer — founder of INDUS. CRM, dispatch dialers,
              email platforms, scrapers, and the licensed products on this site.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href={href("/start-project")}>
                  Work with us <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href={href("/contact")}>Contact the team</Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

      <AboutPageContent />
    </div>
  );
}
