"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import {
  ArrowRight,
  CheckCircle,
  Building2,
  Users,
  Gift,
  TrendingUp,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { sendEmail } from "@/app/actions/send-email";
import Footer from "@/components/layout/Footer";

export default function PartnersPage() {
  const [activeTab, setActiveTab] = useState<"business" | "affiliate">(
    "business"
  );
  const [formSubmitted, setFormSubmitted] = useState(false);
  // Remove scrolled state since we won't be changing the navbar background
  const [pageLoaded, setPageLoaded] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [inViewElements, setInViewElements] = useState({
    header: false,
    tabs: false,
    businessForm: false,
    businessBenefits: false,
    affiliateForm: false,
    affiliateBenefits: false,
  });

  // Refs for sections
  const headerRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const businessFormRef = useRef<HTMLDivElement>(null);
  const businessBenefitsRef = useRef<HTMLDivElement>(null);
  const affiliateFormRef = useRef<HTMLDivElement>(null);
  const affiliateBenefitsRef = useRef<HTMLDivElement>(null);

  // Business form state
  const [businessFormData, setBusinessFormData] = useState({
    businessName: "",
    contactName: "",
    email: "",
    phone: "",
    businessType: "",
    location: "",
    message: "",
  });

  // Affiliate form state
  const [affiliateFormData, setAffiliateFormData] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "",
    message: "",
  });

  // Handle page load animation
  useEffect(() => {
    setPageLoaded(true);
  }, []);

  // Handle scroll animations but don't change navbar background
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPosition = window.scrollY;
      setScrollPosition(currentScrollPosition);

      // Removed the code that sets scrolled state
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track which elements are in view for animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: "0px 0px -10% 0px",
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const targetId = entry.target.id;
          setInViewElements((prev) => ({ ...prev, [targetId]: true }));
        }
      });
    };

    const observer = new IntersectionObserver(
      handleIntersection,
      observerOptions
    );

    if (headerRef.current) observer.observe(headerRef.current);
    if (tabsRef.current) observer.observe(tabsRef.current);
    if (businessFormRef.current) observer.observe(businessFormRef.current);
    if (businessBenefitsRef.current)
      observer.observe(businessBenefitsRef.current);
    if (affiliateFormRef.current) observer.observe(affiliateFormRef.current);
    if (affiliateBenefitsRef.current)
      observer.observe(affiliateBenefitsRef.current);

    return () => observer.disconnect();
  }, [activeTab]);

  const handleBusinessChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setBusinessFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAffiliateChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setAffiliateFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTabChange = (tab: "business" | "affiliate") => {
    setActiveTab(tab);
    // Reset in-view animations for tab content
    setInViewElements((prev) => ({
      ...prev,
      businessForm: false,
      businessBenefits: false,
      affiliateForm: false,
      affiliateBenefits: false,
    }));
    // Small delay before triggering new animations
    setTimeout(() => {
      if (tab === "business") {
        setInViewElements((prev) => ({
          ...prev,
          businessForm: true,
          businessBenefits: true,
        }));
      } else {
        setInViewElements((prev) => ({
          ...prev,
          affiliateForm: true,
          affiliateBenefits: true,
        }));
      }
    }, 100);
  };

  const handleBusinessSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Send the email
      const result = await sendEmail("business", businessFormData);

      if (result.success) {
        console.log("Business Partnership Form Submitted:", businessFormData);
        setFormSubmitted(true);
        // Reset form after submission
        setBusinessFormData({
          businessName: "",
          contactName: "",
          email: "",
          phone: "",
          businessType: "",
          location: "",
          message: "",
        });
        // Show success message for 5 seconds
        setTimeout(() => {
          setFormSubmitted(false);
        }, 5000);
      } else {
        // Handle error
        alert(
          "There was an error submitting your request. Please try again later."
        );
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(
        "There was an error submitting your request. Please try again later."
      );
    }
  };

  const handleAffiliateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Send the email
      const result = await sendEmail("affiliate", affiliateFormData);

      if (result.success) {
        console.log("Affiliate Partner Form Submitted:", affiliateFormData);
        setFormSubmitted(true);
        // Reset form after submission
        setAffiliateFormData({
          name: "",
          email: "",
          phone: "",
          experience: "",
          message: "",
        });
        // Show success message for 5 seconds
        setTimeout(() => {
          setFormSubmitted(false);
        }, 5000);
      } else {
        // Handle error
        alert(
          "There was an error submitting your application. Please try again later."
        );
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(
        "There was an error submitting your application. Please try again later."
      );
    }
  };

  // Parallax effect calculations for header elements
  const headerYOffset = scrollPosition * 0.3;
  const subtitleYOffset = scrollPosition * 0.2;

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      {/* Header - now with consistent background */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-sm border-b border-blue-900/20">
        <div className="container mx-auto px-6 py-4 md:px-8 md:py-8 h-[96px] md:h-[110px] flex items-center">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
              <Link
                href="/"
                className={`flex items-center transition-all duration-500 ${
                  pageLoaded ? "opacity-100" : "opacity-0 -translate-x-8"
                }`}
              >
                <Image
                  src="/evertwine-logo.png"
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
            <Link
              href="/"
              className={`inline-flex items-center justify-center space-x-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-500 text-sm font-medium border border-white/20 ${
                pageLoaded ? "opacity-100" : "opacity-0 translate-x-8"
              }`}
            >
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Rest of the component remains unchanged */}
      <main className="pt-[130px] pb-20">
        {/* ... existing code ... */}
        <div className="container mx-auto px-6 md:px-8">
          {/* Hero Section with Parallax */}
          <div
            id="header"
            ref={headerRef}
            className="text-center mb-12 relative"
            style={{ transform: `translateY(${headerYOffset}px)` }}
          >
            <div className="absolute -top-20 -left-40 w-80 h-80 bg-blue-900/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-purple-900/10 rounded-full blur-3xl"></div>
            <h1
              className={`text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 font-sora relative transform transition-all duration-1000 ${
                pageLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              Partner with{" "}
              <span className="text-blue-400 relative inline-block">
                Evertwine
                <span
                  className="absolute bottom-0 left-0 w-full h-1 bg-blue-400 transform scale-x-0 origin-left transition-transform duration-1000 ease-out"
                  style={{ transform: pageLoaded ? "scaleX(1)" : "scaleX(0)" }}
                ></span>
              </span>
            </h1>
            <p
              className={`text-xl text-white/80 max-w-3xl mx-auto font-dm-sans relative transition-all duration-1000 delay-300 ${
                pageLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transform: `translateY(${subtitleYOffset}px)` }}
            >
              Join our growing ecosystem and help create meaningful connections
              in your community.
            </p>
          </div>

          {/* Tab Navigation with Animation */}
          <div
            id="tabs"
            ref={tabsRef}
            className={`flex justify-center mb-12 transition-all duration-1000 delay-500 ${
              pageLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="inline-flex bg-blue-900/10 backdrop-blur-sm rounded-full p-1.5 relative">
              {/* Animated background for active tab */}
              <div
                className="absolute top-1.5 h-[calc(100%-12px)] rounded-full bg-blue-600 transition-all duration-500 ease-out z-0"
                style={{
                  left: activeTab === "business" ? "4px" : "50%",
                  right: activeTab === "affiliate" ? "4px" : "50%",
                }}
              ></div>
              <button
                onClick={() => handleTabChange("business")}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 z-10 ${
                  activeTab === "business"
                    ? "text-white"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                For Businesses
              </button>
              <button
                onClick={() => handleTabChange("affiliate")}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 z-10 ${
                  activeTab === "affiliate"
                    ? "text-white"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                For Affiliates
              </button>
            </div>
          </div>

          {/* Business Partners Tab */}
          <div
            className={`transition-opacity duration-500 ease-in-out ${
              activeTab === "business" ? "opacity-100" : "opacity-0 hidden"
            }`}
          >
            <div className="flex flex-col-reverse lg:flex-row gap-12 items-center">
              {/* Left side - Form */}
              <div
                id="businessForm"
                ref={businessFormRef}
                className={`w-full lg:w-1/2 transition-all duration-1000 ${
                  inViewElements.businessForm
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-20"
                }`}
              >
                <div className="bg-blue-950/20 backdrop-blur-sm border border-blue-900/20 rounded-3xl p-8 md:p-10 transition-all duration-500 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-900/20">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 font-sora">
                    Contact Us
                  </h3>

                  {formSubmitted ? (
                    <div className="flex flex-col items-center justify-center py-10 text-center">
                      <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mb-6 animate-pulse">
                        <CheckCircle className="h-8 w-8 text-blue-400" />
                      </div>
                      <h4 className="text-2xl font-bold text-white mb-2 font-sora animate-fade-in-up">
                        Partnership Request Received!
                      </h4>
                      <p className="text-white/70 max-w-md font-dm-sans animate-fade-in-up-delayed">
                        Thank you for your interest in partnering with
                        Evertwine. Your request has been sent to our team at
                        support@evertwine.social. We&apos;ll review your
                        information and reach out within 2 business days.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleBusinessSubmit} className="space-y-6">
                      {/* Form fields remain unchanged */}
                      <div className="space-y-2">
                        <label
                          htmlFor="businessName"
                          className="block text-white font-medium font-dm-sans"
                        >
                          Business Name
                        </label>
                        <input
                          type="text"
                          id="businessName"
                          name="businessName"
                          value={businessFormData.businessName}
                          onChange={handleBusinessChange}
                          required
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-dm-sans transition-all duration-300 hover:bg-white/15"
                          placeholder="Your business name"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label
                            htmlFor="contactName"
                            className="block text-white font-medium font-dm-sans"
                          >
                            Contact Person
                          </label>
                          <input
                            type="text"
                            id="contactName"
                            name="contactName"
                            value={businessFormData.contactName}
                            onChange={handleBusinessChange}
                            required
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-dm-sans transition-all duration-300 hover:bg-white/15"
                            placeholder="Your name"
                          />
                        </div>
                        <div className="space-y-2">
                          <label
                            htmlFor="email"
                            className="block text-white font-medium font-dm-sans"
                          >
                            Email Address
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={businessFormData.email}
                            onChange={handleBusinessChange}
                            required
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-dm-sans transition-all duration-300 hover:bg-white/15"
                            placeholder="you@example.com"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label
                            htmlFor="phone"
                            className="block text-white font-medium font-dm-sans"
                          >
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={businessFormData.phone}
                            onChange={handleBusinessChange}
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-dm-sans transition-all duration-300 hover:bg-white/15"
                            placeholder="(123) 456-7890"
                          />
                        </div>
                        <div className="space-y-2">
                          <label
                            htmlFor="businessType"
                            className="block text-white font-medium font-dm-sans"
                          >
                            Business Type
                          </label>
                          <select
                            id="businessType"
                            name="businessType"
                            value={businessFormData.businessType}
                            onChange={handleBusinessChange}
                            required
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-dm-sans appearance-none transition-all duration-300 hover:bg-white/15"
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
                            <option
                              value="entertainment"
                              className="bg-gray-900"
                            >
                              Entertainment Venue
                            </option>
                            <option
                              value="professional"
                              className="bg-gray-900"
                            >
                              Professional Services
                            </option>
                            <option value="other" className="bg-gray-900">
                              Other
                            </option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="location"
                          className="block text-white font-medium font-dm-sans"
                        >
                          Business Location
                        </label>
                        <input
                          type="text"
                          id="location"
                          name="location"
                          value={businessFormData.location}
                          onChange={handleBusinessChange}
                          required
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-dm-sans transition-all duration-300 hover:bg-white/15"
                          placeholder="City, State"
                        />
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="message"
                          className="block text-white font-medium font-dm-sans"
                        >
                          How would you like to partner with Evertwine?
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={businessFormData.message}
                          onChange={handleBusinessChange}
                          rows={4}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-dm-sans resize-none transition-all duration-300 hover:bg-white/15"
                          placeholder="Tell us about your business and partnership ideas..."
                        ></textarea>
                      </div>

                      <button
                        type="submit"
                        className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-500 hover:to-blue-300 text-white font-medium py-3 px-6 rounded-lg transition-all duration-500 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-600/30 font-dm-sans group"
                      >
                        <span>Submit Partnership Request</span>
                        <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                      </button>
                    </form>
                  )}
                </div>
              </div>

              {/* Right side - Benefits */}
              <div
                id="businessBenefits"
                ref={businessBenefitsRef}
                className={`w-full lg:w-1/2 transition-all duration-1000 delay-200 ${
                  inViewElements.businessBenefits
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-20"
                }`}
              >
                {/* Benefits content remains unchanged */}
                <div className="bg-blue-950/20 backdrop-blur-sm border border-blue-900/20 rounded-3xl p-8 md:p-10 transition-all duration-500 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-900/20">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 font-sora">
                    Partnership Benefits
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[
                      {
                        icon: <Building2 className="h-8 w-8 text-blue-400" />,
                        title: "Boost Your Local Visibility",
                        description:
                          "Get featured in our app with premium placement and promotional opportunities that highlight your business to our local community.",
                      },
                      {
                        icon: <Users className="h-8 w-8 text-blue-400" />,
                        title: "Attract Engaged, Local Customers",
                        description:
                          "Connect with our growing user base of engaged individuals actively seeking authentic local experiences.",
                      },
                      {
                        icon: <TrendingUp className="h-8 w-8 text-blue-400" />,
                        title: "Drive Real-World Foot Traffic",
                        description:
                          "Increase in-person visits through our meetup features, events, and targeted promotions.",
                      },
                      {
                        icon: <Gift className="h-8 w-8 text-blue-400" />,
                        title: "Join a Trusted Community Network",
                        description:
                          "Become part of a curated network of quality local businesses that our users trust and recommend.",
                      },
                    ].map((benefit, index) => (
                      <div
                        key={index}
                        className="bg-blue-950/20 border border-blue-900/20 rounded-2xl p-6 transition-all duration-500 hover:bg-gradient-to-br hover:from-blue-900/30 hover:to-purple-900/30 hover:border-blue-500/30 hover:scale-[1.03] hover:shadow-lg transform group"
                        style={{ transitionDelay: `${index * 100}ms` }}
                      >
                        <div className="w-14 h-14 bg-gradient-to-br from-blue-500/40 to-purple-500/40 rounded-full flex items-center justify-center mb-4 transition-all duration-500 group-hover:from-blue-500/50 group-hover:to-purple-500/50 group-hover:scale-110">
                          {benefit.icon}
                        </div>
                        <h4 className="text-xl font-semibold text-white mb-2 font-sora group-hover:text-blue-300 transition-colors duration-300">
                          {benefit.title}
                        </h4>
                        <p className="text-white/90 font-dm-sans group-hover:text-white transition-colors duration-300">
                          {benefit.description}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 p-6 bg-blue-500/10 border border-blue-500/20 rounded-xl transition-all duration-500 hover:bg-blue-500/15 hover:border-blue-500/30">
                    <h4 className="text-xl font-semibold text-white mb-2 font-sora">
                      Our Partnership Approach
                    </h4>
                    <p className="text-white/70 font-dm-sans">
                      We create customized partnership plans based on your
                      business goals. Whether you&apos;re looking to increase
                      brand awareness, drive foot traffic, or create special
                      offers for our users, we&apos;ll work with you to design a
                      partnership that delivers results.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Affiliate Partners Tab */}
          <div
            className={`transition-opacity duration-500 ease-in-out ${
              activeTab === "affiliate" ? "opacity-100" : "opacity-0 hidden"
            }`}
          >
            {/* Affiliate content remains unchanged */}
            <div className="flex flex-col lg:flex-row gap-12 items-center">
              {/* Left side - Benefits */}
              <div
                id="affiliateBenefits"
                ref={affiliateBenefitsRef}
                className={`w-full lg:w-1/2 transition-all duration-1000 ${
                  inViewElements.affiliateBenefits
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-20"
                }`}
              >
                <div className="bg-blue-950/20 backdrop-blur-sm border border-blue-900/20 rounded-3xl p-8 md:p-10 transition-all duration-500 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-900/20">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 font-sora">
                    Why Become an Affiliate?
                  </h3>

                  <ul className="space-y-6">
                    {[
                      {
                        title: "Lucrative Commissions",
                        description:
                          "Earn up to 15% commission on every business partnership you help establish.",
                      },
                      {
                        title: "Flexible Schedule",
                        description:
                          "Work on your own time and from anywhere—perfect for networkers and connectors.",
                      },
                      {
                        title: "Exclusive Resources",
                        description:
                          "Get access to marketing materials, training, and dedicated support.",
                      },
                      {
                        title: "Community Impact",
                        description:
                          "Help local businesses thrive while creating value for Evertwine users.",
                      },
                    ].map((benefit, index) => (
                      <li
                        key={index}
                        className={`flex items-start p-4 bg-blue-950/20 border border-blue-900/20 rounded-xl mb-4 transition-all duration-700 hover:translate-x-2 opacity-0`}
                        style={{
                          animation: inViewElements.affiliateBenefits
                            ? "fadeInRight 0.7s forwards"
                            : "none",
                          animationDelay: `${index * 150}ms`,
                        }}
                      >
                        <CheckCircle className="h-6 w-6 text-blue-400 flex-shrink-0 mt-1 transition-all duration-300 transform hover:scale-110" />
                        <div className="ml-4">
                          <h4 className="text-xl font-semibold text-white mb-1 font-sora">
                            {benefit.title}
                          </h4>
                          <p className="text-white/90 font-dm-sans">
                            {benefit.description}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right side - Form */}
              <div
                id="affiliateForm"
                ref={affiliateFormRef}
                className={`w-full lg:w-1/2 transition-all duration-1000 delay-200 ${
                  inViewElements.affiliateForm
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-20"
                }`}
              >
                <div className="bg-blue-950/20 backdrop-blur-sm border border-blue-900/20 rounded-3xl p-8 md:p-10 transition-all duration-500 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-900/20">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 font-sora">
                    Apply Now
                  </h3>

                  {formSubmitted ? (
                    <div className="flex flex-col items-center justify-center py-10 text-center">
                      <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mb-6 animate-pulse">
                        <CheckCircle className="h-8 w-8 text-blue-400" />
                      </div>
                      <h4 className="text-2xl font-bold text-white mb-2 font-sora animate-fade-in-up">
                        Application Received!
                      </h4>
                      <p className="text-white/70 max-w-md font-dm-sans animate-fade-in-up-delayed">
                        Thank you for your interest in becoming an Evertwine
                        affiliate partner. Your application has been sent to our
                        team at support@evertwine.social. We&apos;ll review your
                        information and contact you within 2-3 business days.
                      </p>
                    </div>
                  ) : (
                    <form
                      onSubmit={handleAffiliateSubmit}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label
                            htmlFor="name"
                            className="block text-white font-medium font-dm-sans"
                          >
                            Full Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={affiliateFormData.name}
                            onChange={handleAffiliateChange}
                            required
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-dm-sans transition-all duration-300 hover:bg-white/15"
                            placeholder="Your name"
                          />
                        </div>
                        <div className="space-y-2">
                          <label
                            htmlFor="email"
                            className="block text-white font-medium font-dm-sans"
                          >
                            Email Address
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={affiliateFormData.email}
                            onChange={handleAffiliateChange}
                            required
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-dm-sans transition-all duration-300 hover:bg-white/15"
                            placeholder="you@example.com"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="phone"
                          className="block text-white font-medium font-dm-sans"
                        >
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={affiliateFormData.phone}
                          onChange={handleAffiliateChange}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-dm-sans transition-all duration-300 hover:bg-white/15"
                          placeholder="(123) 456-7890"
                        />
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="experience"
                          className="block text-white font-medium font-dm-sans"
                        >
                          Business Development Experience
                        </label>
                        <select
                          id="experience"
                          name="experience"
                          value={affiliateFormData.experience}
                          onChange={handleAffiliateChange}
                          required
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-dm-sans appearance-none transition-all duration-300 hover:bg-white/15"
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
                        <label
                          htmlFor="message"
                          className="block text-white font-medium font-dm-sans"
                        >
                          Why do you want to be an Evertwine affiliate?
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={affiliateFormData.message}
                          onChange={handleAffiliateChange}
                          rows={4}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-dm-sans resize-none transition-all duration-300 hover:bg-white/15"
                          placeholder="Tell us about your network and why you'd be a great affiliate partner..."
                        ></textarea>
                      </div>

                      <button
                        type="submit"
                        className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-500 hover:to-blue-300 text-white font-medium py-3 px-6 rounded-lg transition-all duration-500 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-600/30 font-dm-sans group"
                      >
                        <span>Submit Application</span>
                        <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Custom animation keyframes */}

      {/* Custom animation keyframes */}
      <style jsx global>{`
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
}
