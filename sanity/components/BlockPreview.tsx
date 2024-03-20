import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import {Loading} from './Loading'
import {Stack, Text, Card} from '@sanity/ui'
import {PreviewLayoutKey, PreviewProps} from 'sanity'

const Wrapper = styled.div
const Image = styled.img
const TextWrapper = styled.div
const Title = styled.p
const Subtitle = styled.h4

// TypeScript (optional): Define types for your props
interface BlockPreviewProps extends PreviewProps<PreviewLayoutKey> {
  body?: any
  ctaText?: string
  media?: any
  link?: string
  linkTitle?: string
  _type?: string
}

export const BlockPreview: React.FC<BlockPreviewProps> = (props) => {
  const {media, body, ctaText, link, linkTitle, _type, renderDefault} = props
  console.log('BlockPreview props', props)

  if (_type === 'imageTextBlock') {
    if (body) {
      props.title = body
      return <Stack space={3}>{renderDefault(props)}</Stack>
    }
    if (!body && !ctaText && !link && !media && !linkTitle) {
      return <Stack space={3}>Untitled</Stack>
    }
    if (renderDefault && !body && !ctaText && !link && !media) {
      return <Stack space={3}>{renderDefault(props)}</Stack>
    }
    if (linkTitle && link) {
      return <Stack space={3}>{linkTitle}</Stack>
    }
    if (media) {
      return <div>{renderDefault(props)}</div>
    }
  }

  return <Stack space={3}>Untitled</Stack>
}
