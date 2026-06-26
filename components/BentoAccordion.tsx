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
    <section id="features" aria-label="Features" className="py-16 px-6" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="mb-3 uppercase" style={{ letterSpacing: '0.15em', color: 'var(--warm)', fontSize: '0.75rem', fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
            Platform Capabilities
          </p>
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
                className={`cursor-pointer ${isSpanned ? 'col-span-2 row-span-2' : ''}`}
                style={{
                  background: isActive ? 'linear-gradient(135deg, rgba(255,200,1,0.06) 0%, rgba(255,154,50,0.03) 100%)' : 'white',
                  border: isActive ? '1px solid var(--primary)' : '1px solid rgba(17,76,90,0.08)',
                  borderRadius: '20px',
                  padding: '2rem',
                  transition: 'all 200ms ease-out',
                  boxShadow: isActive ? '0 0 0 1px var(--primary), 0 20px 40px rgba(255,200,1,0.12)' : '0 1px 3px rgba(0,0,0,0.04)',
                  transform: isActive ? 'translateY(-4px)' : 'none',
                  minHeight: isSpanned ? '240px' : 'auto',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseEnter={() => { hoveredIndexRef.current = idx; setActiveIndex(idx); }}
                onMouseLeave={() => { hoveredIndexRef.current = null; setActiveIndex(null); }}
              >
                <div className="flex items-start gap-4 mb-3">
                  <div className="flex items-center justify-center flex-shrink-0" style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'linear-gradient(135deg, rgba(255,200,1,0.15), rgba(255,154,50,0.08))', border: '1px solid rgba(255,200,1,0.2)' }}>
                    <Icon color={isActive ? feature.color : 'var(--muted)'} size={28} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold" style={{ color: isActive ? feature.color : 'var(--text)', fontFamily: 'JetBrains Mono' }}>
                      {feature.title}
                    </h3>
                    <span style={{ display: 'inline-flex', alignItems: 'center', padding: '2px 8px', borderRadius: '9999px', fontSize: '0.65rem', fontWeight: 500, fontFamily: 'Inter, sans-serif', background: 'rgba(255,200,1,0.1)', border: '1px solid rgba(255,200,1,0.25)', color: 'var(--dark)', marginTop: '4px' }}>
                      {feature.tag}
                    </span>
                  </div>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                  {feature.description}
                </p>
                {isSpanned && (
                  <svg style={{ position: 'absolute', bottom: '1.5rem', right: '1.5rem', opacity: 0.2 }} width="80" height="32" viewBox="0 0 80 32">
                    <polyline points="0,28 16,20 32,22 48,10 64,14 80,2" fill="none" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
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
                    <div className="flex items-center justify-center flex-shrink-0" style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'linear-gradient(135deg, rgba(255,200,1,0.15), rgba(255,154,50,0.08))', border: '1px solid rgba(255,200,1,0.2)' }}>
                      <Icon color={isActive ? feature.color : 'var(--muted)'} size={24} />
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
                  <div ref={(el) => { contentRefs.current[idx] = el; }} className="px-6 pb-4 text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
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
