import {
  Form,
  Block,
  RichImage,
  CloudinaryVideo,
  Countdown,
  Iframe,
  Maybe,
} from './generated-sanity'

interface BlockNode<T> {
  value: T
  isInline?: boolean
  children: React.ReactNode[]
}

export interface FormBlock extends Omit<Form, '_type'> {
  formSubtitle: Maybe<string> | undefined
  formTitle: Maybe<string> | undefined
  _type: 'form'
}

interface TextBlock extends Omit<Block, '_type'> {
  _type: 'block'
}

interface ImageBlock extends Omit<RichImage, '_type'> {
  _type: 'richImage'
}

interface CloudinaryVideoBlock extends Omit<CloudinaryVideo, '_type'> {
  _type: 'cloudinaryVideo'
}

interface CountDownBlock extends Omit<Countdown, '_type'> {
  _type: 'countdown'
}

interface IframeBlock extends Omit<Iframe, '_type'> {
  _type: 'iframe'
}

export type RichTextBlock =
  | BlockNode<FormBlock>
  | BlockNode<TextBlock>
  | BlockNode<ImageBlock>
  | BlockNode<CloudinaryVideoBlock>
  | BlockNode<CountDownBlock>
  | BlockNode<IframeBlock>

export interface ListBlock {
  type: 'bullet' | 'number'
  level: number
  children: React.ReactNode[]
}
