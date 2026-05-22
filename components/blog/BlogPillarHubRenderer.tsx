import Link from "next/link";
import type { BlogHubDetail } from "@/lib/blog/hubs";
import type { BlogPostSummary } from "@/lib/blog/types";

type BlogPillarHubRendererProps = {
  hub: BlogHubDetail;
  posts: BlogPostSummary[];
  jsonLd?: Array<Record<string, unknown>>;
};

const RELATED_TOOLS: Record<string, { title: string; path: string; label: string }> = {
  "cac-calculator": { title: "CAC Calculator", path: "/tools/cac-calculator", label: "Run calculator" },
  "price-builder": { title: "Price Builder", path: "/tools/price-builder", label: "Build price" },
  "goodness-of-fit": { title: "Goodness of Fit", path: "/tools/goodness-of-fit", label: "Take assessment" },
};

const RELATED_PLAYBOOKS: Record<string, { title: string; path: string; label: string }> = {
  "/playbooks/cac-playbook": { title: "CAC Playbook", path: "/playbooks/cac-playbook", label: "Read playbook" },
  "/playbooks/clearance-playbook": { title: "Clearance Playbook", path: "/playbooks/clearance-playbook", label: "Read playbook" },
  "/playbooks/remarketing-playbook": { title: "Remarketing Playbook", path: "/playbooks/remarketing-playbook", label: "Read playbook" },
  "/playbooks/exit-intent-playbook": { title: "Exit Intent Playbook", path: "/playbooks/exit-intent-playbook", label: "Read playbook" },
  "/playbooks/programs-playbook": { title: "Programs Playbook", path: "/playbooks/programs-playbook", label: "Read playbook" },
  "/playbooks/counter-offer-playbook": { title: "Counter Offer Playbook", path: "/playbooks/counter-offer-playbook", label: "Read playbook" },
};

function humanizeSlug(value: string) {
  return value
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function formatAuthor(value: string | null) {
  if (!value) {
    return null;
  }

  return humanizeSlug(value);
}

export function BlogPillarHubRenderer({ hub, posts, jsonLd = [] }: BlogPillarHubRendererProps) {
  const hasSidebar = hub.tableOfContents.length > 0 || hub.relationships.glossary_terms?.length;
  const latestPosts = posts.slice(0, 6);
  const relatedTool = hub.relationships.related_tool ? RELATED_TOOLS[hub.relationships.related_tool] : null;
  const relatedPlaybook = hub.relationships.related_playbook ? RELATED_PLAYBOOKS[hub.relationships.related_playbook] : null;

  return (
    <article className="bg-white">
      {jsonLd.map((item, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }} />
      ))}

      <header className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <h1 className="mt-3 max-w-4xl text-4xl font-bold tracking-tight text-slate-950">{hub.title}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-700">{hub.aeo.tldr || hub.description}</p>
          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-slate-500">
            {formatAuthor(hub.author) ? <span>{formatAuthor(hub.author)}</span> : null}
            <time dateTime={hub.updatedAt}>Updated {new Date(hub.updatedAt).toLocaleDateString()}</time>
            <span className="rounded-full bg-white px-3 py-1 text-slate-700 ring-1 ring-slate-200">{hub.pillarTitle}</span>
            {hub.status !== "published" ? <span className="rounded-full bg-amber-50 px-3 py-1 text-amber-800 ring-1 ring-amber-200">{hub.status}</span> : null}
          </div>
          {hub.aeo.key_takeaways?.length ? (
            <div className="mt-8 grid gap-3 md:grid-cols-3">
              {hub.aeo.key_takeaways.slice(0, 3).map((takeaway) => (
                <p key={takeaway} className="rounded-lg border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-700">
                  {takeaway}
                </p>
              ))}
            </div>
          ) : null}
          {relatedTool || relatedPlaybook ? (
            <div className="mt-8 flex flex-wrap gap-3">
              {relatedTool ? <ResourceLink href={relatedTool.path} title={relatedTool.title} label={relatedTool.label} /> : null}
              {relatedPlaybook ? <ResourceLink href={relatedPlaybook.path} title={relatedPlaybook.title} label={relatedPlaybook.label} /> : null}
            </div>
          ) : null}
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 lg:grid-cols-[260px_minmax(0,1fr)]">
        {hasSidebar ? (
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <details className="rounded-lg border border-slate-200 p-4 lg:hidden">
              <summary className="cursor-pointer text-sm font-semibold text-slate-900">Hub navigation</summary>
              <HubSidebar hub={hub} />
            </details>
            <div className="hidden lg:block">
              <HubSidebar hub={hub} />
            </div>
          </aside>
        ) : null}

        <div className={hasSidebar ? "min-w-0" : "mx-auto max-w-3xl"}>
          <div className="blog-article-body" dangerouslySetInnerHTML={{ __html: hub.html }} />

          <section className="mt-12 border-t border-slate-200 pt-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Latest from this pillar</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">Recent articles</h2>
              </div>
              <Link href="/blog" className="text-sm font-medium text-orange-700 hover:text-orange-800">
                View all blog posts
              </Link>
            </div>
            {latestPosts.length ? (
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {latestPosts.map((post) => (
                  <Link key={post.slug} href={post.path} className="rounded-lg border border-slate-200 p-5 hover:border-orange-200">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                      <time dateTime={post.publishedAt}>{new Date(post.publishedAt).toLocaleDateString()}</time>
                      {post.readingTimeMinutes ? <span>{post.readingTimeMinutes} min read</span> : null}
                    </div>
                    <h3 className="mt-2 text-lg font-semibold leading-7 text-slate-950">{post.title}</h3>
                    {post.excerpt ? <p className="mt-2 text-sm leading-6 text-slate-600">{post.excerpt}</p> : null}
                  </Link>
                ))}
              </div>
            ) : (
              <p className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">
                Cluster posts for this pillar are scheduled for publication.
              </p>
            )}
          </section>
        </div>
      </div>
    </article>
  );
}

function ResourceLink({ href, title, label }: { href: string; title: string; label: string }) {
  return (
    <Link href={href} className="inline-flex items-center gap-2 rounded-lg border border-[#0442bf]/20 bg-white px-4 py-3 text-sm font-semibold text-[#0442bf] transition hover:border-[#0442bf]/40 hover:bg-[#0442bf]/5">
      <span>{title}</span>
      <span aria-hidden="true">-&gt;</span>
      <span>{label}</span>
    </Link>
  );
}

function HubSidebar({ hub }: { hub: BlogHubDetail }) {
  return (
    <nav className="space-y-8" aria-label="Hub navigation">
      {hub.tableOfContents.length ? (
        <div className="border-l border-slate-200 pl-5">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Contents</p>
          <ol className="mt-4 space-y-3 text-sm">
            {hub.tableOfContents.map((item) => (
              <li key={item.id} className={item.level === 3 ? "pl-4" : ""}>
                <a href={`#${item.id}`} className="text-slate-600 hover:text-[#0442bf]">
                  {item.text}
                </a>
              </li>
            ))}
          </ol>
        </div>
      ) : null}

      {hub.relationships.glossary_terms?.length ? (
        <div className="border-l border-slate-200 pl-5">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Key terms</p>
          <ol className="mt-4 space-y-3 text-sm">
            {hub.relationships.glossary_terms.slice(0, 10).map((term) => (
              <li key={term}>
                <Link href={`/glossary/${term}`} className="text-slate-600 hover:text-[#0442bf]">
                  {humanizeSlug(term)}
                </Link>
              </li>
            ))}
          </ol>
        </div>
      ) : null}
    </nav>
  );
}
