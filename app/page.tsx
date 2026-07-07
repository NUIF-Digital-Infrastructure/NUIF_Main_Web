import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ParallaxHero from "@/components/parallax-hero"
import Link from "next/link"
import Image from "next/image"

//import data
import {homePageContent} from "@/data/home";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <ParallaxHero
        image={homePageContent.hero.image}
        title={homePageContent.hero.title}
        subtitle={homePageContent.hero.subtitle}
      />

      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">{homePageContent.introduction.heading}</h2>
            <p className="text-lg md:text-xl mb-12 text-gray-700">{homePageContent.introduction.body}</p>
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <Link
                href={homePageContent.ctas.learnMoreHref}
                className="bg-gray-900 text-white px-8 py-3 rounded-md hover:bg-gray-800 transition-colors"
              >
                  {homePageContent.ctas.learnMoreLabel}
              </Link>
              <Link
                href={homePageContent.ctas.meetTeamHref}
                className="bg-white text-gray-900 border border-gray-300 px-8 py-3 rounded-md hover:bg-gray-100 transition-colors"
              >
                  {homePageContent.ctas.meetTeamLabel}
              </Link>
            </div>
          </div>
        </div>
      </section>
{/* 
      <section className="py-20 px-6 bg-gray-100">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl font-bold mb-6">Fund Performance</h2>
            <p className="text-3xl md:text-4xl font-bold mb-8">This will be updated on a monthly basis</p>
          </div>
        </div>
      </section> */}

      <section className="py-20 px-6 bg-gray-50">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">{homePageContent.alumni.heading}</h2>
            <p className="text-lg text-gray-700 mb-12">
              {homePageContent.alumni.description}
            </p>
            
            {/* Logo grid */}
            <div className="flex flex-wrap items-center justify-center gap-8">
              {homePageContent.alumni.logos.map((logo, index) => (
                <div key={index} className="relative w-32 h-16">
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    fill
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
