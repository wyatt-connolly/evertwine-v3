"use client"

import { useState, useEffect, useRef } from "react"
import Navbar from "@/components/layout/Navbar"
import MobileMenu from "@/components/layout/MobileMenu"
import HeroSection from "@/components/sections/HeroSection"
import FeatureSection from "@/components/sections/FeatureSection"
import PrivacySection from "@/components/sections/PrivacySection"
import SecuritySection from "@/components/sections/SecuritySection"
import FeatureGridSection from "@/components/sections/FeatureGridSection"
import TestimonialsSection from "@/components/sections/TestimonialsSection"
import FaqSection from "@/components/sections/FaqSection"
import DownloadSection from "@/components/sections/DownloadSection"

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [menuAnimation, setMenuAnimation] = useState<string | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isFeatureVisible, setIsFeatureVisible] = useState(false)
  const [isPrivacyVisible, setIsPrivacyVisible] = useState(false)
  const [isSecurityVisible, setIsSecurityVisible] = useState(false)
  const [isFeatureGridVisible, setIsFeatureGridVisible] = useState(false)
  const [isTestimonialsVisible, setIsTestimonialsVisible] = useState(false)
  const [isFaqVisible, setIsFaqVisible] = useState(false)
  const [isDownloadVisible, setIsDownloadVisible] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const featureRef = useRef<HTMLDivElement>(null)
  const privacyRef = useRef<HTMLDivElement>(null)
  const securityRef = useRef<HTMLDivElement>(null)
  const featureGridRef = useRef<HTMLDivElement>(null)
  const testimonialsRef = useRef<HTMLDivElement>(null)
  const faqRef = useRef<HTMLDivElement>(null)
  const downloadRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Trigger the animation after component mount
    setIsLoaded(true)

    // Set up intersection observer for the feature section
    const featureObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsFeatureVisible(true)
          featureObserver.disconnect()
        }
      },
      { threshold: 0.2 },
    )

    // Set up intersection observer for the privacy section
    const privacyObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsPrivacyVisible(true)
          privacyObserver.disconnect()
        }
      },
      { threshold: 0.2 },
    )

    // Set up intersection observer for the security section
    const securityObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsSecurityVisible(true)
          securityObserver.disconnect()
        }
      },
      { threshold: 0.2 },
    )

    // Set up intersection observer for the feature grid section
    const featureGridObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsFeatureGridVisible(true)
          featureGridObserver.disconnect()
        }
      },
      { threshold: 0.2 },
    )

    // Set up intersection observer for the testimonials section
    const testimonialsObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsTestimonialsVisible(true)
          testimonialsObserver.disconnect()
        }
      },
      { threshold: 0.2 },
    )

    // Set up intersection observer for the FAQ section
    const faqObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsFaqVisible(true)
          faqObserver.disconnect()
        }
      },
      { threshold: 0.2 },
    )

    // Set up intersection observer for the download section
    const downloadObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsDownloadVisible(true)
          downloadObserver.disconnect()
        }
      },
      { threshold: 0.2 },
    )

    if (featureRef.current) {
      featureObserver.observe(featureRef.current)
    }

    if (privacyRef.current) {
      privacyObserver.observe(privacyRef.current)
    }

    if (securityRef.current) {
      securityObserver.observe(securityRef.current)
    }

    if (featureGridRef.current) {
      featureGridObserver.observe(featureGridRef.current)
    }

    if (testimonialsRef.current) {
      testimonialsObserver.observe(testimonialsRef.current)
    }

    if (faqRef.current) {
      faqObserver.observe(faqRef.current)
    }

    if (downloadRef.current) {
      downloadObserver.observe(downloadRef.current)
    }

    // Handle scroll event for navbar background change
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight

      // Change navbar background when scrolled 75% down the hero section
      if (scrollPosition > windowHeight * 0.75) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      featureObserver.disconnect()
      privacyObserver.disconnect()
      securityObserver.disconnect()
      featureGridObserver.disconnect()
      testimonialsObserver.disconnect()
      faqObserver.disconnect()
      downloadObserver.disconnect()
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  useEffect(() => {
    if (mobileMenuOpen) {
      setMenuAnimation("slideIn")
    } else if (menuAnimation) {
      setMenuAnimation("slideOut")
    }
  }, [mobileMenuOpen])

  const handleCloseMenu = () => {
    setMenuAnimation("slideOut")
    setTimeout(() => {
      setMobileMenuOpen(false)
    }, 300)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-black">
      {/* Mobile Menu */}
      <MobileMenu mobileMenuOpen={mobileMenuOpen} menuAnimation={menuAnimation} handleCloseMenu={handleCloseMenu} />

      {/* Main Content */}
      <div className="relative z-10">
        {/* Header */}
        <Navbar scrolled={scrolled} setMobileMenuOpen={setMobileMenuOpen} />

        {/* Hero Section */}
        <section id="overview" className="h-screen" ref={heroRef}>
          <HeroSection isLoaded={isLoaded} />
        </section>

        {/* Feature Section */}
        <section id="features" ref={featureRef}>
          <FeatureSection isFeatureVisible={isFeatureVisible} />
        </section>

        {/* Privacy Section */}
        <section id="privacy" ref={privacyRef}>
          <PrivacySection isPrivacyVisible={isPrivacyVisible} />
        </section>

        {/* Security Section */}
        <section id="security" ref={securityRef}>
          <SecuritySection isSecurityVisible={isSecurityVisible} />
        </section>

        {/* Feature Grid Section */}
        <section id="feature-grid" ref={featureGridRef}>
          <FeatureGridSection isFeatureGridVisible={isFeatureGridVisible} />
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" ref={testimonialsRef}>
          <TestimonialsSection isTestimonialsVisible={isTestimonialsVisible} />
        </section>

        {/* FAQ Section */}
        <section id="faq" ref={faqRef}>
          <FaqSection isFaqVisible={isFaqVisible} />
        </section>

        {/* Download Section */}
        <section id="download" ref={downloadRef}>
          <DownloadSection isDownloadVisible={isDownloadVisible} />
        </section>
      </div>
    </div>
  )
}
