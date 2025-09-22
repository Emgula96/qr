"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Printer, CheckCircle, AlertCircle } from "lucide-react"

type CheckInStep = "welcome" | "search" | "loading" | "confirmation" | "printing" | "complete" | "error"

interface UserSession {
  name: string
  email: string
  company?: string
  title?: string
  sessionData?: any
}

export default function KioskCheckIn() {
  const [currentStep, setCurrentStep] = useState<CheckInStep>("welcome")
  const [userEmail, setUserEmail] = useState("")
  const [userData, setUserData] = useState<UserSession | null>(null)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleEmailSearch = async () => {
    if (!userEmail.trim()) return

    setIsLoading(true)
    setCurrentStep("loading")
    setError("")

    try {
      const dbName = process.env.NEXT_PUBLIC_DB_NAME || "tx_esc_04"
      const apiUrl = `https://dev.escworks.com/api/session/user/${encodeURIComponent(userEmail.trim())}/today?dbName=${dbName}`

      const response = await fetch(apiUrl)

      if (!response.ok) {
        throw new Error(`User not found or API error: ${response.status}`)
      }

      const sessionData = await response.json()

      setUserData({
        name: sessionData.name || sessionData.userName || "Unknown User",
        email: userEmail.trim(),
        company: sessionData.company || sessionData.organization,
        title: sessionData.title || sessionData.position,
        sessionData: sessionData,
      })

      setCurrentStep("confirmation")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to find user session")
      setCurrentStep("error")
    } finally {
      setIsLoading(false)
    }
  }

  const handlePrintBadge = async () => {
    if (!userData) return

    setCurrentStep("printing")

    try {
      const response = await fetch("/api/print", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userData: userData,
          sessionData: userData.sessionData,
        }),
      })

      const result = await response.json()

      if (result.success) {
        setCurrentStep("complete")
      } else {
        setError(`Printing failed: ${result.error}`)
        setCurrentStep("error")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to print badge")
      setCurrentStep("error")
    }
  }

  const resetKiosk = () => {
    setCurrentStep("welcome")
    setUserEmail("")
    setUserData(null)
    setError("")
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <div className="w-full max-w-4xl">
        {/* Welcome Screen */}
        {currentStep === "welcome" && (
          <Card className="text-center">
            <CardHeader className="pb-8">
              <CardTitle className="text-6xl font-bold text-primary mb-4">Event Check-In Kiosk</CardTitle>
              <p className="text-2xl text-muted-foreground">Enter your email to check in and print your badge</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <Button
                size="lg"
                className="h-32 text-2xl flex flex-col gap-4 w-full max-w-md mx-auto"
                onClick={() => setCurrentStep("search")}
              >
                <User size={48} />
                Start Check-In
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Search Screen */}
        {currentStep === "search" && (
          <Card>
            <CardHeader>
              <CardTitle className="text-4xl text-center">Enter Your Email</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-4 max-w-md mx-auto">
                <Label htmlFor="email" className="text-xl">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="h-16 text-xl"
                  disabled={isLoading}
                  onKeyPress={(e) => e.key === "Enter" && handleEmailSearch()}
                />
                <Button
                  size="lg"
                  className="w-full h-16 text-xl"
                  onClick={handleEmailSearch}
                  disabled={!userEmail || isLoading}
                >
                  {isLoading ? "Searching..." : "Find My Session"}
                </Button>
              </div>

              <div className="text-center">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep("welcome")}
                  className="text-lg h-12"
                  disabled={isLoading}
                >
                  Back to Welcome
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Loading Screen */}
        {currentStep === "loading" && (
          <Card className="text-center">
            <CardContent className="py-16">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-8"></div>
              <h2 className="text-4xl font-bold mb-4">Finding Your Session</h2>
              <p className="text-2xl text-muted-foreground">Please wait while we look up your information...</p>
            </CardContent>
          </Card>
        )}

        {/* Error Screen */}
        {currentStep === "error" && (
          <Card className="text-center">
            <CardContent className="py-16">
              <AlertCircle size={64} className="mx-auto mb-8 text-destructive" />
              <h2 className="text-4xl font-bold mb-4 text-destructive">Session Not Found</h2>
              <p className="text-2xl text-muted-foreground mb-8">{error}</p>
              <div className="flex gap-4 justify-center">
                <Button size="lg" className="h-16 text-xl px-12" onClick={() => setCurrentStep("search")}>
                  Try Different Email
                </Button>
                <Button variant="outline" size="lg" className="h-16 text-xl px-12 bg-transparent" onClick={resetKiosk}>
                  Start Over
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Confirmation Screen */}
        {currentStep === "confirmation" && userData && (
          <Card>
            <CardHeader>
              <CardTitle className="text-4xl text-center">Confirm Your Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="bg-card p-8 rounded-lg border-2 border-primary">
                <div className="grid grid-cols-1 gap-6 text-xl">
                  <div>
                    <strong>Name:</strong> {userData.name}
                  </div>
                  <div>
                    <strong>Email:</strong> {userData.email}
                  </div>
                  {userData.company && (
                    <div>
                      <strong>Company:</strong> {userData.company}
                    </div>
                  )}
                  {userData.title && (
                    <div>
                      <strong>Title:</strong> {userData.title}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-4 justify-center">
                <Button size="lg" className="h-16 text-xl px-12" onClick={handlePrintBadge}>
                  <Printer className="mr-2" size={24} />
                  Print My Badge
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="h-16 text-xl px-12 bg-transparent"
                  onClick={() => setCurrentStep("search")}
                >
                  Go Back
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Printing Screen */}
        {currentStep === "printing" && (
          <Card className="text-center">
            <CardContent className="py-16">
              <Printer size={64} className="mx-auto mb-8 text-primary animate-pulse" />
              <h2 className="text-4xl font-bold mb-4">Printing Your Badge</h2>
              <p className="text-2xl text-muted-foreground mb-8">Please wait, your badge is being printed...</p>
              <div className="w-full bg-muted rounded-full h-4 mb-4 max-w-md mx-auto">
                <div className="bg-primary h-4 rounded-full animate-pulse" style={{ width: "75%" }}></div>
              </div>
              <p className="text-lg text-muted-foreground">Please do not leave until printing is complete</p>
            </CardContent>
          </Card>
        )}

        {/* Complete Screen */}
        {currentStep === "complete" && (
          <Card className="text-center">
            <CardContent className="py-16">
              <CheckCircle size={64} className="mx-auto mb-8 text-green-500" />
              <h2 className="text-4xl font-bold mb-4 text-green-600">Badge Printed Successfully!</h2>
              <p className="text-2xl text-muted-foreground mb-8">
                Please collect your badge from the printer tray below.
              </p>

              <Button size="lg" className="h-16 text-xl px-12" onClick={resetKiosk}>
                Check In Another Person
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
