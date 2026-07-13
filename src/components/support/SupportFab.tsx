"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { MessageCircle, X, Bot, RotateCcw, Send, Loader2 } from "lucide-react";
import { CHAT_NODES, LINK_REDIRECTS, QUICK_PROMPTS } from "@/lib/support-chat";
import { href } from "@/lib/paths";
import Link from "next/link";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const WELCOME: ChatMessage = {
  role: "assistant",
  content:
    "Hi — I'm the INDUS Assistant. Ask me about custom projects, our team, software products, pricing, or support. I can also guide you with quick options below.",
};

export function GuideChat({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();
  const [mode, setMode] = useState<"ai" | "guide">("ai");
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [guideNodeId, setGuideNodeId] = useState("welcome");
  const [guideHistory, setGuideHistory] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const guideNode = CHAT_NODES[guideNodeId];

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading, guideNodeId, mode]);

  const sendAiMessage = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const userMsg: ChatMessage = { role: "user", content: trimmed };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(href("/api/support/chat"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessages((m) => [
          ...m,
          { role: "assistant", content: data.error || "Something went wrong. Try again or use /contact." },
        ]);
        return;
      }
      setMessages((m) => [...m, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Network error. Email us at induswebagency@gmail.com or use /contact." },
      ]);
    } finally {
      setLoading(false);
    }
  }, [messages, loading]);

  const selectGuideOption = (nextId: string) => {
    const redirect = LINK_REDIRECTS[nextId];
    if (redirect) {
      if (redirect.startsWith("http")) {
        window.open(redirect, "_blank", "noopener,noreferrer");
      } else {
        router.push(href(redirect));
      }
      onClose();
      return;
    }
    setGuideHistory((h) => [...h, guideNodeId]);
    setGuideNodeId(nextId);
  };

  const reset = () => {
    setMessages([WELCOME]);
    setInput("");
    setGuideNodeId("welcome");
    setGuideHistory([]);
    setMode("ai");
  };

  if (!open) return null;

  return (
    <div className="fixed bottom-24 right-4 z-[60] flex w-[min(100vw-2rem,400px)] flex-col overflow-hidden rounded-2xl border border-line bg-paper-raised shadow-2xl shadow-ink/10 sm:right-6">
      <div className="flex items-center justify-between border-b border-line bg-ink px-4 py-3 text-paper">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-accent" />
          <span className="font-medium">INDUS Assistant</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="mr-2 flex rounded-full border border-white/15 p-0.5 text-[10px]">
            <button
              type="button"
              onClick={() => setMode("ai")}
              className={`rounded-full px-2 py-0.5 ${mode === "ai" ? "bg-accent text-white" : "text-paper/60"}`}
            >
              AI
            </button>
            <button
              type="button"
              onClick={() => setMode("guide")}
              className={`rounded-full px-2 py-0.5 ${mode === "guide" ? "bg-accent text-white" : "text-paper/60"}`}
            >
              Guide
            </button>
          </div>
          <button type="button" onClick={reset} className="rounded-lg p-1.5 hover:bg-white/10" aria-label="Reset chat">
            <RotateCcw className="h-4 w-4" />
          </button>
          <button type="button" onClick={onClose} className="rounded-lg p-1.5 hover:bg-white/10" aria-label="Close chat">
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {mode === "ai" ? (
        <>
          <div ref={scrollRef} className="max-h-72 space-y-3 overflow-y-auto p-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                    m.role === "user"
                      ? "bg-ink text-paper"
                      : "border border-line bg-paper text-ink"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 rounded-2xl border border-line bg-paper px-3.5 py-2.5 text-sm text-muted">
                  <Loader2 className="h-4 w-4 animate-spin" /> Thinking…
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-line px-3 py-2">
            <div className="flex flex-wrap gap-1.5">
              {QUICK_PROMPTS.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => sendAiMessage(p)}
                  disabled={loading}
                  className="rounded-full border border-line px-2.5 py-1 text-[11px] text-muted transition hover:border-ink hover:text-ink disabled:opacity-50"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <form
            className="flex gap-2 border-t border-line p-3"
            onSubmit={(e) => {
              e.preventDefault();
              sendAiMessage(input);
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about projects, products, team…"
              className="min-w-0 flex-1 rounded-full border border-line bg-paper px-4 py-2 text-sm text-ink placeholder:text-muted/70 focus:border-ink focus:outline-none focus:ring-2 focus:ring-accent/20"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-white transition hover:bg-accent-strong disabled:opacity-50"
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>

          <p className="border-t border-line px-3 py-2 text-center text-[10px] text-muted">
            Need a human? <Link href={href("/contact")} onClick={onClose} className="text-accent hover:underline">Contact us</Link>
          </p>
        </>
      ) : (
        <>
          <div className="max-h-64 overflow-y-auto p-4">
            <div className="rounded-xl border border-line bg-paper p-3 text-sm leading-relaxed text-ink whitespace-pre-line">
              {guideNode.message.replace(/\*\*(.*?)\*\*/g, "$1")}
            </div>
          </div>
          <div className="border-t border-line p-3">
            <p className="mb-2 text-[10px] font-medium uppercase tracking-wider text-muted">Select an option</p>
            <div className="flex max-h-44 flex-col gap-2 overflow-y-auto">
              {guideNode.options.map((opt) => (
                <button
                  key={opt.nextId + opt.label}
                  type="button"
                  onClick={() => selectGuideOption(opt.nextId)}
                  className="rounded-lg border border-line bg-paper px-3 py-2.5 text-left text-sm font-medium text-ink transition hover:border-ink hover:bg-paper-sunk/50"
                >
                  {opt.label}
                </button>
              ))}
            </div>
            {guideHistory.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  const prev = guideHistory[guideHistory.length - 1];
                  setGuideHistory((h) => h.slice(0, -1));
                  setGuideNodeId(prev);
                }}
                className="mt-2 w-full text-center text-xs text-muted hover:text-accent"
              >
                ← Previous
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export function SupportFab() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <>
      <GuideChat open={chatOpen} onClose={() => setChatOpen(false)} />

      <div className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6">
        <button
          type="button"
          onClick={() => setChatOpen((v) => !v)}
          className={`flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition hover:scale-105 hover:shadow-xl ${
            chatOpen ? "bg-ink text-paper" : "bg-accent text-white"
          }`}
          aria-label="Open INDUS Assistant"
          title="INDUS Assistant — AI help & guided support"
        >
          {chatOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        </button>
      </div>
    </>
  );
}
