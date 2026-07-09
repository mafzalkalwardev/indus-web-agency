"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { MessageCircle, X, Bot, RotateCcw } from "lucide-react";
import { CHAT_NODES, LINK_REDIRECTS } from "@/lib/support-chat";
import { href } from "@/lib/paths";

export function GuideChat({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();
  const [nodeId, setNodeId] = useState("welcome");
  const [history, setHistory] = useState<string[]>([]);

  const node = CHAT_NODES[nodeId];

  const selectOption = useCallback(
    (nextId: string) => {
      if (LINK_REDIRECTS[nextId]) {
        router.push(href(LINK_REDIRECTS[nextId]));
        onClose();
        return;
      }
      setHistory((h) => [...h, nodeId]);
      setNodeId(nextId);
    },
    [nodeId, router, onClose]
  );

  const goBack = () => {
    const prev = history[history.length - 1];
    if (prev) {
      setHistory((h) => h.slice(0, -1));
      setNodeId(prev);
    } else {
      setNodeId("welcome");
    }
  };

  const reset = () => {
    setNodeId("welcome");
    setHistory([]);
  };

  if (!open) return null;

  return (
    <div className="fixed bottom-24 right-4 z-[60] flex w-[min(100vw-2rem,380px)] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl sm:right-6">
      <div className="flex items-center justify-between bg-[#0c2340] px-4 py-3 text-white">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-cyan-400" />
          <span className="font-semibold">INDUS Guide</span>
        </div>
        <div className="flex gap-1">
          <button type="button" onClick={reset} className="rounded-lg p-1.5 hover:bg-white/10" aria-label="Reset chat">
            <RotateCcw className="h-4 w-4" />
          </button>
          <button type="button" onClick={onClose} className="rounded-lg p-1.5 hover:bg-white/10" aria-label="Close chat">
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="max-h-64 overflow-y-auto p-4">
        <div className="rounded-xl bg-slate-50 p-3 text-sm leading-relaxed text-slate-700 whitespace-pre-line">
          {node.message.replace(/\*\*(.*?)\*\*/g, "$1")}
        </div>
      </div>

      <div className="border-t border-slate-100 p-3">
        <p className="mb-2 text-[10px] font-medium uppercase tracking-wider text-slate-400">Select an option</p>
        <div className="flex max-h-48 flex-col gap-2 overflow-y-auto">
          {node.options.map((opt) => (
            <button
              key={opt.nextId + opt.label}
              type="button"
              onClick={() => selectOption(opt.nextId)}
              className="rounded-lg border border-cyan-200 bg-cyan-50 px-3 py-2.5 text-left text-sm font-medium text-[#0c2340] transition hover:border-cyan-400 hover:bg-cyan-100"
            >
              {opt.label}
            </button>
          ))}
        </div>
        {history.length > 0 && (
          <button type="button" onClick={goBack} className="mt-2 w-full text-center text-xs text-slate-500 hover:text-cyan-600">
            ← Previous
          </button>
        )}
      </div>
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
          className={`flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition hover:scale-110 hover:shadow-xl ${
            chatOpen ? "bg-cyan-600 text-white" : "bg-cyan-500 text-white"
          }`}
          aria-label="Open INDUS Guide chat support"
          title="Chat Support — INDUS Guide"
        >
          {chatOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        </button>
      </div>
    </>
  );
}
