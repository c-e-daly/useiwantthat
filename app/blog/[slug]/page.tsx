import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogArticleRenderer } from "@/components/blog/BlogArticleRenderer";
import { BLOG_PILLARS, getPillarBySegment, getPillarPath } from "@/lib/blog/pillars";
import { getPostDetailBySlug, getPublishedPostsForPillar, getPublishedPostSummaries } from "@/lib/blog/posts";
import type { BlogPostDetail } from "@/lib/blog/types";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 300;

export async function generateStaticParams() {
  const posts = await getPublishedPostSummaries(100);
  const pillarSegments = Object.values(BLOG_PILLARS).map((pillar) => pillar.segment);
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
          ? { "@type": "ListItem", position: 2, name: post.pillarTitle, item: getPillarPath(post.pillar) }
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

  return <BlogArticleRenderer post={post} jsonLd={jsonLd} includeGtm />;
}
