import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Dna } from "lucide-react";
import { pathwayData } from "./pathwayData";
import { geneMetadata } from "./geneMetadata";

export default function GeneSearch({ onSelectGene, onSelectPathway }) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // Build a flat index: gene name, cancer type, mutations
  const searchIndex = useMemo(() => {
    const results = [];
    Object.entries(pathwayData).forEach(([pathwayId, pathway]) => {
      pathway.genes.forEach(gene => {
        const meta = geneMetadata[gene.name] || {};
        results.push({
          gene,
          pathwayId,
          pathwayName: pathway.name,
          mutations: meta.mutations || [],
          drugs: meta.drugs || [],
        });
      });
    });
    return results;
  }, []);

  const filtered = useMemo(() => {
    if (!query.trim() || query.length < 2) return [];
    const q = query.toLowerCase();
    return searchIndex.filter(item =>
      item.gene.name.toLowerCase().includes(q) ||
      item.gene.fullName?.toLowerCase().includes(q) ||
      item.gene.cancerTypes?.some(c => c.toLowerCase().includes(q)) ||
      item.mutations.some(m => m.toLowerCase().includes(q)) ||
      item.drugs.some(d => d.toLowerCase().includes(q))
    ).slice(0, 10);
  }, [query, searchIndex]);

  const handleSelect = (item) => {
    onSelectPathway(item.pathwayId);
    setTimeout(() => onSelectGene(item.gene), 900);
    setQuery("");
    setIsOpen(false);
  };

  return (
    <div className="relative w-full max-w-lg mx-auto">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={query}
          onChange={e => { setQuery(e.target.value); setIsOpen(true); }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search gene (TP53), cancer type (breast), or mutation (KRAS G12D)..."
          className="w-full pl-10 pr-10 py-3 rounded-xl border-2 border-[#5db8ff]/30 focus:border-[#5db8ff] focus:outline-none text-sm bg-white shadow-sm"
        />
        {query && (
          <button onClick={() => { setQuery(""); setIsOpen(false); }} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && filtered.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute top-full mt-2 w-full bg-white rounded-xl border-2 border-[#5db8ff]/20 shadow-2xl z-50 overflow-hidden"
          >
            {filtered.map((item, idx) => (
              <button
                key={`${item.pathwayId}-${item.gene.name}-${idx}`}
                onClick={() => handleSelect(item)}
                className="w-full text-left px-4 py-3 hover:bg-[#5db8ff]/5 border-b border-slate-100 last:border-0 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: item.gene.color + '33', border: `2px solid ${item.gene.color}66` }}>
                    <Dna className="w-4 h-4" style={{ color: item.gene.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">{item.gene.name}</span>
                      <span className="text-xs text-slate-400 truncate">{item.gene.fullName}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-[#5db8ff] font-medium">{item.pathwayName}</span>
                      {item.mutations.slice(0, 2).map(m => (
                        <span key={m} className="text-xs px-1.5 py-0.5 bg-amber-50 border border-amber-200 text-amber-700 rounded font-mono">{m}</span>
                      ))}
                    </div>
                    {item.gene.cancerTypes && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {item.gene.cancerTypes.slice(0, 3).map(c => (
                          <span key={c} className="text-xs px-1.5 py-0.5 bg-pink-50 border border-pink-200 text-pink-700 rounded capitalize">{c}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}