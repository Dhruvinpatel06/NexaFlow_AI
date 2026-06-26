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

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer
      className="pt-20 pb-8 px-6"
      style={{
        backgroundColor: 'var(--surface)',
        color: 'white',
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Top Border Gradient */}
        <div
          style={{
            height: '1px',
            background: 'linear-gradient(90deg, transparent 0%, var(--primary) 30%, var(--warm) 70%, transparent 100%)',
            marginBottom: '4rem',
          }}
        />

        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="footer-brand-glow">
            <div className="flex items-center gap-2 mb-4 relative z-10">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: 'var(--primary)' }}
              >
                N
              </div>
              <span className="font-bold text-lg" style={{ color: 'var(--primary)', fontFamily: 'JetBrains Mono' }}>
                NexaFlow
              </span>
            </div>
            <p className="text-sm relative z-10" style={{ color: '#b0b0b0' }}>
              Intelligent automation platform for modern businesses.
            </p>
            <div className="flex gap-3 mt-4 relative z-10">
              {['Twitter', 'GitHub', 'LinkedIn'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="footer-link text-sm"
                  style={{ color: '#808080' }}
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-bold mb-4" style={{ fontFamily: 'JetBrains Mono' }}>
              Product
            </h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.product.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="footer-link text-sm"
                    style={{ color: '#b0b0b0' }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-bold mb-4" style={{ fontFamily: 'JetBrains Mono' }}>
              Company
            </h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="footer-link text-sm"
                    style={{ color: '#b0b0b0' }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h4 className="font-bold mb-4" style={{ fontFamily: 'JetBrains Mono' }}>
              Newsletter
            </h4>
            <p className="text-sm mb-4" style={{ color: '#b0b0b0' }}>
              Get updates on new features and automation tips.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="newsletter-input w-full px-3 py-2 text-sm transition-all"
                style={{
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 200, 1, 0.2)',
                  borderRadius: '10px',
                  color: 'white',
                }}
                required
              />
              <button
                type="submit"
                className="btn-shimmer w-full px-3 py-2 text-sm font-semibold transition-all"
                style={{
                  color: 'var(--surface)',
                  borderRadius: '10px',
                }}
              >
                {subscribed ? '✓ Subscribed' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div
          className="pt-8 border-t"
          style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm" style={{ color: '#808080' }}>
              © 2024 NexaFlow. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="footer-link text-sm" style={{ color: '#b0b0b0' }}>
                Privacy Policy
              </a>
              <a href="#" className="footer-link text-sm" style={{ color: '#b0b0b0' }}>
                Terms of Service
              </a>
              <a href="#" className="footer-link text-sm" style={{ color: '#b0b0b0' }}>
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 p-3 rounded-lg opacity-0 hover:opacity-100 transition-all"
        style={{
          backgroundColor: 'var(--primary)',
          color: 'white',
        }}
        aria-label="Scroll to top"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="18 15 12 9 6 15" />
        </svg>
      </button>
    </footer>
  );
}
