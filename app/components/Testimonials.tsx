const teamMembers = [
  {
    name: "Faisal Mujawar",
    role: "Co-founder & CEO",
    quote: "Our mission is to empower job seekers with AI-driven insights to land their dream jobs.",
  },
  {
    name: "Abdelaziz Brahmi",
    role: "Co-founder & CTO",
    quote: "We're leveraging cutting-edge AI technology to revolutionize the job application process.",
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 px-6 bg-gray-800">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">Meet Our Team</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-gray-700 p-6 rounded-lg">
              <p className="text-gray-300 mb-4">"{member.quote}"</p>
              <p className="font-semibold text-white">{member.name}</p>
              <p className="text-sm text-gray-400">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

