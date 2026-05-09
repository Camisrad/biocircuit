import { ExternalLink, AlertCircle } from "lucide-react";
import { geneMetadata } from "./geneMetadata";

function getUniprotAccession(geneName) {
  const meta = geneMetadata[geneName];
  if (!meta?.uniprot) return null;
  return meta.uniprot.split("/").pop();
}

export default function AlphaFoldPanel({ gene }) {
  const accession = getUniprotAccession(gene.name);

  if (!accession) {
    return (
      <div className="flex items-start gap-2 p-3 rounded-lg mt-3" style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.2)" }}>
        <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-red-600">No UniProt entry found for {gene.name}. AlphaFold structure unavailable.</p>
      </div>
    );
  }

  return (
    <div className="mt-3 space-y-2">
      <a
        href={`https://alphafold.ebi.ac.uk/entry/${accession}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          background: "#eff6ff",
          border: "1px solid #bfdbfe",
          color: "#2563EB",
          borderRadius: 8,
          padding: "10px 16px",
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: 8,
          fontSize: 13,
          fontWeight: 600,
          textDecoration: "none"
        }}
      >
        <ExternalLink className="w-4 h-4 flex-shrink-0" />
        View 3D Structure on AlphaFold
      </a>
      <p className="text-[10px] text-slate-400">UniProt: <span className="font-mono font-bold text-slate-600">{accession}</span> · Structure predicted by AlphaFold2 (DeepMind / EMBL-EBI)</p>
    </div>
  );
}