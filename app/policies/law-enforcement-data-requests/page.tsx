import { LegalDocumentPage } from "@/components/public/legalDocumentPage";
import { getLegalDocumentMeta } from "@/lib/legal/documents";
import { buildPageMetadata } from "@/lib/seo/metadata";

const document = getLegalDocumentMeta("law-enforcement-data-requests");

export const metadata = buildPageMetadata({
  title: `${document.title} | I Want That!`,
  description: document.description,
  path: document.path,
  image: "/images/og/law-enforcement-data-request-og.png",
});

export default function LawEnforcementDataRequestsPage() {
  return <LegalDocumentPage slug="law-enforcement-data-requests" />;
}
