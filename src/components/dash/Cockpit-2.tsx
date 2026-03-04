import React, { useRef } from 'react';
import gsap from 'gsap';

export default function Cockpit() {
  const yokeRef = useRef<SVGGElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const xPct = (clientX / window.innerWidth - 0.5) * 2;
    const yPct = (clientY / window.innerHeight - 0.5) * 2;

    // Direct, uncompromising feedback: Use GSAP for the "heavy" mechanical feel
    gsap.to(yokeRef.current, {
      rotation: xPct * 20,
      x: xPct * 15,
      y: yPct * 8,
      duration: 0.4,
      ease: 'power1.out',
    });
  };

  return (
    <div
      className='relative w-full h-screen overflow-hidden'
      onMouseMove={handleMouseMove}
    >
      <svg
        viewBox='0 0 1000 600'
        className='absolute inset-0 w-full h-full z-10 pointer-events-none select-none'
        preserveAspectRatio='xMidYMid slice'
      >
        <defs>
          {/* Metal Texture with Specular Highlights */}
          <linearGradient id='yoke-metal' x1='0%' y1='0%' x2='100%' y2='0%'>
            <stop offset='0%' stopColor='#050505' />
            <stop offset='20%' stopColor='#222' />
            <stop offset='50%' stopColor='#555' />
            <stop offset='80%' stopColor='#222' />
            <stop offset='100%' stopColor='#050505' />
          </linearGradient>

          {/* Deep Dashboard Deck Perspective */}
          <linearGradient id='deck-grad' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='0%' stopColor='#111' />
            <stop offset='40%' stopColor='#1a1a1a' />
            <stop offset='100%' stopColor='#000' />
          </linearGradient>

          {/* Glow for HUD and Buttons */}
          <filter id='glow-cyan'>
            <feGaussianBlur stdDeviation='1.5' />
            <feComposite in='SourceGraphic' />
          </filter>
        </defs>

        {/* 1. OUTER HULL & WINDOW CUTOUT */}
        <path
          d='M0,0 V600 H1000 V0 H0 M80,40 H920 L1000,380 H0 L80,40 Z'
          fill='#080808'
          fillRule='evenodd'
        />

        {/* 2. THE DASHBOARD DECK (The Receding Surface) */}
        <g transform='translate(0, 380)'>
          {/* Main surface using perspective trapezoid */}
          <path d='M0,0 L1000,0 L1000,220 L0,220 Z' fill='url(#deck-grad)' />
          <path d='M0,0 L1000,0' stroke='#333' strokeWidth='2' />

          {/* INSTRUMENT PANELS (Left) */}
          <rect
            x='50'
            y='40'
            width='120'
            height='80'
            rx='2'
            fill='#0c0c0c'
            stroke='#222'
          />
          {Array.from({ length: 4 }).map((_, i) => (
            <rect
              key={i}
              x='60'
              y={50 + i * 15}
              width='100'
              height='5'
              fill='#003300'
            />
          ))}

          {/* CENTER CONSOLE (Under the Yoke) */}
          <path
            d='M350,20 L650,20 L700,150 L300,150 Z'
            fill='#151515'
            stroke='#252525'
          />
          <circle cx='500' cy='80' r='30' fill='#050505' stroke='#333' />
          <path
            d='M480,80 L520,80 M500,60 L500,100'
            stroke='#0f0'
            strokeWidth='1'
            opacity='0.3'
          />

          {/* WARNING TOGGLES (Right) */}
          <g transform='translate(750, 40)'>
            {Array.from({ length: 3 }).map((_, i) => (
              <rect
                key={i}
                x={i * 40}
                y='0'
                width='25'
                height='40'
                rx='2'
                fill='#221111'
                stroke='#442222'
              />
            ))}
          </g>
        </g>

        {/* 3. THE 3D AIRPLANE STEERING YOKE */}
        <g ref={yokeRef} transform='translate(500, 520)'>
          {/* Column with 3D shadow */}
          <rect
            x='-25'
            y='0'
            width='50'
            height='150'
            fill='url(#yoke-metal)'
            rx='2'
          />
          <path d='M-25,0 L-35,150 H35 L25,0 Z' fill='black' opacity='0.5' />

          {/* The "W" Horns */}
          <path
            d='M-110,-20 C-110,-80 -60,-90 -30,-60 L30,-60 C60,-90 110,-80 110,-20 C110,40 60,30 30,0 L-30,0 C-60,30 -110,40 -110,-20 Z'
            fill='url(#yoke-metal)'
            stroke='#000'
            strokeWidth='2'
          />

          {/* Grip Texture Detail */}
          <path
            d='M-90,-40 L-100,-20 M-80,-45 L-90,-25'
            stroke='black'
            strokeWidth='1'
            opacity='0.5'
          />
          <path
            d='M90,-40 L100,-20 M80,-45 L90,-25'
            stroke='black'
            strokeWidth='1'
            opacity='0.5'
          />

          {/* Center Info Hub */}
          <rect
            x='-40'
            y='-70'
            width='80'
            height='50'
            rx='4'
            fill='#111'
            stroke='#333'
            strokeWidth='2'
          />
          <rect x='-35' y='-65' width='70' height='40' rx='1' fill='#050505' />
          <text
            x='0'
            y='-40'
            fill='#00f2ff'
            fontSize='9'
            fontFamily='monospace'
            textAnchor='middle'
            filter='url(#glow-cyan)'
            className='animate-pulse'
          >
            LOCKED-ON
          </text>

          {/* Thumb Buttons */}
          <circle cx='-80' cy='-45' r='7' fill='#600' stroke='#f00' />
          <rect
            x='70'
            y='-50'
            width='15'
            height='10'
            rx='2'
            fill='#222'
            stroke='#444'
          />
        </g>

        {/* 4. HUD / REFLECTION LAYER */}
        <g opacity='0.1'>
          <circle
            cx='500'
            cy='200'
            r='100'
            fill='none'
            stroke='#00f2ff'
            strokeWidth='0.5'
          />
          <line
            x1='400'
            y1='200'
            x2='600'
            y2='200'
            stroke='#00f2ff'
            strokeWidth='0.5'
          />
        </g>
      </svg>

      {/* 5. INTERACTIVE BUTTONS ON DASHBOARD */}
      <div className='absolute bottom-6 left-0 w-full z-20 flex justify-center gap-24 pointer-events-auto'>
        <button className='group relative px-10 py-4'>
          <div className='absolute inset-0 bg-zinc-900 skew-x-[-15deg] border-t-2 border-zinc-700 group-hover:bg-cyan-950 transition-colors' />
          <span className='relative text-zinc-400 font-mono text-xs font-bold group-hover:text-cyan-400'>
            ENGAGE WARP
          </span>
        </button>
        <button className='group relative px-10 py-4'>
          <div className='absolute inset-0 bg-zinc-900 skew-x-[15deg] border-t-2 border-zinc-700 group-hover:bg-red-950 transition-colors' />
          <span className='relative text-zinc-400 font-mono text-xs font-bold group-hover:text-red-400'>
            ABORT MISSION
          </span>
        </button>
      </div>
    </div>
  );
}
