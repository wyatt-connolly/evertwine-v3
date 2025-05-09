import Link from "next/link";
import Image from "next/image";
import { Twitter } from "lucide-react";

interface FooterProps {
  isHomepage?: boolean;
}

export default function Footer({ isHomepage = false }: FooterProps) {
  return (
    <footer className="bg-black text-white py-16 border-t border-gray-900">
      <div className="container mx-auto px-6 md:px-8">
        {/* Top section */}
        <div
          className={`grid gap-12 ${isHomepage ? "md:grid-cols-4" : "md:grid-cols-3"}`}
        >
          {/* Logo and description - wider on non-homepage */}
          <div className={isHomepage ? "" : "md:max-w-md"}>
            <div className="flex items-center mb-4">
              <Link href="/" className="flex items-center">
                <Image
                  src="/evertwine-logo.png"
                  alt="Evertwine logo"
                  width={32}
                  height={32}
                  className="w-8 h-8 mr-3"
                />
                <span className="text-white text-2xl font-bold">Evertwine</span>
              </Link>
            </div>
            <p className="text-gray-400 text-sm mb-6">
              Meet people near you through real, in-person meetups. Whether
              you&apos;re looking for friends or business connections, Evertwine
              helps you find your community—safely and authentically.
            </p>
            <div className="flex flex-wrap gap-4">
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

            {/* Social links - moved here for non-homepage */}
            {!isHomepage && (
              <div className="flex space-x-6 mt-8">
                <a
                  href="https://x.com/evertwinesocial"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                  <span className="sr-only">X (Twitter)</span>
                </a>
                <a
                  href="https://www.reddit.com/r/Evertwine/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
                  </svg>
                  <span className="sr-only">Reddit</span>
                </a>
              </div>
            )}
          </div>

          {/* Product links - only shown on homepage */}
          {isHomepage && (
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
          )}

          {/* Company links - shown on both homepage and non-homepage */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Company</h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/partners"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Partners
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal links - with better organization for non-homepage */}
          <div className={isHomepage ? "" : ""}>
            <h3 className="text-lg font-semibold mb-6">Legal</h3>
            {isHomepage ? (
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
            ) : (
              <ul className="space-y-6">
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
            )}
          </div>
        </div>

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 mt-12 border-t border-gray-800">
          {/* Social links - only shown on homepage here */}
          {isHomepage && (
            <div className="flex space-x-6 mb-6 md:mb-0">
              <a
                href="https://x.com/evertwinesocial"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Twitter className="w-5 h-5" />
                <span className="sr-only">X (Twitter)</span>
              </a>
              <a
                href="https://www.reddit.com/r/Evertwine/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
                </svg>
                <span className="sr-only">Reddit</span>
              </a>
            </div>
          )}
          <div className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Evertwine. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
