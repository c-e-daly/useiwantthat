import { LegalDocumentPage } from "@/components/public/legalDocumentPage";
import { getLegalDocumentMeta } from "@/lib/legal/documents";
import { buildPageMetadata } from "@/lib/seo/metadata";

const document = getLegalDocumentMeta("user-conduct-and-content-policy");

export const metadata = buildPageMetadata({
  title: `${document.title} | I Want That!`,
  description: document.description,
  path: document.path,
  image: "/images/og/user-conduct-and-content-policy-og.png",
});

export default function UserConductAndContentPolicyPage() {
  return <LegalDocumentPage slug="user-conduct-and-content-policy" />;
}
