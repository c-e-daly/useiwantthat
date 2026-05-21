import { PlaybookPage } from "@/components/marketing/PlaybookPage";
import { playbooks } from "@/lib/playbooks";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: `${playbooks.exitIntent.title} | I Want That!`,
  description: playbooks.exitIntent.description,
  path: playbooks.exitIntent.href,
  image: "/images/og/exit-intent-playbook-og.png",
});

export default function ExitIntentPlaybookPage() {
  return <PlaybookPage playbook={playbooks.exitIntent} />;
}
