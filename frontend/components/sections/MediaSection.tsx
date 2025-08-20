"use client";

import type React from "react";

interface MediaSectionProps {
  isMediaVisible: boolean;
}

export default function MediaSection({ isMediaVisible }: MediaSectionProps) {
  const mediaFeatures = [
    {
      outlet: "TechCrunch",
      title:
        "Local Social App Evertwine Raises Funding to Combat Digital Loneliness",
      date: "Coming Soon",
      type: "Feature Article",
      url: "#",
      description:
        "How Evertwine is revolutionizing local friendship connections through verified meetups.",
      isPlaceholder: true,
    },
    {
      outlet: "Forbes",
      title: "The Future of Social: Why Local Meetup Apps Are Taking Off",
      date: "Coming Soon",
      type: "Industry Analysis",
      url: "#",
      description:
        "Industry experts weigh in on the growing trend of location-based social platforms.",
      isPlaceholder: true,
    },
    {
      outlet: "Wired",
      title: "Building Authentic Connections in the Age of Social Media",
      date: "Coming Soon",
      type: "Profile Feature",
      url: "#",
      description:
        "A deep dive into how Evertwine is bringing back genuine human connection.",
      isPlaceholder: true,
    },
  ];

  return (
    <section className="min-h-screen bg-black flex items-center relative">
      <div
        className={`container mx-auto px-4 py-20 transition-all duration-1000 ${
          isMediaVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <div className="text-center mb-16">
          <h2
            className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-4 transition-all duration-700 transform ${
              isMediaVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            In The{" "}
            <span
              className={`text-blue-500 inline-block transition-all duration-1000 delay-300 transform ${
                isMediaVisible
                  ? "opacity-100 translate-y-0 rotate-0"
                  : "opacity-0 -translate-y-4 -rotate-6"
              }`}
            >
              News
            </span>
          </h2>
          <p
            className={`text-white/80 text-lg md:text-xl mt-4 max-w-3xl mx-auto transition-all duration-700 delay-200 transform ${
              isMediaVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            See what the media is saying about Evertwine and the future of
            authentic social connections.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {mediaFeatures.map((feature, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 border border-gray-800 hover:border-blue-500 transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/20 transform ${
                  isMediaVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-16"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                {/* Media Outlet */}
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {feature.outlet}
                  </div>
                  <span className="text-gray-400 text-sm">{feature.type}</span>
                </div>

                {/* Article Title */}
                <h3 className="text-white text-xl font-bold mb-3 leading-tight">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-300 mb-4 leading-relaxed text-sm">
                  {feature.description}
                </p>

                {/* Date and Status */}
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">{feature.date}</span>
                  {feature.isPlaceholder ? (
                    <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-xs font-medium">
                      Coming Soon
                    </span>
                  ) : (
                    <a
                      href={feature.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium"
                    >
                      Read Article
                      <svg
                        className="w-3 h-3 ml-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            ))}

            {/* Press Contact Card */}
            <div
              className={`bg-gradient-to-br from-blue-900/50 to-purple-900/50 rounded-3xl p-8 border border-blue-500/30 transition-all duration-500 hover:border-blue-400 hover:shadow-xl hover:shadow-blue-500/20 transform ${
                isMediaVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-16"
              }`}
              style={{ transitionDelay: `${mediaFeatures.length * 200}ms` }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                  />
                </svg>
              </div>

              <h3 className="text-white text-2xl font-bold mb-3">
                Press Inquiries
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Interested in covering Evertwine? We&apos;d love to hear from
                you and share our story.
              </p>

              <a
                href="/contact"
                className="inline-flex items-center justify-center w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                Contact Media Team
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Optional: Add a note about updating content */}
        <div className="text-center mt-16">
          <p className="text-gray-400 text-sm">
            Media coverage and press features will be updated as they become
            available.
          </p>
        </div>
      </div>
    </section>
  );
}
