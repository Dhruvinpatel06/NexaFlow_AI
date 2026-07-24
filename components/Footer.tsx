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
      className="pt-16 pb-8 px-6 relative overflow-hidden"
      style={{
        backgroundColor: 'var(--bg)',
        color: 'white',
      }}
    >
      {/* Top Gradient Line with Glow Accent */}
      <div className="relative mb-14">
        {/* Glow accent */}
        <div
          style={{
            position: 'absolute',
            top: -2,
            left: 0,
            right: 0,
            height: 6,
            background: 'linear-gradient(90deg, transparent 0%, rgba(0,212,255,0.8) 20%, rgba(255,200,1,0.8) 50%, rgba(255,107,53,0.8) 80%, transparent 100%)',
            filter: 'blur(4px)',
            opacity: 0.5,
          }}
        />
        {/* 2px Gradient Line */}
        <div
          style={{
            height: 2,
            width: '100%',
            background: 'linear-gradient(90deg, transparent 0%, rgba(0,212,255,0.8) 20%, rgba(255,200,1,0.8) 50%, rgba(255,107,53,0.8) 80%, transparent 100%)',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Column */}
          <div className="footer-brand-glow reveal-up">
            <div className="flex items-center gap-2 mb-4 relative z-10">
              <div style={{ display: 'flex', items: 'center', gap: 8, padding: '6px 12px 6px 8px', borderRadius: '12px', background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.25)', width: 'fit-content' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'var(--primary)', boxShadow: '0 0 8px var(--primary)', animation: 'pulse-ring 2s infinite' }} />
                <span className="gradient-text-cyan" style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '1rem' }}>
                  NexaFlow
                </span>
              </div>
            </div>
            <p className="text-sm relative z-10 mb-4" style={{ color: 'var(--muted)' }}>
              Intelligent automation platform for modern businesses.
            </p>

            {/* 40x40px Rounded 10px Social Icon Buttons */}
            <div className="flex gap-3 relative z-10">
              {[
                {
                  name: 'Twitter',
                  url: 'https://twitter.com',
                  svg: (
                    <svg width="18" height="18" fill="var(--primary)" viewBox="0 0 24 24">
                      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                    </svg>
                  ),
                },
                {
                  name: 'GitHub',
                  url: 'https://github.com/Dhruvinpatel06/NexaFlow_AI',
                  svg: (
                    <svg width="18" height="18" fill="var(--primary)" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                  ),
                },
                {
                  name: 'LinkedIn',
                  url: 'https://www.linkedin.com/in/dhruvin-patel-14a741310',
                  svg: (
                    <svg width="18" height="18" fill="var(--primary)" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  ),
                },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: 'rgba(0,212,255,0.06)',
                    border: '1px solid rgba(0,212,255,0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 150ms ease-out',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(0,212,255,0.12)';
                    e.currentTarget.style.borderColor = 'rgba(0,212,255,0.4)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(0,212,255,0.06)';
                    e.currentTarget.style.borderColor = 'rgba(0,212,255,0.12)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {social.svg}
                </a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 style={{ color: 'white', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1rem', fontWeight: 700 }}>
              Product
            </h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.product.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm transition-colors duration-150"
                    style={{ color: 'var(--muted)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--primary)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 style={{ color: 'white', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1rem', fontWeight: 700 }}>
              Company
            </h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm transition-colors duration-150"
                    style={{ color: 'var(--muted)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--primary)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 style={{ color: 'white', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1rem', fontWeight: 700 }}>
              Resources
            </h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.resources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm transition-colors duration-150"
                    style={{ color: 'var(--muted)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--primary)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h4 style={{ color: 'white', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1rem', fontWeight: 700 }}>
              Newsletter
            </h4>
            <p className="text-sm mb-4" style={{ color: 'var(--muted)' }}>
              Get updates on new features and automation tips.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 text-sm transition-all rounded-[10px] focus-ring"
                style={{
                  background: 'rgba(0,212,255,0.04)',
                  border: '1px solid rgba(0,212,255,0.15)',
                  color: 'white',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'var(--primary)';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(0,212,255,0.1)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(0,212,255,0.15)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                required
              />
              <button
                type="submit"
                className="w-full py-2.5 rounded-[10px] font-bold text-sm transition-all focus-ring cursor-pointer"
                style={{
                  background: 'var(--primary)',
                  color: 'var(--bg)',
                  fontWeight: 700,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(0,212,255,0.4)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="inline-block w-4 h-4 border-2 border-t-transparent rounded-full" style={{ borderColor: 'var(--bg)', borderTopColor: 'transparent', animation: 'spin 0.6s linear infinite' }} />
                    Subscribing…
                  </span>
                ) : subscribed ? (
                  '✓ Subscribed'
                ) : (
                  'Subscribe'
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t" style={{ borderColor: 'rgba(0,212,255,0.06)' }}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs" style={{ color: 'var(--muted)', fontFamily: 'var(--font-inter)' }}>
              © {new Date().getFullYear()} NexaFlow. All rights reserved.
            </p>
            <div className="flex gap-6">
              {['Privacy Policy', 'Terms of Service', 'Cookies'].map((label) => (
                <a
                  key={label}
                  href="#"
                  className="text-xs transition-colors duration-150"
                  style={{ color: 'var(--muted)' }}
                  onClick={(e) => {
                    e.preventDefault();
                    alert(`${label} — Coming soon`);
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--primary)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
