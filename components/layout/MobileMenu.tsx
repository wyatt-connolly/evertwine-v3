"use client";
import type React from "react";
import { X } from "lucide-react";
import { smoothScrollTo } from "@/utils/smooth-scroll";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
  const pathname = usePathname();
  const isHomePage = pathname === "/";

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

    if (!isHomePage) {
      // If not on home page, navigate to home page with hash after menu closes
      setTimeout(() => {
        window.location.href = `/#${targetId}`;
      }, 400);
      return;
    }

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
      className={`fixed inset-0 bg-black z-50 p-8 ${menuAnimation === "slideIn" ? "animate-slide-in" : menuAnimation === "slideOut" ? "animate-slide-out" : ""}`}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Link
            href="/"
            onClick={handleCloseMenu}
            className="flex items-center"
          >
            <Image
              src="s/evertwine-logo.png"
              alt="Evertwine logo"
              width={32}
              height={32}
              className="w-8 h-8 md:w-10 md:h-10 mr-2 md:mr-3"
            />
            <span className="text-white text-2xl md:text-3xl font-bold tracking-tight font-sora">
              Evertwine
            </span>
          </Link>
        </div>
        <button onClick={handleCloseMenu}>
          <X className="h-8 w-8 md:h-10 md:w-10 text-white" />
        </button>
      </div>
      <nav className="mt-20">
        <ul className="space-y-8 font-dm-sans">
          <li>
            <a
              href={isHomePage ? "#overview" : "/#overview"}
              className="text-white text-2xl font-light tracking-wide"
              onClick={
                isHomePage
                  ? (e) => handleNavClick(e, "overview")
                  : handleCloseMenu
              }
            >
              Overview
            </a>
          </li>
          <li>
            <a
              href={isHomePage ? "#features" : "/#features"}
              className="text-white text-2xl font-light tracking-wide"
              onClick={
                isHomePage
                  ? (e) => handleNavClick(e, "features")
                  : handleCloseMenu
              }
            >
              Features
            </a>
          </li>
          <li>
            <a
              href={isHomePage ? "#testimonials" : "/#testimonials"}
              className="text-white text-2xl font-light tracking-wide"
              onClick={
                isHomePage
                  ? (e) => handleNavClick(e, "testimonials")
                  : handleCloseMenu
              }
            >
              Testimonials
            </a>
          </li>
          <li>
            <Link
              href="/blog"
              className="text-white text-2xl font-light tracking-wide"
              onClick={handleCloseMenu}
            >
              Blog
            </Link>
          </li>
          <li>
            <a
              href={isHomePage ? "#faq" : "/#faq"}
              className="text-white text-2xl font-light tracking-wide"
              onClick={
                isHomePage ? (e) => handleNavClick(e, "faq") : handleCloseMenu
              }
            >
              FAQ
            </a>
          </li>
          <li>
            <a
              href={isHomePage ? "#download" : "/#download"}
              className="text-white text-2xl font-light tracking-wide"
              onClick={
                isHomePage
                  ? (e) => handleNavClick(e, "download")
                  : handleCloseMenu
              }
            >
              Download
            </a>
          </li>
          <li>
            <Link
              href="/contact"
              className="text-white text-2xl font-light tracking-wide"
              onClick={handleCloseMenu}
            >
              Contact Us
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
