import React, { useEffect, useState } from "react"
import { Alert } from "reactstrap"

export const Notify = ({ message, duration, onDismiss, type }) => {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
      onDismiss()
    }, duration)

    return () => {
      clearTimeout(timer)
    }
  }, [duration, onDismiss])

  return visible && <Alert color={type}>{message}</Alert>
}
