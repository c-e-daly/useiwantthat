import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Bot,
  Check,
  Gauge,
  Layers3,
  Minus,
  MousePointerClick,
  RefreshCw,
  Sparkles,
  Tags,
} from "lucide-react";
import { buildPageMetadata } from "@/lib/seo/metadata";

const SHOPIFY_APP_URL = "https://apps.shopify.com/iwtapp-shop";
const DEMO_URL = "https://meetings.hubspot.com/chris-e-daly/customer-demo";

export const metadata = buildPageMetadata({
  title: "Pricing | I Want That!",
  description:
    "Pricing plans for Vector customer generated offers, negotiated commerce programs, counter offers, analytics, and agentic commerce.",
  path: "/pricing",
});

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "Start without fixed software cost.",
    offerLimit: "100 monthly / 1,200 annual offers",
    cta: "Start on Shopify",
    href: SHOPIFY_APP_URL,
    external: true,
  },
  {
    name: "Pro",
    price: "$30",
    annual: "$300 annually",
    period: "For shops proving customer generated offers.",
    offerLimit: "1,000 monthly / 12,000 annual offers",
    cta: "Start on Shopify",
    href: SHOPIFY_APP_URL,
    external: true,
  },
  {
    name: "Scale",
    price: "$200",
    annual: "$2,000 annually",
    period: "For active negotiated commerce programs.",
    offerLimit: "5,000 monthly / 60,000 annual offers",
    cta: "Book a demo",
    href: DEMO_URL,
    external: true,
    highlighted: true,
  },
  {
    name: "Agentic",
    price: "$500",
    annual: "$5,000 annually",
    period: "For unlimited agentic offer intelligence.",
    offerLimit: "Unlimited offers",
    cta: "Book a demo",
    href: DEMO_URL,
    external: true,
  },
];

const planFeatureRows = [
  ["Programs", true, true, true, true],
  ["Storefront Offers", true, true, true, true],
  ["AI Agentic Offers", true, true, true, true],
  ["Price Builder", "Single product", "Multiple products", "Multiple products", "Multiple products"],
  ["Counter Offers", false, true, true, true],
  ["Automated Counters", false, false, true, true],
  ["Real Time Offer Analytics", false, false, true, true],
  ["Campaigns", false, false, true, true],
  ["Agentic Counter Offers", false, false, false, true],
] as const;

const featureDetails = [
  {
    icon: Layers3,
    title: "Programs",
    body: "Align your inbound customer generated offer strategy to your outbound strategy. Set accept and decline rates, discount prefixes, expiry minutes, and discount stacking.",
  },
  {
    icon: MousePointerClick,
    title: "Storefront Offers",
    body: "Place the Wanna Make A Deal button strategically across your store. Use product page templates or set it sitewide while keeping control at all times.",
  },
  {
    icon: Bot,
    title: "AI Agentic Offers",
    body: "Accept AI agentic offers through Vector so you can compete for agent-driven demand and win more customers using customer generated offers.",
  },
  {
    icon: Tags,
    title: "Price Builder",
    body: "Deploy allowances that give your shop the tools and levers of conversion for a broader selection of customers while shielding profit.",
  },
  {
    icon: RefreshCw,
    title: "Counter Offers",
    body: "Vector is a negotiation platform, not a discount platform. Counter offers let you structure what you want and relay it back to the customer in real time or over a few days.",
  },
  {
    icon: Sparkles,
    title: "Automated Counters",
    body: "Attach counter offers to programs and automate decisions around margin performance, markup performance, inventory movement, or customer value creation.",
  },
  {
    icon: Gauge,
    title: "Real Time Offer Analytics",
    body: "Analyze every offer and counter offer in retail time with a simple gauge for the drivers of profit and the efficacy of allowances.",
  },
  {
    icon: BarChart3,
    title: "Campaigns",
    body: "Layer programs for different customer portfolios, business objectives, collections, and categories across acquisition, reactivation, and clearance.",
  },
  {
    icon: Bot,
    title: "Agentic Counter Offers",
    body: "Use your private program, campaign, offer, counter offer, and customer portfolio data to power planning goals, demand forecasts, and automated real-time counters.",
  },
];

function renderFeatureValue(value: boolean | string) {
  if (value === true) {
    return (
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
        <Check className="h-4 w-4" aria-label="Included" />
      </span>
    );
  }

  if (value === false) {
    return (
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-slate-400">
        <Minus className="h-4 w-4" aria-label="Not included" />
      </span>
    );
  }

  return <span className="text-sm font-medium text-slate-700">{value}</span>;
}

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="border-b border-surface-border bg-surface-subtle/50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <p className="text-xs font-bold uppercase tracking-widest text-brand">
            Vector pricing
          </p>
          <h1 className="mt-4 max-w-5xl text-4xl font-bold leading-[1.05] tracking-tight text-black md:text-6xl">
            Pricing to Scale Your Profits not Your Expenses
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-neutral-muted md:text-xl">
            Scale means moving more volume over fixed assets. Vector is built by
            retailers for retailers, with pricing designed to help you expand
            profitable negotiated commerce without scaling expenses at the same
            pace.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href={SHOPIFY_APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-askrami bg-brand px-8 py-4 text-base font-semibold text-white transition hover:bg-brand-deep"
            >
              Start on Shopify
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-askrami border border-surface-border bg-white px-8 py-4 text-base font-semibold text-black transition hover:bg-surface-subtle"
            >
              Talk through pricing
            </Link>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-5 lg:grid-cols-4">
            {plans.map((plan) => (
              <article
                key={plan.name}
                className={`rounded-askrami border bg-white p-6 shadow-sm ${
                  plan.highlighted
                    ? "border-brand shadow-card"
                    : "border-surface-border"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-2xl font-bold tracking-tight text-black">
                    {plan.name}
                  </h2>
                  {plan.highlighted ? (
                    <span className="rounded-full bg-brand/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-brand">
                      Popular
                    </span>
                  ) : null}
                </div>
                <div className="mt-6">
                  <span className="text-4xl font-bold tracking-tight text-black">
                    {plan.price}
                  </span>
                  {plan.price !== "$0" ? (
                    <span className="ml-1 text-sm text-neutral-muted">
                      /mo
                    </span>
                  ) : null}
                </div>
                {plan.annual ? (
                  <p className="mt-2 text-sm font-medium text-slate-600">
                    {plan.annual}
                  </p>
                ) : null}
                <p className="mt-4 min-h-12 leading-relaxed text-neutral-muted">
                  {plan.period}
                </p>
                <p className="mt-5 rounded-askrami bg-surface-subtle px-4 py-3 text-sm font-semibold text-slate-800">
                  {plan.offerLimit}
                </p>
                <Link
                  href={plan.href}
                  target={plan.external ? "_blank" : undefined}
                  rel={plan.external ? "noopener noreferrer" : undefined}
                  className={`mt-6 inline-flex w-full items-center justify-center gap-2 rounded-askrami px-5 py-3 text-sm font-semibold transition ${
                    plan.highlighted
                      ? "bg-brand text-white hover:bg-brand-deep"
                      : "border border-surface-border bg-white text-black hover:bg-surface-subtle"
                  }`}
                >
                  {plan.cta}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-surface-border bg-surface-subtle/40 py-14 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mb-8 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-widest text-brand">
              Plan comparison
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-black md:text-4xl">
              Choose the level of negotiation your shop is ready to run.
            </h2>
          </div>

          <div className="overflow-x-auto rounded-askrami border border-surface-border bg-white shadow-sm">
            <table className="min-w-[820px] w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-surface-border bg-slate-50">
                  <th className="px-5 py-4 text-sm font-bold text-slate-900">
                    Feature
                  </th>
                  {plans.map((plan) => (
                    <th
                      key={plan.name}
                      className="px-5 py-4 text-sm font-bold text-slate-900"
                    >
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {planFeatureRows.map(([feature, free, pro, scale, agentic]) => (
                  <tr key={feature} className="border-b border-surface-border last:border-b-0">
                    <th className="px-5 py-4 text-sm font-semibold text-slate-900">
                      {feature}
                    </th>
                    {[free, pro, scale, agentic].map((value, index) => (
                      <td key={`${feature}-${index}`} className="px-5 py-4">
                        {renderFeatureValue(value)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mb-10 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-widest text-brand">
              What is included
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-black md:text-4xl">
              Tools for customer generated offers, counters, and agentic demand.
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {featureDetails.map(({ icon: Icon, title, body }) => (
              <article
                key={title}
                className="rounded-askrami border border-surface-border bg-white p-6 shadow-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-askrami bg-brand/10 text-brand">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-xl font-bold tracking-tight text-black">
                  {title}
                </h3>
                <p className="mt-3 leading-relaxed text-neutral-muted">
                  {body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
