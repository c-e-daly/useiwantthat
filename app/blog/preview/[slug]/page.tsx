import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPreviewPostDetailBySlug } from "@/lib/blog/posts";

type BlogPreviewPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ token?: string }>;
};

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

function isAuthorized(token: string | undefined) {
  const previewToken = process.env.BLOG_PREVIEW_TOKEN;
  return Boolean(previewToken && token && token === previewToken);
}

export default async function BlogPreviewPage({ params, searchParams }: BlogPreviewPageProps) {
  const { slug } = await params;
  const { token } = await searchParams;

  if (!isAuthorized(token)) {
    notFound();
  }

  const post = await getPreviewPostDetailBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-3xl px-6 py-14">
      <div className="mb-8 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
        <p className="font-semibold">Private blog preview</p>
        <p className="mt-1">This post is not included in the public blog index unless its row status is published.</p>
      </div>

      <header className="mb-10 border-b border-slate-200 pb-8">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">Blog preview</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900">{post.title}</h1>
        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-500">
          <time dateTime={post.publishedAt}>{new Date(post.publishedAt).toLocaleDateString()}</time>
          {post.persona ? <span className="rounded-full bg-slate-100 px-3 py-1">{post.persona}</span> : null}
          {post.pillarTitle ? <span className="rounded-full bg-slate-100 px-3 py-1">{post.pillarTitle}</span> : null}
          {post.readingTimeMinutes ? <span>{post.readingTimeMinutes} min read</span> : null}
        </div>
        {post.aeo?.tldr ? <p className="mt-6 rounded-lg border border-orange-100 bg-orange-50 p-4 text-base leading-7 text-slate-800">{post.aeo.tldr}</p> : null}
      </header>

      <div
        className={[
          "max-w-none text-slate-700",
          "[&_h1]:mt-8 [&_h1]:text-4xl [&_h1]:font-semibold [&_h1]:text-slate-900",
          "[&_h2]:mt-8 [&_h2]:text-3xl [&_h2]:font-semibold [&_h2]:text-slate-900",
          "[&_h3]:mt-6 [&_h3]:text-2xl [&_h3]:font-semibold [&_h3]:text-slate-900",
          "[&_p]:mt-4 [&_p]:leading-7",
          "[&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6",
          "[&_ol]:mt-4 [&_ol]:list-decimal [&_ol]:pl-6",
          "[&_li]:mt-2",
          "[&_a]:font-medium [&_a]:text-orange-600 hover:[&_a]:text-orange-700",
          "[&_blockquote]:mt-6 [&_blockquote]:border-l-4 [&_blockquote]:border-slate-300 [&_blockquote]:pl-4 [&_blockquote]:italic",
          "[&_pre]:mt-6 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:bg-slate-900 [&_pre]:p-4 [&_pre]:text-slate-100",
          "[&_code]:rounded [&_code]:bg-slate-100 [&_code]:px-1 [&_code]:py-0.5 [&_code]:text-sm",
          "[&_pre_code]:bg-transparent [&_pre_code]:p-0",
          "[&_hr]:my-8 [&_hr]:border-slate-200",
        ].join(" ")}
        dangerouslySetInnerHTML={{ __html: post.html }}
      />

      {post.internalLinks ? (
        <aside className="mt-12 border-t border-slate-200 pt-8">
          <h2 className="text-2xl font-semibold text-slate-900">Related Reading</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {post.internalLinks.relatedArticles.slice(0, 4).map((link) => (
              <Link key={link.slug} href={`/blog/${link.slug.replace(/^\/+/, "")}`} className="rounded-lg border border-slate-200 p-4 font-medium text-slate-800 hover:border-orange-200 hover:text-orange-700">
                {link.title}
              </Link>
            ))}
          </div>
        </aside>
      ) : null}
    </article>
  );
}
