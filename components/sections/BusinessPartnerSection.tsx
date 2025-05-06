"use client"

import type React from "react"

import { useState } from "react"
import { ArrowRight, CheckCircle, Building2, Users, Gift, TrendingUp } from "lucide-react"

interface BusinessPartnerSectionProps {
  isBusinessPartnerVisible: boolean
}

export default function BusinessPartnerSection({ isBusinessPartnerVisible }: BusinessPartnerSectionProps) {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    businessName: "",
    contactName: "",
    email: "",
    phone: "",
    businessType: "",
    location: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log("Business Partnership Form Submitted:", formData)
    setFormSubmitted(true)
    // Reset form after submission
    setFormData({
      businessName: "",
      contactName: "",
      email: "",
      phone: "",
      businessType: "",
      location: "",
      message: "",
    })
    // Show success message for 5 seconds
    setTimeout(() => {
      setFormSubmitted(false)
    }, 5000)
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-black to-blue-900 py-20">
      <div className="container mx-auto px-6 md:px-8">
        <div
          className={`text-center mb-16 transition-all duration-700 transform ${
            isBusinessPartnerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 font-sora">
            Partner Your <span className="text-blue-400">Business</span> With Us
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto font-dm-sans">
            Join our network of local businesses and connect with our community of engaged users.
          </p>
        </div>

        <div className="flex flex-col-reverse lg:flex-row gap-12 items-center">
          {/* Left side - Form */}
          <div
            className={`w-full lg:w-1/2 transition-all duration-700 delay-300 transform ${
              isBusinessPartnerVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-10">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 font-sora">Contact Us</h3>

              {formSubmitted ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle className="h-8 w-8 text-blue-400" />
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-2 font-sora">Partnership Request Received!</h4>
                  <p className="text-white/70 max-w-md font-dm-sans">
                    Thank you for your interest in partnering with Evertwine. Our business development team will review
                    your information and reach out within 2 business days.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="businessName" className="block text-white font-medium font-dm-sans">
                      Business Name
                    </label>
                    <input
                      type="text"
                      id="businessName"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 font-dm-sans"
                      placeholder="Your business name"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="contactName" className="block text-white font-medium font-dm-sans">
                        Contact Person
                      </label>
                      <input
                        type="text"
                        id="contactName"
                        name="contactName"
                        value={formData.contactName}
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      <label htmlFor="businessType" className="block text-white font-medium font-dm-sans">
                        Business Type
                      </label>
                      <select
                        id="businessType"
                        name="businessType"
                        value={formData.businessType}
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
                          Select business type
                        </option>
                        <option value="restaurant" className="bg-gray-900">
                          Restaurant/Café
                        </option>
                        <option value="retail" className="bg-gray-900">
                          Retail Store
                        </option>
                        <option value="fitness" className="bg-gray-900">
                          Fitness/Wellness
                        </option>
                        <option value="entertainment" className="bg-gray-900">
                          Entertainment Venue
                        </option>
                        <option value="professional" className="bg-gray-900">
                          Professional Services
                        </option>
                        <option value="other" className="bg-gray-900">
                          Other
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="location" className="block text-white font-medium font-dm-sans">
                      Business Location
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 font-dm-sans"
                      placeholder="City, State"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-white font-medium font-dm-sans">
                      How would you like to partner with Evertwine?
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 font-dm-sans resize-none"
                      placeholder="Tell us about your business and partnership ideas..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-500 hover:to-blue-300 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 font-dm-sans"
                  >
                    <span>Submit Partnership Request</span>
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right side - Benefits */}
          <div
            className={`w-full lg:w-1/2 transition-all duration-700 delay-200 transform ${
              isBusinessPartnerVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-10">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 font-sora">Partnership Benefits</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    icon: <Users className="h-8 w-8 text-blue-400" />,
                    title: "Access Our Community",
                    description:
                      "Connect with our growing user base of local, verified individuals looking for authentic experiences.",
                  },
                  {
                    icon: <TrendingUp className="h-8 w-8 text-blue-400" />,
                    title: "Increase Foot Traffic",
                    description: "Drive real-world visits to your location through our meetup and event features.",
                  },
                  {
                    icon: <Building2 className="h-8 w-8 text-blue-400" />,
                    title: "Enhanced Visibility",
                    description: "Get featured in our app with premium placement and promotional opportunities.",
                  },
                  {
                    icon: <Gift className="h-8 w-8 text-blue-400" />,
                    title: "Exclusive Promotions",
                    description: "Offer special deals to Evertwine users and track engagement with our analytics.",
                  },
                ].map((benefit, index) => (
                  <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                    <div className="w-14 h-14 bg-blue-500/20 rounded-full flex items-center justify-center mb-4">
                      {benefit.icon}
                    </div>
                    <h4 className="text-xl font-semibold text-white mb-2 font-sora">{benefit.title}</h4>
                    <p className="text-white/70 font-dm-sans">{benefit.description}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                <h4 className="text-xl font-semibold text-white mb-2 font-sora">Our Partnership Approach</h4>
                <p className="text-white/70 font-dm-sans">
                  We create customized partnership plans based on your business goals. Whether you're looking to
                  increase brand awareness, drive foot traffic, or create special offers for our users, we'll work with
                  you to design a partnership that delivers results.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
