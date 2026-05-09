import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { base44 } from "@/api/base44Client";
import ReactMarkdown from "react-markdown";

export default function FloatingAIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      // Get pathway data for context
      const pathways = await base44.entities.PathwaySubmission.list();
      
      const pathwayContext = pathways.slice(0, 10).map(p => 
        `${p.pathway_name}: ${p.description} (Cancer: ${p.cancer_type || 'N/A'})`
      ).join('\n');

      const response = await base44.integrations.Core.InvokeLLM({
        prompt: `You are BioCircuit AI, an expert in molecular biology, cancer research, and pathway analysis. You help researchers understand biological pathways, genes, and their relationships.

User question: "${userMessage}"

Available pathway data in BioCircuit database:
${pathwayContext}

Key pathways available for exploration in BioCircuit:
- p53 Tumor Suppressor Pathway
- PI3K/AKT/mTOR Signaling
- MAPK/ERK Cascade
- Wnt Signaling Pathway
- Apoptosis Pathway
- Cell Cycle Regulation
- DNA Repair Mechanisms
- Angiogenesis Pathway
- Immune Checkpoint Regulation
- Metabolic Reprogramming in Cancer

CRITICAL CITATION RULES:
- NEVER cite Wikipedia or Wikipedia-derived sources
- ONLY cite peer-reviewed scientific literature (PubMed, Nature, Science, Cell, etc.)
- When providing educational video links, use actual working URLs (e.g., YouTube links)
- ALWAYS format ALL links using markdown syntax: [Link Text](https://actual-url.com)
- Example: [PubMed Study](https://pubmed.ncbi.nlm.nih.gov/12345678/)
- Example: [Video Explanation](https://www.youtube.com/watch?v=abc123)

PATHWAY GUIDANCE:
- If user asks about a pathway that EXISTS in the BioCircuit list above, tell them it's available and they can explore it in BioCircuit
- If the pathway does NOT exist in BioCircuit, still provide accurate information but clarify it's not currently in our database
- Be specific about which BioCircuit pathway matches their question

Instructions:
1. Provide clear, scientifically accurate answers backed by peer-reviewed literature
2. Direct users to existing BioCircuit pathways when relevant
3. Include working links to educational videos when helpful
4. Never reference Wikipedia
5. Keep responses focused (2-3 paragraphs max)

Respond naturally and helpfully with proper citations.`,
        add_context_from_internet: true
      });

      setMessages(prev => [...prev, { role: "assistant", content: response }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "I encountered an error processing your question. Please try rephrasing it or ask something else." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.08, boxShadow: "0 0 40px rgba(37,99,235,0.6)" }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-xl flex items-center justify-center"
        style={{
          background: isOpen ? "#fee2e2" : "#2563EB",
          border: isOpen ? "1px solid #fca5a5" : "1px solid #1d4ed8",
          boxShadow: "0 4px 20px rgba(37,99,235,0.25)"
        }}
      >
        {isOpen ? (
          <X className="w-5 h-5 text-white" />
        ) : (
          <Sparkles className="w-5 h-5 text-white" />
        )}
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 right-6 w-96 max-w-[calc(100vw-3rem)] rounded-2xl overflow-hidden z-50"
            style={{
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              boxShadow: "0 8px 40px rgba(0,0,0,0.12)",
            }}
          >
            {/* Header */}
            <div className="p-4" style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "rgba(37,99,235,0.1)", border: "1px solid rgba(37,99,235,0.2)" }}>
                  <Sparkles className="w-4 h-4 text-blue-300" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm">BioCircuit AI</h3>
                <span className="ml-auto text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(34,197,94,0.1)", color: "#16a34a", border: "1px solid rgba(34,197,94,0.2)" }}>online</span>
              </div>
              <p className="text-slate-500 text-xs mt-1">Ask me about pathways, genes, or cancer biology</p>
            </div>

            {/* Messages */}
            <div className="h-80 overflow-y-auto p-4 space-y-4" style={{ background: "#ffffff" }}>
              {messages.length === 0 && (
                <div className="text-center text-slate-500 text-sm mt-8">
                  <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ background: "rgba(37,99,235,0.08)", border: "1px solid rgba(37,99,235,0.15)" }}>
                    <Sparkles className="w-7 h-7 text-blue-400" />
                  </div>
                  <p className="font-semibold text-slate-800 mb-2">BioCircuit AI</p>
                  <p className="text-xs text-slate-600">Ask me about molecular pathways, genes, cancer mechanisms, or any biology question.</p>
                </div>
              )}

              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className="max-w-[80%] rounded-xl p-3"
                    style={msg.role === 'user' ? {
                      background: "linear-gradient(135deg, #2563EB, #1d4ed8)",
                      color: "white"
                    } : {
                      background: "#f1f5f9",
                      border: "1px solid #e2e8f0",
                      color: "#475569"
                    }}
                  >
                    {msg.role === 'user' ? (
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                    ) : (
                      <div className="text-sm leading-relaxed">
                        <ReactMarkdown
                          components={{
                            a: ({ node, ...props }) => (
                              <a {...props} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline font-medium cursor-pointer" style={{ pointerEvents: 'auto' }} />
                            ),
                            p: ({ node, ...props }) => <p {...props} className="mb-2 last:mb-0" />,
                            strong: ({ node, ...props }) => <strong {...props} className="font-semibold text-white" />,
                            ul: ({ node, ...props }) => <ul {...props} className="list-disc list-inside mb-2" />,
                            ol: ({ node, ...props }) => <ol {...props} className="list-decimal list-inside mb-2" />,
                            li: ({ node, ...props }) => <li {...props} className="mb-1" />,
                          }}
                        >
                          {msg.content}
                        </ReactMarkdown>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="rounded-xl p-3" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-3" style={{ borderTop: "1px solid #e2e8f0", background: "#f8fafc" }}>
              <div className="flex gap-2">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask a question..."
                  rows={2}
                  disabled={isLoading}
                  className="flex-1 resize-none text-sm rounded-xl px-3 py-2 text-slate-800 placeholder:text-slate-400 outline-none"
                  style={{ background: "#ffffff", border: "1px solid #e2e8f0" }}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="px-3 rounded-xl flex items-center justify-center disabled:opacity-40"
                  style={{ background: "linear-gradient(135deg, #2563EB, #1d4ed8)", minWidth: 40 }}
                >
                  <Send className="w-4 h-4 text-white" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}