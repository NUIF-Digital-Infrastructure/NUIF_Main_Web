import Background from "@/assets/background_4.jpg"

import OscarPetersPhoto from "@/assets/people/OscarPeters.jpg"
import FernandoMendozaPhoto from "@/assets/people/FernandoMendoza.jpg"
import AlexanderTelpovPhoto from "@/assets/people/AlexanderTelpov.jpg"
import BenjaminMoorePhoto from "@/assets/people/BenjaminMoore.jpg"
import CharlesCreweReadPhoto from "@/assets/people/CharlesCrewe-Read.jpg"
import DenizErkovanPhoto from "@/assets/people/DenizErkovan.jpg"
import GeorgeChattertonPhoto from "@/assets/people/GeorgeChatterton.jpg"
import PhilipAndreewitchPhoto from "@/assets/people/PhilipAndréewitch.jpg"
import SamBundyPhoto from "@/assets/people/SamBundy.jpg"
import PlaceholderPhoto from "@/assets/people/Placeholder.jpg"

import AneeshAvariPhoto from "@/assets/people/AneeshAvari.jpg"
import MaxFlanaganPhoto from "@/assets/people/MaxFlanagan.jpg"
import AmaanMughalPhoto from "@/assets/people/AmaanMughal.jpg"
import AmyMorrishPhoto from "@/assets/people/AmyMorrish.jpg"
import AndriiVorobiovPhoto from "@/assets/people/AndriiVorobiov.jpg"
import AronSainiPhoto from "@/assets/people/AronSaini.jpg"
import JackStevensPhoto from "@/assets/people/JackStevens.jpg"
import JamesDelinPhoto from "@/assets/people/JamesDelin.jpg"
import FinlayRitchiePhoto from "@/assets/people/FinlayRitchie.jpg"
import HenriAllenPhoto from "@/assets/people/HenriAllen.jpg"
import AdamVighVecseyPhoto from "@/assets/people/AdamVighVecsey.jpg"
import HarrisonMinshallPhoto from "@/assets/people/HarrisonMinshall.jpg"

type TeamMember = {
  id: string
  name: string
  title: string
  image: any
  link: string
  year?: string
  testimonial?: {
    quote: string
    role: string
  }
}

type LinkedName = {
  name: string
  link: string
}

export const teamPageContent = {
  hero: {
    image: Background,
    title: "Our Team",
    subtitle: "Our team brings together analysts from a wide range of nationalities and academic backgrounds."
  },
  nav: {
    heading: "Our Team",
    leadership: "LEADERSHIP",
    current: "CURRENT MEMBERS",
    alumni: "ALUMNI",
  },
  headings: {
    leadership: "Leadership:",
    fundManagers: "Fund Managers",
    headAnalystsSection: "Head Analysts",
    headOfDigitalInfrastructure: "Head of Digital Infrastructure",
    current: "Current Members",
    analysts: "Analysts:",
    digitalInfrastructure: "Digital Infrastructure:",
    riskOfficers: "Risk Officers:",
    complianceOfficers: "Compliance Officers:",
    welfareOfficers: "Welfare Officer:",
    alumni: "Alumni",
    founders: "Founders",
    exHeadAnalysts: "Ex-Head Analysts",
  },
  fallbacks: {
    leadership: "Coming Soon",
    current: "Coming Soon",
    foundersTitle: "Coming soon",
    exHeadAnalystsTitle: "Coming soon",
  },
  alumniYear: "2025",
  featuredAlumni: "George Chatterton",
  members: {
    leadership: [
      {
        id: "aneesh-avari",
        name: "Aneesh Avari",
        title: "Fund Manager",
        image: AneeshAvariPhoto,
        link: "https://www.linkedin.com/in/aneesh-avvari-4aa5b0299/"
      },
      {
        id: "max-flanagan",
        name: "Max Flanagan",
        title: "Fund Manager",
        image: MaxFlanaganPhoto,
        link: "https://www.linkedin.com/in/max-flanagan-085772376/"
      }
    ] as TeamMember[],
    headAnalysts: [
      {
        id: "amaan-mughal",
        name: "Amaan Mughal",
        title: "Head Analyst",
        image: AmaanMughalPhoto,
        link: "https://www.linkedin.com/in/amaan-mughal-7289b831b/"
      },
      {
        id: "amy-morrish",
        name: "Amy Morrish",
        title: "Head Analyst",
        image: AmyMorrishPhoto,
        link: "https://www.linkedin.com/in/amy-morrish-8b7b60327/"
      },
      {
        id: "andrii-vorobiov",
        name: "Andrii Vorobiov",
        title: "Head Analyst",
        image: AndriiVorobiovPhoto,
        link: "https://www.linkedin.com/in/andriivorobiov/"
      },
      {
        id: "aron-saini",
        name: "Aron Saini",
        title: "Head Analyst",
        image: AronSainiPhoto,
        link: "https://www.linkedin.com/in/aronsaini/"
      },
      {
        id: "jack-stevens",
        name: "Jack Stevens",
        title: "Head Analyst",
        image: JackStevensPhoto,
        link: "https://www.linkedin.com/in/jackantonystevens/"
      },
      {
        id: "henri-allen",
        name: "Henri Allen",
        title: "Head Analyst",
        image: HenriAllenPhoto,
        link: ""
      },
      {
        id: "finlay-ritchie",
        name: "Finlay Ritchie",
        title: "Head Analyst",
        image: FinlayRitchiePhoto,
        link: "https://www.linkedin.com/in/finlay-ritchie-178356235/"
      },
      {
        id: "adam-vigh-vecsey",
        name: "Adam Vigh-Vecsey",
        title: "Head Analyst",
        image: AdamVighVecseyPhoto,
        link: "https://www.linkedin.com/in/adam-vigh-vecsey/"
      },
      {
        id: "harrison-minshall",
        name: "Harrison Minshall",
        title: "Head Analyst",
        image: HarrisonMinshallPhoto,
        link: "https://www.linkedin.com/in/harrisonminshall/"
      },
      {
        id: "elliot-monk",
        name: "Elliot Monk",
        title: "Head Analyst",
        image: PlaceholderPhoto,
        link: "https://www.linkedin.com/in/elliot-monk/"
      }
    ] as TeamMember[],
    headOfDigitalInfrastructure: [
      {
        id: "james-delin",
        name: "James Delin",
        title: "Head of Digital Infrastructure",
        image: JamesDelinPhoto,
        link: "https://www.linkedin.com/in/james-delin-89b737394/"
      }
    ] as TeamMember[],
    alumniFounders: [
      {
        id: "oscar-peters-alumni",
        name: "Oscar Peters",
        title: "Founder & Fund Manager",
        image: OscarPetersPhoto,
        link: "https://www.linkedin.com/in/oscar-peters1/",
        year: "2026",
      },
      {
        id: "fernando-mendoza-alumni",
        name: "Fernando Mendoza",
        title: "Founder & Fund Manager",
        image: FernandoMendozaPhoto,
        link: "https://www.linkedin.com/in/fernando-e-mendoza-a83001200/",
        year: "2026",
      },
    ] as TeamMember[],
    exHeadAnalysts: [
      {
        id: "george-chatterton-alumni",
        name: "George Chatterton",
        title: "Energy | Team Sirius",
        image: GeorgeChattertonPhoto,
        link: "https://www.linkedin.com/in/george-chatterton-784257262",
        year: "2026",
        testimonial: {
          quote: "NUIF let me lead a team researching and pitching investment ideas I was genuinely passionate " +
              "about. As Head Analyst, I was pushed by the autonomy to master valuation and overcome challenges " +
              "independently, while presenting sharpened my leadership skills. It proved far more practical than " +
              "lecture-based learning, and directly shaped how I now approach company research and presentations " +
              "in my M&A role.",
          role: "Head Analyst (2025-2026)"
        }
      },
      {
        id: "charles-crewe-read-alumni",
        name: "Charles Crewe-Read",
        title: "Energy | Team Canopus",
        image: CharlesCreweReadPhoto,
        link: "https://www.linkedin.com/in/charles-crewe-read-0174552a1",
        year: "2026",
      },
      {
        id: "deniz-erkovan-alumni",
        name: "Deniz Erkovan",
        title: "Technology | Team Polaris",
        image: DenizErkovanPhoto,
        link: "https://www.linkedin.com/in/d-erk",
        year: "2026",
      },
      {
        id: "benjamin-moore-alumni",
        name: "Benjamin Moore",
        title: "Financials | Team Atlas",
        image: BenjaminMoorePhoto,
        link: "https://uk.linkedin.com/in/benjamin-moore-46215b263",
      },
      {
        id: "alexander-telpov-alumni",
        name: "Alexander Telpov",
        title: "Financials | Team Mizar",
        image: AlexanderTelpovPhoto,
        link: "https://www.linkedin.com/in/a56109232",
      },
      {
        id: "sam-bundy-alumni",
        name: "Sam Bundy",
        title: "Industrials | Team Rigel",
        image: SamBundyPhoto,
        link: "https://www.linkedin.com/in/samuel-bundy-023592292",
      },
      {
        id: "philip-andreewitch-alumni",
        name: "Philip Andréewitch",
        title: " Consumer Staples | Team Vega",
        image: PhilipAndreewitchPhoto,
        link: "https://www.linkedin.com/in/philippandreewitch",
      },
    ] as TeamMember[],
    analysts: [
      { name: "Jack Kennerdell", link: "https://www.linkedin.com/in/jack-kennerdell-388590364/" },
      { name: "Ollie Paler", link: "https://www.linkedin.com/in/ollie-paler-5660903b7/" },
      { name: "Will Burrows", link: "https://www.linkedin.com/in/william-burrows-087707224/" },
      { name: "Seb Wainwright", link: "https://www.linkedin.com/in/seb-wainwright-708106331" },
      { name: "Alex Pattullo", link: "https://www.linkedin.com/in/alexpattullo/" },
      { name: "Guy Salisbury", link: "https://www.linkedin.com/in/guy-salisbury-0496962b9?utm_source=share_via&utm_content=profile&utm_medium=member_ios" },
      { name: "Lola Sultanova", link: "https://www.linkedin.com/in/lola-sultanova-91606b309/" },
      { name: "Freddie Whyle", link: "https://www.linkedin.com/in/freddie-whyle-01998b2b7" },
      { name: "Jack Dinning", link: "https://www.linkedin.com/in/jack-dinning-099971440" },
      { name: "James Hannigan", link: "https://www.linkedin.com/in/james-hannigan-13ba77394?utm_source=share_via&utm_content=profile&utm_medium=member_ios" },
      { name: "Jem Wilson", link: "https://www.linkedin.com/in/jem-wilson-900444266" },
      { name: "Matthew Slim", link: "https://www.linkedin.com/in/matthew-slim-b8b486304" },
      { name: "Ben King", link: "https://www.linkedin.com/in/ben-king-856b11444?trk=contact-info" },
      { name: "Abdulrahman Adetunbi", link: "https://www.linkedin.com/in/abdulrahmanadetunbi/" },
      { name: "Samaira Rahman", link: "https://www.linkedin.com/in/samaira-rahman-5a5a73269/" },
      { name: "Jack Steadman", link: "https://www.linkedin.com/in/jack-steadman8/" },
      { name: "Charlie Hudson", link: "https://www.linkedin.com/in/charleshudson1?utm_source=share_via&utm_content=profile&utm_medium=member_ios" },
      { name: "Nadim Ouddane", link: "https://www.linkedin.com/in/nadimouddane/" },
      { name: "Sam Scarborough", link: "https://www.linkedin.com/in/sam-scarborough-875aab315?utm_source=share_via&utm_content=profile&utm_medium=member_ios" },
      { name: "Samuel Symes", link: "https://www.linkedin.com/in/samuel-r-symes?utm_source=share_via&utm_content=profile&utm_medium=member_ios" },
      { name: "Will Wiseman", link: "https://www.linkedin.com/in/will-wiseman-0977b2358?utm_source=share_via&utm_content=profile&utm_medium=member_ios" },
      { name: "Finn Hall", link: "https://www.linkedin.com/in/finn-hall-7138952b8?utm_source=share_via&utm_content=profile&utm_medium=member_ios" },
      { name: "Joshua Brahoua", link: "https://www.linkedin.com/in/jdbrahoua" },
      { name: "Mackenzie Deer", link: "https://www.linkedin.com/in/mackenziedeer?utm_source=share_via&utm_content=profile&utm_medium=member_ios" },
      { name: "Alexandros Petropoulos", link: "https://www.linkedin.com/in/alexandros-petropoulos-116358433/" },
      { name: "Alex Hamilton", link: "https://www.linkedin.com/in/alex-hamilton-8a9976311?utm_source=share_via&utm_content=profile&utm_medium=member_ios" },
      { name: "Joel-Perren-Pote", link: "https://www.linkedin.com/in/joel-perren-pote-09187a326?utm_source=share_via&utm_content=profile&utm_medium=member_ios" },
      { name: "Lewis Stevenson", link: "https://www.linkedin.com/in/lewis-stevenson-bbab5926b?utm_source=share_via&utm_content=profile&utm_medium=member_ios" },
      { name: "Max Young", link: "" },
      { name: "JP Dunphy", link: "https://www.linkedin.com/in/jamespatrickdunphy/?lipi=urn%3Ali%3Apage%3Ap_mwlite_feed%3BDwYQOrK4R96XslSUcyNseQ%3D%3D" },
      { name: "Pericles Pierides", link: "" },
      { name: "Thomas Whelman", link: "https://www.linkedin.com/in/thomas-wellham-867a65324" },
      { name: "Alexander Chauhan", link: "https://www.linkedin.com/in/alexander-chauhan?utm_source=share_via&utm_content=profile&utm_medium=member_ios" },
    ] as LinkedName[],
    digitalInfrastructure: [
      { name: "Shalom Ademuwagun", link: "https://www.linkedin.com/in/shalom-ademuwagun-a7318420a/" },
      { name: "Sarah Rafiepour", link: "https://www.linkedin.com/in/sarahr15/" },
      { name: "Myat Noe Angel", link: "https://www.linkedin.com/in/myatnoeangel/" },
      { name: "Cristiano Saldanha", link: "https://www.linkedin.com/in/cristiano-saldanha-b9757a261/" },
    ] as LinkedName[],
    riskOfficers: [
      { name: "Jack Kirkham", link: "https://www.linkedin.com/in/jack-kirkham-165388322/" },
      { name: "Olatomiwa Oladipupo", link: "https://www.linkedin.com/in/olatomiwa-oladipupo-6426b5335?utm_source=share_via&utm_content=profile&utm_medium=member_ios" },
      { name: "Dimas Sediyatomo", link: "https://www.linkedin.com/in/dimas-adytia-pramanajati-sediyatmono-ab9a38349/" },
      { name: "Ella Noble", link: "https://www.linkedin.com/in/ella-noble-070200448?utm_source=share_via&utm_content=profile&utm_medium=member_ios" },
      { name: "Oskaras Valiauga", link: "https://www.linkedin.com/in/oskaras-martynas-valiauga-049299449" },
      { name: "Louis Martin", link: "https://www.linkedin.com/in/louisjhmartin?utm_source=share_via&utm_content=profile&utm_medium=member_ios" },
    ] as LinkedName[],
    complianceOfficers: [
      { name: "Aishath Janna Jameel", link: "https://www.linkedin.com/in/aishath-janna-jameel/" },
    ] as LinkedName[],
    welfareOfficers: [] as LinkedName[],
  },
}
