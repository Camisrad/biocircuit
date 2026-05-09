import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, X, RotateCcw, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { downstreamEffects } from "./geneMetadata";

const SIMULATABLE_GENES = Object.keys(downstreamEffects);

export default function MutationSimulator({ currentPathwayGenes, onMutationChange, onClose }) {
  const [activeMutations, setActiveMutations] = useState({});
  const [selectedResult, setSelectedResult] = useState(null);

  const availableGenes = currentPathwayGenes?.filter(g => SIMULATABLE_GENES.includes(g.name)) || [];

  const toggleMutation = (gene) => {
    const effect = downstreamEffects[gene.name];
    const mutType = effect.knockedOut ? "knockedOut" : "activated";
    
    setActiveMutations(prev => {
      const updated = { ...prev };
      if (updated[gene.name]) {
        delete updated[gene.name];
      } else {
        updated[gene.name] = { type: mutType, effect: effect[mutType] };
      }
      
      // Collect all affected genes
      const allAffected = Object.values(updated).flatMap(m => m.effect.affected);
      onMutationChange(allAffected, Object.keys(updated));
      return updated;
    });
    
    setSelectedResult(gene.name);
  };

  const reset = () => {
    setActiveMutations({});
    setSelectedResult(null);
    onMutationChange([], []);
  };

  const activeCount = Object.keys(activeMutations).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="mb-6"
    >
      <Card className="border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-white shadow-xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-500" />
              <h3 className="font-bold text-slate-900 text-lg">"What If" Mutation Simulator</h3>
              {activeCount > 0 && (
                <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-bold rounded-full border border-amber-300">
                  {activeCount} active
                </span>
              )}
            </div>
            <div className="flex gap-2">
              {activeCount > 0 && (
                <Button variant="ghost" size="sm" onClick={reset} className="text-slate-500 h-8">
                  <RotateCcw className="w-3 h-3 mr-1" /> Reset
                </Button>
              )}
              <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <p className="text-slate-600 text-sm mb-4">Toggle mutations below to see their downstream effects highlighted on the pathway diagram.</p>

          {availableGenes.length === 0 ? (
            <p className="text-slate-400 text-sm text-center py-4">Switch to p53, MAPK, PI3K, Cell Cycle, or Apoptosis pathway to simulate mutations.</p>
          ) : (
            <div className="flex flex-wrap gap-2 mb-4">
              {availableGenes.map(gene => {
                const isActive = !!activeMutations[gene.name];
                const effect = downstreamEffects[gene.name];
                const mutType = effect.knockedOut ? "Knockout" : "Activating";
                return (
                  <button
                    key={gene.name}
                    onClick={() => toggleMutation(gene)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-semibold border-2 transition-all ${
                      isActive
                        ? 'bg-amber-100 border-amber-400 text-amber-800 shadow-md scale-105'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-amber-300'
                    }`}
                  >
                    {gene.name}
                    <span className={`ml-1.5 text-xs px-1 rounded ${isActive ? 'bg-amber-200 text-amber-700' : 'bg-slate-100 text-slate-500'}`}>
                      {mutType}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Result panel */}
          <AnimatePresence>
            {selectedResult && activeMutations[selectedResult] && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <div className="flex items-start gap-2 mb-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-amber-900 text-sm">
                        {selectedResult} — {activeMutations[selectedResult].type === "knockedOut" ? "Knockout" : "Activating Mutation"}
                      </h4>
                      <p className="text-amber-800 text-sm mt-1 leading-relaxed">
                        {activeMutations[selectedResult].effect.description}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-700 text-xs font-semibold">
                      Consequence: {activeMutations[selectedResult].effect.consequence}
                    </p>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1">
                    <span className="text-xs text-amber-700 font-semibold">Affected nodes: </span>
                    {activeMutations[selectedResult].effect.affected.map(g => (
                      <span key={g} className="text-xs px-1.5 py-0.5 bg-amber-200 text-amber-800 rounded font-semibold">{g}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
}