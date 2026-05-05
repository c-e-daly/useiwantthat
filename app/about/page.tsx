import type { Metadata } from "next";
import { BlankPage } from "@/components/public/blankPage";

export const metadata: Metadata = {
  title: "About | I Want That!",
  description: "About I Want That!.",
};

export default function AboutPage() {
  return <BlankPage title="About" />;
}
