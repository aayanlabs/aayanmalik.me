import { LoadingScreen } from "@/components/LoadingScreen";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { SkillsSection } from "@/components/SkillsSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { TimelineSection } from "@/components/TimelineSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { CommandMenu } from "@/components/CommandMenu";
import { EasterEgg } from "@/components/EasterEgg";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-background selection:bg-electric-blue selection:text-white">
      <LoadingScreen />
      <Navbar />
      <CommandMenu />
      <EasterEgg />
      
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <TimelineSection />
      <ContactSection />
      
      <Footer />
    </main>
  );
}
