import Link from "next/link";
import { ArrowRight, BookOpen, Clock, Search } from "lucide-react";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { GLOSSARY_PILLARS, getGlossaryPillarTitle, getPublishedGlossaryTerms } from "@/lib/glossary/terms";

export const metadata = buildPageMetadata({
  title: "Glossary | I Want That! Ecommerce Terms and Frameworks",
  description:
    "The working vocabulary of negotiated commerce for ecommerce operators - Customer Yield, the Yield Ladder, and 50+ defined terms with operator context.",
  path: "/glossary",
});

function getPillarAnchor(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

export default async function GlossaryPage() {
  const terms = await getPublishedGlossaryTerms();
  const termsByPillar = new Map(GLOSSARY_PILLARS.map((pillar) => [pillar.value, terms.filter((term) => term.pillar === pillar.value)]));

  return (
    <main className="min-h-screen bg-white">
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Glossary</p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 md:text-6xl">
              The working vocabulary of negotiated commerce.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
              Terms and frameworks used across the Vector blog, written for ecommerce operators in the $100K-$5M revenue band.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg border border-slate-200 bg-white p-5">
              <BookOpen className="h-5 w-5 text-orange-600" aria-hidden="true" />
              <p className="mt-4 text-2xl font-semibold text-slate-950">{terms.length}</p>
              <p className="mt-1 text-sm text-slate-600">Published terms</p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-5">
              <Search className="h-5 w-5 text-orange-600" aria-hidden="true" />
              <p className="mt-4 text-2xl font-semibold text-slate-950">{GLOSSARY_PILLARS.length}</p>
              <p className="mt-1 text-sm text-slate-600">Content pillars</p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-5">
              <Clock className="h-5 w-5 text-orange-600" aria-hidden="true" />
              <p className="mt-4 text-2xl font-semibold text-slate-950">50+</p>
              <p className="mt-1 text-sm text-slate-600">Planned definitions</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-lg border border-slate-200 bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Filter by pillar</p>
              <nav className="mt-4 space-y-2" aria-label="Glossary pillars">
                {GLOSSARY_PILLARS.map((pillar) => {
                  const pillarTerms = termsByPillar.get(pillar.value) ?? [];
                  return (
                    <a
                      key={pillar.value}
                      href={`#${getPillarAnchor(pillar.title)}`}
                      className="flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-orange-50 hover:text-orange-700"
                    >
                      <span>{pillar.title}</span>
                      <span className="ml-3 shrink-0 text-xs text-slate-400">{pillarTerms.length || "soon"}</span>
                    </a>
                  );
                })}
              </nav>
            </div>
          </aside>

          <div className="space-y-12">
            <section>
              <div className="flex items-end justify-between gap-4 border-b border-slate-200 pb-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Terms</p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">All published definitions</h2>
                </div>
                <span className="hidden text-sm text-slate-500 sm:inline">A-Z within each pillar</span>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {terms.map((term) => (
                  <Link
                    key={term.slug}
                    href={term.path}
                    className="group rounded-lg border border-slate-200 bg-white p-5 transition hover:border-orange-200 hover:bg-orange-50/40"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        {term.pillar ? (
                          <p className="text-xs font-medium uppercase tracking-[0.14em] text-orange-700">{getGlossaryPillarTitle(term.pillar)}</p>
                        ) : null}
                        <h3 className="mt-2 text-lg font-semibold text-slate-950 group-hover:text-orange-700">{term.term}</h3>
                      </div>
                      <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-slate-400 transition group-hover:translate-x-1 group-hover:text-orange-600" aria-hidden="true" />
                    </div>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{term.tldr || term.metaDescription}</p>
                  </Link>
                ))}
              </div>
            </section>

            {GLOSSARY_PILLARS.map((pillar) => {
              const pillarTerms = termsByPillar.get(pillar.value) ?? [];
              return (
                <section key={pillar.value} id={getPillarAnchor(pillar.title)} className="scroll-mt-24">
                  <div className="border-b border-slate-200 pb-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-2xl font-semibold tracking-tight text-slate-950">{pillar.title}</h2>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                        {pillarTerms.length ? `${pillarTerms.length} terms` : pillar.availability}
                      </span>
                    </div>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">{pillar.description}</p>
                  </div>

                  {pillarTerms.length ? (
                    <div className="mt-5 divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white">
                      {pillarTerms.map((term) => (
                        <Link key={term.slug} href={term.path} className="group flex items-center justify-between gap-6 p-5 hover:bg-slate-50">
                          <div>
                            <h3 className="font-semibold text-slate-950 group-hover:text-orange-700">{term.term}</h3>
                            <p className="mt-1 text-sm leading-6 text-slate-600">{term.tldr || term.metaDescription}</p>
                          </div>
                          <ArrowRight className="h-4 w-4 shrink-0 text-slate-400 transition group-hover:translate-x-1 group-hover:text-orange-600" aria-hidden="true" />
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="mt-5 rounded-lg border border-dashed border-slate-300 bg-slate-50 p-5 text-sm text-slate-600">
                      Definitions for this pillar are scheduled for publication.
                    </div>
                  )}
                </section>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
