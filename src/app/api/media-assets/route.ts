import { desc } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";

import { jsonError } from "@/lib/api/http";
import { db } from "@/lib/db";
import { mediaAssets } from "@/lib/db/schema";

const createSchema = z.object({
  filename: z.string().min(1),
  mimeType: z.string().min(1),
  storagePath: z.string().min(1),
  sizeBytes: z.number().int().nonnegative().optional(),
  altText: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export async function GET() {
  try {
    const data = await db.select().from(mediaAssets).orderBy(desc(mediaAssets.createdAt)).limit(100);
    return NextResponse.json({ data });
  } catch {
    return jsonError("Failed to fetch media assets.");
  }
}

export async function POST(request: Request) {
  try {
    const payload = createSchema.parse(await request.json());
    const [created] = await db.insert(mediaAssets).values(payload).returning();
    return NextResponse.json({ data: created }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return jsonError(error.issues[0]?.message ?? "Invalid payload", 400);
    }
    return jsonError("Failed to create media asset.");
  }
}
