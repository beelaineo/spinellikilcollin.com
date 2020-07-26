import * as React from 'react'
import styled, { css } from '@xstyled/styled-components'
import { CollectionBlock as CollectionBlockType } from '../../types'
import { Image, ImageWrapper } from '../Image'
import { VideoWrapper } from '../CloudinaryVideo/styled'
import { RichText } from '../RichText'
import { CloudinaryVideo } from '../CloudinaryVideo'
import {
  getColor,
  getTextAlignment,
  getFlexAlignment,
  getFlexJustification,
} from '../../theme/utils'

const TextWrapper = styled.div`
  position: relative;
  z-index: 1;
  max-width: 660px;
  margin: 0 auto;
`

type WrapperProps = Pick<
  CollectionBlockType,
  'backgroundColor' | 'textColor' | 'textPosition'
>

interface WithFormat {
  format?: string | null
}

const Padding = styled.div<WithFormat>`
  ${({ theme, format }) => css`
    content: '';
    display: inline-block;
    width: 1px;
    height: 0;
    padding-bottom: ${format === 'wide'
      ? '50%'
      : format === 'tall'
      ? '200%'
      : 'auto'};

    ${theme.mediaQueries.mobile} {
      padding-bottom: ${format === 'wide'
        ? '100%'
        : format === 'tall'
        ? '200%'
        : 'auto'};
    }
  `}
`

const Wrapper = styled.div<WrapperProps>`
  ${({ backgroundColor, textPosition, textColor }) => css`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: ${getColor(backgroundColor)};
    color: ${getColor(textColor)};
    display: flex;
    align-items: ${getFlexAlignment(textPosition)};
    justify-content: ${getFlexJustification(textPosition)};
    text-align: ${getTextAlignment(textPosition)};
    padding: 3 6;
    ${VideoWrapper},
    ${ImageWrapper},
    img,
    picture,
    video {
      position: absolute;
      object-fit: cover;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
    }
  `}
`
interface CollectionBlockProps {
  collectionBlock: CollectionBlockType
  format?: string | null
}

export const CollectionBlock = ({
  format,
  collectionBlock,
}: CollectionBlockProps) => {
  const {
    body,
    bodyRaw,
    textPosition,
    textColor,
    backgroundImage,
    backgroundColor,
    cloudinaryVideo,
  } = collectionBlock
  return (
    <Wrapper
      backgroundColor={backgroundColor}
      textPosition={textPosition}
      textColor={textColor}
    >
      {body || bodyRaw ? (
        <TextWrapper>
          <RichText weight={2} body={body || bodyRaw} />
        </TextWrapper>
      ) : null}
      <Padding format={format} />
      {cloudinaryVideo ? <CloudinaryVideo video={cloudinaryVideo} /> : null}
      <Image
        image={backgroundImage}
        sizes="(min-width: 600px) 100vw, (min-width: 780px) 50vw, 30vw"
      />
    </Wrapper>
  )
}
