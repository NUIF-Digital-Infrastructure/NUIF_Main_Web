import Link from "next/link"
import { Mail, Instagram, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold mb-2">Newcastle University Investment Fund</h2>
            <p className="text-gray-400">Developing future finance professionals</p>
          </div>

          <div className="flex space-x-6">
          <Link
              href="mailto:newcastleinvestmentfund@gmail.com"
              className="hover:text-gray-300 transition-colors"
            >
              <Mail size={24} />
            </Link>
            <Link
              href="https://www.instagram.com/newcastle_investment_fund?igsh=c3pocWVwZjk4a2cy"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300 transition-colors"
            >
              <Instagram size={24} />
            </Link>
            <Link
              href="https://www.linkedin.com/company/newcastle-university-investment-fund/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300 transition-colors"
            >
              <Linkedin size={24} />
            </Link>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-gray-400">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <p>&copy; {new Date().getFullYear()} Newcastle University Investment Fund. All rights reserved.</p>
            <Link
              href="/tools"
              className="font-medium text-white hover:text-gray-300 transition-colors"
            >
              Tools
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
