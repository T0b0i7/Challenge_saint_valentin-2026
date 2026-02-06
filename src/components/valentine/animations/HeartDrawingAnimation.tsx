import { motion } from 'framer-motion';

interface HeartDrawingAnimationProps {
  isActive: boolean;
}

export const HeartDrawingAnimation = ({ isActive }: HeartDrawingAnimationProps) => {
  if (!isActive) return null;

  return (
    <motion.svg
      width={typeof window !== 'undefined' ? Math.min(650, window.innerWidth * 0.95) : 650}
      height={typeof window !== 'undefined' ? Math.min(650, window.innerWidth * 0.95) : 650}
      viewBox="0 0 650 650"
      className="absolute"
      style={{
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        opacity: 0.8 // Légèrement transparent pour être en arrière-plan mais visible
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 0.8, scale: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Cœur très grand pour encarrer toute la div (image + texte + cœurs) */}
      <motion.path
        d="M325,520 C216.67,433.33 108.33,346.67 108.33,233.33 C108.33,116.67 216.67,0 325,116.67 C433.33,0 541.67,116.67 541.67,233.33 C541.67,346.67 433.33,433.33 325,520 Z"
        fill="none"
        stroke="url(#heartGradient)"
        strokeWidth="8"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 3, ease: "easeInOut" }}
      />
      
      {/* Remplissage subtil du cœur */}
      <motion.path
        d="M325,520 C216.67,433.33 108.33,346.67 108.33,233.33 C108.33,116.67 216.67,0 325,116.67 C433.33,0 541.67,116.67 541.67,233.33 C541.67,346.67 433.33,433.33 325,520 Z"
        fill="url(#heartGradient)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 2, delay: 3 }}
      />

      {/* Dégradé pour le cœur - palette obligatoire */}
      <defs>
        <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF1493" /> {/* Rose Saint-Valentin */}
          <stop offset="50%" stopColor="#FF69B4" /> {/* Rose romantique */}
          <stop offset="100%" stopColor="#DC143C" /> {/* Rouge passion */}
        </linearGradient>
      </defs>

      {/* Particules scintillantes en cercle parfait autour du cœur - plus grandes */}
      {[...Array(45)].map((_, i) => (
        <motion.circle
          key={i}
          r="6"
          fill="#FF1493"
          initial={{ 
            opacity: 0,
            scale: 0,
            cx: 325,
            cy: 325
          }}
          animate={{ 
            opacity: [0, 0.8, 0],
            scale: [0, 2.5, 0],
            cx: 325 + Math.cos((i / 45) * Math.PI * 2) * 300,
            cy: 325 + Math.sin((i / 45) * Math.PI * 2) * 300
          }}
          transition={{
            duration: 4,
            delay: 3 + i * 0.05,
            ease: "easeOut"
          }}
        />
      ))}
    </motion.svg>
  );
};
