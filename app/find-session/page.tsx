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

  const handleFindSessions = () => {
    if (email && firstName && lastName) {
      router.push(
        `/sessions?email=${encodeURIComponent(email)}&firstName=${encodeURIComponent(firstName)}&lastName=${encodeURIComponent(lastName)}`,
      )
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
                  disabled={!email || !firstName || !lastName}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-8 rounded-lg text-lg transition-colors duration-200"
                >
                  Find Sessions
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
