import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPillarBySegment, getPostPath, USE_CASE_PATHS } from "@/lib/blog/pillars";
import { getPostDetailBySlug, getPublishedPostsForPillar, getPublishedPostSummaries } from "@/lib/blog/posts";
import type { BlogPostDetail } from "@/lib/blog/types";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 300;

export async function generateStaticParams() {
  const posts = await getPublishedPostSummaries(100);
  const pillarSegments = Array.from(new Set(posts.map((post) => post.path.split("/")[2]).filter(Boolean)));
  return [...posts.map((post) => ({ slug: post.slug })), ...pillarSegments.map((slug) => ({ slug }))];
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const pillar = getPillarBySegment(slug);

  if (pillar) {
    return {
      title: `${pillar.title} | I Want That Blog`,
      description: pillar.description,
      alternates: { canonical: `/blog/${pillar.segment}` },
    };
  }

  try {
    const post = await getPostDetailBySlug(slug);
    const image = post.coverImageUrl || post.og?.image || undefined;

    return {
      title: post.seoTitle,
      description: post.seoDescription,
      alternates: post.canonicalUrl ? { canonical: post.canonicalUrl } : undefined,
      openGraph: {
        title: post.seoTitle,
        description: post.seoDescription,
        type: "article",
        publishedTime: post.publishedAt,
        modifiedTime: post.updatedAt,
        images: image ? [image] : undefined,
      },
      twitter: {
        card: "summary_large_image",
        title: post.twitter?.title || post.seoTitle,
        description: post.twitter?.description || post.seoDescription,
        images: image ? [image] : undefined,
      },
    };
  } catch {
    notFound();
  }
}

function buildJsonLd(post: BlogPostDetail) {
  const jsonLd: Array<Record<string, unknown>> = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.schema?.article?.headline || post.seoTitle,
      description: post.schema?.article?.description || post.seoDescription,
      datePublished: post.publishedAt,
      dateModified: post.updatedAt,
      author: post.schema?.article?.author || { "@type": "Organization", name: "Prophet" },
      publisher: post.schema?.article?.publisher || { "@type": "Organization", name: "Prophet" },
      image: post.coverImageUrl ? [post.coverImageUrl] : undefined,
      wordCount: post.wordCount ?? undefined,
      mainEntityOfPage: post.canonicalUrl ?? undefined,
    },
  ];

  if (post.aeo?.faq && post.aeo.faq.length >= 4 && post.schema?.faqPage?.enabled !== false) {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: post.aeo.faq.map((entry) => ({
        "@type": "Question",
        name: entry.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: entry.answer,
        },
      })),
    });
  }

  if (!post.schema || post.schema.breadcrumb.enabled) {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Blog", item: "/blog" },
        post.pillarTitle && post.pillar
          ? { "@type": "ListItem", position: 2, name: post.pillarTitle, item: getPostPath("", post.pillar).replace(/\/$/, "") }
          : null,
        { "@type": "ListItem", position: post.pillar ? 3 : 2, name: post.title, item: post.canonicalUrl ?? post.path },
      ].filter(Boolean),
    });
  }

  return jsonLd;
}

async function PillarPage({ slug }: { slug: string }) {
  const pillar = getPillarBySegment(slug);

  if (!pillar) {
    notFound();
  }

  const posts = await getPublishedPostsForPillar(pillar.value);

  return (
    <div className="bg-white">
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-5xl px-6 py-14">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Content pillar</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900">{pillar.title}</h1>
          <p className="mt-4 max-w-2xl text-base text-slate-600">{pillar.description}</p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-12">
        {posts.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-8 text-slate-600">No published posts in this pillar yet.</div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <article key={post.slug} className="rounded-xl border border-slate-200 bg-white p-6">
                <div className="mb-2 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                  <time dateTime={post.publishedAt}>{new Date(post.publishedAt).toLocaleDateString()}</time>
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
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const pillar = getPillarBySegment(slug);

  if (pillar) {
    return <PillarPage slug={slug} />;
  }

  const post = await getPostDetailBySlug(slug);
  const jsonLd = buildJsonLd(post);

  return (
    <article className="mx-auto max-w-3xl px-6 py-14">
      <header className="mb-10 border-b border-slate-200 pb-8">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">Blog</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900">{post.title}</h1>
        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-500">
          <time dateTime={post.publishedAt}>{new Date(post.publishedAt).toLocaleDateString()}</time>
          {post.persona ? <span className="rounded-full bg-slate-100 px-3 py-1">{post.persona}</span> : null}
          {post.pillarTitle ? <Link href={`/blog/${post.path.split("/")[2]}`} className="rounded-full bg-slate-100 px-3 py-1 hover:text-orange-700">{post.pillarTitle}</Link> : null}
          {post.readingTimeMinutes ? <span>{post.readingTimeMinutes} min read</span> : null}
        </div>
        {post.aeo?.tldr ? <p className="mt-6 rounded-lg border border-orange-100 bg-orange-50 p-4 text-base leading-7 text-slate-800">{post.aeo.tldr}</p> : null}
      </header>

      {post.gtmLayer ? (
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || []; window.dataLayer.push(${JSON.stringify(
              post.gtmLayer
            )});`,
          }}
        />
      ) : null}

      {jsonLd.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}

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

      {post.aeo?.keyTakeaways?.length ? (
        <section className="mt-12 border-t border-slate-200 pt-8">
          <h2 className="text-2xl font-semibold text-slate-900">Key Takeaways</h2>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-700">
            {post.aeo.keyTakeaways.map((takeaway) => (
              <li key={takeaway}>{takeaway}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {post.aeo?.faq?.length ? (
        <section className="mt-12 border-t border-slate-200 pt-8">
          <h2 className="text-2xl font-semibold text-slate-900">FAQ</h2>
          <div className="mt-4 space-y-5">
            {post.aeo.faq.map((entry) => (
              <div key={entry.question}>
                <h3 className="text-lg font-semibold text-slate-900">{entry.question}</h3>
                <p className="mt-2 leading-7 text-slate-700">{entry.answer}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {post.internalLinks ? (
        <aside className="mt-12 border-t border-slate-200 pt-8">
          <h2 className="text-2xl font-semibold text-slate-900">Related Reading</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {post.internalLinks.relatedArticles.slice(0, 4).map((link) => (
              <Link key={link.slug} href={`/blog/${link.slug.replace(/^\/+/, "")}`} className="rounded-lg border border-slate-200 p-4 font-medium text-slate-800 hover:border-orange-200 hover:text-orange-700">
                {link.title}
              </Link>
            ))}
            {post.useCases.map((useCase) => {
              const page = USE_CASE_PATHS[useCase];
              return page ? (
                <Link key={useCase} href={page.path} className="rounded-lg border border-slate-200 p-4 font-medium text-slate-800 hover:border-orange-200 hover:text-orange-700">
                  {page.title}
                </Link>
              ) : null;
            })}
          </div>
          {post.internalLinks.ctaText ? (
            <Link href="/sellers" className="mt-6 inline-block rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-orange-600">
              {post.internalLinks.ctaText}
            </Link>
          ) : null}
        </aside>
      ) : null}
    </article>
  );
}
