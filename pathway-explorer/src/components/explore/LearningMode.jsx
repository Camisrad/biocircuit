import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, ChevronRight, ChevronLeft, X, GraduationCap, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { learningWalkthroughs } from "./geneMetadata";

export default function LearningMode({ onPathwayChange, onHighlightGenes, onClose }) {
  const [selectedWalkthrough, setSelectedWalkthrough] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);

  const walkthroughs = Object.entries(learningWalkthroughs).map(([key, val]) => ({ key, ...val }));

  const startWalkthrough = (wt) => {
    setSelectedWalkthrough(wt);
    setCurrentStep(0);
    onPathwayChange(wt.pathway);
    onHighlightGenes(wt.steps[0].highlight);
  };

  const goToStep = (idx) => {
    setCurrentStep(idx);
    onHighlightGenes(selectedWalkthrough.steps[idx].highlight);
  };

  const handleClose = () => {
    setSelectedWalkthrough(null);
    setCurrentStep(0);
    onHighlightGenes([]);
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="mb-6"
    >
      <Card className="border-2 border-[#5db8ff]/30 bg-gradient-to-br from-[#5db8ff]/5 to-white shadow-xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-[#5db8ff]" />
              <h3 className="font-bold text-slate-900 text-lg">Learning Mode</h3>
            </div>
            <Button variant="ghost" size="icon" onClick={handleClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          <AnimatePresence mode="wait">
            {!selectedWalkthrough ? (
              <motion.div key="select" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <p className="text-slate-600 text-sm mb-4">Choose a guided walkthrough to learn step-by-step how mutations drive cancer:</p>
                <div className="space-y-3">
                  {walkthroughs.map((wt) => (
                    <button
                      key={wt.key}
                      onClick={() => startWalkthrough(wt)}
                      className="w-full text-left p-4 rounded-xl border-2 border-[#5db8ff]/20 hover:border-[#5db8ff]/50 hover:bg-[#5db8ff]/5 transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <BookOpen className="w-5 h-5 text-[#5db8ff] flex-shrink-0" />
                        <span className="font-semibold text-slate-800 group-hover:text-[#4a9dcc]">{wt.title}</span>
                        <ChevronRight className="w-4 h-4 text-slate-400 ml-auto group-hover:text-[#5db8ff]" />
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div key="walkthrough" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <p className="text-xs font-semibold text-[#5db8ff] mb-1 uppercase tracking-wide">{selectedWalkthrough.title}</p>

                {/* Step progress */}
                <div className="flex gap-1.5 mb-4">
                  {selectedWalkthrough.steps.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goToStep(i)}
                      className={`h-1.5 flex-1 rounded-full transition-all ${i <= currentStep ? 'bg-[#5db8ff]' : 'bg-slate-200'}`}
                    />
                  ))}
                </div>

                {/* Current step content */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="bg-white rounded-xl border border-slate-200 p-4 mb-4"
                  >
                    <div className="flex items-start gap-2 mb-2">
                      {currentStep === selectedWalkthrough.steps.length - 1 ? (
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      ) : (
                        <span className="w-5 h-5 rounded-full bg-[#5db8ff] text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                          {currentStep + 1}
                        </span>
                      )}
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm mb-1">
                          {selectedWalkthrough.steps[currentStep].title}
                        </h4>
                        <p className="text-slate-600 text-sm leading-relaxed">
                          {selectedWalkthrough.steps[currentStep].description}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {selectedWalkthrough.steps[currentStep].highlight.map(g => (
                        <span key={g} className="text-xs px-2 py-0.5 bg-[#5db8ff]/10 border border-[#5db8ff]/30 text-[#4a9dcc] rounded-full font-semibold">{g}</span>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>

                <div className="flex items-center justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => currentStep === 0 ? setSelectedWalkthrough(null) : goToStep(currentStep - 1)}
                    className="border-[#5db8ff]/30 text-[#5db8ff]"
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    {currentStep === 0 ? "Back to list" : "Previous"}
                  </Button>
                  <span className="text-xs text-slate-500">{currentStep + 1} / {selectedWalkthrough.steps.length}</span>
                  {currentStep < selectedWalkthrough.steps.length - 1 ? (
                    <Button size="sm" onClick={() => goToStep(currentStep + 1)} className="bg-[#5db8ff] hover:bg-[#4a9dcc] text-white">
                      Next
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  ) : (
                    <Button size="sm" onClick={() => setSelectedWalkthrough(null)} className="bg-green-500 hover:bg-green-600 text-white">
                      Complete ✓
                    </Button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
}