import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, CheckCircle, Layers } from "lucide-react";

export default function DataOverlayPanel({ onDataUpload, overlayData, onClearData }) {
  const [uploadStatus, setUploadStatus] = useState("idle");

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target.result;
        let parsedData;

        if (file.name.endsWith('.json')) {
          parsedData = JSON.parse(text);
        } else if (file.name.endsWith('.csv')) {
          parsedData = parseCSV(text);
        } else {
          setUploadStatus("error");
          return;
        }

        onDataUpload(parsedData);
        setUploadStatus("success");
        setTimeout(() => setUploadStatus("idle"), 3000);
      } catch (error) {
        setUploadStatus("error");
        setTimeout(() => setUploadStatus("idle"), 3000);
      }
    };

    reader.readAsText(file);
  };

  const parseCSV = (text) => {
    const lines = text.split('\n');
    const headers = lines[0].split(',').map(h => h.trim());
    const data = {};

    for (let i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue;
      const values = lines[i].split(',');
      const geneName = values[0]?.trim();
      if (geneName) {
        data[geneName] = {
          expression: parseFloat(values[1]) || 0,
          mutation: values[2]?.trim() || "none"
        };
      }
    }

    return data;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <div className="rounded-2xl p-6 space-y-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
          <div className="flex items-center gap-2 mb-2">
            <Layers className="w-5 h-5 text-blue-400" />
            <h3 className="font-bold text-white text-sm">Data Overlay</h3>
          </div>
          {!overlayData ? (
            <>
              <p className="text-xs text-slate-500">
                Upload gene expression or mutation data to visualize on the pathway. 
                Genes will be color-coded based on your data values.
              </p>

              <div className="relative border-2 border-dashed rounded-xl p-6 text-center transition-colors cursor-pointer" style={{ borderColor: "rgba(37,99,235,0.3)", background: "rgba(37,99,235,0.05)" }}>
                <input
                  type="file"
                  accept=".json,.csv"
                  onChange={handleFileUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <Upload className="w-10 h-10 text-blue-400 mx-auto mb-3" />
                <p className="text-slate-300 font-medium mb-1 text-sm">Drop your data file here or click to browse</p>
                <p className="text-xs text-slate-600">Supports JSON and CSV formats</p>
              </div>

              <div className="rounded-xl p-3" style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <h4 className="font-semibold text-slate-400 mb-2 text-xs">Expected Format:</h4>
                <p className="text-xs text-slate-600 mb-2">CSV: GeneName, Expression, Mutation</p>
                <pre className="text-xs overflow-x-auto rounded p-2" style={{ background: "rgba(0,0,0,0.4)", color: "#93c5fd" }}>
{`TP53, 2.5, R175H
KRAS, 1.8, G12D
BRAF, 3.2, V600E`}
                </pre>
              </div>

              <AnimatePresence>
                {uploadStatus === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 p-3 rounded-lg text-xs" style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", color: "#fca5a5" }}
                  >
                    <X className="w-4 h-4" />
                    Error parsing file. Please check format.
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-2 p-3 rounded-xl" style={{ background: "rgba(22,163,74,0.08)", border: "1px solid rgba(22,163,74,0.2)" }}>
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-green-400">Data Loaded Successfully</p>
                  <p className="text-xs text-green-600">
                    {Object.keys(overlayData).length} genes mapped
                  </p>
                </div>
              </div>

              <div className="rounded-xl p-3" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <h4 className="font-semibold text-slate-400 mb-2 text-xs">Legend:</h4>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-red-500" /><span className="text-slate-500">High expression/mutation (&ge;2.0)</span></div>
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-yellow-500" /><span className="text-slate-500">Medium expression (1.0 to 2.0)</span></div>
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-green-500" /><span className="text-slate-500">Low expression (below 1.0)</span></div>
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-slate-600" /><span className="text-slate-500">No data</span></div>
                </div>
              </div>

              <button
                onClick={onClearData}
                className="w-full py-2.5 rounded-xl text-sm font-medium transition-all"
                style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", color: "#fca5a5" }}
              >
                Clear Data
              </button>
            </motion.div>
          )}
      </div>
    </motion.div>
  );
}