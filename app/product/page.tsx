import type { Metadata } from "next";
import Link from "next/link";
import { BarChart3, Bot, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Prophect from I Want That! | Shopify App + Price Builder",
  description:
    "Install the I Want That! Shopify app to run Customer Generated Offers, Price Builder elasticity controls, and agentic offer processing.",
};

const SHOPIFY_APP_URL = "https://apps.shopify.com/iwtapp-shop";
const DEMO_URL = "https://meetings.hubspot.com/chris-e-daly/customer-demo";

export default function SellersPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="border-b border-slate-200 bg-slate-950 text-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-16 md:grid-cols-2 md:py-24">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-400">For Sellers</p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
              Embedded Shopify app for dynamic pricing and agentic offers.
            </h1>
            <p className="mt-5 max-w-xl text-slate-300">
              Run Customer Generated Offers directly in Shopify. Use Price Builder to protect margin while flexing price by product, inventory, and demand.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={SHOPIFY_APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-orange-600 px-6 py-3 text-sm font-semibold text-white hover:bg-orange-700"
              >
                Install on Shopify
              </Link>
              <Link
                href={DEMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-100 hover:bg-slate-800"
              >
                Book Seller Demo
              </Link>
            </div>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Why sellers use it</p>
            <ul className="mt-4 space-y-3 text-sm text-slate-200">
              <li>Convert exiting traffic with offer-driven checkout paths.</li>
              <li>Model price elasticity using live willingness-to-pay data.</li>
              <li>Accept, counter, or decline automatically with guardrails.</li>
              <li>Handle human and AI-agent offers in one decision engine.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-5 md:grid-cols-3">
          <article id="price-builder" className="scroll-mt-24 rounded-xl border border-slate-200 p-6">
            <BarChart3 className="h-5 w-5 text-orange-600" />
            <h2 className="mt-3 text-xl font-semibold text-slate-900">Price Builder</h2>
            <p className="mt-2 text-sm text-slate-600">
              Configure ranges and thresholds that adapt to demand while maintaining your profitability floor.
            </p>
          </article>
          <article className="rounded-xl border border-slate-200 p-6">
            <ShieldCheck className="h-5 w-5 text-orange-600" />
            <h2 className="mt-3 text-xl font-semibold text-slate-900">Elasticity with guardrails</h2>
            <p className="mt-2 text-sm text-slate-600">
              Capture willingness-to-pay signals and convert more buyers without blanket markdowns.
            </p>
          </article>
          <article className="rounded-xl border border-slate-200 p-6">
            <Bot className="h-5 w-5 text-orange-600" />
            <h2 className="mt-3 text-xl font-semibold text-slate-900">Agentic offer intake</h2>
            <p className="mt-2 text-sm text-slate-600">
              Process inbound offers from AI shopping agents through the same rules engine as human shoppers.
            </p>
          </article>
        </div>
      </section>

      <section className="bg-slate-100 py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Start with the embedded Shopify app</h2>
          <p className="mt-3 text-slate-600">Deploy quickly, test pricing hypotheses, and scale elasticity programs by campaign.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href={SHOPIFY_APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-orange-600 px-7 py-3 text-sm font-semibold text-white hover:bg-orange-700"
            >
              Install App
            </Link>
            <Link
              href={DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-slate-300 bg-white px-7 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Talk to Sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
