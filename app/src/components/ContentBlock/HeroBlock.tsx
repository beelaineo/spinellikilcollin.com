import * as React from 'react'
import styled, { css, DefaultTheme } from '@xstyled/styled-components'
import {
  getColor,
  getFlexJustification,
  getFlexAlignment,
  getTextAlignment,
} from '../../theme/utils'
import { Image } from '../Image'
import { Hero } from '../../types'
import { RichText } from '../RichText'
import { DocumentLink } from '../DocumentLink'
import { CloudinaryVideo } from '../CloudinaryVideo'

const HeroWrapper = styled.div`
  ${({ theme }) => css`
    position: relative;
    z-index: 0;
    grid-column: span 2;
    overflow: hidden;

    ${theme.mediaQueries.mobile} {
      overflow: hidden;
      max-height: 500px;
      height: 100vw;
    }
  `}
`

interface HeroTextProps {
  theme: DefaultTheme
  textPosition?: string | null | undefined
  textColor?: string | null
  textPositionMobile?: string | null
  textColorMobile?: string | null
}

const HeroText = styled.div`
  ${({
    theme,
    textPosition,
    textColor,
    textPositionMobile,
    textColorMobile,
  }: HeroTextProps) => css`
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 6;
    display: flex;
    justify-content: ${textPosition
      ? getFlexJustification(textPosition)
      : 'center'};
    align-items: ${textPosition ? getFlexAlignment(textPosition) : 'center'};
    text-align: ${textPosition ? getTextAlignment(textPosition) : 'center'};
    color: ${textColor ? getColor(textColor) : 'inherit'};

    .text-container {
      max-width: 400px;

      > * {
        pointer-events: auto;
      }
    }

    ${theme.mediaQueries.mobile} {
      justify-content: ${getFlexJustification(textPositionMobile)};
      align-items: ${getFlexAlignment(textPositionMobile)};
      text-align: ${getTextAlignment(textPositionMobile)};
      color: ${getColor(textColorMobile)};
    }
  `}
`

const HeroImageWrapper = styled.div`
  ${({ theme }) => css`
    width: 100%;

    video {
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    & > *:nth-of-type(2) {
      display: none;
    }

    ${theme.mediaQueries.mobile} {
      & > *:nth-of-type(1) {
        display: none;
      }
      & > *:last-child {
        display: block;
      }
    }
  `}
`

interface HeroBlockProps {
  hero: Hero
}

export const HeroBlock = ({ hero }: HeroBlockProps) => {
  const {
    textPosition,
    textColor,
    heroLink,
    bodyRaw,
    image,
    textPositionMobile,
    textColorMobile,
    cloudinaryVideo,
    cloudinaryVideoMobile,
    mobileImage,
    aspectRatio,
  } = hero

  const ratio = aspectRatio || 0.5

  return (
    <HeroWrapper>
      <DocumentLink document={heroLink?.document ?? undefined}>
        {cloudinaryVideo ? (
          <HeroImageWrapper>
            <CloudinaryVideo video={cloudinaryVideo} />
            {cloudinaryVideoMobile ? (
              <CloudinaryVideo video={cloudinaryVideoMobile} />
            ) : null}
          </HeroImageWrapper>
        ) : (
          <HeroImageWrapper>
            {image ? <Image ratio={ratio} image={image} /> : null}
            {<Image ratio={1} image={mobileImage || image} />}
          </HeroImageWrapper>
        )}
        <HeroText
          textPosition={textPosition}
          textColor={textColor}
          textPositionMobile={textPositionMobile}
          textColorMobile={textColorMobile}
        >
          <div className="text-container">
            <RichText body={bodyRaw} />
          </div>
        </HeroText>
      </DocumentLink>
    </HeroWrapper>
  )
}
