import type { Metadata } from "next";
import { PlaybookPage } from "@/components/marketing/PlaybookPage";
import { playbooks } from "@/lib/playbooks";

export const metadata: Metadata = {
  title: `${playbooks.counterOffer.title} | I Want That!`,
  description: playbooks.counterOffer.description,
};

export default function CounterOfferPlaybookPage() {
  return <PlaybookPage playbook={playbooks.counterOffer} />;
}
