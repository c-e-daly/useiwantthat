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
    `<div class="prophet-table-wrap"><table>`,
    "<thead>",
    `<tr>${headers.map((cell, index) => `<th${renderAlign(index)}>${renderInlineMarkdown(cell)}</th>`).join("")}</tr>`,
    "</thead>",
    "<tbody>",
    ...rows.map((row) => `<tr>${row.map((cell, index) => `<td${renderAlign(index)}>${renderInlineMarkdown(cell)}</td>`).join("")}</tr>`),
    "</tbody>",
    "</table></div>",
  ].join("\n");
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
    return `<div class="prophet-split">${renderedColumns.join("\n")}</div>`;
  }

  if (normalized === "stat" || normalized === "stat-callout") {
    const [value = "", ...description] = content.filter((line) => line.trim());
    return [
      `<aside class="prophet-stat">`,
      `<p class="prophet-stat-value">${renderInlineMarkdown(value)}</p>`,
      description.length ? `<div class="prophet-stat-body">${renderMarkdown(description.join("\n"), counts).html}</div>` : "",
      "</aside>",
    ]
      .filter(Boolean)
      .join("\n");
  }

  const blockClass = normalized === "summary-box" ? "summary" : normalized;
  return `<aside class="prophet-block prophet-block-${blockClass}">${renderMarkdown(content.join("\n"), counts).html}</aside>`;
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

    if (line.startsWith("```")) {
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

    if (line.trimStart().startsWith(":::")) {
      closeLists();
      const directive = collectDirective(lines, lineIndex);
      html.push(renderDirective(directive.name, directive.content, headingCounts));
      lineIndex = directive.endIndex;
      continue;
    }

    if (isTableRow(line) && lineIndex + 1 < lines.length && isTableDelimiter(lines[lineIndex + 1])) {
      closeLists();
      const tableLines = [line, lines[lineIndex + 1]];
      lineIndex += 2;

      while (lineIndex < lines.length && lines[lineIndex].trim() && isTableRow(lines[lineIndex])) {
        tableLines.push(lines[lineIndex]);
        lineIndex += 1;
      }

      lineIndex -= 1;
      html.push(renderTable(tableLines));
      continue;
    }

    if (!line) {
      closeLists();
      continue;
    }

    if (/^#{1,6}\s/.test(line)) {
      closeLists();
      const level = line.match(/^#+/)?.[0].length ?? 1;
      const heading = parseHeadingText(line.replace(/^#{1,6}\s+/, ""));
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

    if (/^!\[[^\]]*\]\([^)]+\)$/.test(line.trim())) {
      closeLists();
      html.push(`<figure class="prophet-image">${renderInlineMarkdown(line.trim())}</figure>`);
      continue;
    }

    if (/^>\s?/.test(line)) {
      closeLists();
      html.push(`<blockquote>${renderInlineMarkdown(line.replace(/^>\s?/, ""))}</blockquote>`);
      continue;
    }

    if (/^\d+\.\s+/.test(line)) {
      if (!inOrderedList) {
        closeLists();
        html.push("<ol>");
        inOrderedList = true;
      }
      html.push(`<li>${renderInlineMarkdown(line.replace(/^\d+\.\s+/, ""))}</li>`);
      continue;
    }

    if (/^[-*]\s+/.test(line)) {
      if (!inUnorderedList) {
        closeLists();
        html.push("<ul>");
        inUnorderedList = true;
      }
      html.push(`<li>${renderInlineMarkdown(line.replace(/^[-*]\s+/, ""))}</li>`);
      continue;
    }

    if (/^---+$/.test(line)) {
      closeLists();
      html.push("<hr />");
      continue;
    }

    closeLists();
    html.push(`<p>${renderInlineMarkdown(line)}</p>`);
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
