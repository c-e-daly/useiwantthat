import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { cache } from "react";
import { notFound } from "next/navigation";
import { parseMarkdownWithFrontmatter } from "@/lib/blog/frontmatter";
import { renderMarkdown } from "@/lib/blog/markdown";
import { BLOG_PILLARS, getPostPath, resolveContentPillar } from "@/lib/blog/pillars";
import type { BlogPostDetail, BlogPostStatus, BlogPostSummary } from "@/lib/blog/types";
import type { PostFrontmatter } from "@/lib/blog/vector-frontmatter.types";

const BLOG_CONTENT_DIR = path.join(process.cwd(), "content", "blog");
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.useiwantthat.com").replace(/\/+$/, "");

function resolveAbsoluteUrl(value: string | null | undefined): string | null {
  if (!value) {
    return null;
  }

  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  return `${SITE_URL}/${value.replace(/^\/+/, "")}`;
}

function readFirstNonEmpty(...values: Array<string | null | undefined>) {
  return values.find((value) => typeof value === "string" && value.trim().length > 0);
}

function buildCanonicalUrl(slug: string) {
  return `${SITE_URL}${getPostPath(slug)}`;
}

function getFirstHeading(markdown: string) {
  return markdown.match(/^#\s+(.+)$/m)?.[1]?.trim();
}

function normalizeSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function deriveSlug(fileName: string, frontmatter: Partial<PostFrontmatter> | null, markdown: string) {
  return normalizeSlug(frontmatter?.slug || getFirstHeading(markdown) || fileName.replace(/\.md$/i, ""));
}

function getPostStatus(frontmatter: Partial<PostFrontmatter> | null): BlogPostStatus {
  if (frontmatter?.published === false) {
    return "draft";
  }

  const scheduledFor = frontmatter?.scheduledFor;
  if (scheduledFor && new Date(scheduledFor) > new Date()) {
    return "scheduled";
  }

  return "published";
}

function isPublishable(frontmatter: Partial<PostFrontmatter> | null) {
  return getPostStatus(frontmatter) === "published" && (!frontmatter?.publishedAt || new Date(frontmatter.publishedAt) <= new Date());
}

function getSummaryTitle(slug: string, markdown: string, frontmatter?: Partial<PostFrontmatter> | null) {
  return frontmatter?.og?.title || frontmatter?.seo?.metaTitle || getFirstHeading(markdown) || slug;
}

function getSummaryExcerpt(frontmatter?: Partial<PostFrontmatter> | null) {
  return frontmatter?.aeo?.tldr ?? frontmatter?.seo?.metaDescription ?? "";
}

function resolveCoverImageUrl(frontmatter: Partial<PostFrontmatter> | null) {
  return resolveAbsoluteUrl(frontmatter?.og?.image);
}

function resolveSocialImageUrl(frontmatter: Partial<PostFrontmatter> | null) {
  return resolveAbsoluteUrl(frontmatter?.twitter?.image) ?? resolveAbsoluteUrl(frontmatter?.og?.image);
}

function mapSummary(fileName: string, markdown: string, frontmatter: Partial<PostFrontmatter> | null = null): BlogPostSummary {
  const slug = deriveSlug(fileName, frontmatter, markdown);
  const pillar = resolveContentPillar(frontmatter?.pillar);

  return {
    slug,
    title: getSummaryTitle(slug, markdown, frontmatter),
    excerpt: getSummaryExcerpt(frontmatter),
    persona: frontmatter?.funnelStage ?? null,
    tags: frontmatter?.tags ?? [],
    publishedAt: frontmatter?.publishedAt || new Date(0).toISOString(),
    updatedAt: frontmatter?.updatedAt || frontmatter?.publishedAt || new Date(0).toISOString(),
    coverImageUrl: resolveCoverImageUrl(frontmatter),
    socialImageUrl: resolveSocialImageUrl(frontmatter),
    path: getPostPath(slug),
    pillar,
    pillarTitle: pillar ? BLOG_PILLARS[pillar].title : null,
    template: frontmatter?.template ?? null,
    readingTimeMinutes: frontmatter?.readingTimeMinutes ?? null,
    featured: frontmatter?.featured ?? false,
    pillarPost: frontmatter?.pillarPost ?? false,
    pillarBranch: frontmatter?.pillarBranch ?? false,
    pillarPostSlug: frontmatter?.pillarPostSlug ?? null,
    aeoTldr: frontmatter?.aeo?.tldr ?? null,
    sitemapPriority: frontmatter?.seo?.sitemapPriority ?? null,
    sitemapChangefreq: frontmatter?.seo?.sitemapChangefreq ?? null,
  };
}

async function readMarkdownFiles() {
  try {
    const entries = await readdir(BLOG_CONTENT_DIR);
    return entries.filter((entry) => entry.endsWith(".md") && entry.toLowerCase() !== "readme.md");
  } catch {
    return [];
  }
}

async function readPostFile(fileName: string) {
  const rawMarkdown = await readFile(path.join(BLOG_CONTENT_DIR, fileName), "utf8");
  const { frontmatter, content } = parseMarkdownWithFrontmatter(rawMarkdown);

  return {
    fileName,
    frontmatter,
    markdown: content,
    rawMarkdown,
    status: getPostStatus(frontmatter),
  };
}

const getAllLocalPosts = cache(async () => {
  const files = await readMarkdownFiles();
  const posts = await Promise.all(files.map(readPostFile));

  return posts.filter((post) => post.frontmatter).sort((a, b) => {
    const aDate = a.frontmatter?.publishedAt || "";
    const bDate = b.frontmatter?.publishedAt || "";
    return bDate.localeCompare(aDate);
  });
});

export const getPublishedPostSummaries = cache(async (limit = 1000): Promise<BlogPostSummary[]> => {
  const posts = await getAllLocalPosts();
  return posts
    .filter((post) => isPublishable(post.frontmatter))
    .slice(0, limit)
    .map((post) => mapSummary(post.fileName, post.markdown, post.frontmatter));
});

async function buildPostDetail(fileName: string, markdown: string, frontmatter: Partial<PostFrontmatter> | null): Promise<BlogPostDetail> {
  const summary = mapSummary(fileName, markdown, frontmatter);
  const renderedMarkdown = renderMarkdown(markdown);

  return {
    ...summary,
    seoTitle: readFirstNonEmpty(frontmatter?.seo?.metaTitle, summary.title) ?? summary.title,
    seoDescription: readFirstNonEmpty(frontmatter?.seo?.metaDescription, summary.excerpt) ?? "",
    canonicalUrl: buildCanonicalUrl(summary.slug),
    markdownPath: path.join("content", "blog", fileName),
    markdown,
    html: renderedMarkdown.html,
    tableOfContents: renderedMarkdown.tableOfContents,
    gtmLayer: null,
    frontmatter,
    useCases: frontmatter?.useCases ?? [],
    funnelStage: frontmatter?.funnelStage ?? null,
    wordCount: frontmatter?.wordCount ?? null,
    authorName: frontmatter?.author?.name ?? null,
    authorRole: frontmatter?.author?.role ?? null,
    og: frontmatter?.og ?? null,
    twitter: frontmatter?.twitter ?? null,
    aeo: frontmatter?.aeo ?? null,
    schema: frontmatter?.schema ?? null,
    internalLinks: frontmatter?.internalLinks ?? null,
  };
}

async function findLocalPostBySlug(slug: string, statuses: BlogPostStatus[]) {
  const posts = await getAllLocalPosts();
  return (
    posts.find((post) => {
      const summary = mapSummary(post.fileName, post.markdown, post.frontmatter);
      return summary.slug === slug && statuses.includes(post.status);
    }) ?? null
  );
}

export const getPostDetailBySlug = cache(async (slug: string): Promise<BlogPostDetail> => {
  const post = await findLocalPostBySlug(slug, ["published"]);

  if (!post || !isPublishable(post.frontmatter)) {
    notFound();
  }

  return buildPostDetail(post.fileName, post.markdown, post.frontmatter);
});

export async function getPreviewPostDetailBySlug(slug: string): Promise<BlogPostDetail | null> {
  const post = await findLocalPostBySlug(slug, ["draft", "scheduled", "published"]);
  return post ? buildPostDetail(post.fileName, post.markdown, post.frontmatter) : null;
}

export const getPublishedPostsForPillar = cache(async (pillar: NonNullable<BlogPostSummary["pillar"]>): Promise<BlogPostSummary[]> => {
  const posts = await getPublishedPostSummaries();
  return posts.filter((post) => post.pillar === pillar);
});
