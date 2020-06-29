import * as React from 'react'
import Link from 'next/link'
import { JournalEntry } from '../../types'
import { Heading } from '../../components/Text'
import { Column } from '../../components/Layout'
import { TagLink } from '../../components/Tags'
import LeftArrow from '../../svg/LeftArrow.svg'
import { RichText } from '../../components/RichText'
import { definitely } from '../../utils'
import {
  Header,
  LinkWrapper,
  DateTags,
  JournalPageWrapper,
  MainWrapper,
} from './styled'

interface JournalEntryPageProps {
  entry: JournalEntry
}

export const JournalEntryPage = ({ entry }: JournalEntryPageProps) => {
  const { title, subtitle, bodyRaw, tags: maybeTags } = entry
  const tags = definitely(maybeTags)
  return (
    <JournalPageWrapper>
      <LinkWrapper>
        <Link href="/journal">
          <a>
            <Heading level={5}>
              <LeftArrow /> Back to Journal
            </Heading>
          </a>
        </Link>
      </LinkWrapper>
      <MainWrapper>
        <Header>
          {tags.length ? (
            <DateTags>
              {tags.map((tag) => (
                <TagLink key={tag} tag={tag} />
              ))}
            </DateTags>
          ) : null}
          <Heading lineHeight="1em" level={0} weight={2}>
            {title}
          </Heading>
          {subtitle ? <Heading level={1}>{subtitle}</Heading> : null}
        </Header>
        <Column columnwidth="medium">
          <RichText
            body={bodyRaw}
            imageSizes="(max-width: 600px) 100vw, 600px"
          />
        </Column>
      </MainWrapper>
    </JournalPageWrapper>
  )
}
