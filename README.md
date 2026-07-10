# Aayan Malik Portfolio + Agency Platform

Next.js 16 App Router project with a Phase 1 CMS foundation using Supabase, PostgreSQL, Drizzle ORM, and NextAuth.

## Phase 1 setup

1. Install dependencies:

```bash
npm ci
```

2. Copy environment variables:

```bash
cp .env.example .env.local
```

3. Create a Supabase project and capture:
- Project URL
- Anon key
- Service role key

4. Set `DATABASE_URL` using Supabase PostgreSQL connection string.

5. Run database migration:

```bash
npm run db:migrate
```

6. Run the app:

```bash
npm run dev
```

## Auth model (admin-only)

- Login page: `/dashboard/login`
- Protected routes: `/dashboard/*`
- Credentials are verified against Supabase Auth via NextAuth credentials provider.
- Restrict admin access with comma-separated `ADMIN_EMAILS` in `.env.local`.

## Directory highlights

- `src/app/(public)` public site routes
- `src/app/dashboard` admin routes
- `src/app/api/*` initial CRUD endpoints
- `src/lib/db` Drizzle schema + client
- `src/lib/auth` NextAuth + Supabase auth helpers
- `src/types/entities.ts` shared domain types
- `drizzle/0001_initial_schema.sql` initial PostgreSQL schema
