import type { Database, Json } from "@/src/types/database.types";

export type BlogPostStatus = "draft" | "scheduled" | "published";

type BlogPostTableRow = Database["public"]["Tables"]["blog_posts"]["Row"];

export type BlogPostRecord = Omit<BlogPostTableRow, "status" | "gtm_layer"> & {
  status: BlogPostStatus;
  gtm_layer: Json | null;
};

export type BlogPostSummary = {
  slug: string;
  title: string;
  excerpt: string;
  persona: string | null;
  tags: string[];
  publishedAt: string;
  coverImageUrl: string | null;
};

export type BlogPostDetail = BlogPostSummary & {
  seoTitle: string;
  seoDescription: string;
  canonicalUrl: string | null;
  markdownPath: string;
  html: string;
  gtmLayer: Json | null;
};
