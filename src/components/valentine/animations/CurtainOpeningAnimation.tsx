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
        className="fixed inset-0 z-40"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Rideau gauche - ouverture douce avec ondulation */}
        <motion.div
          className="fixed top-0 left-0 w-1/2 h-full"
          style={{ 
            background: 'linear-gradient(135deg, #FF1493 0%, #FF69B4 50%, #DC143C 100%)',
            transformOrigin: 'center left'
          }}
          initial={{ 
            x: 0,
            scaleX: 1,
            rotateY: 0
          }}
          animate={{ 
            x: '-100%',
            scaleX: 0.8,
            rotateY: -15,
            y: [0, -5, 5, -3, 0] // Ondulation verticale
          }}
          transition={{ 
            duration: 3, 
            ease: [0.4, 0, 0.2, 1], // Courbe d'accélération douce
            y: {
              duration: 2,
              repeat: 2,
              ease: "easeInOut"
            }
          }}
        />
        
        {/* Rideau droit - ouverture douce avec ondulation */}
        <motion.div
          className="fixed top-0 right-0 w-1/2 h-full"
          style={{ 
            background: 'linear-gradient(225deg, #FF1493 0%, #FF69B4 50%, #DC143C 100%)',
            transformOrigin: 'center right'
          }}
          initial={{ 
            x: 0,
            scaleX: 1,
            rotateY: 0
          }}
          animate={{ 
            x: '100%',
            scaleX: 0.8,
            rotateY: 15,
            y: [0, 5, -5, 3, 0] // Ondulation verticale opposée
          }}
          transition={{ 
            duration: 3, 
            ease: [0.4, 0, 0.2, 1], // Courbe d'accélération douce
            y: {
              duration: 2,
              repeat: 2,
              ease: "easeInOut"
            }
          }}
        />

        {/* Effet de lumière magique quand le rideau s'ouvre */}
        <motion.div
          className="fixed inset-0 z-30"
          style={{ 
            background: 'radial-gradient(circle, rgba(255, 20, 147, 0.3) 0%, rgba(255, 105, 180, 0.2) 30%, transparent 70%)'
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: [0, 0.8, 0.3], scale: [0.5, 1.2, 1] }}
          transition={{ 
            duration: 2.5,
            ease: "easeInOut"
          }}
        />

        {/* Particules scintillantes pendant l'ouverture */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="fixed z-35 w-2 h-2 rounded-full"
            style={{ 
              backgroundColor: ['#FF1493', '#FF69B4', '#DC143C'][i % 3],
              left: '50%',
              top: '50%'
            }}
            initial={{ 
              opacity: 0,
              scale: 0,
              translateX: 0,
              translateY: 0
            }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
              translateX: (Math.random() - 0.5) * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              translateY: (Math.random() - 0.5) * (typeof window !== 'undefined' ? window.innerHeight : 1000)
            }}
            transition={{
              duration: 2.5,
              delay: i * 0.05,
              ease: "easeOut"
            }}
          />
        ))}
      </motion.div>
    </AnimatePresence>
  );
};
