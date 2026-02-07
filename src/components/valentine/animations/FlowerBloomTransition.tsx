import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface FlowerBloomTransitionProps {
  isActive: boolean;
  onComplete: () => void;
}

export const FlowerBloomTransition = ({ isActive, onComplete }: FlowerBloomTransitionProps) => {
  const [petals, setPetals] = useState<Array<{id: number, angle: number, size: number, delay: number}>>([]);

  useEffect(() => {
    if (!isActive) return;

    // Générer les pétales de la fleur
    const petalArray = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      angle: (i * 30) * (Math.PI / 180), // 30 degrés entre chaque pétale
      size: 80 + Math.random() * 20,
      delay: i * 0.05
    }));
    setPetals(petalArray);
  }, [isActive]);

  if (!isActive) return null;

  return (
    <AnimatePresence onExitComplete={onComplete}>
      <motion.div
        className="fixed inset-0 z-50 overflow-hidden"
        style={{ perspective: '1500px' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Fond romantique */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 30% 40%, rgba(255, 182, 193, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 70% 60%, rgba(255, 105, 180, 0.2) 0%, transparent 50%),
              linear-gradient(135deg, rgba(255, 230, 240, 0.95) 0%, rgba(255, 182, 193, 0.9) 100%)
            `
          }}
        />

        {/* Centre de la fleur - le cœur */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          initial={{ scale: 0, rotate: 0 }}
          animate={{ 
            scale: [0, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 2,
            ease: "easeInOut"
          }}
        >
          <div
            className="w-24 h-24 rounded-full"
            style={{
              background: 'radial-gradient(circle, #FF69B4 0%, #C71585 50%, #8B008B 100%)',
              boxShadow: '0 0 60px rgba(255, 105, 180, 0.8), inset 0 0 20px rgba(255, 255, 255, 0.3)'
            }}
          />
        </motion.div>

        {/* Pétales qui s'ouvrent */}
        {petals.map((petal) => (
          <motion.div
            key={petal.id}
            className="absolute top-1/2 left-1/2"
            style={{
              transformOrigin: 'center center'
            }}
            initial={{ 
              rotate: 0,
              scale: 0
            }}
            animate={{
              rotate: petal.angle * (180 / Math.PI),
              scale: [0, 0.3, 1]
            }}
            transition={{
              duration: 2.5,
              delay: petal.delay,
              ease: [0.23, 0.45, 0.32, 0.98]
            }}
          >
            <motion.div
              className="absolute"
              style={{
                width: `${petal.size}px`,
                height: `${petal.size * 1.5}px`,
                left: `${petal.size / 2}px`,
                top: `${-petal.size * 0.75}px`,
                transformOrigin: 'center bottom'
              }}
              animate={{
                rotateY: [0, 45, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 3,
                delay: petal.delay + 0.5,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              <svg
                width={petal.size}
                height={petal.size * 1.5}
                viewBox="0 0 100 150"
                style={{ transform: 'translateZ(20px)' }}
              >
                <defs>
                  <linearGradient id={`petalGradient${petal.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFB6C1" stopOpacity="0.9" />
                    <stop offset="50%" stopColor="#FF69B4" stopOpacity="1" />
                    <stop offset="100%" stopColor="#C71585" stopOpacity="0.9" />
                  </linearGradient>
                  <filter id={`petalShadow${petal.id}`}>
                    <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
                    <feOffset dx="2" dy="4" result="offsetblur" />
                    <feComponentTransfer>
                      <feFuncA type="linear" slope="0.3" />
                    </feComponentTransfer>
                    <feMerge>
                      <feMergeNode />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                
                {/* Forme du pétale */}
                <path
                  d="M 50 0 Q 30 40 35 80 Q 40 120 50 150 Q 60 120 65 80 Q 70 40 50 0"
                  fill={`url(#petalGradient${petal.id})`}
                  filter={`url(#petalShadow${petal.id})`}
                  opacity="0.95"
                />
                
                {/* Veines du pétale */}
                <path
                  d="M 50 10 Q 45 50 47 90 Q 49 130 50 145"
                  stroke="rgba(255, 255, 255, 0.3)"
                  strokeWidth="1"
                  fill="none"
                />
                <path
                  d="M 50 20 Q 40 60 42 100"
                  stroke="rgba(255, 255, 255, 0.2)"
                  strokeWidth="0.5"
                  fill="none"
                />
                <path
                  d="M 50 20 Q 60 60 58 100"
                  stroke="rgba(255, 255, 255, 0.2)"
                  strokeWidth="0.5"
                  fill="none"
                />
              </svg>
            </motion.div>
          </motion.div>
        ))}

        {/* Pollen doré qui s'échappe */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={`pollen-${i}`}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 4 + 2 + 'px',
              height: Math.random() * 4 + 2 + 'px',
              background: 'radial-gradient(circle, #FFD700, #FFA500)',
              boxShadow: '0 0 10px rgba(255, 215, 0, 0.8)',
              left: '50%',
              top: '50%'
            }}
            initial={{
              opacity: 0,
              scale: 0,
              x: 0,
              y: 0
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0.5],
              x: Math.cos((i / 30) * Math.PI * 2) * (300 + Math.random() * 200),
              y: Math.sin((i / 30) * Math.PI * 2) * (300 + Math.random() * 200),
              rotate: Math.random() * 360
            }}
            transition={{
              duration: 3,
              delay: 1 + i * 0.05,
              ease: 'easeOut'
            }}
          />
        ))}

        {/* Gouttes de rosée scintillantes */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`dew-${i}`}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 6 + 3 + 'px',
              height: Math.random() * 6 + 3 + 'px',
              background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.9), rgba(135, 206, 235, 0.6))',
              boxShadow: '0 2px 8px rgba(255, 255, 255, 0.6), inset -2px -2px 4px rgba(0, 0, 0, 0.1)',
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0.8, 0],
              scale: [0, 1, 1.2, 0],
              y: [0, -10, 0]
            }}
            transition={{
              duration: 2.5,
              delay: 1.5 + i * 0.1,
              ease: 'easeInOut'
            }}
          />
        ))}

        {/* Effet de lumière éthérée */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at center, rgba(255, 182, 193, 0.4) 0%, transparent 70%)',
            filter: 'blur(30px)'
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: [0, 0.6, 0.3, 0],
            scale: [0.5, 2, 3, 4]
          }}
          transition={{
            duration: 3,
            delay: 0.5,
            ease: 'easeOut'
          }}
        />
      </motion.div>
    </AnimatePresence>
  );
};
