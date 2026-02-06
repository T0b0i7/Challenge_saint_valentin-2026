 import { motion, useScroll, useTransform } from 'framer-motion';
 import { useRef, ReactNode } from 'react';
 
 interface MorphingTransitionProps {
   children: ReactNode;
   className?: string;
   fromColor?: string;
   toColor?: string;
 }
 
 export const MorphingTransition = ({
   children,
   className = '',
   fromColor = 'hsl(var(--background))',
   toColor = 'hsl(var(--muted))',
 }: MorphingTransitionProps) => {
   const ref = useRef<HTMLDivElement>(null);
   
   const { scrollYProgress } = useScroll({
     target: ref,
     offset: ['start end', 'end start']
   });
 
   const borderRadius = useTransform(scrollYProgress, [0, 0.5, 1], ['0%', '5%', '0%']);
   const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);
   const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [5, 0, -5]);
 
   return (
     <motion.div
       ref={ref}
       className={`relative ${className}`}
       style={{
         borderRadius,
         scale,
         rotateX,
         transformPerspective: 1000,
       }}
     >
       {children}
     </motion.div>
   );
 };
 
 // Wave divider between sections
 export const WaveDivider = ({ 
   flip = false, 
   color = 'hsl(var(--muted))' 
 }: { 
   flip?: boolean;
   color?: string;
 }) => {
   return (
     <div className={`w-full overflow-hidden leading-none ${flip ? 'rotate-180' : ''}`}>
       <svg
         viewBox="0 0 1440 120"
         className="w-full h-16 md:h-24"
         preserveAspectRatio="none"
       >
         <motion.path
           d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,30 1440,60 L1440,120 L0,120 Z"
           fill={color}
           initial={{ d: "M0,60 C360,120 720,0 1080,60 C1260,90 1380,30 1440,60 L1440,120 L0,120 Z" }}
           animate={{
             d: [
               "M0,60 C360,120 720,0 1080,60 C1260,90 1380,30 1440,60 L1440,120 L0,120 Z",
               "M0,80 C360,20 720,100 1080,40 C1260,60 1380,80 1440,50 L1440,120 L0,120 Z",
               "M0,60 C360,120 720,0 1080,60 C1260,90 1380,30 1440,60 L1440,120 L0,120 Z",
             ],
           }}
           transition={{
             duration: 8,
             repeat: Infinity,
             ease: 'easeInOut',
           }}
         />
       </svg>
     </div>
   );
 };
 
 // Heart-shaped divider
 export const HeartDivider = () => {
   return (
     <div className="flex items-center justify-center py-8 gap-4">
       <motion.div 
         className="h-px bg-gradient-to-r from-transparent via-primary/50 to-primary/50 flex-1 max-w-xs"
         initial={{ scaleX: 0 }}
         whileInView={{ scaleX: 1 }}
         viewport={{ once: true }}
         transition={{ duration: 0.8 }}
       />
       <motion.svg
         width="40"
         height="40"
         viewBox="0 0 24 24"
         className="text-primary"
         initial={{ scale: 0, rotate: -180 }}
         whileInView={{ scale: 1, rotate: 0 }}
         viewport={{ once: true }}
         transition={{ type: 'spring', stiffness: 200, delay: 0.3 }}
       >
         <path
           d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
           fill="currentColor"
         />
       </motion.svg>
       <motion.div 
         className="h-px bg-gradient-to-l from-transparent via-primary/50 to-primary/50 flex-1 max-w-xs"
         initial={{ scaleX: 0 }}
         whileInView={{ scaleX: 1 }}
         viewport={{ once: true }}
         transition={{ duration: 0.8 }}
       />
     </div>
   );
 };