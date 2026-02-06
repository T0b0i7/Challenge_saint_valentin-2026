 import { useEffect, useRef } from 'react';
 
 interface Petal {
   x: number;
   y: number;
   size: number;
   speed: number;
   rotation: number;
   rotationSpeed: number;
   wobble: number;
   wobbleSpeed: number;
   opacity: number;
   type: 'heart' | 'petal';
   color: string;
 }
 
 const COLORS = [
   'rgba(255, 0, 0, 0.6)',
   'rgba(255, 20, 147, 0.5)',
   'rgba(255, 105, 180, 0.4)',
   'rgba(220, 20, 60, 0.5)',
   'rgba(255, 182, 193, 0.6)',
 ];
 
 export const PetalRainBackground = () => {
   const canvasRef = useRef<HTMLCanvasElement>(null);
   const petalsRef = useRef<Petal[]>([]);
   const animationRef = useRef<number>(0);
 
   useEffect(() => {
     const canvas = canvasRef.current;
     if (!canvas) return;
 
     const ctx = canvas.getContext('2d');
     if (!ctx) return;
 
     const updateSize = () => {
       canvas.width = window.innerWidth;
       canvas.height = window.innerHeight;
     };
     updateSize();
     window.addEventListener('resize', updateSize);
 
     // Initialize petals
     petalsRef.current = Array.from({ length: 60 }, () => ({
       x: Math.random() * canvas.width,
       y: Math.random() * canvas.height - canvas.height,
       size: Math.random() * 12 + 6,
       speed: Math.random() * 1 + 0.5,
       rotation: Math.random() * 360,
       rotationSpeed: (Math.random() - 0.5) * 2,
       wobble: Math.random() * Math.PI * 2,
       wobbleSpeed: Math.random() * 0.03 + 0.01,
       opacity: Math.random() * 0.5 + 0.3,
       type: Math.random() > 0.3 ? 'petal' : 'heart',
       color: COLORS[Math.floor(Math.random() * COLORS.length)],
     }));
 
     const drawHeart = (x: number, y: number, size: number, rotation: number, color: string) => {
       ctx.save();
       ctx.translate(x, y);
       ctx.rotate((rotation * Math.PI) / 180);
       ctx.scale(size / 20, size / 20);
       
       ctx.beginPath();
       ctx.moveTo(0, 5);
       ctx.bezierCurveTo(-10, -5, -10, -15, 0, -15);
       ctx.bezierCurveTo(10, -15, 10, -5, 0, 5);
       ctx.fillStyle = color;
       ctx.fill();
       
       ctx.restore();
     };
 
     const drawPetal = (x: number, y: number, size: number, rotation: number, color: string) => {
       ctx.save();
       ctx.translate(x, y);
       ctx.rotate((rotation * Math.PI) / 180);
       
       ctx.beginPath();
       ctx.ellipse(0, 0, size * 0.4, size, 0, 0, Math.PI * 2);
       ctx.fillStyle = color;
       ctx.fill();
       
       // Add subtle gradient
       const gradient = ctx.createRadialGradient(0, -size * 0.3, 0, 0, 0, size);
       gradient.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
       gradient.addColorStop(1, 'transparent');
       ctx.fillStyle = gradient;
       ctx.fill();
       
       ctx.restore();
     };
 
     const animate = () => {
       ctx.clearRect(0, 0, canvas.width, canvas.height);
 
       petalsRef.current.forEach(petal => {
         // Update position
         petal.y += petal.speed;
         petal.wobble += petal.wobbleSpeed;
         petal.x += Math.sin(petal.wobble) * 0.5;
         petal.rotation += petal.rotationSpeed;
 
         // Reset when off screen
         if (petal.y > canvas.height + 50) {
           petal.y = -50;
           petal.x = Math.random() * canvas.width;
         }
 
         // Draw
         ctx.globalAlpha = petal.opacity;
         if (petal.type === 'heart') {
           drawHeart(petal.x, petal.y, petal.size, petal.rotation, petal.color);
         } else {
           drawPetal(petal.x, petal.y, petal.size, petal.rotation, petal.color);
         }
         ctx.globalAlpha = 1;
       });
 
       animationRef.current = requestAnimationFrame(animate);
     };
 
     animate();
 
     return () => {
       cancelAnimationFrame(animationRef.current);
       window.removeEventListener('resize', updateSize);
     };
   }, []);
 
   return (
     <canvas
       ref={canvasRef}
       className="fixed inset-0 pointer-events-none z-0"
       style={{ opacity: 0.7 }}
     />
   );
 };