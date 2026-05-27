const CANONICAL_SITE_URL = "https://useiwantthat.com";
const LEGACY_WWW_HOST = "www.useiwantthat.com";
const CANONICAL_HOST = "useiwantthat.com";

export function getSiteUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL ?? CANONICAL_SITE_URL;

  try {
    const url = new URL(configuredUrl);

    if (url.hostname === LEGACY_WWW_HOST) {
      url.hostname = CANONICAL_HOST;
    }

    return url.toString().replace(/\/+$/, "");
  } catch {
    return CANONICAL_SITE_URL;
  }
}

export function absoluteSiteUrl(value: string) {
  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  return `${getSiteUrl()}/${value.replace(/^\/+/, "")}`;
}
