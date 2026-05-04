import Link from "next/link";
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
    "max-w-none text-slate-700",
    "[&_h1]:mt-8 [&_h1]:text-4xl [&_h1]:font-semibold [&_h1]:text-slate-900",
    "[&_h2]:mt-8 [&_h2]:text-3xl [&_h2]:font-semibold [&_h2]:text-slate-900",
    "[&_h3]:mt-6 [&_h3]:text-2xl [&_h3]:font-semibold [&_h3]:text-slate-900",
    "[&_p]:mt-4 [&_p]:leading-7",
    "[&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6",
    "[&_ol]:mt-4 [&_ol]:list-decimal [&_ol]:pl-6",
    "[&_li]:mt-2",
    "[&_a]:font-medium [&_a]:text-orange-600 hover:[&_a]:text-orange-700",
    "[&_blockquote]:mt-6 [&_blockquote]:border-l-4 [&_blockquote]:border-slate-300 [&_blockquote]:pl-4 [&_blockquote]:italic",
    "[&_pre]:mt-6 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:bg-slate-900 [&_pre]:p-4 [&_pre]:text-slate-100",
    "[&_code]:rounded [&_code]:bg-slate-100 [&_code]:px-1 [&_code]:py-0.5 [&_code]:text-sm",
    "[&_pre_code]:bg-transparent [&_pre_code]:p-0",
    "[&_hr]:my-8 [&_hr]:border-slate-200",
    templateId === "playbook" ? "[&_ol]:space-y-3" : "",
    templateId === "versus" ? "[&_table]:mt-6 [&_table]:w-full [&_table]:border-collapse" : "",
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

  return (
    <article className="mx-auto max-w-3xl px-6 py-14" data-article-template={config.id}>
      {preview ? (
        <div className="mb-8 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          <p className="font-semibold">{preview.label}</p>
          <p className="mt-1">{preview.message}</p>
        </div>
      ) : null}

      <header className="mb-10 border-b border-slate-200 pb-8">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">{preview ? "Blog preview" : config.hero.eyebrow}</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900">{post.title}</h1>
        {config.hero.showReadingMeta ? (
          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-500">
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
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

      {config.modules.showFaq && post.aeo?.faq?.length ? (
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
            <Link href="/sellers" className="mt-6 inline-block rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-orange-600">
              {post.internalLinks?.ctaText}
            </Link>
          ) : null}
        </aside>
      ) : null}
    </article>
  );
}
