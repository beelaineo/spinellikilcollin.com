import * as React from 'react'
import { Carousel, ContentBlock, Hero } from '../../types'
import { CarouselSection } from './CarouselSection'
import { NormalSection } from './NormalSection'
import { Wrapper, Inner } from './styled'
import { Image } from '../Image'

interface ContentSectionProps {
  content: Carousel | ContentBlock | Hero
}

export const ContentSection = (props: ContentSectionProps) => {
  const { content } = props
  return null
  // const BlockForType =
  //   section.layout === 'carousel' ? CarouselSection : NormalSection
  // return (
  //   <Wrapper section={section}>
  //     {section.backgroundImage ? (
  //       <Image image={section.backgroundImage} />
  //     ) : null}
  //     <Inner section={section}>
  //       <BlockForType section={section} />
  //     </Inner>
  //   </Wrapper>
  // )
}
