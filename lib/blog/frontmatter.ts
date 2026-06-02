import type { PostFrontmatter } from "@/lib/blog/vector-frontmatter.types";

type YamlContainer = Record<string, unknown> | unknown[];

type StackItem = {
  indent: number;
  value: YamlContainer;
  key?: string;
};

export type ParsedMarkdown = {
  frontmatter: Partial<PostFrontmatter> | null;
  content: string;
};

function stripInlineComment(value: string) {
  let quote: string | null = null;

  for (let index = 0; index < value.length; index += 1) {
    const character = value[index];
    const previous = value[index - 1];

    if ((character === `"` || character === "'") && previous !== "\\") {
      quote = quote === character ? null : quote ?? character;
    }

    if (character === "#" && !quote && (index === 0 || /\s/.test(value[index - 1]))) {
      return value.slice(0, index).trimEnd();
    }
  }

  return value.trimEnd();
}

function parseScalar(value: string): unknown {
  const clean = stripInlineComment(value).trim();

  if (clean === "") {
    return "";
  }

  if (clean === "true") {
    return true;
  }

  if (clean === "false") {
    return false;
  }

  if (clean === "null" || clean === "~") {
    return null;
  }

  if (clean === "[]") {
    return [];
  }

  if (clean === "{}") {
    return {};
  }

  if (/^-?\d+(\.\d+)?$/.test(clean)) {
    return Number(clean);
  }

  if (
    (clean.startsWith(`"`) && clean.endsWith(`"`)) ||
    (clean.startsWith("'") && clean.endsWith("'"))
  ) {
    return clean.slice(1, -1);
  }

  return clean;
}

function setValue(parent: YamlContainer, key: string | undefined, value: unknown) {
  if (Array.isArray(parent)) {
    parent.push(value);
    return;
  }

  if (key) {
    parent[key] = value;
  }
}

function findParent(stack: StackItem[], indent: number) {
  while (stack.length > 1 && stack[stack.length - 1].indent >= indent) {
    stack.pop();
  }

  return stack[stack.length - 1];
}

function nextMeaningfulIndent(lines: string[], startIndex: number) {
  for (let index = startIndex + 1; index < lines.length; index += 1) {
    const rawLine = lines[index];
    const trimmed = rawLine.trim();

    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    return rawLine.match(/^ */)?.[0].length ?? 0;
  }

  return null;
}

function createContainerForNextLine(lines: string[], index: number): YamlContainer {
  const indent = nextMeaningfulIndent(lines, index);

  if (indent === null) {
    return {};
  }

  const nextLine = lines.find((line, lineIndex) => lineIndex > index && line.trim() && !line.trim().startsWith("#"));
  return nextLine?.trimStart().startsWith("- ") ? [] : {};
}

export function parseYamlSubset(source: string): Record<string, unknown> {
  const root: Record<string, unknown> = {};
  const stack: StackItem[] = [{ indent: -1, value: root }];
  const lines = source.replace(/\r\n/g, "\n").split("\n");

  lines.forEach((rawLine, index) => {
    const trimmed = rawLine.trim();

    if (!trimmed || trimmed.startsWith("#")) {
      return;
    }

    const indent = rawLine.match(/^ */)?.[0].length ?? 0;
    const parent = findParent(stack, indent);
    const line = stripInlineComment(trimmed);

    if (line.startsWith("- ")) {
      const item = line.slice(2).trim();
      let array = parent.value;

      if (!Array.isArray(array)) {
        if (parent.key && !Array.isArray((parent.value as Record<string, unknown>)[parent.key])) {
          (parent.value as Record<string, unknown>)[parent.key] = [];
        }
        array = parent.key ? ((parent.value as Record<string, unknown>)[parent.key] as unknown[]) : [];
      }

      if (!Array.isArray(array)) {
        return;
      }

      const keyValue = item.match(/^([^:]+):\s*(.*)$/);

      if (keyValue && !item.startsWith(`"`) && !item.startsWith("'")) {
        const objectItem: Record<string, unknown> = {};
        objectItem[keyValue[1].trim()] = parseScalar(keyValue[2]);
        array.push(objectItem);
        stack.push({ indent, value: objectItem });
        return;
      }

      array.push(parseScalar(item));
      return;
    }

    const keyValue = line.match(/^([^:]+):\s*(.*)$/);

    if (!keyValue) {
      return;
    }

    const key = keyValue[1].trim();
    const value = keyValue[2];

    if (value === "") {
      const container = createContainerForNextLine(lines, index);
      setValue(parent.value, key, container);
      stack.push({ indent, value: container, key });
      return;
    }

    setValue(parent.value, key, parseScalar(value));
  });

  return root;
}

export function parseMarkdownWithFrontmatter(markdown: string): ParsedMarkdown {
  const normalized = markdown.replace(/\r\n/g, "\n");

  if (!normalized.startsWith("---\n")) {
    return { frontmatter: null, content: markdown };
  }

  const closingIndex = normalized.indexOf("\n---", 4);

  if (closingIndex < 0) {
    return { frontmatter: null, content: markdown };
  }

  const yaml = normalized.slice(4, closingIndex);
  const bodyStart = normalized.indexOf("\n", closingIndex + 4);
  const content = bodyStart >= 0 ? normalized.slice(bodyStart + 1) : "";

  return {
    frontmatter: parseYamlSubset(yaml) as Partial<PostFrontmatter>,
    content,
  };
}
