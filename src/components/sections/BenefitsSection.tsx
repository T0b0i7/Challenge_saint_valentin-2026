import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Heart } from 'lucide-react';

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

const benefits = [
  {
    title: "Pour quand le lit semble trop grand",
    description: "Elle comble le vide laissé par l'absence, offrant une présence réconfortante dans les moments de solitude.",
    emotion: "Réconfort",
  },
  {
    title: "Pour garder votre parfum près d'elle",
    description: "Imprégnez-la de votre fragrance préférée. Chaque câlin devient alors un moment de connexion intime.",
    emotion: "Intimité",
  },
  {
    title: "Pour les appels vidéo moins vides",
    description: "Une présence tangible durant vos conversations, un compagnon silencieux qui témoigne de votre amour.",
    emotion: "Connexion",
  },
];

export const BenefitsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 lg:py-32 bg-soft-pink relative overflow-hidden" ref={ref}>
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-widest mb-4">
            Bénéfices émotionnels
          </span>
          <AnimatedWaveTitle 
            text="Plus qu'une peluche, un témoin de votre histoire" 
            isInView={isInView}
          />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-body">
            Découvrez comment cette peluche transforme chaque moment d'absence 
            en une célébration de votre amour.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group"
            >
              <div className="card-romantic h-full p-8 text-center relative overflow-hidden">
                {/* Emotion Badge */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ delay: 0.3 + index * 0.15, type: "spring" }}
                  className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-6"
                >
                  <Heart className="w-3 h-3" fill="currentColor" />
                  {benefit.emotion}
                </motion.div>

                <h3 className="font-display font-semibold text-xl text-foreground mb-4 leading-tight">
                  "{benefit.title}"
                </h3>
                
                <p className="text-muted-foreground font-body leading-relaxed">
                  {benefit.description}
                </p>

                {/* Decorative Heart */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileHover={{ opacity: 0.1, scale: 1 }}
                  className="absolute -bottom-8 -right-8 text-primary"
                >
                  <Heart className="w-32 h-32" fill="currentColor" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
