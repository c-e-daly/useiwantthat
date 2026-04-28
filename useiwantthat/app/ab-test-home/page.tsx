import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  CheckCircle,
  DollarSign,
  Target,
  TrendingUp,
} from "lucide-react";
import { CacCalculatorSection } from "./CacCalculatorSection";

export const metadata: Metadata = {
  title: "I Want That! | useiwantthat.com",
};

const liveOffers = [
  {
    initials: "JM",
    initialsClassName: "bg-brand/10 text-brand",
    name: "Jamie M.",
    product: "Merino Wool Sweater - Navy",
    amount: "$68",
    badge: "Auto-accepted",
    badgeClassName: "bg-emerald-50 text-emerald-700",
  },
  {
    initials: "GPT",
    initialsClassName: "bg-blue-50 text-blue-700",
    name: "ChatGPT agent",
    product: "Winter Jacket - Size L",
    amount: "$142",
    badge: "Agent offer",
    badgeClassName: "bg-blue-50 text-blue-700",
  },
  {
    initials: "SR",
    initialsClassName: "bg-brand/10 text-brand",
    name: "Sarah R.",
    product: "4-pack Clearance Bundle",
    amount: "$31 -> $38",
    badge: "Counter sent",
    badgeClassName: "bg-amber-50 text-amber-700",
  },
];

const pressurePoints = [
  {
    icon: DollarSign,
    title: "You need cash now",
    body:
      "Blanket markdowns destroy margin. CGO lets you set a floor so customers offer above it and cash moves today.",
  },
  {
    icon: TrendingUp,
    title: "Inventory will not move",
    body:
      "Turn clearance into a negotiation instead of a fire sale and learn what customers were actually willing to pay.",
  },
  {
    icon: Target,
    title: "Paid acquisition is expensive",
    body:
      "Convert traffic you already paid for before it leaves instead of buying the same customer again through ads.",
  },
];

const segments = [
  {
    label: "Growth tier",
    range: "$100K - $500K / year",
    sublabel: "~2 million Shopify stores",
    hook: `"I'm spending on Meta and my CAC is killing me."`,
    points: [
      "Convert traffic you already paid for before it leaves",
      "Turn clearance into negotiation, not loss",
      "Recover carts with pre-loaded offer links",
      "Set floors and automate 2-second decisions",
    ],
    featured: false,
  },
  {
    label: "Scale tier",
    range: "$500K - $5M / year",
    sublabel: "~100,000 Shopify stores",
    hook: `"Traffic is up. Conversion isn't moving. LTV is flat."`,
    points: [
      "Use Price Builder as a profit shield",
      "Run campaign and program strategies by season",
      "Accept agent-submitted offers with margin protection",
      "Learn elasticity from real offer behavior",
    ],
    featured: true,
  },
];

const features = [
  {
    number: "01",
    title: "Campaigns",
    body:
      "Group your offer programs into events, seasons, and occasions with thresholds, expiry windows, and decline floors.",
  },
  {
    number: "02",
    title: "Price Builder",
    body:
      "Flex pricing to a wider audience without moving your floor or training your best customers to wait for discounts.",
  },
  {
    number: "03",
    title: "Counter Offers",
    body:
      "Respond automatically when an offer misses your threshold so you do not leave margin on the table.",
  },
  {
    number: "04",
    title: "Remarketing",
    body:
      "Use one parameter in abandonment emails and ads to land shoppers directly into a pre-loaded offer flow.",
  },
  {
    number: "05",
    title: "Analytics",
    body:
      "See offer win and loss behavior by product, campaign, and program so pricing decisions are based on real demand.",
  },
  {
    number: "06",
    title: "Agent Commerce",
    body:
      "Accept inbound offers from ChatGPT, Gemini, and Copilot through the same rule engine with no extra platform fee.",
    highlighted: true,
  },
];

export default function AbTestHomePage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="relative overflow-hidden border-b border-surface-border pt-20 pb-16 md:pt-32 md:pb-24">
        <div className="absolute inset-0 bg-cgo-fibonacci opacity-10 pointer-events-none" />

        <div className="container relative mx-auto px-4 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-brand/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-brand">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
            </span>
            Customer Generated Offers - now on Shopify
          </div>

          <h1 className="mx-auto max-w-5xl text-5xl font-bold leading-[1.05] tracking-tighter text-black md:text-7xl">
            Stop guessing what they&apos;ll pay.
            <br />
            <span className="text-brand">Let them tell you.</span>
          </h1>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-relaxed text-neutral-muted md:text-xl">
            Every visitor who leaves is a customer who almost bought. Customer
            Generated Offers turn that exit into a conversation and that
            conversation into cash.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="https://apps.shopify.com/iwtapp-shop"
              className="btn-primary w-full px-10 py-4 text-base text-center sm:w-auto"
            >
              Start 30-day free trial
            </Link>
            <Link
              href="https://meetings.hubspot.com/chris-e-daly/customer-demo"
              className="inline-flex w-full items-center justify-center rounded-askrami border border-surface-border px-10 py-4 text-base font-semibold text-black transition hover:bg-surface-subtle sm:w-auto"
            >
              Book a demo
            </Link>
          </div>

          <p className="mt-4 text-sm text-neutral-muted">
            $99/yr after trial • No coding required • Works with your existing
            Shopify store
          </p>

          <div className="mx-auto mt-20 max-w-5xl">
            <div className="relative rounded-askrami border border-black/10 bg-white p-2 shadow-2xl">
              <div className="flex items-center gap-1.5 rounded-t-[4px] border-b border-surface-border bg-surface-subtle/50 px-4 py-3">
                <div className="h-2.5 w-2.5 rounded-full bg-[#FF5F56]" />
                <div className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
                <div className="h-2.5 w-2.5 rounded-full bg-[#27C93F]" />
                <div className="ml-4 flex h-5 w-full max-w-md items-center rounded border border-surface-border bg-white px-3 text-[10px] text-neutral-400">
                  useiwantthat.com / live offer stream
                </div>
              </div>

              <div className="grid gap-0 overflow-hidden bg-white lg:grid-cols-[1.1fr_0.9fr]">
                <div className="border-b border-surface-border p-8 text-left lg:border-b-0 lg:border-r">
                  <p className="text-xs font-bold uppercase tracking-widest text-brand">
                    Live offer stream
                  </p>
                  <h2 className="mt-4 text-3xl font-bold tracking-tight text-black md:text-4xl">
                    A customer, an agent, and a counter-offer engine all using
                    the same rules.
                  </h2>
                  <p className="mt-4 max-w-xl text-base leading-relaxed text-neutral-muted">
                    Set the floor once. Let customers and agents tell you what
                    they will pay. Auto-accept, counter, or decline in seconds
                    without sacrificing margin.
                  </p>

                  <div className="mt-8 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-askrami border border-surface-border bg-surface-subtle p-5">
                      <p className="text-3xl font-bold tracking-tight text-brand">
                        2.1s
                      </p>
                      <p className="mt-1 text-xs font-bold uppercase tracking-widest text-neutral-muted">
                        Average decision time
                      </p>
                    </div>
                    <div className="rounded-askrami border border-surface-border bg-surface-subtle p-5">
                      <p className="text-3xl font-bold tracking-tight text-brand">
                        62%
                      </p>
                      <p className="mt-1 text-xs font-bold uppercase tracking-widest text-neutral-muted">
                        Offer conversion rate
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-surface-subtle/40 p-6 text-left">
                  <div className="rounded-askrami border border-surface-border bg-white p-5 shadow-sm">
                    {liveOffers.map((offer) => (
                      <div
                        key={`${offer.name}-${offer.product}`}
                        className="flex items-center gap-4 border-b border-surface-border py-4 last:border-b-0 last:pb-0 first:pt-0"
                      >
                        <div
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold ${offer.initialsClassName}`}
                        >
                          {offer.initials}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-black">
                            {offer.name}
                          </p>
                          <p className="text-sm text-neutral-muted">
                            {offer.product}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-black">
                            {offer.amount}
                          </p>
                          <span
                            className={`mt-1 inline-flex rounded-full px-2 py-1 text-[10px] font-bold uppercase tracking-wider ${offer.badgeClassName}`}
                          >
                            {offer.badge}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="absolute -bottom-6 -right-2 max-w-[240px] rounded-lg bg-black p-4 text-left text-white shadow-xl md:right-10 md:bottom-16">
                    <p className="text-sm font-semibold">Offer logic in motion</p>
                    <p className="mt-1 text-[12px] opacity-80">
                      Floors, counters, and agent-submitted offers all route
                      through one engine.
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-[10px] font-bold text-brand">
                        Margin protected
                      </span>
                      <span className="flex items-center gap-1 text-[10px] font-bold">
                        Live <ArrowRight size={12} />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-black py-24 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-widest text-brand">
              Why now
            </p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
              Three reasons shops like yours install I Want That! this week
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {pressurePoints.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="rounded-askrami border border-white/10 bg-white/5 p-6"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-askrami bg-brand/15 text-brand">
                  <Icon size={22} />
                </div>
                <h3 className="text-xl font-bold text-white">{title}</h3>
                <p className="mt-3 leading-relaxed text-white/70">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-widest text-brand">
              Who it&apos;s for
            </p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-black md:text-5xl">
              Two types of shops. Both running into the same problem.
            </h2>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {segments.map((segment) => (
              <div
                key={segment.label}
                className={`rounded-askrami border bg-white p-8 ${
                  segment.featured
                    ? "border-brand/30 shadow-lg"
                    : "border-surface-border"
                }`}
              >
                <p className="text-xs font-bold uppercase tracking-widest text-brand">
                  {segment.label}
                </p>
                <h3 className="mt-3 text-3xl font-bold tracking-tight text-black">
                  {segment.range}
                </h3>
                <p className="mt-2 text-sm text-neutral-muted">
                  {segment.sublabel}
                </p>
                <p className="mt-6 text-lg font-semibold italic text-black">
                  {segment.hook}
                </p>

                <div className="mt-8 space-y-4">
                  {segment.points.map((point) => (
                    <div key={point} className="flex items-start gap-3">
                      <CheckCircle
                        size={18}
                        className="mt-0.5 shrink-0 text-brand"
                      />
                      <p className="text-neutral-muted">{point}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CacCalculatorSection />

      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-widest text-brand">
              Platform
            </p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-black md:text-5xl">
              Every lever you need. None of the complexity you don&apos;t.
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.number}
                className={`rounded-askrami border p-6 ${
                  feature.highlighted
                    ? "border-brand/20 bg-brand/5"
                    : "border-surface-border bg-white"
                }`}
              >
                <p className="text-xs font-bold uppercase tracking-widest text-brand">
                  {feature.number} - {feature.title}
                </p>
                <p className="mt-4 text-lg font-bold leading-tight text-black">
                  {feature.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black py-24 text-white">
        <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-brand">
              Ask Rami + Agent Commerce
            </p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
              Commerce is getting a new front door.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-white/70">
              Your customers are already using ChatGPT, Gemini, and Copilot to
              shop. I Want That! makes sure those offers land in your store and
              get processed with the same rules, floors, and margin protection
              as any human buyer.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <span className="rounded-full border border-brand/30 bg-brand/20 px-4 py-2 text-sm font-semibold text-white">
                Ask Rami - no 4% agent fee
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75">
                ChatGPT offers
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75">
                Gemini offers
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75">
                Copilot offers
              </span>
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
            <div className="mb-5 text-xs font-bold uppercase tracking-widest text-white/40">
              Agent offer flow
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-600 text-white">
                  <Bot size={15} />
                </div>
                <div className="rounded-askrami bg-white/10 p-4 text-sm leading-relaxed text-white/80">
                  User wants a winter jacket, size L, budget $140. Found a
                  match at useiwantthat.com. Submitting offer: <strong>$128</strong>.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand text-white">
                  I
                </div>
                <div className="rounded-askrami bg-white/10 p-4 text-sm leading-relaxed text-white/80">
                  Offer received. Floor check passed. Counter rule not
                  triggered. <strong>Auto-accepting in 1.8 seconds.</strong>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-600 text-white">
                  <Bot size={15} />
                </div>
                <div className="rounded-askrami bg-white/10 p-4 text-sm leading-relaxed text-white/80">
                  Offer accepted. Checkout link returned to user.
                  <strong> Transaction complete.</strong>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-3 border-t border-white/10 pt-5 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-white/40">Platform fee paid</span>
                <span className="font-semibold text-amber-300">$0.00</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/40">Margin protected</span>
                <span className="font-semibold text-emerald-300">
                  Yes - floor respected
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto grid gap-10 px-4 lg:grid-cols-[340px_1fr] lg:items-start">
          <div className="rounded-[28px] border border-surface-border bg-white p-8 text-center shadow-sm">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-brand text-2xl font-bold text-white">
              CD
            </div>
            <h3 className="mt-4 text-2xl font-bold tracking-tight text-black">
              Chris Daly
            </h3>
            <p className="mt-2 text-sm text-neutral-muted">
              Founder, I Want That! • 25 years in retail
            </p>

            <div className="mt-6 space-y-2">
              {[
                "Victoria's Secret",
                "Abercrombie & Fitch",
                "Bath & Body Works",
                "40+ e-commerce brands",
              ].map((brand) => (
                <div
                  key={brand}
                  className="rounded-askrami bg-surface-subtle px-4 py-3 text-sm font-medium text-black"
                >
                  {brand}
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-brand">
              Why I built this
            </p>
            <h2 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight text-black md:text-5xl">
              I watched great brands destroy margin with lazy discounting. I
              had to fix it.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-neutral-muted">
              For 25 years I worked inside major retail brands and watched the
              same mistake repeat: sales slowed, someone panicked, and a 40%
              off sale went live. Units moved, but so did price integrity.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-neutral-muted">
              Most of those customers would have bought at 22% off. Or 15%.
              They just needed someone to ask. I built I Want That! to make
              that conversation possible for Shopify merchants without forcing
              them into permanent markdown behavior.
            </p>

            <Link
              href="https://theretailsellersmindset.substack.com"
              className="mt-8 inline-flex items-center gap-2 rounded-askrami border border-surface-border px-6 py-3 text-sm font-semibold text-black transition hover:bg-surface-subtle"
            >
              Read The Retail Seller&apos;s Mindset
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-black py-24 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight md:text-5xl">
            Your next customer is already on your site.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/70">
            Start a 30-day free trial. No credit card. No code. Cancel anytime.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="https://apps.shopify.com/iwtapp-shop"
              className="btn-primary bg-white px-12 py-4 text-lg text-black hover:bg-neutral-200"
            >
              Start on Shopify
            </Link>
            <Link
              href="https://meetings.hubspot.com/chris-e-daly/customer-demo"
              className="inline-flex items-center justify-center rounded-askrami border border-white/20 px-12 py-4 text-lg font-semibold text-white transition hover:bg-white/10"
            >
              Book a demo
            </Link>
          </div>

          <p className="mt-5 text-sm text-white/50">
            $99/yr after trial • Works with any Shopify store • 400,000+
            monthly active users
          </p>
        </div>
      </section>
    </div>
  );
}
