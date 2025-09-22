"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import OnScreenKeyboard from "../../components/OnScreenKeyboard"

export default function CheckInPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setEmail(value)
  }

  const clearForm = () => {
    setEmail("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    setIsLoading(true)
    try {
      const dbName = process.env.NEXT_PUBLIC_DB_NAME || "tx_esc_04"
      const response = await fetch(`/api/sessions?email=${encodeURIComponent(email.trim())}&dbName=${encodeURIComponent(dbName)}`, {
        cache: "no-store",
      })

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
              <div className="relative">
                <input
                  id="email-field"
                  type="email"
                  placeholder="Enter E-mail"
                  value={email}
                  onChange={onChangeInput}
                  className="pr-12"
                  required
                />
                {email && (
                  <button
                    type="button"
                    onClick={clearForm}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xl font-bold bg-white px-1"
                    style={{ fontSize: '20px', lineHeight: '1' }}
                  >
                    ×
                  </button>
                )}
              </div>
              <small className="find-session-note">We'll never share your email with anyone else.</small>
            </div>

            <div className="find-session-submission">
              <div className="flex gap-4 items-start">
                <div>
                  <button type="submit" className="qr-button qr-button-left" disabled={isLoading || !email.trim()}>
                    {isLoading ? "Searching..." : "Find Sessions"}
                  </button>
                  <button
                    type="button"
                    onClick={clearForm}
                    className="qr-button ml-4"
                    style={{ backgroundColor: '#dc3545' }}
                  >
                    Clear Form
                  </button>
                </div>
                <p className="text-danger mt-3">
                  <em>* indicates a required field</em>
                </p>
              </div>
            </div>
          </form>

          <OnScreenKeyboard
            value={email}
            onChange={setEmail}
            onEnter={() => {
              const form = document.querySelector("form") as HTMLFormElement | null
              if (form) form.requestSubmit()
            }}
            mode="email"
          />
        </div>
      </div>
    </div>
  )
}
