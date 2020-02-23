import * as React from 'react'
import styled, { DefaultTheme, css } from '@xstyled/styled-components'

interface PictureProps {
  theme: DefaultTheme
  loaded: boolean
}

export const MainImage = styled.img``

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

  &:hover ${HoverImage} {
    opacity: 1;
  }
`

export const Picture = styled.picture`
  ${({ loaded }: PictureProps) => css`
    max-height: 100%;
    max-width: 100%;
    width: auto;
    background-color: transparent;
    display: block;

    & > ${MainImage} {
      opacity: ${loaded ? 1 : 0};
      transition: 0.3s;
      transition-delay: 0.3s;
      max-width: 100%;
      object-fit: cover;
    }
  `}
`

export const RatioImageFill = styled.img`
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
