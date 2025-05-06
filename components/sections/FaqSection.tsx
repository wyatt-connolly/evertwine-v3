"use client"

import { useState } from "react"
import { Plus, Minus } from "lucide-react"

interface FaqSectionProps {
  isFaqVisible: boolean
}

interface FaqItem {
  question: string
  answer: string
  isOpen: boolean
}

export default function FaqSection({ isFaqVisible }: FaqSectionProps) {
  const [faqs, setFaqs] = useState<FaqItem[]>([
    {
      question: "How does Evertwine verify users?",
      answer:
        "All users must complete both a selfie and government ID verification before they can interact on the app. This helps ensure genuine, trustworthy connections.",
      isOpen: false,
    },
    {
      question: "Is Evertwine a dating app?",
      answer:
        "No. Evertwine is designed for friendship and professional networking. It's a space to meet new people through real-world meetups, not online dating.",
      isOpen: false,
    },
    {
      question: "Can I use Evertwine in my city?",
      answer:
        "We're currently live in Southern California, Phoenix, and Miami—with more cities coming soon. You can check availability in-app.",
      isOpen: false,
    },
    {
      question: "How are meetups organized on the app?",
      answer:
        "You can join or host events based on interests, industries, and location. Browse meetups via map or list view, then RSVP in a tap.",
      isOpen: false,
    },
    {
      question: "Is there a cost to use Evertwine?",
      answer:
        "Evertwine offers a free tier, plus optional Lite and Premium subscriptions that unlock extra features and perks.",
      isOpen: false,
    },
  ])

  const toggleFaq = (index: number) => {
    setFaqs(
      faqs.map((faq, i) => {
        if (i === index) {
          return { ...faq, isOpen: !faq.isOpen }
        } else {
          // Close other FAQs with a slight delay for a cascade effect
          setTimeout(() => {
            if (faq.isOpen) {
              setFaqs((prev) => prev.map((item, j) => (j === i ? { ...item, isOpen: false } : item)))
            }
          }, 150)
          return faq
        }
      }),
    )
  }

  return (
    <section className="min-h-screen bg-black flex items-center relative">
      <div
        className={`container mx-auto px-6 md:px-4 py-20 max-w-5xl transition-all duration-1000 ${
          isFaqVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div
          className={`text-center mb-16 transition-all duration-700 ${isFaqVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div
            className={`w-16 h-16 bg-transparent border-2 border-white rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-700 transform ${
              isFaqVisible ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-50 rotate-45"
            }`}
          >
            <span className="text-white text-3xl font-bold">?</span>
          </div>
          <h2
            className={`text-4xl md:text-5xl lg:text-6xl font-bold text-white transition-all duration-700 delay-200 transform ${
              isFaqVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            FAQs
          </h2>
        </div>

        <div className="space-y-6 px-2 md:px-0">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`border-b border-gray-800 pb-6 transition-all duration-700 transform ${
                isFaqVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: isFaqVisible ? `${index * 150}ms` : "0ms" }}
            >
              <button
                className="w-full flex justify-between items-center text-left focus:outline-none group"
                onClick={() => toggleFaq(index)}
              >
                <h3
                  className={`text-xl md:text-2xl font-medium text-white pr-4 transition-all duration-300 ${
                    faq.isOpen ? "text-blue-400" : "text-white"
                  } group-hover:text-blue-300`}
                >
                  {faq.question}
                </h3>
                <div
                  className={`ml-4 bg-gray-800 rounded-full p-2 flex-shrink-0 transition-all duration-500 transform ${
                    faq.isOpen ? "bg-blue-600" : "bg-gray-800"
                  } group-hover:bg-blue-700`}
                >
                  {faq.isOpen ? (
                    <Minus
                      className={`h-6 w-6 text-white transition-all duration-300 transform ${
                        faq.isOpen ? "rotate-0" : "rotate-90 opacity-0"
                      }`}
                    />
                  ) : (
                    <Plus
                      className={`h-6 w-6 text-white transition-all duration-300 transform ${
                        !faq.isOpen ? "rotate-0" : "-rotate-90 opacity-0"
                      }`}
                    />
                  )}
                </div>
              </button>
              <div
                className={`mt-4 text-gray-400 overflow-hidden transition-all duration-500 ${
                  faq.isOpen ? "max-h-96 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-4"
                }`}
              >
                <p className="pb-4">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
