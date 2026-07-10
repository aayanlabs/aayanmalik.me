import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

import { jsonError } from "@/lib/api/http";
import { db } from "@/lib/db";
import { mediaAssets } from "@/lib/db/schema";

export async function DELETE(_: Request, context: RouteContext<"/api/media-assets/[id]">) {
  const { id } = await context.params;
  const [record] = await db.delete(mediaAssets).where(eq(mediaAssets.id, id)).returning({ id: mediaAssets.id });

  if (!record) {
    return jsonError("Media asset not found.", 404);
  }

  return NextResponse.json({ data: record });
}
