// /workspaces/iwantthat-consumer/components/MainHeader.tsx
'use client'; 

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export function MainHeader() {
  const [isAppHost, setIsAppHost] = useState(false);

  useEffect(() => {
    // Check if the current hostname starts with 'app.'
    if (typeof window !== 'undefined') {
      setIsAppHost(window.location.hostname.startsWith('app.'));
    }
  }, []);

  // If we are on the app subdomain, collapse (don't render) this header
  if (isAppHost) return null;

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

        {/* Navigation - SHOPPERS | SELLERS */}
        <nav className="hidden md:flex space-x-8 text-sm font-medium">
          <Link 
            href="/sellers"
            className="text-gray-900 hover:text-indigo-600 transition duration-150"
          >
            SELLERS
          </Link>
        </nav>

        {/* Far Right - CTA Button */}
        <div className="flex items-center space-x-4">
          <Link 
            href="#" 
            className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-indigo-700 transition duration-150"
          >
            Start on Shopify
          </Link>
        </div>
      </div>
    </header>
  );
}