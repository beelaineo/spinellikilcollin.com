import * as React from 'react'
import { Placeholder } from '../Placeholder'
import { ImageTextBlock as ImageTextBlockType } from '../../types'
import { ImageText } from '../Layout/index'
import { RichText } from '../RichText'
import { Image } from '../Image'

interface ImageTextBlockProps {
  content: ImageTextBlockType
}

export const ImageTextBlock = (props: ImageTextBlockProps) => {
  let content = props.content
  let [background, link] = ''
  let width = content.layout

  if (content.backgroundImage !== null) {
    background = content.backgroundImage.asset.url
  }
  if (content.link && content.link[0]._type === 'pageLink') {
    link = content.link[0].document.title
  } else if (content.link) {
    link = content.link[0].url
  }
  return (
    <a href={`/${link}`}>
      <ImageText textAlign={content.textPosition}>
        <Image image={content.backgroundImage} ratio={1} />
        <div>
          <RichText body={content.bodyRaw} />
          <span>{props.content.ctaText}</span>
        </div>
      </ImageText>
    </a>
  )
}
