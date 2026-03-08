import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useAudioReact } from '../../hooks/useAudioReact';
import * as THREE from 'three';

interface VisualProps {
  dataArray: Uint8Array | null;
  isPreview: boolean;
}

export const FlowerOfLife = ({ dataArray, isPreview }: VisualProps) => {
  const meshRef = useRef<THREE.Group>(null);
  const { smoothedIntensity, color } = useAudioReact(dataArray);

  const circles = useMemo(() => {
    const pts = [];
    const radius = 1;
    const layers = isPreview ? 2 : 3;
    
    // Center circle
    pts.push({ x: 0, y: 0 });
    
    for (let l = 1; l <= layers; l++) {
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI * 2) / 6;
        const cx = Math.cos(angle) * radius * l;
        const cy = Math.sin(angle) * radius * l;
        pts.push({ x: cx, y: cy });
        
        // Fill between corners for layers > 1
        if (l > 1) {
          for (let j = 1; j < l; j++) {
            const nextAngle = ((i + 1) * Math.PI * 2) / 6;
            const nx = Math.cos(nextAngle) * radius * l;
            const ny = Math.sin(nextAngle) * radius * l;
            const t = j / l;
            pts.push({ x: cx + (nx - cx) * t, y: cy + (ny - cy) * t });
          }
        }
      }
    }
    return pts;
  }, [isPreview]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.2;
      meshRef.current.scale.setScalar(1 + smoothedIntensity.current * 0.2);
    }
  });

  return (
    <group ref={meshRef}>
      {circles.map((p, i) => (
        <mesh key={i} position={[p.x, p.y, 0]}>
          <ringGeometry args={[0.98, 1.0, 64]} />
          <meshBasicMaterial color={color.current} transparent opacity={0.6} />
        </mesh>
      ))}
    </group>
  );
};
