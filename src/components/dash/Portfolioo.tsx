// import React, { useRef, useEffect } from 'react';
// import { Canvas, useFrame, useThree } from '@react-three/fiber';
// import * as THREE from 'three';

// function StreakOverlay({
//   startRef,
//   endRef,
// }: {
//   startRef: React.RefObject<THREE.Object3D>;
//   endRef: React.RefObject<THREE.Object3D>;
// }) {
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);
//   const { camera, size } = useThree();

//   // Resize canvas correctly
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const dpr = window.devicePixelRatio || 1;

//     canvas.width = size.width * dpr;
//     canvas.height = size.height * dpr;
//     canvas.style.width = `${size.width}px`;
//     canvas.style.height = `${size.height}px`;

//     const ctx = canvas.getContext('2d');
//     if (!ctx) return;

//     ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
//   }, [size]);

//   useFrame(() => {
//     const canvas = canvasRef.current;
//     if (!canvas || !startRef.current || !endRef.current) return;

//     const ctx = canvas.getContext('2d');
//     if (!ctx) return;

//     ctx.clearRect(0, 0, size.width, size.height);

//     const start = new THREE.Vector3();
//     const end = new THREE.Vector3();

//     startRef.current.getWorldPosition(start);
//     endRef.current.getWorldPosition(end);

//     start.project(camera);
//     end.project(camera);

//     const startX = (start.x * 0.5 + 0.5) * size.width;
//     const startY = (1 - (start.y * 0.5 + 0.5)) * size.height;

//     const endX = (end.x * 0.5 + 0.5) * size.width;
//     const endY = (1 - (end.y * 0.5 + 0.5)) * size.height;

//     ctx.strokeStyle = 'cyan';
//     ctx.lineWidth = 3;
//     ctx.shadowColor = 'cyan';
//     ctx.shadowBlur = 20;

//     ctx.beginPath();

//     // Curved streak
//     const cp1X = startX + (endX - startX) * 0.25;
//     const cp1Y = startY - 100;

//     const cp2X = startX + (endX - startX) * 0.75;
//     const cp2Y = endY + 100;

//     ctx.moveTo(startX, startY);
//     ctx.bezierCurveTo(cp1X, cp1Y, cp2X, cp2Y, endX, endY);

//     ctx.stroke();
//   });

//   return (
//     <canvas
//       ref={canvasRef}
//       style={{
//         position: 'absolute',
//         inset: 0,
//         pointerEvents: 'none',
//       }}
//     />
//   );
// }

// function SceneContent() {
//   const startRef = useRef<THREE.Mesh>(null!);
//   const endRef = useRef<THREE.Mesh>(null!);

//   return (
//     <>
//       <mesh ref={startRef} position={[-2, 0, 0]}>
//         <sphereGeometry args={[0.5, 32, 32]} />
//         <meshStandardMaterial color='cyan' />
//       </mesh>

//       <mesh ref={endRef} position={[2, 1, 0]}>
//         <sphereGeometry args={[0.5, 32, 32]} />
//         <meshStandardMaterial color='magenta' />
//       </mesh>

//       <ambientLight />
//       <pointLight position={[10, 10, 10]} />

//       <StreakOverlay startRef={startRef} endRef={endRef} />
//     </>
//   );
// }

// export default function HologramStreakScene() {
//   return (
//     <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
//       <Canvas camera={{ position: [0, 0, 5] }}>
//         <SceneContent />
//       </Canvas>
//     </div>
//   );
// }

import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import {
  Canvas,
  useFrame,
  extend,
  type ThreeElement,
} from '@react-three/fiber'; // Use 'type' import
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';

// 1. Register the components
extend({ MeshLineGeometry, MeshLineMaterial });

// 2. Fix the Module Declaration with optional args
declare module '@react-three/fiber' {
  interface ThreeElements {
    meshLineGeometry: Partial<ThreeElement<typeof MeshLineGeometry>> & {
      points: number[];
    };
    meshLineMaterial: Partial<ThreeElement<typeof MeshLineMaterial>> & {
      color?: string | THREE.Color;
      lineWidth?: number;
      dashArray?: number;
      dashRatio?: number;
      dashOffset?: number;
      transparent?: boolean;
      opacity?: number;
    };
  }
}

const KineticStreak = () => {
  // Use 'any' for the ref here because meshline's internal types
  // conflict with Three.js Material types in some environments
  const materialRef = useRef<any>(null);

  const points = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-4, 2, 0),
      new THREE.Vector3(4, 2, 0),
      new THREE.Vector3(4.5, 1.5, 0),
      new THREE.Vector3(4.5, -1.5, 0),
      new THREE.Vector3(4, -2, 0),
      new THREE.Vector3(-4, -2, 0),
      new THREE.Vector3(-4.5, -1.5, 0),
      new THREE.Vector3(-4.5, 1.5, 0),
      new THREE.Vector3(-4, 2, 0),
    ]);
    // Flat array of numbers is required by MeshLine
    return curve.getPoints(120).flatMap((p) => [p.x, p.y, p.z]);
  }, []);

  useFrame((_state, delta) => {
    if (materialRef.current) {
      materialRef.current.dashOffset -= delta * 0.4;
    }
  });

  return (
    <group>
      {/* Static Background Frame */}
      <mesh>
        <meshLineGeometry points={points} />
        <meshLineMaterial
          transparent
          opacity={0.1}
          color='#ffffff'
          lineWidth={0.015}
        />
      </mesh>

      {/* The Kinetic Streak */}
      <mesh>
        <meshLineGeometry points={points} />
        <meshLineMaterial
          ref={materialRef}
          transparent
          lineWidth={0.06}
          color='#22d3ee'
          dashArray={0.25} // Length of streak
          dashRatio={0.75} // Gap
          dashOffset={0}
        />
      </mesh>
    </group>
  );
};

export const HUDCanvas = () => {
  return (
    <div className='absolute inset-0 pointer-events-none z-20'>
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <KineticStreak />
      </Canvas>
    </div>
  );
};