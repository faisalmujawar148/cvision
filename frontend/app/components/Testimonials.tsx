import Image from "next/image"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Software Engineer",
    content:
      "CVision helped me tailor my resume perfectly for my dream job. I got called for an interview within days!",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    name: "Michael Chen",
    role: "Data Scientist",
    content:
      "The project recommendations were spot-on. I built two suggested projects and landed a great job soon after.",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    name: "Emily Rodriguez",
    role: "UX Designer",
    content: "I love how easy it is to update my resume on the fly. CVision has been a game-changer in my job search.",
    avatar: "/placeholder.svg?height=80&width=80",
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-background">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-foreground">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-card border border-border p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <Image
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.name}
                  width={40}
                  height={40}
                  className="rounded-full mr-4"
                />
                <div>
                  <h3 className="font-semibold text-foreground">{testimonial.name}</h3>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-muted-foreground">{testimonial.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

