'use client';

import { useEffect, useRef, useState } from 'react';
import { PRICING_MATRIX } from '@/lib/pricingMatrix';
import { usePricing } from '@/lib/pricingContext';
import PriceDisplay from './PriceDisplay';
import BillingToggle from './BillingToggle';
import CurrencySelector from './CurrencySelector';

export default function Pricing() {
  const { isAnnual } = usePricing();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [contactOpen, setContactOpen] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [contactSent, setContactSent] = useState(false);

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
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // 3D tilt + spotlight cursor for pricing cards
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(8px)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0)';
    card.style.transition = 'transform 400ms ease-out';
  };

  const handleContactSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    setContactSent(true);
    setTimeout(() => {
      setContactSent(false);
      setContactOpen(false);
      setContactForm({ name: '', email: '', message: '' });
    }, 2000);
  };

  return (
    <section
      id="pricing"
      aria-label="Pricing"
      className="py-24 px-6 relative overflow-hidden"
      style={{
        backgroundColor: 'var(--bg)',
        backgroundImage: `
          radial-gradient(ellipse 80% 60% at 50% 100%, rgba(0,212,255,0.05) 0%, transparent 60%)
        `,
      }}
    >
      <div ref={sectionRef} className="max-w-6xl mx-auto reveal reveal-up">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white" style={{ fontFamily: 'var(--font-mono)' }}>
            Simple, Transparent <span className="gradient-text-cyan">Pricing</span>
          </h2>
          <p className="text-lg" style={{ color: 'var(--muted)' }}>
            Choose the plan that fits your needs
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-16">
          <BillingToggle />
          <CurrencySelector />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Starter */}
          <div
            className="p-8 transition-all card-depth spotlight-card"
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '20px',
              transformStyle: 'preserve-3d',
              willChange: 'transform',
            }}
            tabIndex={0}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            <h3 className="text-2xl font-bold mb-2 text-white" style={{ fontFamily: 'var(--font-mono)' }}>
              Starter
            </h3>
            <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>
              {PRICING_MATRIX.plans.starter.description}
            </p>
            <div className="mb-6">
              <span className="text-3xl font-bold text-white" style={{ fontFamily: 'var(--font-mono)' }}>
                Free
              </span>
            </div>
            <button
              className="w-full py-3 mb-8 rounded-xl font-bold text-sm tracking-wider uppercase transition-all duration-200 focus-ring cursor-pointer"
              style={{
                background: 'transparent',
                border: '1px solid var(--border)',
                color: 'var(--muted)',
              }}
              onClick={() => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get Started
            </button>
            <ul className="space-y-3">
              {['5 workflows', '100 executions/month', 'Basic support'].map((f, i) => (
                <li key={i} className="text-sm flex items-center gap-2" style={{ color: 'var(--muted)' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 16, height: 16, borderRadius: '50%', backgroundColor: 'rgba(91,141,184,0.15)', border: '1px solid rgba(91,141,184,0.3)', color: 'var(--muted)', fontSize: '0.6rem', fontWeight: 700, flexShrink: 0 }}>
                    ✓
                  </span>{' '}
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Pro (HERO CARD) */}
          <div
            className="relative"
            style={{
              padding: '1.5px',
              borderRadius: 21,
              background: 'linear-gradient(45deg, #00D4FF, #FFC801, #FF6B35, #00D4FF)',
              backgroundSize: '300% 300%',
              animation: 'border-rotate 4s ease infinite',
              transform: 'scale(1.04)',
              zIndex: 10,
            }}
          >
            <div
              className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-1 rounded-full text-xs font-bold z-20"
              style={{
                background: 'linear-gradient(135deg, var(--primary), #0099BB)',
                color: 'var(--bg)',
                boxShadow: '0 4px 16px rgba(0,212,255,0.4)',
                letterSpacing: '0.08em',
                whiteSpace: 'nowrap',
                fontFamily: 'var(--font-mono)',
              }}
            >
              ✦ Most Popular ✦
            </div>

            <div
              className="p-8 relative w-full h-full spotlight-card"
              style={{
                background: 'linear-gradient(135deg, #071525 0%, #0D2137 60%, #071525 100%)',
                borderRadius: 20,
                boxShadow: '0 25px 50px rgba(0,0,0,0.5), 0 0 40px rgba(0,212,255,0.1)',
                overflow: 'hidden',
                transformStyle: 'preserve-3d',
                willChange: 'transform',
              }}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              onMouseMove={(e) => {
                const card = e.currentTarget;
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
                const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -6;
                const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 6;
                card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(12px)`;
              }}
              onMouseLeave={(e) => {
                const card = e.currentTarget;
                card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0)';
                card.style.transition = 'transform 400ms ease-out';
              }}
            >
              <h3 className="text-2xl font-bold mb-2 mt-4 text-white" style={{ fontFamily: 'var(--font-mono)' }}>
                Pro
              </h3>
              <p className="text-sm mb-6" style={{ color: 'rgba(232, 244, 253, 0.7)' }}>
                {PRICING_MATRIX.plans.pro.description}
              </p>

              <div className="mb-6 flex items-baseline gap-1">
                <span className="gradient-text-cyan font-black" style={{ fontFamily: 'var(--font-mono)', fontSize: '4rem', textShadow: '0 0 40px rgba(0,212,255,0.4)' }}>
                  <PriceDisplay planKey="pro" />
                </span>
                <span style={{ color: 'rgba(232, 244, 253, 0.7)', fontSize: '0.9rem' }}>/{isAnnual ? 'year' : 'month'}</span>
              </div>

              <button
                className="w-full py-3.5 mb-8 rounded-xl font-bold text-sm tracking-wider uppercase transition-all duration-200 focus-ring cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, #00D4FF, #0099BB)',
                  color: '#020B18',
                  fontWeight: 700,
                  boxShadow: '0 0 30px rgba(0, 212, 255, 0.3)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 50px rgba(0, 212, 255, 0.5)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 30px rgba(0, 212, 255, 0.3)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
                onClick={() => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Start Free Trial
              </button>

              <ul className="space-y-3">
                {['50 workflows', 'Unlimited executions', 'Priority support', 'Advanced analytics'].map((f, i) => (
                  <li key={i} className="text-sm flex items-center gap-2 text-white">
                    <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 16, height: 16, borderRadius: '50%', backgroundColor: 'rgba(0, 212, 255, 0.2)', border: '1px solid rgba(0, 212, 255, 0.5)', color: 'var(--primary)', fontSize: '0.6rem', fontWeight: 700, flexShrink: 0 }}>
                      ✓
                    </span>{' '}
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Enterprise */}
          <div
            className="p-8 transition-all card-depth spotlight-card"
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '20px',
              transformStyle: 'preserve-3d',
              willChange: 'transform',
            }}
            tabIndex={0}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setContactOpen(true);
              }
            }}
          >
            <h3 className="text-2xl font-bold mb-2 text-white" style={{ fontFamily: 'var(--font-mono)' }}>
              Enterprise
            </h3>
            <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>
              {PRICING_MATRIX.plans.enterprise.description}
            </p>
            <div className="mb-6">
              <span className="text-3xl font-bold text-white" style={{ fontFamily: 'var(--font-mono)' }}>
                <PriceDisplay planKey="enterprise" />
              </span>
              <span style={{ color: 'var(--muted)' }}>/{isAnnual ? 'year' : 'month'}</span>
            </div>

            <button
              className="w-full py-3 mb-8 rounded-xl font-bold text-sm tracking-wider uppercase transition-all duration-200 focus-ring cursor-pointer"
              style={{
                background: 'transparent',
                border: '1px solid rgba(0,212,255,0.4)',
              }}
              onClick={() => setContactOpen(true)}
            >
              <span className="gradient-text-cyan">Contact Sales</span>
            </button>

            <ul className="space-y-3">
              {['Unlimited workflows', 'Unlimited executions', 'Dedicated support', 'Custom integrations', 'SLA guarantee'].map((f, i) => (
                <li key={i} className="text-sm flex items-center gap-2" style={{ color: 'var(--muted)' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 16, height: 16, borderRadius: '50%', backgroundColor: 'rgba(91,141,184,0.15)', border: '1px solid rgba(91,141,184,0.3)', color: 'var(--muted)', fontSize: '0.6rem', fontWeight: 700, flexShrink: 0 }}>
                    ✓
                  </span>{' '}
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* All plans include section */}
        <div className="flex items-center justify-center gap-4 md:gap-8 mt-16 flex-wrap">
          {['✓ 99.9% Uptime', '✓ SOC 2 Type II', '✓ GDPR', '✓ 24/7 Support'].map((item) => (
            <div
              key={item}
              className="glass px-4 py-2 rounded-full text-xs font-mono"
              style={{ color: 'var(--muted)', border: '1px solid rgba(0,212,255,0.1)' }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Contact Sales Modal */}
      {contactOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center" style={{ backgroundColor: 'rgba(2,11,24,0.85)', backdropFilter: 'blur(12px)' }} onClick={() => setContactOpen(false)}>
          <div className="w-full max-w-md mx-4 p-8 rounded-2xl" style={{ background: 'var(--surface)', border: '1px solid rgba(0,212,255,0.3)', boxShadow: '0 32px 64px rgba(0,0,0,0.7)' }} onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-bold mb-6 text-white" style={{ fontFamily: 'var(--font-mono)' }}>
              Contact Sales
            </h3>
            {contactSent ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-4 text-[var(--primary)]">✓</div>
                <p className="font-semibold text-white">Message sent! We&apos;ll be in touch.</p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <input
                  placeholder="Name"
                  required
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl text-sm"
                  style={{ background: 'rgba(0,212,255,0.04)', border: '1px solid rgba(0,212,255,0.2)', outline: 'none', color: 'white' }}
                />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl text-sm"
                  style={{ background: 'rgba(0,212,255,0.04)', border: '1px solid rgba(0,212,255,0.2)', outline: 'none', color: 'white' }}
                />
                <textarea
                  placeholder="Message"
                  required
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl text-sm"
                  rows={4}
                  style={{ background: 'rgba(0,212,255,0.04)', border: '1px solid rgba(0,212,255,0.2)', outline: 'none', resize: 'none', color: 'white' }}
                />
                <button type="submit" className="btn-premium-primary w-full py-3">
                  Submit
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
