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
          className="fixed bottom-8 right-8 z-40 p-3 rounded.xl transition-all duration-200 ease-out focus-ring flex items-center justify-center cursor-pointer"
          style={{
            backgroundColor: 'var(--primary)',
            color: 'var(--surface)',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(255,200,1,0.4)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)';
            e.currentTarget.style.boxShadow = '0 8px 30px rgba(255,200,1,0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(255,200,1,0.4)';
          }}
          aria-label="Scroll to top"
        >
          <ChevronUp size={24} color="var(--surface)" />
        </button>
      )}
    </>
  );
}
