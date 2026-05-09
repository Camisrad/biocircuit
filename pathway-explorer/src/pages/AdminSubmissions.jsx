import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { PathwaySubmission } from "@/api/entities";
import { useAuth } from "@/lib/AuthContext";
import { CheckCircle, XCircle, Eye, Clock, ChevronRight, X } from "lucide-react";

const STATUS_COLORS = {
  pending: { bg: "rgba(234,179,8,0.1)", border: "#fde68a", text: "#b45309", dot: "#d97706" },
  approved: { bg: "rgba(22,163,74,0.08)", border: "#bbf7d0", text: "#15803d", dot: "#16a34a" },
  integrated: { bg: "rgba(37,99,235,0.08)", border: "#bfdbfe", text: "#1d4ed8", dot: "#2563eb" },
};

function DetailModal({ submission, onClose }) {
  if (!submission) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.4)" }} onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        onClick={e => e.stopPropagation()}
        className="w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-2xl p-8"
        style={{ background: "#ffffff", border: "1px solid #e2e8f0" }}
      >
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900">{submission.pathway_name}</h2>
            <p className="text-sm text-slate-400 mt-1">{submission.submitter_name} · {submission.submitter_institution || "No institution"}</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors">
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        <div className="space-y-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Description</p>
            <p className="text-sm text-slate-600 leading-relaxed">{submission.description}</p>
          </div>
          {submission.cancer_type && (
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Cancer Type</p>
              <p className="text-sm text-slate-600">{submission.cancer_type}</p>
            </div>
          )}
          {submission.tags?.length > 0 && (
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Tags</p>
              <div className="flex flex-wrap gap-1.5">
                {submission.tags.map(tag => (
                  <span key={tag} className="text-xs px-2 py-0.5 rounded font-medium" style={{ background: "rgba(37,99,235,0.08)", color: "#2563eb", border: "1px solid rgba(37,99,235,0.2)" }}>{tag}</span>
                ))}
              </div>
            </div>
          )}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Pathway Data (JSON)</p>
            <pre className="text-xs overflow-x-auto rounded-lg p-4 max-h-60 overflow-y-auto" style={{ background: "#f8fafc", border: "1px solid #e2e8f0", color: "#2563eb" }}>
              {JSON.stringify(submission.pathway_data, null, 2)}
            </pre>
          </div>
          <div className="grid grid-cols-2 gap-4 pt-2" style={{ borderTop: "1px solid #e2e8f0" }}>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Organism</p>
              <p className="text-sm text-slate-600">{submission.organism || "Homo sapiens"}</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Country</p>
              <p className="text-sm text-slate-600">{submission.submitter_country || "—"}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function AdminSubmissions() {
  const { user } = useAuth();
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("pending");
  const queryClient = useQueryClient();

  const { data: submissions = [], isLoading } = useQuery({
    queryKey: ["pathwaySubmissions"],
    queryFn: () => PathwaySubmission.list(),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, status }) => PathwaySubmission.updateStatus(id, status),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["pathwaySubmissions"] }),
  });

  if (user?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#f8fafc" }}>
        <div className="text-center p-12 rounded-2xl" style={{ background: "#ffffff", border: "1px solid #e2e8f0" }}>
          <XCircle className="w-10 h-10 text-red-400 mx-auto mb-4" />
          <h2 className="text-lg font-bold text-slate-900 mb-2">Access Denied</h2>
          <p className="text-sm text-slate-400">Only administrators can access this page.</p>
        </div>
      </div>
    );
  }

  const filtered = submissions.filter(s => filter === "all" ? true : s.status === filter);
  const counts = { all: submissions.length, pending: submissions.filter(s => s.status === "pending").length, approved: submissions.filter(s => s.status === "approved").length, integrated: submissions.filter(s => s.status === "integrated").length };

  return (
    <div className="min-h-screen" style={{ background: "#f8fafc" }}>
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-1">Administration</p>
          <h1 className="text-2xl font-bold text-slate-900">Pathway Submissions</h1>
          <p className="text-sm text-slate-400 mt-1">Review and approve contributed pathway data.</p>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-6">
          {["all", "pending", "approved", "integrated"].map(tab => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className="px-4 py-2 rounded-lg text-xs font-semibold capitalize transition-all"
              style={filter === tab ? { background: "#2563eb", color: "#fff" } : { background: "#fff", color: "#64748b", border: "1px solid #e2e8f0" }}
            >
              {tab} ({counts[tab]})
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="text-center py-16 text-slate-400 text-sm">Loading submissions...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 rounded-2xl" style={{ background: "#fff", border: "1px solid #e2e8f0" }}>
            <Clock className="w-8 h-8 text-slate-200 mx-auto mb-3" />
            <p className="text-slate-400 text-sm">No {filter} submissions.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((sub, i) => {
              const sc = STATUS_COLORS[sub.status] || STATUS_COLORS.pending;
              return (
                <motion.div
                  key={sub.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="rounded-xl p-5 flex items-center gap-4"
                  style={{ background: "#ffffff", border: "1px solid #e2e8f0" }}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-slate-900 text-sm truncate">{sub.pathway_name}</h3>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold capitalize flex items-center gap-1" style={{ background: sc.bg, color: sc.text, border: `1px solid ${sc.border}` }}>
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: sc.dot }} />{sub.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">{sub.submitter_name} · {sub.submitter_institution || "No institution"} · {new Date(sub.created_date).toLocaleDateString()}</p>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-1">{sub.description}</p>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button onClick={() => setSelected(sub)} className="p-2 rounded-lg transition-colors hover:bg-slate-50" title="View details">
                      <Eye className="w-4 h-4 text-slate-400" />
                    </button>
                    {sub.status === "pending" && (
                      <>
                        <button
                          onClick={() => updateMutation.mutate({ id: sub.id, status: "approved" })}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                          style={{ background: "rgba(22,163,74,0.08)", color: "#15803d", border: "1px solid rgba(22,163,74,0.2)" }}
                        >
                          <CheckCircle className="w-3.5 h-3.5" /> Approve
                        </button>
                        <button
                          onClick={() => updateMutation.mutate({ id: sub.id, status: "integrated" })}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                          style={{ background: "rgba(37,99,235,0.08)", color: "#1d4ed8", border: "1px solid rgba(37,99,235,0.2)" }}
                        >
                          <ChevronRight className="w-3.5 h-3.5" /> Integrate
                        </button>
                      </>
                    )}
                    {sub.status === "approved" && (
                      <button
                        onClick={() => updateMutation.mutate({ id: sub.id, status: "integrated" })}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                        style={{ background: "rgba(37,99,235,0.08)", color: "#1d4ed8", border: "1px solid rgba(37,99,235,0.2)" }}
                      >
                        <ChevronRight className="w-3.5 h-3.5" /> Mark Integrated
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      <AnimatePresence>
        {selected && <DetailModal submission={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </div>
  );
}