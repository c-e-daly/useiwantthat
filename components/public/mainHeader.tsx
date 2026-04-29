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

export function MainHeader() {
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const toolsCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const toolsMenuRef = useRef<HTMLDivElement>(null);
  const isAppHost = useSyncExternalStore(
    subscribe,
    getHostnameSnapshot,
    getServerSnapshot
  );

  // If we are on the app subdomain, collapse (don't render) this header
  if (isAppHost) return null;

  function openToolsMenu() {
    if (toolsCloseTimer.current) {
      clearTimeout(toolsCloseTimer.current);
    }
    setIsToolsOpen(true);
  }

  function closeToolsMenuWithDelay() {
    if (toolsCloseTimer.current) {
      clearTimeout(toolsCloseTimer.current);
    }
    toolsCloseTimer.current = setTimeout(() => {
      setIsToolsOpen(false);
    }, 1500);
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
            href="/sellers"
            className="text-gray-900 hover:text-indigo-600 transition duration-150"
          >
            SELLERS
          </Link>
          <div
            ref={toolsMenuRef}
            className="relative"
            onMouseEnter={openToolsMenu}
            onMouseLeave={closeToolsMenuWithDelay}
            onFocus={openToolsMenu}
            onBlur={(event) => {
              if (!toolsMenuRef.current?.contains(event.relatedTarget)) {
                closeToolsMenuWithDelay();
              }
            }}
          >
            <button
              type="button"
              className="flex items-center gap-1 text-gray-900 transition duration-150 hover:text-indigo-600 focus:outline-none focus-visible:text-indigo-600"
              aria-haspopup="true"
              aria-expanded={isToolsOpen}
            >
              TOOLS
              <ChevronDown
                className={`h-4 w-4 transition ${
                  isToolsOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`absolute left-1/2 top-full z-50 mt-3 w-72 -translate-x-1/2 rounded-askrami border border-surface-border bg-white p-2 shadow-xl transition duration-150 ${
                isToolsOpen
                  ? "visible opacity-100"
                  : "invisible pointer-events-none opacity-0"
              }`}
            >
              {toolsNavItems.map((item) => (
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
