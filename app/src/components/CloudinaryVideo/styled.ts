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

export const VideoWrapper = styled.div`
  position: relative;

  &:hover ${ButtonWrapper} {
    opacity: 1;
  }
`
