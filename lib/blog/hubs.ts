import { readFile } from "node:fs/promises";
import path from "node:path";
import { cache } from "react";
import { BLOG_PILLARS, getPillarBySegment } from "@/lib/blog/pillars";
import { parseMarkdownWithFrontmatter } from "@/lib/blog/frontmatter";
import { renderMarkdown } from "@/lib/blog/markdown";
import type { ContentPillar, SitemapChangefreq, SitemapPriority } from "@/lib/blog/vector-frontmatter.types";
import type { MarkdownTableOfContentsItem } from "@/lib/blog/markdown";

const HUB_CONTENT_DIR = path.join(process.cwd(), "content", "hubs");
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.useiwantthat.com").replace(/\/+$/, "");

export type HubStatus = "draft" | "scheduled" | "published";

export type BlogHubFrontmatter = {
  content_type?: "hub";
  pillar?: ContentPillar;
  slug?: string;
  title?: string;
  status?: HubStatus;
  publish_date?: string;
  updated_at?: string;
  author?: string;
  seo?: {
    meta_title?: string;
    meta_description?: string;
    sitemap_priority?: SitemapPriority;
    sitemap_changefreq?: SitemapChangefreq;
    canonical_path?: string;
    robots?: string;
  };
  aeo?: {
    tldr?: string;
    key_takeaways?: string[];
    faq_schema?: boolean;
  };
  relationships?: {
    related_tool?: string;
    related_playbook?: string;
    sibling_hubs?: string[];
    glossary_terms?: string[];
    og_image?: string;
  };
};

export type BlogHubDetail = {
  slug: string;
  pillar: ContentPillar;
  title: string;
  pillarTitle: string;
  description: string;
  status: HubStatus;
  publishedAt: string;
  updatedAt: string;
  author: string | null;
  seoTitle: string;
  seoDescription: string;
  canonicalUrl: string;
  path: string;
  socialImageUrl: string | null;
  markdown: string;
  html: string;
  tableOfContents: MarkdownTableOfContentsItem[];
  frontmatter: BlogHubFrontmatter;
  aeo: NonNullable<BlogHubFrontmatter["aeo"]>;
  relationships: NonNullable<BlogHubFrontmatter["relationships"]>;
  sitemapPriority: SitemapPriority | null;
  sitemapChangefreq: SitemapChangefreq | null;
};

function normalizeSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function resolveAbsoluteUrl(value: string | null | undefined): string | null {
  if (!value || value === "none") {
    return null;
  }

  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  return `${SITE_URL}/${value.replace(/^\/+/, "")}`;
}

function stripFirstH1(markdown: string) {
  return markdown.replace(/^#\s+.+(?:\n+|$)/, "");
}

function getHubFileName(slug: string) {
  return `${normalizeSlug(slug)}-hub.md`;
}

function normalizeStringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string" && item.trim().length > 0) : [];
}

function normalizeFrontmatter(value: unknown): BlogHubFrontmatter | null {
  const frontmatter = value as BlogHubFrontmatter | null;

  if (!frontmatter || frontmatter.content_type !== "hub" || !frontmatter.slug) {
    return null;
  }

  const pillar = getPillarBySegment(frontmatter.slug);
  if (!pillar || frontmatter.pillar !== pillar.value) {
    return null;
  }

  return {
    ...frontmatter,
    status: frontmatter.status ?? "draft",
    seo: frontmatter.seo ?? {},
    aeo: {
      ...frontmatter.aeo,
      key_takeaways: normalizeStringArray(frontmatter.aeo?.key_takeaways),
    },
    relationships: {
      ...frontmatter.relationships,
      sibling_hubs: normalizeStringArray(frontmatter.relationships?.sibling_hubs),
      glossary_terms: normalizeStringArray(frontmatter.relationships?.glossary_terms),
    },
  };
}

export const getHubDetailBySlug = cache(async (slug: string): Promise<BlogHubDetail | null> => {
  const normalizedSlug = normalizeSlug(slug);
  const pillar = getPillarBySegment(normalizedSlug);

  if (!pillar) {
    return null;
  }

  try {
    const rawMarkdown = await readFile(path.join(HUB_CONTENT_DIR, getHubFileName(normalizedSlug)), "utf8");
    const { frontmatter, content } = parseMarkdownWithFrontmatter(rawMarkdown);
    const hubFrontmatter = normalizeFrontmatter(frontmatter);

    if (!hubFrontmatter) {
      return null;
    }

    const markdown = stripFirstH1(content.trim());
    const renderedMarkdown = renderMarkdown(markdown);
    const hubSlug = hubFrontmatter.slug ?? normalizedSlug;
    const pagePath = hubFrontmatter.seo?.canonical_path || `/blog/${hubSlug}`;
    const publishedAt = hubFrontmatter.publish_date || new Date(0).toISOString();
    const updatedAt = hubFrontmatter.updated_at || publishedAt;
    const relationships = hubFrontmatter.relationships ?? {};
    const aeo = hubFrontmatter.aeo ?? {};

    return {
      slug: hubSlug,
      pillar: pillar.value,
      title: hubFrontmatter.title || pillar.title,
      pillarTitle: BLOG_PILLARS[pillar.value].title,
      description: hubFrontmatter.seo?.meta_description || pillar.description,
      status: hubFrontmatter.status ?? "draft",
      publishedAt,
      updatedAt,
      author: hubFrontmatter.author ?? null,
      seoTitle: hubFrontmatter.seo?.meta_title || hubFrontmatter.title || pillar.title,
      seoDescription: hubFrontmatter.seo?.meta_description || aeo.tldr || pillar.description,
      canonicalUrl: `${SITE_URL}${pagePath}`,
      path: pagePath,
      socialImageUrl: resolveAbsoluteUrl(relationships.og_image),
      markdown,
      html: renderedMarkdown.html,
      tableOfContents: renderedMarkdown.tableOfContents,
      frontmatter: hubFrontmatter,
      aeo,
      relationships,
      sitemapPriority: hubFrontmatter.seo?.sitemap_priority ?? null,
      sitemapChangefreq: hubFrontmatter.seo?.sitemap_changefreq ?? null,
    };
  } catch {
    return null;
  }
});

export const getPublishedHubDetails = cache(async (): Promise<BlogHubDetail[]> => {
  const hubs = await Promise.all(Object.values(BLOG_PILLARS).map((pillar) => getHubDetailBySlug(pillar.segment)));
  return hubs.filter((hub): hub is BlogHubDetail => Boolean(hub && hub.status === "published"));
});
