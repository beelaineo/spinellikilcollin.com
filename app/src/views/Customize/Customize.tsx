import * as React from 'react'
import styled, { css } from '@xstyled/styled-components'
import { Customize as CustomizeType } from '../../types'
import { FeatureFlag } from '../../components/FeatureFlag'
import { PageWrapper } from '../../components/Layout'
import { Heading } from '../../components/Text'
import { Column } from '../../components/Layout'
import { RichText } from '../../components/RichText'
import { HeroBlock } from '../../components/ContentBlock/HeroBlock'
import { SEO } from '../../components/SEO'
import { isValidHero, getHeroImage } from '../../utils'
import { QuizBlock } from './QuizBlock'
import { Examples } from './Examples'
import { Experience } from './Experience'

interface BlockWrapperProps {
  borderTop?: boolean
}
const BlockWrapper = styled.div<BlockWrapperProps>`
  ${({ borderTop }) => css`
    padding: 6 0;
    border-bottom: 1px solid;
    border-color: body.5;
    border-top: ${borderTop ? '1px solid' : 0};
  `}
`

const PageText = styled.div`
  h1,
  h2,
  h3 {
    text-align: center;
  }

  p,
  li {
    line-height: 1.8em;
    font-size: 17px;
  }
`

interface CustomizeProps {
  customize: CustomizeType
}

export const Customize = ({ customize }: CustomizeProps) => {
  const {
    seo,
    title,
    subtitle,
    hero,
    bodyRaw,
    quizBlock,
    experience,
    examples,
  } = customize
  const defaultSeo = {
    title: 'Customize',
    image: getHeroImage(hero),
  }

  return (
    <>
      <SEO seo={seo} defaultSeo={defaultSeo} path="customize" />
      {hero && isValidHero(hero) ? <HeroBlock hero={hero} /> : null}
      <PageWrapper tabIndex={-1}>
        <Heading textAlign="center" level={1}>
          {title}
        </Heading>
        {subtitle ? <Heading level={3}>{subtitle}</Heading> : null}
        {bodyRaw ? (
          <Column columnwidth="medium">
            <PageText>
              <RichText
                body={bodyRaw}
                imageSizes="(max-width: 600px) 100vw, 600px"
              />
            </PageText>
          </Column>
        ) : null}
        <FeatureFlag flag="customizationPage">
          {quizBlock ? <QuizBlock quizBlock={quizBlock} /> : null}
          <BlockWrapper borderTop={true}>
            <Experience experience={experience} />
          </BlockWrapper>
          <BlockWrapper>
            <Examples examples={examples} />
          </BlockWrapper>
        </FeatureFlag>
      </PageWrapper>
    </>
  )
}
