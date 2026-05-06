import type { Metadata } from "next";
import { PlaybookPage } from "@/components/marketing/PlaybookPage";
import { playbooks } from "@/lib/playbooks";

export const metadata: Metadata = {
  title: `${playbooks.exitIntent.title} | I Want That!`,
  description: playbooks.exitIntent.description,
};

export default function ExitIntentPlaybookPage() {
  return <PlaybookPage playbook={playbooks.exitIntent} />;
}
