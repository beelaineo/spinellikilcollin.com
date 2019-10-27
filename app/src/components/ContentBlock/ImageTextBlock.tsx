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
  let content = props.content
  let background = ''
  let width = content.layout

  if (content.backgroundImage !== null) {
    background = content.backgroundImage.asset.url
  }

  const link = content.link ? content.link[0] : undefined
  console.log(content)
  return (
    <PageLink link={link}>
      <ImageText textAlign={content.textPosition}>
        <Image image={content.backgroundImage} ratio={1} />
        <TextOverImage textAlign={content.textPosition}>
          <RichText body={content.bodyRaw} />
          <PageLink link={link}>{props.content.ctaText}</PageLink>
        </TextOverImage>
      </ImageText>
    </PageLink>
  )
}
