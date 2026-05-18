import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { GoodnessOfFitClient } from "@/components/marketing/GoodnessOfFitClient";
import { buildPageMetadata } from "@/lib/seo/metadata";

const DEMO_URL = "https://meetings.hubspot.com/chris-e-daly/customer-demo";

export const metadata = buildPageMetadata({
  title: "Negotiated Commerce Fit Assessment | I Want That!",
  description:
    "Assess whether your store is ready for customer generated offers, margin-protected counters, customer portfolios, and negotiated commerce.",
  path: "/tools/goodness-of-fit",
  image: "/vector-icon-wordmark-logo.png",
  twitterTitle: "Negotiated Commerce Fit Assessment",
  twitterDescription:
    "Find out whether your store is operationally ready for customer generated offers and negotiated commerce.",
});

export default function GoodnessOfFitPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="border-b border-surface-border bg-surface-subtle/50">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:py-20">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-brand">
              Negotiated commerce fit
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-black md:text-6xl">
              Is your store ready for customer generated offers?
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-neutral-muted">
              Customer generated offers work best when a shop understands price
              elasticity, margin protection, customer portfolios, and the value
              hidden inside buyers who do not convert at the current price.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={DEMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-askrami bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-deep"
              >
                Talk through results
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center rounded-askrami border border-surface-border bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-surface-subtle"
              >
                View pricing
              </Link>
            </div>
          </div>

          <GoodnessOfFitClient />
        </div>
      </section>
    </div>
  );
}
