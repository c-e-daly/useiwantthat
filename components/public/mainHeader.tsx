'use client'; 

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState, useSyncExternalStore } from 'react';
import { ChevronDown } from 'lucide-react';

const subscribe = () => () => {};
const getServerSnapshot = () => false;
const getHostnameSnapshot = () => window.location.hostname.startsWith('app.');
const SHOPIFY_APP_URL = 'https://apps.shopify.com/iwtapp-shop';

const toolsNavItems = [
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

type MenuKey = 'tools' | 'playbooks';

export function MainHeader() {
  const [openMenu, setOpenMenu] = useState<MenuKey | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
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
    }, 1500);
  }

  function renderDropdown(
    menu: MenuKey,
    label: string,
    items: typeof toolsNavItems,
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
           <Link 
            href="/ask-rami"
             className="text-gray-900 hover:text-indigo-600 transition duration-150"
             >
              ASK RAMI
            </Link>
          <Link 
            href="/product"
            className="text-gray-900 hover:text-indigo-600 transition duration-150"
          >
            PRODUCT
          </Link>
          {renderDropdown('playbooks', 'PLAYBOOKS', playbookNavItems, playbooksMenuRef, 'w-80')}
          {renderDropdown('tools', 'TOOLS', toolsNavItems, toolsMenuRef)}
        </nav>

        {/* Far Right - CTA Button */}
        <div className="flex items-center space-x-4">
          <Link 
            href={SHOPIFY_APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-indigo-700 transition duration-150"
          >
            Start on Shopify
          </Link>
        </div>
      </div>
    </header>
  );
}
