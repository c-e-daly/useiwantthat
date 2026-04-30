export type MarkdownLink = {
  text: string;
  href: string;
};

export type ExternalLinkValidation = MarkdownLink & {
  ok: boolean;
  status?: number;
  error?: string;
};

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
