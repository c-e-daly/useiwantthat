import type { Metadata } from "next";
import { BlankPage } from "@/components/public/blankPage";

export const metadata: Metadata = {
  title: "Contact | I Want That!",
  description: "Contact I Want That!.",
};

export default function ContactPage() {
  return <BlankPage title="Contact" />;
}
