import type { ContentPillar, UseCase } from "@/lib/blog/vector-frontmatter.types";

export type PillarConfig = {
  value: ContentPillar;
  segment: string;
  title: string;
  description: string;
};

export const BLOG_PILLARS: Record<ContentPillar, PillarConfig> = {
  "customer-yield": {
    value: "customer-yield",
    segment: "customer-yield",
    title: "Customer Yield",
    description: "CAC, discounts, customer generated offers, and the economics of getting more yield from each buyer.",
  },
  "markup-performance": {
    value: "markup-performance",
    segment: "markup-performance",
    title: "Markup Performance",
    description: "Markup, margin, allowances, markdowns, and profit-preserving price architecture.",
  },
  "negotiated-commerce": {
    value: "negotiated-commerce",
    segment: "negotiated-commerce",
    title: "Negotiated Commerce",
    description: "Customer generated offers as the starting point for margin-aware negotiation.",
  },
  "agentic-commerce": {
    value: "agentic-commerce",
    segment: "agentic-commerce",
    title: "Agentic Commerce",
    description: "AI shopping agents, customer intent capture, and agent-ready commerce infrastructure.",
  },
  "customer-portfolios": {
    value: "customer-portfolios",
    segment: "customer-portfolios",
    title: "Customer Portfolios",
    description: "Customer segments, offer history, and portfolio-level strategies for negotiated commerce.",
  },
};

const LEGACY_CONTENT_PILLARS: Record<string, ContentPillar> = {
  "conversion-rate-optimisation": "negotiated-commerce",
  "customer-acquisition-cost": "customer-yield",
  "pricing-strategy": "markup-performance",
  "inventory-management": "customer-portfolios",
};

export const USE_CASE_PATHS: Partial<Record<UseCase, { title: string; path: string }>> = {
  clearance: { title: "Clearance", path: "/playbooks/clearance-playbook" },
  "exit-intent": { title: "Exit intent", path: "/playbooks/exit-intent-playbook" },
  remarketing: { title: "Remarketing", path: "/playbooks/remarketing-playbook" },
  "special-collections": { title: "Special collections", path: "/playbooks/programs-playbook" },
  "agentic-offers": { title: "Agentic offers", path: "/playbooks/counter-offer-playbook" },
  "conversion-growth": { title: "Conversion growth", path: "/playbooks/cac-playbook" },
  "email-optin": { title: "Email opt-in", path: "/playbooks/exit-intent-playbook" },
};

export function getPillarBySegment(segment: string): PillarConfig | null {
  return Object.values(BLOG_PILLARS).find((pillar) => pillar.segment === segment) ?? null;
}

export function resolveContentPillar(value: unknown): ContentPillar | null {
  if (typeof value !== "string") {
    return null;
  }

  if (value in BLOG_PILLARS) {
    return value as ContentPillar;
  }

  return LEGACY_CONTENT_PILLARS[value] ?? null;
}

export function getPillarPath(pillar: ContentPillar | null | undefined) {
  return pillar ? `/blog/${BLOG_PILLARS[pillar].segment}` : "/blog";
}

export function getPostPath(slug: string) {
  return `/blog/${slug}`;
}
