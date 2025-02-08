import { Button } from "@/components/ui/button"

export default function CTA() {
  return (
    <section className="py-20 px-6 bg-blue-600">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4 text-white">Ready to Supercharge Your Job Search?</h2>
        <p className="text-xl mb-8 text-gray-100">
          Start optimizing your CV with AI-powered insights and land your dream job faster.
        </p>
        <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
          Start Your Free Trial
        </Button>
      </div>
    </section>
  )
}

