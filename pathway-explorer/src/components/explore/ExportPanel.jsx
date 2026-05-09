
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Download, X, CheckCircle } from "lucide-react";
import { pathwayData } from "./pathwayData";

export default function ExportPanel({ pathwayId, onClose }) {
  const [exportStatus, setExportStatus] = useState(null);
  const pathway = pathwayData[pathwayId];

  const exportToFormat = (format) => {
    setExportStatus("exporting");
    
    setTimeout(() => {
      let content, filename;
      
      switch (format) {
        case "sbml":
          content = generateSBML(pathway);
          filename = `${pathwayId}_pathway.xml`;
          break;
        case "graphml":
          content = generateGraphML(pathway);
          filename = `${pathwayId}_pathway.graphml`;
          break;
        case "biopax":
          content = generateBioPAX(pathway);
          filename = `${pathwayId}_pathway.owl`;
          break;
        default:
          return;
      }

      const blob = new Blob([content], { type: 'text/xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);

      setExportStatus("success");
      setTimeout(() => setExportStatus(null), 3000);
    }, 1000);
  };

  const generateSBML = (pathway) => {
    return `<?xml version="1.0" encoding="UTF-8"?>
<sbml xmlns="http://www.sbml.org/sbml/level3/version2/core" level="3" version="2">
  <model id="${pathway.name.replace(/\s+/g, '_')}" name="${pathway.name}">
    <listOfSpecies>
      ${pathway.genes.map(gene => `
      <species id="${gene.name}" name="${gene.fullName}" compartment="cell" hasOnlySubstanceUnits="false" boundaryCondition="false" constant="false"/>
      `).join('')}
    </listOfSpecies>
    <listOfReactions>
      ${pathway.connections.map((conn, idx) => `
      <reaction id="reaction_${idx}" reversible="false">
        <listOfReactants>
          <speciesReference species="${conn.from}" stoichiometry="1"/>
        </listOfReactants>
        <listOfProducts>
          <speciesReference species="${conn.to}" stoichiometry="1"/>
        </listOfProducts>
      </reaction>
      `).join('')}
    </listOfReactions>
  </model>
</sbml>`;
  };

  const generateGraphML = (pathway) => {
    return `<?xml version="1.0" encoding="UTF-8"?>
<graphml xmlns="http://graphml.graphdrawing.org/xmlns">
  <graph id="${pathway.name}" edgedefault="directed">
    <key id="name" for="node" attr.name="name" attr.type="string"/>
    <key id="function" for="node" attr.name="function" attr.type="string"/>
    <key id="interaction" for="edge" attr.name="interaction" attr.type="string"/>
    <graph id="${pathway.name.replace(/\s+/g, '_')}" edgedefault="directed">
    ${pathway.genes.map(gene => `
    <node id="${gene.name}">
      <data key="name">${gene.fullName}</data>
      <data key="function">${gene.function}</data>
    </node>
    `).join('')}
    ${pathway.connections.map((conn, idx) => `
    <edge id="e${idx}" source="${conn.from}" target="${conn.to}">
      <data key="interaction">${conn.type}</data>
    </edge>
    `).join('')}
  </graph>
</graphml>`;
  };

  const generateBioPAX = (pathway) => {
    return `<?xml version="1.0" encoding="UTF-8"?>
<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
         xmlns:bp="http://www.biopax.org/release/biopax-level3.owl#">
  <bp:Pathway rdf:about="#${pathway.name.replace(/\s+/g, '_')}">
    <bp:displayName>${pathway.name}</bp:displayName>
    <bp:comment>${pathway.description}</bp:comment>
    ${pathway.genes.map(gene => `
    <bp:pathwayComponent>
      <bp:Protein rdf:about="#${gene.name}">
        <bp:displayName>${gene.fullName}</bp:displayName>
      </bp:Protein>
    </bp:pathwayComponent>
    `).join('')}
  </bp:Pathway>
</rdf:RDF>`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="mb-6"
    >
      <Card className="border-2 border-[#5db8ff]/20 bg-white shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg sm:text-xl text-slate-900">Export Pathway</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-xs sm:text-sm text-slate-600">
            Download this pathway in standard bioinformatics formats for use in external analysis tools.
          </p>

          <div className="grid gap-3">
            <Button
              onClick={() => exportToFormat("sbml")}
              className="w-full justify-start text-left bg-white border-2 border-[#5db8ff] text-[#5db8ff] hover:bg-[#5db8ff]/10"
              disabled={exportStatus === "exporting"}
            >
              <Download className="w-4 h-4 mr-2" />
              <div>
                <div className="font-semibold text-sm">SBML (Systems Biology Markup Language)</div>
                <div className="text-xs opacity-70">Standard format for computational models</div>
              </div>
            </Button>

            <Button
              onClick={() => exportToFormat("graphml")}
              className="w-full justify-start text-left bg-white border-2 border-[#5db8ff] text-[#5db8ff] hover:bg-[#5db8ff]/10"
              disabled={exportStatus === "exporting"}
            >
              <Download className="w-4 h-4 mr-2" />
              <div>
                <div className="font-semibold text-sm">GraphML</div>
                <div className="text-xs opacity-70">Graph visualization format</div>
              </div>
            </Button>

            <Button
              onClick={() => exportToFormat("biopax")}
              className="w-full justify-start text-left bg-white border-2 border-[#5db8ff] text-[#5db8ff] hover:bg-[#5db8ff]/10"
              disabled={exportStatus === "exporting"}
            >
              <Download className="w-4 h-4 mr-2" />
              <div>
                <div className="font-semibold text-sm">BioPAX</div>
                <div className="text-xs opacity-70">Biological pathway exchange format</div>
              </div>
            </Button>
          </div>

          {exportStatus === "success" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 p-3 bg-green-50 border border-green-300 rounded-lg text-green-700 text-sm"
            >
              <CheckCircle className="w-4 h-4" />
              Export successful! Check your downloads.
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
