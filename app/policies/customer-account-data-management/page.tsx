import { LegalDocumentPage } from "@/components/public/legalDocumentPage";
import { getLegalDocumentMeta } from "@/lib/legal/documents";
import { buildPageMetadata } from "@/lib/seo/metadata";

const document = getLegalDocumentMeta("customer-account-data-management");

export const metadata = buildPageMetadata({
  title: `${document.title} | I Want That!`,
  description: document.description,
  path: document.path,
  image: "/images/og/customer-account-data-management-og.png",
});

export default function CustomerAccountDataManagementPage() {
  return <LegalDocumentPage slug="customer-account-data-management" />;
}
