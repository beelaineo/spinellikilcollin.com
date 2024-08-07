import styled, { css } from '@xstyled/styled-components'

const ButtonWrapper = styled.button`
  opacity: 0;
  cursor: pointer;
  transition: 0.2s;
  position: absolute;
  bottom: 20px;
  width: 30px;
  height: 30px;

  svg {
    width: 100%;
    height: 100%;
    fill: body.0;
  }
`

export const AudioButtonWrapper = styled(ButtonWrapper)`
  right: 20px;
`

export const PlaybackButtonWrapper = styled(ButtonWrapper)`
  left: 20px;
`

interface VideoWrapperProps {
  loaded: boolean
}

export const VideoWrapper = styled.div<VideoWrapperProps>`
  ${({ loaded }) => css`
    position: relative;

    opacity: ${loaded ? 1 : 0};

    video {
      max-width: 100%;
    }

    transition: opacity 0.3s linear;
    transition-delay: 0s;

    video::-webkit-media-controls {
      opacity: 0;
    }

    &:hover ${ButtonWrapper} {
      opacity: 1;
    }
  `}
`
export const AnimationWrapper = styled.div`
  ${({ theme }) => css`
    position: relative;
    width: 100%;
    height: 100%;
    max-width: 100%;
    video {
      max-width: 100%;
      width: 100%;
      height: 100%;
      bottom: 0;
      left: 0;
      right: 0;
      position: absolute;
      top: 0;
      &::-webkit-media-controls {
        opacity: 0;
      }
      -webkit-mask-image: -webkit-radial-gradient(white, black);
      -webkit-backface-visibility: hidden;
      -moz-backface-visibility: hidden;
    }
    img {
      max-width: 100%;
      width: 100%;
      height: 100%;
      bottom: 0;
      left: 0;
      right: 0;
      position: absolute;
      top: 0;
    }
  `}
`

export const DesktopWrapper = styled.div`
  ${({ theme }) => css`
    position: sticky;
    top: 0;
    ${theme.mediaQueries.tablet} {
      display: none;
    }
    video {
      max-width: 100%;
      object-fit: cover;
      position: absolute;
      top: 0;
      &::-webkit-media-controls {
        opacity: 0;
      }
    }
  `}
`
export const MobileWrapper = styled.div`
  ${({ theme }) => css`
    display: none;
    position: relative;
    video {
      max-width: 100%;
      width: 100%;
      height: 100%;
      bottom: 0;
      left: 0;
      right: 0;
      position: absolute;
      top: 0;
      &::-webkit-media-controls {
        opacity: 0;
      }
    }
    img {
      max-width: 100%;
      width: 100%;
      height: 100%;
      bottom: 0;
      left: 0;
      right: 0;
      position: absolute;
      top: 0;
    }
    ${theme.mediaQueries.tablet} {
      display: block;
      margin: 5 0 2;
    }

    ${theme.mediaQueries.mobile} {
      margin: 5 -7 2;
    }
  `}
`
