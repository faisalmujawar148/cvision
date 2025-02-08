import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <section className="py-20 bg-gradient-to-r from-primary to-primary-foreground text-white">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Land Your Dream Job with AI-Powered Resume Optimization</h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          CVision analyzes job descriptions and tailors your resume to increase your chances of getting hired. Start
          optimizing your career today!
        </p>
        <Button size="lg" variant="secondary">
          Start Your Free Trial
        </Button>
      </div>
    </section>
  )
}

