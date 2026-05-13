import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import type { Playbook } from "@/lib/playbooks";
import { playbookSupplements } from "@/lib/playbook-supplements";

const formatLabel = (value: string) => value.replaceAll("_", " ");

type PlaybookPageProps = {
  playbook: Playbook;
};

export function PlaybookPage({ playbook }: PlaybookPageProps) {
  const Icon = playbook.icon;
  const supplement = playbookSupplements[playbook.slug];
  const isCacPlaybook = playbook.slug === "cac-playbook";
  const isClearancePlaybook = playbook.slug === "clearance-playbook";
  const isExitIntentPlaybook = playbook.slug === "exit-intent-playbook";
  const isProgramsPlaybook = playbook.slug === "programs-playbook";

  return (
    <div className="bg-white">
      <section className="relative overflow-hidden border-b border-surface-border bg-surface-subtle/50 py-16 md:py-24">
        <div className="absolute inset-0 bg-cgo-fibonacci opacity-10" />
        <div className="container relative mx-auto grid gap-12 px-4 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-brand/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-brand">
              <Icon className="h-3.5 w-3.5" />
              {formatLabel(playbook.type)}
            </div>
            <h1 className="max-w-4xl text-4xl font-bold leading-[1.05] tracking-tight text-black md:text-6xl">
              {playbook.title}
            </h1>
            <p className="mt-6 max-w-2xl text-xl font-semibold leading-relaxed text-black">
              {playbook.tagline}
            </p>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-neutral-muted">
              {playbook.description}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={playbook.ctaHref}
                className="inline-flex items-center justify-center gap-2 rounded-askrami bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-deep"
              >
                {playbook.ctaLabel}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-askrami border border-surface-border bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-surface-subtle"
              >
                Talk through this playbook
              </Link>
            </div>
          </div>

          <div
            className="rounded-askrami border border-surface-border bg-white p-4 shadow-sm"
            aria-label={playbook.contentImage.alt}
          >
            <div className="grid gap-3 md:grid-cols-2">
              <div className="rounded-askrami border border-surface-border bg-surface-subtle p-5">
                <p className="text-xs font-bold uppercase tracking-widest text-neutral-muted">
                  {playbook.contentImage.beforeLabel}
                </p>
                <div className="mt-8 rounded-askrami border border-black/10 bg-white p-5 shadow-card">
                  <div className="flex h-28 items-center justify-center overflow-hidden rounded-askrami bg-black/5">
                    {isClearancePlaybook ? (
                      <Image
                        src="/clearance-icon.png"
                        alt=""
                        width={1024}
                        height={1536}
                        className="h-full max-h-24 w-auto object-contain"
                        priority={false}
                      />
                    ) : isCacPlaybook ? (
                      <span className="text-3xl font-black tracking-tight text-black">
                        20% off
                      </span>
                    ) : isExitIntentPlaybook ? (
                      <div
                        className="w-4/5 rounded-askrami border border-surface-border bg-white px-4 py-3 text-sm font-semibold text-neutral-muted shadow-sm"
                        aria-label="Disabled email input preview"
                      >
                        email
                      </div>
                    ) : isProgramsPlaybook ? (
                      <div className="rounded-full bg-white px-5 py-3 text-center shadow-sm ring-1 ring-black/10">
                        <div className="text-base font-black leading-tight tracking-tight text-black">
                          25% off entire site
                        </div>
                        <div className="mt-0.5 text-xs font-semibold lowercase leading-tight text-neutral-muted">
                          this week only
                        </div>
                      </div>
                    ) : null}
                  </div>
                  <h2 className="mt-5 text-xl font-bold tracking-tight text-black">
                    {playbook.contentImage.beforeTitle}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-muted">
                    {playbook.contentImage.beforeDetail}
                  </p>
                </div>
              </div>

              <div className="rounded-askrami border border-brand/30 bg-brand/10 p-5">
                <p className="text-xs font-bold uppercase tracking-widest text-brand">
                  {playbook.contentImage.afterLabel}
                </p>
                <div className="mt-8 rounded-askrami border border-brand/20 bg-white p-5 shadow-card">
                  <div className="flex h-28 items-center justify-center rounded-askrami bg-black text-white">
                    <span className="rounded-full bg-brand px-4 py-2 text-sm font-bold">
                      Make A Deal
                    </span>
                  </div>
                  <h2 className="mt-5 text-xl font-bold tracking-tight text-black">
                    {playbook.contentImage.afterTitle}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-muted">
                    {playbook.contentImage.afterDetail}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-surface-border py-16 md:py-20">
        <div className="container mx-auto grid gap-8 px-4 lg:grid-cols-3">
          {[
            ["Business goal", formatLabel(playbook.businessGoal)],
            ["Primary metric", formatLabel(playbook.primaryMetric)],
            ["Tool type", formatLabel(playbook.toolType)],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-askrami border border-surface-border bg-white p-6 shadow-sm"
            >
              <p className="text-xs font-bold uppercase tracking-widest text-brand">
                {label}
              </p>
              <p className="mt-3 text-2xl font-bold capitalize tracking-tight text-black">
                {value}
              </p>
            </div>
          ))}
        </div>
      </section>

      {supplement ? (
        <section className="border-b border-surface-border bg-surface-subtle/40 py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-widest text-brand">
                {supplement.eyebrow}
              </p>
              <h2 className="mt-4 text-4xl font-bold tracking-tight text-black">
                {supplement.title}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-neutral-muted">
                {supplement.intro}
              </p>
            </div>

            <div className="mt-12 space-y-10">
              {supplement.sections.map((section) => (
                <article
                  key={section.title}
                  className="rounded-askrami border border-surface-border bg-white p-6 shadow-sm md:p-8"
                >
                  {section.eyebrow ? (
                    <p className="text-xs font-bold uppercase tracking-widest text-brand">
                      {section.eyebrow}
                    </p>
                  ) : null}
                  <h3 className="text-2xl font-bold tracking-tight text-black md:text-3xl">
                    {section.title}
                  </h3>
                  {section.body ? (
                    <p className="mt-3 max-w-4xl leading-relaxed text-neutral-muted">
                      {section.body}
                    </p>
                  ) : null}

                  {section.cards ? (
                    <div className="mt-6 grid gap-4 md:grid-cols-3">
                      {section.cards.map((card) => (
                        <div
                          key={`${section.title}-${card.title}`}
                          className={[
                            "rounded-askrami border p-5",
                            card.tone === "brand"
                              ? "border-brand/30 bg-brand/10"
                              : card.tone === "warning"
                                ? "border-orange-200 bg-orange-50"
                                : "border-surface-border bg-surface-subtle",
                          ].join(" ")}
                        >
                          {card.eyebrow ? (
                            <p className="text-xs font-bold uppercase tracking-widest text-neutral-muted">
                              {card.eyebrow}
                            </p>
                          ) : null}
                          <h4 className="mt-2 text-xl font-bold tracking-tight text-black">
                            {card.title}
                          </h4>
                          {card.body ? (
                            <p className="mt-3 text-sm leading-relaxed text-neutral-muted">
                              {card.body}
                            </p>
                          ) : null}
                          {card.items ? (
                            <div className="mt-4 space-y-2">
                              {card.items.map((item) => (
                                <div key={item} className="flex gap-2 text-sm">
                                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                                  <span className="text-neutral-muted">
                                    {item}
                                  </span>
                                </div>
                              ))}
                            </div>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  ) : null}

                  {section.table ? (
                    <div className="mt-6 overflow-x-auto rounded-askrami border border-surface-border">
                      <div
                        className="grid min-w-170 bg-black text-xs font-bold uppercase tracking-widest text-white"
                        style={{
                          gridTemplateColumns: `repeat(${section.table!.columns.length}, minmax(0, 1fr))`,
                        }}
                      >
                        {section.table.columns.map((column) => (
                          <div key={column} className="p-4">
                            {column}
                          </div>
                        ))}
                      </div>
                      {section.table.rows.map((row) => (
                        <div
                          key={row.join("-")}
                          className="grid min-w-170 border-t border-surface-border text-sm"
                          style={{
                            gridTemplateColumns: `repeat(${section.table!.columns.length}, minmax(0, 1fr))`,
                          }}
                        >
                          {row.map((cell, index) => (
                            <div
                              key={`${row.join("-")}-${cell}-${index}`}
                              className={[
                                "p-4 leading-relaxed",
                                index === 0
                                  ? "font-semibold text-black"
                                  : "text-neutral-muted",
                              ].join(" ")}
                            >
                              {cell}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  ) : null}

                  {section.checklist ? (
                    <div className="mt-6 grid gap-3 md:grid-cols-2">
                      {section.checklist.map((item) => (
                        <div
                          key={item}
                          className="flex gap-3 rounded-askrami border border-surface-border bg-surface-subtle p-4"
                        >
                          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                          <p className="text-sm leading-relaxed text-neutral-muted">
                            {item}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="py-16 md:py-20">
        <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-brand">
              Data model
            </p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-black">
              What this playbook collects
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-neutral-muted">
              Each playbook has a consistent structure: business goal, primary
              metric, tool type, collected inputs, workflow, and measurable
              outputs.
            </p>
          </div>

          <div className="grid gap-4">
            {playbook.dataCollected.map((item) => (
              <div
                key={item.label}
                className="rounded-askrami border border-surface-border bg-white p-5 shadow-sm"
              >
                <h3 className="text-lg font-bold tracking-tight text-black">
                  {item.label}
                </h3>
                <p className="mt-2 leading-relaxed text-neutral-muted">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black py-16 text-white md:py-20">
        <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-brand">
              Workflow
            </p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-white">
              How the playbook runs
            </h2>
            <div className="mt-8 space-y-5">
              {playbook.workflow.map((step, index) => (
                <div key={step.title} className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      {step.title}
                    </h3>
                    <p className="mt-2 leading-relaxed text-white/65">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-askrami border border-white/10 bg-white/5 p-6">
            <p className="text-xs font-bold uppercase tracking-widest text-brand">
              Outputs
            </p>
            <div className="mt-6 space-y-4">
              {playbook.outputs.map((output) => (
                <div key={output} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                  <p className="text-lg font-semibold text-white">{output}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
