'use client';

import { useEffect, useRef, useState } from 'react';

const STATS = [
  { label: 'Active Teams', value: 10000, suffix: '+', isInteger: true },
  { label: 'Uptime SLA', value: 99.98, suffix: '%', isInteger: false },
  { label: 'Tasks Automated', value: 4.2, suffix: 'M+', isInteger: false },
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
      {displayValue}
      {suffix}
      <span style={{ color: 'var(--warm)', fontSize: '0.75rem', marginLeft: 4, verticalAlign: 'super' }}>↑</span>
    </span>
  );
}

export default function StatsBar() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

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
      className="py-16 px-6 relative"
      style={{
        backgroundColor: 'var(--accent)',
        backgroundImage: `
          radial-gradient(ellipse at var(--x, 50%) var(--y, 50%), rgba(255,200,1,0.08) 0%, transparent 60%),
          radial-gradient(ellipse at 20% 30%, rgba(17,76,90,0.08) 0%, transparent 60%),
          radial-gradient(ellipse at 80% 70%, rgba(255,153,50,0.06) 0%, transparent 60%)
        `,
        backgroundSize: '200% 200%',
        animation: 'mesh-shift 8s ease-in-out infinite',
      }}
    >
      <div style={{ height: 3, width: '100%', background: 'linear-gradient(90deg, var(--dark), var(--primary), var(--warm), var(--primary), var(--dark))', backgroundSize: '200% auto', animation: 'shimmer 4s linear infinite', marginBottom: '2rem' }} />

      <div ref={sectionRef} className="max-w-7xl mx-auto reveal reveal-up">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {STATS.map((stat, idx) => (
            <div key={idx} className="flex-1 w-full flex items-center gap-6">
              <div
                className="flex-1 flex flex-col items-center justify-center text-center p-8 relative glass-card card-depth"
                style={{
                  borderRadius: '20px',
                  border: '1px solid rgba(255, 200, 1, 0.15)',
                  transformStyle: 'preserve-3d',
                  willChange: 'transform',
                  transition: 'transform 300ms ease, box-shadow 300ms ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={(e) => {
                  setHoveredIdx(null);
                  const card = e.currentTarget;
                  card.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)';
                }}
                onMouseMove={(e) => {
                  const card = e.currentTarget;
                  const rect = card.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -4;
                  const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 4;
                  card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
                }}
              >
                {/* Top accent line above stat number */}
                <div
                  style={{
                    width: 32,
                    height: 3,
                    borderRadius: 2,
                    background: 'var(--primary)',
                    marginBottom: 12,
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  }}
                />

                <div
                  className="text-5xl md:text-6xl font-black mb-2 transition-all duration-200"
                  style={{
                    color: 'var(--dark)',
                    fontFamily: 'var(--font-mono)',
                    lineHeight: 1,
                    fontSize: 'clamp(2.5rem, 4.5vw, 3.5rem)',
                    letterSpacing: '-0.04em',
                    transform: 'translateZ(20px)',
                    textShadow: hoveredIdx === idx ? '0 0 20px rgba(255,200,1,0.5)' : '0 4px 24px rgba(17,76,90,0.12)',
                  }}
                >
                  <Counter target={stat.value} suffix={stat.suffix} isInteger={stat.isInteger} />
                </div>

                <p
                  style={{
                    color: 'var(--dark)',
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 600,
                    fontSize: '0.7rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    opacity: 0.7,
                    transform: 'translateZ(10px)',
                  }}
                >
                  {stat.label}
                </p>
              </div>

              {/* Vertical divider between stats on desktop */}
              {idx < STATS.length - 1 && (
                <div
                  className="hidden md:block"
                  style={{
                    width: 1,
                    height: 48,
                    alignSelf: 'center',
                    background: 'linear-gradient(to bottom, transparent, rgba(17,76,90,0.2), transparent)',
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
