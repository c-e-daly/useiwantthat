import type { ContentPillar, UseCase } from "@/lib/blog/vector-frontmatter.types";

export type PillarConfig = {
  value: ContentPillar;
  segment: string;
  title: string;
  description: string;
};

export const BLOG_PILLARS: Record<ContentPillar, PillarConfig> = {
  "conversion-rate-optimisation": {
    value: "conversion-rate-optimisation",
    segment: "conversion",
    title: "Conversion Rate Optimisation",
    description: "Offers, exits, and customer generated offer systems that turn more traffic into buyers.",
  },
  "customer-acquisition-cost": {
    value: "customer-acquisition-cost",
    segment: "acquisition",
    title: "Customer Acquisition Cost",
    description: "CAC, paid traffic, remarketing, and margin-aware acquisition strategy for Shopify brands.",
  },
  "pricing-strategy": {
    value: "pricing-strategy",
    segment: "pricing",
    title: "Pricing Strategy",
    description: "Price elasticity, discounts, markdowns, and profit-preserving offer design.",
  },
  "inventory-management": {
    value: "inventory-management",
    segment: "inventory",
    title: "Inventory Management",
    description: "Clearance, slow-moving stock, cash conversion, and inventory-aware growth plays.",
  },
  "agentic-commerce": {
    value: "agentic-commerce",
    segment: "agentic",
    title: "Agentic Commerce",
    description: "AI shopping agents, customer intent capture, and agent-ready commerce infrastructure.",
  },
};

export const USE_CASE_PATHS: Partial<Record<UseCase, { title: string; path: string }>> = {
  clearance: { title: "Clearance", path: "/use-cases/clearance" },
  "exit-intent": { title: "Exit intent", path: "/use-cases/exit-intent" },
  remarketing: { title: "Remarketing", path: "/use-cases/remarketing" },
  "special-collections": { title: "Special collections", path: "/use-cases/special-collections" },
  "agentic-offers": { title: "Agentic offers", path: "/use-cases/agentic-offers" },
  "conversion-growth": { title: "Conversion growth", path: "/use-cases/conversion-growth" },
  "email-optin": { title: "Email opt-in", path: "/use-cases/email-optin" },
};

export function getPillarBySegment(segment: string): PillarConfig | null {
  return Object.values(BLOG_PILLARS).find((pillar) => pillar.segment === segment) ?? null;
}

export function getPillarPath(pillar: ContentPillar | null | undefined) {
  return pillar ? `/blog/${BLOG_PILLARS[pillar].segment}` : "/blog";
}

export function getPostPath(slug: string) {
  return `/blog/${slug}`;
}
