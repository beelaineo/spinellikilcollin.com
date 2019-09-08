import * as React from 'react'
import { Placeholder } from '../Placeholder'
import { ImageTextBlock as ImageTextBlockType } from '../../types'

interface ImageTextBlockProps {
  content: ImageTextBlockType
}

export const ImageTextBlock = (props: ImageTextBlockProps) => {
  return <Placeholder label="Image + Text Block" data={props} />
}
