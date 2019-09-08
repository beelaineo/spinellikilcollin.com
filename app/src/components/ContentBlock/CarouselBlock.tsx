import * as React from 'react'
import { Carousel } from '../../types'
import { Placeholder } from '../Placeholder'

interface CarouselBlockProps {
  carousel: Carousel
}

/**
 * Carousel Block
 *
 * When given props.collection, uses items from that collection
 * to populate a carousel.
 *
 * Otherwise, uses props.items for the carousel
 */

export const CarouselBlock = (props: CarouselBlockProps) => {
  return <Placeholder label="Carousel Block" data={props} />
}
