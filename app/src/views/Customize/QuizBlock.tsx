import * as React from 'react'
import styled, { css } from '@xstyled/styled-components'
import { QuizBlock as QuizBlockType } from '../../types'
import { Heading } from '../../components/Text'
import { Image } from '../../components/Image'
import { LinkButton } from '../../components/Button'

const QuizBlockWrapper = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap 4;

    ${theme.mediaQueries.mobile} {
      display: block;
    }
  `}
`

const QuizBlockLeft = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

interface QuizBlockProps {
  quizBlock: QuizBlockType
}

export const QuizBlock = ({ quizBlock }: QuizBlockProps) => {
  const { title, subtitle, image } = quizBlock
  return (
    <QuizBlockWrapper>
      <QuizBlockLeft>
        <Heading level={2}>{title}</Heading>
        <Heading level={4}>{subtitle}</Heading>
        <LinkButton href="/customize/quiz">Launch Quiz</LinkButton>
      </QuizBlockLeft>
      <Image image={image} ratio={1} />
    </QuizBlockWrapper>
  )
}
