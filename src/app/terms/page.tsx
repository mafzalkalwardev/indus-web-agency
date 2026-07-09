import Link from "next/link";
import { href } from "@/lib/paths";
import { SITE_CONTACT } from "@/lib/site-config";

export const metadata = {
  title: "Terms of Service — INDUS Web Agency",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 prose prose-slate">
      <h1>Terms of Service</h1>
      <p className="text-sm text-slate-500">Last updated: July 2026</p>

      <h2>1. Service</h2>
      <p>
        INDUS Web Agency provides subscription access to downloadable automation software. By creating an account or subscribing, you agree to these terms.
      </p>

      <h2>2. Subscriptions & approval</h2>
      <p>
        Subscriptions require admin approval before download access is granted. Access lasts for the billing period selected (weekly, monthly, or yearly). Renewals follow the same approval process.
      </p>

      <h2>3. License & devices</h2>
      <p>
        Each approved subscription includes a signed license file. Desktop applications verify licenses online. You may activate up to two devices per subscription unless otherwise stated on the product page.
      </p>

      <h2>4. Acceptable use</h2>
      <p>
        You agree to use our software in compliance with applicable laws, including anti-spam, telemarketing, and data protection regulations in your jurisdiction. You are responsible for how you use the tools.
      </p>

      <h2>5. Payments & refunds</h2>
      <p>
        Prices are shown at checkout. Digital goods are delivered after approval. Refund requests may be considered within 7 days of purchase if the software could not be installed; contact {SITE_CONTACT.email}.
      </p>

      <h2>6. Limitation of liability</h2>
      <p>
        Software is provided &quot;as is.&quot; INDUS Web Agency is not liable for indirect damages, lost profits, or compliance issues arising from your use of the products.
      </p>

      <h2>7. Contact</h2>
      <p>
        Questions: <a href={`mailto:${SITE_CONTACT.email}`}>{SITE_CONTACT.email}</a>
      </p>

      <p className="not-prose mt-8 text-sm">
        <Link href={href("/privacy")} className="text-cyan-600 hover:underline">Privacy Policy</Link>
        {" · "}
        <Link href={href("/faq")} className="text-cyan-600 hover:underline">FAQ</Link>
      </p>
    </div>
  );
}
