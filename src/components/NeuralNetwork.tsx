"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Particles({ count = 100 }) {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 10;
      p[i * 3 + 1] = (Math.random() - 0.5) * 10;
      p[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return p;
  }, [count]);

  const ref = useRef<THREE.Points>(null!);

  useFrame((state) => {
    ref.current.rotation.y += 0.001;
    ref.current.rotation.x += 0.0005;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length / 3}
          args={[points, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#00d2ff"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

function Connections({ count = 50 }) {
  const ref = useRef<THREE.LineSegments>(null!);
  
  const lines = useMemo(() => {
    const l = new Float32Array(count * 2 * 3);
    for (let i = 0; i < count; i++) {
      // Start point
      l[i * 6] = (Math.random() - 0.5) * 10;
      l[i * 6 + 1] = (Math.random() - 0.5) * 10;
      l[i * 6 + 2] = (Math.random() - 0.5) * 10;
      // End point
      l[i * 6 + 3] = l[i * 6] + (Math.random() - 0.5) * 2;
      l[i * 6 + 4] = l[i * 6 + 1] + (Math.random() - 0.5) * 2;
      l[i * 6 + 5] = l[i * 6 + 2] + (Math.random() - 0.5) * 2;
    }
    return l;
  }, [count]);

  useFrame(() => {
    ref.current.rotation.y += 0.001;
    ref.current.rotation.x += 0.0005;
  });

  return (
    <lineSegments ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={lines.length / 3}
          args={[lines, 3]}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#00d2ff" transparent opacity={0.1} />
    </lineSegments>
  );
}

export function NeuralNetwork() {
  return (
    <div className="absolute inset-0 z-0 opacity-40">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <color attach="background" args={["#050505"]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Particles count={200} />
        <Connections count={100} />
      </Canvas>
    </div>
  );
}
