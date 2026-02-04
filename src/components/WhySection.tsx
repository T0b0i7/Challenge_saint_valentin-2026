import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Heart, Moon, Phone, Gift } from 'lucide-react';

const reasons = [
  {
    icon: Heart,
    title: "Symbolise votre amour quotidien",
    description: "Chaque câlin à cette peluche est un rappel de votre tendresse, une étreinte qui ne s'arrête jamais.",
  },
  {
    icon: Moon,
    title: "Compagnon des nuits solitaires",
    description: "Quand la distance sépare deux cœurs, elle devient le gardien de vos rêves partagés.",
  },
  {
    icon: Phone,
    title: "Rappel tangible de votre présence",
    description: "Bien plus qu'une image sur un écran, une présence douce et réconfortante.",
  },
  {
    icon: Gift,
    title: "Un cadeau qui a du sens",
    description: "Dans un monde de cadeaux éphémères, offrez quelque chose qui durera.",
  },
];

export const WhySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="why" className="py-24 lg:py-32 bg-muted" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-widest mb-4">
            Pourquoi l'offrir ?
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
            Parce que certaines distances sont{' '}
            <span className="text-gradient italic">trop longues</span> à supporter
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-body">
            Cette peluche n'est pas qu'un simple jouet. C'est un pont entre deux cœurs, 
            un symbole de votre amour qui transcende l'espace.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card-romantic p-6 lg:p-8 text-center group"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-6 mx-auto transition-colors group-hover:bg-primary group-hover:text-primary-foreground"
              >
                <reason.icon className="w-8 h-8" />
              </motion.div>
              <h3 className="text-xl font-display font-semibold text-foreground mb-3">
                {reason.title}
              </h3>
              <p className="text-muted-foreground font-body leading-relaxed">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
