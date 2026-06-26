'use client';

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import StatsBar from '@/components/StatsBar';
import BentoAccordion from '@/components/BentoAccordion';
import Pricing from '@/components/Pricing';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';

export default function LandingPage() {
  return (
    <main style={{ backgroundColor: 'var(--bg)' }}>
      <Navbar />
      <Hero />
      <StatsBar />
      <BentoAccordion />
      <Pricing />
      <Testimonials />
      <Footer />
      <ScrollToTop />
    </main>
  );
}
