import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Sparkles, Heart, Volume2, Package } from 'lucide-react';
import plushBear from '@/assets/images/pelluche_produit.jpg';

const features = [
  {
    icon: Sparkles,
    title: "Matière ultra-douce",
    description: "Tissu hypoallergénique premium, doux comme un nuage",
  },
  {
    icon: Heart,
    title: "Cœur brodé personnalisable",
    description: "Votre nom et date gravés pour l'éternité",
  },
  {
    icon: Volume2,
    title: "Message audio intégré",
    description: "Enregistrez votre voix pour des moments magiques",
  },
  {
    icon: Package,
    title: "Coffret cadeau premium",
    description: "Emballage luxueux prêt à offrir avec amour",
  },
];

export const ProductSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeFeature, setActiveFeature] = useState<number | null>(null);

  return (
    <section id="product" className="py-24 lg:py-32 bg-background" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-widest mb-4">
            Découvrez
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
            Chaque détail pensé avec{' '}
            <span className="text-gradient italic">amour</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="rounded-3xl overflow-hidden shadow-romantic bg-muted relative group"
              >
                <img
                  src={plushBear}
                  alt="Peluche Étreinte Éternelle"
                  className="w-full h-auto aspect-square object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Rose bloom on hover */}
                <motion.div
                  className="absolute top-6 right-6 text-3xl z-20 opacity-0 group-hover:opacity-100"
                  initial={{ scale: 0, rotate: -180 }}
                  whileHover={{ scale: 1.2 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  🌹
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            <div className="bg-muted rounded-2xl p-6 mb-8">
              <p className="text-foreground font-display text-xl italic leading-relaxed">
                "Une peluche qui ne se contente pas d'être belle, 
                elle porte en elle toute l'essence de votre amour."
              </p>
            </div>

            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                onMouseEnter={() => setActiveFeature(index)}
                onMouseLeave={() => setActiveFeature(null)}
                className={`flex items-start gap-4 p-5 rounded-2xl transition-all duration-300 cursor-pointer ${
                  activeFeature === index
                    ? 'bg-primary/5 shadow-card'
                    : 'hover:bg-muted'
                }`}
              >
                <motion.div
                  animate={activeFeature === index ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
                  className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                    activeFeature === index
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-primary/10 text-primary'
                  }`}
                >
                  <feature.icon className="w-6 h-6" />
                </motion.div>
                <div>
                  <h3 className="font-display font-semibold text-lg text-foreground mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground font-body">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
