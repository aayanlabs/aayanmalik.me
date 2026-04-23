"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 150);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-background flex flex-col items-center justify-center"
        >
          <div className="relative w-32 h-32 mb-8">
            {/* Brain/Neural Network SVG */}
            <svg viewBox="0 0 100 100" className="w-full h-full text-electric-blue">
              <motion.path
                d="M50 20 L30 40 L30 60 L50 80 L70 60 L70 40 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              <motion.circle
                cx="50" cy="50" r="2"
                fill="currentColor"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
              {[30, 70].map((x, i) => (
                <motion.circle
                  key={i}
                  cx={x} cy="50" r="1"
                  fill="currentColor"
                  animate={{ scale: [1, 2, 1] }}
                  transition={{ duration: 1.5, delay: i * 0.5, repeat: Infinity }}
                />
              ))}
            </svg>
            <div className="absolute inset-0 bg-electric-blue/20 blur-3xl rounded-full animate-pulse-slow" />
          </div>

          <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden relative">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-electric-blue to-purple-glow"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
            />
          </div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 font-space text-xs tracking-[0.3em] text-white/50 uppercase"
          >
            Initializing Systems {Math.round(progress)}%
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
