"use client"

import { useState } from "react"
import { useDeviceManager } from "../hooks/useDeviceManager"
import PrintStatus from "./PrintStatus"

interface Session {
  id: number
  title: string
  location: string
  startTime: string
  endTime: string
  instructor: string
  description: string
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
      <RC250,1530><SD1>${session.title} - ${session.id}
      <QRV7><RC300,1440><QR8,1,0,0>
      {userId~061${email}~044sessionId~061${session.id}}
      `
      const status = await printTicket(badgeContent)
      setPrintStatus(status)
      console.log("Print status:", status)
    } catch (error) {
      console.error("Error printing badge:", error)
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
            <span className="label">Location:</span>
            <span className="value">{session.location}</span>
          </div>

          <div className="info-item">
            <span className="label">Start Time:</span>
            <span className="value">{session.startTime}</span>
          </div>

          <div className="info-item">
            <span className="label">End Time:</span>
            <span className="value">{session.endTime}</span>
          </div>

          <div className="info-item">
            <span className="label">Instructor:</span>
            <span className="value">{session.instructor}</span>
          </div>

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
