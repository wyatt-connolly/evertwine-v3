"use client";
import { Menu } from "lucide-react";
import type React from "react";
import { smoothScrollTo } from "@/utils/smooth-scroll";
import Image from "next/image";

interface NavbarProps {
  scrolled: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export default function Navbar({ scrolled, setMobileMenuOpen }: NavbarProps) {
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
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-500 ease-in-out ${
        scrolled ? "bg-black" : "bg-blue-900/80 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-8 py-8 h-[110px]">
        <div className="flex items-center justify-between lg:justify-center relative">
          <div className="flex items-center lg:absolute lg:left-0">
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
              <span className="text-white text-3xl font-bold tracking-tight pl-2">
                Evertwine
              </span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button className="lg:hidden" onClick={() => setMobileMenuOpen(true)}>
            <Menu className="h-10 w-10 text-white" />
          </button>

          {/* Desktop Navigation - Now Centered */}
          <div className="hidden lg:block">
            <div
              className={`rounded-full px-8 py-3 transition-colors duration-500 ${
                scrolled ? "bg-white/5" : "bg-white/10 backdrop-blur-sm"
              }`}
            >
              <ul className="flex space-x-10">
                <li>
                  <a
                    href="#overview"
                    onClick={(e) => handleNavClick(e, "overview")}
                    className="text-white/90 hover:text-white font-light text-base"
                  >
                    Overview
                  </a>
                </li>
                <li>
                  <a
                    href="#features"
                    onClick={(e) => handleNavClick(e, "features")}
                    className="text-white/90 hover:text-white font-light text-base"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#testimonials"
                    onClick={(e) => handleNavClick(e, "testimonials")}
                    className="text-white/90 hover:text-white font-light text-base"
                  >
                    Testimonial
                  </a>
                </li>
                <li>
                  <a
                    href="#faq"
                    onClick={(e) => handleNavClick(e, "faq")}
                    className="text-white/90 hover:text-white font-light text-base"
                  >
                    FAQ
                  </a>
                </li>
                <li>
                  <a
                    href="#download"
                    onClick={(e) => handleNavClick(e, "download")}
                    className="text-white/90 hover:text-white font-light text-base"
                  >
                    Download
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
