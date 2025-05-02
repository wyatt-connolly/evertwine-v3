"use client"

import { Shield } from "lucide-react"
import PhoneMockup from "../ui/PhoneMockup"

interface SecuritySectionProps {
  isSecurityVisible: boolean
}

export default function SecuritySection({ isSecurityVisible }: SecuritySectionProps) {
  return (
    <section className="min-h-screen flex flex-col lg:flex-row overflow-hidden">
      {/* Mobile: Top half (Phone) / Desktop: Right half */}
      <div
        className={`h-[50vh] lg:h-auto w-full lg:w-1/2 lg:order-2 bg-gradient-to-b from-purple-700 to-indigo-600 flex justify-center items-center py-4 ${
          isSecurityVisible ? "animate-window-from-right" : "transform translate-x-full"
        }`}
      >
        <div className="relative">
          <PhoneMockup>
            <div className="p-4">
              <p className="text-gray-300 text-sm lg:text-lg">Security Center</p>
              <p className="text-gray-300 text-sm lg:text-lg mb-2 lg:mb-4">Protected</p>

              <div className="mb-4 lg:mb-6">
                <h3 className="text-green-400 text-xl lg:text-3xl font-bold">All Systems Secure</h3>
                <div className="flex items-center mt-1 lg:mt-2">
                  <span className="text-green-400 mr-2 text-sm lg:text-base">✓</span>
                  <span className="text-gray-400 text-xs lg:text-base">Last scan: 2 minutes ago</span>
                </div>
              </div>

              <div className="mt-2 lg:mt-4 space-y-2 lg:space-y-3">
                <div className="w-full py-2 lg:py-4 px-3 lg:px-6 rounded-xl bg-gray-800 text-white text-sm lg:text-base flex items-center justify-between">
                  <span>Biometric Lock</span>
                  <div className="w-10 h-5 lg:w-12 lg:h-6 bg-green-500 rounded-full relative">
                    <div className="w-4 h-4 lg:w-5 lg:h-5 bg-white rounded-full absolute right-0.5 lg:right-1 top-0.5"></div>
                  </div>
                </div>

                <div className="w-full py-2 lg:py-4 px-3 lg:px-6 rounded-xl bg-gray-800 text-white text-sm lg:text-base flex items-center justify-between">
                  <span>2FA Authentication</span>
                  <div className="w-10 h-5 lg:w-12 lg:h-6 bg-green-500 rounded-full relative">
                    <div className="w-4 h-4 lg:w-5 lg:h-5 bg-white rounded-full absolute right-0.5 lg:right-1 top-0.5"></div>
                  </div>
                </div>

                <div className="w-full py-2 lg:py-4 px-3 lg:px-6 rounded-xl bg-gray-800 text-white text-sm lg:text-base flex items-center justify-between">
                  <span>Transaction Alerts</span>
                  <div className="w-10 h-5 lg:w-12 lg:h-6 bg-green-500 rounded-full relative">
                    <div className="w-4 h-4 lg:w-5 lg:h-5 bg-white rounded-full absolute right-0.5 lg:right-1 top-0.5"></div>
                  </div>
                </div>

                <button className="w-full py-2 lg:py-4 px-4 lg:px-6 rounded-xl bg-gradient-to-r from-indigo-700 to-purple-600 text-white text-base lg:text-xl flex items-center justify-center">
                  <span>Security Scan</span>
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
              isSecurityVisible ? "animate-fade-in-zoom" : ""
            }`}
          >
            <Shield className="h-5 w-5 lg:h-6 lg:w-6 text-black" />
          </div>

          <h2 className="overflow-hidden">
            <span
              className={`text-white text-2xl lg:text-5xl font-bold block opacity-0 ${
                isSecurityVisible ? "animate-slide-up-1" : ""
              }`}
            >
              Advanced Safety
            </span>
            <span
              className={`text-white text-2xl lg:text-5xl font-bold block opacity-0 ${
                isSecurityVisible ? "animate-slide-up-2" : ""
              }`}
            >
              For Every Meetup
            </span>
          </h2>

          <p
            className={`text-white/80 text-sm lg:text-lg font-light mt-4 lg:mt-6 opacity-0 ${
              isSecurityVisible ? "animate-fade-in-delayed" : ""
            }`}
          >
            From selfie and ID verification to strict community guidelines, Evertwine ensures your in-person
            interactions are built on trust and transparency.
          </p>
        </div>
      </div>
    </section>
  )
}
