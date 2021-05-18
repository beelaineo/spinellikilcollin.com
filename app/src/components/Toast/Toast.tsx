import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { ToastRootWrapper, ToastWrapper } from './styled'
import {
  Toast as IToast,
  ToastType,
  useToast,
} from '../../providers/ToastProvider'
import { CloseButton } from '../Modal/styled'
import { Heading } from '../Text'
import { useStatefulRef } from '../../utils/hooks'

export { ToastType } from '../../providers/ToastProvider'

const { useEffect, useState, useRef } = React

interface ToastProps {
  icon?: React.ReactNode
  toastKey: string
  toast: IToast
  dismissToast: (key: string) => void
}

export enum ToastDivState {
  Init = 'INIT',
  Mounted = 'MOUNTED',
  Displayed = 'DISPLAYED',
  Hidden = 'HIDDEN',
}

const getStyles = (state: ToastDivState, elHeight: number | undefined) => {
  switch (state) {
    case ToastDivState.Init:
      return { opacity: 0 }
    case ToastDivState.Mounted:
      return {
        marginBottom: `-${elHeight}px`,
        opacity: 0,
        transitionDuration: '0s',
      }
    case ToastDivState.Displayed:
      return { opacity: 1 }
    case ToastDivState.Hidden:
      return { marginBottom: `-${elHeight}px`, opacity: 0 }
    default:
      return undefined
  }
}

const Toast: React.FC<ToastProps> = ({ toast, dismissToast, toastKey }) => {
  const wrapperRef = useStatefulRef<HTMLDivElement>(null)
  const [divState, setDivState] = useState(ToastDivState.Init)
  const dismiss = () => dismissToast(toastKey)
  const { dismissable, message } = toast

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
  const styles = getStyles(divState, elHeight)

  return (
    <ToastWrapper
      style={styles}
      ref={wrapperRef}
      toastType={toast.type}
      aria-hidden={divState === ToastDivState.Displayed}
    >
      <Heading my={0} level={5}>
        {message}
      </Heading>
      {dismissable ? <CloseButton type="button" onClick={clearToast} /> : null}
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
