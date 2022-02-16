import * as React from 'react'
import {
  ImageTextBlock as ImageTextBlockType,
  TextBlock as TextBlockType,
  EmbedBlock as EmbedBlockType,
  Hero,
  Carousel,
} from '../../types'
import { ImageTextBlock } from './ImageTextBlock'
import { TextBlock } from './TextBlock'
import { HeroBlock } from './HeroBlock'
import { CarouselBlock } from './CarouselBlock'
import { EmbedBlock } from './EmbedBlock'

interface ContentBlockProps {
  content: ImageTextBlockType | TextBlockType | Hero | Carousel | EmbedBlockType
}

/**
 * determines the format of the content block and renders the appropriate component
 */

// eslint-disable-next-line react/display-name
export const ContentBlock = React.forwardRef(
  ({ content }: ContentBlockProps, ref: React.ForwardedRef<HTMLDivElement>) => {
    switch (content.__typename) {
      case 'ImageTextBlock':
        return <ImageTextBlock content={content} />
      case 'TextBlock':
        return <TextBlock content={content} />
      case 'Hero':
        return <HeroBlock hero={content} ref={ref} />
      case 'Carousel':
        return <CarouselBlock content={content} />
      case 'EmbedBlock':
        return <EmbedBlock content={content} />
      default:
        // @ts-ignore
        console.warn(`No content block for type "${content.__typename}"`)
        return null
    }
  },
)
