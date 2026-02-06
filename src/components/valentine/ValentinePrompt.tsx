import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const ValentinePrompt = ({ onYesClick }: { onYesClick: () => void }) => {
  const [yesSize, setYesSize] = useState({ width: 120, height: 60, fontSize: 20 });
  const [noHovered, setNoHovered] = useState(false);

  const increaseSize = () => {
    setYesSize(prev => ({
      width: prev.width + 80,
      height: prev.height + 80,
      fontSize: prev.fontSize + 25
    }));
  };

  // Messages incitatifs pour le bouton Non
  const noMessages = [
    "Sûr(e) ?",
    "Vraiment sûr(e) ?",
    "Réfléchis bien !",
    "Dernière chance ?",
    "Tu vas regretter...",
    "Clique sur Oui !",
    "S'il te plaît...",
    "Je t'en supplie !"
  ];

  const [noMessageIndex, setNoMessageIndex] = useState(0);

  const handleNoHover = () => {
    setNoHovered(true);
    setNoMessageIndex((prev) => (prev + 1) % noMessages.length);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center overflow-hidden p-4 sm:p-6 lg:p-8">
      {/* Cœurs flottants en arrière-plan */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ color: '#FF1493' }} // Rose Saint-Valentin obligatoire
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 15, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut"
            }}
          >
            <span 
              className="opacity-50"
              style={{ fontSize: `${16 + Math.random() * 24}px` }}
            >
              ❤
            </span>
          </motion.div>
        ))}
      </div>

      {/* Image de l'ours libre (SANS CARTE) - Optimisée avec lazy loading */}
      <motion.img
        src="https://gifdb.com/images/high/cute-love-bear-roses-ou7zho5oosxnpo6k.gif"
        alt="Ours en peluche Saint-Valentin"
        className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64 shadow-2xl mb-6 sm:mb-8 lg:mb-10 z-10 rounded-2xl"
        loading="lazy"
        decoding="async"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 1, type: "spring" }}
        whileHover={{ scale: 1.05 }}
      />

      {/* Question responsive */}
      <motion.h1
        className="text-center z-10 mb-6 sm:mb-8 lg:mb-10 font-bold"
        style={{ 
          fontFamily: 'Dancing Script, cursive',
          color: '#FF1493', // Rose Saint-Valentin obligatoire
          fontSize: 'clamp(1.5rem, 5vw, 2.5rem)' // Responsive font size
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        VEUX-TU ÊTRE MA/MON VALENTIN(E) ?
      </motion.h1>

      {/* Boutons responsives et impeccables */}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-8 z-10 items-center justify-center">
        {/* Bouton Oui - design impeccable */}
        <motion.button
          className="relative overflow-hidden group shadow-2xl transition-all duration-300 rounded-2xl"
          style={{ 
            width: `${Math.min(yesSize.width, window.innerWidth > 640 ? 300 : 250)}px`, 
            height: `${Math.min(yesSize.height, window.innerWidth > 640 ? 150 : 100)}px`,
            fontSize: `${Math.min(yesSize.fontSize, window.innerWidth > 640 ? 32 : 24)}px`,
            background: 'linear-gradient(135deg, #FF1493 0%, #FF69B4 50%, #DC143C 100%)', // Palette obligatoire
            color: '#FFFFFF' // Blanc pur
          }}
          onClick={onYesClick}
          whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(255, 20, 147, 0.4)' }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="relative z-10 font-bold">Oui ❤</span>
          {/* Effet de brillance */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-700" />
        </motion.button>

        {/* Bouton Non - design impeccable mais incitatif */}
        <motion.button
          className={`${
            noHovered 
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
              : 'shadow-lg hover:shadow-xl'
          } rounded-2xl font-bold transition-all duration-300 relative overflow-hidden group`}
          style={{ 
            width: '120px',
            height: '60px',
            fontSize: '18px',
            backgroundColor: noHovered ? '#F5F5F5' : '#DC143C', // Rouge passion obligatoire
            color: noHovered ? '#9CA3AF' : '#FFFFFF' // Blanc pur
          }}
          onClick={increaseSize}
          onMouseEnter={handleNoHover}
          onMouseLeave={() => setNoHovered(false)}
          whileHover={!noHovered ? { scale: 1.05 } : {}}
          whileTap={!noHovered ? { scale: 0.95 } : {}}
          disabled={noHovered}
        >
          <span className="relative z-10">
            {noHovered ? noMessages[noMessageIndex] : 'Non'}
          </span>
          {/* Effet subtil pour le bouton Non */}
          {!noHovered && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-700" />
          )}
        </motion.button>
      </div>

      {/* Message incitatif responsive */}
      <motion.p
        className="text-center z-10 mt-4 sm:mt-6 lg:mt-8 font-medium"
        style={{ 
          color: '#FF69B4', // Rose romantique obligatoire
          fontSize: 'clamp(0.875rem, 2.5vw, 1rem)' // Responsive
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ delay: 1.5 }}
      >
        Le bouton Oui est si joli... 😉
      </motion.p>
    </div>
  );
};
