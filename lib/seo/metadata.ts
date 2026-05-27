import type { Metadata } from "next";

const DEFAULT_SITE_URL = "https://www.useiwantthat.com";

type PageMetadataInput = {
  title: string;
  description?: string;
  path: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  twitterTitle?: string;
  twitterDescription?: string;
};

function getSiteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL).replace(/\/+$/, "");
}

function absoluteUrl(value: string) {
  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  return `${getSiteUrl()}/${value.replace(/^\/+/, "")}`;
}

export function buildPageMetadata({
  title,
  description,
  path,
  image,
  imageAlt,
  type = "website",
  twitterTitle,
  twitterDescription,
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const images = image
    ? [
        {
          url: absoluteUrl(image),
          width: 1200,
          height: 630,
          alt: imageAlt ?? title,
        },
      ]
    : undefined;

  return {
    title,
    description,
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: twitterTitle ?? title,
      description: twitterDescription ?? description,
      images,
    },
  };
}
