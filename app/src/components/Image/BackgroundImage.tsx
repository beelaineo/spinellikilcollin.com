import * as React from 'react'
import styled, { css } from 'styled-components'
import { Image } from './Image'
import { BackgroundImage as BackgroundImageType } from '../../types'

const BackgroundImageWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

interface BackgroundImageProps {
  backgroundImage: BackgroundImageType
}

export const BackgroundImage = ({ backgroundImage }: BackgroundImageProps) => {
  return (
    <BackgroundImageWrapper>
      <Image image={backgroundImage.asset} />
    </BackgroundImageWrapper>
  )
}
