import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { jsonError } from "@/lib/api/http";
import { db } from "@/lib/db";
import { projects } from "@/lib/db/schema";
import { generateSlug } from "@/lib/utils/slug";

const updateProjectSchema = z.object({
  title: z.string().min(2).max(255).optional(),
  subtitle: z.string().max(1000).nullable().optional(),
  description: z.string().max(5000).nullable().optional(),
  status: z.enum(["draft", "private", "public", "featured", "archived"]).optional(),
  completionPercentage: z.number().int().min(0).max(100).optional(),
  slug: z.string().min(2).max(255).optional(),
});

export async function GET(_: NextRequest, context: RouteContext<"/api/projects/[id]">) {
  const { id } = await context.params;

  try {
    const [project] = await db.select().from(projects).where(eq(projects.id, id)).limit(1);

    if (!project) {
      return jsonError("Project not found.", 404);
    }

    return NextResponse.json({ data: project });
  } catch {
    return jsonError("Failed to fetch project.");
  }
}

export async function PATCH(request: NextRequest, context: RouteContext<"/api/projects/[id]">) {
  const { id } = await context.params;

  try {
    const input = updateProjectSchema.parse(await request.json());
    const nextSlug = input.slug || input.title ? generateSlug(input.slug ?? input.title ?? "") : undefined;

    const [updated] = await db
      .update(projects)
      .set({ ...input, ...(nextSlug ? { slug: nextSlug } : {}) })
      .where(eq(projects.id, id))
      .returning();

    if (!updated) {
      return jsonError("Project not found.", 404);
    }

    return NextResponse.json({ data: updated });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return jsonError(error.issues[0]?.message ?? "Invalid payload", 400);
    }
    return jsonError("Failed to update project.");
  }
}

export async function DELETE(_: NextRequest, context: RouteContext<"/api/projects/[id]">) {
  const { id } = await context.params;

  try {
    const [deleted] = await db.delete(projects).where(eq(projects.id, id)).returning({ id: projects.id });

    if (!deleted) {
      return jsonError("Project not found.", 404);
    }

    return NextResponse.json({ data: deleted });
  } catch {
    return jsonError("Failed to delete project.");
  }
}
