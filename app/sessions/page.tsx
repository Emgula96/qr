"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import SessionListCard from "../../components/SessionListCard"

interface EventDate {
  event_date: string
  room?: {
    label: string
  }
}

interface Session {
  sessionId: string
  attendeeId: string
  title: string
  subtitle: string | null
  date: string
  startDate: string
  endDate: string
  location: string
  schedule: string
  campus: string
  eventTypeId: string
  confirmation: string
  fee: number
  onlineCategory: string | null
  onlineType: string | null
  creditType: string | null
  creditHour: string | null
  paymentStatus: string
}

interface SessionData {
  email: string
  firstName: string
  lastName: string
  sessions: Session[]
}

export default function SessionsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [sessionData, setSessionData] = useState<SessionData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const email = searchParams.get("email")
  const firstName = searchParams.get("firstName")
  const lastName = searchParams.get("lastName")

  useEffect(() => {
    async function fetchSessions() {
      if (!email || !firstName || !lastName) {
        router.push("/find-session")
        return
      }

      try {
        setIsLoading(true)
        // Prefer data set by the check-in page
        let storedSessions: any[] | null = null
        try {
          const raw = sessionStorage.getItem("sessionData")
          if (raw) {
            const parsed = JSON.parse(raw)
            storedSessions = Array.isArray(parsed)
              ? parsed
              : (parsed?.sessions ?? parsed?.data ?? null)
          }
        } catch {}

        if (storedSessions) {
          setSessionData({
            email,
            firstName,
            lastName,
            sessions: storedSessions as unknown as Session[],
          })
          return
        }

        // Otherwise, fetch using email query param
        const dbName = process.env.NEXT_PUBLIC_DB_NAME || "tx_esc_04"
        const response = await fetch(`/api/sessions?email=${encodeURIComponent(email)}&dbName=${encodeURIComponent(dbName)}`, {
          cache: "no-store",
        })

        if (!response.ok) {
          throw new Error(`API error ${response.status}`)
        }
        const json = await response.json()
        const sessions: any[] = Array.isArray(json) ? json : (json?.sessions ?? json?.data ?? [])

        setSessionData({
          email,
          firstName,
          lastName,
          sessions: (sessions || []) as unknown as Session[],
        })
      } catch (err) {
        setError("Failed to fetch sessions")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSessions()
  }, [email, firstName, lastName, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading sessions...</p>
        </div>
      </div>
    )
  }

  if (error || !sessionData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Sessions</h2>
          <p className="text-gray-600 mb-6">{error || "Unable to load session data"}</p>
          <Link
            href="/find-session"
            className="inline-block bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
          >
            Search Again
          </Link>
          <Link
            href="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
          >
            Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="absolute top-4 right-4 text-sm text-gray-600">{new Date().toLocaleString()}</div>

      <div className="container mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Region 4</h1>
          <p className="text-lg text-gray-700 mb-6">
            <strong>
              Sessions found for {sessionData.firstName} {sessionData.lastName}
            </strong>
          </p>
          <div className="space-x-4">
            <Link
              href="/find-session"
              className="inline-block bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
            >
              Search Again
            </Link>
            <Link
              href="/"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
            >
              Home
            </Link>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          {sessionData.sessions.length > 0 ? (
            <div className="grid gap-6">
              {sessionData.sessions.map((session) => (
                <SessionListCard key={session.sessionId} session={session} email={sessionData.email} />
              ))}
            </div>
          ) : (
            <div className="text-center bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">No Sessions Found</h2>
              <p className="text-gray-600 mb-6">
                No sessions were found for {sessionData.firstName} {sessionData.lastName} today.
              </p>
              <Link
                href="/find-session"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Try Another Search
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
