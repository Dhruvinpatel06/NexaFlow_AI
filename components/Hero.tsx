'use client';

import { useEffect, useState } from 'react';
import NeuralCanvas from './NeuralCanvas';
import { Sparkles, Play, Terminal as TerminalIcon, Cpu, Zap, ArrowRight, Code, Shield } from 'lucide-react';

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

  return <span>{formatted}{suffix}</span>;
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
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(16px)`;
  };

  const handleMouseLeaveMockup = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)';
    card.style.transition = 'transform 500ms ease-out';
  };

  return (
    <section id="hero" aria-label="Scene 1: System Initialization" className="relative w-full pt-36 pb-24 md:pt-44 md:pb-32 overflow-hidden bg-[#030712]">
      {/* 3D WebGL Neural Mesh Background */}
      <NeuralCanvas />

      {/* Volumetric Soft White Light Layers */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[radial-gradient(ellipse_100%_70%_at_50%_-20%,rgba(255,255,255,0.06),transparent_70%)] pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column Content */}
          <div className="lg:col-span-7 space-y-8">
            {/* Top Eyebrow Badge */}
            <div className="glass inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
              <span className="w-2 h-2 rounded-full bg-white animate-ping" />
              <span className="text-xs font-mono font-bold text-white tracking-wider uppercase flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> SCENE 01 // AI CORE INITIALIZED
              </span>
            </div>

            {/* Cinematic Headline */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black font-mono tracking-tight leading-none text-white">
              The Autonomous <br />
              <span className="gradient-text-cyan">AI Operating System</span>
            </h1>

            {/* Code Terminal Box */}
            <div className="max-w-xl bg-slate-950/90 border border-slate-800 rounded-xl p-4 shadow-2xl font-mono text-xs text-slate-300 relative overflow-hidden">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-[11px] text-slate-500">
                <span className="flex items-center gap-1.5 text-white font-bold">
                  <Code className="w-3.5 h-3.5" /> nexaflow_init.ts
                </span>
                <span>V8 EDGE RUNTIME</span>
              </div>
              <pre className="text-slate-300 overflow-x-auto leading-relaxed">
                <code>
                  <span className="text-slate-400">const</span> agent = <span className="text-white font-semibold">new</span> NexaAgent(&#123; pipeline: <span className="text-slate-300">&quot;sales_auto_v4&quot;</span> &#125;);{'\n'}
                  <span className="text-slate-400">await</span> agent.<span className="text-white font-semibold">initializeCore</span>(); <span className="text-slate-500">// 12ms SLA</span>
                </code>
              </pre>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-premium-primary px-8 py-4 text-xs font-mono font-bold tracking-widest uppercase rounded-xl flex items-center justify-center gap-2 cursor-pointer"
              >
                Launch AI Agent <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setShowDemoModal(true)}
                className="btn-premium-outline px-8 py-4 text-xs font-mono font-bold tracking-widest uppercase rounded-xl flex items-center justify-center gap-2 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-white" /> Watch 2-Min Demo
              </button>
            </div>

            {/* Trust Logos Marquee */}
            <div className="pt-6 border-t border-slate-800/80 space-y-3">
              <p className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-widest">
                ENGINEERING TEAMS AT
              </p>
              <div className="w-full overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_15%,black_85%,transparent)]">
                <div className="flex gap-12 items-center w-max animate-[marquee_25s_linear_infinite] hover:[animation-play-state:paused]">
                  {[...COMPANIES, ...COMPANIES, ...COMPANIES].map((company, index) => (
                    <span key={index} className="flex items-center gap-4 text-slate-400 font-mono text-sm font-semibold">
                      <span>{company}</span>
                      <span className="text-white/30">·</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - 3D Dashboard Mockup Card */}
          <div className="lg:col-span-5 relative" style={{ perspective: '1200px' }}>
            <div
              className="glass-card rounded-2xl p-6 border border-white/15 shadow-[0_0_50px_rgba(0,0,0,0.8)] relative overflow-hidden transition-all duration-300 cursor-pointer"
              onMouseMove={handleMouseMoveMockup}
              onMouseLeave={handleMouseLeaveMockup}
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-white">
                  <Cpu className="w-4 h-4" /> NEXAFLOW RUNTIME HUB
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> LIVE STREAM
                </div>
              </div>

              {/* 3 Metric Rows */}
              <div className="space-y-3 font-mono">
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <Zap className="w-4 h-4 text-white" />
                    <span className="text-xs text-slate-400">Workflows Executed</span>
                  </div>
                  <span className="text-base font-bold text-white">
                    <MockupCounter target={12847} />
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <Shield className="w-4 h-4 text-slate-300" />
                    <span className="text-xs text-slate-400">Automation Accuracy</span>
                  </div>
                  <span className="text-base font-bold text-white">
                    <MockupCounter target={99.98} suffix="%" decimals={2} />
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <Cpu className="w-4 h-4 text-slate-300" />
                    <span className="text-xs text-slate-400">Avg Execution Latency</span>
                  </div>
                  <span className="text-base font-bold text-white">
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
                          ? 'bg-gradient-to-t from-white to-slate-400 shadow-[0_0_12px_rgba(255,255,255,0.5)]'
                          : 'bg-slate-800 hover:bg-white/40'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
