import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ClipboardList,
  DollarSign,
  LogOut,
  Megaphone,
  MousePointerClick,
  RefreshCw,
  ShieldCheck,
  Tags,
} from "lucide-react";
import { playbooks } from "@/lib/playbooks";

const SHOPIFY_APP_URL = "https://apps.shopify.com/iwtapp-shop";
const DEMO_URL = "https://meetings.hubspot.com/chris-e-daly/customer-demo";
const CAC_CALCULATOR_URL = "/tools/cac-calculator";

export const metadata: Metadata = {
  title: "Vector | Offer Intelligence & Decision Platform",
  description:
    "Vector helps Shopify merchants convert existing traffic with customer offers, automated counters, margin floors, programs, remarketing, and exit intent.",
  openGraph: {
    title: "Vector - Offer Intelligence & Decision Platform",
    description:
      "Turn existing Shopify traffic into revenue with intelligent offers, counter offers, Price Builder, programs, remarketing, and exit intent.",
    url: "https://useiwantthat.com/product",
    type: "website",
  },
};

const problemPoints = [
  {
    icon: DollarSign,
    title: "Run ads",
    body: "CAC goes up, and the next sale starts with another tax on margin.",
  },
  {
    icon: Tags,
    title: "Run a sale",
    body: "Margin goes down, and full-price buyers learn to wait.",
  },
  {
    icon: ShieldCheck,
    title: "Do nothing",
    body: "Inventory sits, traffic leaves, and cash gets tighter.",
  },
];

const featureSections = [
  {
    icon: MousePointerClick,
    href: playbooks.cac.href,
    eyebrow: "Offers",
    title: "Let customers tell you what they will pay.",
    body: "Stop guessing at the price that converts. When a customer makes an offer, Vector evaluates it against your margin floors and financial goals in real time.",
    detail:
      "Accept the right offers automatically. Decline the rest without lifting a finger. No spreadsheets. No daily decisions. Just sales that protect your business.",
  },
  {
    icon: RefreshCw,
    href: playbooks.counterOffer.href,
    eyebrow: "Counter Offers",
    title: "Close the gap, keep the margin.",
    body: "A customer offers $42. Your floor is $51. Without Vector, they leave. With Vector, they get a counter at $54 and stay in motion.",
    detail:
      "Every negotiation you were losing to a bounce becomes a conversion at a price you chose.",
  },
  {
    icon: BarChart3,
    href: playbooks.clearance.href,
    eyebrow: "Price Builder",
    title: "Know your floor before any offer arrives.",
    body: "Free shipping is not free. Discounts are not free. Vector makes every cost explicit: COGS, shipping, handling, and platform fees.",
    detail:
      "Set your floor once and avoid accidentally accepting a losing deal again.",
  },
  {
    icon: ClipboardList,
    href: playbooks.programs.href,
    eyebrow: "Programs",
    title: "Align your offers to your calendar.",
    body: "BFCM is coming. Q1 is slow. A Meta campaign starts next week. Programs control how aggressive Vector gets and when.",
    detail:
      "Widen acceptance thresholds before a push. Tighten them when demand is strong. Your offer strategy adapts to your business.",
  },
  {
    icon: Megaphone,
    href: playbooks.remarketing.href,
    eyebrow: "Remarketing",
    title: "Re-engage without paying for the click twice.",
    body: "You already paid to bring them to your store. When they do not buy, Vector gives them a reason to come back that is not another coupon code.",
    detail:
      "A personalized offer invitation brings lapsed visitors back on their terms. You get the conversion. Meta does not get the retargeting fee.",
  },
  {
    icon: LogOut,
    href: playbooks.exitIntent.href,
    eyebrow: "Exit Intent",
    title: "Do not capture emails. Capture orders.",
    body: "Every exit popup asks for an email address. Vector asks for something more valuable: what would you actually pay?",
    detail:
      "A visitor who names a price is a buyer. Capture purchase intent before it disappears.",
  },
];

const offerRows = [
  {
    label: "Visitor acquisition cost",
    value: "$5-$15",
    tone: "text-amber-300",
  },
  {
    label: "Typical visitor loss",
    value: "98%",
    tone: "text-rose-300",
  },
  {
    label: "Current offer",
    value: "$54",
    tone: "text-white",
  },
  {
    label: "Decision",
    value: "Auto-counter",
    tone: "text-emerald-300",
  },
];

const ctaLinks = [
  {
    href: DEMO_URL,
    label: "Get a demo",
    description: "Walk through Vector with your store economics.",
    external: true,
  },
  {
    href: SHOPIFY_APP_URL,
    label: "Install on Shopify",
    description: "Start a 30-day free trial from the Shopify App Store.",
    external: true,
  },
  {
    href: CAC_CALCULATOR_URL,
    label: "Run the CAC calculator",
    description: "Find out how much money your traffic is leaving on the table.",
    external: false,
  },
];

export default function ProductPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="relative overflow-hidden border-b border-surface-border pt-20 pb-16 md:pt-28 md:pb-24">
        <div className="absolute inset-0 bg-cgo-fibonacci opacity-10 pointer-events-none" />

        <div className="container relative mx-auto grid gap-12 px-4 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <Image
              src="/vector-icon-wordmark-logo.png"
              alt="Vector"
              width={250}
              height={100}
              priority
              className="mb-6 h-auto w-44 md:w-56"
            />
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-brand/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-brand">
              Vector for Shopify
            </div>
            <h1 className="max-w-5xl text-5xl font-bold leading-[1.05] tracking-tighter text-black md:text-7xl">
              Vector is your offer intelligence and decision platform.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-neutral-muted md:text-xl">
              You spend $5 to $15 to get a visitor to your store. Then 98% of
              them leave. Vector turns your existing traffic into revenue
              without another ad dollar.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href={DEMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-askrami bg-brand px-8 py-4 text-base font-semibold text-white transition hover:bg-brand-deep"
              >
                Get a demo
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={SHOPIFY_APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-askrami border border-surface-border bg-white px-8 py-4 text-base font-semibold text-black transition hover:bg-surface-subtle"
              >
                Install on Shopify
              </Link>
              <Link
                href={CAC_CALCULATOR_URL}
                className="inline-flex items-center justify-center rounded-askrami border border-surface-border bg-surface-subtle px-8 py-4 text-base font-semibold text-black transition hover:bg-white"
              >
                Calculate lost revenue
              </Link>
            </div>

            <p className="mt-4 text-sm text-neutral-muted">
              Customer offers, counters, margin floors, programs, remarketing,
              and exit intent in one conversion engine.
            </p>
          </div>

          <div className="relative">
            <div className="rounded-askrami border border-black/10 bg-black p-2 shadow-2xl">
              <div className="rounded-askrami border border-white/10 bg-white/5 p-5 text-white">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-brand">
                      Live Vector decision
                    </p>
                    <p className="mt-2 text-2xl font-bold tracking-tight text-white">
                      Counter offer sent
                    </p>
                  </div>
                  <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-bold uppercase tracking-widest text-emerald-300">
                    Margin protected
                  </span>
                </div>

                <div className="mt-5 space-y-3">
                  {offerRows.map((row) => (
                    <div
                      key={row.label}
                      className="flex items-center justify-between rounded-askrami bg-white/5 px-4 py-3"
                    >
                      <span className="text-sm text-white/55">{row.label}</span>
                      <span className={`text-sm font-bold ${row.tone}`}>
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-5 rounded-askrami border border-brand/30 bg-brand/15 p-4">
                  <p className="text-sm font-semibold text-white">
                    Floor: $51. Customer offer: $42.
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">
                    Vector sends a $54 counter instead of losing the visitor to
                    a bounce or training them to wait for a blanket sale.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-black py-20 text-white md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-widest text-brand">
              The math is broken
            </p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
              Every growth lever you reach for makes the problem worse.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-white/70">
              Fixed prices do not work for customers who need a nudge. Blanket
              discounts do not work for a business that needs to survive.
              Vector finds the price where a shopper would buy automatically.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {problemPoints.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="rounded-askrami border border-white/10 bg-white/5 p-6"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-askrami bg-brand/15 text-brand">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold text-white">{title}</h3>
                <p className="mt-3 leading-relaxed text-white/70">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-widest text-brand">
              Vector
            </p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-black md:text-5xl">
              Six levers that convert traffic before you buy it again.
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {featureSections.map(({ icon: Icon, href, eyebrow, title, body, detail }) => (
              <Link
                key={eyebrow}
                href={href}
                className="group rounded-askrami border border-surface-border bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-card"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-askrami bg-brand/10 text-brand">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="mt-6 text-xs font-bold uppercase tracking-widest text-brand">
                  {eyebrow}
                </p>
                <h3 className="mt-3 text-2xl font-bold tracking-tight text-black">
                  {title}
                </h3>
                <p className="mt-4 leading-relaxed text-neutral-muted">{body}</p>
                <p className="mt-4 leading-relaxed text-neutral-muted">{detail}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand">
                  View playbook
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-surface-border bg-surface-subtle/50 py-20 md:py-24">
        <div className="container mx-auto grid gap-10 px-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-brand">
              Find the leak
            </p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-black md:text-5xl">
              Your store already has everything it needs to grow.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-neutral-muted">
              Vector unlocks the revenue already sitting inside your traffic.
              Use the CAC calculator to estimate how much paid and organic
              traffic is leaving without converting.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={CAC_CALCULATOR_URL}
                className="inline-flex items-center justify-center gap-2 rounded-askrami bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-deep"
              >
                Find out what you are leaving on the table
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={DEMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-askrami border border-surface-border bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white"
              >
                Get a demo
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              ["$5-$15", "Cost to bring a visitor in"],
              ["98%", "Visitors who leave without buying"],
              ["1", "Offer engine to convert them"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="rounded-askrami border border-surface-border bg-white p-6 text-center shadow-sm"
              >
                <p className="text-4xl font-bold tracking-tight text-brand">
                  {value}
                </p>
                <p className="mt-3 text-sm font-semibold text-neutral-muted">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black py-20 text-white md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-brand">
              Start converting existing traffic
            </p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
              Stop paying for the same shopper twice.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/70">
              Install Vector, book a walkthrough, or calculate the revenue
              your current traffic is leaving behind.
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-5xl gap-4 md:grid-cols-3">
            {ctaLinks.map((cta) => (
              <Link
                key={cta.label}
                href={cta.href}
                target={cta.external ? "_blank" : undefined}
                rel={cta.external ? "noopener noreferrer" : undefined}
                className="group rounded-askrami border border-white/10 bg-white/5 p-6 text-left transition hover:bg-white/10"
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-xl font-bold text-white">{cta.label}</h3>
                  <ArrowRight className="h-5 w-5 shrink-0 text-brand transition group-hover:translate-x-1" />
                </div>
                <p className="mt-3 text-sm leading-relaxed text-white/65">
                  {cta.description}
                </p>
              </Link>
            ))}
          </div>

          <div className="mx-auto mt-8 flex max-w-3xl items-start gap-3 rounded-askrami border border-brand/30 bg-brand/15 p-5 text-left">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
            <p className="text-sm leading-relaxed text-white/75">
              Vector works with your Shopify store and your existing traffic.
              The goal is simple: convert more shoppers without another ad
              dollar or another blanket discount.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
