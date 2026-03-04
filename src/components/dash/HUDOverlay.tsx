// HUDOverlay.tsx
import React from 'react';

interface HUDOverlayProps {
  pathRef: React.RefObject<SVGPathElement | null>;
}

const HUDOverlay = ({ pathRef }: HUDOverlayProps) => (
  <svg
    viewBox='0 0 500 500'
    preserveAspectRatio='none'
    className='absolute inset-0 w-full h-full z-20 pointer-events-none'
  >
    <path
      ref={pathRef}
      d='M 15 44.5 L 15 453.4 L 46 485 L 345.9 485 L 367 457.9 L 453.5 457.9 L 484 427.9 L 484 44 L 453.3 15 L 224 15 L 202 46 L 120 46 L 98 15 L 44.3 15 Z'
      className='fill-none stroke-cyan-400 stroke-[2] invisible'
      vectorEffect='non-scaling-stroke'
    />
  </svg>
);

export default HUDOverlay;
