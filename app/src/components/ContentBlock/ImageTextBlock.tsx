import * as React from 'react'
import styled, { Box, css } from '@xstyled/styled-components'
import { ImageTextBlock as ImageTextBlockType } from '../../types'
import { Heading } from '../Text'
import { RichText } from '../RichText'
import { PageLink } from '../PageLink'
import { Image, HoverImage } from '../Image'
import {
  getFlexJustification,
  getFlexAlignment,
  getTextAlignment,
} from '../../theme/utils'
import { CloudinaryVideo } from '../CloudinaryVideo'

interface ImageTextBlockProps {
  content: ImageTextBlockType
}

const RichTextWrapper = (props: any) => <Heading level={2} {...props} />

interface WithLayout {
  layout?: string | null
}

const Wrapper = styled.div<WithLayout>`
  ${({ layout }) => css`
    position: relative;
    height: 100%;
    background-color: body.0;
    grid-column: ${layout === 'fullWidth' ? '1 / 3' : 'auto'};

    &:hover ${HoverImage} {
      opacity: 1;
    }

    video {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  `}
`

const CtaWrapper = styled.div`
  display: inline-block;
  padding-bottom: 1;
  border-bottom: 1px solid;
`

interface TextWrapperProps {
  textPosition: string | null | void
}

const TextWrapper = styled.div`
  ${({ textPosition }: TextWrapperProps) => css`
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
  `}
`

export const ImageTextBlock = ({ content }: ImageTextBlockProps) => {
  const {
    ctaText,
    textPosition,
    backgroundImage,
    hoverImage,
    cloudinaryVideo,
    layout,
  } = content
  console.log(layout)

  const link = content.link ? content.link[0] : undefined
  const textColor = content.textColor === 'light' ? 'grays.0' : 'grays.9'

  const ratio = layout === 'fullWidth' ? 0.4 : 1
  const sizes = layout === 'fullWidth' ? [1600] : [900]
  return (
    <Wrapper layout={layout}>
      <Image image={backgroundImage} hoverImage={hoverImage} ratio={ratio} />
      {cloudinaryVideo ? (
        <CloudinaryVideo sizes={sizes} video={cloudinaryVideo} />
      ) : null}
      <TextWrapper textPosition={textPosition}>
        <PageLink link={link}>
          <Box color={textColor}>
            <RichText body={content.bodyRaw} blockWrapper={RichTextWrapper} />
            {ctaText ? (
              <CtaWrapper>
                <Heading level={3} mt={2} fontStyle="italic">
                  {ctaText}
                </Heading>
              </CtaWrapper>
            ) : null}
          </Box>
        </PageLink>
      </TextWrapper>
    </Wrapper>
  )
}
