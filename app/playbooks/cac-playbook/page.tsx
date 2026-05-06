import type { Metadata } from "next";
import { PlaybookPage } from "@/components/marketing/PlaybookPage";
import { playbooks } from "@/lib/playbooks";

export const metadata: Metadata = {
  title: `${playbooks.cac.title} | I Want That!`,
  description: playbooks.cac.description,
};

export default function CACPlaybookPage() {
  return <PlaybookPage playbook={playbooks.cac} />;
}
