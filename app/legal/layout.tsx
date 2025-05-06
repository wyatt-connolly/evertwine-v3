"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import type React from "react";
import Image from "next/image";
import Link from "next/link";
import { Instagram, Twitter, Facebook } from "lucide-react";

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // This effect will run whenever the pathname changes
  useEffect(() => {
    // Force scroll to top with both methods for maximum compatibility
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, [pathname]); // Re-run when pathname changes

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header - now always black */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-black">
        <div className="container mx-auto px-6 py-4 md:px-8 md:py-8 h-[96px] md:h-[110px] flex items-center">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <Image
                  src="/evertwine-logo.png"
                  alt="Evertwine logo"
                  width={32}
                  height={32}
                  className="w-8 h-8 md:w-10 md:h-10 mr-2 md:mr-3"
                />
                <span className="text-white text-2xl md:text-3xl font-bold tracking-tight">
                  Evertwine
                </span>
              </Link>
            </div>
            <Link
              href="/"
              className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-sm font-medium border border-white/20"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content with padding for the fixed header */}
      <main className="pt-[110px] md:pt-[130px]">{children}</main>

      {/* Footer */}
      <footer className="bg-black text-white py-16 border-t border-gray-900">
        <div className="container mx-auto px-6 md:px-8">
          {/* Top section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            {/* Logo and description */}
            <div>
              <div className="flex items-center mb-4">
                <Link href="/" className="flex items-center">
                  <Image
                    src="/images/evertwine-logo.png"
                    alt="Evertwine logo"
                    width={32}
                    height={32}
                    className="w-8 h-8 mr-3"
                  />
                  <span className="text-white text-2xl font-bold">
                    Evertwine
                  </span>
                </Link>
              </div>
              <p className="text-gray-400 text-sm">
                Meet people near you through real, in-person meetups. Whether
                you're looking for friends or business connections, Evertwine
                helps you find your community.
              </p>
              <div className="mt-6">
                <a
                  href="https://apps.apple.com/us/app/evertwine/id6479545288"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center space-x-2 bg-black border border-gray-800 rounded-lg py-2 px-4 text-white hover:bg-gray-900 transition-all duration-300"
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09998 22C7.78998 22.05 6.79998 20.68 5.95998 19.47C4.24998 17 2.93998 12.45 4.69998 9.39C5.56998 7.87 7.12998 6.91 8.81998 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.09 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
                  </svg>
                  <span>Download on the App Store</span>
                </a>
              </div>
            </div>

            {/* Product links */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Product</h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/#overview"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Overview
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#features"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#faq"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#download"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Download
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal links */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Legal</h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/legal/eula"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    End User License Agreement
                  </Link>
                </li>
                <li>
                  <Link
                    href="/legal/privacy-policy"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/legal/cookie-policy"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/legal/terms-of-service"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="/legal/health-privacy"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Health Data Privacy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/legal/colorado-privacy"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Colorado Privacy Notice
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom section */}
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-800">
            <div className="flex space-x-6 mb-6 md:mb-0">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Instagram className="w-5 h-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Twitter className="w-5 h-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Facebook className="w-5 h-5" />
                <span className="sr-only">Facebook</span>
              </a>
            </div>
            <div className="text-gray-500 text-sm">
              Evertwine. Powered by Webflow
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
