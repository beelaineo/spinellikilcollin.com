import * as React from 'react'
import { TextBlock as TextBlockType } from '../../types'
import { Heading } from '../Text'
import { TextBlockWrapper } from './styled'
import { RichText } from '../RichText'
import { CTA } from '../CTA'

export interface TextBlockProps {
  block: TextBlockType
}

export const TextBlock = ({ block }: TextBlockProps) => {
  const { title, bodyRaw, cta } = block
  return (
    <TextBlockWrapper>
      <Heading level={2}>{title}</Heading>
      {bodyRaw ? <RichText body={bodyRaw} /> : null}
      {cta ? <CTA cta={cta} /> : null}
    </TextBlockWrapper>
  )
}
