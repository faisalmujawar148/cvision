import { Button } from "@/components/ui/button"

export default function CallToAction() {
  return (
    <section className="py-20 bg-black text-white">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Supercharge Your Job Search?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Join CVision today and start optimizing your resume for your dream job.
        </p>
        <Button size="lg" variant="secondary">
          Sign Up Now
        </Button>
      </div>
    </section>
  )
}

