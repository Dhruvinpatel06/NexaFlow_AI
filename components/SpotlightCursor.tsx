'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

interface ClickRipple {
  id: number;
  x: number;
  y: number;
}

export default function SpotlightCursor() {
  const [isIdle, setIsIdle] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  
  // Element hover states
  const [hoverState, setHoverState] = useState<
    'default' | 'button' | 'link' | 'card' | 'text' | 'image' | 'drag'
  >('default');

  const [ripples, setRipples] = useState<ClickRipple[]>([]);
  const idleTimerRef = useRef<NodeJS.Timeout>();
  const scrollTimerRef = useRef<NodeJS.Timeout>();

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Fast Spring for Immediate Center Dot
  const dotSpringConfig = { damping: 28, stiffness: 450, mass: 0.2 };
  const dotX = useSpring(mouseX, dotSpringConfig);
  const dotY = useSpring(mouseY, dotSpringConfig);

  // Smooth Delayed Spring for Trailing Ring
  const ringSpringConfig = { damping: 30, stiffness: 180, mass: 0.6 };
  const ringX = useSpring(mouseX, ringSpringConfig);
  const ringY = useSpring(mouseY, ringSpringConfig);

  // Soft Volumetric Aura Spring
  const auraSpringConfig = { damping: 35, stiffness: 120, mass: 0.9 };
  const auraX = useSpring(mouseX, auraSpringConfig);
  const auraY = useSpring(mouseY, auraSpringConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      mouseX.set(clientX);
      mouseY.set(clientY);

      // Reset idle timer
      setIsIdle(false);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      idleTimerRef.current = setTimeout(() => {
        setIsIdle(true);
      }, 2500);

      // Inspect target element for context hover state
      const target = e.target as HTMLElement;
      if (!target) {
        setHoverState('default');
        return;
      }

      // 1. Draggable Elements
      if (
        target.getAttribute('draggable') === 'true' ||
        target.closest('[draggable="true"]') ||
        target.classList.contains('draggable')
      ) {
        setHoverState('drag');
      }
      // 2. Images
      else if (
        target.tagName === 'IMG' ||
        target.closest('picture') ||
        target.classList.contains('img-target')
      ) {
        setHoverState('image');
      }
      // 3. Buttons
      else if (
        target.tagName === 'BUTTON' ||
        target.getAttribute('role') === 'button' ||
        target.closest('button') ||
        target.classList.contains('btn-premium-primary') ||
        target.classList.contains('btn-premium-outline')
      ) {
        setHoverState('button');
      }
      // 4. Links
      else if (target.tagName === 'A' || target.closest('a')) {
        setHoverState('link');
      }
      // 5. Cards & Containers
      else if (
        target.classList.contains('glass-card') ||
        target.classList.contains('glass') ||
        target.closest('.glass-card') ||
        target.closest('.glass')
      ) {
        setHoverState('card');
      }
      // 6. Text Elements
      else if (
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

    const handleClick = (e: MouseEvent) => {
      const newRipple: ClickRipple = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
      };
      setRipples((prev) => [...prev.slice(-4), newRipple]);
    };

    const handleScroll = () => {
      setIsScrolling(true);
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
      scrollTimerRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('click', handleClick);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('scroll', handleScroll);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    };
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden mix-blend-difference">
      {/* 1. Outer Volumetric Soft Spotlight Beam */}
      <motion.div
        style={{
          x: auraX,
          y: auraY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: hoverState === 'button' ? 1.8 : hoverState === 'card' ? 1.4 : 1,
          opacity: isIdle ? 0.2 : 0.6,
        }}
        transition={{ duration: 0.2 }}
        className="w-[320px] h-[320px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0.06)_45%,transparent_70%)] blur-2xl"
      />

      {/* 2. Trailing Ring (Delayed Physics & Context-Aware Morphs) */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isClicking
            ? 0.75
            : hoverState === 'button'
            ? 1.8
            : hoverState === 'card'
            ? 1.4
            : 1,
          scaleY: isScrolling ? 1.3 : 1,
          scaleX: isScrolling ? 0.8 : 1,
          rotate: hoverState === 'card' ? 15 : 0,
          borderRadius: hoverState === 'link' ? '8px' : '9999px',
          opacity: isIdle ? 0.3 : hoverState === 'button' ? 0.95 : 0.7,
        }}
        transition={{ duration: 0.2 }}
        className={`absolute flex items-center justify-center border border-white/80 bg-white/10 backdrop-blur-sm shadow-[0_0_20px_rgba(255,255,255,0.4)] ${
          hoverState === 'image' || hoverState === 'drag' ? 'w-16 h-16' : 'w-10 h-10'
        }`}
      >
        {/* View / Drag Text Label */}
        {hoverState === 'image' && (
          <span className="text-[9px] font-mono font-bold tracking-widest uppercase text-white">
            VIEW
          </span>
        )}
        {hoverState === 'drag' && (
          <span className="text-[9px] font-mono font-bold tracking-widest uppercase text-white">
            DRAG
          </span>
        )}
      </motion.div>

      {/* 3. Center Dot (Fast Physics / Slim Text Beam Morph) */}
      <motion.div
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isClicking ? 0.6 : hoverState === 'button' ? 1.5 : 1,
          opacity: isIdle ? 0.4 : 1,
        }}
        transition={{ duration: 0.15 }}
        className="relative flex items-center justify-center"
      >
        {hoverState === 'text' ? (
          /* Slim Vertical Beam for Text */
          <div className="w-0.5 h-5 bg-white rounded-full shadow-[0_0_10px_#FFFFFF]" />
        ) : (
          /* Standard Glowing Center Dot */
          <div className="w-3.5 h-3.5 rounded-full bg-white shadow-[0_0_16px_#FFFFFF,0_0_30px_#FFFFFF]" />
        )}
      </motion.div>

      {/* 4. Click Expanding Ripple Waves */}
      {ripples.map((r) => (
        <motion.div
          key={r.id}
          initial={{ scale: 0.4, opacity: 0.9 }}
          animate={{ scale: 3.2, opacity: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          style={{
            left: r.x,
            top: r.y,
            translateX: '-50%',
            translateY: '-50%',
          }}
          className="absolute w-12 h-12 rounded-full border border-white bg-white/20 shadow-[0_0_25px_#FFFFFF]"
        />
      ))}
    </div>
  );
}
