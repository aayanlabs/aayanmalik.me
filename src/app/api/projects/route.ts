import { desc } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { jsonError, parsePagination } from "@/lib/api/http";
import { db } from "@/lib/db";
import { projects } from "@/lib/db/schema";
import { generateSlug } from "@/lib/utils/slug";

const createProjectSchema = z.object({
  title: z.string().min(2).max(255),
  subtitle: z.string().max(1000).optional(),
  description: z.string().max(5000).optional(),
  slug: z.string().min(2).max(255).optional(),
});

export async function GET(request: NextRequest) {
  try {
    const { limit, offset } = parsePagination(request.nextUrl.searchParams);
    const data = await db
      .select()
      .from(projects)
      .orderBy(desc(projects.updatedAt))
      .limit(limit)
      .offset(offset);

    return NextResponse.json({ data, pagination: { limit, offset } });
  } catch {
    return jsonError("Failed to fetch projects.");
  }
}

export async function POST(request: NextRequest) {
  try {
    const input = createProjectSchema.parse(await request.json());
    const slug = generateSlug(input.slug ?? input.title);

    const [created] = await db
      .insert(projects)
      .values({
        title: input.title,
        subtitle: input.subtitle,
        description: input.description,
        slug,
      })
      .returning();

    return NextResponse.json({ data: created }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return jsonError(error.issues[0]?.message ?? "Invalid payload", 400);
    }
    return jsonError("Failed to create project.");
  }
}
