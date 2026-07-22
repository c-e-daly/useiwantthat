import type { NextConfig } from "next";
import { LEGACY_INTERNAL_LINKS } from "./lib/blog/links";

const siteHost = process.env.NEXT_PUBLIC_SITE_URL
  ? new URL(process.env.NEXT_PUBLIC_SITE_URL).hostname
  : "useiwantthat.com";
const posthogIngestHost = process.env.POSTHOG_INGEST_HOST ?? "https://us.i.posthog.com";
const posthogAssetsHost = process.env.POSTHOG_ASSETS_HOST ?? "https://us-assets.i.posthog.com";

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/static/:path*",
          has: [{ type: "host", value: "m.useiwantthat.com" }],
          destination: `${posthogAssetsHost}/static/:path*`,
        },
        {
          source: "/:path*",
          has: [{ type: "host", value: "m.useiwantthat.com" }],
          destination: `${posthogIngestHost}/:path*`,
        },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
  async redirects() {
    return [
      ...Object.entries(LEGACY_INTERNAL_LINKS).map(([source, destination]) => ({
        source,
        destination,
        permanent: true,
      })),
      {
        source: "/cac-calculator",
        destination: "/tools/cac-calculator",
        permanent: true,
      },
      ...["/cookie-policy", "/legal", "/privacy-policy", "/terms-of-service"].map(
        (source) => ({
          source,
          has: [{ type: "host" as const, value: "app.useiwantthat.com" }],
          destination: `https://useiwantthat.com${source}`,
          permanent: true,
        })
      ),
      {
        source: "/blog/defected-portfolio-winning-back-dormant-top-tier",
        destination: "/blog/defected-portfolio-win-back-strategies",
        permanent: true,
      },
      {
        source: "/blog/defected-customer-portfolio-win-back-strategies",
        destination: "/blog/defected-portfolio-win-back-strategies",
        permanent: true,
      },
      {
        source: "/blog/reactivated-portfolio-win-back-dormant-top-tier",
        destination: "/blog/reactivated-portfolio-ltv-strategies",
        permanent: true,
      },
      {
        source: "/blog/reactivated-customer-portfolio-ltv-strategies",
        destination: "/blog/reactivated-portfolio-ltv-strategies",
        permanent: true,
      },
      {
        source: "/blog/declining-portfolio-demand-recapture",
        destination: "/blog/declining-portfolio-recapture-strategies",
        permanent: true,
      },
      {
        source: "/blog/declining-customer-portfolio-recapture-strategies",
        destination: "/blog/declining-portfolio-recapture-strategies",
        permanent: true,
      },
      {
        source: "/blog/growth-portfolio-nurture-mid-to-top-tier",
        destination: "/blog/growth-portfolio-profit-mining-strategies",
        permanent: true,
      },
      {
        source: "/blog/growth-customer-portfolio-profit-mining-strategies",
        destination: "/blog/growth-portfolio-profit-mining-strategies",
        permanent: true,
      },
      {
        source: "/blog/stable-portfolio-retaining-engaged-top-tier-buyers",
        destination: "/blog/stable-portfolio-engagement-strategies",
        permanent: true,
      },
      {
        source: "/blog/stable-customer-portfolio-engagement-strategies",
        destination: "/blog/stable-portfolio-engagement-strategies",
        permanent: true,
      },
      {
        source: "/blog/new-portfolio-first-buyer-to-second-order",
        destination: "/blog/new-customer-second-order-strategies",
        permanent: true,
      },
      {
        source: "/blog/new-customer-portfolio-growth-strategies",
        destination: "/blog/new-customer-second-order-strategies",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.useiwantthat.com" }],
        destination: "https://useiwantthat.com/:path*",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: siteHost,
        port: "",
        pathname: "/blog-assets/**",
        search: "",
      },
      {
        protocol: "https",
        hostname: "www.useiwantthat.com",
        port: "",
        pathname: "/blog-assets/**",
        search: "",
      },
      {
        protocol: "https",
        hostname: "useiwantthat.com",
        port: "",
        pathname: "/blog-assets/**",
        search: "",
      },
      {
        protocol: "https",
        hostname: "jqqmquuomykzdeplumki.storage.supabase.co",
        port: "",
        pathname: "/storage/v1/**",
      },
      {
        protocol: "https",
        hostname: "s3.amazonaws.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.s3.amazonaws.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
