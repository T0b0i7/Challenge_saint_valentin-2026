import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
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

// Typewriter Effect Component
const TypewriterText = ({ text, isInView }: { text: string; isInView: boolean }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (isInView && !isTyping) {
      setIsTyping(true);
      setDisplayedText('');
      let currentIndex = 0;

      const typeInterval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(typeInterval);
          setIsTyping(false);
        }
      }, 30);

      return () => clearInterval(typeInterval);
    }
  }, [isInView, text, isTyping]);

  return (
    <span>
      {displayedText}
    </span>
  );
};

// Notification de rappel d'offre
const OfferNotification = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  
  useEffect(() => {
    // Vérifier si l'utilisateur a déjà fermé la notification
    const hasDismissed = localStorage.getItem('offer-notification-dismissed');
    if (hasDismissed) {
      setDismissed(true);
      return;
    }
    
    // Afficher la notification toutes les 2 minutes
    const notificationInterval = setInterval(() => {
      if (!dismissed) {
        setShowNotification(true);
      }
    }, 120000); // 2 minutes
    
    // Afficher la première fois après 30 secondes
    const firstTimer = setTimeout(() => {
      if (!dismissed) {
        setShowNotification(true);
      }
    }, 30000);
    
    return () => {
      clearInterval(notificationInterval);
      clearTimeout(firstTimer);
    };
  }, [dismissed]);
  
  const handleDismiss = () => {
    setShowNotification(false);
    setDismissed(true);
    localStorage.setItem('offer-notification-dismissed', 'true');
  };
  
  if (!showNotification || dismissed) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 50 }}
      className="fixed bottom-4 xs:bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-40"
    >
      <div className="bg-white rounded-xl xs:rounded-2xl shadow-2xl p-4 xs:p-5 sm:p-6 max-w-xs mx-3 xs:mx-4 relative border-4 border-red-500">
        {/* Badge de notification */}
        <div className="absolute -top-2 xs:-top-2 sm:-top-3 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-2 xs:px-3 py-0.5 xs:py-1 rounded-full text-xs font-bold animate-pulse">
          🔥 OFFRE
        </div>
        
        <div className="text-center pt-1">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-2xl xs:text-3xl sm:text-4xl mb-2 xs:mb-3"
          >
            🎁
          </motion.div>
          
          <h3 className="text-sm xs:text-base sm:text-lg font-bold text-gray-800 mb-1 xs:mb-2">
            Ne manquez pas cette chance !
          </h3>
          
          <p className="text-xs xs:text-xs sm:text-sm text-gray-600 mb-3 xs:mb-4">
            Offre spéciale Valentine - Livraison gratuite
          </p>
          
          <div className="flex gap-1 xs:gap-2 sm:gap-3 justify-center flex-wrap">
            <motion.button
              className="bg-red-500 text-white px-2 xs:px-3 sm:px-4 py-1 xs:py-1.5 sm:py-2 rounded-full font-bold text-xs xs:text-xs sm:text-sm hover:bg-red-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                window.location.href = '#commander';
              }}
            >
              🛒 COMMANDER
            </motion.button>
            
            <button
              className="text-gray-400 hover:text-gray-600 text-xs xs:text-sm underline"
              onClick={handleDismiss}
            >
              ✕
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Animation de suspense et d'innovation
const UrgencyAnimation = ({ isInView }: { isInView: boolean }) => {
  const [countdown, setCountdown] = useState(60);
  const [showOffer, setShowOffer] = useState(false);
  
  useEffect(() => {
    if (isInView && !showOffer) {
      const timer = setTimeout(() => {
        setShowOffer(true);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [isInView, showOffer]);
  
  useEffect(() => {
    if (showOffer && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [showOffer, countdown]);
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="mt-8 xs:mt-10 sm:mt-12 p-4 xs:p-6 sm:p-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl xs:rounded-2xl text-white text-center relative overflow-hidden"
    >
      {/* Animation de particules */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full"
            initial={{ 
              x: Math.random() * 100, 
              y: 100,
              opacity: 0 
            }}
            animate={isInView ? { 
              y: -20,
              opacity: [0, 1, 0],
              x: Math.random() * 100
            } : {}}
            transition={{ 
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10">
        <motion.h3 
          className="text-lg xs:text-xl sm:text-2xl font-bold mb-2 xs:mb-3 sm:mb-4"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🎁 OFFRE SPÉCIALE VALENTINE 🎁
        </motion.h3>
        
        <p className="text-xs xs:text-sm sm:text-base md:text-lg mb-3 xs:mb-4 sm:mb-6">
          Transformez votre distance en amour éternel avec notre peluche magique
        </p>
        
        <motion.div 
          className="inline-block bg-white text-red-500 px-3 xs:px-4 sm:px-6 py-2 xs:py-2 sm:py-3 rounded-full font-bold text-sm xs:text-base sm:text-xl mb-3 xs:mb-4 sm:mb-4"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {countdown > 0 ? (
            <span>⏰ OFFRE EXPIRE DANS: {countdown}s</span>
          ) : (
            <span>🔥 DERNIÈRE CHANCE !</span>
          )}
        </motion.div>
        
        <div className="flex justify-center gap-2 xs:gap-3 sm:gap-4 flex-wrap px-2 xs:px-0">
          <motion.button
            className="bg-yellow-400 text-gray-900 px-4 xs:px-6 sm:px-8 py-2 xs:py-3 sm:py-4 rounded-full font-bold text-xs xs:text-sm sm:text-lg hover:bg-yellow-300 transition-colors"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            🛒 COMMANDER
          </motion.button>
          
          <motion.button
            className="bg-white/20 backdrop-blur text-white px-4 xs:px-6 sm:px-8 py-2 xs:py-3 sm:py-4 rounded-full font-bold text-xs xs:text-sm sm:text-lg hover:bg-white/30 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            💝 OFFRIR
          </motion.button>
        </div>
        
        <motion.p 
          className="text-xs xs:text-xs sm:text-sm mt-2 xs:mt-3 sm:mt-4 opacity-80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 1 }}
        >
          ⚡ Livraison express - Garantie 30 jours
        </motion.p>
      </div>
    </motion.div>
  );
};
const BalloonTitle = ({ isInView }: { isInView: boolean }) => {
  const text = "Parce que certaines étreintes ne devraient jamais s'arrêter";
  const words = text.split(' ');
  const [hoveredWordIndex, setHoveredWordIndex] = useState<number | null>(null);

  return (
    <h2 
      className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6 cursor-pointer"
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

export const WhySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const textContent = "Cette peluche n'est pas qu'un simple jouet. C'est un pont entre deux cœurs, un symbole de votre amour qui transcende l'espace.";

  return (
    <section id="why" className="py-12 xs:py-16 sm:py-24 lg:py-32 bg-muted" ref={ref}>
      <div className="container mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
           className="text-center mb-8 xs:mb-12 sm:mb-16"
        >
          <span className="inline-block text-primary font-semibold text-xs xs:text-sm uppercase tracking-widest mb-2 xs:mb-4">
            Pourquoi l'offrir ?
          </span>
          <BalloonTitle isInView={isInView} />
          <p className="text-xs xs:text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto font-body min-h-[4rem] flex items-center justify-center px-2 xs:px-0">
            <TypewriterText text={textContent} isInView={isInView} />
          </p>
        </motion.div>

        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 xs:gap-4 sm:gap-6 lg:gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.12, ease: "easeOut" }}
              whileHover={{ y: -12, boxShadow: "0 20px 40px rgba(255, 20, 147, 0.15)" }}
              className="card-romantic p-3 xs:p-4 sm:p-6 lg:p-8 text-center group relative overflow-hidden cursor-pointer transition-all duration-300"
            >
              {/* Animated Background Gradient */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                animate={isInView ? { 
                  backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"]
                } : {}}
                transition={{ duration: 8, repeat: Infinity }}
                style={{
                  background: "linear-gradient(45deg, transparent, rgba(255, 20, 147, 0.05), transparent)",
                  backgroundSize: "200% 200%"
                }}
              />

              {/* Card Content */}
              <div className="relative z-10">
                {/* Animated Icon Container */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={isInView ? { scale: 1, rotate: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.12 + 0.2, type: "spring", stiffness: 100 }}
                  whileHover={{ scale: 1.15, rotate: 15 }}
                  className="inline-flex items-center justify-center w-12 xs:w-14 sm:w-16 h-12 xs:h-14 sm:h-16 rounded-xl xs:rounded-2xl bg-primary/10 text-primary mb-3 xs:mb-4 sm:mb-6 mx-auto transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-secondary group-hover:text-white shadow-lg"
                >
                  <motion.div
                    animate={isInView ? {
                      y: [0, -3, 0],
                      opacity: [1, 0.8, 1]
                    } : {}}
                    transition={{ duration: 2.5 + index * 0.3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <reason.icon className="w-6 xs:w-7 sm:w-8 h-6 xs:h-7 sm:h-8" />
                  </motion.div>
                </motion.div>

                {/* Animated Title */}
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.12 + 0.3 }}
                  className="text-base xs:text-lg sm:text-xl font-display font-semibold text-foreground mb-2 xs:mb-3 leading-tight min-h-14"
                >
                  {reason.title}
                </motion.h3>

                {/* Animated Description */}
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.12 + 0.4 }}
                  className="text-xs xs:text-sm text-muted-foreground font-body leading-relaxed"
                >
                  {reason.description}
                </motion.p>

                {/* Floating Decoration on Hover */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileHover={{ opacity: 1, scale: 1 }}
                  animate={isInView ? { 
                    y: [0, -5, 0]
                  } : {}}
                  transition={{ duration: 3 + index * 0.3, repeat: Infinity }}
                  className="absolute -bottom-4 -right-4 text-4xl opacity-10 group-hover:opacity-30"
                >
                  💕
                </motion.div>

                {/* Pulse Ring Effect */}
                <motion.div
                  className="absolute inset-0 rounded-2xl border-2 border-primary opacity-0 group-hover:opacity-20"
                  animate={isInView ? {
                    scale: [1, 1.05, 1],
                    opacity: [0, 0.3, 0]
                  } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
