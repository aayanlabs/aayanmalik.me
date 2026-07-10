import { AboutSection } from "@/components/AboutSection";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { SkillsSection } from "@/components/SkillsSection";
import { TimelineSection } from "@/components/TimelineSection";

export default function AboutPage() {
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
