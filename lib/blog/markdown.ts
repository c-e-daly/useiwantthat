const ENTITY_MAP: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (match) => ENTITY_MAP[match]);
}

function renderInlineMarkdown(line: string): string {
  let html = escapeHtml(line);

  html = html.replace(/!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]+)")?\)/g, (_match, alt: string, src: string, title: string | undefined) => {
    const safeSrc = escapeHtml(src);
    const safeAlt = escapeHtml(alt);
    const safeTitle = title ? ` title="${escapeHtml(title)}"` : "";
    return `<img src="${safeSrc}" alt="${safeAlt}" loading="lazy" decoding="async"${safeTitle} />`;
  });
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");
  html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  html = html.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_match, text: string, href: string) => {
    const safeHref = escapeHtml(href);
    const target = /^https?:\/\//i.test(href) ? ' target="_blank" rel="noopener noreferrer"' : "";
    return `<a href="${safeHref}"${target}>${text}</a>`;
  });

  return html;
}

export type MarkdownTableOfContentsItem = {
  id: string;
  text: string;
  level: 2 | 3;
};

export type RenderedMarkdown = {
  html: string;
  tableOfContents: MarkdownTableOfContentsItem[];
};

type HeadingIdCounts = Map<string, number>;
type DirectiveItem = Record<string, string>;

function stripInlineMarkdown(value: string) {
  return value
    .replace(/\s*\{#[^}]+\}\s*$/g, "")
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[`*_~]/g, "")
    .trim();
}

function normalizeHeadingId(value: string) {
  return (
    value
      .toLowerCase()
      .replace(/&/g, " and ")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "section"
  );
}

function parseHeadingText(value: string) {
  const explicitId = value.match(/\s*\{#([^}]+)\}\s*$/);
  const text = value.replace(/\s*\{#[^}]+\}\s*$/g, "").trim();

  return {
    text,
    explicitId: explicitId ? normalizeHeadingId(explicitId[1]) : null,
  };
}

function slugifyHeading(value: string, counts: HeadingIdCounts, explicitId?: string | null) {
  const base = explicitId || normalizeHeadingId(stripInlineMarkdown(value));
  const count = counts.get(base) ?? 0;
  counts.set(base, count + 1);
  return count === 0 ? base : `${base}-${count + 1}`;
}

function isTableDelimiter(line: string) {
  return /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(line);
}

function isTableRow(line: string) {
  return line.includes("|") && !line.trim().startsWith("::");
}

function splitTableRow(line: string) {
  const trimmed = line.trim().replace(/^\|/, "").replace(/\|$/, "");
  return trimmed.split("|").map((cell) => cell.trim());
}

function parseTableAlignment(cell: string) {
  const trimmed = cell.trim();

  if (trimmed.startsWith(":") && trimmed.endsWith(":")) {
    return "center";
  }

  if (trimmed.endsWith(":")) {
    return "right";
  }

  return "left";
}

function readCell(row: string[], index: number) {
  return row[index]?.trim() ?? "";
}

function compactTableColumns(headers: string[], alignments: string[], rows: string[][]) {
  const width = Math.max(headers.length, alignments.length, ...rows.map((row) => row.length));
  const keepIndexes = Array.from({ length: width }, (_value, index) => index).filter((index) => {
    const columnCells = [readCell(headers, index), ...rows.map((row) => readCell(row, index))];
    return columnCells.some((cell) => cell.length > 0);
  });

  return {
    headers: keepIndexes.map((index) => readCell(headers, index)),
    alignments: keepIndexes.map((index) => alignments[index] ?? "left"),
    rows: rows
      .map((row) => keepIndexes.map((index) => readCell(row, index)))
      .filter((row) => row.some((cell) => cell.length > 0)),
  };
}

function promoteHeaderIfBlank(headers: string[], rows: string[][]) {
  if (headers.some((cell) => cell.trim().length > 0)) {
    return { headers, rows };
  }

  const headerIndex = rows.findIndex((row) => row.some((cell) => cell.trim().length > 0));

  if (headerIndex < 0) {
    return { headers, rows };
  }

  return {
    headers: rows[headerIndex],
    rows: rows.slice(headerIndex + 1),
  };
}

function renderTable(lines: string[]) {
  const [headerLine, delimiterLine, ...bodyLines] = lines;
  const parsedHeaders = splitTableRow(headerLine);
  const parsedAlignments = splitTableRow(delimiterLine).map(parseTableAlignment);
  const parsedRows = bodyLines.map(splitTableRow);
  const compacted = compactTableColumns(parsedHeaders, parsedAlignments, parsedRows);
  const promoted = promoteHeaderIfBlank(compacted.headers, compacted.rows);
  const headers = promoted.headers;
  const alignments = compacted.alignments;
  const rows = promoted.rows;

  const renderAlign = (index: number) => ` data-align="${alignments[index] ?? "left"}"`;

  return [
    `<div class="vector-table-wrap"><table>`,
    "<thead>",
    `<tr>${headers.map((cell, index) => `<th${renderAlign(index)}>${renderInlineMarkdown(cell)}</th>`).join("")}</tr>`,
    "</thead>",
    "<tbody>",
    ...rows.map((row) => `<tr>${row.map((cell, index) => `<td${renderAlign(index)}>${renderInlineMarkdown(cell)}</td>`).join("")}</tr>`),
    "</tbody>",
    "</table></div>",
  ].join("\n");
}

function parseKeyValueLine(line: string) {
  const match = line.match(/^([A-Za-z][A-Za-z0-9_-]*):\s*(.*)$/);

  if (!match) {
    return null;
  }

  return {
    key: match[1],
    value: match[2].trim(),
  };
}

function parseDirectiveFields(content: string[]) {
  const fields: Record<string, string> = {};
  const body: string[] = [];

  for (const line of content) {
    const parsed = parseKeyValueLine(line.trim());

    if (parsed) {
      fields[parsed.key] = parsed.value.replace(/^["']|["']$/g, "");
      continue;
    }

    body.push(line);
  }

  return { fields, body };
}

function parseDirectiveItems(content: string[]) {
  const items: DirectiveItem[] = [];
  let current: DirectiveItem | null = null;
  let currentBodyKey: string | null = null;

  for (const rawLine of content) {
    const line = rawLine.trim();

    if (!line) {
      currentBodyKey = null;
      continue;
    }

    const itemStart = line.match(/^-\s+([A-Za-z][A-Za-z0-9_-]*):\s*(.*)$/);

    if (itemStart) {
      current = { [itemStart[1]]: itemStart[2].trim().replace(/^["']|["']$/g, "") };
      items.push(current);
      currentBodyKey = itemStart[1];
      continue;
    }

    const keyValue = parseKeyValueLine(line);

    if (keyValue && current) {
      current[keyValue.key] = keyValue.value.replace(/^["']|["']$/g, "");
      currentBodyKey = keyValue.key;
      continue;
    }

    if (current && currentBodyKey) {
      current[currentBodyKey] = `${current[currentBodyKey] ?? ""}\n${rawLine.trimEnd()}`.trim();
    }
  }

  return items;
}

function safeUrl(value: string | undefined) {
  const url = value?.trim();

  if (!url) {
    return "";
  }

  if (/^(https?:\/\/|\/|#|mailto:)/i.test(url)) {
    return escapeHtml(url);
  }

  return "";
}

function renderButton(content: string[]) {
  const { fields } = parseDirectiveFields(content);
  const href = safeUrl(fields.href);
  const label = fields.label || fields.text || "Learn more";
  const variant = fields.variant === "secondary" ? "secondary" : "primary";

  if (!href) {
    return "";
  }

  return `<p class="vector-button-wrap"><a class="vector-button vector-button-${variant}" href="${href}">${renderInlineMarkdown(label)}</a></p>`;
}

function renderCta(content: string[], counts: HeadingIdCounts) {
  const { fields, body } = parseDirectiveFields(content);
  const href = safeUrl(fields.href);
  const title = fields.title || fields.heading || "";
  const label = fields.label || fields.button || "";

  return [
    `<aside class="vector-cta">`,
    title ? `<h3>${renderInlineMarkdown(title)}</h3>` : "",
    body.length ? `<div>${renderMarkdown(body.join("\n"), counts).html}</div>` : "",
    href && label ? `<a class="vector-button vector-button-primary" href="${href}">${renderInlineMarkdown(label)}</a>` : "",
    "</aside>",
  ]
    .filter(Boolean)
    .join("\n");
}

function renderImage(content: string[]) {
  const { fields } = parseDirectiveFields(content);
  const src = safeUrl(fields.src || fields.image);
  const alt = escapeHtml(fields.alt || "");
  const caption = fields.caption || fields.title || "";
  const credit = fields.credit || "";
  const variant = fields.variant === "full" ? "full" : "contained";

  if (!src) {
    return "";
  }

  const captionParts = [caption, credit ? `Credit: ${credit}` : ""].filter(Boolean);

  return [
    `<figure class="vector-image vector-image-${variant}">`,
    `<img src="${src}" alt="${alt}" loading="lazy" decoding="async" />`,
    captionParts.length ? `<figcaption>${captionParts.map(renderInlineMarkdown).join(" · ")}</figcaption>` : "",
    "</figure>",
  ]
    .filter(Boolean)
    .join("\n");
}

function renderQuote(content: string[]) {
  const { fields, body } = parseDirectiveFields(content);
  const quote = body.join("\n").trim() || fields.quote || fields.text || "";
  const attribution = fields.attribution || fields.author || fields.source || "";

  if (!quote) {
    return "";
  }

  return [
    `<figure class="vector-quote">`,
    `<blockquote>${renderMarkdown(quote).html}</blockquote>`,
    attribution ? `<figcaption>${renderInlineMarkdown(attribution)}</figcaption>` : "",
    "</figure>",
  ]
    .filter(Boolean)
    .join("\n");
}

function renderCards(content: string[], counts: HeadingIdCounts) {
  const items = parseDirectiveItems(content);

  if (!items.length) {
    return "";
  }

  return `<div class="vector-card-grid">${items
    .map((item) => {
      const href = safeUrl(item.href);
      const body = item.body || item.text || item.description || "";

      return [
        href ? `<a class="vector-card" href="${href}">` : `<article class="vector-card">`,
        item.title ? `<h3>${renderInlineMarkdown(item.title)}</h3>` : "",
        body ? `<div>${renderMarkdown(body, counts).html}</div>` : "",
        href ? "</a>" : "</article>",
      ].join("\n");
    })
    .join("\n")}</div>`;
}

function renderFaq(content: string[], counts: HeadingIdCounts) {
  const items = parseDirectiveItems(content);

  if (!items.length) {
    return "";
  }

  return `<div class="vector-faq">${items
    .map((item) => {
      const question = item.question || item.title || "";
      const answer = item.answer || item.body || "";

      return [
        `<details>`,
        `<summary>${renderInlineMarkdown(question)}</summary>`,
        answer ? `<div>${renderMarkdown(answer, counts).html}</div>` : "",
        "</details>",
      ].join("\n");
    })
    .join("\n")}</div>`;
}

function renderSteps(content: string[], counts: HeadingIdCounts) {
  const items = parseDirectiveItems(content);

  if (!items.length) {
    return "";
  }

  return `<ol class="vector-steps">${items
    .map((item, index) => {
      const title = item.title || item.step || `Step ${index + 1}`;
      const body = item.body || item.text || "";

      return [
        `<li>`,
        `<span>${index + 1}</span>`,
        `<div>`,
        `<h3>${renderInlineMarkdown(title)}</h3>`,
        body ? renderMarkdown(body, counts).html : "",
        "</div>",
        "</li>",
      ].join("\n");
    })
    .join("\n")}</ol>`;
}

function getVideoEmbedUrl(fields: Record<string, string>) {
  const provider = fields.provider?.toLowerCase();
  const id = fields.id;
  const url = fields.url;

  if (provider === "youtube" && id) {
    return `https://www.youtube.com/embed/${encodeURIComponent(id)}`;
  }

  if (provider === "vimeo" && id) {
    return `https://player.vimeo.com/video/${encodeURIComponent(id)}`;
  }

  if (url && /^https:\/\/(www\.)?(youtube\.com\/embed\/|player\.vimeo\.com\/video\/|www\.loom\.com\/embed\/)/i.test(url)) {
    return url;
  }

  return "";
}

function renderVideo(content: string[]) {
  const { fields } = parseDirectiveFields(content);
  const src = safeUrl(getVideoEmbedUrl(fields));
  const title = fields.title || "Embedded video";

  if (!src) {
    return "";
  }

  return [
    `<figure class="vector-video">`,
    `<iframe src="${src}" title="${escapeHtml(title)}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
    fields.caption ? `<figcaption>${renderInlineMarkdown(fields.caption)}</figcaption>` : "",
    "</figure>",
  ]
    .filter(Boolean)
    .join("\n");
}

function renderCarousel(content: string[]) {
  const items = parseDirectiveItems(content).filter((item) => safeUrl(item.src || item.image));

  if (!items.length) {
    return "";
  }

  return `<div class="vector-carousel" aria-label="Media carousel">${items
    .map((item) => {
      const src = safeUrl(item.src || item.image);
      const alt = escapeHtml(item.alt || item.title || "");

      return [
        `<figure>`,
        `<img src="${src}" alt="${alt}" loading="lazy" decoding="async" />`,
        item.caption ? `<figcaption>${renderInlineMarkdown(item.caption)}</figcaption>` : "",
        "</figure>",
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n")}</div>`;
}

function normalizeDirectiveName(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function collectDirective(lines: string[], startIndex: number) {
  const opening = lines[startIndex].trim();
  const name = normalizeDirectiveName(opening.replace(/^:::\s*/, ""));
  const content: string[] = [];
  let index = startIndex + 1;

  for (; index < lines.length; index += 1) {
    const line = lines[index].trim();

    if (line === ":::") {
      break;
    }

    content.push(lines[index]);
  }

  return {
    name,
    content,
    endIndex: Math.min(index, lines.length - 1),
  };
}

function splitColumns(content: string[]) {
  const columns: string[][] = [];
  let current: string[] | null = null;

  for (const line of content) {
    const marker = line.trim();

    if (marker === "::left" || marker === "::right" || marker.startsWith("::column")) {
      if (current) {
        columns.push(current);
      }
      current = [];
      continue;
    }

    if (marker === "::") {
      if (current) {
        columns.push(current);
        current = null;
      }
      continue;
    }

    if (current) {
      current.push(line);
    }
  }

  if (current) {
    columns.push(current);
  }

  return columns;
}

function renderDirective(name: string, content: string[], counts: HeadingIdCounts) {
  const normalized = name || "note";

  if (normalized === "split" || normalized === "columns" || normalized === "two-column" || normalized === "two-columns") {
    const columns = splitColumns(content);
    const renderedColumns = (columns.length ? columns : [content]).map((column) => `<div>${renderMarkdown(column.join("\n"), counts).html}</div>`);
    return `<div class="vector-split">${renderedColumns.join("\n")}</div>`;
  }

  if (normalized === "stat" || normalized === "stat-callout") {
    const [value = "", ...description] = content.filter((line) => line.trim());
    return [
      `<aside class="vector-stat">`,
      `<p class="vector-stat-value">${renderInlineMarkdown(value)}</p>`,
      description.length ? `<div class="vector-stat-body">${renderMarkdown(description.join("\n"), counts).html}</div>` : "",
      "</aside>",
    ]
      .filter(Boolean)
      .join("\n");
  }

  if (normalized === "button") {
    return renderButton(content);
  }

  if (normalized === "cta") {
    return renderCta(content, counts);
  }

  if (normalized === "image" || normalized === "figure") {
    return renderImage(content);
  }

  if (normalized === "quote" || normalized === "pullquote") {
    return renderQuote(content);
  }

  if (normalized === "cards" || normalized === "card-grid") {
    return renderCards(content, counts);
  }

  if (normalized === "faq" || normalized === "accordion") {
    return renderFaq(content, counts);
  }

  if (normalized === "steps" || normalized === "step-list") {
    return renderSteps(content, counts);
  }

  if (normalized === "video") {
    return renderVideo(content);
  }

  if (normalized === "carousel" || normalized === "gallery") {
    return renderCarousel(content);
  }

  const blockClass = normalized === "summary-box" ? "summary" : normalized;
  return `<aside class="vector-block vector-block-${blockClass}">${renderMarkdown(content.join("\n"), counts).html}</aside>`;
}

export function renderMarkdown(markdown: string, headingCounts: HeadingIdCounts = new Map()): RenderedMarkdown {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const html: string[] = [];
  const tableOfContents: MarkdownTableOfContentsItem[] = [];
  let inUnorderedList = false;
  let inOrderedList = false;
  let inCodeBlock = false;

  const closeLists = () => {
    if (inUnorderedList) {
      html.push("</ul>");
      inUnorderedList = false;
    }
    if (inOrderedList) {
      html.push("</ol>");
      inOrderedList = false;
    }
  };

  for (let lineIndex = 0; lineIndex < lines.length; lineIndex += 1) {
    const rawLine = lines[lineIndex];
    const line = rawLine.trimEnd();
    const blockLine = line.trimStart();

    if (blockLine.startsWith("```")) {
      closeLists();
      if (!inCodeBlock) {
        html.push("<pre><code>");
        inCodeBlock = true;
      } else {
        html.push("</code></pre>");
        inCodeBlock = false;
      }
      continue;
    }

    if (inCodeBlock) {
      html.push(`${escapeHtml(rawLine)}\n`);
      continue;
    }

    if (blockLine.startsWith(":::")) {
      closeLists();
      const directive = collectDirective(lines, lineIndex);
      html.push(renderDirective(directive.name, directive.content, headingCounts));
      lineIndex = directive.endIndex;
      continue;
    }

    if (isTableRow(blockLine) && lineIndex + 1 < lines.length && isTableDelimiter(lines[lineIndex + 1])) {
      closeLists();
      const tableLines = [blockLine, lines[lineIndex + 1].trimStart()];
      lineIndex += 2;

      while (lineIndex < lines.length && lines[lineIndex].trim() && isTableRow(lines[lineIndex].trimStart())) {
        tableLines.push(lines[lineIndex].trimStart());
        lineIndex += 1;
      }

      lineIndex -= 1;
      html.push(renderTable(tableLines));
      continue;
    }

    if (!blockLine) {
      closeLists();
      continue;
    }

    if (/^#{1,6}\s/.test(blockLine)) {
      closeLists();
      const level = blockLine.match(/^#+/)?.[0].length ?? 1;
      const heading = parseHeadingText(blockLine.replace(/^#{1,6}\s+/, ""));
      const cleanHeadingText = stripInlineMarkdown(heading.text);

      if (level === 2 && cleanHeadingText.toLowerCase() === "table of contents") {
        while (lineIndex + 1 < lines.length && !/^#{1,6}\s/.test(lines[lineIndex + 1])) {
          lineIndex += 1;
        }
        continue;
      }

      const id = slugifyHeading(heading.text, headingCounts, heading.explicitId);

      if (level === 2 || level === 3) {
        tableOfContents.push({ id, text: cleanHeadingText, level });
      }

      html.push(`<h${level} id="${id}">${renderInlineMarkdown(heading.text)}</h${level}>`);
      continue;
    }

    if (/^!\[[^\]]*\]\([^)]+\)$/.test(blockLine)) {
      closeLists();
      html.push(`<figure class="vector-image">${renderInlineMarkdown(blockLine)}</figure>`);
      continue;
    }

    if (/^>\s?/.test(blockLine)) {
      closeLists();
      html.push(`<blockquote>${renderInlineMarkdown(blockLine.replace(/^>\s?/, ""))}</blockquote>`);
      continue;
    }

    if (/^\d+\.\s+/.test(blockLine)) {
      if (!inOrderedList) {
        closeLists();
        html.push("<ol>");
        inOrderedList = true;
      }
      html.push(`<li>${renderInlineMarkdown(blockLine.replace(/^\d+\.\s+/, ""))}</li>`);
      continue;
    }

    if (/^[-*]\s+/.test(blockLine)) {
      if (!inUnorderedList) {
        closeLists();
        html.push("<ul>");
        inUnorderedList = true;
      }
      html.push(`<li>${renderInlineMarkdown(blockLine.replace(/^[-*]\s+/, ""))}</li>`);
      continue;
    }

    if (/^---+$/.test(blockLine)) {
      closeLists();
      html.push("<hr />");
      continue;
    }

    closeLists();
    html.push(`<p>${renderInlineMarkdown(blockLine)}</p>`);
  }

  closeLists();

  if (inCodeBlock) {
    html.push("</code></pre>");
  }

  return {
    html: html.join("\n"),
    tableOfContents,
  };
}

export function markdownToHtml(markdown: string): string {
  return renderMarkdown(markdown).html;
}
