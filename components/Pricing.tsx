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

  // Fix #14: reveal on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }); },
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
    setTimeout(() => { setContactSent(false); setContactOpen(false); setContactForm({ name: '', email: '', message: '' }); }, 2000);
  };

  return (
    <section
      id="pricing"
      aria-label="Pricing"
      className="py-20 px-6"
      style={{
        backgroundColor: 'var(--bg)',
        backgroundImage: `
          radial-gradient(ellipse 70% 50% at 50% 100%, rgba(255,200,1,0.07) 0%, transparent 65%),
          radial-gradient(circle, rgba(17,76,90,0.07) 1px, transparent 1px)
        `,
        backgroundSize: 'auto, 28px 28px',
      }}
    >
      <div ref={sectionRef} className="max-w-6xl mx-auto reveal">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--text)', fontFamily: 'var(--font-mono)' }}>
            Simple, Transparent{' '}
            <span style={{ background: 'linear-gradient(135deg,var(--primary),var(--warm))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Pricing</span>
          </h2>
          <p className="text-lg" style={{ color: 'var(--muted)' }}>Choose the plan that fits your needs</p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-16">
          <BillingToggle />
          <CurrencySelector />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Starter — Fix #9: 3D tilt, Fix #10: multi-layer shadow, Fix #17: tabIndex */}
          <div
            className="p-8 transition-all pricing-card-starter card-depth spotlight-card"
            style={{ background: 'white', border: '1px solid rgba(17,76,90,0.1)', borderRadius: '20px', transformStyle: 'preserve-3d', willChange: 'transform' }}
            tabIndex={0}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' }); } }}
          >
            <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--text)', fontFamily: 'var(--font-mono)' }}>Starter</h3>
            <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>{PRICING_MATRIX.plans.starter.description}</p>
            <div className="mb-6">
              <span className="text-3xl font-bold" style={{ color: 'var(--dark)', fontFamily: 'var(--font-mono)' }}>Free</span>
            </div>
            <button
              className="btn-premium-outline w-full py-3 mb-8"
              onClick={() => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get Started
            </button>
            <ul className="space-y-3">
              {['5 workflows', '100 executions/month', 'Basic support'].map((f, i) => (
                <li key={i} className="text-sm flex items-center gap-2" style={{ color: 'var(--text)' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 16, height: 16, borderRadius: '50%', backgroundColor: 'rgba(255,200,1,0.15)', border: '1px solid rgba(255,200,1,0.4)', color: 'var(--dark)', fontSize: '0.6rem', fontWeight: 700, flexShrink: 0 }}>✓</span> {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Pro */}
          <div className="pro-card-border-wrap relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-1 rounded-full text-xs font-bold z-20" style={{ backgroundColor: 'var(--primary)', color: 'var(--surface)', boxShadow: '0 4px 16px rgba(255,200,1,0.4)', letterSpacing: '0.08em', whiteSpace: 'nowrap', fontFamily: 'var(--font-mono)' }}>✦ Most Popular ✦</div>
            <div
              className="p-8 relative pricing-pro-glow w-full h-full spotlight-card"
              style={{
                background: 'linear-gradient(135deg, var(--dark) 0%, #1a5f73 100%)',
                border: 'none',
                borderRadius: '20px',
                boxShadow: 'inset 0 0 60px rgba(255,200,1,0.08), 0 40px 80px rgba(17,76,90,0.5), 0 0 0 1px rgba(255,200,1,0.2)',
                overflow: 'hidden',
                transformStyle: 'preserve-3d',
                willChange: 'transform'
              }}
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' }); } }}
              onMouseMove={(e) => {
                const card = e.currentTarget;
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
                const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -6;
                const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 6;
                card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(12px) scale(1.04)`;
              }}
              onMouseLeave={(e) => {
                const card = e.currentTarget;
                card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0) scale(1.04)';
                card.style.transition = 'transform 400ms ease-out';
              }}
            >
              {/* Floating particles */}
              <div style={{ position: 'absolute', width: 3, height: 3, borderRadius: '50%', backgroundColor: 'rgba(255,200,1,0.4)', top: '20%', left: '10%', animation: 'float 3s ease-in-out infinite', pointerEvents: 'none', zIndex: 1 }} />
              <div style={{ position: 'absolute', width: 3, height: 3, borderRadius: '50%', backgroundColor: 'rgba(255,200,1,0.4)', top: '15%', left: '80%', animation: 'float 4s ease-in-out infinite 0.5s', pointerEvents: 'none', zIndex: 1 }} />
              <div style={{ position: 'absolute', width: 3, height: 3, borderRadius: '50%', backgroundColor: 'rgba(255,200,1,0.4)', top: '70%', left: '60%', animation: 'float 5s ease-in-out infinite 1s', pointerEvents: 'none', zIndex: 1 }} />
              <div style={{ position: 'absolute', width: 3, height: 3, borderRadius: '50%', backgroundColor: 'rgba(255,200,1,0.4)', top: '80%', left: '20%', animation: 'float 3s ease-in-out infinite 1.5s', pointerEvents: 'none', zIndex: 1 }} />
              <div style={{ position: 'absolute', width: 3, height: 3, borderRadius: '50%', backgroundColor: 'rgba(255,200,1,0.4)', top: '50%', left: '90%', animation: 'float 4s ease-in-out infinite 2s', pointerEvents: 'none', zIndex: 1 }} />

              <div style={{ position: 'absolute', top: 0, left: '15%', right: '15%', height: '1px', background: 'linear-gradient(90deg,transparent,rgba(255,200,1,0.8),transparent)', borderRadius: '9999px' }} />
              <div style={{ position: 'absolute', top: -60, right: -60, width: 140, height: 140, borderRadius: '50%', background: 'radial-gradient(circle,rgba(255,200,1,0.12) 0%,transparent 70%)', pointerEvents: 'none' }} />

              <h3 className="text-2xl font-bold mb-2 mt-4" style={{ color: 'white', fontFamily: 'var(--font-mono)' }}>Pro</h3>
              <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.7)' }}>{PRICING_MATRIX.plans.pro.description}</p>
              <div className="mb-6 flex items-baseline gap-1">
                <span style={{ color: 'var(--primary)', fontFamily: 'var(--font-mono)', fontSize: '4rem', fontWeight: 800, textShadow: '0 0 40px rgba(255,200,1,0.4)' }}>
                  <PriceDisplay planKey="pro" />
                </span>
                <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>/{isAnnual ? 'year' : 'month'}</span>
              </div>
              <button className="btn-premium-primary w-full py-3 mb-8"
                onClick={() => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Start Free Trial
              </button>
              <ul className="space-y-3">
                {['50 workflows', 'Unlimited executions', 'Priority support', 'Advanced analytics'].map((f, i) => (
                  <li key={i} className="text-sm flex items-center gap-2" style={{ color: 'rgba(255,255,255,0.7)' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', justifycontent: 'center', width: 16, height: 16, borderRadius: '50%', backgroundColor: 'rgba(255,200,1,0.2)', border: '1px solid rgba(255,200,1,0.5)', color: 'var(--primary)', fontSize: '0.6rem', fontWeight: 700, flexShrink: 0 }}>✓</span> {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Enterprise */}
          <div
            className="p-8 transition-all pricing-card-enterprise card-depth spotlight-card"
            style={{ background: 'white', border: '1px solid rgba(17,76,90,0.1)', borderRadius: '20px', transformStyle: 'preserve-3d', willChange: 'transform' }}
            tabIndex={0}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setContactOpen(true); } }}
          >
            <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--text)', fontFamily: 'var(--font-mono)' }}>Enterprise</h3>
            <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>{PRICING_MATRIX.plans.enterprise.description}</p>
            <div className="mb-6">
              <span className="text-3xl font-bold" style={{ color: 'var(--dark)', fontFamily: 'var(--font-mono)' }}>
                <PriceDisplay planKey="enterprise" />
              </span>
              <span style={{ color: 'var(--muted)' }}>/{isAnnual ? 'year' : 'month'}</span>
            </div>
            <button
              className="btn-premium-outline w-full py-3 mb-8"
              onClick={() => setContactOpen(true)}
            >
              Contact Sales
            </button>
            <ul className="space-y-3">
              {['Unlimited workflows', 'Unlimited executions', 'Dedicated support', 'Custom integrations', 'SLA guarantee'].map((f, i) => (
                <li key={i} className="text-sm flex items-center gap-2" style={{ color: 'var(--text)' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 16, height: 16, borderRadius: '50%', backgroundColor: 'rgba(255,200,1,0.15)', border: '1px solid rgba(255,200,1,0.4)', color: 'var(--dark)', fontSize: '0.6rem', fontWeight: 700, flexShrink: 0 }}>✓</span> {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Contact Sales Modal — Fix #1 */}
      {contactOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }} onClick={() => setContactOpen(false)}>
          <div className="w-full max-w-md mx-4 p-8 rounded-2xl" style={{ background: 'white', border: '1px solid rgba(255,200,1,0.3)', boxShadow: '0 32px 64px rgba(0,0,0,0.3)' }} onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-bold mb-6" style={{ fontFamily: 'var(--font-mono)', color: 'var(--dark)' }}>Contact Sales</h3>
            {contactSent ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">✓</div>
                <p className="font-semibold" style={{ color: 'var(--dark)' }}>Message sent! We&apos;ll be in touch.</p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <input placeholder="Name" required value={contactForm.name} onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl text-sm" style={{ border: '1px solid rgba(17,76,90,0.2)', outline: 'none', color: 'var(--text)' }} />
                <input type="email" placeholder="Email" required value={contactForm.email} onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl text-sm" style={{ border: '1px solid rgba(17,76,90,0.2)', outline: 'none', color: 'var(--text)' }} />
                <textarea placeholder="Message" required value={contactForm.message} onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl text-sm" rows={4} style={{ border: '1px solid rgba(17,76,90,0.2)', outline: 'none', resize: 'none', color: 'var(--text)' }} />
                <button type="submit" className="btn-premium-primary w-full py-3">Submit</button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
