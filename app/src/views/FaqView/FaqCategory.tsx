import React, { useRef, useEffect } from 'react'
import { Heading, Span } from '../../components/Text'
import styled from 'styled-components'

import { RichText } from '../../components/RichText'
import { useInViewport } from '../../hooks'
import { Maybe } from '../../types'
import { Answer, CategoryWrapper, QuestionWrapper } from './styled'

interface FaqCategoryProps {
  label: Maybe<string> | undefined
  faqQuestions: any
  index: number
  setIsActive: (index: number) => void
  scrollToSection?: boolean | null
}

export const FaqCategory = ({
  label,
  faqQuestions,
  index,
  setIsActive,
  scrollToSection,
}: FaqCategoryProps) => {
  const ref = useRef<null | HTMLDivElement>(null)

  const { isInView } = useInViewport(ref, '0px', 0.2)

  useEffect(() => {
    if (!isInView) return

    setIsActive(isInView && index)
  }, [isInView])

  useEffect(() => {
    if (!scrollToSection) return

    const yOffset = -130
    const element = ref?.current
    const y =
      index === 0
        ? 0
        : (element &&
            element.getBoundingClientRect().top + window.scrollY + yOffset) ||
          0

    window.scrollTo({ top: y, behavior: 'smooth' })
  }, [scrollToSection])

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
