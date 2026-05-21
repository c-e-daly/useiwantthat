import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogArticleRenderer } from "@/components/blog/BlogArticleRenderer";
import { BlogPillarHubRenderer } from "@/components/blog/BlogPillarHubRenderer";
import { getHubDetailBySlug } from "@/lib/blog/hubs";
import { BLOG_PILLARS, getPillarBySegment, getPillarPath } from "@/lib/blog/pillars";
import { getPostDetailBySlug, getPublishedPostsForPillar, getPublishedPostSummaries } from "@/lib/blog/posts";
import type { BlogHubDetail } from "@/lib/blog/hubs";
import type { BlogPostDetail } from "@/lib/blog/types";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.useiwantthat.com").replace(/\/+$/, "");

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
    const hub = await getHubDetailBySlug(slug);

    if (hub) {
      const robots = parseRobotsDirective(hub.frontmatter.seo?.robots);

      return {
        title: hub.seoTitle,
        description: hub.seoDescription,
        robots: hub.status === "published" ? robots : { index: false, follow: false },
        alternates: { canonical: hub.canonicalUrl },
        openGraph: {
          title: hub.seoTitle,
          description: hub.seoDescription,
          url: hub.canonicalUrl,
          type: "website",
          images: hub.socialImageUrl ? [{ url: hub.socialImageUrl }] : undefined,
        },
        twitter: {
          card: hub.socialImageUrl ? "summary_large_image" : "summary",
          title: hub.seoTitle,
          description: hub.seoDescription,
          images: hub.socialImageUrl ? [hub.socialImageUrl] : undefined,
        },
      };
    }

    return {
      title: `${pillar.title} | I Want That Blog`,
      description: pillar.description,
      alternates: { canonical: `/blog/${pillar.segment}` },
    };
  }

  try {
    const post = await getPostDetailBySlug(slug);
    const image = post.socialImageUrl || post.coverImageUrl || undefined;
    const ogTitle = post.og?.title || post.seoTitle;
    const ogDescription = post.og?.description || post.seoDescription;
    const twitterTitle = post.twitter?.title || ogTitle;
    const twitterDescription = post.twitter?.description || ogDescription;

    return {
      title: post.seoTitle,
      description: post.seoDescription,
      robots: parseRobotsDirective(post.frontmatter?.seo?.robots),
      alternates: post.canonicalUrl ? { canonical: post.canonicalUrl } : undefined,
      openGraph: {
        title: ogTitle,
        description: ogDescription,
        url: post.canonicalUrl ?? undefined,
        type: post.og?.type ?? "article",
        publishedTime: post.publishedAt,
        modifiedTime: post.updatedAt,
        images: image
          ? [
              {
                url: image,
                width: post.og?.imageWidth,
                height: post.og?.imageHeight,
                alt: post.og?.imageAlt,
              },
            ]
          : undefined,
      },
      twitter: {
        card: post.twitter?.card ?? "summary_large_image",
        title: twitterTitle,
        description: twitterDescription,
        images: image ? [image] : undefined,
      },
    };
  } catch {
    notFound();
  }
}

function parseRobotsDirective(value: string | null | undefined): Metadata["robots"] {
  const directives = new Set(
    (value || "index, follow")
      .toLowerCase()
      .split(",")
      .map((directive) => directive.trim())
      .filter(Boolean)
  );

  return {
    index: !directives.has("noindex"),
    follow: !directives.has("nofollow"),
  };
}

function extractHowToSteps(markdown: string) {
  return markdown
    .split(/\r?\n/)
    .map((line) => line.match(/^\s*\d+\.\s+(.+)$/)?.[1]?.trim())
    .filter((step): step is string => Boolean(step))
    .map((step) => ({
      "@type": "HowToStep",
      name: step,
      text: step,
    }));
}

function buildJsonLd(post: BlogPostDetail) {
  const articleSchema = post.schema?.article;
  const articleImage = articleSchema?.image || post.socialImageUrl;
  const jsonLd: Array<Record<string, unknown>> = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: articleSchema?.headline || post.seoTitle,
      description: articleSchema?.description || post.seoDescription,
      datePublished: articleSchema?.datePublished || post.publishedAt,
      dateModified: articleSchema?.dateModified || post.updatedAt,
      author: articleSchema?.author || { "@type": "Organization", name: "Vector" },
      publisher: articleSchema?.publisher || { "@type": "Organization", name: "Vector" },
      image: articleImage ? [articleImage] : undefined,
      wordCount: articleSchema?.wordCount ?? post.wordCount ?? undefined,
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

  if (post.schema?.howTo?.enabled) {
    const steps = extractHowToSteps(post.markdown);

    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: post.schema.howTo.name || post.title,
      description: post.schema.howTo.description || post.aeo?.tldr || post.seoDescription,
      totalTime: post.schema.howTo.totalTime || undefined,
      step: steps.length ? steps : undefined,
    });
  }

  if (!post.schema || post.schema.breadcrumb.enabled) {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Blog", item: `${SITE_URL}/blog` },
        post.pillarTitle && post.pillar
          ? { "@type": "ListItem", position: 2, name: post.pillarTitle, item: `${SITE_URL}${getPillarPath(post.pillar)}` }
          : null,
        { "@type": "ListItem", position: post.pillar ? 3 : 2, name: post.title, item: post.canonicalUrl ?? post.path },
      ].filter(Boolean),
    });
  }

  return jsonLd;
}

function extractHubFaq(markdown: string) {
  const faqSection = markdown.match(/## FAQ\s*\n([\s\S]*?)(?:\n##\s+|$)/i)?.[1] ?? "";
  const entries: Array<{ question: string; answer: string }> = [];
  const pattern = /\*\*(.+?\?)\*\*\s*\n+([\s\S]*?)(?=\n\*\*.+?\?\*\*|\s*$)/g;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(faqSection))) {
    const question = match[1].trim();
    const answer = match[2].trim().replace(/\s+/g, " ");

    if (question && answer) {
      entries.push({ question, answer });
    }
  }

  return entries;
}

function buildHubJsonLd(hub: BlogHubDetail) {
  const jsonLd: Array<Record<string, unknown>> = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: hub.title,
      description: hub.seoDescription,
      url: hub.canonicalUrl,
      datePublished: hub.publishedAt,
      dateModified: hub.updatedAt,
      image: hub.socialImageUrl ?? undefined,
      mainEntity: {
        "@type": "ItemList",
        name: `${hub.pillarTitle} articles`,
        itemListOrder: "https://schema.org/ItemListOrderDescending",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Blog", item: `${SITE_URL}/blog` },
        { "@type": "ListItem", position: 2, name: hub.pillarTitle, item: hub.canonicalUrl },
      ],
    },
  ];

  const faq = hub.aeo.faq_schema ? extractHubFaq(hub.markdown) : [];

  if (faq.length) {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((entry) => ({
        "@type": "Question",
        name: entry.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: entry.answer,
        },
      })),
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
  const hub = await getHubDetailBySlug(slug);

  if (hub) {
    return <BlogPillarHubRenderer hub={hub} posts={posts} jsonLd={buildHubJsonLd(hub)} />;
  }

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
