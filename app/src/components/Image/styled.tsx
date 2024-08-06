import * as React from 'react'
import styled, { DefaultTheme, css } from '@xstyled/styled-components'

export const MainImage = styled.img``
export const BlurImage = styled.img``
export const ShadowImage = styled.span``

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
  ratio?: number
  richImage?: boolean
}

export const Picture = styled.picture<PictureProps>`
  ${({ loaded, objectFit, ratio, richImage }) => css`
    max-height: 100%;
    max-width: 100%;
    width: auto;
    background-color: transparent;
    display: block;

    position: ${richImage ? 'relative' : 'absolute'};
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;

    overflow: hidden;

    & > ${MainImage} {
      opacity: ${loaded ? 1 : 0};

      transition: opacity 0.5s ease-out;
      transition-delay: 0s;
      max-width: 100%;
      object-fit: ${objectFit || 'cover'};
      display: block;
    }

    & > ${BlurImage} {
      opacity: ${loaded ? 0 : 1};
      filter: blur(${loaded ? 0 : 16}px) contrast(${loaded ? 0 : 0.7});
      aspect-ratio: ${ratio};

      transition: opacity 0.5s ease-in, filter 0.5s ease-in;
      transition-delay: 0s;
      max-width: 100%;
      transform: scale(1.1, 1.1);

      object-fit: ${objectFit || 'cover'};
      display: block;
    }
    & > ${ShadowImage} {
      opacity: ${loaded ? 0 : 1};
      transition: opacity 0.3s ease-out;
      transition-delay: 0.1s;

      max-width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      aspect-ratio: ${ratio};
      display: block;
      background-repeat: no-repeat;

      background-position: center;
      background-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI2LjMuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA3MjAgNzIwIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA3MjAgNzIwOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+Cgkuc3Qwe2ZpbGw6I0Y1RjNGNDt9Cgkuc3Qxe2ZpbGw6dXJsKCNTVkdJRF8xXyk7fQo8L3N0eWxlPgo8cmVjdCB4PSIwIiBjbGFzcz0ic3QwIiB3aWR0aD0iNzIwIiBoZWlnaHQ9IjcyMCIvPgo8cmFkaWFsR3JhZGllbnQgaWQ9IlNWR0lEXzFfIiBjeD0iMzYwIiBjeT0iMzg5LjgxNzQiIHI9IjIzNi42MzQ4IiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KDEgMi43OTgyMTdlLTA0IC01LjI3NjQxMGUtMDUgMC4wODc0IDAuMDIwNiAzNTUuNjM2OSkiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KCTxzdG9wICBvZmZzZXQ9IjAuMDIiIHN0eWxlPSJzdG9wLWNvbG9yOiNCM0IzQjM7c3RvcC1vcGFjaXR5OjAuNyIvPgoJPHN0b3AgIG9mZnNldD0iMC4xMzk1IiBzdHlsZT0ic3RvcC1jb2xvcjojQzBDMEMwO3N0b3Atb3BhY2l0eTowLjc0MDciLz4KCTxzdG9wICBvZmZzZXQ9IjAuNDQzOSIgc3R5bGU9InN0b3AtY29sb3I6I0RERENERDtzdG9wLW9wYWNpdHk6MC44NDQ0Ii8+Cgk8c3RvcCAgb2Zmc2V0PSIwLjcwODIiIHN0eWxlPSJzdG9wLWNvbG9yOiNFRkVERUU7c3RvcC1vcGFjaXR5OjAuOTM0NCIvPgoJPHN0b3AgIG9mZnNldD0iMC45MDEiIHN0eWxlPSJzdG9wLWNvbG9yOiNGNUYzRjQiLz4KPC9yYWRpYWxHcmFkaWVudD4KPGVsbGlwc2UgY2xhc3M9InN0MSIgY3g9IjM2MCIgY3k9IjM4OS44MiIgcng9IjI3Ni45MiIgcnk9IjI2Ljg3Ii8+Cjwvc3ZnPgo=');
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
