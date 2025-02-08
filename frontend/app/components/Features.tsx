import { CheckCircle, Target, Zap, List } from "lucide-react"

const features = [
  {
    icon: <CheckCircle className="h-8 w-8 text-primary" />,
    title: "Smart Resume Analysis",
    description: "Our AI analyzes your resume and compares it to job descriptions, identifying areas for improvement.",
  },
  {
    icon: <Target className="h-8 w-8 text-primary" />,
    title: "Tailored Suggestions",
    description: "Get personalized recommendations to optimize your resume for specific job postings.",
  },
  {
    icon: <Zap className="h-8 w-8 text-primary" />,
    title: "Instant Updates",
    description: "Make real-time changes to your resume with our browser extension.",
  },
  {
    icon: <List className="h-8 w-8 text-primary" />,
    title: "Project Recommendations",
    description: "Receive suggestions for projects that will boost your portfolio based on your job applications.",
  },
]

export default function Features() {
  return (
    <section id="features" className="py-20 bg-background">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-card p-6 rounded-lg shadow-md">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

