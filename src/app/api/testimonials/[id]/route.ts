import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

import { jsonError } from "@/lib/api/http";
import { db } from "@/lib/db";
import { testimonials } from "@/lib/db/schema";

export async function DELETE(_: Request, context: RouteContext<"/api/testimonials/[id]">) {
  const { id } = await context.params;
  const [record] = await db.delete(testimonials).where(eq(testimonials.id, id)).returning({ id: testimonials.id });

  if (!record) {
    return jsonError("Testimonial not found.", 404);
  }

  return NextResponse.json({ data: record });
}
