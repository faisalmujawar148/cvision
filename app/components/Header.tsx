import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="w-full py-4 px-6 bg-gray-800">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-white-400">
          CVision
        </Link>
        <nav className="hidden md:flex space-x-6">
          <Link href="#features" className="text-gray-300 hover:text-blue-400">
            Features
          </Link>
          <Link href="#testimonials" className="text-gray-300 hover:text-blue-400">
            Team
          </Link>
          <Link href="#pricing" className="text-gray-300 hover:text-blue-400">
            Pricing
          </Link>
        </nav>
        <Button variant="outline">Sign In</Button>
      </div>
    </header>
  )
}

