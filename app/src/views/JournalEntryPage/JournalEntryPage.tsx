import * as React from 'react'
import { x } from '@xstyled/styled-components'
import Link from 'next/link'
import { JournalEntry } from '../../types'
import { Heading } from '../../components/Text'
import { TagLink } from '../../components/Tags'
import { HeroBlock } from '../../components/ContentBlock/HeroBlock'
import LeftArrow from '../../svg/LeftArrow.svg'
import { RichText } from '../../components/RichText'
import { SEO } from '../../components/SEO'
import {
  isValidHero,
  getHeroImage,
  getFirstImage,
  definitely,
} from '../../utils'
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
  const { seo, title, slug, hero, subtitle, bodyRaw, tags: maybeTags } = entry
  const tags = definitely(maybeTags)
  const validHero = isValidHero(hero)
  const defaultSeo = {
    title: title,
    image: getHeroImage(hero) || getFirstImage(bodyRaw),
  }
  if (!slug) throw new Error('No slug was fetched')
  const path = ['journal', slug.current].join('/')
  return (
    <>
      <SEO seo={seo} defaultSeo={defaultSeo} path={path} />
      {validHero && hero ? <HeroBlock $hero={hero} /> : null}
      <JournalPageWrapper $withHero={validHero} tabIndex={-1}>
        <LinkWrapper>
          <Link href="/journal">
            <Heading level={5}>
              <LeftArrow /> Back to Journal
            </Heading>
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
          <x.div mx="auto" maxWidth="690px">
            <RichText
              article
              body={bodyRaw}
              imageSizes="(max-width: 600px) 100vw, 600px"
            />
          </x.div>
        </MainWrapper>
      </JournalPageWrapper>
    </>
  )
}
