 import { useEffect, useRef, useState } from 'react';
 import { motion, AnimatePresence } from 'framer-motion';
 
 interface Heart {
   id: number;
   x: number;
   y: number;
   size: number;
   speed: number;
   rotation: number;
   rotationSpeed: number;
   opacity: number;
   color: string;
   wobble: number;
   wobbleSpeed: number;
 }
 
 const HEART_COLORS = [
   'rgb(255, 0, 0)',      // Red vivid
   'rgb(255, 20, 147)',   // Valentine pink
   'rgb(255, 105, 180)',  // Romantic pink
   'rgb(220, 20, 60)',    // Passion red
   'rgb(255, 182, 193)',  // Light pink
 ];
 
 interface HeartCascadeProps {
   duration?: number; // How long the cascade runs (ms)
   intensity?: 'low' | 'medium' | 'high';
   persistent?: boolean; // Keep running after duration
 }
 
 export const HeartCascade = ({ 
   duration = 5000, 
   intensity = 'medium',
   persistent = false 
 }: HeartCascadeProps) => {
   const canvasRef = useRef<HTMLCanvasElement>(null);
   const heartsRef = useRef<Heart[]>([]);
   const animationRef = useRef<number>(0);
   const [isVisible, setIsVisible] = useState(true);
 
   const heartCounts = { low: 50, medium: 150, high: 300 };
   const heartCount = heartCounts[intensity];
 
   useEffect(() => {
     const canvas = canvasRef.current;
     if (!canvas) return;
 
     const ctx = canvas.getContext('2d');
     if (!ctx) return;
 
     // Set canvas size
     const updateSize = () => {
       canvas.width = window.innerWidth;
       canvas.height = window.innerHeight;
     };
     updateSize();
     window.addEventListener('resize', updateSize);
 
     // Initialize hearts
     heartsRef.current = Array.from({ length: heartCount }, (_, i) => ({
       id: i,
       x: Math.random() * canvas.width,
       y: Math.random() * -canvas.height - 50,
       size: Math.random() * 20 + 8,
       speed: Math.random() * 2 + 1,
       rotation: Math.random() * 360,
       rotationSpeed: (Math.random() - 0.5) * 4,
       opacity: Math.random() * 0.5 + 0.5,
       color: HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)],
       wobble: Math.random() * Math.PI * 2,
       wobbleSpeed: Math.random() * 0.05 + 0.02,
     }));
 
     // Draw heart shape
     const drawHeart = (x: number, y: number, size: number, rotation: number, color: string, opacity: number) => {
       ctx.save();
       ctx.translate(x, y);
       ctx.rotate((rotation * Math.PI) / 180);
       ctx.globalAlpha = opacity;
       
       ctx.beginPath();
       ctx.moveTo(0, size / 4);
       ctx.bezierCurveTo(-size / 2, -size / 4, -size / 2, -size / 2, 0, -size / 2);
       ctx.bezierCurveTo(size / 2, -size / 2, size / 2, -size / 4, 0, size / 4);
       
       ctx.fillStyle = color;
       ctx.shadowColor = color;
       ctx.shadowBlur = 10;
       ctx.fill();
       
       ctx.restore();
     };
 
     // Animation loop
     const animate = () => {
       ctx.clearRect(0, 0, canvas.width, canvas.height);
 
       heartsRef.current.forEach(heart => {
         // Update position
         heart.y += heart.speed;
         heart.wobble += heart.wobbleSpeed;
         heart.x += Math.sin(heart.wobble) * 0.5;
         heart.rotation += heart.rotationSpeed;
 
         // Reset heart when it goes off screen
         if (heart.y > canvas.height + 50) {
           heart.y = -50;
           heart.x = Math.random() * canvas.width;
         }
 
         // Draw heart
         drawHeart(heart.x, heart.y, heart.size, heart.rotation, heart.color, heart.opacity);
       });
 
       animationRef.current = requestAnimationFrame(animate);
     };
 
     animate();
 
     // Fade out after duration
     if (!persistent) {
       const fadeTimer = setTimeout(() => {
         setIsVisible(false);
       }, duration);
 
       return () => {
         clearTimeout(fadeTimer);
         cancelAnimationFrame(animationRef.current);
         window.removeEventListener('resize', updateSize);
       };
     }
 
     return () => {
       cancelAnimationFrame(animationRef.current);
       window.removeEventListener('resize', updateSize);
     };
   }, [heartCount, duration, persistent]);
 
   return (
     <AnimatePresence>
       {isVisible && (
         <motion.canvas
           ref={canvasRef}
           className="fixed inset-0 pointer-events-none z-50"
           initial={{ opacity: 1 }}
           exit={{ opacity: 0 }}
           transition={{ duration: 1 }}
         />
       )}
     </AnimatePresence>
   );
 };