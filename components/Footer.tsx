'use client';

import { useState } from 'react';

const FOOTER_LINKS = {
  product: [
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Security', href: '#' },
    { label: 'Status', href: '#' },
  ],
  company: [
    { label: 'About', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Contact', href: '#' },
  ],
  resources: [
    { label: 'Documentation', href: '#' },
    { label: 'API Docs', href: '#' },
    { label: 'Community', href: '#' },
    { label: 'Support', href: '#' },
  ],
};

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleMouseMoveCTA = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -3; // ±3deg
    const rotateY = ((x - centerX) / centerX) * 3; // ±3deg
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.01)`;
    card.style.transition = 'none';
  };

  const handleMouseLeaveCTA = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
    card.style.transition = 'transform 400ms ease-out';
  };

  // Fix #1: loading spinner before "Subscribed"
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setSubscribed(true);
        setEmail('');
        setTimeout(() => setSubscribed(false), 3000);
      }, 1000);
    }
  };

  return (
    <footer
      className="pt-20 pb-8 px-6"
      style={{
        backgroundColor: 'var(--surface)',
        backgroundImage: 'radial-gradient(ellipse 60% 30% at 50% 0%, rgba(255,200,1,0.06) 0%, transparent 60%)',
        color: 'white',
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Issue 12: Premium Footer CTA section */}
        <div className="mb-20">
          <div className="pro-card-border-wrap" style={{ borderRadius: '25px' }}>
            <div 
              className="relative overflow-hidden w-full py-16 px-8 md:px-16 text-center spotlight-card" 
              style={{ 
                background: 'linear-gradient(135deg, #114C5A 0%, #0a2d36 100%)', 
                borderRadius: '24px',
                boxShadow: 'inset 0 0 60px rgba(255,200,1,0.08)',
                transformStyle: 'preserve-3d',
                willChange: 'transform',
                cursor: 'pointer',
              }}
              onMouseMove={handleMouseMoveCTA}
              onMouseLeave={handleMouseLeaveCTA}
            >
              {/* Circuit-board SVG pattern overlay */}
              <svg 
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.15, pointerEvents: 'none' }}
                xmlns="http://www.w3.org/2000/svg"
              >
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,200,1,0.3)" strokeWidth="0.5" strokeDasharray="4,4" />
                  <circle cx="40" cy="0" r="2" fill="var(--primary)" />
                  <circle cx="0" cy="40" r="1.5" fill="var(--warm)" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#grid)" />
                <line x1="10%" y1="20%" x2="25%" y2="50%" stroke="var(--primary)" strokeWidth="1" strokeDasharray="5,5" />
                <line x1="25%" y1="50%" x2="50%" y2="30%" stroke="var(--primary)" strokeWidth="1" strokeDasharray="5,5" />
                <line x1="50%" y1="30%" x2="70%" y2="70%" stroke="var(--warm)" strokeWidth="1" strokeDasharray="5,5" />
                <line x1="70%" y1="70%" x2="90%" y2="40%" stroke="var(--warm)" strokeWidth="1" strokeDasharray="5,5" />
                <circle cx="10%" cy="20%" r="4" fill="var(--primary)" opacity="0.6" />
                <circle cx="25%" cy="50%" r="5" fill="var(--primary)" opacity="0.8" />
                <circle cx="50%" cy="30%" r="4" fill="var(--warm)" opacity="0.6" />
                <circle cx="70%" cy="70%" r="6" fill="var(--warm)" opacity="0.8" />
                <circle cx="90%" cy="40%" r="4" fill="var(--primary)" opacity="0.6" />
              </svg>

              <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                <h3 
                  className="text-white font-black"
                  style={{ 
                    fontFamily: 'var(--font-mono)', 
                    fontSize: 'clamp(2rem, 4vw, 3rem)', 
                    lineHeight: 1.1,
                    letterSpacing: '-0.02em',
                    textShadow: '0 4px 20px rgba(0,0,0,0.3)',
                    transform: 'translateZ(20px)',
                  }}
                >
                  Ready to automate everything?
                </h3>
                <p style={{ color: 'rgba(217,232,227,0.8)', fontSize: '1.05rem', fontWeight: 500, transform: 'translateZ(15px)' }}>
                  Join 10,000+ teams already scaling with NexaFlow
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4" style={{ transform: 'translateZ(15px)' }}>
                  <button
                    className="btn-premium-primary font-semibold"
                    style={{ padding: '14px 32px' }}
                    onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Start Free →
                  </button>
                  <button
                    className="btn-premium-outline font-semibold text-white"
                    style={{ padding: '14px 32px' }}
                    onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Talk to Sales
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ height: '2px', background: 'linear-gradient(90deg, transparent 0%, rgba(255,200,1,0.2) 15%, var(--primary) 40%, var(--warm) 60%, rgba(255,200,1,0.2) 85%, transparent 100%)', marginBottom: '4rem', opacity: 0.3 }} />

        {/* Footer Grid — Fix #16: added Resources column */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Column */}
          <div className="footer-brand-glow">
            <div className="flex items-center gap-2 mb-4 relative z-10">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 12px 6px 8px', borderRadius: '12px', background: 'rgba(255,200,1,0.1)', border: '1px solid rgba(255,200,1,0.25)', width: 'fit-content' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'var(--primary)', boxShadow: '0 0 8px var(--primary)', animation: 'pulse-glow 2s ease-in-out infinite' }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--primary)', fontSize: '1rem' }}>NexaFlow</span>
              </div>
            </div>
            <p className="text-sm relative z-10" style={{ color: 'rgba(217,232,227,0.65)' }}>
              Intelligent automation platform for modern businesses.
            </p>
            {/* Fix #1: real social URLs */}
            <div className="flex gap-3 mt-4 relative z-10">
              {[
                { name: 'Twitter', url: 'https://twitter.com' },
                { name: 'GitHub', url: 'https://github.com' },
                { name: 'LinkedIn', url: 'https://linkedin.com' },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', padding: '4px 10px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(217,232,227,0.6)', fontSize: '0.7rem', fontFamily: 'var(--font-sans)', fontWeight: 500, transition: 'all 150ms ease-out', textDecoration: 'none' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,200,1,0.4)'; (e.currentTarget as HTMLElement).style.color = 'var(--primary)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)'; (e.currentTarget as HTMLElement).style.color = 'rgba(217,232,227,0.6)'; }}
                >{social.name}</a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 style={{ color: 'rgba(255,255,255,0.9)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1rem', fontWeight: 700 }}>Product</h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.product.map((link) => (
                <li key={link.label}><a href={link.href} className="footer-link text-sm" style={{ color: 'rgba(217,232,227,0.55)' }}>{link.label}</a></li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 style={{ color: 'rgba(255,255,255,0.9)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1rem', fontWeight: 700 }}>Company</h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.label}><a href={link.href} className="footer-link text-sm" style={{ color: 'rgba(217,232,227,0.55)' }}>{link.label}</a></li>
              ))}
            </ul>
          </div>

          {/* Resources Links — Fix #16 */}
          <div>
            <h4 style={{ color: 'rgba(255,255,255,0.9)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1rem', fontWeight: 700 }}>Resources</h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.resources.map((link) => (
                <li key={link.label}><a href={link.href} className="footer-link text-sm" style={{ color: 'rgba(217,232,227,0.55)' }}>{link.label}</a></li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h4 style={{ color: 'rgba(255,255,255,0.9)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1rem', fontWeight: 700 }}>Newsletter</h4>
            <p className="text-sm mb-4" style={{ color: 'rgba(217,232,227,0.55)' }}>Get updates on new features and automation tips.</p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <input type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)}
                className="newsletter-input w-full px-3 py-2 text-sm transition-all"
                style={{ background: 'rgba(217,232,227,0.05)', border: '1px solid rgba(217,232,227,0.2)', borderRadius: '10px', color: 'white' }}
                required />
              <button type="submit" className="btn-premium-primary w-full py-2" disabled={isLoading}>
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="inline-block w-4 h-4 border-2 border-t-transparent rounded-full" style={{ borderColor: 'var(--surface)', borderTopColor: 'transparent', animation: 'spin 0.6s linear infinite' }} />
                    Subscribing…
                  </span>
                ) : subscribed ? '✓ Subscribed' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section — Fix #13: dynamic year, Fix #1: click feedback on legal links */}
        <div className="pt-8 border-t" style={{ borderColor: 'rgba(217,232,227,0.12)' }}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm" style={{ color: 'rgba(217,232,227,0.35)' }}>
              © {new Date().getFullYear()} NexaFlow. All rights reserved.
            </p>
            <div className="flex gap-6">
              {['Privacy Policy', 'Terms of Service', 'Cookies'].map((label) => (
                <a key={label} href="#" className="footer-link text-sm" style={{ color: 'rgba(217,232,227,0.55)' }}
                  onClick={(e) => { e.preventDefault(); alert(`${label} — Coming soon`); }}
                >{label}</a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Fix #19: Removed duplicate scroll-to-top button — ScrollToTop.tsx handles this */}
    </footer>
  );
}
