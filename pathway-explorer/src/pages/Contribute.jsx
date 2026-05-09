import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, FileJson, CheckCircle, AlertCircle, Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { PathwaySubmission } from "@/api/entities";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function Contribute() {
  const [uploadState, setUploadState] = useState("idle");
  const [formData, setFormData] = useState({
    pathway_name: "", description: "", organism: "Homo sapiens",
    cancer_type: "", tags: "", submitter_name: "",
    submitter_institution: "", submitter_country: "", pathway_data: null
  });

  const queryClient = useQueryClient();

  const submitMutation = useMutation({
    mutationFn: (data) => PathwaySubmission.create(data),
    onSuccess: () => {
      setUploadState("success");
      queryClient.invalidateQueries({ queryKey: ['pathwaySubmissions'] });
      setTimeout(() => {
        setUploadState("idle");
        setFormData({ pathway_name: "", description: "", organism: "Homo sapiens", cancer_type: "", tags: "", submitter_name: "", submitter_institution: "", submitter_country: "", pathway_data: null });
      }, 3000);
    },
    onError: () => setUploadState("error")
  });

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        setFormData(prev => ({ ...prev, pathway_data: data }));
      } catch { setUploadState("error"); }
    };
    reader.readAsText(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploadState("uploading");
    const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
    submitMutation.mutate({ ...formData, tags: tagsArray, status: "pending" });
  };

  const exampleStructure = {
    pathway_name: "Custom_PI3K_Pathway",
    nodes: [
      { id: "PIK3CA", label: "PI3K", type: "kinase", expression: 0.75 },
      { id: "AKT1", label: "AKT", type: "kinase", expression: 0.67 }
    ],
    edges: [
      { source: "PIK3CA", target: "AKT1", interaction: "activation" }
    ]
  };

  const inputStyle = {
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    color: "#0f172a",
    borderRadius: "8px"
  };

  return (
    <div className="min-h-screen" style={{ background: "#ffffff" }}>
      {/* Hero */}
      <div className="relative pt-6 pb-6 px-4 sm:px-6 lg:px-8 border-b" style={{ borderColor: "#e2e8f0", background: "#f8fafc" }}>
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full" style={{ background: "rgba(37,99,235,0.08)", border: "1px solid rgba(37,99,235,0.2)" }}>
                <Upload className="w-3 h-3 text-blue-500" />
                <span className="text-xs font-semibold text-blue-600">Open Research Contribution</span>
              </div>
              <h1 className="text-xl font-bold text-slate-900">
                Contribute to <span style={{ color: "#2563eb" }}>BioCircuit.</span>
              </h1>
            </div>
            <p className="text-sm text-slate-500 max-w-xl">Upload your pathway data and join researchers worldwide building the most comprehensive open-access molecular pathway database.</p>
          </div>
        </div>
      </div>

      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">

            {/* Upload Form */}
            <div className="lg:col-span-2">
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <div className="rounded-xl p-8" style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "#2563EB" }}>
                      <Upload className="w-4 h-4 text-white" />
                    </div>
                    <h2 className="text-lg font-bold text-slate-900">Upload Your Pathway</h2>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* File Upload */}
                    <div>
                      <Label className="text-slate-600 mb-2 block font-medium text-sm">Pathway Data File (JSON)</Label>
                      <div className="relative border-2 border-dashed rounded-xl p-7 text-center transition-all cursor-pointer" style={{
                        borderColor: formData.pathway_data ? "#2563EB" : "#cbd5e1",
                        background: formData.pathway_data ? "rgba(37,99,235,0.03)" : "#ffffff"
                      }}>
                        <input type="file" accept=".json" onChange={handleFileUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" required />
                        <FileJson className="w-9 h-9 mx-auto mb-2" style={{ color: formData.pathway_data ? "#2563EB" : "#94a3b8" }} />
                        <p className="text-slate-700 font-medium text-sm">{formData.pathway_data ? "File uploaded successfully" : "Drop your JSON file here or click to browse"}</p>
                        <p className="text-xs text-slate-400 mt-1">Accepts .json with nodes and edges structure</p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-slate-600 font-medium text-sm">Pathway Name *</Label>
                        <Input value={formData.pathway_name} onChange={(e) => setFormData({ ...formData, pathway_name: e.target.value })} placeholder="e.g., Custom PI3K/AKT Pathway" required className="mt-1" style={inputStyle} />
                      </div>
                      <div>
                        <Label className="text-slate-600 font-medium text-sm">Organism</Label>
                        <Input value={formData.organism} onChange={(e) => setFormData({ ...formData, organism: e.target.value })} placeholder="Homo sapiens" className="mt-1" style={inputStyle} />
                      </div>
                    </div>

                    <div>
                      <Label className="text-slate-600 font-medium text-sm">Description *</Label>
                      <Textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Describe your pathway, its significance, and key findings..." rows={4} required className="mt-1" style={inputStyle} />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-slate-600 font-medium text-sm">Cancer Type (Optional)</Label>
                        <Input value={formData.cancer_type} onChange={(e) => setFormData({ ...formData, cancer_type: e.target.value })} placeholder="e.g., Breast, Lung, Colon" className="mt-1" style={inputStyle} />
                      </div>
                      <div>
                        <Label className="text-slate-600 font-medium text-sm">Tags (comma-separated)</Label>
                        <Input value={formData.tags} onChange={(e) => setFormData({ ...formData, tags: e.target.value })} placeholder="oncogenic, signaling, kinase" className="mt-1" style={inputStyle} />
                      </div>
                    </div>

                    <div className="pt-4" style={{ borderTop: "1px solid #e2e8f0" }}>
                      <h3 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-4">Contributor Info</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-slate-600 font-medium text-sm">Your Name *</Label>
                          <Input value={formData.submitter_name} onChange={(e) => setFormData({ ...formData, submitter_name: e.target.value })} placeholder="Full Name" required className="mt-1" style={inputStyle} />
                        </div>
                        <div>
                          <Label className="text-slate-600 font-medium text-sm">Institution (Optional)</Label>
                          <Input value={formData.submitter_institution} onChange={(e) => setFormData({ ...formData, submitter_institution: e.target.value })} placeholder="University or Organization" className="mt-1" style={inputStyle} />
                        </div>
                      </div>
                      <div className="mt-4">
                        <Label className="text-slate-600 font-medium text-sm">Country (Optional)</Label>
                        <Input value={formData.submitter_country} onChange={(e) => setFormData({ ...formData, submitter_country: e.target.value })} placeholder="Your country" className="mt-1" style={inputStyle} />
                      </div>
                    </div>

                    {uploadState === "success" && (
                      <div className="flex items-center gap-2 p-4 rounded-xl" style={{ background: "rgba(22,163,74,0.06)", border: "1px solid rgba(22,163,74,0.2)" }}>
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-green-700 font-medium text-sm">Pathway submitted successfully. Thank you for contributing.</span>
                      </div>
                    )}
                    {uploadState === "error" && (
                      <div className="flex items-center gap-2 p-4 rounded-xl" style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.2)" }}>
                        <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                        <span className="text-red-700 font-medium text-sm">Error uploading. Please check your data format.</span>
                      </div>
                    )}

                    <button type="submit" disabled={uploadState === "uploading" || !formData.pathway_data}
                      className="w-full py-3 text-white font-bold text-sm rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                      style={{ background: "#2563EB" }}>
                      {uploadState === "uploading" ? "Submitting..." : "Submit Pathway"}
                    </button>
                  </form>
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
                <div className="rounded-xl p-6" style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}>
                  <div className="flex items-center gap-2 mb-4">
                    <Info className="w-4 h-4 text-blue-500" />
                    <h3 className="font-bold text-slate-900 text-sm">Submission Guide</h3>
                  </div>
                  <ol className="space-y-3 text-sm text-slate-500">
                    {["Prepare your JSON file", "Upload the file above", "Fill in pathway details", "Add your information", "Click Submit Pathway"].map((step, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: "rgba(37,99,235,0.1)", color: "#2563EB" }}>{i + 1}</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
                <div className="rounded-xl p-6" style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}>
                  <div className="flex items-center gap-2 mb-4">
                    <FileJson className="w-4 h-4 text-blue-500" />
                    <h3 className="font-bold text-slate-900 text-sm">Example Structure</h3>
                  </div>
                  <pre className="text-xs overflow-x-auto rounded-lg p-3" style={{ background: "#ffffff", border: "1px solid #e2e8f0", color: "#2563EB" }}>
                    {JSON.stringify(exampleStructure, null, 2)}
                  </pre>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}