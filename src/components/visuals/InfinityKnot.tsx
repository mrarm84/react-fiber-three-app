import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useAudioReact } from '../../hooks/useAudioReact';
import * as THREE from 'three';

interface VisualProps {
  dataArray: Uint8Array | null;
  isPreview: boolean;
}

export const InfinityKnot = ({ dataArray, isPreview }: VisualProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { smoothedIntensity, color } = useAudioReact(dataArray);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      meshRef.current.scale.setScalar(0.8 + smoothedIntensity.current * 0.6);
    }
  });

  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[1.5, 0.2, 100, 16, 2, 3]} />
      <meshStandardMaterial 
        color={color.current} 
        wireframe 
        emissive={color.current} 
        emissiveIntensity={smoothedIntensity.current * 6} 
      />
    </mesh>
  );
};
