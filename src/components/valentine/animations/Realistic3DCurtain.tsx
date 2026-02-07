import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

interface Realistic3DCurtainProps {
  isActive: boolean;
  onComplete: () => void;
}

export const Realistic3DCurtain = ({ isActive, onComplete }: Realistic3DCurtainProps) => {
  const [particles, setParticles] = useState<Array<{
    id: number; 
    x: number; 
    y: number; 
    z: number;
    size: number; 
    type: 'dust' | 'petal' | 'sparkle';
    rotation: number;
  }>>([]);
  
  const time = useRef(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Effet de suivi souris pour le réalisme
  const rotateX = useTransform(mouseY, [0, 1], [-5, 5]);
  const rotateY = useTransform(mouseX, [0, 1], [-5, 5]);

  // Génération de particules 3D
  useEffect(() => {
    if (!isActive) return;
    
    const interval = setInterval(() => {
      setParticles(prev => [
        ...prev.slice(-40),
        {
          id: Date.now() + Math.random(),
          x: 50 + (Math.random() - 0.5) * 5,
          y: 50 + (Math.random() - 0.5) * 5,
          z: Math.random() * 100 - 50,
          size: Math.random() * 6 + 2,
          type: ['dust', 'petal', 'sparkle'][Math.floor(Math.random() * 3)] as 'dust' | 'petal' | 'sparkle',
          rotation: Math.random() * 360
        }
      ]);
    }, 150);

    return () => clearInterval(interval);
  }, [isActive]);

  if (!isActive) return null;

  return (
    <AnimatePresence onExitComplete={onComplete}>
      <motion.div
        className="fixed inset-0 z-50 overflow-hidden"
        style={{ 
          perspective: '2500px',
          transformStyle: 'preserve-3d'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onMouseMove={(e) => {
          mouseX.set(e.clientX / window.innerWidth);
          mouseY.set(e.clientY / window.innerHeight);
        }}
      >
        {/* Éclairage ambiant 3D */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at 30% 20%, rgba(255, 182, 193, 0.2) 0%, transparent 40%),
              radial-gradient(ellipse at 70% 80%, rgba(255, 20, 147, 0.15) 0%, transparent 40%),
              radial-gradient(ellipse at 50% 50%, rgba(139, 69, 19, 0.1) 0%, transparent 60%),
              linear-gradient(135deg, rgba(15, 15, 25, 0.98) 0%, rgba(35, 20, 30, 0.95) 100%)
            `
          }}
          animate={{
            opacity: [0.8, 1, 0.9]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />

        {/* Rideau gauche - ouverture depuis centre avec effet 3D */}
        <motion.div
          className="absolute inset-y-0 left-0"
          style={{
            width: '50vw',
            height: '100vh',
            transformOrigin: 'right center',
            transformStyle: 'preserve-3d',
            filter: `
              drop-shadow(-40px 0 80px rgba(255, 20, 147, 0.3))
              drop-shadow(-20px 0 40px rgba(139, 69, 19, 0.2))
              brightness(1.1)
              contrast(1.2)
            `
          }}
          initial={{ 
            rotateY: 0,
            translateZ: 0,
            scale: 1
          }}
          animate={{ 
            rotateY: [0, -15, -45, -75, -85],
            translateZ: [0, 50, 100, 150, 200],
            scale: [1, 1.05, 1.1, 1.05, 1]
          }}
          transition={{
            duration: 2.8,
            ease: [0.23, 0.45, 0.32, 0.98],
            times: [0, 0.2, 0.5, 0.8, 1]
          }}
          whileHover={{
            rotateY: -85,
            transition: { duration: 0.3 }
          }}
        >
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            style={{ transform: 'translateZ(20px)' }}
          >
            <defs>
              {/* Gradient multi-couches pour effet velours 3D */}
              <radialGradient id="velvet3D" cx="70%" cy="30%" r="80%">
                <stop offset="0%" stopColor="#FFB6C1" stopOpacity="0.95" />
                <stop offset="15%" stopColor="#FF69B4" stopOpacity="1" />
                <stop offset="35%" stopColor="#C71585" stopOpacity="1" />
                <stop offset="60%" stopColor="#8B008B" stopOpacity="0.95" />
                <stop offset="85%" stopColor="#4B0082" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#2F0854" stopOpacity="0.85" />
              </radialGradient>

              {/* Texture de tissu 3D */}
              <filter id="fabric3D">
                <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" result="turbulence" />
                <feColorMatrix in="turbulence" type="saturate" values="0.15" result="desaturated" />
                <feBlend in="SourceGraphic" in2="desaturated" mode="multiply" />
                <feGaussianBlur stdDeviation="0.3" />
              </filter>

              {/* Effet de profondeur et relief */}
              <filter id="depth3D">
                <feConvolveMatrix kernelMatrix="0 1 0 1 -4 1 0 1 0" />
                <feComponentTransfer>
                  <feFuncA type="discrete" tableValues="0 .5 .5 .5 1" />
                </feComponentTransfer>
              </filter>
            </defs>

            {/* Structure 3D du rideau avec plis profonds */}
            <g filter="url(#fabric3D)">
              {/* Plis principaux en relief */}
              <motion.path
                d="M 100 0 Q 94 6 90 12 Q 86 20 82 28 Q 78 36 74 44 Q 70 52 66 60 Q 62 68 58 76 Q 54 84 50 92 Q 46 100 42 100 L 100 100"
                fill="url(#velvet3D)"
                filter="url(#depth3D)"
                animate={{
                  d: [
                    'M 100 0 Q 94 6 90 12 Q 86 20 82 28 Q 78 36 74 44 Q 70 52 66 60 Q 62 68 58 76 Q 54 84 50 92 Q 46 100 42 100 L 100 100',
                    'M 100 0 Q 95 4 91 10 Q 87 18 83 26 Q 79 34 75 42 Q 71 50 67 58 Q 63 66 59 74 Q 55 82 51 90 Q 47 100 43 100 L 100 100',
                    'M 100 0 Q 96 2 92 8 Q 88 16 84 24 Q 80 32 76 40 Q 72 48 68 56 Q 64 64 60 72 Q 56 80 52 88 Q 48 100 44 100 L 100 100',
                    'M 100 0 Q 97 0 93 6 Q 89 14 85 22 Q 81 30 77 38 Q 73 46 69 54 Q 65 62 61 70 Q 57 78 53 86 Q 49 100 45 100 L 100 100'
                  ]
                }}
                transition={{
                  duration: 2.8,
                  ease: "easeInOut",
                  times: [0, 0.25, 0.75, 1]
                }}
              />

              {/* Plis secondaires pour profondeur */}
              <motion.path
                d="M 100 0 Q 96 8 92 16 Q 88 24 84 32 Q 80 40 76 48 Q 72 56 68 64 Q 64 72 60 80 Q 56 88 52 96 Q 48 100 44 100 L 100 100"
                fill="url(#velvet3D)"
                opacity="0.7"
                style={{ transform: 'translateZ(-10px)' }}
                animate={{
                  opacity: [0.7, 0.8, 0.6, 0.7]
                }}
                transition={{
                  duration: 2.8,
                  ease: "easeInOut"
                }}
              />

              {/* Reflets 3D */}
              <motion.path
                d="M 100 0 Q 95 5 91 11 Q 87 19 83 27 Q 79 35 75 43 Q 71 51 67 59 Q 63 67 59 75 Q 55 83 51 91 Q 47 100 43 100 L 100 100"
                fill="none"
                stroke="rgba(255, 255, 255, 0.2)"
                strokeWidth="0.8"
                opacity="0.9"
                animate={{
                  strokeOpacity: [0.2, 0.4, 0.3, 0.2]
                }}
                transition={{
                  duration: 2.8,
                  ease: "easeInOut"
                }}
              />
            </g>
          </svg>

          {/* Côté du rideau pour effet 3D */}
          <motion.div
            className="absolute top-0 right-0 h-full"
            style={{
              width: '20px',
              background: 'linear-gradient(90deg, rgba(139, 0, 139, 0.8), rgba(75, 0, 130, 0.6))',
              transform: 'rotateY(90deg) translateZ(10px)',
              transformOrigin: 'left center'
            }}
          />
        </motion.div>

        {/* Rideau droit - miroir avec ouverture depuis centre */}
        <motion.div
          className="absolute inset-y-0 right-0"
          style={{
            width: '50vw',
            height: '100vh',
            transformOrigin: 'left center',
            transformStyle: 'preserve-3d',
            filter: `
              drop-shadow(40px 0 80px rgba(255, 20, 147, 0.3))
              drop-shadow(20px 0 40px rgba(139, 69, 19, 0.2))
              brightness(1.1)
              contrast(1.2)
            `
          }}
          initial={{ 
            rotateY: 0,
            translateZ: 0,
            scale: 1
          }}
          animate={{ 
            rotateY: [0, 15, 45, 75, 85],
            translateZ: [0, 50, 100, 150, 200],
            scale: [1, 1.05, 1.1, 1.05, 1]
          }}
          transition={{
            duration: 2.8,
            ease: [0.23, 0.45, 0.32, 0.98],
            times: [0, 0.2, 0.5, 0.8, 1]
          }}
          whileHover={{
            rotateY: 85,
            transition: { duration: 0.3 }
          }}
        >
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            style={{ transform: 'translateZ(20px)' }}
          >
            <g filter="url(#fabric3D)">
              <motion.path
                d="M 0 0 Q 6 6 10 12 Q 14 20 18 28 Q 22 36 26 44 Q 30 52 34 60 Q 38 68 42 76 Q 46 84 50 92 Q 54 100 58 100 L 0 100"
                fill="url(#velvet3D)"
                filter="url(#depth3D)"
                animate={{
                  d: [
                    'M 0 0 Q 6 6 10 12 Q 14 20 18 28 Q 22 36 26 44 Q 30 52 34 60 Q 38 68 42 76 Q 46 84 50 92 Q 54 100 58 100 L 0 100',
                    'M 0 0 Q 5 4 9 10 Q 13 18 17 26 Q 21 34 25 42 Q 29 50 33 58 Q 37 66 41 74 Q 45 82 49 90 Q 53 100 57 100 L 0 100',
                    'M 0 0 Q 4 2 8 8 Q 12 16 16 24 Q 20 32 24 40 Q 28 48 32 56 Q 36 64 40 72 Q 44 80 48 88 Q 52 100 56 100 L 0 100',
                    'M 0 0 Q 3 0 7 6 Q 11 14 15 22 Q 19 30 23 38 Q 27 46 31 54 Q 35 62 39 70 Q 43 78 47 86 Q 51 100 55 100 L 0 100'
                  ]
                }}
                transition={{
                  duration: 2.8,
                  ease: "easeInOut",
                  times: [0, 0.25, 0.75, 1]
                }}
              />
            </g>
          </svg>

          {/* Côté du rideau pour effet 3D */}
          <motion.div
            className="absolute top-0 left-0 h-full"
            style={{
              width: '20px',
              background: 'linear-gradient(-90deg, rgba(139, 0, 139, 0.8), rgba(75, 0, 130, 0.6))',
              transform: 'rotateY(-90deg) translateZ(10px)',
              transformOrigin: 'right center'
            }}
          />
        </motion.div>

        {/* Particules 3D flottantes */}
        {particles.map((particle, i) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              width: `${particle.size}px`,
              height: particle.type === 'petal' ? `${particle.size * 1.8}px` : `${particle.size}px`,
              background: particle.type === 'dust' ? 'radial-gradient(circle, rgba(255, 215, 0, 0.8), rgba(255, 165, 0, 0.4))' :
                         particle.type === 'petal' ? 'linear-gradient(45deg, #FF69B4, #FFB6C1, #FFC0CB)' :
                         'radial-gradient(circle, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.3))',
              boxShadow: particle.type === 'dust' ? '0 0 15px rgba(255, 215, 0, 0.6)' :
                         particle.type === 'petal' ? '0 4px 12px rgba(255, 105, 180, 0.4)' :
                         '0 0 20px rgba(255, 255, 255, 0.8)',
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              borderRadius: particle.type === 'petal' ? '50% 50% 50% 0' : '50%',
              transform: `translateZ(${particle.z}px) rotate(${particle.rotation}deg)`,
              transformStyle: 'preserve-3d'
            }}
            initial={{
              opacity: 0,
              scale: 0,
              rotateZ: 0
            }}
            animate={{
              opacity: [0, 1, 0.8, 0],
              scale: [0, 1, 1.3, 0.3],
              rotateZ: particle.type === 'petal' ? [0, 180, 360] : [0, 90, 180],
              x: (Math.random() - 0.5) * 1000,
              y: (Math.random() - 0.5) * 800,
              z: particle.z + (Math.random() - 0.5) * 300
            }}
            transition={{
              duration: particle.type === 'dust' ? 3.5 : particle.type === 'petal' ? 4.5 : 2.5,
              delay: i * 0.03,
              ease: particle.type === 'petal' ? 'easeInOut' : 'easeOut'
            }}
          />
        ))}

        {/* Faisceaux lumineux 3D volumétriques */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: `
              conic-gradient(from 0deg at 50% 50%, 
                transparent 0deg, 
                rgba(255, 215, 0, 0.08) 15deg, 
                transparent 30deg,
                rgba(255, 105, 180, 0.06) 45deg,
                transparent 60deg,
                rgba(255, 182, 193, 0.04) 75deg,
                transparent 90deg
              )
            `,
            mixBlendMode: 'screen',
            transform: 'translateZ(50px) rotateX(15deg)'
          }}
          initial={{ opacity: 0, scale: 0.3, rotate: 0 }}
          animate={{ 
            opacity: [0, 0.7, 0.4, 0],
            scale: [0.3, 1.8, 2.5, 3],
            rotate: [0, 10, -5, 0]
          }}
          transition={{
            duration: 3,
            delay: 0.6,
            ease: 'easeInOut'
          }}
        />

        {/* Brume 3D s'échappant */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(255, 182, 193, 0.12) 0%, rgba(255, 105, 180, 0.06) 40%, transparent 80%)',
            filter: 'blur(25px)',
            transform: 'translateZ(30px)'
          }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ 
            opacity: [0, 0.5, 0.3, 0],
            scale: [0.6, 2.2, 3, 3.5]
          }}
          transition={{
            duration: 3.5,
            delay: 0.9,
            ease: 'easeOut'
          }}
        />

        {/* Effet de profondeur avec flou progressif */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at center, transparent 30%, rgba(0, 0, 0, 0.1) 70%, rgba(0, 0, 0, 0.3) 100%)',
            transform: 'translateZ(200px)'
          }}
        />
      </motion.div>
    </AnimatePresence>
  );
};
