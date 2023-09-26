import { useState } from 'react'
import { useUnmount } from 'react-use'

export const useWait = () => {
  const [timeoutIds, setTimeoutIds] = useState<number[]>([])

  useUnmount(() => {
    timeoutIds.map(clearTimeout)
  })

  return function wait(ms: number) {
    let timeoutId: number = ms
    const promise = new Promise((resolve) => {
      timeoutId = window.setTimeout(resolve, ms)
    })
    setTimeoutIds([...timeoutIds, timeoutId])
    return promise
  }
}

export default useWait
