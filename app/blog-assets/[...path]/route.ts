import type { NextRequest } from "next/server";
import { createBlogSupabaseAdminClient } from "@/lib/blog/supabaseAdmin";
import { getBlogStorageConfig } from "@/lib/blog/storageConfig";

type BlogAssetRouteContext = {
  params: Promise<{ path: string[] }>;
};

const SAFE_ASSET_PATH =
  /^(?:blog\/incoming\/\d{4}\/\d{2}\/[a-z0-9-]+|blog\/images(?:\/\d{4}\/\d{2})?(?:\/[a-z0-9-]+)?|images(?:\/[a-z0-9-]+)?)\/[a-z0-9._-]+\.(png|jpe?g|webp|gif)$|^[a-z0-9-]+-(?:hero|og)\.(png|jpe?g|webp|gif)$/i;

export const runtime = "nodejs";

function getCacheControl() {
  return "public, max-age=31536000, immutable";
}

export async function GET(_request: NextRequest, { params }: BlogAssetRouteContext) {
  const { path } = await params;
  const storagePath = path.join("/");

  if (!SAFE_ASSET_PATH.test(storagePath)) {
    return Response.json({ error: "Invalid blog asset path" }, { status: 400 });
  }

  const { bucket } = getBlogStorageConfig();
  const supabase = createBlogSupabaseAdminClient();
  const { data, error } = await supabase.storage.from(bucket).download(storagePath);

  if (error) {
    return Response.json({ error: "Blog asset not found" }, { status: 404 });
  }

  return new Response(data, {
    headers: {
      "cache-control": getCacheControl(),
      "content-type": data.type || "application/octet-stream",
    },
  });
}
