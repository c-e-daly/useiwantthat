# Blog Pipeline Scaffold

## What was added

- Supabase schema migration: `supabase/migrations/20260420_create_blog_posts.sql`
- Blog data access layer: `lib/blog/*`
- Blog routes:
  - `app/blog/page.tsx`
  - `app/blog/[slug]/page.tsx`
- Revalidation webhook endpoint: `app/api/revalidate/route.ts`
- Dynamic sitemap: `app/sitemap.ts`

## Storage convention

- Storage is expected to be private (non-public bucket).
- Bucket name: `blog-posts` (override with `SUPABASE_BLOG_BUCKET`).
- Incoming post bundles are uploaded under `blog/incoming/YYYY/MM/[slug]/`.
- The transfer agent uploads `_ready.json` last. The Supabase listener should only process incoming paths ending in `/_ready.json`.
- Each incoming folder must include `post.md` and `manifest.json`.
- Markdown prefix: `blog/markdown` (override with `SUPABASE_BLOG_MARKDOWN_PREFIX`).
- SEO prefix: `blog/seo` (override with `SUPABASE_BLOG_SEO_PREFIX`).
- Image prefix: `blog/images`.
- Processed marker prefix: `blog/processed`.
- Review prefix: `blog/review`.
- Period-based folders are supported, for example:
  - `blog/markdown/2026/04/price-elasticity-for-shopify.md`
  - `blog/seo/2026/04/price-elasticity-for-shopify.json`
- `blog_posts.markdown_path` can be either:
  - full object path (`blog/markdown/2026/04/post.md`)
  - relative path (`2026/04/post.md`) and the markdown prefix is applied automatically.
- `blog_posts.seo_path` is optional. If missing, SEO path is derived from markdown path by replacing `.md` with `.json` under the SEO prefix.
- No file size or MIME constraints are enforced by this scaffold.

## Required env vars

- `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_SECRET_KEY` (preferred)
- `SUPABASE_SERVICE_ROLE_KEY` (legacy fallback)
- `REVALIDATE_TOKEN`
- `NEXT_PUBLIC_SITE_URL` (for sitemap canonical URLs)
- Optional: `SUPABASE_BLOG_BUCKET`
- Optional: `SUPABASE_BLOG_MARKDOWN_PREFIX`
- Optional: `SUPABASE_BLOG_SEO_PREFIX`

## Agent publish sequence

1. Export Google Doc to markdown.
2. Generate Prophet YAML frontmatter at the top of the markdown using `docs/prophet-frontmatter-schema.md`.
3. Run frontmatter validation before publish. If `pipeline.validationPassed=false`, keep the file in review and do not mark the row published.
4. Upload the complete bundle to `blog/incoming/YYYY/MM/[slug]/`, including markdown, manifest, and images.
5. Upload `_ready.json` last to trigger the listener.
6. Listener validates the folder and promotes files to `blog/markdown`, `blog/images`, `blog/seo`, or `blog/review`.
7. Upsert row in `public.blog_posts` with:
   - `slug`, `title`, `excerpt`, `persona`, `tags`
   - `markdown_path`
   - optional `seo_path`
   - optional direct DB fields: `seo_title`, `seo_description`, `canonical_url`, `gtm_layer`
   - `status='published'`
   - `published_at`
8. Call revalidate endpoint:
   - `POST /api/revalidate`
   - Header: `x-revalidate-token: <REVALIDATE_TOKEN>`
   - Body: `{ "slug": "your-slug" }`

## Private preview sequence

To stage a post for approval without making it public:

```bash
npm run blog:preview:incoming -- --slug=your-slug
```

This promotes the incoming bundle into the app markdown path and upserts
`public.blog_posts.status='draft'` with `published_at=null`. Draft rows are not
returned by the public blog index, sitemap, or `/blog/[slug]` route.

Preview the draft at:

```txt
/blog/preview/[slug]?token=$BLOG_PREVIEW_TOKEN
```

The preview route is request-time rendered, requires `BLOG_PREVIEW_TOKEN`, and
sets `noindex,nofollow`. To approve the post, rerun the publisher without
`--draft`:

```bash
npm run blog:publish:incoming -- --slug=your-slug
```

## Resolved app contract

- The markdown file is the source of truth for Prophet frontmatter fields: pillar, template, SEO, AEO, schema flags, internal links, author, reading time, and CTA metadata.
- The `blog_posts` row remains the publish index and storage pointer. It controls status, scheduled publish filtering, and backwards-compatible card fields.
- Canonical article URLs use the short post route: `/blog/[slug]`.
- Pillar/branch relationships are expressed in frontmatter with `pillarPost`,
  `pillarBranch`, and `pillarPostSlug`, plus reciprocal internal links.
- `/blog/[pillar]` renders the pillar landing page from published posts in that pillar.
- `lib/blog/links.ts` exposes `validateExternalLinks(markdown)` for the Google Drive/Supabase agent step. Keep this out of request-time rendering so slow third-party sites do not block page loads.
- `lib/blog/frontmatter.ts` parses the generated YAML subset and strips frontmatter before rendering markdown body HTML.

## Incoming bundle contract

`post.md` contains the complete Prophet YAML frontmatter block followed by the Google Doc markdown body.

`manifest.json` identifies the source doc/folder, author metadata, markdown filename, and asset filenames. Asset filenames should match the files uploaded into the same incoming folder.

`_ready.json` is the final upload and processing trigger. It can repeat the slug, source doc URL, upload timestamp, and list of expected files.

## Revalidate payload examples

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
