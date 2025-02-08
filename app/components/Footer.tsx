import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-12 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4 text-white">CVision</h3>
          <p className="text-gray-400">AI-powered CV analysis for your dream job.</p>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <Link href="#features" className="hover:text-blue-400">
                Features
              </Link>
            </li>
            <li>
              <Link href="#pricing" className="hover:text-blue-400">
                Pricing
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-blue-400">
                About Us
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-blue-400">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4 text-white">Legal</h4>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="hover:text-blue-400">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-blue-400">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4 text-white">Connect With Us</h4>
          <div className="flex space-x-4">
            <Link href="#" className="hover:text-blue-400">
              <Facebook className="h-6 w-6" />
            </Link>
            <Link href="#" className="hover:text-blue-400">
              <Twitter className="h-6 w-6" />
            </Link>
            <Link href="#" className="hover:text-blue-400">
              <Instagram className="h-6 w-6" />
            </Link>
            <Link href="#" className="hover:text-blue-400">
              <Linkedin className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-12 text-center text-gray-400">
        <p>&copy; 2023 CVision. All rights reserved.</p>
      </div>
    </footer>
  )
}

