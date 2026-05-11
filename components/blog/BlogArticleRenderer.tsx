import Link from "next/link";
import Image from "next/image";
import { getPillarPath, USE_CASE_PATHS } from "@/lib/blog/pillars";
import { getArticleTemplateConfig } from "@/lib/blog/articleTemplates";
import type { BlogPostDetail } from "@/lib/blog/types";

type BlogArticleRendererProps = {
  post: BlogPostDetail;
  jsonLd?: Array<Record<string, unknown>>;
  includeGtm?: boolean;
  preview?: {
    label: string;
    message: string;
  };
};

function formatDate(value: string) {
  return new Date(value).toLocaleDateString();
}

function getBodyClassName(templateId: string) {
  return [
    "blog-article-body",
    templateId === "playbook" ? "blog-article-body-playbook" : "",
  ]
    .filter(Boolean)
    .join(" ");
}

export function BlogArticleRenderer({ post, jsonLd = [], includeGtm = false, preview }: BlogArticleRendererProps) {
  const config = getArticleTemplateConfig(post.template);
  const showRelatedArticles = Boolean(post.internalLinks?.relatedArticles.length && config.modules.showRelatedArticles);
  const showUseCaseLinks = Boolean(post.useCases.length && config.modules.showUseCaseLinks);
  const showRelatedSection = showRelatedArticles || showUseCaseLinks;
  const showFinalCta = Boolean(post.internalLinks?.ctaText && config.modules.showFinalCta);
  const showTableOfContents = config.sidebar.tableOfContents && post.tableOfContents.length > 0;
  const bodyHasFaq = post.tableOfContents.some((item) => item.text.toLowerCase() === "faq") || post.html.includes('class="vector-faq"');
  const heroImage = post.coverImageUrl;
  const heroImageAlt = post.og?.imageAlt || post.title;

  return (
    <article className="mx-auto max-w-6xl px-6 py-14" data-article-template={config.id}>
      {preview ? (
        <div className="mb-8 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          <p className="font-semibold">{preview.label}</p>
          <p className="mt-1">{preview.message}</p>
        </div>
      ) : null}

      <header className="mx-auto mb-10 max-w-4xl border-b border-slate-200 pb-8">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">{preview ? "Blog preview" : config.hero.eyebrow}</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900">{post.title}</h1>
        {config.hero.showReadingMeta ? (
          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-500">
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            {post.authorName ? (
              <span>
                {post.authorName}
                {post.authorRole ? `, ${post.authorRole}` : ""}
              </span>
            ) : null}
            {post.persona ? <span className="rounded-full bg-slate-100 px-3 py-1">{post.persona}</span> : null}
            {post.pillarTitle ? (
              preview ? (
                <span className="rounded-full bg-slate-100 px-3 py-1">{post.pillarTitle}</span>
              ) : (
                <Link href={getPillarPath(post.pillar)} className="rounded-full bg-slate-100 px-3 py-1 hover:text-orange-700">
                  {post.pillarTitle}
                </Link>
              )
            ) : null}
            {post.readingTimeMinutes ? <span>{post.readingTimeMinutes} min read</span> : null}
            <span className="rounded-full bg-slate-100 px-3 py-1">{config.label}</span>
          </div>
        ) : null}
        {config.hero.showTldr && post.aeo?.tldr ? (
          <p className="mt-6 rounded-lg border border-orange-100 bg-orange-50 p-4 text-base leading-7 text-slate-800">{post.aeo.tldr}</p>
        ) : null}
        {heroImage ? (
          <figure className="mt-8">
            <Image
              src={heroImage}
              alt={heroImageAlt}
              width={post.og?.imageWidth ?? 1200}
              height={post.og?.imageHeight ?? 630}
              className="h-auto w-full rounded-lg border border-slate-200 object-cover"
              priority
              unoptimized
            />
          </figure>
        ) : null}
      </header>

      {includeGtm && post.gtmLayer ? (
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || []; window.dataLayer.push(${JSON.stringify(post.gtmLayer)});`,
          }}
        />
      ) : null}

      {jsonLd.map((item, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }} />
      ))}

      <div className={showTableOfContents ? "grid gap-10 lg:grid-cols-[minmax(220px,1fr)_minmax(0,2fr)]" : "mx-auto max-w-3xl"}>
        {showTableOfContents ? (
          <aside className="hidden lg:block">
            <nav className="sticky top-24 border-l border-slate-200 pl-5" aria-label="Table of contents">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Contents</p>
              <ol className="mt-4 space-y-3 text-sm">
                {post.tableOfContents.map((item) => (
                  <li key={item.id} className={item.level === 3 ? "pl-4" : ""}>
                    <a href={`#${item.id}`} className="text-slate-600 hover:text-orange-700">
                      {item.text}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>
        ) : null}

        <div>
          {showTableOfContents ? (
            <details className="mb-8 rounded-lg border border-slate-200 p-4 lg:hidden">
              <summary className="cursor-pointer text-sm font-semibold text-slate-900">Contents</summary>
              <ol className="mt-4 space-y-3 text-sm">
                {post.tableOfContents.map((item) => (
                  <li key={item.id} className={item.level === 3 ? "pl-4" : ""}>
                    <a href={`#${item.id}`} className="text-slate-600 hover:text-orange-700">
                      {item.text}
                    </a>
                  </li>
                ))}
              </ol>
            </details>
          ) : null}

          <div className={getBodyClassName(config.id)} dangerouslySetInnerHTML={{ __html: post.html }} />

          {config.modules.showKeyTakeaways && post.aeo?.keyTakeaways?.length ? (
            <section className="mt-12 border-t border-slate-200 pt-8">
              <h2 className="text-2xl font-semibold text-slate-900">Key Takeaways</h2>
              <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-700">
                {post.aeo.keyTakeaways.map((takeaway) => (
                  <li key={takeaway}>{takeaway}</li>
                ))}
              </ul>
            </section>
          ) : null}

          {config.modules.showFaq && post.aeo?.faq?.length && !bodyHasFaq ? (
            <section className="mt-12 border-t border-slate-200 pt-8">
              <h2 className="text-2xl font-semibold text-slate-900">FAQ</h2>
              <div className="mt-4 space-y-5">
                {post.aeo.faq.map((entry) => (
                  <div key={entry.question}>
                    <h3 className="text-lg font-semibold text-slate-900">{entry.question}</h3>
                    <p className="mt-2 leading-7 text-slate-700">{entry.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {showRelatedSection ? (
            <aside className="mt-12 border-t border-slate-200 pt-8">
              <h2 className="text-2xl font-semibold text-slate-900">Related Reading</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {showRelatedArticles
                  ? post.internalLinks?.relatedArticles.slice(0, 4).map((link) => (
                      <Link
                        key={link.slug}
                        href={`/blog/${link.slug.replace(/^\/+/, "")}`}
                        className="rounded-lg border border-slate-200 p-4 font-medium text-slate-800 hover:border-orange-200 hover:text-orange-700"
                      >
                        {link.title}
                      </Link>
                    ))
                  : null}
                {showUseCaseLinks
                  ? post.useCases.map((useCase) => {
                      const page = USE_CASE_PATHS[useCase];
                      return page ? (
                        <Link
                          key={useCase}
                          href={page.path}
                          className="rounded-lg border border-slate-200 p-4 font-medium text-slate-800 hover:border-orange-200 hover:text-orange-700"
                        >
                          {page.title}
                        </Link>
                      ) : null;
                    })
                  : null}
              </div>
              {showFinalCta ? (
                <Link href="/product" className="mt-6 inline-block rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-orange-600">
                  {post.internalLinks?.ctaText}
                </Link>
              ) : null}
            </aside>
          ) : null}
        </div>
      </div>
    </article>
  );
}
