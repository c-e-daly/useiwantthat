'use client'; 

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState, useSyncExternalStore } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';

const subscribe = () => () => {};
const getServerSnapshot = () => false;
const getHostnameSnapshot = () => window.location.hostname.startsWith('app.');
const SHOPIFY_APP_URL = 'https://apps.shopify.com/iwtapp-shop';
const MENU_CLOSE_DELAY_MS = 1500;

const productsNavItems = [
  {
    href: '/ask-rami',
    label: 'Ask Rami',
    description: 'Your Personal Buying Agent',
  },
  {
    href: '/vector',
    label: 'Vector',
    description: 'Offer Intelligence & Decision Platform',
  },
];

const toolsNavItems = [
  {
    href: '/tools/goodness-of-fit',
    label: 'Goodness of Fit',
    description: 'Assess readiness for customer generated offers.',
  },
  {
    href: '/tools/cac-calculator',
    label: 'CAC Calculator',
    description: 'Model ad tax and organic revenue recovery.',
  },
  {
    href: '/tools/price-builder',
    label: 'Price Builder',
    description: 'Test price elasticity and margin guardrails.',
  },
];

const playbookNavItems = [
  {
    href: '/playbooks/cac-playbook',
    label: 'CAC Performance',
    description: 'Use customer generated offers to increase yield from ad traffic.',
  },
  {
    href: '/playbooks/clearance-playbook',
    label: 'Clearance',
    description: 'Move inventory with floor-based offers instead of broad markdowns.',
  },
  {
    href: '/playbooks/counter-offer-playbook',
    label: 'Counter Offers',
    description: 'Turn low offers into margin-safe counter offers.',
  },
  {
    href: '/playbooks/exit-intent-playbook',
    label: 'Exit Intent',
    description: 'Replace exit discounts with purchase intent.',
  },
  {
    href: '/playbooks/programs-playbook',
    label: 'Offer Programs',
    description: 'Align offer rules to campaigns, seasons, and inventory windows.',
  },
  {
    href: '/playbooks/remarketing-playbook',
    label: 'Remarketing',
    description: 'Bring shoppers back without paying for the same click twice.',
  },
];

type MenuKey = 'products' | 'tools' | 'playbooks';
type NavItem = {
  href: string;
  label: string;
  description: string;
};

export function MainHeader() {
  const [openMenu, setOpenMenu] = useState<MenuKey | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const productsMenuRef = useRef<HTMLDivElement>(null);
  const toolsMenuRef = useRef<HTMLDivElement>(null);
  const playbooksMenuRef = useRef<HTMLDivElement>(null);
  const isAppHost = useSyncExternalStore(
    subscribe,
    getHostnameSnapshot,
    getServerSnapshot
  );

  // If we are on the app subdomain, collapse (don't render) this header
  if (isAppHost) return null;

  function openDropdown(menu: MenuKey) {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
    }
    setOpenMenu(menu);
  }

  function closeDropdownWithDelay() {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
    }
    closeTimer.current = setTimeout(() => {
      setOpenMenu(null);
    }, MENU_CLOSE_DELAY_MS);
  }

  function renderDropdown(
    menu: MenuKey,
    label: string,
    items: NavItem[],
    menuRef: React.RefObject<HTMLDivElement | null>,
    widthClass = 'w-72'
  ) {
    const isOpen = openMenu === menu;

    return (
      <div
        ref={menuRef}
        className="relative"
        onMouseEnter={() => openDropdown(menu)}
        onMouseLeave={closeDropdownWithDelay}
        onFocus={() => openDropdown(menu)}
        onBlur={(event) => {
          if (!menuRef.current?.contains(event.relatedTarget)) {
            closeDropdownWithDelay();
          }
        }}
      >
        <button
          type="button"
          className="flex items-center gap-1 text-gray-900 transition duration-150 hover:text-indigo-600 focus:outline-none focus-visible:text-indigo-600"
          aria-haspopup="true"
          aria-expanded={isOpen}
        >
          {label}
          <ChevronDown
            className={`h-4 w-4 transition ${isOpen ? "rotate-180" : ""}`}
          />
        </button>
        <div
          className={`absolute left-1/2 top-full z-50 mt-3 ${widthClass} -translate-x-1/2 rounded-askrami border border-surface-border bg-white p-2 shadow-xl transition duration-150 ${
            isOpen
              ? "visible opacity-100"
              : "invisible pointer-events-none opacity-0"
          }`}
        >
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpenMenu(null)}
              className="block rounded-askrami px-4 py-3 transition hover:bg-surface-subtle focus:bg-surface-subtle focus:outline-none"
            >
              <span className="block text-sm font-semibold text-black">
                {item.label}
              </span>
              <span className="mt-1 block text-xs leading-relaxed text-neutral-muted">
                {item.description}
              </span>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  function renderMobileSection(label: string, items: NavItem[]) {
    return (
      <div className="border-t border-gray-100 py-3">
        <p className="px-1 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-muted">
          {label}
        </p>
        <div className="mt-2 space-y-1">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-askrami px-3 py-2 transition hover:bg-surface-subtle focus:bg-surface-subtle focus:outline-none"
            >
              <span className="block text-sm font-semibold text-black">
                {item.label}
              </span>
              <span className="mt-1 block text-xs leading-relaxed text-neutral-muted">
                {item.description}
              </span>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
        
        {/* Logo/Brand Name */}
        <Link href="/" className="flex items-center">
          <Image
            src="/iwt-logo-icon-650.svg" // Fixed path: omit 'public' in next/image src
            alt="I Want That! Logo" 
            width={80} 
            height={80}
            className="h-7 w-auto"
          />
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center space-x-8 text-sm font-medium md:flex">
          {renderDropdown('products', 'PRODUCTS', productsNavItems, productsMenuRef, 'w-80')}
          {renderDropdown('playbooks', 'PLAYBOOKS', playbookNavItems, playbooksMenuRef, 'w-80')}
          {renderDropdown('tools', 'TOOLS', toolsNavItems, toolsMenuRef)}
          <Link
            href="/pricing"
            className="text-gray-900 transition duration-150 hover:text-indigo-600 focus:outline-none focus-visible:text-indigo-600"
          >
            PRICING
          </Link>
          <Link
            href="/blog"
            className="text-gray-900 transition duration-150 hover:text-indigo-600 focus:outline-none focus-visible:text-indigo-600"
          >
            BLOG
          </Link>
        </nav>

        {/* Far Right - CTA Button */}
        <div className="flex items-center space-x-4">
          <Link 
            href={SHOPIFY_APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-askrami bg-brand px-4 py-2 text-sm font-semibold text-white shadow-md transition duration-150 hover:bg-brand-deep"
          >
            Start on Shopify
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-askrami border border-surface-border text-gray-900 transition hover:bg-surface-subtle focus:outline-none focus-visible:ring-2 focus-visible:ring-brand md:hidden"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-main-navigation"
            onClick={() => setMobileMenuOpen((isOpen) => !isOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
      <div
        id="mobile-main-navigation"
        className={`border-t border-gray-100 bg-white px-4 shadow-lg md:hidden ${
          mobileMenuOpen ? "block" : "hidden"
        }`}
      >
        <nav className="container mx-auto max-h-[calc(100vh-4rem)] overflow-y-auto py-3">
          {renderMobileSection('Products', productsNavItems)}
          {renderMobileSection('Playbooks', playbookNavItems)}
          {renderMobileSection('Tools', toolsNavItems)}
          <div className="space-y-1 border-t border-gray-100 py-3">
            <Link
              href="/pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-askrami px-3 py-2 text-sm font-semibold text-black transition hover:bg-surface-subtle focus:bg-surface-subtle focus:outline-none"
            >
              Pricing
            </Link>
            <Link
              href="/blog"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-askrami px-3 py-2 text-sm font-semibold text-black transition hover:bg-surface-subtle focus:bg-surface-subtle focus:outline-none"
            >
              Blog
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
