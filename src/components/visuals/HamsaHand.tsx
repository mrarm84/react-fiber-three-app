import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useAudioReact } from '../../hooks/useAudioReact';
import * as THREE from 'three';

interface VisualProps {
  dataArray: Uint8Array | null;
  isPreview: boolean;
}

export const HamsaHand = ({ dataArray, isPreview }: VisualProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { smoothedIntensity, color } = useAudioReact(dataArray);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
      meshRef.current.scale.setScalar(1 + smoothedIntensity.current * 0.5);
    }
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <octahedronGeometry args={[1.5, 0]} />
        <meshStandardMaterial 
          color={color.current} 
          wireframe 
          emissive={color.current} 
          emissiveIntensity={smoothedIntensity.current * 4} 
        />
      </mesh>
      <mesh position={[0, 0, 0.5]}>
        <circleGeometry args={[0.3, 32]} />
        <meshBasicMaterial color={color.current} emissive={color.current} emissiveIntensity={10} />
      </mesh>
    </group>
  );
};
