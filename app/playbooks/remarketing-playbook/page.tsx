import { PlaybookPage } from "@/components/marketing/PlaybookPage";
import { playbooks } from "@/lib/playbooks";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: `${playbooks.remarketing.title} | I Want That!`,
  description: playbooks.remarketing.description,
  path: playbooks.remarketing.href,
  image: "/images/og/remarketing-playbook-og.png",
});

export default function RemarketingPlaybookPage() {
  return <PlaybookPage playbook={playbooks.remarketing} />;
}
