import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sparkles, Loader2, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { base44 } from "@/api/base44Client";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function AISearch() {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsSearching(true);
    setResults(null);

    try {
      // Get all pathway submissions to provide context
      const pathways = await base44.entities.PathwaySubmission.list();
      
      // Use AI to interpret the query and match with available pathways
      const aiResponse = await base44.integrations.Core.InvokeLLM({
        prompt: `You are a molecular biology expert helping users find relevant pathway information.

User query: "${query}"

Available pathways in the database:
${pathways.map(p => `- ${p.pathway_name}: ${p.description} (Cancer type: ${p.cancer_type || 'General'}, Organism: ${p.organism})`).join('\n')}

Also, we have these pre-curated pathways available for exploration:
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

Based on the user's question, provide:
1. A direct answer to their question (2-3 sentences)
2. The most relevant pathway(s) to explore (from both databases and pre-curated)
3. Why these pathways are relevant
4. Suggested next steps for learning more

Be conversational and helpful. If the question is about general concepts, explain them clearly.`,
        add_context_from_internet: true,
        response_json_schema: {
          type: "object",
          properties: {
            answer: { type: "string" },
            relevant_pathways: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  reason: { type: "string" },
                  page: { type: "string" }
                }
              }
            },
            next_steps: { type: "string" }
          }
        }
      });

      setResults(aiResponse);
    } catch (error) {
      console.error("Search error:", error);
      setResults({
        answer: "I encountered an error processing your query. Please try rephrasing your question.",
        relevant_pathways: [],
        next_steps: "Try using more specific terms or ask about a particular pathway."
      });
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="w-full">
      {/* Search Input */}
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask anything... 'Show me the pathway for glycolysis regulation' or 'How does TP53 affect cancer signaling?'"
            className="pl-12 pr-32 py-6 text-base border-2 border-[#5db8ff]/30 focus:border-[#5db8ff] rounded-xl bg-white"
          />
          <Button
            type="submit"
            disabled={isSearching || !query.trim()}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 btn-primary"
          >
            {isSearching ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Ask AI
              </>
            )}
          </Button>
        </div>
      </form>

      {/* Results */}
      <AnimatePresence>
        {results && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-6"
          >
            <Card className="border-2 border-[#5db8ff]/20 bg-white shadow-xl">
              <CardContent className="p-6 space-y-6">
                {/* AI Answer */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-5 h-5 text-[#5db8ff]" />
                    <h3 className="text-lg font-bold text-slate-900">AI Response</h3>
                  </div>
                  <p className="text-slate-700 leading-relaxed">{results.answer}</p>
                </div>

                {/* Relevant Pathways */}
                {results.relevant_pathways && results.relevant_pathways.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-3">Relevant Pathways</h4>
                    <div className="space-y-3">
                      {results.relevant_pathways.map((pathway, idx) => (
                        <Link
                          key={idx}
                          to={createPageUrl(pathway.page || "Explore")}
                        >
                          <div className="p-4 bg-[#5db8ff]/5 hover:bg-[#5db8ff]/10 border border-[#5db8ff]/20 rounded-lg smooth-transition group cursor-pointer">
                            <div className="flex items-start justify-between">
                              <div>
                                <h5 className="font-semibold text-slate-900 group-hover:text-[#5db8ff] smooth-transition">
                                  {pathway.name}
                                </h5>
                                <p className="text-sm text-slate-600 mt-1">{pathway.reason}</p>
                              </div>
                              <ArrowRight className="w-5 h-5 text-[#5db8ff] flex-shrink-0 ml-2 group-hover:translate-x-1 smooth-transition" />
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Next Steps */}
                {results.next_steps && (
                  <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <h4 className="font-semibold text-slate-900 mb-2 text-sm">Next Steps</h4>
                    <p className="text-sm text-slate-700">{results.next_steps}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}