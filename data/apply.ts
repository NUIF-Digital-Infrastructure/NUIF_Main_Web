// Import background image
import Background from "@/assets/background_5.jpg"

export const applyPageContent = {
  hero: {
    image: Background,
    title: "Apply to Join NUIF",
  },
  introduction: {
    heading: "Join Our Team",
    paragraphs: [
      "We're looking for passionate students who are interested in finance and investing to join our team. As a " +
      "member of NUIF, you'll gain hands-on experience in equity research, portfolio management, and financial " +
      "analysis.",
      "Whether you're studying finance, economics, business, or any other discipline, if you have a keen interest " +
      "in financial markets and are committed to learning, we'd love to hear from you.",
    ],
  },
  success: {
    title: "Application Submitted!",
    body:
      "Thank you very much for applying to the Newcastle University Student-Led Investment Fund. Our recruiters " +
        "will review your application and reach out soon.",
    countPrefix: "This is your",
    resetNote: "The form will reset automatically in a few seconds.",
  },
  form: {
    errors: {
      sectors: "Please select exactly 3 sectors",
      studentIdLength: "Student ID must be exactly 9 characters long",
      submitGeneric: "An error occurred while submitting your application",
      submitFailed: "Failed to submit application. Please try again later.",
    },
    personal: {
      heading: "Personal Information",
      fullName: "Full Name *",
      email: {
        label: "University Email *",
        placeholder: "example@newcastle.ac.uk",
        help: "Must be a Newcastle University email",
      },
      studentId: "University ID Number *",
      academicYear: {
        label: "What academic year will you be in for 2026/2027? *",
        placeholder: "Select your year",
        options: ["1st year", "2nd year", "3rd year", "4th year", "Masters", "PhD"],
      },
    },
    position: {
      heading: "Position Information",
      label: "What position will you be applying for? *",
      linkLabel: "View Available Position Descriptions",
      linkHref: "https://www.instagram.com/newcastle_investment_fund/#",
      options: [
        "Head Analyst",
        "Analyst",
        "Outreach Officer",
        "Risk Analyst",
        "Compliance Officer",
        "Digital Infrastructure Officer"
      ]
    },
    sectors: {
      heading: "Sector Preferences",
      description: [
            "Please select exactly 3 sectors you'd like to analyse ",
            "(Only for Analysts and Head Analysts):"
      ],
      selectedLabel: "Selected:",
      options: [
        "Energy",
        "Industrials",
        "Healthcare",
        "Renewables & Environmental",
        "Emerging Markets",
        "Financials",
        "Software & Cybersecurity",
        "Semiconductors & Infrastructure",
        "AI & Emerging Tech"
      ],
    },
    motivation: {
      heading: "Motivation",
      label: "Why do you want to be in this position and what could you contribute to NUIF? *",
    },
    upload: {
      heading: "CV Upload",
      label: "Upload your CV *",
      help: "Accepted formats: PDF, DOC, DOCX. Maximum size: 5MB.",
    },
    submit: {
      idle: "Submit Application",
      submitting: "Submitting...",
    },
  },
  process: {
    heading: "Application Process",
    steps: [
      {
        title: "1. Submit Application",
        body: "Complete our online application form and upload your CV",
      },
      {
        title: "2. Interview",
        body: "Selected candidates will be invited for an interview",
      },
      {
        title: "3. Bootcamp",
        body: "You will be taught equity-research and take an assessment",
      },
      {
        title: "4. Join the Team",
        body: "Successful candidates will be welcomed to the NUIF team",
      },
    ],
  },
}
