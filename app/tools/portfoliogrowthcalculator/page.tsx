"use client"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ParallaxHero from "@/components/parallax-hero"
import Background from "@/assets/background_6.jpg"
import { GrowthCalculatorForm } from "./_components/GrowthCalculatorForm"

export default function PortfolioGrowthCalculatorPage() {
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

            <GrowthCalculatorForm />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}