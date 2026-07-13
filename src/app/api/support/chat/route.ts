import { NextRequest, NextResponse } from "next/server";
import { buildAgencyKnowledgeBase } from "@/lib/agency-knowledge";
import { rateLimit, clientIp } from "@/lib/rate-limit";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

function fallbackReply(message: string): string {
  const q = message.toLowerCase();

  if (q.includes("dialer") || q.includes("call") || q.includes("dispatch")) {
    return "We offer four auto dialer tiers from $29/mo (DOM Starter) to $199/mo (Enterprise AI Multi-Slot). For small teams, Multi-Slot Agent ($79/mo) supports 5 parallel lines. Compare plans at /compare or browse /products?cat=dialer.";
  }
  if (q.includes("email") || q.includes("mailforge")) {
    return "Email tools include Email Verifier Pro, Bulk Email Verifier, Auto Email Sender, and the Mailforge bundle. See /products?cat=email or /pricing.";
  }
  if (q.includes("subscribe") || q.includes("download") || q.includes("license")) {
    return "Subscribe flow: create account → pick product & plan → admin approves (usually within 24h) → download from your dashboard with a license file. Details at /faq.";
  }
  if (q.includes("price") || q.includes("pricing") || q.includes("cost")) {
    return "Product pricing starts from $29/mo depending on the tool. See the full overview at /pricing or each product page for plan details.";
  }
  if (q.includes("custom") || q.includes("website") || q.includes("build") || q.includes("project")) {
    return "For custom software or websites, submit a brief at /start-project or use /contact. We typically respond within 24 hours with next steps and a rough scope.";
  }
  if (q.includes("team") || q.includes("about") || q.includes("who are you") || q.includes("afzal") || q.includes("founder")) {
    return "INDUS Web Agency is founded by Muhammad Afzal Kalwar — Full-Stack Developer & Python Automation Engineer based in Islamabad, Pakistan. Learn more at /about or his portfolio at mafzalkalwardev.github.io.";
  }
  if (q.includes("contact") || q.includes("whatsapp") || q.includes("email us") || q.includes("support")) {
    return "Reach us at induswebagency@gmail.com, WhatsApp +92 307 967 0503, or the contact form at /contact.";
  }

  return "I'm the INDUS Assistant. I can help with custom projects, our software products, subscriptions, and support. Try asking about dialers, email tools, pricing, or how to start a project — or visit /contact to talk to the team.";
}

async function callOpenAI(messages: ChatMessage[]): Promise<{ content: string | null; error?: string }> {
  const apiKey = process.env.OPENAI_API_KEY?.trim();
  if (!apiKey) {
    return { content: null, error: "OPENAI_API_KEY not configured" };
  }

  const model = process.env.OPENAI_MODEL?.trim() || "gpt-4o-mini";
  const system = buildAgencyKnowledgeBase();

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      temperature: 0.35,
      max_tokens: 800,
      messages: [{ role: "system", content: system }, ...messages],
    }),
  });

  if (!res.ok) {
    const detail = await res.text();
    console.error("[chat] OpenAI error:", res.status, detail.slice(0, 500));
    return { content: null, error: `OpenAI ${res.status}` };
  }

  const data = await res.json();
  const content = data.choices?.[0]?.message?.content?.trim();
  return { content: content || null, error: content ? undefined : "empty response" };
}

export async function POST(req: NextRequest) {
  const ip = clientIp(req);
  const limited = await rateLimit(`support-chat:${ip}`, 30, 3600);
  if (!limited.ok) {
    return NextResponse.json(
      { error: `Rate limit reached. Try again in ${limited.retryAfterSec}s.` },
      { status: 429 }
    );
  }

  const body = await req.json();
  const rawMessages: unknown[] = Array.isArray(body.messages) ? body.messages : [];
  const messages: ChatMessage[] = rawMessages
    .filter(
      (m): m is ChatMessage =>
        !!m &&
        typeof m === "object" &&
        "role" in m &&
        "content" in m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string"
    )
    .map((m) => ({ role: m.role, content: m.content.trim() }))
    .filter((m) => m.content.length > 0);
  const lastUser = [...messages].reverse().find((m) => m.role === "user");

  if (!lastUser?.content?.trim()) {
    return NextResponse.json({ error: "Message required" }, { status: 400 });
  }

  if (lastUser.content.length > 2000) {
    return NextResponse.json({ error: "Message too long" }, { status: 400 });
  }

  const trimmed = messages.slice(-10).map((m) => ({
    role: m.role,
    content: m.content.slice(0, 2000),
  }));

  let reply: string;
  let mode: "llm" | "fallback" = "fallback";

  try {
    const { content: llmReply, error: llmError } = await callOpenAI(trimmed);
    if (llmReply) {
      reply = llmReply;
      mode = "llm";
    } else {
      if (llmError) console.warn("[chat] LLM unavailable:", llmError);
      reply = fallbackReply(lastUser.content);
    }
  } catch (err) {
    console.error("[chat] failed:", err);
    reply = fallbackReply(lastUser.content);
  }

  return NextResponse.json({ reply, mode });
}
