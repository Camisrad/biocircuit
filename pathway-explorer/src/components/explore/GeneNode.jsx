import { motion } from "framer-motion";
import { hgtData, hgtConfidenceColor } from "./hgtData";

export default function GeneNode({ gene, isSelected, isHovered, onClick, onHover, delay, pathwayColor, overlayColor, hgtActive, isMutant, isMutantLof, isBlocked }) {
  const radius = isSelected ? 50 : isHovered ? 45 : 40;
  const displayColor = overlayColor || gene.color;
  const hgt = hgtData[gene.name];
  const showHgt = hgtActive && hgt;

  return (
    <g
      onClick={onClick}
      onMouseEnter={() => onHover(gene.name)}
      onMouseLeave={() => onHover(null)}
      className="cursor-pointer"
    >
      {/* Organic glow effect */}
      {(isSelected || isHovered) && (
        <>
          <motion.circle
            cx={gene.position.x}
            cy={gene.position.y}
            r={radius + 25}
            fill={gene.color}
            opacity={0.12}
            filter="url(#organic-glow)"
            initial={{ scale: 0 }}
            animate={{ scale: [0.95, 1.05, 0.95] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.circle
            cx={gene.position.x}
            cy={gene.position.y}
            r={radius + 15}
            fill={gene.color}
            opacity={0.2}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4 }}
          />
        </>
      )}

      {/* GOF mutation pulsing amber ring */}
      {isMutant && !isMutantLof && overlayColor && overlayColor !== '#94a3b8' && overlayColor !== '#e2e8f0' && (
        <motion.circle
          cx={gene.position.x}
          cy={gene.position.y}
          r={radius + 18}
          fill="none"
          stroke="#ea580c"
          strokeWidth={2.5}
          opacity={0.7}
          animate={{ r: [radius + 14, radius + 22, radius + 14], opacity: [0.7, 0.3, 0.7] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}

      {/* HGT rotating ring */}
      {showHgt && (
        <motion.circle
          cx={gene.position.x}
          cy={gene.position.y}
          r={radius + 14}
          fill="none"
          stroke={hgtConfidenceColor(hgt.confidence)}
          strokeWidth={2}
          strokeDasharray="6,3"
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: `${gene.position.x}px ${gene.position.y}px` }}
          opacity={0.85}
        />
      )}

      {/* Pulsing rings for selected */}
      {isSelected && (
        <>
          <motion.circle
            cx={gene.position.x}
            cy={gene.position.y}
            r={radius + 30}
            fill="none"
            stroke={gene.color}
            strokeWidth={2}
            opacity={0.6}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: [0.8, 1.4, 0.8],
              opacity: [0.6, 0, 0.6]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </>
      )}

      {/* Main node circle */}
      <motion.circle
        cx={gene.position.x}
        cy={gene.position.y}
        r={radius}
        fill={`url(#gradient-${gene.name})`}
        stroke={isBlocked ? '#ef4444' : isMutantLof ? '#94a3b8' : isSelected ? displayColor : 'rgba(255,255,255,0.9)'}
        strokeWidth={isSelected ? 4 : isMutantLof ? 2.5 : isBlocked ? 3 : 3}
        strokeDasharray={isMutantLof ? '8,4' : isBlocked ? '6,3' : 'none'}
        filter={isSelected || isHovered ? 'url(#soft-glow)' : 'none'}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay, type: 'spring', stiffness: 200, damping: 25 }}
        whileHover={{ scale: 1.1 }}
        className="drop-shadow-2xl"
      />

      {/* Enhanced gradient definitions */}
      <defs>
        <radialGradient id={`gradient-${gene.name}`}>
          <stop offset="0%" stopColor={displayColor} stopOpacity={0.75} />
          <stop offset="60%" stopColor={displayColor} stopOpacity={0.9} />
          <stop offset="100%" stopColor={displayColor} stopOpacity={1} />
        </radialGradient>

        <filter id="soft-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        
        <filter id="organic-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Gene name text */}
      <motion.text
        x={gene.position.x}
        y={gene.position.y}
        textAnchor="middle"
        dy=".35em"
        fill="#ffffff"
        fontSize={isSelected ? "18" : "15"}
        fontWeight="700"
        fontFamily="Inter, sans-serif"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.3 }}
        filter={isSelected ? "url(#soft-glow)" : "none"}
        className="pointer-events-none select-none"
      >
        {gene.name}
      </motion.text>

      {/* HGT badge */}
      {showHgt && (
        <text x={gene.position.x + radius - 4} y={gene.position.y - radius + 4} fontSize="10" textAnchor="middle" className="pointer-events-none">🧬</text>
      )}
    </g>
  );
}