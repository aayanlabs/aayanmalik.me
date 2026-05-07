"use client";

import { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Loader } from "@/components/3d/Loader";
import { Island } from "@/components/3d/Island";
import { Sky } from "@/components/3d/Sky";
import { Bird } from "@/components/3d/Bird";
import { Plane } from "@/components/3d/Plane";
import { HomeInfo } from "@/components/HomeInfo";
import { Navbar } from "@/components/Navbar";
import { LoadingScreen } from "@/components/LoadingScreen";
import { CommandMenu } from "@/components/CommandMenu";
import { EasterEgg } from "@/components/EasterEgg";

export default function Home() {
  const [isRotating, setIsRotating] = useState(false);
  const [currentStage, setCurrentStage] = useState<number | null>(1);
  const [islandScale, setIslandScale] = useState<[number, number, number]>([1, 1, 1]);
  const [islandPosition, setIslandPosition] = useState<[number, number, number]>([0, -6.5, -43]);
  const [planeScale, setPlaneScale] = useState<[number, number, number]>([3, 3, 3]);
  const [planePosition, setPlanePosition] = useState<[number, number, number]>([0, -4, -4]);

  useEffect(() => {
    const adjustIslandForScreenSize = () => {
      let screenScale: [number, number, number] = [1, 1, 1];
      let screenPosition: [number, number, number] = [0, -6.5, -43];

      if (window.innerWidth < 768) {
        screenScale = [0.9, 0.9, 0.9];
        screenPosition = [0, -6.5, -43.4];
      } else {
        screenScale = [1, 1, 1];
        screenPosition = [0, -6.5, -43.4];
      }

      return [screenScale, screenPosition] as const;
    };

    const adjustPlaneForScreenSize = () => {
      let screenScale: [number, number, number];
      let screenPosition: [number, number, number];

      if (window.innerWidth < 768) {
        screenScale = [1.5, 1.5, 1.5];
        screenPosition = [0, -1.5, 0];
      } else {
        screenScale = [3, 3, 3];
        screenPosition = [0, -4, -4];
      }

      return [screenScale, screenPosition] as const;
    };

    const [isScale, isPos] = adjustIslandForScreenSize();
    const [plScale, plPos] = adjustPlaneForScreenSize();

    setIslandScale(isScale);
    setIslandPosition(isPos);
    setPlaneScale(plScale);
    setPlanePosition(plPos);
  }, []);

  return (
    <main className="w-full h-screen relative bg-background overflow-hidden">
      <LoadingScreen />
      <Navbar />
      <CommandMenu />
      <EasterEgg />

      <HomeInfo currentStage={currentStage} />

      <Canvas
        className={`w-full h-screen bg-transparent ${
          isRotating ? "cursor-grabbing" : "cursor-grab"
        }`}
        camera={{ near: 0.1, far: 1000 }}
      >
        <Suspense fallback={<Loader />}>
          <directionalLight position={[1, 1, 1]} intensity={2} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 5, 10]} intensity={2} />
          <spotLight
            position={[0, 50, 10]}
            angle={0.15}
            penumbra={1}
            intensity={2}
          />
          <hemisphereLight
            color="#b1e1ff"
            groundColor="#000000"
            intensity={1}
          />

          <Bird />
          <Sky isRotating={isRotating} />
          <Island
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            setCurrentStage={setCurrentStage}
            position={islandPosition}
            rotation={[0.1, 4.7, 0]}
            scale={islandScale}
          />
          <Plane
            isRotating={isRotating}
            position={planePosition}
            rotation={[0, 20.1, 0]}
            scale={planeScale}
          />
        </Suspense>
      </Canvas>
    </main>
  );
}
