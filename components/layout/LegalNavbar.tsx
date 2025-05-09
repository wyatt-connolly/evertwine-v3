"use client";
import Image from "next/image";
import Link from "next/link";

interface NavbarProps {
  scrolled: boolean;
}

export default function Navbar({ scrolled }: NavbarProps) {
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-500 ease-in-out ${
        scrolled ? "bg-black" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4 md:px-8 md:py-8 h-[96px] md:h-[110px] flex items-center">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="s/evertwine-logo.png"
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
  );
}
