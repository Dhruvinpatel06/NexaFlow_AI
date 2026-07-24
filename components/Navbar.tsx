'use client';

import { useState, useEffect } from 'react';
import { Search, X, Sparkles, Command } from 'lucide-react';

const NAV_ITEMS = [
  { id: 'demo', label: 'Playground' },
  { id: 'features', label: 'Capabilities' },
  { id: 'workflow', label: 'Architecture' },
  { id: 'why', label: 'Why NexaFlow' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'faq', label: 'FAQ' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex flex-col pointer-events-none">
      {/* Main Navbar */}
      <nav
        className={`pointer-events-auto w-full transition-all duration-300 ${
          scrolled
            ? 'bg-[#030712]/80 backdrop-blur-2xl border-b border-[rgba(0,240,255,0.15)] shadow-[0_10px_30px_rgba(0,0,0,0.5)] py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollTo('hero')}>
            <div className="relative w-8 h-8 rounded-lg bg-[rgba(0,240,255,0.15)] border border-[#00F0FF] flex items-center justify-center shadow-[0_0_15px_rgba(0,240,255,0.3)]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00F0FF] animate-pulse" />
            </div>
            <span className="font-mono font-extrabold text-xl tracking-tight text-white">
              NexaFlow <span className="gradient-text-cyan">AI</span>
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8 font-mono text-xs font-semibold tracking-wider uppercase">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(item.id);
                }}
                className="text-slate-400 hover:text-[#00F0FF] transition-colors relative py-1"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-[#00F0FF] hover:border-[#00F0FF]/40 transition-all cursor-pointer"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            <button
              onClick={() => scrollTo('pricing')}
              className="btn-premium-primary px-5 py-2.5 text-xs font-mono font-bold uppercase tracking-wider rounded-xl cursor-pointer"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="pointer-events-auto w-full bg-[#0B0F19] border-b border-[rgba(0,240,255,0.2)] p-4 shadow-2xl">
          <div className="max-w-2xl mx-auto flex items-center gap-3 bg-slate-950 px-4 py-2.5 rounded-xl border border-[rgba(0,240,255,0.3)]">
            <Search className="w-4 h-4 text-[#00F0FF]" />
            <input
              autoFocus
              placeholder="Search docs, features, enterprise SLAs..."
              className="w-full bg-transparent font-mono text-xs text-white outline-none placeholder-slate-500"
              onKeyDown={(e) => e.key === 'Escape' && setIsSearchOpen(false)}
            />
            <button onClick={() => setIsSearchOpen(false)} className="text-slate-500 hover:text-white font-mono text-xs">
              ESC
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
