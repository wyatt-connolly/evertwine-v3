import type React from "react"
interface PhoneMockupProps {
  children: React.ReactNode
}

export default function PhoneMockup({ children }: PhoneMockupProps) {
  return (
    <div className="phone-mockup">
      <div className="phone-screen bg-black rounded-3xl overflow-hidden">{children}</div>
    </div>
  )
}
