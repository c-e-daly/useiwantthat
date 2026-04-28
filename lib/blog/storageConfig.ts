type ParsedStorageUrl = {
  bucket?: string;
  prefix?: string;
};

const trimSlashes = (value: string) => value.replace(/^\/+|\/+$/g, "");

function readFirst(...values: Array<string | undefined>) {
  return values.find((value) => typeof value === "string" && value.length > 0);
}

function joinStoragePath(...parts: Array<string | undefined>) {
  return parts
    .map((part) => (part ? trimSlashes(part) : ""))
    .filter(Boolean)
    .join("/");
}

function parseSupabaseStorageUrl(value: string | undefined): ParsedStorageUrl {
  if (!value) {
    return {};
  }

  try {
    const url = new URL(value);
    const segments = url.pathname.split("/").filter(Boolean);
    const s3Index = segments.findIndex(
      (segment, index) =>
        segment === "s3" &&
        segments[index - 1] === "v1" &&
        segments[index - 2] === "storage"
    );

    if (s3Index >= 0) {
      const [bucket, ...prefixParts] = segments.slice(s3Index + 1);
      return {
        bucket,
        prefix: prefixParts.join("/") || undefined,
      };
    }

    const objectIndex = segments.findIndex(
      (segment, index) =>
        segment === "object" &&
        segments[index - 1] === "v1" &&
        segments[index - 2] === "storage"
    );

    if (objectIndex >= 0) {
      const objectSegments = segments.slice(objectIndex + 1);
      const bucketIndex = objectSegments[0] === "public" ? 1 : 0;
      const bucket = objectSegments[bucketIndex];
      const prefix = objectSegments.slice(bucketIndex + 1).join("/");

      return {
        bucket,
        prefix: prefix || undefined,
      };
    }
  } catch {
    return {};
  }

  return {};
}

function derivePrefix(basePrefix: string | undefined, leaf: "markdown" | "seo") {
  if (!basePrefix) {
    return `blog/${leaf}`;
  }

  const normalized = trimSlashes(basePrefix);
  const parts = normalized.split("/");
  const lastPart = parts.at(-1);

  if (lastPart === leaf) {
    return normalized;
  }

  if (lastPart === "markdown" || lastPart === "seo") {
    return [...parts.slice(0, -1), leaf].join("/");
  }

  return joinStoragePath(normalized, leaf);
}

export function getBlogStorageConfig() {
  const parsedStorageUrl = parseSupabaseStorageUrl(process.env.SUPABASE_STORAGE_URL);
  const basePrefix = parsedStorageUrl.prefix;

  return {
    bucket:
      readFirst(
        process.env.SUPABASE_BLOG_BUCKET,
        process.env.SUPABASE_BLOG_STORAGE_BUCKET,
        parsedStorageUrl.bucket
      ) ?? "blog-posts",
    markdownPrefix:
      process.env.SUPABASE_BLOG_MARKDOWN_PREFIX ??
      derivePrefix(basePrefix, "markdown"),
    seoPrefix:
      process.env.SUPABASE_BLOG_SEO_PREFIX ?? derivePrefix(basePrefix, "seo"),
  };
}
