"use client"

import { useState } from "react"
import { useDeviceManager } from "../hooks/useDeviceManager"
import PrintStatus from "./PrintStatus"

interface Session {
  sessionId: string
  attendeeId: string
  title: string
  subtitle: string | null
  date: string
  startDate: string | null
  endDate: string | null
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
  paymentStatus: string | null
}

interface SessionListCardProps {
  email: string
  session: Session
}

const SessionListCard = ({ email, session }: SessionListCardProps) => {
  const { isConnected, printTicket } = useDeviceManager()
  const [printStatus, setPrintStatus] = useState<any>(null)

  const handlePrintBadge = async () => {
    try {
      const badgeContent = `
   <RC10,10><F2><SD1><RC60,10><F9><SD1><RC110,10><F3><SD1><RC160,10><F11><SD1><RC210,10><F10><SD1><RC260,10><F6><SD1><RC310,10><F12><SD1><RC410,10><RTF1,12><RR>
   <RC250,1670><F12><SD1>${email}
      <RC250,1580><F6><SD1>Room : ${session.location}
      <RC250,1530><SD1>${session.title} - ${session.sessionId}
      <QRV7><RC300,1440><QR8,1,0,0>
      {userId~061${email}~044sessionId~061${session.sessionId}~044attendeeId~061${session.attendeeId}}
      `
      const status = await printTicket(badgeContent)
      setPrintStatus(status)
      console.log("Print status:", status)
    } catch (error) {
      console.error("Error printing badge:", error)
    }
  }

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    } catch {
      return dateString
    }
  }

  return (
    <div className="session-info-card">
      {printStatus ? (
        <PrintStatus status={printStatus} onTryAgain={() => setPrintStatus(null)} />
      ) : (
        <>
          <h2>Session Information</h2>
          <p className="review-text">Review information below for accuracy.</p>

          <div className="info-item">
            <span className="label">Session Title:</span>
            <span className="value">{session.title}</span>
          </div>

          <div className="info-item">
            <span className="label">Session ID:</span>
            <span className="value">{session.sessionId}</span>
          </div>

          <div className="info-item">
            <span className="label">Attendee ID:</span>
            <span className="value">{session.attendeeId}</span>
          </div>

          <div className="info-item">
            <span className="label">Location:</span>
            <span className="value">{session.location}</span>
          </div>

          <div className="info-item">
            <span className="label">Campus:</span>
            <span className="value">{session.campus}</span>
          </div>

          <div className="info-item">
            <span className="label">Schedule:</span>
            <span className="value">{session.schedule}</span>
          </div>

          <div className="info-item">
            <span className="label">Date:</span>
            <span className="value">{formatDate(session.date)}</span>
          </div>

          {session.fee > 0 && (
            <div className="info-item">
              <span className="label">Fee:</span>
              <span className="value">${session.fee}</span>
            </div>
          )}

          <div className="info-item">
            <span className="label">E-mail:</span>
            <span className="value">{email}</span>
          </div>

          <div className="button-container">
            <button className="print-badge-button" onClick={handlePrintBadge} disabled={!isConnected}>
              {isConnected ? "Print Badge" : "Printer Not Connected"}
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default SessionListCard
