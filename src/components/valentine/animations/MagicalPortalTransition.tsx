import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface MagicalPortalTransitionProps {
  isActive: boolean;
  onComplete: () => void;
}

export const MagicalPortalTransition = ({ isActive, onComplete }: MagicalPortalTransitionProps) => {
  const [runes, setRunes] = useState<Array<{id: number, symbol: string, angle: number, radius: number}>>([]);

  useEffect(() => {
    if (!isActive) return;

    // Symboles magiques pour les runes
    const magicalSymbols = ['✦', '❋', '✧', '✯', '✰', '⬟', '❈', '✤'];
    
    const runeArray = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      symbol: magicalSymbols[i],
      angle: (i * 45) * (Math.PI / 180),
      radius: 120 + i * 10
    }));
    setRunes(runeArray);
  }, [isActive]);

  if (!isActive) return null;

  return (
    <AnimatePresence onExitComplete={onComplete}>
      <motion.div
        className="fixed inset-0 z-50 overflow-hidden"
        style={{ perspective: '2000px' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Fond dimensionnel */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at 20% 30%, rgba(138, 43, 226, 0.3) 0%, transparent 50%),
              radial-gradient(ellipse at 80% 70%, rgba(75, 0, 130, 0.2) 0%, transparent 50%),
              radial-gradient(circle at center, rgba(25, 25, 112, 0.4) 0%, transparent 60%),
              linear-gradient(135deg, rgba(10, 10, 30, 0.95) 0%, rgba(30, 10, 60, 0.9) 100%)
            `
          }}
        />

        {/* Cercles du portail qui s'agrandissent */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`portal-ring-${i}`}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2"
            style={{
              width: `${100 + i * 80}px`,
              height: `${100 + i * 80}px`,
              borderColor: `rgba(138, 43, 226, ${0.8 - i * 0.15})`,
              boxShadow: `0 0 ${20 + i * 10}px rgba(138, 43, 226, ${0.6 - i * 0.1})`,
              transform: `translateZ(${i * 20}px)`
            }}
            initial={{
              scale: 0,
              rotate: 0,
              opacity: 0
            }}
            animate={{
              scale: [0, 1.2, 1],
              rotate: [0, 180, 360],
              opacity: [0, 1, 0.8]
            }}
            transition={{
              duration: 2.5,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Centre du portail - vortex */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ transformStyle: 'preserve-3d' }}
          initial={{ scale: 0, rotateZ: 0 }}
          animate={{
            scale: [0, 1.5, 1],
            rotateZ: [0, 360, 720]
          }}
          transition={{
            duration: 3,
            ease: "easeInOut"
          }}
        >
          <div
            className="w-32 h-32 rounded-full"
            style={{
              background: `
                radial-gradient(circle, 
                  rgba(255, 255, 255, 0.9) 0%, 
                  rgba(138, 43, 226, 0.8) 30%, 
                  rgba(75, 0, 130, 0.6) 60%, 
                  rgba(25, 25, 112, 0.4) 100%
                )
              `,
              boxShadow: '0 0 80px rgba(138, 43, 226, 0.8), inset 0 0 40px rgba(255, 255, 255, 0.5)',
              filter: 'blur(1px)'
            }}
          />
        </motion.div>

        {/* Runes magiques qui tournent */}
        {runes.map((rune) => (
          <motion.div
            key={rune.id}
            className="absolute top-1/2 left-1/2"
            style={{
              transformOrigin: 'center center'
            }}
            initial={{ 
              rotate: 0,
              scale: 0,
              opacity: 0
            }}
            animate={{
              rotate: [0, 360, 720],
              scale: [0, 1, 1.2],
              opacity: [0, 1, 0.8]
            }}
            transition={{
              duration: 4,
              delay: rune.id * 0.1,
              ease: "linear",
              repeat: Infinity
            }}
          >
            <motion.div
              className="text-4xl font-bold"
              style={{
                transform: `
                  translateX(${Math.cos(rune.angle) * rune.radius}px) 
                  translateY(${Math.sin(rune.angle) * rune.radius}px)
                  translateZ(${rune.id * 10}px)
                `,
                color: `rgba(138, 43, 226, ${0.9 - rune.id * 0.05})`,
                textShadow: `0 0 20px rgba(138, 43, 226, 0.8), 0 0 40px rgba(255, 255, 255, 0.4)`
              }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.8, 1, 0.8]
              }}
              transition={{
                duration: 2,
                delay: rune.id * 0.2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              {rune.symbol}
            </motion.div>
          </motion.div>
        ))}

        {/* Particules d'énergie magique */}
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={`energy-${i}`}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 4 + 1 + 'px',
              height: Math.random() * 4 + 1 + 'px',
              background: i % 3 === 0 ? 'rgba(138, 43, 226, 0.9)' : 
                         i % 3 === 1 ? 'rgba(255, 255, 255, 0.8)' : 
                         'rgba(75, 0, 130, 0.9)',
              boxShadow: `0 0 10px ${i % 3 === 0 ? 'rgba(138, 43, 226, 0.8)' : 
                                      i % 3 === 1 ? 'rgba(255, 255, 255, 0.6)' : 
                                      'rgba(75, 0, 130, 0.8)'}`,
              left: '50%',
              top: '50%'
            }}
            initial={{
              opacity: 0,
              scale: 0,
              x: 0,
              y: 0,
              z: 0
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
              x: Math.cos((i / 40) * Math.PI * 2) * (200 + Math.random() * 300),
              y: Math.sin((i / 40) * Math.PI * 2) * (200 + Math.random() * 300),
              z: (Math.random() - 0.5) * 200
            }}
            transition={{
              duration: 3,
              delay: 0.5 + i * 0.03,
              ease: 'easeOut'
            }}
          />
        ))}

        {/* Éclairs d'énergie */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`lightning-${i}`}
            className="absolute top-1/2 left-1/2"
            style={{
              width: '2px',
              height: '100px',
              background: 'linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.9), transparent)',
              transformOrigin: 'center top',
              filter: 'blur(1px)'
            }}
            initial={{
              opacity: 0,
              scaleY: 0,
              rotate: (i * 60) + Math.random() * 30 - 15
            }}
            animate={{
              opacity: [0, 1, 0],
              scaleY: [0, 1, 0],
              rotate: (i * 60) + Math.random() * 60 - 30
            }}
            transition={{
              duration: 0.5,
              delay: 1 + i * 0.2,
              repeat: 3,
              repeatDelay: 0.5
            }}
          />
        ))}

        {/* Distorsion dimensionnelle */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at center, transparent 30%, rgba(138, 43, 226, 0.1) 60%, transparent 100%)',
            filter: 'blur(20px)',
            mixBlendMode: 'screen'
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: [0, 0.6, 0.3, 0],
            scale: [0.8, 1.5, 2, 2.5],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 3,
            delay: 0.8,
            ease: 'easeInOut'
          }}
        />
      </motion.div>
    </AnimatePresence>
  );
};
