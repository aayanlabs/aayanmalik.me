"use client";

import { motion } from "framer-motion";
import { ExternalLink, Globe } from "lucide-react";
import Image from "next/image";

interface Project {
  title: string;
  description: string;
  tags: string[];
  link: string;
  github: string;
  image: string;
}

export function ProjectCard({ project, index }: { project: Project, index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative glass rounded-3xl overflow-hidden hover:border-electric-blue/50 transition-colors"
    >
      <div className="relative h-64 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6 }}
          className="h-full w-full bg-charcoal"
        >
          {/* Using a placeholder for now, since I don't have project images */}
          <div className="w-full h-full flex items-center justify-center text-white/10 font-space text-4xl">
            {project.title}
          </div>
        </motion.div>
        
        <div className="absolute top-4 left-4 z-20 flex gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-space tracking-wider uppercase text-white/80">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="p-8 relative z-20">
        <h3 className="text-2xl font-bold mb-3 group-hover:text-electric-blue transition-colors">
          {project.title}
        </h3>
        <p className="text-white/50 text-sm leading-relaxed mb-6">
          {project.description}
        </p>

        <div className="flex items-center gap-4">
          <a
            href={project.link}
            target="_blank"
            className="p-2 rounded-full bg-white/5 hover:bg-electric-blue hover:text-black transition-all"
          >
            <ExternalLink className="w-5 h-5" />
          </a>
          <a
            href={project.github}
            target="_blank"
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-all"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
          </a>
        </div>
      </div>

      {/* Hover Glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-electric-blue to-purple-glow opacity-0 group-hover:opacity-10 blur-xl transition-opacity pointer-events-none" />
    </motion.div>
  );
}
