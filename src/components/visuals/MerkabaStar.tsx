import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useAudioReact } from '../../hooks/useAudioReact';
import * as THREE from 'three';

interface VisualProps {
  dataArray: Uint8Array | null;
  isPreview: boolean;
}

export const MerkabaStar = ({ dataArray, isPreview }: VisualProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const { smoothedIntensity, color } = useAudioReact(dataArray);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.4;
      groupRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      groupRef.current.scale.setScalar(0.7 + smoothedIntensity.current * 0.5);
    }
  });

  return (
    <group ref={groupRef}>
      <mesh rotation={[0, 0, 0]}>
        <tetrahedronGeometry args={[2]} />
        <meshStandardMaterial color={color.current} wireframe transparent opacity={0.6} />
      </mesh>
      <mesh rotation={[Math.PI, 0, 0]}>
        <tetrahedronGeometry args={[2]} />
        <meshStandardMaterial color={color.current} wireframe transparent opacity={0.6} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshBasicMaterial color={color.current} emissive={color.current} emissiveIntensity={5} />
      </mesh>
    </group>
  );
};
