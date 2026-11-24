import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Plane, Ship, FileCheck2, Warehouse, PackageOpen, Truck } from 'lucide-react';

const SERVICES = [
  {
    title: 'AIR FREIGHT',
    description:
      'Priority, consolidated, and charter air cargo solutions across major APAC and global hubs with tight transit predictability.',
    Icon: Plane,
  },
  {
    title: 'OCEAN FREIGHT',
    description:
      'FCL, LCL, and breakbulk vessel allocations across contracted shipping lines with proactive schedule monitoring.',
    Icon: Ship,
  },
  {
    title: 'CUSTOMS BROKERAGE',
    description:
      'Licensed customs clearance, tariff audits, biosecurity compliance, and landed-cost optimization.',
    Icon: FileCheck2,
  },
  {
    title: 'WAREHOUSING AND 3PL',
    description:
      'Bonded storage, container destuffing, pick-and-pack fulfillment, and real-time inventory visibility.',
    Icon: Warehouse,
  },
  {
    title: 'PROJECT CARGO',
    description:
      'Out-of-gauge, heavy-lift, and multi-modal infrastructure freight engineered from origin factory to site.',
    Icon: PackageOpen,
  },
  {
    title: 'DOMESTIC & INTERSTATE TRANSPORT',
    description:
      'Port cartage, sideloader delivery, and dedicated interstate linehaul connecting metro distribution centers.',
    Icon: Truck,
  },
];

export default function TruckServicesScene({ onOpenQuote }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Truck drives smoothly from left-center across the dark road deck
  const truckX = useTransform(scrollYProgress, [0, 0.72, 1], ['0vw', '46vw', '78vw']);
  const wheelRotation = useTransform(scrollYProgress, [0, 1], [0, 1080]);

  // Dark band content scrolls horizontally as the truck advances
  const horizontalTrackX = useTransform(scrollYProgress, [0.06, 0.92], ['0%', '-66%']);

  return (
    <section
      id="scene-services"
      ref={containerRef}
      className="relative h-[250vh] bg-[#ECEEF2]"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col">
        {/* Top Light Studio Sky + Driving Semi-Truck */}
        <div className="relative h-[42vh] bg-[#ECEEF2] flex items-end overflow-hidden">
          <motion.div
            style={{ x: truckX }}
            className="relative z-10 w-[560px] md:w-[680px] ml-6 md:ml-16 -mb-[2px]"
          >
            <svg
              viewBox="0 0 880 185"
              className="w-full h-auto overflow-visible"
              aria-label="United Carriers semi-truck driving across freight corridor"
            >
              {/* Trailer Chassis */}
              <rect x="20" y="136" width="680" height="11" fill="#1E293B" />
              <rect x="44" y="147" width="175" height="6" fill="#0F172A" />

              {/* 40ft White Corrugated Container */}
              <rect x="22" y="16" width="676" height="122" rx="2" fill="#F4F5F7" stroke="#CBD5E1" strokeWidth="1" />
              {Array.from({ length: 42 }).map((_, idx) => (
                <rect
                  key={idx}
                  x={36 + idx * 15.5}
                  y="24"
                  width="6"
                  height="106"
                  fill="#DCE1E8"
                />
              ))}
              <rect x="22" y="16" width="676" height="7" fill="#FFFFFF" />
              <rect x="22" y="131" width="676" height="7" fill="#CBD5E1" />
              <text x="72" y="58" fill="#334155" fontSize="14" fontWeight="800" letterSpacing="2">
                UC
              </text>

              {/* Rear Tri-Axle Wheels with rotation */}
              {[76, 126, 176].map((wx) => (
                <g key={wx} transform={`translate(${wx}, 159)`}>
                  <motion.g style={{ rotate: wheelRotation }}>
                    <circle cx="0" cy="0" r="23" fill="#111318" />
                    <circle cx="0" cy="0" r="12" fill="#94A3B8" />
                    <rect x="-2" y="-12" width="4" height="24" fill="#334155" />
                    <rect x="-12" y="-2" width="24" height="4" fill="#334155" />
                    <circle cx="0" cy="0" r="5" fill="#1E293B" />
                  </motion.g>
                </g>
              ))}

              {/* Tractor Cab-Over Unit */}
              <g transform="translate(702, 24)">
                <path
                  d="M 8 114 L 8 16 Q 8 4 22 4 L 106 4 Q 126 4 134 26 L 146 76 L 146 114 Z"
                  fill="#17191E"
                />
                <path d="M 88 14 L 120 14 L 132 54 L 88 54 Z" fill="#64748B" opacity="0.75" />
                <path d="M 38 18 L 78 18 L 78 54 L 38 54 Z" fill="#475569" opacity="0.6" />
                {[68, 76, 84, 92].map((gy) => (
                  <rect key={gy} x="116" y={gy} width="26" height="4" rx="1" fill="#94A3B8" />
                ))}
                <rect x="128" y="102" width="16" height="6" rx="1" fill="#FEF08A" />
                {[34, 114].map((twx) => (
                  <g key={twx} transform={`translate(${twx}, 135)`}>
                    <motion.g style={{ rotate: wheelRotation }}>
                      <circle cx="0" cy="0" r="24" fill="#111318" />
                      <circle cx="0" cy="0" r="13" fill="#94A3B8" />
                      <rect x="-2" y="-13" width="4" height="26" fill="#334155" />
                      <rect x="-13" y="-2" width="26" height="4" fill="#334155" />
                      <circle cx="0" cy="0" r="5" fill="#1E293B" />
                    </motion.g>
                  </g>
                ))}
              </g>
            </svg>
          </motion.div>
        </div>

        {/* Lower Deep Obsidian Deck with Horizontal Sliding Services */}
        <div className="relative h-[58vh] bg-[#0D0E11] text-white flex items-center overflow-hidden border-t border-white/10">
          <motion.div
            style={{ x: horizontalTrackX }}
            className="flex items-stretch gap-12 md:gap-20 px-8 md:px-20 w-max"
          >
            {/* Opening Statement Block */}
            <div className="w-[88vw] md:w-[66vw] lg:w-[58vw] shrink-0 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-7">
                <h2 className="font-display text-[clamp(2rem,4vw,3.6rem)] font-extrabold leading-[0.96] tracking-tight uppercase text-balance">
                  Everything Your
                  <br />
                  Freight Needs.
                  <br />
                  Under One Group.
                </h2>
              </div>

              <div className="md:col-span-5 space-y-6">
                <p className="text-sm md:text-base text-slate-300 leading-relaxed">
                  From air and ocean freight to customs clearance, bonded 3PL storage, and
                  last-mile delivery, we coordinate every stage through one accountable team.
                </p>
                <button
                  type="button"
                  onClick={onOpenQuote}
                  className="px-5 py-2.5 rounded-full border border-white/25 text-xs font-semibold tracking-wider uppercase text-white hover:bg-white hover:text-[#111318] transition-colors cursor-pointer whitespace-nowrap"
                >
                  Our Services
                </button>
              </div>
            </div>

            {/* 6 Horizontal Service Columns */}
            <div className="flex items-stretch gap-8 md:gap-10 pr-24">
              {SERVICES.map(({ title, description, Icon }, idx) => (
                <div
                  key={title}
                  className="w-[260px] md:w-[290px] shrink-0 border-t border-white/20 pt-6 flex flex-col justify-between gap-8"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-slate-400">
                      <Icon className="w-7 h-7 stroke-[1.5] text-white" />
                      <span className="font-mono-tabular text-xs">
                        0{idx + 1}
                      </span>
                    </div>
                    <h3 className="font-display text-lg font-bold tracking-tight uppercase">
                      {title}
                    </h3>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
