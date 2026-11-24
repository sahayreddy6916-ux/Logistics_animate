import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useScroll } from 'motion/react';
import TopNav from './components/TopNav.jsx';
import CustomCursor from './components/CustomCursor.jsx';
import TourControls from './components/TourControls.jsx';
import QuoteModal from './components/QuoteModal.jsx';
import ReachStackerScene from './components/ReachStackerScene.jsx';
import TruckServicesScene from './components/TruckServicesScene.jsx';
import HighwayMilestoneScene from './components/HighwayMilestoneScene.jsx';
import OceanShipScene from './components/OceanShipScene.jsx';
import AirplaneTestimonialsScene from './components/AirplaneTestimonialsScene.jsx';

export default function App() {
  const { scrollYProgress } = useScroll();
  const [progressPct, setProgressPct] = useState(0);
  const [activeChapter, setActiveChapter] = useState('scene-yard');
  const [isDarkSection, setIsDarkSection] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  const rafRef = useRef(null);
  const isAutoScrollingRef = useRef(false);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (val) => {
      setProgressPct(val);

      if (val < 0.21) {
        setActiveChapter('scene-yard');
        setIsDarkSection(false);
      } else if (val < 0.43) {
        setActiveChapter('scene-services');
        setIsDarkSection(false);
      } else if (val < 0.61) {
        setActiveChapter('scene-milestones');
        setIsDarkSection(false);
      } else if (val < 0.83) {
        setActiveChapter('scene-ocean');
        setIsDarkSection(true);
      } else {
        setActiveChapter('scene-clients');
        setIsDarkSection(false);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const stopAutoPlay = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    isAutoScrollingRef.current = false;
    setIsPlaying(false);
  }, []);

  // Stop auto-play immediately if user interacts via wheel/touch/keydown
  useEffect(() => {
    const cancelOnUserScroll = () => {
      if (isAutoScrollingRef.current) {
        stopAutoPlay();
      }
    };
    window.addEventListener('wheel', cancelOnUserScroll, { passive: true });
    window.addEventListener('touchstart', cancelOnUserScroll, { passive: true });
    return () => {
      window.removeEventListener('wheel', cancelOnUserScroll);
      window.removeEventListener('touchstart', cancelOnUserScroll);
    };
  }, [stopAutoPlay]);

  const startAutoPlay = useCallback(
    (fromTop = false) => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      if (fromTop) {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const startY = fromTop ? 0 : window.scrollY;
      const remaining = Math.max(0, maxScroll - startY);
      if (remaining < 10) {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }

      const effectiveStart = remaining < 10 ? 0 : startY;
      const distance = maxScroll - effectiveStart;
      // ~14.5s total full choreography duration
      const durationMs = Math.max(2500, (distance / maxScroll) * 14500);
      let startTime = null;

      isAutoScrollingRef.current = true;
      setIsPlaying(true);

      const step = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const t = Math.min(1, elapsed / durationMs);
        window.scrollTo(0, effectiveStart + distance * t);

        if (t < 1 && isAutoScrollingRef.current) {
          rafRef.current = requestAnimationFrame(step);
        } else {
          stopAutoPlay();
        }
      };

      rafRef.current = requestAnimationFrame(step);
    },
    [stopAutoPlay]
  );

  const handleTogglePlay = () => {
    if (isPlaying) {
      stopAutoPlay();
    } else {
      startAutoPlay(false);
    }
  };

  const handleReplay = () => {
    startAutoPlay(true);
  };

  const handleNavigate = (sectionId) => {
    stopAutoPlay();
    const el = document.getElementById(sectionId);
    if (!el) return;
    const rectTop = el.getBoundingClientRect().top + window.scrollY;
    // Offset slightly into sticky chapters so vehicles frame immediately
    const offset = sectionId === 'scene-yard' ? 0 : 120;
    window.scrollTo({
      top: Math.max(0, rectTop + offset),
      behavior: 'smooth',
    });
  };

  return (
    <div className="min-h-screen bg-[#ECEEF2] text-[#111318]">
      <CustomCursor scrollProgress={scrollYProgress} isDarkSection={isDarkSection} />

      <TopNav
        isDarkSection={isDarkSection}
        onNavigate={handleNavigate}
        onOpenQuote={() => setIsQuoteOpen(true)}
      />

      <main>
        <ReachStackerScene />
        <TruckServicesScene onOpenQuote={() => setIsQuoteOpen(true)} />
        <HighwayMilestoneScene />
        <OceanShipScene />
        <AirplaneTestimonialsScene
          onOpenQuote={() => setIsQuoteOpen(true)}
          onNavigate={handleNavigate}
        />
      </main>

      <TourControls
        isPlaying={isPlaying}
        activeChapter={activeChapter}
        progressPct={progressPct}
        onTogglePlay={handleTogglePlay}
        onReplay={handleReplay}
        onSelectChapter={handleNavigate}
      />

      <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
    </div>
  );
}
