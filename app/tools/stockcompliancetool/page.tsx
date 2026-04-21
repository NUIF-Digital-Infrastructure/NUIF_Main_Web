"use client"

import { useState } from "react"
import Link from "next/link"

const RESTRICTED_SECTORS = [
  "Advanced Materials",
  "Advanced Robotics",
  "Artificial Intelligence",
  "Civil Nuclear",
  "Communications",
  "Computing Hardware",
  "Critical Suppliers to Government",
  "Cryptographic Authentication",
  "Data Infrastructure",
  "Defence",
  "Energy",
  "Military and Dual-Use",
  "Quantum Technologies",
  "Satellite and Space Technologies",
  "Suppliers to the Emergency Services",
  "Synthetic Biology",
  "Transport",
]

// Mock data
const MOCK_STOCKS = [
  { name: "BAE Systems", sector: "Defence" },
  { name: "BP", sector: "Energy" },
  { name: "Google", sector: "Artificial Intelligence" },
  { name: "Tesco", sector: "Retail" },
  { name: "Unilever", sector: "Consumer Goods" },
]

export default function StockComplianceToolPage() {
  const [selectedStock, setSelectedStock] = useState("")
  const [result, setResult] = useState<string | null>(null)

  const handleCheck = () => {
    const stock = MOCK_STOCKS.find(
        (s) => s.name.toLowerCase() === selectedStock.toLowerCase()
    )

    if (!stock) {
      setResult("Stock not found in mock dataset.")
      return
    }

    const isRestricted = RESTRICTED_SECTORS.includes(stock.sector)

    if (isRestricted) {
      setResult(
          `${stock.name} is in a restricted sector (${stock.sector}). Proceed to Step 2.`
      )
    } else {
      setResult(
          `${stock.name} is NOT in a restricted sector. Decision: Invest`
      )
    }
  }

  return (
      <main className="bg-white py-16">
        <div className="container mx-auto max-w-4xl px-6">

          <Link
              href="/tools"
              className="inline-flex items-center rounded-md border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-sm font-semibold text-indigo-600 hover:bg-indigo-100"
          >
            Back to Tools
          </Link>

          <div className="mt-6">
            <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">
              Digital Infrastructure
            </p>
            <h1 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
              Stock Compliance Tool
            </h1>
          </div>

          <section className="mt-6 text-gray-700">
            <p>
              This tool evaluates whether a stock qualifies for investment using a
              7-step compliance decision flow.
            </p>
          </section>

          <section className="mt-10 rounded-lg border border-gray-200 bg-gray-50 p-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Step 1: Restricted Sector Check
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Enter a stock to determine if it belongs to a restricted sector.
            </p>

            <input
                type="text"
                placeholder="e.g. BP, Tesco"
                value={selectedStock}
                onChange={(e) => setSelectedStock(e.target.value)}
                className="mt-4 w-full rounded-md border border-gray-300 px-4 py-2"
            />

            <button
                onClick={handleCheck}
                className="mt-4 w-full rounded-md bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700"
            >
              Run Step 1 Check
            </button>

            {result && (
                <div className="mt-4 rounded-md bg-white p-4 border">
                  {result}
                </div>
            )}
          </section>

          <section className="mt-12 rounded-lg border border-gray-200 bg-gray-50 px-6 py-5">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-600">
              Developed for the Newcastle University Investment Fund:
            </h2>
          </section>

        </div>
      </main>
  )
}
