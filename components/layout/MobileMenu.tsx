"use client";
import type React from "react";
import { X } from "lucide-react";
import { smoothScrollTo } from "@/utils/smooth-scroll";
import Image from "next/image";

interface MobileMenuProps {
  mobileMenuOpen: boolean;
  menuAnimation: string | null;
  handleCloseMenu: () => void;
}

export default function MobileMenu({
  mobileMenuOpen,
  menuAnimation,
  handleCloseMenu,
}: MobileMenuProps) {
  if (!mobileMenuOpen && menuAnimation !== "slideOut") {
    return null;
  }

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    e.preventDefault();

    // First close the menu
    handleCloseMenu();

    // Then scroll to the section after the menu animation completes
    setTimeout(() => {
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        // Get the top position of the target element relative to the viewport
        const targetPosition = targetElement.getBoundingClientRect().top;

        // Add the current scroll position to get the absolute position
        const offsetPosition = targetPosition + window.scrollY - 110; // Adjust for header height

        // Use our custom smooth scroll function (1 second duration)
        smoothScrollTo(offsetPosition, 1000);
      }
    }, 400); // Wait for menu close animation to complete (300ms) plus a small buffer
  };

  return (
    <div
      className={`fixed inset-0 bg-black z-50 p-8 ${
        menuAnimation === "slideIn"
          ? "animate-slide-in"
          : menuAnimation === "slideOut"
          ? "animate-slide-out"
          : ""
      }`}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center">
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
        <button onClick={handleCloseMenu}>
          <X className="h-10 w-10 text-white" />
        </button>
      </div>
      <nav className="mt-20">
        <ul className="space-y-10">
          <li>
            <a
              href="#overview"
              className="text-white text-2xl font-light tracking-wide"
              onClick={(e) => handleNavClick(e, "overview")}
            >
              Overview
            </a>
          </li>
          <li>
            <a
              href="#features"
              className="text-white text-2xl font-light tracking-wide"
              onClick={(e) => handleNavClick(e, "features")}
            >
              Features
            </a>
          </li>
          <li>
            <a
              href="#testimonials"
              className="text-white text-2xl font-light tracking-wide"
              onClick={(e) => handleNavClick(e, "testimonials")}
            >
              Testimonial
            </a>
          </li>
          <li>
            <a
              href="#faq"
              className="text-white text-2xl font-light tracking-wide"
              onClick={(e) => handleNavClick(e, "faq")}
            >
              FAQ
            </a>
          </li>
          <li>
            <a
              href="#download"
              className="text-white text-2xl font-light tracking-wide"
              onClick={(e) => handleNavClick(e, "download")}
            >
              Download
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
