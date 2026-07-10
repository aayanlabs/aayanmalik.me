import Link from "next/link";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-electric-blue selection:text-white">
      <Navbar />
      <section className="mx-auto flex max-w-6xl flex-col gap-6 px-6 pb-24 pt-36">
        <p className="text-sm uppercase tracking-[0.24em] text-electric-blue">Aayan Malik</p>
        <h1 className="max-w-4xl text-4xl font-semibold leading-tight md:text-6xl">
          Building software people actually love to use.
        </h1>
        <p className="max-w-3xl text-lg text-white/70">
          Premium portfolio + client presentation platform with CMS-driven project pages.
        </p>
        <div className="flex flex-wrap gap-4 pt-2">
          <Link href="/projects" className="rounded-full bg-electric-blue px-6 py-3 font-medium text-black">View Projects</Link>
          <Link href="/contact" className="rounded-full border border-white/20 px-6 py-3 font-medium">Hire Me</Link>
          <Link href="/dashboard" className="rounded-full border border-white/20 px-6 py-3 font-medium">Admin Dashboard</Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}
