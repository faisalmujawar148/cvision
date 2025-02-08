import { ArrowRight } from "lucide-react"

const steps = [
  {
    title: "Install the Extension",
    description: "Add CVision to your browser to start analyzing job descriptions instantly.",
  },
  {
    title: "Upload Your Resume",
    description: "Let our AI analyze your current resume and identify areas for improvement.",
  },
  {
    title: "Browse Job Listings",
    description: "As you browse, CVision analyzes job descriptions and suggests resume optimizations.",
  },
  {
    title: "Optimize Your Application",
    description: "Apply with a tailored resume that matches the job requirements perfectly.",
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">How CVision Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
                {index + 1}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
              {index < steps.length - 1 && <ArrowRight className="h-6 w-6 text-primary mt-4 hidden lg:block" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

