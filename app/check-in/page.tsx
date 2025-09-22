"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function CheckInPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setEmail(value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    setIsLoading(true)
    try {
      const dbName = process.env.NEXT_PUBLIC_DB_NAME || "tx_esc_04"
      const encodedEmail = encodeURIComponent(email.trim())
      const response = await fetch(`https://dev.escworks.com/api/session/user/${encodedEmail}/today?dbName=${dbName}`)

      if (response.ok) {
        const data = await response.json()
        // Store the data and navigate to results
        sessionStorage.setItem("sessionData", JSON.stringify(data))
        router.push("/sessions")
      } else {
        alert("No sessions found for this email address.")
      }
    } catch (error) {
      console.error("Error fetching sessions:", error)
      alert("Error connecting to server. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="page">
      <div className="timestamp">{new Date().toLocaleString()}</div>

      <div className="center-container">
        <h1>Welcome to Region 4</h1>
        <p>
          <strong>Enter your email address to find your sessions.</strong>
        </p>
        <Link href="/" className="find-sessions-button">
          Go Back
        </Link>
      </div>

      <div className="content">
        <div className="qr-inner-content-wrapper">
          <form onSubmit={handleSubmit}>
            <h2 className="qr-inner-content-heading">Search for Session</h2>

            <div className="find-session-form-group">
              <label htmlFor="email-field">E-mail Address *</label>
              <input
                id="email-field"
                type="email"
                placeholder="Enter E-mail"
                value={email}
                onChange={onChangeInput}
                required
              />
              <small className="find-session-note">We'll never share your email with anyone else.</small>
            </div>

            <div className="find-session-submission">
              <div>
                <button type="submit" className="qr-button qr-button-left" disabled={isLoading || !email.trim()}>
                  {isLoading ? "Searching..." : "Find Sessions"}
                </button>
                <p className="text-danger">
                  <em>* indicates a required field</em>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
