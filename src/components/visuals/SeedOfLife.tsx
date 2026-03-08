import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useAudioReact } from '../../hooks/useAudioReact';
import * as THREE from 'three';

interface VisualProps {
  dataArray: Uint8Array | null;
  isPreview: boolean;
}

export const SeedOfLife = ({ dataArray, isPreview }: VisualProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const { smoothedIntensity, color } = useAudioReact(dataArray);

  const points = useMemo(() => {
    const pts = [{ x: 0, y: 0 }];
    const radius = 1;
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI * 2) / 6;
      pts.push({ x: Math.cos(angle) * radius, y: Math.sin(angle) * radius });
    }
    return pts;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = -state.clock.elapsedTime * 0.1;
      groupRef.current.scale.setScalar(1 + smoothedIntensity.current * 0.3);
    }
  });

  return (
    <group ref={groupRef}>
      {points.map((p, i) => (
        <mesh key={i} position={[p.x, p.y, 0]}>
          <ringGeometry args={[0.98, 1.0, 64]} />
          <meshBasicMaterial color={color.current} transparent opacity={0.7} />
        </mesh>
      ))}
    </group>
  );
};
