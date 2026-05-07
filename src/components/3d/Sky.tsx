"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export function Sky({ isRotating }: { isRotating: boolean }) {
  const skyRef = useRef<THREE.Mesh>(null);
  // const { nodes, materials } = useGLTF("/assets/sky.glb") as any;
  const nodes = null as any;
  const materials = null as any;

  useFrame((_, delta) => {
    if (isRotating && skyRef.current) {
      skyRef.current.rotation.y += 0.15 * delta;
    }
  });

  return (
    <mesh ref={skyRef}>
      {nodes ? (
        <primitive object={nodes.Sky_Material_0} />
      ) : (
        /* Enhanced Procedural Sky Fallback */
        <group>
          <mesh>
            <sphereGeometry args={[500, 64, 64]} />
            <meshBasicMaterial color="#000814" side={THREE.BackSide} />
          </mesh>
          {/* Stars */}
          {Array.from({ length: 200 }).map((_, i) => (
            <mesh 
              key={i} 
              position={[
                (Math.random() - 0.5) * 800,
                (Math.random() - 0.5) * 800,
                (Math.random() - 0.5) * 800
              ]}
            >
              <sphereGeometry args={[Math.random() * 0.5, 8, 8]} />
              <meshBasicMaterial color="#ffffff" />
            </mesh>
          ))}
        </group>
      )}
    </mesh>
  );
}
