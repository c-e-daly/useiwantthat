import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogArticleRenderer } from "@/components/blog/BlogArticleRenderer";
import { getPreviewPostDetailBySlug } from "@/lib/blog/posts";

type BlogPreviewPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ token?: string }>;
};

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

function isAuthorized(token: string | undefined) {
  const previewToken = process.env.BLOG_PREVIEW_TOKEN;
  return Boolean(previewToken && token && token === previewToken);
}

function PreviewAccessError({ message }: { message: string }) {
  return (
    <main className="mx-auto max-w-xl px-6 py-24">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Blog preview</p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">Preview unavailable</h1>
      <p className="mt-4 text-slate-600">{message}</p>
    </main>
  );
}

export default async function BlogPreviewPage({ params, searchParams }: BlogPreviewPageProps) {
  const { slug } = await params;
  const { token } = await searchParams;

  if (!process.env.BLOG_PREVIEW_TOKEN) {
    return <PreviewAccessError message="BLOG_PREVIEW_TOKEN is not set in this deployment environment." />;
  }

  if (!isAuthorized(token)) {
    return <PreviewAccessError message="The preview token in the URL does not match this deployment." />;
  }

  const post = await getPreviewPostDetailBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <BlogArticleRenderer
      post={post}
      preview={{
        label: "Private blog preview",
        message: "This post is not included in the public blog index unless its frontmatter is published.",
      }}
    />
  );
}
