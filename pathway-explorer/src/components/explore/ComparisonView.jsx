
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload } from "lucide-react";
import { motion } from "framer-motion";
import PathwayDiagram from "./PathwayDiagram";

export default function ComparisonView({ pathwayId, comparisonData, onComparisonDataChange, onGeneClick }) {
  const [selectedGene, setSelectedGene] = useState(null);

  const handleFileUpload = (datasetNumber, file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target.result;
        let parsedData;

        if (file.name.endsWith('.json')) {
          parsedData = JSON.parse(text);
        } else if (file.name.endsWith('.csv')) {
          parsedData = parseCSV(text);
        }

        const updatedData = { ...comparisonData };
        if (datasetNumber === 1) {
          updatedData.dataset1 = parsedData;
        } else {
          updatedData.dataset2 = parsedData;
        }
        onComparisonDataChange(updatedData);
      } catch (error) {
        console.error("Error parsing file:", error);
      }
    };
    reader.readAsText(file);
  };

  const parseCSV = (text) => {
    const lines = text.split('\n');
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

  const handleGeneClick = (gene) => {
    setSelectedGene(gene);
    onGeneClick(gene);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
        {/* Dataset 1 */}
        <Card className="border-2 border-[#5db8ff]/20 bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-base sm:text-lg text-slate-900 flex items-center justify-between">
              <span>Dataset 1 (e.g., Healthy)</span>
              <span className="text-xs sm:text-sm font-normal text-slate-500">
                {comparisonData.dataset1 ? `${Object.keys(comparisonData.dataset1).length} genes` : 'No data'}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative border-2 border-dashed border-[#5db8ff] rounded-lg p-4 sm:p-6 text-center">
              <input
                type="file"
                accept=".json,.csv"
                onChange={(e) => handleFileUpload(1, e.target.files[0])}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <Upload className="w-8 h-8 sm:w-10 sm:h-10 text-[#5db8ff] mx-auto mb-2" />
              <p className="text-xs sm:text-sm text-slate-700">
                {comparisonData.dataset1 ? 'Data loaded ✓' : 'Upload data file'}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Dataset 2 */}
        <Card className="border-2 border-[#5db8ff]/20 bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-base sm:text-lg text-slate-900 flex items-center justify-between">
              <span>Dataset 2 (e.g., Disease)</span>
              <span className="text-xs sm:text-sm font-normal text-slate-500">
                {comparisonData.dataset2 ? `${Object.keys(comparisonData.dataset2).length} genes` : 'No data'}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative border-2 border-dashed border-[#5db8ff] rounded-lg p-4 sm:p-6 text-center">
              <input
                type="file"
                accept=".json,.csv"
                onChange={(e) => handleFileUpload(2, e.target.files[0])}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <Upload className="w-8 h-8 sm:w-10 sm:h-10 text-[#5db8ff] mx-auto mb-2" />
              <p className="text-xs sm:text-sm text-slate-700">
                {comparisonData.dataset2 ? 'Data loaded ✓' : 'Upload data file'}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Side-by-side Pathway Diagrams */}
      {(comparisonData.dataset1 || comparisonData.dataset2) && (
        <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
          <Card className="border-2 border-[#5db8ff]/20 bg-white overflow-hidden shadow-xl">
            <CardHeader className="bg-[#5db8ff]/10">
              <CardTitle className="text-sm sm:text-base text-slate-900">Dataset 1 View</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <PathwayDiagram
                pathwayId={pathwayId}
                selectedGene={selectedGene}
                onGeneClick={handleGeneClick}
                overlayData={comparisonData.dataset1}
              />
            </CardContent>
          </Card>

          <Card className="border-2 border-[#5db8ff]/20 bg-white overflow-hidden shadow-xl">
            <CardHeader className="bg-[#5db8ff]/10">
              <CardTitle className="text-sm sm:text-base text-slate-900">Dataset 2 View</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <PathwayDiagram
                pathwayId={pathwayId}
                selectedGene={selectedGene}
                onGeneClick={handleGeneClick}
                overlayData={comparisonData.dataset2}
              />
            </CardContent>
          </Card>
        </div>
      )}
    </motion.div>
  );
}
