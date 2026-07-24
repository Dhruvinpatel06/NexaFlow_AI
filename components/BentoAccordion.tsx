'use client';

import { useState, useEffect, useRef } from 'react';
import { ArrowPath } from './icons/ArrowPath';
import { ArrowTrendingUp } from './icons/ArrowTrendingUp';
import { ChartPie } from './icons/ChartPie';
import { Cog8Tooth } from './icons/Cog8Tooth';
import { Cube16Solid } from './icons/Cube16Solid';
import { LinkSolid } from './icons/LinkSolid';
import { ChevronDown } from './icons/ChevronDown';
import { ChevronUpSolid } from './icons/ChevronUpSolid';

const FEATURES = [
  { id: 0, title: 'Workflow Automation', description: 'Automate repetitive tasks and streamline your business processes with intelligent workflow management.', icon: ArrowPath, color: 'var(--primary)', tag: 'Saves 8h/week avg' },
  { id: 1, title: 'Growth Analytics', description: 'Track performance metrics and gain actionable insights to drive business growth.', icon: ArrowTrendingUp, color: 'var(--secondary)', tag: 'Real-time KPI tracking' },
  { id: 2, title: 'Data Insights', description: 'Deep dive into your data with powerful visualization tools and real-time dashboards.', icon: ChartPie, color: 'var(--primary)', tag: '50+ chart types' },
  { id: 3, title: 'Smart Configuration', description: 'Flexible settings that adapt to your workflow needs without complex setups.', icon: Cog8Tooth, color: 'var(--primary)', tag: 'No-code setup' },
  { id: 4, title: 'Integration Modules', description: 'Connect with your favorite tools seamlessly through our modular integration system.', icon: Cube16Solid, color: 'var(--secondary)', tag: '200+ connectors' },
  { id: 5, title: 'Platform Connections', description: 'Build powerful connections between your applications and data sources.', icon: LinkSolid, color: 'var(--warm)', tag: 'OAuth 2.0 secured' },
];

export default function BentoAccordion() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [isMobile, setIsMobile] = useState(false);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const hoveredIndexRef = useRef<number | null>(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
      if (e.matches && hoveredIndexRef.current !== null) setActiveIndex(hoveredIndexRef.current);
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Reveal on scroll with staggered delay
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            e.target.classList.add('in-view');
            const items = e.target.querySelectorAll('.bento-card-item');
            items.forEach((item, idx) => {
              (item as HTMLElement).style.transitionDelay = `${idx * 80}ms`;
              item.classList.add('reveal-visible');
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseMoveCard = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    el.style.setProperty('--mouse-x', `${x}px`);
    el.style.setProperty('--mouse-y', `${y}px`);
    const rotX = ((x / r.width - 0.5) * 18);
    const rotY = ((y / r.height - 0.5) * -18);
    el.style.transform = `perspective(800px) rotateX(${rotY}deg) rotateY(${rotX}deg) translateZ(12px) scale(1.02)`;
    el.style.boxShadow = `
      ${-rotX * 1.5}px ${rotY * 1.5}px 32px rgba(0,212,255,0.18),
      0 25px 50px rgba(0,0,0,0.4)
    `;
    el.style.transition = 'none';
  };

  const handleMouseLeaveCard = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    el.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateZ(0) scale(1)';
    el.style.transition = 'transform 500ms ease-out, box-shadow 500ms ease-out';
    el.style.boxShadow = '';
  };

  return (
    <section
      id="features"
      aria-label="Features"
      className="py-20 px-6 relative overflow-hidden"
      style={{
        backgroundColor: 'var(--bg)',
        backgroundImage: `
          radial-gradient(ellipse 60% 40% at 80% 50%, rgba(0,212,255,0.05) 0%, transparent 60%),
          linear-gradient(rgba(0,212,255,0.02) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,212,255,0.02) 1px, transparent 1px)
        `,
        backgroundSize: 'auto, 60px 60px, 60px 60px',
      }}
    >
      <div ref={sectionRef} className="max-w-7xl mx-auto reveal reveal-up">
        {/* Eyebrow & Heading */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <span
              style={{
                display: 'inline-block',
                fontSize: '0.6875rem',
                fontWeight: 600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--primary)',
              }}
            >
              PLATFORM CAPABILITIES
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white" style={{ fontFamily: 'var(--font-mono)' }}>
            <span className="gradient-text-cyan">Powerful</span> Features
          </h2>
          <p className="text-lg" style={{ color: 'var(--muted)' }}>
            Everything you need to automate and scale your business
          </p>
        </div>

        {/* Desktop Bento Grid */}
        <div className="hidden md:grid grid-cols-3 gap-6 auto-rows-max">
          {FEATURES.map((feature, idx) => {
            const Icon = feature.icon;
            const isActive = activeIndex === idx;
            const isSpanned = idx === 2;
            return (
              <div
                key={idx}
                className={`cursor-pointer ${isSpanned ? 'col-span-2 row-span-2' : ''} spotlight-card bento-card-item`}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveIndex(isActive ? null : idx);
                  }
                }}
                style={{
                  background: isActive
                    ? 'linear-gradient(135deg, rgba(0,212,255,0.06) 0%, rgba(0,212,255,0.02) 100%), var(--surface)'
                    : 'var(--surface)',
                  border: isActive ? '1px solid rgba(0,212,255,0.4)' : '1px solid var(--border)',
                  boxShadow: isActive
                    ? '0 0 0 1px rgba(0,212,255,0.2), 0 20px 40px rgba(0,0,0,0.4), 0 0 30px rgba(0,212,255,0.08)'
                    : 'none',
                  borderRadius: '16px',
                  padding: '1.75rem',
                  position: 'relative',
                  overflow: 'hidden',
                  minHeight: isSpanned ? '350px' : 'auto',
                  transformStyle: 'preserve-3d',
                  willChange: 'transform',
                  transition: 'transform 200ms ease-out, border-color 200ms ease-out, background-color 200ms ease-out, box-shadow 200ms ease-out',
                }}
                onMouseEnter={() => {
                  hoveredIndexRef.current = idx;
                  setActiveIndex(idx);
                }}
                onMouseMove={handleMouseMoveCard}
                onMouseLeave={(e) => {
                  hoveredIndexRef.current = null;
                  setActiveIndex(null);
                  handleMouseLeaveCard(e);
                }}
              >
                <div className="flex items-start gap-4 mb-3">
                  {/* Upgraded Icon Container */}
                  <div
                    className="flex items-center justify-center flex-shrink-0"
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: 14,
                      background: 'rgba(0,212,255,0.08)',
                      border: '1px solid rgba(0,212,255,0.15)',
                      filter: isActive ? 'drop-shadow(0 0 8px var(--primary))' : 'none',
                      transition: 'filter 200ms ease-out',
                    }}
                  >
                    <Icon color={isActive ? 'var(--primary)' : 'var(--muted)'} size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1" style={{ fontFamily: 'var(--font-mono)' }}>
                      {feature.title}
                    </h3>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        padding: '2px 10px',
                        borderRadius: '999px',
                        fontSize: '0.6875rem',
                        fontWeight: 500,
                        fontFamily: 'var(--font-sans)',
                        background: 'rgba(255,200,1,0.08)',
                        border: '1px solid rgba(255,200,1,0.2)',
                        color: 'var(--secondary)',
                      }}
                    >
                      {feature.tag}
                    </span>
                  </div>
                </div>

                <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)', fontFamily: 'var(--font-inter)' }}>
                  {feature.description}
                </p>

                {/* Smart Configuration (idx === 3): LIVE PREVIEW widget */}
                {idx === 3 && (
                  <div className="mt-4 p-3 rounded-xl bg-[rgba(0,212,255,0.03)] border border-[rgba(0,212,255,0.1)] flex items-center justify-between">
                    <span style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: 'var(--muted)', letterSpacing: '0.1em' }}>LIVE PREVIEW</span>
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(2,11,24,0.6)] border border-[rgba(0,212,255,0.2)] relative overflow-hidden">
                      <div className="flex items-center gap-4 text-xs font-mono relative z-10">
                        <span style={{ animation: 'mini-toggle-text1 4s ease-in-out infinite' }}>[ No-Code ]</span>
                        <span style={{ animation: 'mini-toggle-text2 4s ease-in-out infinite' }}>[ Pro-Mode ]</span>
                      </div>
                      <div
                        style={{
                          position: 'absolute',
                          top: 2,
                          bottom: 2,
                          left: 2,
                          width: 76,
                          borderRadius: 999,
                          background: 'rgba(0,212,255,0.2)',
                          border: '1px solid var(--primary)',
                          animation: 'mini-toggle-slide 4s ease-in-out infinite',
                          zIndex: 0,
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Data Insights card (idx===2) */}
                {isSpanned && (
                  <div className="grid grid-cols-3 gap-6 mt-6 items-center" style={{ transform: 'translateZ(20px)', transformStyle: 'preserve-3d' }}>
                    <div className="col-span-1 flex flex-col gap-3">
                      <div className="glass-card" style={{ border: '1px solid rgba(0,212,255,0.2)', borderRadius: '12px', padding: '10px 14px', background: 'rgba(7,21,37,0.8)' }}>
                        <p style={{ fontSize: '0.55rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0, fontWeight: 700 }}>Accuracy Rate</p>
                        <p style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--primary)', fontFamily: 'var(--font-mono)', margin: '2px 0 0 0' }}>
                          99.98% <span style={{ fontSize: '0.65rem', color: '#00ff64' }}>↑</span>
                        </p>
                      </div>

                      <div className="glass-card" style={{ border: '1px solid rgba(0,212,255,0.12)', borderRadius: '12px', padding: '10px 14px', background: 'rgba(7,21,37,0.8)' }}>
                        <p style={{ fontSize: '0.55rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0, fontWeight: 700 }}>Latency Speed</p>
                        <p style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--secondary)', fontFamily: 'var(--font-mono)', margin: '2px 0 0 0' }}>
                          14.2ms <span style={{ fontSize: '0.65rem', color: 'var(--primary)' }}>⚡</span>
                        </p>
                      </div>
                    </div>

                    <div className="col-span-2 relative w-full h-[130px] rounded-xl p-4 overflow-hidden border border-dashed border-[rgba(0,212,255,0.15)] bg-[rgba(2,11,24,0.5)]">
                      <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.1, pointerEvents: 'none' }}>
                        <line x1="0" y1="30" x2="100%" y2="30" stroke="var(--primary)" strokeWidth="0.5" strokeDasharray="3,3" />
                        <line x1="0" y1="65" x2="100%" y2="65" stroke="var(--primary)" strokeWidth="0.5" strokeDasharray="3,3" />
                        <line x1="0" y1="100" x2="100%" y2="100%" stroke="var(--primary)" strokeWidth="0.5" strokeDasharray="3,3" />
                      </svg>

                      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 130" preserveAspectRatio="none" style={{ pointerEvents: 'none' }}>
                        <defs>
                          <linearGradient id="primaryChartFill" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        <path d="M0,130 L0,90 C40,80 80,110 120,60 C160,20 200,90 240,40 L300,30 L300,130 Z" fill="url(#primaryChartFill)" style={{ opacity: isActive ? 1 : 0.5, transition: 'opacity 300ms' }} />
                        <path
                          d="M0,90 C40,80 80,110 120,60 C160,20 200,90 240,40 L300,30"
                          fill="none"
                          stroke="var(--primary)"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          style={{
                            strokeDasharray: '400',
                            strokeDashoffset: isActive ? '0' : '400',
                            transition: 'stroke-dashoffset 1.5s ease-out',
                          }}
                        />
                        {isActive && (
                          <circle cx="160" cy="20" r="4" fill="var(--secondary)" style={{ filter: 'drop-shadow(0 0 6px var(--secondary))' }}>
                            <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" />
                          </circle>
                        )}
                      </svg>

                      <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-1 rounded bg-[rgba(7,21,37,0.9)] border border-[rgba(0,212,255,0.25)] text-[0.55rem] font-bold text-[var(--primary)]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00ff64] animate-pulse" />
                        ANALYTICS: LIVE
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile Accordion */}
        <div className="md:hidden space-y-3">
          {FEATURES.map((feature, idx) => {
            const Icon = feature.icon;
            const isActive = activeIndex === idx;
            return (
              <div
                key={idx}
                className="overflow-hidden"
                style={{
                  background: 'var(--surface)',
                  borderBottom: '1px solid var(--border)',
                  borderLeft: isActive ? '3px solid var(--primary)' : '3px solid transparent',
                  borderRadius: '12px',
                  transition: 'all 200ms ease-out',
                }}
              >
                <button
                  onClick={() => setActiveIndex(isActive ? null : idx)}
                  className="w-full px-6 py-4 flex items-center gap-4 justify-between"
                  style={{ backgroundColor: 'transparent' }}
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div
                      className="flex items-center justify-center flex-shrink-0"
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 12,
                        background: 'rgba(0,212,255,0.08)',
                        border: '1px solid rgba(0,212,255,0.15)',
                      }}
                    >
                      <Icon color="var(--primary)" size={20} />
                    </div>
                    <h3 className="text-lg font-bold text-left" style={{ color: isActive ? 'var(--primary)' : 'white', fontFamily: 'var(--font-mono)' }}>
                      {feature.title}
                    </h3>
                  </div>
                  {isActive ? <ChevronUpSolid color="var(--primary)" size={20} /> : <ChevronDown color="var(--muted)" size={20} />}
                </button>
                <div style={{ maxHeight: isActive ? `${contentRefs.current[idx]?.scrollHeight ?? 200}px` : '0px', overflow: 'hidden', transition: 'max-height 350ms ease-in-out' }}>
                  <div ref={(el) => { contentRefs.current[idx] = el; }} className="px-6 pb-4 text-sm leading-relaxed" style={{ background: 'rgba(0,212,255,0.02)', color: 'var(--muted)' }}>
                    {feature.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
