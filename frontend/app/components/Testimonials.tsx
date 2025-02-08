import Image from "next/image"

const testimonials = [
  {
    quote: "CVision helped me tailor my resume perfectly for each application. I landed my dream job within weeks!",
    author: "Sarah Johnson",
    role: "Software Engineer",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    quote: "The project suggestions feature is a game-changer. It helped me build a portfolio that truly stands out.",
    author: "Michael Chen",
    role: "UX Designer",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    quote: "As a career coach, I recommend CVision to all my clients. It's an invaluable tool for job seekers.",
    author: "Emily Rodriguez",
    role: "Career Coach",
    avatar: "/placeholder.svg?height=80&width=80",
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-md">
              <p className="text-gray-600 mb-4">"{testimonial.quote}"</p>
              <div className="flex items-center">
                <Image
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.author}
                  width={40}
                  height={40}
                  className="rounded-full mr-4"
                />
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

