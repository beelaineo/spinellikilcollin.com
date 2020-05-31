import * as React from 'react'
import styled, { css } from '@xstyled/styled-components'
import { CollectionBlock as CollectionBlockType } from '../../types'
import { Image, ImageWrapper } from '../../components/Image'
import { RichText } from '../../components/RichText'
import {
  getColor,
  getTextAlignment,
  getFlexAlignment,
  getFlexJustification,
} from '../../theme/utils'

interface CollectionBlockProps {
  collectionBlock: CollectionBlockType
}

const TextWrapper = styled.div`
  position: relative;
  z-index: 1;
`

type WrapperProps = Pick<
  CollectionBlockType,
  'backgroundColor' | 'textColor' | 'textPosition'
>

const Wrapper = styled.div<WrapperProps>`
  ${({ backgroundColor, textPosition, textColor }) => css`
    position: relative;
    background-color: ${getColor(backgroundColor)};
    color: ${getColor(textColor)};
    display: flex;
    align-items: ${getFlexAlignment(textPosition)};
    justify-content: ${getFlexJustification(textPosition)};
    text-align: ${getTextAlignment(textPosition)};
    padding: 3 6;
    ${ImageWrapper},
    img,
    picture {
      position: absolute;
      object-fit: cover;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
    }
  `}
`

export const CollectionBlock = ({ collectionBlock }: CollectionBlockProps) => {
  const {
    bodyRaw,
    textPosition,
    textColor,
    backgroundImage,
    backgroundColor,
  } = collectionBlock
  return (
    <Wrapper
      backgroundColor={backgroundColor}
      textPosition={textPosition}
      textColor={textColor}
    >
      {bodyRaw ? (
        <TextWrapper>
          <RichText weight={2} body={bodyRaw} />
        </TextWrapper>
      ) : null}
      <Image
        image={backgroundImage}
        sizes="(min-width: 600px) 100vw, (min-width: 780px) 50vw, 30vw"
      />
    </Wrapper>
  )
}
