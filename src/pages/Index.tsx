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
 import { CursorHeartTrail } from '@/components/CursorHeartTrail';
 import { PetalRainBackground } from '@/components/PetalRainBackground';
 import { HangingLoveHearts } from '@/components/HangingLoveHearts';
 import { MorphingTransition, WaveDivider, HeartDivider } from '@/components/MorphingTransition';
 import { ParallaxSection, ParallaxFloat } from '@/components/ParallaxSection';

const Index = () => {
  return (
    <main className="overflow-hidden">
       {/* Global Effects */}
       <CursorHeartTrail />
       <PetalRainBackground />
       <HeartCascade duration={6000} intensity="high" />
       
       {/* Hero Section */}
       <ParallaxSection speed={0.2}>
         <HeroSection />
       </ParallaxSection>
       
       {/* LOVE Animation - Between Hero and Content */}
       <section className="relative bg-gradient-to-b from-background via-muted to-background py-8">
         <WaveDivider color="hsl(var(--background))" flip />
         <div className="container mx-auto px-4">
           <HangingLoveHearts />
         </div>
         <WaveDivider color="hsl(var(--muted))" />
       </section>
       
       {/* Why Section with Morphing */}
       <MorphingTransition>
         <WhySection />
       </MorphingTransition>
       
       <HeartDivider />
       
       {/* Product with Parallax */}
       <ParallaxSection speed={0.15}>
         <ProductSection />
       </ParallaxSection>
       
       <WaveDivider color="hsl(var(--muted))" />
       
       {/* Benefits with Morphing */}
       <MorphingTransition>
         <BenefitsSection />
       </MorphingTransition>
       
       <HeartDivider />
       
       {/* Pricing with Parallax Float */}
       <ParallaxSection speed={0.1}>
         <PricingSection />
       </ParallaxSection>
       
       <WaveDivider color="hsl(var(--background))" />
       
       <ReassuranceSection />
       
       <HeartDivider />
       
       <MorphingTransition>
         <TestimonialsSection />
       </MorphingTransition>
       
       <WaveDivider color="hsl(var(--muted))" />
       
       {/* Heart Sync Experience */}
       <ParallaxSection speed={0.2}>
         <HeartSyncSection />
       </ParallaxSection>
       
       {/* Final CTA */}
       <FinalCTASection />
      <Footer />
    </main>
  );
};

export default Index;
