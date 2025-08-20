"use client"

import type React from "react"

import { useState } from "react"
import { ArrowRight, CheckCircle } from "lucide-react"

interface AffiliatePartnerSectionProps {
  isAffiliatePartnerVisible: boolean
}

export default function AffiliatePartnerSection({ isAffiliatePartnerVisible }: AffiliatePartnerSectionProps) {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log("Affiliate Partner Form Submitted:", formData)
    setFormSubmitted(true)
    // Reset form after submission
    setFormData({
      name: "",
      email: "",
      phone: "",
      experience: "",
      message: "",
    })
    // Show success message for 5 seconds
    setTimeout(() => {
      setFormSubmitted(false)
    }, 5000)
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-blue-900 to-black py-20">
      <div className="container mx-auto px-6 md:px-8">
        <div
          className={`text-center mb-16 transition-all duration-700 transform ${
            isAffiliatePartnerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 font-sora">
            Become an <span className="text-blue-400">Affiliate Partner</span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto font-dm-sans">
            Help us connect with local businesses and earn commissions for every successful partnership you bring.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Left side - Benefits */}
          <div
            className={`w-full lg:w-1/2 transition-all duration-700 delay-200 transform ${
              isAffiliatePartnerVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-10">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 font-sora">Why Become an Affiliate?</h3>

              <ul className="space-y-6">
                {[
                  {
                    title: "Lucrative Commissions",
                    description: "Earn up to 15% commission on every business partnership you help establish.",
                  },
                  {
                    title: "Flexible Schedule",
                    description: "Work on your own time and from anywhere—perfect for networkers and connectors.",
                  },
                  {
                    title: "Exclusive Resources",
                    description: "Get access to marketing materials, training, and dedicated support.",
                  },
                  {
                    title: "Community Impact",
                    description: "Help local businesses thrive while creating value for Evertwine users.",
                  },
                ].map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-blue-400 flex-shrink-0 mt-1" />
                    <div className="ml-4">
                      <h4 className="text-xl font-semibold text-white mb-1 font-sora">{benefit.title}</h4>
                      <p className="text-white/70 font-dm-sans">{benefit.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right side - Form */}
          <div
            className={`w-full lg:w-1/2 transition-all duration-700 delay-300 transform ${
              isAffiliatePartnerVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-10">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 font-sora">Apply Now</h3>

              {formSubmitted ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle className="h-8 w-8 text-blue-400" />
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-2 font-sora">Application Received!</h4>
                  <p className="text-white/70 max-w-md font-dm-sans">
                    Thank you for your interest in becoming an Evertwine affiliate partner. Our team will review your
                    application and contact you within 2-3 business days.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="block text-white font-medium font-dm-sans">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 font-dm-sans"
                        placeholder="Your name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-white font-medium font-dm-sans">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 font-dm-sans"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="phone" className="block text-white font-medium font-dm-sans">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 font-dm-sans"
                      placeholder="(123) 456-7890"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="experience" className="block text-white font-medium font-dm-sans">
                      Business Development Experience
                    </label>
                    <select
                      id="experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-dm-sans appearance-none"
                      style={{
                        backgroundImage:
                          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='white' viewBox='0 0 24 24' stroke='white'%3E%3Cpath strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E\")",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 1rem center",
                        backgroundSize: "1.5em 1.5em",
                      }}
                    >
                      <option value="" disabled className="bg-gray-900">
                        Select your experience level
                      </option>
                      <option value="none" className="bg-gray-900">
                        No prior experience
                      </option>
                      <option value="some" className="bg-gray-900">
                        Some experience (1-2 years)
                      </option>
                      <option value="experienced" className="bg-gray-900">
                        Experienced (3-5 years)
                      </option>
                      <option value="expert" className="bg-gray-900">
                        Expert (5+ years)
                      </option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-white font-medium font-dm-sans">
                      Why do you want to be an Evertwine affiliate?
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 font-dm-sans resize-none"
                      placeholder="Tell us about your network and why you'd be a great affiliate partner..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-500 hover:to-blue-300 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 font-dm-sans"
                  >
                    <span>Submit Application</span>
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
