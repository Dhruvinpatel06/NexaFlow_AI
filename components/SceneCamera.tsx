'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const SCENES = [
  { id: 'hero', name: '01 // CORE INITIALIZATION' },
  { id: 'demo', name: '02 // PROMPT SYNTHESIS' },
  { id: 'features', name: '03 // DAG AUTOMATION' },
  { id: 'workflow', name: '04 // API INTERCONNECT' },
  { id: 'why', name: '05 // AGENT RUNTIME' },
  { id: 'platform', name: '06 // LIVING ANALYTICS' },
  { id: 'pricing', name: '07 // ZERO-KNOWLEDGE DEPLOYMENT' },
  { id: 'faq', name: '08 // PRODUCTION DEPLOY' },
];

export default function SceneCamera() {
  const [activeScene, setActiveScene] = useState(0);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 3;
      const sceneEls = SCENES.map((s) => document.getElementById(s.id));

      for (let i = sceneEls.length - 1; i >= 0; i--) {
        const el = sceneEls[i];
        if (el && scrollPos >= el.offsetTop) {
          setActiveScene(i);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-4 pointer-events-auto">
      {/* Top Scene Tracker */}
      <div className="bg-slate-950/80 backdrop-blur-xl border border-[rgba(0,240,255,0.2)] px-3 py-2 rounded-xl shadow-2xl mb-2">
        <span className="text-[10px] font-mono font-bold text-[#00F0FF] tracking-wider block">
          SCENE TRAVEL CONTROLLER
        </span>
        <span className="text-xs font-mono font-bold text-white block mt-0.5">
          {SCENES[activeScene]?.name}
        </span>
      </div>

      {/* Scene Dots */}
      <div className="space-y-3 pl-2 border-l border-slate-800">
        {SCENES.map((scene, idx) => {
          const isActive = activeScene === idx;
          return (
            <button
              key={scene.id}
              onClick={() => document.getElementById(scene.id)?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center gap-3 group text-left cursor-pointer"
            >
              <div
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  isActive
                    ? 'bg-[#00F0FF] shadow-[0_0_12px_#00F0FF] scale-125'
                    : 'bg-slate-700 group-hover:bg-slate-500'
                }`}
              />
              <span
                className={`text-[11px] font-mono font-bold transition-colors ${
                  isActive ? 'text-[#00F0FF]' : 'text-slate-500 group-hover:text-slate-300'
                }`}
              >
                0{idx + 1}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
