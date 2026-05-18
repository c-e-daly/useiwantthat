import Link from "next/link";
import { ArrowRight, CalendarDays, Mail, MessageSquare } from "lucide-react";
import { buildPageMetadata } from "@/lib/seo/metadata";

const EMAIL_URL =
  "mailto:chris@useiwantthat.com?subject=I%20Want%20That%20conversation";
const CALL_URL = "https://meetings.hubspot.com/chris-e-daly/customer-demo";
const DEMO_URL = "https://meetings.hubspot.com/chris-e-daly/customer-demo";

export const metadata = buildPageMetadata({
  title: "Contact | I Want That!",
  description: "Contact I Want That! to send an email, book a call, or set up a demo.",
  path: "/contact",
});

const contactOptions = [
  {
    href: EMAIL_URL,
    icon: Mail,
    label: "Send an email",
    description: "Start with context, questions, or the workflow you want to discuss.",
    external: true,
  },
  {
    href: CALL_URL,
    icon: CalendarDays,
    label: "Book a call",
    description: "Talk through your store, your traffic, and where offers could fit.",
    external: true,
  },
  {
    href: DEMO_URL,
    icon: MessageSquare,
    label: "Set a demo",
    description: "Walk through Vector, playbooks, and customer generated offers.",
    external: true,
  },
];

export default function Pricing() {
  return (
    <div className="bg-white">
      <section className="border-b border-surface-border bg-surface-subtle/50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <p className="text-xs font-bold uppercase tracking-widest text-brand">
            Contact
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-[1.05] tracking-tight text-black md:text-6xl">
            Talk through the fastest path to more profitable conversions.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-muted md:text-xl">
            Send a note, book a call, or set up a demo for Vector, Ask Rami, or
            one of the playbooks.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto grid gap-5 px-4 md:grid-cols-3">
          {contactOptions.map(({ href, icon: Icon, label, description, external }) => (
            <Link
              key={label}
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              className="group rounded-askrami border border-surface-border bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-card"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-askrami bg-brand/10 text-brand">
                <Icon className="h-5 w-5" />
              </div>
              <h2 className="mt-6 text-2xl font-bold tracking-tight text-black">
                {label}
              </h2>
              <p className="mt-3 leading-relaxed text-neutral-muted">
                {description}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand">
                Continue
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
