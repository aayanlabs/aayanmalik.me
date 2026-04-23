"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function EasterEgg() {
  const [input, setInput] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const newInput = (input + e.key).slice(-4);
      setInput(newInput);
      
      if (newInput.toLowerCase() === "labs") {
        setShow(true);
        setTimeout(() => setShow(false), 3000);
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [input]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className="fixed bottom-10 right-10 z-[102] glass p-6 rounded-2xl border-electric-blue/50"
        >
          <p className="text-sm font-space tracking-widest uppercase">
            🚀 <span className="text-electric-blue">AayanLabs</span> Protocol Activated
          </p>
          <p className="text-[10px] text-white/30 mt-2 uppercase">Building the future, one byte at a time.</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
