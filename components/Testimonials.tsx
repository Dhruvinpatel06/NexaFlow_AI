'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronLeft } from './icons/ChevronLeft';
import { ChevronRight } from './icons/ChevronRight';

const TESTIMONIALS = [
  {
    name: 'Sarah Johnson',
    role: 'Product Manager',
    company: 'TechCorp',
    text: 'NexaFlow transformed how we manage workflows. We saved 20 hours per week on automation alone.',
    rating: 5,
    initials: 'SJ',
  },
  {
    name: 'Marcus Chen',
    role: 'CTO',
    company: 'DataFlow Inc',
    text: "We automated 80% of our data pipeline in under a week. NexaFlow's AI agents feel like having 3 extra senior engineers.",
    rating: 5,
    initials: 'MC',
  },
  {
    name: 'Priya Sharma',
    role: 'Head of Operations',
    company: 'ScaleUp',
    text: 'The currency switcher and pricing transparency alone convinced our finance team. Onboarding took 20 minutes. Unbelievable.',
    rating: 5,
    initials: 'PS',
  },
];

export default function Testimonials() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const isHoveredRef = useRef(false);
  const touchStartRef = useRef<number>(0);
  const autoAdvanceRef = useRef<NodeJS.Timeout>();
  const sectionRef = useRef<HTMLDivElement>(null);

  const handleMouseMoveTestimonial = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) * 4;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.01)`;
    card.style.transition = 'none';
  };

  const handleMouseLeaveTestimonial = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';
    card.style.transition = 'transform 400ms ease-out';
  };

  const startAutoAdvance = () => {
    if (autoAdvanceRef.current) clearTimeout(autoAdvanceRef.current);
    if (!isHoveredRef.current) {
      autoAdvanceRef.current = setTimeout(() => {
        setCurrentIdx((prev) => (prev + 1) % TESTIMONIALS.length);
      }, 4000);
    }
  };

  useEffect(() => {
    startAutoAdvance();
    return () => {
      if (autoAdvanceRef.current) clearTimeout(autoAdvanceRef.current);
    };
  }, [isHovered, currentIdx]);

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
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const goToSlide = (idx: number) => {
    setCurrentIdx(idx);
    startAutoAdvance();
  };

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
    startAutoAdvance();
  };

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % TESTIMONIALS.length);
    startAutoAdvance();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartRef.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? handleNext() : handlePrev();
    }
  };

  return (
    <section
      id="about"
      aria-label="Testimonials"
      className="py-24 px-6 relative overflow-hidden"
      style={{
        backgroundColor: 'var(--surface)',
        backgroundImage: `
          linear-gradient(rgba(0,212,255,0.015) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,212,255,0.015) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
      }}
    >
      <div ref={sectionRef} className="hero-content max-w-5xl mx-auto reveal reveal-up relative z-10">
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <span
              style={{
                display: 'inline-block',
                fontSize: '0.6875rem',
                fontWeight: 600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--primary)',
              }}
            >
              SOCIAL PROOF
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white" style={{ fontFamily: 'var(--font-mono)' }}>
            <span className="gradient-text-cyan">Trusted</span> by Teams Worldwide
          </h2>
          <p className="text-lg" style={{ color: 'var(--muted)' }}>
            See what our customers have to say about NexaFlow
          </p>
        </div>

        {/* Section Social Proof Stat Bar ABOVE Carousel */}
        <div className="flex items-center justify-center gap-8 md:gap-12 mb-12 flex-wrap">
          <div className="text-center">
            <p style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '1.5rem', color: 'var(--secondary)' }}>10K+ Teams</p>
            <p style={{ fontFamily: 'var(--font-inter)', fontWeight: 400, color: 'var(--muted)', fontSize: '0.8125rem' }}>Active users</p>
          </div>
          <span style={{ color: 'var(--muted)' }}>|</span>
          <div className="text-center">
            <p style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '1.5rem', color: 'var(--secondary)' }}>4.9★ Rating</p>
            <p style={{ fontFamily: 'var(--font-inter)', fontWeight: 400, color: 'var(--muted)', fontSize: '0.8125rem' }}>Customer rating</p>
          </div>
          <span style={{ color: 'var(--muted)' }}>|</span>
          <div className="text-center">
            <p style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '1.5rem', color: 'var(--secondary)' }}>99.9% Satisfaction</p>
            <p style={{ fontFamily: 'var(--font-inter)', fontWeight: 400, color: 'var(--muted)', fontSize: '0.8125rem' }}>Retention rate</p>
          </div>
        </div>

        {/* Carousel Card */}
        <div
          className="relative overflow-hidden"
          style={{
            background: 'rgba(13,33,55,0.8)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(0,212,255,0.1)',
            borderRadius: '24px',
            padding: '2.5rem',
            boxShadow: '0 32px 64px rgba(0,0,0,0.5)',
            transformStyle: 'preserve-3d',
            willChange: 'transform',
            cursor: 'pointer',
          }}
          onMouseEnter={() => {
            isHoveredRef.current = true;
            setIsHovered(true);
          }}
          onMouseLeave={(e) => {
            isHoveredRef.current = false;
            setIsHovered(false);
            handleMouseLeaveTestimonial(e);
          }}
          onMouseMove={handleMouseMoveTestimonial}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Large decorative quote mark */}
          <span
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: 8,
              left: 24,
              fontSize: '8rem',
              lineHeight: 1,
              color: 'rgba(0,212,255,0.05)',
              fontFamily: 'var(--font-mono), monospace',
              fontWeight: 800,
              pointerEvents: 'none',
              userSelect: 'none',
              zIndex: 0,
            }}
          >
            &ldquo;
          </span>

          <div key={currentIdx} className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8 testimonial-slide-active relative z-10" style={{ transformStyle: 'preserve-3d' }}>
            {/* Avatar Circle with Initials */}
            <div className="flex-shrink-0" style={{ transform: 'translateZ(20px)' }}>
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--bg)',
                  fontWeight: 700,
                  fontSize: '1rem',
                  fontFamily: 'var(--font-mono), monospace',
                  boxShadow: '0 0 16px rgba(0,212,255,0.3)',
                }}
              >
                {TESTIMONIALS[currentIdx].initials}
              </div>
            </div>

            <div className="flex-1 relative" style={{ transform: 'translateZ(10px)' }}>
              {/* Star Rating Row */}
              <div className="mb-3 relative z-10" style={{ color: 'var(--secondary)', fontSize: '1.1rem', letterSpacing: '2px' }}>
                {'★'.repeat(TESTIMONIALS[currentIdx].rating)}
              </div>

              <p className="text-lg md:text-xl leading-relaxed mb-4 relative z-10 text-white/80" style={{ fontStyle: 'italic', fontFamily: 'var(--font-inter)' }}>
                {TESTIMONIALS[currentIdx].text}
              </p>

              <div className="relative z-10">
                <p className="font-semibold text-white" style={{ fontFamily: 'var(--font-inter)' }}>
                  {TESTIMONIALS[currentIdx].name}
                </p>
                <p className="text-sm" style={{ color: 'var(--muted)', fontFamily: 'var(--font-inter)' }}>
                  {TESTIMONIALS[currentIdx].role} at {TESTIMONIALS[currentIdx].company}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Controls: Circular Buttons */}
          <div className="flex items-center justify-between mt-8 pt-4 border-t border-[rgba(0,212,255,0.08)] relative z-20">
            <div className="flex gap-3">
              <button
                onClick={handlePrev}
                aria-label="Previous testimonial"
                className="flex items-center justify-center transition-all focus-ring cursor-pointer"
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  background: 'rgba(0,212,255,0.06)',
                  border: '1px solid rgba(0,212,255,0.15)',
                  color: 'var(--primary)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(0,212,255,0.12)';
                  e.currentTarget.style.borderColor = 'rgba(0,212,255,0.4)';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(0,212,255,0.06)';
                  e.currentTarget.style.borderColor = 'rgba(0,212,255,0.15)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <ChevronLeft color="var(--primary)" size={20} />
              </button>

              <button
                onClick={handleNext}
                aria-label="Next testimonial"
                className="flex items-center justify-center transition-all focus-ring cursor-pointer"
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  background: 'rgba(0,212,255,0.06)',
                  border: '1px solid rgba(0,212,255,0.15)',
                  color: 'var(--primary)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(0,212,255,0.12)';
                  e.currentTarget.style.borderColor = 'rgba(0,212,255,0.4)';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(0,212,255,0.06)';
                  e.currentTarget.style.borderColor = 'rgba(0,212,255,0.15)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <ChevronRight color="var(--primary)" size={20} />
              </button>
            </div>

            {/* Dot Pill Indicators */}
            <div className="flex gap-2 items-center">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  className="transition-all duration-300 ease-out focus-ring cursor-pointer"
                  style={{
                    backgroundColor: idx === currentIdx ? 'var(--primary)' : 'rgba(255, 255, 255, 0.15)',
                    width: idx === currentIdx ? '28px' : '8px',
                    height: '8px',
                    borderRadius: idx === currentIdx ? '999px' : '50%',
                  }}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
