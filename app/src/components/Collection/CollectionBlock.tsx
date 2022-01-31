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
import { useMedia } from '../../hooks'
import { theme } from '../../theme'

const TextWrapper = styled.div`
  position: relative;
  z-index: 1;
  max-width: 660px;
  h1:first-child,
  h2:first-child,
  h3:first-child,
  h4:first-child,
  h5:first-child,
  h6:first-child,
  p:first-child {
    margin-top: 0px;
    line-height: 1;
    span {
      line-height: 1;
    }
  }
  h1:last-child,
  h2:last-child,
  h3:last-child,
  h4:last-child,
  h5:last-child,
  h6:last-child,
  p:last-child {
    margin-bottom: 0px;
    line-height: 1;
    span {
      line-height: 1;
    }
  }
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
  ${({ backgroundColor, textPosition, textColor, theme }) => css`
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
    padding: 6;
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
    ${theme.mediaQueries.mobile} {
      padding: 4;
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
    body_mobileRaw,
    textPosition,
    textColor,
    backgroundImage,
    backgroundColor,
    cloudinaryVideo,
  } = collectionBlock
  const imageSizes =
    format === 'wide'
      ? '(max-width: 1000px) 120vw, 75vw'
      : '(max-width: 600px) 120vw, (max-width: 780px) 120vw, (max-width: 1000px) 50vw, 40vw'

  const isMobile = useMedia({
    maxWidth: `${theme.breakpoints?.md || '650'}px`,
  })

  return (
    <Wrapper
      backgroundColor={backgroundColor}
      textPosition={textPosition}
      textColor={textColor}
    >
      {body || bodyRaw ? (
        <TextWrapper>
          <RichText
            weight={2}
            body={isMobile && body_mobileRaw ? body_mobileRaw : body || bodyRaw}
          />
        </TextWrapper>
      ) : null}
      <Padding format={format} />
      {cloudinaryVideo ? <CloudinaryVideo video={cloudinaryVideo} /> : null}
      <Image image={backgroundImage} sizes={imageSizes} />
    </Wrapper>
  )
}
