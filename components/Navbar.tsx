'use client';

import { useState, useEffect } from 'react';
import { Search } from './icons/Search';
import { XMark } from './icons/XMark';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl transition-all duration-300 ease-out"
        style={{
          backgroundColor: scrolled ? 'rgba(241, 245, 244, 0.85)' : 'transparent',
          borderBottom: scrolled ? '1px solid rgba(255, 200, 1, 0.2)' : '1px solid transparent',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: 'var(--primary)',
                boxShadow: '0 0 8px var(--primary)',
                animation: 'pulse-glow 2s ease-in-out infinite',
              }}
            />
            <span className="font-bold text-lg" style={{ color: 'var(--primary)', fontFamily: 'JetBrains Mono' }}>
              NexaFlow
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#platform" className="nav-link text-sm font-medium" style={{ color: 'var(--text)' }}>
              Platform
            </a>
            <a href="#features" className="nav-link text-sm font-medium" style={{ color: 'var(--text)' }}>
              Features
            </a>
            <a href="#pricing" className="nav-link text-sm font-medium" style={{ color: 'var(--text)' }}>
              Pricing
            </a>
            <a href="#about" className="nav-link text-sm font-medium" style={{ color: 'var(--text)' }}>
              About
            </a>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <button
              className="p-2 rounded-lg hover:opacity-70 transition-opacity"
              aria-label="Search"
            >
              <Search color="var(--text)" size={20} />
            </button>
            <button
              className="btn-shimmer hidden md:inline-block font-semibold text-sm hover:-translate-y-px transition-transform"
              style={{
                color: 'var(--surface)',
                borderRadius: '10px',
                padding: '10px 24px',
              }}
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
                <XMark color="var(--text)" size={24} />
              ) : (
                <div className="w-6 h-5 flex flex-col justify-center gap-1">
                  <span className="w-full h-0.5 transition-all" style={{ backgroundColor: 'var(--text)' }} />
                  <span className="w-full h-0.5 transition-all" style={{ backgroundColor: 'var(--text)' }} />
                  <span className="w-full h-0.5 transition-all" style={{ backgroundColor: 'var(--text)' }} />
                </div>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
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
            <a href="#platform" className="text-sm font-medium" style={{ color: 'var(--text)' }}>
              Platform
            </a>
            <a href="#features" className="text-sm font-medium" style={{ color: 'var(--text)' }}>
              Features
            </a>
            <a href="#pricing" className="text-sm font-medium" style={{ color: 'var(--text)' }}>
              Pricing
            </a>
            <a href="#about" className="text-sm font-medium" style={{ color: 'var(--text)' }}>
              About
            </a>
            <button
              className="btn-shimmer px-4 py-2 rounded-lg font-semibold text-sm w-full"
              style={{
                color: 'var(--surface)',
                borderRadius: '10px',
              }}
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </>
  );
}
