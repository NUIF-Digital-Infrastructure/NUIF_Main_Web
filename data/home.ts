import Background from "@/assets/background_1.jpg"

// Import alumni logos
import Algebris from "@/assets/alumni_destinations/algebris_investments.png"
import AngloChinese from "@/assets/alumni_destinations/anglo_chinese_bank.jpg"
import Barclays from "@/assets/alumni_destinations/Barclays.png"
import BlackRock from "@/assets/alumni_destinations/blackrock.png"
import BNY from "@/assets/alumni_destinations/BNY.jpg"
import Cambridge from "@/assets/alumni_destinations/cambridge.png"
import EDHEC from "@/assets/alumni_destinations/EDHEC.jpg"
import FTIConsulting from "@/assets/alumni_destinations/FTI_Consulting.png"
import LSE from "@/assets/alumni_destinations/LSE.jpg"
import MorganStanley from "@/assets/alumni_destinations/morgan_stanley.png"
import PWC from "@/assets/alumni_destinations/pwc.png"
import Safra from "@/assets/alumni_destinations/safra_national_bank.png"
import Santander from "@/assets/alumni_destinations/santander.png"
import Venero from "@/assets/alumni_destinations/venero.png"


import AneeshPhoto from "@/assets/people/AneeshAvari.jpg"
import MaxPhoto from "@/assets/people/MaxGreyBackground.png"

export const homePageContent = {
    hero: {
        image: Background,
        title: "Newcastle University Investment Fund",
        subtitle: "Developing future finance professionals through hands-on investment experience",
        applyLabel: "Apply Now",
        applyHref: "/apply"
    },
    introduction: {
        heading: "Shaping Tomorrow's Financial Leaders",
        body: "The Newcastle University student-led Investment Fund (NUIF) created in 2025, provides students with " +
            "real-world experience in equity research and long-term investing. Our analysts develop valuable " +
            "skills that prepare them for competitive roles in the financial services industry."
    },
    ctas: {
        learnMoreLabel: "Learn More",
        learnMoreHref: "/about",
        meetTeamLabel: "Meet Our Team",
        meetTeamHref: "/our-team"
    },
    messages: [
        {
            heading: "A Message From Our Fund Manager",
            body: "\"At NUIF, we focus on deep, independent research and sharing our thinking through writing. " +
                "It's a chance to develop real analytical skills, test our ideas rigorously, and communicate them " +
                "clearly. These are skills that go beyond any classroom.\"",
            author: {
                name: "Aneesh Avvari",
                title: "Fund Manager, NUIF",
                image: AneeshPhoto
            }
        },
        {
            heading: "A Message From Our Fund Manager",
            body: "\"Thorough independent research underpins everything we do, with environmental, social " +
                "and governance factors embedded in how we assess every market opportunity. This focus on rigorous " +
                "analysis and sustainable, long-term value creation gives our members a genuine understanding of " +
                "how investment decisions are made in practice.\"",
            author: {
                name: "Max Flanagan",
                title: "Fund Manager, NUIF",
                image: MaxPhoto
            }
        }
    ],
    alumni: {
        heading: "Alumni Destinations",
        description: "Our alumni have gone on to secure roles at world-leading institutions and firms:",
        logos: [
            { name: "Algebris Investments", src: Algebris},
            { name: "Anglo Chinese Bank", src: AngloChinese},
            { name: "Barclays", src: Barclays},
            { name: "BlackRock", src: BlackRock},
            { name: "Bank of New York", src: BNY},
            { name: "University of Cambridge", src: Cambridge},
            { name: "EDHEC", src: EDHEC},
            { name: "FTI Consulting", src: FTIConsulting},
            { name: "LSE", src: LSE},
            { name: "Morgan Stanley", src: MorganStanley},
            { name: "PWC", src: PWC},
            { name: "Safra National Bank", src: Safra},
            { name: "Santander", src: Santander},
            { name: "Venero Captial Advisors", src: Venero}
        ]
    }
}