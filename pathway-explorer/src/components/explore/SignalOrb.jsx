import { useEffect, useRef, useState } from "react";

// Evaluates a quadratic bezier at t
function bezierPoint(fx, fy, mx, my, tx, ty, t) {
  const x = (1 - t) * (1 - t) * fx + 2 * (1 - t) * t * mx + t * t * tx;
  const y = (1 - t) * (1 - t) * fy + 2 * (1 - t) * t * my + t * t * ty;
  return { x, y };
}

export default function SignalOrb({ fromGene, toGene, speed = 1, onDone }) {
  const [pos, setPos] = useState(null);
  const rafRef = useRef(null);
  const startTimeRef = useRef(null);

  useEffect(() => {
    const fx = fromGene.position.x, fy = fromGene.position.y;
    const tx = toGene.position.x, ty = toGene.position.y;
    const mx = (fx + tx) / 2, my = (fy + ty) / 2 - 30;
    const duration = 700 / speed; // ms

    const animate = (timestamp) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const t = Math.min(elapsed / duration, 1);
      // ease in-out
      const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      setPos(bezierPoint(fx, fy, mx, my, tx, ty, eased));
      if (t < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        onDone && onDone();
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  if (!pos) return null;

  return (
    <g>
      {/* Outer glow */}
      <circle cx={pos.x} cy={pos.y} r={16} fill="#00e5ff" opacity={0.15} />
      {/* Mid glow */}
      <circle cx={pos.x} cy={pos.y} r={10} fill="#00e5ff" opacity={0.5} />
      {/* Main orb */}
      <circle cx={pos.x} cy={pos.y} r={7} fill="#00e5ff" opacity={1} style={{ filter: 'drop-shadow(0 0 8px #00e5ff) drop-shadow(0 0 4px #0ea5e9)' }} />
      {/* White core */}
      <circle cx={pos.x} cy={pos.y} r={3} fill="#ffffff" opacity={1} />
    </g>
  );
}