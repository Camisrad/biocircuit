import { useState } from "react";
import { motion } from "framer-motion";
import { Globe, MapPin, Users, TrendingUp } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { PathwaySubmission } from "@/api/entities";

export default function Network() {
  const { data: submissions = [] } = useQuery({
    queryKey: ['pathwaySubmissions'],
    queryFn: () => PathwaySubmission.list(),
    initialData: []
  });

  const stats = [
    { icon: Users, label: "Contributors", value: 1, color: "#3b82f6" },
    { icon: MapPin, label: "Countries", value: 1, color: "#a855f7" },
    { icon: Globe, label: "Pathways Shared", value: 20, color: "#06b6d4" },
    { icon: TrendingUp, label: "Growing Daily", value: "Active", color: "#22c55e" }
  ];

  return (
    <div className="min-h-screen" style={{ background: "#ffffff" }}>
      {/* Hero */}
      <div className="relative pt-6 pb-6 px-4 sm:px-6 lg:px-8 border-b" style={{ borderColor: "#e2e8f0", background: "#f8fafc" }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full" style={{ background: "rgba(37,99,235,0.08)", border: "1px solid rgba(37,99,235,0.2)" }}>
                <Globe className="w-3 h-3 text-blue-500" />
                <span className="text-xs font-semibold text-blue-600">Open Research Network</span>
              </div>
              <h1 className="text-xl font-bold text-slate-900">
                Global Research <span style={{ color: "#2563eb" }}>Network.</span>
              </h1>
            </div>
            <p className="text-sm text-slate-500 max-w-xl">Contributions from researchers worldwide building the most comprehensive open-access molecular pathway database.</p>
          </div>
        </div>
      </div>

      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">

          {/* Stats */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {stats.map((stat, index) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + index * 0.08 }}>
                <div className="p-6 rounded-xl text-center" style={{ background: "#f8fafc", border: `1px solid #e2e8f0` }}>
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-3" style={{ background: stat.color + "14", border: `1px solid ${stat.color}30` }}>
                    <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                  </div>
                  <div className="text-2xl font-bold text-slate-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-slate-500">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Globe visualization */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="mb-12">
            <div className="relative w-full h-56 rounded-xl flex items-center justify-center overflow-hidden" style={{
              background: "#f8fafc",
              border: "1px solid #e2e8f0"
            }}>
              <div className="relative z-10 text-center">
                <Globe className="w-14 h-14 mx-auto mb-3 text-blue-200" />
                <h3 className="text-lg font-bold text-slate-800 mb-1">Global Collaboration Map</h3>
                <p className="text-sm text-slate-400">Each node represents a research contribution</p>
              </div>
            </div>
          </motion.div>

          {/* Contributions */}
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-5">Recent Contributions</h2>
            {submissions.length === 0 ? (
              <div className="rounded-xl p-14 text-center" style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}>
                <Globe className="w-12 h-12 mx-auto mb-4 text-blue-200" />
                <p className="text-slate-400">No submissions yet. Be the first to contribute.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {submissions.map((submission, index) => (
                  <motion.div key={submission.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.04 }} viewport={{ once: true }}>
                    <div className="rounded-xl p-5 h-full flex flex-col" style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}>
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-blue-500" />
                          <span className="text-sm font-semibold text-blue-600">{submission.submitter_country || "Global"}</span>
                        </div>
                        <span className="text-xs text-slate-400">{new Date(submission.created_date).toLocaleDateString()}</span>
                      </div>
                      <h3 className="font-bold text-slate-900 mb-2 text-sm">{submission.pathway_name}</h3>
                      <p className="text-sm text-slate-500 leading-relaxed flex-1 mb-4 line-clamp-3">{submission.description}</p>
                      <div className="border-t pt-3" style={{ borderColor: "#e2e8f0" }}>
                        <p className="text-sm font-semibold text-slate-700">{submission.submitter_name}</p>
                        {submission.submitter_institution && <p className="text-xs text-slate-400 mt-0.5">{submission.submitter_institution}</p>}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}