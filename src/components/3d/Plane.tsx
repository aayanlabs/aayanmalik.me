"use client";

import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

export function Plane({ isRotating, ...props }: { isRotating: boolean; [key: string]: any }) {
  const planeRef = useRef<THREE.Group>(null);
  // const { scene, animations } = useGLTF("/assets/plane.glb") as any;
  const scene = null as any;
  const animations = [] as any;
  const { actions } = useAnimations(animations, planeRef);

  useEffect(() => {
    if (actions && actions["Take 001"]) {
      if (isRotating) {
        actions["Take 001"].play();
      } else {
        actions["Take 001"].stop();
      }
    }
  }, [actions, isRotating]);

  return (
    <mesh ref={planeRef} {...props}>
      {scene ? (
        <primitive object={scene} />
      ) : (
        /* Enhanced Procedural Plane Fallback */
        <group scale={[0.5, 0.5, 0.5]}>
          {/* Body */}
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <capsuleGeometry args={[0.5, 2, 8, 16]} />
            <meshStandardMaterial color="#e53935" />
          </mesh>
          {/* Wings */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[5, 0.1, 1]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
          {/* Tail */}
          <mesh position={[-1, 0.5, 0]} rotation={[0, 0, 0.5]}>
            <boxGeometry args={[1, 1, 0.1]} />
            <meshStandardMaterial color="#e53935" />
          </mesh>
          {/* Propeller Hub */}
          <mesh position={[1.2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <sphereGeometry args={[0.3, 16, 16]} />
            <meshStandardMaterial color="#212121" />
          </mesh>
        </group>
      )}
    </mesh>
  );
}
