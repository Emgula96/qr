"use client"

import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="absolute top-4 right-4 text-sm text-gray-600">{new Date().toLocaleString()}</div>

      <div className="flex-1 flex items-center justify-center">
        <div className="text-center space-y-8 max-w-md mx-auto px-6">
          <h1 className="text-4xl font-bold text-gray-900">Welcome to Region 4</h1>
          <p className="text-lg text-gray-700">
            <strong>Touch the button below to begin the session lookup process.</strong>
          </p>

          <Link
            href="/find-session"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg text-xl transition-colors duration-200"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  )
}
