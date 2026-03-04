import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(useGSAP, TextPlugin);

const CinematicLoader = ({ onComplete }: { onComplete: () => void }) => {
  const scope = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => onComplete() // Notify parent to show main content
    });

    // 1. Typing Animation
    tl.to(".typing-text", {
      duration: 2,
      text: "Hello, I’m [Name]. I build [Websites] that people love to use.",
      ease: "none",
    })
    // 2. The Glitch Out
    .to(".typing-container", {
      duration: 0.1,
      skewX: 20,
      opacity: 0.5,
      x: 10,
    }, "+=0.5")
    .to(".typing-container", {
      duration: 0.1,
      skewX: -20,
      x: -10,
      clipPath: "inset(20% 0 50% 0)",
    })
    .to(".loader-wrapper", { opacity: 0, display: "none", duration: 0.2 })
    
    // 3. The Border Light (Running across the page)
    // We animate a hidden border element here
    .fromTo(".border-light", 
      { offsetDistance: "0%" }, 
      { offsetDistance: "100%", duration: 1.5, ease: "power2.inOut" },
      "-=0.2"
    );

  }, { scope });

  return (
    <div ref={scope} className="loader-wrapper fixed inset-0 z-[100] bg-black flex items-center justify-center">
      {/* The Typing Area */}
      <div className="typing-container text-white font-mono text-xl md:text-3xl tracking-tight">
        <span>&lt;</span>
        <span className="typing-text"></span>
        <span>&gt;</span>
        <span className="ml-1 inline-block w-2 h-8 bg-blue-500 animate-pulse align-middle" />
      </div>

      {/* The Border Light Trace */}
      <div className="border-light absolute w-1 h-20 bg-gradient-to-t from-blue-500 to-transparent blur-sm" 
           style={{ offsetPath: "path('M 0 100% L 100% 100% L 100% 0 L 0 0 Z')" }} />
    </div>
  );
};

export default CinematicLoader;