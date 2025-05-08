"use client"
import type React from "react"
import { smoothScrollTo } from "@/utils/smooth-scroll"
import Footer from "@/components/layout/Footer"

interface DownloadSectionProps {
  isDownloadVisible: boolean
}

export default function DownloadSection({ isDownloadVisible }: DownloadSectionProps) {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()

    const targetElement = document.getElementById(targetId)

    if (targetElement) {
      // Get the top position of the target element relative to the viewport
      const targetPosition = targetElement.getBoundingClientRect().top

      // Add the current scroll position to get the absolute position
      const offsetPosition = targetPosition + window.scrollY - 110 // Adjust for header height

      // Use our custom smooth scroll function (1 second duration)
      smoothScrollTo(offsetPosition, 1000)
    }
  }

  return (
    <section className="relative">
      {/* Enhanced gradient background */}
      <div className="bg-gradient-to-b from-blue-900 via-blue-700 to-blue-500 py-20 md:py-24 overflow-hidden relative">
        {/* Horizontal gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-800/60 to-indigo-900/80 mix-blend-multiply"></div>

        {/* Download section content */}
        <div className="container mx-auto px-6 md:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h2
              className={`text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-sora transition-all duration-700 ${
                isDownloadVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              Ready to find your people?
            </h2>
            <p
              className={`text-xl text-white/90 mb-10 font-dm-sans transition-all duration-700 delay-100 ${
                isDownloadVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              Download Evertwine today and start connecting with like-minded individuals in your area.
            </p>

            <div
              className={`flex flex-col sm:flex-row justify-center gap-6 transition-all duration-700 delay-200 ${
                isDownloadVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <a
                href="https://apps.apple.com/us/app/evertwine/id6479545288"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center space-x-3 bg-white text-blue-900 px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09998 22C7.78998 22.05 6.79998 20.68 5.95998 19.47C4.24998 17 2.93998 12.45 4.69998 9.39C5.56998 7.87 7.12998 6.91 8.81998 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.09 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
                </svg>
                <span>Download on the App Store</span>
              </a>
              <a
                href="/about"
                className="inline-flex items-center justify-center space-x-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                </svg>
                <span>Learn More</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer section - using the Footer component with isHomepage=true */}
      <Footer isHomepage={true} />
    </section>
  )
}
