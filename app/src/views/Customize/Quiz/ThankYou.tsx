import * as React from 'react'
import { Heading } from '../../../components/Text'
import { QuizTabWrapper } from './styled'

export const ThankYou = () => {
  return (
    <QuizTabWrapper>
      <Heading textAlign="center" level={2}>
        Thank you!
      </Heading>
      <Heading level={4}>We will be in touch soon.</Heading>
    </QuizTabWrapper>
  )
}
