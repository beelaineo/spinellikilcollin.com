import * as React from 'react'
import { Page } from '../../types'
import { PageWrapper } from '../../components/Layout'
import { Heading } from '../../components/Text'
import { Column } from '../../components/Layout'
import { RichText } from '../../components/RichText'

interface PageViewProps {
  page: Page
}

export const PageView = ({ page }: PageViewProps) => {
  const { title, subtitle, bodyRaw } = page
  return (
    <PageWrapper>
      <Heading textAlign="center" level={1}>
        {title}
      </Heading>
      {subtitle ? <Heading level={2}>{subtitle}</Heading> : null}
      <Column width="medium">
        <RichText body={bodyRaw} imageSizes="(max-width: 600px) 100vw, 600px" />
      </Column>
    </PageWrapper>
  )
}
