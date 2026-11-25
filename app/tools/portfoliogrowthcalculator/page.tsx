"use client"

import * as React from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ParallaxHero from "@/components/parallax-hero"
import Background from "@/assets/background_6.jpg"
import { GrowthCalculatorForm, type CalculatorInputs } from "./_components/GrowthCalculatorForm"
import { ResultsSummary } from "./_components/ResultsSummary"
import { simulate, type PeriodResult } from "./calculator"

export default function PortfolioGrowthCalculatorPage() {
  const [results, setResults] = React.useState<PeriodResult[]>([])
  const [startValue, setStartValue] = React.useState(0)

  const handleCalculate = React.useCallback((inputs: CalculatorInputs) => {
    const periods = Array.from({ length: inputs.duration }, () => ({
      returnRate: inputs.returnRate,
      inflationRate: inputs.inflationRate,
      contribution: inputs.contribution,
    }))

    const simulationResults = simulate(inputs.startingValue, periods)
    setResults(simulationResults)
    setStartValue(inputs.startingValue)
  }, [])

  return (
    <main className="min-h-screen">
      <Navbar />

      <ParallaxHero
        image={Background}
        title="Portfolio Growth Calculator"
        subtitle="Investment Strategy Tools"
      />

      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <header className="mb-10 text-center">
              <p className="text-lg leading-relaxed text-gray-700">
                Visualize the growth of your portfolio over time, accounting for regular contributions, 
                expected returns, and inflation.
              </p>
            </header>

            <GrowthCalculatorForm onCalculate={handleCalculate} />
            
            <ResultsSummary results={results} startValue={startValue} />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}