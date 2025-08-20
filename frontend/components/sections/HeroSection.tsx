"use client";
import type React from "react";
import { smoothScrollTo } from "@/utils/smooth-scroll";
import Link from "next/link";

interface HeroSectionProps {
  isLoaded: boolean;
}

export default function HeroSection({ isLoaded }: HeroSectionProps) {
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
    <div className="min-h-screen flex flex-col justify-center relative overflow-hidden">
      {/* Fixed background image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-blue-900/90 mix-blend-multiply"></div>
        <img
          src="/hero-bg.webp"
          alt="Evertwine background"
          className="w-full h-full object-cover object-center fixed"
          style={{ zIndex: -1 }}
        />
      </div>
      {/* Mobile version (hidden on desktop) */}
      <div className="lg:hidden container mx-auto px-8 pt-16 relative z-10">
        <div className="max-w-3xl backdrop-blur-sm p-8 rounded-3xl">
          <h1
            className={`text-white text-4xl sm:text-5xl font-bold leading-tight tracking-tight opacity-0 font-sora ${
              isLoaded ? "animate-fade-in-up" : ""
            }`}
          >
            Genuine.
            <br />
            Local.
            <br />
            Effortless.
          </h1>
          <p
            className={`text-white/80 text-base sm:text-lg mt-4 sm:mt-6 max-w-2xl font-light opacity-0 font-dm-sans ${
              isLoaded ? "animate-fade-in-up-delayed" : ""
            }`}
          >
            Meet people near you through real, in-person meetups. Find genuine
            friendships and meaningful connections—safely and authentically.
          </p>
          <div
            className={`mt-6 sm:mt-8 flex flex-col sm:flex-row gap-4 opacity-0 ${
              isLoaded ? "animate-fade-in-up-more-delayed" : ""
            }`}
          >
            <a
              href="#download"
              onClick={(e) => handleNavClick(e, "download")}
              className="inline-flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 sm:px-8 py-2.5 sm:py-3 text-base sm:text-lg font-light hover:bg-white/20 transition-colors font-dm-sans"
            >
              Get The App
            </a>
            <Link
              href="/partners"
              className="inline-flex items-center justify-center rounded-full bg-blue-600/20 backdrop-blur-sm border border-blue-500/30 text-white px-6 sm:px-8 py-2.5 sm:py-3 text-base sm:text-lg font-light hover:bg-blue-600/30 transition-colors font-dm-sans"
            >
              For Businesses & Affiliates
            </Link>
          </div>
        </div>
      </div>

      {/* Desktop version (hidden on mobile) */}
      <div className="hidden lg:block container mx-auto px-8 relative z-10">
        <div className="flex items-center">
          <div className="w-1/2 backdrop-blur-sm p-10 rounded-3xl">
            <h1
              className={`text-white text-6xl font-bold leading-tight tracking-tight opacity-0 font-sora ${
                isLoaded ? "animate-fade-in-up" : ""
              }`}
            >
              Genuine. Local. Effortless.
            </h1>
            <p
              className={`text-white/80 text-xl mt-6 max-w-2xl font-light opacity-0 font-dm-sans ${
                isLoaded ? "animate-fade-in-up-delayed" : ""
              }`}
            >
              Meet people near you through real, in-person meetups. Find genuine
              friendships and meaningful connections—safely and authentically.
            </p>
            <div
              className={`mt-10 flex gap-6 opacity-0 ${
                isLoaded ? "animate-fade-in-up-more-delayed" : ""
              }`}
            >
              <a
                href="#download"
                onClick={(e) => handleNavClick(e, "download")}
                className="inline-flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white px-10 py-4 text-xl font-light hover:bg-white/20 transition-colors font-dm-sans"
              >
                Get The App
              </a>
              <Link
                href="/partners"
                className="inline-flex items-center justify-center rounded-full bg-blue-600/20 backdrop-blur-sm border border-blue-500/30 text-white px-10 py-4 text-xl font-light hover:bg-blue-600/30 transition-colors font-dm-sans"
              >
                For Businesses & Affiliates
              </Link>
            </div>
          </div>
          <div className="w-1/2">
            {/* Empty space for layout balance - no image */}
          </div>
        </div>
      </div>
    </div>
  );
}
