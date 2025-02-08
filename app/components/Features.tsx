import { FileSearch, PuzzleIcon as PuzzlePiece, BookmarkPlusIcon as BrowserPlus, BarChart } from "lucide-react"

const features = [
  {
    icon: <FileSearch className="h-10 w-10 text-blue-400" />,
    title: "AI-Powered CV Analysis",
    description: "Our advanced AI analyzes your CV to identify strengths and areas for improvement.",
  },
  {
    icon: <PuzzlePiece className="h-10 w-10 text-blue-400" />,
    title: "Job Description Matching",
    description: "Compare your CV with job descriptions to see what skills you're missing.",
  },
  {
    icon: <BrowserPlus className="h-10 w-10 text-blue-400" />,
    title: "Browser Extension",
    description: "Save job descriptions from any website with our convenient browser extension.",
  },
  {
    icon: <BarChart className="h-10 w-10 text-blue-400" />,
    title: "Skill Gap Analysis",
    description: "Get detailed reports on your skill gaps and recommendations for improvement.",
  },
]

export default function Features() {
  return (
    <section id="features" className="py-20 px-6 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">Why Choose CVision?</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-800 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                {feature.icon}
                <h3 className="text-xl font-semibold ml-4 text-white">{feature.title}</h3>
              </div>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

