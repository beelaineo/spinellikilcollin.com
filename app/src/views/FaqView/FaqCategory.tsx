import React, { useRef, useEffect } from 'react'
import { Heading, Span } from '../../components/Text'
import styled from 'styled-components'

import { RichText } from '../../components/RichText'
import { useInViewport } from '../../hooks'
import { Maybe } from '../../types'

interface FaqCategoryProps {
  label: Maybe<string> | undefined
  faqQuestions: any
  index: number
  setIsActiveSection: (index: number) => void
  isClickedSection?: boolean
}

const QuestionWrapper = styled.div`
  margin: 60px 0;
`

const Answer = styled.div`
  p:first-child {
    &:before {
      content: 'A: ';
    }
  }
`

const CategoryWrapper = styled.div``

export const FaqCategory = ({
  label,
  faqQuestions,
  index,
  setIsActiveSection,
  isClickedSection,
}: FaqCategoryProps) => {
  const ref = useRef<null | HTMLDivElement>(null)

  const { isInView } = useInViewport(ref, '0px', 0.2)

  useEffect(() => {
    if (!isInView) return

    setIsActiveSection(isInView && index)
  }, [isInView])

  useEffect(() => {
    if (!isClickedSection) return

    const yOffset = -130
    const element = ref?.current
    const y =
      (element &&
        element.getBoundingClientRect().top + window.scrollY + yOffset) ||
      0

    isClickedSection && window.scrollTo({ top: y, behavior: 'smooth' })
  }, [isClickedSection])

  return (
    <CategoryWrapper ref={ref}>
      <Heading level={2}>{label}</Heading>
      {faqQuestions?.map(({ question, answerRaw, _key }) => (
        <QuestionWrapper key={_key}>
          <Span fontWeight={200}>{`Q: ${question}`}</Span>
          <Answer>
            <RichText
              article
              body={answerRaw}
              imageSizes="(max-width: 600px) 100vw, 600px"
            />
          </Answer>
        </QuestionWrapper>
      ))}
    </CategoryWrapper>
  )
}
