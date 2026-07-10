import { desc } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";

import { jsonError } from "@/lib/api/http";
import { db } from "@/lib/db";
import { testimonials } from "@/lib/db/schema";

const createSchema = z.object({
  clientName: z.string().min(2),
  quote: z.string().min(2),
  clientRole: z.string().optional(),
  company: z.string().optional(),
  rating: z.number().int().min(1).max(5).optional(),
});

export async function GET() {
  try {
    const data = await db.select().from(testimonials).orderBy(desc(testimonials.createdAt)).limit(50);
    return NextResponse.json({ data });
  } catch {
    return jsonError("Failed to fetch testimonials.");
  }
}

export async function POST(request: Request) {
  try {
    const payload = createSchema.parse(await request.json());
    const [created] = await db.insert(testimonials).values(payload).returning();
    return NextResponse.json({ data: created }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return jsonError(error.issues[0]?.message ?? "Invalid payload", 400);
    }
    return jsonError("Failed to create testimonial.");
  }
}
