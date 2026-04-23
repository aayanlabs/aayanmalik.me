"use client";

import { motion } from "framer-motion";

const events = [
  {
    year: "2026",
    title: "AayanLabs Foundation",
    description: "Scaling high-impact products and exploring advanced AI integration in consumer tech.",
    status: "Current",
  },
  {
    year: "2025",
    title: "AI Engineering Mastery",
    description: "Deep dive into Large Language Models and Computer Vision systems. Building production-grade AI tools.",
    status: "Milestone",
  },
  {
    year: "2024",
    title: "First Major Startup Concept",
    description: "Launched initial web products and established a foundation in full-stack engineering and product design.",
    status: "Origin",
  },
];

export function TimelineSection() {
  return (
    <section id="timeline" className="py-32 px-6 bg-charcoal/20">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <span className="text-xs font-space tracking-[0.4em] text-white/30 uppercase mb-4 block">
            04 / Journey
          </span>
          <h2 className="text-5xl md:text-6xl font-bold">
            ROADMAP <span className="text-white/20 italic">& VISION</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-electric-blue via-purple-glow to-transparent md:-translate-x-1/2" />

          <div className="space-y-20">
            {events.map((event, i) => (
              <motion.div
                key={event.year}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                viewport={{ once: true }}
                className={`relative flex flex-col md:flex-row items-center ${
                  i % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Dot */}
                <div className="absolute left-[-5px] md:left-1/2 top-0 md:-translate-x-1/2 w-3 h-3 bg-white rounded-full border-4 border-electric-blue shadow-[0_0_15px_#00d2ff] z-10" />

                <div className="w-full md:w-1/2 pl-10 md:pl-0 md:px-20 text-left md:text-right">
                  <div className={`${i % 2 === 0 ? "md:text-left" : "md:text-right"}`}>
                    <span className="text-4xl font-bold text-gradient mb-2 block">{event.year}</span>
                    <h3 className="text-2xl font-bold mb-4">{event.title}</h3>
                    <p className="text-white/50 leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </div>
                <div className="hidden md:block w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
