import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Check, Sparkles, Truck, Heart, Volume2, Package, QrCode, Receipt } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { OfferModal } from '@/components/interactive/OfferModal';
import { PaymentForm } from '@/components/interactive/PaymentForm';

const AnimatedWaveTitle = ({ text, isInView }: { text: string; isInView: boolean }) => {
  const words = text.split(' ');
  const [hoveredWordIndex, setHoveredWordIndex] = useState<number | null>(null);

  return (
    <h2 
      className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6 cursor-pointer"
      onMouseLeave={() => setHoveredWordIndex(null)}
    >
      {words.map((word, wordIdx) => (
        <motion.span
          key={wordIdx}
          className="inline-block mr-3"
          onMouseEnter={() => setHoveredWordIndex(wordIdx)}
          initial={{ opacity: 0, y: 20, rotateX: 90 }}
          animate={isInView ? { 
            opacity: 1, 
            y: 0, 
            rotateX: 0
          } : {}}
          transition={{
            duration: 0.6,
            delay: wordIdx * 0.1,
            ease: "easeOut"
          }}
        >
          <motion.span
            className="relative inline-block"
            animate={{
              ...(hoveredWordIndex === wordIdx ? {
                y: [0, -8, 0, -8, 0],
              } : {}),
              textShadow: isInView ? [
                "0 0 0px rgba(255,20,147,0)",
                "0 0 20px rgba(255,20,147,0.6)",
                "0 0 0px rgba(255,20,147,0)"
              ] : "0 0 0px rgba(255,20,147,0)"
            }}
            transition={{
              y: {
                duration: 0.6,
                ease: "easeInOut"
              },
              textShadow: {
                duration: 2,
                delay: wordIdx * 0.1 + 0.3,
                repeat: Infinity
              }
            }}
          >
            {word.split('').map((char, charIdx) => (
              <motion.span
                key={charIdx}
                className="inline-block"
                animate={hoveredWordIndex === wordIdx ? {
                  y: [0, -10, 0],
                } : {
                  y: 0
                }}
                transition={{
                  duration: hoveredWordIndex === wordIdx ? 0.5 : 0.3,
                  delay: hoveredWordIndex === wordIdx ? charIdx * 0.05 : 0,
                  repeat: hoveredWordIndex === wordIdx ? Infinity : 0,
                  ease: "easeInOut"
                }}
              >
                {char}
              </motion.span>
            ))}
          </motion.span>
        </motion.span>
      ))}
    </h2>
  );
};

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
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);

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

  const handlePayment = (plan: any) => {
    setSelectedPlan(plan);
    setShowPaymentForm(true);
  };

  const handleClosePaymentForm = () => {
    setShowPaymentForm(false);
    setSelectedPlan(null);
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
          <AnimatedWaveTitle 
            text="L'investissement le plus précieux : votre bonheur" 
            isInView={isInView}
          />
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
                onClick={() => handlePayment(plan)}
              >
                {plan.popular ? (
                  <>
                    <Heart className="w-5 h-5" fill="currentColor" />
                    Payer maintenant
                  </>
                ) : (
                  'Payer maintenant'
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

        {/* Facture avec QR Code */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-20 max-w-2xl mx-auto"
        >
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl shadow-xl p-8 border border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Receipt className="w-6 h-6 text-slate-600" />
                <h3 className="text-xl font-bold text-slate-800">Facture Proforma</h3>
              </div>
              <div className="text-sm text-slate-500">
                #FAC-2026-0214
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Détails de la facture */}
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-slate-700 mb-2">Informations</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Date:</span>
                      <span className="text-slate-800 font-medium">14/02/2026</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Client:</span>
                      <span className="text-slate-800 font-medium">Valentine's Lover</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Produit:</span>
                      <span className="text-slate-800 font-medium">Peluche Éternelle</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Quantité:</span>
                      <span className="text-slate-800 font-medium">1 unité</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-700 mb-2">Paiement</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Montant:</span>
                      <span className="text-slate-800 font-medium">75 000 FCFA</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Méthode:</span>
                      <span className="text-slate-800 font-medium">Mobile Money / Wave</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Statut:</span>
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                        En attente
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* QR Code */}
              <div className="flex flex-col items-center justify-center">
                <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-slate-200">
                  <div className="text-center mb-4">
                    <QrCode className="w-16 h-16 text-slate-700 mx-auto mb-2" />
                    <p className="text-sm font-medium text-slate-700">Scanner pour payer</p>
                  </div>
                  <div className="text-xs text-slate-600 space-y-1">
                    <p>• Mobile Money: +221 123 456 789</p>
                    <p>• Wave: +221 987 654 321</p>
                    <p>• Référence: ETERNAL-LOVE-2026</p>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">
                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse"></span>
                    QR Code Valide 48h
                  </div>
                </div>
              </div>
            </div>

            {/* Footer facture */}
            <div className="mt-6 pt-6 border-t border-slate-200 text-center">
              <p className="text-xs text-slate-500 mb-2">
                Merci pour votre confiance ! Cette peluche symbolise un amour éternel.
              </p>
              <div className="flex items-center justify-center gap-4 text-xs text-slate-400">
                <span>© 2026 Peluche Éternelle</span>
                <span>•</span>
                <span>support@peluche-eternelle.com</span>
                <span>•</span>
                <span>+221 123 456 789</span>
              </div>
            </div>
          </div>
        </motion.div>

      </div>

      <PaymentForm
        isOpen={showPaymentForm}
        onClose={handleClosePaymentForm}
        amount={selectedPlan?.price || 0}
        productName={selectedPlan?.name || ''}
      />

      <OfferModal 
        isOpen={showOfferModal}
        selectedOfferId={selectedOfferId}
        onClose={handleCloseOfferModal}
      />
    </section>
  );
};
