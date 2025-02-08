import Link from "next/link"
import { Github, Linkedin, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-background text-foreground py-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-primary">CVision</h3>
            <p className="text-muted-foreground">Optimizing resumes with AI for better job matches.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-foreground">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#features" className="text-muted-foreground hover:text-primary">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="text-muted-foreground hover:text-primary">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-foreground">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-foreground">Connect With Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Github className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-muted-foreground">&copy; {new Date().getFullYear()} CVision. All rights reserved.</p>
          <p className="text-muted-foreground mt-4">
            Created by{" "}
            <a
              href="https://www.linkedin.com/in/faisal-mujawar/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Faisal Mujawar
            </a>{" "}
            and{" "}
            <a
              href="https://www.linkedin.com/in/abdelaziz-brahmi/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Abdelaziz Brahmi
            </a>
          </p>
          <div className="flex justify-center space-x-4 mt-2">
            <a
              href="https://github.com/faisalmujawar148"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">Faisal's GitHub</span>
            </a>
            <a
              href="https://github.com/Aerovity"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">Abdelaziz's GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

