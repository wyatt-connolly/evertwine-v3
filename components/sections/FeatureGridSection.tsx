"use client"
import { Search, MapPin, Shield, Map, Users, Gift } from "lucide-react"

interface FeatureGridSectionProps {
  isFeatureGridVisible: boolean
}

export default function FeatureGridSection({ isFeatureGridVisible }: FeatureGridSectionProps) {
  return (
    <section className="min-h-screen bg-black px-4 lg:px-8 flex items-center">
      <div className="container mx-auto">
        <div
          className={`text-center mb-16 transition-all duration-700 transform ${
            isFeatureGridVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-4">
            Big on <span className="text-blue-500">features</span>.
          </h2>
          <p className="text-2xl sm:text-3xl lg:text-5xl font-bold text-white">Deceptively simple</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Interest-Based Matching Card */}
          <div
            className={`feature-card rounded-3xl bg-black border border-gray-800 p-6 overflow-hidden transition-all duration-500 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/20 transform ${
              isFeatureGridVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
            }`}
            style={{ transitionDelay: "100ms" }}
          >
            <h3 className="text-white text-2xl font-bold mb-6">🔍 Interest-Based Matching</h3>
            <div className="h-40 w-full relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-500 rounded-xl overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <div className="relative w-full h-full">
                    {/* Interest matching visualization */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                      <Search className="h-10 w-10 text-white" />
                    </div>
                    {/* Connection lines */}
                    <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full"></div>
                    <div className="absolute top-3/4 left-1/4 w-2 h-2 bg-white rounded-full"></div>
                    <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-white rounded-full"></div>
                    <div className="absolute top-3/4 right-1/4 w-2 h-2 bg-white rounded-full"></div>
                    <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-white rounded-full"></div>
                    <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-white rounded-full"></div>

                    {/* Connection lines */}
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                      <line x1="25" y1="25" x2="50" y2="50" stroke="white" strokeWidth="1" strokeOpacity="0.6" />
                      <line x1="25" y1="75" x2="50" y2="50" stroke="white" strokeWidth="1" strokeOpacity="0.6" />
                      <line x1="75" y1="25" x2="50" y2="50" stroke="white" strokeWidth="1" strokeOpacity="0.6" />
                      <line x1="75" y1="75" x2="50" y2="50" stroke="white" strokeWidth="1" strokeOpacity="0.6" />
                      <line x1="25" y1="50" x2="50" y2="50" stroke="white" strokeWidth="1" strokeOpacity="0.6" />
                      <line x1="75" y1="50" x2="50" y2="50" stroke="white" strokeWidth="1" strokeOpacity="0.6" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Real-World Meetups Card */}
          <div
            className={`feature-card rounded-3xl bg-black border border-gray-800 p-6 overflow-hidden transition-all duration-500 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/20 transform ${
              isFeatureGridVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <h3 className="text-white text-2xl font-bold mb-6">📍 Real-World Meetups</h3>
            <div className="h-40 w-full relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-full h-full">
                    {/* Map pins */}
                    <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
                      <MapPin className="h-8 w-8 text-white" />
                    </div>
                    <div className="absolute top-2/3 left-2/3 transform -translate-x-1/2 -translate-y-1/2">
                      <MapPin className="h-8 w-8 text-white" />
                    </div>
                    <div className="absolute top-1/3 right-1/4 transform -translate-x-1/2 -translate-y-1/2">
                      <MapPin className="h-8 w-8 text-white" />
                    </div>

                    {/* People icons */}
                    <div className="absolute bottom-1/4 left-1/3 w-6 h-6 bg-white/30 rounded-full"></div>
                    <div className="absolute bottom-1/3 right-1/3 w-6 h-6 bg-white/30 rounded-full"></div>
                    <div className="absolute top-1/2 left-1/2 w-6 h-6 bg-white/30 rounded-full"></div>

                    {/* City skyline silhouette */}
                    <div className="absolute bottom-0 left-0 right-0 h-1/4">
                      <svg viewBox="0 0 100 20" className="w-full h-full">
                        <path
                          d="M0,20 L5,20 L5,15 L10,15 L10,10 L15,10 L15,15 L20,15 L20,5 L25,5 L25,15 L30,15 L30,10 L35,10 L35,20 L40,20 L40,5 L45,5 L45,10 L50,10 L50,0 L55,0 L55,10 L60,10 L60,5 L65,5 L65,15 L70,15 L70,10 L75,10 L75,15 L80,15 L80,5 L85,5 L85,15 L90,15 L90,10 L95,10 L95,20 L100,20 Z"
                          fill="rgba(255,255,255,0.2)"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Verified & Vetted Community Card */}
          <div
            className={`feature-card rounded-3xl bg-black border border-gray-800 p-6 overflow-hidden transition-all duration-500 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/20 transform ${
              isFeatureGridVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
            }`}
            style={{ transitionDelay: "300ms" }}
          >
            <h3 className="text-white text-2xl font-bold mb-6">🛡️ Verified & Vetted Community</h3>
            <div className="h-40 w-full relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-teal-600 rounded-xl overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex flex-col items-center">
                    <Shield className="h-16 w-16 text-white mb-2" />
                    <div className="w-24 h-6 bg-white/20 rounded-full flex items-center justify-center">
                      <div className="w-20 h-3 bg-white/40 rounded-full"></div>
                    </div>
                    <div className="mt-2 w-16 h-4 bg-white/20 rounded-full flex items-center justify-center">
                      <div className="w-12 h-2 bg-white/40 rounded-full"></div>
                    </div>
                    <div className="absolute top-1/4 right-1/4 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                      <div className="w-4 h-4 bg-white/30 rounded-full"></div>
                    </div>
                    <div className="absolute bottom-1/4 left-1/4 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                      <div className="w-4 h-4 bg-white/30 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Map & List View Card */}
          <div
            className={`feature-card rounded-3xl bg-black border border-gray-800 p-6 overflow-hidden transition-all duration-500 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/20 transform ${
              isFeatureGridVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            <h3 className="text-white text-2xl font-bold mb-6">🧭 Interactive Map & List View</h3>
            <div className="h-40 w-full relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl overflow-hidden">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-1/2 h-full flex items-center justify-center">
                    <div className="relative w-24 h-24 bg-white/10 rounded-lg">
                      <Map className="absolute inset-0 m-auto h-16 w-16 text-white" />
                      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full"></div>
                      <div className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <div className="w-1/2 h-full flex flex-col justify-center items-center">
                    <div className="w-24 h-4 bg-white/20 rounded-sm mb-2"></div>
                    <div className="w-24 h-4 bg-white/20 rounded-sm mb-2"></div>
                    <div className="w-24 h-4 bg-white/20 rounded-sm mb-2"></div>
                    <div className="w-24 h-4 bg-white/20 rounded-sm mb-2"></div>
                    <div className="w-24 h-4 bg-white/20 rounded-sm"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Friend & Business Modes Card */}
          <div
            className={`feature-card rounded-3xl bg-black border border-gray-800 p-6 overflow-hidden transition-all duration-500 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/20 transform ${
              isFeatureGridVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
            }`}
            style={{ transitionDelay: "500ms" }}
          >
            <h3 className="text-white text-2xl font-bold mb-6">🔄 Friend & Business Modes</h3>
            <div className="h-40 w-full flex items-center justify-center">
              <div className="relative w-full h-full">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl overflow-hidden">
                  <div className="absolute inset-0">
                    {/* Split background */}
                    <div className="absolute inset-0 right-1/2 bg-white/10"></div>

                    {/* Center divider with toggle */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-white/30 transform -translate-x-1/2"></div>
                    <div className="absolute left-1/2 top-1/2 w-8 h-8 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M7 16l10-8M17 16L7 8"
                          stroke="#6366F1"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>

                    {/* Friend side */}
                    <div className="absolute left-1/4 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <Users className="h-12 w-12 text-white" />
                    </div>

                    {/* Business side */}
                    <div className="absolute right-1/4 top-1/2 transform translate-x-1/2 -translate-y-1/2">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h-5m5 0h2M5 21h5m-5 0H3m7 0h4m0 0v-4"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M9 7h1m4 0h1m-6 4h1m4 0h1m-6 4h1m4 0h1"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Local Partner Perks Card */}
          <div
            className={`feature-card rounded-3xl bg-black border border-gray-800 p-6 overflow-hidden transition-all duration-500 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/20 transform ${
              isFeatureGridVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
            }`}
            style={{ transitionDelay: "600ms" }}
          >
            <h3 className="text-white text-2xl font-bold mb-6">🎁 Local Partner Perks</h3>
            <div className="h-40 w-full relative">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-red-600 rounded-xl overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <Gift className="h-16 w-16 text-white" />

                    {/* Gift sparkles */}
                    <div className="absolute top-0 left-0 w-2 h-2 bg-white rounded-full"></div>
                    <div className="absolute top-1/4 right-0 w-2 h-2 bg-white rounded-full"></div>
                    <div className="absolute bottom-0 right-1/4 w-2 h-2 bg-white rounded-full"></div>

                    {/* Discount tags */}
                    <div className="absolute -top-4 -right-8 bg-white/20 rounded-full px-2 py-1 text-xs text-white font-bold">
                      -20%
                    </div>
                    <div className="absolute -bottom-4 -left-8 bg-white/20 rounded-full px-2 py-1 text-xs text-white font-bold">
                      -15%
                    </div>

                    {/* Store icons */}
                    <div className="absolute -bottom-8 right-0 w-8 h-8 bg-white/20 rounded-full"></div>
                    <div className="absolute -top-8 left-0 w-8 h-8 bg-white/20 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
