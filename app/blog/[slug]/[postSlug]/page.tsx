import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostPage, { generateMetadata as generateLegacyMetadata } from "@/app/blog/[slug]/page";
import { BLOG_PILLARS, getPillarBySegment } from "@/lib/blog/pillars";
import { getPostDetailBySlug, getPublishedPostSummaries } from "@/lib/blog/posts";

type PillarPostPageProps = {
  params: Promise<{ slug: string; postSlug: string }>;
};

export const revalidate = 300;

export async function generateStaticParams() {
  const posts = await getPublishedPostSummaries(100);

  return posts
    .filter((post) => post.pillar)
    .map((post) => ({
      slug: post.pillar ? BLOG_PILLARS[post.pillar].segment : "",
      postSlug: post.slug,
    }));
}

export async function generateMetadata({ params }: PillarPostPageProps): Promise<Metadata> {
  const { slug, postSlug } = await params;
  const pillar = getPillarBySegment(slug);

  if (!pillar) {
    notFound();
  }

  const post = await getPostDetailBySlug(postSlug);

  if (post.pillar !== pillar.value) {
    notFound();
  }

  return generateLegacyMetadata({ params: Promise.resolve({ slug: postSlug }) });
}

export default async function PillarBlogPostPage({ params }: PillarPostPageProps) {
  const { slug, postSlug } = await params;
  const pillar = getPillarBySegment(slug);

  if (!pillar) {
    notFound();
  }

  const post = await getPostDetailBySlug(postSlug);

  if (post.pillar !== pillar.value) {
    notFound();
  }

  return <BlogPostPage params={Promise.resolve({ slug: postSlug })} />;
}
