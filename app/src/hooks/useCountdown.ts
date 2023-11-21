import { useCallback, useEffect, useMemo, useState } from 'react'
import dayjs from 'dayjs'

export type TDate = Date | number | string | undefined

export type Options = {
  targetDate?: TDate
  interval?: number
  onEnd?: () => void
  dateToMs?: (date?: TDate) => number
}

export interface FormattedRes {
  days: number
  hours: number
  minutes: number
  seconds: number
  milliseconds: number
}

export interface TimeLeft {
  ms: number
  formatted: FormattedRes
}

const parseMs = (milliseconds: number): FormattedRes => {
  return {
    days: Math.floor(milliseconds / 86400000),
    hours: Math.floor(milliseconds / 3600000) % 24,
    minutes: Math.floor(milliseconds / 60000) % 60,
    seconds: Math.floor(milliseconds / 1000) % 60,
    milliseconds: Math.floor(milliseconds) % 1000,
  }
}

export const useCountDown = (options?: Options) => {
  const {
    targetDate,
    interval = 1000,
    onEnd,
    dateToMs = (t: TDate) => dayjs(t).valueOf(),
  } = options || {}

  const [target, setTargetDate] = useState<TDate>(targetDate)
  const calcLeftPersistFn = useCallback(() => {
    if (!target) {
      return 0
    }
    const left = dateToMs(target) - dateToMs()
    if (left < 0) {
      return 0
    }
    return left
  }, [dateToMs, target])

  const [timeLeft, setTimeLeft] = useState(() => calcLeftPersistFn())

  useEffect(() => {
    if (!target) {
      // for stop
      setTimeLeft(0)
      return
    }

    setTimeLeft(calcLeftPersistFn())

    const timer = setInterval(() => {
      const targetLeft = calcLeftPersistFn()
      setTimeLeft(targetLeft)
      if (targetLeft === 0) {
        clearInterval(timer)

        onEnd && onEnd()
      }
    }, interval)

    return () => clearInterval(timer)
  }, [target, interval])

  const formattedRes = useMemo(() => {
    return parseMs(timeLeft)
  }, [timeLeft])

  return { ms: timeLeft, formatted: formattedRes } as TimeLeft
}
