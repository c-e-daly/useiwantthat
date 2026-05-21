import { PlaybookPage } from "@/components/marketing/PlaybookPage";
import { playbooks } from "@/lib/playbooks";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: `${playbooks.cac.title} | I Want That!`,
  description: playbooks.cac.description,
  path: playbooks.cac.href,
  image: "/images/og/cac-playbook-og.png",
});

export default function CACPlaybookPage() {
  return <PlaybookPage playbook={playbooks.cac} />;
}
