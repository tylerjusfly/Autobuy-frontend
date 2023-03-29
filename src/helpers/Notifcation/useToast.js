import { useState } from "react"
import { Notify } from "./Notify"

export const useToast = () => {
  const [toasts, setToasts] = useState([])

  const showToast = (message, type, duration = 3000) => {
    const id = Date.now()
    setToasts(prevToasts => [...prevToasts, { id, message, duration, type }])
  }

  /* removes a toast from the toasts array  */
  const handleToastDismiss = id => {
    setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id))
  }

  const RenderToast = () =>
    toasts.map(toast => <Notify key={toast.id} message={toast.message} duration={toast.duration} onDismiss={() => handleToastDismiss(toast.id)} type={toast.type} />)

  return {
    showToast,
    RenderToast,
  }
}
