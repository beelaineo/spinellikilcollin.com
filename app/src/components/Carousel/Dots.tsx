import * as React from 'react'
import styled, { css } from '@xstyled/styled-components'
import { Column } from '../Layout'

interface DotsProps {
  currentSlide: number
  totalSlides: number
}

interface WithActive {
  active: boolean
}

const Wrapper = styled.div`
  ${({ theme }) => css`
    margin: 3 auto 2;
    padding: 0;
    position: relative;
    z-index: 10;

    ${theme.mediaQueries.mobile} {
      padding: 0 5;
      margin-top: calc(${theme.space[5]}px - 2px);
    }
  `}
`

const Inner = styled.div`
  max-width: small;
  display: flex;
  justify-content: flex-start;
  margin: 0 auto;
`

const Dot = styled.div<WithActive>`
  ${({ active }) => css`
    margin-right: 2;
    width: 6px;
    height: 6px;
    border-radius: 10px;
    background-color: ${active ? 'body.7' : 'body.4'};
  `}
`

export const Dots = ({ currentSlide, totalSlides }: DotsProps) => {
  return (
    <Wrapper>
      <Inner>
        {Array(totalSlides)
          .fill(null)
          .map((_, index) => (
            <Dot key={index} active={index === currentSlide} />
          ))}
      </Inner>
    </Wrapper>
  )
}
