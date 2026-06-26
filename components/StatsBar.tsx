'use client';

import { useEffect, useRef, useState } from 'react';

const STATS = [
  { label: 'Active Teams', value: 10000, suffix: '+' },
  { label: 'Uptime SLA', value: 99.98, suffix: '%' },
  { label: 'Tasks Automated', value: 4.2, suffix: 'M+' },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
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
              clearInterval(interval);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);

          return () => clearInterval(interval);
        }
      });
    });

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    return () => observer.disconnect();
  }, [target]);

  const displayValue = typeof count === 'number' ? (count % 1 === 0 ? count : count.toFixed(2)) : 0;
  return (
    <span ref={elementRef}>
      {displayValue}
      <span style={{ color: 'var(--warm)', fontSize: '0.6em', marginLeft: '4px' }}>↑</span>
      {suffix}
    </span>
  );
}

export default function StatsBar() {
  return (
    <section
      aria-label="Statistics"
      className="py-16 px-6"
      style={{
        backgroundColor: 'var(--accent)',
        backgroundImage: `repeating-linear-gradient(
          45deg,
          transparent,
          transparent 10px,
          rgba(17, 76, 90, 0.03) 10px,
          rgba(17, 76, 90, 0.03) 11px
        )`,
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0">
          {STATS.map((stat, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center text-center py-4 relative"
              style={{
                borderRight: idx < STATS.length - 1 ? '1px solid rgba(17, 76, 90, 0.15)' : 'none',
                borderLeft: '3px solid var(--primary)',
                paddingLeft: '1.5rem',
              }}
            >
              {/* Top accent bar */}
              <div
                className="mb-3"
                style={{
                  width: '40px',
                  height: '3px',
                  backgroundColor: 'var(--primary)',
                }}
              />
              <div
                className="text-5xl md:text-6xl font-black mb-2"
                style={{
                  color: 'var(--dark)',
                  fontFamily: 'JetBrains Mono',
                  lineHeight: 1,
                  textShadow: '0 2px 20px rgba(255, 200, 1, 0.3)',
                }}
              >
                <Counter target={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-sm md:text-base font-medium" style={{ color: 'var(--muted)' }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
