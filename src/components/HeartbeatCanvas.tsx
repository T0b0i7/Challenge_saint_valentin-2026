import { useRef, useEffect, useCallback } from 'react';

interface HeartbeatCanvasProps {
  bpm: number;
  isActive: boolean;
  isSynced: boolean;
  width?: number;
  height?: number;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  maxRadius: number;
}

export const HeartbeatCanvas = ({ 
  bpm, 
  isActive, 
  isSynced,
  width = 400, 
  height = 200 
}: HeartbeatCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const ripplesRef = useRef<Ripple[]>([]);
  const ecgPositionRef = useRef(0);
  const lastBeatRef = useRef(0);

  const drawECGWave = useCallback((ctx: CanvasRenderingContext2D, x: number, amplitude: number) => {
    // ECG pattern: flat -> small bump -> sharp peak -> dip -> recovery -> flat
    const cycle = x % 100;
    
    if (cycle < 20) return 0; // Flat
    if (cycle < 30) return Math.sin((cycle - 20) * Math.PI / 10) * amplitude * 0.3; // P wave
    if (cycle < 35) return 0; // Flat
    if (cycle < 40) return -amplitude * 0.2; // Q wave
    if (cycle < 45) return amplitude; // R wave (peak)
    if (cycle < 50) return -amplitude * 0.4; // S wave
    if (cycle < 70) return Math.sin((cycle - 50) * Math.PI / 40) * amplitude * 0.2; // T wave
    return 0; // Flat
  }, []);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas with fade effect
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, width, height);

    const centerY = height / 2;
    const beatInterval = 60000 / bpm;

    // Draw ECG line
    if (isActive) {
      ctx.beginPath();
      ctx.strokeStyle = isSynced 
        ? 'rgba(255, 20, 147, 0.9)' // Valentine pink when synced
        : 'rgba(255, 105, 180, 0.7)'; // Softer pink otherwise
      ctx.lineWidth = isSynced ? 3 : 2;
      ctx.shadowBlur = isSynced ? 15 : 5;
      ctx.shadowColor = 'rgba(255, 20, 147, 0.8)';

      for (let i = 0; i < width; i++) {
        const waveX = (ecgPositionRef.current + i) % width;
        const amplitude = 40 + (bpm - 60) / 2;
        const y = centerY - drawECGWave(ctx, waveX, amplitude);
        
        if (i === 0) {
          ctx.moveTo(i, y);
        } else {
          ctx.lineTo(i, y);
        }
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      ecgPositionRef.current += 2 + (bpm / 60);
    }

    // Draw ripples (love echoes)
    const now = Date.now();
    if (isActive && now - lastBeatRef.current > beatInterval) {
      lastBeatRef.current = now;
      ripplesRef.current.push({
        x: width / 2,
        y: centerY,
        radius: 10,
        opacity: 0.8,
        maxRadius: 150,
      });
    }

    // Update and draw ripples
    ripplesRef.current = ripplesRef.current.filter(ripple => {
      ripple.radius += 2;
      ripple.opacity -= 0.015;

      if (ripple.opacity <= 0) return false;

      ctx.beginPath();
      ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255, 20, 147, ${ripple.opacity})`;
      ctx.lineWidth = 2;
      ctx.stroke();

      return true;
    });

    animationRef.current = requestAnimationFrame(animate);
  }, [bpm, isActive, isSynced, width, height, drawECGWave]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas resolution
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
      ctx.fillStyle = 'rgba(0, 0, 0, 0)';
      ctx.fillRect(0, 0, width, height);
    }

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate, width, height]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};
