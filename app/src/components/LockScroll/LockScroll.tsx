import * as React from 'react'

const { useState } = React

export const useLockScroll = (initialState?: boolean) => {
  const [locked, setLocked] = useState(initialState || false)

  const scrollingElement =
    typeof document !== 'undefined'
      ? document?.getElementsByTagName('body')[0]
      : null

  const unlockScroll = () => {
    if (scrollingElement) scrollingElement.style.overflow = 'scroll'
    setLocked(false)
  }
  const lockScroll = () => {
    if (scrollingElement) scrollingElement.style.overflow = 'hidden'
    setLocked(true)
  }

  return {
    locked,
    unlockScroll,
    lockScroll,
  }
}
