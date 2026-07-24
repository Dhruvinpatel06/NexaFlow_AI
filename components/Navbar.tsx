'use client';

import { useState, useEffect } from 'react';
import { Search } from './icons/Search';
import { XMark } from './icons/XMark';

const NAV_ITEMS = [
  { id: 'platform', label: 'Platform' },
  { id: 'features', label: 'Features' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'about', label: 'About' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [bannerClosed, setBannerClosed] = useState(true);

  // Read banner closed state from sessionStorage on mount
  useEffect(() => {
    const isClosed = sessionStorage.getItem('nexaflow_announcement_closed');
    if (!isClosed) {
      setBannerClosed(false);
    }
  }, []);

  const closeBanner = () => {
    setBannerClosed(true);
    sessionStorage.setItem('nexaflow_announcement_closed', 'true');
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver for active navigation link dot
  useEffect(() => {
    const sectionIds = ['hero', 'platform', 'features', 'pricing', 'about'];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        { threshold: 0.3 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
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
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsSearchOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isSearchOpen]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const linkColor = isDark ? 'white' : scrolled ? 'var(--dark)' : 'white';
  const navBgColor = scrolled
    ? isDark
      ? 'rgba(23,43,54,0.92)'
      : 'rgba(241,245,244,0.92)'
    : isDark
    ? 'rgba(17,76,90,0.15)'
    : 'rgba(23,43,54,0.0)';
  const uiColor = isDark ? 'white' : scrolled ? 'var(--text)' : 'white';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex flex-col pointer-events-none">
      {/* Announcement Bar ABOVE Navbar */}
      <div
        className="pointer-events-auto w-full transition-all duration-300 ease-in-out cursor-pointer overflow-hidden flex items-center justify-center relative"
        style={{
          height: bannerClosed ? 0 : 36,
          background: 'linear-gradient(90deg, var(--dark), #1a5f73)',
          transform: bannerClosed ? 'translateY(-100%)' : 'translateY(0)',
          opacity: bannerClosed ? 0 : 1,
        }}
        onClick={closeBanner}
      >
        <div className="flex items-center justify-center text-center w-full px-4" style={{ color: 'white', fontFamily: 'var(--font-inter)', fontWeight: 500, fontSize: '0.8125rem' }}>
          <span>
            🎉 NexaFlow raises $12M Series A — Read the announcement{' '}
            <span style={{ color: 'var(--primary)', fontWeight: 600 }}>→</span>
          </span>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className="pointer-events-auto w-full transition-all duration-300 ease-out"
        style={{
          backgroundColor: navBgColor,
          borderBottom: scrolled
            ? isDark
              ? '1px solid rgba(255,200,1,0.15)'
              : '1px solid rgba(255,200,1,0.2)'
            : '1px solid transparent',
          boxShadow: scrolled ? '0 4px 24px rgba(17,76,90,0.08)' : 'none',
          backdropFilter: scrolled ? 'blur(16px)' : isDark ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px)' : isDark ? 'blur(20px)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollTo('hero')}>
            <div style={{ position: 'relative', width: 10, height: 10, flexShrink: 0 }}>
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  backgroundColor: 'var(--primary)',
                  boxShadow: '0 0 0 3px rgba(255,200,1,0.2), 0 0 12px rgba(255,200,1,0.5)',
                  animation: 'pulse-glow 2s ease-in-out infinite',
                }}
              />
            </div>
            <span className="font-bold text-lg" style={{ color: 'var(--primary)', fontFamily: 'var(--font-mono)' }}>
              NexaFlow
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(item.id);
                  }}
                  className="nav-link text-sm font-medium relative"
                  style={{ color: linkColor }}
                >
                  {item.label}
                  <span
                    style={{
                      position: 'absolute',
                      bottom: -4,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: 4,
                      height: 4,
                      borderRadius: '50%',
                      background: 'var(--primary)',
                      opacity: isActive ? 1 : 0,
                      transition: 'opacity 200ms ease-out',
                    }}
                  />
                </a>
              );
            })}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <button
              className="p-2 rounded-lg hover:opacity-70 transition-opacity focus-ring"
              aria-label="Search"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search color={uiColor} size={20} />
            </button>

            {/* Dark mode toggle */}
            <button
              className="p-2 rounded-lg hover:opacity-70 transition-all duration-200 focus-ring"
              aria-label="Toggle dark mode"
              onClick={toggleDark}
              style={{ fontSize: '1.1rem' }}
            >
              <span
                style={{
                  display: 'inline-block',
                  transition: 'transform 200ms ease-out',
                  transform: isDark ? 'rotate(180deg)' : 'rotate(0deg)',
                }}
              >
                {isDark ? '☀️' : '🌙'}
              </span>
            </button>

            {/* Get Started CTA */}
            <button
              className="btn-premium-primary hidden md:inline-block focus-ring"
              style={{ padding: '10px 24px' }}
              onClick={() => scrollTo('pricing')}
            >
              Get Started
            </button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 focus-ring"
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

      {/* Search Bar Dropdown */}
      {isSearchOpen && (
        <div
          className="pointer-events-auto w-full px-6 py-3"
          style={{
            backgroundColor: 'var(--bg)',
            borderBottom: '1px solid rgba(255,200,1,0.2)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          }}
        >
          <input
            autoFocus
            placeholder="Search features, pricing, docs..."
            className="w-full max-w-2xl mx-auto block px-4 py-2 rounded-xl text-sm"
            style={{ background: 'white', border: '2px solid var(--primary)', outline: 'none', color: 'var(--text)' }}
            onKeyDown={(e) => e.key === 'Escape' && setIsSearchOpen(false)}
          />
        </div>
      )}

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="pointer-events-auto fixed inset-0 top-16 z-40 backdrop-blur-sm md:hidden"
          onClick={() => setMobileMenuOpen(false)}
          style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
        >
          <div
            className="bg-white border-b p-6 flex flex-col gap-4"
            onClick={(e) => e.stopPropagation()}
            style={{ borderColor: 'var(--primary)' }}
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(item.id);
                }}
                className="text-sm font-medium"
                style={{ color: 'var(--text)' }}
              >
                {item.label}
              </a>
            ))}
            <button
              className="btn-premium-primary px-4 py-2 w-full"
              onClick={() => scrollTo('pricing')}
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
