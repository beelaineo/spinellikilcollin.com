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

interface ImageTextBlockProps {
  content: ImageTextBlockType
}

const RichTextWrapper = (props: any) => <Heading level={2} {...props} />

const Wrapper = styled.div`
  position: relative;
  height: 100%;
  background-color: body.0;

  &:hover ${HoverImage} {
    opacity: 1;
  }
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
  const { ctaText, textPosition, backgroundImage, hoverImage, layout } = content

  const link = content.link ? content.link[0] : undefined
  const textColor = content.textColor === 'light' ? 'grays.0' : 'grays.9'

  return (
    <Wrapper>
      <Image image={backgroundImage} hoverImage={hoverImage} ratio={1} />
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
