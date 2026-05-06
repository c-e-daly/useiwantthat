import type { Metadata } from "next";
import { PlaybookPage } from "@/components/marketing/PlaybookPage";
import { playbooks } from "@/lib/playbooks";

export const metadata: Metadata = {
  title: `${playbooks.programs.title} | I Want That!`,
  description: playbooks.programs.description,
};

export default function OfferProgramsPlaybookPage() {
  return <PlaybookPage playbook={playbooks.programs} />;
}
