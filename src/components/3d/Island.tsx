"use client";

import { useRef, useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

interface IslandProps {
  isRotating: boolean;
  setIsRotating: (isRotating: boolean) => void;
  setCurrentStage: (stage: number | null) => void;
  [key: string]: any;
}

export function Island({ isRotating, setIsRotating, setCurrentStage, ...props }: IslandProps) {
  const islandRef = useRef<THREE.Group>(null);
  const { gl, viewport } = useThree();
  
  // Note: Replace with actual model path later. 
  // For now, we'll try to load it, but handle errors gracefully.
  const { nodes, materials } = useGLTF("/assets/island.glb") as any;

  const lastX = useRef(0);
  const rotationSpeed = useRef(0);
  const dampingFactor = 0.95;

  const handlePointerDown = (e: PointerEvent | TouchEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsRotating(true);

    const clientX = 'touches' in e ? e.touches[0].clientX : (e as PointerEvent).clientX;
    lastX.current = clientX;
  };

  const handlePointerUp = (e: PointerEvent | TouchEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsRotating(false);
  };

  const handlePointerMove = (e: PointerEvent | TouchEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (isRotating && islandRef.current) {
      const clientX = 'touches' in e ? e.touches[0].clientX : (e as PointerEvent).clientX;
      const delta = (clientX - lastX.current) / viewport.width;
      
      islandRef.current.rotation.y += delta * 0.01 * Math.PI;
      lastX.current = clientX;
      rotationSpeed.current = delta * 0.01 * Math.PI;
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      if (!isRotating) setIsRotating(true);
      if (islandRef.current) islandRef.current.rotation.y += 0.01 * Math.PI;
      rotationSpeed.current = 0.0125;
    } else if (e.key === "ArrowRight") {
      if (!isRotating) setIsRotating(true);
      if (islandRef.current) islandRef.current.rotation.y -= 0.01 * Math.PI;
      rotationSpeed.current = -0.0125;
    }
  };

  const handleKeyUp = (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      setIsRotating(false);
    }
  };

  useEffect(() => {
    const canvas = gl.domElement;
    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [gl, handlePointerDown, handlePointerUp, handlePointerMove]);

  useFrame(() => {
    if (!islandRef.current) return;

    if (!isRotating) {
      rotationSpeed.current *= dampingFactor;

      if (Math.abs(rotationSpeed.current) < 0.001) {
        rotationSpeed.current = 0;
      }

      islandRef.current.rotation.y += rotationSpeed.current;
    } else {
      const rotation = islandRef.current.rotation.y;

      /**
       * Mapping rotation to stages
       */
      const normalizedRotation =
        ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

      // Set the current stage based on the island's orientation
      switch (true) {
        case normalizedRotation >= 5.45 && normalizedRotation <= 5.85:
          setCurrentStage(4);
          break;
        case normalizedRotation >= 0.85 && normalizedRotation <= 1.3:
          setCurrentStage(3);
          break;
        case normalizedRotation >= 2.4 && normalizedRotation <= 2.6:
          setCurrentStage(2);
          break;
        case normalizedRotation >= 4.25 && normalizedRotation <= 4.75:
          setCurrentStage(1);
          break;
        default:
          setCurrentStage(null);
      }
    }
  });

  return (
    <group ref={islandRef} {...props}>
      {nodes ? (
        <group dispose={null}>
          <mesh
            geometry={nodes.polySurface944_tree_body_0.geometry}
            material={materials.PaletteMaterial001}
          />
          <mesh
            geometry={nodes.polySurface945_tree_1_0.geometry}
            material={materials.PaletteMaterial001}
          />
          <mesh
            geometry={nodes.polySurface946_tree_2_0.geometry}
            material={materials.PaletteMaterial001}
          />
          <mesh
            geometry={nodes.polySurface947_tree_1_0.geometry}
            material={materials.PaletteMaterial001}
          />
          <mesh
            geometry={nodes.polySurface948_tree_2_0.geometry}
            material={materials.PaletteMaterial001}
          />
          <mesh
            geometry={nodes.polySurface949_tree_body_0.geometry}
            material={materials.PaletteMaterial001}
          />
          <mesh
            geometry={nodes.pCube11_rocks1_0.geometry}
            material={materials.PaletteMaterial001}
          />
        </group>
      ) : (
        /* Fallback Placeholder */
        <mesh>
          <torusKnotGeometry args={[10, 3, 100, 16]} />
          <meshStandardMaterial color="#00d2ff" wireframe />
        </mesh>
      )}
    </group>
  );
}
