// src/providers/providers.tsx
"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import type { ConfigDefaults } from "posthog-js";

type PostHogClientWithLoadedFlag = typeof posthog & {
  __loaded?: boolean;
};

const posthogClient = posthog as PostHogClientWithLoadedFlag;
const DEFAULT_POSTHOG_HOST = "https://m.useiwantthat.com";
const DEFAULT_POSTHOG_DEFAULTS: ConfigDefaults = "2026-01-30";

type PostHogProviderProps = {
  children: React.ReactNode;
  apiKey?: string;
  apiHost?: string;
  defaults?: ConfigDefaults;
};

export function PostHogProvider({
  children,
  apiKey,
  apiHost,
  defaults = DEFAULT_POSTHOG_DEFAULTS,
}: PostHogProviderProps) {
  const pathname = usePathname();

  useEffect(() => {
    const key = apiKey ?? process.env.NEXT_PUBLIC_POSTHOG_KEY  ?? process.env.POSTHOG_KEY;
    const host =
      apiHost ??
      process.env.NEXT_PUBLIC_POSTHOG_HOST ??
      process.env.POSTHOG_HOST ??
      DEFAULT_POSTHOG_HOST;

    if (!key) return;

    // avoid double-init with HMR
    if (posthogClient.__loaded) return;

    posthog.init(key, {
      api_host: host,
      defaults,
      capture_pageview: false,
      capture_pageleave: true,
      loaded: (ph) => {
        (ph as PostHogClientWithLoadedFlag).__loaded = true;
      },
    });
  }, [apiHost, apiKey, defaults]);

  useEffect(() => {
    posthog.capture("$pageview", {
      $current_url: typeof window !== "undefined" ? window.location.href : pathname,
    });
  }, [pathname]);

  return <PHProvider client={posthog}>{children}</PHProvider>;
}
