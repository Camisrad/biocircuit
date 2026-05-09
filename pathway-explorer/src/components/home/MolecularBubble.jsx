import { useEffect, useRef } from "react";

const NODES = [
  { x: 0,   y: 0,   r: 22, color: "#3b82f6", label: "KRAS" },
  { x: 90,  y: -55, r: 14, color: "#a855f7", label: "BRAF" },
  { x: -90, y: -55, r: 14, color: "#a855f7", label: "PI3K" },
  { x: 110, y: 40,  r: 12, color: "#06b6d4", label: "MEK" },
  { x: -110,y: 40,  r: 12, color: "#06b6d4", label: "AKT" },
  { x: 0,   y: 105, r: 10, color: "#E0A85C", label: "ERK" },
  { x: 0,   y: -105,r: 10, color: "#E05C5C", label: "EGFR" },
  { x: 60,  y: 90,  r: 9,  color: "#22c55e", label: "RAF" },
  { x: -60, y: 90,  r: 9,  color: "#22c55e", label: "mTOR" },
];

const BONDS = [
  [0,1],[0,2],[0,3],[0,4],[0,6],
  [1,3],[2,4],[3,5],[4,5],[5,7],[5,8],[1,6],[2,6]
];

export default function MolecularBubble() {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: null, y: null });
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const DPR = window.devicePixelRatio || 1;

    // Node state with physics
    const nodes = NODES.map(n => ({
      ...n,
      baseX: n.x, baseY: n.y, baseR: n.r,
      dx: 0, dy: 0,
      vx: 0, vy: 0,
    }));

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * DPR;
      canvas.height = rect.height * DPR;
      ctx.scale(DPR, DPR);
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };
    const onLeave = () => { mouse.current = { x: null, y: null }; };
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);

    let t = 0;
    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const W = rect.width;
      const H = rect.height;
      const cx = W / 2;
      const cy = H / 2;

      ctx.clearRect(0, 0, W, H);
      t += 0.012;

      // Gentle idle float
      nodes.forEach((node, i) => {
        const phase = i * 0.7;
        node.dx = Math.sin(t + phase) * 5;
        node.dy = Math.cos(t * 0.8 + phase) * 4;
      });

      // Mouse repulsion / attraction
      const mx = mouse.current.x;
      const my = mouse.current.y;

      if (mx !== null) {
        nodes.forEach(node => {
          const nx = cx + node.baseX + node.dx;
          const ny = cy + node.baseY + node.dy;
          const dist = Math.hypot(mx - nx, my - ny);
          const influence = Math.max(0, 180 - dist) / 180;
          const angle = Math.atan2(ny - my, nx - mx);
          node.vx += Math.cos(angle) * influence * 1.8;
          node.vy += Math.sin(angle) * influence * 1.8;
        });
      }

      nodes.forEach(node => {
        node.dx += node.vx;
        node.dy += node.vy;
        node.vx *= 0.82;
        node.vy *= 0.82;
        // Spring back
        node.dx *= 0.88;
        node.dy *= 0.88;
      });

      // Draw bonds
      BONDS.forEach(([a, b]) => {
        const na = nodes[a];
        const nb = nodes[b];
        const ax = cx + na.baseX + na.dx;
        const ay = cy + na.baseY + na.dy;
        const bx = cx + nb.baseX + nb.dx;
        const by = cy + nb.baseY + nb.dy;

        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(bx, by);
        ctx.strokeStyle = "rgba(100,130,220,0.25)";
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Draw nodes
      nodes.forEach(node => {
        const nx = cx + node.baseX + node.dx;
        const ny = cy + node.baseY + node.dy;

        // Expand radius near cursor
        let r = node.baseR;
        if (mx !== null) {
          const dist = Math.hypot(mx - nx, my - ny);
          const boost = Math.max(0, 1 - dist / 130) * 10;
          r += boost;
        }

        // Glow
        const glow = ctx.createRadialGradient(nx, ny, 0, nx, ny, r * 2.5);
        glow.addColorStop(0, node.color + "40");
        glow.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(nx, ny, r * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // Node body
        const grad = ctx.createRadialGradient(nx - r * 0.3, ny - r * 0.3, 0, nx, ny, r);
        grad.addColorStop(0, node.color + "ff");
        grad.addColorStop(1, node.color + "99");
        ctx.beginPath();
        ctx.arc(nx, ny, r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // Highlight
        ctx.beginPath();
        ctx.arc(nx - r * 0.28, ny - r * 0.28, r * 0.3, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.25)";
        ctx.fill();

        // Label
        if (r > 9) {
          ctx.fillStyle = "rgba(255,255,255,0.85)";
          ctx.font = `bold ${Math.round(r * 0.65)}px 'Courier New', monospace`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(node.label, nx, ny);
        }
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full cursor-crosshair"
      style={{ display: "block" }}
    />
  );
}