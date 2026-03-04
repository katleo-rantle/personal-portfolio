// import React, { useLayoutEffect, useRef } from 'react';
// import gsap from 'gsap';

// const CyberPanel = () => {
//   const scope = useRef<SVGSVGElement>(null);

//   useLayoutEffect(() => {
//     const ctx = gsap.context(() => {
//       // 1. Stationary Arrow Pulse
//       gsap.fromTo(
//         '.arrow-path',
//         { opacity: 0.1, fill: '#14532d' },
//         {
//           opacity: 1,
//           fill: '#4ade80',
//           stagger: { each: 0.08, repeat: -1, yoyo: true },
//           duration: 0.8,
//           ease: 'none',
//         },
//       );

//       // 2. THE FIX: Infinite Seamless Stroke
//       const segments = scope.current?.querySelectorAll('.segment-move');

//       segments?.forEach((el, index) => {
//         const poly = el as SVGGeometryElement;
//         const len = poly.getTotalLength();

//         // Strategy: Dash, Gap, Dash, Gap
//         // We make the gap exactly 1/3 of the path, and the dash 60px.
//         const dashLen = 60;
//         const gapLen = len / 2 - dashLen;

//         gsap.set(poly, {
//           strokeDasharray: `${dashLen} ${gapLen}`,
//           // Stagger the starting points of the 3 polygons
//           strokeDashoffset: index * (len / 3),
//         });

//         // We animate the offset by a full cycle.
//         // Using a linear ease is MANDATORY for seamless loops.
//         gsap.to(poly, {
//           strokeDashoffset: `-=${len}`,
//           duration: 10, // Slower is smoother for HUDs
//           repeat: -1,
//           ease: 'none',
//         });
//       });
//     }, scope);

//     return () => ctx.revert();
//   }, []);

//   return (
//     <div className='fixed inset-0 bg-black overflow-hidden flex items-center justify-center'>
//       <svg
//         ref={scope}
//         viewBox='0 0 500 500'
//         preserveAspectRatio='none'
//         className='w-full h-full block'
//       >
//         {/* Background Lines */}
//         <g
//           fill='none'
//           stroke='#4f46e5'
//           strokeWidth='1'
//           opacity='0.1'
//           vectorEffect='non-scaling-stroke'
//         >
//           <polyline points='9 96 9 41 42 9 101 9 124 39 197 40 220 9 250 9' />
//           <polyline points='354 8 455 9 490 41 490 98' />
//           <polyline points='9 376 9 457 41 491 99 490' />
//           <polyline points='238 492 351 491 372 465 456 465 489 432 490 357' />
//         </g>

//         <g>
//           {/* Static Frame Base (The dim purple outline) */}
//           <polygon
//             points='15 44.5 15 453.4 46 485 345.9 485 367 457.9 453.5 457.9 484 427.9 484 44 453.3 15 224 15 202 46 120 46 98 15 44.3 15'
//             className='stroke-purple-900/30 fill-purple-600/5 stroke-[1]'
//             vectorEffect='non-scaling-stroke'
//           />

//           {/* THREE Moving Segments layered perfectly */}
//           {[0, 1, 2].map((i) => (
//             <polygon
//               key={i}
//               points='15 44.5 15 453.4 46 485 345.9 485 367 457.9 453.5 457.9 484 427.9 484 44 453.3 15 224 15 202 46 120 46 98 15 44.3 15'
//               className='segment-move stroke-cyan-400 fill-none stroke-[2.5]'
//               vectorEffect='non-scaling-stroke'
//               strokeLinecap='round'
//               style={{ filter: 'drop-shadow(0 0 2px rgba(34, 211, 238, 0.5))' }}
//             />
//           ))}
//         </g>

//         {/* Pulsing Arrows */}
//         <g>
//           {[56, 71, 86, 101, 116, 131, 146, 161, 176, 191, 206, 221].map(
//             (x, i) => (
//               <path
//                 key={i}
//                 className='arrow-path'
//                 d={`M${x},465 l-6,0 l4,7 l-4,7 l6,0 l4,-7 l-4,-7 z`}
//                 vectorEffect='non-scaling-stroke'
//               />
//             ),
//           )}
//         </g>
//       </svg>
//     </div>
//   );
// };

// export default CyberPanel;

/// new

// import React, { useLayoutEffect, useRef } from 'react';
// import gsap from 'gsap';

// const CyberGlassPanel = () => {
//   const scope = useRef<SVGSVGElement>(null);

//   useLayoutEffect(() => {
//     const ctx = gsap.context(() => {
//       // 1. Arrows Pulse
//       gsap.fromTo(
//         '.arrow-path',
//         { opacity: 0.1, fill: '#14532d' },
//         {
//           opacity: 1,
//           fill: '#4ade80',
//           stagger: { each: 0.08, repeat: -1, yoyo: true },
//           duration: 0.8,
//           ease: 'none',
//         },
//       );

//       // 2. Continuous Stroke flow
//       const segments = scope.current?.querySelectorAll('.segment-move');
//       segments?.forEach((el, index) => {
//         const poly = el as SVGGeometryElement;
//         const len = poly.getTotalLength();
//         const dashLen = 80;
//         const gapLen = len / 2 - dashLen;

//         gsap.set(poly, {
//           strokeDasharray: `${dashLen} ${gapLen}`,
//           strokeDashoffset: index * (len / 3),
//         });
//         gsap.to(poly, {
//           strokeDashoffset: `-=${len}`,
//           duration: 8,
//           repeat: -1,
//           ease: 'none',
//         });
//       });
//     }, scope);
//     return () => ctx.revert();
//   }, []);

//   return (
//     // The background is now a dark mesh or image to show off the glass effect
//     <div className='fixed inset-0 bg-[#020617] bg-[radial-gradient(circle_at_50%_50%,_#1e1b4b_0%,_#020617_100%)] overflow-hidden flex items-center justify-center'>
//       {/* 1. Backdrop Blur Layer - This makes it feel like glass */}
//       <div className='absolute inset-4 backdrop-blur-md bg-white/[0.02] rounded-lg border border-white/5 pointer-events-none shadow-[inset_0_0_100px_rgba(255,255,255,0.02)]' />

//       <svg
//         ref={scope}
//         viewBox='0 0 500 500'
//         preserveAspectRatio='none'
//         className='relative z-10 w-full h-full block'
//       >
//         <defs>
//           {/* 2. Glass Shine Gradient */}
//           <linearGradient id='glassShine' x1='0%' y1='0%' x2='100%' y2='100%'>
//             <stop offset='0%' stopColor='white' stopOpacity='0.05' />
//             <stop offset='50%' stopColor='white' stopOpacity='0' />
//             <stop offset='100%' stopColor='white' stopOpacity='0.05' />
//           </linearGradient>

//           {/* Glow Filter for the traveling lights */}
//           <filter id='glow'>
//             <feGaussianBlur stdDeviation='2' result='coloredBlur' />
//             <feMerge>
//               <feMergeNode in='coloredBlur' />
//               <feMergeNode in='SourceGraphic' />
//             </feMerge>
//           </filter>
//         </defs>

//         {/* Background Decorative HUD */}
//         <g
//           fill='none'
//           stroke='#6366f1'
//           strokeWidth='1'
//           opacity='0.1'
//           vectorEffect='non-scaling-stroke'
//         >
//           <polyline points='9 96 9 41 42 9 101 9 124 39 197 40 220 9 250 9' />
//           <polyline points='354 8 455 9 490 41 490 98' />
//           <polyline points='9 376 9 457 41 491 99 490' />
//           <polyline points='238 492 351 491 372 465 456 465 489 432 490 357' />
//         </g>

//         <g>
//           {/* 3. The "Glass" Surface */}
//           <polygon
//             points='15 44.5 15 453.4 46 485 345.9 485 367 457.9 453.5 457.9 484 427.9 484 44 453.3 15 224 15 202 46 120 46 98 15 44.3 15'
//             fill='url(#glassShine)'
//             className='stroke-white/10 stroke-[0.5]'
//             vectorEffect='non-scaling-stroke'
//           />

//           {/* Main Frame Shadow Fill */}
//           <polygon
//             points='15 44.5 15 453.4 46 485 345.9 485 367 457.9 453.5 457.9 484 427.9 484 44 453.3 15 224 15 202 46 120 46 98 15 44.3 15'
//             className='fill-indigo-500/5 stroke-indigo-400/20 stroke-[1]'
//             vectorEffect='non-scaling-stroke'
//           />

//           {/* Traveling Lights with Glow */}
//           <g filter='url(#glow)'>
//             {[0, 1, 2].map((i) => (
//               <polygon
//                 key={i}
//                 points='15 44.5 15 453.4 46 485 345.9 485 367 457.9 453.5 457.9 484 427.9 484 44 453.3 15 224 15 202 46 120 46 98 15 44.3 15'
//                 className='segment-move stroke-cyan-400 fill-none stroke-[2]'
//                 vectorEffect='non-scaling-stroke'
//                 strokeLinecap='round'
//               />
//             ))}
//           </g>
//         </g>

//         {/* Pulsing Arrows */}
//         <g>
//           {[56, 71, 86, 101, 116, 131, 146, 161, 176, 191, 206, 221].map(
//             (x, i) => (
//               <path
//                 key={i}
//                 className='arrow-path'
//                 d={`M${x},465 l-6,0 l4,7 l-4,7 l6,0 l4,-7 l-4,-7 z`}
//                 vectorEffect='non-scaling-stroke'
//               />
//             ),
//           )}
//         </g>
//       </svg>
//     </div>
//   );
// };

/// new

// export default CyberGlassPanel;

// import React, { useLayoutEffect, useRef } from 'react';
// import gsap from 'gsap';

// const CyberHero = () => {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const glassRef = useRef<HTMLDivElement>(null);
//   const svgRef = useRef<SVGSVGElement>(null);

//   useLayoutEffect(() => {
//     const ctx = gsap.context(() => {
//       // 1. Entrance Animation: Sequential reveal
//       const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

//       tl.from('.hero-line span', {
//         y: 100,
//         rotateZ: 10,
//         stagger: 0.1,
//         duration: 1.5,
//       })
//         .from(
//           glassRef.current,
//           {
//             opacity: 0,
//             scale: 0.9,
//             duration: 2,
//           },
//           '-=1',
//         )
//         .from(
//           '.nav-item',
//           {
//             opacity: 0,
//             y: -20,
//             stagger: 0.05,
//           },
//           '-=1.5',
//         );

//       // 2. Parallax Tilt Effect: The "Principal Engineer" touch
//       const onMouseMove = (e: MouseEvent) => {
//         const { clientX, clientY } = e;
//         const { innerWidth, innerHeight } = window;

//         // Calculate rotation (max 10 degrees)
//         const xRot = (clientY / innerHeight - 0.5) * 15;
//         const yRot = (clientX / innerWidth - 0.5) * -15;

//         gsap.to(glassRef.current, {
//           rotateX: xRot,
//           rotateY: yRot,
//           duration: 1.2,
//           ease: 'power2.out',
//           overwrite: 'auto',
//         });
//       };

//       window.addEventListener('mousemove', onMouseMove);

//       // 3. Re-using your seamless stroke logic
//       const segments = svgRef.current?.querySelectorAll('.segment-move');
//       segments?.forEach((el, i) => {
//         const poly = el as SVGGeometryElement;
//         const len = poly.getTotalLength();
//         gsap.set(poly, {
//           strokeDasharray: `80 ${len / 2 - 80}`,
//           strokeDashoffset: i * (len / 3),
//         });
//         gsap.to(poly, {
//           strokeDashoffset: `-=${len}`,
//           duration: 8,
//           repeat: -1,
//           ease: 'none',
//         });
//       });

//       // 4. Arrow Pulse
//       gsap.fromTo(
//         '.arrow-path',
//         { opacity: 0.1, fill: '#14532d' },
//         {
//           opacity: 1,
//           fill: '#4ade80',
//           stagger: 0.08,
//           repeat: -1,
//           yoyo: true,
//           duration: 0.8,
//           ease: 'none',
//         },
//       );
//     }, containerRef);

//     return () => ctx.revert();
//   }, []);

//   return (
//     <div
//       ref={containerRef}
//       className='relative w-screen h-screen bg-[#020617] overflow-hidden flex items-center justify-center perspective-[1500px]'
//     >
//       {/* Background Ambient "Dust" or Blobs */}
//       <div className='absolute top-1/4 -left-20 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px]' />
//       <div className='absolute bottom-1/4 -right-20 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px]' />

//       {/* THE GLASS CONTAINER */}
//       <div
//         ref={glassRef}
//         className='relative w-[90vw] h-[85vh] preserve-3d transition-transform will-change-transform'
//       >
//         {/* Backdrop Blur Surface */}
//         <div className='absolute inset-0 backdrop-blur-xl bg-white/[0.01] border border-white/10 rounded-xl shadow-2xl overflow-hidden'>
//           {/* Subtle Scanline Overlay */}
//           <div className='absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_4px,3px_100%]' />
//         </div>

//         {/* YOUR SVG HUD FRAME */}
//         <svg
//           ref={svgRef}
//           viewBox='0 0 500 500'
//           preserveAspectRatio='none'
//           className='absolute inset-0 w-full h-full z-20 pointer-events-none'
//         >
//           <defs>
//             <filter id='glow'>
//               <feGaussianBlur stdDeviation='2.5' />
//               <feMerge>
//                 <feMergeNode />
//                 <feMergeNode in='SourceGraphic' />
//               </feMerge>
//             </filter>
//           </defs>
//           <polygon
//             points='15 44.5 15 453.4 46 485 345.9 485 367 457.9 453.5 457.9 484 427.9 484 44 453.3 15 224 15 202 46 120 46 98 15 44.3 15'
//             className='fill-transparent stroke-white/10 stroke-[1]'
//             vectorEffect='non-scaling-stroke'
//           />
//           <g filter='url(#glow)'>
//             {[0, 1, 2].map((i) => (
//               <polygon
//                 key={i}
//                 points='15 44.5 15 453.4 46 485 345.9 485 367 457.9 453.5 457.9 484 427.9 484 44 453.3 15 224 15 202 46 120 46 98 15 44.3 15'
//                 className='segment-move stroke-cyan-400/80 fill-none stroke-[2]'
//                 vectorEffect='non-scaling-stroke'
//                 strokeLinecap='round'
//               />
//             ))}
//           </g>
//           <g>
//             {[56, 71, 86, 101, 116, 131, 146, 161, 176, 191, 206, 221].map(
//               (x, i) => (
//                 <path
//                   key={i}
//                   className='arrow-path'
//                   d={`M${x},465 l-6,0 l4,7 l-4,7 l6,0 l4,-7 l-4,-7 z`}
//                   vectorEffect='non-scaling-stroke'
//                 />
//               ),
//             )}
//           </g>
//         </svg>

//         {/* HERO CONTENT AREA */}
//         <div className='relative z-30 h-full w-full flex flex-col justify-center p-12 lg:p-24 pointer-events-auto'>
//           <p className='nav-item text-cyan-400 font-mono tracking-widest uppercase text-sm mb-4'>
//             System Initialized // Portfolio v2026
//           </p>

//           <h1 className='hero-line text-6xl lg:text-9xl font-bold text-white leading-none overflow-hidden'>
//             <span className='inline-block'>ALEX</span>
//             <br />
//             <span className='inline-block text-transparent stroke-text'>
//               RIVERA
//             </span>
//           </h1>

//           <div className='hero-line mt-8 max-w-lg overflow-hidden'>
//             <span className='block text-indigo-200 text-lg lg:text-xl font-light leading-relaxed'>
//               Principal Creative Engineer specializing in building immersive
//               digital experiences through advanced motion and system-level
//               design.
//             </span>
//           </div>

//           <div className='mt-12 flex gap-8 nav-item'>
//             <button className='px-8 py-3 bg-cyan-500/10 border border-cyan-500/50 text-cyan-400 uppercase tracking-tighter hover:bg-cyan-500 hover:text-black transition-all duration-300'>
//               View Matrix
//             </button>
//             <div className='flex flex-col justify-center'>
//               <span className='text-white/40 text-[10px] font-mono uppercase tracking-[0.2em]'>
//                 Location
//               </span>
//               <span className='text-white text-xs font-mono'>
//                 LAT: 34.0522 // LON: -118.2437
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Global CSS for the stroke effect */}
//       <style>{`
//         .stroke-text {
//           -webkit-text-stroke: 1px rgba(255,255,255,0.3);
//         }
//         .preserve-3d { transform-style: preserve-3d; }
//       `}</style>
//     </div>
//   );
// };

// export default CyberHero;

///// new
