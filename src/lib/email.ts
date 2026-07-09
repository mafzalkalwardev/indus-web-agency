import "server-only";
import nodemailer from "nodemailer";
import { SITE_CONTACT } from "./site-config";

function getTransporter() {
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();
  if (!user || !pass) return null;

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT || 587),
    secure: false,
    auth: { user, pass },
  });
}

export async function sendAdminPurchaseAlert(details: {
  customerName: string;
  customerEmail: string;
  productName: string;
  productSlug: string;
  planName: string;
  price: number;
  period: string;
  subscriptionId: string;
}) {
  const to = SITE_CONTACT.adminNotificationEmail;
  const adminUrl = `${SITE_CONTACT.siteUrl}/admin`;
  const subject = `🛒 New subscription pending — ${details.productName} (${details.planName})`;
  const html = `
    <div style="font-family:sans-serif;max-width:560px">
      <h2 style="color:#0c2340">New Purchase Request</h2>
      <p>A customer subscribed and is waiting for your approval.</p>
      <table style="width:100%;border-collapse:collapse;margin:16px 0">
        <tr><td style="padding:8px;border-bottom:1px solid #e2e8f0"><strong>Customer</strong></td><td style="padding:8px;border-bottom:1px solid #e2e8f0">${details.customerName}</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #e2e8f0"><strong>Email</strong></td><td style="padding:8px;border-bottom:1px solid #e2e8f0">${details.customerEmail}</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #e2e8f0"><strong>Product</strong></td><td style="padding:8px;border-bottom:1px solid #e2e8f0">${details.productName}</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #e2e8f0"><strong>Plan</strong></td><td style="padding:8px;border-bottom:1px solid #e2e8f0">${details.planName}</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #e2e8f0"><strong>Price</strong></td><td style="padding:8px;border-bottom:1px solid #e2e8f0">$${details.price} / ${details.period}</td></tr>
        <tr><td style="padding:8px"><strong>Subscription ID</strong></td><td style="padding:8px">${details.subscriptionId}</td></tr>
      </table>
      <p><a href="${adminUrl}" style="display:inline-block;background:#0891b2;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600">Open Admin Portal → Approve</a></p>
      <p style="color:#64748b;font-size:12px">INDUS Web Agency · ${SITE_CONTACT.email}</p>
    </div>
  `;

  const text = [
    "New subscription pending approval",
    `Customer: ${details.customerName} (${details.customerEmail})`,
    `Product: ${details.productName}`,
    `Plan: ${details.planName} — $${details.price}/${details.period}`,
    `Approve at: ${adminUrl}`,
  ].join("\n");

  const transport = getTransporter();
  if (!transport) {
    console.warn("[email] SMTP not configured — purchase alert logged only:", text);
    return { sent: false, reason: "smtp_not_configured" as const };
  }

  try {
    await transport.sendMail({
      from: `"INDUS Web Agency" <${process.env.SMTP_USER}>`,
      to,
      subject,
      text,
      html,
    });
    return { sent: true as const };
  } catch (err) {
    console.error("[email] Failed to send purchase alert:", err);
    return { sent: false, reason: "send_failed" as const };
  }
}

async function sendMail(opts: { to: string; subject: string; text: string; html: string }) {
  const transport = getTransporter();
  if (!transport) {
    console.warn("[email] SMTP not configured — logged only:", opts.subject, opts.text);
    return { sent: false as const, reason: "smtp_not_configured" as const };
  }
  try {
    await transport.sendMail({
      from: `"INDUS Web Agency" <${process.env.SMTP_USER}>`,
      to: opts.to,
      subject: opts.subject,
      text: opts.text,
      html: opts.html,
    });
    return { sent: true as const };
  } catch (err) {
    console.error("[email] Send failed:", err);
    return { sent: false as const, reason: "send_failed" as const };
  }
}

export async function sendCustomerSubscriptionApproved(details: {
  customerEmail: string;
  customerName: string;
  productName: string;
  planName: string;
  price: number;
  period: string;
  expiresAt: string;
}) {
  const dashboardUrl = `${SITE_CONTACT.siteUrl}/dashboard`;
  const subject = `✅ Subscription approved — ${details.productName}`;
  const html = `
    <div style="font-family:sans-serif;max-width:560px">
      <h2 style="color:#0c2340">Your subscription is approved!</h2>
      <p>Hi ${details.customerName},</p>
      <p>Your <strong>${details.productName}</strong> (${details.planName}) subscription is now active.</p>
      <table style="width:100%;border-collapse:collapse;margin:16px 0">
        <tr><td style="padding:8px;border-bottom:1px solid #e2e8f0"><strong>Plan</strong></td><td style="padding:8px;border-bottom:1px solid #e2e8f0">${details.planName}</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #e2e8f0"><strong>Price</strong></td><td style="padding:8px;border-bottom:1px solid #e2e8f0">$${details.price} / ${details.period}</td></tr>
        <tr><td style="padding:8px"><strong>Valid until</strong></td><td style="padding:8px">${new Date(details.expiresAt).toLocaleDateString()}</td></tr>
      </table>
      <p><a href="${dashboardUrl}" style="display:inline-block;background:#0891b2;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600">Download from Dashboard →</a></p>
      <p style="color:#64748b;font-size:12px">INDUS Web Agency · ${SITE_CONTACT.email}</p>
    </div>
  `;
  const text = `Hi ${details.customerName}, your ${details.productName} subscription is approved. Download at ${dashboardUrl}`;
  return sendMail({ to: details.customerEmail, subject, text, html });
}

export async function sendCustomerSubscriptionRejected(details: {
  customerEmail: string;
  customerName: string;
  productName: string;
  planName: string;
}) {
  const supportUrl = `mailto:${SITE_CONTACT.email}`;
  const subject = `Subscription update — ${details.productName}`;
  const html = `
    <div style="font-family:sans-serif;max-width:560px">
      <h2 style="color:#0c2340">Subscription not approved</h2>
      <p>Hi ${details.customerName},</p>
      <p>Your request for <strong>${details.productName}</strong> (${details.planName}) was not approved at this time.</p>
      <p>If you believe this is an error, please contact us at <a href="${supportUrl}">${SITE_CONTACT.email}</a>.</p>
      <p style="color:#64748b;font-size:12px">INDUS Web Agency</p>
    </div>
  `;
  const text = `Hi ${details.customerName}, your ${details.productName} subscription was not approved. Contact ${SITE_CONTACT.email}`;
  return sendMail({ to: details.customerEmail, subject, text, html });
}

export async function sendCustomerExpiryReminder(details: {
  customerEmail: string;
  customerName: string;
  productName: string;
  planName: string;
  expiresAt: string;
  daysLeft: number;
}) {
  const dashboardUrl = `${SITE_CONTACT.siteUrl}/dashboard`;
  const subject =
    details.daysLeft <= 1
      ? `⏰ ${details.productName} expires tomorrow`
      : `⏰ ${details.productName} expires in ${details.daysLeft} days`;
  const html = `
    <div style="font-family:sans-serif;max-width:560px">
      <h2 style="color:#0c2340">Subscription expiring soon</h2>
      <p>Hi ${details.customerName},</p>
      <p>Your <strong>${details.productName}</strong> (${details.planName}) subscription expires on <strong>${new Date(details.expiresAt).toLocaleDateString()}</strong> (${details.daysLeft} day(s) left).</p>
      <p><a href="${dashboardUrl}" style="display:inline-block;background:#0891b2;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600">Request Renewal →</a></p>
      <p style="color:#64748b;font-size:12px">INDUS Web Agency · ${SITE_CONTACT.email}</p>
    </div>
  `;
  const text = `Hi ${details.customerName}, ${details.productName} expires in ${details.daysLeft} days. Renew at ${dashboardUrl}`;
  return sendMail({ to: details.customerEmail, subject, text, html });
}

export async function sendAdminRenewalAlert(details: {
  customerName: string;
  customerEmail: string;
  productName: string;
  planName: string;
  price: number;
  period: string;
  subscriptionId: string;
}) {
  const adminUrl = `${SITE_CONTACT.siteUrl}/admin`;
  const subject = `🔄 Renewal request — ${details.productName} (${details.planName})`;
  const html = `
    <div style="font-family:sans-serif;max-width:560px">
      <h2 style="color:#0c2340">Renewal Request</h2>
      <p>A customer requested renewal and is waiting for approval.</p>
      <table style="width:100%;border-collapse:collapse;margin:16px 0">
        <tr><td style="padding:8px;border-bottom:1px solid #e2e8f0"><strong>Customer</strong></td><td style="padding:8px;border-bottom:1px solid #e2e8f0">${details.customerName} (${details.customerEmail})</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #e2e8f0"><strong>Product</strong></td><td style="padding:8px;border-bottom:1px solid #e2e8f0">${details.productName}</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #e2e8f0"><strong>Plan</strong></td><td style="padding:8px;border-bottom:1px solid #e2e8f0">${details.planName} — $${details.price}/${details.period}</td></tr>
      </table>
      <p><a href="${adminUrl}" style="display:inline-block;background:#0891b2;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600">Review in Admin →</a></p>
    </div>
  `;
  const text = `Renewal pending: ${details.customerEmail} — ${details.productName}. Review at ${adminUrl}`;
  return sendMail({ to: SITE_CONTACT.adminNotificationEmail, subject, text, html });
}
