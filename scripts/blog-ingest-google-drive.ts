import { createHash } from "node:crypto";
import { google } from "googleapis";
import { createClient } from "@supabase/supabase-js";
import nextEnv from "@next/env";

nextEnv.loadEnvConfig(process.cwd());

type DriveDoc = {
  id: string;
  name: string;
  mimeType?: string;
  modifiedTime?: string;
  webViewLink?: string;
};

type IngestState = Record<
  string,
  {
    modifiedTime: string;
    slug: string;
    ingestedAt: string;
    storagePrefix: string;
  }
>;

type ManifestAsset = {
  filename: string;
  role: string;
  contentType: string;
};

const GOOGLE_DOC_MIME_TYPE = "application/vnd.google-apps.document";
const GOOGLE_FOLDER_MIME_TYPE = "application/vnd.google-apps.folder";
const MARKDOWN_MIME_TYPE = "text/markdown";
const DEFAULT_BUCKET = "blog-posts";
const DEFAULT_INCOMING_PREFIX = "blog/incoming";
const DEFAULT_STATE_PATH = "blog/ingest-state/google-drive.json";

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

function formatMonthPath(date = new Date()) {
  const year = String(date.getUTCFullYear());
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  return `${year}/${month}`;
}

function stripFrontmatter(markdown: string) {
  const normalized = markdown.replace(/\r\n/g, "\n");

  if (!normalized.startsWith("---\n")) {
    return { frontmatter: null as string | null, body: normalized };
  }

  const closingIndex = normalized.indexOf("\n---", 4);
  if (closingIndex < 0) {
    return { frontmatter: null as string | null, body: normalized };
  }

  const bodyStart = normalized.indexOf("\n", closingIndex + 4);
  return {
    frontmatter: normalized.slice(0, closingIndex + 4),
    body: bodyStart >= 0 ? normalized.slice(bodyStart + 1) : "",
  };
}

function firstHeading(markdown: string) {
  return markdown
    .replace(/\r\n/g, "\n")
    .split("\n")
    .find((line) => /^#\s+/.test(line))
    ?.replace(/^#\s+/, "")
    .trim();
}

function slugify(value: string) {
  const stopWords = new Set(["a", "an", "the", "and", "or", "for", "to", "of", "in", "on", "with", "is", "are", "was"]);
  const words = value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter((word) => word && !stopWords.has(word));

  const slug = words.join("-").slice(0, 65).replace(/-+$/g, "");
  return slug || createHash("sha1").update(value).digest("hex").slice(0, 12);
}

function extractFrontmatterSlug(frontmatter: string | null) {
  if (!frontmatter) {
    return undefined;
  }

  return frontmatter.match(/\nslug:\s*["']?([a-z0-9-]+)["']?\s*(?:\n|$)/)?.[1];
}

function ensurePostMarkdown(markdown: string) {
  const parsed = stripFrontmatter(markdown);
  const title = firstHeading(parsed.body) ?? "untitled-post";
  const slug = extractFrontmatterSlug(parsed.frontmatter) ?? slugify(title);

  return {
    slug,
    hasFrontmatter: Boolean(parsed.frontmatter),
    body: parsed.body,
    postMarkdown: parsed.frontmatter ? markdown.replace(/\r\n/g, "\n") : parsed.body,
  };
}

function buildManifest(input: {
  slug: string;
  sourceDocUrl?: string;
  sourceFolderUrl?: string;
  authorName?: string;
  authorRole?: string;
  assets: ManifestAsset[];
}) {
  return {
    slug: input.slug,
    source: "google-drive",
    sourceDocUrl: input.sourceDocUrl,
    sourceFolderUrl: input.sourceFolderUrl,
    authorName: input.authorName,
    authorRole: input.authorRole,
    exportedAt: new Date().toISOString(),
    markdownFile: "post.md",
    assets: input.assets,
  };
}

function buildReady(input: {
  slug: string;
  sourceDocUrl?: string;
  files: string[];
}) {
  return {
    slug: input.slug,
    source: "google-drive",
    sourceDocUrl: input.sourceDocUrl,
    uploadedAt: new Date().toISOString(),
    files: input.files,
  };
}

function safeFilename(value: string) {
  return basenameFromPath(value)
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function basenameFromPath(value: string) {
  return value.split(/[\\/]/).filter(Boolean).at(-1) ?? value;
}

function assetRole(filename: string) {
  const normalized = filename.toLowerCase();

  if (normalized.includes("og")) {
    return "og";
  }

  if (normalized.includes("hero") || normalized.includes("cover")) {
    return "hero";
  }

  return "article";
}

async function listImageAssets(drive: ReturnType<typeof google.drive>, sourceFolderId: string, docName: string, slug: string) {
  const folderResponse = await drive.files.list({
    q: `'${sourceFolderId}' in parents and mimeType='${GOOGLE_FOLDER_MIME_TYPE}' and trashed=false`,
    fields: "files(id, name)",
    pageSize: 100,
    supportsAllDrives: true,
    includeItemsFromAllDrives: true,
  });
  const candidateNames = new Set([docName, `${docName} assets`, slug, `${slug} assets`].map((value) => value.toLowerCase()));
  const assetFolder = folderResponse.data.files?.find((file) => file.id && file.name && candidateNames.has(file.name.toLowerCase()));

  if (!assetFolder?.id) {
    return [];
  }

  const imageResponse = await drive.files.list({
    q: `'${assetFolder.id}' in parents and mimeType contains 'image/' and trashed=false`,
    fields: "files(id, name, mimeType)",
    pageSize: 100,
    supportsAllDrives: true,
    includeItemsFromAllDrives: true,
  });

  return (imageResponse.data.files ?? [])
    .filter((file) => file.id && file.name && file.mimeType)
    .map((file) => ({
      id: file.id as string,
      filename: safeFilename(file.name as string),
      contentType: file.mimeType as string,
    }));
}

async function downloadBinary(drive: ReturnType<typeof google.drive>, fileId: string) {
  const response = await drive.files.get(
    {
      fileId,
      alt: "media",
      supportsAllDrives: true,
    },
    {
      responseType: "arraybuffer",
    }
  );

  return Buffer.from(response.data as ArrayBuffer);
}

async function getGoogleAuth() {
  const jsonPath = readEnv("GOOGLE_SERVICE_ACCOUNT_JSON_PATH") ?? readEnv("GOOGLE_APPLICATION_CREDENTIALS");
  const json = readEnv("GOOGLE_SERVICE_ACCOUNT_JSON");
  const jsonBase64 = readEnv("GOOGLE_SERVICE_ACCOUNT_JSON_BASE64");
  const serviceAccount = readEnv("GOOGLE_SERVICE_ACCOUNT");
  const email = readEnv("GOOGLE_SERVICE_ACCOUNT_EMAIL");
  const privateKey = readEnv("GOOGLE_PRIVATE_KEY")?.replace(/\\n/g, "\n");

  if (jsonPath) {
    return new google.auth.GoogleAuth({
      keyFile: jsonPath,
      scopes: ["https://www.googleapis.com/auth/drive.readonly"],
    });
  }

  if (json || jsonBase64 || serviceAccount) {
    const rawCredentials = json ?? serviceAccount ?? "{}";
    const credentials = JSON.parse(
      jsonBase64
        ? Buffer.from(jsonBase64, "base64").toString("utf8")
        : rawCredentials.trim().startsWith("{")
          ? rawCredentials
          : Buffer.from(rawCredentials, "base64").toString("utf8")
    );

    return new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/drive.readonly"],
    });
  }

  if (email && privateKey) {
    return new google.auth.GoogleAuth({
      credentials: {
        client_email: email,
        private_key: privateKey,
      },
      scopes: ["https://www.googleapis.com/auth/drive.readonly"],
    });
  }

  throw new Error(
    "Missing Google credentials. Set GOOGLE_SERVICE_ACCOUNT, GOOGLE_SERVICE_ACCOUNT_JSON_PATH, GOOGLE_SERVICE_ACCOUNT_JSON_BASE64, or GOOGLE_SERVICE_ACCOUNT_EMAIL plus GOOGLE_PRIVATE_KEY."
  );
}

async function listGoogleDocs(folderId: string) {
  const auth = await getGoogleAuth();
  const drive = google.drive({ version: "v3", auth });
  const files: DriveDoc[] = [];
  let pageToken: string | undefined;

  do {
    const response = await drive.files.list({
      q: `'${folderId}' in parents and mimeType='${GOOGLE_DOC_MIME_TYPE}' and trashed=false`,
      fields: "nextPageToken, files(id, name, mimeType, modifiedTime, webViewLink)",
      orderBy: "modifiedTime desc",
      pageToken,
      pageSize: 50,
      supportsAllDrives: true,
      includeItemsFromAllDrives: true,
    });

    files.push(...((response.data.files ?? []) as DriveDoc[]));
    pageToken = response.data.nextPageToken ?? undefined;
  } while (pageToken);

  return { drive, files };
}

async function exportMarkdown(drive: ReturnType<typeof google.drive>, fileId: string) {
  const response = await drive.files.export(
    {
      fileId,
      mimeType: MARKDOWN_MIME_TYPE,
    },
    {
      responseType: "arraybuffer",
    }
  );

  return Buffer.from(response.data as ArrayBuffer).toString("utf8");
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

async function downloadTextFromStorage(bucket: string, path: string) {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.storage.from(bucket).download(path);

  if (error) {
    return null;
  }

  return data.text();
}

async function readState(bucket: string, path: string): Promise<IngestState> {
  const text = await downloadTextFromStorage(bucket, path);

  if (!text) {
    return {};
  }

  try {
    return JSON.parse(text) as IngestState;
  } catch {
    return {};
  }
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

async function uploadBuffer(bucket: string, path: string, data: Buffer, contentType: string) {
  const supabase = getSupabaseClient();
  const { error } = await supabase.storage.from(bucket).upload(path, data, {
    contentType,
    upsert: true,
  });

  if (error) {
    throw new Error(`Failed to upload ${bucket}/${path}: ${error.message}`);
  }
}

async function main() {
  const dryRun = hasFlag("--dry-run") || !hasFlag("--upload");
  const folderId = getArgValue("--folder") ?? readEnv("GOOGLE_DRIVE_SOURCE_FOLDER_ID");
  const bucket = readEnv("SUPABASE_BLOG_BUCKET") ?? readEnv("SUPABASE_BLOG_STORAGE_BUCKET") ?? DEFAULT_BUCKET;
  const incomingPrefix = readEnv("SUPABASE_BLOG_INCOMING_PREFIX") ?? DEFAULT_INCOMING_PREFIX;
  const statePath = readEnv("SUPABASE_BLOG_INGEST_STATE_PATH") ?? DEFAULT_STATE_PATH;
  const authorName = readEnv("BLOG_INGEST_AUTHOR_NAME");
  const authorRole = readEnv("BLOG_INGEST_AUTHOR_ROLE");
  const allowBodyOnly = hasFlag("--allow-body-only");

  if (!folderId) {
    throw new Error("Missing source folder. Set GOOGLE_DRIVE_SOURCE_FOLDER_ID or pass --folder=<id>.");
  }

  const { drive, files } = await listGoogleDocs(folderId);
  const sourceFolderUrl = `https://drive.google.com/drive/folders/${folderId}`;
  const state = dryRun ? {} : await readState(bucket, statePath);
  const ingested: IngestState = { ...state };

  console.log(`Found ${files.length} Google Doc file(s) in ${folderId}.`);
  console.log(dryRun ? "Dry run: no Supabase uploads will be written." : `Uploading to ${bucket}/${incomingPrefix}.`);

  for (const file of files) {
    if (!file.id || !file.modifiedTime) {
      continue;
    }

    if (!dryRun && state[file.id]?.modifiedTime === file.modifiedTime) {
      console.log(`Skip unchanged: ${file.name}`);
      continue;
    }

    const markdown = await exportMarkdown(drive, file.id);
    const { slug, postMarkdown, hasFrontmatter } = ensurePostMarkdown(markdown);

    if (!hasFrontmatter && !allowBodyOnly) {
      console.log(`Skip body-only markdown without frontmatter: ${file.name}. Pass --allow-body-only to stage it anyway.`);
      continue;
    }

    const storagePrefix = joinPath(incomingPrefix, formatMonthPath(), slug);
    const imageAssets = await listImageAssets(drive, folderId, file.name, slug);
    const manifestAssets = imageAssets.map((asset) => ({
      filename: asset.filename,
      role: assetRole(asset.filename),
      contentType: asset.contentType,
    }));
    const manifest = buildManifest({
      slug,
      sourceDocUrl: file.webViewLink,
      sourceFolderUrl,
      authorName,
      authorRole,
      assets: manifestAssets,
    });
    const ready = buildReady({
      slug,
      sourceDocUrl: file.webViewLink,
      files: ["post.md", "manifest.json", ...manifestAssets.map((asset) => asset.filename)],
    });

    console.log(`Prepare ${file.name} -> ${storagePrefix}/post.md`);
    if (imageAssets.length > 0) {
      console.log(`Found ${imageAssets.length} image asset(s) for ${file.name}.`);
    }

    if (!dryRun) {
      await uploadText(bucket, joinPath(storagePrefix, "post.md"), postMarkdown, "text/markdown; charset=utf-8");
      await uploadText(bucket, joinPath(storagePrefix, "manifest.json"), JSON.stringify(manifest, null, 2), "application/json");

      for (const asset of imageAssets) {
        const data = await downloadBinary(drive, asset.id);
        await uploadBuffer(bucket, joinPath(storagePrefix, asset.filename), data, asset.contentType);
      }

      await uploadText(bucket, joinPath(storagePrefix, "_ready.json"), JSON.stringify(ready, null, 2), "application/json");

      ingested[file.id] = {
        modifiedTime: file.modifiedTime,
        slug,
        ingestedAt: new Date().toISOString(),
        storagePrefix,
      };
    }
  }

  if (!dryRun) {
    await uploadText(bucket, statePath, JSON.stringify(ingested, null, 2), "application/json");
    console.log(`Updated ingest state at ${bucket}/${statePath}.`);
  }
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(message);
  process.exitCode = 1;
});
