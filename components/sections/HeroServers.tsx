'use client';

import { motion } from 'motion/react';

const C = {
  indigo:    '#6366f1',
  violet:    '#8b5cf6',
  indigoDim: 'rgba(99,102,241,0.25)',
  bg:        'rgba(8,8,20,0.65)',
  border:    'rgba(99,102,241,0.32)',
  unit:      'rgba(99,102,241,0.06)',
  vent:      'rgba(99,102,241,0.14)',
};

/* ─── LED blinker ───────────────────────────────────────────────────────── */
function Blinker({ cx, cy, delay, color }: {
  cx: number; cy: number; delay: number; color: string;
}) {
  return (
    <motion.circle
      cx={cx} cy={cy} r={2.4}
      fill={color}
      style={{ filter: `drop-shadow(0 0 3px ${color})` }}
      animate={{ opacity: [0.15, 1, 0.15] }}
      transition={{ duration: 1.3 + delay * 0.25, repeat: Infinity, delay, ease: 'easeInOut' }}
    />
  );
}

/* ─── Particle traveling along Y (inside rack) ──────────────────────────── */
function VTracer({ x, yFrom, yTo, duration, delay, color, r = 2.5 }: {
  x: number; yFrom: number; yTo: number;
  duration: number; delay: number; color: string; r?: number;
}) {
  return (
    <motion.circle
      cx={x} r={r}
      fill={color}
      style={{ filter: `drop-shadow(0 0 5px ${color})` }}
      animate={{ cy: [yFrom, yTo] }}
      transition={{ duration, repeat: Infinity, delay, ease: 'easeInOut', repeatType: 'mirror' }}
    />
  );
}

/* ─── Single server unit (drawer) ───────────────────────────────────────── */
function Unit({ x, y, w, h, i }: {
  x: number; y: number; w: number; h: number; i: number;
}) {
  const led1 = i % 3 === 0 ? C.violet : C.indigo;
  const led2 = i % 2 === 0 ? C.indigo : C.violet;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={1.5}
        fill={C.unit} stroke={C.indigoDim} strokeWidth={0.7} />
      {/* Vent slots */}
      {[5, 9, 13].map(dy => (
        <line key={dy} x1={x + 6} y1={y + dy} x2={x + w - 30} y2={y + dy}
          stroke={C.vent} strokeWidth={0.5} />
      ))}
      {/* Drive activity light */}
      <motion.rect x={x + w - 26} y={y + h / 2 - 3} width={8} height={6} rx={1}
        fill={led1}
        style={{ filter: `drop-shadow(0 0 2px ${led1})` }}
        animate={{ opacity: [0.15, 0.85, 0.15] }}
        transition={{ duration: 0.9 + i * 0.22, repeat: Infinity, delay: i * 0.12 }}
      />
      {/* Status LED */}
      <Blinker cx={x + w - 10} cy={y + h / 2} delay={i * 0.15} color={led2} />
    </g>
  );
}

/* ─── Full rack ─────────────────────────────────────────────────────────── */
function Rack({ ox, oy, flip }: { ox: number; oy: number; flip?: boolean }) {
  const W = 122, H = 320;
  const unitH = 26, gap = 5, n = 9;
  const x = flip ? ox - W : ox;
  const startY = oy + 10;

  return (
    <g>
      {/* Body */}
      <rect x={x} y={oy} width={W} height={H} rx={4}
        fill={C.bg} stroke={C.border} strokeWidth={1.4} />

      {/* Corner bracket accents */}
      <path d={`M${x},${oy + 16} L${x},${oy} L${x + 16},${oy}`}
        fill="none" stroke={C.indigo} strokeWidth={2} />
      <path d={`M${x + W - 16},${oy} L${x + W},${oy} L${x + W},${oy + 16}`}
        fill="none" stroke={C.indigo} strokeWidth={2} />
      <path d={`M${x},${oy + H - 16} L${x},${oy + H} L${x + 16},${oy + H}`}
        fill="none" stroke={C.indigo} strokeWidth={2} />
      <path d={`M${x + W - 16},${oy + H} L${x + W},${oy + H} L${x + W},${oy + H - 16}`}
        fill="none" stroke={C.indigo} strokeWidth={2} />

      {/* Top label bar */}
      <rect x={x + 5} y={oy + 4} width={W - 10} height={3} rx={1}
        fill="rgba(99,102,241,0.4)" />

      {/* Server units */}
      {Array.from({ length: n }, (_, i) => (
        <Unit key={i}
          x={x + 5}
          y={startY + 6 + i * (unitH + gap)}
          w={W - 10} h={unitH} i={i}
        />
      ))}

      {/* Bottom port strip */}
      <rect x={x + 5} y={oy + H - 10} width={W - 10} height={5} rx={1}
        fill="rgba(99,102,241,0.18)" />
      {[10, 18, 26, 34].map(px => (
        <rect key={px} x={x + px} y={oy + H - 9} width={4} height={3} rx={0.5}
          fill="rgba(99,102,241,0.5)" />
      ))}

      {/* Vertical energy tracers */}
      <VTracer x={x + 20} yFrom={oy + 18} yTo={oy + H - 16}
        duration={3.1} delay={0}   color={C.indigo} />
      <VTracer x={x + W - 20} yFrom={oy + H - 16} yTo={oy + 18}
        duration={3.9} delay={1.0} color={C.violet} />
      <VTracer x={x + 38} yFrom={oy + 18} yTo={oy + H - 16}
        duration={3.5} delay={2.0} color={C.indigo} r={2} />
    </g>
  );
}

/* ─── Beam particle L→R or R→L ─────────────────────────────────────────── */
function Beam({ xFrom, xTo, y, duration, delay, color, r = 2.4 }: {
  xFrom: number; xTo: number; y: number;
  duration: number; delay: number; color: string; r?: number;
}) {
  return (
    <motion.circle
      cy={y} r={r}
      fill={color}
      style={{ filter: `drop-shadow(0 0 6px ${color})` }}
      animate={{
        cx:      [xFrom, xTo],
        opacity: [0, 0.9, 0.9, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: 'linear',
        times: [0, 0.04, 0.96, 1],
        repeatDelay: 0.25,
      }}
    />
  );
}

/* ─── Main export ───────────────────────────────────────────────────────── */
export function HeroServers({ reduced }: { reduced: boolean }) {
  if (reduced) return null;

  // Right edge of left rack → Left edge of right rack
  // viewBox 1440×900; left rack at ox=0 (W=122 → right edge 122)
  // right rack (flip) at ox=1440 (left edge = 1440-122 = 1318)
  const lEdge  = 122;
  const rEdge  = 1318;

  const lrBeams = [
    { y: 300, dur: 3.2, delay: 0.0,  color: C.indigo },
    { y: 355, dur: 3.8, delay: 1.1,  color: C.violet },
    { y: 415, dur: 2.9, delay: 2.0,  color: C.indigo },
    { y: 465, dur: 4.0, delay: 0.5,  color: C.violet },
    { y: 330, dur: 3.5, delay: 3.0,  color: C.indigo },
  ];
  const rlBeams = [
    { y: 340, dur: 3.1, delay: 1.6,  color: C.violet },
    { y: 390, dur: 3.6, delay: 2.5,  color: C.indigo },
    { y: 440, dur: 2.8, delay: 0.8,  color: C.violet },
  ];

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden hidden lg:block"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full"
        style={{ opacity: 0.72 }}
      >
        {/* ── Left rack (slightly clipped on far left) ── */}
        <Rack ox={0} oy={190} />

        {/* ── Right rack (mirrored, slightly clipped on far right) ── */}
        <Rack ox={1440} oy={190} flip />

        {/* ── Faint channel lines ── */}
        {[310, 380, 450].map((y, i) => (
          <line key={i}
            x1={lEdge} y1={y} x2={rEdge} y2={y}
            stroke="rgba(99,102,241,0.05)" strokeWidth={0.6} strokeDasharray="6 10" />
        ))}

        {/* ── L → R beams ── */}
        {lrBeams.map(({ y, dur, delay, color }, i) => (
          <Beam key={i}
            xFrom={lEdge} xTo={rEdge}
            y={y} duration={dur} delay={delay} color={color} />
        ))}

        {/* ── R → L return beams ── */}
        {rlBeams.map(({ y, dur, delay, color }, i) => (
          <Beam key={`r${i}`}
            xFrom={rEdge} xTo={lEdge}
            y={y} duration={dur} delay={delay} color={color} r={2} />
        ))}
      </svg>
    </div>
  );
}
