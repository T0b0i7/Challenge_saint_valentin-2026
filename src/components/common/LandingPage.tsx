import { useState, useEffect } from 'react';
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
import { ParallaxSection, ParallaxFloat } from '@/components/common/ParallaxSection';
import { TransitionManager, usePageTransitions, useRandomTransition, TransitionType } from '@/components/common/TransitionManager';

const LandingPage = () => {
  const { currentTransition, isTransitioning, startTransition, endTransition } = usePageTransitions();
  const { getRandomTransition } = useRandomTransition();

  // Gérer les transitions entre les sections principales
  const [showTransition, setShowTransition] = useState(false);
  const [transitionType, setTransitionType] = useState<TransitionType>('curtain-3d');

  const handleSectionTransition = (random = false) => {
    const type = random ? getRandomTransition() : currentTransition;
    setTransitionType(type);
    setShowTransition(true);
  };

  return (
    <main className="overflow-hidden">
       {/* Hero Section */}
        <ParallaxSection speed={0.2}>
          <HeroSection />
        </ParallaxSection>
       
       {/* Why Section with Morphing */}
       <MorphingTransition>
         <WhySection />
       </MorphingTransition>
       
       {/* Product Section */}
       <ParallaxSection speed={0.15}>
         <ProductSection />
       </ParallaxSection>
       
       {/* Benefits Section */}
       <MorphingTransition>
         <BenefitsSection />
       </MorphingTransition>
       
       {/* Pricing Section */}
       <ParallaxSection speed={0.1}>
         <PricingSection />
       </ParallaxSection>
       
       {/* Reassurance Section */}
       <MorphingTransition>
         <ReassuranceSection />
       </MorphingTransition>
       
       {/* Testimonials Section */}
       <ParallaxSection speed={0.05}>
         <TestimonialsSection />
       </ParallaxSection>
       
       {/* Final CTA Section */}
       <MorphingTransition>
         <FinalCTASection />
       </MorphingTransition>
       
       {/* Footer */}
       <Footer />
       
       {/* Système de transitions global */}
       <TransitionManager 
         isActive={showTransition}
         transitionType={transitionType}
         onComplete={() => {
           setShowTransition(false);
           endTransition();
         }}
       />
    </main>
  );
};

export default LandingPage;
