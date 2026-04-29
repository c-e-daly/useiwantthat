import type { Metadata } from "next";
import Link from "next/link";
import { LEGAL_DOCUMENTS } from "@/lib/legal/documents";

export const metadata: Metadata = {
  title: "Legal | I Want That!",
  description:
    "Legal center for I Want That!, including privacy, cookies, terms, subprocessors, and data handling policies.",
};

export default function LegalHubPage() {
  return (
    <div className="bg-white">
      <section className="border-b border-surface-border bg-surface-subtle/50 py-14 md:py-20">
        <div className="container mx-auto px-4">
          <p className="text-xs font-bold uppercase tracking-widest text-brand">
            Legal
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-black md:text-5xl">
            Legal Center
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-muted md:text-lg">
            Policies, terms, subprocessors, and data-handling documents for
            I Want That!.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {LEGAL_DOCUMENTS.map((document) => (
              <Link
                key={document.slug}
                href={document.path}
                className="rounded-[24px] border border-surface-border bg-white p-6 shadow-sm transition hover:border-brand/20 hover:shadow-md"
              >
                <p className="text-xs font-bold uppercase tracking-widest text-brand">
                  Legal Document
                </p>
                <h2 className="mt-3 text-xl font-bold tracking-tight text-black">
                  {document.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-neutral-muted">
                  {document.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
