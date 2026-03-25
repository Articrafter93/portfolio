'use client';

import { motion } from 'motion/react';

/* ─── Palette — high-contrast for true 3D ──────────────────────────── */
const CO = {
  indigo:       '#6366f1',
  indigoBright: '#818cf8',
  violet:       '#8b5cf6',
  violetBright: '#a78bfa',
  /* Front face: darkest */
  front:        '#080818',
  frontStroke:  '#4f52b5',
  /* Side face: clearly lighter — shows depth */
  side:         '#1a1d5e',
  sideStroke:   '#6366f1',
  /* Top face: brightest — catches light */
  top:          '#2d3194',
  topStroke:    '#818cf8',
  /* Units */
  unitFront:    '#0c0c22',
  unitSide:     '#191d55',
  unitTop:      '#2a2e7a',
  /* LED colors */
  ledGreen:     '#10b981',
  ledRed:       '#ef4444',
  ledBlue:      '#3b82f6',
  /* Details */
  vent:         'rgba(130,138,255,0.35)',
  border:       '#5355cc',
};

/* 3D depth — large enough to be unmistakable */
const DX = 50;
const DY = -28;

/* ─── Helpers ──────────────────────────────────────────────────────── */
function pts(coords: [number, number][]) {
  return coords.map(([x, y]) => `${x},${y}`).join(' ');
}

/* ─── LED ──────────────────────────────────────────────────────────── */
function LED({ cx, cy, color, delay, r = 3 }: {
  cx: number; cy: number; color: string; delay: number; r?: number;
}) {
  return (
    <motion.circle cx={cx} cy={cy} r={r} fill={color}
      style={{ filter: `drop-shadow(0 0 5px ${color})` }}
      animate={{ opacity: [0.15, 1, 0.15] }}
      transition={{ duration: 1.3 + delay * 0.25, repeat: Infinity, delay, ease: 'easeInOut' }}
    />
  );
}

/* ─── Vertical tracer ──────────────────────────────────────────────── */
function VTrace({ x, y0, y1, dur, delay, color, r = 3.5 }: {
  x: number; y0: number; y1: number;
  dur: number; delay: number; color: string; r?: number;
}) {
  return (
    <motion.circle r={r} fill={color}
      initial={{ cx: x, cy: y0 }}
      style={{ filter: `drop-shadow(0 0 8px ${color})` }}
      animate={{ cx: x, cy: [y0, y1] }}
      transition={{ duration: dur, repeat: Infinity, delay, ease: 'easeInOut', repeatType: 'mirror' }}
    />
  );
}

/* ─── 3D server unit with real depth ───────────────────────────────── */
function Unit3D({ x, y, w, h, i, dx }: {
  x: number; y: number; w: number; h: number; i: number; dx: number;
}) {
  const ledColors = [CO.ledGreen, CO.ledRed, CO.ledBlue];
  const led1 = ledColors[i % 3];
  const led2 = ledColors[(i + 1) % 3];
  const udx = dx * 0.6;  // unit depth slightly less than rack
  const udy = DY * 0.6;

  /* Top face */
  const topFace = pts([
    [x, y], [x + w, y],
    [x + w + udx, y + udy],
    [x + udx, y + udy],
  ]);

  /* Side face (right side for left rack, left side for right rack) */
  const sideFace = dx > 0
    ? pts([[x + w, y], [x + w + udx, y + udy], [x + w + udx, y + h + udy], [x + w, y + h]])
    : pts([[x, y], [x + udx, y + udy], [x + udx, y + h + udy], [x, y + h]]);

  return (
    <g>
      {/* Side face — depth */}
      <polygon points={sideFace}
        fill={CO.unitSide} stroke={CO.sideStroke} strokeWidth={0.5} />
      {/* Top face — lit */}
      <polygon points={topFace}
        fill={CO.unitTop} stroke={CO.topStroke} strokeWidth={0.5} />
      {/* Front face */}
      <rect x={x} y={y} width={w} height={h} rx={1.5}
        fill={CO.unitFront} stroke={CO.frontStroke} strokeWidth={0.7} />
      {/* Vent slots */}
      {[5, 9, 13, 17].map(dy => (
        <line key={dy} x1={x + 7} y1={y + dy} x2={x + w - 36} y2={y + dy}
          stroke={CO.vent} strokeWidth={0.9} />
      ))}
      {/* HDD activity */}
      <motion.rect
        x={x + w - 32} y={y + h / 2 - 4} width={12} height={5} rx={1.5}
        fill={led1}
        style={{ filter: `drop-shadow(0 0 4px ${led1})` }}
        animate={{ opacity: [0.15, 0.95, 0.15] }}
        transition={{ duration: 0.85 + i * 0.18, repeat: Infinity, delay: i * 0.09 }}
      />
      {/* Status LED */}
      <LED cx={x + w - 12} cy={y + h / 2} color={led2} delay={i * 0.14} r={2.8} />
    </g>
  );
}

/* ─── Full 3D rack ─────────────────────────────────────────────────── */
function Rack({ x, y: rackY, H, dx }: {
  x: number; y: number; H: number; dx: number;
}) {
  const W = 155;
  const unitH = 30, gap = 4;
  const n = Math.floor((H - 30) / (unitH + gap));

  /* Rack top face */
  const topFace = pts([
    [x, rackY], [x + W, rackY],
    [x + W + dx, rackY + DY],
    [x + dx, rackY + DY],
  ]);

  /* Rack side face */
  const sideFace = dx > 0
    ? pts([[x + W, rackY], [x + W + dx, rackY + DY], [x + W + dx, rackY + H + DY], [x + W, rackY + H]])
    : pts([[x, rackY], [x + dx, rackY + DY], [x + dx, rackY + H + DY], [x, rackY + H]]);

  /* Rack bottom face (to close the box) */
  const bottomFace = pts([
    [x, rackY + H], [x + W, rackY + H],
    [x + W + dx, rackY + H + DY],
    [x + dx, rackY + H + DY],
  ]);

  return (
    <g>
      {/* ── Side face (depth) ── */}
      <polygon points={sideFace}
        fill={CO.side} stroke={CO.sideStroke} strokeWidth={1.2} />

      {/* ── Top face (light-catching) ── */}
      <polygon points={topFace}
        fill={CO.top} stroke={CO.topStroke} strokeWidth={1.5} />

      {/* ── Bottom face ── */}
      <polygon points={bottomFace}
        fill={CO.side} stroke={CO.sideStroke} strokeWidth={0.8} opacity={0.6} />

      {/* ── Front face ── */}
      <rect x={x} y={rackY} width={W} height={H}
        fill={CO.front} stroke={CO.sideStroke} strokeWidth={1.8} />

      {/* Edge glow lines on front corners */}
      <line x1={x} y1={rackY} x2={x} y2={rackY + H}
        stroke={CO.indigoBright} strokeWidth={1.5} opacity={0.6} />
      <line x1={x + W} y1={rackY} x2={x + W} y2={rackY + H}
        stroke={CO.indigoBright} strokeWidth={1.5} opacity={0.6} />

      {/* Top accent strip (front face) */}
      <rect x={x + 4} y={rackY + 5} width={W - 8} height={5} rx={2}
        fill={CO.indigo} style={{ filter: `drop-shadow(0 0 5px ${CO.indigo})` }} opacity={0.9} />

      {/* Mounting screws */}
      {[x + 12, x + W - 12].map((cx, i) => (
        <g key={i}>
          <circle cx={cx} cy={rackY + 18} r={4}
            fill="#0d0d20" stroke={CO.border} strokeWidth={1.2} />
          <circle cx={cx} cy={rackY + H - 18} r={4}
            fill="#0d0d20" stroke={CO.border} strokeWidth={1.2} />
        </g>
      ))}

      {/* ── 3D server units ── */}
      {Array.from({ length: n }, (_, i) => (
        <Unit3D key={i}
          x={x + 6}
          y={rackY + 28 + i * (unitH + gap)}
          w={W - 12} h={unitH}
          i={i} dx={dx}
        />
      ))}

      {/* Bottom port panel */}
      <rect x={x + 4} y={rackY + H - 26} width={W - 8} height={20} rx={2}
        fill="#0a0a1c" stroke={CO.border} strokeWidth={0.8} />
      {[12, 24, 36, 48, 60, 72].map(px => (
        <rect key={px} x={x + px} y={rackY + H - 22} width={8} height={12} rx={2}
          fill={CO.indigo} opacity={0.5} />
      ))}

      {/* ── Vertical energy tracers ── */}
      <VTrace x={x + 26}      y0={rackY + 35}   y1={rackY + H - 35} dur={3.0} delay={0.0} color={CO.indigo}       r={4} />
      <VTrace x={x + W - 26}  y0={rackY + H - 35} y1={rackY + 35}   dur={3.8} delay={1.2} color={CO.violet}       r={4} />
      <VTrace x={x + 52}      y0={rackY + 35}   y1={rackY + H - 35} dur={3.4} delay={2.1} color={CO.indigoBright} r={3} />
      <VTrace x={x + W - 52}  y0={rackY + H - 35} y1={rackY + 35}   dur={4.2} delay={0.6} color={CO.violetBright} r={2.5} />
    </g>
  );
}

/* ─── Circuit beam with light trail ────────────────────────────────── */
function CircuitBeam({ points, dur, delay, color, r = 3.5 }: {
  points: [number, number][];
  dur: number; delay: number; color: string; r?: number;
}) {
  const n = points.length;
  const cxs = points.map(p => p[0]);
  const cys = points.map(p => p[1]);
  const opacities = points.map((_, i) =>
    i === 0 || i === n - 1 ? 0 : 1
  );
  /* charge briefly in rack → lightning traverse → brief arrival */
  const times = points.map((_, i) => {
    if (i === 0) return 0;
    if (i === 1) return 0.12;
    if (i === n - 1) return 1;
    return 0.12 + ((i - 1) / (n - 2)) * 0.80;
  });

  /* Trail: 3 ghost particles fading behind */
  const trails = [
    { offset: 0.025, opacity: 0.4, size: r * 0.9 },
    { offset: 0.05,  opacity: 0.25, size: r * 0.7 },
    { offset: 0.08,  opacity: 0.1,  size: r * 0.5 },
  ];

  return (
    <>
      {/* Light trail ghosts */}
      {trails.map((trail, ti) => (
        <motion.circle key={`trail-${ti}`} r={trail.size} fill={color}
          initial={{ cx: cxs[0], cy: cys[0] }}
          style={{ filter: `drop-shadow(0 0 ${6 * trail.opacity}px ${color})`, opacity: trail.opacity }}
          animate={{ cx: cxs, cy: cys }}
          transition={{
            duration: dur, repeat: Infinity, delay: delay + trail.offset * dur,
            ease: 'linear', times,
          }}
        />
      ))}
      {/* Main particle */}
      <motion.circle r={r} fill={color}
        initial={{ cx: cxs[0], cy: cys[0], opacity: 0 }}
        style={{ filter: `drop-shadow(0 0 16px ${color})` }}
        animate={{ cx: cxs, cy: cys, opacity: opacities }}
        transition={{
          duration: dur, repeat: Infinity, delay,
          ease: 'linear', times, repeatDelay: 5 - dur,
        }}
      />
    </>
  );
}

/* ─── Main export ───────────────────────────────────────────────────── */
export function HeroServers({ reduced }: { reduced: boolean }) {
  if (reduced) return null;

  const VW = 1440;
  const VH = 900;
  const RACK_W = 155;
  const RACK_Y = 35;           // leave room for top face
  const RACK_H = VH - RACK_Y - 10;

  // edges where beams originate / arrive
  const lEdge = RACK_W + Math.abs(DX);
  const rEdge = VW - RACK_W - Math.abs(DX);

  /* 2 circuit-board paths — 50% fewer particles, slower speed */
  const circuits: { points: [number, number][]; dur: number; delay: number; color: string; r: number }[] = [
    /* L → R */
    { points: [[80,300],[lEdge,300],[400,300],[400,240],[800,240],[800,320],[rEdge,320],[1320,320]],
      dur: 3.375, delay: 0.0, color: CO.indigo, r: 4 },
    /* R → L */
    { points: [[1360,500],[rEdge,500],[900,500],[900,450],[600,450],[600,520],[lEdge,520],[100,520]],
      dur: 4.05, delay: 0.0, color: CO.violet, r: 4 },
  ];

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden hidden lg:block"
      aria-hidden="true"
    >
      <svg
        viewBox={`0 0 ${VW} ${VH}`}
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full"
        style={{ opacity: 0.9 }}
      >
        {/* Left rack — depth extends right (+DX) */}
        <Rack x={0} y={RACK_Y} H={RACK_H} dx={DX} />

        {/* Right rack — depth extends left (-DX) */}
        <Rack x={VW - RACK_W} y={RACK_Y} H={RACK_H} dx={-DX} />

        {/* Channel guides */}
        {[180, 360, 540, 720].map((y, i) => (
          <line key={i} x1={lEdge} y1={y} x2={rEdge} y2={y}
            stroke="rgba(99,102,241,0.07)" strokeWidth={0.8} strokeDasharray="10 18" />
        ))}

        {/* Circuit beams — 7 max, angular paths, lightning speed */}
        {circuits.map(({ points, dur, delay, color, r }, i) => (
          <CircuitBeam key={i} points={points} dur={dur} delay={delay} color={color} r={r} />
        ))}
      </svg>
    </div>
  );
}
