import React, { useEffect, useState } from 'react';
import { useMotionValue, useSpring, motion } from 'motion/react';

export default function CustomCursor({ scrollProgress, isDarkSection }) {
  const [visible, setVisible] = useState(false);
  const [percent, setPercent] = useState(0);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const smoothX = useSpring(mouseX, { stiffness: 420, damping: 32, mass: 0.35 });
  const smoothY = useSpring(mouseY, { stiffness: 420, damping: 32, mass: 0.35 });

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return undefined;

    const handleMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const handleLeave = () => setVisible(false);

    window.addEventListener('mousemove', handleMove, { passive: true });
    document.addEventListener('mouseleave', handleLeave);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseleave', handleLeave);
    };
  }, [mouseX, mouseY, visible]);

  useEffect(() => {
    if (!scrollProgress) return undefined;
    const unsubscribe = scrollProgress.on('change', (latest) => {
      setPercent(Math.min(1, Math.max(0, latest)));
    });
    return () => unsubscribe();
  }, [scrollProgress]);

  if (!visible) return null;

  const radius = 15;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - percent);

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 z-50 pointer-events-none hidden lg:block"
      style={{
        x: smoothX,
        y: smoothY,
        translateX: '-50%',
        translateY: '-50%',
      }}
    >
      <svg width="38" height="38" viewBox="0 0 38 38" className="overflow-visible">
        <circle
          cx="19"
          cy="19"
          r={radius}
          fill="none"
          stroke={isDarkSection ? 'rgba(255,255,255,0.2)' : 'rgba(17,19,24,0.18)'}
          strokeWidth="1.5"
        />
        <circle
          cx="19"
          cy="19"
          r={radius}
          fill="none"
          stroke={isDarkSection ? '#FFFFFF' : '#111318'}
          strokeWidth="1.75"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          transform="rotate(-90 19 19)"
        />
      </svg>
    </motion.div>
  );
}
