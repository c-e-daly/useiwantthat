import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { cache } from "react";
import { parseMarkdownWithFrontmatter } from "@/lib/blog/frontmatter";
import { renderMarkdown } from "@/lib/blog/markdown";

const GLOSSARY_DIR = path.join(process.cwd(), "content", "glossary");
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.useiwantthat.com").replace(/\/+$/, "");

export type GlossaryPillar =
  | "customer-yield"
  | "markup-performance"
  | "negotiated-commerce"
  | "agentic-commerce"
  | "customer-portfolios";

export type GlossaryTermStatus = "stub" | "full" | "published";

export type GlossaryTermFrontmatter = {
  title?: string;
  slug?: string;
  content_type?: string;
  pillar?: GlossaryPillar;
  ladder_stage?: string | number;
  publish_date?: string;
  last_updated?: string;
  status?: GlossaryTermStatus;
  meta_title?: string;
  meta_description?: string;
  sitemapPriority?: number;
  tldr?: string;
  key_takeaways?: string[];
  faq_schema?: boolean;
  schema_type?: string;
  hub_link?: string;
  related_cluster_posts?: string[];
  related_glossary_terms?: string[];
  related_tool?: string;
  og_image?: string;
};

export type GlossaryFaqEntry = {
  question: string;
  answer: string;
};

export type GlossaryTerm = {
  slug: string;
  title: string;
  term: string;
  pillar: GlossaryPillar | null;
  ladderStage: string | null;
  status: GlossaryTermStatus;
  metaTitle: string;
  metaDescription: string;
  tldr: string;
  hubLink: string | null;
  relatedGlossaryTerms: string[];
  relatedTool: string | null;
  ogImage: string | null;
  sitemapPriority: number;
  lastUpdated: string | null;
  markdown: string;
  html: string;
  faq: GlossaryFaqEntry[];
  path: string;
  canonicalUrl: string;
};

export const GLOSSARY_PILLARS: Array<{
  value: GlossaryPillar;
  title: string;
  description: string;
  availability: string;
}> = [
  {
    value: "customer-yield",
    title: "Customer Yield",
    description: "How much value a store captures from the customers and traffic it already has.",
    availability: "5 terms",
  },
  {
    value: "markup-performance",
    title: "Markup Performance",
    description: "Margin, markdowns, allowances, and the operating math behind price decisions.",
    availability: "Coming June 2026",
  },
  {
    value: "negotiated-commerce",
    title: "Negotiated Commerce",
    description: "Customer generated offers, counters, floors, acceptance logic, and buyer-led pricing.",
    availability: "Coming June 2026",
  },
  {
    value: "agentic-commerce",
    title: "Agentic Commerce",
    description: "How AI shopping agents, merchant rules, and customer intent reshape store interactions.",
    availability: "Coming July 2026",
  },
  {
    value: "customer-portfolios",
    title: "Customer Portfolios",
    description: "Segments, offer history, lifecycle strategy, and portfolio-level customer value.",
    availability: "Coming July 2026",
  },
];

export function getGlossaryPillarTitle(pillar: GlossaryPillar | null) {
  return GLOSSARY_PILLARS.find((item) => item.value === pillar)?.title ?? null;
}

function normalizeEscapedMarkdown(source: string) {
  const normalized = source
    .replace(/\r\n/g, "\n")
    .replace(/\\---/g, "---")
    .replace(/\\#/g, "#")
    .replace(/\\_/g, "_")
    .replace(/\\\*/g, "*")
    .replace(/\\\[/g, "[")
    .replace(/\\\]/g, "]")
    .replace(/\\\./g, ".")
    .replace(/\\-/g, "-")
    .replace(/^---[ \t]*$/gm, "---");

  const frontmatterIndex = normalized.indexOf("---");
  const trimmedToFrontmatter = frontmatterIndex > 0 ? normalized.slice(frontmatterIndex) : normalized;
  return trimmedToFrontmatter.replace(/^---[ \t]*$/gm, "---");
}

function normalizeSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseList(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === "string").map((item) => item.trim()).filter(Boolean);
  }

  if (typeof value !== "string") {
    return [];
  }

  return value
    .replace(/^\[|\]$/g, "")
    .split(",")
    .map((item) => item.trim().replace(/^["']|["']$/g, ""))
    .filter(Boolean);
}

function stripFirstH1(markdown: string) {
  return markdown.replace(/^#\s+.+(?:\n+|$)/, "");
}

function extractTerm(markdown: string, fallbackTitle: string) {
  const heading = markdown.match(/^#\s+What is\s+(.+?)\??\s*$/m)?.[1]?.trim();
  return heading || fallbackTitle.replace(/^What is\s+/i, "").replace(/\?.*$/, "").trim();
}

function extractFaq(markdown: string): GlossaryFaqEntry[] {
  const entries: GlossaryFaqEntry[] = [];
  const faqSection = markdown.match(/## FAQ\s*\n([\s\S]*?)(?:\n##\s+|\n---|\n\*Last reviewed:|$)/i)?.[1] ?? "";
  const pattern = /\*\*Q:\s*(.+?)\*\*\s*\nA:\s*([\s\S]*?)(?=\n\*\*Q:|\s*$)/g;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(faqSection))) {
    const question = match[1].trim();
    const answer = match[2].trim();

    if (question && answer) {
      entries.push({ question, answer });
    }
  }

  return entries;
}

function isGlossaryPillar(value: unknown): value is GlossaryPillar {
  return typeof value === "string" && GLOSSARY_PILLARS.some((pillar) => pillar.value === value);
}

function mapGlossaryTerm(fileName: string, rawMarkdown: string): GlossaryTerm | null {
  const normalized = normalizeEscapedMarkdown(rawMarkdown);
  const { frontmatter, content } = parseMarkdownWithFrontmatter(normalized);
  const fm = frontmatter as GlossaryTermFrontmatter | null;

  if (!fm || fileName.includes("template") || !fm.slug || fm.slug.includes("[")) {
    return null;
  }

  const slug = normalizeSlug(fm.slug);
  const status = fm.status ?? "published";
  const ladderStage = fm.ladder_stage && fm.ladder_stage !== "none" ? String(fm.ladder_stage) : null;
  const markdown = stripFirstH1(content.trim());
  const title = fm.title ?? `What is ${slug.replace(/-/g, " ")}?`;
  const pillar = isGlossaryPillar(fm.pillar) ? fm.pillar : null;

  return {
    slug,
    title,
    term: extractTerm(content, title),
    pillar,
    ladderStage,
    status,
    metaTitle: fm.meta_title ?? title,
    metaDescription: fm.meta_description ?? fm.tldr ?? "",
    tldr: fm.tldr ?? "",
    hubLink: fm.hub_link ?? null,
    relatedGlossaryTerms: parseList(fm.related_glossary_terms),
    relatedTool: fm.related_tool && fm.related_tool !== "none" ? fm.related_tool : null,
    ogImage: fm.og_image ?? null,
    sitemapPriority: typeof fm.sitemapPriority === "number" ? fm.sitemapPriority : 0.7,
    lastUpdated: fm.last_updated || fm.publish_date || null,
    markdown,
    html: renderMarkdown(markdown).html,
    faq: extractFaq(content),
    path: `/glossary/${slug}`,
    canonicalUrl: `${SITE_URL}/glossary/${slug}`,
  };
}

export const getAllGlossaryTerms = cache(async (): Promise<GlossaryTerm[]> => {
  const files = await readdir(GLOSSARY_DIR);
  const markdownFiles = files.filter((file) => file.endsWith(".md"));
  const terms = await Promise.all(
    markdownFiles.map(async (fileName) => {
      const rawMarkdown = await readFile(path.join(GLOSSARY_DIR, fileName), "utf8");
      return mapGlossaryTerm(fileName, rawMarkdown);
    })
  );

  return terms
    .filter((term): term is GlossaryTerm => Boolean(term))
    .sort((a, b) => {
      const pillarSort = (a.pillar ?? "").localeCompare(b.pillar ?? "");
      return pillarSort || a.term.localeCompare(b.term);
    });
});

export async function getPublishedGlossaryTerms() {
  const terms = await getAllGlossaryTerms();
  return terms.filter((term) => term.status === "published" || term.status === "full");
}

export async function getGlossaryTermBySlug(slug: string) {
  const terms = await getAllGlossaryTerms();
  return terms.find((term) => term.slug === slug) ?? null;
}
