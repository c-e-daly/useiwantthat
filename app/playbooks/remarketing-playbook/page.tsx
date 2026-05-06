import type { Metadata } from "next";
import { PlaybookPage } from "@/components/marketing/PlaybookPage";
import { playbooks } from "@/lib/playbooks";

export const metadata: Metadata = {
  title: `${playbooks.remarketing.title} | I Want That!`,
  description: playbooks.remarketing.description,
};

export default function RemarketingPlaybookPage() {
  return <PlaybookPage playbook={playbooks.remarketing} />;
}
