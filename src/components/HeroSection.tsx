"use client";

import { motion, Variants } from "framer-motion";
import { NeuralNetwork } from "./NeuralNetwork";
import { ArrowUpRight } from "lucide-react";

export function HeroSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <NeuralNetwork />
      
      {/* Grain Overlay */}
      <div className="absolute inset-0 z-1 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      <div className="container relative z-10 px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto"
        >
          <motion.div variants={itemVariants} className="mb-6 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-electric-blue animate-pulse shadow-[0_0_10px_#00d2ff]" />
            <span className="text-xs font-space tracking-[0.2em] text-white/50 uppercase">
              Available for high-impact projects
            </span>
          </motion.div>

          <motion.h1 
            variants={itemVariants}
            className="text-6xl md:text-8xl lg:text-9xl font-bold leading-[0.9] mb-8"
          >
            BUILDING PRODUCTS <br />
            THAT FEEL LIKE <br />
            <span className="text-gradient">THE FUTURE.</span>
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-white/60 max-w-2xl mb-12 leading-relaxed"
          >
            Young creator turning complex ideas into intelligent products, 
            premium interfaces, and high-performance systems. Focus on AI, Design, and Impact.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-6">
            <button className="group relative px-8 py-4 bg-white text-black font-semibold rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95">
              <span className="relative z-10 flex items-center gap-2">
                View Work <ArrowUpRight className="w-4 h-4" />
              </span>
              <div className="absolute inset-0 bg-electric-blue translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
            
            <button className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold rounded-full backdrop-blur-xl transition-all hover:scale-105 active:scale-95">
              Contact Me
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Background Glows */}
      <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-electric-blue/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-purple-glow/20 blur-[120px] rounded-full" />
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <span className="text-[10px] font-space tracking-[0.4em] text-white/30 uppercase">Scroll to explore</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/20 to-transparent" />
      </motion.div>
    </section>
  );
}
