import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useAudioReact } from '../../hooks/useAudioReact';
import { Line } from '@react-three/drei';
import * as THREE from 'three';

interface VisualProps {
  dataArray: Uint8Array | null;
  isPreview: boolean;
}

export const Antahkarana = ({ dataArray, isPreview }: VisualProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const { smoothedIntensity, color } = useAudioReact(dataArray);

  const points = [
    new THREE.Vector3(0, 1.5, 0),
    new THREE.Vector3(1.3, -0.7, 0),
    new THREE.Vector3(-1.3, -0.7, 0),
    new THREE.Vector3(0, 1.5, 0),
  ];

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = state.clock.elapsedTime * 0.5;
      groupRef.current.scale.setScalar(0.8 + smoothedIntensity.current * 0.6);
    }
  });

  return (
    <group ref={groupRef}>
      {[0, 1, 2].map(i => (
        <group key={i} rotation={[0, 0, (i * Math.PI * 2) / 3]}>
          <Line 
            points={points} 
            color={color.current} 
            lineWidth={3} 
            transparent 
            opacity={0.8} 
          />
        </group>
      ))}
      <mesh>
        <circleGeometry args={[2, 64]} />
        <meshBasicMaterial color={color.current} wireframe transparent opacity={0.1} />
      </mesh>
    </group>
  );
};
