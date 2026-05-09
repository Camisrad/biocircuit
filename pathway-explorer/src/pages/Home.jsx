import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowRight, Network, Upload, ChevronRight, Zap } from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import AnimatedLogo from "@/components/home/AnimatedLogo";

const pathways = [
  {
    name: "p53 Tumor Suppressor",
    tag: "DNA DAMAGE RESPONSE",
    desc: "Controls cell cycle arrest and apoptosis when DNA is damaged. Mutated in over 50% of all cancers.",
    genes: ["TP53", "MDM2", "CDKN1A", "BAX"],
    cancers: "Breast · Lung · Colon · Ovarian",
    color: "#ef4444",
  },
  {
    name: "MAPK / ERK Cascade",
    tag: "GROWTH SIGNALING",
    desc: "Transmits growth factor signals from the cell surface to the nucleus. KRAS is among the most mutated oncogenes.",
    genes: ["KRAS", "BRAF", "MEK1", "ERK1"],
    cancers: "Melanoma · Lung · Pancreatic",
    color: "#3b82f6",
  },
  {
    name: "PI3K / AKT / mTOR",
    tag: "CELL SURVIVAL",
    desc: "Master regulator of metabolism and survival. PTEN loss drives hyperactivation in multiple solid tumors.",
    genes: ["PIK3CA", "PTEN", "AKT", "mTOR"],
    cancers: "Breast · Endometrial · Renal",
    color: "#a855f7",
  },
];

const sources = [
  { name: "KEGG", detail: "Pathway networks", icon: "K", color: "#3b82f6" },
  { name: "Reactome", detail: "Curated biology", icon: "R", color: "#a855f7" },
  { name: "NCBI Gene", detail: "Gene annotations", icon: "N", color: "#06b6d4" },
  { name: "COSMIC", detail: "Somatic mutations", icon: "C", color: "#f97316" },
];

const story = [
  {
    id: 0,
    label: "Normal State",
    badge: "HEALTHY",
    badgeColor: "#22c55e",
    headline: "TP53 holds the gate.",
    body: "In healthy cells, TP53 continuously monitors DNA integrity. When damage is detected, it triggers cell cycle arrest — giving repair machinery time to work.",
    nodes: ["TP53 ●", "MDM2 ●", "CDKN1A ●"],
    nodeColors: ["#22c55e", "#3b82f6", "#06b6d4"],
  },
  {
    id: 1,
    label: "Driver Mutation",
    badge: "MUTATED",
    badgeColor: "#ef4444",
    headline: "R175H — the gate breaks.",
    body: "A single missense mutation (R175H) destroys TP53's DNA-binding domain. Cells no longer arrest. Damaged cells survive and divide — acquiring further mutations.",
    nodes: ["TP53 ✕", "MDM2 ↑↑", "BCL2 ↑"],
    nodeColors: ["#ef4444", "#f97316", "#f97316"],
  },
  {
    id: 2,
    label: "Targeted Therapy",
    badge: "TREATMENT",
    badgeColor: "#2563eb",
    headline: "MDM2 inhibition restores the signal.",
    body: "When TP53 is wild-type but suppressed by MDM2 overexpression, small-molecule MDM2 inhibitors (e.g., Nutlin-3) reactivate the p53 pathway and restore apoptotic signaling.",
    nodes: ["MDM2 ⊗", "TP53 ↑", "Apoptosis ↑"],
    nodeColors: ["#ef4444", "#22c55e", "#22c55e"],
  },
];

function StoryStep({ step, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left p-4 rounded-xl transition-all"
      style={{
        background: active ? "rgba(37,99,235,0.05)" : "#f8fafc",
        border: `1px solid ${active ? "rgba(37,99,235,0.25)" : "#e2e8f0"}`,
      }}
    >
      <div className="flex items-center gap-3 mb-1.5">
        <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white"
          style={{ background: step.badgeColor }}>
          {step.id + 1}
        </span>
        <span className="text-xs font-bold uppercase tracking-widest" style={{ color: step.badgeColor }}>{step.badge}</span>
      </div>
      <p className="font-semibold text-slate-800 text-sm">{step.headline}</p>
      {active && (
        <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="text-xs text-slate-500 mt-2 leading-relaxed">
          {step.body}
        </motion.p>
      )}
    </button>
  );
}

export default function Home() {
  const [activeStory, setActiveStory] = useState(0);
  const [titleHovered, setTitleHovered] = useState(false);
  const [shinePos, setShinePos] = useState(-60);

  const handleTitleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    setShinePos(x);
  };

  useEffect(() => {
    const t = setInterval(() => setActiveStory(s => (s + 1) % story.length), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ background: "#ffffff" }}>

      {/* ── HERO ── */}
      <section className="relative pt-24 pb-16 px-6 lg:px-10 overflow-hidden" style={{ borderBottom: "1px solid #e2e8f0" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6"
                style={{ background: "rgba(37,99,235,0.08)", border: "1px solid rgba(37,99,235,0.2)" }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-semibold text-emerald-600 tracking-wide">20+ live pathways · open access</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-bold text-slate-900 leading-tight mb-4"
                style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
              >
                Mapping the<br />
                <span
                  onMouseEnter={() => setTitleHovered(true)}
                  onMouseLeave={() => { setTitleHovered(false); setShinePos(null); }}
                  onMouseMove={handleTitleMouseMove}
                  style={{
                    backgroundImage: (titleHovered && shinePos !== null)
                      ? `linear-gradient(90deg,
                          #1e3a8a ${Math.max(0, shinePos * 100 - 45)}%,
                          #2563eb ${Math.max(5, shinePos * 100 - 20)}%,
                          #93c5fd ${shinePos * 100}%,
                          #bfdbfe ${shinePos * 100 + 5}%,
                          #93c5fd ${Math.min(95, shinePos * 100 + 10)}%,
                          #2563eb ${Math.min(98, shinePos * 100 + 25)}%,
                          #1e3a8a 100%)`
                      : "linear-gradient(105deg, #bfdbfe 0%, #3b82f6 20%, #93c5fd 45%, #1d4ed8 68%, #2563eb 85%, #1e3a8a 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    display: "inline-block",
                    cursor: "default",
                  }}
                >
                  Molecular World.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-slate-500 leading-relaxed mb-8 max-w-md"
                style={{ fontSize: "1.05rem" }}
              >
                Understand how cellular pathways interact, break, and respond to treatment.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-wrap gap-3"
              >
                <Link to={createPageUrl("Explore")}>
                  <button
                    className="flex items-center gap-2 px-5 py-2.5 text-white font-semibold rounded-lg text-sm"
                    style={{ background: "#2563EB" }}
                  >
                    Explore Pathways <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
                <Link to={createPageUrl("CaseStudies")}>
                  <button
                    className="flex items-center gap-2 px-5 py-2.5 font-semibold rounded-lg text-sm"
                    style={{ background: "#f1f5f9", color: "#475569", border: "1px solid #e2e8f0" }}
                  >
                    Case Studies
                  </button>
                </Link>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex items-center gap-10 mt-10 pt-8"
                style={{ borderTop: "1px solid #e2e8f0" }}
              >
                {[["20+", "Pathways"], ["60+", "Genes mapped"], ["4", "Major databases"], ["100%", "Open access"]].map(([val, label]) => (
                  <div key={label}>
                    <p className="text-2xl font-bold text-slate-900">{val}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{label}</p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right side pathway mini cards */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="space-y-3">
                {pathways.map((p, i) => (
                  <div key={p.name} className="flex items-center justify-between px-5 py-4 rounded-xl" style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
                      <div>
                        <p className="font-semibold text-slate-800 text-sm">{p.name}</p>
                        <p className="text-xs text-slate-400">{p.cancers}</p>
                      </div>
                    </div>
                    <div className="flex gap-1.5">
                      {p.genes.slice(0, 2).map(g => (
                        <span key={g} className="text-xs font-mono px-2 py-0.5 rounded font-semibold" style={{ background: p.color + "14", color: p.color, border: `1px solid ${p.color}33` }}>{g}</span>
                      ))}
                    </div>
                  </div>
                ))}
                <Link to={createPageUrl("Explore")}>
                  <div className="text-center py-3 text-sm text-blue-500 font-semibold hover:text-blue-700 transition-colors flex items-center justify-center gap-1">
                    View all 20+ pathways <ChevronRight className="w-4 h-4" />
                  </div>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── KEY PATHWAYS ── */}
      <section className="py-20 px-6 lg:px-10" style={{ background: "#ffffff" }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">Key Pathways</p>
              <h2 className="text-3xl font-bold text-slate-900">Track how cells fail.</h2>
            </div>
            <Link to={createPageUrl("Explore")}>
              <button className="flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-slate-700 transition-colors">
                View all 20+ <ChevronRight className="w-4 h-4" />
              </button>
            </Link>
          </div>

          <div className="grid lg:grid-cols-3 gap-5">
            {pathways.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-xl p-6 flex flex-col"
                style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}
              >
                <span className="text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2" style={{ color: p.color }}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: p.color }} /> {p.tag}
                </span>
                <h3 className="text-base font-bold text-slate-900 mb-2">{p.name}</h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-4 flex-1">{p.desc}</p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {p.genes.map(g => (
                    <span key={g} className="text-xs font-mono px-2 py-0.5 rounded font-semibold" style={{
                      background: p.color + "12",
                      border: `1px solid ${p.color}30`,
                      color: p.color
                    }}>{g}</span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4" style={{ borderTop: "1px solid #e2e8f0" }}>
                  <span className="text-xs text-slate-400">{p.cancers}</span>
                  <Link to={createPageUrl("Explore")}>
                    <span className="text-xs font-bold flex items-center gap-1 transition-colors" style={{ color: p.color }}>
                      Explore <ArrowRight className="w-3 h-3" />
                    </span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PATHWAY SIMULATION ── */}
      <section className="py-20 px-6 lg:px-10" style={{ background: "#f8fafc", borderTop: "1px solid #e2e8f0", borderBottom: "1px solid #e2e8f0" }}>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">Pathway Simulation</p>
            <h2 className="text-3xl font-bold text-slate-900 leading-tight mb-3">From mutation to treatment.</h2>
            <p className="text-slate-500 mb-7 leading-relaxed text-sm max-w-sm">
              See how a single driver mutation cascades through a signaling network — and how targeted therapy restores homeostasis.
            </p>
            <div className="space-y-2.5">
              {story.map(step => (
                <StoryStep key={step.id} step={step} active={activeStory === step.id} onClick={() => setActiveStory(step.id)} />
              ))}
            </div>
            <Link to={createPageUrl("Explore")}>
              <button className="mt-6 flex items-center gap-2 px-5 py-2.5 text-white font-semibold rounded-lg text-sm" style={{ background: "#0891b2" }}>
                <Zap className="w-4 h-4" /> Try the simulator
              </button>
            </Link>
          </div>

          <AnimatePresence mode="wait">
            {story.map(step => step.id === activeStory && (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
                className="rounded-xl p-8"
                style={{ background: "#ffffff", border: `1px solid ${step.badgeColor}33`, boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest" style={{
                    background: step.badgeColor + "18",
                    color: step.badgeColor,
                    border: `1px solid ${step.badgeColor}33`
                  }}>{step.badge}</span>
                  <span className="text-slate-400 text-xs">{step.label}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{step.headline}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-7">{step.body}</p>
                <div className="flex flex-wrap gap-3">
                  {step.nodes.map((node, i) => (
                    <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{
                      background: step.nodeColors[i] + "12",
                      border: `1px solid ${step.nodeColors[i]}30`
                    }}>
                      <div className="w-2 h-2 rounded-full" style={{ background: step.nodeColors[i] }} />
                      <span className="text-xs font-mono font-bold" style={{ color: step.nodeColors[i] }}>{node}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2 mt-6">
                  {story.map(s => (
                    <div key={s.id} className="rounded-full transition-all duration-300" style={{
                      width: s.id === activeStory ? 20 : 6,
                      height: 6,
                      background: s.id === activeStory ? step.badgeColor : "#e2e8f0"
                    }} />
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* ── DATA SOURCES ── */}
      <section className="py-20 px-6 lg:px-10" style={{ background: "#ffffff", borderBottom: "1px solid #e2e8f0" }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">Scientific Foundation</p>
              <h2 className="text-3xl font-bold text-slate-900">Sourced from the best.</h2>
            </div>
            <p className="text-slate-400 text-sm max-w-xs">Every gene, interaction, and cancer association sourced from peer-reviewed public databases — never invented.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {sources.map((s, i) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
              >
                <div className="p-6 rounded-xl" style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}>
                  <div className="w-10 h-10 rounded-lg mb-4 flex items-center justify-center font-bold text-sm" style={{
                    background: s.color + "14",
                    border: `1px solid ${s.color}30`,
                    color: s.color
                  }}>{s.icon}</div>
                  <p className="font-bold text-slate-800 text-sm">{s.name}</p>
                  <p className="text-xs text-slate-400 mt-1">{s.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-6 lg:px-10" style={{ background: "#f8fafc" }}>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">Open Science</p>
            <h2 className="text-3xl font-bold text-slate-900 leading-tight mb-4">
              Science moves faster together.
            </h2>
            <p className="text-slate-500 leading-relaxed mb-7 max-w-md text-sm">
              Upload your pathway data, share discoveries, and join researchers worldwide building the most comprehensive open-access molecular database.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to={createPageUrl("Contribute")}>
                <button className="flex items-center gap-2 px-5 py-2.5 text-white font-semibold rounded-lg text-sm" style={{ background: "#2563EB" }}>
                  <Upload className="w-4 h-4" /> Contribute data
                </button>
              </Link>
              <Link to={createPageUrl("Network")}>
                <button className="flex items-center gap-2 px-5 py-2.5 font-semibold rounded-lg text-sm" style={{ background: "#fff", border: "1px solid #e2e8f0", color: "#64748b" }}>
                  <Network className="w-4 h-4" /> View network
                </button>
              </Link>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { val: "20+", label: "Curated pathways", accent: "#3b82f6" },
              { val: "60+", label: "Genes mapped", accent: "#a855f7" },
              { val: "Free", label: "Always open access", accent: "#22c55e" },
              { val: "Global", label: "Researcher network", accent: "#06b6d4" },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="p-6 rounded-xl"
                style={{ background: "#ffffff", border: "1px solid #e2e8f0" }}
              >
                <p className="text-3xl font-bold text-slate-900">{s.val}</p>
                <p className="text-xs text-slate-400 mt-2 font-medium">{s.label}</p>
                <div className="mt-3 h-0.5 w-8 rounded-full" style={{ background: s.accent }} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}