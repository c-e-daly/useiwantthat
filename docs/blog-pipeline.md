# Blog Pipeline

This is the canonical architecture note for the Prophet blog pipeline. The blog
system is the most sophisticated content subsystem in the app: it spans Google
Drive export, Supabase Storage staging, frontmatter validation, Supabase row
promotion, Markdown rendering, template-aware article layout, preview, sitemap,
and optional revalidation.

## Current implementation map

- Supabase schema migration: `supabase/migrations/20260420_create_blog_posts.sql`
- Blog ingest worker: `scripts/blog-ingest-google-drive.ts`
- Blog incoming publisher: `scripts/blog-publish-incoming.ts`
- Blog data access and rendering support:
  - `lib/blog/posts.ts`
  - `lib/blog/frontmatter.ts`
  - `lib/blog/markdown.ts`
  - `lib/blog/articleTemplates.ts`
  - `lib/blog/pillars.ts`
  - `lib/blog/types.ts`
- Blog routes:
  - `app/blog/page.tsx`
  - `app/blog/[slug]/page.tsx`
  - `app/blog/[slug]/[postSlug]/page.tsx` legacy pillar/post compatibility route
  - `app/blog/preview/[slug]/page.tsx`
- Blog article renderer: `components/blog/BlogArticleRenderer.tsx`
- Blog component styling: `app/styles/globals.css`
- Dynamic sitemap: `app/sitemap.ts`
- Optional revalidation integration:
  - `scripts/blog-publish-incoming.ts --revalidate` calls `POST /api/revalidate`
  - The handler lives at `app/api/revalidate/route.ts`

## Storage convention

- Storage is expected to be private for source Markdown and incoming bundles.
- Bucket name: `blog-posts` by default. Override with `SUPABASE_BLOG_BUCKET`.
- Incoming post bundles are uploaded under `blog/incoming/YYYY/MM/[slug]/`.
- The transfer agent uploads `_ready.json` last. The publisher/listener should
  only process incoming paths ending in `/_ready.json`.
- Each incoming folder must include `post.md` and `manifest.json`.
- Markdown prefix: `blog/markdown`. Override with `SUPABASE_BLOG_MARKDOWN_PREFIX`.
- SEO prefix: `blog/seo`. Override with `SUPABASE_BLOG_SEO_PREFIX`.
- Image prefix convention: `blog/images`.
- Processed marker prefix convention: `blog/processed`.
- Review prefix convention: `blog/review`.
- Period-based folders are supported, for example:
  - `blog/markdown/2026/04/price-elasticity-for-shopify.md`
  - `blog/seo/2026/04/price-elasticity-for-shopify.json`
- `blog_posts.markdown_path` can be either:
  - full object path: `blog/markdown/2026/04/post.md`
  - relative path: `2026/04/post.md`, with the Markdown prefix applied by the app
- `blog_posts.seo_path` is optional. If missing, SEO path is derived from the
  Markdown path by replacing `.md` with `.json` under the SEO prefix.
- No file size or MIME constraints are enforced by the scaffold.

## Required env vars

- `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_SECRET_KEY` preferred by the app
- `SUPABASE_SERVICE_ROLE_KEY` legacy fallback for scripts/app
- `NEXT_PUBLIC_SITE_URL` for canonical URLs and sitemap URLs
- `BLOG_PREVIEW_TOKEN` for private draft previews
- Optional: `SUPABASE_BLOG_BUCKET`
- Optional: `SUPABASE_BLOG_MARKDOWN_PREFIX`
- Optional: `SUPABASE_BLOG_SEO_PREFIX`
- Optional: `SUPABASE_BLOG_INCOMING_PREFIX`
- Optional: `SUPABASE_BLOG_INGEST_STATE_PATH`
- `REVALIDATE_TOKEN`, required in production when using `blog:publish:incoming -- --revalidate`

Google Drive ingest also requires Google credentials and `GOOGLE_DRIVE_SOURCE_FOLDER_ID`.
See `docs/google-drive-blog-ingest.md`.

## Agent publish sequence

1. Export Google Doc to Markdown.
2. Generate Prophet YAML frontmatter at the top of the Markdown using
   `docs/prophet-frontmatter-schema.md`.
3. Preserve the article body. Body content may use the component syntax in
   `docs/blog-markdown-components.md`.
4. Run frontmatter validation before publish. If
   `pipeline.validationPassed=false`, keep the file in review and do not mark
   the row published.
5. Upload the complete bundle to `blog/incoming/YYYY/MM/[slug]/`, including
   Markdown, manifest, and images.
6. Upload `_ready.json` last to trigger processing.
7. Publisher validates the folder and promotes files to the configured Markdown
   path. Future listener automation should use the same contract.
8. Upsert row in `public.blog_posts` with:
   - `slug`, `title`, `excerpt`, `persona`, `tags`
   - `markdown_path`
   - optional `seo_path`
   - optional direct DB fields: `seo_title`, `seo_description`, `canonical_url`,
     `gtm_layer`
   - `status`: `draft`, `scheduled`, or `published`
   - `published_at`
9. Optionally call revalidation with `--revalidate`.
   - The publisher calls `POST /api/revalidate`.
   - Header: `x-revalidate-token: <REVALIDATE_TOKEN>`.
   - Body: `{ "slug": "your-slug", "paths": [...] }`.
   - Add the route before relying on this in production. Pages currently use
     `revalidate = 300`, so content refreshes through normal ISR even without
     the route.

## Private preview sequence

To stage a post for approval without making it public:

```bash
npm run blog:preview:incoming -- --slug=your-slug
```

This promotes the incoming bundle into the app Markdown path and upserts
`public.blog_posts.status='draft'` with `published_at=null`. Draft rows are not
returned by the public blog index, sitemap, or `/blog/[slug]` route.

Preview the draft at:

```txt
/blog/preview/[slug]?token=$BLOG_PREVIEW_TOKEN
```

The preview route is request-time rendered, requires `BLOG_PREVIEW_TOKEN`, and
sets `noindex,nofollow`. Preview uses the same shared article renderer as the
published route, minus public-only GTM and JSON-LD injection. To approve the
post, rerun the publisher without `--draft`:

```bash
npm run blog:publish:incoming -- --slug=your-slug
```

## Resolved app contract

- The Markdown file is the source of truth for Prophet frontmatter fields:
  pillar, template, SEO, AEO, schema flags, internal links, author, reading time,
  and CTA metadata.
- The `blog_posts` row remains the publish index and storage pointer. It
  controls status, scheduled publish filtering, and backwards-compatible card
  fields.
- Canonical article URLs use the short post route: `/blog/[slug]`.
- The legacy pillar/post route `/blog/[pillar]/[slug]` delegates to the short
  route after verifying the post belongs to the requested pillar.
- Pillar/branch relationships are expressed in frontmatter with `pillarPost`,
  `pillarBranch`, and `pillarPostSlug`, plus reciprocal internal links.
- `/blog/[pillar]` renders the pillar landing page from published posts in that
  pillar.
- `lib/blog/links.ts` exposes `validateExternalLinks(markdown)` for the Google
  Drive/Supabase agent step. Keep this out of request-time rendering so slow
  third-party sites do not block page loads.
- `lib/blog/frontmatter.ts` parses the generated YAML subset and strips
  frontmatter before body rendering.
- `lib/blog/markdown.ts` renders the Markdown body into HTML and returns a
  generated H2/H3 table of contents.
- `components/blog/BlogArticleRenderer.tsx` owns the shared public and preview
  article presentation, including hero image, byline, template label, TL;DR,
  generated table of contents, body HTML, FAQ, takeaways, related links, and CTA.

## Markdown rendering contract

The Markdown body can use native Markdown and the strict component directives in
`docs/blog-markdown-components.md`.

Native Markdown support:

- H1-H6 headings with stable generated IDs.
- Explicit Google Docs heading anchors such as `{#faq}` are stripped from visible
  heading text and used as stable IDs.
- Manual exported "Table of Contents" sections are skipped because the renderer
  generates the TOC from H2/H3 headings.
- Paragraphs, links, emphasis, inline code, blockquotes, code fences, horizontal
  rules, ordered lists, unordered lists, images, and GFM-style pipe tables.

Table behavior:

- Tables are wrapped for horizontal mobile scrolling.
- Fully empty exported spreadsheet columns are dropped.
- Empty exported header rows are normalized by promoting the first meaningful row.
- This cleanup helps with Google Docs exports, but complex spreadsheet layout
  tables are still a source problem. Prefer real Markdown tables.

Component directives:

- `:::summary` / `:::summary-box`
- `:::stat`
- `:::split` / `:::columns`
- `:::button`
- `:::cta`
- `:::cards`
- `:::faq`
- `:::steps`
- `:::video`
- `:::carousel` / `:::gallery`

Hero image, author data, SEO, schema, and related links should remain in
frontmatter or the incoming manifest rather than in body directives.

## Incoming bundle contract

`post.md` contains the complete Prophet YAML frontmatter block followed by the
Google Doc Markdown body.

`manifest.json` identifies the source doc/folder, author metadata, Markdown
filename, and asset filenames. Asset filenames should match the files uploaded
into the same incoming folder.

`_ready.json` is the final upload and processing trigger. It can repeat the slug,
source doc URL, upload timestamp, and list of expected files.

`post.md` structure:

```md
---
[complete Prophet YAML frontmatter]
---

# Article H1

Article body exported from Google Docs as Markdown.
```

`manifest.json` structure:

```json
{
  "slug": "bfcm-discounts-destroy-shopify-margins",
  "source": "google-drive",
  "sourceDocUrl": "https://docs.google.com/...",
  "sourceFolderUrl": "https://drive.google.com/...",
  "authorName": "Author Name",
  "authorRole": "Author role",
  "exportedAt": "2026-05-01T14:29:00.000Z",
  "markdownFile": "post.md",
  "assets": [
    {
      "filename": "hero.png",
      "role": "hero",
      "contentType": "image/png"
    },
    {
      "filename": "og.png",
      "role": "og",
      "contentType": "image/png"
    }
  ]
}
```

`_ready.json` structure:

```json
{
  "slug": "bfcm-discounts-destroy-shopify-margins",
  "source": "google-drive",
  "sourceDocUrl": "https://docs.google.com/...",
  "uploadedAt": "2026-05-01T14:30:00.000Z",
  "files": ["post.md", "manifest.json", "hero.png", "og.png"]
}
```

The transfer agent should keep asset filenames stable between `manifest.json`,
Markdown image references, and uploaded objects in the incoming folder.

## Optional revalidate payload examples

These examples use the app route at `app/api/revalidate/route.ts`.

```bash
curl -X POST https://www.useiwantthat.com/api/revalidate \
  -H "content-type: application/json" \
  -H "x-revalidate-token: $REVALIDATE_TOKEN" \
  -d '{"slug":"price-elasticity-for-shopify"}'
```

```bash
curl -X POST https://www.useiwantthat.com/api/revalidate \
  -H "content-type: application/json" \
  -H "x-revalidate-token: $REVALIDATE_TOKEN" \
  -d '{"paths":["/blog","/sellers"]}'
```
