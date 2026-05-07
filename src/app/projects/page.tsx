import { Navbar } from "@/components/Navbar";
import { ProjectsSection } from "@/components/ProjectsSection";
import { Footer } from "@/components/Footer";

export default function Projects() {
  return (
    <main className="flex min-h-screen flex-col bg-background selection:bg-electric-blue selection:text-white pt-20">
      <Navbar />
      <ProjectsSection />
      <Footer />
    </main>
  );
}
