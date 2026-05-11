import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "About | I Want That!",
  description:
    "I Want That! was built by a retailer for retailers to help sellers convert more buyers and grow profitably.",
};

const buyerSegments = [
  {
    share: "20%",
    title: "Pay full markup",
    description: "Time is more valuable than a discount.",
  },
  {
    share: "40%",
    title: "Pay 80% of markup",
    description: "They take deals when they can get them.",
  },
  {
    share: "40%",
    title: "Cannot buy without a discount",
    description: "You are simply out of reach from them.",
  },
];

const operatingPrinciples = [
  "Price flexibility should protect profit, not erase it.",
  "Customer offers reveal price points better than guessing does.",
  "Sellers should not pay a percentage tax on every dollar of growth.",
  "Consumers should have more power, and sellers should keep more profit.",
];

export default function AboutPage() {
  return (
    <div className="bg-white">
      <section className="border-b border-surface-border bg-surface-subtle/50 py-16 md:py-24">
        <div className="container mx-auto grid gap-10 px-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-brand">
              About I Want That!
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-[1.05] tracking-tight text-black md:text-6xl">
              Built by a retailer for retailers.
            </h1>
          </div>
          <p className="max-w-3xl text-lg leading-relaxed text-neutral-muted md:text-xl">
            I started working with retailers in 1998. I ran database marketing
            operations for a $17 billion retail conglomerate: 12 retail brands,
            2 billion SKU item transactions, and 85 million consumers. You learn
            a few things along the way.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-widest text-brand">
              Price elasticity
            </p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-black">
              The insight was not the buyer split. It was how to profit from
              all of them.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-neutral-muted">
              Billion dollar brands use allowances in their pricing, a
              deliberate structure to facilitate scaling. Allowances create the
              room to flex terms and price points for a wider array of buyers,
              producing higher unit volume at lower prices while still being
              profitable.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {buyerSegments.map((segment) => (
              <div
                key={segment.title}
                className="rounded-askrami border border-surface-border bg-white p-6 shadow-sm"
              >
                <p className="text-5xl font-bold tracking-tight text-brand">
                  {segment.share}
                </p>
                <h3 className="mt-5 text-xl font-bold tracking-tight text-black">
                  {segment.title}
                </h3>
                <p className="mt-3 leading-relaxed text-neutral-muted">
                  {segment.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-surface-border bg-black py-16 text-white md:py-20">
        <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-brand">
              The retail model
            </p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-white">
              Direct-to-consumer retail is rigged against sellers who scale.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-white/70">
              Everyone wants a percent of your sales. When you scale up, they
              share in the growth. But what really happens is your costs scale
              up and offset your revenues.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-white/70">
              We do not do that. Ever. We use flat recurring subscriptions so
              you can scale millions of dollars over small, smart investments.
            </p>
          </div>

          <div className="rounded-askrami border border-white/10 bg-white/5 p-6">
            <p className="text-xs font-bold uppercase tracking-widest text-brand">
              Operating principles
            </p>
            <div className="mt-6 space-y-4">
              {operatingPrinciples.map((principle) => (
                <div key={principle} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                  <p className="leading-relaxed text-white/80">{principle}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto grid gap-10 px-4 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-brand">
              The origin
            </p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-black">
              Make an offer worked because the customer knew the best offer for
              them.
            </h2>
          </div>
          <div className="space-y-5 text-lg leading-relaxed text-neutral-muted">
            <p>
              My retail baby was Bryden Road, for people who work from home,
              accessories and decor. Ten years before its time. I shut it down
              when my consulting took over my life.
            </p>
            <p>
              When I sold my merchandise on eBay, I made higher margins with
              Make an Offer than I did guessing what a customer would take. The
              person who knows the best offer for them is them.
            </p>
            <p>
              Enter I Want That! A fun way to engage customers, have them make
              offers to buy their carts, and reveal their price points and unit
              volumes along the way.
            </p>
            <p className="font-semibold text-black">
              I am on a journey to give power to consumers and profits to
              sellers. Let&apos;s make some deals.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-surface-border bg-surface-subtle/50 py-16">
        <div className="container mx-auto flex flex-col items-start justify-between gap-6 px-4 md:flex-row md:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-brand">
              Convert more buyers
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-black">
              Stop leaving money on the table.
            </h2>
          </div>
          <Link
            href="/product"
            className="inline-flex items-center justify-center gap-2 rounded-askrami bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-deep"
          >
            See Vector
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
