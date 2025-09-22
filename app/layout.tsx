import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Region 4 Kiosk Check-In",
  description: "Session lookup and badge printing kiosk",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans">
        {children}
        <script src="https://dev.escworks.com/js/LWDeviceManager.js" async />
      </body>
    </html>
  )
}
