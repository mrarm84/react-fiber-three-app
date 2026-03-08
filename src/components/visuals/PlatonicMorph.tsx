import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useAudioReact } from '../../hooks/useAudioReact';
import * as THREE from 'three';

interface VisualProps {
  dataArray: Uint8Array | null;
  isPreview: boolean;
}

export const PlatonicMorph = ({ dataArray, isPreview }: VisualProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { smoothedIntensity, color } = useAudioReact(dataArray);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.4;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.1;
      meshRef.current.scale.setScalar(1.2 + smoothedIntensity.current * 0.8);
    }
  });

  return (
    <mesh ref={meshRef}>
      {/* Morph logic simplified by using a specific geometry that "feels" like it morphs or just pick one based on time */}
      <icosahedronGeometry args={[1, 0]} />
      <meshStandardMaterial 
        color={color.current} 
        wireframe 
        emissive={color.current} 
        emissiveIntensity={smoothedIntensity.current * 2} 
      />
    </mesh>
  );
};
