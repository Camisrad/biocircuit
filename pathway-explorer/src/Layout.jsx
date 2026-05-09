import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import AnimatedLogo from "@/components/home/AnimatedLogo";
import FloatingAIAssistant from "@/components/FloatingAIAssistant";
import { useEffect, useState } from "react";

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { name: "Pathways", url: createPageUrl("Explore") },
    { name: "Case Studies", url: createPageUrl("CaseStudies") },
    { name: "Science", url: createPageUrl("Science") },
    { name: "Contribute", url: createPageUrl("Contribute") },
    { name: "Network", url: createPageUrl("Network") },
  ];

  const isActive = (url) => location.pathname === url;
  const isHome = location.pathname === "/" || location.pathname === "/Home";

  return (
    <div className={currentPageName === "Explore" ? "h-screen overflow-hidden" : "min-h-screen"} style={{ background: "#ffffff" }}>
      {/* Navbar */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid #e2e8f0",
          boxShadow: scrolled ? "0 1px 20px rgba(0,0,0,0.06)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-16">
            <Link to={createPageUrl("Home")} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <AnimatedLogo size={52} />
            </Link>

            <div className="flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.url}
                  className="text-sm font-medium rounded-lg transition-all duration-200"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    paddingLeft: 12,
                    paddingRight: 12,
                    paddingTop: 6,
                    paddingBottom: 6,
                    ...(isActive(item.url) ? {
                      color: "#2563EB",
                      background: "rgba(37,99,235,0.08)",
                      border: "1px solid rgba(37,99,235,0.15)"
                    } : {
                      color: "#64748b",
                      border: "1px solid transparent"
                    })
                  }}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer — only for non-home, non-explore pages (Explore handles its own offset) */}
      {!isHome && currentPageName !== "Explore" && <div style={{ height: 64 }} />}

      {/* Main Content */}
      <main className="relative">
        {children}
      </main>

      <FloatingAIAssistant />

      {/* Footer — hidden on Explore (Pathways) */}
      {currentPageName !== "Explore" && <footer style={{ background: "#ffffff", borderTop: "1px solid #f1f5f9", position: "relative", zIndex: 1 }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-10">
            <div className="max-w-xs">
              <div className="flex items-center gap-3 mb-4">
                <AnimatedLogo size={28} />
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">Open-access molecular pathway visualization for researchers, educators, and students worldwide.</p>
              <div className="mt-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-xs text-slate-400">Live pathway data</span>
              </div>
            </div>
            <div className="flex gap-16">
              <div>
                <p className="text-xs font-semibold text-slate-400 mb-4 uppercase tracking-wider">Platform</p>
                <div className="space-y-2.5">
                  {navItems.map(item => (
                    <Link key={item.name} to={item.url} className="block text-xs text-slate-400 hover:text-slate-600 transition-colors">{item.name}</Link>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400 mb-4 uppercase tracking-wider">Data Sources</p>
                <div className="space-y-2.5 text-xs text-slate-400">
                  <p>KEGG Pathway Database</p>
                  <p>Reactome</p>
                  <p>NCBI Gene</p>
                  <p>COSMIC</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-6 flex items-center justify-between" style={{ borderTop: "1px solid #e2e8f0" }}>
            <p className="text-xs text-slate-400">© 2025 BioCircuit. All pathway data sourced from public databases.</p>
            <p className="text-xs text-slate-400">Open Science Initiative</p>
          </div>
        </div>
      </footer>}
    </div>
  );
}