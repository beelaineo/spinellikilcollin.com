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

interface HeroBackground {
  theme: DefaultTheme
}

const HeroWrapper = styled.div`
  position: relative;
  z-index: 0;
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
    & > div:nth-of-type(2) {
      display: none;
    }

    ${theme.mediaQueries.mobile} {
      & > div:nth-of-type(1) {
        display: none;
      }
      & > div:last-child {
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
    bodyRaw,
    image,
    textPositionMobile,
    textColorMobile,
    mobileImage,
  } = hero

  return (
    <HeroWrapper>
      <HeroImageWrapper>
        {image ? <Image ratio={0.45} image={image} /> : null}
        {mobileImage ? (
          <Image ratio={1.5} image={mobileImage || image} />
        ) : null}
      </HeroImageWrapper>
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
    </HeroWrapper>
  )
}
