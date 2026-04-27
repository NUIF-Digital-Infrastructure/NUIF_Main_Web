import Link from "next/link"
import ComplianceBox, {Stock} from "@/components/ui/compliance";

const RESTRICTED_SECTORS = [
    "Advanced Materials",
    "Advanced Robotics",
    "Artificial Intelligence",
    "Civil Nuclear",
    "Communications",
    "Computing Hardware",
    "Critical Suppliers to Government",
    "Cryptographic Authentication",
    "Data Infrastructure",
    "Defence",
    "Energy",
    "Military and Dual-Use",
    "Quantum Technologies",
    "Satellite and Space Technologies",
    "Suppliers to the Emergency Services",
    "Synthetic Biology",
    "Transport",
]


const STOCKS: Record<string, Stock> = {
    AAPL: {
        name: "Apple Inc.",
        sector: "Technology",
        info: "Market Cap: $3.2T | Consumer Electronics",
        revenuePercent: 0
    },
    RTX: {name: "Raytheon Technologies", sector: "Defence", info: "Defense & Aerospace", revenuePercent: 95},
    BAC: {name: "Bank of America", sector: "Finance", info: "Banking Services", revenuePercent: 0},
    PM: {name: "Philip Morris", sector: "Consumer Staples", info: "Tobacco", revenuePercent: 0},
    MSFT: {name: "Microsoft", sector: "Defence", info: "Cloud + 8% defence exposure", revenuePercent: 8},
}

export default function StockComplianceTool() {
    return (
        <main className="bg-white py-16">
            <div className="container mx-auto max-w-xl px-6">
                <div>
                    <Link
                        href="/tools"
                        className="inline-flex items-center rounded-md border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-sm font-semibold text-indigo-600 transition hover:border-indigo-300 hover:bg-indigo-100 hover:text-indigo-700"
                    >
                        Back to Tools
                    </Link>
                </div>

                <ComplianceBox restrictedSectors={RESTRICTED_SECTORS} stocks={STOCKS}/>
            </div>
        </main>
    )
}
