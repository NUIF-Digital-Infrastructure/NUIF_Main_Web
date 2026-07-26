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
        ctaLabel={(homePageContent.hero as any).applyLabel}
        ctaHref={(homePageContent.hero as any).applyHref}
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
                className="bg-white text-gray-900 border border-white px-8 py-3 rounded-md hover:bg-gray-100 transition-colors"
              >
                  {homePageContent.ctas.meetTeamLabel}
              </Link>
            </div>
          </div>
        </div>
      </section>


        <section className="py-24 px-6">
            <div className="container-fluid mx-auto px-4">
                <div className="max-w-[1600px] mx-auto">
                    <h2 className="text-3xl md:text-4xl text-center font-bold mb-8">A Message From Our Fund Managers</h2>
                    <hr className="border-t border-gray-900 mb-16 w-24 mx-auto" />
                    
                    <div className="flex flex-col md:flex-row md:items-stretch gap-12 md:gap-0">
                        <div className="flex-1 flex flex-col md:flex-row items-start gap-8 px-4 md:px-12 text-left">
                            <div className="w-64 h-80 relative flex-shrink-0">
                                <Image
                                    src={homePageContent.messages[0].author.image}
                                    alt={homePageContent.messages[0].author.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="flex flex-col h-full justify-between">
                                <blockquote className="text-lg md:text-xl font-medium text-gray-700 leading-relaxed mb-8 italic">
                                    {homePageContent.messages[0].body}
                                </blockquote>
                                <div>
                                    <Link 
                                        href="https://www.linkedin.com/in/aneesh-avvari-4aa5b0299/" 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="text-xl font-bold text-gray-900 hover:underline"
                                    >
                                        {homePageContent.messages[0].author.name}
                                    </Link>
                                    <p className="text-gray-600">{homePageContent.messages[0].author.title}</p>
                                </div>
                            </div>
                        </div>

                        <div className="hidden md:block w-px bg-gray-900 self-stretch" />
                        <hr className="md:hidden border-t border-gray-900 w-full" />

                        <div className="flex-1 flex flex-col md:flex-row items-start gap-8 px-4 md:px-12 text-left">
                            <div className="w-64 h-80 relative flex-shrink-0">
                                <Image
                                    src={homePageContent.messages[1].author.image}
                                    alt={homePageContent.messages[1].author.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="flex flex-col h-full justify-between">
                                <blockquote className="text-lg md:text-xl font-medium text-gray-700 leading-relaxed mb-8 italic">
                                    {homePageContent.messages[1].body}
                                </blockquote>
                                <div>
                                    <Link 
                                        href="https://www.linkedin.com/in/max-flanagan-085772376/" 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="text-xl font-bold text-gray-900 hover:underline"
                                    >
                                        {homePageContent.messages[1].author.name}
                                    </Link>
                                    <p className="text-gray-600">{homePageContent.messages[1].author.title}</p>
                                </div>
                            </div>
                        </div>
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

      <div className="container mx-auto">
        <hr className="max-w-xs mx-auto border-t border-gray-900" />
      </div>

      <section className="py-20 px-6">
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
