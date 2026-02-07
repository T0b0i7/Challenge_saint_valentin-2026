import { useState } from 'react';
import { HeroSection } from '@/components/sections/HeroSection';
import { WhySection } from '@/components/sections/WhySection';
import { ProductSection } from '@/components/sections/ProductSection';
import { BenefitsSection } from '@/components/sections/BenefitsSection';
import { PricingSection } from '@/components/sections/PricingSection';
import { ReassuranceSection } from '@/components/sections/ReassuranceSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { FinalCTASection } from '@/components/sections/FinalCTASection';
import { Footer } from '@/components/layout/Footer';
import { MorphingTransition, WaveDivider, HeartDivider } from '@/components/interactive/MorphingTransition';
import { ParallaxSection } from '@/components/common/ParallaxSection';
import { TransitionManager, usePageTransitions, useRandomTransition, type TransitionType } from '@/components/common/TransitionManager';

const Index = () => {
  const { currentTransition, isTransitioning, startTransition, endTransition } = usePageTransitions();
  const { getRandomTransition } = useRandomTransition();

  // Handle transitions between main sections
  const [showTransition, setShowTransition] = useState(false);
  const [transitionType, setTransitionType] = useState<TransitionType>('curtain-3d');

  const handleSectionTransition = (random = false) => {
    const type = random ? getRandomTransition() : currentTransition;
    setTransitionType(type as TransitionType);
    setShowTransition(true);
  };

  return (
    <main className="overflow-hidden">
       {/* Global transition system */}
       <TransitionManager 
         isActive={showTransition}
         transitionType={transitionType}
         onComplete={() => {
           setShowTransition(false);
           endTransition();
         }}
       />

       {/* Hero Section */}
       <ParallaxSection speed={0.2}>
         <HeroSection />
       </ParallaxSection>
       
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
       
       {/* Final CTA */}
       <FinalCTASection />
      <Footer />
    </main>
  );
};

export default Index;
