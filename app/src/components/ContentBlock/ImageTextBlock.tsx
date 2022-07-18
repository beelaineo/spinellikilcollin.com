import * as React from 'react'
import styled, { Box, css } from '@xstyled/styled-components'
import { ImageTextBlock as ImageTextBlockType } from '../../types'
import { Heading } from '../Text'
import { RichText } from '../RichText'
import { PageLink, LinkParams } from '../PageLink'
import { Image, HoverImage } from '../Image'
import {
  getFlexJustification,
  getFlexAlignment,
  getTextAlignment,
} from '../../theme/utils'
import { VideoWrapper, CloudinaryVideo } from '../CloudinaryVideo'
import { useMedia } from '../../hooks'
import { theme } from '../../theme'

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

    &:hover ${HoverImage} {
      opacity: 1;
    }

    video,
    ${VideoWrapper} {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

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

const CtaWrapper = styled.div`
  display: inline-block;
  padding-top: 3;
  padding-bottom: 0px;
  border-bottom: 1px solid;
`

interface TextWrapperProps {
  textPosition: string | null | void
}

const TextWrapper = styled.div<TextWrapperProps>`
  ${({ textPosition, theme }) => css`
    padding: 6;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    display: flex;
    justify-content: ${getFlexJustification(textPosition)};
    align-items: ${getFlexAlignment(textPosition)};
    text-align: ${getTextAlignment(textPosition)};

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

    ${theme.mediaQueries.mobile} {
      padding: 4;
    }
  `}
`

interface ImageTextBlockProps {
  content: ImageTextBlockType
  linkParams?: LinkParams
}

export const ImageTextBlock = ({
  content,
  linkParams,
}: ImageTextBlockProps) => {
  const {
    ctaText,
    textPosition,
    backgroundImage,
    hoverImage,
    cloudinaryVideo,
    layout,
  } = content
  console.log(content)
  const link = content.link ? content.link[0] : undefined
  const textColor = content.textColor === 'light' ? 'grays.0' : 'grays.9'

  const ratio = layout === 'fullWidth' ? 0.48 : 1
  const isMobile = useMedia({
    maxWidth: `${theme.breakpoints?.md || '650'}px`,
  })

  return (
    <Wrapper layout={layout}>
      <PageLink link={link} linkParams={linkParams}>
        <ImagesWrapper>
          <Image
            image={backgroundImage}
            hoverImage={hoverImage}
            ratio={ratio}
          />
          <Image image={backgroundImage} hoverImage={hoverImage} ratio={1} />
        </ImagesWrapper>
        {cloudinaryVideo ? <CloudinaryVideo video={cloudinaryVideo} /> : null}
        <TextWrapper textPosition={textPosition}>
          <Box color={textColor}>
            <RichText
              body={
                isMobile && content.body_mobileRaw
                  ? content.body_mobileRaw
                  : content.bodyRaw
              }
            />
            {ctaText ? (
              <CtaWrapper>
                <Heading level={4} my={0} fontStyle="italic">
                  {ctaText}
                </Heading>
              </CtaWrapper>
            ) : null}
          </Box>
        </TextWrapper>
      </PageLink>
    </Wrapper>
  )
}
