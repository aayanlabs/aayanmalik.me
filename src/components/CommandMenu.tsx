"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Home, User, Code, Terminal, Mail, X } from "lucide-react";

const commands = [
  { icon: Home, label: "Go Home", href: "/" },
  { icon: User, label: "About Me", href: "/about" },
  { icon: Code, label: "View Projects", href: "/projects" },
  { icon: Terminal, label: "Skills & Tech", href: "/about#skills" },
  { icon: Mail, label: "Contact Me", href: "/contact" },
];

export function CommandMenu() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && !isOpen) {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-xl glass rounded-3xl z-[101] overflow-hidden"
          >
            <div className="p-6 border-b border-white/10 flex items-center gap-4">
              <Search className="w-5 h-5 text-white/30" />
              <input 
                autoFocus
                placeholder="Type a command..."
                className="bg-transparent border-none outline-none flex-1 text-lg font-space"
              />
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                <X className="w-4 h-4 text-white/30" />
              </button>
            </div>
            
            <div className="p-4">
              <p className="text-[10px] font-space tracking-[0.2em] text-white/20 uppercase mb-4 ml-2">Quick Navigation</p>
              <div className="space-y-2">
                {commands.map((cmd) => (
                  <a
                    key={cmd.label}
                    href={cmd.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white/5 group transition-colors"
                  >
                    <div className="p-2 rounded-xl bg-white/5 group-hover:bg-electric-blue group-hover:text-black transition-colors">
                      <cmd.icon className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-medium group-hover:translate-x-1 transition-transform">{cmd.label}</span>
                    <span className="ml-auto text-[10px] font-space text-white/10 uppercase group-hover:text-white/30 transition-colors">Select</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="p-4 bg-white/[0.02] border-t border-white/10 flex justify-between items-center">
              <div className="flex gap-4">
                <span className="text-[10px] font-space text-white/30">ESC to close</span>
                <span className="text-[10px] font-space text-white/30">↑↓ to navigate</span>
              </div>
              <span className="text-[10px] font-space text-electric-blue/50">AayanLabs OS v1.0.4</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
