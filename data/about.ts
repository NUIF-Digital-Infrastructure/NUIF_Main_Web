import Background from "@/assets/background_2.jpg"
import EquityResearch from "@/assets/about/equity_research.jpeg"
import PitchReview from "@/assets/about/pitch_review.jpeg"
import SkillsDevelopment from "@/assets/about/skills_development.jpeg"
import SamBundy from "@/assets/people/SamBundy.jpeg"

export const aboutPageContent = {
  hero: {
    image: Background,
    title: "About Us",
  },
  about: {
    heading: "About Us",
    body:
      "NUIF is a pioneering initiative within Newcastle University Business School, offering students  " +
        "hands-on experience in financial markets. Managed entirely by students, the fund focuses on equity " +
        "research, ethical investing, and long-term portfolio growth. Bridging theory and practice, NUIF prepares " +
        "students for careers in finance while elevating Newcastle University’s reputation among top " +
        "UK universities."
  },
  esg: {
    heading: "ESG Commitment",
    body: "The Newcastle University Investment Fund is committed to responsible investing, in line with Newcastle " +
      "University's Socially Responsible Investment Policy and broader ESG commitments. In every stock pitch and " +
      "portfolio decision, members weigh environmental, social, and governance factors alongside financial " +
      "fundamentals, favouring companies with strong governance and credible, well-documented social and " +
      "environmental practices. This reflects the University's own approach, including only appointing " +
      "investment managers signed up to the UN Principles for Responsible Investment and requiring carbon " +
      "emissions reporting across portfolios, ensuring NUIF operates as a responsible fund that prepares its " +
      "members to invest with financial and ethical rigour."
  },
  whatWeDo: {
    heading: "What We Do",
    items: [
      {
        title: "Skill Development",
        image: SkillsDevelopment,
        description: "NUIF members build technical skills through structured training in financial modeling, " +
            "valuation, and industry analysis. This process covers the practical tools used in professional equity " +
            "research, preparing members for careers in investment banking, asset management, and equity research.",
      },
      {
        title: "Equity Research",
        image: EquityResearch,
        description: "Members produce sector coverage and company research using the same frameworks applied by " +
            "professional analysts. Research is grounded in primary sources, financial statements, and industry " +
            "data, drawing on tools like Bloomberg and Excel, with a focus on identifying mispriced opportunities " +
            "across global markets.",
      },
      {
        title: "Pitch Review",
        image: PitchReview,
        description: "Members present investment theses to the fund for formal evaluation. Each pitch is scrutinized " +
            "on thesis quality, valuation methodology, and risk assessment, mirroring the investment committee " +
            "process used at professional funds.",
      },
    ],
  },
  impact: {
    heading: "Testimonials",
  },
  testimonials: [
    {
      name: "Sam Bundy",
      role: "Head Analyst (2025-2026)",
      quote: "The investment fund gave me my first real-world exposure to the markets, understanding why share " +
          "prices move and testing predictions built on fundamental analysis. It tied together everything I'd " +
          "studied across accounting, finance, and economics, and made the CFA a lot clearer. More than anything, " +
          "it gave me the confidence to go for equity analyst and asset management roles.",
      image: SamBundy,
    },
  ],
}
