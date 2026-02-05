import { HeroSection } from '@/components/HeroSection';
import { WhySection } from '@/components/WhySection';
import { ProductSection } from '@/components/ProductSection';
import { BenefitsSection } from '@/components/BenefitsSection';
import { PricingSection } from '@/components/PricingSection';
import { ReassuranceSection } from '@/components/ReassuranceSection';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { HeartSyncSection } from '@/components/HeartSyncSection';
import { FinalCTASection } from '@/components/FinalCTASection';
import { Footer } from '@/components/Footer';
 import { HeartCascade } from '@/components/HeartCascade';

const Index = () => {
  return (
    <main className="overflow-hidden">
       <HeartCascade duration={6000} intensity="high" />
      <HeroSection />
      <WhySection />
      <ProductSection />
      <BenefitsSection />
      <PricingSection />
      <ReassuranceSection />
      <TestimonialsSection />
      <HeartSyncSection />
      <FinalCTASection />
      <Footer />
    </main>
  );
};

export default Index;
