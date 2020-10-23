import * as React from 'react'
import styled, { css } from '@xstyled/styled-components'
import { QuizBlock } from '../../../types'
import { Heading } from '../../../components/Text'
import { Image } from '../../../components/Image'
import { Button } from '../../../components/Button'
import { useTabs } from '../../../components/Tabs'

const IntroWrapper = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap 4;

    ${theme.mediaQueries.mobile} {
      display: block;
    }
  `}
`

const IntroLeft = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

interface IntroProps {
  quizBlock: QuizBlock
}

export const Intro = ({ quizBlock }: IntroProps) => {
  const { goToTab } = useTabs()
  const { title, subtitle, image } = quizBlock
  const next = () => goToTab('kind')
  return (
    <IntroWrapper>
      <IntroLeft>
        <Heading level={2}>{title}</Heading>
        <Heading level={4}>{subtitle}</Heading>
        <Button type="button" onClick={next}>
          Launch Quiz
        </Button>
      </IntroLeft>
      <Image image={image} ratio={1} />
    </IntroWrapper>
  )
}
