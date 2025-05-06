"use client";

import { Shield } from "lucide-react";
import Image from "next/image";

interface SecuritySectionProps {
  isSecurityVisible: boolean;
}

export default function SecuritySection({
  isSecurityVisible,
}: SecuritySectionProps) {
  return (
    <section className="min-h-screen flex flex-col xl:flex-row overflow-hidden">
      {/* Mobile: Top half (Phone) / Desktop: Right half */}
      <div
        className={`h-[50vh] xl:h-auto w-full xl:w-1/2 xl:order-2 bg-black flex justify-center items-center py-4 relative overflow-hidden`}
      >
        {/* Animated colored background that slides in from the LEFT */}
        <div
          className={`absolute inset-0 bg-indigo-700 transition-transform duration-1000 ease-out ${
            isSecurityVisible ? "translate-x-0" : "-translate-x-full"
          }`}
        ></div>

        {/* Phone content */}
        <div
          className={`relative w-[40%] sm:w-[35%] md:w-[30%] lg:w-[40%] xl:w-[50%] 2xl:w-[65%] max-w-[450px] z-10 transition-transform duration-1000 ${
            isSecurityVisible ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="relative">
            <Image
              src="/security.png"
              alt="Evertwine app on iPhone 16 Plus"
              width={500}
              height={1000}
              className="w-full h-auto drop-shadow-2xl"
              priority
            />
          </div>
        </div>
      </div>

      {/* Mobile: Bottom half (Text) / Desktop: Left half */}
      <div className="h-[50vh] xl:h-auto w-full xl:w-1/2 xl:order-1 bg-black p-6 md:p-12 xl:p-20 flex items-center">
        <div className="w-full">
          <div
            className={`w-10 h-10 md:w-14 md:h-14 xl:w-12 xl:h-12 bg-white rounded-full flex items-center justify-center mb-6 md:mb-8 xl:mb-8 opacity-0 ${
              isSecurityVisible ? "animate-fade-in-zoom" : ""
            }`}
          >
            <Shield className="h-5 w-5 md:h-7 md:w-7 xl:h-6 xl:w-6 text-black" />
          </div>

          <h2 className="overflow-hidden">
            <span
              className={`text-white text-2xl md:text-4xl xl:text-5xl font-bold block opacity-0 ${
                isSecurityVisible ? "animate-slide-up-1" : ""
              }`}
            >
              Advanced Safety
            </span>
            <span
              className={`text-white text-2xl md:text-4xl xl:text-5xl font-bold block opacity-0 ${
                isSecurityVisible ? "animate-slide-up-2" : ""
              }`}
            >
              For Every Meetup
            </span>
          </h2>

          <p
            className={`text-white/80 text-sm md:text-lg xl:text-lg font-light mt-4 md:mt-6 xl:mt-6 opacity-0 ${
              isSecurityVisible ? "animate-fade-in-delayed" : ""
            }`}
          >
            From selfie and ID verification to strict community guidelines,
            Evertwine ensures your in-person interactions are built on trust and
            transparency.
          </p>
        </div>
      </div>
    </section>
  );
}
