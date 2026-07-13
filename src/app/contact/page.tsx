import { ContactForm } from "@/components/agency/ContactForm";
import { FadeIn } from "@/components/agency/FadeIn";
import { PageHero } from "@/components/agency/PageHero";
import { SITE_CONTACT } from "@/lib/site-config";
import { href } from "@/lib/paths";
import Link from "next/link";
import { Mail, MessageCircle, MapPin, Clock } from "lucide-react";

export const metadata = {
  title: "Contact Us — INDUS Web Agency",
  description:
    "Get in touch with INDUS Web Agency for custom projects, product support, partnerships, or general inquiries.",
};

export default function ContactPage() {
  return (
    <div className="bg-paper">
      <PageHero
        eyebrow="Contact"
        title="Let's talk — studio or products"
        description="Custom project quote, product support, or a quick question. We route every message to the right person within 24 hours."
      />

      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_340px]">
          <FadeIn delay={0.1}>
            <ContactForm />
          </FadeIn>

          <FadeIn delay={0.2} className="space-y-5">
            <div className="rounded-2xl border border-line bg-paper-raised p-7">
              <h2 className="text-lg font-bold text-ink">Direct contact</h2>
              <ul className="mt-5 space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-cyan-600" />
                  <div>
                    <p className="font-medium text-ink">Email</p>
                    <a href={`mailto:${SITE_CONTACT.email}`} className="text-muted hover:text-cyan-600">
                      {SITE_CONTACT.email}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-cyan-600" />
                  <div>
                    <p className="font-medium text-ink">WhatsApp</p>
                    <a href={SITE_CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-cyan-600">
                      {SITE_CONTACT.whatsapp}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-cyan-600" />
                  <div>
                    <p className="font-medium text-ink">Location</p>
                    <p className="text-muted">Islamabad, Pakistan · Remote worldwide</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-cyan-600" />
                  <div>
                    <p className="font-medium text-ink">Response time</p>
                    <p className="text-muted">Within 24 hours on business days</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-cyan-200 bg-cyan-50/60 p-7">
              <h2 className="text-lg font-bold text-ink">Starting a project?</h2>
              <p className="mt-2 text-sm text-muted">
                For custom software or websites, our project brief form captures scope, budget, and timeline.
              </p>
              <Link href={href("/start-project")} className="mt-4 inline-block text-sm font-semibold text-cyan-600 hover:underline">
                Go to Start a Project →
              </Link>
            </div>

            <div className="rounded-2xl border border-line bg-paper-raised p-7">
              <h2 className="text-lg font-bold text-ink">Buying a product?</h2>
              <p className="mt-2 text-sm text-muted">
                Browse plans, compare dialers, or use our free calculator.
              </p>
              <Link href={href("/products")} className="mt-4 inline-block text-sm font-semibold text-cyan-600 hover:underline">
                View products →
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
