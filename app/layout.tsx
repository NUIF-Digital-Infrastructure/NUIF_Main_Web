import type React from "react"
import type { Metadata } from "next/dist/lib/metadata/types/metadata-interface"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Newcastle University Investment Fund (NUIF)",
  description:
    "The Newcastle University student-led Investment Fund (NUIF) created in 2025, provides students with real-world experience in equity research and long-term investing. Our analysts develop valuable skills that prepare them for competitive roles in the financial services industry.",
  keywords: [
    "Newcastle",
    "Newcastle University",
    "Newcastle University Business School",
    "NUIF",
    "Investment Fund",
    "Newcastle University Investment Fund",
    "Student-Led",
    "Equity Research",
    "Equity Research",
    "Fund Manager",
    "Analyst",
    "Finance",
    "Apply",
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
