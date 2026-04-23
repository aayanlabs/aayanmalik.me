"use client";

import { motion } from "framer-motion";

const skillCategories = [
  {
    name: "AI / ML",
    skills: ["Neural Networks", "Computer Vision", "NLP", "PyTorch", "TensorFlow"],
    color: "from-electric-blue to-cyan-400",
  },
  {
    name: "Engineering",
    skills: ["Next.js", "TypeScript", "Python", "Go", "Distributed Systems"],
    color: "from-purple-glow to-pink-500",
  },
  {
    name: "Design",
    skills: ["UI/UX", "Motion Design", "Three.js", "Figma", "Branding"],
    color: "from-amber-400 to-orange-500",
  },
  {
    name: "Growth",
    skills: ["Product Strategy", "Automation", "Scale", "System Architecture"],
    color: "from-emerald-400 to-teal-500",
  },
];

export function SkillsSection() {
  return (
    <section id="skills" className="py-32 px-6">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <span className="text-xs font-space tracking-[0.4em] text-white/30 uppercase mb-4 block">
            02 / Expertise
          </span>
          <h2 className="text-5xl md:text-7xl font-bold">
            TECH <span className="text-white/20 italic">ARSENAL</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, i) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="glass p-8 rounded-[2rem] hover:bg-white/[0.05] transition-colors group"
            >
              <h3 className={`text-xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r ${category.color}`}>
                {category.name}
              </h3>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-space text-white/60 group-hover:text-white group-hover:border-white/20 transition-all"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
