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
  const [isHovered, setIsHovered] = useState(false);
  const [ripples, setRipples] = useState<ClickRipple[]>([]);
  const idleTimerRef = useRef<NodeJS.Timeout>();

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Framer motion spring physics for 60 FPS smooth tracking
  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const auraSpringConfig = { damping: 35, stiffness: 200, mass: 0.8 };
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

      // Check if hovering interactive element
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.tagName === 'INPUT' ||
          target.getAttribute('role') === 'button' ||
          target.closest('button') ||
          target.closest('a') ||
          target.classList.contains('cursor-pointer'))
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleClick = (e: MouseEvent) => {
      const newRipple: ClickRipple = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
      };
      setRipples((prev) => [...prev.slice(-4), newRipple]);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden">
      {/* Outer Volumetric Spotlight Aura */}
      <motion.div
        style={{
          x: auraX,
          y: auraY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovered ? 1.6 : 1,
          opacity: isIdle ? 0.25 : isHovered ? 0.85 : 0.6,
        }}
        transition={{ duration: 0.2 }}
        className="w-[300px] h-[300px] rounded-full bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.18)_0%,rgba(168,85,247,0.08)_40%,transparent_70%)] blur-2xl"
      />

      {/* Main VisionOS Glowing Circular Pointer Dot */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovered ? 2.2 : 1,
          opacity: isIdle ? 0.3 : 1,
        }}
        transition={{ duration: 0.15 }}
        className="relative flex items-center justify-center"
      >
        {/* Core Dot */}
        <div
          className={`w-3.5 h-3.5 rounded-full transition-colors duration-200 ${
            isHovered
              ? 'bg-[#00F0FF] shadow-[0_0_20px_#00F0FF,0_0_40px_#00F0FF]'
              : 'bg-white shadow-[0_0_12px_#00F0FF]'
          }`}
        />

        {/* Outer Ring */}
        <div
          className={`absolute w-9 h-9 rounded-full border transition-all duration-200 ${
            isHovered
              ? 'border-[#00F0FF] bg-[rgba(0,240,255,0.15)] scale-110'
              : 'border-[rgba(0,240,255,0.4)] bg-transparent'
          }`}
        />
      </motion.div>

      {/* Click Expanding Light Wave Ripples */}
      {ripples.map((r) => (
        <motion.div
          key={r.id}
          initial={{ opacity: 0.8, scale: 0 }}
          animate={{ opacity: 0, scale: 3.5 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          onAnimationComplete={() => {
            setRipples((prev) => prev.filter((item) => item.id !== r.id));
          }}
          style={{
            position: 'absolute',
            left: r.x,
            top: r.y,
            transform: 'translate(-50%, -50%)',
          }}
          className="w-16 h-16 rounded-full border-2 border-[#00F0FF] bg-[radial-gradient(circle,rgba(0,240,255,0.3)_0%,transparent_70%)] shadow-[0_0_30px_#00F0FF]"
        />
      ))}
    </div>
  );
}
