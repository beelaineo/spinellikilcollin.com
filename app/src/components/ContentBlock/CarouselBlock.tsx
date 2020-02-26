import * as React from 'react'
import styled from '@xstyled/styled-components'
import { Carousel } from '../../types'
import { CollectionCarousel, ItemsCarousel } from '../Carousel'
import { Heading } from '../Text'

const CarouselBlockStyled = styled.div`
  padding: 6;
  grid-column: span 2;
  text-align: center;
`
interface CarouselBlockProps {
  content: Carousel
}

const CarouselContainer = styled.div`
  height: 400px;
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
  return (
    <CarouselBlockStyled>
      <Heading level={2}>{title}</Heading>
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
