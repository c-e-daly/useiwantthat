import type { MetadataRoute } from "next";
import { getPublishedHubDetails } from "@/lib/blog/hubs";
import { getPublishedPostSummaries } from "@/lib/blog/posts";
import { getPublishedGlossaryTerms } from "@/lib/glossary/terms";
import { LEGAL_DOCUMENTS } from "@/lib/legal/documents";
import { getSiteUrl } from "@/lib/site/url";

const BASE_URL = getSiteUrl();

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPublishedPostSummaries();
  const hubs = await getPublishedHubDetails();
  const glossaryTerms = await getPublishedGlossaryTerms();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, lastModified: new Date() },
    { url: `${BASE_URL}/ask-rami`, lastModified: new Date() },
    { url: `${BASE_URL}/vector`, lastModified: new Date() },
    { url: `${BASE_URL}/blog`, lastModified: new Date() },
    { url: `${BASE_URL}/glossary`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/legal`, lastModified: new Date() },
    ...LEGAL_DOCUMENTS.map((document) => ({
      url: `${BASE_URL}${document.path}`,
      lastModified: new Date(),
    })),
  ];

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}${post.path}`,
    lastModified: new Date(post.updatedAt || post.publishedAt),
    changeFrequency: post.sitemapChangefreq ?? "monthly",
    priority: post.sitemapPriority ?? (post.featured ? 0.9 : post.pillar ? 0.7 : 0.6),
  }));

  const hubRoutes: MetadataRoute.Sitemap = hubs.map((hub) => ({
    url: `${BASE_URL}${hub.path}`,
    lastModified: new Date(hub.updatedAt || hub.publishedAt),
    changeFrequency: hub.sitemapChangefreq ?? "monthly",
    priority: hub.sitemapPriority ?? 0.9,
  }));

  const glossaryRoutes: MetadataRoute.Sitemap = glossaryTerms.map((term) => ({
    url: `${BASE_URL}${term.path}`,
    lastModified: term.lastUpdated ? new Date(term.lastUpdated) : new Date(),
    changeFrequency: "monthly",
    priority: term.sitemapPriority,
  }));

  return [...staticRoutes, ...hubRoutes, ...postRoutes, ...glossaryRoutes];
}
