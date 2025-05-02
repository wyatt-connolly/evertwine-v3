"use client";
import { Instagram, Twitter, Facebook } from "lucide-react";
import type React from "react";
import { smoothScrollTo } from "@/utils/smooth-scroll";
import PhoneMockup from "../ui/PhoneMockup";
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
      {/* Blue gradient background */}
      <div className="bg-gradient-to-b from-blue-700 to-blue-500 py-12 md:py-16">
        <div className="container mx-auto px-6 md:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            {/* Left side - Text and download button */}
            <div
              className={`mb-8 md:mb-0 text-center md:text-left transition-all duration-700 ${
                isDownloadVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                Get Evertwine App
                <br />
                Right Now
              </h2>
              <div className="flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
                <a
                  href="#"
                  className={`inline-flex items-center justify-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full py-3 px-6 text-white hover:bg-white/20 transition-all duration-300 ${
                    isDownloadVisible ? "animate-fade-in-up" : "opacity-0"
                  }`}
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09998 22C7.78998 22.05 6.79998 20.68 5.95998 19.47C4.24998 17 2.93998 12.45 4.69998 9.39C5.56998 7.87 7.12998 6.91 8.81998 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.09 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
                  </svg>
                  <span>AppStore</span>
                </a>
              </div>
            </div>

            {/* Right side - Phone mockup */}
            <div
              className={`relative transition-all duration-1000 ${
                isDownloadVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-20"
              }`}
            >
              <PhoneMockup>
                <div className="p-4">
                  <p className="text-gray-300 text-sm lg:text-lg">
                    Good evening,
                  </p>
                  <p className="text-gray-300 text-sm lg:text-lg mb-2 lg:mb-4">
                    Jacob
                  </p>

                  <div className="mb-4 lg:mb-6">
                    <h3 className="text-white text-3xl lg:text-5xl font-bold">
                      $7525.25
                    </h3>
                    <div className="flex items-center mt-1 lg:mt-2">
                      <span className="text-green-400 mr-2 text-sm lg:text-base">
                        +15%
                      </span>
                      <span className="text-gray-400 text-xs lg:text-base">
                        Lorem Ipsum Dolor
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 lg:mt-8">
                    <button className="w-full py-2 lg:py-4 px-4 lg:px-6 rounded-xl bg-gradient-to-r from-blue-700 to-purple-600 text-white text-base lg:text-xl flex items-center justify-center">
                      <span className="mr-2">Send Money</span>
                      <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-white/20 flex items-center justify-center">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5 12H19M19 12L12 5M19 12L12 19"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </button>
                  </div>
                </div>
              </PhoneMockup>
            </div>
          </div>
        </div>
      </div>

      {/* Footer section */}
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
                    width={48}
                    height={48}
                    alt="Evertwine Logo"
                  />
                  <span className="text-white text-2xl font-bold pl-2">
                    Evertwine
                  </span>
                </a>
              </div>
              <p className="text-gray-400 text-sm">
                Meet people near you through real, in-person meetups. Whether
                you're looking for friends or business connections, Evertwine
                helps you find your community.
              </p>
              <div className="mt-6">
                <a
                  href="#"
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
            <div
              className={`transition-all duration-700 delay-200 ${
                isDownloadVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <h3 className="text-lg font-semibold mb-6">Product</h3>
              <ul className="space-y-4">
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

            {/* Template links */}
            <div
              className={`transition-all duration-700 delay-300 ${
                isDownloadVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <h3 className="text-lg font-semibold mb-6">Template</h3>
              <ul className="space-y-4">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Style Guide
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Licences
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Changelog
                  </a>
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
              className={`text-gray-500 text-sm transition-all duration-700 delay-500 ${
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
