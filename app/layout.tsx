import type React from "react"
import "./globals.css"
import { Inter, Sora, DM_Sans } from "next/font/google"
import Script from "next/script"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
})

export const metadata = {
  title: "Evertwine - Genuine. Local. Effortless.",
  description: "Meet people near you through real, in-person meetups. Find your community—safely and authentically.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <Script id="scroll-to-top" strategy="beforeInteractive">
          {`
            if (typeof window !== 'undefined') {
              window.history.scrollRestoration = 'manual';
              window.onload = function() {
                window.scrollTo(0, 0);
              }
            }
          `}
        </Script>
      </head>
      <body className={`${inter.variable} ${sora.variable} ${dmSans.variable} font-sans`}>{children}</body>
    </html>
  )
}
