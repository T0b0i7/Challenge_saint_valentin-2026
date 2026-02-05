 import { useEffect, useRef } from 'react';
 
 interface Star {
   x: number;
   y: number;
   size: number;
   brightness: number;
   speed: number;
   twinklePhase: number;
 }
 
 interface HeartConstellation {
   x: number;
   y: number;
   scale: number;
   opacity: number;
   points: { x: number; y: number }[];
 }
 
 export const StarfieldBackground = () => {
   const canvasRef = useRef<HTMLCanvasElement>(null);
   const animationRef = useRef<number>(0);
 
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
 
     // Create stars
     const stars: Star[] = Array.from({ length: 200 }, () => ({
       x: Math.random() * canvas.width,
       y: Math.random() * canvas.height,
       size: Math.random() * 2 + 0.5,
       brightness: Math.random(),
       speed: Math.random() * 0.02 + 0.005,
       twinklePhase: Math.random() * Math.PI * 2,
     }));
 
     // Create heart-shaped constellations
     const createHeartPoints = (cx: number, cy: number, scale: number) => {
       const points: { x: number; y: number }[] = [];
       for (let t = 0; t < Math.PI * 2; t += 0.3) {
         const x = 16 * Math.pow(Math.sin(t), 3);
         const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
         points.push({
           x: cx + x * scale,
           y: cy + y * scale,
         });
       }
       return points;
     };
 
     const constellations: HeartConstellation[] = [
       {
         x: canvas.width * 0.2,
         y: canvas.height * 0.3,
         scale: 3,
         opacity: 0.4,
         points: createHeartPoints(canvas.width * 0.2, canvas.height * 0.3, 3),
       },
       {
         x: canvas.width * 0.8,
         y: canvas.height * 0.5,
         scale: 2.5,
         opacity: 0.3,
         points: createHeartPoints(canvas.width * 0.8, canvas.height * 0.5, 2.5),
       },
       {
         x: canvas.width * 0.5,
         y: canvas.height * 0.7,
         scale: 4,
         opacity: 0.35,
         points: createHeartPoints(canvas.width * 0.5, canvas.height * 0.7, 4),
       },
     ];
 
     const animate = () => {
       ctx.fillStyle = 'rgba(20, 10, 30, 0.1)';
       ctx.fillRect(0, 0, canvas.width, canvas.height);
 
       // Draw stars
       stars.forEach(star => {
         star.twinklePhase += star.speed;
         const twinkle = 0.5 + 0.5 * Math.sin(star.twinklePhase);
         
         ctx.beginPath();
         ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
         ctx.fillStyle = `rgba(255, 255, 255, ${twinkle * 0.8})`;
         ctx.fill();
         
         // Add glow to some stars
         if (star.size > 1.5) {
           ctx.beginPath();
           ctx.arc(star.x, star.y, star.size * 2, 0, Math.PI * 2);
           const gradient = ctx.createRadialGradient(
             star.x, star.y, 0,
             star.x, star.y, star.size * 3
           );
           gradient.addColorStop(0, `rgba(255, 182, 193, ${twinkle * 0.3})`);
           gradient.addColorStop(1, 'transparent');
           ctx.fillStyle = gradient;
           ctx.fill();
         }
       });
 
       // Draw heart constellations
       constellations.forEach(constellation => {
         ctx.strokeStyle = `rgba(255, 105, 180, ${constellation.opacity})`;
         ctx.lineWidth = 0.5;
         ctx.setLineDash([5, 5]);
         
         ctx.beginPath();
         constellation.points.forEach((point, i) => {
           if (i === 0) {
             ctx.moveTo(point.x, point.y);
           } else {
             ctx.lineTo(point.x, point.y);
           }
         });
         ctx.closePath();
         ctx.stroke();
         ctx.setLineDash([]);
 
         // Draw constellation stars
         constellation.points.forEach(point => {
           ctx.beginPath();
           ctx.arc(point.x, point.y, 2, 0, Math.PI * 2);
           ctx.fillStyle = `rgba(255, 192, 203, ${constellation.opacity + 0.3})`;
           ctx.fill();
         });
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
       className="fixed inset-0 pointer-events-none -z-10"
       style={{ background: 'linear-gradient(to bottom, #1a0a1e 0%, #2d1f3d 50%, #1a0a1e 100%)' }}
     />
   );
 };