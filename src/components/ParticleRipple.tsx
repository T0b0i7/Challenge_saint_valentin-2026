 import { useCallback, useState } from 'react';
 import { motion, AnimatePresence } from 'framer-motion';
 
 interface Particle {
   id: number;
   x: number;
   y: number;
   angle: number;
   speed: number;
   size: number;
   color: string;
 }
 
 interface RippleProps {
   color?: string;
   particleCount?: number;
   spread?: number;
   children: React.ReactNode;
   className?: string;
 }
 
 const COLORS = [
   '#FF1493',
   '#FF69B4',
   '#FF0000',
   '#DC143C',
   '#FFB6C1',
 ];
 
 export const ParticleRipple = ({
   color,
   particleCount = 20,
   spread = 100,
   children,
   className = '',
 }: RippleProps) => {
   const [particles, setParticles] = useState<Particle[]>([]);
   const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
 
   const createParticles = useCallback((e: React.MouseEvent) => {
     const rect = e.currentTarget.getBoundingClientRect();
     const x = e.clientX - rect.left;
     const y = e.clientY - rect.top;
 
     // Create particles
     const newParticles: Particle[] = Array.from({ length: particleCount }, (_, i) => ({
       id: Date.now() + i,
       x,
       y,
       angle: (i / particleCount) * Math.PI * 2,
       speed: Math.random() * spread + 50,
       size: Math.random() * 8 + 4,
       color: color || COLORS[Math.floor(Math.random() * COLORS.length)],
     }));
 
     setParticles(prev => [...prev, ...newParticles]);
 
     // Create ripple
     setRipples(prev => [...prev, { id: Date.now(), x, y }]);
 
     // Clean up after animation
     setTimeout(() => {
       setParticles(prev => prev.filter(p => !newParticles.includes(p)));
       setRipples(prev => prev.filter(r => r.id !== Date.now()));
     }, 1000);
   }, [color, particleCount, spread]);
 
   return (
     <div className={`relative ${className}`} onMouseEnter={createParticles}>
       {children}
       
       {/* Ripples */}
       <AnimatePresence>
         {ripples.map(ripple => (
           <motion.div
             key={ripple.id}
             className="absolute rounded-full border-2 border-primary pointer-events-none"
             style={{ left: ripple.x, top: ripple.y }}
             initial={{ width: 0, height: 0, x: 0, y: 0, opacity: 0.8 }}
             animate={{ 
               width: spread * 2, 
               height: spread * 2, 
               x: -spread, 
               y: -spread, 
               opacity: 0 
             }}
             exit={{ opacity: 0 }}
             transition={{ duration: 0.6, ease: 'easeOut' }}
           />
         ))}
       </AnimatePresence>
 
       {/* Particles */}
       <AnimatePresence>
         {particles.map(particle => (
           <motion.div
             key={particle.id}
             className="absolute pointer-events-none"
             style={{
               left: particle.x,
               top: particle.y,
               width: particle.size,
               height: particle.size,
             }}
             initial={{ scale: 1, opacity: 1 }}
             animate={{
               x: Math.cos(particle.angle) * particle.speed,
               y: Math.sin(particle.angle) * particle.speed,
               scale: 0,
               opacity: 0,
             }}
             transition={{ duration: 0.8, ease: 'easeOut' }}
           >
             {/* Heart shape */}
             <svg viewBox="0 0 24 24" fill={particle.color} className="w-full h-full">
               <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
             </svg>
           </motion.div>
         ))}
       </AnimatePresence>
     </div>
   );
 };