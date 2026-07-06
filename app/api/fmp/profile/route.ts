import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const symbol = searchParams.get("symbol")?.trim().toUpperCase()

    if (!symbol) {
      return NextResponse.json({ error: "Missing symbol parameter." }, { status: 400 })
    }

    const apiKey = process.env.FMP_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: "Server API key is not configured." }, { status: 500 })
    }

    const upstreamUrl = new URL("https://financialmodelingprep.com/stable/profile")
    upstreamUrl.searchParams.set("symbol", symbol)
    upstreamUrl.searchParams.set("apikey", apiKey)

    const upstreamRes = await fetch(upstreamUrl.toString(), {
      headers: {
        accept: "application/json",
      },
      cache: "no-store",
    })

    if (!upstreamRes.ok) {
      const message = await upstreamRes.text()
      return NextResponse.json(
        { error: "Upstream request failed.", details: message },
        { status: upstreamRes.status }
      )
    }

    const data = await upstreamRes.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("FMP profile proxy error:", error)
    return NextResponse.json({ error: "Failed to fetch FMP profile." }, { status: 500 })
  }
}
