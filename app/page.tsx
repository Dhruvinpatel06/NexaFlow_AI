
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import StatsBar from '@/components/StatsBar';
import BentoAccordion from '@/components/BentoAccordion';
import Pricing from '@/components/Pricing';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import ScrollProgress from '@/components/ScrollProgress';
import { PricingProvider } from '@/lib/pricingContext';

export default function LandingPage() {
  return (
    <main role="main" style={{ backgroundColor: 'var(--bg)' }}>
      <ScrollProgress />
      <Navbar />
      <Hero />
      <StatsBar />
      <BentoAccordion />
      <PricingProvider>
        <Pricing />
      </PricingProvider>
      <Testimonials />
      <Footer />
      <ScrollToTop />
    </main>
  );
}
