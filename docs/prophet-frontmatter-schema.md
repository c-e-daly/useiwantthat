# Prophet blog frontmatter schema

Full specification for the agent-generated frontmatter block on every article.
The Google Doc → Markdown → Agent → Supabase pipeline should produce and validate
all fields in this schema before a post is eligible for publish.

---

## Complete frontmatter block

```yaml
---
# ─────────────────────────────────────────────
# IDENTITY
# ─────────────────────────────────────────────

# Unique slug — URL path segment. Lowercase, hyphens only, no trailing slash.
# Agent generates from H1. Human can override.
# Example: "why-bfcm-discounts-destroy-shopify-margins"
slug: ""

# Canonical URL — full absolute URL. Built from slug at publish time.
# Agent should NOT hardcode domain — NextJS generates this from slug + env.
canonical: ""  # populated by NextJS on publish

# Content version — increment when article is substantially updated.
# Used for cache invalidation and sitemap lastmod.
version: 1

# ─────────────────────────────────────────────
# PUBLISHING
# ─────────────────────────────────────────────

# ISO 8601. Set by pipeline on first publish. Never updated after.
publishedAt: ""

# ISO 8601. Updated by pipeline on every republish.
updatedAt: ""

# Draft articles are processed but not published. Review before flip to true.
published: false

# Scheduled publish — ISO 8601. Pipeline holds until this datetime if set.
scheduledFor: ""  # optional — omit if publishing immediately

# ─────────────────────────────────────────────
# CONTENT CLASSIFICATION
# ─────────────────────────────────────────────

# Template type — drives schema markup selection and structural validation.
# One of: problem-fix | listicle | data-story | playbook | versus
template: ""

# Content pillar — maps to site taxonomy and internal linking rules.
# One of: conversion-rate-optimisation | customer-acquisition-cost |
#         pricing-strategy | inventory-management | agentic-commerce
pillar: ""

# Use case tag — links article to product use case pages.
# One or more of: clearance | exit-intent | remarketing | special-collections |
#                  agentic-offers | conversion-growth | email-optin | general
useCases:
  - ""

# Funnel stage — determines CTA variant and internal linking priority.
# One of: awareness | consideration | decision
funnelStage: ""

# ICP segment this article is primarily written for.
# One or more of: solo-operator | sub-50k | 50k-150k | 150k-300k | 300k-500k | all
icpSegment:
  - ""

# Estimated reading time in minutes. Agent calculates from word count (÷ 200).
readingTimeMinutes: 0

# Word count. Agent populates from markdown body.
wordCount: 0

# ─────────────────────────────────────────────
# SEO
# ─────────────────────────────────────────────

seo:
  # Primary keyword — exact match. Under 65 characters. Agent extracts from H1.
  primaryKeyword: ""

  # Secondary keywords — 3 to 5. Agent identifies from H2s and FAQ questions.
  secondaryKeywords:
    - ""

  # Meta title — under 60 characters. Format: [Keyword] — [Outcome] | Prophet
  metaTitle: ""

  # Meta description — 150–155 characters. Must contain primaryKeyword naturally.
  metaDescription: ""

  # Robots directive. Default: index, follow. Override for thin/duplicate content.
  robots: "index, follow"

  # Sitemap priority — 0.0 to 1.0.
  # Pillar cornerstone articles: 0.9 | Standard articles: 0.7 | Listicles: 0.6
  sitemapPriority: 0.7

  # Sitemap change frequency.
  # One of: always | hourly | daily | weekly | monthly | yearly | never
  sitemapChangefreq: "monthly"

  # Focus keyword density check — agent flags if primaryKeyword appears < 3 times
  # or > 15 times in body. Informational field, not enforced at publish.
  keywordDensityOk: false  # agent sets to true after validation

# ─────────────────────────────────────────────
# AEO (Answer Engine Optimisation)
# ─────────────────────────────────────────────

aeo:
  # TL;DR summary — 2–3 sentences. Displayed at top of article above body.
  # This is the primary signal surfaced by AI search tools (Perplexity, ChatGPT search,
  # Google AI Overviews). Must be self-contained — reads correctly out of context.
  tldr: ""

  # Direct answer sentences — agent extracts the first sentence after each H2.
  # Used for AEO validation. Array length must equal number of H2s in body.
  # Agent flags if any sentence is > 40 words (too long for AI snippet extraction).
  h2DirectAnswers:
    - heading: ""   # exact H2 text
      answer: ""    # first sentence of that section

  # FAQ entries — minimum 4, maximum 12.
  # Questions written as exact user search queries (how/what/why/when/can format).
  # Answers 40–80 words each — long enough to be useful, short enough to be extracted.
  faq:
    - question: ""
      answer: ""

  # Key takeaways — 3 bullet points for end-of-article summary block.
  # AI tools surface these when asked "what are the main points about X".
  keyTakeaways:
    - ""
    - ""
    - ""

  # Definition terms — new/technical terms defined inline in the article.
  # Agent extracts terms that follow the pattern "X is a/an/the..." or "X (definition)".
  # Informational — used for internal knowledge graph and entity disambiguation.
  definedTerms:
    - term: ""
      definition: ""  # under 25 words

  # Structured data validation flags — agent sets these after body analysis.
  validation:
    hasTldr: false
    hasDirectAnswersAfterH2s: false
    hasFaqSection: false        # minimum 4 questions
    hasKeyTakeaways: false
    hasNumberedListsForSteps: false   # required for playbook template
    hasAttributedStats: false         # at least one stat with source + year
    allH2sHaveDirectAnswer: false
    minWordCount: false         # >= 800 for listicle, >= 1200 for others

# ─────────────────────────────────────────────
# OPEN GRAPH AND SOCIAL
# ─────────────────────────────────────────────

og:
  title: ""         # defaults to seo.metaTitle if blank — agent can override for social tone
  description: ""   # defaults to seo.metaDescription if blank — can be more conversational
  image: ""         # path to OG image in Supabase storage. Format: /og/[slug].png
  imageAlt: ""      # descriptive alt text for OG image
  imageWidth: 1200
  imageHeight: 630
  type: "article"   # always "article" for blog posts

twitter:
  card: "summary_large_image"
  title: ""         # defaults to og.title if blank
  description: ""   # defaults to og.description if blank — Twitter allows up to 200 chars
  image: ""         # same as og.image unless a separate Twitter crop exists

# ─────────────────────────────────────────────
# SCHEMA MARKUP
# ─────────────────────────────────────────────

# Agent selects schema types based on template field.
# NextJS generates the JSON-LD from these fields at render time.

schema:
  # Article schema — present on every post.
  article:
    enabled: true
    headline: ""        # matches seo.metaTitle
    description: ""     # matches seo.metaDescription
    datePublished: ""   # matches publishedAt
    dateModified: ""    # matches updatedAt
    author:
      name: "Prophet"
      url: "https://iwantthat.io"
    publisher:
      name: "Prophet"
      logo: "https://iwantthat.io/logo.png"
    image: ""           # matches og.image (absolute URL)
    wordCount: 0        # matches wordCount above

  # FAQ schema — present when faq array has >= 4 entries.
  # Agent enables automatically based on aeo.faq length.
  faqPage:
    enabled: false      # agent sets to true when faq.length >= 4
    # Questions and answers are pulled directly from aeo.faq at render time.
    # No duplication needed here.

  # HowTo schema — present only on playbook template articles.
  # Agent enables when template = "playbook".
  howTo:
    enabled: false
    name: ""            # matches H1
    description: ""     # matches aeo.tldr
    totalTime: ""       # ISO 8601 duration. e.g. "PT30M" for 30 minutes
    # Steps extracted from numbered lists in body by NextJS at render time.
    # Agent does not need to enumerate steps here — extraction is automatic.

  # BreadcrumbList schema — always enabled. Built from pillar + slug.
  breadcrumb:
    enabled: true
    # Items built by NextJS from pillar and slug at render time.
    # No manual entry required.

# ─────────────────────────────────────────────
# INTERNAL LINKING
# ─────────────────────────────────────────────

internalLinks:
  # Pillar page this article clusters under.
  # Agent selects from pillar field above.
  pillarPage:
    title: ""
    slug: ""

  # Related articles — 2 to 4. Agent suggests based on pillar + useCases overlap.
  # Human reviews before publish.
  relatedArticles:
    - title: ""
      slug: ""

  # Use case pages this article should link to.
  # Agent populates from useCases field above.
  useCasePages:
    - title: ""
      slug: ""

  # CTA target — primary call to action at end of article.
  # One of: install | calculator | demo | pillar | related-article
  ctaTarget: "install"
  ctaText: ""       # CTA button label. e.g. "See how Prophet works"

# ─────────────────────────────────────────────
# CONTENT METADATA
# ─────────────────────────────────────────────

# Author — human who wrote the Google Doc.
author:
  name: ""
  role: ""          # optional — used in byline if displayed

# Tags — freeform. Used for filtering and related content.
# Keep to 3–6. Specific beats generic.
tags:
  - ""

# Featured article — surfaces in homepage or pillar page hero slots.
featured: false

# Pillar cluster role.
# Pillar posts are canonical authority pages for a topic cluster.
# Branch posts support one pillar post and should link back to pillarPostSlug.
pillarPost: false
pillarBranch: false
pillarPostSlug: ""  # required when pillarBranch: true; empty on the pillar post itself

# Holiday content flag — included in holiday content cluster.
holiday: false

# Holiday season relevance — if holiday: true, specify which events.
# One or more of: bfcm | cyber-monday | christmas | new-year | valentines |
#                  mothers-day | fathers-day | back-to-school | prime-day
holidayEvents:
  - ""

# Source Google Doc URL — for traceability back to original authoring doc.
sourceDocUrl: ""

# Agent processing metadata — set by the pipeline, not the author.
pipeline:
  processedAt: ""         # ISO 8601 — when agent processed the doc
  agentVersion: ""        # agent build version for debugging
  validationPassed: false # true only when all validation flags in aeo.validation are true
  publishBlocked: false   # agent sets true if validation fails — requires human review
  blockReasons:           # list of validation failures if publishBlocked: true
    - ""
---
```

---

## Agent validation rules

The agent must run these checks and set `pipeline.validationPassed` accordingly.
If any **blocking** rule fails, set `pipeline.publishBlocked: true` and add the
reason to `pipeline.blockReasons`. Non-blocking rules log a warning but do not block.

### Blocking — article will not publish until resolved

| Rule | Check |
|------|-------|
| H1 present | Body contains exactly one H1 |
| TL;DR present | `aeo.tldr` is non-empty and under 200 words |
| FAQ minimum | `aeo.faq.length >= 4` |
| Meta title length | `seo.metaTitle.length <= 60` |
| Meta description length | `seo.metaDescription.length` between 140 and 160 |
| Primary keyword in H1 | `seo.primaryKeyword` appears in the H1 text |
| Primary keyword in meta title | `seo.primaryKeyword` appears in `seo.metaTitle` |
| Slug format | Slug matches `/^[a-z0-9-]+$/` and is under 75 characters |
| Template set | `template` is one of the allowed values |
| Pillar set | `pillar` is one of the allowed values |
| Minimum word count | `wordCount >= 800` for listicle, `>= 1200` for all others |
| OG image path | `og.image` is non-empty |
| At least one H2 | Body contains at least two H2 headings |

### Non-blocking — warnings only

| Rule | Check |
|------|-------|
| Direct answers after H2s | First sentence of each H2 section is under 40 words |
| Keyword density | primaryKeyword appears 3–15 times in body |
| Key takeaways | `aeo.keyTakeaways` has exactly 3 items |
| Internal links | `internalLinks.relatedArticles.length >= 2` |
| Reading time accuracy | `readingTimeMinutes` within 1 minute of `wordCount / 200` |
| HowTo for playbooks | If `template = "playbook"`, `schema.howTo.enabled = true` |
| Stats attributed | Body contains at least one pattern matching `(Source, 20\d\d)` |
| CTA text set | `internalLinks.ctaText` is non-empty |

---

## Template → schema mapping

| Template | Article | FAQ | HowTo | BreadcrumbList |
|----------|---------|-----|-------|----------------|
| problem-fix | ✓ | ✓ | — | ✓ |
| listicle | ✓ | ✓ | — | ✓ |
| data-story | ✓ | ✓ | — | ✓ |
| playbook | ✓ | ✓ | ✓ | ✓ |
| versus | ✓ | ✓ | — | ✓ |

---

## Pillar → Cluster Mapping

The canonical URL for every post is `/blog/[slug]`.

Use `pillar`, `pillarPost`, `pillarBranch`, `pillarPostSlug`, and internal links
to establish pillar/branch relationships. A pillar post uses:

```yaml
pillarPost: true
pillarBranch: false
pillarPostSlug: ""
```

A branch post uses:

```yaml
pillarPost: false
pillarBranch: true
pillarPostSlug: "conversion-marketing-tactics-for-shopify-stores"
```

Final URL: `https://iwantthat.io/blog/[slug]`

---

## NextJS usage notes

1. Parse frontmatter with `gray-matter` before rendering body.
2. Generate JSON-LD blocks at render time from `schema.*` fields — do not store
   pre-rendered JSON-LD in the frontmatter (it goes stale on domain changes).
3. Use `pipeline.validationPassed` as a publish gate in your Supabase listener —
   drop articles where this is `false` into a `pending_review` bucket instead of
   the `published` bucket.
4. `canonical` field should be populated by NextJS at build time from
   `process.env.NEXT_PUBLIC_SITE_URL + "/blog/" + slug` — not hardcoded
   by the agent, so staging and production environments resolve correctly.
5. The `og.image` path is relative to Supabase storage. NextJS should prepend
   the Supabase storage base URL at render time.
