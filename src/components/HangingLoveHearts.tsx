 import { motion } from 'framer-motion';
 import { useState, useRef, useEffect } from 'react';
 
 interface HangingHeartProps {
   letter: string;
   delay: number;
   ribbonHeight: number;
   mouseX: number;
   containerWidth: number;
   index: number;
 }
 
 const HangingHeart = ({ letter, delay, ribbonHeight, mouseX, containerWidth, index }: HangingHeartProps) => {
   // Calculate swing based on mouse position
   const heartCenter = (index + 0.5) * (containerWidth / 4);
   const distance = mouseX - heartCenter;
   const maxSwing = 25;
   const swing = Math.max(-maxSwing, Math.min(maxSwing, distance * 0.05));
 
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
         className="w-1 rounded-full shadow-md origin-top"
         style={{ 
           height: ribbonHeight,
           background: 'linear-gradient(to bottom, #b91c1c, #dc2626)',
         }}
         initial={{ scaleY: 0 }}
         animate={{ scaleY: 1 }}
         transition={{ delay: delay - 0.2, duration: 0.3 }}
       />
       
       {/* Heart with letter */}
       <motion.div
         className="relative -mt-1"
         animate={{ rotate: swing }}
         transition={{ 
           type: 'spring', 
           stiffness: 150, 
           damping: 8,
           mass: 0.5,
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
 
 // Romantic Couple SVG Component
 const RomanticCoupleSVG = () => {
   return (
     <motion.svg
       viewBox="0 0 400 350"
       className="w-full max-w-md mx-auto"
       initial={{ opacity: 0, scale: 0.8 }}
       animate={{ opacity: 1, scale: 1 }}
       transition={{ delay: 1.5, duration: 1, type: 'spring' }}
     >
       <defs>
         {/* Gradient for silhouettes */}
         <linearGradient id="coupleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
           <stop offset="0%" stopColor="#dc143c" />
           <stop offset="50%" stopColor="#ff1493" />
           <stop offset="100%" stopColor="#dc143c" />
         </linearGradient>
         
         {/* Glow effect */}
         <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
           <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
           <feMerge>
             <feMergeNode in="coloredBlur"/>
             <feMergeNode in="SourceGraphic"/>
           </feMerge>
         </filter>
         
         {/* Heart gradient */}
         <radialGradient id="heartGlow" cx="50%" cy="50%" r="50%">
           <stop offset="0%" stopColor="#ff6b6b" stopOpacity="0.8"/>
           <stop offset="100%" stopColor="#dc143c" stopOpacity="0"/>
         </radialGradient>
       </defs>
       
       {/* Background glow */}
       <motion.ellipse
         cx="200"
         cy="180"
         rx="150"
         ry="120"
         fill="url(#heartGlow)"
         animate={{ 
           opacity: [0.3, 0.6, 0.3],
           scale: [1, 1.1, 1],
         }}
         transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
       />
       
       {/* Man silhouette */}
       <motion.g filter="url(#glow)">
         {/* Head */}
         <ellipse cx="160" cy="100" rx="35" ry="40" fill="url(#coupleGradient)" />
         {/* Hair */}
         <path
           d="M125 85 Q130 60, 160 55 Q190 60, 195 85 Q190 70, 160 68 Q130 70, 125 85Z"
           fill="url(#coupleGradient)"
         />
         {/* Neck */}
         <rect x="150" y="135" width="20" height="25" fill="url(#coupleGradient)" rx="5" />
         {/* Shoulders & Body */}
         <path
           d="M110 160 Q120 150, 160 155 Q200 150, 210 160 L220 250 Q200 280, 160 285 Q120 280, 100 250 Z"
           fill="url(#coupleGradient)"
         />
         {/* Arm reaching to woman */}
         <path
           d="M210 170 Q240 180, 260 200 Q270 210, 275 230"
           stroke="url(#coupleGradient)"
           strokeWidth="18"
           strokeLinecap="round"
           fill="none"
         />
       </motion.g>
       
       {/* Woman silhouette */}
       <motion.g filter="url(#glow)">
         {/* Head - tilted towards man */}
         <ellipse cx="255" cy="95" rx="30" ry="35" fill="url(#coupleGradient)" transform="rotate(15 255 95)" />
         {/* Hair flowing */}
         <path
           d="M225 75 Q235 45, 270 50 Q310 55, 320 90 Q315 70, 290 60 Q260 55, 240 65 Q225 75, 225 100 Q220 130, 235 160 Q230 140, 225 100 Q223 85, 225 75Z"
           fill="url(#coupleGradient)"
         />
         <path
           d="M280 80 Q300 85, 310 110 Q320 140, 305 180 Q315 150, 310 120 Q305 95, 280 80Z"
           fill="url(#coupleGradient)"
         />
         {/* Neck */}
         <rect x="248" y="125" width="16" height="22" fill="url(#coupleGradient)" rx="4" transform="rotate(10 256 136)" />
         {/* Shoulders & Body - elegant dress */}
         <path
           d="M220 150 Q240 140, 265 145 Q290 140, 310 155 L320 200 Q340 280, 320 340 Q280 350, 240 340 Q200 330, 190 280 L200 200 Z"
           fill="url(#coupleGradient)"
         />
         {/* Arm around man */}
         <path
           d="M220 165 Q190 175, 170 190 Q160 200, 155 215"
           stroke="url(#coupleGradient)"
           strokeWidth="14"
           strokeLinecap="round"
           fill="none"
         />
       </motion.g>
       
       {/* Floating hearts around couple */}
       <motion.g>
         {[
           { x: 120, y: 60, size: 15, delay: 0 },
           { x: 300, y: 50, size: 12, delay: 0.5 },
           { x: 90, y: 180, size: 10, delay: 1 },
           { x: 330, y: 160, size: 14, delay: 0.7 },
           { x: 200, y: 40, size: 18, delay: 0.3 },
         ].map((heart, i) => (
           <motion.path
             key={i}
             d={`M${heart.x} ${heart.y + heart.size/2} 
                 C${heart.x - heart.size/2} ${heart.y - heart.size/4}, 
                   ${heart.x - heart.size/2} ${heart.y - heart.size/2}, 
                   ${heart.x} ${heart.y - heart.size/2}
                 C${heart.x + heart.size/2} ${heart.y - heart.size/2}, 
                   ${heart.x + heart.size/2} ${heart.y - heart.size/4}, 
                   ${heart.x} ${heart.y + heart.size/2}Z`}
             fill="#ff1493"
             initial={{ opacity: 0, scale: 0 }}
             animate={{ 
               opacity: [0.6, 1, 0.6],
               scale: [1, 1.2, 1],
               y: [0, -10, 0],
             }}
             transition={{
               delay: 2 + heart.delay,
               duration: 2 + Math.random(),
               repeat: Infinity,
               ease: 'easeInOut',
             }}
           />
         ))}
       </motion.g>
       
       {/* Connection point - where lips meet - glowing */}
       <motion.circle
         cx="207"
         cy="105"
         r="8"
         fill="#ff69b4"
         animate={{
           opacity: [0.5, 1, 0.5],
           scale: [1, 1.3, 1],
         }}
         transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
         filter="url(#glow)"
       />
     </motion.svg>
   );
 };
 
 export const HangingLoveHearts = () => {
   const letters = ['L', 'O', 'V', 'E'];
   const ribbonHeights = [60, 80, 100, 70];
   const containerRef = useRef<HTMLDivElement>(null);
   const [mouseX, setMouseX] = useState(0);
   const [containerWidth, setContainerWidth] = useState(400);
   
   // Floating hearts positions
   const floatingHearts = [
     { size: 30, left: '5%', top: '20%', delay: 1 },
     { size: 25, left: '10%', top: '40%', delay: 1.2 },
     { size: 20, left: '85%', top: '15%', delay: 1.1 },
     { size: 35, left: '90%', top: '45%', delay: 1.3 },
     { size: 22, left: '15%', top: '60%', delay: 1.4 },
     { size: 28, left: '80%', top: '65%', delay: 1.5 },
   ];
 
   useEffect(() => {
     const updateWidth = () => {
       if (containerRef.current) {
         setContainerWidth(containerRef.current.offsetWidth);
       }
     };
     updateWidth();
     window.addEventListener('resize', updateWidth);
     return () => window.removeEventListener('resize', updateWidth);
   }, []);
 
   const handleMouseMove = (e: React.MouseEvent) => {
     if (containerRef.current) {
       const rect = containerRef.current.getBoundingClientRect();
       setMouseX(e.clientX - rect.left);
     }
   };
 
   return (
     <div 
       ref={containerRef}
       className="relative py-16 flex flex-col items-center justify-center min-h-[500px] overflow-hidden"
       onMouseMove={handleMouseMove}
     >
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
             mouseX={mouseX}
             containerWidth={containerWidth}
             index={index}
           />
         ))}
       </div>
       
       {/* Romantic Couple SVG */}
       <div className="mt-8">
         <RomanticCoupleSVG />
       </div>
       
       {/* Happy Valentine's Day text below couple */}
       <motion.h2
         className="mt-6 font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl italic text-center"
         style={{
           background: 'linear-gradient(135deg, #dc143c 0%, #ff0000 50%, #8b0000 100%)',
           WebkitBackgroundClip: 'text',
           WebkitTextFillColor: 'transparent',
         }}
         initial={{ opacity: 0, y: 30 }}
         animate={{ opacity: 1, y: 0, scale: [1, 1.02, 1] }}
         transition={{
           opacity: { delay: 2, duration: 0.8 },
           y: { delay: 2, duration: 0.8 },
           scale: { delay: 2.5, duration: 2, repeat: Infinity, ease: 'easeInOut' },
         }}
       >
         Happy Valentine's Day
       </motion.h2>
     </div>
   );
 };