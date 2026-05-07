"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const InfoBox = ({ text, link, btnText }: { text: string; link: string; btnText: string }) => (
  <div className="info-box bg-electric-blue-dark/90 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-2xl max-w-md mx-4">
    <p className="font-space text-white text-center text-lg mb-6 leading-relaxed">
      {text}
    </p>
    <Link 
      href={link} 
      className="flex items-center justify-center gap-2 bg-white text-electric-blue-dark font-bold py-3 px-6 rounded-xl hover:bg-opacity-90 transition-all group"
    >
      {btnText}
      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
    </Link>
  </div>
);

const renderContent: Record<number, React.ReactNode> = {
  1: (
    <h1 className="sm:text-xl sm:leading-snug text-center bg-electric-blue-dark/90 backdrop-blur-md py-4 px-8 text-white mx-5 rounded-2xl border border-white/20 shadow-2xl font-space">
      Hi, I am <span className="font-bold text-white">Aayan Malik</span> 👋
      <br />
      A software engineer from AayanLabs.
    </h1>
  ),
  2: (
    <InfoBox
      text="Worked with many companies and picked up many skills along the way."
      link="/about"
      btnText="Learn more"
    />
  ),
  3: (
    <InfoBox
      text="Led multiple projects to success over the years. Curious about the impact?"
      link="/projects"
      btnText="Visit my portfolio"
    />
  ),
  4: (
    <InfoBox
      text="Need a project done or looking for a dev? I'm just a few keystrokes away."
      link="/contact"
      btnText="Let's talk"
    />
  ),
};

export function HomeInfo({ currentStage }: { currentStage: number | null }) {
  if (!currentStage) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="absolute top-28 left-0 right-0 z-10 flex items-center justify-center pointer-events-none"
    >
      <div className="pointer-events-auto">
        {renderContent[currentStage]}
      </div>
    </motion.div>
  );
}
