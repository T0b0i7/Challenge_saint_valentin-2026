import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeartDrawingAnimation } from './animations/HeartDrawingAnimation';
import { CurtainOpeningAnimation } from './animations/CurtainOpeningAnimation';
import { Heart, Sparkles, Star } from 'lucide-react';

interface ValentineYesProps {
  onAnimationComplete?: () => void;
}

export const ValentineYes = ({ onAnimationComplete }: ValentineYesProps = {}) => {
  const [showHeart, setShowHeart] = useState(false);
  const [showOkYay, setShowOkYay] = useState(true);
  const [showCurtain, setShowCurtain] = useState(false);
  const [hideAnimation, setHideAnimation] = useState(false);
  const [sparkles, setSparkles] = useState<{id: number, x: number, y: number}[]>([]);

  // Generate sparkles
  useEffect(() => {
    const interval = setInterval(() => {
      setSparkles(prev => [
        ...prev.slice(-20), // Keep only last 20 sparkles
        {
          id: Date.now(),
          x: Math.random() * 100,
          y: Math.random() * 100
        }
      ]);
    }, 300);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Démarrer l'animation du cœur après 1 seconde (synchronisé avec l'embrassade)
    const heartTimer = setTimeout(() => {
      setShowHeart(true);
    }, 1000);

    // Afficher le rideau après 8 secondes
    const curtainTimer = setTimeout(() => {
      setShowCurtain(true);
    }, 8000);

    // Cacher l'animation après 10 secondes (quand le rideau est ouvert)
    const hideTimer = setTimeout(() => {
      setHideAnimation(true);
      onAnimationComplete?.();
    }, 10000);

    return () => {
      clearTimeout(heartTimer);
      clearTimeout(curtainTimer);
      clearTimeout(hideTimer);
    };
  }, [onAnimationComplete]);

  // Si l'animation est cachée, on retourne null pour montrer la landing page
  if (hideAnimation) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center overflow-hidden relative p-4 sm:p-6 lg:p-8" 
         style={{ 
           background: 'radial-gradient(ellipse at center, #FFE4E1 0%, #FFB6C1 40%, #FF69B4 70%, #FF1493 100%)'
         }}>
      
      {/* Magical Sparkles Background */}
      <div className="absolute inset-0 pointer-events-none">
        {sparkles.map((sparkle) => (
          <motion.div
            key={sparkle.id}
            className="absolute w-2 h-2"
            style={{ left: `${sparkle.x}%`, top: `${sparkle.y}%` }}
            initial={{ scale: 0, opacity: 0, rotate: 0 }}
            animate={{ 
              scale: [0, 1.5, 0], 
              opacity: [0, 1, 0], 
              rotate: [0, 180, 360] 
            }}
            transition={{ 
              duration: 2, 
              ease: "easeOut" 
            }}
          >
            <Sparkles className="w-full h-full text-yellow-300 drop-shadow-lg" fill="currentColor" />
          </motion.div>
        ))}
      </div>

      {/* Floating Romantic Hearts */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{
              x: Math.random() * 100,
              y: 100,
              rotate: Math.random() * 360
            }}
            animate={{
              y: -20,
              x: Math.random() * 100,
              rotate: Math.random() * 720
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "linear"
            }}
            style={{ fontSize: `${16 + Math.random() * 24}px` }}
          >
            <Heart 
              className="text-pink-300 drop-shadow-lg" 
              fill="currentColor" 
              style={{ 
                filter: `blur(${Math.random() * 2}px)`,
                opacity: 0.3 + Math.random() * 0.4
              }} 
            />
          </motion.div>
        ))}
      </div>

      {/* Central Heart Animation */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <HeartDrawingAnimation isActive={showHeart} />
      </div>

      {/* Magical Ring Effect */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        initial={{ scale: 0 }}
        animate={{ scale: showHeart ? 1 : 0 }}
        transition={{ duration: 2, type: "spring", stiffness: 50 }}
      >
        <div className="w-96 h-96 rounded-full border-4 border-pink-400/30 animate-pulse" />
        <div className="absolute w-80 h-80 rounded-full border-2 border-pink-300/40 animate-ping" />
        <div className="absolute w-64 h-64 rounded-full border border-pink-200/50 animate-pulse" />
      </motion.div>

      {/* Container principal avec image et message romantique */}
      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Image des deux oursons qui s'embrassent */}
        <motion.div
          className="relative mb-8 sm:mb-10 lg:mb-12"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1.5, type: "spring", stiffness: 100 }}
        >
          {/* Glowing Frame */}
          <div className="absolute inset-0 bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 rounded-3xl blur-xl opacity-50 animate-pulse" />
          
          <motion.img
            src="https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif"
            alt="Deux oursons qui s'embrassent"
            className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 xl:w-80 xl:h-80 rounded-3xl shadow-2xl border-4 border-white/50"
            loading="lazy"
            decoding="async"
            whileHover={{ scale: 1.05, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
          />
          
          {/* Floating Hearts Around Image */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                top: `${20 + Math.sin(i * 45) * 30}%`,
                left: `${20 + Math.cos(i * 45) * 30}%`,
              }}
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 360],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "linear"
              }}
            >
              <Heart 
                className="text-pink-500 drop-shadow-lg" 
                fill="currentColor" 
                style={{ fontSize: '20px' }} 
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Message romantique qui fait rêver */}
        <AnimatePresence>
          {showOkYay && (
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2, y: -30 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              {/* Magical Title Container */}
              <motion.div
                className="relative"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
              >
                {/* Glow Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 rounded-2xl blur-2xl opacity-30 animate-pulse" />
                
                <motion.h1
                  className="relative font-bold bg-gradient-to-r from-pink-600 via-red-600 to-pink-600 bg-clip-text text-transparent"
                  style={{ 
                    fontFamily: 'Dancing Script, cursive',
                    fontSize: 'clamp(3rem, 8vw, 5rem)',
                    textShadow: '0 0 50px rgba(255, 20, 147, 0.5), 0 0 100px rgba(255, 105, 180, 0.3)'
                  }}
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    filter: ['hue-rotate(0deg)', 'hue-rotate(10deg)', 'hue-rotate(0deg)']
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  Notre amour
                </motion.h1>
                
                {/* Floating Stars Around Title */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    style={{
                      top: `${10 + Math.sin(i * 60) * 40}%`,
                      left: `${-10 + Math.cos(i * 60) * 50}%`,
                    }}
                    animate={{
                      scale: [0.5, 1, 0.5],
                      rotate: [0, 180, 360],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3,
                      ease: "easeInOut"
                    }}
                  >
                    <Star 
                      className="text-yellow-300 drop-shadow-lg" 
                      fill="currentColor" 
                      style={{ fontSize: '16px' }} 
                    />
                  </motion.div>
                ))}
              </motion.div>
              
              {/* Subtitle with Magic */}
              <motion.p
                className="relative font-medium text-pink-700"
                style={{ 
                  fontFamily: 'Georgia, serif',
                  fontSize: 'clamp(1.4rem, 4vw, 2rem)'
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 1 }}
              >
                <span className="relative">
                  Un éternel embrassade
                  {/* Sparkle Underline */}
                  <motion.div
                    className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-pink-400 to-transparent"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 1.2, duration: 1 }}
                  />
                </span>
              </motion.p>
              
              {/* Enhanced Love Icons */}
              <motion.div
                className="flex justify-center items-center space-x-6 mt-8"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, duration: 0.8, type: "spring" }}
              >
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.2, rotate: 15 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="absolute inset-0 bg-pink-400 rounded-full blur-lg opacity-50 animate-pulse" />
                  <motion.span
                    className="relative text-5xl"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    style={{ color: '#FF1493', filter: 'drop-shadow(0 0 10px rgba(255, 20, 147, 0.5))' }}
                  >
                    💕
                  </motion.span>
                </motion.div>
                
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.3, rotate: -15 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="absolute inset-0 bg-yellow-400 rounded-full blur-lg opacity-30 animate-ping" />
                  <motion.span
                    className="relative text-4xl"
                    animate={{ 
                      scale: [1, 1.3, 1],
                      filter: ['brightness(1)', 'brightness(1.5)', 'brightness(1)']
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    style={{ color: '#FFD700', filter: 'drop-shadow(0 0 15px rgba(255, 215, 0, 0.6))' }}
                  >
                    ✨
                  </motion.span>
                </motion.div>
                
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.2, rotate: -15 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="absolute inset-0 bg-pink-400 rounded-full blur-lg opacity-50 animate-pulse" />
                  <motion.span
                    className="relative text-5xl"
                    animate={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    style={{ color: '#FF1493', filter: 'drop-shadow(0 0 10px rgba(255, 20, 147, 0.5))' }}
                  >
                    💕
                  </motion.span>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* RIDEAU QUI S'OUVRE - Component séparé */}
      <CurtainOpeningAnimation 
        isActive={showCurtain} 
        onComplete={() => {
          // Le rideau est complètement ouvert, on prépare la transition
          setTimeout(() => setHideAnimation(true), 500);
        }} 
      />
    </div>
  );
};
