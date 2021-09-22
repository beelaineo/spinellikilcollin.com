import * as React from 'react'
import styled, { Box, css } from '@xstyled/styled-components'
import { TextBlock as TextBlockType } from '../../types'
import { RichText } from '../RichText'
import { Image } from '../Image'

interface WithLayout {
  layout?: string | null
}

const Wrapper = styled.div<WithLayout>`
  ${({ theme, layout }) => css`
    position: relative;
    height: 100%;
    width: 100%;
    background-color: body.0;
    grid-column: ${layout === 'fullWidth' ? '1 / 3' : 'auto'};

    ${theme.mediaQueries.mobile} {
      grid-column: auto;
    }
  `}
`

const ImagesWrapper = styled.div`
  ${({ theme }) => css`
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

interface TextWrapperProps {
  textAlignment: string | null | undefined
}

const TextWrapper = styled.div<TextWrapperProps>`
  ${({ textAlignment, theme }) => css`
    padding: 6;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    display: flex;
    text-align: ${textAlignment};

    h1,
    h2,
    h3,
    h4,
    h5 {
      margin: 0;
    }

    ${theme.mediaQueries.tablet} {
      padding: 4;
    }
  `}
`

interface TextBlockProps {
  content: TextBlockType
}

export const TextBlock = ({ content }: TextBlockProps) => {
  const { alignment, backgroundImage, layout } = content

  const textColor = content.textColor === 'light' ? 'grays.0' : 'grays.9'

  const ratio = layout === 'fullWidth' ? 0.48 : 1
  return (
    <Wrapper layout={layout}>
      <ImagesWrapper>
        <Image image={backgroundImage} ratio={ratio} />
        <Image image={backgroundImage} ratio={1} />
      </ImagesWrapper>
      <TextWrapper textAlignment={alignment}>
        <Box color={textColor}>
          <RichText body={content.bodyRaw} />
        </Box>
      </TextWrapper>
    </Wrapper>
  )
}
