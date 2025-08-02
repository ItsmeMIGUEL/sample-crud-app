"use client"

import type React from "react"
import { useEffect } from "react"

interface AlertNotificationProps {
  show: boolean
  type: "success" | "error" | "info"
  message: string
  action?: string
  onClose: () => void
}

export const AlertNotification: React.FC<AlertNotificationProps> = ({ show, type, message, action, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose()
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [show, onClose])

  if (!show) return null

  return (
    <div className={`alert-notification ${type} ${show ? "show" : ""}`}>
      <div className="alert-content">
        <div className="alert-icon">
          {type === "success" && "✓"}
          {type === "error" && "✕"}
          {type === "info" && <span className="info-spinner"></span>}
        </div>
        <div className="alert-message">
          {message}
          {action && <span className="alert-action">({action})</span>}
        </div>
        <button onClick={onClose} className="alert-close">
          ×
        </button>
      </div>
    </div>
  )
}
