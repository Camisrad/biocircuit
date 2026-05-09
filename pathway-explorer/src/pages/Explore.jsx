import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronUp, Layers, Circle } from "lucide-react";
import PathwayDiagram from "../components/explore/PathwayDiagram";
import GeneInfoPanel from "../components/explore/GeneInfoPanel";
import PathwayExplainer from "../components/ai/PathwayExplainer";
import { pathwayData } from "../components/explore/pathwayData";
import DataOverlayPanel from "../components/explore/DataOverlayPanel";
import DrugTargetPanel from "../components/explore/DrugTargetPanel";

const PATHWAYS = [
  { id: "p53", name: "p53 / MDM2", category: "Tumor Suppressor" },
  { id: "mapk", name: "MAPK / ERK", category: "Growth Signaling" },
  { id: "pi3k", name: "PI3K / AKT / mTOR", category: "Cell Survival" },
  { id: "wnt", name: "Wnt / β-catenin", category: "Development" },
  { id: "her2", name: "HER2 / EGFR", category: "RTK Signaling" },
  { id: "brca", name: "BRCA / DNA Repair", category: "Genome Stability" },
  { id: "cell_cycle", name: "RB / Cell Cycle", category: "Cell Cycle" },
  { id: "notch", name: "Notch", category: "Differentiation" },
  { id: "hedgehog", name: "Hedgehog", category: "Development" },
  { id: "jak_stat", name: "JAK / STAT", category: "Immune Signaling" },
  { id: "tgfb", name: "TGF-β", category: "Growth Inhibition" },
  { id: "vegf", name: "VEGF / Angiogenesis", category: "Angiogenesis" },
  { id: "apoptosis", name: "Apoptosis (Intrinsic)", category: "Cell Death" },
  { id: "mtor", name: "mTOR / Autophagy", category: "Metabolism" },
  { id: "dna_damage", name: "DNA Damage Response", category: "Repair" },
  { id: "hif", name: "Hypoxia / HIF-1α", category: "Hypoxia" },
  { id: "bcr_abl", name: "BCR-ABL / CML", category: "Fusion Oncogene" },
];

const LEGEND = [
  { color: "#E05C5C", label: "Oncogene (GOF)" },
  { color: "#5C8BE0", label: "Tumor Suppressor (LOF)" },
  { color: "#E0A85C", label: "Kinase / Enzyme" },
  { color: "#8B5CE0", label: "Transcription Factor" },
  { color: "#94a3b8", label: "Unaffected Node" },
];

function bfsDownstream(startGenes, connections) {
  const tiers = {};
  startGenes.forEach(g => { tiers[g] = 'target'; });
  const queue = startGenes.map(g => ({ gene: g, tier: 1 }));
  const visited = new Set(startGenes);
  while (queue.length > 0) {
    const { gene, tier } = queue.shift();
    if (tier > 2) continue;
    connections.filter(c => c.from === gene && c.type === 'activation').forEach(c => {
      if (!visited.has(c.to)) {
        visited.add(c.to);
        tiers[c.to] = tier === 1 ? 'tier1' : 'tier2';
        queue.push({ gene: c.to, tier: tier + 1 });
      }
    });
  }
  return tiers;
}

export default function Explore() {
  const [selectedGene, setSelectedGene] = useState(null);
  const [selectedPathway, setSelectedPathway] = useState("p53");
  const [overlayData, setOverlayData] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [showExplainer, setShowExplainer] = useState(false);
  const [drugOverlay, setDrugOverlay] = useState(null);
  const [hgtActive, setHgtActive] = useState(false);
  const [viewMode, setViewMode] = useState('wildtype');
  const [signalGene, setSignalGene] = useState(null);
  const [cancerTypeFilter, setCancerTypeFilter] = useState('');
  const [sectionOpen, setSectionOpen] = useState({ drug: true, hgt: true });
  const toggleSection = (key) => setSectionOpen(prev => ({ ...prev, [key]: !prev[key] }));

  const handlePathwayChange = (id) => {
    setSelectedPathway(id);
    setSelectedGene(null);
    setDrugOverlay(null);
    setSignalGene(null);
  };

  // Wrap signal setter so clicking the same gene twice still re-fires
  const handlePlaySignal = (geneName) => {
    console.log('🟢 Explore: handlePlaySignal called with', geneName);
    setSignalGene(null);
    setTimeout(() => {
      console.log('🟢 Explore: setSignalGene to', geneName);
      setSignalGene(geneName);
    }, 0);
  };

  const handleDrugApplied = ({ targetGenes }) => {
    const pathway = pathwayData[selectedPathway];
    if (!pathway) return;
    const allGeneNames = new Set(pathway.genes.map(g => g.name));
    const tiers = bfsDownstream(targetGenes.filter(g => allGeneNames.has(g)), pathway.connections);
    const overlay = {};
    pathway.genes.forEach(g => {
      overlay[g.name] = tiers[g.name] || 'unaffected';
    });
    targetGenes.forEach(g => { if (allGeneNames.has(g)) overlay[g] = 'target'; });
    setDrugOverlay(overlay);
  };

  const currentPathway = PATHWAYS.find(p => p.id === selectedPathway);

  return (
    <div
      className="flex overflow-hidden"
      style={{ background: "#ffffff", height: "calc(100vh - 64px)", marginTop: 64 }}
    >
      {/* LEFT SIDEBAR */}
      <aside className="flex-shrink-0 flex flex-col overflow-y-auto" style={{
        width: 220,
        background: "#f8fafc",
        borderRight: "1px solid #e2e8f0"
      }}>
        <div className="px-4 pt-5 pb-2">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Pathways</p>
          <nav className="space-y-0.5">
            {PATHWAYS.map(p => (
              <button
                key={p.id}
                onClick={() => handlePathwayChange(p.id)}
                className="w-full text-left px-3 py-2 rounded text-xs transition-colors"
                style={selectedPathway === p.id ? {
                  background: "rgba(37,99,235,0.08)",
                  color: "#2563EB",
                  borderLeft: "2px solid #2563EB"
                } : {
                  color: "#64748b",
                  borderLeft: "2px solid transparent"
                }}
              >
                <span className="font-mono font-semibold block">{p.name}</span>
                <span className="text-slate-400 text-[10px]">{p.category}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Drug Explorer */}
        <div style={{ borderTop: "1px solid #e2e8f0" }}>
          <button
            onClick={() => toggleSection('drug')}
            className="w-full flex items-center justify-between px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
            style={{ paddingLeft: 12, paddingRight: 12, paddingTop: 6, paddingBottom: 6 }}
          >
            <span className="flex items-center gap-1.5"><span>💊</span> Drug Explorer</span>
            {sectionOpen.drug ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
          {sectionOpen.drug && (
            <div className="px-4 pb-3">
              <p className="text-[10px] text-slate-400 mb-2 leading-relaxed">Type a drug name to see which proteins it targets and how the signal cascade is affected.</p>
              <DrugTargetPanel
                onDrugApplied={handleDrugApplied}
                onClear={() => setDrugOverlay(null)}
              />
            </div>
          )}
        </div>

        {/* HGT & Mutation */}
        <div style={{ borderTop: "1px solid #e2e8f0" }}>
          <button
            onClick={() => toggleSection('hgt')}
            className="w-full flex items-center justify-between px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
            style={{ paddingLeft: 12, paddingRight: 12, paddingTop: 6, paddingBottom: 6 }}
          >
            <span className="flex items-center gap-1.5"><span>🧬</span> HGT & Mutation</span>
            {sectionOpen.hgt ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
          {sectionOpen.hgt && (
            <div className="px-4 pb-3">
              <p className="text-[10px] text-slate-400 mb-2 leading-relaxed">HGT Layer reveals genes with evolutionary origins from other species. Mutation mode shows gain/loss-of-function variants.</p>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-500">🧬 HGT Layer</span>
                <button
                  onClick={() => setHgtActive(v => !v)}
                  className="relative inline-flex h-4 w-8 items-center rounded-full transition-colors"
                  style={{ background: hgtActive ? "#ff4081" : "#e2e8f0" }}
                >
                  <span className="inline-block h-3 w-3 rounded-full bg-white transition-transform" style={{ transform: hgtActive ? "translateX(18px)" : "translateX(2px)" }} />
                </button>
              </div>
              <div className="flex items-center gap-1 mt-2">
                <button onClick={() => setViewMode('wildtype')} className="flex-1 text-[10px] font-bold py-1 rounded" style={{ background: viewMode === 'wildtype' ? "#2563eb" : "#f1f5f9", color: viewMode === 'wildtype' ? "#fff" : "#64748b" }}>Wildtype</button>
                <button onClick={() => setViewMode('mutant')} className="flex-1 text-[10px] font-bold py-1 rounded" style={{ background: viewMode === 'mutant' ? "#dc2626" : "#f1f5f9", color: viewMode === 'mutant' ? "#fff" : "#64748b" }}>Mutant</button>
              </div>
              {viewMode === 'mutant' && (
                <div className="mt-2">
                  <p className="text-[10px] text-slate-400 mb-1">Cancer type filter</p>
                  <select
                    value={cancerTypeFilter}
                    onChange={e => setCancerTypeFilter(e.target.value)}
                    className="w-full text-[10px] px-2 py-1 rounded border"
                    style={{ background: '#fff', border: '1px solid #e2e8f0', color: '#0f172a' }}
                  >
                    <option value="">All cancer types</option>
                    <option value="pancreatic">Pancreatic</option>
                    <option value="lung">Lung</option>
                    <option value="colon">Colorectal</option>
                    <option value="breast">Breast</option>
                    <option value="melanoma">Melanoma</option>
                    <option value="prostate">Prostate</option>
                    <option value="ovarian">Ovarian</option>
                    <option value="renal">Renal</option>
                    <option value="leukemia">Leukemia</option>
                  </select>
                  <div className="flex items-center gap-2 mt-1.5">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#ea580c' }} />
                    <span className="text-[9px] text-slate-400">GOF (gain-of-function)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#94a3b8', border: '1.5px dashed #64748b' }} />
                    <span className="text-[9px] text-slate-400">LOF (loss-of-function)</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </aside>

      {/* CENTER PANEL */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Toolbar */}
        <div className="flex items-center gap-3 px-5 py-2.5 flex-shrink-0" style={{
          background: "#f8fafc",
          borderBottom: "1px solid #e2e8f0"
        }}>
          <span className="font-mono text-sm font-bold text-slate-900">{currentPathway?.name}</span>
          <span className="text-slate-300 text-xs">·</span>
          <span className="text-xs text-slate-400">{currentPathway?.category}</span>
          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={() => setShowOverlay(!showOverlay)}
              className="flex items-center gap-1.5 rounded text-xs transition-all"
              style={{
                paddingLeft: 12, paddingRight: 12, paddingTop: 6, paddingBottom: 6,
                alignItems: "center",
                ...(showOverlay ? {
                  background: "rgba(37,99,235,0.1)", color: "#2563EB", border: "1px solid rgba(37,99,235,0.25)"
                } : {
                  background: "#fff", color: "#64748b", border: "1px solid #e2e8f0"
                })
              }}
            >
              <Layers className="w-3.5 h-3.5" /> Overlay
            </button>
            <button
              onClick={() => setShowExplainer(!showExplainer)}
              className="flex items-center gap-1.5 rounded text-xs transition-all"
              style={{
                paddingLeft: 12, paddingRight: 12, paddingTop: 6, paddingBottom: 6,
                alignItems: "center",
                ...(showExplainer ? {
                  background: "rgba(37,99,235,0.08)", color: "#2563EB", border: "1px solid rgba(37,99,235,0.25)"
                } : {
                  background: "#fff", color: "#64748b", border: "1px solid #e2e8f0"
                })
              }}
            >
              AI Explain
            </button>
          </div>
        </div>

        {/* Pathway Canvas */}
        <div className="flex-1 overflow-hidden relative" style={{ background: "#ffffff" }}>
          <PathwayDiagram
            pathwayId={selectedPathway}
            selectedGene={selectedGene}
            onGeneClick={setSelectedGene}
            overlayData={overlayData}
            mutatedGenes={[]}
            knockedOutGenes={[]}
            highlightedGenes={[]}
            drugOverlay={drugOverlay}
            hgtActive={hgtActive}
            viewMode={viewMode}
            onPlaySignal={handlePlaySignal}
            externalSignalGene={signalGene}
            cancerTypeFilter={cancerTypeFilter}
          />

          {/* Inline legend — always visible, top-right of canvas */}
          <div style={{
            position: "absolute",
            top: 12,
            right: 12,
            zIndex: 10,
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: 8,
            padding: "10px 12px",
            pointerEvents: "none"
          }}>
            <div className="space-y-1.5 mb-2">
              {LEGEND.map(l => (
                <div key={l.label} className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ background: l.color }} />
                  <span className="text-[10px] text-slate-500">{l.label}</span>
                </div>
              ))}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-8 h-0.5" style={{ background: "#94a3b8" }} />
                <span className="text-[10px] text-slate-400">Activation</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-0.5" style={{ borderTop: "1px dashed #94a3b8" }} />
                <span className="text-[10px] text-slate-400">Inhibition</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom panels */}
        {(showOverlay || showExplainer) && (
          <div className="flex-shrink-0 border-t" style={{ borderColor: "#e2e8f0", maxHeight: 280, overflowY: "auto", background: "#f8fafc" }}>
            <div className="p-4 space-y-4">
              {showOverlay && (
                <DataOverlayPanel
                  onDataUpload={setOverlayData}
                  overlayData={overlayData}
                  onClearData={() => setOverlayData(null)}
                />
              )}
              {showExplainer && (
                <PathwayExplainer pathwayId={selectedPathway} pathwayData={{ pathway: selectedPathway }} />
              )}
            </div>
          </div>
        )}
      </main>

      {/* RIGHT PANEL */}
      <aside className="flex-shrink-0 overflow-y-auto" style={{
        width: 300,
        background: "#f8fafc",
        borderLeft: "1px solid #e2e8f0"
      }}>
        <AnimatePresence mode="wait">
          {selectedGene ? (
            <GeneInfoPanel
              key={selectedGene.name}
              gene={selectedGene}
              onClose={() => setSelectedGene(null)}
              onBookmark={() => {}}
              isBookmarked={false}
              onPlaySignal={handlePlaySignal}
              hgtActive={hgtActive}
            />
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.1 }}
              className="flex flex-col items-center justify-center h-full p-8 text-center"
              style={{ minHeight: 400 }}
            >
              <div className="w-10 h-10 rounded mb-4 flex items-center justify-center" style={{ background: "rgba(37,99,235,0.08)", border: "1px solid rgba(37,99,235,0.15)" }}>
                <Circle className="w-5 h-5 text-blue-400" />
              </div>
              <p className="font-mono text-xs text-slate-400 mb-2">SELECT NODE</p>
              <p className="text-xs text-slate-400 leading-relaxed">Click any gene in the pathway diagram to view molecular data, mutations, and clinical associations.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </aside>
    </div>
  );
}