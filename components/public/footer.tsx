import Link from "next/link";

const playbookLinks = [
  { href: "/playbooks/cac-playbook", label: "CAC Performance" },
  { href: "/playbooks/clearance-playbook", label: "Clearance" },
  { href: "/playbooks/counter-offer-playbook", label: "Counter Offers" },
  { href: "/playbooks/exit-intent-playbook", label: "Exit Intent" },
  { href: "/playbooks/programs-playbook", label: "Offer Programs" },
  { href: "/playbooks/remarketing-playbook", label: "Remarketing" },
];

const legalLinks = [
  { href: "/policies/privacy-policy", label: "Privacy Policy" },
  { href: "/policies/cookie-policy", label: "Cookie Policy" },
  { href: "/policies/terms-of-service", label: "Terms of Service" },
  { href: "/policies/law-enforcement-data-requests", label: "Law Enforcement Requests" },
  { href: "/policies/subprocessors", label: "Subprocessors" },
  { href: "/policies/user-conduct-and-content-policy", label: "User Conduct" },
];

const linkClassName =
  "text-sm text-neutral-muted transition hover:text-brand focus-visible:text-brand";

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <Link href={href} className={linkClassName}>
        {label}
      </Link>
    </li>
  );
}

function FooterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-black">
        {title}
      </h2>
      <ul className="mt-5 space-y-3">{children}</ul>
    </div>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-surface-border bg-surface-subtle/60">
      <div className="container mx-auto px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(220px,1fr)_2fr] lg:gap-16">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">
              Core Nav
            </p>
            <h2 className="mt-4 max-w-xs text-3xl font-bold tracking-tight text-black">
              Make every customer interaction work harder.
            </h2>
            <p className="mt-5 max-w-sm text-sm leading-6 text-neutral-muted">
              Tools and operating systems for better offers, stronger yield, and
              more profitable commerce.
            </p>
          </div>

          <nav aria-label="Core navigation" className="grid gap-10 sm:grid-cols-2 xl:grid-cols-5">
            <FooterSection title="Products">
              <FooterLink href="/ask-rami" label="Ask Rami" />
              <FooterLink href="/vector" label="Vector" />
            </FooterSection>

            <FooterSection title="Platforms">
              <FooterLink href="/platforms#woocommerce" label="WooCommerce" />
              <FooterLink href="/platforms#shopify" label="Shopify" />
            </FooterSection>

            <FooterSection title="Tools">
              <FooterLink href="/tools/cac-calculator" label="CAC Yield Calculator" />
              <FooterLink href="/tools/goodness-of-fit" label="Goodness of Fit" />
              <FooterLink href="/tools/price-builder" label="Price Builder" />
            </FooterSection>

            <FooterSection title="Playbooks">
              {playbookLinks.map((link) => (
                <FooterLink key={link.href} {...link} />
              ))}
            </FooterSection>

            <FooterSection title="Legal Center">
              {legalLinks.map((link) => (
                <FooterLink key={link.href} {...link} />
              ))}
            </FooterSection>
          </nav>
        </div>

        <div className="mt-14 border-t border-surface-border pt-6">
          <p className="text-sm text-neutral-muted">
            &copy; {currentYear} I Want That! All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
