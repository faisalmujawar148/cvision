import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <section className="py-20 px-6 bg-gray-800">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold text-white mb-6">Optimize Your CV with AI</h1>
        <p className="text-xl text-gray-300 mb-8">
          CVision uses advanced AI to analyze your CV and compare it with job descriptions, helping you identify missing
          skills and improve your chances of landing your dream job.
        </p>
        <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
          Start Free Trial
        </Button>
      </div>
    </section>
  )
}

