import * as React from 'react'
import styled, { css } from '@xstyled/styled-components'
import Link from 'next/link'
import { JournalEntry } from '../../types'
import { Image, Wrapper as ImageWrapper } from '../../components/Image'
import { Heading } from '../../components/Text'
import { definitely, niceDate } from '../../utils'
import { TagLink } from '../../components/Tags'

interface WrapperProps {
  featured: boolean
}

const ImageContainer = styled.div<WrapperProps>`
  ${({ featured, theme }) => css`
    display: block;
    position: relative;
    ${featured
      ? css`
          margin-bottom: 3;
        `
      : css`
          grid-column: 1;
          grid-row: 1 / 4;
        `}
    ${theme.mediaQueries.tablet} {
      margin-top: 2;
      margin-bottom: 9px;

      ${featured
        ? css`
            margin: 0 -4;
            width: calc(100% + (${theme.space[4]}px * 2));
          `
        : ''}
    }
    ${ImageWrapper}, img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  `}
`

const ImagePadding = styled.div<WrapperProps>`
  ${({ featured, theme }) => css`
    width: 100%;
    padding-bottom: 45%;
    ${theme.mediaQueries.tablet} {
      padding-bottom: ${featured ? '80%' : '45%'};
    }
  `}
`

const Wrapper = styled.divBox<WrapperProps>`
  ${({ featured, theme }) => css`
    margin: 0 auto;
    padding: 5 0;
    ${featured
      ? css`
          display: flex;
          flex-direction: column;
          justify-content: center;
          text-align: center;
          max-width: 800px;
          padding-bottom: 8;
        `
      : css`
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: auto auto 1fr;
          grid-gap: 2 5;
          max-width: 1200px;
        `}

    & + & {
      border-top: 1px solid;
    }

    ${theme.mediaQueries.tablet} {
      display: block;
      grid-template-columns: 1fr;
    }
  `}
`

const DateTags = styled.divBox<WrapperProps>`
  ${({ featured, theme }) => css`
    display: flex;
    justify-content: ${featured ? 'center' : 'left'};
    margin-bottom: ${featured ? 3 : 0};

    ${theme.mediaQueries.tablet} {
      grid-row: 1;
      margin-bottom: ${featured ? 2 : 0};
    }
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
          <ImagePadding featured={featured} />
          <Image image={thumbnail} />
        </ImageContainer>
      ) : null}
      <Heading mt={2} mb={featured ? 3 : 2} level={2} weight={2}>
        {title}
      </Heading>
      <Link href={href} as={as}>
        <a>
          <Heading level={5} fontStyle="italic" textDecoration="underline">
            Read More
          </Heading>
        </a>
      </Link>
    </Wrapper>
  )
}
