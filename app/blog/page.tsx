import type { Metadata } from "next";
import Link from "next/link";
import { getPublishedPostSummaries } from "@/lib/blog/posts";

export const metadata: Metadata = {
  title: "Blog | I Want That!",
  description:
    "Insights on customer generated offers, price elasticity, and agentic commerce for Shopify brands.",
};

export const revalidate = 300;

export default async function BlogIndexPage() {
  const posts = await getPublishedPostSummaries();

  return (
    <div className="bg-white">
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-5xl px-6 py-14">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">I Want That Blog</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900">Price Intelligence for Modern Commerce</h1>
          <p className="mt-4 max-w-2xl text-base text-slate-600">
            Playbooks for sellers using Customer Generated Offers, Ask Rami traffic, and Shopify price elasticity systems.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-12">
        {posts.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-8 text-slate-600">No published posts yet.</div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <article key={post.slug} className="rounded-xl border border-slate-200 bg-white p-6">
                <div className="mb-2 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                  <time dateTime={post.publishedAt}>{new Date(post.publishedAt).toLocaleDateString()}</time>
                  {post.persona ? <span className="rounded-full bg-slate-100 px-2 py-1">{post.persona}</span> : null}
                  {post.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="rounded-full bg-orange-50 px-2 py-1 text-orange-700">
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="text-2xl font-semibold text-slate-900">
                  <Link href={`/blog/${post.slug}`} className="hover:text-orange-600">
                    {post.title}
                  </Link>
                </h2>
                {post.excerpt ? <p className="mt-3 text-slate-600">{post.excerpt}</p> : null}
                <Link className="mt-4 inline-block text-sm font-medium text-orange-600 hover:text-orange-700" href={`/blog/${post.slug}`}>
                  Read article →
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
