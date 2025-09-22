import { type NextRequest, NextResponse } from "next/server"

const BADGE_TEMPLATE = {
  backgroundColor: "#ffffff",
  textColor: "#000000",
  accentColor: "#0891b2",
  template: "standard",
}

// Print job queue - in production use Redis or database
const printQueue = new Map<string, any>()

function generatePrintJobId(): string {
  return "print_" + Math.random().toString(36).substring(2) + Date.now().toString(36)
}

function generateBadgeData(userData: any, sessionData: any) {
  return {
    // Standard badge format - keep simple for finicky printer
    name: userData.name,
    email: userData.email,
    company: userData.company || "N/A",
    title: userData.title || "Attendee",
    template: BADGE_TEMPLATE.template,
    colors: {
      background: BADGE_TEMPLATE.backgroundColor,
      text: BADGE_TEMPLATE.textColor,
      accent: BADGE_TEMPLATE.accentColor,
    },
    // Include session data from external API
    sessionInfo: sessionData,
    // Print settings - conservative settings for reliability
    printSettings: {
      quality: "standard", // Not high quality to avoid jams
      copies: 1,
      orientation: "portrait",
      paperSize: "badge_standard",
      margins: {
        top: 5,
        bottom: 5,
        left: 5,
        right: 5,
      },
    },
  }
}

// Simulate printer communication - replace with actual printer API
async function sendToPrinter(badgeData: any): Promise<{ success: boolean; jobId?: string; error?: string }> {
  try {
    // Simulate printer processing time
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const jobId = generatePrintJobId()

    console.log("[PRINTER] Sending badge to printer:", {
      jobId,
      name: badgeData.name,
      email: badgeData.email,
      company: badgeData.company,
      template: badgeData.template,
    })

    // Simulate potential printer issues (3% failure rate - reduced for reliability)
    if (Math.random() < 0.03) {
      throw new Error("Printer communication error")
    }

    return {
      success: true,
      jobId,
    }
  } catch (error) {
    console.error("[PRINTER] Print job failed:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown printer error",
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userData, sessionData } = body

    // Generate badge data from external API response
    const badgeData = generateBadgeData(userData, sessionData)

    // Create print job
    const printJobId = generatePrintJobId()
    const printJob = {
      id: printJobId,
      userData,
      sessionData,
      badgeData,
      status: "queued",
      createdAt: new Date().toISOString(),
      attempts: 0,
      maxAttempts: 3,
    }

    printQueue.set(printJobId, printJob)

    // Send to printer
    printJob.status = "printing"
    printJob.startedAt = new Date().toISOString()
    printJob.attempts += 1

    const printerResult = await sendToPrinter(badgeData)

    if (printerResult.success) {
      printJob.status = "completed"
      printJob.completedAt = new Date().toISOString()
      printJob.printerJobId = printerResult.jobId

      return NextResponse.json({
        success: true,
        printJobId,
        printerJobId: printerResult.jobId,
        status: "completed",
      })
    } else {
      printJob.status = "failed"
      printJob.error = printerResult.error
      printJob.failedAt = new Date().toISOString()

      return NextResponse.json(
        {
          success: false,
          error: printerResult.error,
          printJobId,
          canRetry: printJob.attempts < printJob.maxAttempts,
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Print API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const printJobId = searchParams.get("printJobId")
  const action = searchParams.get("action")

  if (action === "status" && printJobId) {
    const printJob = printQueue.get(printJobId)

    if (!printJob) {
      return NextResponse.json({ error: "Print job not found" }, { status: 404 })
    }

    return NextResponse.json({
      printJobId,
      status: printJob.status,
      attempts: printJob.attempts,
      maxAttempts: printJob.maxAttempts,
      error: printJob.error,
      canRetry: printJob.attempts < printJob.maxAttempts && printJob.status === "failed",
      createdAt: printJob.createdAt,
      completedAt: printJob.completedAt,
    })
  }

  if (action === "queue") {
    const queueStatus = Array.from(printQueue.values()).map((job) => ({
      id: job.id,
      status: job.status,
      userName: job.userData.name,
      createdAt: job.createdAt,
    }))

    return NextResponse.json({
      queue: queueStatus,
      totalJobs: queueStatus.length,
      activeJobs: queueStatus.filter((job) => job.status === "printing").length,
      failedJobs: queueStatus.filter((job) => job.status === "failed").length,
    })
  }

  return NextResponse.json({ error: "Invalid request" }, { status: 400 })
}
