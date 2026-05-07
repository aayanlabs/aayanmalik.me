import { Navbar } from "@/components/Navbar";
import { AboutSection } from "@/components/AboutSection";
import { SkillsSection } from "@/components/SkillsSection";
import { TimelineSection } from "@/components/TimelineSection";
import { Footer } from "@/components/Footer";

export default function About() {
  return (
    <main className="flex min-h-screen flex-col bg-background selection:bg-electric-blue selection:text-white pt-20">
      <Navbar />
      <AboutSection />
      <SkillsSection />
      <TimelineSection />
      <Footer />
    </main>
  );
}
