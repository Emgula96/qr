"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Keyboard from "react-simple-keyboard"
import "react-simple-keyboard/build/css/index.css"

interface FormFieldProps {
  label: string
  htmlFor: string
  placeholder: string
  type: string
  note?: string
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onFocus: (id: string) => void
}

function FormField({ label, htmlFor, placeholder, type, note, value, onChange, onFocus }: FormFieldProps) {
  return (
    <div className="mb-6">
      <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700 mb-2">
        {label} *
      </label>
      <input
        id={htmlFor}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={() => onFocus(htmlFor)}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
        required
      />
      {note && <p className="text-sm text-gray-500 mt-1">{note}</p>}
    </div>
  )
}

export default function FindSessionPage() {
  const router = useRouter()
  const [currentInput, setCurrentInput] = useState("")
  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [layout, setLayout] = useState("default")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const keyboard = useRef<any>()

  const onChange = (input: string) => {
    if (currentInput === "email-field") {
      setEmail(input)
    } else if (currentInput === "fname-field") {
      setFirstName(input)
    } else if (currentInput === "lname-field") {
      setLastName(input)
    }
  }

  const handleShift = () => {
    const newLayoutName = layout === "default" ? "shift" : "default"
    setLayout(newLayoutName)
  }

  const onKeyPress = (button: string) => {
    if (button === "{shift}" || button === "{lock}") handleShift()
  }

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    keyboard.current?.setInput(event.target.value)

    if (currentInput === "email-field") {
      setEmail(event.target.value)
    } else if (currentInput === "fname-field") {
      setFirstName(event.target.value)
    } else if (currentInput === "lname-field") {
      setLastName(event.target.value)
    }
  }

  const onFocusInput = (id: string) => {
    setCurrentInput(id)

    if (id === "email-field") {
      keyboard.current?.setInput(email)
    } else if (id === "fname-field") {
      keyboard.current?.setInput(firstName)
    } else if (id === "lname-field") {
      keyboard.current?.setInput(lastName)
    }
  }

  const handleFindSessions = async () => {
    if (!email || !firstName || !lastName) {
      setError("Please fill in all required fields")
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const dbName = process.env.NEXT_PUBLIC_DB_NAME || "tx_esc_04"
      const encodedEmail = encodeURIComponent(email.trim())
      const response = await fetch(`https://dev.escworks.com/api/session/user/${encodedEmail}/today?dbName=${dbName}`)

      if (response.ok) {
        const data = await response.json()

        if (!data.sessions || data.sessions.length === 0) {
          setError(
            `No sessions found for ${firstName} ${lastName} today. Please check your information or contact registration.`,
          )
          return
        }

        sessionStorage.setItem("sessionData", JSON.stringify(data))
        router.push(
          `/sessions?email=${encodeURIComponent(email)}&firstName=${encodeURIComponent(firstName)}&lastName=${encodeURIComponent(lastName)}`,
        )
      } else if (response.status === 404) {
        setError(`User not found. Please check your name and email address, or contact registration for assistance.`)
      } else {
        setError("Unable to search for sessions. Please try again or contact support.")
      }
    } catch (error) {
      console.error("Error fetching sessions:", error)
      setError("Connection error. Please check your internet connection and try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="absolute top-4 right-4 text-sm text-gray-600">{new Date().toLocaleString()}</div>

      <div className="flex-1 flex items-center justify-center py-8">
        <div className="w-full max-w-2xl mx-auto px-6">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Region 4</h1>
            <p className="text-lg text-gray-700 mb-6">
              <strong>Print QR Code here or go to session room to check-in.</strong>
            </p>
            <Link
              href="/"
              className="inline-block bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
            >
              Go Back
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Search for Session</h2>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-800">{error}</p>
                  </div>
                </div>
              </div>
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleFindSessions()
              }}
            >
              <FormField
                label="E-mail Address"
                htmlFor="email-field"
                placeholder="Enter E-mail"
                type="email"
                note="We'll never share your email with anyone else."
                value={email}
                onChange={onChangeInput}
                onFocus={onFocusInput}
              />
              <FormField
                label="First Name"
                htmlFor="fname-field"
                placeholder="Enter First Name"
                type="text"
                value={firstName}
                onChange={onChangeInput}
                onFocus={onFocusInput}
              />
              <FormField
                label="Last Name"
                htmlFor="lname-field"
                placeholder="Enter Last Name"
                type="text"
                value={lastName}
                onChange={onChangeInput}
                onFocus={onFocusInput}
              />

              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  disabled={!email || !firstName || !lastName || isLoading}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-8 rounded-lg text-lg transition-colors duration-200"
                >
                  {isLoading ? "Searching..." : "Find Sessions"}
                </button>
                <p className="text-sm text-red-600">
                  <em>* indicates a required field</em>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <Keyboard
          keyboardRef={(r: any) => (keyboard.current = r)}
          layoutName={layout}
          onChange={onChange}
          onKeyPress={onKeyPress}
          theme="hg-theme-default"
        />
      </div>
    </div>
  )
}
