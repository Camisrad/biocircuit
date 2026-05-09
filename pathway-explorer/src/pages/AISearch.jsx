import { motion } from "framer-motion";
import { Sparkles, Brain, Zap } from "lucide-react";
import AISearch from "../components/ai/AISearch";

export default function AISearchPage() {
  const features = [
    {
      icon: Brain,
      title: "Natural Language Understanding",
      description: "Ask questions in plain English - no need to know exact gene names or pathway terminology"
    },
    {
      icon: Zap,
      title: "Instant Insights",
      description: "Get AI-powered answers and pathway recommendations in seconds"
    },
    {
      icon: Sparkles,
      title: "Smart Recommendations",
      description: "Discover relevant pathways and connections you might have missed"
    }
  ];

  const examples = [
    "Show me the pathway for glycolysis regulation",
    "How does TP53 affect cancer signaling?",
    "What pathways are involved in breast cancer?",
    "Explain the MAPK cascade in simple terms",
    "Which genes regulate cell cycle progression?",
    "What happens when PI3K is mutated?"
  ];

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#5db8ff]/10 border-2 border-[#5db8ff]/30 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-[#5db8ff]" />
            <span className="text-sm font-semibold text-[#4a9dcc] tracking-wide">AI-Powered Search</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">
            Ask Questions, Get Answers
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto mb-8">
            Search BioCircuit using natural language. Our AI understands your biology questions 
            and guides you to the exact pathways, genes, and research you need.
          </p>
        </motion.div>

        {/* Search Component */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <AISearch />
        </motion.div>

        {/* Example Queries */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="text-xl font-bold text-slate-900 mb-4 text-center">
            Try These Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-3">
            {examples.map((example, idx) => (
              <div
                key={idx}
                className="p-4 bg-slate-50 hover:bg-[#5db8ff]/5 border border-slate-200 hover:border-[#5db8ff]/30 rounded-lg smooth-transition cursor-pointer group"
                onClick={() => {
                  const input = document.querySelector('input[placeholder*="Ask anything"]');
                  if (input) {
                    input.value = example;
                    input.dispatchEvent(new Event('input', { bubbles: true }));
                  }
                }}
              >
                <p className="text-slate-700 group-hover:text-[#5db8ff] smooth-transition text-sm">
                  "{example}"
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="p-6 bg-white border-2 border-[#5db8ff]/20 rounded-xl text-center"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-[#5db8ff] to-[#4a9dcc] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}