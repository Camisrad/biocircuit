import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Microscope, ChevronRight, CheckCircle, Lightbulb, BookOpen, Dna, Activity, Network, Database, ChevronDown, ExternalLink, AlertCircle } from "lucide-react";

const topics = [
  {
    id: "pathways",
    icon: Network,
    title: "Biological Pathways",
    subtitle: "How cells communicate",
    color: "#3b82f6",
    sections: [
      {
        heading: "What is a Biological Pathway?",
        body: "A biological pathway is a series of chemical reactions that occur inside a cell, where each reaction's product becomes the input for the next. Think of it like a relay race — a signal is passed from protein to protein until it reaches its destination and triggers a cellular response.",
        callout: { type: "analogy", text: "Imagine a pathway like a telephone game: a message starts outside the cell, passes through a chain of proteins, and arrives at the nucleus to change which genes are turned on or off." },
        keyTerms: [
          { term: "Ligand", def: "A molecule (like a hormone) that binds to a receptor to start a signaling cascade." },
          { term: "Receptor", def: "A protein on the cell surface that detects signals from the environment." },
          { term: "Phosphorylation", def: "Adding a phosphate group to a protein — essentially a molecular on/off switch." },
        ]
      },
      {
        heading: "How Signal Transduction Works",
        body: "Signal transduction is the process of converting an extracellular signal into an intracellular response.",
        steps: [
          { n: "1", label: "Reception", desc: "A ligand (e.g., epidermal growth factor) binds to its receptor on the cell surface." },
          { n: "2", label: "Transduction", desc: "The receptor changes shape, activating intracellular proteins through a cascade of phosphorylation events." },
          { n: "3", label: "Amplification", desc: "Each activated protein activates many more — one signal can trigger thousands of downstream responses." },
          { n: "4", label: "Response", desc: "The final signal reaches the nucleus, changing gene expression, or triggers cell division, survival, or death." },
        ]
      },
      {
        heading: "Pathway Crosstalk",
        body: "Pathways don't operate in isolation, they interact with each other in complex networks called crosstalk. For example, the MAPK pathway and the PI3K/AKT pathway both respond to growth factor signals and share regulatory components. This interconnectedness means blocking one pathway can unexpectedly activate another — a common cause of cancer drug resistance.",
        callout: { type: "important", text: "Crosstalk is why many targeted cancer therapies eventually stop working. Tumors reroute their signals through alternative pathways." },
      }
    ]
  },
  {
    id: "genes",
    icon: Dna,
    title: "Genes & Proteins",
    subtitle: "From DNA to function",
    color: "#a855f7",
    sections: [
      {
        heading: "The Central Dogma",
        body: "The central dogma of molecular biology describes how genetic information flows in a cell: DNA is transcribed into RNA, which is then translated into protein.",
        steps: [
          { n: "DNA", label: "The Blueprint", desc: "Stored in the nucleus. Contains the complete instructions for building an organism." },
          { n: "RNA", label: "The Messenger", desc: "A temporary copy of the gene, transported out of the nucleus to ribosomes." },
          { n: "Protein", label: "The Worker", desc: "The functional molecule — enzymes, receptors, structural proteins, signaling molecules." },
        ]
      },
      {
        heading: "Mutations: When the Code Changes",
        body: "A mutation is a change in the DNA sequence. Most mutations are harmless, but some alter the function of key proteins in ways that disrupt cellular control.",
        keyTerms: [
          { term: "Oncogene", def: "A mutated gene that causes its protein to be permanently active, driving uncontrolled growth. Example: KRAS G12D." },
          { term: "Tumor Suppressor", def: "A gene that normally puts the brakes on cell division. When mutated, the brakes fail. Example: TP53 R175H." },
          { term: "Loss of Function", def: "A mutation that destroys a protein's ability to work — dangerous when it affects tumor suppressors." },
          { term: "Gain of Function", def: "A mutation that makes a protein hyperactive — dangerous when it affects growth-promoting genes." },
        ],
        callout: { type: "analogy", text: "Think of a car: oncogenes are like a stuck accelerator, and tumor suppressors are like broken brakes. Cancer often requires both." }
      },
    ]
  },
  {
    id: "cancer",
    icon: Activity,
    title: "Pathway Dysregulation",
    subtitle: "How pathways drive cancer",
    color: "#f97316",
    sections: [
      {
        heading: "The Hallmarks of Cancer",
        body: "Cancer doesn't arise from a single mutation — it requires the systematic breakdown of multiple cellular control systems.",
        steps: [
          { n: "1", label: "Sustaining Growth Signals", desc: "Cancer cells generate their own growth signals instead of waiting for external cues." },
          { n: "2", label: "Resisting Cell Death", desc: "Apoptosis (programmed cell death) is disabled, allowing damaged cells to survive." },
          { n: "3", label: "Enabling Replication", desc: "Cells bypass normal limits on how many times they can divide." },
          { n: "4", label: "Inducing Blood Vessel Growth", desc: "Tumors hijack angiogenesis to supply themselves with nutrients via new blood vessels." },
          { n: "5", label: "Invasion & Metastasis", desc: "Cells break free, travel through the bloodstream, and colonize distant organs." },
        ]
      },
      {
        heading: "Precision Medicine & Targeted Therapy",
        body: "Understanding which specific pathways are dysregulated in a patient's tumor allows doctors to choose targeted therapies — drugs designed to block the exact molecular defect.",
        keyTerms: [
          { term: "Kinase Inhibitor", def: "A drug that blocks an overactive kinase enzyme from phosphorylating its targets. Example: Imatinib (Gleevec) for BCR-ABL." },
          { term: "Immunotherapy", def: "Treatments that restore the immune system's ability to recognize and destroy cancer cells." },
          { term: "Biomarker", def: "A measurable molecular change (like a mutation) used to guide treatment decisions." },
          { term: "Drug Resistance", def: "When a tumor evolves to circumvent a targeted therapy, often by activating alternative pathways." },
        ]
      }
    ]
  },
  {
    id: "biocircuit",
    icon: Microscope,
    title: "How BioCircuit Works",
    subtitle: "The science behind the tool",
    color: "#22c55e",
    sections: [
      {
        heading: "Data Sources & Scientific Rigor",
        body: "Every pathway in BioCircuit is built from peer-reviewed, publicly available biological databases. No data is invented — each gene, interaction, and cancer association is sourced from authoritative research.",
        keyTerms: [
          { term: "KEGG", def: "Kyoto Encyclopedia of Genes and Genomes — comprehensive database of molecular interaction networks.", link: "https://www.genome.jp/kegg/pathway.html" },
          { term: "Reactome", def: "Open-source, manually curated database of biological pathways with experimental evidence.", link: "https://reactome.org" },
          { term: "TCGA", def: "The Cancer Genome Atlas — large-scale genomic characterization of 33 cancer types.", link: "https://www.cancer.gov/tcga" },
          { term: "COSMIC", def: "Catalogue of Somatic Mutations in Cancer — the world's largest expert database of somatic mutations.", link: "https://cancer.sanger.ac.uk/cosmic" },
        ]
      },
      {
        heading: "Reading a Pathway Diagram",
        body: "Pathway diagrams encode biological relationships as visual networks. Once you learn the visual grammar, you can read any pathway like a sentence:",
        steps: [
          { n: "N", label: "Nodes", desc: "Each circle or box represents a gene or protein. Color often reflects function or expression level." },
          { n: "A", label: "Activation Edges", desc: "A solid arrow from A to B means A activates B — turning it on or increasing its activity." },
          { n: "I", label: "Inhibition Edges", desc: "A blunt-end line from A to B means A inhibits B — suppressing its activity." },
        ]
      }
    ]
  }
];

function CalloutBox({ type, text }) {
  const styles = {
    analogy: { bg: "rgba(59,130,246,0.05)", border: "#bfdbfe", icon: Lightbulb, iconColor: "#3b82f6", label: "Analogy" },
    important: { bg: "rgba(251,191,36,0.05)", border: "#fde68a", icon: AlertCircle, iconColor: "#d97706", label: "Key Insight" },
  };
  const s = styles[type] || styles.analogy;
  return (
    <div className="rounded-xl p-4 flex gap-3 my-4" style={{ background: s.bg, border: `1px solid ${s.border}` }}>
      <s.icon className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: s.iconColor }} />
      <div>
        <span className="text-xs font-bold uppercase tracking-widest block mb-1" style={{ color: s.iconColor }}>{s.label}</span>
        <p className="text-slate-600 text-sm leading-relaxed">{text}</p>
      </div>
    </div>
  );
}

function StepList({ steps }) {
  return (
    <div className="space-y-3 my-4">
      {steps.map((step, i) => (
        <div key={i} className="flex gap-3 items-start">
          <div className="w-7 h-7 rounded-lg text-white text-xs font-bold flex items-center justify-center flex-shrink-0" style={{ background: "#2563EB" }}>
            {step.n}
          </div>
          <div>
            <span className="font-semibold text-slate-800 text-sm">{step.label}: </span>
            <span className="text-slate-500 text-sm">{step.desc}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function KeyTerms({ terms }) {
  const [open, setOpen] = useState(null);
  return (
    <div className="my-4 space-y-2">
      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Key Terms</p>
      {terms.map((t, i) => (
        <div key={i} className="rounded-xl overflow-hidden" style={{ border: "1px solid #e2e8f0" }}>
          <button onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between px-4 py-3 text-left transition-colors"
            style={{ background: open === i ? "rgba(37,99,235,0.04)" : "#f8fafc" }}>
            <span className="font-semibold text-slate-800 text-sm">{t.term}</span>
            <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${open === i ? "rotate-180" : ""}`} />
          </button>
          <AnimatePresence>
            {open === i && (
              <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
                <div className="px-4 pb-3 text-slate-500 text-sm leading-relaxed border-t border-slate-100 pt-2 bg-white">
                  {t.def}
                  {t.link && (
                    <a href={t.link} target="_blank" rel="noopener noreferrer" className="ml-2 inline-flex items-center gap-1 text-blue-500 hover:underline text-xs font-semibold">
                      Learn more <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

function TopicContent({ topic }) {
  const [completed, setCompleted] = useState([]);
  const toggle = (i) => setCompleted(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]);

  return (
    <div>
      <div className="flex items-center gap-4 mb-7 pb-6" style={{ borderBottom: "1px solid #e2e8f0" }}>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: topic.color + "14", border: `1px solid ${topic.color}30` }}>
          <topic.icon className="w-5 h-5" style={{ color: topic.color }} />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-900">{topic.title}</h1>
          <p className="text-sm text-slate-400">{topic.subtitle}</p>
        </div>
        <div className="ml-auto text-right">
          <p className="text-xs text-slate-400 mb-1.5">{completed.length}/{topic.sections.length} completed</p>
          <div className="w-24 h-1 rounded-full overflow-hidden" style={{ background: "#e2e8f0" }}>
            <div className="h-full rounded-full transition-all duration-500" style={{
              width: `${(completed.length / topic.sections.length) * 100}%`,
              background: "#2563EB"
            }} />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {topic.sections.map((section, i) => (
          <div key={i} className="rounded-xl p-6" style={{
            background: completed.includes(i) ? "rgba(22,163,74,0.03)" : "#f8fafc",
            border: `1px solid ${completed.includes(i) ? "rgba(22,163,74,0.2)" : "#e2e8f0"}`
          }}>
            <div className="flex items-start justify-between gap-4 mb-3">
              <h2 className="text-base font-bold text-slate-900">{section.heading}</h2>
              <button onClick={() => toggle(i)}
                className="flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all"
                style={{
                  background: completed.includes(i) ? "#16a34a" : "transparent",
                  borderColor: completed.includes(i) ? "#16a34a" : "#cbd5e1"
                }}>
                {completed.includes(i) && <CheckCircle className="w-3.5 h-3.5 text-white" />}
              </button>
            </div>
            <p className="text-slate-500 leading-relaxed text-sm mb-2">{section.body}</p>
            {section.steps && <StepList steps={section.steps} />}
            {section.callout && <CalloutBox type={section.callout.type} text={section.callout.text} />}
            {section.keyTerms && <KeyTerms terms={section.keyTerms} />}
            {!completed.includes(i) && (
              <button onClick={() => toggle(i)} className="mt-3 text-xs font-semibold text-blue-500 hover:text-blue-700 flex items-center gap-1 transition-colors">
                <CheckCircle className="w-3.5 h-3.5" /> Mark as understood
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Science() {
  const [activeTopic, setActiveTopic] = useState("pathways");
  const topic = topics.find(t => t.id === activeTopic);

  return (
    <div className="min-h-screen" style={{ background: "#ffffff" }}>
      {/* Hero — no extra top padding, layout spacer already offsets */}
      <div className="relative pt-6 pb-6 px-4 sm:px-6 lg:px-8 border-b" style={{ borderColor: "#e2e8f0", background: "#f8fafc" }}>
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full" style={{ background: "rgba(37,99,235,0.08)", border: "1px solid rgba(37,99,235,0.2)" }}>
                <BookOpen className="w-3 h-3 text-blue-500" />
                <span className="text-xs font-semibold text-blue-600">Interactive Learning</span>
              </div>
              <h1 className="text-xl font-bold text-slate-900">
                Learn the <span style={{ color: "#2563eb" }}>Science.</span>
              </h1>
            </div>
            <p className="text-sm text-slate-500 max-w-xl">Understand molecular pathways from first principles — work through each topic at your own pace.</p>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="lg:w-56 flex-shrink-0">
          <div className="lg:sticky lg:top-24">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 px-1">Topics</p>
            <nav className="space-y-1">
              {topics.map((t) => (
                <button key={t.id} onClick={() => setActiveTopic(t.id)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all"
                  style={activeTopic === t.id ? {
                    background: "rgba(37,99,235,0.07)",
                    border: "1px solid rgba(37,99,235,0.2)"
                  } : {
                    background: "transparent",
                    border: "1px solid transparent"
                  }}>
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: t.color + "14", border: `1px solid ${t.color}30` }}>
                    <t.icon className="w-3.5 h-3.5" style={{ color: t.color }} />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-sm truncate" style={{ color: activeTopic === t.id ? "#2563EB" : "#64748b" }}>{t.title}</p>
                    <p className="text-xs text-slate-400 truncate">{t.subtitle}</p>
                  </div>
                  {activeTopic === t.id && <ChevronRight className="w-4 h-4 text-blue-500 ml-auto flex-shrink-0" />}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div key={activeTopic} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
              <TopicContent topic={topic} />
            </motion.div>
          </AnimatePresence>

          {topics.findIndex(t => t.id === activeTopic) < topics.length - 1 && (
            <div className="mt-7 pt-6" style={{ borderTop: "1px solid #e2e8f0" }}>
              <button onClick={() => setActiveTopic(topics[topics.findIndex(t => t.id === activeTopic) + 1].id)}
                className="flex items-center gap-2 px-5 py-2.5 text-white font-semibold rounded-lg text-sm"
                style={{ background: "#2563EB" }}>
                Next: {topics[topics.findIndex(t => t.id === activeTopic) + 1].title}
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}