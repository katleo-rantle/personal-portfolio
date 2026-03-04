// import { useRef, useState, useEffect } from 'react';
// import gsap from 'gsap';
// import { useGSAP } from '@gsap/react';
// import { TextPlugin } from 'gsap/TextPlugin';

// gsap.registerPlugin(useGSAP, TextPlugin);

// export default function TechLoader({ onComplete, name = 'Katleo' }: { onComplete: () => void; name?: string; }) {
//   const scope = useRef<HTMLDivElement>(null);
//   const textRef = useRef<HTMLSpanElement>(null);

//   // Use state to track actual screen pixels
//   const [dims, setDims] = useState({ w: 1920, h: 1080 });

//   useEffect(() => {
//     const update = () => setDims({ w: window.innerWidth, h: window.innerHeight });
//     update();
//     window.addEventListener('resize', update);
//     return () => window.removeEventListener('resize', update);
//   }, []);

//   useGSAP(() => {
//     const paths = gsap.utils.toArray<SVGPathElement>('.edge-path');
//     paths.forEach((path) => {
//       const length = path.getTotalLength();
//       gsap.set(path, {
//         strokeDasharray: length,
//         strokeDashoffset: length,
//         visibility: 'visible',
//       });
//     });

//     const tl = gsap.timeline({ onComplete });

//     // Typing Logic
//     const p1 = `Hello, I’m ${name}. I build Aps`;
//     const p2 = `Hello, I’m ${name}. I build `;
//     const p3 = `Hello, I’m ${name}. I build Apps that people love to use.`;

//     tl.to(textRef.current, { duration: 2, text: p1, ease: 'none' })
//       .to({}, { duration: 0.4 })
//       .to(textRef.current, { duration: 0.6, text: p2, ease: 'none' })
//       .to(textRef.current, { duration: 2.5, text: p3, ease: 'none' });

//     // Glitch
//     tl.to('.text-container', {
//       duration: 0.1,
//       filter: 'drop-shadow(4px 0px 0px #ff00c1) drop-shadow(-4px 0px 0px #00fff9)',
//       x: -10
//     }, '+=0.3')
//     .to('.text-container', { x: 10, duration: 0.1 })
//     .to('.text-container', { opacity: 0, filter: 'none', duration: 0.3 });

//     // Parallel Shine
//     tl.add('shine').to('.edge-path', {
//       strokeDashoffset: 0,
//       duration: 2,
//       ease: 'power2.out',
//     }, 'shine');

//     tl.to(scope.current, { opacity: 0, duration: 2, ease: 'power2.inOut' }, '+=0.5');
//   }, { scope, dependencies: [dims] }); // Re-run if window resizes to keep paths accurate

//   const { w, h } = dims;
//   const n = 20; // Notch size in pixels - keep this constant!

//   return (
//     <div ref={scope} className='fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden font-mono'>
//       <div className='text-container relative z-10 text-xl md:text-3xl text-white text-center px-8'>
//         <span ref={textRef} className='text-gray-200'></span>
//       </div>

//       <svg
//         className='absolute inset-0 w-full h-full pointer-events-none'
//         viewBox={`0 0 ${w} ${h}`}
//         preserveAspectRatio="xMidYMid slice" // No more "none" stretching
//       >
//         <g
//           fill='none'
//           stroke='#06b6d4'
//           strokeWidth='1.5' // Use a concrete pixel value now
//           strokeLinecap="square"
//         >
//           {/* Bottom: Drawing using actual pixels (w and h) */}
//           <path className='edge-path' style={{ visibility: 'hidden' }}
//             d={`M ${w},${h} L ${w*0.7},${h} L ${w*0.67},${h-n} L ${w*0.6},${h-n} L ${w*0.57},${h} L 0,${h}`}
//           />
//           {/* Left */}
//           <path className='edge-path' style={{ visibility: 'hidden' }}
//             d={`M 0,${h} L 0,${h*0.7} L ${n},${h*0.67} L ${n},${h*0.6} L 0,${h*0.57} L 0,0`}
//           />
//           {/* Top */}
//           <path className='edge-path' style={{ visibility: 'hidden' }}
//             d={`M 0,0 L ${w*0.3},0 L ${w*0.33},${n} L ${w*0.4},${n} L ${w*0.43},0 L ${w},0`}
//           />
//           {/* Right */}
//           <path className='edge-path' style={{ visibility: 'hidden' }}
//             d={`M ${w},0 L ${w},${h*0.3} L ${w-n},${h*0.33} L ${w-n},${h*0.4} L ${w},${h*0.43} L ${w},${h}`}
//           />
//         </g>
//       </svg>

//       <style>{`
//         .edge-path {
//           filter: drop-shadow(0 0 12px #06b6d4);
//         }
//       `}</style>
//     </div>
//   );
// }

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(useGSAP, TextPlugin);

export default function TechLoader({
  onComplete,
  name = 'Katleo',
}: {
  onComplete: () => void;
  name?: string;
}) {
  const scope = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      // 1. Prepare all edge paths
      const paths = gsap.utils.toArray<SVGPathElement>('.edge-path');

      paths.forEach((path) => {
        const length = path.getTotalLength();
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
          visibility: 'visible',
        });
      });

      const tl = gsap.timeline({
        onComplete: () => {
          onComplete();
        },
      });

      // 2. Typing animation with realistic pauses
      const baseText = `Hello, I’m ${name}. I build `;
      const typoText = `Hello, I’m ${name}. I build Aps`; // small typo for realism
      const finalText = `Hello, I’m ${name}. I build Apps that people love to use.`;

      tl.to(textRef.current, {
        duration: 2.4,
        text: typoText,
        ease: 'none',
      })
        .to({}, { duration: 0.6 }) // thinking pause
        .to(textRef.current, {
          duration: 0.7,
          text: baseText,
          ease: 'none',
        })
        .to(textRef.current, {
          duration: 2.8,
          text: finalText,
          ease: 'none',
        })
        .to({}, { duration: 1.1 }); // let it breathe

      // 3. Glitch + disappear
      tl.to(
        '.text-container',
        {
          duration: 0.08,
          x: -12,
          skewX: 18,
          filter:
            'drop-shadow(6px 0px 0px #ff00c1) drop-shadow(-6px 0px 0px #00fff9)',
        },
        '+=0.4',
      )
        .to('.text-container', {
          duration: 0.09,
          x: 14,
          skewX: -22,
        })
        .to('.text-container', {
          duration: 0.25,
          opacity: 0,
          x: 0,
          skewX: 0,
          filter: 'none',
          ease: 'power2.in',
        });

      // 4. Laser shine – all edges at once
      tl.add('shine', '-=0.3');

      tl.to(
        '.edge-path',
        {
          strokeDashoffset: 0,
          duration: 2.2,
          ease: 'power2.out',
          stagger: 0, // simultaneous
        },
        'shine',
      );

      // Optional: slight glow pulse during shine
      tl.to(
        '.edge-path',
        {
          filter: 'drop-shadow(0 0 18px #06b6d4) drop-shadow(0 0 8px #06b6d4)',
          duration: 1.4,
          yoyo: true,
          repeat: 1,
        },
        'shine+=0.4',
      );

      // 5. Fade out whole loader
      tl.to(
        scope.current,
        {
          opacity: 0,
          duration: 1.8,
          ease: 'power3.inOut',
        },
        '+=0.6',
      );
    },
    { scope },
  );

  return (
    <div
      ref={scope}
      className='fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden font-mono'
    >
      {/* Subtle grain/noise background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.07] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Main content wrapper */}
      <div className='text-container relative z-10 text-xl md:text-3xl lg:text-4xl text-white text-center px-6 md:px-12 max-w-4xl leading-tight'>
        <span ref={textRef} className='text-gray-100'></span>
      </div>

      {/* Border laser SVG */}
      <svg
        className='absolute inset-0 w-full h-full pointer-events-none'
        viewBox='0 0 100 100'
        preserveAspectRatio='none'
      >
        <g
          fill='none'
          stroke='#06b6d4'
          strokeWidth='1.2' // ← increased for visual consistency
          vectorEffect='non-scaling-stroke'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          {/* Bottom edge – starts from bottom-right */}
          <path
            className='edge-path'
            d='M 100,100 L 70,100 L 67,97 L 60,97 L 57,100 L 0,100'
          />
          {/* Left edge – bottom to top */}
          <path
            className='edge-path'
            d='M 0,100 L 0,70 L 3,67 L 3,60 L 0,57 L 0,0'
          />
          {/* Top edge – left to right */}
          <path
            className='edge-path'
            d='M 0,0 L 30,0 L 33,3 L 40,3 L 43,0 L 100,0'
          />
          {/* Right edge – top to bottom-right */}
          <path
            className='edge-path'
            d='M 100,0 L 100,30 L 97,33 L 97,40 L 100,43 L 100,100'
          />
        </g>
      </svg>

      <style>{`
        .edge-path {
          filter: drop-shadow(0 0 12px #06b6d4) drop-shadow(0 0 6px #06b6d4);
          visibility: hidden; /* hidden until GSAP sets visible */
        }
      `}</style>
    </div>
  );
}