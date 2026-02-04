import { HeroSection } from '@/components/HeroSection';
import { WhySection } from '@/components/WhySection';
import { ProductSection } from '@/components/ProductSection';
import { BenefitsSection } from '@/components/BenefitsSection';
import { PricingSection } from '@/components/PricingSection';
import { ReassuranceSection } from '@/components/ReassuranceSection';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { FinalCTASection } from '@/components/FinalCTASection';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <main className="overflow-hidden">
      <HeroSection />
      <WhySection />
      <ProductSection />
      <BenefitsSection />
      <PricingSection />
      <ReassuranceSection />
      <TestimonialsSection />
      <FinalCTASection />
      <Footer />
    </main>
  );
};

export default Index;
