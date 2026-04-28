import type { Metadata } from "next";
import Link from "next/link";
import { MessageSquare, Search, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Consumers | Ask Rami",
  description:
    "Discover deals with Ask Rami and get matched to products from merchants using I Want That!",
};

export default function ConsumersPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-600">For Consumers</p>
          <h1 className="mt-3 max-w-4xl text-4xl font-bold tracking-tight text-slate-900 md:text-6xl">
            Ask Rami helps you find better deals faster.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-slate-600">
            Tell Ask Rami what you want, budget, and size preferences. It finds matching offers from participating stores and routes you to checkout.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="https://app.useiwantthat.com"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-orange-600 px-6 py-3 text-sm font-semibold text-white hover:bg-orange-700"
            >
              Launch Ask Rami
            </Link>
            <Link href="/blog" className="rounded-lg border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100">
              Read Buyer Guides
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-5 md:grid-cols-3">
          <article className="rounded-xl border border-slate-200 bg-white p-6">
            <Search className="h-5 w-5 text-orange-600" />
            <h2 className="mt-3 text-xl font-semibold text-slate-900">Describe what you want</h2>
            <p className="mt-2 text-sm text-slate-600">Use natural language to request brand, category, size, and deal target.</p>
          </article>
          <article className="rounded-xl border border-slate-200 bg-white p-6">
            <Sparkles className="h-5 w-5 text-orange-600" />
            <h2 className="mt-3 text-xl font-semibold text-slate-900">See qualified matches</h2>
            <p className="mt-2 text-sm text-slate-600">Ask Rami surfaces products where merchants are ready to transact with dynamic pricing rules.</p>
          </article>
          <article className="rounded-xl border border-slate-200 bg-white p-6">
            <MessageSquare className="h-5 w-5 text-orange-600" />
            <h2 className="mt-3 text-xl font-semibold text-slate-900">Complete checkout quickly</h2>
            <p className="mt-2 text-sm text-slate-600">Move from discovery to purchase in fewer steps with direct links into merchant checkout.</p>
          </article>
        </div>
      </section>

      <section className="bg-slate-900 py-16 text-white">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight">Already ready to shop with Ask Rami?</h2>
          <p className="mt-3 text-slate-300">Open the consumer app and start your first deal request in under a minute.</p>
          <div className="mt-8">
            <Link
              href="https://app.useiwantthat.com"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-orange-600 px-7 py-3 text-sm font-semibold text-white hover:bg-orange-700"
            >
              Open Ask Rami
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
