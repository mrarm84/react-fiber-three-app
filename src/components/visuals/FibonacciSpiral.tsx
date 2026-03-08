import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useAudioReact } from '../../hooks/useAudioReact';
import * as THREE from 'three';

interface VisualProps {
  dataArray: Uint8Array | null;
  isPreview: boolean;
}

export const FibonacciSpiral = ({ dataArray, isPreview }: VisualProps) => {
  const pointsRef = useRef<THREE.Points>(null);
  const { smoothedIntensity, color } = useAudioReact(dataArray);

  const count = isPreview ? 200 : 800;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const PHI = (1 + Math.sqrt(5)) / 2;
    const angleStep = Math.PI * 2 * PHI;
    
    for (let i = 0; i < count; i++) {
      const radius = Math.sqrt(i / count) * 4;
      const angle = i * angleStep;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = Math.sin(angle) * radius;
      pos[i * 3 + 2] = 0;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.z = state.clock.elapsedTime * 0.1;
      const scale = 1 + smoothedIntensity.current * 0.5;
      pointsRef.current.scale.setScalar(scale);
      
      const attr = pointsRef.current.geometry.attributes.position;
      for (let i = 0; i < count; i++) {
        const radius = Math.sqrt(i / count) * 4;
        const angle = i * (Math.PI * 2 * ((1 + Math.sqrt(5)) / 2)) + state.clock.elapsedTime * 0.1;
        attr.setXY(i, Math.cos(angle) * radius, Math.sin(angle) * radius);
        attr.setZ(i, Math.sin(state.clock.elapsedTime + i * 0.1) * smoothedIntensity.current * 2);
      }
      attr.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color={color.current} size={isPreview ? 0.05 : 0.08} transparent opacity={0.8} />
    </points>
  );
};
