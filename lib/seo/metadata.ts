import type { Metadata } from "next";
import { absoluteSiteUrl } from "@/lib/site/url";

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
  const url = absoluteSiteUrl(path);
  const images = image
    ? [
        {
          url: absoluteSiteUrl(image),
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
