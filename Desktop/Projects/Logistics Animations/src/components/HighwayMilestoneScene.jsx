import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Radar, Globe2, Headphones, UserCheck } from 'lucide-react';

const MILESTONES = [
  {
    title: 'REAL-TIME FREIGHT TRACKING',
    detail: 'Live vessel, air waybill, and road GPS telemetry at every checkpoint.',
    Icon: Radar,
  },
  {
    title: 'GLOBAL NETWORK COVERAGE',
    detail: 'Direct port and airport partnerships spanning APAC, Europe, and North America.',
    Icon: Globe2,
  },
  {
    title: '24/7 CUSTOMER SERVICE',
    detail: 'Round-the-clock operations specialists ready to resolve customs or carrier exceptions.',
    Icon: Headphones,
  },
  {
    title: 'DEDICATED ACCOUNT MANAGEMENT',
    detail: 'One senior logistics lead who understands your lanes, SKU cadence, and SLA targets.',
    Icon: UserCheck,
  },
];

export default function HighwayMilestoneScene() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Top-down truck descends along the vertical black highway corridor
  const truckY = useTransform(scrollYProgress, [0.05, 0.85], ['-18vh', '84vh']);
  // Corner sweep transitions from horizontal dark bar into the vertical highway corridor
  const topCornerOpacity = useTransform(scrollYProgress, [0, 0.16], [1, 0]);
  // Ocean quay rises cleanly at the bottom as the truck reaches the port edge
  const quayRevealY = useTransform(scrollYProgress, [0.76, 1], ['100%', '0%']);

  return (
    <section
      id="scene-milestones"
      ref={containerRef}
      className="relative h-[220vh] bg-[#EAECEF] text-[#111318]"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Initial 90° Corner Sweep Overlay from Horizontal Road into Vertical Corridor */}
        <motion.div
          style={{ opacity: topCornerOpacity }}
          className="absolute inset-x-0 top-0 h-28 bg-[#0D0E11] z-10 pointer-events-none"
        />

        {/* Vertical Black Highway Corridor */}
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 md:left-[42%] w-24 sm:w-32 md:w-36 bg-[#0D0E11] z-10 overflow-hidden shadow-inner">
          {/* Subtle dashed center highway markings */}
          <div
            className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[2px] opacity-25"
            style={{
              backgroundImage:
                'repeating-linear-gradient(to bottom, #FFFFFF 0px, #FFFFFF 18px, transparent 18px, transparent 42px)',
            }}
          />

          {/* Top-Down Semi-Truck Driving Downward */}
          <motion.div
            style={{ y: truckY }}
            className="relative w-14 sm:w-16 md:w-[70px] mx-auto"
          >
            <svg
              viewBox="0 0 80 260"
              className="w-full h-auto drop-shadow-xl"
              aria-label="Top-down view of United Carriers truck traveling down highway"
            >
              {/* White 40ft Container Roof */}
              <rect x="10" y="6" width="60" height="186" rx="2" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1" />
              {/* Roof Corrugation Ribs */}
              {Array.from({ length: 24 }).map((_, idx) => (
                <rect
                  key={idx}
                  x="15"
                  y={14 + idx * 7.4}
                  width="50"
                  height="3"
                  fill="#E2E8F0"
                />
              ))}
              {/* Corner twist-locks */}
              <rect x="10" y="6" width="6" height="6" fill="#64748B" />
              <rect x="64" y="6" width="6" height="6" fill="#64748B" />
              <rect x="10" y="186" width="6" height="6" fill="#64748B" />
              <rect x="64" y="186" width="6" height="6" fill="#64748B" />

              {/* Fifth-wheel connector */}
              <rect x="24" y="192" width="32" height="10" fill="#1E293B" />

              {/* Tractor Cab Roof (facing downward) */}
              <path
                d="M 10 202 L 70 202 L 70 242 Q 70 252 60 254 L 20 254 Q 10 252 10 242 Z"
                fill="#17191E"
              />
              {/* Side mirrors */}
              <rect x="3" y="232" width="7" height="4" rx="1" fill="#334155" />
              <rect x="70" y="232" width="7" height="4" rx="1" fill="#334155" />
              {/* Windshield */}
              <path d="M 15 236 L 65 236 L 61 248 L 19 248 Z" fill="#64748B" opacity="0.85" />
              {/* Subtle Headlight Glows */}
              <rect x="14" y="252" width="10" height="3" rx="1" fill="#FEF08A" />
              <rect x="56" y="252" width="10" height="3" rx="1" fill="#FEF08A" />
            </svg>
          </motion.div>
        </div>

        {/* Left & Right Content Grid */}
        <div className="relative z-20 max-w-[1360px] mx-auto h-full px-6 md:px-14 pt-24 pb-16 grid grid-cols-1 md:grid-cols-12 items-center pointer-events-none">
          {/* Left Editorial Headline */}
          <div className="md:col-span-4 self-start md:self-center space-y-6">
            <h2 className="font-display text-[clamp(2.2rem,4.2vw,3.75rem)] font-extrabold leading-[0.94] tracking-tight uppercase text-balance">
              Reliability
              <br />
              At Every
              <br />
              Milestone
            </h2>
            <p className="text-sm text-slate-600 max-w-xs leading-relaxed">
              Coordinated fleet dispatch, customs pre-clearance, and transparent milestone alerts
              from factory gate to final warehouse dock.
            </p>
          </div>

          {/* Center spacer for highway corridor */}
          <div className="hidden md:block md:col-span-2" />

          {/* Right Milestone Pillars */}
          <div className="md:col-span-6 md:pl-8 space-y-0 bg-[#EAECEF]/85 md:bg-transparent backdrop-blur-xs md:backdrop-blur-none rounded-lg p-4 md:p-0">
            {MILESTONES.map(({ title, detail, Icon }, index) => (
              <div
                key={title}
                className="py-5 border-b border-slate-300/90 first:border-t flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-full border border-slate-400/70 flex items-center justify-center shrink-0 bg-white/70">
                  <Icon className="w-4 h-4 text-[#111318] stroke-[1.75]" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="font-mono-tabular text-[11px] text-slate-500">
                      0{index + 1}
                    </span>
                    <h3 className="font-display text-sm md:text-base font-bold tracking-tight uppercase">
                      {title}
                    </h3>
                  </div>
                  <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                    {detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Port Quay / Deep Ocean Transition Peek */}
        <motion.div
          style={{ y: quayRevealY }}
          className="absolute inset-x-0 bottom-0 h-[36vh] z-30 bg-[#042B7B] border-t-8 border-[#17191E] overflow-hidden flex items-start justify-center pointer-events-none"
        >
          <div
            className="absolute inset-0 opacity-50 bg-cover bg-center"
            style={{ backgroundImage: 'url("/src/assets/images/ocean_aerial_backdrop_1795493674363.jpg")' }}
          />
          <div className="relative z-10 w-36 h-full flex justify-center">
            <div className="w-24 h-full bg-gradient-to-b from-white/30 to-transparent animate-wake" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
