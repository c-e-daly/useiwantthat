import { cache } from "react";
import { notFound } from "next/navigation";
import { markdownToHtml } from "@/lib/blog/markdown";
import { createBlogSupabaseAdminClient } from "@/lib/blog/supabaseAdmin";
import { getBlogStorageConfig } from "@/lib/blog/storageConfig";
import type { BlogPostDetail, BlogPostRecord, BlogPostSummary } from "@/lib/blog/types";
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

function mapSummary(row: BlogPostRecord): BlogPostSummary {
  return {
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt ?? "",
    persona: row.persona,
    tags: row.tags ?? [],
    publishedAt: row.published_at ?? row.created_at,
    coverImageUrl: row.cover_image_url,
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

  return (data as BlogPostRecord[]).map(mapSummary);
});

async function getPostRecordBySlug(slug: string): Promise<BlogPostRecord | null> {
  const supabase = createBlogSupabaseAdminClient();

  const { data, error } = await supabase
    .from("blog_posts")
    .select(
      "id, slug, title, excerpt, persona, tags, cover_image_url, canonical_url, seo_title, seo_description, gtm_layer, markdown_path, seo_path, published_at, status, created_at, updated_at"
    )
    .eq("slug", slug)
    .eq("status", "published")
    .lte("published_at", new Date().toISOString())
    .maybeSingle();

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

export const getPostDetailBySlug = cache(async (slug: string): Promise<BlogPostDetail> => {
  const row = await getPostRecordBySlug(slug);

  if (!row) {
    notFound();
  }

  const markdown = await getMarkdownFromStorage(row.markdown_path);
  const seoSidecar = await getSeoSidecarFromStorage(row);
  const html = markdownToHtml(markdown);

  return {
    ...mapSummary(row),
    seoTitle: row.seo_title ?? seoSidecar?.seo_title ?? row.title,
    seoDescription: row.seo_description ?? seoSidecar?.seo_description ?? row.excerpt ?? "",
    canonicalUrl: row.canonical_url ?? seoSidecar?.canonical_url ?? null,
    markdownPath: row.markdown_path,
    html,
    gtmLayer: row.gtm_layer ?? seoSidecar?.gtm_layer ?? null,
  };
});
