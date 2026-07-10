import { and, eq } from "drizzle-orm";
import { notFound } from "next/navigation";

import { db } from "@/lib/db";
import { projectShares, projects } from "@/lib/db/schema";

export const dynamic = "force-dynamic";

interface SharedProjectProps {
  params: Promise<{ shareId: string }>;
}

export default async function SharedProjectPage({ params }: SharedProjectProps) {
  const { shareId } = await params;

  const [share] = await db
    .select({
      title: projects.title,
      subtitle: projects.subtitle,
      passwordHash: projectShares.passwordHash,
    })
    .from(projectShares)
    .innerJoin(projects, eq(projects.id, projectShares.projectId))
    .where(and(eq(projectShares.shareId, shareId), eq(projectShares.isActive, true)))
    .limit(1)
    .catch(() => []);

  if (!share) {
    notFound();
  }

  return (
    <main className="mx-auto min-h-screen max-w-4xl px-6 py-24 text-white">
      <p className="text-xs uppercase tracking-[0.22em] text-electric-blue">Client Share</p>
      <h1 className="mt-2 text-4xl font-semibold">{share.title}</h1>
      {share.subtitle ? <p className="mt-4 text-white/70">{share.subtitle}</p> : null}
      <p className="mt-8 rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white/65">
        {share.passwordHash ? "Password protected share enabled." : "Public share link enabled."}
      </p>
    </main>
  );
}
