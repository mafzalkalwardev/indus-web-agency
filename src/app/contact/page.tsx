import { ContactForm } from "@/components/agency/ContactForm";
import { FadeIn } from "@/components/agency/FadeIn";
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
    <div className="bg-paper py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <FadeIn>
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-accent" />
            <p className="eyebrow text-accent">Contact</p>
          </div>
          <h1 className="mt-6 font-bold text-4xl font-medium tracking-tight sm:text-5xl">Let&apos;s talk</h1>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">
            Custom projects, product support, or a quick question — send a message and we&apos;ll route it to the right person.
          </p>
        </FadeIn>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_340px]">
          <FadeIn delay={0.1}>
            <ContactForm />
          </FadeIn>

          <FadeIn delay={0.2} className="space-y-5">
            <div className="rounded-2xl border border-line bg-paper-raised p-7">
              <h2 className="font-bold text-lg font-medium text-ink">Direct contact</h2>
              <ul className="mt-5 space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <div>
                    <p className="font-medium text-ink">Email</p>
                    <a href={`mailto:${SITE_CONTACT.email}`} className="text-muted hover:text-accent">
                      {SITE_CONTACT.email}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <div>
                    <p className="font-medium text-ink">WhatsApp</p>
                    <a href={SITE_CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent">
                      {SITE_CONTACT.whatsapp}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <div>
                    <p className="font-medium text-ink">Location</p>
                    <p className="text-muted">Pakistan · Remote-first</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <div>
                    <p className="font-medium text-ink">Response time</p>
                    <p className="text-muted">Within 24 hours on business days</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-accent/25 bg-accent-tint/40 p-7">
              <h2 className="font-bold text-lg font-medium text-ink">Starting a project?</h2>
              <p className="mt-2 text-sm text-muted">
                For custom software or websites, our project brief form captures scope, budget, and timeline — so we can quote faster.
              </p>
              <Link
                href={href("/start-project")}
                className="mt-4 inline-block text-sm font-medium text-accent-strong hover:underline"
              >
                Go to Start a Project →
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
