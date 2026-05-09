import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bookmark, X, Trash2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const STORAGE_KEY = "biocircuit_bookmarks";

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); } catch { return []; }
  });

  const save = (bms) => {
    setBookmarks(bms);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bms));
  };

  const addBookmark = (pathwayId, pathwayName, geneName) => {
    const entry = { id: Date.now(), pathwayId, pathwayName, geneName, date: new Date().toLocaleDateString() };
    save([entry, ...bookmarks].slice(0, 20));
  };

  const removeBookmark = (id) => save(bookmarks.filter(b => b.id !== id));

  const isBookmarked = (pathwayId, geneName) =>
    bookmarks.some(b => b.pathwayId === pathwayId && b.geneName === geneName);

  return { bookmarks, addBookmark, removeBookmark, isBookmarked };
}

export default function BookmarksPanel({ bookmarks, onRemove, onNavigate, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="fixed right-4 top-28 w-80 z-40"
    >
      <Card className="border-2 border-[#5db8ff]/30 shadow-2xl bg-white">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-[#5db8ff]" />
              <h3 className="font-bold text-slate-900">Saved Sessions</h3>
              <span className="text-xs bg-[#5db8ff]/10 text-[#5db8ff] px-1.5 py-0.5 rounded-full font-semibold">{bookmarks.length}</span>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="h-7 w-7">
              <X className="w-3 h-3" />
            </Button>
          </div>

          {bookmarks.length === 0 ? (
            <p className="text-slate-400 text-sm text-center py-6">No saved sessions yet. Click the bookmark icon when viewing a gene to save it.</p>
          ) : (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {bookmarks.map(bm => (
                <div key={bm.id} className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200 hover:border-[#5db8ff]/30 transition-colors">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-slate-900 text-sm">{bm.geneName || "Pathway"}</span>
                    </div>
                    <p className="text-xs text-slate-500 truncate">{bm.pathwayName}</p>
                    <p className="text-xs text-slate-400">{bm.date}</p>
                  </div>
                  <div className="flex gap-1 flex-shrink-0">
                    <button
                      onClick={() => onNavigate(bm)}
                      className="p-1 hover:bg-[#5db8ff]/10 rounded text-[#5db8ff] transition-colors"
                      title="Go to pathway"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onRemove(bm.id)}
                      className="p-1 hover:bg-red-50 rounded text-slate-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}