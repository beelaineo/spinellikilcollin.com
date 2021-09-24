import * as React from 'react'
import {
  ImageTextBlock as ImageTextBlockType,
  TextBlock as TextBlockType,
  Hero,
  Carousel,
} from '../../types'
import { ImageTextBlock } from './ImageTextBlock'
import { TextBlock } from './TextBlock'
import { HeroBlock } from './HeroBlock'
import { CarouselBlock } from './CarouselBlock'

interface ContentBlockProps {
  content: ImageTextBlockType | TextBlockType | Hero | Carousel
}

/**
 * determines the format of the content block and renders the appropriate component
 */

export const ContentBlock = ({ content }: ContentBlockProps) => {
  switch (content.__typename) {
    case 'ImageTextBlock':
      return <ImageTextBlock content={content} />
    case 'TextBlock':
      return <TextBlock content={content} />
    case 'Hero':
      return <HeroBlock hero={content} />
    case 'Carousel':
      return <CarouselBlock content={content} />
    default:
      // @ts-ignore
      console.warn(`No content block for type "${content.__typename}"`)
      return null
  }
}
