"use client";

import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

export function Plane({ isRotating, ...props }: { isRotating: boolean; [key: string]: any }) {
  const planeRef = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF("/assets/plane.glb") as any;
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
        /* Fallback: Simple box plane */
        <mesh>
          <boxGeometry args={[1, 0.2, 2]} />
          <meshStandardMaterial color="#ff0000" />
        </mesh>
      )}
    </mesh>
  );
}
