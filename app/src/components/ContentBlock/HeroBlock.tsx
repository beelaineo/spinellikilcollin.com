import React, { ReactNode } from 'react'
import styled, { css, DefaultTheme } from '@xstyled/styled-components'
import {
  getColor,
  getBackgroundColor,
  getFlexJustification,
  getFlexAlignment,
  getTextAlignment,
} from '../../theme/utils'
import { Image } from '../Image'
import { Hero } from '../../types'
import { RichText } from '../RichText'
import { DocumentLink } from '../DocumentLink'
import { CloudinaryVideo } from '../CloudinaryVideo'
import { CTA } from '../CTA'
import { definitely } from '../../utils'
import { useMedia } from '../../hooks'

interface HeroWrapperProps {
  hero: Hero
  ref?: React.ForwardedRef<HTMLDivElement>
}

export const HeroWrapper = styled.div<HeroWrapperProps>`
  ${({ theme, hero }) => css`
    position: relative;
    z-index: 0;
    grid-column: span 2;
    overflow: hidden;
    background-color: ${getBackgroundColor(hero.backgroundColor)};
    video {
      display: block;
    }

    ${theme.mediaQueries.mobile} {
      background-color: ${getBackgroundColor(
        hero.mobileBackgroundColor || hero.backgroundColor,
      )};
      overflow: hidden;
    }
  `}
`

interface HeroTextProps {
  theme: DefaultTheme
  hero: Hero
  textPosition?: string | null | undefined
  textColor?: string | null
  textPositionMobile?: string | null
  textColorMobile?: string | null
  textContainer?: string | null
}

const HeroText = styled.div`
  ${({
    theme,
    hero,
    textPosition,
    textColor,
    textPositionMobile,
    textColorMobile,
    textContainer,
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
      ${textContainer == 'full' ? 'max-width: 720px;' : 'max-width: 400px'};

      > * {
        pointer-events: auto;
      }

      ${!hero.cta
        ? `
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
        : ''}
    }

    ${theme.mediaQueries.tablet} {
      ${textContainer == 'full'
        ? `h1 {
              font-size: ${theme.mobileFontSizes[1]};
            }
            h2 {
              font-size: ${theme.mobileFontSizes[2]};
            }
            h3 {
              font-size: ${theme.mobileFontSizes[3]};
            }
            p,
            h4 {
              font-size: ${theme.mobileFontSizes[4]};
            }
            h5 {
              font-size: ${theme.mobileFontSizes[5]};
            }
            h6 {
              font-size: ${theme.mobileFontSizes[6]};
            }`
        : ''}
    }

    ${theme.mediaQueries.mobile} {
      justify-content: ${getFlexJustification(textPositionMobile)};
      align-items: ${getFlexAlignment(textPositionMobile)};
      text-align: ${textPositionMobile
        ? getTextAlignment(textPositionMobile)
        : 'center'};
      color: ${textColorMobile ? getColor(textColorMobile) : 'inherit'};
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

// eslint-disable-next-line react/display-name
export const HeroBlock = React.forwardRef(
  ({ hero }: HeroBlockProps, ref: React.ForwardedRef<HTMLDivElement>) => {
    const {
      textPosition,
      textColor,
      textContainer,
      heroLink,
      bodyRaw,
      body_mobileRaw,
      image,
      textPositionMobile,
      textColorMobile,
      cloudinaryVideo,
      cloudinaryVideoMobile,
      mobileImage,
      cta: ctas,
    } = hero
    const cta = definitely(ctas).length ? definitely(ctas)[0] : null
    const isWide = useMedia({ minWidth: '1000px' })
    return (
      <HeroWrapper hero={hero} ref={ref}>
        <DocumentLink document={heroLink?.document ?? undefined}>
          {cloudinaryVideo?.videoId ? (
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
            textContainer={textContainer}
            hero={hero}
          >
            <div className="text-container">
              <RichText body={isWide ? bodyRaw : body_mobileRaw} />
              {cta ? <CTA cta={cta} /> : null}
            </div>
          </HeroText>
        </DocumentLink>
      </HeroWrapper>
    )
  },
)
