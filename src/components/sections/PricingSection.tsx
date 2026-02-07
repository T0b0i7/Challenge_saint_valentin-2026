import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Check, Sparkles, Truck, Heart, Volume2, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { OfferModal } from '@/components/interactive/OfferModal';

const plans = [
  {
    name: "Offre Standard",
    price: 45000,
    description: "L'essentiel de l'amour",
    popular: false,
    features: [
      "Peluche premium 40cm",
      "Cœur brodé personnalisé",
      "Emballage cadeau luxe",
      "Carte de vœux calligraphiée",
      "Livraison offerte",
    ],
  },
  {
    name: "Offre Ultime",
    price: 75000,
    originalPrice: 95000,
    description: "L'expérience complète",
    popular: true,
    badge: "PLUS QUE 14 !",
    features: [
      "Tout inclus dans Standard",
      "Message audio enregistrable",
      "Parfum personnalisé inclus",
      "Livraison express 24h garantie",
      "Coffret premium collector",
      "Certificat d'authenticité",
    ],
  },
];

export const PricingSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [stockCount, setStockCount] = useState(14);
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [selectedOfferId, setSelectedOfferId] = useState<string | null>(null);

  useEffect(() => {
    // Simulate stock decreasing occasionally
    const interval = setInterval(() => {
      if (Math.random() > 0.7 && stockCount > 5) {
        setStockCount(prev => prev - 1);
      }
    }, 30000);
    return () => clearInterval(interval);
  }, [stockCount]);

  const handleOpenOfferModal = (offerId: string) => {
    setSelectedOfferId(offerId);
    setShowOfferModal(true);
  };

  const handleCloseOfferModal = () => {
    setShowOfferModal(false);
    setSelectedOfferId(null);
  };

  return (
    <section id="pricing" className="py-24 lg:py-32 bg-background" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-widest mb-4">
            Choisissez votre offre
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
            L'investissement le plus précieux :{' '}
            <span className="text-gradient italic">votre bonheur</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className={`relative rounded-3xl p-8 lg:p-10 ${
                plan.popular
                  ? 'bg-gradient-romantic text-primary-foreground shadow-hover scale-105'
                  : 'bg-card border border-border shadow-card'
              }`}
            >
              {plan.badge && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ delay: 0.5, type: "spring" }}
                  className="absolute -top-4 left-1/2 -translate-x-1/2 bg-card text-primary px-4 py-1.5 rounded-full text-sm font-bold shadow-lg flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  {plan.badge}
                </motion.div>
              )}

              <div className="text-center mb-8">
                <h3 className={`font-display text-2xl font-bold mb-2 ${
                  plan.popular ? 'text-primary-foreground' : 'text-foreground'
                }`}>
                  {plan.name}
                </h3>
                <p className={`text-sm mb-4 ${
                  plan.popular ? 'text-primary-foreground/80' : 'text-muted-foreground'
                }`}>
                  {plan.description}
                </p>
                <div className="flex items-baseline justify-center gap-2">
                  {plan.originalPrice && (
                    <span className="text-lg line-through opacity-60">
                      {plan.originalPrice.toLocaleString()} FCFA
                    </span>
                  )}
                  <span className="text-5xl font-display font-bold">
                    {plan.price.toLocaleString()} FCFA
                  </span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                      plan.popular ? 'bg-primary-foreground/20' : 'bg-primary/10'
                    }`}>
                      <Check className={`w-3 h-3 ${
                        plan.popular ? 'text-primary-foreground' : 'text-primary'
                      }`} />
                    </div>
                    <span className={`text-sm ${
                      plan.popular ? 'text-primary-foreground/90' : 'text-foreground'
                    }`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.popular ? "cta-white" : "romantic"}
                size="xl"
                className="w-full"
                onClick={() => handleOpenOfferModal(plan.name === 'Offre Ultime' ? 'ultimate' : 'standard')}
              >
                {plan.popular ? (
                  <>
                    <Heart className="w-5 h-5" fill="currentColor" />
                    Choisir cette offre
                  </>
                ) : (
                  'Sélectionner'
                )}
              </Button>

              {plan.popular && (
                <div className="flex items-center justify-center gap-2 mt-4 text-sm text-primary-foreground/80">
                  <Truck className="w-4 h-4" />
                  <span>Livré avant le 14 février garanti</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Stock Counter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-3 bg-primary/5 border border-primary/20 rounded-full px-6 py-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
            </span>
            <span className="text-foreground font-medium">
              Plus que <strong className="text-primary">{stockCount} offres Ultimes</strong> disponibles
            </span>
          </div>
        </motion.div>
      </div>

      <OfferModal 
        isOpen={showOfferModal}
        selectedOfferId={selectedOfferId}
        onClose={handleCloseOfferModal}
      />
    </section>
  );
};
