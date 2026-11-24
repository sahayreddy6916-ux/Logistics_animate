import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

const TESTIMONIALS = [
  {
    name: 'THOMAS MUNRO',
    role: 'Managing Director · Specialty Distribution',
    image: '/src/assets/images/portrait_thomas_munro_1795493675882.jpg',
    initials: 'TM',
    quote:
      "My business wouldn't function without this team. Extremely talented with immense experience tailoring each consignment based on its merits. We have dedicated account managers that know our business, are responsive and provide personalised service which we never had with bigger companies. UC for the win.",
  },
  {
    name: 'FRANCIS LUNG',
    role: 'Operations Lead · Infrastructure Equipment Supply',
    image: '/src/assets/images/portrait_francis_lung_1795493675275.jpg',
    initials: 'FL',
    quote:
      "As a first time supplier shipping equipment to support one of the major Australian infrastructure projects I came up against uncharted territories. It was a three months discovery and mobilisation period until the first shipment left its origin airborne for Melbourne. Looking back I really appreciate Chris' effort in helping a potential customer to understand what was required and how to go about the execution. Our first time right delivery to my Customer's 3PL was no coincidence. It was Chris' relentless attention to details and proactive monitoring of the process that ensured a smooth dock to dock delivery. I would like to offer Chris my most sincere congratulations in his new venture with United Carriers.",
  },
  {
    name: 'ALEX HUGHES',
    role: 'Head of Supply Chain · National Apparel Retail',
    image: '/src/assets/images/portrait_alex_hughes_1795493676580.jpg',
    initials: 'AH',
    quote:
      "I worked closely with Chris over several years to build a seamless, cost effective supply chain for one of Australia's largest fashion retail companies. Chris' knowledge and passion for the industry was apparent from day one. As anyone who works in logistics understands, your freight partner is more than just a service provider, they are an integral part of your business. Chris was not only able to help us streamline inbound lead times across APAC, he gave our merchandising teams total confidence at peak season.",
  },
];

function PortraitFrame({ src, alt, initials }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="w-20 h-20 md:w-24 md:h-24 rounded bg-slate-200 border border-slate-300 flex items-center justify-center font-display text-lg font-bold text-slate-700">
        {initials}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className="w-20 h-20 md:w-24 md:h-24 rounded object-cover border border-slate-300/80 bg-slate-200"
    />
  );
}

export default function AirplaneTestimonialsScene({ onOpenQuote, onNavigate }) {
  const stageRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ['start end', 'end end'],
  });

  // Top-down cargo airplane sweeps swiftly from left to right across the headline
  const planeX = useTransform(scrollYProgress, [0.08, 0.56], ['-55vw', '115vw']);
  const planeScale = useTransform(scrollYProgress, [0.08, 0.32, 0.56], [0.96, 1.06, 0.96]);

  // Synchronized wipe reveal behind the aircraft tail
  const wipeRightInset = useTransform(scrollYProgress, [0.12, 0.52], ['100%', '0%']);
  const clipPath = useTransform(wipeRightInset, (val) => `inset(0 ${val} 0 0)`);

  return (
    <div id="scene-clients" className="bg-[#ECEEF2] text-[#111318]">
      {/* Sticky Airplane Flyover Reveal Stage */}
      <div ref={stageRef} className="relative h-[165vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center">
          {/* Subtle atmospheric cloud backdrop fading cleanly */}
          <img
            src="/src/assets/images/clouds_transition_overlay_1795493674673.jpg"
            alt="Soft overcast sky texture"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none"
          />

          {/* Revealed Headline + Lead Testimonial Preview */}
          <motion.div
            style={{ clipPath }}
            className="relative z-10 max-w-[1200px] w-full mx-auto px-6 md:px-14 pt-12 space-y-12"
          >
            <h2 className="font-display text-[clamp(2.4rem,5vw,4.35rem)] font-extrabold leading-[0.94] tracking-tight uppercase text-balance">
              Trusted
              <br />
              By Businesses
              <br />
              Across APAC
            </h2>

            {/* Lead Testimonial Preview visible as airplane clears */}
            <div className="border-t border-slate-900/15 pt-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              <div className="md:col-span-4 flex items-center gap-4">
                <PortraitFrame
                  src={TESTIMONIALS[0].image}
                  alt={TESTIMONIALS[0].name}
                  initials={TESTIMONIALS[0].initials}
                />
                <div className="space-y-1">
                  <p className="font-display text-sm font-bold tracking-wider uppercase">
                    {TESTIMONIALS[0].name}
                  </p>
                  <p className="text-xs text-slate-500">
                    {TESTIMONIALS[0].role}
                  </p>
                </div>
              </div>
              <blockquote className="md:col-span-8 text-sm md:text-base text-slate-700 leading-relaxed">
                {TESTIMONIALS[0].quote}
              </blockquote>
            </div>
          </motion.div>

          {/* Top-Down Commercial Cargo Airplane Sweeping Left-to-Right */}
          <motion.div
            style={{ x: planeX, scale: planeScale }}
            className="absolute inset-y-0 left-0 flex items-center z-20 pointer-events-none"
          >
            <svg
              viewBox="0 0 920 680"
              className="w-[78vw] max-w-[920px] h-auto drop-shadow-[0_32px_42px_rgba(17,19,24,0.22)]"
              aria-label="Top-down commercial air freighter flying left to right"
            >
              {/* Soft Aerial Shadow */}
              <g transform="translate(18, 28)" opacity="0.14">
                <path d="M 880 340 C 830 315 740 306 620 306 L 140 312 L 50 326 L 50 354 L 140 368 L 620 374 C 740 374 830 365 880 340 Z" fill="#0F172A" />
                <path d="M 540 308 L 300 40 L 235 40 L 380 308 Z" fill="#0F172A" />
                <path d="M 540 372 L 300 640 L 235 640 L 380 372 Z" fill="#0F172A" />
              </g>

              {/* Port Wing (Top) + Twin Engines + Red Winglet */}
              <path d="M 545 312 L 305 32 L 235 32 L 385 312 Z" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="1" />
              <path d="M 305 32 L 268 18 L 235 32 Z" fill="#DC2626" />
              {/* Port Wing Flaps & Panel Lines */}
              <line x1="365" y1="150" x2="295" y2="62" stroke="#94A3B8" strokeWidth="1.5" opacity="0.5" />
              {/* Port Engines */}
              <rect x="405" y="190" width="66" height="26" rx="10" fill="#F8FAFC" stroke="#94A3B8" />
              <rect x="460" y="192" width="14" height="22" rx="4" fill="#334155" />
              <rect x="330" y="102" width="58" height="22" rx="8" fill="#F8FAFC" stroke="#94A3B8" />
              <rect x="378" y="104" width="12" height="18" rx="3" fill="#334155" />

              {/* Starboard Wing (Bottom) + Twin Engines + Red Winglet */}
              <path d="M 545 368 L 305 648 L 235 648 L 385 368 Z" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="1" />
              <path d="M 305 648 L 268 662 L 235 648 Z" fill="#DC2626" />
              <line x1="365" y1="530" x2="295" y2="618" stroke="#94A3B8" strokeWidth="1.5" opacity="0.5" />
              {/* Starboard Engines */}
              <rect x="405" y="464" width="66" height="26" rx="10" fill="#F8FAFC" stroke="#94A3B8" />
              <rect x="460" y="466" width="14" height="22" rx="4" fill="#334155" />
              <rect x="330" y="556" width="58" height="22" rx="8" fill="#F8FAFC" stroke="#94A3B8" />
              <rect x="378" y="558" width="12" height="18" rx="3" fill="#334155" />

              {/* Horizontal Tail Stabilizers */}
              <path d="M 150 322 L 58 214 L 18 214 L 78 324 Z" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="1" />
              <path d="M 150 358 L 58 466 L 18 466 L 78 356 Z" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="1" />
              <path d="M 58 214 L 38 206 L 18 214 Z" fill="#DC2626" />
              <path d="M 58 466 L 38 474 L 18 466 Z" fill="#DC2626" />

              {/* Main White Cylindrical Fuselage */}
              <path
                d="M 885 340 C 835 312 745 304 620 304 L 145 310 L 42 328 L 42 352 L 145 370 L 620 376 C 745 376 835 368 885 340 Z"
                fill="#FFFFFF"
                stroke="#CBD5E1"
                strokeWidth="1.5"
              />
              {/* Cockpit Windows */}
              <path d="M 848 326 L 866 334 L 866 346 L 848 354 L 838 346 L 838 334 Z" fill="#1E293B" opacity="0.85" />
              {/* Vertical Tail Fin Spine */}
              <path d="M 162 336 L 34 336 L 26 340 L 34 344 L 162 344 Z" fill="#DC2626" />
            </svg>
          </motion.div>
        </div>
      </div>

      {/* Remaining Full Client Testimonials List */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-14 pb-24 space-y-0">
        {TESTIMONIALS.slice(1).map((item) => (
          <div
            key={item.name}
            className="border-t border-slate-900/15 py-12 grid grid-cols-1 md:grid-cols-12 gap-6 items-start"
          >
            <div className="md:col-span-4 flex items-center gap-4">
              <PortraitFrame src={item.image} alt={item.name} initials={item.initials} />
              <div className="space-y-1">
                <p className="font-display text-sm font-bold tracking-wider uppercase">
                  {item.name}
                </p>
                <p className="text-xs text-slate-500">
                  {item.role}
                </p>
              </div>
            </div>
            <blockquote className="md:col-span-8 text-sm md:text-base text-slate-700 leading-relaxed">
              {item.quote}
            </blockquote>
          </div>
        ))}

        {/* Closing Conversion Band */}
        <div className="border-t border-slate-900/15 pt-16 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <p className="text-xs font-medium tracking-[0.16em] uppercase text-slate-500">
              APAC &amp; Global Freight Dispatch
            </p>
            <h3 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight uppercase leading-[1.02] text-balance">
              Ready to streamline your next consignment?
            </h3>
          </div>
          <button
            type="button"
            onClick={onOpenQuote}
            className="px-6 py-3.5 rounded-md bg-[#111318] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#0644B2] transition-colors cursor-pointer whitespace-nowrap shrink-0 self-start md:self-auto"
          >
            Request Freight Quote
          </button>
        </div>
      </div>

      {/* Quiet Footer */}
      <footer className="border-t border-slate-900/10 bg-[#E4E7EC] text-slate-600">
        <div className="max-w-[1200px] mx-auto px-6 md:px-14 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <span className="font-display font-bold text-sm text-[#111318] uppercase tracking-tight">
              United Carriers
            </span>
            <span aria-hidden="true">·</span>
            <span>APAC Freight &amp; Logistics Group</span>
          </div>
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => onNavigate('scene-yard')}
              className="hover:text-[#111318] transition-colors cursor-pointer"
            >
              Back to Top
            </button>
            <button
              type="button"
              onClick={() => onNavigate('scene-services')}
              className="hover:text-[#111318] transition-colors cursor-pointer"
            >
              Services
            </button>
            <button
              type="button"
              onClick={onOpenQuote}
              className="hover:text-[#111318] transition-colors cursor-pointer"
            >
              Contact
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
