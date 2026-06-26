'use client';

import { useEffect, useRef } from 'react';

const TRUST_COMPANIES = ['Stripe', 'Notion', 'Figma', 'Linear', 'Vercel', 'Slack'];

const MOCK_METRICS = [
  { icon: '⚡', label: 'Workflows Run Today', value: '12,847', color: 'var(--primary)' },
  { icon: '📈', label: 'Automation Rate', value: '94.2%', color: 'var(--warm)' },
  { icon: '⏱', label: 'Time Saved', value: '3.2h avg', color: '#4ade80' },
];

const BAR_HEIGHTS = [40, 65, 45, 80, 55];

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
      style={{ backgroundColor: 'var(--dark)' }}
    >
      <div className="hero-content max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-center">
          {/* Left Column - Text Content (60%) */}
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
                  width: 4,
                  height: 4,
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
              <span className="block gradient-text font-black" style={{ fontWeight: 900 }}>
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
                borderLeft: '3px solid rgba(255, 200, 1, 0.4)',
                paddingLeft: '16px',
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
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(255, 200, 1, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none';
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
              <p
                className="text-xs"
                style={{
                  color: 'rgba(255, 255, 255, 0.4)',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 400,
                  fontSize: '0.75rem',
                }}
              >
                Trusted by teams at
              </p>
              <div className="overflow-hidden">
                <div className="trust-marquee-track">
                  {marqueeItems.map((company, idx) => (
                    <span
                      key={idx}
                      className="flex items-center whitespace-nowrap"
                      style={{
                        opacity: 0.35,
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 500,
                        fontSize: '0.875rem',
                        color: 'white',
                      }}
                    >
                      {company}
                      {idx < marqueeItems.length - 1 && (
                        <span className="mx-4" style={{ opacity: 0.5 }}>
                          •
                        </span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Floating Mockup (40%) */}
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
                {/* LIVE Badge */}
                <div
                  className="absolute top-4 right-4 flex items-center gap-1.5 px-2 py-1 rounded-full"
                  style={{
                    backgroundColor: 'rgba(239, 68, 68, 0.15)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                  }}
                >
                  <div
                    className="live-dot w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: '#ef4444' }}
                  />
                  <span
                    className="text-xs font-semibold"
                    style={{ color: '#ef4444', fontFamily: 'JetBrains Mono' }}
                  >
                    LIVE
                  </span>
                </div>

                {/* Mock Dashboard Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--primary)' }} />
                    <div className="w-3 h-3 rounded-full bg-white/20" />
                    <div className="w-3 h-3 rounded-full bg-white/20" />
                  </div>
                </div>

                {/* Metric Rows */}
                <div className="space-y-4 mb-6">
                  {MOCK_METRICS.map((metric) => (
                    <div key={metric.label} className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0"
                        style={{ backgroundColor: 'var(--primary)' }}
                      >
                        {metric.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-white/50 truncate">{metric.label}</p>
                      </div>
                      <span
                        className="text-sm font-bold flex-shrink-0"
                        style={{ color: metric.color, fontFamily: 'JetBrains Mono' }}
                      >
                        {metric.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Mini Bar Chart */}
                <div className="flex gap-2 items-end h-16 pt-2">
                  {BAR_HEIGHTS.map((height, idx) => (
                    <div
                      key={idx}
                      className="flex-1 rounded-sm"
                      style={{
                        height: `${height}%`,
                        background: 'linear-gradient(to top, var(--primary), rgba(255, 200, 1, 0.3))',
                      }}
                    />
                  ))}
                </div>

                {/* Glow Accent */}
                <div
                  className="absolute -bottom-12 -right-12 w-40 h-40 rounded-full opacity-20 blur-3xl"
                  style={{ backgroundColor: 'var(--primary)' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
