import { LegalDocumentPage } from "@/components/public/legalDocumentPage";
import { getLegalDocumentMeta } from "@/lib/legal/documents";
import { buildPageMetadata } from "@/lib/seo/metadata";

const document = getLegalDocumentMeta("privacy-policy");

export const metadata = buildPageMetadata({
  title: `${document.title} | I Want That!`,
  description: document.description,
  path: document.path,
  image: "/images/og/privacy-policy-og.png",
});

export default function PrivacyPolicyPage() {
  return <LegalDocumentPage slug="privacy-policy" />;
}
