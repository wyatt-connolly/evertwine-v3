"use client";

import { Zap } from "lucide-react";
import PhoneMockup from "../ui/PhoneMockup";

interface FeatureSectionProps {
  isFeatureVisible: boolean;
}

export default function FeatureSection({
  isFeatureVisible,
}: FeatureSectionProps) {
  return (
    <section className="min-h-screen flex flex-col lg:flex-row overflow-hidden">
      {/* Mobile: Top half (Phone) / Desktop: Right half */}
      <div
        className={`h-[50vh] lg:h-auto w-full lg:w-1/2 lg:order-2 bg-gradient-to-b from-blue-800 to-blue-600 flex justify-center items-center py-4 ${
          isFeatureVisible
            ? "animate-window-from-right"
            : "transform translate-x-full"
        }`}
      >
        <div className="relative">
          <PhoneMockup>
            <div className="p-4">
              <p className="text-gray-300 text-sm lg:text-lg">Good evening,</p>
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

      {/* Mobile: Bottom half (Text) / Desktop: Left half */}
      <div className="h-[50vh] lg:h-auto w-full lg:w-1/2 lg:order-1 bg-black p-6 lg:p-20 flex items-center">
        <div className="w-full">
          <div
            className={`w-10 h-10 lg:w-12 lg:h-12 bg-white rounded-full flex items-center justify-center mb-6 lg:mb-8 opacity-0 ${
              isFeatureVisible ? "animate-fade-in-zoom" : ""
            }`}
          >
            <Zap className="h-5 w-5 lg:h-6 lg:w-6 text-black" />
          </div>

          <h2 className="overflow-hidden">
            <span
              className={`text-white text-2xl lg:text-5xl font-bold block opacity-0 ${
                isFeatureVisible ? "animate-slide-up-1" : ""
              }`}
            >
              A Simple Way to
            </span>
            <span
              className={`text-white text-2xl lg:text-5xl font-bold block opacity-0 ${
                isFeatureVisible ? "animate-slide-up-2" : ""
              }`}
            >
              Find Your People
            </span>
          </h2>

          <p
            className={`text-white/80 text-sm lg:text-lg font-light mt-4 lg:mt-6 opacity-0 ${
              isFeatureVisible ? "animate-fade-in-delayed" : ""
            }`}
          >
            Discover real-world connections through interest-based meetups near
            you. Whether it&apos;s for friendship, networking, or both—Evertwine
            makes it easy and local. Plan hangouts or discover ones happening
            nearby—coffee chats, workouts, networking events, and more.
            Evertwine gives you tools to meet people in real life, on your
            terms.
          </p>
        </div>
      </div>
    </section>
  );
}
