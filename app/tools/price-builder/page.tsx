import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { PriceBuilderClient } from "@/components/marketing/PriceBuilderClient";
import { buildPageMetadata } from "@/lib/seo/metadata";

const SHOPIFY_APP_URL = "https://apps.shopify.com/iwtapp-shop";
const DEMO_URL = "https://meetings.hubspot.com/chris-e-daly/customer-demo";

export const metadata = buildPageMetadata({
  title: "Price Builder | Protect SKU Profitability",
  description:
    "Model COGS, profit markup, and dollar-based unit allowances so Shopify merchants can unlock price elasticity while protecting gross profit.",
  path: "/tools/price-builder",
  image: "/images/og/price-builder-og.png",
  twitterTitle: "Price Builder - Protect Profit at the SKU Level",
  twitterDescription:
    "Model COGS, markup, and unit-level opportunity costs so discounts, free shipping, and financing do not quietly erase gross profit.",
});

const ctaPoints = [
  "Start with COGS and dollar profit markup, just like a Shopify selling price.",
  "Add the real unit-level cost of shipping, discounts, financing, shrink, and market adjustments.",
  "See how 10% discounts, 20% discounts, and free shipping change gross profit.",
];

export default function PriceBuilderPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="border-b border-surface-border bg-surface-subtle/50">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:py-20">
          <div className="lg:sticky lg:top-24">
            <p className="text-xs font-bold uppercase tracking-widest text-brand">
              Price Builder
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-black md:text-6xl">
              Profitability starts at the SKU.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-neutral-muted">
              Price Builder unlocks price elasticity while protecting your
              profits. Model the dollar opportunity costs that basic COGS plus
              markup pricing leaves out.
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
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-black">
                    Free shipping, financing, and discounts are opportunity
                    costs at the unit level.
                  </p>
                  <p className="mt-1 text-sm text-neutral-muted">
                    Price Builder helps you include those costs before offers
                    start moving price.
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

          <PriceBuilderClient />
        </div>
      </section>
    </div>
  );
}
