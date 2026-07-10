import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

import { db } from "@/lib/db";
import { projects } from "@/lib/db/schema";

export const dynamic = "force-dynamic";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;

  const [project] = await db
    .select({
      title: projects.title,
      subtitle: projects.subtitle,
      description: projects.description,
      status: projects.status,
    })
    .from(projects)
    .where(eq(projects.slug, slug))
    .limit(1)
    .catch(() => []);

  if (!project) {
    notFound();
  }

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-6 py-24 text-white">
      <p className="text-sm uppercase tracking-[0.2em] text-electric-blue">{project.status}</p>
      <h1 className="mt-2 text-4xl font-semibold">{project.title}</h1>
      {project.subtitle ? <p className="mt-3 text-xl text-white/70">{project.subtitle}</p> : null}
      {project.description ? <p className="mt-6 text-base text-white/70">{project.description}</p> : null}
    </main>
  );
}
