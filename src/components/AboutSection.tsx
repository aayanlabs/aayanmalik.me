"use client";

import { motion } from "framer-motion";

export function AboutSection() {
  return (
    <section id="about" className="py-32 px-6 bg-charcoal/30 relative">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="text-xs font-space tracking-[0.4em] text-purple-glow uppercase mb-4 block">
              01 / Core Identity
            </span>
            <h2 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
              DESIGNING <br />
              <span className="text-white/20 italic">INTELLIGENT</span> <br />
              EXPERIENCES.
            </h2>
            <div className="space-y-6 text-lg text-white/60 leading-relaxed max-w-xl">
              <p>
                I am a young builder obsessed with the intersection of 
                artificial intelligence and human-centric design. My work 
                focuses on creating tools that feel like magic but work with 
                mathematical precision.
              </p>
              <p>
                From architecting neural networks to crafting fluid interfaces, 
                I bridge the gap between complex backend systems and premium 
                user experiences.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="relative aspect-square"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-electric-blue/20 to-purple-glow/20 rounded-full blur-3xl" />
            <div className="relative z-10 w-full h-full glass rounded-[4rem] flex items-center justify-center p-12 overflow-hidden group">
              <div className="text-center">
                <span className="text-8xl font-bold text-white/5 group-hover:text-electric-blue/20 transition-colors duration-500">
                  AYN
                </span>
                <p className="mt-4 text-xs font-space tracking-[0.5em] text-white/30 uppercase">
                  Aayan Malik
                </p>
              </div>
              
              {/* Floating elements */}
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-10 right-10 w-20 h-20 glass rounded-2xl flex items-center justify-center text-xl"
              >
                🧠
              </motion.div>
              <motion.div 
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-10 left-10 w-16 h-16 glass rounded-2xl flex items-center justify-center text-xl"
              >
                💻
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
