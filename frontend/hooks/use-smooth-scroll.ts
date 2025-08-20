"use client"

import type React from "react"

import { useCallback } from "react"

export function useSmoothScroll() {
  const scrollToSection = useCallback((e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()

    const targetElement = document.getElementById(targetId)

    if (targetElement) {
      // Get the top position of the target element relative to the viewport
      const targetPosition = targetElement.getBoundingClientRect().top

      // Add the current scroll position to get the absolute position
      const offsetPosition = targetPosition + window.scrollY - 110 // Adjust for header height

      // Scroll to the target position with a smooth animation
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }, [])

  return { scrollToSection }
}
