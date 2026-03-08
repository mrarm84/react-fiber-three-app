import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useAudioReact } from '../../hooks/useAudioReact';
import * as THREE from 'three';

interface VisualProps {
  dataArray: Uint8Array | null;
  isPreview: boolean;
}

export const VectorEquilibrium = ({ dataArray, isPreview }: VisualProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { smoothedIntensity, color } = useAudioReact(dataArray);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = -state.clock.elapsedTime * 0.4;
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.scale.setScalar(1 + smoothedIntensity.current * 0.6);
    }
  });

  return (
    <mesh ref={meshRef}>
      {/* Cuboctahedron / Vector Equilibrium approximation */}
      <octahedronGeometry args={[1.5, 0]} />
      <meshStandardMaterial 
        color={color.current} 
        wireframe 
        emissive={color.current} 
        emissiveIntensity={smoothedIntensity.current * 3} 
      />
    </mesh>
  );
};
