import * as React from 'react'
import { ToastRoot } from '../../components/Toast'
import { useToastReducer } from './reducer'

type ToastContextValue = ReturnType<typeof useToastReducer>

const ToastContext = React.createContext<ToastContextValue | undefined>(
  undefined,
)

export const ToastConsumer = ToastContext.Consumer

export const useToast = () => {
  const ctx = React.useContext(ToastContext)
  if (!ctx)
    throw new Error('useToastContext must be used within a ToastProvider')
  return ctx
}

interface ToastProps {
  children: React.ReactNode
}

export const ToastProvider = ({ children }: ToastProps) => {
  const { state, createToast, dismissToast } = useToastReducer()

  const value = {
    state,
    createToast,
    dismissToast,
  }

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
}
