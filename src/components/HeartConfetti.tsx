 import { useCallback, useEffect, useState } from 'react';
 import { motion, AnimatePresence } from 'framer-motion';
 
 interface Confetti {
   id: number;
   x: number;
   y: number;
   rotation: number;
   scale: number;
   color: string;
   velocityX: number;
   velocityY: number;
 }
 
 const COLORS = ['#FF0000', '#FF1493', '#FF69B4', '#DC143C', '#FFB6C1'];
 
 export const useHeartConfetti = () => {
   const [confetti, setConfetti] = useState<Confetti[]>([]);
   const [isActive, setIsActive] = useState(false);
 
   const launch = useCallback((options?: {
     count?: number;
     originX?: number;
     originY?: number;
   }) => {
     const {
       count = 100,
       originX = window.innerWidth / 2,
       originY = window.innerHeight / 2,
     } = options || {};
 
     const newConfetti: Confetti[] = Array.from({ length: count }, (_, i) => ({
       id: Date.now() + i,
       x: originX,
       y: originY,
       rotation: Math.random() * 360,
       scale: Math.random() * 0.5 + 0.5,
       color: COLORS[Math.floor(Math.random() * COLORS.length)],
       velocityX: (Math.random() - 0.5) * 30,
       velocityY: Math.random() * -20 - 10,
     }));
 
     setConfetti(newConfetti);
     setIsActive(true);
 
     // Clear after animation
     setTimeout(() => {
       setConfetti([]);
       setIsActive(false);
     }, 4000);
   }, []);
 
   return { launch, confetti, isActive };
 };
 
 export const HeartConfettiDisplay = ({ confetti }: { confetti: Confetti[] }) => {
   return (
     <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
       <AnimatePresence>
         {confetti.map((c) => (
           <motion.div
             key={c.id}
             className="absolute"
             style={{
               left: c.x,
               top: c.y,
             }}
             initial={{ 
               scale: 0, 
               rotate: c.rotation,
               opacity: 1,
             }}
             animate={{
               x: c.velocityX * 20,
               y: [0, c.velocityY * 10, window.innerHeight],
               scale: c.scale,
               rotate: c.rotation + 720,
               opacity: [1, 1, 0],
             }}
             transition={{
               duration: 3,
               ease: [0.25, 0.46, 0.45, 0.94],
             }}
           >
             <svg 
               width="20" 
               height="20" 
               viewBox="0 0 24 24" 
               fill={c.color}
             >
               <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
             </svg>
           </motion.div>
         ))}
       </AnimatePresence>
     </div>
   );
 };