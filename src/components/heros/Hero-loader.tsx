import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(useGSAP, TextPlugin);

export default function Loader({
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
      const tl = gsap.timeline({
        onComplete: () => onComplete(),
      });

      const phase1 = `Hello, I’m ${name}. I build Aps`;
      const phase2 = `Hello, I’m ${name}. I build `;
      const phase3 = `Hello, I’m ${name}. I build Apps that people love to use.`;

      // 1. Precise Typing Sequence
      tl.to(textRef.current, { duration: 2.5, text: phase1, ease: 'none' })
        .to({}, { duration: 0.6 }) // Thinking pause
        .to(textRef.current, { duration: 0.8, text: phase2, ease: 'none' }) // Deliberate backspace
        .to({}, { duration: 0.4 }) // Correction pause
        .to(textRef.current, { duration: 3.5, text: phase3, ease: 'none' });

      // 2. Glitch Out
      tl.to(
        '.text-container',
        {
          duration: 0.1,
          filter:
            'drop-shadow(4px 0px 0px #ff00c1) drop-shadow(-4px 0px 0px #00fff9)',
          x: -10,
        },
        '+=0.5',
      )
        .to('.text-container', { x: 10, duration: 0.1 })
        .to('.text-container', { opacity: 0, filter: 'none', duration: 0.3 });

      // 3. Strict Sequential Border Animation (No overlap)
      // Duration is set to 1.2s per side for a "slower" feel as requested
      const sideDuration = 1.2;
      const ease = 'power1.inOut';

      tl.to('.b-bottom', { width: '100%', duration: sideDuration, ease })
        .to('.b-left', { height: '100%', duration: sideDuration, ease })
        .to('.b-top', { width: '100%', duration: sideDuration, ease })
        .to('.b-right', { height: '100%', duration: sideDuration, ease });

      // 4. Final Slow Fade
      tl.to(
        scope.current,
        {
          opacity: 0,
          duration: 2.5,
          ease: 'power2.inOut',
        },
        '+=0.5',
      );
    },
    { scope },
  );

  return (
    <div
      ref={scope}
      className='fixed inset-0 z-[9999] flex items-center justify-center bg-black text-white font-mono overflow-hidden'
    >
      {/* Subtle CRT Overlay */}
      <div className='absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(18,16,16,0)_0%,rgba(0,0,0,0.5)_100%)] z-20' />

      <div className='text-container relative z-10 text-xl md:text-3xl px-8'>
        <span className='text-cyan-500'>&lt;</span>
        <span ref={textRef} className='text-gray-200 mx-2'></span>
        <span className='inline-block w-[12px] h-[1.1em] bg-cyan-500 align-middle animate-pulse' />
        <span className='text-cyan-500'>&gt;</span>
      </div>

      {/* Sequential Border Segments */}
      {/* Bottom Right to Left */}
      <div className='b-bottom absolute bottom-0 right-0 h-[1.5px] w-0 bg-cyan-500 shadow-[0_0_15px_#06b6d4]' />

      {/* Bottom Left to Top Left */}
      <div className='b-left absolute bottom-0 left-0 w-[1.5px] h-0 bg-cyan-500 shadow-[0_0_15px_#06b6d4]' />

      {/* Top Left to Top Right */}
      <div className='b-top absolute top-0 left-0 h-[1.5px] w-0 bg-cyan-500 shadow-[0_0_15px_#06b6d4]' />

      {/* Top Right to Bottom Right */}
      <div className='b-right absolute top-0 right-0 w-[1.5px] h-0 bg-cyan-500 shadow-[0_0_15px_#06b6d4]' />
    </div>
  );
}
