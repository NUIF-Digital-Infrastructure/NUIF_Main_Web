import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ParallaxHero from "@/components/parallax-hero"
import Background from "@/assets/background_6.jpg"

const tools = [
  {
    name: "Human Network Maintainer",
    description:
      "A Google Sheets add-on that keeps relationship-building top of mind with gentle reminder workflows.",
    href: "/tools/humannetworkmaintainer",
  },
  {
    name: "News Impact Calculator",
    description:
      "A research prompt module for news event impact on equities.",
    href: "/tools/newsimpactcalculator",
  },
   {
    name: "Stock Compliance Tool",
    description:
      "A 7 step tool that checks and assesses stocks in a restricted sector for growth, and verifies that it is below 10% of group revenue to qualify for investment",
    href: "/tools/stockcompliancetool",
  },
]

export default function ToolsPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <ParallaxHero
        image={Background}
        title="Digital Tools"
        subtitle="Developed by the Digital Infrastructure Team"
      />

      <section className="py-20 px-6 bg-gray-100">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {tools.map((tool) => (
                <Link
                  key={tool.name}
                  href={tool.href}
                  className="block rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-lg hover:bg-gray-50"
                >
                  <h3 className="text-xl font-bold text-blue-900 mb-2">
                    {tool.name}
                  </h3>
                  <p className="text-gray-600">
                    {tool.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
