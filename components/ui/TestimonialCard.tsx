interface TestimonialCardProps {
  quote: string
  author: string
  gradient: string
  isVisible: boolean
  index: number
}

export default function TestimonialCard({ quote, author, gradient, isVisible, index }: TestimonialCardProps) {
  // Calculate a staggered delay based on the index
  const delay = index * 150

  return (
    <div
      className={`min-w-[300px] md:min-w-[350px] lg:min-w-[400px] px-4 snap-start transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
      }`}
      style={{ transitionDelay: isVisible ? `${delay}ms` : "0ms" }}
    >
      <div
        className={`bg-gradient-to-br ${gradient} rounded-3xl p-6 md:p-8 h-auto min-h-[200px] flex flex-col justify-between transition-all duration-500 transform ${
          isVisible ? "scale-100 shadow-lg" : "scale-95"
        }`}
        style={{ transitionDelay: isVisible ? `${delay + 100}ms` : "0ms" }}
      >
        <div className="mb-4 overflow-auto max-h-[160px] md:max-h-[180px] scrollbar-hide">
          <p
            className={`text-white text-base md:text-xl font-medium leading-relaxed transition-all duration-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: isVisible ? `${delay + 200}ms` : "0ms" }}
          >
            "{quote}"
          </p>
        </div>
        <div>
          <p
            className={`text-white font-medium text-sm md:text-base transition-all duration-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: isVisible ? `${delay + 300}ms` : "0ms" }}
          >
            {author}
          </p>
        </div>
      </div>
    </div>
  )
}
