import * as React from 'react'
import styled from '@xstyled/styled-components'
import { Page } from '../../types'
import { PageWrapper } from '../../components/Layout'
import { Heading } from '../../components/Text'
import { Column } from '../../components/Layout'
import { RichText } from '../../components/RichText'

const PageText = styled.div`
  h1,
  h2,
  h3 {
    text-align: center;
  }

  p,
  li {
    line-height: 1.8em;
  }
`

interface PageViewProps {
  page: Page
}

export const PageView = ({ page }: PageViewProps) => {
  const { title, subtitle, bodyRaw } = page
  return (
    <PageWrapper>
      <Heading textAlign="center" level={0}>
        {title}
      </Heading>
      {subtitle ? <Heading level={2}>{subtitle}</Heading> : null}
      <Column columnWidth="medium">
        <PageText>
          <RichText
            body={bodyRaw}
            imageSizes="(max-width: 600px) 100vw, 600px"
          />
        </PageText>
      </Column>
    </PageWrapper>
  )
}
