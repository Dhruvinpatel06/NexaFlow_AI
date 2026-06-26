'use client';

import { useState, useEffect } from 'react';
import { ChevronUp } from './icons/ChevronUp';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-40 p-3 rounded-lg transition-all hover:shadow-lg hover:scale-110"
          style={{
            backgroundColor: 'var(--primary)',
            color: 'var(--surface)',
            boxShadow: '0 4px 12px rgba(255, 200, 1, 0.3)',
          }}
          aria-label="Scroll to top"
        >
          <ChevronUp size={24} color="var(--surface)" />
        </button>
      )}
    </>
  );
}
