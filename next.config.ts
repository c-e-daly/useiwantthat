import type { NextConfig } from "next";

const siteHost = process.env.NEXT_PUBLIC_SITE_URL
  ? new URL(process.env.NEXT_PUBLIC_SITE_URL).hostname
  : "useiwantthat.com";

const nextConfig: NextConfig = {
  async redirects() {
    return [
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
