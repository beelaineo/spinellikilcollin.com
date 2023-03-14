import * as React from 'react'
import styled, { DefaultTheme, css } from '@xstyled/styled-components'

export const MainImage = styled.img``
export const BlurImage = styled.img``

export const HoverImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: 0.3s;
`

export const Wrapper = styled.div`
  position: relative;
  text-align: left;
  width: 100%;

  &:hover ${HoverImage} {
    opacity: 1;
  }
`

interface PictureProps {
  theme: DefaultTheme
  loaded: boolean
  objectFit?: string
}

export const Picture = styled.picture`
  ${({ loaded, objectFit }: PictureProps) => css`
    max-height: 100%;
    max-width: 100%;
    width: auto;
    background-color: transparent;
    display: block;

    & > ${MainImage} {
      opacity: ${loaded ? 1 : 0};
      transition: opacity 0.3s linear;
      transition-delay: 0s;
      max-width: 100%;
      object-fit: ${objectFit || 'cover'};
      display: block;
    }

    & > ${BlurImage} {
      opacity: ${loaded ? 0 : 1};
      transition: opacity 0.3s linear;
      transition-delay: 0s;
      max-width: 100%;
      object-fit: ${objectFit || 'cover'};
      display: block;
    }
  `}
`

export const PreloadWrapper = styled.div`
  position: fixed;
  top: -500px;
  left: -500px;
  width: 1px;
  height: 1px;
  opacity: 0;
  pointer-events: none;
  z-index: -100;
`

export const RatioImageFill = styled.div`
  display: block;

  & + picture > img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`
