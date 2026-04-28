import type { Metadata } from "next";
import { LegalDocumentPage } from "@/components/public/legalDocumentPage";
import { getLegalDocumentMeta } from "@/lib/legal/documents";

const document = getLegalDocumentMeta("cookie-policy");

export const metadata: Metadata = {
  title: `${document.title} | I Want That!`,
  description: document.description,
};

export default function CookiePolicyPage() {
  return <LegalDocumentPage slug="cookie-policy" />;
}
