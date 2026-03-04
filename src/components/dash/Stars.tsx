import { useEffect, useRef } from 'react';
import gsap from 'gsap';

// Constants moved outside to prevent re-allocation
const TWO_PI = Math.PI * 2;
const STAR_COUNT = 500;
const ROTATION_SPEED = 0.0001;

export default function StarfieldBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false }); // Optimization: no alpha buffer for the main canvas
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = window.devicePixelRatio || 1;

    // 1. Off-screen Canvas for Pre-rendering (The "Master Star")
    const starCanvas = document.createElement('canvas');
    const sCtx = starCanvas.getContext('2d');
    const starSize = 4;
    starCanvas.width = starSize * dpr;
    starCanvas.height = starSize * dpr;

    if (sCtx) {
      sCtx.scale(dpr, dpr);
      sCtx.fillStyle = 'white';
      sCtx.shadowBlur = 4;
      sCtx.shadowColor = 'white';
      sCtx.beginPath();
      sCtx.arc(starSize / 2, starSize / 2, 1, 0, TWO_PI);
      sCtx.fill();
    }

    interface Star {
      x: number;
      y: number;
      angle: number;
      dist: number;
      size: number;
      phase: number;
    }

    let stars: Star[] = [];

    const initStars = (w: number, h: number) => {
      const cx = w / 2;
      const cy = h / 2;
      const maxDist = Math.max(w, h) * 0.8;
      stars = Array.from({ length: STAR_COUNT }, () => ({
        angle: Math.random() * TWO_PI,
        dist: Math.random() * maxDist + 50,
        x: 0,
        y: 0,
        size: Math.random() * 0.8 + 0.2,
        phase: Math.random() * TWO_PI,
      }));
    };

    const resize = () => {
      dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
      initStars(width, height);
    };

    window.addEventListener('resize', resize);
    resize();

    const render = () => {
      // Use a solid fill instead of clearRect for better performance on some GPUs
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      for (let i = 0; i < STAR_COUNT; i++) {
        const s = stars[i];
        s.angle += ROTATION_SPEED;

        // Update positions
        const x = cx + Math.cos(s.angle) * s.dist;
        const y = cy + Math.sin(s.angle) * s.dist;

        s.phase += 0.02;
        const opacity = 0.5 + Math.sin(s.phase) * 0.5;

        ctx.globalAlpha = opacity;
        // Drawing a pre-rendered image is faster than arc() + fill() + shadow
        ctx.drawImage(starCanvas, x, y, s.size * 4, s.size * 4);
      }
      ctx.globalAlpha = 1.0;
    };

    // Use GSAP Ticker for synced frame updates and tab-sleep handling
    gsap.ticker.add(render);

    return () => {
      gsap.ticker.remove(render);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className='fixed inset-0 -z-10 bg-black pointer-events-none'
    />
  );
}
