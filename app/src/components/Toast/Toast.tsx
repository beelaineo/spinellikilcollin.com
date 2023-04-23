import * as React from 'react'
import { ToastRootWrapper, ToastWrapper } from './styled'
import { useToast } from '../../providers/ToastProvider'
import { CloseButton } from '../Modal/styled'
import { Heading } from '../Text'
import { useStatefulRef } from '../../utils/hooks'

import { Toast as IToast, ToastType, ToastDivState } from './types'
import { useCountry, useNavigation } from '../../providers'
import { useMedia } from '../../hooks'
import { theme } from '../../theme'
import Link from 'next/link'

const { useEffect, useState, useRef } = React

interface ToastProps {
  icon?: React.ReactNode
  toastKey: string
  toast: IToast
  dismissToast: (key: string) => void
}

const Toast: React.FC<ToastProps> = ({ toast, dismissToast, toastKey }) => {
  const wrapperRef = useStatefulRef<HTMLDivElement>(null)
  const [divState, setDivState] = useState(ToastDivState.Init)
  const dismiss = () => dismissToast(toastKey)
  const { dismissable, message } = toast

  const isMobile = useMedia({
    maxWidth: `${theme.breakpoints?.md || '650'}px`,
  })

  const { colorTheme } = useNavigation()

  const clearToast = () => {
    setDivState(ToastDivState.Hidden)
    setTimeout(() => {
      dismiss()
    }, 5000)
  }

  useEffect(() => {
    if (wrapperRef.current === null) return
    setDivState(ToastDivState.Mounted)
    setTimeout(() => {
      setDivState(ToastDivState.Displayed)
    }, 100)
  }, [wrapperRef.current])

  useEffect(() => {
    if (dismissable) return
    const timeout = setTimeout(() => {
      clearToast()
    }, 5000)
    return () => clearTimeout(timeout)
  }, [dismissable])
  const elHeight = wrapperRef.current?.offsetHeight

  const getStyles = (state: ToastDivState, elHeight?: number | undefined) => {
    switch (state) {
      case ToastDivState.Init:
        return { opacity: 0 }
      case ToastDivState.Mounted:
        return {
          transform: `translateY(${
            isMobile ? elHeight && 2 * -elHeight : elHeight && elHeight * 2
          }px)`,

          opacity: 0,
          transitionDuration: '0s',
        }
      case ToastDivState.Displayed:
        return { opacity: 1 }
      case ToastDivState.Hidden:
        return {
          transform: `translateY(${
            isMobile ? elHeight && 2 * -elHeight : elHeight
          }px)`,
          opacity: 0,
        }
      default:
        return undefined
    }
  }

  const { setShowOutline } = useCountry()

  const handleClick = () => {
    setShowOutline('isVisible')
  }

  const styles = getStyles(divState, elHeight)

  const renderMessage = () =>
    toast.type === ToastType.Currency ? (
      <>
        <Heading my={0} level={5}>
          Now shopping in {message || 'Country Unknown'}.
        </Heading>

        <Heading my={0} level={6}>
          Use our <button onClick={handleClick}>country selector</button> to
          change your currency.{' '}
        </Heading>
      </>
    ) : (
      <Heading my={0} level={5}>
        message
      </Heading>
    )

  return (
    <ToastWrapper
      style={styles}
      ref={wrapperRef}
      toastType={toast.type}
      colorTheme={colorTheme}
    >
      {renderMessage()}

      {dismissable ? (
        <CloseButton
          type="button"
          onClick={clearToast}
          aria-label="Clear Toast message"
        />
      ) : null}
    </ToastWrapper>
  )
}

export const ToastRoot: React.FC = () => {
  const { state, dismissToast, createToast } = useToast()

  const { toasts } = state
  const toastsArray = Array.from(toasts)

  return (
    <ToastRootWrapper>
      {toastsArray.map(([key, toast]) => (
        <Toast
          key={key}
          toastKey={key}
          dismissToast={dismissToast}
          toast={toast}
        />
      ))}
    </ToastRootWrapper>
  )
}
