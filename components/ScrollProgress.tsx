'use client';

import { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      if (total <= 0) {
        setProgress(0);
        return;
      }
      const pct = (window.scrollY / total) * 100;
      setProgress(pct);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '2px', zIndex: 100, pointerEvents: 'none' }}>
      <div
        style={{
          height: '100%',
          width: `${progress}%`,
          background: 'linear-gradient(90deg, #00D4FF, #FFC801, #FF6B35)',
          boxShadow: '0 0 8px var(--primary)',
          transition: 'width 50ms linear',
        }}
      />
    </div>
  );
}
