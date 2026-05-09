
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { Code, X, Copy, CheckCircle } from "lucide-react";

export default function EmbedCodePanel({ pathwayId, onClose }) {
  const [copied, setCopied] = useState(false);

  const embedCode = `<iframe 
  src="${window.location.origin}/embed/pathway/${pathwayId}" 
  width="800" 
  height="600" 
  frameborder="0" 
  style="border: 1px solid #e2e8f0; border-radius: 0.5rem;"
  title="BioCircuit Pathway Viewer">
</iframe>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
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
          <CardTitle className="text-lg sm:text-xl text-slate-900 flex items-center gap-2">
            <Code className="w-5 h-5 text-[#5db8ff]" />
            Embed Pathway
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-xs sm:text-sm text-slate-600">
            Copy this code to embed the interactive pathway viewer on your website or blog.
          </p>

          <div className="relative">
            <Textarea
              value={embedCode}
              readOnly
              className="font-mono text-xs sm:text-sm h-32 sm:h-40 resize-none bg-slate-50 border-slate-300"
            />
            <Button
              onClick={handleCopy}
              size="sm"
              className="absolute top-2 right-2 bg-[#5db8ff] hover:bg-[#4a9dcc]"
            >
              {copied ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </>
              )}
            </Button>
          </div>

          <div className="bg-[#5db8ff]/10 border-2 border-[#5db8ff]/30 rounded-lg p-3 sm:p-4">
            <h4 className="font-semibold text-slate-900 mb-2 text-xs sm:text-sm">Preview:</h4>
            <div className="bg-white border border-slate-300 rounded p-2 sm:p-3">
              <div className="text-xs text-slate-600 text-center py-6 sm:py-8">
                Interactive pathway viewer will appear here
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-500">
            The embedded viewer is a simplified, read-only version optimized for external websites.
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
