import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useAudioReact } from '../../hooks/useAudioReact';
import * as THREE from 'three';

interface VisualProps {
  dataArray: Uint8Array | null;
  isPreview: boolean;
}

export const TorusKnot = ({ dataArray, isPreview }: VisualProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { smoothedIntensity, color } = useAudioReact(dataArray);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      const scale = 0.8 + smoothedIntensity.current * 0.6;
      meshRef.current.scale.setScalar(scale);
    }
  });

  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[1.2, 0.4, isPreview ? 64 : 128, 16]} />
      <meshStandardMaterial 
        color={color.current} 
        wireframe 
        emissive={color.current} 
        emissiveIntensity={smoothedIntensity.current * 5} 
      />
    </mesh>
  );
};
