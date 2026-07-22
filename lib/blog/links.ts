export type MarkdownLink = {
  text: string;
  href: string;
};

export type ExternalLinkValidation = MarkdownLink & {
  ok: boolean;
  status?: number;
  error?: string;
};

export const LEGACY_INTERNAL_LINKS: Readonly<Record<string, string>> = {
  "/blog/category/customer-portfolios": "/blog/customer-portfolios",
  "/blog/category/markup-performance": "/blog/markup-performance",
  "/blog/category/customer-yield": "/blog/customer-yield",
  "/blog/sku-level-offer-data": "/blog/what-are-customer-generated-offers",
  "/blog/playbooks/second-order-campaign": "/blog/new-customer-second-order-strategies",
  "/blog/markup-vs-margin-reframe": "/blog/imu-pricing-fundamentals",
  "/blog/free-shipping-markup-spent": "/blog/price-builder-framework-allowances",
  "/blog/quintile-vs-rfm": "/blog/customer-portfolios",
  "/blog/exit-intent-cost": "/blog/exit-intent-losing-money",
  "/blog/category-indexing-by-portfolio": "/blog/customer-portfolios",
  "/blog/defected-recapture-quintile": "/blog/defected-portfolio-win-back-strategies",
  "/glossary/discount-allowance": "/glossary/the-five-allowances",
  "/blog/shopify-metrics-deep-dive": "/blog/customer-portfolios",
  "/blog/dtc-shrink-benchmark": "/blog/markup-performance",
  "/blog/reactivated-no-discount": "/blog/reactivated-portfolio-ltv-strategies",
  "/blog/inventory-carrying-cost": "/blog/selling-aged-inventory-customer-generated-offers",
  "/blog/playbooks/cac-playbook": "/playbooks/cac-playbook",
  "/blog/margin-targets-fail": "/blog/imu-pricing-fundamentals",
  "/blog/cac-is-a-yield-problem": "/blog/what-is-customer-yield",
  "/blog/declining-portfolio-cgo": "/blog/declining-portfolio-recapture-strategies",
  "/blog/new-portfolio-second-order": "/blog/new-customer-second-order-strategies",
  "/blog/decision-frameworks/channel-stage-fit": "/blog/customer-yield",
  "/blog/what-captured-means": "/blog/exit-intent-losing-money",
  "/blog/cohorts-vs-portfolios": "/blog/customer-portfolios",
  "/blog/stable-erosion": "/blog/stable-portfolio-engagement-strategies",
  "/blog/hold-price-vs-negotiate": "/blog/negotiation-is-the-norm-not-the-exception",
  "/blog/growth-no-discount": "/blog/growth-portfolio-profit-mining-strategies",
  "/blog/profit-markup-three-layers": "/blog/markup-performance",
  "/blog/28-to-38-move": "/blog/what-is-customer-yield",
};

export function resolveInternalLink(href: string) {
  return LEGACY_INTERNAL_LINKS[href] ?? href;
}

const MARKDOWN_LINK_PATTERN = /\[([^\]]+)\]\(([^)\s]+)\)/g;

export function extractMarkdownLinks(markdown: string): MarkdownLink[] {
  return Array.from(markdown.matchAll(MARKDOWN_LINK_PATTERN)).map((match) => ({
    text: match[1],
    href: match[2],
  }));
}

export function extractExternalMarkdownLinks(markdown: string): MarkdownLink[] {
  return extractMarkdownLinks(markdown).filter((link) => /^https?:\/\//i.test(link.href));
}

async function fetchWithTimeout(url: string, init: RequestInit, timeoutMs: number) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
}

export async function validateExternalLink(
  link: MarkdownLink,
  timeoutMs = 6000
): Promise<ExternalLinkValidation> {
  try {
    let response = await fetchWithTimeout(link.href, { method: "HEAD", redirect: "follow" }, timeoutMs);

    if (response.status === 405 || response.status === 403) {
      response = await fetchWithTimeout(link.href, { method: "GET", redirect: "follow" }, timeoutMs);
    }

    return {
      ...link,
      ok: response.status >= 200 && response.status < 400,
      status: response.status,
    };
  } catch (error) {
    return {
      ...link,
      ok: false,
      error: error instanceof Error ? error.message : "Unknown link validation error",
    };
  }
}

export async function validateExternalLinks(markdown: string): Promise<ExternalLinkValidation[]> {
  const links = extractExternalMarkdownLinks(markdown);
  return Promise.all(links.map((link) => validateExternalLink(link)));
}
