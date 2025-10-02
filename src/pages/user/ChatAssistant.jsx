import React, { useEffect, useMemo, useRef, useState } from "react";
import { FiSend } from "react-icons/fi";
import { AiFillRobot } from "react-icons/ai";
import { motion } from "framer-motion";

function formatTime(dateLike) {
  const d = dateLike instanceof Date ? dateLike : new Date(dateLike);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export const ChatAssistant = () => {
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hi! I’m your assistant BuddyAi. Ask me anything about your expenses, budgets, or savings.",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const listRef = useRef(null);
  const textRef = useRef(null);

  const assistant = useMemo(
    () => ({
      name: "BuddyAi",
      status: "Online",
      avatar: "🤖",
    }),
    []
  );

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages, isTyping]);

  useEffect(() => {
    const ta = textRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = Math.min(ta.scrollHeight, 140) + "px";
    ta.focus();
  }, [input]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text) return;

    const userMsg = {
      id: `u-${Date.now()}`,
      role: "user",
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("http://localhost:8081/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      const data = await res.json();

      const aiMsg = {
        id: `a-${Date.now()}`,
        role: "assistant",
        content:
          data?.reply && data.reply.trim() !== ""
            ? data.reply
            : "⚠️ Sorry, I couldn’t generate a reply.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (error) {
      console.error("AI Chat Error:", error);
      const errorMsg = {
        id: `a-${Date.now()}`,
        role: "assistant",
        content: "❌ Error: Could not connect to AI server",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    }

    setIsTyping(false);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <motion.div
      initial={{ y: 6, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      whileHover={{ y: -6, scale: 1.01 }}
      className="mx-auto max-w-4xl"
    >
      <div className="rounded-2xl border border-gray-200 bg-white/80 backdrop-blur shadow-sm overflow-hidden dark:bg-neutral-900 dark:border-neutral-800">
        {/* Chat Header */}
        <div className="px-4 sm:px-6 py-3 border-b border-gray-100/80 dark:border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <div className="h-10 w-10 rounded-xl bg-indigo-600 text-white grid place-items-center ring-1 ring-indigo-400/50">
              <AiFillRobot className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <div className="text-sm font-semibold text-gray-900 dark:text-neutral-100 truncate">
                {assistant.name}
              </div>
              <div className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400">
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                {assistant.status}
              </div>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs text-gray-500 dark:text-neutral-400">
            Secure • Private • Fast
          </div>
        </div>

        {/* Messages */}
        <div
          ref={listRef}
          className="h-[calc(100dvh-18rem)] sm:h-[calc(100dvh-20rem)] overflow-y-auto px-3 sm:px-5 py-4 bg-gradient-to-b from-slate-50/60 to-white dark:from-neutral-900 dark:to-neutral-900"
        >
          <div className="space-y-3">
            {messages.map((m) => {
              const mine = m.role === "user";
              return (
                <div
                  key={m.id}
                  className={`flex ${mine ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[82%] sm:max-w-[70%] rounded-2xl px-3 py-2 shadow-sm ${
                      mine
                        ? "bg-emerald-600 text-white rounded-tr-sm"
                        : "bg-white text-gray-800 ring-1 ring-gray-200 rounded-tl-sm dark:bg-neutral-900 dark:text-neutral-100 dark:ring-neutral-800"
                    }`}
                  >
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">
                      {m.content}
                    </div>
                    <div
                      className={`mt-1.5 text-[10px] ${
                        mine ? "text-emerald-100/80" : "text-gray-400"
                      }`}
                    >
                      {formatTime(m.timestamp)}
                    </div>
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex justify-start">
                <div className="max-w-[70%] rounded-2xl px-3 py-2 bg-white ring-1 ring-gray-200 shadow-sm rounded-tl-sm dark:bg-neutral-900 dark:ring-neutral-800">
                  <div className="flex items-center gap-1.5">
                    <span
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    />
                    <span
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <span
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                  <div className="mt-1.5 text-[10px] text-gray-400">typing…</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Composer */}
        <div className="px-3 sm:px-5 py-3 border-t border-gray-100/80 dark:border-neutral-800 bg-white/90 dark:bg-neutral-900/90 backdrop-blur">
          <div className="flex items-end gap-2">
            <div className="flex-1">
              <textarea
                ref={textRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                rows={1}
                placeholder="Message the assistant…"
                className="w-full resize-none rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200/60 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100"
              />
              <div className="mt-1 text-[11px] text-gray-400">
                Press Enter to send • Shift + Enter for new line
              </div>
            </div>
            <button
              onClick={sendMessage}
              disabled={!input.trim()}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm ring-1 ring-indigo-400/50 transition hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Send"
              aria-label="Send message"
            >
              <FiSend className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
