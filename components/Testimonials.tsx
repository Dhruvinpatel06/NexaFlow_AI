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
      style={{ backgroundColor: 'var(--dark)' }}
    >
      <div className="hero-content max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: 'white', fontFamily: 'JetBrains Mono' }}
          >
            Trusted by Teams Worldwide
          </h2>
          <p className="text-lg" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            See what our customers have to say about NexaFlow
          </p>
        </div>

        {/* Carousel Container */}
        <div
          className="relative p-8 md:p-12 overflow-hidden"
          style={{
            background: 'rgba(255, 255, 255, 0.06)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 200, 1, 0.15)',
            borderRadius: '24px',
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
                className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 overflow-hidden"
                style={{ borderColor: 'var(--primary)' }}
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
                  fontSize: '8rem',
                  lineHeight: 1,
                  color: 'rgba(255, 200, 1, 0.08)',
                  fontFamily: 'JetBrains Mono, monospace',
                  zIndex: 0,
                  pointerEvents: 'none',
                }}
              >
                "
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
            className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-lg transition-all"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.06)' }}
            aria-label="Previous testimonial"
          >
            <ChevronLeft color="var(--primary)" size={24} />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-lg transition-all"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.06)' }}
            aria-label="Next testimonial"
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
      </div>
    </section>
  );
}
