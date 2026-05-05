# Google Drive blog ingest

This worker exports Google Docs from a Drive folder as Markdown and stages them in Supabase Storage.

For the full blog architecture, see `docs/blog-pipeline.md`. For supported
Markdown body components, see `docs/blog-markdown-components.md`.

## Google setup

1. Create or reuse a Google Cloud project.
2. Enable the Google Drive API.
3. Create a service account.
4. Download JSON credentials.
5. Share the source Google Drive folder or shared drive folder with the service account email.

The worker uses shared-drive-safe Drive API options:

```ts
supportsAllDrives: true
includeItemsFromAllDrives: true
```

## Environment

Use one Google credential option:

```env
GOOGLE_SERVICE_ACCOUNT={"type":"service_account",...}
```

or:

```env
GOOGLE_SERVICE_ACCOUNT_JSON_PATH=/absolute/path/to/service-account.json
```

or:

```env
GOOGLE_SERVICE_ACCOUNT_JSON_BASE64=
```

or:

```env
GOOGLE_SERVICE_ACCOUNT_EMAIL=
GOOGLE_PRIVATE_KEY=
```

Required ingest and Supabase vars:

```env
GOOGLE_DRIVE_SOURCE_FOLDER_ID=
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
SUPABASE_BLOG_BUCKET=blog-posts
SUPABASE_BLOG_INCOMING_PREFIX=blog/incoming
```

Optional metadata:

```env
BLOG_INGEST_AUTHOR_NAME=
BLOG_INGEST_AUTHOR_ROLE=
SUPABASE_BLOG_INGEST_STATE_PATH=blog/ingest-state/google-drive.json
```

## Run

Dry run, no uploads:

```bash
npm run blog:ingest:drive -- --dry-run
```

Upload to Supabase Storage:

```bash
npm run blog:ingest:drive:upload
```

By default, upload runs skip Google Docs that export as body-only markdown without YAML frontmatter. This keeps incomplete articles out of the incoming publish path. To stage body-only markdown for pipeline testing:

```bash
npm run blog:ingest:drive -- --upload --allow-body-only
```

Override the Drive folder for one run:

```bash
npm run blog:ingest:drive -- --dry-run --folder=GOOGLE_DRIVE_FOLDER_ID
```

## Output

For each changed Google Doc, the worker uploads:

```txt
blog/incoming/YYYY/MM/[slug]/post.md
blog/incoming/YYYY/MM/[slug]/manifest.json
blog/incoming/YYYY/MM/[slug]/[image files]
blog/incoming/YYYY/MM/[slug]/_ready.json
```

`_ready.json` is uploaded last. The worker stores processed Google file IDs and modified timestamps at `blog/ingest-state/google-drive.json` so unchanged docs are skipped on later upload runs.

## Google Doc authoring rules

The export target is Markdown, not HTML. Author docs so the exported Markdown is
semantically clean:

- Use heading styles for `#`, `##`, and `###`.
- Do not include a manual table of contents. The app generates a table of
  contents from H2/H3 headings.
- Use plain Markdown tables when possible. If using a Google Docs table, use one
  header row and avoid merged cells.
- Avoid linked Google Sheets tables. Also avoid pasted spreadsheet tables with
  spacer columns, merged cells, or visual-only layout. They may look fine in
  Google Docs but export as empty `th`/`td` columns.
- Use `:::split` or `:::cards` from `docs/blog-markdown-components.md` for
  layout and comparison modules. Do not use tables for layout.
- Use stable image filenames in the source asset folder. Markdown image
  references, `manifest.json`, and uploaded object names should match.
- Name generated article images `[slug]-hero.png` and `[slug]-og.png` so the
  publisher can map the visible hero separately from social metadata.
- Keep hero/OG image intent in frontmatter and assets. Body images are article
  content images.

## Image assets

For images, create a sibling folder inside the source Drive folder named one of:

```txt
[Google Doc title]
[Google Doc title] assets
[slug]
[slug] assets
```

Any `image/*` files in that folder are uploaded into the same incoming prefix as the post. Filenames containing `hero` or `cover` are marked as `hero`; filenames containing `og` are marked as `og`; everything else is marked as an article image. Prefer exact generated filenames: `[slug]-hero.png` and `[slug]-og.png`.
