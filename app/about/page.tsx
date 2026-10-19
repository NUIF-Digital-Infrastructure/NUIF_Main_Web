import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ParallaxHero from "@/components/parallax-hero"
import Image from "next/image"
import Link from "next/link"

//import data
import { aboutPageContent } from "@/data/about"

export default function About() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <ParallaxHero
          image={aboutPageContent.hero.image}
          title={aboutPageContent.hero.title}
      />

      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">{aboutPageContent.about.heading}</h2>

            <div className="prose prose-lg max-w-none text-center">
              <p>
                {aboutPageContent.about.body}
              </p>
            </div>
          </div>
        </div>
      </section>


      <div className="container mx-auto">
        <hr className="max-w-xs mx-auto border-t border-gray-900" />
      </div>

      <section className="py-20 px-6">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">{aboutPageContent.whatWeDo.heading}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto justify-items-center">
            {aboutPageContent.whatWeDo.items.map((item, index) => (
              <div key={index} className="relative group overflow-hidden rounded-lg h-96 w-80 transition-transform duration-500 hover:scale-105">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white p-6 transition-opacity duration-300">
                  <h3 className="text-2xl font-bold mb-4 transform transition-transform duration-500 group-hover:-translate-y-4">{item.title}</h3>
                  <div className="overflow-hidden max-h-0 opacity-0 transition-all duration-500 group-hover:max-h-64 group-hover:opacity-100">
                    <p className="text-center text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

        <div className="container mx-auto">
            <hr className="max-w-xs mx-auto border-t border-gray-900" />
        </div>

      <section className="py-48 px-6">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">{aboutPageContent.partnerships.heading}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto justify-items-center">
            {aboutPageContent.partnerships.items.map((partner, index) => (
              <Link
                key={index}
                href={partner.link}
                target="_blank"
                rel="noopener noreferrer"
                className="relative group rounded-lg h-64 w-64 transition-transform duration-500 hover:scale-105"
              >
                <div className="relative h-full w-full overflow-hidden rounded-lg z-10 bg-gradient-to-b from-white from-50% to-transparent to-50%">
                  <Image
                    src={partner.image}
                    alt={partner.name}
                    fill
                    className="object-contain p-4"
                  />
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 top-0 h-56 w-56 bg-black/70 text-white p-4 opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-32 z-[-1] rounded-b-[124px] flex items-center justify-center pt-20">
                  <p className="text-center w-full text-sm font-semibold px-4">{partner.name}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

        <div className="container mx-auto">
            <hr className="max-w-xs mx-auto border-t border-gray-900" />
        </div>

      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto text-center">
            <div className="flex flex-col gap-16">
              {aboutPageContent.testimonials.map((testimonial, index) => (
                <div key={index} className="w-full">
                  <div className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse text-left md:text-right' : 'md:flex-row text-left'} items-start gap-8 max-w-4xl mx-auto`}>
                    <div className="relative w-56 h-64 flex-shrink-0">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col justify-center py-4">
                      <blockquote className="text-gray-700 italic mb-6 text-lg">
                        "{testimonial.quote}"
                      </blockquote>
                      <div>
                        <Link 
                          href="https://www.linkedin.com/in/samuel-bundy-023592292" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="font-bold text-gray-900 text-xl hover:underline"
                        >
                          {testimonial.name}
                        </Link>
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                  {index < aboutPageContent.testimonials.length - 1 && (
                    <hr className="max-w-4xl mx-auto mt-16 border-t border-gray-900" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

        <div className="container mx-auto">
            <hr className="max-w-xs mx-auto border-t border-gray-900" />
        </div>

        <section className="py-20 px-6">
            <div className="container mx-auto">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">{aboutPageContent.esg.heading}</h2>

                    <div className="prose prose-lg max-w-none text-center">
                        <p>
                            {aboutPageContent.esg.body}
                        </p>
                    </div>
                </div>
            </div>
        </section>

      <Footer />
    </main>
  )
}
