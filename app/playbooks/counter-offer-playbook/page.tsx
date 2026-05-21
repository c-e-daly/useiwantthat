import { PlaybookPage } from "@/components/marketing/PlaybookPage";
import { playbooks } from "@/lib/playbooks";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: `${playbooks.counterOffer.title} | I Want That!`,
  description: playbooks.counterOffer.description,
  path: playbooks.counterOffer.href,
  image: "/images/og/counter-offer-playbook-og.png",
});

export default function CounterOfferPlaybookPage() {
  return <PlaybookPage playbook={playbooks.counterOffer} />;
}
