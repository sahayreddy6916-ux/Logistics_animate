import React from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

const CHAPTERS = [
  { id: 'scene-yard', label: 'Yard' },
  { id: 'scene-services', label: 'Fleet' },
  { id: 'scene-milestones', label: 'Highway' },
  { id: 'scene-ocean', label: 'Ocean' },
  { id: 'scene-clients', label: 'Air' },
];

export default function TourControls({
  isPlaying,
  activeChapter,
  progressPct,
  onTogglePlay,
  onReplay,
  onSelectChapter,
}) {
  return (
    <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-lg bg-[#111318]/92 text-white px-3 py-2 border border-white/15 backdrop-blur-md shadow-lg">
      <button
        type="button"
        onClick={onTogglePlay}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-white text-[#111318] hover:bg-slate-200 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
        <span>{isPlaying ? 'Pause' : 'Auto-Play'}</span>
      </button>

      <button
        type="button"
        onClick={onReplay}
        aria-label="Replay animation from start"
        title="Replay from top"
        className="p-1.5 rounded text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        <RotateCcw className="w-3.5 h-3.5" />
      </button>

      <div className="hidden sm:flex items-center gap-1 pl-2 border-l border-white/15">
        {CHAPTERS.map((chapter) => {
          const active = activeChapter === chapter.id;
          return (
            <button
              key={chapter.id}
              type="button"
              onClick={() => onSelectChapter(chapter.id)}
              className={`px-2 py-1 rounded text-[11px] font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                active
                  ? 'bg-[#0644B2] text-white'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              {chapter.label}
            </button>
          );
        })}
      </div>

      <span className="font-mono-tabular text-[11px] text-slate-300 pl-1.5 min-w-[36px] text-right">
        {Math.round(progressPct * 100)}%
      </span>
    </div>
  );
}
