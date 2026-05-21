import { LegalDocumentPage } from "@/components/public/legalDocumentPage";
import { getLegalDocumentMeta } from "@/lib/legal/documents";
import { buildPageMetadata } from "@/lib/seo/metadata";

const document = getLegalDocumentMeta("subprocessors");

export const metadata = buildPageMetadata({
  title: `${document.title} | I Want That!`,
  description: document.description,
  path: document.path,
  image: "/images/og/subprocessors-og.png",
});

export default function SubprocessorsPage() {
  return <LegalDocumentPage slug="subprocessors" />;
}
