import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-100 mt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          
          {/* Copyright */}
          <p className="text-sm text-gray-500 order-2 md:order-1 mt-4 md:mt-0">
            &copy; {currentYear} iWantThat. All rights reserved.
          </p>

          {/* Legal Links */}
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm font-medium text-gray-700 order-1 md:order-2">
            <Link href="/privacy-policy" className="hover:text-indigo-600 transition duration-150">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-indigo-600 transition duration-150">
              Terms of Service
            </Link>
            <Link href="/cookie-policy" className="hover:text-indigo-600 transition duration-150">
              Cookie Policy
            </Link>
            <Link href="/legal" className="hover:text-indigo-600 transition duration-150">
              Legal Center
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
