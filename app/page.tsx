"use client"

import Link from "next/link"

export default function HomePage() {
  return (
    <div className="page">
      <div className="timestamp">{new Date().toLocaleString()}</div>

      <div className="center-container">
        <h1>Welcome to Region 4</h1>
        <p>
          <strong>Touch the button below to begin check-in process.</strong>
        </p>

        <Link href="/check-in" className="start-checkin-button">
          Start Check-In
        </Link>
      </div>
    </div>
  )
}
