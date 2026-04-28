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
- Markdown prefix: `blog/markdown` (override with `SUPABASE_BLOG_MARKDOWN_PREFIX`).
- SEO prefix: `blog/seo` (override with `SUPABASE_BLOG_SEO_PREFIX`).
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
2. Generate SEO JSON payload (persona/CRM targets, canonical, GTM layer).
3. Upload markdown and SEO JSON to private Supabase Storage.
4. Upsert row in `public.blog_posts` with:
   - `slug`, `title`, `excerpt`, `persona`, `tags`
   - `markdown_path`
   - optional `seo_path`
   - optional direct DB fields: `seo_title`, `seo_description`, `canonical_url`, `gtm_layer`
   - `status='published'`
   - `published_at`
5. Call revalidate endpoint:
   - `POST /api/revalidate`
   - Header: `x-revalidate-token: <REVALIDATE_TOKEN>`
   - Body: `{ "slug": "your-slug" }`

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
