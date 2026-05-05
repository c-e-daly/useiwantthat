# Blog Markdown component contract

The blog source of truth is Markdown body content plus Prophet YAML frontmatter.
Use normal Markdown for core article elements, and use strict `:::` directive
blocks for reusable article modules.

This document is the authoring contract for Google Docs exports, hand-authored
Markdown, and any agent-generated body content. The implementation lives in
`lib/blog/markdown.ts`, with visual styling in `app/styles/globals.css`.

## Rendering model

The renderer converts body Markdown into HTML and returns a generated table of
contents. The shared article component renders that HTML in the public and
preview routes.

The renderer intentionally supports a small, deterministic Markdown subset
instead of arbitrary HTML:

- HTML embedded directly in Markdown is escaped.
- Directive URLs must be safe: `https://`, `/`, `#`, or `mailto:`.
- External Markdown links open in a new tab with `rel="noopener noreferrer"`.
- Video embeds are allowlisted to YouTube, Vimeo, and Loom embed URLs.
- Unknown `:::` directives render as generic callout blocks.

## Google Doc authoring rules

Authors write in Google Docs. Markdown is the internal export format produced by
the ingest pipeline.

Use Google Docs formatting this way:

- Article title: Google Docs Heading 1.
- Major sections: Heading 2.
- Subsections: Heading 3.
- Body copy: normal paragraph text.
- Lists: Google Docs native bulleted or numbered lists.
- Tables: Google Docs tables only for real tabular data, with one header row.
- Component blocks: typed as plain text `:::` directive blocks in the document.

Do not put these in the Google Doc:

- A manual Google Docs table of contents.
- Hero image or Open Graph image inside the article body.
- Raw HTML.
- Visual layout tables.
- Duplicate FAQ sections when FAQ is generated from `aeo.faq`.
- Hardcoded canonical URLs, schema JSON, or SEO metadata.

Assets are stored beside the post bundle in Supabase Storage/S3. Generated hero
and social images must be named `[slug]-hero.png` and `[slug]-og.png`. Inline
article images, carousel images, and downloadable assets should be referenced by
their resolved storage path in the component block.

## Component Registry

The blog page is a shell. Each post body is composed from these components.

| Component | Authoring input | Required fields | Optional fields | Preferred styling |
|---|---|---|---|---|
| Headline | Google Docs Heading 1/2/3 | text | explicit anchor from export | Tight slate headings; H2/H3 feed generated TOC |
| Paragraph | Normal text | text | links, emphasis, inline code | 7-line-height readable body copy |
| List | Native bulleted/numbered list | list items | nested prose is limited | Standard disc/decimal lists |
| Table | Markdown/exported table | header row, body rows | alignment markers | Bordered, horizontally scrollable on mobile |
| Image | `:::image` or Markdown image | `src`, `alt` | `caption`, `credit`, `variant` | Rounded bordered figure; contained or full width |
| Quote | Markdown blockquote or `:::quote` | quote text | `attribution` | Orange-accent pull quote |
| Summary | `:::summary` | body content | headings/lists | Orange-tinted callout |
| Stat | `:::stat` | stat value, body | source in body | Large metric in quiet card |
| Split | `:::split` | left/right content | headings | Two equal cards on desktop, stacked mobile |
| Button | `:::button` | `label`, `href` | `variant` | Slate primary or bordered secondary |
| CTA | `:::cta` | `title`, `href`, `label`, body | none | Dark end-of-section action block |
| Cards | `:::cards` | item `title` and body | item `href` | Two-column card grid |
| FAQ | `:::faq` or frontmatter `aeo.faq` | question, answer | none | Accordion inline; appended FAQ hidden if body FAQ exists |
| Steps | `:::steps` | item title/body | item `step` alias | Numbered process cards |
| Video | `:::video` | provider/id or safe URL | title, caption | 16:9 embedded media |
| Carousel | `:::carousel` | item `src`, `alt` | caption | Horizontal snap gallery |

## Native Markdown

Use these wherever possible:

```md
# H1
## H2
### H3

Paragraph text.

- Bullet item
1. Numbered item

> Pull quote or blockquote.

![Alt text](/blog/images/example.png "Optional title")

| Metric | Value |
|---|---:|
| CAC | $68 |
```

Rules:

- Do not include a manual table of contents. The renderer generates one from H2/H3 headings.
- Avoid linked Google Sheets tables and merged-cell spreadsheet tables.
- Prefer real Markdown tables with one header row and no merged cells.
- Use frontmatter for hero image, author, SEO, schema, and related-link metadata.
- Do not use tables for visual layout. Use `:::split` or `:::cards`.

## Headings and generated TOC

The renderer reads H2 and H3 headings for the table of contents.

```md
## Discounts are financial levers {#discounts-are-financial-levers}
```

Explicit anchors like `{#discounts-are-financial-levers}` are optional. If
present, they are used for the heading ID and removed from visible text.

If a Google Doc export includes a manual section named `## Table of Contents`,
the renderer skips that section.

## Tables

Preferred shape:

```md
| Metric | Scenario A | Scenario B |
|---|---:|---:|
| Discount | $30.00 | $15.00 |
| CAC | $30.00 | $68.00 |
```

The renderer:

- wraps tables for mobile horizontal scrolling
- respects `---:`, `:---:`, and `---` alignment markers
- drops fully empty exported columns
- promotes the first meaningful row if the exported header row is blank

Those cleanup steps are defensive. The best output still comes from simple
Markdown tables with one semantic header row.

## Summary or callout

```md
:::summary
- **Insight:** Advertising CAC is a hard cost.
- **Action:** Use offer data to improve paid traffic conversion.
:::
```

Aliases:

```md
:::summary-box
...
:::
```

## Stat callout

```md
:::stat
42%
Paid clicks that do not convert still carry acquisition cost.
:::
```

## Split columns

Use split columns for comparison prose or a 1/2 + 1/2 layout. Do not use tables for layout.

```md
:::split
::left
### Discounting
Discounts are a conversion lever when the allowance is already in the price.
::
::right
### Advertising CAC
Ad spend is a hard cash cost whether or not the click converts.
::
:::
```

Aliases:

```md
:::columns
...
:::
```

## Button

```md
:::button
label: Calculate your CAC
href: /tools/cac-calculator
variant: primary
:::
```

Supported variants:

- `primary`
- `secondary`

## CTA block

```md
:::cta
title: Turn more paid clicks into buyers
href: /sellers
label: See Prophet for sellers
Use Customer Generated Offers to capture price intent and reduce wasted paid traffic.
:::
```

## Cards

```md
:::cards
- title: Discounting
  body: Flexible, margin-aware conversion lever.
- title: Advertising CAC
  body: Hard cost paid before conversion.
  href: /tools/cac-calculator
:::
```

Supported item fields:

- `title`
- `body`, `text`, or `description`
- `href`

## Image or figure

Use this for inline article images that need caption, credit, or a display
variant. Hero and OG images stay outside the body in the post bundle/frontmatter.

```md
:::image
src: /blog-assets/blog/incoming/2026/05/example/example-chart.png
alt: Chart comparing CAC and discount allowance
caption: CAC creates a larger cash drag than the average discount allowance.
credit: Prophet analysis
variant: full
:::
```

Required fields:

- `src` or `image`
- `alt`

Optional fields:

- `caption`
- `credit`
- `variant`: `contained` or `full`

Aliases:

```md
:::figure
...
:::
```

## Pull quote

Use this for a designed quote or editorial emphasis. Use normal `>` blockquotes
for simpler quotes.

```md
:::quote
attribution: Prophet
The real margin killer is not the offer. It is paying for clicks that do not convert.
:::
```

Required fields:

- quote body text

Optional fields:

- `attribution`, `author`, or `source`

Aliases:

```md
:::pullquote
...
:::
```

## FAQ accordion

Prefer frontmatter `aeo.faq` for schema-backed FAQ. Use this block only when
the FAQ needs to appear inline inside the article body.

```md
:::faq
- question: What are Customer Generated Offers?
  answer: Customer Generated Offers let buyers propose a value for the cart.
- question: Do discounts always hurt margin?
  answer: Discounts hurt margin when the allowance is not already in the price.
:::
```

Supported item fields:

- `question` or `title`
- `answer` or `body`

## Steps

Use this for explicit process blocks. Playbook articles still map to HowTo schema
from frontmatter and numbered content.

```md
:::steps
- title: Audit your CAC
  body: Calculate spend divided by new customers over the same period.
- title: Compare discount allowance
  body: Compare CAC against the discount allowance already priced into margin.
:::
```

Supported item fields:

- `title` or `step`
- `body` or `text`

## Video

Only safe embed URLs are rendered. Prefer `provider` + `id`.

```md
:::video
provider: youtube
id: abc123
title: How Customer Generated Offers work
caption: A short explanation of offer-driven conversion.
:::
```

Supported providers:

- `youtube`
- `vimeo`

Safe direct embed URLs are also supported for YouTube, Vimeo, and Loom:

```md
:::video
url: https://www.loom.com/embed/example-id
title: Product walkthrough
:::
```

## Carousel or gallery

Use sparingly. Each item needs `src` or `image`, plus meaningful alt text.

```md
:::carousel
- src: /blog/images/example-1.png
  alt: CAC comparison chart
  caption: Paid acquisition scenario.
- src: /blog/images/example-2.png
  alt: Discount allowance chart
  caption: Price allowance scenario.
:::
```

Supported item fields:

- `src` or `image`
- `alt`
- `caption`

Aliases:

```md
:::gallery
...
:::
```
