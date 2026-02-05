 import { motion } from 'framer-motion';
 import { Heart } from 'lucide-react';
 
 interface HangingHeartProps {
   letter: string;
   delay: number;
   ribbonHeight: number;
 }
 
 const HangingHeart = ({ letter, delay, ribbonHeight }: HangingHeartProps) => {
   return (
     <motion.div
       className="flex flex-col items-center"
       initial={{ y: -200, opacity: 0 }}
       animate={{ y: 0, opacity: 1 }}
       transition={{
         type: 'spring',
         stiffness: 100,
         damping: 15,
         delay,
       }}
     >
       {/* Ribbon */}
       <motion.div
         className="w-1 bg-gradient-to-b from-red-700 to-red-600 rounded-full shadow-md"
         style={{ height: ribbonHeight }}
         initial={{ scaleY: 0 }}
         animate={{ scaleY: 1 }}
         transition={{ delay: delay - 0.2, duration: 0.3 }}
       />
       
       {/* Heart with letter */}
       <motion.div
         className="relative -mt-1"
         animate={{
           rotate: [-3, 3, -3],
         }}
         transition={{
           duration: 3 + Math.random() * 2,
           repeat: Infinity,
           ease: 'easeInOut',
           delay: delay,
         }}
         style={{ transformOrigin: 'top center' }}
       >
         {/* Heart SVG */}
         <svg
           viewBox="0 0 100 90"
           className="w-16 h-14 sm:w-20 sm:h-18 md:w-24 md:h-22 drop-shadow-lg"
           fill="url(#heartGradient)"
         >
           <defs>
             <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
               <stop offset="0%" stopColor="#ff0000" />
               <stop offset="50%" stopColor="#e60000" />
               <stop offset="100%" stopColor="#cc0000" />
             </linearGradient>
             <filter id="heartShadow" x="-20%" y="-20%" width="140%" height="140%">
               <feDropShadow dx="2" dy="3" stdDeviation="3" floodOpacity="0.3" />
             </filter>
           </defs>
           <path
             d="M50 88 C20 60, 0 40, 0 25 C0 10, 15 0, 30 0 C40 0, 50 10, 50 15 C50 10, 60 0, 70 0 C85 0, 100 10, 100 25 C100 40, 80 60, 50 88Z"
             filter="url(#heartShadow)"
           />
         </svg>
         
         {/* Letter */}
         <motion.span
           className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl sm:text-2xl md:text-3xl drop-shadow-md"
           initial={{ scale: 0 }}
           animate={{ scale: 1 }}
           transition={{ delay: delay + 0.3, type: 'spring', stiffness: 200 }}
         >
           {letter}
         </motion.span>
       </motion.div>
     </motion.div>
   );
 };
 
 const Floating3DHeart = ({ 
   size, 
   left, 
   top, 
   delay 
 }: { 
   size: number; 
   left: string; 
   top: string; 
   delay: number;
 }) => {
   return (
     <motion.div
       className="absolute"
       style={{ left, top }}
       initial={{ scale: 0, opacity: 0 }}
       animate={{ 
         scale: 1, 
         opacity: 1,
         y: [0, -10, 0],
         rotate: [0, 10, -10, 0],
       }}
       transition={{
         scale: { delay, duration: 0.5, type: 'spring' },
         opacity: { delay, duration: 0.3 },
         y: { delay: delay + 0.5, duration: 3, repeat: Infinity, ease: 'easeInOut' },
         rotate: { delay: delay + 0.5, duration: 4, repeat: Infinity, ease: 'easeInOut' },
       }}
     >
       {/* 3D Heart using gradient */}
       <svg
         viewBox="0 0 100 90"
         style={{ width: size, height: size * 0.9 }}
         className="drop-shadow-xl"
       >
         <defs>
           <radialGradient id={`heart3d-${size}`} cx="30%" cy="30%" r="70%">
             <stop offset="0%" stopColor="#ff6b6b" />
             <stop offset="40%" stopColor="#dc143c" />
             <stop offset="100%" stopColor="#8b0000" />
           </radialGradient>
         </defs>
         <path
           d="M50 88 C20 60, 0 40, 0 25 C0 10, 15 0, 30 0 C40 0, 50 10, 50 15 C50 10, 60 0, 70 0 C85 0, 100 10, 100 25 C100 40, 80 60, 50 88Z"
           fill={`url(#heart3d-${size})`}
         />
         {/* Highlight */}
         <ellipse
           cx="30"
           cy="25"
           rx="12"
           ry="8"
           fill="rgba(255,255,255,0.3)"
           transform="rotate(-30 30 25)"
         />
       </svg>
     </motion.div>
   );
 };
 
 export const HangingLoveHearts = () => {
   const letters = ['L', 'O', 'V', 'E'];
   const ribbonHeights = [60, 80, 100, 70];
   
   // Floating hearts positions
   const floatingHearts = [
     { size: 30, left: '5%', top: '20%', delay: 1 },
     { size: 25, left: '10%', top: '40%', delay: 1.2 },
     { size: 20, left: '85%', top: '15%', delay: 1.1 },
     { size: 35, left: '90%', top: '45%', delay: 1.3 },
     { size: 22, left: '15%', top: '60%', delay: 1.4 },
     { size: 28, left: '80%', top: '65%', delay: 1.5 },
   ];
 
   return (
     <div className="relative py-16 flex flex-col items-center justify-center min-h-[400px] overflow-hidden">
       {/* Floating 3D hearts */}
       {floatingHearts.map((heart, i) => (
         <Floating3DHeart key={i} {...heart} />
       ))}
       
       {/* Hanging hearts */}
       <div className="flex items-start gap-2 sm:gap-4 md:gap-6 justify-center">
         {letters.map((letter, index) => (
           <HangingHeart
             key={letter}
             letter={letter}
             delay={0.2 + index * 0.15}
             ribbonHeight={ribbonHeights[index]}
           />
         ))}
       </div>
       
       {/* Happy Valentine's Day text */}
       <motion.div
         className="mt-12 text-center"
         initial={{ opacity: 0, y: 30 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ delay: 1.2, duration: 0.8 }}
       >
         <motion.h2
           className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl italic"
           style={{
             background: 'linear-gradient(135deg, #dc143c 0%, #ff0000 50%, #8b0000 100%)',
             WebkitBackgroundClip: 'text',
             WebkitTextFillColor: 'transparent',
             textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
           }}
           animate={{
             scale: [1, 1.02, 1],
           }}
           transition={{
             duration: 2,
             repeat: Infinity,
             ease: 'easeInOut',
           }}
         >
           Happy Valentine's Day
         </motion.h2>
       </motion.div>
     </div>
   );
 };