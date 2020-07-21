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

    video {
      display: block;
    }

    ${theme.mediaQueries.mobile} {
      overflow: hidden;
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
    padding: calc(${theme.navHeight} + ${theme.space[6]}px) 6 6;
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
      padding: calc(${theme.mobileNavHeight} + ${theme.space[4]}px) 4 4;
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
  } = hero

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
            {image ? <Image image={image} /> : null}
            {mobileImage ? <Image image={mobileImage} /> : null}
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
