import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { env } from "@/env";

const globalForDb = globalThis as unknown as {
  client: postgres.Sql | undefined;
};

const client =
  globalForDb.client ??
  postgres(env.DATABASE_URL, {
    max: 5,
    prepare: false,
  });

if (process.env.NODE_ENV !== "production") {
  globalForDb.client = client;
}

export const db = drizzle(client);
