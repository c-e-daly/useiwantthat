import type { Metadata } from "next";
import { PlaybookPage } from "@/components/marketing/PlaybookPage";
import { playbooks } from "@/lib/playbooks";

export const metadata: Metadata = {
  title: `${playbooks.clearance.title} | I Want That!`,
  description: playbooks.clearance.description,
};

export default function ClearancePlaybookPage() {
  return <PlaybookPage playbook={playbooks.clearance} />;
}
