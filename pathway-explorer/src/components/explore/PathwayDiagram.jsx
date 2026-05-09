import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GeneNode from "./GeneNode";
import { pathwayData } from "./pathwayData";

// Quadratic bezier point at t
function qbez(fx, fy, mx, my, tx, ty, t) {
  return {
    x: (1 - t) * (1 - t) * fx + 2 * (1 - t) * t * mx + t * t * tx,
    y: (1 - t) * (1 - t) * fy + 2 * (1 - t) * t * my + t * t * ty,
  };
}

// ease-in-out
function easeInOut(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

// A single orb that animates via rAF and mutates SVG element refs directly
function OrbAnimator({ fx, fy, mx, my, tx, ty, duration }) {
  const haloRef = useRef(null);
  const orbRef = useRef(null);
  const coreRef = useRef(null);
  const rafRef = useRef(null);

  // useLayoutEffect so refs are guaranteed attached before rAF starts
  useLayoutEffect(() => {
    const startTime = performance.now();

    const animate = (ts) => {
      const elapsed = ts - startTime;
      const raw = Math.min(elapsed / duration, 1);
      const t = easeInOut(raw);
      const pos = qbez(fx, fy, mx, my, tx, ty, t);

      if (haloRef.current) { haloRef.current.setAttribute("cx", pos.x); haloRef.current.setAttribute("cy", pos.y); }
      if (orbRef.current)  { orbRef.current.setAttribute("cx", pos.x);  orbRef.current.setAttribute("cy", pos.y); }
      if (coreRef.current) { coreRef.current.setAttribute("cx", pos.x); coreRef.current.setAttribute("cy", pos.y); }

      if (raw < 1) rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [fx, fy, mx, my, tx, ty, duration]);

  return (
    <g>
      <circle ref={haloRef} cx={fx} cy={fy} r={18} fill="#00e5ff" opacity={0.2} />
      <circle ref={orbRef}  cx={fx} cy={fy} r={9}  fill="#00e5ff" opacity={1} style={{ filter: 'drop-shadow(0 0 10px #00e5ff) drop-shadow(0 0 20px #0ea5e9)' }} />
      <circle ref={coreRef} cx={fx} cy={fy} r={4}  fill="#ffffff" opacity={1} />
    </g>
  );
}

export default function PathwayDiagram({ pathwayId, selectedGene, onGeneClick, overlayData, mutatedGenes, knockedOutGenes, highlightedGenes, drugOverlay, hgtActive, viewMode, onPlaySignal, externalSignalGene, cancerTypeFilter }) {
  const [activeConnections, setActiveConnections] = useState([]);
  const [hoveredGene, setHoveredGene] = useState(null);
  const [svgDimensions, setSvgDimensions] = useState({ width: 800, height: 600 });
  const [propagatingEdges, setPropagatingEdges] = useState([]);
  const [propagationActive, setPropagationActive] = useState(false);
  const [lastPropagationGene, setLastPropagationGene] = useState(null);
  const timeoutRefs = useRef([]);
  const elapsedRef = useRef(null);
  const [speed, setSpeed] = useState(1);
  const [inhibitedMode, setInhibitedMode] = useState(false);
  const [blockedGenes, setBlockedGenes] = useState([]);
  const [signalElapsed, setSignalElapsed] = useState(0);
  // orbs: array of { key, fx, fy, mx, my, tx, ty, duration }
  const [orbs, setOrbs] = useState([]);

  const pathway = pathwayData[pathwayId];

  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      if (width < 640) setSvgDimensions({ width: 400, height: 500 });
      else if (width < 1024) setSvgDimensions({ width: 600, height: 550 });
      else setSvgDimensions({ width: 800, height: 600 });
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const getPropagationChain = (startGeneName, connections) => {
    const stepDelay = Math.round(800 / speed);
    const chain = [];
    const visited = new Set();
    const queue = [{ gene: startGeneName, delay: 0 }];
    while (queue.length > 0) {
      const { gene, delay } = queue.shift();
      const outgoing = connections.filter(c => c.from === gene && c.type === 'activation' && !visited.has(`${c.from}-${c.to}`));
      outgoing.forEach(conn => {
        if (blockedGenes.includes(conn.to)) return;
        visited.add(`${conn.from}-${conn.to}`);
        chain.push({ from: conn.from, to: conn.to, delay });
        queue.push({ gene: conn.to, delay: delay + stepDelay });
      });
    }
    return chain;
  };

  const triggerPropagation = (geneName) => {
    timeoutRefs.current.forEach(t => clearTimeout(t));
    timeoutRefs.current = [];
    if (elapsedRef.current) clearInterval(elapsedRef.current);
    setPropagatingEdges([]);
    setOrbs([]);
    setPropagationActive(true);
    setLastPropagationGene(geneName);
    setSignalElapsed(0);

    let elapsed = 0;
    elapsedRef.current = setInterval(() => {
      elapsed = parseFloat((elapsed + 0.1).toFixed(1));
      setSignalElapsed(elapsed);
    }, 100);

    const chain = getPropagationChain(geneName, pathway.connections);
    const orbDuration = Math.round(700 / speed);

    chain.forEach(({ from, to, delay }) => {
      const tid = setTimeout(() => {
        const fromGene = pathway.genes.find(g => g.name === from);
        const toGene = pathway.genes.find(g => g.name === to);
        if (!fromGene || !toGene) {
          console.log('🟣 gene not found:', from, toGene ? '✓' : '✗', '→', to, fromGene ? '✓' : '✗');
          return;
        }

        const fx = fromGene.position.x, fy = fromGene.position.y;
        const tx = toGene.position.x, ty = toGene.position.y;
        const mx = (fx + tx) / 2, my = (fy + ty) / 2 - 30;
        const orbKey = `${from}-${to}-${Date.now()}`;

        setOrbs(prev => [...prev, { key: orbKey, fx, fy, mx, my, tx, ty, duration: orbDuration }]);

        // Remove orb after it finishes
        const clearTid = setTimeout(() => {
          setOrbs(prev => prev.filter(o => o.key !== orbKey));
        }, orbDuration + 100);
        timeoutRefs.current.push(clearTid);
      }, delay);
      timeoutRefs.current.push(tid);
    });

    const totalDuration = chain.length > 0 ? chain[chain.length - 1].delay + 1500 : 1500;
    const endTid = setTimeout(() => {
      setPropagationActive(false);
      clearInterval(elapsedRef.current);
    }, totalDuration);
    timeoutRefs.current.push(endTid);
  };

  useEffect(() => {
    return () => {
      timeoutRefs.current.forEach(t => clearTimeout(t));
      if (elapsedRef.current) clearInterval(elapsedRef.current);
    };
  }, []);

  useEffect(() => {
    if (externalSignalGene) {
      triggerPropagation(externalSignalGene);
    }
  }, [externalSignalGene]);

  useEffect(() => {
    if (selectedGene) {
      const related = pathway.connections
        .filter(conn => conn.from === selectedGene.name || conn.to === selectedGene.name)
        .map(conn => `${conn.from}-${conn.to}`);
      setActiveConnections(related);
    } else {
      setActiveConnections([]);
    }
  }, [selectedGene, pathway]);

  const getConnectionPath = (from, to) => {
    const fromGene = pathway.genes.find(g => g.name === from);
    const toGene = pathway.genes.find(g => g.name === to);
    if (!fromGene || !toGene) return "";
    const fromPos = fromGene.position;
    const toPos = toGene.position;
    return `M ${fromPos.x} ${fromPos.y} Q ${(fromPos.x + toPos.x) / 2} ${(fromPos.y + toPos.y) / 2 - 30} ${toPos.x} ${toPos.y}`;
  };

  const GOF_GENES = new Set(['KRAS','BRAF','PIK3CA','MDM2','ERBB2','JAK2','BCL2','CCND1','NRAS','HRAS','SMO','GLI1','STAT3','ABL1','BCR','HGF','VEGFA','KDR','FGFR1','FGFR2','MET','NOTCH1','CDK4','EML4','IKBKB','NFKB1']);
  const LOF_GENES = new Set(['TP53','PTEN','RB1','BRCA1','BRCA2','APC','VHL','MLH1','MSH2','SMAD4','SMAD2','TGFBR1','PTCH1','BAX','CDKN1A','CASP3','RAD51','ATM','ATR','CHEK1']);

  const getOverlayColor = (geneName) => {
    if (inhibitedMode && blockedGenes.includes(geneName)) return '#94a3b8';
    if (drugOverlay && drugOverlay[geneName]) {
      const tier = drugOverlay[geneName];
      if (tier === 'target') return '#00e676';
      if (tier === 'tier1') return '#c6ff00';
      if (tier === 'tier2') return '#ffab00';
      return null;
    }
    if (viewMode === 'mutant') {
      if (cancerTypeFilter) {
        const geneEntry = pathway.genes.find(g => g.name === geneName);
        const cancerTypes = geneEntry?.cancerTypes || [];
        const matches = cancerTypes.some(ct => ct.toLowerCase().includes(cancerTypeFilter.toLowerCase()));
        if (!matches) return '#e2e8f0';
      }
      if (GOF_GENES.has(geneName)) return '#ea580c';
      if (LOF_GENES.has(geneName)) return '#94a3b8';
    }
    if (knockedOutGenes?.includes(geneName)) return "#ef4444";
    if (mutatedGenes?.includes(geneName)) return "#f59e0b";
    if (highlightedGenes?.length > 0) return highlightedGenes.includes(geneName) ? "#5db8ff" : null;
    if (!overlayData || !overlayData[geneName]) return null;
    const value = overlayData[geneName].expression;
    if (value >= 2.0) return "#ef4444";
    if (value >= 1.0) return "#eab308";
    return "#22c55e";
  };

  const getNodeOpacity = (geneName) => {
    if (drugOverlay && drugOverlay[geneName] === 'unaffected') return 0.2;
    if (highlightedGenes?.length > 0 && !highlightedGenes.includes(geneName)) return 0.3;
    if (mutatedGenes?.length > 0 && !mutatedGenes.includes(geneName) && !knockedOutGenes?.includes(geneName)) return 0.5;
    return 1;
  };

  return (
    <div className="relative w-full" style={{ height: `${svgDimensions.height}px`, background: "#f8fafc" }}>
      <svg className="w-full h-full" viewBox={`0 0 ${svgDimensions.width} ${svgDimensions.height}`}>
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="strong-glow">
            <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
            <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
            <polygon points="0 0, 10 3, 0 6" fill="#2563EB" />
          </marker>
          <marker id="arrowhead-active" markerWidth="12" markerHeight="12" refX="9" refY="3" orient="auto">
            <polygon points="0 0, 12 3, 0 6" fill="#2563EB" />
          </marker>
        </defs>

        {/* Connections */}
        <g className="connections">
          <AnimatePresence>
            {pathway.connections.map((conn, idx) => {
              const isActive = activeConnections.includes(`${conn.from}-${conn.to}`);
              const isDrugEdge = drugOverlay && drugOverlay[conn.from] && drugOverlay[conn.to] && drugOverlay[conn.to] !== 'unaffected';
              return (
                <motion.path
                  key={`${conn.from}-${conn.to}`}
                  d={getConnectionPath(conn.from, conn.to)}
                  fill="none"
                  stroke={isActive ? "#2563EB" : isDrugEdge ? "#00e676" : "#cbd5e1"}
                  strokeWidth={isActive ? 2.5 : 1.5}
                  strokeDasharray={conn.type === "inhibition" ? "8,5" : isDrugEdge ? "6,3" : "none"}
                  markerEnd={isActive ? "url(#arrowhead-active)" : "url(#arrowhead)"}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: isActive ? 1 : isDrugEdge ? 0.8 : 0.3, strokeWidth: isActive ? 2.5 : isDrugEdge ? 2 : 1.5 }}
                  transition={{ duration: 1, delay: idx * 0.05 }}
                />
              );
            })}
          </AnimatePresence>
        </g>

        {/* Signal Orbs — rendered on top of connections, below nodes */}
        <g className="orbs">
          {orbs.map(orb => (
            <OrbAnimator key={orb.key} {...orb} />
          ))}
        </g>

        {/* Gene Nodes */}
        <AnimatePresence>
          {pathway.genes.map((gene, idx) => (
            <g key={gene.name} style={{ opacity: getNodeOpacity(gene.name), transition: 'opacity 0.4s' }}>
              <GeneNode
                gene={gene}
                isSelected={selectedGene?.name === gene.name}
                isHovered={hoveredGene === gene.name}
                onClick={() => {
                  if (inhibitedMode) {
                    setBlockedGenes(prev => prev.includes(gene.name) ? prev.filter(g => g !== gene.name) : [...prev, gene.name]);
                  } else {
                    onGeneClick(gene);
                  }
                }}
                onHover={setHoveredGene}
                delay={idx * 0.08}
                pathwayColor={pathway.color}
                overlayColor={getOverlayColor(gene.name)}
                hgtActive={hgtActive}
                viewMode={viewMode}
                isMutant={viewMode === 'mutant'}
                isMutantLof={viewMode === 'mutant' && LOF_GENES.has(gene.name)}
                isBlocked={inhibitedMode && blockedGenes.includes(gene.name)}
              />
            </g>
          ))}
        </AnimatePresence>
      </svg>

      {/* Drug overlay info box */}
      {drugOverlay && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-20 px-4 py-3 rounded-xl shadow-lg"
          style={{ background: 'rgba(255,255,255,0.97)', border: '2px solid rgba(22,163,74,0.3)', maxWidth: 360 }}>
          <p className="text-xs font-bold text-emerald-700 mb-2">💊 Drug-Pathway Interaction Active</p>
          <div className="flex flex-wrap gap-2 text-[10px]">
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: '#00e676' }} /> Direct target</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: '#c6ff00' }} /> 1st downstream</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: '#ffab00' }} /> 2nd downstream</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full inline-block opacity-30" style={{ background: '#64748b' }} /> Unaffected</span>
          </div>
        </div>
      )}

      {/* HGT active banner */}
      {hgtActive && (
        <div className="absolute top-16 right-2 z-20 px-3 py-2 rounded-xl"
          style={{ background: 'rgba(20,184,166,0.1)', border: '2px solid rgba(20,184,166,0.4)', maxWidth: 220 }}>
          <p className="text-[10px] font-bold text-teal-700 mb-1">🧬 Evolutionary View ON</p>
          <p className="text-[10px] text-teal-600 leading-relaxed">Nodes with a spinning teal ring have known HGT signatures.</p>
        </div>
      )}

      {/* Signal Controls — bottom left */}
      <div className="absolute bottom-2 left-2 flex flex-col gap-1.5 z-10">
        {selectedGene && (
          <button
            onClick={() => triggerPropagation(selectedGene.name)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold text-white transition-all"
            style={{ background: selectedGene.color || '#2563eb' }}
          >
            ▶ Animate Signal Flow
          </button>
        )}
        {lastPropagationGene && (
          <button onClick={() => triggerPropagation(lastPropagationGene)}
            className="text-xs font-bold px-2 py-1 rounded-lg"
            style={{ background: "rgba(0,229,255,0.15)", border: "1px solid rgba(0,229,255,0.4)", color: "#00e5ff" }}>
            ⟳ Replay Signal
          </button>
        )}
        <div className="flex items-center gap-1 px-2 py-1.5 rounded-lg" style={{ background: "rgba(255,255,255,0.95)", border: "1px solid #e2e8f0" }}>
          <span className="text-[10px] text-slate-400 mr-1">Speed</span>
          {[{v: 0.5, l: 'Slow'}, {v: 1, l: 'Norm'}, {v: 2, l: 'Fast'}].map(s => (
            <button key={s.v} onClick={() => setSpeed(s.v)}
              className="text-[10px] px-1.5 py-0.5 rounded font-semibold transition-all"
              style={{ background: speed === s.v ? '#2563eb' : 'transparent', color: speed === s.v ? '#fff' : '#94a3b8' }}>
              {s.l}
            </button>
          ))}
        </div>
        <button onClick={() => { setInhibitedMode(v => !v); setBlockedGenes([]); }}
          className="text-[10px] font-bold px-2 py-1.5 rounded-lg transition-all"
          style={{ background: inhibitedMode ? 'rgba(239,68,68,0.1)' : 'rgba(255,255,255,0.95)', border: `1px solid ${inhibitedMode ? '#ef4444' : '#e2e8f0'}`, color: inhibitedMode ? '#ef4444' : '#64748b' }}>
          {inhibitedMode ? '🚫 Block Mode ON' : '⊗ Block Mode'}
        </button>
        {inhibitedMode && <p className="text-[10px] px-1" style={{ color: '#d97706' }}>Click nodes to block signal</p>}
        {blockedGenes.length > 0 && (
          <button onClick={() => setBlockedGenes([])} className="text-[10px] px-2 py-0.5 rounded"
            style={{ background: 'rgba(239,68,68,0.08)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.2)' }}>
            Clear {blockedGenes.length} block{blockedGenes.length > 1 ? 's' : ''}
          </button>
        )}
      </div>

      {/* Timeline bar */}
      {(propagationActive || signalElapsed > 0) && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1.5 rounded-lg z-10"
          style={{ background: 'rgba(255,255,255,0.95)', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <span className="text-[10px] text-slate-400">Signal time:</span>
          <span className="text-[10px] font-mono font-bold" style={{ color: '#2563eb' }}>{signalElapsed.toFixed(1)}s</span>
          <div className="w-24 h-1 rounded-full" style={{ background: '#e2e8f0' }}>
            <div className="h-1 rounded-full transition-all duration-100" style={{ width: `${Math.min((signalElapsed / 4) * 100, 100)}%`, background: propagationActive ? '#2563eb' : '#22c55e' }} />
          </div>
          {!propagationActive && <span className="text-[10px] text-emerald-500 font-semibold">✓ Done</span>}
        </div>
      )}

      {/* Legend — top right */}
      <div className="absolute top-2 right-2 sm:top-4 sm:right-4 rounded-xl p-2 sm:p-3" style={{ background: '#ffffff', border: '1px solid #e2e8f0', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
        <h4 className="text-[10px] font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Legend</h4>
        <div className="space-y-1 text-[10px] text-slate-500">
          <div className="flex items-center gap-2"><div className="w-6 h-0.5" style={{ background: '#2563EB' }} /><span>Activation</span></div>
          <div className="flex items-center gap-2"><div className="w-6" style={{ borderTop: '1.5px dashed #2563EB' }} /><span>Inhibition</span></div>
          {viewMode === 'mutant' && <>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full" style={{ background: '#ea580c' }} /><span>GOF mutation</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full" style={{ background: '#94a3b8' }} /><span>LOF mutation</span></div>
          </>}
        </div>
      </div>

      {/* Pathway Info — top left */}
      <div className="absolute top-2 left-2 sm:top-4 sm:left-4 rounded-xl p-2 sm:p-4 max-w-[180px] sm:max-w-xs" style={{ background: '#ffffff', border: '1px solid #e2e8f0', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
        <h4 className="text-sm sm:text-base font-bold text-slate-900 mb-1">{pathway.name}</h4>
        <p className="text-[10px] sm:text-xs text-slate-400">{pathway.description}</p>
      </div>
    </div>
  );
}