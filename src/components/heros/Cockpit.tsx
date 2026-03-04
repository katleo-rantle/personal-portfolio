import React, { useRef } from 'react';
import gsap from 'gsap';

export default function AdvancedCockpit({
  children,
}: {
  children: React.ReactNode;
}) {
  const yokeRef = useRef<SVGGElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 18;
    const y = (e.clientY / window.innerHeight - 0.5) * 9;
    gsap.to(yokeRef.current, {
      rotation: x,
      x: x * 0.6,
      y: y * 0.4,
      duration: 0.7,
      ease: 'power2.out',
    });
  };

  return (
    <div
      className='relative w-full h-screen overflow-hidden bg-black'
      onMouseMove={handleMouseMove}
    >
      {/* Starfield / space background */}
      <div className='absolute inset-0 z-0'>{children}</div>

      <svg
        viewBox='0 0 1200 800'
        className='absolute inset-0 w-full h-full z-10 pointer-events-none select-none'
        preserveAspectRatio='xMidYMid slice'
      >
        <defs>
          {/* Simple glow for buttons/screens */}
          <filter id='glow' x='-50%' y='-50%' width='200%' height='200%'>
            <feGaussianBlur stdDeviation='3' result='blur' />
            <feMerge>
              <feMergeNode in='blur' />
              <feMergeNode in='SourceGraphic' />
            </feMerge>
          </filter>

          {/* Soft screen glow */}
          <filter id='screenGlow'>
            <feGaussianBlur stdDeviation='6' result='blur' />
            <feComponentTransfer>
              <feFuncA type='linear' slope='1.4' />
            </feComponentTransfer>
          </filter>
        </defs>

        {/* Cockpit walls / ceiling – curved, flat cyan/teal */}
        <path
          d='M0 0 L0 800 L1200 800 L1200 0 Z 
             M100 100 Q 600 0 1100 100 L1100 400 Q600 550 100 400 Z'
          fill='#0a1f2e'
        />
        <path
          d='M100 100 Q 600 0 1100 100 L1100 400 Q600 550 100 400 Z'
          fill='none'
          stroke='#00d4ff'
          strokeWidth='4'
          opacity='0.6'
        />

        {/* Large wrap-around viewport window */}
        <g transform='translate(100, 80)'>
          <path
            d='M0 0 Q 500 -80 1000 0 L1000 320 Q500 480 0 320 Z'
            fill='#001122'
            opacity='0.95'
          />
          {/* Stars / planets visible – you can layer your starfield here or add simple circles */}
          {/* Example placeholder planets */}
          <circle cx='300' cy='180' r='60' fill='#ff8800' opacity='0.7' />
          <circle cx='700' cy='140' r='90' fill='#aa44ff' opacity='0.6' />
          <circle cx='850' cy='220' r='35' fill='#66ddff' opacity='0.8' />
        </g>

        {/* Main dashboard console – flat panels */}
        <g transform='translate(0, 420)'>
          {/* Base curved panel */}
          <path
            d='M0 0 L1200 0 L1200 380 L0 380 Z 
               M80 80 Q600 20 1120 80 L1120 300 Q600 380 80 300 Z'
            fill='#0d2b3f'
            stroke='#00aaff'
            strokeWidth='3'
          />

          {/* Central main screen */}
          <rect
            x='400'
            y='100'
            width='400'
            height='180'
            rx='12'
            fill='#003366'
            filter='url(#screenGlow)'
          />
          <rect
            x='410'
            y='110'
            width='380'
            height='160'
            rx='8'
            fill='#001f3f'
          />
          {/* Placeholder HUD lines */}
          <path
            d='M500 140 L700 140 M500 180 L700 180 M600 120 L600 220'
            stroke='#00ff88'
            strokeWidth='2'
            opacity='0.6'
          />

          {/* Side panels with buttons */}
          <g transform='translate(120, 120)'>
            <rect width='240' height='200' rx='10' fill='#112233' />
            {Array.from({ length: 20 }).map((_, i) => {
              const x = 30 + (i % 5) * 40;
              const y = 30 + Math.floor(i / 5) * 40;
              return (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r='12'
                  fill={
                    ['#ff3366', '#33ff99', '#ffaa00', '#4488ff'][
                      Math.floor(Math.random() * 4)
                    ]
                  }
                  filter='url(#glow)'
                  className='animate-pulse'
                  style={{
                    animationDelay: `${Math.random() * 3}s`,
                    animationDuration: '2.5s',
                  }}
                />
              );
            })}
          </g>

          <g transform='translate(840, 120)'>
            <rect width='240' height='200' rx='10' fill='#112233' />
            {/* Similar buttons on right side */}
            {Array.from({ length: 12 }).map((_, i) => (
              <rect
                key={i}
                x={40 + (i % 3) * 60}
                y={40 + Math.floor(i / 3) * 50}
                width='40'
                height='30'
                rx='6'
                fill='#00aaff'
                opacity='0.7'
                className='animate-pulse'
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </g>

          {/* Central controls / yoke area */}
          <g transform='translate(600, 340)'>
            {/* Console base */}
            <rect
              x='-180'
              y='-60'
              width='360'
              height='120'
              rx='20'
              fill='#001122'
              stroke='#00ccff'
              strokeWidth='4'
            />

            {/* Yoke / joystick – cartoon style */}
            <g ref={yokeRef}>
              <rect
                x='-20'
                y='-80'
                width='40'
                height='100'
                fill='#224466'
                rx='8'
              />
              <path
                d='M-100,-40 Q -100,-100 -40,-80 L40,-80 Q100,-100 100,-40 
                   L100,20 Q40,60 -40,60 L-100,20 Z'
                fill='#336699'
                stroke='#88ccff'
                strokeWidth='5'
              />
              {/* Buttons on yoke */}
              <circle
                cx='-60'
                cy='-50'
                r='10'
                fill='#ff4444'
                filter='url(#glow)'
              />
              <circle
                cx='60'
                cy='-50'
                r='10'
                fill='#44ff44'
                filter='url(#glow)'
              />
            </g>
          </g>
        </g>

        {/* Ceiling lights / accents */}
        <circle
          cx='300'
          cy='80'
          r='40'
          fill='#00ffff'
          opacity='0.15'
          filter='url(#glow)'
        />
        <circle
          cx='900'
          cy='120'
          r='50'
          fill='#ff88ff'
          opacity='0.12'
          filter='url(#glow)'
        />
      </svg>

      {/* Keep your interactive buttons if wanted – styled flatter */}
      <div className='absolute bottom-10 left-1/4 right-1/4 z-20 flex justify-between pointer-events-auto'>
        {/* ... your buttons here, or simplified flat versions */}
      </div>
    </div>
  );
}
