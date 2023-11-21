import * as React from 'react'

import { Column, Value, Label, Wrapper } from './styled'
import { TDate, useCountDown } from '../../hooks/useCountdown'
import { Heading } from '../Text'
import { Maybe } from '@good-idea/unwind-edges'

interface CountDownProps {
  targetDate?: TDate
}

export const CountDown = ({ targetDate }: CountDownProps) => {
  const count = useCountDown({
    targetDate: targetDate,
    onEnd: () => {
      console.log('is end?')
    },
  })

  const time = {
    day: count.formatted.days,
    hour: count.formatted.hours,
    min: count.formatted.minutes,
    sec: count.formatted.seconds,
  }

  return (
    <Wrapper>
      {Object.entries(time).map((item, i) => {
        const value = item[1].toString().length === 1 ? `0${item[1]}` : item[1]
        const label = item[0]

        return (
          <Column key={i}>
            <Value>
              <Heading level={2}>{value}</Heading>
            </Value>
            <Label>
              <Heading level={3}>{label}</Heading>
            </Label>
          </Column>
        )
      })}
    </Wrapper>
  )
}
