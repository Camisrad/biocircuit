import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Loader2, Send } from "lucide-react";
import { base44 } from "@/api/base44Client";

// Module-level cache so explanations persist across re-renders
const explanationCache = {};

export default function PathwayExplainer({ pathwayId, pathwayData }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [explanation, setExplanation] = useState(explanationCache[pathwayId] || null);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const generateExplanation = async () => {
    // If already have explanation, just toggle
    if (explanation) {
      setIsExpanded(v => !v);
      return;
    }

    // Check cache
    if (explanationCache[pathwayId]) {
      setExplanation(explanationCache[pathwayId]);
      setIsExpanded(true);
      return;
    }

    setIsLoading(true);
    setIsExpanded(true);

    try {
      const aiResponse = await base44.integrations.Core.InvokeLLM({
        prompt: `You are a molecular biology expert explaining the ${pathwayId} pathway.

Pathway Data:
${JSON.stringify(pathwayData, null, 2)}

Provide a concise plain-English summary (2-3 paragraphs) of what this pathway does and why it matters in cancer biology. Be clear, educational, and scientifically accurate.`,
        response_json_schema: {
          type: "object",
          properties: {
            summary: { type: "string" }
          }
        }
      });

      explanationCache[pathwayId] = aiResponse;
      setExplanation(aiResponse);
    } catch (error) {
      console.error("Explanation error:", error);
      const fallback = { summary: "Unable to generate explanation at this time. Please try again." };
      setExplanation(fallback);
    } finally {
      setIsLoading(false);
    }
  };

  const sendChatMessage = async () => {
    if (!chatInput.trim() || isChatLoading) return;
    const userText = chatInput.trim();
    setChatInput("");
    const newMessages = [...messages, { role: "user", content: userText }];
    setMessages(newMessages);
    setIsChatLoading(true);

    try {
      const history = newMessages.map(m => `${m.role === "user" ? "User" : "AI"}: ${m.content}`).join("\n");
      const response = await base44.integrations.Core.InvokeLLM({
        prompt: `You are a molecular biology expert. The user is exploring the ${pathwayId} pathway.

Pathway context:
${explanation?.summary || ""}

Conversation so far:
${history}

Answer the user's latest question concisely and scientifically. Keep response under 150 words.`
      });
      setMessages(prev => [...prev, { role: "ai", content: response }]);
      setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    } catch {
      setMessages(prev => [...prev, { role: "ai", content: "Sorry, I couldn't process that. Please try again." }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendChatMessage();
    }
  };

  return (
    <div className="w-full">
      {/* Trigger Button */}
      <button
        onClick={generateExplanation}
        disabled={isLoading}
        className="w-full py-2.5 text-sm font-semibold rounded-lg flex items-center justify-center gap-1.5 disabled:opacity-50 transition-all"
        style={{
          background: isExpanded ? "rgba(37,99,235,0.08)" : "#ffffff",
          border: "1px solid #e2e8f0",
          color: isExpanded ? "#2563EB" : "#64748b",
        }}
      >
        {isLoading ? (
          <><Loader2 className="w-4 h-4 animate-spin" /> Generating...</>
        ) : (
          <><Sparkles className="w-4 h-4" />{explanation ? (isExpanded ? "Hide AI Explain" : "Show AI Explain") : "AI Explain"}</>
        )}
      </button>

      {/* Panel */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="mt-3 rounded-lg overflow-hidden"
            style={{ border: "1px solid #e2e8f0", background: "#ffffff" }}
          >
            {/* Summary */}
            {explanation && (
              <div className="p-4" style={{ borderBottom: "1px solid #e2e8f0" }}>
                <div className="flex items-center gap-1.5 mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-widest">Summary</span>
                </div>
                <p className="text-slate-600 leading-relaxed text-xs">{explanation.summary}</p>
              </div>
            )}

            {/* Chat messages */}
            {messages.length > 0 && (
              <div className="p-3 space-y-2 max-h-48 overflow-y-auto" style={{ background: "#f8fafc" }}>
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      style={{
                        background: msg.role === "user" ? "#eff6ff" : "#f8fafc",
                        color: msg.role === "user" ? "#1d4ed8" : "#0f172a",
                        border: msg.role === "user" ? "1px solid #bfdbfe" : "1px solid #e2e8f0",
                        fontSize: 13,
                        borderRadius: 8,
                        maxWidth: "85%",
                        padding: "8px 12px",
                        lineHeight: "1.5"
                      }}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
                {isChatLoading && (
                  <div className="flex justify-start">
                    <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 8, padding: "8px 12px" }}>
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-slate-400" />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}

            {/* Chat input */}
            <div className="p-3 flex gap-2" style={{ borderTop: messages.length > 0 ? "1px solid #e2e8f0" : "none" }}>
              <input
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask a follow-up question..."
                disabled={isLoading || isChatLoading}
                className="flex-1 text-xs px-3 py-2 rounded-lg outline-none"
                style={{ border: "1px solid #e2e8f0", background: "#f8fafc", color: "#0f172a" }}
              />
              <button
                onClick={sendChatMessage}
                disabled={!chatInput.trim() || isChatLoading}
                className="px-2.5 py-2 rounded-lg disabled:opacity-40 flex items-center justify-center"
                style={{ background: "#2563EB" }}
              >
                <Send className="w-3.5 h-3.5 text-white" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}