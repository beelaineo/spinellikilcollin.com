import * as React from 'react'
import styled, { css } from '@xstyled/styled-components'
import { Dot, DotsWrapper, DotsInner } from './styled'

interface DotsProps {
  currentSlide: number
  totalSlides: number
}

export const Dots = ({ currentSlide, totalSlides }: DotsProps) => {
  return (
    <DotsWrapper>
      <DotsInner>
        {Array(totalSlides)
          .fill(null)
          .map((_, index) => (
            <Dot key={index} $active={index === currentSlide} />
          ))}
      </DotsInner>
    </DotsWrapper>
  )
}
