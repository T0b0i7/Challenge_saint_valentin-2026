import { HeroSection } from '@/components/sections/HeroSection';
import { WhySection } from '@/components/sections/WhySection';
import { ProductSection } from '@/components/sections/ProductSection';
import { BenefitsSection } from '@/components/sections/BenefitsSection';
import { PricingSection } from '@/components/sections/PricingSection';
import { ReassuranceSection } from '@/components/sections/ReassuranceSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { HeartSyncSection } from '@/components/sections/HeartSyncSection';
import { Plush3DSection } from '@/components/sections/Plush3DSection';
import { FinalCTASection } from '@/components/sections/FinalCTASection';
import { Footer } from '@/components/layout/Footer';
import { HeartCascade } from '@/components/effects/HeartCascade';
import { CursorHeartTrail } from '@/components/effects/CursorHeartTrail';
import { PetalRainBackground } from '@/components/effects/PetalRainBackground';
import { HangingLoveHearts } from '@/components/effects/HangingLoveHearts';
import { MorphingTransition, WaveDivider, HeartDivider } from '@/components/interactive/MorphingTransition';
import { ParallaxSection, ParallaxFloat } from '@/components/common/ParallaxSection';

const LandingPage = () => {
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
       <section className="relative bg-gradient-to-b from-background via-muted to-background py-8 sm:py-12 lg:py-16">
         <WaveDivider color="hsl(var(--background))" flip />
         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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

       {/* 3D Plush Experience */}
       <Plush3DSection />
       
       {/* Final CTA */}
       <FinalCTASection />
      <Footer />
    </main>
  );
};

export default LandingPage;
