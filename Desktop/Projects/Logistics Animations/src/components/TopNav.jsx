import React from 'react';

export default function TopNav({ isDarkSection, onNavigate, onOpenQuote }) {
  const navLinks = [
    { label: 'Services', targetId: 'scene-services' },
    { label: 'Milestones', targetId: 'scene-milestones' },
    { label: 'Ocean Freight', targetId: 'scene-ocean' },
    { label: 'Clients', targetId: 'scene-clients' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-300 border-b ${
        isDarkSection
          ? 'bg-[#0D0E11]/80 border-white/10 text-white backdrop-blur-md'
          : 'bg-[#ECEEF2]/80 border-slate-900/10 text-[#111318] backdrop-blur-md'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 h-16 flex items-center justify-between gap-8">
        <a
          href="#scene-yard"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('scene-yard');
          }}
          className="font-display text-base md:text-lg font-bold tracking-tight uppercase whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0644B2] rounded"
        >
          United Carriers
        </a>

        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
          {navLinks.map((item) => (
            <a
              key={item.targetId}
              href={`#${item.targetId}`}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(item.targetId);
              }}
              className={`whitespace-nowrap shrink-0 transition-colors duration-150 hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0644B2] rounded ${
                isDarkSection
                  ? 'text-slate-300 hover:text-white'
                  : 'text-slate-600 hover:text-[#111318]'
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onOpenQuote}
            className={`px-4 py-2 text-xs font-semibold tracking-wide uppercase rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
              isDarkSection
                ? 'bg-white text-[#111318] hover:bg-slate-200 focus-visible:ring-white'
                : 'bg-[#111318] text-white hover:bg-[#0644B2] focus-visible:ring-[#111318]'
            }`}
          >
            Request Quote
          </button>
        </div>
      </div>
    </header>
  );
}
