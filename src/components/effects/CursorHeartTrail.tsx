 import { useEffect, useState, useCallback } from 'react';
 import { motion, AnimatePresence } from 'framer-motion';
 
 interface TrailHeart {
   id: number;
   x: number;
   y: number;
   size: number;
   rotation: number;
   color: string;
 }
 
 const COLORS = ['#ff0000', '#ff1493', '#ff69b4', '#dc143c', '#ffb6c1'];
 
 export const CursorHeartTrail = () => {
   const [hearts, setHearts] = useState<TrailHeart[]>([]);
   const [isEnabled, setIsEnabled] = useState(true);
 
   const addHeart = useCallback((x: number, y: number) => {
     const newHeart: TrailHeart = {
       id: Date.now() + Math.random(),
       x,
       y,
       size: Math.random() * 15 + 10,
       rotation: Math.random() * 360,
       color: COLORS[Math.floor(Math.random() * COLORS.length)],
     };
 
     setHearts(prev => [...prev.slice(-20), newHeart]);
   }, []);
 
   useEffect(() => {
     if (!isEnabled) return;
 
     let lastX = 0;
     let lastY = 0;
     let lastTime = 0;
 
     const handleMouseMove = (e: MouseEvent) => {
       const now = Date.now();
       const distance = Math.sqrt(
         Math.pow(e.clientX - lastX, 2) + Math.pow(e.clientY - lastY, 2)
       );
 
       // Only add heart if moved enough distance and time passed
       if (distance > 30 && now - lastTime > 50) {
         addHeart(e.clientX, e.clientY);
         lastX = e.clientX;
         lastY = e.clientY;
         lastTime = now;
       }
     };
 
     window.addEventListener('mousemove', handleMouseMove);
     return () => window.removeEventListener('mousemove', handleMouseMove);
   }, [isEnabled, addHeart]);
 
   // Clean up old hearts
   useEffect(() => {
     const cleanup = setInterval(() => {
       setHearts(prev => prev.filter(heart => Date.now() - heart.id < 1000));
     }, 100);
     return () => clearInterval(cleanup);
   }, []);
 
   return (
     <div className="fixed inset-0 pointer-events-none z-[9999]">
       <AnimatePresence>
         {hearts.map(heart => (
           <motion.div
             key={heart.id}
             className="absolute"
             style={{
               left: heart.x,
               top: heart.y,
               transform: 'translate(-50%, -50%)',
             }}
             initial={{ 
               scale: 0, 
               opacity: 1, 
               rotate: heart.rotation 
             }}
             animate={{ 
               scale: 1, 
               opacity: 0,
               y: -50,
               rotate: heart.rotation + 180,
             }}
             exit={{ opacity: 0 }}
             transition={{ duration: 0.8, ease: 'easeOut' }}
           >
             <svg
               width={heart.size}
               height={heart.size}
               viewBox="0 0 24 24"
               fill={heart.color}
             >
               <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
             </svg>
           </motion.div>
         ))}
       </AnimatePresence>
     </div>
   );
 };