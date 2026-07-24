'use client';

import { useEffect, useRef, useState } from 'react';

const STATS = [
  { tag: '[STAT_01]', label: 'Active Teams', value: 10000, suffix: '+', isInteger: true, trend: '↑ 12.3% this month' },
  { tag: '[STAT_02]', label: 'Uptime SLA', value: 99.98, suffix: '%', isInteger: false, trend: '↑ 99.99% last 90 days' },
  { tag: '[STAT_03]', label: 'Tasks Automated', value: 4.2, suffix: 'M+', isInteger: false, trend: '↑ 2.4x YoY' },
];

function Counter({ target, suffix, isInteger }: { target: number; suffix: string; isInteger: boolean }) {
  const [count, setCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const hasRun = useRef(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasRun.current) {
          hasRun.current = true;
          const duration = 1500;
          const steps = 60;
          const stepValue = target / steps;
          let current = 0;
          const interval = setInterval(() => {
            current += stepValue;
            if (current >= target) {
              setCount(target);
              setIsFinished(true);
              clearInterval(interval);
            } else {
              setCount(current);
            }
          }, duration / steps);
          return () => clearInterval(interval);
        }
      });
    });
    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, [target]);

  const displayValue = isInteger
    ? Math.floor(count).toLocaleString()
    : count.toFixed(2);

  return (
    <span ref={elementRef} className={isFinished ? 'count-done-anim inline-block' : 'inline-block'}>
      <span className="gradient-text-cyan">{displayValue}</span>
      <span style={{ color: 'var(--secondary)' }}>{suffix}</span>
    </span>
  );
}

export default function StatsBar() {
  const sectionRef = useRef<HTMLDivElement>(null);

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
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="platform"
      aria-label="Statistics"
      className="py-16 px-6 relative overflow-hidden"
      style={{
        backgroundColor: 'var(--surface)',
        borderTop: '1px solid rgba(0,212,255,0.08)',
        borderBottom: '1px solid rgba(0,212,255,0.08)',
      }}
    >
      {/* Scanline decoration */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0,212,255,0.01) 2px,
            rgba(0,212,255,0.01) 4px
          )`,
        }}
      />

      <div ref={sectionRef} className="max-w-7xl mx-auto reveal reveal-up relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {STATS.map((stat, idx) => (
            <div key={idx} className="flex-1 w-full flex items-center gap-6">
              <div
                className="flex-1 flex flex-col justify-between p-8 relative rounded-xl transition-all duration-200"
                style={{
                  background: 'rgba(0,212,255,0.03)',
                  border: '1px solid rgba(0,212,255,0.08)',
                  borderRadius: '12px',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(0,212,255,0.25)';
                  e.currentTarget.style.background = 'rgba(0,212,255,0.06)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(0,212,255,0.08)';
                  e.currentTarget.style.background = 'rgba(0,212,255,0.03)';
                }}
              >
                {/* Top Label Tag Pill */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--primary)',
                      fontSize: '0.625rem',
                      letterSpacing: '0.15em',
                      fontWeight: 700,
                    }}
                  >
                    {stat.tag}
                  </span>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontFamily: 'var(--font-inter)',
                      fontWeight: 500,
                      color: '#00ff64',
                      background: 'rgba(0,255,100,0.1)',
                      padding: '2px 8px',
                      borderRadius: '999px',
                    }}
                  >
                    {stat.trend}
                  </span>
                </div>

                {/* Number */}
                <div
                  className="font-black mb-2"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    lineHeight: 1,
                    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                    letterSpacing: '-0.04em',
                  }}
                >
                  <Counter target={stat.value} suffix={stat.suffix} isInteger={stat.isInteger} />
                </div>

                {/* Label below */}
                <p
                  style={{
                    color: 'var(--muted)',
                    fontFamily: 'var(--font-inter)',
                    fontWeight: 400,
                    fontSize: '0.875rem',
                    letterSpacing: '0.05em',
                  }}
                >
                  {stat.label}
                </p>
              </div>

              {/* Vertical Divider */}
              {idx < STATS.length - 1 && (
                <div
                  className="hidden md:block"
                  style={{
                    width: 1,
                    height: '60%',
                    alignSelf: 'center',
                    background: 'linear-gradient(to bottom, transparent, var(--primary), transparent)',
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
