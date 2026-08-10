# I Want That!

The public website, content platform, and product education layer for **I Want That!** and **Vector** — negotiated commerce software for Shopify retailers.

I Want That! gives shoppers a structured way to make offers and gives retailers the controls to accept, counter, or decline those offers against real margin floors. The goal is straightforward: help retailers convert more of the traffic they already paid for, learn what identified customers are willing to pay, move inventory intelligently, and grow without sacrificing profit.

This repository is not the Shopify application itself. It is the public experience that explains the product, establishes the category, teaches the operating frameworks behind it, and turns those frameworks into articles, glossary definitions, tools, and playbooks.

## What we are building

Modern ecommerce treats pricing as a monologue: the seller posts a price and the buyer either accepts it or leaves. The usual fixes — more advertising, broader discounts, and more retargeting — increase acquisition cost or reduce margin.

I Want That! is building a negotiation layer for commerce:

- Customers can communicate purchase intent by making an offer.
- Retailers define the economic floor and rules for accepting or countering.
- Offers reveal price sensitivity, desired price points, product interest, and unit-volume opportunity.
- Existing traffic can produce more customers without another advertising dollar.
- Inventory can move through targeted negotiation instead of indiscriminate markdowns.
- Retailers keep the upside of scale through flat recurring software pricing rather than another percentage-of-sales tax.

The product and the content are built from a retailer’s point of view: **give power to consumers and profits to sellers.**

## Who it is for

The primary audience is Shopify and DTC retail operators, particularly businesses in the $100K–$5M revenue range that are dealing with one or more of these problems:

- Paid traffic is getting more expensive while conversion remains flat.
- Blanket discounts are weakening margin or training customers to wait.
- Inventory is aging, but a storewide clearance event would destroy value.
- First-time buyers are not becoming repeat customers.
- The business knows its list price but not its customers’ actual price points.
- AI shopping agents are changing how buyers discover, compare, and negotiate.

## The content system

The site is organized as an interconnected retail knowledge system rather than a collection of isolated marketing pages.

### Content pillars

1. **Customer Yield** — CAC, capture, conversion, repeat behavior, and getting more customers from existing traffic.
2. **Markup Performance** — defended price floors, profit markup, allowances, margin, and price flexibility.
3. **Negotiated Commerce** — customer generated offers, counter offers, and buyer-led price discovery.
4. **Agentic Commerce** — AI shopping agents, merchant rules, intent capture, and agent-ready commerce.
5. **Customer Portfolios** — behavioral customer states and the strategies used to acquire, grow, retain, reactivate, or recapture them.

Each pillar connects four types of content:

- **Hub pages** provide the operating model and route readers to the right next step.
- **Articles** develop individual arguments, analyses, and tactics.
- **Glossary entries** establish precise definitions and a shared frame of reference.
- **Tools and playbooks** turn the ideas into decisions and actions.

Internal links between those layers are intentional. They support reader navigation, topical authority, search discovery, and answer-engine comprehension. Do not remove or broadly rewrite them as routine cleanup.

### Tools

- CAC Calculator
- Price Builder
- Goodness of Fit assessment

### Playbooks

- Customer Yield / CAC
- Clearance
- Counter Offers
- Exit Intent
- Programs
- Remarketing

## SEO and AEO principles

This is a mature, high-performing production site whose content is ranking in search. Changes should be narrow and evidence-based.

The publishing system protects:

- Canonical URLs and permanent redirects
- Page-level metadata and social metadata
- Article, FAQ, HowTo, breadcrumb, and glossary structured data
- Stable H2/H3 anchors and generated tables of contents
- Dynamic XML sitemap entries and `lastModified` values
- Search-safe preview routes with `noindex,nofollow`
- Pillar, article, glossary, tool, and playbook relationships
- Descriptive OG images and alt text
- Answer-first TL;DRs, key takeaways, definitions, and FAQs

When editing existing content:

1. Preserve the canonical slug unless a redirect is added deliberately.
2. Preserve useful metadata and schema fields.
3. Prefer published internal destinations over placeholder titles.
4. Keep headings descriptive and aligned with search intent.
5. Avoid duplicate calls to action or duplicate sections.
6. Reuse existing OG and feature assets before creating new ones.
7. Run the production build before publishing structural changes.

## Technology

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Local Markdown content with typed frontmatter
- Custom deterministic Markdown renderer
- Vercel Speed Insights
- PostHog product analytics
- Google Tag / GA with Consent Mode v2
- HubSpot tracking and consent banner
- Ahrefs analytics

The repository-specific Next.js rules live in [`AGENTS.md`](./AGENTS.md). This version of Next.js may differ from familiar APIs and conventions; consult the installed documentation under `node_modules/next/dist/docs/` before changing framework code.

## Project structure

```text
app/                    App Router pages, layouts, metadata routes, and APIs
  blog/                 Blog index, hubs, articles, previews, and asset route
  glossary/             Glossary index and term pages
  playbooks/            Operational playbooks
  tools/                Interactive calculators and assessments
  policies/             Canonical legal routes
components/
  blog/                 Shared article and hub renderers
  marketing/            Interactive marketing tools
  public/               Header, footer, logos, and shared public UI
content/
  blog/                 Article Markdown and Vector frontmatter
  glossary/             Glossary Markdown
  hubs/                 Pillar hub Markdown
  images/               Source-controlled OG, feature, and editorial images
  legal/                Legal document Markdown
docs/                   Publishing, frontmatter, SEO, and component contracts
lib/
  blog/                 Content parsing, rendering, taxonomy, links, and types
  glossary/             Glossary parsing and publication rules
  legal/                Legal-document registry
  seo/                  Shared metadata utilities
public/                 Public fonts, logos, icons, and product assets
src/providers/          Client-side providers
```

## Local development

### Requirements

- Node.js compatible with Next.js 16
- npm

### Install and run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Quality checks

```bash
npm run lint
npm run build
```

The production build performs TypeScript validation and prerenders the public static routes. Run it after changes to routing, content parsing, frontmatter, metadata, or shared rendering.

## Environment variables

Create `.env.local` for local values. Environment files are intentionally ignored by Git.

| Variable | Required | Purpose |
|---|---:|---|
| `NEXT_PUBLIC_SITE_URL` | Recommended | Canonical site origin. Defaults to `https://useiwantthat.com`. |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Optional | Enables Google Tag / GA when it matches a supported Google tag ID format. |
| `BLOG_PREVIEW_TOKEN` | Required for previews | Protects `/blog/preview/[slug]`. |
| `REVALIDATE_TOKEN` | Required for production revalidation | Authorizes `POST /api/revalidate`. |
| `POSTHOG_INGEST_HOST` | Optional | Server rewrite target for the first-party PostHog ingest host. |
| `POSTHOG_ASSETS_HOST` | Optional | Server rewrite target for PostHog static assets. |

Never commit secrets or expose server-only tokens through `NEXT_PUBLIC_*` variables.

## Content authoring

### Articles

Articles live in `content/blog/*.md` and publish at `/blog/[slug]`.

A local article is public when:

- It has valid YAML frontmatter.
- `published` is not `false`.
- `scheduledFor` is absent or has passed.
- `publishedAt` is absent or has passed.
- The Markdown body is not empty.

The canonical frontmatter contract is documented in [`docs/vector-frontmatter-schema.md`](./docs/vector-frontmatter-schema.md).

### Hub pages

Pillar hubs live in `content/hubs/*-hub.md`. They combine a long-form operating framework with curated resource cards and automatically selected recent articles from the pillar.

### Glossary

Glossary sources live in `content/glossary/`. Published and full entries appear in the glossary index and sitemap. Glossary terms should define the site’s original frameworks precisely and link back to the relevant hub and supporting content.

### Images

Source-controlled editorial images live under `content/images/` and are served through:

```text
/blog-assets/[path]
```

For example:

```text
content/images/og/customer-yield-hub-og.png
→ /blog-assets/og/customer-yield-hub-og.png
```

General public assets live under `public/` and use normal root-relative paths such as `/images/og/cac-playbook-og.png`.

### Markdown components

The custom renderer supports normal Markdown and a constrained set of `:::` directives for cards, calls to action, images, tables, statistics, FAQs, video, carousels, and other structured modules.

See [`docs/blog-markdown-components.md`](./docs/blog-markdown-components.md) before introducing or editing a directive. Raw HTML in Markdown is escaped intentionally.

## Publishing and previews

The production runtime currently reads articles, hubs, glossary entries, and legal documents from the local `content/` directory.

Draft or scheduled articles can be reviewed at:

```text
/blog/preview/[slug]?token=YOUR_BLOG_PREVIEW_TOKEN
```

Preview pages use the production article renderer but are excluded from indexing.

The revalidation endpoint accepts a slug, path, or list of paths:

```bash
curl -X POST https://useiwantthat.com/api/revalidate \
  -H "content-type: application/json" \
  -H "x-revalidate-token: $REVALIDATE_TOKEN" \
  -d '{"slug":"example-article"}'
```

The documents under `docs/` also describe a Google Drive and Supabase bundle pipeline. Treat those files as pipeline architecture and authoring contracts unless the corresponding scripts and infrastructure are present in the working checkout. The local Markdown system described above is the current executable source of truth.

## Analytics and consent

Google Consent Mode v2 defaults analytics and advertising storage to denied before Google Tag loads. HubSpot’s consent listener updates Google when a visitor accepts, rejects, or changes analytics and advertising preferences.

The footer’s **Cookie Settings** control reopens the HubSpot banner so visitors can revise consent at any time.

When adding a new analytics or advertising integration:

1. Classify the cookies or storage it uses.
2. Connect it to the applicable HubSpot consent category.
3. Do not load or initialize nonessential storage before consent.
4. Verify both granted and denied flows.
5. Update the cookie policy when the technology or purpose changes.

## Routing and redirects

Canonical public content uses short URLs such as:

```text
/blog/[slug]
/blog/[pillar]
/glossary/[slug]
/playbooks/[slug]
/tools/[slug]
```

Legacy internal URLs are centralized in `lib/blog/links.ts` and emitted as permanent redirects from `next.config.ts`. Add migrations there instead of silently breaking an established URL.

The canonical host is `useiwantthat.com`. Requests from `www.useiwantthat.com` and selected public routes on `app.useiwantthat.com` redirect to the canonical marketing site.

## Deployment

The application is designed for Vercel and builds with:

```bash
npm run build
```

Before deploying:

- Run lint and the production build.
- Confirm new internal links resolve.
- Confirm OG assets exist at their referenced paths.
- Review generated metadata and structured data for changed routes.
- Preserve existing redirects and canonical URLs.
- Verify consent behavior if scripts or analytics changed.

## Further documentation

- [`docs/blog-pipeline.md`](./docs/blog-pipeline.md) — content architecture and pipeline contract
- [`docs/blog-markdown-components.md`](./docs/blog-markdown-components.md) — supported Markdown modules
- [`docs/vector-frontmatter-schema.md`](./docs/vector-frontmatter-schema.md) — article metadata contract
- [`docs/seo-og-tagging-requirements.md`](./docs/seo-og-tagging-requirements.md) — SEO and social-image requirements
- [`docs/google-drive-blog-ingest.md`](./docs/google-drive-blog-ingest.md) — Google Drive ingest design
- [`docs/db-migration.md`](./docs/db-migration.md) — database migration notes

## Product principle

The site and product share the same standard: retail growth should not require surrendering margin, customer insight, or a percentage of every future sale.

**Built by retailers, for retailers. Let’s make some deals.**
