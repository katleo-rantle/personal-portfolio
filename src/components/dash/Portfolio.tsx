import React, { useState, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { Terminal, Cpu, Layers, Mail } from 'lucide-react';

// --- SUB-COMPONENTS ---

const HUDOverlay = ({ svgRef }: { svgRef: React.RefObject<SVGSVGElement> | null}) => (
  <svg
    ref={svgRef}
    viewBox='0 0 500 500'
    preserveAspectRatio='none'
    className='absolute inset-0 w-full h-full z-20 pointer-events-none'
  >
    <defs>
      <filter id='glow'>
        <feGaussianBlur stdDeviation='2.5' result='coloredBlur' />
        <feMerge>
          <feMergeNode in='coloredBlur' />
          <feMergeNode in='SourceGraphic' />
        </feMerge>
      </filter>
    </defs>

    {/* Frame Base */}
    <polygon
      points='15 44.5 15 453.4 46 485 345.9 485 367 457.9 453.5 457.9 484 427.9 484 44 453.3 15 224 15 202 46 120 46 98 15 44.3 15'
      className='fill-transparent stroke-white/10 stroke-[1]'
      vectorEffect='non-scaling-stroke'
    />

    {/* Traveling Segments */}
    <g filter='url(#glow)'>
      {[0, 1, 2].map((i) => (
        <polygon
          key={i}
          points='15 44.5 15 453.4 46 485 345.9 485 367 457.9 453.5 457.9 484 427.9 484 44 453.3 15 224 15 202 46 120 46 98 15 44.3 15'
          className='segment-move stroke-cyan-400/80 fill-none stroke-[2.5]'
          vectorEffect='non-scaling-stroke'
          strokeLinecap='round'
        />
      ))}
    </g>

    {/* Pulsing Arrows */}
    <g>
      {[56, 71, 86, 101, 116, 131, 146, 161, 176, 191, 206, 221].map((x, i) => (
        <path
          key={i}
          className='arrow-path'
          d={`M${x},465 l-6,0 l4,7 l-4,7 l6,0 l4,-7 l-4,-7 z`}
          vectorEffect='non-scaling-stroke'
        />
      ))}
    </g>
  </svg>
);

const HeroView = () => (
  <div className='h-full flex flex-col justify-center'>
    <div className='flex items-center gap-2 mb-6 text-cyan-400 font-mono text-[10px] tracking-widest uppercase'>
      <Terminal size={14} /> System.execute("alex_rivera.init")
    </div>
    <h1 className='text-7xl lg:text-[9rem] font-black leading-[0.85] tracking-tighter mb-8'>
      ALEX
      <br />
      <span className='text-transparent stroke-text opacity-40'>RIVERA</span>
    </h1>
    <p className='text-indigo-200/60 text-lg lg:text-xl max-w-xl leading-relaxed font-light'>
      Creative Technologist architecting{' '}
      <span className='text-white font-normal'>
        high-fidelity motion systems
      </span>{' '}
      and immersive digital interfaces for the next web.
    </p>
  </div>
);

const ProjectsView = () => (
  <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
    <div className='space-y-8'>
      <div className='flex items-center gap-2 text-cyan-400 font-mono text-[10px] tracking-widest uppercase'>
        <Layers size={14} /> Repository.fetch_all()
      </div>
      {['Synapse V3', 'Aether Dashboard', 'Nexus Protocol'].map((p, i) => (
        <div
          key={i}
          className='group cursor-pointer border-b border-white/5 pb-4 transition-all hover:pl-4'
        >
          <span className='text-cyan-500 font-mono text-xs mr-4'>0{i + 1}</span>
          <h3 className='inline text-4xl lg:text-5xl font-bold uppercase italic transition-colors group-hover:text-cyan-400'>
            {p}
          </h3>
        </div>
      ))}
    </div>
    <div className='aspect-video bg-indigo-500/5 border border-white/10 rounded overflow-hidden relative group'>
      <div className='absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity' />
      <div className='flex items-center justify-center h-full text-white/20 font-mono text-[10px] uppercase'>
        Buffer_Ready_For_Deployment
      </div>
    </div>
  </div>
);

// --- MAIN PORTFOLIO COMPONENT ---

const Portfolio = () => {
  const [section, setSection] = useState('HERO');
  const containerRef = useRef<HTMLDivElement>(null);
  const glassRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. HUD Animations
      const segments = svgRef.current?.querySelectorAll('.segment-move');
      segments?.forEach((el, i) => {
        const poly = el as SVGGeometryElement;
        const len = poly.getTotalLength();
        gsap.set(poly, {
          strokeDasharray: `80 ${len / 2 - 80}`,
          strokeDashoffset: i * (len / 3),
        });
        gsap.to(poly, {
          strokeDashoffset: `-=${len}`,
          duration: 8,
          repeat: -1,
          ease: 'none',
        });
      });

      gsap.fromTo(
        '.arrow-path',
        { opacity: 0.1, fill: '#14532d' },
        {
          opacity: 1,
          fill: '#4ade80',
          stagger: 0.08,
          repeat: -1,
          yoyo: true,
          duration: 0.8,
          ease: 'none',
        },
      );

      // 2. Mouse Parallax (3D Tilt)
      const onMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 20;
        const yPos = (clientY / window.innerHeight - 0.5) * -20;
        gsap.to(glassRef.current, {
          rotateY: xPos,
          rotateX: yPos,
          duration: 1.2,
          ease: 'power2.out',
        });
      };
      window.addEventListener('mousemove', onMouseMove);
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // 3. Navigation Transition Logic
  const handleNav = (newSection: string) => {
    if (newSection === section) return;
    const tl = gsap.timeline({ onComplete: () => setSection(newSection) });
    tl.to(contentRef.current, {
      opacity: 0,
      x: -20,
      filter: 'blur(10px)',
      duration: 0.4,
      ease: 'power2.in',
    })
      .to(glassRef.current, {
        skewX: 2,
        opacity: 0.7,
        duration: 0.1,
        repeat: 1,
        yoyo: true,
      })
      .set(glassRef.current, { skewX: 0, opacity: 1 });
  };

  useLayoutEffect(() => {
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, x: 20, filter: 'blur(10px)' },
      {
        opacity: 1,
        x: 0,
        filter: 'blur(0px)',
        duration: 0.8,
        ease: 'expo.out',
        delay: 0.1,
      },
    );
  }, [section]);

  return (
    <div
      ref={containerRef}
      className='fixed inset-0 bg-[#020617] text-white overflow-hidden flex items-center justify-center perspective-[1500px]'
    >
      {/* Background Decor */}
      <div className='absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none'>
        <div className='absolute top-[10%] left-[10%] w-72 h-72 bg-indigo-600 rounded-full blur-[120px]' />
        <div className='absolute bottom-[10%] right-[10%] w-96 h-96 bg-cyan-600 rounded-full blur-[150px]' />
      </div>

      {/* NAVIGATION BAR */}
      <nav className='absolute top-10 left-1/2 -translate-x-1/2 z-[100] flex gap-8 items-center bg-white/5 backdrop-blur-md px-8 py-3 rounded-full border border-white/10'>
        {['Hero', 'Projects', 'Resume', 'Contact'].map((item) => (
          <button
            key={item}
            onClick={() => handleNav(item.toUpperCase())}
            className={`font-mono text-[10px] tracking-[0.2em] uppercase transition-all ${section === item.toUpperCase() ? 'text-cyan-400' : 'text-white/40 hover:text-white'}`}
          >
            {item}
          </button>
        ))}
      </nav>

      {/* MAIN GLASS PANEL */}
      <div
        ref={glassRef}
        className='relative w-[92vw] h-[85vh] preserve-3d will-change-transform'
      >
        {/* Glass Surface Backdrop */}
        <div className='absolute inset-0 backdrop-blur-2xl bg-white/[0.02] rounded-2xl border border-white/10 overflow-hidden shadow-[inset_0_0_80px_rgba(255,255,255,0.02)]'>
          {/* Scanline Effect */}
          <div className='absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.01),rgba(0,255,0,0.01),rgba(0,0,255,0.01))] bg-[length:100%_4px,3px_100%]' />
        </div>

        {/* HUD OVERLAY (SVG) */}
        <HUDOverlay svgRef={svgRef} />

        {/* CONTENT DYNAMIC LAYER */}
        <div
          ref={contentRef}
          className='relative z-50 h-full w-full p-12 lg:p-24 flex flex-col justify-center'
        >
          {section === 'HERO' && <HeroView />}
          {section === 'PROJECTS' && <ProjectsView />}
          {section === 'RESUME' && (
            <div className='text-4xl font-black italic opacity-20 italic'>
              RESUME_MODULE_OFFLINE
            </div>
          )}
          {section === 'CONTACT' && (
            <div className='text-4xl font-black italic opacity-20 italic'>
              COMMS_LINK_DISABLED
            </div>
          )}
        </div>
      </div>

      {/* STYLES */}
      <style>{`
        .stroke-text { -webkit-text-stroke: 1.5px rgba(255,255,255,0.3); }
        .preserve-3d { transform-style: preserve-3d; }
      `}</style>
    </div>
  );
};

export default Portfolio;
