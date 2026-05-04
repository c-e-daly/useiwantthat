# Blog Markdown component contract

The blog source of truth is Markdown body content plus Prophet YAML frontmatter.
Use normal Markdown for core article elements, and use strict `:::` directive
blocks for reusable article modules.

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

Aliases:

```md
:::gallery
...
:::
```
