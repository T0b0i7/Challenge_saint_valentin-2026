import { motion, AnimatePresence } from 'framer-motion';

interface CurtainOpeningAnimationProps {
  isActive: boolean;
  onComplete: () => void;
}

export const CurtainOpeningAnimation = ({ isActive, onComplete }: CurtainOpeningAnimationProps) => {
  if (!isActive) return null;

  return (
    <AnimatePresence onExitComplete={onComplete}>
      <motion.div
        className="fixed inset-0 z-50 overflow-hidden"
        style={{ perspective: '1200px' }}
      >
        {/* Rideau gauche qui s'ouvre depuis le centre vers la gauche */}
        <motion.div
          className="fixed inset-y-0 left-1/2"
          style={{
            width: '50vw',
            height: '100vh',
            transformOrigin: 'center right',
            filter: 'drop-shadow(-20px 0 40px rgba(255, 20, 147, 0.7))'
          }}
          initial={{ clipPath: 'inset(0 0 0 50%)' }}
          animate={{ clipPath: 'inset(0 100% 0 0)' }}
          transition={{
            duration: 1.5,
            ease: [0.43, 0.13, 0.23, 0.96]
          }}
        >
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="leftCurtainGradient" x1="100%" y1="0%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#FF1493" />
                <stop offset="40%" stopColor="#FF69B4" />
                <stop offset="100%" stopColor="#DC143C" />
              </linearGradient>
            </defs>

            {/* Chemin du rideau gauche avec ondulations */}
            <motion.path
              d="M 100 0 Q 92 20 85 50 Q 92 80 100 100 L 100 0"
              fill="url(#leftCurtainGradient)"
              animate={{
                d: [
                  'M 100 0 Q 92 20 85 50 Q 92 80 100 100 L 100 0',
                  'M 100 0 Q 95 25 85 50 Q 95 75 100 100 L 100 0',
                  'M 100 0 Q 98 30 85 50 Q 98 70 100 100 L 100 0',
                  'M 100 0 Q 100 35 85 50 Q 100 65 100 100 L 100 0'
                ]
              }}
              transition={{
                duration: 1.5,
                ease: 'easeInOut',
                times: [0, 0.33, 0.66, 1]
              }}
            />
          </svg>
        </motion.div>

        {/* Rideau droit qui s'ouvre depuis le centre vers la droite */}
        <motion.div
          className="fixed inset-y-0 right-1/2"
          style={{
            width: '50vw',
            height: '100vh',
            transformOrigin: 'center left',
            filter: 'drop-shadow(20px 0 40px rgba(255, 20, 147, 0.7))'
          }}
          initial={{ clipPath: 'inset(0 50% 0 0)' }}
          animate={{ clipPath: 'inset(0 0 0 100%)' }}
          transition={{
            duration: 1.5,
            ease: [0.43, 0.13, 0.23, 0.96]
          }}
        >
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="rightCurtainGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FF1493" />
                <stop offset="40%" stopColor="#FF69B4" />
                <stop offset="100%" stopColor="#DC143C" />
              </linearGradient>
            </defs>

            {/* Chemin du rideau droit avec ondulations (miroir) */}
            <motion.path
              d="M 0 0 Q 8 20 15 50 Q 8 80 0 100 L 0 0"
              fill="url(#rightCurtainGradient)"
              animate={{
                d: [
                  'M 0 0 Q 8 20 15 50 Q 8 80 0 100 L 0 0',
                  'M 0 0 Q 5 25 15 50 Q 5 75 0 100 L 0 0',
                  'M 0 0 Q 2 30 15 50 Q 2 70 0 100 L 0 0',
                  'M 0 0 Q 0 35 15 50 Q 0 65 0 100 L 0 0'
                ]
              }}
              transition={{
                duration: 1.5,
                ease: 'easeInOut',
                times: [0, 0.33, 0.66, 1]
              }}
            />
          </svg>
        </motion.div>

        {/* Particules/pétales dorés et roses qui s'échappent du centre */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: i % 2 === 0 ? '8px' : '5px',
              height: i % 2 === 0 ? '8px' : '5px',
              background: i % 3 === 0 ? '#FFD700' : '#FF69B4',
              boxShadow: i % 3 === 0 ? '0 0 12px rgba(255, 215, 0, 0.9)' : '0 0 12px rgba(255, 105, 180, 0.7)',
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
              scale: [0, 1.5, 0],
              x: Math.cos((i / 30) * Math.PI * 2) * 500,
              y: Math.sin((i / 30) * Math.PI * 2) * 500
            }}
            transition={{
              duration: 1.8,
              delay: 0.2 + i * 0.03,
              ease: 'easeOut'
            }}
          />
        ))}

        {/* Éclat lumineux central progressif */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at center, rgba(255, 215, 0, 0.5) 0%, rgba(255, 105, 180, 0.2) 35%, transparent 85%)'
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1.2, 0.8, 0] }}
          transition={{
            duration: 1.5,
            delay: 0.3,
            ease: 'easeInOut'
          }}
        />
      </motion.div>
    </AnimatePresence>
  );
};
