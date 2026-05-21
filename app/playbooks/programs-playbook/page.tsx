import { PlaybookPage } from "@/components/marketing/PlaybookPage";
import { playbooks } from "@/lib/playbooks";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: `${playbooks.programs.title} | I Want That!`,
  description: playbooks.programs.description,
  path: playbooks.programs.href,
  image: "/images/og/programs-playbook-og.png",
});

export default function OfferProgramsPlaybookPage() {
  return <PlaybookPage playbook={playbooks.programs} />;
}
