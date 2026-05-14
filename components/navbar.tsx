"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

import Logo from "@/assets/logo.png"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 px-6 py-4 bg-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-blue-900 font-bold text-xl">
          <div className="bg-white p-0.5 rounded">
            <img src={Logo.src} alt="NUIF" className="h-24 w-24" />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          <Link href="/" className="text-blue-900 hover:text-blue-700 transition-colors">
            HOME
          </Link>
          <Link href="/about" className="text-blue-900 hover:text-blue-700 transition-colors">
            ABOUT US
          </Link>
          <Link href="/our-team" className="text-blue-900 hover:text-blue-700 transition-colors">
            OUR TEAM
          </Link>
          <Link href="/research" className="text-blue-900 hover:text-blue-700 transition-colors">
            RESEARCH
          </Link>
          <Link href="/tools" className="text-blue-900 hover:text-blue-700 transition-colors">
            TOOLS
          </Link>
          <Link href="/apply" className="text-blue-900 hover:text-blue-700 transition-colors">
            APPLY
          </Link>
        </div>

        {/* Mobile Navigation Toggle */}
        <button className="md:hidden text-blue-900" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-32 left-0 right-0 bg-white">
          <div className="container mx-auto py-4 flex flex-col space-y-4 px-6">
            <Link
              href="/"
              className="text-blue-900 hover:text-blue-700 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              HOME
            </Link>
            <Link
              href="/about"
              className="text-blue-900 hover:text-blue-700 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              ABOUT US
            </Link>
            <Link
              href="/our-team"
              className="text-blue-900 hover:text-blue-700 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              OUR TEAM
            </Link>
            <Link
              href="/research"
              className="text-blue-900 hover:text-blue-700 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              RESEARCH
            </Link>
            <Link
              href="/tools"
              className="text-blue-900 hover:text-blue-700 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              TOOLS
            </Link>
            <Link
              href="/apply"
              className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              APPLY NOW
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
