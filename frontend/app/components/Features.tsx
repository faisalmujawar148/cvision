import { FileSearch, FileText, ListChecks, BrainCircuit } from "lucide-react"

const features = [
  {
    icon: <FileSearch className="h-8 w-8 text-primary" />,
    title: "Job Description Analysis",
    description: "Our browser extension analyzes job descriptions to identify key requirements and skills.",
  },
  {
    icon: <FileText className="h-8 w-8 text-primary" />,
    title: "Resume Customization",
    description: "Automatically tailor your resume to match the specific requirements of each job application.",
  },
  {
    icon: <ListChecks className="h-8 w-8 text-primary" />,
    title: "Project Suggestions",
    description:
      "Get personalized project ideas based on the types of jobs you're applying for to enhance your portfolio.",
  },
  {
    icon: <BrainCircuit className="h-8 w-8 text-primary" />,
    title: "AI-Powered Insights",
    description: "Leverage advanced AI to gain insights into industry trends and optimize your job search strategy.",
  },
]

export default function Features() {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose CVision?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

