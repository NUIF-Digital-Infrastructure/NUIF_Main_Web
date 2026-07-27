"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ParallaxHero from "@/components/parallax-hero"
import { teamPageContent } from "@/data/our-team"

export default function Members() {
  const [activeSection, setActiveSection] = useState<"leadership" | "current" | "alumni">("leadership")

  const {
    hero,
    nav,
    headings,
    fallbacks,
    alumniYear,
    featuredAlumni,
    members: {
      leadership,
      headAnalysts,
      alumniFounders,
      exHeadAnalysts,
      analysts,
      digitalInfrastructure,
      riskOfficers,
      complianceOfficers,
      welfareOfficers,
    },
  } = teamPageContent

  return (
    <main className="min-h-screen">
      <Navbar />

      <ParallaxHero 
        image={hero.image}
        title={hero.title}
        subtitle={hero.subtitle}
      />

      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-12">
            {/* Sidebar Navigation */}
            <div className="md:w-1/4">
              <h2 className="text-2xl font-bold mb-6">{nav.heading}</h2>
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveSection("leadership")}
                  className={`block w-full text-left py-2 px-4 rounded-md transition-colors ${
                    activeSection === "leadership" 
                      ? "bg-gray-900 text-white" 
                      : "text-gray-700 hover:bg-white"
                  }`}
                >
                  {nav.leadership}
                </button>
                <button
                  onClick={() => setActiveSection("current")}
                  className={`block w-full text-left py-2 px-4 rounded-md transition-colors ${
                    activeSection === "current" 
                      ? "bg-gray-900 text-white" 
                      : "text-gray-700 hover:bg-white"
                  }`}
                >
                  {nav.current}
                </button>
                <button
                  onClick={() => setActiveSection("alumni")}
                  className={`block w-full text-left py-2 px-4 rounded-md transition-colors ${
                    activeSection === "alumni" 
                      ? "bg-gray-900 text-white" 
                      : "text-gray-700 hover:bg-white"
                  }`}
                >
                  {nav.alumni}
                </button>
              </nav>
            </div>

            {/* Main Content */}
            <div className="md:w-3/4">
              {activeSection === "leadership" && (
                <div className="flex flex-col items-center justify-center min-h-[400px] text-center bg-white rounded-lg">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">{headings.leadership}</h2>
                  <p className="text-xl text-gray-500 max-w-md">
                    {fallbacks.leadership}
                  </p>
                </div>
              )}

              {activeSection === "current" && (
                <div className="flex flex-col items-center justify-center min-h-[400px] text-center bg-white rounded-lg">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">{headings.current}</h2>
                  <p className="text-xl text-gray-500 max-w-md">
                    {fallbacks.current}
                  </p>
                </div>
              )}

              {activeSection === "alumni" && (
                <>
                  <h2 className="text-3xl md:text-4xl font-bold mb-12 pb-4">{headings.alumni}</h2>
                  
                  {/* Testimonial Section at the top of Alumni */}
                  {exHeadAnalysts.find(m => m.name === featuredAlumni)?.testimonial && (
                    <div className="mb-16 bg-white p-8 rounded-lg">
                      {(() => {
                        const chatterton = exHeadAnalysts.find(m => m.name === featuredAlumni)!;
                        return (
                          <div className="flex flex-col md:flex-row items-center gap-8 max-w-4xl mx-auto">
                            <div className="relative w-48 h-56 flex-shrink-0">
                              <Image
                                src={chatterton.image}
                                alt={chatterton.name}
                                fill
                                className="object-cover rounded-md"
                              />
                            </div>
                            <div className="flex flex-col justify-center">
                              <blockquote className="text-gray-700 italic mb-6 text-lg leading-relaxed">
                                "{chatterton.testimonial?.quote}"
                              </blockquote>
                              <div>
                                <Link 
                                  href="https://www.linkedin.com/in/george-chatterton-784257262" 
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  className="font-bold text-gray-900 text-xl hover:underline"
                                >
                                  {chatterton.name}
                                </Link>
                                <p className="text-sm text-gray-500">{chatterton.testimonial?.role}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  )}

                  <h3 className="text-2xl font-bold mb-8">{headings.founders}</h3>
                  {alumniFounders.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {alumniFounders.map((member) => (
                        <Link
                          href={member.link}
                          key={member.id}
                          className="group block text-center"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <div className="mx-auto mb-4 relative w-48 h-48 overflow-hidden rounded-full grayscale hover:grayscale-0 transition-all duration-300">
                            <Image
                              src={member.image}
                              alt={member.name}
                              fill
                              sizes="(max-width: 768px) 100vw, 33vw"
                              style={{ objectFit: "cover" }}
                              className="transition-transform duration-300"
                            />
                          </div>
                          <h4 className="text-sm uppercase tracking-wider text-gray-500 mb-1">
                            {member.title}
                          </h4>
                          <h3 className="text-lg font-semibold text-blue-900">
                            {member.name}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">{member.year || alumniYear}</p>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-white rounded-lg">
                      <p className="text-lg text-gray-500">{fallbacks.foundersTitle}</p>
                    </div>
                  )}

                  <h3 className="text-2xl font-bold mt-12 mb-8">{headings.exHeadAnalysts}</h3>
                  {exHeadAnalysts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {exHeadAnalysts.map((member) => (
                        <Link
                          href={member.link}
                          key={member.id}
                          className="group block text-center"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <div className="mx-auto mb-4 relative w-48 h-48 overflow-hidden rounded-full grayscale hover:grayscale-0 transition-all duration-300">
                            <Image
                              src={member.image}
                              alt={member.name}
                              fill
                              sizes="(max-width: 768px) 100vw, 33vw"
                              style={{ objectFit: "cover" }}
                              className="transition-transform duration-300"
                            />
                          </div>
                          <h4 className="text-sm uppercase tracking-wider text-gray-500 mb-1">
                            {member.title}
                          </h4>
                          <h3 className="text-lg font-semibold text-blue-900">
                            {member.name}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">{member.year || alumniYear}</p>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-white rounded-lg">
                      <p className="text-lg text-gray-500">{fallbacks.exHeadAnalystsTitle}</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
