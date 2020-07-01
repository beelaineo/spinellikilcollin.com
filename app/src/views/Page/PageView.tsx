import * as React from 'react'
import styled from '@xstyled/styled-components'
import { Page } from '../../types'
import { PageWrapper } from '../../components/Layout'
import { Heading } from '../../components/Text'
import { Column } from '../../components/Layout'
import { RichText } from '../../components/RichText'
import { HeroBlock } from '../../components/ContentBlock/HeroBlock'

const PageText = styled.div`
  h1,
  h2,
  h3 {
    text-align: center;
  }
`

interface PageViewProps {
  page: Page
}

export const PageView = ({ page }: PageViewProps) => {
  const { title, hero, subtitle, bodyRaw } = page
  return (
    <>
      {hero ? <HeroBlock hero={hero} /> : null}
      <PageWrapper>
        <Heading textAlign="center" level={0}>
          {title}
        </Heading>
        {subtitle ? <Heading level={2}>{subtitle}</Heading> : null}
        <Column columnwidth="medium">
          <PageText>
            <RichText
              article
              body={bodyRaw}
              imageSizes="(max-width: 600px) 100vw, 600px"
            />
          </PageText>
        </Column>
      </PageWrapper>
    </>
  )
}
