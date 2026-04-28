// src/providers/providers.tsx
"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";

type PostHogClientWithLoadedFlag = typeof posthog & {
  __loaded?: boolean;
};

const posthogClient = posthog as PostHogClientWithLoadedFlag;

type PostHogProviderProps = {
  children: React.ReactNode;
  apiKey?: string;
  apiHost?: string;
};

export function PostHogProvider({
  children,
  apiKey,
  apiHost,
}: PostHogProviderProps) {
  const pathname = usePathname();

  useEffect(() => {
    const key = apiKey ?? process.env.NEXT_PUBLIC_POSTHOG_KEY;
    const host = apiHost ?? process.env.NEXT_PUBLIC_POSTHOG_HOST;

    if (!key || !host) return;

    // avoid double-init with HMR
    if (posthogClient.__loaded) return;

    posthog.init(key, {
      api_host: host,
      capture_pageview: false,
      capture_pageleave: true,
      loaded: (ph) => {
        (ph as PostHogClientWithLoadedFlag).__loaded = true;
      },
    });
  }, [apiHost, apiKey]);

  useEffect(() => {
    posthog.capture("$pageview", {
      $current_url: typeof window !== "undefined" ? window.location.href : pathname,
    });
  }, [pathname]);

  return <PHProvider client={posthog}>{children}</PHProvider>;
}
