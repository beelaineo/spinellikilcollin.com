import React, { ReactNode } from 'react'
import styled, { css } from '@xstyled/styled-components'
import { DefaultTheme } from 'styled-components'

import {
  getColor,
  getBackgroundColor,
  getFlexJustification,
  getFlexAlignment,
  getTextAlignment,
} from '../../theme/utils'
import { Image } from '../Image'
import { Hero, Maybe } from '../../types'
import { RichText } from '../RichText'
import { DocumentLink } from '../DocumentLink'
import { CloudinaryVideo } from '../CloudinaryVideo'
import { CTA } from '../CTA'
import { definitely } from '../../utils'
import { useInViewport, useMedia } from '../../hooks'
import { theme } from '../../theme'
import { useNavigation, useSearch } from '../../providers'
import { Heading } from '../Text'

const { useEffect, useRef } = React

interface HeroWrapperProps {
  $hero: Hero
  ref?: React.ForwardedRef<HTMLDivElement>
  $minimalDisplay?: Maybe<boolean>
}

export const HeroWrapper = styled.div<HeroWrapperProps>`
  ${({ theme, $hero, $minimalDisplay }) => css`
    display: ${$hero.layout?.includes('flex') ? 'flex' : 'block'};
    margin-bottom: ${$minimalDisplay === true ? '-76px' : 'inherit'};
    position: relative;
    z-index: 0;
    grid-column: span 2;
    background-color: ${$hero.backgroundColor === 'custom'
      ? $hero.backgroundColorCustom?.hex
      : $hero.backgroundColor
      ? getColor($hero.backgroundColor)
      : 'inherit'};
    video {
      display: block;
    }

    a:focus-visible {
      ${theme.focus.bottom(-2)}
    }

    ${theme.mediaQueries.tablet} {
      margin-bottom: ${$minimalDisplay === true ? '-76px' : 'inherit'};
    }

    ${theme.mediaQueries.mobile} {
      background-color: ${$hero.mobileBackgroundColor === 'custom' &&
      $hero.mobileBackgroundColorCustom
        ? $hero.mobileBackgroundColorCustom?.hex
        : $hero.mobileBackgroundColor
        ? $hero.mobileBackgroundColor
        : $hero.backgroundColor === 'custom' && $hero.backgroundColorCustom
        ? $hero.backgroundColorCustom?.hex
        : $hero.backgroundColor
        ? getColor($hero.backgroundColor)
        : 'inherit'};
      flex-direction: column;

      margin-bottom: ${$minimalDisplay === true ? '-63px' : 'inherit'};
      padding-bottom: ${$minimalDisplay === true ? '63px' : 'inherit'};
    }
  `}
`

interface HeroTextProps {
  theme: DefaultTheme
  $hero: Hero
  $minimalDisplay?: Maybe<boolean>
  $textPosition?: string | null | undefined
  $textColor?: string | null
  $textPositionMobile?: string | null
  $textColorMobile?: string | null
  $textContainer?: string | null
  $textXL?: boolean | null
}

const HeroText = styled.div<HeroTextProps>`
  ${({
    theme,
    $hero,
    $minimalDisplay,
    $textPosition,
    $textColor,
    $textPositionMobile,
    $textXL,
    $textColorMobile,
    $textContainer,
  }) => css`
    pointer-events: none;
    position: ${$hero.layout?.includes('flex') ? 'static' : 'absolute'};
    top: 0;
    left: 0;
    width: ${$hero.layout?.includes('flex') ? '50%' : '100%'};
    height: 100%;
    padding: calc(${theme.navHeight} + ${theme.space[6]}px) 6 6;
    ${
      $minimalDisplay
        ? `padding: calc(${theme.navHeight} + ${theme.space[4]}px) 6 ${theme.navHeight} 6;`
        : null
    }
    display: flex;
    justify-content: ${
      $textPosition ? getFlexJustification($textPosition) : 'center'
    };
    align-items: ${$textPosition ? getFlexAlignment($textPosition) : 'center'};
    text-align: ${$textPosition ? getTextAlignment($textPosition) : 'center'};
    color: ${
      $textColor === 'custom' && $hero.textColorCustom
        ? $hero.textColorCustom?.hex
        : $textColor
        ? getColor($textColor)
        : 'inherit'
    };

    

    .text-container {
      ${
        $textXL
          ? 'max-width: 90vw;'
          : $textContainer == 'full'
          ? 'max-width: 720px;'
          : $textContainer == 'half-left' || $textContainer == 'half-right'
          ? 'max-width: 60%;'
          : 'max-width: 400px'
      };


      ${
        $textContainer == 'half-top' || $textContainer == 'half-bottom'
          ? 'max-height: 60%;'
          : null
      }

      > * {
        pointer-events: auto;
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6,
      p {
        margin-bottom: 0px;
        line-height: 1.3em;
        span {
          line-height: 1.3em;
        }
      }

      h1,
      h2 {
        line-height: 1.2em;
        span {
          line-height: 1.2em;
        }
      }

      ${
        !$hero.cta
          ? `
        h1:first-child,
        h2:first-child,
        h3:first-child,
        h4:first-child,
        h5:first-child,
        h6:first-child,
        p:first-child {
          margin-top: 0px;
        }
        h1:last-child,
        h2:last-child,
        h3:last-child,
        h4:last-child,
        h5:last-child,
        h6:last-child,
        p:last-child {
          margin-bottom: 0px;
        }
      `
          : ''
      }
    }

    }
    h1 {
      font-size: ${
        $textContainer == 'full' && $textXL ? '14vw' : theme.fontSizes[1]
      };

    }
    ${theme.mediaQueries.tablet} {
      ${
        $minimalDisplay
          ? `padding: calc(${theme.navHeight} + ${theme.space[2]}px) 4 10 6;`
          : null
      }

      ${
        $textContainer == 'full'
          ? `h1 {
              font-size: ${$textXL ? '14vw' : theme.mobileFontSizes[1]};
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
          : ''
      }
    }

    ${theme.mediaQueries.mobile} {
      justify-content: ${getFlexJustification($textPositionMobile)};
      align-items: ${getFlexAlignment($textPositionMobile)};
      text-align: ${
        $textPositionMobile ? getTextAlignment($textPositionMobile) : 'center'
      };
      color: ${$textColorMobile ? getColor($textColorMobile) : 'inherit'};
      padding: ${
        $minimalDisplay
          ? `4;`
          : `calc(${theme.mobileNavHeight} + ${theme.space[4]}px) 4 4;`
      }
      
      width: 100%;
      min-height: ${$hero.layout?.includes('flex') ? '40vw' : 'auto'};

      color: ${
        $textColorMobile === 'custom' && $hero.textColorMobileCustom
          ? $hero.textColorMobileCustom?.hex
          : $hero.textColorMobile
          ? $hero.textColorMobile
          : $hero.textColor === 'custom' && $hero.textColorCustom
          ? $hero.textColorCustom?.hex
          : $hero.textColor
          ? getColor($hero.textColor)
          : 'inherit'
      };
    }
  `}
`

const CtaOuter = styled.div`
  margin: 2 0 0 0;
  color: inherit;
`

const CtaWrapper = styled.span`
  color: inherit;
  text-decoration: none;
  padding-top: 3;
  padding-bottom: 0px;
  border-bottom: 1px solid;
  display: inline-block;
  cursor: pointer;
`

interface HeroImageWrapperProps {
  $hero: Hero
  ref?: React.ForwardedRef<HTMLDivElement>
}

const HeroImageWrapper = styled.div<HeroImageWrapperProps>`
  ${({ theme, $hero }) => css`
    width: ${$hero.layout?.includes('flex') ? '50%' : '100%'};
    order: ${$hero.layout === 'flex-left' ? '1' : '0'};

    video {
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    ${$hero.layout?.includes('flex')
      ? `& > div {
      height: 100%;
      & > picture {
        height: 100%;
        & > img {
          height: 100%;
        }
      }
    }`
      : ''}

    & > *:nth-of-type(2) {
      display: none;
    }

    ${theme.mediaQueries.mobile} {
      order: 0;
      width: 100%;

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
  $hero: Hero
  $minimalDisplay?: Maybe<boolean>
}

// eslint-disable-next-line react/display-name
export const HeroBlock = React.forwardRef(
  (
    { $hero, $minimalDisplay }: HeroBlockProps,
    ref: React.ForwardedRef<HTMLDivElement>,
  ) => {
    const {
      textPosition,
      textColor,
      textContainer,
      textXL,
      heroLink,
      bodyRaw,
      body_mobileRaw,
      image,
      textPositionMobile,
      textColorMobile,
      cloudinaryVideo,
      cloudinaryVideoMobile,
      mobileImage,
      header_color,
      cta: ctas,
    } = $hero
    const cta = definitely(ctas).length ? definitely(ctas)[0] : null
    const isMobile = useMedia({
      maxWidth: `${theme.breakpoints?.md || '650'}px`,
    })

    const heroRef = useRef<HTMLDivElement>(null)
    const { setColorTheme } = useNavigation()
    const searchOpen = useSearch().open
    const { isInView } = useInViewport(heroRef, '-55px 0px')

    useEffect(() => {
      header_color == 'light' && isInView && !searchOpen
        ? setColorTheme('light')
        : setColorTheme('dark')
    }, [isInView, searchOpen])

    useEffect(() => {
      return () => {
        setColorTheme('dark')
      }
    }, [])

    return (
      <HeroWrapper $hero={$hero} ref={ref} $minimalDisplay={$minimalDisplay}>
        <DocumentLink document={heroLink?.document ?? undefined}>
          {cloudinaryVideo?.videoId ? (
            <HeroImageWrapper $hero={$hero} ref={heroRef}>
              <CloudinaryVideo video={cloudinaryVideo} />
              {cloudinaryVideoMobile ? (
                <CloudinaryVideo video={cloudinaryVideoMobile} />
              ) : null}
            </HeroImageWrapper>
          ) : (
            <HeroImageWrapper $hero={$hero} ref={heroRef}>
              {image ? <Image image={image} preload loading="eager" /> : null}
              {mobileImage ? <Image image={mobileImage} /> : null}
            </HeroImageWrapper>
          )}
          <HeroText
            $textPosition={textPosition}
            $textXL={textXL}
            $textColor={textColor}
            $textPositionMobile={textPositionMobile}
            $textColorMobile={textColorMobile}
            $textContainer={textContainer}
            $minimalDisplay={$minimalDisplay}
            $hero={$hero}
          >
            <div className="text-container">
              <RichText
                body={isMobile && body_mobileRaw ? body_mobileRaw : bodyRaw}
              />
              {cta ? (
                <CtaOuter>
                  <CtaWrapper>
                    <Heading level={4} my={0} fontStyle="italic">
                      {cta.label}
                    </Heading>
                  </CtaWrapper>
                </CtaOuter>
              ) : null}
            </div>
          </HeroText>
        </DocumentLink>
      </HeroWrapper>
    )
  },
)
