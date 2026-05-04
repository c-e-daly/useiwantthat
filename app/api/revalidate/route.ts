import { revalidatePath } from "next/cache";
import type { NextRequest } from "next/server";

type RevalidatePayload = {
  path?: unknown;
  paths?: unknown;
  slug?: unknown;
};

function isAllowedWithoutToken() {
  return process.env.NODE_ENV !== "production" && !process.env.REVALIDATE_TOKEN;
}

function isAuthorized(request: NextRequest) {
  const token = process.env.REVALIDATE_TOKEN;

  if (!token) {
    return isAllowedWithoutToken();
  }

  return request.headers.get("x-revalidate-token") === token;
}

function normalizePath(value: unknown) {
  if (typeof value !== "string") return null;

  const path = value.trim();
  if (!path.startsWith("/") || path.startsWith("//") || path.includes("://")) {
    return null;
  }

  return path;
}

function normalizeSlug(value: unknown) {
  if (typeof value !== "string") return null;

  const slug = value.trim().replace(/^\/+|\/+$/g, "");
  if (!slug || slug.includes("://") || slug.includes("..")) {
    return null;
  }

  return slug;
}

async function readPayload(request: NextRequest): Promise<RevalidatePayload> {
  try {
    return (await request.json()) as RevalidatePayload;
  } catch {
    return {};
  }
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return Response.json({ revalidated: false, error: "Unauthorized" }, { status: 401 });
  }

  const payload = await readPayload(request);
  const paths = new Set<string>(["/blog"]);
  const path = normalizePath(payload.path);
  const slug = normalizeSlug(payload.slug);

  if (path) {
    paths.add(path);
  }

  if (Array.isArray(payload.paths)) {
    for (const candidate of payload.paths) {
      const normalized = normalizePath(candidate);
      if (normalized) {
        paths.add(normalized);
      }
    }
  }

  if (slug) {
    paths.add(`/blog/${slug}`);
  }

  for (const candidate of paths) {
    revalidatePath(candidate);
  }

  revalidatePath("/blog/[slug]", "page");
  revalidatePath("/blog/[slug]/[postSlug]", "page");

  return Response.json({
    revalidated: true,
    paths: Array.from(paths),
    patterns: ["/blog/[slug]", "/blog/[slug]/[postSlug]"],
    now: new Date().toISOString(),
  });
}
