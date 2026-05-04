import { createClient } from "@supabase/supabase-js";
import nextEnv from "@next/env";
import { parseMarkdownWithFrontmatter } from "../lib/blog/frontmatter";
import { getBlogStorageConfig } from "../lib/blog/storageConfig";
import { BLOG_PILLARS } from "../lib/blog/pillars";
import type { ContentPillar, PostFrontmatter } from "../lib/blog/prophet-frontmatter.types";

nextEnv.loadEnvConfig(process.cwd());

type ReadyFile = {
  slug?: string;
  source?: string;
  sourceDocUrl?: string;
  uploadedAt?: string;
  files?: string[];
};

type ManifestFile = {
  slug?: string;
  source?: string;
  sourceDocUrl?: string;
  sourceFolderUrl?: string;
  authorName?: string;
  authorRole?: string;
  exportedAt?: string;
  markdownFile?: string;
  assets?: Array<{
    filename: string;
    role: string;
    contentType: string;
  }>;
};

const DEFAULT_INCOMING_PREFIX = "blog/incoming";

function readEnv(name: string) {
  const value = process.env[name];
  return value && value.trim().length > 0 ? value.trim() : undefined;
}

function hasFlag(name: string) {
  return process.argv.includes(name);
}

function getArgValue(name: string) {
  const prefix = `${name}=`;
  const inline = process.argv.find((arg) => arg.startsWith(prefix));
  if (inline) {
    return inline.slice(prefix.length);
  }

  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

function trimSlashes(value: string) {
  return value.replace(/^\/+|\/+$/g, "");
}

function joinPath(...parts: Array<string | undefined>) {
  return parts
    .map((part) => (part ? trimSlashes(part) : ""))
    .filter(Boolean)
    .join("/");
}

function getSupabaseClient() {
  const url = readEnv("SUPABASE_URL") ?? readEnv("NEXT_PUBLIC_SUPABASE_URL");
  const key = readEnv("SUPABASE_SERVICE_ROLE_KEY") ?? readEnv("SUPABASE_SECRET_KEY");

  if (!url || !key) {
    throw new Error("Missing Supabase credentials. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.");
  }

  return createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

function getFirstHeading(markdown: string) {
  return markdown
    .replace(/\r\n/g, "\n")
    .split("\n")
    .find((line) => /^#\s+/.test(line))
    ?.replace(/^#\s+/, "")
    .trim();
}

function isContentPillar(value: unknown): value is ContentPillar {
  return typeof value === "string" && value in BLOG_PILLARS;
}

function readFirstNonEmpty(...values: Array<string | null | undefined>) {
  return values.find((value) => typeof value === "string" && value.trim().length > 0);
}

function toStringArray(value: unknown) {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

function parseIsoDate(value: string | undefined) {
  if (!value) {
    return null;
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function derivePeriodFromReadyPath(readyPath: string) {
  const parts = readyPath.split("/");
  const readyIndex = parts.lastIndexOf("_ready.json");
  const slugIndex = readyIndex - 1;
  const month = parts[slugIndex - 1];
  const year = parts[slugIndex - 2];

  if (/^\d{4}$/.test(year) && /^\d{2}$/.test(month)) {
    return { year, month };
  }

  const now = new Date();
  return {
    year: String(now.getUTCFullYear()),
    month: String(now.getUTCMonth() + 1).padStart(2, "0"),
  };
}

function getIncomingFolderFromReadyPath(readyPath: string) {
  return readyPath.replace(/\/_ready\.json$/, "");
}

function getPublicStorageUrl(bucket: string, path: string) {
  const explicitStorageUrl = readEnv("SUPABASE_STORAGE_PUBLIC_URL");
  const url = readEnv("SUPABASE_URL") ?? readEnv("NEXT_PUBLIC_SUPABASE_URL");

  if (explicitStorageUrl) {
    return `${explicitStorageUrl.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`;
  }

  if (url) {
    return `${url.replace(/\/+$/, "")}/storage/v1/object/public/${bucket}/${path.replace(/^\/+/, "")}`;
  }

  return path;
}

function getCanonicalUrl(slug: string) {
  const siteUrl = readEnv("NEXT_PUBLIC_SITE_URL") ?? "https://www.useiwantthat.com";
  return `${siteUrl.replace(/\/+$/, "")}/blog/${slug}`;
}

function getGeneratedOgImageUrl(slug: string) {
  const siteUrl = readEnv("NEXT_PUBLIC_SITE_URL") ?? "https://www.useiwantthat.com";
  return `${siteUrl.replace(/\/+$/, "")}/og/${slug}.png`;
}

function getAppServedAssetUrl(path: string) {
  const siteUrl = readEnv("NEXT_PUBLIC_SITE_URL") ?? "https://www.useiwantthat.com";
  return `${siteUrl.replace(/\/+$/, "")}/blog-assets/${path.replace(/^\/+/, "")}`;
}

function yamlString(value: string) {
  return `"${value.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

function replaceNestedFrontmatterString(frontmatter: string, section: string, key: string, value: string) {
  const normalized = frontmatter.replace(/\r\n/g, "\n");
  const sectionPattern = new RegExp(`(^${section}:\\n)([\\s\\S]*?)(?=^[A-Za-z][A-Za-z0-9]*:|^---\\s*$)`, "m");
  const match = normalized.match(sectionPattern);

  if (!match) {
    return normalized;
  }

  const sectionBody = match[2];
  const linePattern = new RegExp(`^(\\s{2}${key}:\\s*).*$`, "m");
  const nextSectionBody = linePattern.test(sectionBody)
    ? sectionBody.replace(linePattern, `$1${yamlString(value)}`)
    : `${sectionBody.replace(/\n?$/, "\n")}  ${key}: ${yamlString(value)}\n`;

  return normalized.replace(sectionPattern, `${match[1]}${nextSectionBody}`);
}

function replaceArticleSchemaImage(frontmatter: string, value: string) {
  return frontmatter.replace(/^(\s{4}image:\s*).*$/m, `$1${yamlString(value)}`);
}

function updateFrontmatterImages(postMarkdown: string, imageUrl: string | null) {
  if (!imageUrl) {
    return postMarkdown;
  }

  const { frontmatter, content } = parseMarkdownWithFrontmatter(postMarkdown);
  if (!frontmatter) {
    return postMarkdown;
  }

  const closingIndex = postMarkdown.replace(/\r\n/g, "\n").indexOf("\n---", 4);
  if (closingIndex < 0) {
    return postMarkdown;
  }

  const rawFrontmatter = postMarkdown.replace(/\r\n/g, "\n").slice(0, closingIndex + 4);
  let nextFrontmatter = replaceNestedFrontmatterString(rawFrontmatter, "og", "image", imageUrl);
  nextFrontmatter = replaceNestedFrontmatterString(nextFrontmatter, "twitter", "image", imageUrl);
  nextFrontmatter = replaceArticleSchemaImage(nextFrontmatter, imageUrl);

  return `${nextFrontmatter}\n${content}`;
}

function selectAsset(manifest: ManifestFile, role: string) {
  return manifest.assets?.find((asset) => asset.role === role);
}

async function downloadText(bucket: string, path: string) {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.storage.from(bucket).download(path);

  if (error) {
    throw new Error(`Failed to download ${bucket}/${path}: ${error.message}`);
  }

  return data.text();
}

async function uploadText(bucket: string, path: string, text: string, contentType: string) {
  const supabase = getSupabaseClient();
  const { error } = await supabase.storage.from(bucket).upload(path, text, {
    contentType,
    upsert: true,
  });

  if (error) {
    throw new Error(`Failed to upload ${bucket}/${path}: ${error.message}`);
  }
}

async function pathExists(bucket: string, path: string) {
  const supabase = getSupabaseClient();
  const { error } = await supabase.storage.from(bucket).download(path);
  return !error;
}

async function findReadyPath(input: { bucket: string; incomingPrefix: string; slug: string }) {
  const explicitReadyPath = getArgValue("--ready");
  if (explicitReadyPath) {
    return trimSlashes(explicitReadyPath);
  }

  const year = getArgValue("--year");
  const month = getArgValue("--month");

  if (year && month) {
    const readyPath = joinPath(input.incomingPrefix, year, month, input.slug, "_ready.json");
    if (await pathExists(input.bucket, readyPath)) {
      return readyPath;
    }
  }

  const supabase = getSupabaseClient();
  const queue = [trimSlashes(input.incomingPrefix)];

  while (queue.length > 0) {
    const prefix = queue.shift() as string;
    const { data, error } = await supabase.storage.from(input.bucket).list(prefix, {
      limit: 1000,
      sortBy: { column: "name", order: "asc" },
    });

    if (error) {
      throw new Error(`Failed to list ${input.bucket}/${prefix}: ${error.message}`);
    }

    for (const item of data ?? []) {
      const itemPath = joinPath(prefix, item.name);

      if (item.name === "_ready.json" && itemPath.endsWith(`/${input.slug}/_ready.json`)) {
        return itemPath;
      }

      if (!item.name.includes(".") && itemPath.split("/").length <= input.incomingPrefix.split("/").length + 4) {
        queue.push(itemPath);
      }
    }
  }

  throw new Error(`Could not find _ready.json for slug '${input.slug}' under ${input.bucket}/${input.incomingPrefix}.`);
}

function getPostStatus(frontmatter: Partial<PostFrontmatter>, force: boolean) {
  if (hasFlag("--draft")) {
    return { status: "draft", publishedAt: null };
  }

  if (!force && frontmatter.pipeline?.publishBlocked) {
    throw new Error(`Publish blocked by frontmatter: ${frontmatter.pipeline.blockReasons?.join("; ") || "no reason provided"}`);
  }

  if (!force && frontmatter.pipeline && frontmatter.pipeline.validationPassed === false) {
    throw new Error("Publish blocked because pipeline.validationPassed is false. Re-run with --force to override.");
  }

  const scheduledFor = parseIsoDate(frontmatter.scheduledFor);

  if (scheduledFor && scheduledFor.getTime() > Date.now()) {
    return { status: "scheduled", publishedAt: scheduledFor.toISOString() };
  }

  return {
    status: "published",
    publishedAt: parseIsoDate(frontmatter.publishedAt)?.toISOString() ?? new Date().toISOString(),
  };
}

async function maybeRevalidate(slug: string, pillar: ContentPillar | null) {
  if (!hasFlag("--revalidate")) {
    return;
  }

  const token = readEnv("REVALIDATE_TOKEN");
  const siteUrl = readEnv("NEXT_PUBLIC_SITE_URL");

  if (!token || !siteUrl) {
    console.log("Skip revalidate: missing REVALIDATE_TOKEN or NEXT_PUBLIC_SITE_URL.");
    return;
  }

  const paths = ["/blog", `/blog/${slug}`];
  if (pillar) {
    paths.push(`/blog/${BLOG_PILLARS[pillar].segment}`, `/blog/${BLOG_PILLARS[pillar].segment}/${slug}`);
  }

  const response = await fetch(`${siteUrl.replace(/\/+$/, "")}/api/revalidate`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-revalidate-token": token,
    },
    body: JSON.stringify({ slug, paths }),
  });

  if (!response.ok) {
    console.log(`Revalidate failed with ${response.status}: ${await response.text()}`);
    return;
  }

  console.log(`Revalidated ${paths.join(", ")}.`);
}

async function main() {
  const slug = getArgValue("--slug");
  const force = hasFlag("--force");
  const dryRun = hasFlag("--dry-run");
  const incomingPrefix = readEnv("SUPABASE_BLOG_INCOMING_PREFIX") ?? DEFAULT_INCOMING_PREFIX;
  const { bucket, markdownPrefix } = getBlogStorageConfig();

  if (!slug) {
    throw new Error("Missing slug. Run with --slug=<post-slug>.");
  }

  const readyPath = await findReadyPath({ bucket, incomingPrefix, slug });
  const incomingFolder = getIncomingFolderFromReadyPath(readyPath);
  const ready = JSON.parse(await downloadText(bucket, readyPath)) as ReadyFile;
  const manifest = JSON.parse(await downloadText(bucket, joinPath(incomingFolder, "manifest.json"))) as ManifestFile;
  const incomingMarkdownPath = joinPath(incomingFolder, manifest.markdownFile ?? "post.md");
  const incomingPostMarkdown = await downloadText(bucket, incomingMarkdownPath);
  const heroAsset = selectAsset(manifest, "hero");
  const ogAsset = selectAsset(manifest, "og");
  const heroImageUrl = heroAsset ? getAppServedAssetUrl(joinPath(incomingFolder, heroAsset.filename)) : null;
  const ogImageUrl = ogAsset ? getAppServedAssetUrl(joinPath(incomingFolder, ogAsset.filename)) : getGeneratedOgImageUrl(slug);
  const postMarkdown = updateFrontmatterImages(incomingPostMarkdown, ogImageUrl);
  const { frontmatter, content } = parseMarkdownWithFrontmatter(postMarkdown);

  if (!frontmatter) {
    throw new Error(`${incomingMarkdownPath} does not contain YAML frontmatter.`);
  }

  const postSlug = frontmatter.slug ?? ready.slug ?? manifest.slug ?? slug;
  if (postSlug !== slug) {
    throw new Error(`Slug mismatch. Argument '${slug}' but frontmatter/manifest resolved '${postSlug}'.`);
  }

  const { year, month } = derivePeriodFromReadyPath(readyPath);
  const markdownPath = joinPath(markdownPrefix, year, month, `${slug}.md`);
  const pillar = isContentPillar(frontmatter.pillar) ? frontmatter.pillar : null;
  const { status, publishedAt } = getPostStatus(frontmatter, force);
  const title = readFirstNonEmpty(frontmatter.og?.title, frontmatter.seo?.metaTitle, getFirstHeading(content), slug) as string;
  const excerpt = readFirstNonEmpty(frontmatter.aeo?.tldr, frontmatter.seo?.metaDescription);
  const coverImageUrl = readFirstNonEmpty(heroImageUrl, ogImageUrl, frontmatter.og?.image);
  const row = {
    slug,
    title,
    excerpt: excerpt ?? null,
    persona: frontmatter.funnelStage ?? null,
    tags: toStringArray(frontmatter.tags),
    cover_image_url: coverImageUrl
      ? coverImageUrl.startsWith("http")
        ? coverImageUrl
        : getPublicStorageUrl(bucket, joinPath(incomingFolder, coverImageUrl))
      : null,
    canonical_url: getCanonicalUrl(slug),
    seo_title: frontmatter.seo?.metaTitle ?? null,
    seo_description: frontmatter.seo?.metaDescription ?? null,
    markdown_path: markdownPath,
    seo_path: null,
    published_at: publishedAt,
    status,
  };

  console.log(`Ready: ${bucket}/${readyPath}`);
  console.log(`Promote markdown: ${bucket}/${incomingMarkdownPath} -> ${bucket}/${markdownPath}`);
  console.log(`Upsert blog_posts slug=${slug} status=${status}`);

  if (dryRun) {
    console.log(JSON.stringify(row, null, 2));
    return;
  }

  await uploadText(bucket, markdownPath, postMarkdown, "text/markdown; charset=utf-8");

  const supabase = getSupabaseClient();
  const { error } = await supabase.from("blog_posts").upsert(row, {
    onConflict: "slug",
  });

  if (error) {
    throw new Error(`Failed to upsert blog_posts row: ${error.message}`);
  }

  console.log(`Published ${slug}.`);
  await maybeRevalidate(slug, pillar);
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(message);
  process.exitCode = 1;
});
