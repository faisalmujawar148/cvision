import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function Hero() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Image */}
      <Image
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/174a255d-ee5d-477f-8415-f726c29ba894%20(1)-v4pnslntxy5GMnJMEMu3tXvhqmsrFy.png"
        alt="Abstract AI background"
        fill
        priority
        className="object-cover object-center"
        quality={100}
      />

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" />

      {/* Content */}
      <div className="relative container mx-auto text-center z-10">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">Optimize Your Resume with AI</h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto text-muted-foreground">
          CVision analyzes job descriptions and tailors your resume to match, increasing your chances of landing your
          dream job.
        </p>
        <Button size="lg" variant="default" className="bg-primary/90 hover:bg-primary">
          Start Optimizing Now
        </Button>
      </div>
    </section>
  )
}

