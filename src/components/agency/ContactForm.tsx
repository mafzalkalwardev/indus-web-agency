"use client";

import { useState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CONTACT_TOPICS } from "@/lib/about";
import { href } from "@/lib/paths";

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    topic: "general",
    subject: "",
    message: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(href("/api/contact"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Submission failed");
        return;
      }
      setSuccess(true);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center py-14 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent-tint text-accent-strong">
            <CheckCircle2 className="h-7 w-7" />
          </span>
          <h2 className="mt-5 font-bold text-2xl font-medium text-ink">Message sent</h2>
          <p className="mt-2 max-w-sm text-sm text-muted">
            We&apos;ll review your message and respond within 24 hours on business days.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Send us a message</CardTitle>
        <CardDescription>
          Questions, support, partnerships — we read every message and route it to the right person.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium">Full name *</label>
              <Input id="contact-name" name="name" autoComplete="name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div>
              <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium">Email *</label>
              <Input id="contact-email" name="email" type="email" autoComplete="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
            <div>
              <label htmlFor="contact-phone" className="mb-1.5 block text-sm font-medium">Phone / WhatsApp</label>
              <Input id="contact-phone" name="phone" type="tel" autoComplete="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </div>
            <div>
              <label htmlFor="contact-topic" className="mb-1.5 block text-sm font-medium">Topic *</label>
              <select
                id="contact-topic"
                name="topic"
                required
                value={form.topic}
                onChange={(e) => setForm({ ...form, topic: e.target.value })}
                className="flex h-11 w-full rounded-lg border border-line bg-paper-raised px-3.5 text-sm text-ink focus:border-ink focus:outline-none focus:ring-2 focus:ring-accent/20"
              >
                {CONTACT_TOPICS.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="contact-subject" className="mb-1.5 block text-sm font-medium">Subject</label>
            <Input
              id="contact-subject"
              name="subject"
              placeholder="Optional — e.g. Mailforge setup help"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium">Message *</label>
            <Textarea
              id="contact-message"
              name="message"
              required
              rows={5}
              placeholder="How can we help?"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
          </div>

          {error && <p className="text-sm text-red-600" role="alert">{error}</p>}

          <Button type="submit" disabled={loading} size="lg" className="w-full sm:w-auto">
            {loading ? (
              <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</>
            ) : (
              "Send message"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
