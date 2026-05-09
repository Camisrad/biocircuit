
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Network } from "lucide-react";

const pathways = [
  { id: "p53", name: "p53 Tumor Suppressor", color: "from-red-500 to-orange-500", category: "Cell Death" },
  { id: "mapk", name: "MAPK/ERK Signaling", color: "from-blue-500 to-cyan-500", category: "Growth" },
  { id: "pi3k", name: "PI3K/AKT/mTOR", color: "from-purple-500 to-pink-500", category: "Survival" },
  { id: "wnt", name: "Wnt/β-Catenin", color: "from-amber-500 to-yellow-500", category: "Development" },
  { id: "tgfb", name: "TGF-β/SMAD", color: "from-green-500 to-emerald-500", category: "Growth Control" },
  { id: "brca", name: "BRCA DNA Repair", color: "from-pink-500 to-rose-500", category: "DNA Repair" },
  { id: "cell_cycle", name: "Cell Cycle Checkpoint", color: "from-indigo-500 to-blue-500", category: "Division" },
  { id: "jak_stat", name: "JAK/STAT", color: "from-cyan-500 to-teal-500", category: "Cytokine" },
  { id: "nfkb", name: "NF-κB Inflammatory", color: "from-orange-500 to-red-500", category: "Inflammation" },
  { id: "hedgehog", name: "Hedgehog Signaling", color: "from-violet-500 to-purple-500", category: "Development" },
  { id: "notch", name: "Notch Signaling", color: "from-fuchsia-500 to-pink-500", category: "Differentiation" },
  { id: "hif", name: "HIF Hypoxia Response", color: "from-slate-500 to-gray-500", category: "Oxygen" },
  { id: "mmr", name: "DNA Mismatch Repair", color: "from-blue-500 to-indigo-500", category: "DNA Repair" },
  { id: "apoptosis", name: "Apoptosis Cascade", color: "from-red-500 to-pink-500", category: "Cell Death" },
  { id: "vegf", name: "VEGF Angiogenesis", color: "from-green-500 to-lime-500", category: "Vascularization" },
  { id: "met", name: "MET/HGF Pathway", color: "from-teal-500 to-cyan-500", category: "Growth" },
  { id: "alk", name: "ALK Fusion Pathway", color: "from-purple-500 to-violet-500", category: "Growth" },
  { id: "fgfr", name: "FGF/FGFR Signaling", color: "from-orange-500 to-amber-500", category: "Growth" },
  { id: "ras", name: "RAS/RAF Cascade", color: "from-blue-500 to-sky-500", category: "MAPK" },
  { id: "mtor", name: "mTOR Complex", color: "from-indigo-500 to-purple-500", category: "Metabolism" }
];

export default function PathwaySelector({ selectedPathway, onPathwayChange }) {
  const currentPathway = pathways.find(p => p.id === selectedPathway);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-3">
        <Network className="w-5 h-5 text-[#5db8ff]" />
        <span className="text-sm font-semibold text-slate-700">Select Pathway:</span>
        <Select value={selectedPathway} onValueChange={onPathwayChange}>
          <SelectTrigger className="w-64 bg-white border-2 border-[#5db8ff]/30 text-slate-900 font-medium hover:border-[#5db8ff]/50 smooth-transition">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-white border-2 border-[#5db8ff]/30 max-h-96 overflow-y-auto">
            {pathways.map((pathway) => (
              <SelectItem 
                key={pathway.id} 
                value={pathway.id}
                className="text-slate-900 focus:bg-[#5db8ff]/10 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${pathway.color}`} />
                  {pathway.name}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {currentPathway && (
        <Badge className={`bg-gradient-to-r ${currentPathway.color} text-white px-4 py-1 font-semibold shadow-md`}>
          {currentPathway.category}
        </Badge>
      )}
    </div>
  );
}
