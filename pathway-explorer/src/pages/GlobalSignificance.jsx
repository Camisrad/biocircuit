import { motion } from "framer-motion";
import { Globe, Heart, Users, TrendingUp, Lightbulb, Lock, Unlock, ArrowRight, Microscope } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function GlobalSignificance() {
  const impactStats = [
    { icon: Users, label: "Researchers Worldwide", value: "10M+", color: "#3b82f6" },
    { icon: Globe, label: "Countries Affected", value: "195", color: "#a855f7" },
    { icon: Lock, label: "Research Behind Paywalls", value: "70%", color: "#ef4444" },
    { icon: TrendingUp, label: "Annual Cancer Cases", value: "19M+", color: "#f97316" },
  ];

  const principles = [
    { icon: Unlock, title: "Open Access for All", description: "Breaking down barriers to scientific knowledge by making pathway data freely available to researchers in every country, regardless of institutional resources." },
    { icon: Users, title: "Collaborative Discovery", description: "Enabling researchers from diverse backgrounds to contribute, compare, and build upon each other's work, accelerating the pace of discovery exponentially." },
    { icon: Globe, title: "Global Health Equity", description: "Ensuring that breakthrough treatments and research insights reach all communities, closing the gap between well-funded and under-resourced regions." },
    { icon: Lightbulb, title: "AI-Driven Insights", description: "Harnessing machine learning to identify patterns across millions of data points, predicting drug responses and uncovering hidden therapeutic targets." },
  ];

  const quotes = [
    { text: "The best way to predict the future is to invent it.", author: "Alan Kay", role: "Computer Scientist" },
    { text: "Science knows no country, because knowledge belongs to humanity.", author: "Louis Pasteur", role: "Microbiologist" },
    { text: "Open science is the only way to do science in the 21st century.", author: "Michael Nielsen", role: "Quantum Physicist" },
  ];

  const visionSteps = [
    { label: "Today", text: "An interactive visualization platform where students and researchers explore 20+ cancer pathways and contribute their own datasets." },
    { label: "Tomorrow", text: "A unified, AI-driven global research hub that simulates mutation behavior, predicts drug responses, and identifies novel therapeutic targets." },
    { label: "The Future", text: "Equal access for every researcher worldwide — where discoveries instantly benefit patients everywhere." },
  ];

  return (
    <div className="min-h-screen" style={{ background: "#060B14" }}>
      {/* Hero */}
      <div className="relative py-24 px-4 sm:px-6 lg:px-8 border-b overflow-hidden" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <div className="absolute inset-0 mol-grid-dark opacity-40" />
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(37,99,235,0.1) 0%, transparent 70%)"
        }} />
        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-8" style={{ background: "rgba(37,99,235,0.1)", border: "1px solid rgba(37,99,235,0.25)" }}>
              <Globe className="w-3.5 h-3.5 text-blue-400" />
              <span className="text-xs font-semibold text-blue-400">Global Mission · Open Science · Healthcare Equity</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white leading-tight">
              Mapping the <span style={{ color: "#60a5fa" }}>Molecular World.</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
              BioCircuit bridges students, researchers, and innovators through open-access biomedical visualization — transforming fragmented data into a living, global map of cellular pathways.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Impact Stats */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 border-b" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-3">The Challenge We Face</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">Cancer research generates vast amounts of data, but access remains unequal. BioCircuit exists to change that.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {impactStats.map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.1 }} viewport={{ once: true }}>
                <div className="p-6 rounded-2xl text-center h-full hover-lift" style={{
                  background: "rgba(255,255,255,0.03)",
                  border: `1px solid ${stat.color}22`
                }}>
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4" style={{
                    background: stat.color + "18",
                    border: `1.5px solid ${stat.color}44`
                  }}>
                    <stat.icon className="w-7 h-7" style={{ color: stat.color }} />
                  </div>
                  <div className="text-4xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-slate-500 font-medium">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Principles */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 relative" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="absolute inset-0 mol-grid-dark opacity-20" />
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-3">Why Open Science Matters</h2>
            <p className="text-slate-500">The future of biomedical research depends on collaboration without borders</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-4">
            {principles.map((p, i) => (
              <motion.div key={p.title} initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: i * 0.1 }} viewport={{ once: true }}>
                <div className="p-6 rounded-2xl h-full flex gap-4 hover-lift" style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)"
                }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{
                    background: "linear-gradient(135deg, rgba(37,99,235,0.25), rgba(6,182,212,0.15))",
                    border: "1px solid rgba(37,99,235,0.3)"
                  }}>
                    <p.icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">{p.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{p.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Vision Timeline */}
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="text-center mb-10">
            <Heart className="w-8 h-8 text-blue-400 mx-auto mb-3" />
            <h2 className="text-3xl font-bold text-white mb-3">BioCircuit's Long-Term Vision</h2>
          </motion.div>
          <div className="relative space-y-4">
            <div className="absolute left-6 top-0 bottom-0 w-px hidden sm:block" style={{ background: "linear-gradient(to bottom, #2563EB, #06b6d4)" }} />
            {visionSteps.map((step, i) => (
              <motion.div key={step.label} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: i * 0.15 }} viewport={{ once: true }} className="flex gap-5 items-start">
                <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 z-10" style={{
                  background: "linear-gradient(135deg, #2563EB, #06b6d4)",
                  boxShadow: "0 0 20px rgba(37,99,235,0.3)"
                }}>
                  <span className="text-white font-bold text-xs">{i + 1}</span>
                </div>
                <div className="flex-1 p-5 rounded-2xl" style={{
                  background: "rgba(37,99,235,0.05)",
                  border: "1px solid rgba(37,99,235,0.15)"
                }}>
                  <span className="text-xs font-bold text-blue-400 uppercase tracking-widest block mb-1">{step.label}</span>
                  <p className="text-slate-400 leading-relaxed">{step.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Quotes */}
      <div className="py-12 px-4 sm:px-6 lg:px-8 border-t border-b" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-4">
          {quotes.map((q, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.12 }} viewport={{ once: true }}>
              <div className="rounded-2xl p-6 h-full flex flex-col hover-lift" style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)"
              }}>
                <div className="text-5xl font-serif leading-none mb-3" style={{ color: "rgba(59,130,246,0.15)" }}>"</div>
                <p className="text-slate-400 italic leading-relaxed flex-1">{q.text}</p>
                <div className="mt-4 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  <p className="text-blue-400 font-bold text-sm">{q.author}</p>
                  <p className="text-slate-600 text-xs mt-0.5">{q.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <div className="rounded-3xl p-12 text-center relative overflow-hidden" style={{
              background: "linear-gradient(135deg, rgba(37,99,235,0.15), rgba(6,182,212,0.08))",
              border: "1px solid rgba(37,99,235,0.25)",
              boxShadow: "0 0 60px rgba(37,99,235,0.1)"
            }}>
              <div className="absolute inset-0 mol-grid-dark opacity-30" />
              <div className="relative z-10">
                <Globe className="w-12 h-12 mx-auto mb-5 text-blue-400" />
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Join the Circuit</h2>
                <p className="text-lg text-slate-400 mb-8 max-w-xl mx-auto">Contribute your research, collaborate with peers worldwide, and help map the molecular world.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to={createPageUrl("Contribute")}>
                    <button className="flex items-center gap-2 px-8 py-4 text-white font-bold text-base rounded-xl hover-lift" style={{
                      background: "linear-gradient(135deg, #2563EB, #1d4ed8)",
                      boxShadow: "0 0 24px rgba(37,99,235,0.4)"
                    }}>
                      Contribute Data <ArrowRight className="w-5 h-5" />
                    </button>
                  </Link>
                  <Link to={createPageUrl("Network")}>
                    <button className="flex items-center gap-2 px-8 py-4 font-semibold text-base rounded-xl hover-lift" style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.15)",
                      color: "#94a3b8"
                    }}>
                      <Globe className="w-5 h-5" /> Explore Network
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}