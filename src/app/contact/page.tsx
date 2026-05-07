import { Navbar } from "@/components/Navbar";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

export default function Contact() {
  return (
    <main className="flex min-h-screen flex-col bg-background selection:bg-electric-blue selection:text-white pt-20">
      <Navbar />
      <ContactSection />
      <Footer />
    </main>
  );
}
