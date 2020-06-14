import * as React from 'react'
import Link from 'next/link'
import styled, { css } from '@xstyled/styled-components'
import { Carousel } from '../../types'
import { CollectionCarousel, ItemsCarousel } from '../Carousel'
import { Heading } from '../Text'

const CarouselBlockStyled = styled.div`
  ${({ theme }) => css`
    padding: 6;
    grid-column: span 2;
    text-align: center;
    background-color: body.0;

    ${theme.mediaQueries.mobile} {
      padding: 5 0;
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
  console.log(content)

  const linkAs = collection ? `/collections/${collection.handle}` : ''
  return (
    <CarouselBlockStyled>
      {collection ? (
        <Heading level={3}>
          <Link href="/collections/[collectionSlug]" as={linkAs}>
            <a>{title}</a>
          </Link>
        </Heading>
      ) : (
        <Heading level={3}>{title}</Heading>
      )}
      <CarouselContainer>
        {collection ? (
          <CollectionCarousel collection={collection} />
        ) : items ? (
          <ItemsCarousel items={items} />
        ) : null}
      </CarouselContainer>
    </CarouselBlockStyled>
  )
}
