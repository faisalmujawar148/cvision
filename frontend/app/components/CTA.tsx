import { Button } from "@/components/ui/button"

export default function CTA() {
  return (
    <section className="py-20 bg-primary text-white">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Supercharge Your Job Search?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Join thousands of successful job seekers who have optimized their resumes and landed their dream jobs with
          CVision.
        </p>
        <Button size="lg" variant="secondary">
          Start Your Free Trial
        </Button>
      </div>
    </section>
  )
}

