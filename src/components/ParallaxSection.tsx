 import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
 import { useRef, ReactNode } from 'react';
 
 interface ParallaxSectionProps {
   children: ReactNode;
   className?: string;
   speed?: number; // 0 = no parallax, 1 = full parallax
   direction?: 'up' | 'down';
 }
 
 export const ParallaxSection = ({ 
   children, 
   className = '',
   speed = 0.3,
   direction = 'up'
 }: ParallaxSectionProps) => {
   const ref = useRef<HTMLDivElement>(null);
   
   const { scrollYProgress } = useScroll({
     target: ref,
     offset: ['start end', 'end start']
   });
 
   const multiplier = direction === 'up' ? -1 : 1;
   const y = useTransform(scrollYProgress, [0, 1], [100 * speed * multiplier, -100 * speed * multiplier]);
   const smoothY = useSpring(y, { stiffness: 100, damping: 30 });
 
   return (
     <div ref={ref} className={`relative overflow-hidden ${className}`}>
       <motion.div style={{ y: smoothY }}>
         {children}
       </motion.div>
     </div>
   );
 };
 
 // Floating element with parallax
 export const ParallaxFloat = ({ 
   children, 
   speed = 0.5,
   className = ''
 }: { 
   children: ReactNode; 
   speed?: number;
   className?: string;
 }) => {
   const ref = useRef<HTMLDivElement>(null);
   
   const { scrollYProgress } = useScroll({
     target: ref,
     offset: ['start end', 'end start']
   });
 
   const y = useTransform(scrollYProgress, [0, 1], [50 * speed, -50 * speed]);
   const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.05, 0.9]);
   const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.5, 1, 1, 0.5]);
 
   return (
     <motion.div
       ref={ref}
       className={className}
       style={{ y, scale, opacity }}
     >
       {children}
     </motion.div>
   );
 };