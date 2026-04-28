import type { Metadata } from "next";
import { LegalDocumentPage } from "@/components/public/legalDocumentPage";
import { getLegalDocumentMeta } from "@/lib/legal/documents";

const document = getLegalDocumentMeta("user-conduct-and-content-policy");

export const metadata: Metadata = {
  title: `${document.title} | I Want That!`,
  description: document.description,
};

export default function UserConductAndContentPolicyPage() {
  return <LegalDocumentPage slug="user-conduct-and-content-policy" />;
}
