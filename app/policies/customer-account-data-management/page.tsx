import type { Metadata } from "next";
import { LegalDocumentPage } from "@/components/public/legalDocumentPage";
import { getLegalDocumentMeta } from "@/lib/legal/documents";

const document = getLegalDocumentMeta("customer-account-data-management");

export const metadata: Metadata = {
  title: `${document.title} | I Want That!`,
  description: document.description,
};

export default function CustomerAccountDataManagementPage() {
  return <LegalDocumentPage slug="customer-account-data-management" />;
}
