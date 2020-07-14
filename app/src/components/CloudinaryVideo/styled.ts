import styled, { css } from '@xstyled/styled-components'

export const VideoWrapper = styled.div`
  position: relative;
`

export const AudioButtonWrapper = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 30px;
  height: 30px;

  svg {
    width: 100%;
    height: 100%;
    fill: body.0;
  }
`
