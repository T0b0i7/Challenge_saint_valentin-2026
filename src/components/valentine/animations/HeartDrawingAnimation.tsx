import { motion } from 'framer-motion';

interface HeartDrawingAnimationProps {
  isActive: boolean;
}

export const HeartDrawingAnimation = ({ isActive }: HeartDrawingAnimationProps) => {
  if (!isActive) return null;

  // Calcul de la taille responsive pour entour l'image
  const getSize = () => {
    if (typeof window === 'undefined') return 400;
    const width = window.innerWidth;
    if (width < 640) return 300; // Mobile: w-48 = 192px + padding
    if (width < 768) return 380; // sm: w-56 = 224px
    if (width < 1024) return 440; // md: w-64 = 256px
    if (width < 1280) return 500; // lg: w-72 = 288px
    return 560; // xl: w-80 = 320px
  };

  const size = getSize();

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 300 340"
      className="absolute pointer-events-none"
      style={{
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Cœur proportionné pour entourer l'image */}
      <motion.path
        d="M150,310 C100,270 40,220 40,140 C40,90 80,50 120,50 C145,50 150,65 150,65 C150,65 155,50 180,50 C220,50 260,90 260,140 C260,220 200,270 150,310 Z"
        fill="none"
        stroke="url(#heartGradient)"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />
      
      {/* Léger remplissage subtil */}
      <motion.path
        d="M150,310 C100,270 40,220 40,140 C40,90 80,50 120,50 C145,50 150,65 150,65 C150,65 155,50 180,50 C220,50 260,90 260,140 C260,220 200,270 150,310 Z"
        fill="url(#heartGradient)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.08 }}
        transition={{ duration: 0.5, delay: 2 }}
      />

      {/* Dégradé doré et rose romantique */}
      <defs>
        <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFD700" /> {/* Or doré */}
          <stop offset="50%" stopColor="#FF69B4" /> {/* Rose romantique */}
          <stop offset="100%" stopColor="#FF1493" /> {/* Rose intensif */}
        </linearGradient>
      </defs>

      {/* Petites particules dorées le long du cœur - moins de bruit */}
      {[...Array(15)].map((_, i) => {
        const angle = (i / 15) * Math.PI * 2;
        const radius = 135;
        const cx = 150 + Math.cos(angle) * radius;
        const cy = 170 + Math.sin(angle) * radius;
        
        return (
          <motion.circle
            key={i}
            r="3"
            fill={i % 2 === 0 ? "#FFD700" : "#FF69B4"}
            initial={{ opacity: 0, scale: 0, cx: 150, cy: 170 }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              cx: cx,
              cy: cy
            }}
            transition={{
              duration: 2,
              delay: (i / 15) * 2,
              ease: "easeOut"
            }}
          />
        );
      })}
    </motion.svg>
  );
};
