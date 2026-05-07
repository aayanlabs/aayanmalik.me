"use client";

import { Html, useProgress } from "@react-three/drei";

export function Loader() {
  const { progress } = useProgress();

  return (
    <Html center>
      <div className="flex flex-col items-center justify-center">
        <div className="w-20 h-20 border-4 border-electric-blue border-t-transparent rounded-full animate-spin" />
        <p className="mt-4 font-space text-electric-blue font-bold tracking-widest uppercase">
          {progress.toFixed(2)}%
        </p>
      </div>
    </Html>
  );
}
