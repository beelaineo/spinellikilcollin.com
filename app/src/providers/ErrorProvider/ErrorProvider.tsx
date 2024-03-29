import * as React from 'react'
import { Sentry, SentryEvent } from '../../services/sentry'
import { useErrorReducer } from './reducer'
import { parseError } from './parseError'

const { useEffect } = React

interface ErrorContextValue {
  errorMessage: string | React.ReactNode | undefined
  isFatal?: boolean
  handleError: (
    error: Error,
    event: SentryEvent,
    extra?: Record<string, any>,
  ) => void
  clearError: () => void
}

const ErrorContext = React.createContext<ErrorContextValue | undefined>(
  undefined,
)

export const ErrorConsumer = ErrorContext.Consumer

export const useError = () => {
  const ctx = React.useContext(ErrorContext)
  if (!ctx)
    throw new Error('useErrorContext must be used within a ErrorProvider')
  return ctx
}

interface ErrorProps {
  children: React.ReactNode
  error?: Error
}

export const ErrorProvider = ({ children, error: parentError }: ErrorProps) => {
  const [state, actions] = useErrorReducer()
  const { errorMessage, isFatal } = state
  const { setError, reset } = actions

  /* Handle errors coming in from the parent (typically _app.tsx) */
  useEffect(() => {
    if (parentError) {
      setError(parseError(parentError))
    } else {
      reset()
    }
  }, [parentError, reset, setError])

  const handleError = (
    error: Error,
    eventType: SentryEvent,
    extra?: Record<string, any>,
  ) => {
    const args = parseError(error)

    if (args.isFatal) {
      Sentry.captureException(error, eventType, extra)
    }
    setError(args)
  }

  const value = {
    errorMessage,
    isFatal,
    handleError,
    clearError: reset,
  }

  return <ErrorContext.Provider value={value}>{children}</ErrorContext.Provider>
}
