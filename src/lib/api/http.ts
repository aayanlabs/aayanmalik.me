import { NextResponse } from "next/server";

export function jsonError(message: string, status = 500) {
  return NextResponse.json({ error: message }, { status });
}

export function parsePagination(searchParams: URLSearchParams) {
  const limit = Number(searchParams.get("limit") ?? "20");
  const offset = Number(searchParams.get("offset") ?? "0");

  return {
    limit: Number.isNaN(limit) ? 20 : Math.min(Math.max(limit, 1), 100),
    offset: Number.isNaN(offset) ? 0 : Math.max(offset, 0),
  };
}
