import * as React from 'react'
import { Placeholder } from '../Placeholder'
import { ImageTextBlock as ImageTextBlockType } from '../../types'
import { ImageText, TextOverImage } from '../Layout/index'
import { RichText } from '../RichText'
import { PageLink } from '../PageLink'
import { Image } from '../Image'
import { getPageLinkUrl } from '../../utils/links'

interface ImageWithoutText {
  content: ImageWithoutText
}

export const ImageWithoutText = (props: ImageWithoutText) => {
  let content = props.content
  return (
    <PageLink>
      <ImageText>
        <img src={content.originalSrc} />
      </ImageText>
    </PageLink>
  )
}
