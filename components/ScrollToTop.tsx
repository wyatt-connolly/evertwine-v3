"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export default function ScrollToTop() {
  const pathname = usePathname()

  useEffect(() => {
    // Force scroll to top
    window.scrollTo(0, 0)

    // For Safari and some mobile browsers
    document.body.scrollTop = 0

    // For Chrome, Firefox, IE, and Opera
    document.documentElement.scrollTop = 0
  }, [pathname])

  return null
}
