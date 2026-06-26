'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronLeft } from './icons/ChevronLeft';
import { ChevronRight } from './icons/ChevronRight';

const TESTIMONIALS = [
  {
    name: 'Sarah Johnson',
    role: 'Product Manager',
    company: 'TechCorp',
    quote: 'NexaFlow transformed how we manage workflows. We saved 20 hours per week on automation alone.',
    avatar: '/professional-woman-avatar-with-short-brown-hair-an.jpg',
  },
  {
    name: 'Michael Chen',
    role: 'CTO',
    company: 'DataFlow Systems',
    quote: 'The integration capabilities are outstanding. Our entire pipeline is now automated and running smoothly.',
    avatar: '/professional-man-avatar-with-beard-and-glasses-loo.jpg',
  },
  {
    name: 'Emily Rodriguez',
    role: 'Operations Lead',
    company: 'CloudScale Inc',
    quote: 'Best investment we made this year. The ROI is undeniable, and the support team is always there to help.',
    avatar: '/professional-person-avatar-with-curly-hair-and-war.jpg',
  },
];

export default function Testimonials() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartRef = useRef<number>(0);
  const autoAdvanceRef = useRef<NodeJS.Timeout>();

  const startAutoAdvance = () => {
    if (autoAdvanceRef.current) clearTimeout(autoAdvanceRef.current);
    if (!isHovered) {
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
  }, [isHovered]);

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
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStartRef.current - touchEnd;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  return (
    <section
      aria-label="Testimonials"
      className="testimonials-bg py-20 px-6"
      style={{
        backgroundColor: 'var(--surface)',
        backgroundImage: `
          radial-gradient(ellipse 60% 50% at 50% 0%, rgba(255,200,1,0.1) 0%, transparent 60%),
          radial-gradient(ellipse 40% 60% at 0% 100%, rgba(17,76,90,0.8) 0%, transparent 50%),
          radial-gradient(ellipse 40% 40% at 100% 0%, rgba(255,154,50,0.07) 0%, transparent 50%)
        `,
      }}
    >
      <div className="hero-content max-w-5xl mx-auto">
        <div className="text-center mb-12">
          {/* Eyebrow */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 14px', borderRadius: '9999px', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: 'Inter,sans-serif', color: 'var(--primary)', background: 'rgba(255,200,1,0.1)', border: '1px solid rgba(255,200,1,0.3)' }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: 'var(--primary)', display: 'inline-block' }} />
              Social Proof
            </span>
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: 'white', fontFamily: 'JetBrains Mono' }}
          >
            Trusted by Teams{' '}
            <span style={{ background: 'linear-gradient(135deg,var(--primary),var(--warm))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Worldwide
            </span>
          </h2>
          <p className="text-lg" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            See what our customers have to say about NexaFlow
          </p>
        </div>

        {/* Carousel Container */}
        <div
          className="relative p-8 md:p-12 overflow-hidden"
          style={{
            background: 'linear-gradient(145deg, rgba(255,255,255,0.07) 0%, rgba(17,76,90,0.15) 100%)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,200,1,0.18)',
            boxShadow: '0 32px 64px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,200,1,0.1)',
            borderRadius: '28px',
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Testimonial Content */}
          <div className="flex items-center gap-6 md:gap-8">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div
                className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden"
                style={{
                  border: '2px solid var(--primary)',
                  boxShadow: '0 0 0 3px rgba(255,200,1,0.2), 0 0 16px rgba(255,200,1,0.15)',
                }}
              >
                <img
                  src={TESTIMONIALS[currentIdx].avatar}
                  alt={TESTIMONIALS[currentIdx].name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Text Content */}
            <div className="flex-1 relative">
              <span
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: '1rem',
                  fontSize: '10rem',
                  lineHeight: 0.8,
                  color: 'rgba(255,200,1,0.12)',
                  fontFamily: 'JetBrains Mono, monospace',
                  zIndex: 0,
                  pointerEvents: 'none',
                }}
              >
                &ldquo;
              </span>
              <p
                className="text-lg md:text-xl leading-relaxed mb-4 relative"
                style={{
                  color: 'rgba(255, 255, 255, 0.85)',
                  fontStyle: 'italic',
                  zIndex: 1,
                }}
              >
                {TESTIMONIALS[currentIdx].quote}
              </p>
              <div className="relative" style={{ zIndex: 1 }}>
                <p className="font-bold" style={{ color: 'white', fontFamily: 'JetBrains Mono' }}>
                  {TESTIMONIALS[currentIdx].name}
                </p>
                <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  {TESTIMONIALS[currentIdx].role} at {TESTIMONIALS[currentIdx].company}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 transition-all"
            style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,200,1,0.15)', borderRadius: '12px' }}
            aria-label="Previous testimonial"
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,200,1,0.1)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,200,1,0.4)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.05)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,200,1,0.15)'; }}
          >
            <ChevronLeft color="var(--primary)" size={24} />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 transition-all"
            style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,200,1,0.15)', borderRadius: '12px' }}
            aria-label="Next testimonial"
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,200,1,0.1)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,200,1,0.4)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.05)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,200,1,0.15)'; }}
          >
            <ChevronRight color="var(--primary)" size={24} />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 items-center">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className="rounded-full transition-all duration-300 ease-out"
                style={{
                  backgroundColor: idx === currentIdx ? 'var(--primary)' : 'rgba(255, 255, 255, 0.2)',
                  width: idx === currentIdx ? '24px' : '8px',
                  height: '8px',
                }}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Mini stat badges */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '2.5rem', flexWrap: 'wrap' }}>
          {[
            { value: '10,000+', label: 'Teams using NexaFlow' },
            { value: '4.9★', label: 'Average rating' },
            { value: '99.9%', label: 'Customer satisfaction' },
          ].map((s) => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <p style={{ fontFamily: 'JetBrains Mono', fontWeight: 800, fontSize: '1.4rem', color: 'var(--primary)', letterSpacing: '-0.03em' }}>{s.value}</p>
              <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.45)', fontFamily: 'Inter', marginTop: 3 }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
