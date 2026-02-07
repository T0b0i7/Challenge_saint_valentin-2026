import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface HyperRealisticCurtainAnimationProps {
  isActive: boolean;
  onComplete: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
}

export const HyperRealisticCurtainAnimation = ({ isActive, onComplete, onPrevious, onNext }: HyperRealisticCurtainAnimationProps) => {
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, size: number, type: 'dust' | 'petal' | 'sparkle'}>>([]);
  const time = useRef(0);

  // Génération de particules variées
  useEffect(() => {
    if (!isActive) return;
    
    const interval = setInterval(() => {
      setParticles(prev => [
        ...prev.slice(-50), // Garder 50 particules maximum
        {
          id: Date.now() + Math.random(),
          x: 50 + (Math.random() - 0.5) * 10,
          y: 50 + (Math.random() - 0.5) * 10,
          size: Math.random() * 4 + 1,
          type: ['dust', 'petal', 'sparkle'][Math.floor(Math.random() * 3)] as 'dust' | 'petal' | 'sparkle'
        }
      ]);
    }, 100);

    return () => clearInterval(interval);
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
        {/* Éclairage ambiant */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at 20% 30%, rgba(255, 182, 193, 0.15) 0%, transparent 50%),
              radial-gradient(ellipse at 80% 70%, rgba(255, 20, 147, 0.1) 0%, transparent 50%),
              linear-gradient(135deg, rgba(25, 25, 35, 0.95) 0%, rgba(45, 25, 35, 0.9) 100%)
            `
          }}
        />

        {/* Rideau gauche avec physique réaliste */}
        <motion.div
          className="fixed inset-y-0 left-1/2"
          style={{
            width: '52vw',
            height: '105vh',
            transformOrigin: 'center right',
            filter: `
              drop-shadow(-30px 0 60px rgba(255, 20, 147, 0.4))
              drop-shadow(-15px 0 30px rgba(139, 69, 19, 0.3))
              contrast(1.1)
            `
          }}
          initial={{ 
            clipPath: 'inset(0 0 0 48%)',
            rotateY: 0,
            scale: 1
          }}
          animate={{ 
            clipPath: [
              'inset(0 0 0 48%)',
              'inset(2% 85% 2% 0%)',
              'inset(5% 95% 8% 0%)',
              'inset(8% 100% 15% 0%)'
            ],
            rotateY: [0, -2, -5, -8],
            scale: [1, 1.02, 1.01, 1]
          }}
          transition={{
            duration: 2.2,
            ease: [0.25, 0.46, 0.45, 0.94],
            times: [0, 0.3, 0.7, 1]
          }}
        >
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              {/* Gradient multi-couches pour effet velours */}
              <radialGradient id="velvetGradient" cx="30%" cy="30%">
                <stop offset="0%" stopColor="#FFB6C1" stopOpacity="0.9" />
                <stop offset="20%" stopColor="#FF69B4" stopOpacity="0.95" />
                <stop offset="50%" stopColor="#C71585" stopOpacity="1" />
                <stop offset="80%" stopColor="#8B008B" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#4B0082" stopOpacity="0.9" />
              </radialGradient>
              
              {/* Texture de tissu */}
              <filter id="fabricTexture">
                <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" result="turbulence" />
                <feColorMatrix in="turbulence" type="saturate" values="0.1" result="desaturated" />
                <feBlend in="SourceGraphic" in2="desaturated" mode="multiply" />
              </filter>

              {/* Effet de profondeur */}
              <filter id="depth">
                <feGaussianBlur in="SourceGraphic" stdDeviation="0.5" />
                <feComponentTransfer>
                  <feFuncA type="discrete" tableValues="0 .5 .5 .5 1" />
                </feComponentTransfer>
              </filter>
            </defs>

            {/* Structure principale du rideau avec plis réalistes */}
            <g filter="url(#fabricTexture)">
              {/* Plis principaux */}
              <motion.path
                d="M 100 0 Q 95 8 92 15 Q 88 25 85 35 Q 82 45 80 55 Q 78 65 76 75 Q 74 85 72 95 Q 70 100 68 100 L 100 100"
                fill="url(#velvetGradient)"
                opacity="0.95"
                animate={{
                  d: [
                    'M 100 0 Q 95 8 92 15 Q 88 25 85 35 Q 82 45 80 55 Q 78 65 76 75 Q 74 85 72 95 Q 70 100 68 100 L 100 100',
                    'M 100 0 Q 96 6 93 14 Q 89 24 86 34 Q 83 44 81 54 Q 79 64 77 74 Q 75 84 73 94 Q 71 100 69 100 L 100 100',
                    'M 100 0 Q 97 4 94 13 Q 90 23 87 33 Q 84 43 82 53 Q 80 63 78 73 Q 76 83 74 93 Q 72 100 70 100 L 100 100',
                    'M 100 0 Q 98 2 95 12 Q 91 22 88 32 Q 85 42 83 52 Q 81 62 79 72 Q 77 82 75 92 Q 73 100 71 100 L 100 100'
                  ]
                }}
                transition={{
                  duration: 2.2,
                  ease: "easeInOut",
                  times: [0, 0.3, 0.7, 1]
                }}
              />

              {/* Ombres portées */}
              <motion.path
                d="M 100 0 Q 94 10 90 20 Q 86 30 83 40 Q 80 50 77 60 Q 74 70 71 80 Q 68 90 65 100 L 100 100"
                fill="url(#velvetGradient)"
                opacity="0.3"
                style={{ transform: 'translateX(-2px)' }}
              />

              {/* Reflets spéculaires */}
              <motion.path
                d="M 100 0 Q 96 5 93 12 Q 90 20 87 28 Q 84 36 81 44 Q 78 52 75 60 Q 72 68 69 76 Q 66 84 63 92 Q 60 100 58 100 L 100 100"
                fill="none"
                stroke="rgba(255, 255, 255, 0.15)"
                strokeWidth="0.5"
                opacity="0.8"
              />
            </g>
          </svg>
        </motion.div>

        {/* Rideau droit (miroir) */}
        <motion.div
          className="fixed inset-y-0 right-1/2"
          style={{
            width: '52vw',
            height: '105vh',
            transformOrigin: 'center left',
            filter: `
              drop-shadow(30px 0 60px rgba(255, 20, 147, 0.4))
              drop-shadow(15px 0 30px rgba(139, 69, 19, 0.3))
              contrast(1.1)
            `
          }}
          initial={{ 
            clipPath: 'inset(0 48% 0 0%)',
            rotateY: 0,
            scale: 1
          }}
          animate={{ 
            clipPath: [
              'inset(0 48% 0 0%)',
              'inset(2% 0% 2% 85%)',
              'inset(5% 0% 8% 95%)',
              'inset(8% 0% 15% 100%)'
            ],
            rotateY: [0, 2, 5, 8],
            scale: [1, 1.02, 1.01, 1]
          }}
          transition={{
            duration: 2.2,
            ease: [0.25, 0.46, 0.45, 0.94],
            times: [0, 0.3, 0.7, 1]
          }}
        >
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <g filter="url(#fabricTexture)">
              <motion.path
                d="M 0 0 Q 5 8 8 15 Q 12 25 15 35 Q 18 45 20 55 Q 22 65 24 75 Q 26 85 28 95 Q 30 100 32 100 L 0 100"
                fill="url(#velvetGradient)"
                opacity="0.95"
                animate={{
                  d: [
                    'M 0 0 Q 5 8 8 15 Q 12 25 15 35 Q 18 45 20 55 Q 22 65 24 75 Q 26 85 28 95 Q 30 100 32 100 L 0 100',
                    'M 0 0 Q 4 6 7 14 Q 11 24 14 34 Q 17 44 19 54 Q 21 64 23 74 Q 25 84 27 94 Q 29 100 31 100 L 0 100',
                    'M 0 0 Q 3 4 6 13 Q 10 23 13 33 Q 16 43 18 53 Q 20 63 22 73 Q 24 83 26 93 Q 28 100 30 100 L 0 100',
                    'M 0 0 Q 2 2 5 12 Q 9 22 12 32 Q 15 42 17 52 Q 19 62 21 72 Q 23 82 25 92 Q 27 100 29 100 L 0 100'
                  ]
                }}
                transition={{
                  duration: 2.2,
                  ease: "easeInOut",
                  times: [0, 0.3, 0.7, 1]
                }}
              />
            </g>
          </svg>
        </motion.div>

        {/* Particules atmosphériques variées */}
        {particles.map((particle, i) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              width: `${particle.size}px`,
              height: particle.type === 'petal' ? `${particle.size * 1.5}px` : `${particle.size}px`,
              background: particle.type === 'dust' ? 'rgba(255, 215, 0, 0.6)' :
                         particle.type === 'petal' ? 'linear-gradient(45deg, #FF69B4, #FFB6C1)' :
                         'rgba(255, 255, 255, 0.8)',
              boxShadow: particle.type === 'dust' ? '0 0 8px rgba(255, 215, 0, 0.4)' :
                         particle.type === 'petal' ? '0 2px 8px rgba(255, 105, 180, 0.3)' :
                         '0 0 12px rgba(255, 255, 255, 0.6)',
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              borderRadius: particle.type === 'petal' ? '50% 50% 50% 0' : '50%'
            }}
            initial={{
              opacity: 0,
              scale: 0,
              rotate: 0
            }}
            animate={{
              opacity: [0, 1, 0.8, 0],
              scale: [0, 1, 1.2, 0.5],
              rotate: particle.type === 'petal' ? [0, 180, 360] : 0,
              x: (Math.random() - 0.5) * 800,
              y: (Math.random() - 0.5) * 600,
              z: (Math.random() - 0.5) * 200
            }}
            transition={{
              duration: particle.type === 'dust' ? 3 : particle.type === 'petal' ? 4 : 2,
              delay: i * 0.02,
              ease: particle.type === 'petal' ? 'easeInOut' : 'easeOut'
            }}
          />
        ))}

        {/* Faisceaux lumineux volumétriques */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: `
              conic-gradient(from 45deg at 50% 50%, 
                transparent 0deg, 
                rgba(255, 215, 0, 0.05) 10deg, 
                transparent 20deg,
                rgba(255, 105, 180, 0.03) 30deg,
                transparent 40deg
              )
            `,
            mixBlendMode: 'screen'
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ 
            opacity: [0, 0.6, 0.3, 0],
            scale: [0.5, 1.5, 2, 2.5],
            rotate: [0, 5, -5, 0]
          }}
          transition={{
            duration: 2.5,
            delay: 0.5,
            ease: 'easeInOut'
          }}
        />

        {/* Effet de brume s'échappant */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at center, rgba(255, 182, 193, 0.08) 0%, transparent 70%)',
            filter: 'blur(20px)'
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: [0, 0.4, 0.2, 0],
            scale: [0.8, 1.8, 2.5, 3]
          }}
          transition={{
            duration: 3,
            delay: 0.8,
            ease: 'easeOut'
          }}
        />

        {/* Micro-oscillations résiduelles */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            x: [0, 0.5, -0.3, 0.2, 0],
            y: [0, -0.3, 0.4, -0.2, 0]
          }}
          transition={{
            duration: 4,
            repeat: 2,
            ease: 'easeInOut'
          }}
        />

        {/* Boutons de navigation */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4 z-50">
          {/* Bouton Précédent */}
          {onPrevious && (
            <motion.button
              onClick={onPrevious}
              className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-white/20 transition-all duration-300 group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Précédent</span>
            </motion.button>
          )}

          {/* Bouton Suivant */}
          {onNext && (
            <motion.button
              onClick={onNext}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full hover:from-pink-600 hover:to-rose-600 transition-all duration-300 shadow-lg hover:shadow-xl group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.7, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="font-medium">Suivant</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
