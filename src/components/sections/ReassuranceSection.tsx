import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Shield, Truck, RotateCcw, Heart } from 'lucide-react';

const guarantees = [
  {
    icon: Shield,
    title: "Garantie Cœur",
    description: "30 jours pour changer d'avis, sans condition ni question",
  },
  {
    icon: Truck,
    title: "Livraison Offerte",
    description: "Expédition gratuite dès 59€, partout au Bénin métropolitaine",
  },
  {
    icon: RotateCcw,
    title: "Retours Acceptés",
    description: "14 jours pour retourner votre commande, remboursement intégral",
  },
  {
    icon: Heart,
    title: "1€ reversé",
    description: "Pour chaque achat, 1€ reversé à la lutte contre l'isolement",
  },
];

export const ReassuranceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 lg:py-32 bg-muted" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-widest mb-4">
            Nos engagements
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
            Nous prenons soin de votre cœur{' '}
            <span className="text-gradient italic">comme du nôtre</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {guarantees.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center p-6"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 10 }}
                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-card shadow-card text-primary mb-6"
              >
                <item.icon className="w-8 h-8" />
              </motion.div>
              <h3 className="font-display font-semibold text-xl text-foreground mb-3">
                {item.title}
              </h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap justify-center gap-6 mt-12 pt-12 border-t border-border"
        >
          <div className="flex items-center gap-2 text-muted-foreground">
            <span className="text-2xl">🇫🇷</span>
            <span className="text-sm font-medium">Fabriqué au Bénin</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <span className="text-2xl">🔒</span>
            <span className="text-sm font-medium">Paiement 100% sécurisé</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <span className="text-2xl">⭐</span>
            <span className="text-sm font-medium">4.9/5 sur 1200+ avis</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
