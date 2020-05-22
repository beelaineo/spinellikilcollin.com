import * as React from 'react'
import styled, { css } from '@xstyled/styled-components'
import Link from 'next/link'
import { JournalEntry } from '../../types'
import { PageWrapper } from '../../components/Layout'
import { Heading } from '../../components/Text'
import { Column } from '../../components/Layout'
import { TagLink } from '../../components/Tags'
import LeftArrow from '../../svg/LeftArrow.svg'
import { RichText } from '../../components/RichText'
import { definitely } from '../../utils'

interface JournalEntryPageProps {
  entry: JournalEntry
}

const LinkWrapper = styled.div`
  a > * {
    display: inline-flex;
    justify-content: flex-start;
    align-items: center;
  }
  svg {
    margin-right: 0.5em;
    height: 1em;
  }
`
const Header = styled.div`
  max-width: 700px;
  margin: 5 auto 7;
  padding: 0 2;
  text-align: center;
`

const DateTags = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 3;
`

export const JournalEntryPage = ({ entry }: JournalEntryPageProps) => {
  const { title, subtitle, bodyRaw, tags: maybeTags } = entry
  const tags = definitely(maybeTags)
  return (
    <PageWrapper>
      <LinkWrapper>
        <Link href="/journal">
          <a>
            <Heading level={5}>
              <LeftArrow /> Back to Journal
            </Heading>
          </a>
        </Link>
      </LinkWrapper>
      <Header>
        {tags.length ? (
          <DateTags>
            {tags.map((tag) => (
              <TagLink key={tag} tag={tag} />
            ))}
          </DateTags>
        ) : null}
        <Heading level={1} weight={2}>
          {title}
        </Heading>
        {subtitle ? <Heading level={2}>{subtitle}</Heading> : null}
      </Header>
      <Column columnWidth="medium">
        <RichText body={bodyRaw} imageSizes="(max-width: 600px) 100vw, 600px" />
      </Column>
    </PageWrapper>
  )
}
