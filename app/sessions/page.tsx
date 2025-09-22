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
        setError("Missing required information. Please search again.")
        setIsLoading(false)
        return
      }

      try {
        setIsLoading(true)
        setError(null)

        const storedData = sessionStorage.getItem("sessionData")
        if (storedData) {
          const parsedData = JSON.parse(storedData)
          setSessionData({
            email,
            firstName,
            lastName,
            sessions: parsedData.sessions || [],
          })
          setIsLoading(false)
          return
        }

        const dbName = process.env.NEXT_PUBLIC_DB_NAME || "tx_esc_04"
        const encodedEmail = encodeURIComponent(email)
        const response = await fetch(`https://dev.escworks.com/api/session/user/${encodedEmail}/today?dbName=${dbName}`)

        if (response.ok) {
          const data = await response.json()
          setSessionData({
            email,
            firstName,
            lastName,
            sessions: data.sessions || [],
          })
        } else if (response.status === 404) {
          setError(
            `No sessions found for ${firstName} ${lastName}. Please verify your information or contact registration.`,
          )
        } else {
          setError("Unable to load sessions. Please try searching again.")
        }
      } catch (err) {
        console.error("Error fetching sessions:", err)
        setError("Connection error. Please check your internet connection and try again.")
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

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex justify-center mb-4">
              <svg className="h-12 w-12 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Session Search Error</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <div className="space-y-3">
              <Link
                href="/find-session"
                className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Search Again
              </Link>
              <Link
                href="/"
                className="block w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Go Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!sessionData || !sessionData.sessions || sessionData.sessions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex justify-center mb-4">
              <svg className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No Sessions Found</h2>
            <p className="text-gray-600 mb-2">
              No sessions were found for{" "}
              <strong>
                {firstName} {lastName}
              </strong>{" "}
              today.
            </p>
            <p className="text-sm text-gray-500 mb-6">This could mean:</p>
            <ul className="text-sm text-gray-500 text-left mb-6 space-y-1">
              <li>• Your sessions are on a different date</li>
              <li>• There may be a spelling error in your name</li>
              <li>• Your registration may not be complete</li>
            </ul>
            <div className="space-y-3">
              <Link
                href="/find-session"
                className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Try Another Search
              </Link>
              <p className="text-xs text-gray-500">Need help? Contact Registration Services on the first floor.</p>
            </div>
          </div>
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
