import * as React from 'react'
import styled from '@xstyled/styled-components'
import { Carousel } from '../../types'
import { CollectionCarousel, ItemsCarousel } from '../Carousel'
import { Placeholder } from '../Placeholder'
import { CarouselBlockStyled, Square } from '../Layout/Containers'
import { Header2, Header5 } from '../Text'
import { FlexContainer, FlexSix } from '../Layout/Flex'

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
      <Header2>{title}</Header2>
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
