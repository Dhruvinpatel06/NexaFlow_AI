'use client';

import { useEffect, useRef, useState } from 'react';
import NeuralCanvas from './NeuralCanvas';
import { Sparkles, Play, Terminal as TerminalIcon, Shield, Cpu, Zap, ArrowRight } from 'lucide-react';

function MockupCounter({ target, suffix = '', decimals = 0, duration = 1500 }: { target: number; suffix?: string; decimals?: number; duration?: number }) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const startTime = performance.now();
      let aniFrame: number;
      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = progress * (2 - progress);
        setVal(easeProgress * target);
        if (progress < 1) {
          aniFrame = requestAnimationFrame(animate);
        } else {
          setVal(target);
        }
      };
      aniFrame = requestAnimationFrame(animate);
    }, 400);
    return () => clearTimeout(timer);
  }, [target, duration]);

  const formatted = decimals > 0 ? val.toFixed(decimals) : Math.floor(val).toLocaleString();

  return (
    <span>{formatted}{suffix}</span>
  );
}

const COMPANIES = ['Notion', 'Stripe', 'Linear', 'Vercel', 'Figma', 'Atlassian'];

export default function Hero() {
  const [showDemoModal, setShowDemoModal] = useState(false);

  const handleMouseMoveMockup = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(12px)`;
  };

  const handleMouseLeaveMockup = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)';
    card.style.transition = 'transform 500ms ease-out';
  };

  return (
    <section id="hero" aria-label="Hero" className="relative w-full pt-36 pb-24 md:pt-44 md:pb-32 overflow-hidden bg-[#030712]">
      {/* 3D WebGL Neural Mesh Background */}
      <NeuralCanvas />

      {/* Volumetric Aurora Glow Layers */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[radial-gradient(ellipse_100%_70%_at_50%_-20%,rgba(0,240,255,0.15),transparent_70%)] pointer-events-none z-0" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[radial-gradient(ellipse_80%_80%_at_100%_50%,rgba(168,85,247,0.12),transparent_70%)] pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column Content */}
          <div className="lg:col-span-7 space-y-8">
            {/* Top Eyebrow Badge */}
            <div className="glass inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[rgba(0,240,255,0.3)] shadow-[0_0_20px_rgba(0,240,255,0.2)]">
              <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-ping" />
              <span className="text-xs font-mono font-bold text-[#00F0FF] tracking-wider uppercase flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> NEXAFLOW V4 RELEASE · PUBLIC BETA
              </span>
            </div>

            {/* Cinematic Headline */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black font-mono tracking-tight leading-none text-white">
              The Autonomous <br />
              <span className="gradient-text-cyan">AI Operating System</span>
            </h1>

            {/* Terminal Prompt Subheading */}
            <div className="max-w-xl bg-slate-950/80 border-l-4 border-[#00F0FF] p-4 rounded-r-xl border-y border-r border-slate-800 shadow-inner font-mono text-sm text-slate-300">
              <div className="flex items-center gap-2 text-xs text-[#00F0FF] font-bold mb-1">
                <TerminalIcon className="w-3.5 h-3.5" /> SYSTEM PROMPT
              </div>
              <p className="leading-relaxed text-slate-300">
                &gt; Transform complex business operations into autonomous, self-healing AI agent workflows. Ship 10x faster with enterprise SLAs.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-premium-primary px-8 py-4 text-xs font-mono font-bold tracking-widest uppercase rounded-xl flex items-center justify-center gap-2"
              >
                Launch AI Agent <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setShowDemoModal(true)}
                className="btn-premium-outline px-8 py-4 text-xs font-mono font-bold tracking-widest uppercase rounded-xl flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 fill-[#00F0FF]" /> Watch 2-Min Demo
              </button>
            </div>

            {/* Trust Logos Marquee */}
            <div className="pt-6 border-t border-slate-800/80 space-y-3">
              <p className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-widest">
                TRUSTED BY LEADING ENGINEERING TEAMS
              </p>
              <div className="w-full overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_15%,black_85%,transparent)]">
                <div className="flex gap-12 items-center w-max animate-[marquee_25s_linear_infinite] hover:[animation-play-state:paused]">
                  {[...COMPANIES, ...COMPANIES, ...COMPANIES].map((company, index) => (
                    <span key={index} className="flex items-center gap-4 text-slate-400 font-mono text-sm font-semibold">
                      <span>{company}</span>
                      <span className="text-[#00F0FF]/40">·</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - 3D Dashboard Mockup Card */}
          <div className="lg:col-span-5 relative" style={{ perspective: '1200px' }}>
            <div
              className="glass-card rounded-2xl p-6 border border-[rgba(0,240,255,0.25)] shadow-[0_0_50px_rgba(0,0,0,0.7)] relative overflow-hidden transition-all duration-300 cursor-pointer"
              onMouseMove={handleMouseMoveMockup}
              onMouseLeave={handleMouseLeaveMockup}
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#00F0FF]">
                  <Cpu className="w-4 h-4" /> NEXAFLOW RUNTIME HUB
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-[10px] font-mono font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" /> LIVE STREAM
                </div>
              </div>

              {/* 3 Metric Rows */}
              <div className="space-y-3 font-mono">
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <Zap className="w-4 h-4 text-[#00F0FF]" />
                    <span className="text-xs text-slate-400">Workflows Executed</span>
                  </div>
                  <span className="text-base font-bold text-white">
                    <MockupCounter target={12847} />
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <Shield className="w-4 h-4 text-[#A855F7]" />
                    <span className="text-xs text-slate-400">Automation Accuracy</span>
                  </div>
                  <span className="text-base font-bold text-[#00F0FF]">
                    <MockupCounter target={99.98} suffix="%" decimals={2} />
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <Cpu className="w-4 h-4 text-[#10B981]" />
                    <span className="text-xs text-slate-400">Avg Execution Latency</span>
                  </div>
                  <span className="text-base font-bold text-[#10B981]">
                    <MockupCounter target={14.2} suffix="ms" decimals={1} />
                  </span>
                </div>
              </div>

              {/* Mini CSS Bar Graph */}
              <div className="mt-5 pt-4 border-t border-slate-800">
                <div className="flex justify-between text-[10px] font-mono text-slate-500 mb-2">
                  <span>THROUGHPUT GRAPH</span>
                  <span>500 RPS SLA</span>
                </div>
                <div className="h-14 flex items-end gap-1.5">
                  {[45, 70, 35, 95, 60, 85, 40, 100, 75].map((h, i) => (
                    <div
                      key={i}
                      style={{ height: `${h}%` }}
                      className={`flex-1 rounded-t transition-all duration-300 ${
                        i === 7
                          ? 'bg-gradient-to-t from-[#00F0FF] to-[#A855F7] shadow-[0_0_12px_#00F0FF]'
                          : 'bg-slate-800 hover:bg-[#00F0FF]/40'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Modal */}
      {showDemoModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl"
          onClick={() => setShowDemoModal(false)}
        >
          <div
            className="relative w-full max-w-2xl glass-card rounded-2xl p-8 border border-[rgba(0,240,255,0.3)] shadow-2xl text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowDemoModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white font-mono text-xl"
            >
              ✕
            </button>
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[rgba(0,240,255,0.15)] border border-[#00F0FF] flex items-center justify-center text-[#00F0FF] shadow-[0_0_30px_rgba(0,240,255,0.3)]">
              <Play className="w-8 h-8 fill-[#00F0FF] ml-1" />
            </div>
            <h3 className="text-2xl font-mono font-bold text-white mb-2">NexaFlow V4 Platform Architecture</h3>
            <p className="text-sm text-slate-400 max-w-md mx-auto mb-6">
              Watch how NexaFlow AI coordinates multi-agent tasks, executes parallel pipelines, and enforces enterprise security.
            </p>
            <button
              onClick={() => {
                setShowDemoModal(false);
                document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-premium-primary px-6 py-3 text-xs font-mono font-bold uppercase tracking-wider rounded-xl"
            >
              Open Interactive Demo Playground
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
