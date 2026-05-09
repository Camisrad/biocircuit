import { useEffect, useRef } from "react";

const NODES = [
  { id: "TP53", x: 0.18, y: 0.22, color: "#ef4444", r: 10 },
  { id: "MDM2", x: 0.10, y: 0.10, color: "#f97316", r: 8 },
  { id: "BAX", x: 0.26, y: 0.38, color: "#dc2626", r: 7 },
  { id: "CDKN1A", x: 0.32, y: 0.12, color: "#fb923c", r: 7 },
  { id: "KRAS", x: 0.50, y: 0.15, color: "#3b82f6", r: 10 },
  { id: "BRAF", x: 0.58, y: 0.28, color: "#2563eb", r: 9 },
  { id: "MEK1", x: 0.46, y: 0.38, color: "#1d4ed8", r: 8 },
  { id: "ERK1", x: 0.62, y: 0.42, color: "#1e40af", r: 8 },
  { id: "PIK3CA", x: 0.78, y: 0.18, color: "#a855f7", r: 9 },
  { id: "AKT", x: 0.84, y: 0.32, color: "#7c3aed", r: 10 },
  { id: "mTOR", x: 0.76, y: 0.44, color: "#6b21a8", r: 9 },
  { id: "PTEN", x: 0.88, y: 0.14, color: "#9333ea", r: 7 },
  { id: "APC", x: 0.15, y: 0.60, color: "#f59e0b", r: 8 },
  { id: "CTNNB1", x: 0.28, y: 0.56, color: "#d97706", r: 9 },
  { id: "GSK3B", x: 0.22, y: 0.72, color: "#b45309", r: 7 },
  { id: "BRCA1", x: 0.48, y: 0.62, color: "#ec4899", r: 9 },
  { id: "BRCA2", x: 0.58, y: 0.72, color: "#db2777", r: 9 },
  { id: "RAD51", x: 0.40, y: 0.78, color: "#be185d", r: 7 },
  { id: "RB1", x: 0.72, y: 0.60, color: "#6366f1", r: 9 },
  { id: "CDK4", x: 0.82, y: 0.72, color: "#4f46e5", r: 8 },
  { id: "CCND1", x: 0.68, y: 0.78, color: "#4338ca", r: 7 },
  { id: "BCL2", x: 0.92, y: 0.52, color: "#f59e0b", r: 8 },
  { id: "CASP3", x: 0.94, y: 0.66, color: "#b91c1c", r: 7 },
  { id: "VEGFA", x: 0.35, y: 0.90, color: "#22c55e", r: 8 },
  { id: "HIF1A", x: 0.55, y: 0.88, color: "#64748b", r: 8 },
  { id: "STAT3", x: 0.72, y: 0.90, color: "#0d9488", r: 8 },
  { id: "NFKB1", x: 0.88, y: 0.84, color: "#f97316", r: 7 },
  { id: "MET", x: 0.05, y: 0.46, color: "#06b6d4", r: 8 },
  { id: "SMAD4", x: 0.08, y: 0.80, color: "#047857", r: 7 },
  { id: "NOTCH1", x: 0.92, y: 0.38, color: "#d946ef", r: 7 },
];

const EDGES = [
  { from: "MDM2", to: "TP53", type: "inhibition" },
  { from: "TP53", to: "BAX", type: "activation" },
  { from: "TP53", to: "CDKN1A", type: "activation" },
  { from: "TP53", to: "MDM2", type: "activation" },
  { from: "KRAS", to: "BRAF", type: "activation" },
  { from: "BRAF", to: "MEK1", type: "activation" },
  { from: "MEK1", to: "ERK1", type: "activation" },
  { from: "PIK3CA", to: "AKT", type: "activation" },
  { from: "PTEN", to: "AKT", type: "inhibition" },
  { from: "AKT", to: "mTOR", type: "activation" },
  { from: "APC", to: "CTNNB1", type: "inhibition" },
  { from: "GSK3B", to: "CTNNB1", type: "inhibition" },
  { from: "BRCA1", to: "RAD51", type: "activation" },
  { from: "BRCA2", to: "RAD51", type: "activation" },
  { from: "CCND1", to: "CDK4", type: "activation" },
  { from: "CDK4", to: "RB1", type: "inhibition" },
  { from: "BCL2", to: "CASP3", type: "inhibition" },
  { from: "AKT", to: "BCL2", type: "activation" },
  { from: "ERK1", to: "CCND1", type: "activation" },
  { from: "mTOR", to: "HIF1A", type: "activation" },
  { from: "HIF1A", to: "VEGFA", type: "activation" },
  { from: "KRAS", to: "PIK3CA", type: "activation" },
  { from: "TP53", to: "BCL2", type: "inhibition" },
  { from: "MET", to: "KRAS", type: "activation" },
  { from: "MET", to: "AKT", type: "activation" },
  { from: "SMAD4", to: "APC", type: "activation" },
  { from: "NOTCH1", to: "STAT3", type: "activation" },
  { from: "STAT3", to: "NFKB1", type: "activation" },
  { from: "CTNNB1", to: "CCND1", type: "activation" },
  { from: "BRCA1", to: "TP53", type: "activation" },
];

export default function PathwayBackground() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const timeRef = useRef(0);
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    // Initialize edge particles
    particlesRef.current = EDGES.map((edge) => ({
      ...edge,
      progress: Math.random(),
      speed: 0.003 + Math.random() * 0.003,
    }));

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);
      timeRef.current += 0.008;

      const nodeMap = {};
      NODES.forEach((n) => {
        nodeMap[n.id] = {
          ...n,
          px: n.x * w,
          py: n.y * h,
          pulse: Math.sin(timeRef.current * 1.5 + n.x * 10) * 0.15 + 1,
        };
      });

      // Draw edges
      EDGES.forEach((edge) => {
        const src = nodeMap[edge.from];
        const dst = nodeMap[edge.to];
        if (!src || !dst) return;

        // Gradient line
        const grad = ctx.createLinearGradient(src.px, src.py, dst.px, dst.py);
        const alpha = 0.18 + Math.sin(timeRef.current + src.px * 0.01) * 0.04;
        grad.addColorStop(0, src.color + "44");
        grad.addColorStop(1, dst.color + "44");
        ctx.beginPath();
        ctx.moveTo(src.px, src.py);

        // Slight bezier curve for organic feel
        const mx = (src.px + dst.px) / 2 + (dst.py - src.py) * 0.12;
        const my = (src.py + dst.py) / 2 - (dst.px - src.px) * 0.12;
        ctx.quadraticCurveTo(mx, my, dst.px, dst.py);
        ctx.strokeStyle = grad;
        ctx.lineWidth = edge.type === "activation" ? 1.5 : 1.2;
        ctx.setLineDash(edge.type === "inhibition" ? [5, 5] : []);
        ctx.globalAlpha = alpha + 0.08;
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.globalAlpha = 1;
      });

      // Draw traveling signal particles along edges
      particlesRef.current.forEach((p) => {
        const src = nodeMap[p.from];
        const dst = nodeMap[p.to];
        if (!src || !dst) return;

        p.progress += p.speed;
        if (p.progress > 1) p.progress = 0;

        const t = p.progress;
        const mx = (src.px + dst.px) / 2 + (dst.py - src.py) * 0.12;
        const my = (src.py + dst.py) / 2 - (dst.px - src.px) * 0.12;
        // Quadratic bezier point
        const x = (1 - t) * (1 - t) * src.px + 2 * (1 - t) * t * mx + t * t * dst.px;
        const y = (1 - t) * (1 - t) * src.py + 2 * (1 - t) * t * my + t * t * dst.py;

        const pcolor = p.type === "activation" ? src.color : "#ef4444";
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = pcolor;
        ctx.globalAlpha = 0.85;
        ctx.fill();
        ctx.globalAlpha = 1;

        // Glow
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        const glow = ctx.createRadialGradient(x, y, 1, x, y, 6);
        glow.addColorStop(0, pcolor + "aa");
        glow.addColorStop(1, pcolor + "00");
        ctx.fillStyle = glow;
        ctx.globalAlpha = 0.5;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      // Draw nodes
      NODES.forEach((n) => {
        const nd = nodeMap[n.id];
        const r = n.r * nd.pulse;

        // Outer glow ring
        const glowR = r * 2.5;
        const glow = ctx.createRadialGradient(nd.px, nd.py, r * 0.5, nd.px, nd.py, glowR);
        glow.addColorStop(0, n.color + "50");
        glow.addColorStop(1, n.color + "00");
        ctx.beginPath();
        ctx.arc(nd.px, nd.py, glowR, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // Node circle
        ctx.beginPath();
        ctx.arc(nd.px, nd.py, r, 0, Math.PI * 2);
        ctx.fillStyle = n.color + "cc";
        ctx.fill();

        // White border
        ctx.beginPath();
        ctx.arc(nd.px, nd.py, r, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(255,255,255,0.6)";
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Label
        ctx.font = `bold ${Math.max(8, n.r - 1)}px 'Poppins', sans-serif`;
        ctx.fillStyle = "rgba(15,23,42,0.75)";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(n.id, nd.px, nd.py + r + 9);
      });

      animRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.28, filter: "blur(1.5px)" }}
    />
  );
}