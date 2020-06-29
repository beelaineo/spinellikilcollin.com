import * as React from 'react'
import styled, { css } from '@xstyled/styled-components'
import Link from 'next/link'
import { JournalEntry } from '../../types'
import { Image } from '../../components/Image'
import { Heading } from '../../components/Text'
import { definitely, niceDate } from '../../utils'
import { TagLink } from '../../components/Tags'

interface WrapperProps {
  featured: boolean
}

const ImageContainer = styled.div<WrapperProps>`
  ${({ featured }) => css`
    display: block;
    ${featured
      ? css`
          margin-bottom: 3;
        `
      : css`
          grid-column: 1;
          grid-row: 1 / 4;
        `}
  `}
`

const Wrapper = styled.divBox<WrapperProps>`
  ${({ featured }) => css`
    ${featured
      ? css`
          display: flex;
          flex-direction: column;
          justify-content: center;
          text-align: center;
          max-width: 800px;
        `
      : css`
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: auto auto 1fr;
          grid-gap: 2 5;
          max-width: 1200px;
        `}

    margin: 0 auto;
    padding: 5 0;
    & + & {
      border-top: 1px solid;
    }
  `}
`

const DateTags = styled.divBox<WrapperProps>`
  ${({ featured }) => css`
    display: flex;
    justify-content: ${featured ? 'center' : 'left'};
    margin-bottom: ${featured ? 2 : 0};
  `}
`

interface JournalEntryLinkProps {
  entry: JournalEntry
  featured: boolean
}

export const JournalEntryLink = ({
  entry,
  featured,
}: JournalEntryLinkProps) => {
  const { publishDate, thumbnail, title, slug, tags } = entry
  if (!slug || !slug.current) return null
  const href = '/journal/[entrySlug]'
  const as = `/journal/${slug.current}`
  console.log(thumbnail)

  return (
    <Wrapper featured={featured}>
      {publishDate ? (
        <DateTags featured={featured}>
          <Heading level={5}>{niceDate(entry.publishDate)}</Heading>
          {tags
            ? definitely(tags).map((tag) => <TagLink key={tag} tag={tag} />)
            : null}
        </DateTags>
      ) : null}
      {thumbnail ? (
        <ImageContainer featured={featured}>
          <Image ratio={0.45} image={thumbnail} />
        </ImageContainer>
      ) : null}
      <Heading mt={2} mb={featured ? 5 : 2} level={2} weight={2}>
        {title}
      </Heading>
      <Link href={href} as={as}>
        <a>
          <Heading level={4} fontStyle="italic" textDecoration="underline">
            Read More
          </Heading>
        </a>
      </Link>
    </Wrapper>
  )
}
