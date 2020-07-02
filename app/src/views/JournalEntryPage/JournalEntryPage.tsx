import * as React from 'react'
import { Box } from '@xstyled/styled-components'
import Link from 'next/link'
import { JournalEntry } from '../../types'
import { Heading } from '../../components/Text'
import { TagLink } from '../../components/Tags'
import { HeroBlock } from '../../components/ContentBlock/HeroBlock'
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
  const { title, hero, subtitle, bodyRaw, tags: maybeTags } = entry
  const tags = definitely(maybeTags)
  return (
    <>
      {hero ? <HeroBlock hero={hero} /> : null}
      <JournalPageWrapper withHero={Boolean(hero)}>
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
            <Heading lineHeight="1em" mb={4} level={1} weight={2}>
              {title}
            </Heading>
            {subtitle ? (
              <Heading fontStyle="italic" level={2}>
                {subtitle}
              </Heading>
            ) : null}
          </Header>
          <Box mx="auto" maxWidth="690px">
            <RichText
              article
              body={bodyRaw}
              imageSizes="(max-width: 600px) 100vw, 600px"
            />
          </Box>
        </MainWrapper>
      </JournalPageWrapper>
    </>
  )
}
