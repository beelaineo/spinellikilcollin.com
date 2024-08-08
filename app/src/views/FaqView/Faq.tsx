import React, { useEffect, useRef, useState } from 'react'
import { Faq, FaqCategory as FaqCategoryType } from '../../types'
import { Column } from '../../components/Layout'

import {
  Answer,
  PageText,
  QuestionWrapper,
  QuickLink,
  QuickLinksNav,
  Wrapper,
} from './styled'
import { SEO } from '../../components/SEO'

import { FaqCategory } from './FaqCategory'
import { Heading, Span } from '../../components/Text'
import { Accordion } from '../../components/Accordion'
import { useMedia } from '../../hooks'
import { useRouter } from 'next/router'
import { kebabCase } from '../../utils'
import { RichText } from '../../components/RichText'

interface FaqProps {
  faq: Faq
}

export const FaqView = ({ faq }: FaqProps) => {
  const { seo, title, faqCategories, _id } = faq

  const defaultSeo = {
    title: title || 'FAQ',
    description: seo?.description,
    image: seo?.image,
  }

  const sections = faqCategories?.map((category) => category?.label)

  const [isActiveSection, setIsActiveSection] = useState(0)
  const [scrollToSection, setScrollToSection] = useState(-1)

  const [quickLinksHeight, setQuickLinksHeight] = useState(0)

  const quickLinksRef = useRef<HTMLUListElement>(null)

  const isMedium = useMedia({
    maxWidth: '1000px',
  })

  useEffect(() => {
    if (!quickLinksRef?.current) return
    const height = quickLinksRef?.current?.offsetHeight

    setQuickLinksHeight(height)
  }, [isMedium])

  const handleQuickLinkClick = (index) => {
    setScrollToSection(index)

    setTimeout(() => {
      setScrollToSection(-1)
    }, 100)
  }

  const router = useRouter()

  useEffect(() => {
    if (!router.isReady) return

    const { category } = router.query

    const queryMatch = sections?.findIndex(
      (section) => section && kebabCase(section) === category,
    )

    queryMatch && setScrollToSection(queryMatch)
  }, [router.isReady])

  return (
    <>
      <SEO
        seo={seo}
        defaultSeo={defaultSeo}
        path="about/faq"
        contentType={_id!}
      />
      <Wrapper tabIndex={-1}>
        <Heading level={1} textAlign="center">
          {title || 'FAQ'}
        </Heading>
        <QuickLinksNav ref={quickLinksRef} containerHeight={quickLinksHeight}>
          {sections?.map((section, index) => (
            <QuickLink
              key={index}
              isActive={index === isActiveSection}
              onClick={() => handleQuickLinkClick(index)}
            >
              {section}
            </QuickLink>
          ))}
        </QuickLinksNav>

        <Column columnwidth={`clamp(30rem, -21.429rem + 85.714vw, 37.5rem)`}>
          <PageText>
            {faqCategories?.map((category, index) =>
              isMedium ? (
                <Accordion
                  key={category?._key}
                  label={category?.label || 'label'}
                >
                  <Heading level={2}>{category?.label}</Heading>
                  {category?.faqQuestions?.map((item) => {
                    const { _key, question, answerRaw } = item || {}

                    return (
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
                    )
                  })}
                </Accordion>
              ) : (
                <FaqCategory
                  index={index}
                  key={category?._key}
                  label={category?.label}
                  faqQuestions={category?.faqQuestions}
                  setIsActive={setIsActiveSection}
                  scrollToSection={index === scrollToSection}
                />
              ),
            )}
          </PageText>
        </Column>
      </Wrapper>
    </>
  )
}
