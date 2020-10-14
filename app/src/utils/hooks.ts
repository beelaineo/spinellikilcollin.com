import { useState, useEffect } from 'react'

interface Options {
  min?: number
  max?: number
}

const defaultOptions = {
  min: -Infinity,
  max: Infinity,
}

export interface UseCounterValues {
  count: number
  increment: () => void | Promise<void>
  decrement: () => void | Promise<void>
  setCount: (c: number) => void | Promise<void>
  isMin: boolean
  isMax: boolean
}

const minMax = (min: number, max: number) => (input: number): number =>
  Math.min(Math.max(input, min), max)

export const useCounter = (
  initialCount: number = 0,
  options: Options,
): UseCounterValues => {
  const { min, max } = {
    ...defaultOptions,
    ...options,
  }
  const within = minMax(min, max)
  const [count, setCountState] = useState<number>(initialCount)

  const increment = () => setCountState(within(count + 1))
  const decrement = () => setCountState(within(count - 1))

  const setCount = (num: number) => setCountState(within(num))

  const isMin = count === min
  const isMax = count === max
  return { count, increment, decrement, setCount, isMin, isMax }
}

interface ViewportSize {
  width: number
  height: number
}

interface UseViewportArgs {
  debounce?: number
}

export const useViewportSize = (args?: UseViewportArgs): ViewportSize => {
  const debounce = args?.debounce ?? 400
  const initialWidth = typeof window !== 'undefined' ? window.innerWidth : 1800
  const initialHeight =
    typeof window !== 'undefined' ? window.innerHeight : 1000
  const [width, setCurrentWidth] = useState<number>(initialWidth)
  const [height, setCurrentHeight] = useState<number>(initialHeight)

  const updateWidth = () => {
    setCurrentWidth(window.innerWidth)
    setCurrentHeight(window.innerHeight)
  }

  useEffect(updateWidth, [])

  useEffect(() => {
    const timeout = setTimeout(() => {
      window.addEventListener('resize', updateWidth)
    }, debounce)

    return () => {
      window.removeEventListener('resize', updateWidth)
      clearTimeout(timeout)
    }
  }, [width, height])

  return {
    width,
    height,
  }
}
