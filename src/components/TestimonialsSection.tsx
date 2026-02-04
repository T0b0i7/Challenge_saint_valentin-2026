import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    name: "Marie & Pierre",
    location: "Paris",
    text: "Elle dort avec depuis un mois. Chaque soir, c'est comme si j'étais là, à ses côtés. Cette peluche a transformé notre relation à distance.",
    rating: 5,
    avatar: "👩‍❤️‍👨",
  },
  {
    name: "Sarah",
    location: "Lyon",
    text: "Mon mari déployé l'a reçue. Il m'a dit que c'est comme si j'étais là avec lui. Les moments difficiles sont moins lourds maintenant.",
    rating: 5,
    avatar: "💑",
  },
  {
    name: "Julien & Emma",
    location: "Bordeaux",
    text: "On s'est offert chacun une peluche. Maintenant, même à 800km l'un de l'autre, on a l'impression de s'endormir ensemble.",
    rating: 5,
    avatar: "❤️",
  },
  {
    name: "Claire",
    location: "Marseille",
    text: "J'ai offert cette peluche à ma grand-mère qui vit seule. Elle me dit que ça lui rappelle mes câlins d'enfant. Précieux.",
    rating: 5,
    avatar: "👵🏻",
  },
];

export const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-24 lg:py-32 bg-background" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-widest mb-4">
            Témoignages
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
            Ils ont fait le choix de l'amour,{' '}
            <span className="text-gradient italic">et vous ?</span>
          </h2>
        </motion.div>

        {/* Featured Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto mb-12"
        >
          <div className="card-romantic p-8 lg:p-12 text-center relative">
            <Quote className="absolute top-6 left-6 w-8 h-8 text-primary/20" />
            
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-center mb-4">
                {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              
              <p className="text-xl lg:text-2xl font-display text-foreground italic leading-relaxed mb-6">
                "{testimonials[activeIndex].text}"
              </p>
              
              <div className="flex items-center justify-center gap-3">
                <span className="text-3xl">{testimonials[activeIndex].avatar}</span>
                <div className="text-left">
                  <p className="font-semibold text-foreground">{testimonials[activeIndex].name}</p>
                  <p className="text-sm text-muted-foreground">{testimonials[activeIndex].location}</p>
                </div>
              </div>
            </motion.div>

            {/* Navigation */}
            <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 flex justify-between pointer-events-none">
              <button
                onClick={prevTestimonial}
                className="w-10 h-10 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors pointer-events-auto"
                aria-label="Témoignage précédent"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextTestimonial}
                className="w-10 h-10 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors pointer-events-auto"
                aria-label="Témoignage suivant"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === activeIndex
                    ? 'w-8 bg-primary'
                    : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
                aria-label={`Voir témoignage ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="bg-gradient-romantic rounded-3xl p-8 lg:p-12 text-center"
        >
          <div className="grid sm:grid-cols-3 gap-8">
            <div>
              <motion.span
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.6 }}
                className="block text-5xl lg:text-6xl font-display font-bold text-primary-foreground"
              >
                94%
              </motion.span>
              <p className="text-primary-foreground/80 mt-2">
                se sentent plus proches
              </p>
            </div>
            <div>
              <motion.span
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.7 }}
                className="block text-5xl lg:text-6xl font-display font-bold text-primary-foreground"
              >
                12K+
              </motion.span>
              <p className="text-primary-foreground/80 mt-2">
                couples réunis
              </p>
            </div>
            <div>
              <motion.span
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.8 }}
                className="block text-5xl lg:text-6xl font-display font-bold text-primary-foreground"
              >
                4.9★
              </motion.span>
              <p className="text-primary-foreground/80 mt-2">
                note moyenne
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
