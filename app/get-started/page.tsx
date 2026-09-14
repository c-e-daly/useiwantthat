import Link from "next/link";
import { ArrowRight, CheckCircle2, ShoppingBag } from "lucide-react";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { SHOPIFY_APP_URL, WOOCOMMERCE_SIGNUP_URL } from "@/lib/platforms";

export const metadata = buildPageMetadata({ title: "Get Started | I Want That!", description: "Choose your commerce platform and start using Vector.", path: "/get-started" });

const platforms = [
  { name: "WooCommerce", eyebrow: "Full Vector platform", description: "Create your Vector account, download the WooCommerce plugin, and generate the API key that activates it.", steps: ["Create your Vector account", "Download the WooCommerce plugin", "Create and connect your API key"], href: WOOCOMMERCE_SIGNUP_URL, cta: "Continue with WooCommerce" },
  { name: "Shopify", eyebrow: "Shopify app", description: "Install I Want That! from the Shopify App Store and connect it to your store.", steps: ["Open the Shopify App Store", "Install the app", "Complete setup in Shopify"], href: SHOPIFY_APP_URL, cta: "Continue to Shopify" },
];

export default function GetStartedPage() {
  return <div className="min-h-screen bg-white">
    <section className="border-b border-surface-border bg-surface-subtle/50 py-16 md:py-24"><div className="container mx-auto px-4 text-center"><p className="text-xs font-bold uppercase tracking-widest text-brand">Get started</p><h1 className="mx-auto mt-4 max-w-4xl text-4xl font-bold tracking-tight text-black md:text-6xl">Choose your commerce platform.</h1><p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-neutral-muted">We will take you to the right setup experience for your store.</p></div></section>
    <section className="py-14 md:py-20"><div className="container mx-auto grid max-w-5xl gap-6 px-4 md:grid-cols-2">{platforms.map((platform) => <article key={platform.name} className="flex flex-col rounded-askrami border border-surface-border bg-white p-8 shadow-sm"><div className="flex h-12 w-12 items-center justify-center rounded-askrami bg-brand/10 text-brand"><ShoppingBag className="h-6 w-6" aria-hidden="true" /></div><p className="mt-6 text-xs font-bold uppercase tracking-widest text-brand">{platform.eyebrow}</p><h2 className="mt-2 text-3xl font-bold tracking-tight text-black">{platform.name}</h2><p className="mt-4 leading-relaxed text-neutral-muted">{platform.description}</p><ul className="mt-6 space-y-3">{platform.steps.map((step) => <li key={step} className="flex gap-3 text-sm text-slate-700"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" /><span>{step}</span></li>)}</ul><Link href={platform.href} className="mt-8 inline-flex items-center justify-center gap-2 rounded-askrami bg-brand px-6 py-3 font-semibold text-white transition hover:bg-brand-deep">{platform.cta}<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></article>)}</div></section>
  </div>;
}

