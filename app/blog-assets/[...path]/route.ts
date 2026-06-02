import { readFile } from "node:fs/promises";
import path from "node:path";
import { notFound } from "next/navigation";

type BlogAssetRouteContext = {
  params: Promise<{ path: string[] }>;
};

const CONTENT_IMAGES_DIR = path.join(process.cwd(), "content", "images");

const CONTENT_TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
};

export const runtime = "nodejs";

export async function GET(_request: Request, { params }: BlogAssetRouteContext) {
  const assetPath = (await params).path.join("/");
  const requestedPath = path.normalize(path.join(CONTENT_IMAGES_DIR, assetPath));

  if (!requestedPath.startsWith(CONTENT_IMAGES_DIR + path.sep)) {
    notFound();
  }

  try {
    const body = await readFile(requestedPath);
    const extension = path.extname(requestedPath).toLowerCase();

    return new Response(body, {
      headers: {
        "Content-Type": CONTENT_TYPES[extension] ?? "application/octet-stream",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    notFound();
  }
}
