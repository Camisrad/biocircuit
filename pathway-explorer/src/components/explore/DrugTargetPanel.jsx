import { useState } from "react";
import { lookupDrug } from "./drugTargetData";
import { Pill, X, CheckCircle, AlertCircle } from "lucide-react";

export default function DrugTargetPanel({ onDrugApplied, onClear }) {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [applied, setApplied] = useState(false);
  const [compareMode, setCompareMode] = useState(false);
  const [input2, setInput2] = useState("");
  const [result2, setResult2] = useState(null);
  const [notFound2, setNotFound2] = useState(false);

  const handleApply = () => {
    const drug = lookupDrug(input);
    if (drug) {
      setResult(drug);
      setNotFound(false);
      setApplied(true);
      onDrugApplied({ targetGenes: drug.targets, drugName: drug.name || input });
    } else {
      setResult(null);
      setNotFound(true);
      setApplied(false);
    }
  };

  const handleClear = () => {
    setInput("");
    setResult(null);
    setNotFound(false);
    setApplied(false);
    setInput2("");
    setResult2(null);
    setNotFound2(false);
    setCompareMode(false);
    onClear();
  };

  const handleApply2 = () => {
    const drug = lookupDrug(input2);
    if (drug) {
      setResult2(drug);
      setNotFound2(false);
    } else {
      setResult2(null);
      setNotFound2(true);
    }
  };

  return (
    <div>
      <div className="flex gap-1">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleApply()}
          placeholder="e.g. vemurafenib..."
          className="flex-1 text-xs px-2 py-1.5 rounded border text-slate-700 placeholder-slate-300"
          style={{ background: "#fff", border: "1px solid #e2e8f0", fontSize: "11px", minWidth: 0 }}
        />
        <button onClick={handleApply} className="px-2 py-1 text-xs font-bold text-white rounded" style={{ background: "#2563eb", flexShrink: 0 }}>Go</button>
        {applied && <button onClick={handleClear} className="px-2 py-1 text-xs rounded" style={{ background: "#f1f5f9", color: "#64748b" }}><X className="w-3 h-3" /></button>}
      </div>

      {notFound && (
        <div className="mt-2 flex items-start gap-1.5 p-2 rounded text-xs" style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.2)", color: "#dc2626" }}>
          <AlertCircle className="w-3 h-3 mt-0.5 flex-shrink-0" />
          Not found. Try: vemurafenib, imatinib, olaparib…
        </div>
      )}

      {result && (
        <div className="mt-2 p-2.5 rounded" style={{ background: 'rgba(22,163,74,0.05)', border: '1px solid rgba(22,163,74,0.2)' }}>
          <div className="flex items-center gap-1.5 mb-1.5">
            <CheckCircle className="w-3 h-3 text-emerald-500 flex-shrink-0" />
            <span className="text-xs font-bold text-slate-800 capitalize">{result.name || input}</span>
            <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded font-bold" style={result.fdaApproved
              ? { background: 'rgba(22,163,74,0.1)', color: '#15803d' }
              : { background: 'rgba(234,179,8,0.1)', color: '#b45309' }}>
              {result.fdaApproved ? 'FDA ✓' : 'Research'}
            </span>
          </div>
          <p className="text-[10px] text-slate-500 leading-relaxed mb-1.5">{result.mechanism}</p>
          <p className="text-[10px] text-slate-400 mb-1.5">Indication: {result.indication}</p>
          <div className="flex flex-wrap gap-1 mb-2">
            {result.targets.map(t => (
              <span key={t} className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded" style={{ background: 'rgba(37,99,235,0.1)', color: '#2563eb', border: '1px solid rgba(37,99,235,0.2)' }}>{t}</span>
            ))}
          </div>
          {!compareMode && (
            <button onClick={() => setCompareMode(true)} className="text-[10px] font-semibold px-2 py-0.5 rounded w-full mt-1" style={{ background: 'rgba(139,92,246,0.08)', color: '#7c3aed', border: '1px solid rgba(139,92,246,0.2)' }}>
              + Compare with another drug
            </button>
          )}
        </div>
      )}

      {compareMode && (
        <div className="mt-2 p-2.5 rounded" style={{ background: 'rgba(139,92,246,0.04)', border: '1px solid rgba(139,92,246,0.2)' }}>
          <p className="text-[10px] font-bold text-purple-600 mb-1.5">Compare Drug 2</p>
          <div className="flex gap-1 mb-1.5">
            <input
              type="text"
              value={input2}
              onChange={e => setInput2(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleApply2()}
              placeholder="e.g. trametinib..."
              className="flex-1 text-xs px-2 py-1.5 rounded border"
              style={{ background: '#fff', border: '1px solid #e2e8f0', fontSize: '11px', minWidth: 0 }}
            />
            <button onClick={handleApply2} className="px-2 py-1 text-xs font-bold text-white rounded" style={{ background: '#7c3aed', flexShrink: 0 }}>Go</button>
          </div>
          {notFound2 && <p className="text-[10px] text-red-500">Drug not found.</p>}
          {result2 && (
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-xs font-bold capitalize" style={{ color: '#7c3aed' }}>{result2.name || input2}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded font-bold" style={result2.fdaApproved ? { background: 'rgba(22,163,74,0.1)', color: '#15803d' } : { background: 'rgba(234,179,8,0.1)', color: '#b45309' }}>
                  {result2.fdaApproved ? 'FDA ✓' : 'Research'}
                </span>
              </div>
              <p className="text-[10px] text-slate-500 mb-1.5">{result2.mechanism}</p>
              <div className="flex flex-wrap gap-1">
                {result2.targets.map(t => (
                  <span key={t} className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded" style={{ background: 'rgba(139,92,246,0.1)', color: '#7c3aed', border: '1px solid rgba(139,92,246,0.2)' }}>{t}</span>
                ))}
              </div>
              <p className="text-[10px] text-slate-400 mt-1.5">
                Overlap: {result.targets.filter(t => result2.targets.includes(t)).join(', ') || 'None'}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}