import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AlphaFoldPanel from "./AlphaFoldPanel";
import { hgtData, hgtEvidenceLevels } from "./hgtData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { X, ExternalLink, Dna, AlertCircle, Activity, Pill, FlaskConical, Dna as DnaIcon } from "lucide-react";
import { geneMetadata } from "./geneMetadata";

export default function GeneInfoPanel({ gene, onClose, onBookmark, isBookmarked, onPlaySignal, hgtActive }) {
  const meta = geneMetadata[gene.name] || {};
  const [showAlphaFold, setShowAlphaFold] = useState(false);
  const hgt = hgtData[gene.name];
  const cancerTypeColors = {
    breast: "bg-pink-900/30 text-pink-400 border-pink-500/50",
    lung: "bg-blue-900/30 text-blue-400 border-blue-500/50",
    colon: "bg-amber-900/30 text-amber-400 border-amber-500/50",
    pancreatic: "bg-orange-900/30 text-orange-400 border-orange-500/50",
    ovarian: "bg-purple-900/30 text-purple-400 border-purple-500/50",
    prostate: "bg-indigo-900/30 text-indigo-400 border-indigo-500/50",
    melanoma: "bg-slate-900/30 text-slate-400 border-slate-500/50",
    renal: "bg-teal-900/30 text-teal-400 border-teal-500/50",
    gastric: "bg-green-900/30 text-green-400 border-green-500/50",
    thyroid: "bg-cyan-900/30 text-cyan-400 border-cyan-500/50",
    sarcoma: "bg-red-900/30 text-red-400 border-red-500/50",
    lymphoma: "bg-violet-900/30 text-violet-400 border-violet-500/50",
    leukemia: "bg-rose-900/30 text-rose-400 border-rose-500/50",
    various: "bg-slate-900/30 text-slate-400 border-slate-500/50",
    hematologic: "bg-fuchsia-900/30 text-fuchsia-400 border-fuchsia-500/50",
    endometrial: "bg-pink-900/30 text-pink-400 border-pink-500/50",
    "head and neck": "bg-yellow-900/30 text-yellow-400 border-yellow-500/50",
    "T-cell ALL": "bg-purple-900/30 text-purple-400 border-purple-500/50",
    "renal cell carcinoma": "bg-teal-900/30 text-teal-400 border-teal-500/50",
    "basal cell carcinoma": "bg-orange-900/30 text-orange-400 border-orange-500/50",
    medulloblastoma: "bg-indigo-900/30 text-indigo-400 border-indigo-500/50",
    myeloproliferative: "bg-red-900/30 text-red-400 border-red-500/50",
    cholangiocarcinoma: "bg-amber-900/30 text-amber-400 border-amber-500/50",
    AML: "bg-rose-900/30 text-rose-400 border-rose-500/50",
    bladder: "bg-cyan-900/30 text-cyan-400 border-cyan-500/50",
    retinoblastoma: "bg-blue-900/30 text-blue-400 border-blue-500/50",
    osteosarcoma: "bg-slate-900/30 text-slate-400 border-slate-500/50",
    esophageal: "bg-orange-900/30 text-orange-400 border-orange-500/50",
    stomach: "bg-green-900/30 text-green-400 border-green-500/50",
    brain: "bg-purple-900/30 text-purple-400 border-purple-500/50",
    liver: "bg-amber-900/30 text-amber-400 border-amber-500/50"
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.3 }}
      className="sticky top-24"
    >
      <Card className="border-2 border-[#5db8ff]/30 bg-white overflow-hidden shadow-2xl">
        <CardHeader 
          className="relative p-6 overflow-hidden"
          style={{ 
            background: `linear-gradient(135deg, ${gene.color}, ${gene.color}dd)`,
          }}
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-4 right-4 z-10 text-white hover:bg-white/20"
          >
            <X className="w-5 h-5" />
          </Button>
          <CardTitle className="text-2xl font-bold mb-2 relative z-10 text-white">
            {gene.name}
          </CardTitle>
          <p className="text-sm opacity-95 relative z-10 text-white">{gene.fullName}</p>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          {/* Function Section */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-[#5db8ff]/20 rounded-lg flex items-center justify-center border-2 border-[#5db8ff]/40">
                <Dna className="w-5 h-5 text-[#5db8ff]" />
              </div>
              <h3 className="font-semibold text-slate-900">Biological Function</h3>
            </div>
            <p className="text-slate-700 leading-relaxed">
              {gene.function}
            </p>
          </div>

          {/* Cancer Role Section */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center border-2 border-red-300">
                <AlertCircle className="w-5 h-5 text-red-600" />
              </div>
              <h3 className="font-semibold text-slate-900">Role in Cancer</h3>
            </div>
            <p className="text-slate-700 leading-relaxed">
              {gene.cancerRole}
            </p>
          </div>

          {/* Associated Cancer Types */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center border-2 border-purple-300">
                <Activity className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="font-semibold text-slate-900">Associated Cancers</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {gene.cancerTypes.map(type => (
                <Badge
                  key={type}
                  className={`${cancerTypeColors[type] || cancerTypeColors.various} capitalize border font-semibold`}
                >
                  {type}
                </Badge>
              ))}
            </div>
          </div>

          {/* Mutations */}
          {meta.mutations && meta.mutations.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center border-2 border-amber-300">
                  <span className="text-amber-600 font-bold text-xs">MUT</span>
                </div>
                <h3 className="font-semibold text-slate-900">Key Mutations</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {meta.mutations.map(m => (
                  <span key={m} className="text-xs px-2 py-1 bg-amber-50 border border-amber-200 text-amber-800 rounded-lg font-mono font-semibold">{m}</span>
                ))}
              </div>
            </div>
          )}

          {/* Drugs */}
          {meta.drugs && meta.drugs.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center border-2 border-green-300">
                  <Pill className="w-4 h-4 text-green-600" />
                </div>
                <h3 className="font-semibold text-slate-900">Targeted Therapies</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {meta.drugs.map(d => (
                  <span key={d} className="text-xs px-2 py-1 bg-green-50 border border-green-200 text-green-800 rounded-lg font-semibold">{d}</span>
                ))}
              </div>
            </div>
          )}

          {/* Database Links */}
          <div className="pt-4 border-t border-slate-200">
            <h3 className="font-semibold text-slate-900 mb-3">Authoritative Databases</h3>
            <div className="grid grid-cols-2 gap-2">
              <a href={gene.source} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:bg-[#5db8ff]/5 hover:border-[#5db8ff]/30 transition-colors">
                <ExternalLink className="w-3 h-3 text-[#5db8ff]" /> NCBI Gene
              </a>
              {meta.uniprot && (
                <a href={meta.uniprot} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:bg-[#5db8ff]/5 hover:border-[#5db8ff]/30 transition-colors">
                  <ExternalLink className="w-3 h-3 text-yellow-500" /> UniProt
                </a>
              )}
              {meta.kegg && (
                <a href={meta.kegg} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:bg-[#5db8ff]/5 hover:border-[#5db8ff]/30 transition-colors">
                  <ExternalLink className="w-3 h-3 text-green-500" /> KEGG
                </a>
              )}
              {meta.reactome && (
                <a href={meta.reactome} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:bg-[#5db8ff]/5 hover:border-[#5db8ff]/30 transition-colors">
                  <ExternalLink className="w-3 h-3 text-purple-500" /> Reactome
                </a>
              )}
              {meta.cosmic && (
                <a href={meta.cosmic} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:bg-[#5db8ff]/5 hover:border-[#5db8ff]/30 transition-colors">
                  <ExternalLink className="w-3 h-3 text-red-500" /> COSMIC
                </a>
              )}
            </div>
          </div>

          {/* Signal + AlphaFold buttons */}
          <div className="flex gap-2 flex-wrap">
            {onPlaySignal && (
              <button
                onClick={() => {
                  console.log('🔵 GeneInfoPanel: onPlaySignal called with', gene.name);
                  onPlaySignal(gene.name);
                }}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold text-white transition-all"
                style={{ background: gene.color }}
              >
                ▶ Animate Signal Flow
              </button>
            )}
            <button
              onClick={() => setShowAlphaFold(v => !v)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all"
              style={{ background: showAlphaFold ? "rgba(37,99,235,0.12)" : "#f1f5f9", color: showAlphaFold ? "#2563eb" : "#64748b", border: "1px solid #e2e8f0" }}
            >
              🔬 {showAlphaFold ? "Hide" : "View"} AlphaFold Structure
            </button>
          </div>

          <AnimatePresence>
            {showAlphaFold && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{ overflow: "hidden" }}
              >
                <AlphaFoldPanel gene={gene} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* HGT Evolutionary Provenance */}
          {hgtActive && hgt && (
            <div className="rounded-lg p-4" style={{ background: "rgba(255,64,129,0.04)", border: "1px solid rgba(255,64,129,0.2)" }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#ff4081" }}>🧬 Evolutionary Provenance</p>
              <p className="text-xs text-slate-600 leading-relaxed mb-2">{hgt.evidenceNote}</p>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs px-2 py-0.5 rounded font-bold" style={{ background: "rgba(255,64,129,0.1)", color: "#ff4081" }}>{hgtEvidenceLevels[hgt.hgtEvidence]?.label}</span>
                <span className="text-xs text-slate-400">{Math.round(hgt.confidence * 100)}% confidence</span>
              </div>
              <p className="text-xs text-slate-400 mb-2">Donor lineage: <span className="text-slate-600 font-medium">{hgt.donorLineage}</span></p>
              <a
                href={`https://pubmed.ncbi.nlm.nih.gov/${hgt.pmid}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold flex items-center gap-1"
                style={{ color: "#2563eb" }}
              >
                <ExternalLink className="w-3 h-3" /> PubMed →
              </a>
            </div>
          )}

          {/* Additional Info Box */}
          <div className="bg-gradient-to-r from-[#5db8ff]/10 to-[#a78bfa]/10 rounded-lg p-4 border-2 border-[#5db8ff]/20">
            <p className="text-sm text-slate-700 leading-relaxed">
              <strong className="text-[#4a9dcc]">Clinical Note:</strong> Mutations in {gene.name} can be 
              detected through genomic testing and may guide targeted therapy selection or 
              cancer risk assessment.
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}