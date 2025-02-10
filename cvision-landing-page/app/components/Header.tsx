import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"

export default function Header() {
  return (
    <header className="py-4 px-6 bg-background shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2 text-2xl font-bold text-primary">
          <Eye className="w-8 h-8" />
          <span>CVision</span>
        </Link>
        <nav className="hidden md:flex space-x-6">
          <Link href="#features" className="text-muted-foreground hover:text-primary">
            Features
          </Link>
          <Link href="#testimonials" className="text-muted-foreground hover:text-primary">
            Testimonials
          </Link>
          <Link href="#pricing" className="text-muted-foreground hover:text-primary">
            Pricing
          </Link>
        </nav>
        <Button variant="outline">Get Started</Button>
      </div>
    </header>
  )
}

