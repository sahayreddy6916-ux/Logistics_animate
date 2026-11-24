import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export default function ReachStackerScene() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Hero headline fades & lifts as user begins scrolling
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.2, 0.35], [1, 1, 0]);
  const headlineY = useTransform(scrollYProgress, [0, 0.35], [0, -48]);

  // Phase A & B: Side-profile reach stacker + container stack (0 -> 0.48)
  const sideSceneOpacity = useTransform(scrollYProgress, [0, 0.43, 0.5], [1, 1, 0]);
  const sideSceneScaleX = useTransform(scrollYProgress, [0.4, 0.5], [1, 0.82]);

  // Boom & Spreader articulation
  const boomAngle = useTransform(scrollYProgress, [0, 0.14, 0.25, 0.43], [-24, -18, -32, -36]);
  const boomExtend = useTransform(scrollYProgress, [0, 0.14, 0.25, 0.43], [0, 26, 26, 18]);

  // Top white container lifts off the blue container
  const whiteBoxLiftY = useTransform(scrollYProgress, [0, 0.14, 0.26, 0.43], [0, 0, -92, -110]);
  const whiteBoxShiftX = useTransform(scrollYProgress, [0, 0.26, 0.43], [0, -18, -36]);

  // Phase C & D: Front-facing 90° rotated view + flatbed semi-truck loading (0.45 -> 1.0)
  const frontSceneOpacity = useTransform(scrollYProgress, [0.43, 0.5, 1], [0, 1, 1]);
  const frontStackerOpacity = useTransform(scrollYProgress, [0.45, 0.52, 0.84, 0.94], [0, 1, 1, 0]);
  const frontStackerX = useTransform(scrollYProgress, [0.5, 0.82, 0.95], [0, 0, -180]);

  // Suspended 40ft white container in front-rotated view settles onto trailer
  const broadContainerY = useTransform(scrollYProgress, [0.46, 0.65, 0.84, 1], [-88, -88, 0, 0]);
  const broadContainerScaleX = useTransform(scrollYProgress, [0.45, 0.56], [0.72, 1]);

  // Semi-truck chassis glides in from right, aligns beneath container
  const truckSlideX = useTransform(scrollYProgress, [0.48, 0.72, 0.88, 1], [520, 0, 0, 0]);
  const bottomStackExitX = useTransform(scrollYProgress, [0.48, 0.68], [0, 220]);
  const bottomStackOpacity = useTransform(scrollYProgress, [0.45, 0.54, 0.66], [0, 0.95, 0]);

  // Scroll prompt fades quickly
  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  return (
    <section
      id="scene-yard"
      ref={containerRef}
      className="relative h-[240vh] bg-[#ECEEF2] text-[#111318]"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between">
        {/* Top-left Hero Typography */}
        <motion.div
          style={{ opacity: headlineOpacity, y: headlineY }}
          className="relative z-20 pt-24 md:pt-28 px-6 md:px-14 max-w-3xl"
        >
          <p className="text-xs font-medium tracking-[0.18em] uppercase text-slate-500 mb-3">
            End-to-End APAC Freight Architecture
          </p>
          <h1 className="font-display text-[clamp(2.5rem,5.2vw,4.5rem)] font-extrabold leading-[0.94] tracking-tight uppercase text-balance">
            We Own
            <br />
            The Outcome.
          </h1>
        </motion.div>

        {/* Scroll cue on initial frame */}
        <motion.div
          style={{ opacity: scrollHintOpacity }}
          className="absolute bottom-20 left-6 md:left-14 z-20 flex items-center gap-3 text-xs font-medium text-slate-500 tracking-wide uppercase"
        >
          <span className="inline-block w-6 h-px bg-slate-400" />
          <span>Scroll to track the consignment</span>
        </motion.div>

        {/* Center Vehicle Stage */}
        <div className="relative flex-1 w-full flex items-end justify-center">
          {/* PHASE A & B: Side-profile Reach Stacker + Container Stack */}
          <motion.div
            style={{ opacity: sideSceneOpacity, scaleX: sideSceneScaleX }}
            className="absolute inset-x-0 bottom-12 md:bottom-14 flex justify-center pointer-events-none"
          >
            <svg
              viewBox="0 0 1200 480"
              className="w-full max-w-[1180px] h-auto overflow-visible"
              aria-label="Reach stacker lifting white shipping container from yard stack"
            >
              {/* Ground Shadow */}
              <ellipse cx="430" cy="462" rx="220" ry="9" fill="rgba(17,19,24,0.16)" />
              <ellipse cx="860" cy="462" rx="185" ry="9" fill="rgba(17,19,24,0.18)" />

              {/* Bottom-Left Navy Container (End/Side) */}
              <g transform="translate(690, 322)">
                <rect x="0" y="0" width="142" height="138" rx="2" fill="#0B2859" />
                {[14, 28, 42, 56, 70, 84, 98, 112, 126].map((x) => (
                  <rect key={x} x={x} y="8" width="6" height="122" fill="#071C40" opacity="0.65" />
                ))}
                <rect x="0" y="0" width="142" height="10" fill="#133A7C" />
                <rect x="0" y="128" width="142" height="10" fill="#061736" />
                {/* Locking bars & placards */}
                <rect x="34" y="16" width="3" height="106" fill="#94A3B8" />
                <rect x="104" y="16" width="3" height="106" fill="#94A3B8" />
                <rect x="18" y="34" width="18" height="24" rx="1" fill="#E2E8F0" opacity="0.9" />
                <rect x="114" y="28" width="14" height="18" rx="1" fill="#38BDF8" opacity="0.7" />
              </g>

              {/* Bottom-Right Terracotta Red Container */}
              <g transform="translate(838, 322)">
                <rect x="0" y="0" width="142" height="138" rx="2" fill="#D9381E" />
                {[14, 28, 42, 56, 70, 84, 98, 112, 126].map((x) => (
                  <rect key={x} x={x} y="8" width="6" height="122" fill="#A82511" opacity="0.65" />
                ))}
                <rect x="0" y="0" width="142" height="10" fill="#EE4B31" />
                <rect x="0" y="128" width="142" height="10" fill="#8C1D0C" />
                <rect x="34" y="16" width="3" height="106" fill="#CBD5E1" />
                <rect x="104" y="16" width="3" height="106" fill="#CBD5E1" />
                <rect x="18" y="34" width="18" height="24" rx="1" fill="#F8FAFC" opacity="0.9" />
              </g>

              {/* Top White Corrugated Container (Lifted by Reach Stacker) */}
              <motion.g style={{ y: whiteBoxLiftY, x: whiteBoxShiftX }}>
                <g transform="translate(690, 182)">
                  <rect x="0" y="0" width="142" height="138" rx="2" fill="#F1F3F6" stroke="#CBD5E1" strokeWidth="1" />
                  {[14, 28, 42, 56, 70, 84, 98, 112, 126].map((x) => (
                    <rect key={x} x={x} y="8" width="6" height="122" fill="#D8DDE6" />
                  ))}
                  <rect x="0" y="0" width="142" height="9" fill="#FFFFFF" />
                  <rect x="0" y="129" width="142" height="9" fill="#CBD5E1" />
                  <rect x="34" y="16" width="3" height="106" fill="#64748B" />
                  <rect x="104" y="16" width="3" height="106" fill="#64748B" />
                  <rect x="16" y="34" width="18" height="22" rx="1" fill="#1E293B" opacity="0.85" />
                </g>
              </motion.g>

              {/* Articulated Reach Stacker Body */}
              <g transform="translate(215, 290)">
                {/* Chassis & Counterweight */}
                <path
                  d="M 18 118 L 24 84 L 78 66 L 235 66 L 265 92 L 265 126 L 18 126 Z"
                  fill="#008CD2"
                />
                {/* Rear black counterweight bumper */}
                <path d="M 10 92 L 32 76 L 44 126 L 10 126 Z" fill="#17191E" />
                <rect x="12" y="102" width="16" height="6" rx="1" fill="#F59E0B" />
                {/* Side radiator vents */}
                {[58, 68, 78, 88].map((vx) => (
                  <rect key={vx} x={vx} y="82" width="4" height="28" rx="1" fill="#035E8C" />
                ))}
                {/* Operator Cab */}
                <path
                  d="M 145 68 L 165 22 L 220 22 L 236 68 Z"
                  fill="#17191E"
                />
                <path d="M 170 28 L 214 28 L 226 62 L 154 62 Z" fill="#64748B" opacity="0.7" />
                <path d="M 173 30 L 194 30 L 186 58 L 160 58 Z" fill="#94A3B8" opacity="0.4" />
                {/* Cab step & handrails */}
                <rect x="148" y="88" width="52" height="32" fill="#0074B0" />
                <rect x="158" y="96" width="32" height="5" fill="#17191E" />
                <rect x="158" y="108" width="32" height="5" fill="#17191E" />

                {/* Hydraulic Lift Cylinder */}
                <line x1="162" y1="68" x2="232" y2="-16" stroke="#94A3B8" strokeWidth="10" strokeLinecap="round" />
                <line x1="162" y1="68" x2="205" y2="16" stroke="#1E293B" strokeWidth="16" strokeLinecap="round" />

                {/* Rotating Boom Arm (pivots from rear axle tower x=92, y=68) */}
                <g transform="translate(92, 68)">
                  <motion.g
                    style={{
                      rotate: boomAngle,
                      transformOrigin: '0px 0px',
                    }}
                  >
                    {/* Outer Boom */}
                    <path d="M -16 -18 L 310 -18 L 310 14 L -16 20 Z" fill="#17191E" />
                    <text
                      x="110"
                      y="4"
                      fill="#94A3B8"
                      fontSize="11"
                      fontWeight="700"
                      letterSpacing="2"
                    >
                      UNITED CARRIERS
                    </text>
                    {/* Telescopic Inner Extension + Spreader */}
                    <motion.g style={{ x: boomExtend }}>
                      <rect x="285" y="-12" width="165" height="20" fill="#272B33" />
                      {/* Articulated Spreader Head */}
                      <g transform="translate(445, 0)">
                        <rect x="-12" y="-10" width="24" height="24" rx="2" fill="#0F172A" />
                        <path d="M -52 14 L 56 14 L 68 26 L -64 26 Z" fill="#17191E" />
                        <rect x="-58" y="24" width="12" height="8" fill="#F59E0B" />
                        <rect x="50" y="24" width="12" height="8" fill="#F59E0B" />
                      </g>
                    </motion.g>
                  </motion.g>
                </g>

                {/* Front Heavy Tire */}
                <circle cx="242" cy="134" r="36" fill="#111318" />
                <circle cx="242" cy="134" r="20" fill="#334155" />
                <circle cx="242" cy="134" r="8" fill="#94A3B8" />
                {/* Rear Steer Tire */}
                <circle cx="52" cy="138" r="32" fill="#111318" />
                <circle cx="52" cy="138" r="17" fill="#334155" />
                <circle cx="52" cy="138" r="7" fill="#94A3B8" />
              </g>
            </svg>
          </motion.div>

          {/* PHASE C & D: 90° Rotated Broadside View + Flatbed Semi-Truck */}
          <motion.div
            style={{ opacity: frontSceneOpacity }}
            className="absolute inset-x-0 bottom-12 md:bottom-14 flex justify-center pointer-events-none"
          >
            <svg
              viewBox="0 0 1280 480"
              className="w-full max-w-[1240px] h-auto overflow-visible"
              aria-label="Front-facing reach stacker placing 40ft container onto semi-truck trailer"
            >
              {/* Retracting bottom stacks to the right */}
              <motion.g style={{ x: bottomStackExitX, opacity: bottomStackOpacity }}>
                <g transform="translate(960, 326)">
                  <rect x="0" y="0" width="118" height="134" rx="2" fill="#0B2859" />
                  <rect x="124" y="0" width="118" height="134" rx="2" fill="#D9381E" />
                </g>
              </motion.g>

              {/* Front-Facing Reach Stacker centered beneath container */}
              <motion.g style={{ x: frontStackerX, opacity: frontStackerOpacity }}>
                <g transform="translate(495, 290)">
                  {/* Wide front axle & dual tires */}
                  <rect x="-32" y="114" width="38" height="58" rx="6" fill="#111318" />
                  <rect x="114" y="114" width="38" height="58" rx="6" fill="#111318" />
                  {/* Blue front chassis */}
                  <path d="M 8 86 L 112 86 L 122 146 L -2 146 Z" fill="#008CD2" />
                  <rect x="24" y="96" width="72" height="34" rx="2" fill="#17191E" />
                  {/* Cab front windshield */}
                  <rect x="30" y="34" width="60" height="48" rx="3" fill="#17191E" />
                  <rect x="36" y="40" width="48" height="34" rx="2" fill="#64748B" opacity="0.65" />
                  {/* Vertical lift tower */}
                  <rect x="46" y="-85" width="28" height="122" fill="#17191E" />
                  <rect x="54" y="-75" width="12" height="90" fill="#334155" />
                  {/* Headlights */}
                  <rect x="6" y="112" width="12" height="6" rx="1" fill="#FDE047" />
                  <rect x="102" y="112" width="12" height="6" rx="1" fill="#FDE047" />
                </g>
              </motion.g>

              {/* Flatbed Semi-Truck Chassis + Cab gliding in from right */}
              <motion.g style={{ x: truckSlideX }}>
                <g transform="translate(220, 315)">
                  {/* Trailer Chassis Frame */}
                  <rect x="18" y="96" width="685" height="12" fill="#1E293B" />
                  <rect x="45" y="108" width="180" height="6" fill="#0F172A" />
                  {/* Rear Tri-Axle Trailer Wheels */}
                  {[78, 128, 178].map((wx) => (
                    <g key={wx} transform={`translate(${wx}, 120)`}>
                      <circle cx="0" cy="0" r="24" fill="#111318" />
                      <circle cx="0" cy="0" r="13" fill="#94A3B8" />
                      <circle cx="0" cy="0" r="5" fill="#1E293B" />
                    </g>
                  ))}
                  {/* Landing gear leg */}
                  <rect x="520" y="108" width="8" height="32" fill="#334155" />

                  {/* Tractor Cab-Over Truck */}
                  <g transform="translate(700, -14)">
                    <path
                      d="M 10 112 L 10 16 Q 10 4 24 4 L 106 4 Q 126 4 134 26 L 146 74 L 146 112 Z"
                      fill="#17191E"
                    />
                    {/* Cab Windshield & Side Window */}
                    <path d="M 88 14 L 120 14 L 132 54 L 88 54 Z" fill="#64748B" opacity="0.75" />
                    <path d="M 38 18 L 78 18 L 78 54 L 38 54 Z" fill="#475569" opacity="0.6" />
                    {/* Chrome Grille Slats */}
                    {[68, 76, 84, 92].map((gy) => (
                      <rect key={gy} x="116" y={gy} width="26" height="4" rx="1" fill="#94A3B8" />
                    ))}
                    <rect x="128" y="100" width="16" height="6" rx="1" fill="#FEF08A" />
                    {/* Tractor Drive & Steer Wheels */}
                    {[34, 114].map((twx) => (
                      <g key={twx} transform={`translate(${twx}, 134)`}>
                        <circle cx="0" cy="0" r="25" fill="#111318" />
                        <circle cx="0" cy="0" r="14" fill="#94A3B8" />
                        <circle cx="0" cy="0" r="6" fill="#1E293B" />
                      </g>
                    ))}
                  </g>
                </g>
              </motion.g>

              {/* Massive Broadside 40ft White Container lowering onto trailer */}
              <motion.g
                style={{
                  y: broadContainerY,
                  scaleX: broadContainerScaleX,
                  transformOrigin: '575px 350px',
                }}
              >
                <g transform="translate(238, 286)">
                  {/* Top spreader clasp visible during lowering */}
                  <motion.g style={{ opacity: frontStackerOpacity }}>
                    <rect x="284" y="-16" width="110" height="16" rx="2" fill="#17191E" />
                    <rect x="331" y="-28" width="16" height="14" fill="#0F172A" />
                  </motion.g>

                  <rect
                    x="0"
                    y="0"
                    width="678"
                    height="124"
                    rx="2"
                    fill="#F4F5F7"
                    stroke="#CBD5E1"
                    strokeWidth="1"
                  />
                  {/* Corrugated steel ribs along 40ft container */}
                  {Array.from({ length: 42 }).map((_, idx) => (
                    <rect
                      key={idx}
                      x={14 + idx * 15.6}
                      y="8"
                      width="6"
                      height="108"
                      fill="#DCE1E8"
                    />
                  ))}
                  <rect x="0" y="0" width="678" height="8" fill="#FFFFFF" />
                  <rect x="0" y="116" width="678" height="8" fill="#CBD5E1" />
                  {/* Corner castings & UC mark */}
                  <rect x="0" y="0" width="12" height="12" fill="#94A3B8" />
                  <rect x="666" y="0" width="12" height="12" fill="#94A3B8" />
                  <rect x="0" y="112" width="12" height="12" fill="#94A3B8" />
                  <rect x="666" y="112" width="12" height="12" fill="#94A3B8" />
                  <text
                    x="56"
                    y="44"
                    fill="#334155"
                    fontSize="14"
                    fontWeight="800"
                    letterSpacing="2"
                  >
                    UC
                  </text>
                </g>
              </motion.g>
            </svg>
          </motion.div>

          {/* Dark Asphalt Ground Horizon Strip */}
          <div className="relative z-10 w-full h-12 md:h-14 bg-[#0D0E11]" />
        </div>
      </div>
    </section>
  );
}
