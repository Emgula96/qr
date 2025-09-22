import type React from "react"
import type { Metadata } from "next"
import Script from "next/script"
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
        <Script src="/scripts/jquery-1.6.4.min.js" strategy="beforeInteractive" />
        <Script src="/scripts/jquery.signalR-2.0.3.min.js" strategy="beforeInteractive" />
        <Script src="/scripts/devmgr-wrapper-r2.min.js" strategy="beforeInteractive" />
        {children}
      </body>
    </html>
  )
}
