import { readFile } from "node:fs/promises";
import path from "node:path";
import { markdownToHtml } from "@/lib/blog/markdown";

export type LegalDocumentSlug =
  | "terms-of-service"
  | "subprocessors"
  | "privacy-policy"
  | "cookie-policy"
  | "customer-account-data-management"
  | "user-conduct-and-content-policy"
  | "law-enforcement-data-requests";

export type LegalDocumentMeta = {
  slug: LegalDocumentSlug;
  title: string;
  description: string;
  fileName: string;
  legacyPath: string;
};

export const LEGAL_DOCUMENTS: LegalDocumentMeta[] = [
  {
    slug: "terms-of-service",
    title: "Terms of Service",
    description:
      "Terms governing access to and use of I Want That! services and software.",
    fileName: "terms-of-service.md",
    legacyPath: "/terms-of-service-2/",
  },
  {
    slug: "subprocessors",
    title: "Subprocessors",
    description:
      "List of subprocessors that may process data on behalf of I Want That!.",
    fileName: "subprocessors.md",
    legacyPath: "/subprocesors/",
  },
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    description:
      "How I Want That! collects, uses, shares, and protects personal information.",
    fileName: "privacy-policy.md",
    legacyPath: "/privacy-policy/",
  },
  {
    slug: "cookie-policy",
    title: "Cookie Policy",
    description:
      "How I Want That! uses cookies and related technologies across its services.",
    fileName: "cookie-policy.md",
    legacyPath: "/cookie-policy/",
  },
  {
    slug: "customer-account-data-management",
    title: "Customer Account Data Management",
    description:
      "Operational policy for customer account data access, retention, export, and deletion.",
    fileName: "customer-account-data-management.md",
    legacyPath: "/customer-account-data-management/",
  },
  {
    slug: "user-conduct-and-content-policy",
    title: "User Conduct and Content Policy",
    description:
      "Rules governing acceptable use, user conduct, and content standards.",
    fileName: "user-conduct-and-content-policy.md",
    legacyPath: "/user-conduct-and-content-policy/",
  },
  {
    slug: "law-enforcement-data-requests",
    title: "Law Enforcement Data Requests",
    description:
      "Guidelines for law enforcement, government, and regulatory data requests.",
    fileName: "law-enforcement-data-requests.md",
    legacyPath: "/law-enforcement-data-requests/",
  },
];

const LEGAL_DOCUMENTS_BY_SLUG = new Map(
  LEGAL_DOCUMENTS.map((document) => [document.slug, document])
);

export function getLegalDocumentMeta(slug: LegalDocumentSlug) {
  const document = LEGAL_DOCUMENTS_BY_SLUG.get(slug);

  if (!document) {
    throw new Error(`Unknown legal document slug: ${slug}`);
  }

  return document;
}

export async function getLegalDocumentContent(slug: LegalDocumentSlug) {
  const document = getLegalDocumentMeta(slug);
  const filePath = path.join(process.cwd(), "content", "legal", document.fileName);
  const markdown = await readFile(filePath, "utf8");

  return {
    ...document,
    markdown,
    html: markdownToHtml(markdown),
  };
}
