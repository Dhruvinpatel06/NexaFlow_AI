'use client';

import { useState, useEffect } from 'react';
import { Search } from './icons/Search';
import { XMark } from './icons/XMark';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Dark mode: read from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('nexaflow-theme');
    if (saved === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDark = () => {
    const next = !isDark;
    setIsDark(next);
    if (next) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('nexaflow-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('nexaflow-theme', 'light');
    }
  };

  // Close search on Escape
  useEffect(() => {
    if (!isSearchOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsSearchOpen(false); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isSearchOpen]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const linkColor = isDark ? 'white' : (scrolled ? 'var(--dark)' : 'white');
  const navBgColor = scrolled
    ? (isDark ? 'rgba(23,43,54,0.96)' : 'rgba(241,246,244,0.92)')
    : (isDark ? 'rgba(17,76,90,0.15)' : 'rgba(23,43,54,0.0)');
  const uiColor = isDark ? 'white' : (scrolled ? 'var(--text)' : 'white');

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out"
        style={{
          backgroundColor: navBgColor,
          borderBottom: scrolled ? (isDark ? '1px solid rgba(255,200,1,0.15)' : '1px solid rgba(255,200,1,0.25)') : '1px solid transparent',
          boxShadow: scrolled ? '0 4px 24px rgba(17,76,90,0.08)' : 'none',
          backdropFilter: scrolled ? 'blur(12px)' : (isDark ? 'blur(20px)' : 'none'),
          WebkitBackdropFilter: scrolled ? 'blur(12px)' : (isDark ? 'blur(20px)' : 'none'),
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollTo('hero')}>
            <div style={{ position: 'relative', width: 10, height: 10, flexShrink: 0 }}>
              <div style={{
                width: 10, height: 10, borderRadius: '50%',
                backgroundColor: 'var(--primary)',
                boxShadow: '0 0 0 3px rgba(255,200,1,0.2), 0 0 12px rgba(255,200,1,0.5)',
                animation: 'pulse-glow 2s ease-in-out infinite',
              }} />
            </div>
            <span className="font-bold text-lg" style={{ color: 'var(--primary)', fontFamily: 'var(--font-mono)' }}>
              NexaFlow
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#platform" onClick={(e) => { e.preventDefault(); scrollTo('platform'); }} className="nav-link text-sm font-medium" style={{ color: linkColor }}>
              Platform
            </a>
            <a href="#features" onClick={(e) => { e.preventDefault(); scrollTo('features'); }} className="nav-link text-sm font-medium" style={{ color: linkColor }}>
              Features
            </a>
            <a href="#pricing" onClick={(e) => { e.preventDefault(); scrollTo('pricing'); }} className="nav-link text-sm font-medium" style={{ color: linkColor }}>
              Pricing
            </a>
            <a href="#about" onClick={(e) => { e.preventDefault(); scrollTo('about'); }} className="nav-link text-sm font-medium" style={{ color: linkColor }}>
              About
            </a>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <button
              className="p-2 rounded-lg hover:opacity-70 transition-opacity"
              aria-label="Search"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search color={uiColor} size={20} />
            </button>

            {/* Dark mode toggle */}
            <button
              className="p-2 rounded-lg hover:opacity-70 transition-all duration-200"
              aria-label="Toggle dark mode"
              onClick={toggleDark}
              style={{ fontSize: '1.1rem' }}
            >
              <span style={{ display: 'inline-block', transition: 'transform 200ms ease-out', transform: isDark ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                {isDark ? '☀️' : '🌙'}
              </span>
            </button>

            {/* Get Started CTA */}
            <button
              className="btn-premium-primary hidden md:inline-block"
              style={{ padding: '10px 24px' }}
              onClick={() => scrollTo('pricing')}
            >
              Get Started
            </button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <XMark color={uiColor} size={24} />
              ) : (
                <div className="w-6 h-5 flex flex-col justify-center gap-1">
                  <span className="w-full h-0.5 transition-all" style={{ backgroundColor: uiColor }} />
                  <span className="w-full h-0.5 transition-all" style={{ backgroundColor: uiColor }} />
                  <span className="w-full h-0.5 transition-all" style={{ backgroundColor: uiColor }} />
                </div>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Search Bar Dropdown — Fix #20 */}
      {isSearchOpen && (
        <div
          className="fixed top-16 left-0 right-0 z-40 px-6 py-3"
          style={{ backgroundColor: 'var(--bg)', borderBottom: '1px solid rgba(255,200,1,0.2)', boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}
        >
          <input
            autoFocus
            placeholder="Search features, pricing, docs..."
            className="w-full max-w-2xl mx-auto block px-4 py-2 rounded-xl"
            style={{ background: 'white', border: '2px solid var(--primary)', outline: 'none', color: 'var(--text)' }}
            onKeyDown={(e) => e.key === 'Escape' && setIsSearchOpen(false)}
          />
        </div>
      )}

      {/* Mobile Menu Overlay — Fix #15: close on link click */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 top-16 z-40 backdrop-blur-sm md:hidden"
          onClick={() => setMobileMenuOpen(false)}
          style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
        >
          <div
            className="bg-white border-b p-6 flex flex-col gap-4"
            onClick={(e) => e.stopPropagation()}
            style={{ borderColor: 'var(--primary)' }}
          >
            <a href="#platform" onClick={(e) => { e.preventDefault(); scrollTo('platform'); }} className="text-sm font-medium" style={{ color: 'var(--text)' }}>Platform</a>
            <a href="#features" onClick={(e) => { e.preventDefault(); scrollTo('features'); }} className="text-sm font-medium" style={{ color: 'var(--text)' }}>Features</a>
            <a href="#pricing" onClick={(e) => { e.preventDefault(); scrollTo('pricing'); }} className="text-sm font-medium" style={{ color: 'var(--text)' }}>Pricing</a>
            <a href="#about" onClick={(e) => { e.preventDefault(); scrollTo('about'); }} className="text-sm font-medium" style={{ color: 'var(--text)' }}>About</a>
            <button
              className="btn-premium-primary px-4 py-2 w-full"
              onClick={() => scrollTo('pricing')}
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </>
  );
}
