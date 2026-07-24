import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import InteractiveAIDemo from '@/components/InteractiveAIDemo';
import BentoAccordion from '@/components/BentoAccordion';
import Workflow3D from '@/components/Workflow3D';
import WhyNexaFlow from '@/components/WhyNexaFlow';
import StatsBar from '@/components/StatsBar';
import Testimonials from '@/components/Testimonials';
import Pricing from '@/components/Pricing';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/ScrollProgress';
import ScrollToTop from '@/components/ScrollToTop';
import SpotlightCursor from '@/components/SpotlightCursor';
import SceneCamera from '@/components/SceneCamera';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#030712] text-slate-100 relative overflow-hidden">
      <SpotlightCursor />
      <SceneCamera />
      <ScrollProgress />
      <Navbar />
      
      {/* 8-Scene Camera Travel Journey Flow */}
      <Hero />
      <InteractiveAIDemo />
      <BentoAccordion />
      <Workflow3D />
      <WhyNexaFlow />
      <StatsBar />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Footer />
      
      <ScrollToTop />
    </main>
  );
}
