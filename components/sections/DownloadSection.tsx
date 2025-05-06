"use client";
import { Instagram, Twitter, Facebook } from "lucide-react";
import type React from "react";
import { smoothScrollTo } from "@/utils/smooth-scroll";
import Link from "next/link";
import Image from "next/image";

interface DownloadSectionProps {
  isDownloadVisible: boolean;
}

export default function DownloadSection({
  isDownloadVisible,
}: DownloadSectionProps) {
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    e.preventDefault();

    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      // Get the top position of the target element relative to the viewport
      const targetPosition = targetElement.getBoundingClientRect().top;

      // Add the current scroll position to get the absolute position
      const offsetPosition = targetPosition + window.scrollY - 110; // Adjust for header height

      // Use our custom smooth scroll function (1 second duration)
      smoothScrollTo(offsetPosition, 1000);
    }
  };

  return (
    <section className="relative">
      {/* Enhanced gradient background */}
      <div className="bg-gradient-to-b from-blue-900 via-blue-700 to-blue-500 py-20 md:py-24 overflow-hidden relative">
        {/* Horizontal gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-800/60 to-indigo-900/80 mix-blend-multiply"></div>

        {/* Download section content */}
        <div className="container mx-auto px-6 md:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h2
              className={`text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-sora transition-all duration-700 ${
                isDownloadVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              Ready to find your people?
            </h2>
            <p
              className={`text-xl text-white/90 mb-10 font-dm-sans transition-all duration-700 delay-100 ${
                isDownloadVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              Download Evertwine today and start connecting with like-minded
              individuals in your area.
            </p>

            <div
              className={`flex flex-col sm:flex-row justify-center gap-6 transition-all duration-700 delay-200 ${
                isDownloadVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <a
                href="https://apps.apple.com/us/app/evertwine/id6479545288"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-white text-blue-900 px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
              >
                <svg
                  className="w-6 h-6 flex-shrink-0"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09998 22C7.78998 22.05 6.79998 20.68 5.95998 19.47C4.24998 17 2.93998 12.45 4.69998 9.39C5.56998 7.87 7.12998 6.91 8.81998 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.09 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
                </svg>
                <span className="block">Download on the App Store</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer section - keep this intact */}
      <footer className="bg-black text-white py-16">
        <div className="container mx-auto px-6 md:px-8">
          {/* Top section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            {/* Logo and description */}
            <div
              className={`transition-all duration-700 delay-100 ${
                isDownloadVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <div className="flex items-center mb-4">
                <a
                  href="#overview"
                  onClick={(e) => handleNavClick(e, "overview")}
                  className="flex items-center"
                >
                  <Image
                    src="/evertwine-logo.png"
                    alt="Evertwine logo"
                    width={32}
                    height={32}
                    className="w-8 h-8 mr-3"
                  />
                  <span className="text-white text-2xl font-bold font-sora">
                    Evertwine
                  </span>
                </a>
              </div>
              <p className="text-gray-400 text-sm font-dm-sans">
                Meet people near you through real, in-person meetups. Whether
                you&apos;re looking for friends or business connections,
                Evertwine helps you find your community.
              </p>
              <div className="mt-6">
                <a
                  href="https://apps.apple.com/us/app/evertwine/id6479545288"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center space-x-2 bg-black border border-gray-800 rounded-lg py-2 px-4 text-white hover:bg-gray-900 transition-all duration-300 font-dm-sans"
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
            <div
              className={`transition-all duration-700 delay-200 ${
                isDownloadVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <h3 className="text-lg font-semibold mb-6 font-sora">Product</h3>
              <ul className="space-y-4 font-dm-sans">
                <li>
                  <a
                    href="#overview"
                    onClick={(e) => handleNavClick(e, "overview")}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Overview
                  </a>
                </li>
                <li>
                  <a
                    href="#features"
                    onClick={(e) => handleNavClick(e, "features")}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#faq"
                    onClick={(e) => handleNavClick(e, "faq")}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    FAQ
                  </a>
                </li>
                <li>
                  <a
                    href="#download"
                    onClick={(e) => handleNavClick(e, "download")}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Download
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal links - Updated with all legal documents */}
            <div
              className={`transition-all duration-700 delay-300 ${
                isDownloadVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <h3 className="text-lg font-semibold mb-6 font-sora">Legal</h3>
              <ul className="space-y-4 font-dm-sans">
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
            <div
              className={`flex space-x-6 mb-6 md:mb-0 transition-all duration-700 delay-400 ${
                isDownloadVisible ? "opacity-100" : "opacity-0"
              }`}
            >
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
            <div
              className={`text-gray-500 text-sm transition-all duration-700 delay-500 font-dm-sans ${
                isDownloadVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              Evertwine. Powered by Webflow
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
}
