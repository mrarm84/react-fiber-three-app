import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useAudioReact } from '../../hooks/useAudioReact';
import { Line } from '@react-three/drei';
import * as THREE from 'three';

interface VisualProps {
  dataArray: Uint8Array | null;
  isPreview: boolean;
}

export const MetatronsCube = ({ dataArray, isPreview }: VisualProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const { smoothedIntensity, color } = useAudioReact(dataArray);

  const points = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const radius = 1.5;
    
    // 13 circles of Fruit of Life
    pts.push(new THREE.Vector3(0, 0, 0));
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI * 2) / 6;
      pts.push(new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius, 0));
      pts.push(new THREE.Vector3(Math.cos(angle) * radius * 2, Math.sin(angle) * radius * 2, 0));
    }
    return pts;
  }, []);

  const connections = useMemo(() => {
    const lines = [];
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        lines.push([points[i], points[j]]);
      }
    }
    return lines;
  }, [points]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      groupRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      groupRef.current.scale.setScalar(0.8 + smoothedIntensity.current * 0.4);
    }
  });

  return (
    <group ref={groupRef}>
      {connections.map(([p1, p2], i) => (
        <Line 
          key={i} 
          points={[p1, p2]} 
          color={color.current} 
          lineWidth={1} 
          transparent 
          opacity={0.3 + (i % 3 === 0 ? smoothedIntensity.current : 0)} 
        />
      ))}
      {points.map((p, i) => (
        <mesh key={`p-${i}`} position={p}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshBasicMaterial color={color.current} />
        </mesh>
      ))}
    </group>
  );
};
