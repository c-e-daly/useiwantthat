import type { Metadata } from "next";
import { BlankPage } from "@/components/public/blankPage";

export const metadata: Metadata = {
  title: "Ask Rami | I Want That!",
  description: "Ask Rami from I Want That!.",
};

export default function AskRamiPage() {
  return <BlankPage title="Ask Rami" />;
}
