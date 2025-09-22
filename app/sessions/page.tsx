"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import SessionListCard from "../../components/SessionListCard"

interface Session {
  id: number
  title: string
  location: string
  startTime: string
  endTime: string
  instructor: string
  description: string
}

interface SessionData {
  email: string
  date: string
  database: string
  sessions: Session[]
  totalCount: number
}

export default function SessionsPage() {
  const router = useRouter()
  const [sessionData, setSessionData] = useState<SessionData | null>(null)

  useEffect(() => {
    const data = sessionStorage.getItem("sessionData")
    if (data) {
      setSessionData(JSON.parse(data))
    } else {
      router.push("/check-in")
    }
  }, [router])

  if (!sessionData) {
    return <div>Loading...</div>
  }

  return (
    <div className="page">
      <div className="timestamp">{new Date().toLocaleString()}</div>

      <div className="center-container">
        <h1>Welcome to Region 4</h1>
        <p>
          <strong>Sessions found for {sessionData.email}</strong>
        </p>
        <Link href="/check-in" className="find-sessions-button">
          Search Again
        </Link>
      </div>

      <div className="content">
        <div className="session-list">
          {sessionData.sessions.length > 0 ? (
            sessionData.sessions.map((session) => (
              <SessionListCard key={session.id} email={sessionData.email} session={session} />
            ))
          ) : (
            <div className="no-sessions">
              <h2>No Sessions Found</h2>
              <p>No sessions were found for {sessionData.email} today.</p>
              <Link href="/check-in" className="qr-button">
                Try Another Email
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
