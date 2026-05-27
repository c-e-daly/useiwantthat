import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  getAllGlossaryTerms,
  getGlossaryPillarTitle,
  getGlossaryTermBySlug,
  getPublishedGlossaryTerms,
  type GlossaryTerm,
} from "@/lib/glossary/terms";
import { buildPageMetadata } from "@/lib/seo/metadata";

type GlossaryTermPageProps = {
  params: Promise<{ slug: string }>;
};

const RELATED_TOOL_PATHS: Record<string, { title: string; path: string }> = {
  "cac-calculator": { title: "CAC Calculator", path: "/tools/cac-calculator" },
  "price-builder": { title: "Price Builder", path: "/tools/price-builder" },
  "goodness-of-fit": { title: "Goodness of Fit", path: "/tools/goodness-of-fit" },
};

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.useiwantthat.com").replace(/\/+$/, "");

export async function generateStaticParams() {
  const terms = await getPublishedGlossaryTerms();
  return terms.map((term) => ({ slug: term.slug }));
}

export async function generateMetadata({ params }: GlossaryTermPageProps): Promise<Metadata> {
  const { slug } = await params;
  const term = await getGlossaryTermBySlug(slug);

  if (!term || term.status === "stub") {
    notFound();
  }

  return buildPageMetadata({
    title: term.metaTitle,
    description: term.metaDescription,
    path: term.path,
    image: `${term.path}/opengraph-image`,
    imageAlt: `${term.title} | I Want That!`,
    type: "article",
  });
}

function buildJsonLd(term: GlossaryTerm) {
  const jsonLd: Array<Record<string, unknown>> = [
    {
      "@context": "https://schema.org",
      "@type": "DefinedTerm",
      name: term.term,
      description: term.tldr || term.metaDescription,
      url: term.canonicalUrl,
      inDefinedTermSet: {
        "@type": "DefinedTermSet",
        name: "I Want That! Ecommerce Glossary",
        url: `${SITE_URL}/glossary`,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Glossary", item: `${SITE_URL}/glossary` },
        { "@type": "ListItem", position: 2, name: term.term, item: term.canonicalUrl },
      ],
    },
  ];

  if (term.faq.length) {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: term.faq.map((entry) => ({
        "@type": "Question",
        name: entry.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: entry.answer,
        },
      })),
    });
  }

  return jsonLd;
}

export default async function GlossaryTermPage({ params }: GlossaryTermPageProps) {
  const { slug } = await params;
  const term = await getGlossaryTermBySlug(slug);

  if (!term || term.status === "stub") {
    notFound();
  }

  const allTerms = await getAllGlossaryTerms();
  const relatedTerms = term.relatedGlossaryTerms
    .map((relatedSlug) => allTerms.find((item) => item.slug === relatedSlug))
    .filter((item): item is GlossaryTerm => Boolean(item));
  const relatedTool = term.relatedTool ? RELATED_TOOL_PATHS[term.relatedTool] : null;
  const pillarTitle = getGlossaryPillarTitle(term.pillar);
  const jsonLd = buildJsonLd(term);

  return (
    <main className="min-h-screen bg-white">
      {jsonLd.map((item, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }} />
      ))}

      <article className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <Link href="/glossary" className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-orange-700">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Glossary
        </Link>

        <header className="mt-8 border-b border-slate-200 pb-8">
          <div className="flex flex-wrap items-center gap-3">
            {pillarTitle ? <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700">{pillarTitle}</span> : null}
            {term.ladderStage ? <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">Stage {term.ladderStage}</span> : null}
          </div>
          <h1 className="mt-5 max-w-4xl text-4xl font-bold tracking-tight text-slate-950 md:text-6xl">{term.term}</h1>
          {term.tldr ? <p className="mt-6 max-w-3xl rounded-lg border border-orange-100 bg-orange-50 p-5 text-base leading-7 text-slate-800">{term.tldr}</p> : null}
        </header>

        <div className="grid gap-10 py-10 lg:grid-cols-[minmax(0,3fr)_280px]">
          <div className="blog-article-body" dangerouslySetInnerHTML={{ __html: term.html }} />

          <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
            {relatedTerms.length ? (
              <section className="rounded-lg border border-slate-200 bg-white p-5">
                <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">Related terms</h2>
                <div className="mt-4 space-y-3">
                  {relatedTerms.map((relatedTerm) => (
                    <Link key={relatedTerm.slug} href={relatedTerm.path} className="group flex items-center justify-between gap-3 text-sm font-medium text-slate-800 hover:text-orange-700">
                      <span>{relatedTerm.term}</span>
                      <ArrowRight className="h-4 w-4 shrink-0 text-slate-400 transition group-hover:translate-x-1 group-hover:text-orange-600" aria-hidden="true" />
                    </Link>
                  ))}
                </div>
              </section>
            ) : null}

            {relatedTool ? (
              <section className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">Run the numbers</h2>
                <Link href={relatedTool.path} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-orange-700 hover:text-orange-800">
                  {relatedTool.title}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </section>
            ) : null}

            <section className="rounded-lg border border-slate-200 bg-white p-5 text-sm text-slate-600">
              <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">Maintained by</h2>
              <p className="mt-3 leading-6">This definition is maintained as part of the {pillarTitle ?? "Vector"} glossary.</p>
            </section>
          </aside>
        </div>
      </article>
    </main>
  );
}
