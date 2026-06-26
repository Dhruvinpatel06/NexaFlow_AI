'use client';

import { useEffect, useRef } from 'react';

const TRUST_COMPANIES = ['Stripe', 'Notion', 'Figma', 'Linear', 'Vercel', 'Slack'];

export default function Hero() {
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements = [
      { ref: badgeRef, delay: 80 },
      { ref: titleRef, delay: 160 },
      { ref: subtitleRef, delay: 240 },
      { ref: ctasRef, delay: 320 },
      { ref: mockupRef, delay: 400 },
    ];

    elements.forEach(({ ref, delay }) => {
      if (ref.current) {
        ref.current.style.animation = `fade-up 500ms ease-out ${delay}ms forwards`;
        ref.current.style.opacity = '0';
      }
    });
  }, []);

  const marqueeItems = [...TRUST_COMPANIES, ...TRUST_COMPANIES];

  return (
    <section
      aria-label="Hero"
      className="hero-bg relative w-full py-24 md:py-32 overflow-hidden"
      style={{
        backgroundColor: 'var(--surface)',
        backgroundImage: `
          radial-gradient(ellipse 70% 50% at 50% -10%, rgba(255,200,1,0.14) 0%, transparent 65%),
          radial-gradient(ellipse 50% 60% at 0% 100%, rgba(17,76,90,0.6) 0%, transparent 60%),
          radial-gradient(ellipse 40% 40% at 100% 50%, rgba(255,154,50,0.08) 0%, transparent 55%)
        `,
      }}
    >
      <div className="hero-content max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-center">
          {/* Left Column */}
          <div className="md:col-span-3 space-y-8">
            {/* Pill Badge */}
            <div
              ref={badgeRef}
              className="badge-shimmer inline-flex items-center gap-2 px-4 py-2 rounded-full relative"
              style={{
                backgroundColor: 'rgba(255, 200, 1, 0.08)',
                border: '1px solid rgba(255, 200, 1, 0.4)',
              }}
            >
              <div
                style={{
                  width: 4, height: 4, borderRadius: '50%',
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

            {/* H1 */}
            <h1
              ref={titleRef}
              className="leading-tight"
              style={{
                fontFamily: 'JetBrains Mono',
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                letterSpacing: '-0.03em',
              }}
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
                  animation: 'shimmer 4s linear infinite',
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
                color: 'rgba(255, 255, 255, 0.65)',
              }}
            >
              Transform your workflow with intelligent AI agents. Boost productivity by 10x with seamless integrations and real-time insights.
            </p>

            {/* CTA Buttons */}
            <div ref={ctasRef} className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                className="btn-shimmer font-semibold hover:-translate-y-0.5 transition-all duration-200 ease-out"
                style={{
                  padding: '14px 32px',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: 'var(--surface)',
                  boxShadow: '0 4px 20px rgba(255,200,1,0.35)',
                  border: '1px solid rgba(255,200,1,0.4)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(255,200,1,0.5), 0 0 0 2px rgba(255,200,1,0.2)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(255,200,1,0.35)';
                }}
              >
                Start Free Trial
              </button>

              <button
                className="font-semibold hover:-translate-y-0.5 transition-all duration-200 ease-out"
                style={{
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  color: 'white',
                  padding: '14px 32px',
                  borderRadius: '12px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 200, 1, 0.5)';
                  e.currentTarget.style.background = 'rgba(255, 200, 1, 0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                }}
              >
                Watch Demo →
              </button>
            </div>

            {/* Trust Marquee */}
            <div className="pt-8 space-y-3 overflow-hidden">
              <p className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.4)', fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '0.75rem' }}>
                Trusted by teams at
              </p>
              <div className="overflow-hidden">
                <div className="trust-marquee-track">
                  {marqueeItems.map((company, idx) => (
                    <span
                      key={idx}
                      style={{ display: 'flex', alignItems: 'center', gap: 6, opacity: 0.45, fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '0.875rem', color: 'white' }}
                    >
                      <span style={{ width: 5, height: 5, borderRadius: 1, backgroundColor: idx % 2 === 0 ? 'var(--primary)' : 'var(--warm)', opacity: 0.7, flexShrink: 0 }} />
                      {company}
                      {idx < marqueeItems.length - 1 && <span style={{ margin: '0 12px', opacity: 0.3 }}>·</span>}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Floating Mockup */}
          <div ref={mockupRef} className="md:col-span-2 relative h-96 md:h-full hidden md:block">
            <div
              className="rounded-2xl p-[1px] w-full max-w-sm mx-auto h-full"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 200, 1, 0.3), rgba(255, 154, 50, 0.1))',
                animation: 'float 3s ease-in-out infinite',
                boxShadow: '0 0 60px rgba(255, 200, 1, 0.15), 0 40px 80px rgba(0, 0, 0, 0.5)',
              }}
            >
              <div
                className="rounded-2xl p-6 w-full h-full relative overflow-hidden"
                style={{ backgroundColor: 'var(--surface)' }}
              >
                {/* Top window chrome */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex gap-1.5">
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'rgba(255,200,1,0.8)' }} />
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'rgba(255,255,255,0.15)' }} />
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'rgba(255,255,255,0.15)' }} />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '3px 10px', borderRadius: '9999px', backgroundColor: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)' }}>
                    <div className="live-dot" style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#ef4444' }} />
                    <span style={{ color: '#ef4444', fontSize: '0.65rem', fontFamily: 'JetBrains Mono', fontWeight: 700, letterSpacing: '0.08em' }}>LIVE</span>
                  </div>
                </div>

                {/* Mini section label */}
                <p style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.3)', fontFamily: 'Inter', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px' }}>Automation Overview</p>

                {/* Metric rows with progress bars */}
                {[
                  { icon: '⚡', label: 'Workflows Run Today', value: '12,847', color: 'var(--primary)', pct: 82 },
                  { icon: '📈', label: 'Automation Rate', value: '94.2%', color: 'var(--warm)', pct: 94 },
                  { icon: '⏱', label: 'Time Saved', value: '3.2h avg', color: '#4ade80', pct: 67 },
                ].map((m) => (
                  <div key={m.label} style={{ marginBottom: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
                      <div style={{ width: 28, height: 28, borderRadius: '8px', backgroundColor: 'rgba(255,200,1,0.12)', border: '1px solid rgba(255,200,1,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', flexShrink: 0 }}>{m.icon}</div>
                      <p style={{ flex: 1, fontSize: '0.65rem', color: 'rgba(255,255,255,0.45)', fontFamily: 'Inter' }}>{m.label}</p>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: m.color, fontFamily: 'JetBrains Mono' }}>{m.value}</span>
                    </div>
                    <div style={{ width: '100%', height: '3px', borderRadius: '9999px', backgroundColor: 'rgba(255,255,255,0.07)' }}>
                      <div style={{ width: `${m.pct}%`, height: '100%', borderRadius: '9999px', background: 'linear-gradient(90deg, var(--primary), var(--warm))', transition: 'width 1s ease-out' }} />
                    </div>
                  </div>
                ))}

                {/* 3D Bar chart */}
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 5, height: 52, paddingTop: 8, borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: 8 }}>
                  {[38, 58, 42, 75, 50, 68, 44, 80].map((h, i) => (
                    <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                      <div style={{ width: '100%', height: 3, background: 'linear-gradient(90deg,rgba(255,200,1,0.9),rgba(255,154,50,0.7))', borderRadius: '2px 2px 0 0', transform: 'skewX(-15deg)', marginBottom: -1, zIndex: 1 }} />
                      <div style={{ width: '100%', height: `${h * 0.6}px`, background: i % 2 === 0 ? 'linear-gradient(180deg,rgba(255,200,1,0.75) 0%,rgba(255,200,1,0.2) 100%)' : 'linear-gradient(180deg,rgba(17,76,90,0.7) 0%,rgba(17,76,90,0.2) 100%)', borderRadius: '2px 2px 0 0' }} />
                    </div>
                  ))}
                </div>

                {/* Bottom glow */}
                <div style={{ position: 'absolute', bottom: -40, right: -40, width: 160, height: 160, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,200,1,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', top: -20, left: -20, width: 100, height: 100, borderRadius: '50%', background: 'radial-gradient(circle, rgba(17,76,90,0.3) 0%, transparent 70%)', pointerEvents: 'none' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
