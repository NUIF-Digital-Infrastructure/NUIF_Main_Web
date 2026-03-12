import Link from "next/link"

const tools = [
  {
    name: "Human Network Maintainer",
    description:
      "A Google Sheets add-on that keeps relationship-building top of mind with gentle reminder workflows.",
    href: "/tools/humannetworkmaintainer",
  },
]

export default function ToolsPage() {
  return (
    <main className="bg-white py-16">
      <div className="container mx-auto px-6 max-w-4xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">Digital Infrastructure</p>
        <h1 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl">
          Tools Developed by the Digital Infrastructure Team
        </h1>
        <p className="mt-3 text-lg text-gray-600">
          Explore the internal tools we build to support the Newcastle University Investment Fund community.
        </p>

        <ul className="mt-10 space-y-6 list-disc pl-6 text-lg text-gray-900">
          {tools.map((tool) => (
            <li key={tool.name} className="leading-relaxed">
              <Link href={tool.href} className="font-semibold text-indigo-600 hover:text-indigo-500">
                {tool.name}
              </Link>
              <p className="text-base font-normal text-gray-600">{tool.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
