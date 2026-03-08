import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useAudioReact } from '../../hooks/useAudioReact';
import { Line } from '@react-three/drei';
import * as THREE from 'three';

interface VisualProps {
  dataArray: Uint8Array | null;
  isPreview: boolean;
}

export const SriYantra = ({ dataArray, isPreview }: VisualProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const { smoothedIntensity, color } = useAudioReact(dataArray);

  const triangles = useMemo(() => {
    const tris = [];
    const count = isPreview ? 5 : 9;
    for (let i = 0; i < count; i++) {
      const scale = (i + 1) * 0.4;
      const points = [
        new THREE.Vector3(0, scale, 0),
        new THREE.Vector3(-scale, -scale * 0.5, 0),
        new THREE.Vector3(scale, -scale * 0.5, 0),
        new THREE.Vector3(0, scale, 0),
      ];
      tris.push({ points, up: i % 2 === 0 });
    }
    return tris;
  }, [isPreview]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = state.clock.elapsedTime * 0.1;
      groupRef.current.scale.setScalar(0.8 + smoothedIntensity.current * 0.5);
    }
  });

  return (
    <group ref={groupRef}>
      {triangles.map((tri, i) => (
        <group key={i} rotation={[0, 0, tri.up ? 0 : Math.PI]}>
          <Line 
            points={tri.points} 
            color={color.current} 
            lineWidth={2} 
            transparent 
            opacity={0.6} 
          />
        </group>
      ))}
      <mesh>
        <circleGeometry args={[isPreview ? 2.5 : 4, 64]} />
        <meshBasicMaterial color={color.current} wireframe transparent opacity={0.1} />
      </mesh>
    </group>
  );
};
