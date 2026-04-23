"use client";

import { motion } from "framer-motion";
import { ProjectCard } from "./ProjectCard";

const projects = [
  {
    title: "Rate My Fit",
    description: "AI-powered outfit rating system using computer vision and machine learning to provide instant style feedback.",
    tags: ["AI", "Python", "ML", "Web"],
    link: "https://ratemyfit.vercel.app",
    github: "https://github.com/aayanlabs/rate-my-fit",
    image: "/projects/ratemyfit.jpg",
  },
  {
    title: "AayanLabs OS",
    description: "A futuristic web-based desktop environment built with Next.js and Three.js, featuring real-time tools.",
    tags: ["Next.js", "Three.js", "GSAP"],
    link: "https://os.aayanlabs.me",
    github: "https://github.com/aayanlabs/os",
    image: "/projects/os.jpg",
  },
  {
    title: "MS Furnitures",
    description: "Sleek e-commerce experience for premium furniture, focusing on high-end transitions and UX.",
    tags: ["React", "Tailwind", "E-commerce"],
    link: "https://msfurnitures.in",
    github: "https://github.com/aayanlabs/ms-furnitures",
    image: "/projects/msfurnitures.jpg",
  },
];

export function ProjectsSection() {
  return (
    <section id="projects" className="py-32 px-6">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <span className="text-xs font-space tracking-[0.4em] text-electric-blue uppercase mb-4 block">
            03 / Selection of Work
          </span>
          <h2 className="text-5xl md:text-7xl font-bold">
            FEATURED <span className="text-white/20 italic">PROJECTS</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-20 flex justify-center"
        >
          <a
            href="https://github.com/aayanlabs"
            target="_blank"
            className="text-white/40 hover:text-white transition-colors flex items-center gap-2 group"
          >
            <span className="font-space tracking-widest text-xs uppercase">View all experiments on GitHub</span>
            <div className="w-8 h-[1px] bg-white/20 group-hover:w-12 transition-all group-hover:bg-electric-blue" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
