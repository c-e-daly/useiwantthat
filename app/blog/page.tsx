import Link from "next/link";
import { BLOG_PILLARS } from "@/lib/blog/pillars";
import { getPublishedPostSummaries } from "@/lib/blog/posts";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Blog | I Want That!",
  description:
    "Insights on negotiated commerce, customer generated offers, customer yield, and agentic commerce for Shopify brands.",
  path: "/blog",
});

export const revalidate = 300;

export default async function BlogIndexPage() {
  const posts = await getPublishedPostSummaries();

  return (
    <div className="bg-white">
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-5xl px-6 py-14">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">I Want That Blog</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900">Negotiated Commerce for Modern Stores</h1>
          <p className="mt-4 max-w-2xl text-base text-slate-600">
            Hub articles and branch posts for sellers using customer generated offers as the start of a negotiation.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-12">
        <div className="mb-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {Object.values(BLOG_PILLARS).map((pillar) => (
            <Link
              key={pillar.value}
              href={`/blog/${pillar.segment}`}
              className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm font-semibold text-slate-800 hover:border-orange-200 hover:text-orange-700"
            >
              {pillar.title}
            </Link>
          ))}
        </div>

        {posts.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-8 text-slate-600">No published posts yet.</div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <article key={post.slug} className="rounded-xl border border-slate-200 bg-white p-6">
                <div className="mb-2 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                  <time dateTime={post.publishedAt}>{new Date(post.publishedAt).toLocaleDateString()}</time>
                  {post.persona ? <span className="rounded-full bg-slate-100 px-2 py-1">{post.persona}</span> : null}
                  {post.pillarTitle ? <span className="rounded-full bg-slate-100 px-2 py-1">{post.pillarTitle}</span> : null}
                  {post.readingTimeMinutes ? <span>{post.readingTimeMinutes} min read</span> : null}
                  {post.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="rounded-full bg-orange-50 px-2 py-1 text-orange-700">
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="text-2xl font-semibold text-slate-900">
                  <Link href={post.path} className="hover:text-orange-600">
                    {post.title}
                  </Link>
                </h2>
                {post.excerpt ? <p className="mt-3 text-slate-600">{post.excerpt}</p> : null}
                <Link className="mt-4 inline-block text-sm font-medium text-orange-600 hover:text-orange-700" href={post.path}>
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
