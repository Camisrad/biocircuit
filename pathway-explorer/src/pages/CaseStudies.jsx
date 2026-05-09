import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CASES = [
  {
    id: "bcr_abl",
    gene: "BCR-ABL",
    disease: "Chronic Myeloid Leukemia",
    hook: "A single chromosomal accident, two genes fusing, causes a specific leukemia in 95% of cases. It also gave us the first molecularly targeted cancer drug.",
    sections: [
      {
        title: "Normal Function",
        content: "BCR and ABL are two separate genes on chromosomes 22 and 9. ABL encodes a tyrosine kinase normally kept inactive by its own regulatory domains. BCR is a scaffolding protein. Under normal conditions, ABL phosphorylates select substrates involved in cell cycle regulation and differentiation — but only when properly activated."
      },
      {
        title: "The Philadelphia Chromosome",
        content: "A reciprocal translocation t(9;22)(q34;q11) fuses BCR to ABL, creating the Philadelphia chromosome. The BCR portion removes ABL's regulatory domain. The result: a constitutively active tyrosine kinase that never turns off, driving uncontrolled myeloid progenitor proliferation."
      },
      {
        title: "Cancer Connection",
        content: "The Philadelphia chromosome is present in 95% of CML cases. BCR-ABL activates RAS/MAPK, PI3K/AKT, and JAK/STAT signaling simultaneously. It is the clearest genotype→phenotype→disease chain in all of oncology: one translocation, one fusion protein, one disease."
      },
      {
        title: "Targeted Therapy",
        content: "Imatinib (Gleevec, 2001) was the first molecularly targeted cancer drug. It fits into BCR-ABL's ATP-binding pocket and blocks kinase activity. CML went from a fatal disease to a manageable chronic condition. Later generations — dasatinib, nilotinib, ponatinib — overcome resistance mutations like T315I."
      }
    ],
    interactive: {
      type: "translocation",
      states: [
        { label: "Normal", description: "ABL (chr9) and BCR (chr22) are separate genes. ABL kinase is tightly regulated by its SH3 regulatory domain.", nodes: ["ABL — inactive", "BCR — scaffolding"], colors: ["#4A4A4A", "#4A4A4A"] },
        { label: "Translocation", description: "Chromosomal break and fusion event creates the Philadelphia chromosome (der22). BCR-ABL fusion gene is transcribed.", nodes: ["BCR::ABL fusion", "Philadelphia chr"], colors: ["#E05C5C", "#E05C5C"] },
        { label: "Imatinib", description: "Imatinib occupies the ATP-binding pocket of BCR-ABL, locking it in the inactive conformation. Kinase activity is blocked.", nodes: ["BCR-ABL ⊗", "Imatinib bound"], colors: ["#5C8BE0", "#22c55e"] }
      ]
    }
  },
  {
    id: "kras",
    gene: "KRAS",
    disease: "Lung · Pancreatic · Colorectal Cancer",
    hook: "KRAS was called 'undruggable' for 40 years. It drives 90% of pancreatic cancer. In 2021, the first approved inhibitor finally arrived.",
    sections: [
      {
        title: "Normal Function",
        content: "KRAS is a GTPase acting as a molecular on/off switch. When a growth factor binds its receptor, KRAS switches to its active GTP-bound form and transmits the signal downstream through RAF → MEK → ERK. It then self-inactivates by hydrolyzing GTP to GDP — the off switch."
      },
      {
        title: "The G12D/G12V Mutation",
        content: "Point mutations at codon 12 (G12D, G12V, G12C) disable GTPase activity. KRAS gets stuck in the GTP-bound ON position permanently. The cell receives a continuous 'grow and divide' signal with no off switch, regardless of external growth factors."
      },
      {
        title: "Cancer Connection",
        content: "Mutant KRAS drives 90% of pancreatic ductal adenocarcinoma, 30% of lung adenocarcinoma, and 40% of colorectal cancer. It also suppresses apoptosis, promotes angiogenesis, and reprograms metabolism toward aerobic glycolysis (the Warburg effect)."
      },
      {
        title: "Targeted Therapy",
        content: "Sotorasib (AMG 510) was FDA-approved in 2021 — the first KRAS inhibitor, targeting specifically G12C in NSCLC. It covalently binds the mutant cysteine and locks KRAS in the inactive GDP-bound state. G12D and G12V remain harder targets. Combination with SHP2 inhibitors shows promise."
      }
    ],
    interactive: {
      type: "switch",
      states: [
        { label: "Normal (GDP-bound)", description: "KRAS hydrolyzes GTP→GDP and returns to inactive state. Growth signal terminates. RAF/MEK/ERK cascade turns off.", nodes: ["KRAS-GDP", "RAF — off", "ERK — off"], colors: ["#4A4A4A", "#4A4A4A", "#4A4A4A"] },
        { label: "Mutant (GTP-stuck)", description: "G12D/V mutation disables GTPase. KRAS stays GTP-bound permanently. RAF/MEK/ERK are constitutively active.", nodes: ["KRAS-GTP ∞", "RAF — ON", "ERK — ON"], colors: ["#E05C5C", "#E05C5C", "#E05C5C"] },
        { label: "Sotorasib (G12C)", description: "Drug covalently locks KRAS G12C in the inactive GDP-bound state. Downstream signaling is suppressed.", nodes: ["KRAS-G12C ⊗", "RAF — off", "ERK — off"], colors: ["#5C8BE0", "#4A4A4A", "#4A4A4A"] }
      ]
    }
  },
  {
    id: "tp53",
    gene: "TP53",
    disease: "50%+ of all human cancers",
    hook: "p53 is mutated in more than half of all human tumors. Unlike most cancer genes, its mutant form is not just inactive, it actively promotes cancer.",
    sections: [
      {
        title: "Normal Function",
        content: "TP53 encodes p53, a transcription factor and the cell's central stress sensor. In response to DNA damage, hypoxia, or oncogene activation, p53 is stabilized (normally it's constantly degraded by MDM2) and activates genes that trigger cell cycle arrest, DNA repair, or apoptosis. It is the last line of defense before a damaged cell becomes malignant."
      },
      {
        title: "Dominant-Negative Mutations",
        content: "TP53 is altered in >50% of all tumors. Most are missense mutations in the DNA-binding domain. Unlike most tumor suppressors (where you simply lose the protein), mutant p53 often has dominant-negative effects — the mutant protein interferes with the remaining wild-type copy — and gain-of-function effects, actively promoting invasion and drug resistance."
      },
      {
        title: "Cancer Connection",
        content: "Without p53, cells with DNA damage skip apoptosis and continue dividing, accumulating further mutations. p53 loss is particularly critical as a 'second hit' — it cooperates with KRAS, HER2, or other oncogene activation to drive full malignancy. TP53 mutation is associated with chemotherapy resistance."
      },
      {
        title: "Targeted Therapy",
        content: "APR-246 (eprenetapopt) refolds mutant p53 back to normal conformation in certain mutation types — direct p53 rescue. MDM2 inhibitors (navtemadlin, HDM201) block the MDM2-p53 interaction to stabilize p53 in tumors where it is wild-type but suppressed by MDM2 overexpression."
      }
    ],
    interactive: {
      type: "loop",
      states: [
        { label: "Normal", description: "p53 activates MDM2 transcription. MDM2 ubiquitinates p53, targeting it for proteasomal degradation. p53 levels stay low. No stress response needed.", nodes: ["p53 — low", "MDM2 — degrades p53", "Target genes — off"], colors: ["#4A4A4A", "#E0A85C", "#4A4A4A"] },
        { label: "DNA Damage", description: "ATM/ATR phosphorylate p53 at Ser15, blocking MDM2 binding. p53 accumulates, activates CDKN1A (p21), BAX, PUMA. Cell arrests or undergoes apoptosis.", nodes: ["p53 ↑↑ stable", "MDM2 — blocked", "CDKN1A / BAX — ON"], colors: ["#8B5CE0", "#4A4A4A", "#22c55e"] },
        { label: "Mutant p53", description: "Missense mutation in DNA-binding domain. p53 present but cannot bind target gene promoters. MDM2 still degrades it. Dominant-negative: mutant p53 traps wild-type in inactive tetramers.", nodes: ["p53-mut — non-functional", "MDM2 — active", "Target genes — off"], colors: ["#E05C5C", "#E0A85C", "#4A4A4A"] }
      ]
    }
  },
  {
    id: "her2",
    gene: "HER2 (ERBB2)",
    disease: "Breast · Gastric Cancer",
    hook: "HER2-positive breast cancer was once one of the most aggressive subtypes. Today, targeted therapy has transformed it into one of the most treatable.",
    sections: [
      {
        title: "Normal Function",
        content: "HER2 is a receptor tyrosine kinase in the EGFR family. Unlike other family members, HER2 has no known direct ligand — it acts as the preferred dimerization partner for HER1, HER3, and HER4. Dimerization activates downstream PI3K/AKT and RAS/MAPK signaling to promote cell growth and survival."
      },
      {
        title: "Gene Amplification",
        content: "In HER2-positive cancers, the ERBB2 gene on chromosome 17q12 is amplified — sometimes 30+ extra copies. This causes massive overexpression of HER2 protein on the cell surface. With so many receptors present, they dimerize spontaneously without needing a ligand. Growth signal is permanently on."
      },
      {
        title: "Cancer Connection",
        content: "HER2 amplification occurs in 20-25% of breast cancers and was historically associated with aggressive disease, high recurrence, and poor prognosis. Also amplified in gastric (15-20%), ovarian, and lung cancers."
      },
      {
        title: "Targeted Therapy",
        content: "Trastuzumab (Herceptin) binds the extracellular domain of HER2 and blocks signaling + recruits immune cells. Pertuzumab blocks HER2 dimerization. T-DM1 (Kadcyla) combines trastuzumab with the chemotherapy payload emtansine — targeted delivery that kills HER2+ cells specifically. Together, they transformed HER2+ breast cancer survival."
      }
    ],
    interactive: {
      type: "amplification",
      states: [
        { label: "Normal (2 copies)", description: "2 copies of ERBB2 on chr17q12. Low receptor density on cell surface. Ligand-dependent dimerization only. Controlled growth signaling.", nodes: ["ERBB2 — 2 copies", "HER2 — normal density", "Signal — controlled"], colors: ["#4A4A4A", "#4A4A4A", "#4A4A4A"] },
        { label: "Amplified (30+ copies)", description: "Massive ERBB2 amplification drives receptor overexpression. Receptors dimerize constitutively without ligand. PI3K/AKT and MAPK pathways are permanently activated.", nodes: ["ERBB2 — amplified", "HER2 — overexpressed", "PI3K/AKT — ON"], colors: ["#E05C5C", "#E05C5C", "#E05C5C"] },
        { label: "Trastuzumab + Pertuzumab", description: "Trastuzumab blocks domain IV of HER2. Pertuzumab blocks domain II (dimerization interface). Dual blockade prevents all HER2 dimerization.", nodes: ["HER2 — blocked (mAb)", "Dimerization ⊗", "Signal — off"], colors: ["#5C8BE0", "#5C8BE0", "#4A4A4A"] }
      ]
    }
  },
  {
    id: "brca",
    gene: "BRCA1 / BRCA2",
    disease: "Breast · Ovarian Cancer",
    hook: "BRCA mutations don't cause cancer directly, they remove the safety net. And that removal creates a therapeutic vulnerability called synthetic lethality.",
    sections: [
      {
        title: "Normal Function",
        content: "BRCA1 and BRCA2 are tumor suppressors that coordinate homologous recombination (HR) — the high-fidelity DNA repair pathway. When double-strand DNA breaks occur, BRCA proteins recruit repair machinery (RAD51, RPA) to fix the break accurately using the sister chromatid as a template."
      },
      {
        title: "Loss-of-Function Mutations",
        content: "Germline or somatic frameshift, nonsense, or large deletion mutations inactivate BRCA1/2. Following the two-hit hypothesis, both copies must be lost. Without BRCA, cells cannot perform HR. They fall back on error-prone NHEJ, accumulating chromosomal instability — breaks, rearrangements, deletions that eventually hit other oncogenes."
      },
      {
        title: "Cancer Connection",
        content: "BRCA1 mutations confer 55-65% lifetime risk of breast cancer and 39% risk of ovarian cancer. BRCA2 mutations give 45-55% breast cancer risk. The underlying mechanism is not a single driver mutation but progressive genomic instability — the accumulation of errors in the absence of accurate repair."
      },
      {
        title: "Synthetic Lethality — PARP Inhibitors",
        content: "PARP is a backup DNA repair enzyme. In BRCA-mutant cells, PARP is essential for survival. PARP inhibitors (olaparib, rucaparib, niraparib) trap PARP on damaged DNA and block base excision repair. Cancer cells — with no HR and no BER — die. Normal cells with one intact BRCA copy survive. This is synthetic lethality: two individually tolerable deficiencies become lethal together."
      }
    ],
    interactive: {
      type: "synthetic_lethality",
      states: [
        { label: "Normal Cell", description: "Both HR (BRCA) and BER (PARP) pathways are functional. DNA breaks are repaired accurately by HR. PARP is a backup that handles single-strand breaks.", nodes: ["BRCA — functional", "PARP — active", "Cell — survives"], colors: ["#22c55e", "#22c55e", "#22c55e"] },
        { label: "BRCA Loss Only", description: "BRCA mutant — HR is deficient. Cells fall back on NHEJ and PARP-dependent BER. Unstable but viable. Genomic instability accumulates over time.", nodes: ["BRCA — mutant ✕", "PARP — compensating", "Cell — unstable"], colors: ["#E05C5C", "#E0A85C", "#E0A85C"] },
        { label: "PARP Inhibition (Synthetic Lethal)", description: "PARP inhibitor in BRCA-mutant cell: no HR, no BER. DNA damage cannot be repaired by any pathway. Catastrophic genomic collapse. Cell death.", nodes: ["BRCA — mutant ✕", "PARP — inhibited ✕", "Cell — DEAD"], colors: ["#E05C5C", "#E05C5C", "#E05C5C"] }
      ]
    }
  }
];

function InteractivePanel({ interactive }) {
  const [activeState, setActiveState] = useState(0);
  const state = interactive.states[activeState];

  return (
    <div className="mt-6 rounded-xl overflow-hidden" style={{ border: "1px solid #e2e8f0", background: "#ffffff" }}>
      <div className="flex" style={{ borderBottom: "1px solid #e2e8f0" }}>
        {interactive.states.map((s, i) => (
          <button
            key={i}
            onClick={() => setActiveState(i)}
            className="flex-1 px-4 py-2.5 text-xs font-semibold transition-all"
            style={activeState === i ? {
              background: "rgba(37,99,235,0.06)",
              color: "#2563EB",
              borderBottom: "2px solid #2563EB"
            } : {
              color: "#94a3b8",
              borderBottom: "2px solid transparent"
            }}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="p-5">
        <p className="text-sm text-slate-500 leading-relaxed mb-5">{state.description}</p>
        <div className="flex flex-wrap gap-3">
          {state.nodes.map((node, i) => (
            <motion.div
              key={`${activeState}-${i}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="px-3 py-2 rounded"
              style={{
                background: state.colors[i] + "18",
                border: `1px solid ${state.colors[i]}44`,
                color: state.colors[i]
              }}
            >
              <span className="font-mono text-xs font-bold">{node}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CaseStudies() {
  const [activeCase, setActiveCase] = useState("bcr_abl");
  const cas = CASES.find(c => c.id === activeCase);

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "#ffffff" }}>

      {/* Left sidebar */}
      <aside className="flex-shrink-0 overflow-y-auto" style={{
        width: 220,
        background: "#f8fafc",
        borderRight: "1px solid #e2e8f0"
      }}>
        <div className="px-4 pt-5">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Case Studies</p>
          <nav className="space-y-0.5">
            {CASES.map(c => (
              <button
                key={c.id}
                onClick={() => setActiveCase(c.id)}
                className="w-full text-left px-3 py-2.5 rounded text-xs transition-colors"
              style={activeCase === c.id ? {
                background: "rgba(37,99,235,0.08)",
                color: "#2563eb",
                borderLeft: "2px solid #2563EB"
              } : {
                color: "#64748b",
                borderLeft: "2px solid transparent"
              }}
            >
                <span className="font-mono font-bold block">{c.gene}</span>
                <span className="text-slate-400 text-[10px] leading-tight">{c.disease}</span>
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto" style={{ background: "#ffffff" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCase}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="max-w-3xl mx-auto px-8 py-10" style={{ color: "#0f172a" }}
          >
            {/* Header */}
            <div className="mb-8 pb-6" style={{ borderBottom: "1px solid #e2e8f0" }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-xs text-blue-600 uppercase tracking-widest">Case Study</span>
              </div>
              <h1 className="text-3xl font-bold text-slate-900 mb-1">
                <span className="font-mono">{cas.gene}</span>
              </h1>
              <p className="text-sm text-slate-400 font-mono mb-4">{cas.disease}</p>
              <p className="text-base text-slate-600 leading-relaxed">{cas.hook}</p>
            </div>

            {/* Sections */}
            <div className="space-y-6">
              {cas.sections.map((section, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-6 h-6 rounded flex items-center justify-center mt-0.5" style={{
                      background: "rgba(37,99,235,0.08)",
                      border: "1px solid rgba(37,99,235,0.2)"
                    }}>
                      <span className="text-xs font-bold text-blue-400">{i + 1}</span>
                    </div>
                    <div>
                      <h2 className="font-bold text-slate-800 text-sm mb-2 uppercase tracking-wide">{section.title}</h2>
                      <p className="text-sm text-slate-500 leading-relaxed">{section.content}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Interactive */}
            <div className="mt-8">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Interactive, click to switch state</p>
              <InteractivePanel interactive={cas.interactive} />
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Right panel — pathway reference */}
      <aside className="flex-shrink-0 overflow-y-auto hidden xl:block" style={{
        width: 260,
        background: "#f8fafc",
        borderLeft: "1px solid #e2e8f0"
      }}>
        <div className="p-5">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Key Concepts</p>
          <div className="space-y-3">
            {[
              { term: "GTPase", def: "Enzyme that hydrolyzes GTP → GDP, acting as a molecular timer/switch." },
              { term: "Synthetic Lethality", def: "Two gene defects individually tolerable, lethal in combination." },
              { term: "Driver Mutation", def: "Mutation that directly fuels cancer growth (vs. passenger)." },
              { term: "Loss of Function", def: "Mutation that destroys a protein's ability to work." },
              { term: "Gain of Function", def: "Mutation that makes a protein hyperactive or gives it new oncogenic properties." },
              { term: "Constitutively Active", def: "Protein that is permanently ON, independent of normal regulatory signals." },
              { term: "Translocation", def: "Chromosomal rearrangement where segments from different chromosomes swap." },
              { term: "Amplification", def: "Multiple extra copies of a gene, leading to protein overexpression." },
              { term: "PARP", def: "Poly(ADP-ribose) polymerase — enzyme that repairs single-strand DNA breaks." },
            ].map(item => (
              <div key={item.term} className="pb-3" style={{ borderBottom: "1px solid #e2e8f0" }}>
                <p className="font-mono text-xs font-bold text-blue-600 mb-1">{item.term}</p>
                <p className="text-xs text-slate-500 leading-relaxed">{item.def}</p>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}