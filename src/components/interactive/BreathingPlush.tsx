 import { motion, useInView } from 'framer-motion';
 import { useRef, useState, useEffect } from 'react';
 import { Heart } from 'lucide-react';
 
 interface BreathingPlushProps {
   src: string;
   alt: string;
   className?: string;
 }
 
 export const BreathingPlush = ({ src, alt, className = '' }: BreathingPlushProps) => {
   const ref = useRef(null);
   const isInView = useInView(ref, { once: true, margin: '-100px' });
   const [isAwake, setIsAwake] = useState(false);
   const [showHeart, setShowHeart] = useState(false);
   const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
 
   useEffect(() => {
     if (isInView) {
       // Wake up animation sequence
       setTimeout(() => setIsAwake(true), 500);
       setTimeout(() => setShowHeart(true), 1000);
     }
   }, [isInView]);
 
   const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
     const rect = e.currentTarget.getBoundingClientRect();
     const x = ((e.clientX - rect.left) / rect.width) * 100;
     const y = ((e.clientY - rect.top) / rect.height) * 100;
     setMousePosition({ x, y });
   };
 
   return (
     <motion.div
       ref={ref}
       className={`relative overflow-hidden rounded-3xl group ${className}`}
       onMouseMove={handleMouseMove}
       initial={{ opacity: 0, scale: 0.8 }}
       animate={isInView ? { opacity: 1, scale: 1 } : {}}
       transition={{ duration: 0.8, type: 'spring' }}
     >
       {/* Radial gradient follow mouse */}
       <div
         className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"
         style={{
           background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(255, 20, 147, 0.3) 0%, transparent 50%)`,
         }}
       />
 
       {/* Breathing animation container */}
       <motion.div
         animate={isAwake ? {
           scale: [1, 1.02, 1],
           y: [0, -2, 0],
         } : {}}
         transition={{
           duration: 4,
           repeat: Infinity,
           ease: 'easeInOut',
         }}
       >
         <img
           src={src}
           alt={alt}
           className={`w-full h-full object-cover transition-all duration-500 ${
             isAwake ? 'filter drop-shadow-[0_0_30px_rgba(255,105,180,0.7)]' : ''
           }`}
         />
       </motion.div>
 
       {/* Floating heart that appears */}
       {showHeart && (
         <motion.div
           className="absolute top-4 right-4 z-20"
           initial={{ scale: 0, rotate: -180 }}
           animate={{ 
             scale: 1, 
             rotate: 0,
             y: [0, -10, 0],
           }}
           transition={{
             scale: { type: 'spring', stiffness: 200 },
             y: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
           }}
         >
           <Heart className="w-10 h-10 text-primary drop-shadow-lg" fill="currentColor" />
         </motion.div>
       )}
 
       {/* Rose bloom effect on hover */}
       <motion.div
         className="absolute top-6 left-6 text-3xl z-20 opacity-0 group-hover:opacity-100"
         initial={{ scale: 0, rotate: -180 }}
         whileHover={{ scale: 1.2 }}
         animate={{ scale: 1, rotate: 0 }}
         transition={{ duration: 0.5 }}
       >
         🌹
       </motion.div>
 
       {/* Glow effect */}
       <div className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
         isAwake ? 'opacity-50' : 'opacity-0'
       }`}>
         <div className="absolute inset-0 bg-gradient-radial from-primary/20 via-transparent to-transparent" />
       </div>
     </motion.div>
   );
 };