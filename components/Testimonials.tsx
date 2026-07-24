'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronLeft } from './icons/ChevronLeft';
import { ChevronRight } from './icons/ChevronRight';

const TESTIMONIALS = [
  {
    name: 'Sarah Johnson',
    role: 'Product Manager at TechCorp',
    text: 'NexaFlow transformed how we manage workflows. We saved 20 hours per week on automation alone.',
    rating: 5,
    avatar: 'SJ',
  },
  {
    name: 'Marcus Chen',
    role: 'CTO at DataFlow',
    text: "We automated 80% of our data pipeline in under a week. NexaFlow's AI agents are genuinely impressive — it feels like having 3 extra engineers on the team.",
    rating: 5,
    avatar: 'MC',
  },
  {
    name: 'Priya Sharma',
    role: 'Head of Ops at ScaleUp',
    text: 'The bento dashboard made onboarding our team trivial. Pricing is transparent, the currency switcher is smooth, and customer support actually responds.',
    rating: 5,
    avatar: 'PS',
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
      className="testimonials-bg noise-overlay py-20 px-6 relative"
      style={{
        backgroundColor: 'var(--surface)',
        backgroundImage: `
          radial-gradient(ellipse 60% 50% at 50% 0%, rgba(255,200,1,0.1) 0%, transparent 60%),
          radial-gradient(ellipse 40% 60% at 0% 100%, rgba(17,76,90,0.8) 0%, transparent 50%),
          radial-gradient(ellipse 40% 40% at 100% 0%, rgba(255,154,50,0.07) 0%, transparent 50%)
        `,
      }}
    >
      <div ref={sectionRef} className="hero-content max-w-5xl mx-auto reveal reveal-up">
        <div className="text-center mb-10">
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
                color: 'var(--primary)',
              }}
            >
              Social Proof
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: 'white', fontFamily: 'var(--font-mono)' }}>
            Trusted by Teams{' '}
            <span style={{ background: 'linear-gradient(135deg,var(--primary),var(--warm))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Worldwide
            </span>
          </h2>
          <p className="text-lg" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            See what our customers have to say about NexaFlow
          </p>
        </div>

        {/* Section Social Proof Stat Bar ABOVE Carousel */}
        <div className="flex items-center justify-center gap-8 md:gap-12 mb-12 flex-wrap">
          <div className="text-center">
            <p style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '1.25rem', color: 'var(--primary)' }}>10,000+ Teams</p>
            <p style={{ fontFamily: 'var(--font-inter)', fontWeight: 400, color: 'rgba(255,255,255,0.5)', fontSize: '0.8125rem' }}>Active users</p>
          </div>
          <div style={{ width: 1, height: 32, background: 'rgba(255,255,255,0.2)' }} />
          <div className="text-center">
            <p style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '1.25rem', color: 'var(--primary)' }}>4.9★ Rating</p>
            <p style={{ fontFamily: 'var(--font-inter)', fontWeight: 400, color: 'rgba(255,255,255,0.5)', fontSize: '0.8125rem' }}>Customer rating</p>
          </div>
          <div style={{ width: 1, height: 32, background: 'rgba(255,255,255,0.2)' }} />
          <div className="text-center">
            <p style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '1.25rem', color: 'var(--primary)' }}>99.9% Satisfaction</p>
            <p style={{ fontFamily: 'var(--font-inter)', fontWeight: 400, color: 'rgba(255,255,255,0.5)', fontSize: '0.8125rem' }}>Retention rate</p>
          </div>
        </div>

        {/* Carousel Card */}
        <div
          className="relative overflow-hidden"
          style={{
            background: 'rgba(255,255,255,0.05)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,200,1,0.12)',
            borderRadius: '24px',
            padding: '2.5rem',
            boxShadow: '0 32px 64px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,200,1,0.1)',
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
              top: 16,
              left: 24,
              fontSize: '6rem',
              lineHeight: 1,
              color: 'rgba(255,200,1,0.08)',
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
            {/* Gradient Avatar Circle with Initials */}
            <div className="flex-shrink-0" style={{ transform: 'translateZ(20px)' }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--dark), var(--primary))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  fontFamily: 'var(--font-mono), monospace',
                  boxShadow: '0 0 0 2px rgba(255,200,1,0.3), 0 4px 12px rgba(0,0,0,0.2)',
                }}
              >
                {TESTIMONIALS[currentIdx].avatar}
              </div>
            </div>

            <div className="flex-1 relative" style={{ transform: 'translateZ(10px)' }}>
              {/* Star Rating Row */}
              <div className="mb-3 relative z-10" style={{ color: 'var(--primary)', fontSize: '1rem', letterSpacing: '2px' }}>
                {'★'.repeat(TESTIMONIALS[currentIdx].rating)}
              </div>

              <p className="text-lg md:text-xl leading-relaxed mb-4 relative z-10" style={{ color: 'rgba(255, 255, 255, 0.9)', fontStyle: 'italic', transform: 'translateZ(15px)' }}>
                {TESTIMONIALS[currentIdx].text}
              </p>

              <div className="relative z-10" style={{ transform: 'translateZ(15px)' }}>
                <p className="font-bold" style={{ color: 'white', fontFamily: 'var(--font-mono)' }}>
                  {TESTIMONIALS[currentIdx].name}
                </p>
                <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.65)' }}>
                  {TESTIMONIALS[currentIdx].role}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Controls: Circular Buttons */}
          <div className="flex items-center justify-between mt-8 pt-4 border-t border-[rgba(255,255,255,0.08)] relative z-20">
            <div className="flex gap-2">
              <button
                onClick={handlePrev}
                aria-label="Previous testimonial"
                className="flex items-center justify-center transition-all focus-ring"
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,200,1,0.15)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,200,1,0.1)';
                  e.currentTarget.style.borderColor = 'rgba(255,200,1,0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                  e.currentTarget.style.borderColor = 'rgba(255,200,1,0.15)';
                }}
              >
                <ChevronLeft color="var(--primary)" size={20} />
              </button>

              <button
                onClick={handleNext}
                aria-label="Next testimonial"
                className="flex items-center justify-center transition-all focus-ring"
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,200,1,0.15)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,200,1,0.1)';
                  e.currentTarget.style.borderColor = 'rgba(255,200,1,0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                  e.currentTarget.style.borderColor = 'rgba(255,200,1,0.15)';
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
                  className="transition-all duration-300 ease-out focus-ring"
                  style={{
                    backgroundColor: idx === currentIdx ? 'var(--primary)' : 'rgba(255, 255, 255, 0.2)',
                    width: idx === currentIdx ? '24px' : '8px',
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
