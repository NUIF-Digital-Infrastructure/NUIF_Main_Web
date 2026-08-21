"use client"

import { useState, FormEvent, useEffect } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ParallaxHero from "@/components/parallax-hero"
import { applyPageContent } from "@/data/apply"

export default function Apply() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [applicationCount, setApplicationCount] = useState(0)
  const [selectedSectors, setSelectedSectors] = useState<string[]>([])
  const [selectedPosition, setSelectedPosition] = useState<string>("")

  // Check localStorage on component mount
  useEffect(() => {
    const count = localStorage.getItem("nuif_application_count")
    if (count) {
      setApplicationCount(parseInt(count))
    }
  }, [])

  const sectors = applyPageContent.form.sectors.options

  const handleSectorChange = (sector: string) => {
    if (selectedSectors.includes(sector)) {
      setSelectedSectors(selectedSectors.filter(s => s !== sector))
    } else {
      // Only allow selection if less than 3 sectors are selected
      if (selectedSectors.length < 3) {
        setSelectedSectors([...selectedSectors, sector])
      }
    }
  }

  const handlePositionChange = (position: string) => {
    setSelectedPosition(position)
    // Clear selected sectors when changing position
    setSelectedSectors([])
  }

  // Check if position requires sector selection
  const requiresSectorSelection = selectedPosition === "Head Analyst" || selectedPosition === "Analyst"

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setIsSubmitting(true)
    setError(null)

    const formData = new FormData(e.currentTarget)

    // Validate sectors only for Analyst and Head Analyst positions
    if (requiresSectorSelection && selectedSectors.length !== 3) {
      setError(applyPageContent.form.errors.sectors)
      setIsSubmitting(false)
      return
    }

    const studentId = formData.get("studentId") as string
    if (studentId.length !== 9) {
      setError(applyPageContent.form.errors.studentIdLength)
      setIsSubmitting(false)
      return
    }

    // Add application count to form data
    const newApplicationCount = applicationCount + 1
    formData.append("applicationCount", newApplicationCount.toString())

    // Add sectors to form data only for analyst positions
    if (requiresSectorSelection) {
      formData.append("sectors", JSON.stringify(selectedSectors))
    }

    try {
      const response = await fetch("/api/apply", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (response.ok) {
        // Capture the form reference immediately while 'e.currentTarget' is valid
        const form = e.currentTarget;

        // Update and store application count in localStorage
        const newCount = applicationCount + 1
        setApplicationCount(newCount)
        localStorage.setItem("nuif_application_count", newCount.toString())
        setSubmitted(true)
        
        // Reset form after 3 seconds
        setTimeout(() => {
          setSubmitted(false)
          setSelectedSectors([])
          setSelectedPosition("")
          // Reset form inputs using the captured reference
          if (form) {
            form.reset()
          }
        }, 3000)
      } else {
        setError(data.error || applyPageContent.form.errors.submitGeneric)
      }
    } catch (error) {
      setError(applyPageContent.form.errors.submitFailed)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
  }

  const handleCopy = (e: React.ClipboardEvent) => {
    e.preventDefault()
  }

  const handleCut = (e: React.ClipboardEvent) => {
    e.preventDefault()
  }

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault()
  }

  // Content to display if user has previously submitted an application
  const SuccessContent = () => (
    <div className="bg-green-50 border border-green-500 rounded-lg p-8 text-center">
      <h3 className="text-2xl font-bold text-green-800 mb-4">{applyPageContent.success.title}</h3>
      <p className="text-green-700 text-lg mb-4">
        {applyPageContent.success.body}
      </p>
      {applicationCount > 1 && (
        <p className="text-green-600 text-sm">
          {applyPageContent.success.countPrefix} {getOrdinalNumber(applicationCount)} application from this device.
        </p>
      )}
      <p className="text-green-600 text-sm mt-2">
        {applyPageContent.success.resetNote}
      </p>
    </div>
  )

  const getOrdinalNumber = (num: number) => {
    const ordinals = ["", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th"]
    return ordinals[num] || `${num}th`
  }

  return (
    <main className="min-h-screen">
      <Navbar />

      <ParallaxHero image={applyPageContent.hero.image} title={applyPageContent.hero.title} />

      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">{applyPageContent.introduction.heading}</h2>

            <div className="prose prose-lg max-w-none mb-10 text-center">
              <p>{applyPageContent.introduction.paragraphs[0]}</p>
              <p>{applyPageContent.introduction.paragraphs[1]}</p>
            </div>

            {submitted ? (
              <SuccessContent />
            ) : (
              <div className="bg-white p-8 rounded-lg shadow-md">
                {/* Rest of your form as before */}
                {error && (
                  <div className="mb-6 p-4 bg-red-100 border border-red-500 rounded text-red-700">
                    {error}
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div>
                    <h3 className="text-xl font-bold mb-4">{applyPageContent.form.personal.heading}</h3>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="fullName" className="block mb-1 font-medium">{applyPageContent.form.personal.fullName}</label>
                        <input
                          id="fullName"
                          name="fullName"
                          type="text"
                          required
                          className="w-full p-2 border border-gray-300 rounded"
                        />
                      </div>

                      <br />

                      <div>
                        <label htmlFor="email" className="block mb-1 font-medium">{applyPageContent.form.personal.email.label}</label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          pattern=".*@newcastle\.ac\.uk$"
                          className="w-full p-2 border border-gray-300 rounded"
                          placeholder={applyPageContent.form.personal.email.placeholder}
                        />
                        <p className="text-sm text-gray-500 mt-1">{applyPageContent.form.personal.email.help}</p>
                      </div>

                      <br />

                      <div>
                        <label htmlFor="studentId" className="block mb-1 font-medium">
                          {applyPageContent.form.personal.studentId}
                        </label>
                        <input
                          id="studentId"
                          name="studentId"
                          type="text"
                          required
                          className="w-full p-2 border border-gray-300 rounded"
                        />
                      </div>

                      <br />

                      <div>
                        <label className="block mb-1 font-medium">{applyPageContent.form.personal.academicYear.label}</label>
                        <select
                          name="academicYear"
                          required
                          className="w-full p-2 border border-gray-300 rounded"
                        >
                          <option value="">{applyPageContent.form.personal.academicYear.placeholder}</option>
                          {applyPageContent.form.personal.academicYear.options.map((option) => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <br />

                  {/* Position Information */}
                  <div>
                    <h3 className="text-xl font-bold mb-4">{applyPageContent.form.position.heading}</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block mb-1 font-medium">
                          {applyPageContent.form.position.label}
                          <span className="ml-1 text-sm font-normal text-gray-500">
                            
                            <a
                              href={applyPageContent.form.position.linkHref}
                              target="_blank"
                              rel="noreferrer"
                              className="ml-1 underline"
                            >
                              {applyPageContent.form.position.linkLabel}
                            </a>
                          </span>
                        </label>
                        <div className="space-y-2">
                          {applyPageContent.form.position.options.map((option, index) => {
                            const id = option.toLowerCase().replace(/[^a-z0-9]+/g, "-")

                            return (
                              <div key={option} className="flex items-center">
                                <input
                                  type="radio"
                                  id={id}
                                  name="position"
                                  value={option}
                                  required={index === 0}
                                  className="mr-2"
                                  onChange={(e) => handlePositionChange(e.target.value)}
                                />
                                <label htmlFor={id}>{option}</label>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  </div>

                  <br />

                  {/* Sector Preferences */}
                  {(selectedPosition === "" || requiresSectorSelection) && (
                    <div>
                      <h3 className="text-xl font-bold mb-4">{applyPageContent.form.sectors.heading}</h3>
                      <p className="mb-2">
                        {applyPageContent.form.sectors.description[0]}
                        <strong>{applyPageContent.form.sectors.description[1]}</strong>
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {sectors.map(sector => {
                          const isSectorDisabled = 
                            (!requiresSectorSelection && selectedPosition !== "") ||
                            (selectedPosition === "Head Analyst" && (sector === "Healthcare" || sector === "AI & Emerging Tech"));

                          return (
                            <div key={sector} className="flex items-center">
                              <input
                                type="checkbox"
                                id={sector}
                                checked={selectedSectors.includes(sector)}
                                onChange={() => handleSectorChange(sector)}
                                className="mr-2"
                                disabled={isSectorDisabled}
                              />
                              <label 
                                htmlFor={sector} 
                                className={isSectorDisabled ? "text-gray-400" : ""}
                              >
                                {sector}
                              </label>
                            </div>
                          );
                        })}
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        {applyPageContent.form.sectors.selectedLabel} {selectedSectors.length}/3
                      </p>
                    </div>
                  )}

                  {(selectedPosition === "" || requiresSectorSelection) && <br />}

                  {/* Motivation */}
                  <div>
                    <h3 className="text-xl font-bold mb-4">{applyPageContent.form.motivation.heading}</h3>
                    <div>
                      <label htmlFor="motivation" className="block mb-1 font-medium">
                        {applyPageContent.form.motivation.label}
                      </label>
                      <textarea
                        id="motivation"
                        name="motivation"
                        rows={6}
                        required
                        onPaste={handlePaste}
                        onCopy={handleCopy}
                        onCut={handleCut}
                        onContextMenu={handleContextMenu}
                        className="w-full p-2 border border-gray-300 rounded"
                      ></textarea>
                    </div>
                  </div>

                  <br />

                  {/* CV Upload */}
                  <div>
                    <h3 className="text-xl font-bold mb-4">{applyPageContent.form.upload.heading}</h3>
                    <div>
                      <label htmlFor="cv" className="block mb-1 font-medium">{applyPageContent.form.upload.label}</label>
                      <input
                        id="cv"
                        name="cv"
                        type="file"
                        required
                        accept=".pdf,.doc,.docx"
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        {applyPageContent.form.upload.help}
                      </p>
                    </div>
                  </div>

                  <br />

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full p-3 rounded font-medium text-white ${isSubmitting
                        ? "bg-gray-400"
                        : "bg-gray-900 hover:bg-gray-800 transition-colors"
                      }`}
                  >
                    {isSubmitting ? applyPageContent.form.submit.submitting : applyPageContent.form.submit.idle}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-gray-100">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">{applyPageContent.process.heading}</h2>

            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-8">
              {applyPageContent.process.steps.map((step) => (
                <div key={step.title} className="bg-white p-6 rounded-lg shadow-md">
                  <div className="text-xl font-bold mb-2 text-gray-900">{step.title}</div>
                  <p className="text-gray-700">{step.body}</p>
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
