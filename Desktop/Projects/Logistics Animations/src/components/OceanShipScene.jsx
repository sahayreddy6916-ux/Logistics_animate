import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import {
  SlidersHorizontal,
  Eye,
  ShieldCheck,
  DollarSign,
  UserCheck,
  Layers,
  ChevronsRight,
} from 'lucide-react';

const CONTAINER_BAYS = [
  ['#0B62D6', '#DC2626', '#F8FAFC', '#033C99', '#F59E0B', '#DC2626', '#0EA5E9', '#10B981'],
  ['#DC2626', '#F8FAFC', '#0B62D6', '#F59E0B', '#033C99', '#0EA5E9', '#DC2626', '#F8FAFC'],
  ['#10B981', '#0B62D6', '#F8FAFC', '#DC2626', '#033C99', '#F59E0B', '#0B62D6', '#DC2626'],
  ['#033C99', '#F59E0B', '#DC2626', '#F8FAFC', '#0B62D6', '#10B981', '#F8FAFC', '#033C99'],
  ['#F59E0B', '#0B62D6', '#DC2626', '#F8FAFC', '#0EA5E9', '#033C99', '#DC2626', '#F59E0B'],
];

export default function OceanShipScene() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Ship scales from macro container deck -> full vessel -> distant sea dot
  const shipScale = useTransform(scrollYProgress, [0, 0.25, 0.56, 0.82, 1], [2.15, 1.35, 0.72, 0.36, 0.14]);
  const shipY = useTransform(scrollYProgress, [0, 0.35, 0.75, 1], ['10%', '2%', '0%', '-12%']);
  const shipOpacity = useTransform(scrollYProgress, [0, 0.88, 1], [1, 1, 0.3]);

  // Center headline "LOGISTICS THAT WORKS AS HARD AS YOU DO."
  const headlineOpacity = useTransform(scrollYProgress, [0.22, 0.34, 0.54, 0.64], [0, 1, 1, 0]);
  const headlineY = useTransform(scrollYProgress, [0.22, 0.36, 0.64], [32, 0, -28]);

  // 6 Symmetrical Ocean Pillars around the vessel
  const pillarsOpacity = useTransform(scrollYProgress, [0.54, 0.65, 0.82, 0.9], [0, 1, 1, 0]);
  const pillarsScale = useTransform(scrollYProgress, [0.54, 0.68], [0.94, 1]);

  // Clouds drift upward & transition deep cobalt sea into bright #ECEEF2 sky
  const cloudOpacity = useTransform(scrollYProgress, [0.76, 0.92, 1], [0, 0.92, 1]);
  const cloudY = useTransform(scrollYProgress, [0.76, 1], ['22%', '0%']);
  const skyBrightenOpacity = useTransform(scrollYProgress, [0.88, 1], [0, 1]);

  return (
    <section
      id="scene-ocean"
      ref={containerRef}
      className="relative h-[260vh] bg-[#042466] text-white"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Generated Deep Ocean Aerial Backdrop */}
        <img
          src="/src/assets/images/ocean_aerial_backdrop_1795493674363.jpg"
          alt="Deep cobalt aerial ocean surface"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover opacity-85"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,68,178,0.28)_0%,rgba(2,19,58,0.82)_100%)]"
        />

        {/* Top-Down Container Vessel + Frothy Sea Wake */}
        <motion.div
          style={{ scale: shipScale, y: shipY, opacity: shipOpacity }}
          className="relative z-10 w-[340px] sm:w-[400px] md:w-[440px] flex flex-col items-center pointer-events-none"
        >
          <svg
            viewBox="0 0 360 880"
            className="w-full h-auto overflow-visible"
            aria-label="Top-down ocean container ship steaming through cobalt sea"
          >
            <defs>
              <linearGradient id="hullWake" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(255,255,255,0.65)" />
                <stop offset="55%" stopColor="rgba(186,230,253,0.38)" />
                <stop offset="100%" stopColor="rgba(186,230,253,0)" />
              </linearGradient>
              <linearGradient id="hullDeck" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#1E293B" />
                <stop offset="50%" stopColor="#334155" />
                <stop offset="100%" stopColor="#0F172A" />
              </linearGradient>
            </defs>

            {/* Twin Foam Wakes Along Bow & Stern */}
            <path
              d="M 180 18 Q 108 110 82 280 L 58 840 L 106 840 L 116 260 Q 134 110 180 42 Z"
              fill="url(#hullWake)"
              className="animate-wake"
            />
            <path
              d="M 180 18 Q 252 110 278 280 L 302 840 L 254 840 L 244 260 Q 226 110 180 42 Z"
              fill="url(#hullWake)"
              className="animate-wake"
            />
            {/* Center Propeller Foam Trail */}
            <path
              d="M 150 760 L 210 760 L 238 890 L 122 890 Z"
              fill="url(#hullWake)"
              opacity="0.7"
            />

            {/* Animated Spray Lines */}
            <path
              d="M 110 150 L 90 780"
              stroke="rgba(255,255,255,0.45)"
              strokeWidth="2.5"
              strokeDasharray="16 24"
              className="animate-spray"
              fill="none"
            />
            <path
              d="M 250 150 L 270 780"
              stroke="rgba(255,255,255,0.45)"
              strokeWidth="2.5"
              strokeDasharray="16 24"
              className="animate-spray"
              fill="none"
            />

            {/* Container Ship Hull */}
            <path
              d="M 180 28 C 218 68 242 130 246 205 L 246 720 C 246 746 224 766 180 766 C 136 766 114 746 114 720 L 114 205 C 118 130 142 68 180 28 Z"
              fill="url(#hullDeck)"
              stroke="#64748B"
              strokeWidth="2"
            />
            {/* Bow Forecastle Deck */}
            <path
              d="M 180 38 C 208 72 228 122 232 162 L 128 162 C 132 122 152 72 180 38 Z"
              fill="#B91C1C"
              opacity="0.88"
            />
            <circle cx="180" cy="112" r="9" fill="#E2E8F0" opacity="0.6" />

            {/* 5 Vibrant Multi-Color Container Cargo Bays */}
            {CONTAINER_BAYS.map((rowColors, bayIndex) => {
              const bayY = 176 + bayIndex * 98;
              return (
                <g key={bayIndex} transform={`translate(124, ${bayY})`}>
                  <rect x="0" y="0" width="112" height="86" rx="2" fill="#0F172A" />
                  {rowColors.map((color, colIdx) => (
                    <g key={colIdx} transform={`translate(${2 + colIdx * 13.6}, 3)`}>
                      <rect x="0" y="0" width="11.5" height="80" rx="1" fill={color} />
                      <line x1="2" y1="8" x2="9.5" y2="8" stroke="rgba(0,0,0,0.22)" strokeWidth="1" />
                      <line x1="2" y1="40" x2="9.5" y2="40" stroke="rgba(0,0,0,0.22)" strokeWidth="1" />
                      <line x1="2" y1="72" x2="9.5" y2="72" stroke="rgba(0,0,0,0.22)" strokeWidth="1" />
                    </g>
                  ))}
                </g>
              );
            })}

            {/* Bridge Superstructure & Funnel */}
            <g transform="translate(122, 672)">
              <rect x="0" y="0" width="116" height="44" rx="3" fill="#F8FAFC" />
              <rect x="10" y="8" width="96" height="10" rx="1" fill="#334155" />
              <rect x="44" y="24" width="28" height="14" rx="2" fill="#DC2626" />
              <rect x="48" y="27" width="20" height="8" rx="1" fill="#1E293B" />
            </g>
          </svg>
        </motion.div>

        {/* Center Over-Ship Display Headline */}
        <motion.div
          style={{ opacity: headlineOpacity, y: headlineY }}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6 pointer-events-none"
        >
          <h2 className="font-display text-[clamp(2.25rem,5vw,4.4rem)] font-extrabold leading-[0.94] tracking-tight uppercase text-white drop-shadow-[0_6px_28px_rgba(2,14,44,0.85)] text-balance">
            Logistics
            <br />
            That Works
            <br />
            As Hard As
            <br />
            You Do.
          </h2>
        </motion.div>

        {/* Symmetrical Value Pillars Around the Zoomed-Out Vessel */}
        <motion.div
          style={{ opacity: pillarsOpacity, scale: pillarsScale }}
          className="absolute inset-0 z-20 max-w-[1280px] mx-auto px-6 md:px-14 py-24 flex flex-col justify-between pointer-events-none"
        >
          {/* Top Pair */}
          <div className="flex items-start justify-between gap-6">
            <div className="max-w-[230px] space-y-1.5">
              <div className="flex items-center gap-2 text-sky-200">
                <SlidersHorizontal className="w-4 h-4" />
                <span className="font-display text-xs md:text-sm font-bold tracking-wider uppercase text-white">
                  Control
                </span>
              </div>
              <p className="text-xs text-sky-100/80 leading-relaxed">
                Priority carrier space allocations and proactive customs scheduling.
              </p>
            </div>

            <div className="max-w-[230px] text-right space-y-1.5">
              <div className="flex items-center justify-end gap-2 text-sky-200">
                <span className="font-display text-xs md:text-sm font-bold tracking-wider uppercase text-white">
                  Visibility
                </span>
                <Eye className="w-4 h-4" />
              </div>
              <p className="text-xs text-sky-100/80 leading-relaxed">
                Real-time vessel AIS milestones and port-clearance updates.
              </p>
            </div>
          </div>

          {/* Middle Pair flanking the central vessel */}
          <div className="flex items-center justify-between gap-6">
            <div className="max-w-[240px] space-y-1.5 border-t border-white/25 pt-3">
              <div className="flex items-center gap-2 text-sky-200">
                <ShieldCheck className="w-4 h-4" />
                <span className="font-display text-xs md:text-sm font-bold tracking-wider uppercase text-white">
                  Compliance You Can Trust
                </span>
              </div>
              <p className="text-xs text-sky-100/80 leading-relaxed">
                Licensed biosecurity and customs documentation audited prior to sail.
              </p>
            </div>

            <div className="max-w-[240px] text-right space-y-1.5 border-t border-white/25 pt-3">
              <div className="flex items-center justify-end gap-2 text-sky-200">
                <span className="font-display text-xs md:text-sm font-bold tracking-wider uppercase text-white">
                  Competitive, Transparent Pricing
                </span>
                <DollarSign className="w-4 h-4" />
              </div>
              <p className="text-xs text-sky-100/80 leading-relaxed">
                Clear origin-to-door rate structures with zero surprise port surcharges.
              </p>
            </div>
          </div>

          {/* Bottom Trio */}
          <div className="grid grid-cols-1 md:grid-cols-3 items-end gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sky-200">
                <UserCheck className="w-4 h-4" />
                <span className="font-display text-xs font-bold tracking-wider uppercase text-white">
                  One Point of Contact
                </span>
              </div>
              <p className="text-xs text-sky-100/75">
                Single senior coordinator across every leg.
              </p>
            </div>

            <div className="flex flex-col items-center text-center space-y-1">
              <ChevronsRight className="w-5 h-5 text-white rotate-90 md:rotate-0" />
              <span className="font-display text-xs md:text-sm font-bold tracking-wider uppercase text-white">
                Fast Issue Resolution
              </span>
            </div>

            <div className="md:text-right space-y-1">
              <div className="flex items-center md:justify-end gap-2 text-sky-200">
                <span className="font-display text-xs font-bold tracking-wider uppercase text-white">
                  Full Supply Chain Visibility
                </span>
                <Layers className="w-4 h-4" />
              </div>
              <p className="text-xs text-sky-100/75">
                Unified milestone data from factory to dock.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Rising Aerial Clouds Transition into Sky Section */}
        <motion.div
          style={{ opacity: cloudOpacity, y: cloudY }}
          className="absolute inset-0 z-30 pointer-events-none"
        >
          <img
            src="/src/assets/images/clouds_transition_overlay_1795493674673.jpg"
            alt="Aerial cumulus clouds over ocean"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <motion.div
            style={{ opacity: skyBrightenOpacity }}
            className="absolute inset-0 bg-[#ECEEF2]"
          />
        </motion.div>
      </div>
    </section>
  );
}
