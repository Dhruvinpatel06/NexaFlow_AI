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
  { id: 1, title: 'Growth Analytics', description: 'Track performance metrics and gain actionable insights to drive business growth.', icon: ArrowTrendingUp, color: 'var(--warm)', tag: 'Real-time KPI tracking' },
  { id: 2, title: 'Data Insights', description: 'Deep dive into your data with powerful visualization tools and real-time dashboards.', icon: ChartPie, color: 'var(--accent)', tag: '50+ chart types' },
  { id: 3, title: 'Smart Configuration', description: 'Flexible settings that adapt to your workflow needs without complex setups.', icon: Cog8Tooth, color: 'var(--primary)', tag: 'No-code setup' },
  { id: 4, title: 'Integration Modules', description: 'Connect with your favorite tools seamlessly through our modular integration system.', icon: Cube16Solid, color: 'var(--warm)', tag: '200+ connectors' },
  { id: 5, title: 'Platform Connections', description: 'Build powerful connections between your applications and data sources.', icon: LinkSolid, color: 'var(--accent)', tag: 'OAuth 2.0 secured' },
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

  // Reveal on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            e.target.classList.add('in-view');
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Spotlight + 3D Mouse-Tracking Tilt (±9deg)
  const handleMouseMoveCard = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    el.style.setProperty('--mouse-x', `${x}px`);
    el.style.setProperty('--mouse-y', `${y}px`);
    const rotX = ((x / r.width - 0.5) * 18); // ±9deg
    const rotY = ((y / r.height - 0.5) * -18);
    el.style.transform = `perspective(800px) rotateX(${rotY}deg) rotateY(${rotX}deg) translateZ(12px) scale(1.02)`;
    el.style.boxShadow = `
      ${-rotX * 1.5}px ${rotY * 1.5}px 32px rgba(255,200,1,0.18),
      0 25px 50px rgba(0,0,0,0.15)
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
      className="py-16 px-6"
      style={{
        backgroundColor: 'var(--bg)',
        backgroundImage: `
          radial-gradient(ellipse 80% 60% at 10% 20%, rgba(255,200,1,0.07) 0%, transparent 50%),
          radial-gradient(ellipse 60% 80% at 90% 80%, rgba(17,76,90,0.09) 0%, transparent 50%),
          radial-gradient(circle, rgba(17,76,90,0.04) 1px, transparent 1px)
        `,
        backgroundSize: 'auto, auto, 24px 24px',
      }}
    >
      <div ref={sectionRef} className="max-w-7xl mx-auto reveal reveal-up">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <span
              style={{
                display: 'inline-block',
                paddingBottom: '4px',
                borderBottom: '3px solid var(--primary)',
                fontSize: '0.65rem',
                fontWeight: 700,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--dark)',
              }}
            >
              Platform Capabilities
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--text)', fontFamily: 'var(--font-mono)' }}>
            Powerful <span className="gradient-text">Features</span>
          </h2>
          <p className="text-lg" style={{ color: 'var(--muted)', opacity: 0.7 }}>
            Everything you need to automate and scale your business
          </p>
        </div>

        {/* Desktop Bento Grid with staggered reveal and spotlight */}
        <div className="hidden md:grid grid-cols-3 gap-6 auto-rows-max">
          {FEATURES.map((feature, idx) => {
            const Icon = feature.icon;
            const isActive = activeIndex === idx;
            const isSpanned = idx === 2;
            return (
              <div
                key={idx}
                className={`cursor-pointer ${isSpanned ? 'col-span-2 row-span-2' : ''} card-depth spotlight-card bento-card bento-card-delay-${idx}`}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveIndex(isActive ? null : idx);
                  }
                }}
                style={{
                  background: isActive
                    ? 'radial-gradient(300px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,200,1,0.08), transparent 70%), linear-gradient(145deg, rgba(255,255,255,0.95), rgba(255,200,1,0.04))'
                    : 'radial-gradient(300px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,200,1,0.06), transparent 70%), rgba(255,255,255,0.75)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  border: isActive ? '1px solid rgba(255,200,1,0.6)' : '1px solid rgba(255,200,1,0.15)',
                  boxShadow: isActive
                    ? '0 1px 0 rgba(255,255,255,0.8) inset, 0 8px 32px rgba(255,200,1,0.15), 0 4px 12px rgba(0,0,0,0.08)'
                    : '0 1px 0 rgba(255,255,255,0.8) inset, 0 4px 16px rgba(17,76,90,0.08), 0 1px 3px rgba(0,0,0,0.04)',
                  borderRadius: '24px',
                  padding: '2rem',
                  position: 'relative',
                  overflow: 'hidden',
                  minHeight: isSpanned ? '350px' : 'auto',
                  transformStyle: 'preserve-3d',
                  willChange: 'transform',
                  transition: 'transform 100ms ease-out, border-color 220ms ease-out, background-color 220ms ease-out, box-shadow 220ms ease-out',
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
                {/* Top shimmer line */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: '10%',
                    right: '10%',
                    height: '1px',
                    background: 'linear-gradient(90deg, transparent, rgba(255,200,1,0.6), transparent)',
                    opacity: isActive ? 1 : 0.3,
                    transition: 'opacity 220ms ease-out',
                    borderRadius: '9999px',
                  }}
                />
                <div className="flex items-start gap-4 mb-3">
                  {/* Upgraded Icon Container */}
                  <div
                    className="flex items-center justify-center flex-shrink-0"
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 12,
                      background: 'linear-gradient(135deg, rgba(255,200,1,0.15), rgba(255,154,50,0.08))',
                      border: isActive ? '1px solid rgba(255,200,1,0.6)' : '1px solid rgba(255,200,1,0.25)',
                      boxShadow: isActive ? '0 0 12px rgba(255,200,1,0.2)' : 'none',
                      transform: isActive ? 'scale(1.08) rotateZ(4deg) translateZ(24px)' : 'scale(1) rotateZ(0deg) translateZ(24px)',
                      transition: 'transform 200ms ease-out, border-color 200ms ease-out, box-shadow 200ms ease-out',
                    }}
                  >
                    <Icon color={isActive ? feature.color : 'var(--dark)'} size={24} />
                  </div>
                  <div>
                    <h3
                      className="text-xl font-bold"
                      style={
                        isActive
                          ? {
                              fontFamily: 'var(--font-mono)',
                              background: 'linear-gradient(135deg, var(--dark) 0%, var(--primary) 100%)',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                              backgroundClip: 'text',
                              fontSize: '1.2rem',
                              fontWeight: 700,
                            }
                          : { color: 'var(--text)', fontFamily: 'var(--font-mono)', fontSize: '1.2rem', fontWeight: 700 }
                      }
                    >
                      {feature.title}
                    </h3>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        padding: '2px 8px',
                        borderRadius: '9999px',
                        fontSize: '0.65rem',
                        fontWeight: 500,
                        fontFamily: 'var(--font-sans)',
                        background: 'rgba(255,200,1,0.1)',
                        border: '1px solid rgba(255,200,1,0.25)',
                        color: 'var(--dark)',
                        marginTop: '4px',
                      }}
                    >
                      {feature.tag}
                    </span>
                  </div>
                </div>

                <p className="text-sm leading-relaxed" style={{ color: 'rgba(17,76,90,0.7)' }}>
                  {feature.description}
                </p>

                {/* Smart Configuration (idx === 3): Mini Toggle Mockup */}
                {idx === 3 && (
                  <div className="flex items-center gap-2 mt-4 px-3 py-1.5 rounded-full bg-[rgba(17,76,90,0.06)] border border-[rgba(17,76,90,0.12)] w-fit relative overflow-hidden">
                    <div className="flex items-center gap-5 text-xs font-mono relative z-10 px-1">
                      <span style={{ animation: 'mini-toggle-text1 4s ease-in-out infinite' }}>No-code ●</span>
                      <span style={{ animation: 'mini-toggle-text2 4s ease-in-out infinite' }}>Pro-mode ●</span>
                    </div>
                    <div
                      style={{
                        position: 'absolute',
                        top: 2,
                        bottom: 2,
                        left: 2,
                        width: 72,
                        borderRadius: 999,
                        background: 'rgba(255,200,1,0.25)',
                        border: '1px solid var(--primary)',
                        animation: 'mini-toggle-slide 4s ease-in-out infinite',
                        zIndex: 0,
                      }}
                    />
                  </div>
                )}

                {/* Large Data Insights card (idx===2) */}
                {isSpanned && (
                  <div className="grid grid-cols-3 gap-6 mt-6 items-center" style={{ transform: 'translateZ(20px)', transformStyle: 'preserve-3d' }}>
                    <div className="col-span-1 flex flex-col gap-3">
                      <div className="glass-card" style={{ border: '1px solid rgba(255,200,1,0.25)', borderRadius: '12px', padding: '10px 14px', background: 'rgba(255,255,255,0.75)', transform: 'translateZ(25px)' }}>
                        <p style={{ fontSize: '0.55rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0, fontWeight: 700 }}>Accuracy Rate</p>
                        <p style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--dark)', fontFamily: 'var(--font-mono)', margin: '2px 0 0 0' }}>
                          99.98% <span style={{ fontSize: '0.65rem', color: '#22c55e' }}>↑</span>
                        </p>
                      </div>

                      <div className="glass-card" style={{ border: '1px solid rgba(17,76,90,0.12)', borderRadius: '12px', padding: '10px 14px', background: 'rgba(255,255,255,0.75)', transform: 'translateZ(25px)' }}>
                        <p style={{ fontSize: '0.55rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0, fontWeight: 700 }}>Latency Speed</p>
                        <p style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--dark)', fontFamily: 'var(--font-mono)', margin: '2px 0 0 0' }}>
                          14.2ms <span style={{ fontSize: '0.65rem', color: 'var(--primary)' }}>⚡</span>
                        </p>
                      </div>
                    </div>

                    <div className="col-span-2 relative w-full h-[130px] rounded-xl p-4 overflow-hidden border border-dashed border-[rgba(17,76,90,0.15)] bg-[rgba(255,255,255,0.3)]" style={{ transformStyle: 'preserve-3d', transform: 'translateZ(25px)' }}>
                      <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.1, pointerEvents: 'none' }}>
                        <line x1="0" y1="30" x2="100%" y2="30" stroke="var(--dark)" strokeWidth="0.5" strokeDasharray="3,3" />
                        <line x1="0" y1="65" x2="100%" y2="65" stroke="var(--dark)" strokeWidth="0.5" strokeDasharray="3,3" />
                        <line x1="0" y1="100" x2="100%" y2="100%" stroke="var(--dark)" strokeWidth="0.5" strokeDasharray="3,3" />
                      </svg>

                      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 130" preserveAspectRatio="none" style={{ pointerEvents: 'none', transform: 'translateZ(30px)' }}>
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
                          <circle cx="160" cy="20" r="4" fill="var(--warm)" style={{ filter: 'drop-shadow(0 0 6px var(--warm))' }}>
                            <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" />
                          </circle>
                        )}
                      </svg>

                      <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-1 rounded bg-[rgba(255,255,255,0.9)] border border-[rgba(255,200,1,0.25)] text-[0.55rem] font-bold text-[var(--dark)]" style={{ transform: 'translateZ(35px)' }}>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" />
                        ANALYTICS: LIVE
                      </div>
                    </div>
                  </div>
                )}
                {/* Platform Connections card (idx===5): connection dots */}
                {idx === 5 && (
                  <div style={{ position: 'absolute', bottom: '1.2rem', right: '1.5rem', opacity: isActive ? 0.7 : 0.2, transition: 'opacity 300ms ease-out' }}>
                    <svg width="72" height="48" viewBox="0 0 72 48">
                      <line x1="12" y1="24" x2="36" y2="12" stroke="var(--primary)" strokeWidth="1.5" strokeDasharray="3,3" />
                      <line x1="12" y1="24" x2="36" y2="36" stroke="var(--primary)" strokeWidth="1.5" strokeDasharray="3,3" />
                      <line x1="36" y1="12" x2="60" y2="20" stroke="var(--warm)" strokeWidth="1.5" strokeDasharray="3,3" />
                      <line x1="36" y1="36" x2="60" y2="28" stroke="var(--warm)" strokeWidth="1.5" strokeDasharray="3,3" />
                      <circle cx="12" cy="24" r="5" fill="var(--primary)" opacity="0.8" />
                      <circle cx="36" cy="12" r="4" fill="var(--dark)" opacity="0.6" />
                      <circle cx="36" cy="36" r="4" fill="var(--dark)" opacity="0.6" />
                      <circle cx="60" cy="20" r="5" fill="var(--warm)" opacity="0.8" />
                      <circle cx="60" cy="28" r="3" fill="var(--warm)" opacity="0.5" />
                    </svg>
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
                  background: isActive ? 'linear-gradient(135deg, rgba(255,200,1,0.04) 0%, rgba(255,154,50,0.02) 100%)' : 'white',
                  border: isActive ? '1px solid var(--primary)' : '1px solid rgba(17,76,90,0.08)',
                  borderLeft: isActive ? '3px solid var(--primary)' : '3px solid transparent',
                  borderRadius: '20px',
                  transition: 'border-color 200ms ease-out, box-shadow 200ms ease-out',
                  boxShadow: isActive ? '0 0 0 1px var(--primary), 0 20px 40px rgba(255,200,1,0.12)' : '0 1px 3px rgba(0,0,0,0.04)',
                }}
              >
                <button onClick={() => setActiveIndex(isActive ? null : idx)} className="w-full px-6 py-4 flex items-center gap-4 justify-between" style={{ backgroundColor: 'transparent' }}>
                  <div className="flex items-center gap-4 flex-1">
                    <div
                      className="flex items-center justify-center flex-shrink-0"
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 12,
                        background: 'linear-gradient(135deg, rgba(255,200,1,0.15), rgba(255,154,50,0.08))',
                        border: isActive ? '1px solid rgba(255,200,1,0.6)' : '1px solid rgba(255,200,1,0.25)',
                        boxShadow: isActive ? '0 0 12px rgba(255,200,1,0.2)' : 'none',
                      }}
                    >
                      <Icon color={isActive ? feature.color : 'var(--dark)'} size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-left" style={{ color: isActive ? feature.color : 'var(--text)', fontFamily: 'var(--font-mono)' }}>
                      {feature.title}
                    </h3>
                  </div>
                  {isActive ? <ChevronUpSolid color={feature.color} size={20} /> : <ChevronDown color="var(--muted)" size={20} />}
                </button>
                <div style={{ maxHeight: isActive ? `${contentRefs.current[idx]?.scrollHeight ?? 200}px` : '0px', overflow: 'hidden', transition: 'max-height 350ms ease-in-out' }}>
                  <div ref={(el) => { contentRefs.current[idx] = el; }} className="px-6 pb-4 text-sm leading-relaxed" style={{ color: 'rgba(17,76,90,0.7)' }}>
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
