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
import MaxFlanaganPhoto from "@/assets/people/MaxFlanagan.jpg"

type TeamMember = {
  id: string
  name: string
  title: string
  image: any
  link: string
}

type LinkedName = {
  name: string
  link: string
}

export const teamPageContent = {
  hero: {
    image: Background,
    title: "Our Team",
  },
  nav: {
    heading: "Our Team",
    leadership: "LEADERSHIP",
    current: "CURRENT MEMBERS",
    alumni: "ALUMNI",
  },
  headings: {
    leadership: "Leadership",
    executive: "Executive Committee",
    headAnalysts: "Head Analysts",
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
    leadershipTitle: "Leadership profiles are being updated.",
    leadershipBody: "Check back soon for more information about our team.",
    headAnalystsTitle: "Head Analyst profiles are being updated.",
    headAnalystsBody: "Check back soon for more information about our team.",
    foundersTitle: "Founder profiles are being updated.",
    exHeadAnalystsTitle: "Ex-Head Analyst profiles are being updated.",
  },
  alumniYear: "2025/26",
  members: {
    leadership: [
      {
        id: "oscar-peters",
        name: "Oscar Peters",
        title: "Founder & Fund Manager",
        image: OscarPetersPhoto,
        link: "https://www.linkedin.com/in/oscar-peters1/",
      },
      // {
      //   id: "fernando-mendoza",
      //   name: "Fernando Mendoza",
      //   title: "Founder & Fund Manager",
      //   image: FernandoMendozaPhoto,
      //   link: "https://www.linkedin.com/in/fernando-e-mendoza-a83001200/",
      // },
    ] as TeamMember[],
    headAnalysts: [
      // {
      //   id: "benjamin-moore",
      //   name: "Benjamin Moore",
      //   title: "Financials | Team Atlas",
      //   image: BenjaminMoorePhoto,
      //   link: "https://uk.linkedin.com/in/benjamin-moore-46215b263",
      // },
      // {
      //   id: "alexander-telpov",
      //   name: "Alexander Telpov",
      //   title: "Financials | Team Mizar",
      //   image: AlexanderTelpovPhoto,
      //   link: "https://www.linkedin.com/in/a56109232",
      // },
      {
        id: "george-chatterton",
        name: "George Chatterton",
        title: "Energy | Team Sirius",
        image: GeorgeChattertonPhoto,
        link: "https://www.linkedin.com/in/george-chatterton-784257262",
      },
      {
        id: "charles-crewe-read",
        name: "Charles Crewe-Read",
        title: "Energy | Team Canopus",
        image: CharlesCreweReadPhoto,
        link: "https://www.linkedin.com/in/charles-crewe-read-0174552a1",
      },
      // {
      //   id: "sam-bundy",
      //   name: "Sam Bundy",
      //   title: "Industrials | Team Rigel",
      //   image: SamBundyPhoto,
      //   link: "https://www.linkedin.com/in/samuel-bundy-023592292",
      // },
      {
        id: "deniz-erkovan",
        name: "Deniz Erkovan",
        title: "Technology | Team Polaris",
        image: DenizErkovanPhoto,
        link: "https://www.linkedin.com/in/d-erk",
      },
      {
        id: "max-flanagan",
        name: "Max Flanagan",
        title: " Technology | Team Bellatrix",
        image: MaxFlanaganPhoto,
        link: "https://www.linkedin.com/in/max-flanagan-085772376/",
      },
    ] as TeamMember[],
    alumniFounders: [
      {
        id: "fernando-mendoza-alumni",
        name: "Fernando Mendoza",
        title: "FUND MANAGER",
        image: FernandoMendozaPhoto,
        link: "https://www.linkedin.com/in/fernando-e-mendoza-a83001200/",
      },
    ] as TeamMember[],
    exHeadAnalysts: [
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
      { name: "Adam Vigh-Vecsey", link: "https://www.linkedin.com/in/adam-vigh-vecsey-b6ab74295/" },
      { name: "Amaan Mughal", link: "https://www.linkedin.com/in/amaan-m-7289b831b/" },
      { name: "Amy Morrish", link: "https://www.linkedin.com/in/amy-morrish-8b7b60327/" },
      { name: "Aneesh Avvari", link: "https://www.linkedin.com/in/aneesh-avvari-4aa5b0299/" },
      { name: "Charlie Stevens", link: "https://www.linkedin.com/in/charlie-stevens-321712272/" },
      { name: "Elliot Monk", link: "https://www.linkedin.com/in/elliot-monk-25a159263/" },
      { name: "Emy Chen", link: "https://www.linkedin.com/in/emy-chen/" },
      { name: "Ethan Wood", link: "https://www.linkedin.com/in/ethan-wood-370b63360/" },
      { name: "Finlay Ritchie", link: "https://www.linkedin.com/in/finlay-ritchie-178356235/" },
      { name: "Henri Allen", link: "https://www.linkedin.com/in/henri-allen-773a652b1/" },
      { name: "Isaac Rodrigues", link: "https://www.linkedin.com/in/isaac-rodrigues-733604245/" },
      { name: "Jack Stevens", link: "https://www.linkedin.com/in/jackantonystevens/" },
      { name: "Jaime Allen", link: "https://www.linkedin.com/in/jaime-allen-056782339/" },
      { name: "Jamie Setch", link: "https://www.linkedin.com/in/jamie-setch/" },
      { name: "Josh Schofield", link: "https://www.linkedin.com/in/joshschofieldbaf/" },
      { name: "Louis Hart", link: "https://www.linkedin.com/in/louis-hart-6b1714311/" },
      { name: "Mannik Bhambhu", link: "https://www.linkedin.com/in/mannik-bhambhu/" },
      { name: "Marcus Tsang", link: "https://www.linkedin.com/in/medic001/" },
      { name: "Max Flanagan", link: "https://www.linkedin.com/in/max-flanagan-085772376/" },
    ] as LinkedName[],
    digitalInfrastructure: [
      { name: "Samraat Jain (NUIF Admin)", link: "https://www.linkedin.com/in/samraat-jain/" },
      { name: "James Delin", link: "https://www.linkedin.com/in/james-delin-89b737394/" },
      { name: "Ryan Duong", link: "https://www.linkedin.com/in/ryan-duong-97b960328/" },
      { name: "Sarah Rafiepour", link: "https://www.linkedin.com/in/sarahr15/" },
      { name: "Shalom Ademuwagun", link: "https://www.linkedin.com/in/shalom-ademuwagun-a7318420a/" },
    ] as LinkedName[],
    riskOfficers: [
      { name: "Amir Tsoy", link: "https://www.linkedin.com/in/wiryhook/" },
      { name: "Andrii Vorobiov", link: "https://www.linkedin.com/in/andrii-vorobiov-b3820b19a/" },
      { name: "Callum McGrath", link: "https://www.linkedin.com/in/callum-mcgrath-b62839316/" },
      { name: "Hrik Datta", link: "https://www.linkedin.com/in/hrik-datta/" },
      { name: "J.P. Dunphy", link: "https://www.linkedin.com/in/james-patrick-dunphy-b86246326/" },
      { name: "Marcus Tejero Mehmi", link: "https://www.linkedin.com/in/marcus-tm-466398304/" },
      { name: "Rhys Jones", link: "https://www.linkedin.com/in/rhys-jones-0400aa235/" },
      { name: "Theodore Kolawole", link: "https://www.linkedin.com/in/theodore-k-416036235/" },
      { name: "Abdulrahman Adetunbi", link: "https://www.linkedin.com/in/abdulrahman-adetunbi-05728827b/" },
    ] as LinkedName[],
    complianceOfficers: [
      { name: "Aishath Janna Jameel", link: "https://www.linkedin.com/in/aishath-janna-jameel/" },
      { name: "Ben Hobbs", link: "https://www.linkedin.com/in/ben-hobbs-024858203/" },
    ] as LinkedName[],
    welfareOfficers: [
      { name: "Audrey Mumtaz Aqila Fuad", link: "https://www.linkedin.com/in/audrey-mumtaz-aqila-fuad-6b0453215/" },
    ] as LinkedName[],
  },
}
