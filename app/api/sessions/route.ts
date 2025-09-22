import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get("email")
    const dbNameParam = searchParams.get("dbName")

    if (!email) {
      return NextResponse.json({ message: "Missing email" }, { status: 400 })
    }

    const dbName = dbNameParam || process.env.NEXT_PUBLIC_DB_NAME || "tx_esc_04"
    const encodedEmail = encodeURIComponent(email)

    const upstreamUrl = `https://dev.escworks.com/api/session/user/${encodedEmail}/today?dbName=${encodeURIComponent(dbName)}`

    const res = await fetch(upstreamUrl, {
      // Do not cache - always fetch latest
      cache: "no-store",
      // If the upstream needs headers like API keys, add them here
      // headers: { ... }
    })

    if (!res.ok) {
      return NextResponse.json(
        { message: "Upstream error", status: res.status },
        { status: res.status },
      )
    }

    const data = await res.json()
    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    console.error("/api/sessions error:", error)
    return NextResponse.json({ message: "Server error" }, { status: 500 })
  }
}


