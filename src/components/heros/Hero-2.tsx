import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const FuturisticHero = () => {
  const container = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      // 1. Mouse Move Parallax (High-Frequency logic)
      const moveText = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 40;
        const yPos = (clientY / window.innerHeight - 0.5) * 40;

        gsap.to('.glitch-text', {
          x: xPos,
          y: yPos,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.02,
        });
      };

      window.addEventListener('mousemove', moveText);

      // 2. Entrance Sequence: Reveal via Clip-Path (The "Futuristic" Look)
      const tl = gsap.timeline();
      tl.fromTo(
        '.reveal-mask',
        { clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)' },
        {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          duration: 1.5,
          ease: 'expo.inOut',
        },
      ).from(
        '.char',
        {
          opacity: 0,
          y: 100,
          rotateX: -90,
          stagger: 0.03,
          duration: 1,
          ease: 'back.out(1.7)',
        },
        '-=0.5',
      );

      return () => window.removeEventListener('mousemove', moveText);
    },
    { scope: container },
  );

  return (
    <div
      ref={container}
      className='relative h-screen w-full bg-[#050505] overflow-hidden flex items-center justify-center font-sans'
    >
      {/* Background Tech-Grid */}
      <div className='absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]' />

      <div className='reveal-mask relative z-10 text-center'>
        <h1
          ref={textRef}
          className='glitch-text text-[12vw] font-black text-white leading-none tracking-tighter uppercase select-none'
        >
          {'VOID'.split('').map((char, i) => (
            <span key={i} className='char inline-block'>
              {char}
            </span>
          ))}
        </h1>
        <div className='mt-4 overflow-hidden'>
          <p className='glitch-text text-blue-500 font-mono tracking-[0.5em] text-sm md:text-lg opacity-80 uppercase'>
            // System_Override_Initialized
          </p>
        </div>
      </div>

      {/* Interactive Aura */}
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none' />
    </div>
  );
};

export default FuturisticHero;
