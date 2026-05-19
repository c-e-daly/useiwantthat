/**
 * Vector blog frontmatter — TypeScript types
 * Import into your NextJS app for type-safe frontmatter parsing.
 *
 * Usage:
 *   import matter from 'gray-matter'
 *   import type { PostFrontmatter } from '@/types/frontmatter'
 *
 *   const { data, content } = matter(rawMarkdown)
 *   const frontmatter = data as PostFrontmatter
 */

// ─────────────────────────────────────────────
// ENUMS
// ─────────────────────────────────────────────

export type PostTemplate =
  | 'problem-fix'
  | 'listicle'
  | 'data-story'
  | 'playbook'
  | 'versus'

export type ContentPillar =
  | 'customer-yield'
  | 'markup-performance'
  | 'negotiated-commerce'
  | 'agentic-commerce'
  | 'customer-portfolios'

export type UseCase =
  | 'clearance'
  | 'exit-intent'
  | 'remarketing'
  | 'special-collections'
  | 'agentic-offers'
  | 'conversion-growth'
  | 'email-optin'
  | 'general'

export type FunnelStage = 'awareness' | 'consideration' | 'decision'

export type IcpSegment =
  | 'solo-operator'
  | 'sub-50k'
  | '50k-150k'
  | '150k-300k'
  | '300k-500k'
  | 'all'

export type SitemapPriority = 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1.0

export type SitemapChangefreq =
  | 'always'
  | 'hourly'
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'yearly'
  | 'never'

export type CtaTarget =
  | 'install'
  | 'calculator'
  | 'demo'
  | 'pillar'
  | 'related-article'

export type HolidayEvent =
  | 'bfcm'
  | 'cyber-monday'
  | 'christmas'
  | 'new-year'
  | 'valentines'
  | 'mothers-day'
  | 'fathers-day'
  | 'back-to-school'
  | 'prime-day'

// ─────────────────────────────────────────────
// SUB-TYPES
// ─────────────────────────────────────────────

export interface FaqEntry {
  question: string
  answer: string
}

export interface H2DirectAnswer {
  heading: string
  answer: string
}

export interface DefinedTerm {
  term: string
  definition: string
}

export interface AeoValidation {
  hasTldr: boolean
  hasDirectAnswersAfterH2s: boolean
  hasFaqSection: boolean
  hasKeyTakeaways: boolean
  hasNumberedListsForSteps: boolean
  hasAttributedStats: boolean
  allH2sHaveDirectAnswer: boolean
  minWordCount: boolean
}

export interface SeoFields {
  primaryKeyword: string
  secondaryKeywords: string[]
  metaTitle: string
  metaDescription: string
  robots: string
  sitemapPriority: SitemapPriority
  sitemapChangefreq: SitemapChangefreq
  keywordDensityOk: boolean
}

export interface AeoFields {
  tldr: string
  h2DirectAnswers: H2DirectAnswer[]
  faq: FaqEntry[]
  keyTakeaways: [string, string, string]   // exactly 3
  definedTerms: DefinedTerm[]
  validation: AeoValidation
}

export interface OgFields {
  title: string
  description: string
  image: string
  imageAlt: string
  imageWidth: 1200
  imageHeight: 630
  type: 'article'
}

export interface TwitterFields {
  card: 'summary_large_image'
  title: string
  description: string
  image: string
}

export interface ArticleSchema {
  enabled: true
  headline: string
  description: string
  datePublished: string
  dateModified: string
  author: {
    name: string
    url: string
  }
  publisher: {
    name: string
    logo: string
  }
  image: string
  wordCount: number
}

export interface FaqPageSchema {
  enabled: boolean
  // Questions pulled from aeo.faq at render time — no duplication here.
}

export interface HowToSchema {
  enabled: boolean
  name: string
  description: string
  totalTime: string   // ISO 8601 duration e.g. "PT30M"
  // Steps extracted from body numbered lists at render time.
}

export interface BreadcrumbSchema {
  enabled: true
  // Items built from pillar + slug at render time.
}

export interface SchemaFields {
  article: ArticleSchema
  faqPage: FaqPageSchema
  howTo: HowToSchema
  breadcrumb: BreadcrumbSchema
}

export interface InternalLinkRef {
  title: string
  slug: string
}

export interface InternalLinks {
  pillarPage: InternalLinkRef
  relatedArticles: InternalLinkRef[]
  useCasePages: InternalLinkRef[]
  ctaTarget: CtaTarget
  ctaText: string
}

export interface Author {
  name: string
  role?: string
}

export interface PipelineMetadata {
  processedAt: string
  agentVersion: string
  validationPassed: boolean
  publishBlocked: boolean
  blockReasons: string[]
}

// ─────────────────────────────────────────────
// ROOT FRONTMATTER TYPE
// ─────────────────────────────────────────────

export interface PostFrontmatter {
  // Identity
  slug: string
  canonical: string
  version: number

  // Publishing
  publishedAt: string
  updatedAt: string
  published: boolean
  scheduledFor?: string

  // Classification
  template: PostTemplate
  pillar: ContentPillar
  useCases: UseCase[]
  funnelStage: FunnelStage
  icpSegment: IcpSegment[]
  readingTimeMinutes: number
  wordCount: number

  // SEO
  seo: SeoFields

  // AEO
  aeo: AeoFields

  // Social
  og: OgFields
  twitter: TwitterFields

  // Schema
  schema: SchemaFields

  // Internal linking
  internalLinks: InternalLinks

  // Content metadata
  author: Author
  tags: string[]
  featured: boolean
  pillarPost: boolean
  pillarBranch: boolean
  pillarPostSlug?: string
  holiday: boolean
  holidayEvents?: HolidayEvent[]
  sourceDocUrl?: string

  // Pipeline
  pipeline: PipelineMetadata
}

// ─────────────────────────────────────────────
// DERIVED TYPES FOR NEXTJS USAGE
// ─────────────────────────────────────────────

/**
 * Safe subset passed to page components — no pipeline internals.
 * Use this as your component prop type, not the full PostFrontmatter.
 */
export type PostMeta = Pick<
  PostFrontmatter,
  | 'slug'
  | 'canonical'
  | 'publishedAt'
  | 'updatedAt'
  | 'template'
  | 'pillar'
  | 'useCases'
  | 'funnelStage'
  | 'icpSegment'
  | 'readingTimeMinutes'
  | 'wordCount'
  | 'seo'
  | 'aeo'
  | 'og'
  | 'twitter'
  | 'schema'
  | 'internalLinks'
  | 'author'
  | 'tags'
  | 'featured'
  | 'pillarPost'
  | 'pillarBranch'
  | 'pillarPostSlug'
  | 'holiday'
  | 'holidayEvents'
>

/**
 * Minimal type for list pages (index, pillar pages, sitemaps).
 * Avoids loading full AEO / schema payloads for cards.
 */
export interface PostSummary {
  slug: string
  pillar: ContentPillar
  template: PostTemplate
  publishedAt: string
  updatedAt: string
  readingTimeMinutes: number
  featured: boolean
  holiday: boolean
  seo: Pick<SeoFields, 'metaTitle' | 'metaDescription' | 'primaryKeyword'>
  og: Pick<OgFields, 'title' | 'description' | 'image' | 'imageAlt'>
  aeo: Pick<AeoFields, 'tldr'>
  tags: string[]
}

// ─────────────────────────────────────────────
// PILLAR → URL MAP
// ─────────────────────────────────────────────

export const PILLAR_URL_PREFIX: Record<ContentPillar, string> = {
  'customer-yield':       '/blog/customer-yield',
  'markup-performance':   '/blog/markup-performance',
  'negotiated-commerce':  '/blog/negotiated-commerce',
  'agentic-commerce':     '/blog/agentic-commerce',
  'customer-portfolios':  '/blog/customer-portfolios',
}

/**
 * Build the full canonical path for a post.
 * Pass to NextJS generateStaticParams or use in <link rel="canonical">.
 */
export function buildPostPath(slug: string): string {
  return `/blog/${slug}`
}

// ─────────────────────────────────────────────
// VALIDATION HELPERS
// ─────────────────────────────────────────────

/**
 * Blocking validation rules. Returns array of failure reasons.
 * Empty array = all blocking rules passed.
 * Run before publishing a local markdown post.
 */
export function validateFrontmatter(fm: PostFrontmatter): string[] {
  const failures: string[] = []

  if (!fm.slug || !/^[a-z0-9-]+$/.test(fm.slug) || fm.slug.length > 75)
    failures.push('slug: must be lowercase hyphens only, under 75 chars')

  if (!fm.seo.metaTitle || fm.seo.metaTitle.length > 60)
    failures.push('seo.metaTitle: must be present and under 60 characters')

  if (
    !fm.seo.metaDescription ||
    fm.seo.metaDescription.length < 140 ||
    fm.seo.metaDescription.length > 160
  )
    failures.push('seo.metaDescription: must be 140–160 characters')

  if (!fm.seo.primaryKeyword)
    failures.push('seo.primaryKeyword: must be present')

  if (fm.aeo.faq.length < 4)
    failures.push('aeo.faq: minimum 4 FAQ entries required')

  if (!fm.aeo.tldr || fm.aeo.tldr.split(' ').length > 200)
    failures.push('aeo.tldr: must be present and under 200 words')

  if (!fm.template)
    failures.push('template: must be set to a valid template type')

  if (!fm.pillar)
    failures.push('pillar: must be set to a valid pillar value')

  const minWords = fm.template === 'listicle' ? 800 : 1200
  if (fm.wordCount < minWords)
    failures.push(`wordCount: minimum ${minWords} words for template "${fm.template}"`)

  if (!fm.og.image)
    failures.push('og.image: OG image path must be set')

  return failures
}

/**
 * Non-blocking warnings. Returns array of warning messages.
 * Log these but do not block publish.
 */
export function warnFrontmatter(fm: PostFrontmatter): string[] {
  const warnings: string[] = []

  if (fm.aeo.keyTakeaways.length !== 3)
    warnings.push('aeo.keyTakeaways: should have exactly 3 items')

  if (fm.internalLinks.relatedArticles.length < 2)
    warnings.push('internalLinks.relatedArticles: recommend at least 2 related articles')

  if (!fm.internalLinks.ctaText)
    warnings.push('internalLinks.ctaText: CTA text should be set')

  if (fm.template === 'playbook' && !fm.schema.howTo.enabled)
    warnings.push('schema.howTo: should be enabled for playbook template')

  const expectedReadingTime = Math.round(fm.wordCount / 200)
  if (Math.abs(fm.readingTimeMinutes - expectedReadingTime) > 1)
    warnings.push(
      `readingTimeMinutes: expected ~${expectedReadingTime} for ${fm.wordCount} words`
    )

  return warnings
}
