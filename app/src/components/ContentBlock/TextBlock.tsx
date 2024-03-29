import * as React from 'react'
import styled, { Box, css } from '@xstyled/styled-components'
import { TextBlock as TextBlockType, RichImage } from '../../types'
import { RichText } from '../RichText'
import { useMedia } from '../../hooks'
import { theme } from '../../theme'

interface WrapperProps {
  backgroundImage?: RichImage | null
  layout?: string | null
}

const Wrapper = styled.div<WrapperProps>`
  ${({ theme, layout, backgroundImage }) => css`
    height: 100%;
    position: relative;
    width: 100%;
    background-color: body.0;
    grid-column: ${layout === 'fullWidth' ? '1 / 3' : 'auto'};
    background-image: ${backgroundImage
      ? `url(${backgroundImage.asset?.url})`
      : 'none'};

    ${theme.mediaQueries.mobile} {
      grid-column: auto;
      height: auto;
      position: static;
    }
  `}
`

interface TextWrapperProps {
  textAlignment: string | null | undefined
  layout?: string | null
  backgroundImage?: RichImage | null
}

const TextWrapper = styled.div<TextWrapperProps>`
  ${({ textAlignment, layout, backgroundImage, theme }) => css`
    margin: ${backgroundImage ? '0 48px' : '48px'};
    padding: ${backgroundImage ? '48px 0' : '0'};
    min-height: calc(50vh - 96px);
    height: calc(100% - 96px);
    width: auto;
    z-index: 10;
    display: flex;
    text-align: ${textAlignment};
    align-items: center;
    justify-content: ${textAlignment == 'center' ? 'center' : 'initial'};

    h1,
    h2,
    h3,
    h4,
    h5 {
      margin: 0;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    p {
      white-space: pre-wrap;
    }

    ${layout === 'fullWidth'
      ? `& > div {
        flex: 1;
      }`
      : ''}

    ${layout !== 'fullWidth'
      ? `& > div > div {
      max-width: 500px;
    }

    @media screen and (min-width: 1680px) {
      & > div > div {
        max-width: 700px;
      }
    }`
      : ''}

    ${theme.mediaQueries.tablet} {
      p {
        font-size: ${theme.tabletFontSizes[5]};
      }
    }

    ${theme.mediaQueries.mobile} {
      min-height: unset;
      margin: ${backgroundImage ? '0 36px' : '36px'};
      padding: ${backgroundImage ? '36px 0' : '0'};
      position: static;
      top: unset;
      left: unset;
      height: auto;
      min-height: unset;
      display: block;
      text-align: ${textAlignment};
    }
  `}
`

interface TextBlockProps {
  content: TextBlockType
}

export const TextBlock = ({ content }: TextBlockProps) => {
  const { alignment, backgroundImage, layout } = content
  const textColor = content.textColor === 'light' ? 'grays.0' : 'grays.9'
  const isMobile = useMedia({
    maxWidth: `${theme.breakpoints?.md || '650'}px`,
  })
  return (
    <Wrapper layout={layout} backgroundImage={backgroundImage}>
      <TextWrapper
        textAlignment={alignment}
        layout={layout}
        backgroundImage={backgroundImage}
      >
        <Box color={textColor}>
          <RichText
            body={
              isMobile && content.body_mobileRaw
                ? content.body_mobileRaw
                : content.bodyRaw
            }
          />
        </Box>
      </TextWrapper>
    </Wrapper>
  )
}
