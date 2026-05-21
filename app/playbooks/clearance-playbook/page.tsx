import { PlaybookPage } from "@/components/marketing/PlaybookPage";
import { playbooks } from "@/lib/playbooks";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: `${playbooks.clearance.title} | I Want That!`,
  description: playbooks.clearance.description,
  path: playbooks.clearance.href,
  image: "/images/og/clearance-playbook-og.png",
});

export default function ClearancePlaybookPage() {
  return <PlaybookPage playbook={playbooks.clearance} />;
}
