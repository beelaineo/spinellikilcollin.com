import * as React from 'react'
import Link from 'next/link'
import styled, { css } from '@xstyled/styled-components'
import { Carousel } from '../../types'
import { CollectionCarousel, ItemsCarousel } from '../Carousel'
import { Heading } from '../Text'

const CarouselBlockStyled = styled.div`
  ${({ theme }) => css`
    padding: 8 0;
    grid-column: span 2;
    text-align: center;
    background-color: body.0;

    a {
      text-decoration: none;

      position: relative;
      &:focus-visible {
        ${theme.focus.bottom()}
      }
    }

    ${theme.mediaQueries.mobile} {
      padding: 6 0 52px 0;
      overflow: hidden;
    }
  `}
`
interface CarouselBlockProps {
  content: Carousel
}

const CarouselContainer = styled.div`
  margin-top: 6;
`

/**
 * Carousel Block
 *
 * When given props.collection, uses items from that collection
 * to populate a carousel.
 *
 * Otherwise, uses props.items for the carousel
 */

export const CarouselBlock = ({ content }: CarouselBlockProps) => {
  const { title, collection, items } = content

  const linkAs = collection ? `/collections/${collection.handle}` : ''
  return (
    <CarouselBlockStyled>
      {collection ? (
        <Heading level={4}>
          <Link
            href="/collections/[collectionSlug]"
            as={linkAs}
            aria-label={'Link to ' + title + ' collection'}
          >
            {title}
          </Link>
        </Heading>
      ) : (
        <Heading level={4}>{title}</Heading>
      )}
      <CarouselContainer>
        {collection && collection.__typename == 'Collection' ? (
          <CollectionCarousel collection={collection} />
        ) : items ? (
          <ItemsCarousel items={items} />
        ) : null}
      </CarouselContainer>
    </CarouselBlockStyled>
  )
}
