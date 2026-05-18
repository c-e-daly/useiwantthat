import { cache } from "react";
import { notFound } from "next/navigation";
import { parseMarkdownWithFrontmatter } from "@/lib/blog/frontmatter";
import { renderMarkdown } from "@/lib/blog/markdown";
import { BLOG_PILLARS, getPostPath, resolveContentPillar } from "@/lib/blog/pillars";
import { createBlogSupabaseAdminClient } from "@/lib/blog/supabaseAdmin";
import { getBlogAssetPathFromStorageUrl, getBlogStorageConfig, getPublicBlogStorageUrl } from "@/lib/blog/storageConfig";
import type { BlogPostDetail, BlogPostRecord, BlogPostStatus, BlogPostSummary } from "@/lib/blog/types";
import type { ContentPillar, PostFrontmatter } from "@/lib/blog/vector-frontmatter.types";
import type { Json } from "@/src/types/database.types";

const {
  bucket: BLOG_BUCKET,
  markdownPrefix: BLOG_MARKDOWN_PREFIX,
  seoPrefix: BLOG_SEO_PREFIX,
} = getBlogStorageConfig();

type SeoSidecar = {
  seo_title?: string;
  seo_description?: string;
  canonical_url?: string;
  gtm_layer?: Json;
};

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

function extractAppServedBlogAssetPath(value: string): string | null {
  if (value.startsWith("/blog-assets/")) {
    return value.slice("/blog-assets/".length);
  }

  try {
    const url = new URL(value);
    return url.pathname.startsWith("/blog-assets/") ? url.pathname.slice("/blog-assets/".length) : null;
  } catch {
    return null;
  }
}

function resolveBlogImageUrl(value: string | null | undefined): string | null {
  if (!value) {
    return null;
  }

  const cleanValue = value.trim();
  const appServedAssetPath = extractAppServedBlogAssetPath(cleanValue);

  if (appServedAssetPath) {
    return getPublicBlogStorageUrl(BLOG_BUCKET, appServedAssetPath);
  }

  if (/^https?:\/\//i.test(cleanValue)) {
    const storageAssetPath = getBlogAssetPathFromStorageUrl(cleanValue, BLOG_BUCKET);
    if (storageAssetPath) {
      return getPublicBlogStorageUrl(BLOG_BUCKET, storageAssetPath);
    }

    return cleanValue;
  }

  const storagePath = cleanValue.replace(/^\/+/, "");

  if (/^(blog\/incoming|blog\/images|images)\//i.test(storagePath) || /^[a-z0-9-]+-(hero|og)\.(png|jpe?g|webp|gif)$/i.test(storagePath)) {
    return getPublicBlogStorageUrl(BLOG_BUCKET, storagePath);
  }

  return resolveAbsoluteUrl(cleanValue);
}

function normalizeRenderedBlogAssetUrls(html: string): string {
  return html.replace(/(<img\b[^>]*\bsrc=")([^"]+)(")/gi, (match, prefix: string, src: string, suffix: string) => {
    const appServedAssetPath = extractAppServedBlogAssetPath(src);
    if (appServedAssetPath) {
      return `${prefix}${getPublicBlogStorageUrl(BLOG_BUCKET, appServedAssetPath)}${suffix}`;
    }

    const storageAssetPath = getBlogAssetPathFromStorageUrl(src, BLOG_BUCKET);
    return storageAssetPath ? `${prefix}${getPublicBlogStorageUrl(BLOG_BUCKET, storageAssetPath)}${suffix}` : match;
  });
}

function resolveCoverImageUrl(frontmatter: Partial<PostFrontmatter> | null, row: BlogPostRecord) {
  return resolveBlogImageUrl(row.cover_image_url) ?? resolveBlogImageUrl(frontmatter?.og?.image);
}

function resolveSocialImageUrl(frontmatter: Partial<PostFrontmatter> | null, row: BlogPostRecord) {
  return resolveBlogImageUrl(frontmatter?.og?.image) ?? resolveBlogImageUrl(frontmatter?.twitter?.image) ?? resolveBlogImageUrl(row.cover_image_url);
}

function readFirstNonEmpty(...values: Array<string | null | undefined>) {
  return values.find((value) => typeof value === "string" && value.trim().length > 0);
}

function buildCanonicalUrl(slug: string) {
  return `${SITE_URL}${getPostPath(slug)}`;
}

function getSummaryTitle(row: BlogPostRecord, frontmatter?: Partial<PostFrontmatter> | null) {
  return frontmatter?.og?.title || frontmatter?.seo?.metaTitle || row.title;
}

function getSummaryExcerpt(row: BlogPostRecord, frontmatter?: Partial<PostFrontmatter> | null) {
  return frontmatter?.aeo?.tldr ?? row.excerpt ?? frontmatter?.seo?.metaDescription ?? "";
}

function mapSummary(row: BlogPostRecord, frontmatter: Partial<PostFrontmatter> | null = null): BlogPostSummary {
  const pillar = resolveContentPillar(frontmatter?.pillar);

  return {
    slug: row.slug,
    title: getSummaryTitle(row, frontmatter),
    excerpt: getSummaryExcerpt(row, frontmatter),
    persona: row.persona,
    tags: frontmatter?.tags?.length ? frontmatter.tags : row.tags ?? [],
    publishedAt: frontmatter?.publishedAt || row.published_at || row.created_at,
    updatedAt: frontmatter?.updatedAt || row.updated_at,
    coverImageUrl: resolveCoverImageUrl(frontmatter, row),
    socialImageUrl: resolveSocialImageUrl(frontmatter, row),
    path: getPostPath(row.slug),
    pillar,
    pillarTitle: pillar ? BLOG_PILLARS[pillar].title : null,
    template: frontmatter?.template ?? null,
    readingTimeMinutes: frontmatter?.readingTimeMinutes ?? null,
    featured: frontmatter?.featured ?? false,
    pillarPost: frontmatter?.pillarPost ?? false,
    pillarBranch: frontmatter?.pillarBranch ?? false,
    pillarPostSlug: frontmatter?.pillarPostSlug ?? null,
    aeoTldr: frontmatter?.aeo?.tldr ?? null,
  };
}

export const getPublishedPostSummaries = cache(async (limit = 1000): Promise<BlogPostSummary[]> => {
  const supabase = createBlogSupabaseAdminClient();

  const { data, error } = await supabase
    .from("blog_posts")
    .select(
      "id, slug, title, excerpt, persona, tags, cover_image_url, canonical_url, seo_title, seo_description, gtm_layer, markdown_path, seo_path, published_at, status, created_at, updated_at"
    )
    .eq("status", "published")
    .lte("published_at", new Date().toISOString())
    .order("published_at", { ascending: false })
    .limit(limit);

  if (error) {
    throw new Error(`Failed to fetch published blog posts: ${error.message}`);
  }

  const rows = data as BlogPostRecord[];

  return Promise.all(
    rows.map(async (row) => {
      try {
        const markdown = await getMarkdownFromStorage(row.markdown_path);
        const { frontmatter } = parseMarkdownWithFrontmatter(markdown);
        return mapSummary(row, frontmatter);
      } catch {
        return mapSummary(row);
      }
    })
  );
});

async function getPostRecordBySlug(slug: string, statuses: BlogPostStatus[] = ["published"]): Promise<BlogPostRecord | null> {
  const supabase = createBlogSupabaseAdminClient();

  let query = supabase
    .from("blog_posts")
    .select(
      "id, slug, title, excerpt, persona, tags, cover_image_url, canonical_url, seo_title, seo_description, gtm_layer, markdown_path, seo_path, published_at, status, created_at, updated_at"
    )
    .eq("slug", slug)
    .in("status", statuses);

  if (statuses.length === 1 && statuses[0] === "published") {
    query = query.lte("published_at", new Date().toISOString());
  }

  const { data, error } = await query.maybeSingle();

  if (error) {
    throw new Error(`Failed to fetch blog post '${slug}': ${error.message}`);
  }

  return (data as BlogPostRecord | null) ?? null;
}

function normalizeStoragePath(storagePath: string): string {
  return storagePath.replace(/^\/+/, "").trim();
}

function joinStoragePath(prefix: string, value: string): string {
  const cleanPrefix = prefix.replace(/^\/+|\/+$/g, "");
  const cleanValue = value.replace(/^\/+/, "");
  return cleanPrefix ? `${cleanPrefix}/${cleanValue}` : cleanValue;
}

function stripPrefix(value: string, prefix: string): string {
  const cleanValue = value.replace(/^\/+/, "");
  const cleanPrefix = prefix.replace(/^\/+|\/+$/g, "");
  return cleanValue.startsWith(`${cleanPrefix}/`) ? cleanValue.slice(cleanPrefix.length + 1) : cleanValue;
}

function resolveMarkdownStoragePath(markdownPath: string): string {
  const normalized = normalizeStoragePath(markdownPath);
  return normalized.startsWith("blog/") ? normalized : joinStoragePath(BLOG_MARKDOWN_PREFIX, normalized);
}

function resolveSeoStoragePath(row: BlogPostRecord): string {
  if (row.seo_path) {
    const normalized = normalizeStoragePath(row.seo_path);
    return normalized.startsWith("blog/") ? normalized : joinStoragePath(BLOG_SEO_PREFIX, normalized);
  }

  const markdownPath = resolveMarkdownStoragePath(row.markdown_path);
  const markdownRelative = stripPrefix(markdownPath, BLOG_MARKDOWN_PREFIX);
  const seoRelative = markdownRelative.replace(/\.md$/i, ".json");
  return joinStoragePath(BLOG_SEO_PREFIX, seoRelative);
}

async function downloadTextFromStorage(storagePath: string): Promise<string> {
  const supabase = createBlogSupabaseAdminClient();
  const { data, error } = await supabase.storage.from(BLOG_BUCKET).download(storagePath);

  if (error) {
    throw new Error(`Failed to download from ${BLOG_BUCKET}/${storagePath}: ${error.message}`);
  }

  return data.text();
}

async function getMarkdownFromStorage(markdownPath: string): Promise<string> {
  const storagePath = resolveMarkdownStoragePath(markdownPath);
  return downloadTextFromStorage(storagePath);
}

async function getSeoSidecarFromStorage(row: BlogPostRecord): Promise<SeoSidecar | null> {
  const storagePath = resolveSeoStoragePath(row);

  try {
    const content = await downloadTextFromStorage(storagePath);
    const parsed = JSON.parse(content) as SeoSidecar;
    return parsed;
  } catch {
    return null;
  }
}

async function buildPostDetail(row: BlogPostRecord): Promise<BlogPostDetail> {
  const rawMarkdown = await getMarkdownFromStorage(row.markdown_path);
  const { frontmatter, content: markdown } = parseMarkdownWithFrontmatter(rawMarkdown);
  const seoSidecar = await getSeoSidecarFromStorage(row);
  const renderedMarkdown = renderMarkdown(markdown);
  const summary = mapSummary(row, frontmatter);

  return {
    ...summary,
    seoTitle: readFirstNonEmpty(row.seo_title, seoSidecar?.seo_title, frontmatter?.seo?.metaTitle, row.title) ?? row.title,
    seoDescription:
      readFirstNonEmpty(row.seo_description, seoSidecar?.seo_description, frontmatter?.seo?.metaDescription, row.excerpt) ?? "",
    canonicalUrl:
      readFirstNonEmpty(row.canonical_url, seoSidecar?.canonical_url, frontmatter?.canonical) ?? buildCanonicalUrl(row.slug),
    markdownPath: row.markdown_path,
    markdown,
    html: normalizeRenderedBlogAssetUrls(renderedMarkdown.html),
    tableOfContents: renderedMarkdown.tableOfContents,
    gtmLayer: row.gtm_layer ?? seoSidecar?.gtm_layer ?? null,
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

export const getPostDetailBySlug = cache(async (slug: string): Promise<BlogPostDetail> => {
  const row = await getPostRecordBySlug(slug);

  if (!row) {
    notFound();
  }

  return buildPostDetail(row);
});

export async function getPreviewPostDetailBySlug(slug: string): Promise<BlogPostDetail | null> {
  const row = await getPostRecordBySlug(slug, ["draft", "scheduled", "published"]);
  return row ? buildPostDetail(row) : null;
}

export const getPublishedPostsForPillar = cache(async (pillar: ContentPillar): Promise<BlogPostSummary[]> => {
  const posts = await getPublishedPostSummaries();
  return posts.filter((post) => post.pillar === pillar);
});
