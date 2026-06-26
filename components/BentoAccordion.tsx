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

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
      if (e.matches && hoveredIndexRef.current !== null) {
        setActiveIndex(hoveredIndexRef.current);
      }
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
    <section
      id="features"
      aria-label="Features"
      className="py-16 px-6"
      style={{
        backgroundColor: 'var(--bg)',
        backgroundImage: `
          radial-gradient(ellipse 60% 40% at 20% 50%, rgba(255,200,1,0.06) 0%, transparent 60%),
          radial-gradient(ellipse 50% 40% at 80% 30%, rgba(17,76,90,0.05) 0%, transparent 60%)
        `,
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          {/* FIX 2 — Pill badge eyebrow */}
          <div className="flex justify-center mb-4">
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 16px',
                borderRadius: '9999px',
                fontSize: '0.7rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontFamily: 'Inter, sans-serif',
                color: 'var(--dark)',
                background: 'linear-gradient(135deg, rgba(255,200,1,0.18), rgba(255,154,50,0.1))',
                border: '1px solid rgba(255,200,1,0.35)',
                boxShadow: '0 2px 12px rgba(255,200,1,0.15)',
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'var(--primary)', display: 'inline-block', boxShadow: '0 0 6px var(--primary)' }} />
              Platform Capabilities
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--text)', fontFamily: 'JetBrains Mono' }}>
            Powerful <span className="gradient-text">Features</span>
          </h2>
          <p className="text-lg" style={{ color: 'var(--muted)' }}>Everything you need to automate and scale your business</p>
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
                className={`cursor-pointer ${isSpanned ? 'col-span-2 row-span-2' : ''} ${isActive ? 'bento-card-active' : ''}`}
                style={{
                  background: isActive
                    ? 'linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(255,200,1,0.04) 100%)'
                    : 'rgba(255,255,255,0.8)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  border: isActive
                    ? '1px solid rgba(255,200,1,0.5)'
                    : '1px solid rgba(255,255,255,0.9)',
                  borderRadius: '24px',
                  padding: '2rem',
                  transition: 'all 220ms ease-out',
                  boxShadow: isActive
                    ? '0 0 0 1px rgba(255,200,1,0.3), 0 24px 48px rgba(255,200,1,0.14), 0 8px 16px rgba(0,0,0,0.06)'
                    : '0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)',
                  transform: isActive ? 'translateY(-6px) scale(1.01)' : 'translateY(0) scale(1)',
                  position: 'relative',
                  overflow: 'hidden',
                  minHeight: isSpanned ? '260px' : 'auto',
                }}
                onMouseEnter={() => { hoveredIndexRef.current = idx; setActiveIndex(idx); }}
                onMouseLeave={() => { hoveredIndexRef.current = null; setActiveIndex(null); }}
              >
                {/* Top shimmer line — 3D depth effect */}
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
                  {/* FIX 3 — 3D glowing icon container */}
                  <div
                    className="flex items-center justify-center flex-shrink-0"
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '16px',
                      background: `linear-gradient(145deg, rgba(255,200,1,0.22) 0%, rgba(255,154,50,0.12) 100%)`,
                      border: '1px solid rgba(255,200,1,0.3)',
                      boxShadow: `
                        0 4px 16px rgba(255,200,1,0.2),
                        inset 0 1px 0 rgba(255,255,255,0.6),
                        inset 0 -1px 0 rgba(0,0,0,0.05)
                      `,
                      transform: isActive ? 'scale(1.08) rotateZ(4deg)' : 'scale(1) rotateZ(0deg)',
                      transition: 'transform 200ms ease-out, box-shadow 200ms ease-out',
                    }}
                  >
                    <Icon color={isActive ? feature.color : 'var(--dark)'} size={26} />
                  </div>
                  <div>
                    {/* FIX 6 — Gradient title on active */}
                    <h3
                      className="text-xl font-bold"
                      style={isActive ? {
                        fontFamily: 'JetBrains Mono',
                        background: `linear-gradient(135deg, var(--dark) 0%, var(--primary) 100%)`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        fontSize: '1.2rem',
                        fontWeight: 700,
                      } : {
                        color: 'var(--text)',
                        fontFamily: 'JetBrains Mono',
                        fontSize: '1.2rem',
                        fontWeight: 700,
                      }}
                    >
                      {feature.title}
                    </h3>
                    <span style={{ display: 'inline-flex', alignItems: 'center', padding: '2px 8px', borderRadius: '9999px', fontSize: '0.65rem', fontWeight: 500, fontFamily: 'Inter, sans-serif', background: 'rgba(255,200,1,0.1)', border: '1px solid rgba(255,200,1,0.25)', color: 'var(--dark)', marginTop: '4px' }}>
                      {feature.tag}
                    </span>
                  </div>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(17,76,90,0.6)' }}>
                  {feature.description}
                </p>
                {/* FIX 5 — Large Data Insights card (idx===2): 3D bar chart + upgraded sparkline */}
                {isSpanned && (
                  <>
                    {/* 3D Bar Chart Visual */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '1.5rem',
                        right: '1.5rem',
                        display: 'flex',
                        alignItems: 'flex-end',
                        gap: '6px',
                        opacity: isActive ? 0.85 : 0.35,
                        transition: 'opacity 300ms ease-out',
                      }}
                    >
                      {[45, 70, 55, 90, 65, 80, 50].map((h, i) => (
                        <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                          {/* Bar top face (3D effect) */}
                          <div
                            style={{
                              width: '18px',
                              height: '4px',
                              background: `linear-gradient(90deg, rgba(255,200,1,0.9), rgba(255,154,50,0.7))`,
                              borderRadius: '2px 2px 0 0',
                              transform: 'skewX(-20deg)',
                              marginBottom: '-2px',
                              zIndex: 1,
                            }}
                          />
                          {/* Bar body */}
                          <div
                            style={{
                              width: '18px',
                              height: `${h * 0.7}px`,
                              background: i % 2 === 0
                                ? 'linear-gradient(180deg, rgba(255,200,1,0.7) 0%, rgba(255,200,1,0.3) 100%)'
                                : 'linear-gradient(180deg, rgba(17,76,90,0.5) 0%, rgba(17,76,90,0.2) 100%)',
                              borderRadius: '3px 3px 0 0',
                              transition: `height 600ms ease-out ${i * 80}ms`,
                            }}
                          />
                        </div>
                      ))}
                    </div>
                    {/* Upgraded sparkline SVG */}
                    <svg
                      style={{ position: 'absolute', bottom: '1.5rem', left: '2rem', opacity: isActive ? 0.15 : 0.07, transition: 'opacity 300ms ease-out', pointerEvents: 'none' }}
                      width="120" height="40" viewBox="0 0 120 40"
                    >
                      <polyline points="0,36 20,28 40,32 60,14 80,20 100,8 120,4" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <polyline points="0,36 20,28 40,32 60,14 80,20 100,8 120,4" fill="url(#chartFill)" strokeWidth="0" />
                      <defs>
                        <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.3} />
                          <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                    </svg>
                  </>
                )}
                {/* FIX 7 — Platform Connections card (idx===5): connection dots */}
                {idx === 5 && (
                  <div style={{ position: 'absolute', bottom: '1.2rem', right: '1.5rem', opacity: isActive ? 0.7 : 0.2, transition: 'opacity 300ms ease-out' }}>
                    <svg width="72" height="48" viewBox="0 0 72 48">
                      {/* Connection lines */}
                      <line x1="12" y1="24" x2="36" y2="12" stroke="var(--primary)" strokeWidth="1.5" strokeDasharray="3,3" />
                      <line x1="12" y1="24" x2="36" y2="36" stroke="var(--primary)" strokeWidth="1.5" strokeDasharray="3,3" />
                      <line x1="36" y1="12" x2="60" y2="20" stroke="var(--warm)" strokeWidth="1.5" strokeDasharray="3,3" />
                      <line x1="36" y1="36" x2="60" y2="28" stroke="var(--warm)" strokeWidth="1.5" strokeDasharray="3,3" />
                      {/* Nodes */}
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
                <button
                  onClick={() => setActiveIndex(isActive ? null : idx)}
                  className="w-full px-6 py-4 flex items-center gap-4 justify-between"
                  style={{ backgroundColor: 'transparent' }}
                >
                  <div className="flex items-center gap-4 flex-1">
                    {/* FIX 3 — 3D glowing icon container (mobile) */}
                    <div
                      className="flex items-center justify-center flex-shrink-0"
                      style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '16px',
                        background: `linear-gradient(145deg, rgba(255,200,1,0.22) 0%, rgba(255,154,50,0.12) 100%)`,
                        border: '1px solid rgba(255,200,1,0.3)',
                        boxShadow: `
                          0 4px 16px rgba(255,200,1,0.2),
                          inset 0 1px 0 rgba(255,255,255,0.6),
                          inset 0 -1px 0 rgba(0,0,0,0.05)
                        `,
                        transform: isActive ? 'scale(1.08) rotateZ(4deg)' : 'scale(1) rotateZ(0deg)',
                        transition: 'transform 200ms ease-out, box-shadow 200ms ease-out',
                      }}
                    >
                      <Icon color={isActive ? feature.color : 'var(--dark)'} size={26} />
                    </div>
                    <h3 className="text-lg font-bold text-left" style={{ color: isActive ? feature.color : 'var(--text)', fontFamily: 'JetBrains Mono' }}>
                      {feature.title}
                    </h3>
                  </div>
                  {isActive ? <ChevronUpSolid color={feature.color} size={20} /> : <ChevronDown color="var(--muted)" size={20} />}
                </button>
                <div
                  style={{
                    maxHeight: isActive ? `${contentRefs.current[idx]?.scrollHeight ?? 200}px` : '0px',
                    overflow: 'hidden',
                    transition: 'max-height 350ms ease-in-out',
                  }}
                >
                  <div ref={(el) => { contentRefs.current[idx] = el; }} className="px-6 pb-4 text-sm leading-relaxed" style={{ color: 'rgba(17,76,90,0.6)' }}>
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
