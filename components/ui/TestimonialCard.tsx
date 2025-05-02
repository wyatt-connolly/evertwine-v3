interface TestimonialCardProps {
  quote: string
  author: string
  gradient: string
  isVisible: boolean
  index: number
}

export default function TestimonialCard({ quote, author, gradient, isVisible, index }: TestimonialCardProps) {
  return (
    <div
      className={`min-w-[300px] md:min-w-[350px] lg:min-w-[400px] px-4 snap-start transition-all duration-500 ${
        isVisible ? `animate-testimonial-${index + 1}` : "opacity-0 translate-y-8"
      }`}
    >
      <div
        className={`bg-gradient-to-br ${gradient} rounded-3xl p-6 md:p-8 h-auto min-h-[200px] flex flex-col justify-between`}
      >
        <div className="mb-4 overflow-auto max-h-[160px] md:max-h-[180px] scrollbar-hide">
          <p className="text-white text-base md:text-xl font-medium leading-relaxed">"{quote}"</p>
        </div>
        <div>
          <p className="text-white/90 font-medium text-sm md:text-base">{author}</p>
        </div>
      </div>
    </div>
  )
}
