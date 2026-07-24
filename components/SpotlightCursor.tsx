'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function SpotlightCursor() {
  const [isClicking, setIsClicking] = useState(false);
  const [hoverState, setHoverState] = useState<
    'default' | 'button' | 'link' | 'card' | 'text' | 'drag'
  >('default');

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Immediate High-Precision Spring for Center Pointer Dot (0ms perceptible delay)
  const dotSpringConfig = { damping: 35, stiffness: 650, mass: 0.1 };
  const dotX = useSpring(mouseX, dotSpringConfig);
  const dotY = useSpring(mouseY, dotSpringConfig);

  // Smooth Concentric Spring for Outer Ring (centered directly over dot)
  const ringSpringConfig = { damping: 30, stiffness: 380, mass: 0.3 };
  const ringX = useSpring(mouseX, ringSpringConfig);
  const ringY = useSpring(mouseY, ringSpringConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      mouseX.set(clientX);
      mouseY.set(clientY);

      const target = e.target as HTMLElement;
      if (!target) {
        setHoverState('default');
        return;
      }

      // Context state detection
      if (
        target.getAttribute('draggable') === 'true' ||
        target.closest('[draggable="true"]') ||
        target.classList.contains('draggable')
      ) {
        setHoverState('drag');
      } else if (
        target.tagName === 'BUTTON' ||
        target.getAttribute('role') === 'button' ||
        target.closest('button') ||
        target.classList.contains('btn-premium-primary') ||
        target.classList.contains('btn-premium-outline')
      ) {
        setHoverState('button');
      } else if (target.tagName === 'A' || target.closest('a')) {
        setHoverState('link');
      } else if (
        target.classList.contains('glass-card') ||
        target.classList.contains('glass') ||
        target.closest('.glass-card') ||
        target.closest('.glass')
      ) {
        setHoverState('card');
      } else if (
        target.tagName === 'P' ||
        target.tagName === 'H1' ||
        target.tagName === 'H2' ||
        target.tagName === 'H3' ||
        target.tagName === 'H4' ||
        target.tagName === 'SPAN' ||
        target.tagName === 'CODE' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA'
      ) {
        setHoverState('text');
      } else {
        setHoverState('default');
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden mix-blend-difference">
      {/* Outer Concentric Thin Ring (Centered directly over pointer) */}
      {hoverState !== 'text' && (
        <motion.div
          style={{
            x: ringX,
            y: ringY,
            translateX: '-50%',
            translateY: '-50%',
          }}
          animate={{
            scale: isClicking
              ? 0.85
              : hoverState === 'button'
              ? 1.5
              : hoverState === 'card'
              ? 1.4
              : hoverState === 'link'
              ? 0.8
              : hoverState === 'drag'
              ? 1.6
              : 1,
            opacity: hoverState === 'button' ? 0.95 : 0.6,
          }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
          className={`absolute flex items-center justify-center rounded-full border transition-all duration-200 ${
            hoverState === 'button'
              ? 'w-7 h-7 border-white bg-white/10 shadow-[0_0_12px_rgba(255,255,255,0.6)]'
              : hoverState === 'card'
              ? 'w-8 h-8 border-white/60 bg-white/5'
              : hoverState === 'drag'
              ? 'w-9 h-9 border-white bg-white/20'
              : 'w-6 h-6 border-white/40 bg-transparent'
          }`}
        >
          {/* Optional Arrow Indicator for Dragging */}
          {hoverState === 'drag' && (
            <span className="text-[10px] font-mono font-bold text-white tracking-widest">
              ↔
            </span>
          )}
        </motion.div>
      )}

      {/* Exact Center Pointer Dot / I-Beam (Primary interaction point) */}
      <motion.div
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isClicking ? 0.75 : 1,
        }}
        transition={{ duration: 0.1 }}
        className="relative flex items-center justify-center"
      >
        {hoverState === 'text' ? (
          /* I-Beam Text Selection Cursor */
          <div className="w-[2px] h-4.5 bg-white rounded-full shadow-[0_0_8px_#FFFFFF]" />
        ) : (
          /* 9px Matte White Center Pointer Dot */
          <div className="w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.9)]" />
        )}
      </motion.div>
    </div>
  );
}
