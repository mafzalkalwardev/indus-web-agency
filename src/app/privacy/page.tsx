import Link from "next/link";
import { href } from "@/lib/paths";
import { SITE_CONTACT } from "@/lib/site-config";

export const metadata = {
  title: "Privacy Policy — INDUS Web Agency",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 prose prose-slate">
      <h1>Privacy Policy</h1>
      <p className="text-sm text-slate-500">Last updated: July 2026</p>

      <h2>Information we collect</h2>
      <p>
        When you register, we store your name, email, and hashed password. When you subscribe, we store product, plan, billing period, and subscription status. License verification may record a device fingerprint hash to enforce the two-device limit.
      </p>

      <h2>How we use data</h2>
      <ul>
        <li>Authenticate your account and manage subscriptions</li>
        <li>Send transactional emails (approval, rejection, expiry reminders)</li>
        <li>Notify administrators of new purchases and renewals</li>
        <li>Verify licenses for desktop applications</li>
      </ul>

      <h2>Email communications</h2>
      <p>
        We send service-related emails to your registered address. Purchase alerts go to our admin team at {SITE_CONTACT.adminNotificationEmail}. We do not sell your personal data.
      </p>

      <h2>Data storage</h2>
      <p>
        Account data is stored on secure infrastructure (Upstash Redis when configured, otherwise ephemeral file storage on the hosting platform). You may request deletion of your account by emailing {SITE_CONTACT.email}.
      </p>

      <h2>Cookies</h2>
      <p>
        We use HTTP-only session cookies to keep you signed in. No third-party advertising cookies are used.
      </p>

      <h2>Contact</h2>
      <p>
        Privacy questions: <a href={`mailto:${SITE_CONTACT.email}`}>{SITE_CONTACT.email}</a>
      </p>

      <p className="not-prose mt-8 text-sm">
        <Link href={href("/terms")} className="text-cyan-600 hover:underline">Terms of Service</Link>
        {" · "}
        <Link href={href("/faq")} className="text-cyan-600 hover:underline">FAQ</Link>
      </p>
    </div>
  );
}
