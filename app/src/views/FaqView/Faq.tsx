import React, { useEffect, useRef, useState } from 'react'
import { Faq, FaqCategory as FaqCategoryType } from '../../types'
import { Column } from '../../components/Layout'
import styled, { css, DefaultTheme } from '@xstyled/styled-components'

import {} from './styled'
import { SEO } from '../../components/SEO'

import { FaqCategory } from './FaqCategory'
import { Heading } from '../../components/Text'
import { Accordion } from '../../components/Accordion'
import { useMedia } from '../../hooks'

interface FaqProps {
  faq: Faq
}

interface QuickLinksNavProps {
  containerHeight: number
}

interface QuickLinkProps {
  isActive: boolean
}

const PageText = styled.div`
  span {
    font-size: 17px;
  }

  h1,
  h2,
  h3 {
    text-align: center;
  }

  h2 {
    line-height: 1.5em;
    margin: 0.6em 0px;
  }
`

const Wrapper = styled.mainBox`
  ${({ theme }) => css`
    padding: calc(${theme.navHeight} + ${theme.space[9]}px) 8 6;

    ${theme.mediaQueries.mobile} {
      padding: calc(${theme.mobileNavHeight} + ${theme.space[4]}px) 30px 5;
    }
  `}
`

const QuestionWrapper = styled.div`
  margin: 60px 0;
`

const QuickLinksNav = styled.ul<QuickLinksNavProps>`
  ${({ theme, containerHeight }) => css`
    position: sticky;
    top: 50%;
    transform: translateY(-50%);
    padding-inline-start: 0;
    margin-top: calc(-1 * ${containerHeight}px);

    ${theme.mediaQueries.tablet} {
      margin-top: 0;
    }
  `}
`

const QuickLink = styled.li<QuickLinkProps>`
  ${({ isActive, theme }) => css`
    ${theme.mediaQueries.tablet} {
      display: none;
    }

    display: block;
    font-size: 17px;
    font-weight: 200;
    list-style: none;
    margin: 6px auto 0.5em;
    text-decoration: ${isActive ? 'underline' : 'none'};
    cursor: pointer;
  `}
`

const Answer = styled.div`
  p:first-child {
    &:before {
      content: 'A: ';
    }
  }
`

export const FaqView = ({ faq }: FaqProps) => {
  const { seo, title, faqCategories, _id } = faq

  const defaultSeo = {
    title: title || 'FAQ',
    description: seo?.description,
    image: seo?.image,
  }

  const sections = faqCategories?.map((category) => category?.label)

  const [isActiveSection, setIsActiveSection] = useState(0)
  const [isClickedSection, setIsClickedSection] = useState(null)

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
    setIsClickedSection(index)
  }
  return (
    <>
      <SEO seo={seo} defaultSeo={defaultSeo} path="/faq" contentType={_id!} />
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
                  <FaqCategory
                    index={index}
                    key={category?._key}
                    label={category?.label}
                    faqQuestions={category?.faqQuestions}
                    setIsActiveSection={setIsActiveSection}
                  />
                </Accordion>
              ) : (
                <FaqCategory
                  index={index}
                  key={category?._key}
                  label={category?.label}
                  faqQuestions={category?.faqQuestions}
                  setIsActiveSection={setIsActiveSection}
                  isClickedSection={index === isClickedSection}
                />
              ),
            )}
          </PageText>
        </Column>
      </Wrapper>
    </>
  )
}
