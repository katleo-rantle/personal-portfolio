import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const STAR_COUNT = 400;
const TWO_PI = Math.PI * 2;

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let width = 0,
      height = 0,
      dpr = window.devicePixelRatio || 1;
    let stars: any[] = [];

    // Pre-render a single "High-Quality" star to an off-screen canvas
    const starCache = document.createElement('canvas');
    const sCtx = starCache.getContext('2d');
    const size = 6;
    starCache.width = size * dpr;
    starCache.height = size * dpr;
    if (sCtx) {
      sCtx.scale(dpr, dpr);
      const grad = sCtx.createRadialGradient(
        size / 2,
        size / 2,
        0,
        size / 2,
        size / 2,
        size / 2,
      );
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      sCtx.fillStyle = grad;
      sCtx.fillRect(0, 0, size, size);
    }

    const init = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      stars = Array.from({ length: STAR_COUNT }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.5 + 0.5,
        speed: Math.random() * 0.4 + 0.1,
        opacity: Math.random(),
        phase: Math.random() * TWO_PI,
      }));
    };

    const render = () => {
      ctx.fillStyle = '#050508'; // Deep space blue-black
      ctx.fillRect(0, 0, width, height);

      stars.forEach((s) => {
        s.y -= s.speed;
        if (s.y < 0) s.y = height;

        s.phase += 0.02;
        ctx.globalAlpha = 0.4 + Math.sin(s.phase) * 0.4;
        ctx.drawImage(starCache, s.x, s.y, s.size * 4, s.size * 4);
      });
      ctx.globalAlpha = 1;
    };

    window.addEventListener('resize', init);
    init();
    gsap.ticker.add(render);

    return () => {
      window.removeEventListener('resize', init);
      gsap.ticker.remove(render);
    };
  }, []);

  return <canvas ref={canvasRef} className='fixed inset-0 -z-10' />;
}
