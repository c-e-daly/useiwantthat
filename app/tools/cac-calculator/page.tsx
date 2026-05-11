import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BarChart3, CheckCircle2 } from "lucide-react";
import { CacCalculatorClient } from "@/components/marketing/CacCalculatorClient";

const SHOPIFY_APP_URL = "https://apps.shopify.com/iwtapp-shop";
const DEMO_URL = "https://meetings.hubspot.com/chris-e-daly/customer-demo";

export const metadata: Metadata = {
  title:
    "Vector — Stop Paying the Ad Tax. Convert the Traffic You Already Have.",
  description:
    "Vector lets Shopify merchants accept customer-generated offers, counter automatically, and convert 3–5× more of their existing traffic — without spending another dollar on ads.",
  openGraph: {
    title: "Vector — Convert Your Traffic. Not Someone Else's.",
    description:
      "Your store already has what it needs to grow. Vector unlocks the revenue that's already in your traffic — with intelligent offers, automated counters, and exit intent that captures orders, not emails.",
    images: ["https://useiwantthat.com/vector-icon-wordmark-logo.png"],
    url: "https://useiwantthat.com",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vector — Convert Your Traffic. Not Someone Else's.",
    description:
      "Stop paying $5–$15 per click for visitors who leave. Vector converts the traffic you already have with intelligent customer offers and automated decisions.",
    images: ["https://useiwantthat.com/vector-icon-wordmark-logo.png"],
  },
};

const ctaPoints = [
  "Model paid CAC, break-even orders, and gross-profit impact.",
  "Compare ad revenue against organic revenue you already earned.",
  "Estimate the annual upside from lifting organic conversion with Vector.",
];

export default function CacCalculatorPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="border-b border-surface-border bg-surface-subtle/50">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:py-20">
          <div className="lg:sticky lg:top-24">
            <p className="text-xs font-bold uppercase tracking-widest text-brand">
              CAC calculator
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-black md:text-6xl">
              See what paid traffic is really costing your store.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-neutral-muted">
              Use your ad spend, conversion rate, margin, and organic traffic to
              compare CAC against the revenue Vector can unlock from shoppers
              already on your site.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={DEMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-askrami bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-deep"
              >
                Book a demo
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={SHOPIFY_APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-askrami border border-surface-border bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-surface-subtle"
              >
                Install on Shopify
              </Link>
            </div>

            <div className="mt-8 rounded-askrami border border-surface-border bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-askrami bg-brand/10 text-brand">
                  <BarChart3 className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-black">
                    Traffic you already paid for should convert before you buy
                    it again.
                  </p>
                  <p className="mt-1 text-sm text-neutral-muted">
                    Vector focuses on the organic and direct sessions with no
                    added ad tax.
                  </p>
                </div>
              </div>

              <ul className="mt-5 space-y-3">
                {ctaPoints.map((point) => (
                  <li
                    key={point}
                    className="flex gap-3 text-sm text-neutral-muted"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <CacCalculatorClient />
        </div>
      </section>
    </div>
  );
}
