import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

import { jsonError } from "@/lib/api/http";
import { db } from "@/lib/db";
import { blogPosts } from "@/lib/db/schema";

export async function GET(_: Request, context: RouteContext<"/api/blog-posts/[id]">) {
  const { id } = await context.params;
  const [record] = await db.select().from(blogPosts).where(eq(blogPosts.id, id)).limit(1);

  if (!record) {
    return jsonError("Blog post not found.", 404);
  }

  return NextResponse.json({ data: record });
}

export async function DELETE(_: Request, context: RouteContext<"/api/blog-posts/[id]">) {
  const { id } = await context.params;
  const [record] = await db.delete(blogPosts).where(eq(blogPosts.id, id)).returning({ id: blogPosts.id });

  if (!record) {
    return jsonError("Blog post not found.", 404);
  }

  return NextResponse.json({ data: record });
}
