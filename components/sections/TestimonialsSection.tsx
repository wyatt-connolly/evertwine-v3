"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import TestimonialCard from "../ui/TestimonialCard"

interface TestimonialsSectionProps {
  isTestimonialsVisible: boolean
}

export default function TestimonialsSection({ isTestimonialsVisible }: TestimonialsSectionProps) {
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const testimonialScrollRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [dragDistance, setDragDistance] = useState(0)
  const lastDragTimeRef = useRef<number>(0)
  const dragPositionsRef = useRef<{ time: number; position: number }[]>([])
  const animationFrameRef = useRef<number | null>(null)
  const [isAtStart, setIsAtStart] = useState(true)
  const [isAtEnd, setIsAtEnd] = useState(false)

  const testimonials = [
    {
      quote:
        "Evertwine helped me find my hiking group! I've made genuine connections with people who share my passion for the outdoors.",
      author: "Sophia Chen",
      gradient: "from-blue-600 to-purple-500",
    },
    {
      quote:
        "After moving to a new city, Evertwine made it so easy to meet people. The verification process made me feel safe meeting new friends.",
      author: "Marcus Johnson",
      gradient: "from-blue-500 to-cyan-400",
    },
    {
      quote:
        "I've expanded my professional network through Evertwine's business mode. The local meetups are so much more effective than online networking.",
      author: "Aisha Patel",
      gradient: "from-blue-600 to-blue-400",
    },
    {
      quote:
        "The map feature makes finding local events super easy. I've discovered amazing coffee shops through Evertwine meetups!",
      author: "David Rodriguez",
      gradient: "from-blue-400 to-purple-400",
    },
    {
      quote:
        "As someone who values safety, I appreciate the verification system. It's refreshing to meet people who are exactly who they say they are.",
      author: "Emma Wilson",
      gradient: "from-indigo-500 to-blue-500",
    },
    {
      quote:
        "I've hosted several business networking events through Evertwine. The platform makes organizing meetups seamless and stress-free.",
      author: "Jamal Washington",
      gradient: "from-purple-600 to-blue-500",
    },
  ]

  // Update active testimonial and scroll position indicators
  useEffect(() => {
    const handleScroll = () => {
      if (testimonialScrollRef.current) {
        const scrollContainer = testimonialScrollRef.current
        const scrollPosition = scrollContainer.scrollLeft
        const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth
        const cardWidth = scrollContainer.clientWidth
        const newActiveIndex = Math.round(scrollPosition / cardWidth)

        // Check if at start or end
        setIsAtStart(scrollPosition <= 10) // Small threshold for better UX
        setIsAtEnd(maxScroll - scrollPosition <= 10) // Small threshold for better UX

        // Only update if the active index has changed
        if (newActiveIndex !== activeTestimonial && newActiveIndex >= 0 && newActiveIndex < testimonials.length) {
          setActiveTestimonial(newActiveIndex)
        }
      }
    }

    const scrollContainer = testimonialScrollRef.current
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll)

      // Initial check
      handleScroll()

      return () => scrollContainer.removeEventListener("scroll", handleScroll)
    }
  }, [activeTestimonial, testimonials.length])

  const scrollTestimonials = (direction: "left" | "right") => {
    if (testimonialScrollRef.current) {
      const cardWidth = testimonialScrollRef.current.clientWidth
      const scrollAmount = direction === "left" ? -cardWidth : cardWidth
      testimonialScrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  // Smooth scroll to a specific position
  const smoothScrollTo = (position: number) => {
    if (testimonialScrollRef.current) {
      testimonialScrollRef.current.scrollTo({
        left: position,
        behavior: "smooth",
      })
    }
  }

  // Calculate momentum and snap to nearest card
  const calculateMomentumScroll = () => {
    if (!testimonialScrollRef.current) return

    const positions = dragPositionsRef.current
    if (positions.length < 2) return

    // Calculate velocity based on the last few drag events
    const recentPositions = positions.slice(-5)
    if (recentPositions.length < 2) return

    const firstPos = recentPositions[0]
    const lastPos = recentPositions[recentPositions.length - 1]
    const timeDiff = lastPos.time - firstPos.time

    if (timeDiff === 0) return

    // Calculate velocity (pixels per millisecond)
    const velocity = (lastPos.position - firstPos.position) / timeDiff

    // Apply momentum
    const momentum = velocity * 300 // Adjust this multiplier to control momentum strength

    const currentScroll = testimonialScrollRef.current.scrollLeft
    const targetScroll = currentScroll - momentum

    // Snap to nearest card
    const cardWidth = testimonialScrollRef.current.clientWidth
    const nearestCardIndex = Math.round(targetScroll / cardWidth)
    const snappedScroll = nearestCardIndex * cardWidth

    // Smooth scroll to the snapped position
    smoothScrollTo(snappedScroll)
  }

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (testimonialScrollRef.current) {
      // Cancel any ongoing animation
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
        animationFrameRef.current = null
      }

      setIsDragging(true)
      setStartX(e.pageX - testimonialScrollRef.current.offsetLeft)
      setScrollLeft(testimonialScrollRef.current.scrollLeft)
      testimonialScrollRef.current.style.cursor = "grabbing"
      testimonialScrollRef.current.style.userSelect = "none"

      // Reset drag tracking
      dragPositionsRef.current = []
      lastDragTimeRef.current = Date.now()
      dragPositionsRef.current.push({
        time: lastDragTimeRef.current,
        position: e.pageX,
      })
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    e.preventDefault()

    if (testimonialScrollRef.current) {
      const x = e.pageX - testimonialScrollRef.current.offsetLeft
      const walk = (x - startX) * 1.5 // Scroll speed multiplier

      // Track drag position and time for momentum calculation
      const now = Date.now()
      dragPositionsRef.current.push({
        time: now,
        position: e.pageX,
      })

      // Keep only the last 10 positions for performance
      if (dragPositionsRef.current.length > 10) {
        dragPositionsRef.current.shift()
      }

      // Update scroll position directly during drag for responsiveness
      testimonialScrollRef.current.scrollLeft = scrollLeft - walk
      setDragDistance(walk)
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    if (testimonialScrollRef.current) {
      testimonialScrollRef.current.style.cursor = "grab"
      testimonialScrollRef.current.style.removeProperty("user-select")

      // Apply momentum scrolling when mouse is released
      calculateMomentumScroll()
    }
  }

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false)
      if (testimonialScrollRef.current) {
        testimonialScrollRef.current.style.cursor = "grab"
        testimonialScrollRef.current.style.removeProperty("user-select")

        // Apply momentum scrolling when mouse leaves
        calculateMomentumScroll()
      }
    }
  }

  // Touch event handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (testimonialScrollRef.current) {
      // Cancel any ongoing animation
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
        animationFrameRef.current = null
      }

      setIsDragging(true)
      setStartX(e.touches[0].pageX - testimonialScrollRef.current.offsetLeft)
      setScrollLeft(testimonialScrollRef.current.scrollLeft)

      // Reset drag tracking
      dragPositionsRef.current = []
      lastDragTimeRef.current = Date.now()
      dragPositionsRef.current.push({
        time: lastDragTimeRef.current,
        position: e.touches[0].pageX,
      })
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return

    if (testimonialScrollRef.current) {
      const x = e.touches[0].pageX - testimonialScrollRef.current.offsetLeft
      const walk = (x - startX) * 1.5 // Scroll speed multiplier

      // Track touch position and time for momentum calculation
      const now = Date.now()
      dragPositionsRef.current.push({
        time: now,
        position: e.touches[0].pageX,
      })

      // Keep only the last 10 positions for performance
      if (dragPositionsRef.current.length > 10) {
        dragPositionsRef.current.shift()
      }

      testimonialScrollRef.current.scrollLeft = scrollLeft - walk
    }
  }

  const handleTouchEnd = () => {
    setIsDragging(false)

    // Apply momentum scrolling when touch ends
    calculateMomentumScroll()
  }

  return (
    <section className="min-h-screen bg-black flex items-center relative">
      <div
        className={`container mx-auto px-4 py-20 transition-all duration-1000 ${
          isTestimonialsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="text-center mb-16">
          <h2
            className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-4 transition-all duration-700 transform ${
              isTestimonialsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            Their{" "}
            <span
              className={`text-blue-500 inline-block transition-all duration-1000 delay-300 transform ${
                isTestimonialsVisible ? "opacity-100 translate-y-0 rotate-0" : "opacity-0 -translate-y-4 -rotate-6"
              }`}
            >
              words
            </span>{" "}
            speak for us.
          </h2>
        </div>

        <div className="relative">
          {/* Navigation Buttons - conditionally shown based on scroll position */}
          {!isAtStart && (
            <button
              onClick={() => scrollTestimonials("left")}
              className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/80 p-3 rounded-full text-white hidden lg:flex items-center justify-center transition-all duration-500 ${
                isTestimonialsVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
              }`}
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          )}

          {!isAtEnd && (
            <button
              onClick={() => scrollTestimonials("right")}
              className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/80 p-3 rounded-full text-white hidden lg:flex items-center justify-center transition-all duration-500 ${
                isTestimonialsVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
              }`}
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          )}

          {/* Testimonials Carousel */}
          <div
            ref={testimonialScrollRef}
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-8 -mx-4 px-4 cursor-grab scroll-smooth"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                quote={testimonial.quote}
                author={testimonial.author}
                gradient={testimonial.gradient}
                isVisible={isTestimonialsVisible}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
