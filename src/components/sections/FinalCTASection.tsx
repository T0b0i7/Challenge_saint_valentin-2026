import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Heart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CountdownTimer } from '../interactive/CountdownTimer';
import plushBearRibbon from '@/assets/images/plush-bear-ribbon.jpg';

export const FinalCTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative py-24 lg:py-32 bg-gradient-hero overflow-hidden" ref={ref}>
      {/* Floating Hearts */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-primary-foreground/10"
            initial={{ 
              x: Math.random() * 100 + '%', 
              y: '100%' 
            }}
            animate={{ 
              y: '-20%',
              x: `${Math.random() * 100}%`,
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear",
            }}
          >
            <Heart size={30 + Math.random() * 50} fill="currentColor" />
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-display font-bold text-primary-foreground leading-tight mb-6"
            >
              Parce que certaines étreintes ne devraient{' '}
              <span className="italic">jamais s'arrêter</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="text-lg sm:text-xl text-primary-foreground/90 mb-8 font-body font-light"
            >
              Offrez plus qu'un cadeau. Offrez une présence, un réconfort, 
              un morceau de vous qui restera près de ceux que vous aimez.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10"
            >
              <Button
                variant="cta-white"
                size="xl"
                onClick={() => scrollToSection('pricing')}
                className="group text-lg"
              >
                <Heart className="w-5 h-5 heartbeat" fill="currentColor" />
                Je fais le choix de l'amour
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>

            {/* Countdown */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
            >
              <p className="text-sm text-primary-foreground/70 mb-4 font-body uppercase tracking-widest">
                Temps restant pour une livraison le 14 février
              </p>
              <CountdownTimer />
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <img
                src={plushBearRibbon}
                alt="Peluche Étreinte Éternelle avec ruban"
                className="w-full max-w-md mx-auto rounded-3xl shadow-2xl"
              />
            </motion.div>

            {/* Glow */}
            <div className="absolute inset-0 bg-primary-foreground/10 rounded-3xl blur-3xl -z-10 scale-110" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
