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
  const subtitleRef = useRef<HTMLParagraphElement>(null);
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
        ref.current.style.animation = `fade-up 500ms ease-out ${delay}ms forwards`;
        ref.current.style.opacity = '0';
      }
    });
  }, []);

  return (
    <section
      id="hero"
      aria-label="Hero"
      className="hero-bg noise-overlay relative w-full pt-32 pb-24 md:pt-36 md:pb-32 overflow-hidden"
      style={{
        backgroundColor: 'var(--surface)',
        backgroundImage: `
          radial-gradient(ellipse 70% 50% at 50% -10%, rgba(255,200,1,0.14) 0%, transparent 65%),
          radial-gradient(ellipse 50% 60% at 0% 100%, rgba(17,76,90,0.6) 0%, transparent 60%),
          radial-gradient(ellipse 40% 40% at 100% 50%, rgba(255,154,50,0.08) 0%, transparent 55%)
        `,
      }}
    >
      {/* 3 CSS Floating Orb Decorations */}
      <div
        style={{
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,200,1,0.08) 0%, transparent 70%)',
          position: 'absolute',
          top: -200,
          left: -200,
          animation: 'float 8s ease-in-out infinite',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <div
        style={{
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,154,50,0.06) 0%, transparent 70%)',
          position: 'absolute',
          bottom: -100,
          right: -100,
          animation: 'float 6s ease-in-out infinite reverse',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <div
        style={{
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(17,76,90,0.15) 0%, transparent 70%)',
          position: 'absolute',
          top: '40%',
          left: '40%',
          animation: 'float 10s ease-in-out infinite 2s',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div className="hero-content relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-center">
          {/* Left Column */}
          <div className="md:col-span-3 space-y-8">
            {/* Eyebrow Badge with shimmer animation */}
            <div
              ref={badgeRef}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full relative overflow-hidden"
              style={{
                background: 'linear-gradient(90deg, rgba(255,200,1,0.08) 0%, rgba(255,200,1,0.2) 50%, rgba(255,200,1,0.08) 100%)',
                backgroundSize: '200% auto',
                animation: 'badge-shimmer 3s linear infinite',
                border: '1px solid rgba(255, 200, 1, 0.4)',
              }}
            >
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  backgroundColor: 'var(--primary)',
                  boxShadow: '0 0 6px var(--primary)',
                  animation: 'pulse-glow 2s ease-in-out infinite',
                  flexShrink: 0,
                }}
              />
              <span style={{ color: 'var(--primary)' }} className="text-sm font-medium relative z-10">
                ✦ AI-Powered Automation — Now in Public Beta
              </span>
            </div>

            {/* H1 Split into two lines */}
            <h1
              ref={titleRef}
              className="leading-tight animate-fade-in"
              style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', letterSpacing: '-0.03em' }}
            >
              <span className="block text-white font-black" style={{ fontWeight: 900 }}>
                Automate Everything.
              </span>
              <span
                className="block font-black"
                style={{
                  fontWeight: 900,
                  background: 'linear-gradient(135deg, #FFC801 0%, #FF9A32 50%, #FFC801 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  backgroundSize: '200% auto',
                  animation: 'shimmer-text 4s linear infinite',
                }}
              >
                Scale Infinitely.
              </span>
            </h1>

            {/* Subheading */}
            <p
              ref={subtitleRef}
              className="max-w-lg"
              style={{
                fontSize: '1.125rem',
                lineHeight: 1.7,
                borderLeft: '3px solid var(--primary)',
                paddingLeft: '16px',
                background: 'linear-gradient(90deg, rgba(255,200,1,0.06) 0%, transparent 100%)',
                borderRadius: '0 6px 6px 0',
                paddingTop: '8px',
                paddingBottom: '8px',
                color: 'rgba(255, 255, 255, 0.75)',
              }}
            >
              Transform your workflow with intelligent AI agents. Boost productivity by 10x with seamless integrations and real-time insights.
            </p>

            {/* CTA Buttons */}
            <div ref={ctasRef} className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                className="btn-premium-primary font-semibold focus-ring"
                style={{ padding: '14px 32px' }}
                onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Start Free Trial
              </button>

              <button
                className="btn-premium-outline font-semibold focus-ring"
                style={{ padding: '14px 32px' }}
                onClick={() => setShowDemoModal(true)}
              >
                Watch Demo →
              </button>
            </div>

            {/* Scrolling Trust Marquee Row */}
            <div ref={marqueeRef} className="pt-6 space-y-3">
              <p
                style={{
                  color: 'rgba(255,255,255,0.3)',
                  fontFamily: 'var(--font-inter)',
                  fontWeight: 500,
                  letterSpacing: '0.15em',
                  fontSize: '0.6875rem',
                  textTransform: 'uppercase',
                }}
              >
                POWERING TEAMS AT
              </p>
              <div className="w-full overflow-hidden" style={{ maskImage: 'linear-gradient(90deg, transparent, black 15%, black 85%, transparent)' }}>
                <div
                  className="flex gap-12 items-center w-max"
                  style={{
                    animation: 'marquee 25s linear infinite',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.animationPlayState = 'paused')}
                  onMouseLeave={(e) => (e.currentTarget.style.animationPlayState = 'running')}
                >
                  {[...COMPANIES, ...COMPANIES, ...COMPANIES].map((company, index) => (
                    <span key={index} className="flex items-center gap-4 text-white/35 font-semibold text-base" style={{ fontFamily: 'var(--font-inter)' }}>
                      <span>{company}</span>
                      <span style={{ color: 'rgba(255,200,1,0.5)' }}>·</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Premium Glassmorphism Floating Mockup */}
          <div ref={mockupRef} className="md:col-span-2 relative h-96 md:h-full hidden md:block">
            <div
              className="rounded-2xl p-[1px] w-full max-w-sm mx-auto h-full"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 200, 1, 0.3), rgba(255, 154, 50, 0.1))',
                animation: 'float 3s ease-in-out infinite',
                outline: '1px solid rgba(255,200,1,0.2)',
                boxShadow:
                  '0 0 0 1px rgba(255,200,1,0.1), 0 30px 60px rgba(0,0,0,0.5), 0 0 80px rgba(255,200,1,0.08)',
              }}
            >
              <div
                className="rounded-2xl p-6 w-full h-full relative overflow-hidden cursor-pointer flex flex-col justify-between"
                style={{
                  backgroundColor: 'var(--surface)',
                  backgroundImage:
                    'linear-gradient(rgba(255,200,1,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,200,1,0.03) 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                  transformStyle: 'preserve-3d',
                  willChange: 'transform',
                }}
                onMouseMove={handleMouseMoveMockup}
                onMouseLeave={handleMouseLeaveMockup}
              >
                {/* Thin animated progress bar */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2.5px', backgroundColor: 'rgba(255,255,255,0.05)', zIndex: 10 }}>
                  <div style={{ height: '100%', background: 'linear-gradient(90deg, var(--primary), var(--warm))', animation: 'progress-fill 3s ease-out infinite' }} />
                </div>

                {/* Frosted Glass Header Bar */}
                <div
                  className="flex items-center justify-between px-4 py-2.5 -mx-6 -mt-6 mb-4"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    borderBottom: '1px solid rgba(255,255,255,0.08)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                  }}
                >
                  <div className="flex gap-1.5">
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ef4444' }} />
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#eab308' }} />
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e' }} />
                  </div>
                  <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.68rem', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>NexaFlow Dashboard</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '2px 8px', borderRadius: '9999px', backgroundColor: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)' }}>
                    <div className="live-dot" style={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: '#ef4444' }} />
                    <span style={{ color: '#ef4444', fontSize: '0.6rem', fontFamily: 'var(--font-mono)', fontWeight: 700, letterSpacing: '0.05em' }}>LIVE</span>
                  </div>
                </div>

                <p style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.3)', fontFamily: 'Inter', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '10px' }}>Automation Overview</p>

                {/* Metric rows with 600ms delayed counters */}
                {[
                  { icon: '⚡', label: 'Workflows Run Today', value: 12847, suffix: '', decimals: 0, color: 'var(--primary)', pct: 82 },
                  { icon: '📈', label: 'Automation Rate', value: 94.2, suffix: '%', decimals: 1, color: 'var(--warm)', pct: 94 },
                  { icon: '⏱', label: 'Time Saved', value: 3.2, suffix: 'h avg', decimals: 1, color: '#4ade80', pct: 67 },
                ].map((m) => (
                  <div key={m.label} style={{ marginBottom: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <div style={{ width: 26, height: 26, borderRadius: '8px', backgroundColor: 'rgba(255,200,1,0.12)', border: '1px solid rgba(255,200,1,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', flexShrink: 0 }}>{m.icon}</div>
                      <p style={{ flex: 1, fontSize: '0.65rem', color: 'rgba(255,255,255,0.45)', fontFamily: 'Inter' }}>{m.label}</p>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: m.color, fontFamily: 'var(--font-mono)' }}>
                        <MockupCounter target={m.value} suffix={m.suffix} decimals={m.decimals} />
                      </span>
                    </div>
                    <div style={{ width: '100%', height: '3px', borderRadius: '9999px', backgroundColor: 'rgba(255,255,255,0.07)' }}>
                      <div style={{ width: `${m.pct}%`, height: '100%', borderRadius: '9999px', background: 'linear-gradient(90deg, var(--primary), var(--warm))', transition: 'width 1s ease-out' }} />
                    </div>
                  </div>
                ))}

                {/* 5-bar mini chart at bottom */}
                <div style={{ display: 'flex', gap: 4, alignItems: 'flex-end', height: 40, padding: '0 0.5rem 0.5rem', marginTop: 8 }}>
                  {[60, 80, 45, 90, 75].map((h, i) => (
                    <div
                      key={i}
                      style={{
                        flex: 1,
                        height: `${h}%`,
                        borderRadius: '3px 3px 0 0',
                        background: i === 3 ? 'var(--primary)' : 'rgba(255,200,1,0.3)',
                        transition: 'height 1s ease-out',
                        animationDelay: `${i * 0.1}s`,
                      }}
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
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
          onClick={() => setShowDemoModal(false)}
        >
          <div
            className="relative w-full max-w-2xl mx-4 rounded-2xl overflow-hidden"
            style={{ background: 'var(--surface)', border: '1px solid rgba(255,200,1,0.3)', boxShadow: '0 32px 64px rgba(0,0,0,0.5)' }}
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
                style={{ background: 'rgba(255,200,1,0.15)', border: '2px solid var(--primary)', boxShadow: '0 0 40px rgba(255,200,1,0.3)' }}
              >
                <span style={{ fontSize: '2rem', marginLeft: '4px' }}>▶</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-mono)' }}>Watch NexaFlow in Action</h3>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>Full product demo coming soon. Join the beta to get early access.</p>
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
