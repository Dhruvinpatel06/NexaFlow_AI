'use client';

import { useEffect, useRef, useState } from 'react';

// Hero mockup metric counter with 600ms delay on mount before starting
function MockupCounter({ target, suffix = '', decimals = 0, duration = 1500 }: { target: number; suffix?: string; decimals?: number; duration?: number }) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const startTime = performance.now();
      let aniFrame: number;
      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = progress * (2 - progress); // easeOutQuad
        setVal(easeProgress * target);
        if (progress < 1) {
          aniFrame = requestAnimationFrame(animate);
        } else {
          setVal(target);
        }
      };
      aniFrame = requestAnimationFrame(animate);
    }, 600);
    return () => clearTimeout(timer);
  }, [target, duration]);

  const formatted = decimals > 0 
    ? val.toFixed(decimals)
    : Math.floor(val).toLocaleString();

  return (
    <span>{formatted}{suffix}</span>
  );
}

const COMPANIES = ['Notion', 'Stripe', 'Linear', 'Vercel', 'Figma', 'Atlassian'];

export default function Hero() {
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const [showDemoModal, setShowDemoModal] = useState(false);

  const handleMouseMoveMockup = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8; // ±8deg
    const rotateY = ((x - centerX) / centerX) * 8; // ±8deg
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    card.style.transition = 'none';
  };

  const handleMouseLeaveMockup = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)';
    card.style.transition = 'transform 400ms ease-out';
  };

  useEffect(() => {
    const elements = [
      { ref: badgeRef, delay: 80 },
      { ref: titleRef, delay: 160 },
      { ref: subtitleRef, delay: 240 },
      { ref: ctasRef, delay: 320 },
      { ref: marqueeRef, delay: 360 },
      { ref: mockupRef, delay: 400 },
    ];
    elements.forEach(({ ref, delay }) => {
      if (ref.current) {
        ref.current.style.opacity = '0';
        ref.current.style.animation = `fade-up 600ms ease-out ${delay}ms forwards`;
      }
    });
  }, []);

  return (
    <section
      id="hero"
      aria-label="Hero"
      className="relative w-full pt-32 pb-24 md:pt-36 md:pb-32 overflow-hidden"
      style={{
        backgroundColor: 'var(--bg)',
      }}
    >
      {/* BACKGROUND LAYER */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Large radial glow top-center */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse 120% 60% at 50% -10%, rgba(0,212,255,0.12) 0%, transparent 60%)',
          }}
        />
        {/* Second glow bottom-right */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse 80% 80% at 90% 110%, rgba(255,107,53,0.08) 0%, transparent 60%)',
          }}
        />
        {/* Grid overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
        {/* Floating Orbs */}
        <div
          style={{
            width: 600,
            height: 600,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,212,255,0.06), transparent 70%)',
            position: 'absolute',
            top: -200,
            left: -200,
            animation: 'float-slow 12s ease-in-out infinite',
          }}
        />
        <div
          style={{
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,200,1,0.05), transparent 70%)',
            position: 'absolute',
            bottom: -100,
            right: -100,
            animation: 'float-medium 9s ease-in-out infinite 3s',
          }}
        />
        <div
          style={{
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,107,53,0.06), transparent 70%)',
            position: 'absolute',
            top: '40%',
            left: '60%',
            animation: 'float-slow 15s ease-in-out infinite 6s',
          }}
        />
        {/* Animated Scan Line */}
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.3), transparent)',
            animation: 'scan-line 8s linear infinite',
            opacity: 0.3,
          }}
        />
      </div>

      <div className="hero-content relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-center">
          {/* Left Column */}
          <div className="md:col-span-3 space-y-8">
            {/* Top Eyebrow Badge */}
            <div
              ref={badgeRef}
              className="glass inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full relative overflow-hidden"
              style={{
                background: 'rgba(0, 212, 255, 0.06)',
                border: '1px solid rgba(0, 212, 255, 0.3)',
              }}
            >
              <div style={{ position: 'relative', width: 6, height: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'var(--primary)' }} />
                <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', backgroundColor: 'var(--primary)', animation: 'pulse-ring 2s infinite' }} />
              </div>
              <span style={{ color: 'var(--primary)', fontFamily: 'var(--font-inter)', fontWeight: 500, fontSize: '0.8125rem' }} className="relative z-10">
                ✦ AI-Powered · Now in Public Beta
              </span>
            </div>

            {/* H1 Split into two lines */}
            <h1
              ref={titleRef}
              className="leading-tight animate-fade-in"
              style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(3rem, 6vw, 5rem)', letterSpacing: '-0.03em' }}
            >
              <span className="block text-white font-black" style={{ fontWeight: 900 }}>
                Automate Everything.
              </span>
              <span className="block font-black gradient-text-cyan" style={{ fontWeight: 900 }}>
                Scale Infinitely.
              </span>
            </h1>

            {/* Terminal-style subheading */}
            <div
              ref={subtitleRef}
              className="max-w-xl"
              style={{
                background: 'rgba(0, 212, 255, 0.04)',
                borderLeft: '3px solid var(--primary)',
                padding: '12px 16px',
                borderRadius: '0 8px 8px 0',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono), monospace',
                  color: 'var(--muted)',
                  fontSize: '1rem',
                  lineHeight: 1.6,
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  borderRight: '2px solid transparent',
                  animation: 'typewriter 2s steps(60) 500ms forwards, cursor-blink 1s step-end 500ms 2s forwards',
                }}
              >
                &gt; Transform workflows with AI agents. Ship 10x faster.
              </div>
            </div>

            {/* CTAs Row */}
            <div ref={ctasRef} className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                className="btn-premium-primary font-semibold focus-ring"
                style={{
                  padding: '14px 32px',
                  background: 'linear-gradient(135deg, #00D4FF, #0099BB)',
                  color: '#020B18',
                  fontWeight: 700,
                  borderRadius: '12px',
                  boxShadow: '0 0 30px rgba(0, 212, 255, 0.3)',
                }}
                onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Start Free Trial →
              </button>

              <button
                className="btn-premium-outline font-semibold focus-ring"
                style={{
                  padding: '14px 32px',
                  background: 'transparent',
                  border: '1px solid rgba(0, 212, 255, 0.3)',
                  color: 'var(--primary)',
                  borderRadius: '12px',
                }}
                onClick={() => setShowDemoModal(true)}
              >
                Watch Demo ▶
              </button>
            </div>

            {/* Trust Marquee */}
            <div ref={marqueeRef} className="pt-4 space-y-3">
              <p
                style={{
                  color: 'var(--muted)',
                  fontFamily: 'var(--font-inter)',
                  fontWeight: 500,
                  letterSpacing: '0.15em',
                  fontSize: '0.7rem',
                  textTransform: 'uppercase',
                }}
              >
                TRUSTED BY TEAMS AT
              </p>
              <div
                className="w-full overflow-hidden"
                style={{ maskImage: 'linear-gradient(90deg, transparent, black 15%, black 85%, transparent)', WebkitMaskImage: 'linear-gradient(90deg, transparent, black 15%, black 85%, transparent)' }}
              >
                <div
                  className="flex gap-12 items-center w-max"
                  style={{
                    animation: 'marquee 25s linear infinite',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.animationPlayState = 'paused')}
                  onMouseLeave={(e) => (e.currentTarget.style.animationPlayState = 'running')}
                >
                  {[...COMPANIES, ...COMPANIES, ...COMPANIES].map((company, index) => (
                    <span key={index} className="flex items-center gap-4 text-white/25 font-semibold text-sm" style={{ fontFamily: 'var(--font-inter)' }}>
                      <span>{company}</span>
                      <span style={{ color: 'rgba(0, 212, 255, 0.3)' }}>·</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - 3D Floating Dashboard Card */}
          <div ref={mockupRef} className="md:col-span-2 relative h-96 md:h-full hidden md:block" style={{ perspective: '1200px' }}>
            <div
              className="rounded-2xl p-6 w-full max-w-sm mx-auto cursor-pointer relative"
              style={{
                backgroundColor: 'rgba(7, 21, 37, 0.9)',
                border: '1px solid rgba(0, 212, 255, 0.2)',
                borderRadius: '20px',
                boxShadow: '0 0 0 1px rgba(0,212,255,0.1), 0 40px 80px rgba(0,0,0,0.6), 0 0 80px rgba(0,212,255,0.08), inset 0 1px 0 rgba(0,212,255,0.15)',
                animation: 'float-slow 6s ease-in-out infinite',
                transformStyle: 'preserve-3d',
                willChange: 'transform',
              }}
              onMouseMove={handleMouseMoveMockup}
              onMouseLeave={handleMouseLeaveMockup}
            >
              {/* Card Header */}
              <div className="flex items-center justify-between pb-3 mb-4" style={{ borderBottom: '1px solid rgba(0, 212, 255, 0.15)' }}>
                <span style={{ color: 'var(--primary)', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 700, letterSpacing: '0.05em' }}>
                  NexaFlow Dashboard
                </span>
                <div style={{ display: 'flex', items: 'center', gap: 5, padding: '3px 10px', borderRadius: '9999px', backgroundColor: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)' }}>
                  <div className="live-dot" style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#ef4444' }} />
                  <span style={{ color: '#ef4444', fontSize: '0.65rem', fontFamily: 'var(--font-inter)', fontWeight: 500 }}>● LIVE</span>
                </div>
              </div>

              {/* 3 Metric Rows */}
              {[
                { icon: '⚡', label: 'Workflows Today', value: 12847, suffix: '', decimals: 0 },
                { icon: '📈', label: 'Automation Rate', value: 94.2, suffix: '%', decimals: 1 },
                { icon: '⏱', label: 'Time Saved', value: 3.2, suffix: 'h avg', decimals: 1 },
              ].map((m) => (
                <div key={m.label} className="flex items-center gap-3 py-2.5" style={{ borderBottom: '1px solid var(--border)' }}>
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, rgba(0,212,255,0.2), rgba(0,212,255,0.05))',
                      border: '1px solid rgba(0,212,255,0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.85rem',
                      flexShrink: 0,
                    }}
                  >
                    {m.icon}
                  </div>
                  <span style={{ flex: 1, fontSize: '0.8125rem', color: 'var(--muted)', fontFamily: 'var(--font-inter)' }}>{m.label}</span>
                  <span style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--primary)', fontFamily: 'var(--font-mono)' }}>
                    <MockupCounter target={m.value} suffix={m.suffix} decimals={m.decimals} />
                  </span>
                </div>
              ))}

              {/* Mini bar chart (5 bars, CSS only) */}
              <div style={{ height: 56, display: 'flex', alignItems: 'flex-end', gap: 6, paddingTop: '1rem', marginTop: 4 }}>
                {[50, 75, 40, 90, 65].map((h, i) => (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      height: `${h}%`,
                      borderRadius: '3px 3px 0 0',
                      background: i === 3 ? 'linear-gradient(to top, var(--primary), rgba(0,212,255,0.5))' : 'rgba(0,212,255,0.2)',
                      transition: 'all 150ms ease-out',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--primary)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = i === 3 ? 'linear-gradient(to top, var(--primary), rgba(0,212,255,0.5))' : 'rgba(0,212,255,0.2)')}
                  />
                ))}
              </div>

              {/* Bottom status text */}
              <div className="flex items-center justify-between pt-3 mt-2" style={{ borderTop: '1px solid rgba(0,212,255,0.1)' }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--muted)', fontFamily: 'var(--font-inter)' }}>Updated 2s ago ·</span>
                <span className="w-2 h-2 rounded-full bg-[var(--primary)] animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Modal */}
      {showDemoModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ backgroundColor: 'rgba(2,11,24,0.85)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
          onClick={() => setShowDemoModal(false)}
        >
          <div
            className="relative w-full max-w-2xl mx-4 rounded-2xl overflow-hidden"
            style={{ background: 'var(--surface)', border: '1px solid rgba(0,212,255,0.3)', boxShadow: '0 32px 64px rgba(0,0,0,0.7)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowDemoModal(false)}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center text-white text-lg"
              style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}
              aria-label="Close demo modal"
            >
              ×
            </button>
            <div className="flex items-center gap-2 px-4 py-3" style={{ background: 'rgba(0,0,0,0.3)' }}>
              <div className="flex gap-1.5">
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444' }} />
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#eab308' }} />
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#22c55e' }} />
              </div>
              <div className="flex-1 mx-4 px-3 py-1 rounded-md text-xs" style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-mono)' }}>
                app.nexaflow.ai/dashboard
              </div>
            </div>
            <div className="p-12 text-center">
              <div
                className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center cursor-pointer"
                style={{ background: 'rgba(0,212,255,0.15)', border: '2px solid var(--primary)', boxShadow: '0 0 40px rgba(0,212,255,0.3)' }}
              >
                <span style={{ fontSize: '2rem', marginLeft: '4px', color: 'var(--primary)' }}>▶</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-mono)' }}>Watch NexaFlow in Action</h3>
              <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>Full product demo coming soon. Join the beta to get early access.</p>
              <button
                className="btn-premium-primary mt-6 px-6 py-3"
                onClick={() => {
                  setShowDemoModal(false);
                  document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Join Beta →
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
