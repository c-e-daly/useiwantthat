import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Search, ShoppingBag, Sparkles } from "lucide-react";
import { RamiAvatar } from "@/components/public/RamiAvatar";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Ask Rami | Your Personal AI Buying Agent",
  description:
    "Ask Rami helps consumers find products, make offers, track purchases, and shop with more control.",
  path: "/ask-rami",
});

const painPoints = [
  "Endless searching across sites",
  "Prices that change constantly",
  "Discounts that feel random",
  "Ads and algorithms trying to influence what you buy",
  "Time lost comparing, researching, deciding, and second-guessing",
];

const capabilities = [
  "Search for products",
  "Compare options",
  "Track items you care about",
  "Remember stores you like",
  "Understand your buying history",
  "Make smarter purchasing decisions over time",
];

const offerOutcomes = [
  "Accepted",
  "Declined",
  "Sent for review",
  "Countered with a new price or term",
];

const howItWorks = [
  {
    title: "Tell Rami what you want",
    description:
      "Search, paste a product link, or describe what you are looking for. Rami helps organize the request and turns your shopping intent into action.",
  },
  {
    title: "Set your price",
    description:
      "You decide what you are willing to pay based on budget, urgency, prior purchases, comparable products, or what the item is worth to you.",
  },
  {
    title: "Rami handles the offer",
    description:
      "When a participating store supports offers, Rami can help submit your offer and receive the seller's response.",
  },
  {
    title: "You decide what happens next",
    description:
      "Accept the deal, review a counteroffer, save the item for later, or move on. No pressure. No fake urgency.",
  },
];

const realLifeUses = [
  "Everyday purchases",
  "Gifts",
  "Holiday shopping",
  "Back-to-school planning",
  "Seasonal needs",
  "Replenishment products",
  "Items you want to track before buying",
  "Stores you already trust",
];

const historyItems = [
  "Products you purchased",
  "Offers you submitted",
  "Prices you negotiated",
  "Stores you bought from",
  "Items you may want again",
  "Products you considered but did not buy",
];

const buyingModes = [
  {
    mode: "Manual Mode",
    description:
      "You control the shopping process. You tell Rami what you want, where you want to shop, and what you are willing to pay.",
  },
  {
    mode: "Co-Pilot Mode",
    description:
      "Rami starts helping more actively with product suggestions, price tracking, shopping lists, and upcoming purchases.",
  },
  {
    mode: "Autopilot Mode",
    description:
      "Eventually, Rami will anticipate recurring needs, seasonal events, replenishment cycles, and household buying patterns.",
  },
];

const comparisonRows = [
  ["Stores set the price", "You can make an offer"],
  ["You wait for sales", "You set your terms"],
  ["Algorithms push products", "Rami works from your intent"],
  ["Shopping history benefits the seller", "Shopping history helps you buy better"],
  ["You compare everything manually", "Rami helps organize and act"],
  ["The seller has tools", "The buyer gets an agent"],
];

export default function AskRamiPage() {
  return (
    <div className="bg-white">
      <section className="relative overflow-hidden border-b border-surface-border bg-surface-subtle/50 py-16 md:py-24">
        <div className="absolute inset-0 bg-cgo-fibonacci opacity-10" />
        <div className="container relative mx-auto grid gap-12 px-4 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-brand/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-brand">
              <Image
                src="/ask-rami-icon.svg"
                alt=""
                width={16}
                height={16}
                className="h-4 w-4"
              />
              Meet Ask Rami
            </div>
            <h1 className="max-w-4xl text-5xl font-bold leading-[1.05] tracking-tight text-black md:text-7xl">
              Your personal AI buying agent.
            </h1>
            <p className="mt-7 max-w-2xl text-xl font-semibold leading-relaxed text-black">
              Most shopping tools are designed to sell to you. Ask Rami is
              built to buy for you.
            </p>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-neutral-muted">
              Rami works on your behalf: finding products, negotiating prices,
              tracking what you need, and helping you make better purchasing
              decisions without wasting time.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="https://app.useiwantthat.com"
                className="inline-flex items-center justify-center gap-2 rounded-askrami bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-deep"
              >
                Sign up
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#how-it-works"
                className="inline-flex items-center justify-center rounded-askrami border border-surface-border bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-surface-subtle"
              >
                See how it works
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-askrami border border-black/10 bg-black p-2 shadow-2xl">
              <div className="rounded-askrami border border-white/10 bg-white p-6">
                <div className="flex items-center justify-between gap-4 border-b border-surface-border pb-5">
                  <div className="flex items-center gap-4">
                    <RamiAvatar />
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-brand">
                        Rami is ready
                      </p>
                      <h2 className="mt-2 text-2xl font-bold tracking-tight text-black">
                        What do you want to buy?
                      </h2>
                    </div>
                  </div>
                </div>
                <div className="mt-5 space-y-3">
                  {[
                    ["Find", "A carry-on under $220 with a lifetime warranty"],
                    ["Offer", "I would buy today for $185"],
                    ["Track", "Holiday gifts and replenishment products"],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="rounded-askrami border border-surface-border bg-surface-subtle px-4 py-3"
                    >
                      <p className="text-xs font-bold uppercase tracking-widest text-brand">
                        {label}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-black">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto grid gap-10 px-4 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-brand">
              The problem
            </p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-black">
              Modern commerce is optimized for conversion, not for your
              outcome.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-neutral-muted">
              Ask Rami changes that by putting a buying agent on the consumer
              side of the transaction.
            </p>
          </div>
          <div className="grid gap-3">
            {painPoints.map((point) => (
              <div
                key={point}
                className="flex items-start gap-3 rounded-askrami border border-surface-border bg-white p-4 shadow-sm"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                <p className="font-semibold text-black">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-surface-border bg-black py-16 text-white md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-widest text-brand">
              What Rami does differently
            </p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-white">
              Instead of accepting the price, you set the terms.
            </h2>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {[
              {
                icon: Search,
                title: "A buyer's agent, not a seller's tool",
                items: capabilities,
              },
              {
                icon: ShoppingBag,
                title: "Make offers instead of waiting for sales",
                items: offerOutcomes,
              },
              {
                icon: Sparkles,
                title: "Save time where it matters",
                items: [
                  "Search",
                  "Compare",
                  "Avoid cart abandonment loops",
                  "Move from intent to action faster",
                ],
              },
            ].map(({ icon: Icon, title, items }) => (
              <div
                key={title}
                className="rounded-askrami border border-white/10 bg-white/5 p-6"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-askrami bg-brand/15 text-brand">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-xl font-bold tracking-tight text-white">
                  {title}
                </h3>
                <ul className="mt-5 space-y-2 text-sm leading-relaxed text-white/70">
                  {items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-widest text-brand">
              How it works
            </p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-black">
              You stay in control.
            </h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {howItWorks.map((step, index) => (
              <div
                key={step.title}
                className="rounded-askrami border border-surface-border bg-white p-6 shadow-sm"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
                  {index + 1}
                </div>
                <h3 className="mt-5 text-xl font-bold tracking-tight text-black">
                  {step.title}
                </h3>
                <p className="mt-3 leading-relaxed text-neutral-muted">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-surface-border bg-surface-subtle/50 py-16 md:py-20">
        <div className="container mx-auto grid gap-10 px-4 lg:grid-cols-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-brand">
              Built for real life
            </p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-black">
              Rami helps you manage how you buy over time.
            </h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {realLifeUses.map((item) => (
                <p
                  key={item}
                  className="rounded-askrami border border-surface-border bg-white px-4 py-3 text-sm font-semibold text-black"
                >
                  {item}
                </p>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-brand">
              Shopping memory
            </p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-black">
              Your buying history becomes useful.
            </h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {historyItems.map((item) => (
                <p
                  key={item}
                  className="rounded-askrami border border-surface-border bg-white px-4 py-3 text-sm font-semibold text-black"
                >
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-widest text-brand">
              Three modes of buying
            </p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-black">
              Ask Rami is designed to grow with you.
            </h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {buyingModes.map((mode) => (
              <div
                key={mode.mode}
                className="rounded-askrami border border-surface-border bg-white p-6 shadow-sm"
              >
                <h3 className="text-xl font-bold tracking-tight text-black">
                  {mode.mode}
                </h3>
                <p className="mt-3 leading-relaxed text-neutral-muted">
                  {mode.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black py-16 text-white md:py-20">
        <div className="container mx-auto grid gap-10 px-4 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-brand">
              Ask Rami vs. traditional shopping
            </p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-white">
              What if the buyer had an agent too?
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-white/70">
              Rami gives consumers a way to express demand, set terms, and shop
              with more leverage. It is not about chasing discounts. It is about
              making buying more efficient, more personal, and more aligned with
              what you actually want.
            </p>
          </div>
          <div className="overflow-hidden rounded-askrami border border-white/10">
            {comparisonRows.map(([traditional, rami]) => (
              <div
                key={traditional}
                className="grid gap-0 border-b border-white/10 last:border-b-0 md:grid-cols-2"
              >
                <div className="bg-white/5 p-4 text-sm text-white/65">
                  {traditional}
                </div>
                <div className="bg-brand/15 p-4 text-sm font-semibold text-white">
                  {rami}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-surface-border bg-surface-subtle/50 py-16">
        <div className="container mx-auto flex flex-col items-start justify-between gap-6 px-4 md:flex-row md:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-brand">
              Join the beta
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-black">
              Get your buying power back.
            </h2>
          </div>
          <Link
            href="https://app.useiwantthat.com"
            className="inline-flex items-center justify-center gap-2 rounded-askrami bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-deep"
          >
            Sign up
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
