"use client"

import { useState, useEffect } from "react"

declare global {
  interface Window {
    LWDeviceManager: any
  }
}

export const useDeviceManager = () => {
  const [isConnected, setIsConnected] = useState(false)
  const [deviceInfo, setDeviceInfo] = useState<any>(null)

  useEffect(() => {
    // Initial connection
    initConnection()

    // Set up interval for reconnection attempts
    const intervalId = setInterval(() => {
      initConnection()
    }, 10000)

    // Cleanup on unmount
    return () => clearInterval(intervalId)
  }, [])

  const initConnection = () => {
    if (typeof window !== "undefined" && window.LWDeviceManager) {
      window.LWDeviceManager.init(
        () => {
          checkConnection(() => {
            console.log("Connected to the service!")
            setIsConnected(true)
            fetchDeviceInfo()
          })
        },
        (err: any) => {
          console.error(err)
          setIsConnected(false)
        },
      )
    }
  }

  const checkConnection = (readyCb: () => void) => {
    if (typeof window !== "undefined" && window.LWDeviceManager) {
      const devConnState = window.LWDeviceManager.getStateNumber()
      if (devConnState === 1) {
        readyCb()
      } else {
        setTimeout(() => {
          checkConnection(readyCb)
        }, 500)
      }
    }
  }

  const fetchDeviceInfo = () => {
    if (typeof window !== "undefined" && window.LWDeviceManager) {
      window.LWDeviceManager.getDeviceInfo(
        (info: any) => {
          setDeviceInfo(info)
        },
        (err: any) => {
          console.error("Failed to fetch device info:", err)
        },
      )
    }
  }

  const printTicket = (fgl: string) => {
    return new Promise((resolve, reject) => {
      if (typeof window !== "undefined" && window.LWDeviceManager) {
        window.LWDeviceManager.TicketPrinter_PrintTicket(
          1,
          "TicketPrinter_Gen2.Boca.Lemur",
          fgl,
          true,
          (res: any) => {
            console.log(res)
            resolve(res)
          },
          () => {
            const error = "Failed to invoke method on Device Manager"
            console.error(error)
            reject(error)
          },
        )
      } else {
        reject("Device Manager not available")
      }
    })
  }

  return {
    initConnection,
    checkConnection,
    printTicket,
    isConnected,
    deviceInfo,
  }
}
