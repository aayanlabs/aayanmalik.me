import { desc } from "drizzle-orm";
import Link from "next/link";

import { db } from "@/lib/db";
import { blogPosts } from "@/lib/db/schema";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const posts = await db
    .select({
      id: blogPosts.id,
      title: blogPosts.title,
      slug: blogPosts.slug,
      excerpt: blogPosts.excerpt,
    })
    .from(blogPosts)
    .orderBy(desc(blogPosts.createdAt))
    .limit(20)
    .catch(() => []);

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-6 py-24 text-white">
      <h1 className="text-4xl font-semibold">Blog</h1>
      <div className="mt-8 space-y-4">
        {posts.map((post) => (
          <article key={post.id} className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <Link href={`/blog/${post.slug}`} className="text-xl font-medium hover:text-electric-blue">
              {post.title}
            </Link>
            {post.excerpt ? <p className="mt-2 text-white/70">{post.excerpt}</p> : null}
          </article>
        ))}
        {posts.length === 0 ? <p className="text-white/60">No posts published yet.</p> : null}
      </div>
    </main>
  );
}
