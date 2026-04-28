import type { Metadata } from "next";
import { LegalDocumentPage } from "@/components/public/legalDocumentPage";
import { getLegalDocumentMeta } from "@/lib/legal/documents";

const document = getLegalDocumentMeta("terms-of-service");

export const metadata: Metadata = {
  title: `${document.title} | I Want That!`,
  description: document.description,
};

export default function TermsOfServicePage() {
  return <LegalDocumentPage slug="terms-of-service" />;
}
