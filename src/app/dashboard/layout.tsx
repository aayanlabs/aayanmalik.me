import Link from "next/link";
import type { ReactNode } from "react";

const links = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/projects", label: "Projects" },
  { href: "/dashboard/media", label: "Media" },
  { href: "/dashboard/blog", label: "Blog" },
  { href: "/dashboard/testimonials", label: "Testimonials" },
  { href: "/dashboard/analytics", label: "Analytics" },
  { href: "/dashboard/settings", label: "Settings" },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#06080d] text-white">
      <div className="mx-auto grid max-w-7xl gap-6 px-6 py-8 md:grid-cols-[220px_1fr]">
        <aside className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-electric-blue">CMS</p>
          <nav className="space-y-2">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="block rounded-lg px-3 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white">
                {link.label}
              </Link>
            ))}
          </nav>
        </aside>
        <section className="rounded-2xl border border-white/10 bg-white/5 p-6">{children}</section>
      </div>
    </div>
  );
}
