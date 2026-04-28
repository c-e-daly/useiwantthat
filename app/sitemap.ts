import type { MetadataRoute } from "next";
import { getPublishedPostSummaries } from "@/lib/blog/posts";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.useiwantthat.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPublishedPostSummaries();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, lastModified: new Date() },
    { url: `${BASE_URL}/consumers`, lastModified: new Date() },
    { url: `${BASE_URL}/sellers`, lastModified: new Date() },
    { url: `${BASE_URL}/blog`, lastModified: new Date() },
  ];

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
  }));

  return [...staticRoutes, ...postRoutes];
}
