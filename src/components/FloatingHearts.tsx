 import { motion } from 'framer-motion';
 import { Heart } from 'lucide-react';
 
 interface FloatingHeartsProps {
   count?: number;
   duration?: number;
 }
 
 export const FloatingHearts = ({ count = 10, duration = 10 }: FloatingHeartsProps) => {
   return (
     <div className="absolute inset-0 overflow-hidden pointer-events-none">
       {Array.from({ length: count }).map((_, i) => {
         const delay = Math.random() * 5;
         const startX = Math.random() * 100;
         const size = Math.random() * 20 + 15;
         const animDuration = duration + Math.random() * 5;
 
         return (
           <motion.div
             key={i}
             className="absolute text-primary/20"
             style={{
               left: `${startX}%`,
               bottom: '-50px',
             }}
             animate={{
               y: [0, -window.innerHeight - 100],
               x: [0, (Math.random() - 0.5) * 100],
               rotate: [0, 360],
             }}
             transition={{
               duration: animDuration,
               delay,
               repeat: Infinity,
               ease: 'linear',
             }}
           >
             <Heart size={size} fill="currentColor" />
           </motion.div>
         );
       })}
     </div>
   );
 };