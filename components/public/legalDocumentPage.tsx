import Link from "next/link";
import { getLegalDocumentContent, LEGAL_DOCUMENTS, type LegalDocumentSlug } from "@/lib/legal/documents";

type LegalDocumentPageProps = {
  slug: LegalDocumentSlug;
};

export async function LegalDocumentPage({ slug }: LegalDocumentPageProps) {
  const document = await getLegalDocumentContent(slug);

  return (
    <div className="bg-white">
      <section className="border-b border-surface-border bg-surface-subtle/50 py-14 md:py-20">
        <div className="container mx-auto px-4">
          <p className="text-xs font-bold uppercase tracking-widest text-brand">
            Legal
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight text-black md:text-5xl">
            {document.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-muted md:text-lg">
            {document.description}
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto grid gap-10 px-4 lg:grid-cols-[minmax(0,1fr)_280px]">
          <article className="min-w-0 rounded-3xl border border-surface-border bg-white p-6 shadow-sm md:p-10">
            <div
              className={[
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
                "[&_table]:mt-6 [&_table]:w-full [&_table]:border-collapse",
                "[&_th]:border [&_th]:border-slate-200 [&_th]:bg-slate-50 [&_th]:px-3 [&_th]:py-2 [&_th]:text-left",
                "[&_td]:border [&_td]:border-slate-200 [&_td]:px-3 [&_td]:py-2",
              ].join(" ")}
              dangerouslySetInnerHTML={{ __html: document.html }}
            />
          </article>

          <aside className="h-fit rounded-3xl border border-surface-border bg-surface-subtle p-6">
            <p className="text-xs font-bold uppercase tracking-widest text-brand">
              Legal Center
            </p>
            <div className="mt-5 space-y-3">
              {LEGAL_DOCUMENTS.map((item) => (
                <Link
                  key={item.slug}
                  href={`/${item.slug}`}
                  className={`block rounded-askrami border px-4 py-3 text-sm transition ${
                    item.slug === slug
                      ? "border-brand/20 bg-brand/5 font-semibold text-black"
                      : "border-surface-border bg-white text-neutral-muted hover:text-black"
                  }`}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
