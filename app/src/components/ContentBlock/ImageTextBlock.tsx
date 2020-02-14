import * as React from 'react'
import { Placeholder } from '../Placeholder'
import { ImageTextBlock as ImageTextBlockType } from '../../types'
import { ImageText, TextOverImage } from '../Layout/index'
import { RichText } from '../RichText'
import { PageLink } from '../PageLink'
import { Image } from '../Image'
import { getPageLinkUrl } from '../../utils/links'

interface ImageTextBlockProps {
  content: ImageTextBlockType
}

export const ImageTextBlock = (props: ImageTextBlockProps) => {
  const content = props.content
  const width = content.layout

  const link = content.link ? content.link[0] : undefined

  const renderInner = () => (
    <ImageText textAlign={content.textPosition}>
      <Image image={content.backgroundImage} ratio={1} />
      <TextOverImage textAlign={content.textPosition}>
        <RichText body={content.bodyRaw} />
        {props.content.ctaText}
      </TextOverImage>
    </ImageText>
  )

  return link ? (
    // @ts-ignore
    <PageLink link={link}>{renderInner()}</PageLink>
  ) : (
    renderInner()
  )
}
