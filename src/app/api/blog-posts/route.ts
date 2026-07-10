import { desc } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";

import { jsonError } from "@/lib/api/http";
import { db } from "@/lib/db";
import { blogPosts } from "@/lib/db/schema";
import { generateSlug } from "@/lib/utils/slug";

const createBlogPostSchema = z.object({
  title: z.string().min(2).max(255),
  excerpt: z.string().max(1000).optional(),
  contentMarkdown: z.string().min(1),
  slug: z.string().min(2).max(255).optional(),
});

export async function GET() {
  try {
    const data = await db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt)).limit(50);
    return NextResponse.json({ data });
  } catch {
    return jsonError("Failed to fetch blog posts.");
  }
}

export async function POST(request: Request) {
  try {
    const input = createBlogPostSchema.parse(await request.json());
    const [created] = await db
      .insert(blogPosts)
      .values({
        title: input.title,
        slug: generateSlug(input.slug ?? input.title),
        excerpt: input.excerpt,
        contentMarkdown: input.contentMarkdown,
      })
      .returning();

    return NextResponse.json({ data: created }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return jsonError(error.issues[0]?.message ?? "Invalid payload", 400);
    }
    return jsonError("Failed to create blog post.");
  }
}
